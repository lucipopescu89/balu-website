/* BALU – interacțiuni site (fără biblioteci externe) */
(function () {
  'use strict';

  /* Numărul folosit pentru WhatsApp din formular */
  var WHATSAPP = '40767909792';

  /* ---------- meniu mobil ---------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  if (header && toggle) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    header.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        header.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- mesaj scurt (toast) ---------- */
  var toastEl;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove('is-visible'); }, 2600);
  }

  /* ---------- limbă (DE / EN vin ulterior) ---------- */
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      var code = b.getAttribute('data-lang');
      if (code === 'ro') return;
      toast(code === 'de' ? 'Die deutsche Version folgt in Kürze.' : 'The English version is coming soon.');
    });
  });

  /* ---------- filtre (Lucrări, Shop) ---------- */
  document.querySelectorAll('[data-filter-group]').forEach(function (group) {
    var target = document.querySelector(group.getAttribute('data-filter-group'));
    var counter = document.querySelector('[data-filter-count]');
    if (!target) return;
    var buttons = group.querySelectorAll('button[data-filter]');
    function apply(value) {
      var shown = 0;
      target.querySelectorAll('[data-cat]').forEach(function (item) {
        var match = value === 'all' || item.getAttribute('data-cat') === value;
        item.hidden = !match;
        if (match) shown++;
      });
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-filter') === value ? 'true' : 'false'); });
      if (counter) counter.textContent = shown + (shown === 1 ? ' proiect' : ' proiecte');
    }
    buttons.forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-filter')); });
    });
    apply('all');
  });

  /* ---------- galerie proiect ---------- */
  document.querySelectorAll('[data-gallery]').forEach(function (g) {
    var main = g.querySelector('.gallery-main');
    var thumbs = g.querySelectorAll('.thumbs button');
    thumbs.forEach(function (t) {
      t.addEventListener('click', function () {
        var img = t.querySelector('img');
        main.src = img.getAttribute('data-full') || img.src;
        main.alt = t.getAttribute('data-alt') || '';
        thumbs.forEach(function (x) { x.setAttribute('aria-pressed', x === t ? 'true' : 'false'); });
      });
    });
  });

  /* ---------- formular cerere ofertă (3 pași) ---------- */
  var form = document.querySelector('[data-quote-form]');
  if (form) {
    var steps = form.querySelectorAll('.form-step');
    var label = form.querySelector('[data-step-label]');
    var bars = form.querySelectorAll('.progress .bar i');
    var progress = form.querySelector('.progress');
    var names = ['Piesa', 'Detalii și poze', 'Date de contact'];
    var current = 1;

    function show(n) {
      current = n;
      steps.forEach(function (s) { s.hidden = Number(s.getAttribute('data-step')) !== n; });
      if (progress) progress.hidden = n > 3;
      if (label && n <= 3) label.textContent = 'Pasul ' + n + ' din 3 · ' + names[n - 1];
      bars.forEach(function (b, i) { b.classList.toggle('on', i < n); });
      var top = form.getBoundingClientRect().top + window.scrollY - 100;
      if (window.scrollY > top) window.scrollTo({ top: top, behavior: 'smooth' });
    }
    form.querySelectorAll('[data-go]').forEach(function (b) {
      b.addEventListener('click', function () { show(Number(b.getAttribute('data-go'))); });
    });

    var files = form.querySelector('input[type="file"]');
    var filesInfo = form.querySelector('[data-files-info]');
    if (files && filesInfo) {
      files.addEventListener('change', function () {
        var n = files.files.length;
        if (n > 5) { filesInfo.textContent = 'Maximum 5 imagini. Au fost alese ' + n + '.'; return; }
        filesInfo.textContent = n ? n + (n === 1 ? ' fișier ales' : ' fișiere alese') : 'Până la 5 imagini: spațiul, o schiță, un desen tehnic sau piese de inspirație.';
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var err = form.querySelector('.form-error');
      var name = form.elements['nume'].value.trim();
      var phone = form.elements['telefon'].value.trim();
      var consent = form.elements['acord'].checked;
      if (!name || !phone || !consent) {
        err.hidden = false;
        err.textContent = 'Completați numele, telefonul și bifați acordul pentru prelucrarea datelor.';
        return;
      }
      err.hidden = true;
      var d = new FormData(form);
      var lines = [
        'Bună ziua! Cerere de ofertă de pe site-ul BALU:',
        '• Piesă: ' + d.get('piesa'),
        '• Esență: ' + d.get('esenta') + ' · Finisaj: ' + d.get('finisaj'),
        '• Dimensiuni: ' + (d.get('dimensiuni') || '-'),
        '• Localitate: ' + (d.get('localitate') || '-'),
        '• Termen: ' + d.get('termen'),
        '• Detalii: ' + (d.get('detalii') || '-'),
        '• Solicitant: ' + d.get('solicitant'),
        '• Nume: ' + name + ' · Telefon: ' + phone + (d.get('email') ? ' · Email: ' + d.get('email') : '')
      ];
      var wa = form.querySelector('[data-whatsapp]');
      if (wa) wa.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));
      /* TODO programare: trimiterea reală a formularului (email + poze) printr-un serviciu de formulare */
      show(4);
    });
  }

  /* ---------- formular „anunță-mă" (shop) ---------- */
  document.querySelectorAll('[data-notify]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      toast('Mulțumim! Anunțul vine la deschiderea magazinului.');
      f.reset();
    });
  });

  /* ---------- clipuri (până la încărcarea filmărilor) ---------- */
  document.querySelectorAll('[data-video-soon]').forEach(function (b) {
    b.addEventListener('click', function () { toast('Filmarea din atelier vine în curând.'); });
  });

  /* ---------- an curent în footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (y) { y.textContent = new Date().getFullYear(); });
})();
