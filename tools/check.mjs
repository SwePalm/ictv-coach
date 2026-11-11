#!/usr/bin/env node
// The repo's own Check Report. Run it before you read a change:
//
//   node tools/check.mjs         check everything, exit 1 if any check fails
//   node tools/check.mjs --fix   first copy tools/shared/ into the pages and refresh the example copies
//
// No dependencies. Needs Node 18 or newer.

import { readFileSync, writeFileSync, readdirSync, existsSync, lstatSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FIX = process.argv.includes('--fix');
const read = path => readFileSync(join(ROOT, path), 'utf8');
const RESOURCES = 'skills/ictv-coach/resources';

// Each page: its data payload, the keys the coach must fill, the files it saves, and the Markdown
// template whose headings the saved file has to keep.
const PAGES = [
  {
    file: `${RESOURCES}/assessment-ui-template.html`,
    example: 'project-context/assessment.html',
    payloadId: 'ictv-assessment-data',
    required: ['userName', 'date', 'roleSummary', 'primaryBlockerLetter', 'primaryBlockerHeadline', 'strengths', 'pillars', 'experimentOptions'],
    outputs: [{ builder: 'buildActiveFocusMarkdown', template: `${RESOURCES}/active-focus-template.md` }]
  },
  {
    file: `${RESOURCES}/option-workbench-ui-template.html`,
    example: 'project-context/handovers/board-intelligence-brief-workbench.html',
    payloadId: 'ictv-workbench-data',
    required: ['taskTitle', 'taskSlug', 'date', 'framingSummary', 'options', 'tasteSamples', 'buildingBlocks'],
    outputs: [{ builder: 'buildHandoverMarkdown', template: `${RESOURCES}/handover-template.md` }]
  },
  {
    file: `${RESOURCES}/weekly-reflection-ui-template.html`,
    example: 'project-context/check-ins/2026-W42.html',
    payloadId: 'ictv-weekly-data',
    required: ['weekLabel', 'date', 'committedPractice', 'misses', 'nextWeekCandidates'],
    outputs: [
      { builder: 'buildCheckinMarkdown', template: `${RESOURCES}/weekly-checkin-template.md` },
      { builder: 'buildActiveFocusMarkdown', template: `${RESOURCES}/active-focus-template.md` }
    ]
  }
];
const SHARED = [
  { kind: 'css', source: 'tools/shared/ui.css' },
  { kind: 'js', source: 'tools/shared/ui.js' }
];

// Words that belong to developers. They stay out of everything a person being coached will read.
const DEVELOPER_JARGON = /\b(harness|eval suite)\b/i;
const PLAIN_LANGUAGE_PATHS = [RESOURCES, 'chat-edition', 'skills/ictv-coach/references'];

const results = [];
function check(name, run) {
  let problems;
  try { problems = run() || []; } catch (err) { problems = [`check crashed: ${err.stack || err}`]; }
  results.push({ name, problems });
}

function walk(dir = '') {
  const out = [];
  for (const entry of readdirSync(join(ROOT, dir))) {
    const path = dir ? `${dir}/${entry}` : entry;
    if (entry === '.git' || entry === 'node_modules' || path === 'ictv-coach') continue;
    const stat = lstatSync(join(ROOT, path));
    if (stat.isSymbolicLink()) continue;
    if (stat.isDirectory()) out.push(...walk(path));
    else out.push(path);
  }
  return out;
}
const files = walk();
const textFiles = files.filter(f => /\.(md|html|mjs|js|css|json|yml|yaml)$/.test(f) || f === '.gitignore');

const marker = (kind, edge) => `/* ictv-shared:${kind}:${edge} */`;
function sharedBlock(html, kind) {
  const start = html.indexOf(marker(kind, 'start'));
  const end = html.indexOf(marker(kind, 'end'));
  if (start < 0 || end < 0 || end < start) return null;
  return { from: start + marker(kind, 'start').length, to: end, text: html.slice(start + marker(kind, 'start').length, end) };
}

if (FIX) {
  for (const page of PAGES) {
    let html = read(page.file);
    for (const { kind, source } of SHARED) {
      const block = sharedBlock(html, kind);
      if (block) html = `${html.slice(0, block.from)}\n${read(source).trimEnd()}\n${html.slice(block.to)}`;
    }
    writeFileSync(join(ROOT, page.file), html);
    writeFileSync(join(ROOT, page.example), html);
  }
  console.log('Copied tools/shared/ into the pages and refreshed the example copies.\n');
}

// Runs a page's own script against a minimal stand-in for the browser, so its logic can be checked
// without one. Returns what the page exposes on window.ICTV_PAGE.
function loadPage(page, mutatePayload) {
  const html = read(page.file);
  const payloadText = html.match(new RegExp(`<script id="${page.payloadId}" type="application/json">([\\s\\S]*?)</script>`))[1];
  const payload = JSON.parse(payloadText);
  if (mutatePayload) mutatePayload(payload);
  const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');
  const app = { innerHTML: '', addEventListener() {}, querySelectorAll: () => [], contains: () => true };
  const document = {
    activeElement: null,
    getElementById: id => (id === page.payloadId ? { textContent: JSON.stringify(payload) } : app)
  };
  const sandbox = { document, console, URL, Blob, setTimeout };
  sandbox.window = sandbox;
  vm.runInNewContext(script, sandbox, { filename: page.file });
  return { page: sandbox.ICTV_PAGE, app, payload };
}

// Replaces every piece of text in a payload, however deeply nested.
function mapStrings(node, fn) {
  for (const key of Object.keys(node)) {
    if (typeof node[key] === 'string') node[key] = fn(node[key], key);
    else if (node[key] && typeof node[key] === 'object') mapStrings(node[key], fn);
  }
}
// Keys the page logic compares against, so the escaping check must leave them alone.
const STRUCTURAL_KEYS = new Set(['id', 'code', 'letter', 'state', 'selected', 'primaryBlockerLetter', 'dominantLetter', 'taskSlug']);
const headings = markdown => markdown.split('\n').filter(line => /^## /.test(line)).map(line => line.trim());

check('Pages are self-contained (no external scripts, styles, fonts or clipboard calls)', () => {
  const problems = [];
  for (const { file } of PAGES) {
    const html = read(file);
    const external = html.match(/(?:src|href)\s*=\s*["'](?:https?:)?\/\/[^"']+|@import|url\(\s*["']?https?:/gi);
    if (external) problems.push(`${file}: loads something from the network: ${external.join(', ')}`);
    if (/navigator\.clipboard/.test(html)) problems.push(`${file}: uses the clipboard, which embedded viewers block`);
  }
  return problems;
});

check('Shared look and helpers are identical in every page', () => {
  const problems = [];
  for (const { file } of PAGES) {
    const html = read(file);
    for (const { kind, source } of SHARED) {
      const block = sharedBlock(html, kind);
      if (!block) problems.push(`${file}: missing the ${kind} markers`);
      else if (block.text.trim() !== read(source).trim()) problems.push(`${file}: ${kind} differs from ${source}. Run: node tools/check.mjs --fix`);
    }
  }
  return problems;
});

check('Example pages match their templates', () =>
  PAGES.filter(p => !existsSync(join(ROOT, p.example)) || read(p.example) !== read(p.file))
    .map(p => `${p.example} differs from ${p.file}. Run: node tools/check.mjs --fix`));

check('Every page has a valid data payload with the keys the coach must fill', () => {
  const problems = [];
  for (const page of PAGES) {
    const { payload } = loadPage(page);
    for (const key of page.required) if (!(key in payload)) problems.push(`${page.file}: payload is missing "${key}"`);
  }
  return problems;
});

check('Every page draws without errors or blanks', () => {
  const problems = [];
  for (const page of PAGES) {
    const { app } = loadPage(page);
    if (app.innerHTML.length < 500) problems.push(`${page.file}: drew almost nothing`);
    for (const bad of ['undefined', '[object Object]', 'NaN']) {
      if (app.innerHTML.includes(bad)) problems.push(`${page.file}: the drawn page contains "${bad}"`);
    }
  }
  return problems;
});

check('Text from the payload cannot turn into markup', () => {
  const problems = [];
  const hostile = '<img src=x onerror=alert(1)>"\'&';
  for (const page of PAGES) {
    const loaded = loadPage(page, payload => mapStrings(payload, (value, key) => (STRUCTURAL_KEYS.has(key) ? value : hostile)));
    for (const html of [loaded.app.innerHTML, loaded.page.view()]) {
      if (/<img/i.test(html)) { problems.push(`${page.file}: payload text reached the page unescaped`); break; }
    }
  }
  return problems;
});

check('Saved files keep the headings of their Markdown templates', () => {
  const problems = [];
  for (const page of PAGES) {
    const loaded = loadPage(page);
    for (const { builder, template } of page.outputs) {
      const saved = loaded.page[builder]();
      for (const heading of headings(read(template))) {
        if (!saved.includes(heading)) problems.push(`${page.file}: ${builder}() lost the heading "${heading}" from ${template}`);
      }
      for (const bad of ['undefined', '[object Object]']) {
        if (saved.includes(bad)) problems.push(`${page.file}: ${builder}() output contains "${bad}"`);
      }
    }
  }
  return problems;
});

check('The workbench flags a handover with no handbrake, and writes the gap into the file', () => {
  const page = PAGES.find(p => p.payloadId === 'ictv-workbench-data');
  const intact = loadPage(page, payload => { payload.owner = 'Test Owner'; }).page;
  const broken = loadPage(page, payload => { payload.buildingBlocks = payload.buildingBlocks.filter(b => b.letter !== 'T'); }).page;
  const problems = [];
  if (intact.buildHandoverMarkdown().includes('## Open Gaps')) problems.push('the example handover reports gaps even though it is complete and signed');
  if (!/No handbrake/.test(broken.buildHandoverMarkdown())) problems.push('removing every Tools rule did not produce a "No handbrake" gap');
  return problems;
});

check('Pages offer at most three choices where the person must pick one (the rule of three)', () => {
  const problems = [];
  const lists = { 'ictv-assessment-data': 'experimentOptions', 'ictv-workbench-data': 'options', 'ictv-weekly-data': 'nextWeekCandidates' };
  for (const page of PAGES) {
    const { payload } = loadPage(page);
    const key = lists[page.payloadId];
    if (payload[key].length > 3) problems.push(`${page.file}: "${key}" has ${payload[key].length} entries`);
  }
  return problems;
});

check('Relative links in Markdown files point at files that exist', () => {
  const problems = [];
  for (const file of files.filter(f => f.endsWith('.md'))) {
    const body = read(file).replace(/```[\s\S]*?```/g, '');
    for (const [, target] of body.matchAll(/\]\(([^)\s]+)\)/g)) {
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      const path = join(dirname(file), decodeURI(target.split('#')[0]));
      if (!existsSync(join(ROOT, path))) problems.push(`${file}: broken link to ${target}`);
    }
  }
  return problems;
});

