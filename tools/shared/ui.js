// Shared helpers for every ICTV Coach page. Edit here, then run: node tools/check.mjs --fix
const ICTV = (() => {
  const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  // Everything from the data payload or typed by the person goes through esc() before it becomes HTML.
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ESCAPES[ch]);

  // Keeps a value on one line so it cannot break the structure of a saved Markdown file.
  const oneLine = value => String(value ?? '').replace(/\s*\n\s*/g, ' ').trim();

  const readPayload = id => JSON.parse(document.getElementById(id).textContent);

  // Returns 'saved' (written where the person chose), 'downloaded' (sent to the Downloads folder),
  // 'cancelled' (the person closed the dialog) or 'blocked' (this viewer allows neither).
  async function saveTextFile(filename, text) {
    if (typeof window.showSaveFilePicker === 'function') {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: filename,
          types: [{ description: 'Markdown file', accept: { 'text/markdown': ['.md'] } }]
        });
        const writable = await handle.createWritable();
        await writable.write(text);
        await writable.close();
        return 'saved';
      } catch (err) {
        if (err && err.name === 'AbortError') return 'cancelled';
        // Embedded viewers refuse the dialog. Fall through to a plain download.
      }
    }
    try {
      const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      return 'downloaded';
    } catch (err) {
      return 'blocked';
    }
  }

  function saveMessage(result, filename, folder) {
    const name = `<strong>${esc(filename)}</strong>`;
    const where = `<code>${esc(folder)}</code>`;
    if (result === 'saved') return `Saved ${name}. Keep it in ${where} so your assistant reads it next time.`;
    if (result === 'downloaded') return `${name} was sent to your downloads. Move it to ${where}. If no file appeared, the full text is below: select it and save it under that name.`;
    if (result === 'blocked') return `This viewer does not allow saving files. The full text of ${name} is below: select it and save it in ${where}.`;
    return '';
  }

  // Draws view() into root and redraws after every action. Buttons carry data-action (and an optional
  // data-arg); fields carry data-input. Typing updates state without a full redraw, so the cursor never
  // jumps; only regions marked data-live="name" are refreshed, from live[name](). data-key lets keyboard
  // focus survive a redraw.
  function mount(root, view, actions, live = {}) {
    function render() {
      const active = document.activeElement;
      const key = active && active.getAttribute ? active.getAttribute('data-key') : null;
      root.innerHTML = view();
      if (!key) return;
      for (const el of root.querySelectorAll('[data-key]')) {
        if (el.getAttribute('data-key') === key) { el.focus(); break; }
      }
    }
    root.addEventListener('click', event => {
      const el = event.target.closest ? event.target.closest('[data-action]') : null;
      if (!el || !root.contains(el)) return;
      const action = actions[el.getAttribute('data-action')];
      if (action) Promise.resolve(action(el.getAttribute('data-arg'))).then(render);
    });
    root.addEventListener('input', event => {
      const el = event.target;
      const name = el && el.getAttribute ? el.getAttribute('data-input') : null;
      if (!name || !actions[name]) return;
      actions[name](el.value);
      for (const region of root.querySelectorAll('[data-live]')) {
        const draw = live[region.getAttribute('data-live')];
        if (draw) region.innerHTML = draw();
      }
    });
    root.addEventListener('keydown', event => {
      const el = event.target;
      const name = event.key === 'Enter' && el && el.getAttribute ? el.getAttribute('data-enter') : null;
      if (name && actions[name]) { event.preventDefault(); Promise.resolve(actions[name]()).then(render); }
    });
    render();
    return render;
  }

  const LETTERS = {
    V: { name: 'Verification', hint: 'A flaw got through because no written-down check would have caught it.' },
    I: { name: 'Instructions', hint: 'The goal or a "not acceptable" boundary was unstated or vague.' },
    C: { name: 'Context', hint: 'The assistant had to guess background, audience or examples that live in your head.' },
    T: { name: 'Tools', hint: 'The assistant guessed something it should have looked up or calculated, or it had the wrong access.' }
  };

  return { esc, oneLine, readPayload, saveTextFile, saveMessage, mount, LETTERS };
})();