check('The skill has a name and a description, and the name matches its folder', () => {
  const skill = read('skills/ictv-coach/SKILL.md');
  const front = skill.match(/^---\n([\s\S]*?)\n---/);
  if (!front) return ['skills/ictv-coach/SKILL.md: no frontmatter'];
  const problems = [];
  if (!/^name:\s*ictv-coach\s*$/m.test(front[1])) problems.push('SKILL.md: name is not "ictv-coach"');
  if (!/^description:/m.test(front[1])) problems.push('SKILL.md: no description');
  return problems;
});

check('Coaching material stays in plain language (no developer jargon)', () =>
  textFiles.filter(f => PLAIN_LANGUAGE_PATHS.some(p => f.startsWith(`${p}/`)))
    .flatMap(f => read(f).split('\n').map((line, i) => ({ f, line, n: i + 1 })))
    .filter(({ line }) => DEVELOPER_JARGON.test(line))
    .map(({ f, line, n }) => `${f}:${n}: "${line.trim().slice(0, 80)}"`));

check('No personal paths or email addresses in the repo', () => {
  const problems = [];
  const personal = /\/Users\/[A-Za-z]|\/home\/[a-z]+\/|[A-Z]:\\Users\\|[\w.+-]+@[\w-]+\.[a-z]{2,}/;
  for (const file of textFiles) {
    read(file).split('\n').forEach((line, i) => {
      if (personal.test(line)) problems.push(`${file}:${i + 1}: "${line.trim().slice(0, 80)}"`);
    });
  }
  return problems;
});

// The report. Failed checks first, then what this script does not look at.
const failed = results.filter(r => r.problems.length);
console.log('Check Report: ictv-coach\n');
for (const r of results) {
  console.log(`- [${r.problems.length ? ' ' : 'x'}] ${r.name}`);
  for (const problem of r.problems) console.log(`      ${problem}`);
}
console.log(`
Not checked:
- How the pages look and feel in a real browser, and whether each viewer allows saving files.
- Whether the coaching advice is good. A person has to read it.
- How the skill and the chat edition behave inside each assistant.
`);
console.log(failed.length ? `${failed.length} of ${results.length} checks failed.` : `All ${results.length} checks passed.`);
process.exit(failed.length ? 1 : 0);
