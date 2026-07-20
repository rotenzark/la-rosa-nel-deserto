/* La Rosa nel Deserto — Milano Bicocca
   Plumbing canonico (PLUMBING_V 2) + codice-firma del sito. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO ══════════ */
  var SITE = {
    slug: 'la-rosa-nel-deserto',
    /* ⚠️ Niente WhatsApp: l'unico recapito pubblico è il FISSO 02 36550745. */
    whatsapp: { number: '', message: '', ids: [] },
    /* Lun 08:00–20:15 · Mar–Ven 08:00–21:00 · Sab 08:00–19:30 · DOM CHIUSO.
       ⚠️ Il prospecting diceva «aperti 7 giorni su 7»: FALSO, verificato
       sulla scheda Treatwell del salone. */
    hours: {
      0: [],
      1: [['08:00', '20:15']],
      2: [['08:00', '21:00']],
      3: [['08:00', '21:00']],
      4: [['08:00', '21:00']],
      5: [['08:00', '21:00']],
      6: [['08:00', '19:30']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 2000,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 960,
    EN: {
      'nav.giornata': 'The day', 'nav.porte': 'The three windows', 'nav.listino': 'Prices',
      'nav.voci': 'Reviews', 'nav.dove': 'Find us',
      'cta.chiama': 'Call', 'a.lang': 'Change language', 'a.menu': 'Open the menu', 'a.chiudi': 'Close',
      'a.barra': 'Opening hours: from 8am to 9pm',
      'a.zoomFacciata': 'Enlarge the photo of the three windows',
      'a.zoomIstituto': 'Enlarge the photo of the salon',
      'a.zoomReception': 'Enlarge the photo of the reception',
      'alt.facciata': 'The three adjacent windows of La Rosa nel Deserto on viale Sarca, with the hairstyle, estetica and solarium signs and two palm trees outside',
      'alt.istituto': 'A member of staff in front of the wooden cabinet with the products and the framed certificates',
      'alt.reception': 'The reception: warm yellow-orange walls, a curved mosaic counter and an orange leather bench',
      'hero.kicker': 'Milan Bicocca · viale Sarca 198 · since 2006',
      'hero.l1': 'From eight in the morning', 'hero.l2': 'to nine at night.',
      'hero.lead': 'There is usually no time for oneself. Here you can come in before work, during the midday break, or once the offices have already closed.',
      'tac.1': 'before work', 'tac.2': 'lunch break', 'tac.3': 'after the office', 'tac.4': 'closing',
      'hero.cta1': 'Book an appointment', 'hero.cta2': 'Where the door is',
      'porte.occhiello': 'On the same front', 'porte.h': 'Three windows, side by side',
      'porte.p': 'Anyone walking down viale Sarca sees them in a row. Inside they are the same place.',
      'porta.1.h': 'Hairstyle', 'porta.1.p': 'The hair side, working with Olaplex and K-Time.',
      'porta.2.h': 'Beauty', 'porta.2.p': 'Waxing, face, body, massages, hands. It is the side with the longest list: thirteen entries for hair removal alone.',
      'porta.3.h': 'Solarium', 'porta.3.p': 'The third window, the one on the corner.',
      'porte.cap': 'The palm trees outside the window, on viale Sarca.',
      'sto.occhiello': 'How long', 'sto.h': 'Open since September<br>2006',
      'sto.p1': 'Almost twenty years in the same place, right by Parco Nord, with owner <strong>Manuela Arcieri</strong> and a team the reviews call by name.',
      'sto.p2': 'From their own page: everyone in the salon holds a professional qualification and follows refresher courses to add new treatments to the list. In the photo behind the counter you can see them, framed.',
      'sn.1': 'the year they opened', 'sn.2': 'from 1,010 reviews', 'sn.3': 'hours open each day',
      'lis.occhiello': 'Prices published by the salon', 'lis.h': 'What waxing costs',
      'l1.n': 'Upper lip', 'l1.d': '15 minutes', 'l2.n': 'Eyebrows', 'l2.d': '15 minutes',
      'l3.n': 'Underarms', 'l3.d': '15 minutes', 'l4.n': 'Bikini', 'l4.d': '30 minutes',
      'l5.n': 'Arms', 'l5.d': '30 minutes',
      'fam.h': 'The salon also does',
      'fam.1': 'Face treatments', 'fam.2': 'Body treatments', 'fam.3': 'Massages',
      'fam.4': 'Radiofrequency', 'fam.5': 'Lash and brow tinting', 'fam.6': 'Brow design',
      'fam.7': 'Manicure', 'fam.8': 'Hair, with Olaplex and K-Time',
      'fam.nota': 'For the rest of the list a phone call works best: treatments are chosen according to the skin too.',
      'voci.occhiello': 'Written by clients', 'voci.h': 'Five, exactly as they are',
      'dove.occhiello': 'How to get in', 'dove.h': 'Viale Sarca 198,<br>but the door is on via Beccaro',
      'dove.p': 'This is the direction that actually helps: the address is on viale Sarca, the entrance is round the corner on via Beccaro. The viale Sarca / via San Glicerio bus stop is two minutes away on foot.',
      'g.lun': 'Monday', 'g.mar': 'Tuesday', 'g.mer': 'Wednesday', 'g.gio': 'Thursday',
      'g.ven': 'Friday', 'g.sab': 'Saturday', 'g.dom': 'Sunday', 'g.chiuso': 'closed',
      'faq.h': 'Frequently asked questions',
      'faq.q1': 'What time do you open?',
      'faq.a1': 'At 8:00, every weekday. Closing is at 21:00 from Tuesday to Friday, 20:15 on Monday and 19:30 on Saturday. Sunday is closed.',
      'faq.q2': 'Where is the entrance?',
      'faq.a2': 'The address is viale Sarca 198, but the door is round the corner on via Beccaro. There are three windows side by side: hairstyle, beauty and solarium.',
      'faq.q3': 'How much does waxing cost?',
      'faq.a3': 'Upper lip €5, eyebrows €10, underarms €10, bikini €15, arms €15. These are the prices the salon publishes on its own booking channel.',
      'faq.q4': 'Which products do you use?',
      'faq.a4': 'Accademia della Bellezza for beauty, Olaplex and K-Time for hair.',
      'faq.q5': 'How long have you been open?',
      'faq.a5': 'Since September 2006. All the staff hold a professional qualification and follow regular refresher courses.',
      'foot.orari': 'Monday to Saturday from 8:00 · closed on Sunday',
      'foot.demo': 'Demonstration website made by Bespoke Studio using public data and photographs of the business.',
      'bar.chiama': 'Call', 'bar.listino': 'Prices', 'bar.dove': 'Find us',
    },
  };
  /* ═════════════════════════════════════ */

  if (SITE.whatsapp.number) {
    var waHref = 'https://wa.me/' + SITE.whatsapp.number + '?text=' + encodeURIComponent(SITE.whatsapp.message);
    SITE.whatsapp.ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.href = waHref; el.target = '_blank'; el.rel = 'noopener'; }
    });
  }

  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll(SITE.revealSelector);
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) {
        els.forEach(function (el) {
          ScrollTrigger.getAll().forEach(function (st) {
            if (st.trigger === el && !st.progress) st.kill();
          });
        });
      }
      gsap.set(els, { opacity: 1, y: 0, x: 0 });
    }
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray(SITE.revealSelector).forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 26 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  } else {
    if ('IntersectionObserver' in window && !reducedMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add(SITE.inViewClass); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(SITE.revealSelector).forEach(function (el) { io.observe(el); });
    } else {
      showAllReveals();
    }
  }

  var intro = document.getElementById(SITE.introId);
  var heroEntrance = function () { if (window.bespokeHeroEntrance) window.bespokeHeroEntrance(); };
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 700);
    heroEntrance();
  }
  function killIntroNow() {
    if (!intro) return;
    var el = intro; intro = null;
    el.remove();
    heroEntrance();
  }
  if (reducedMotion || !intro) {
    if (intro) { intro.remove(); intro = null; }
    heroEntrance();
  } else {
    setTimeout(hideIntro, SITE.introDuration);
    setTimeout(hideIntro, 6000);
    intro.addEventListener('click', hideIntro);
  }

  var burger = document.getElementById('burger');
  var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () {
      nav.classList.remove('nav-open');
      burger.setAttribute('aria-expanded', 'false');
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };
    var openNav = function () {
      killIntroNow();
      lastFocus = document.activeElement;
      nav.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      var first = nav.querySelector('a, button');
      if (first) first.focus();
    };
    burger.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > SITE.breakpointMenu) closeNav();
    });
  }

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) {
      lightboxImg.src = src; lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    };
    var closeLb = function () {
      lightbox.hidden = true; lightboxImg.src = '';
      document.body.style.overflow = '';
      if (opener) { opener.focus(); opener = null; }
    };
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        var img = btn.querySelector('img');
        openLb(btn.getAttribute('data-full'), img ? img.alt : '');
      });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLb();
    });
  }

  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
      });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = m % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function hoursState() {
    var now = romeNow();
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) {
      var s = toMin(wins[i][0]), e = toMin(wins[i][1]);
      if (now.mins >= s && now.mins < Math.min(e, 1440)) return { open: true, day: now.day, closesAt: fmt(e) };
    }
    var prev = (now.day + 6) % 7;
    var pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) {
      var pe = toMin(pw[j][1]);
      if (pe > 1440 && now.mins < pe - 1440) return { open: true, day: prev, closesAt: fmt(pe) };
    }
    for (var k = 0; k < wins.length; k++) {
      if (now.mins < toMin(wins[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) };
    }
    for (var d = 1; d <= 7; d++) {
      var nd = (now.day + d) % 7;
      var nw = SITE.hours[nd] || [];
      if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) };
    }
    return { open: false, day: now.day };
  }

  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) {
      row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day);
    });
    if (el) {
      var en = root.lang === 'en';
      var txt;
      if (st.open) {
        txt = (en ? 'Open now' : 'Aperto ora') + ' · ' + (en ? 'closes at ' : 'chiude alle ') + st.closesAt;
      } else if (st.opensToday) {
        txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
      } else if (st.opensAt !== undefined) {
        txt = (en ? 'Closed · opens ' + DAYS_EN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DAYS_IT[st.opensDay] + ' alle ') + st.opensAt;
      } else {
        txt = en ? 'Closed' : 'Chiuso';
      }
      el.textContent = txt;
    }
    disegnaBarra(st);
  }

  var originals = {};
  var I18N_ATTRS = [
    ['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt'],
    ['data-i18n-placeholder', 'placeholder'], ['data-i18n-title', 'title'],
  ];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr);
        var store = originals[dattr];
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    var lt = document.getElementById('langToggle');
    if (lt) lt.textContent = lang === 'en' ? 'IT' : 'EN';
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () { setLang(root.lang === 'en' ? 'it' : 'en'); });
  }

  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () {
      actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════ FINE PLUMBING — codice-firma: LA BARRA DELLA GIORNATA
     Il valore di questo posto è l'orario: 8:00–21:00 in una zona di
     uffici e Università. La barra disegna la fascia 8→21 e ci segna
     sopra l'ORA DI ADESSO, aggiornata al minuto insieme agli orari.
     ⚠️ NON è decorazione: è informazione, quindi si disegna SEMPRE —
     anche senza GSAP e in reduced-motion. GSAP aggiunge solo l'entrata
     dell'hero. (Senza JS ci pensa la regola CSS html:not(.js).)     */

  var SCALA_DA = 8 * 60, SCALA_A = 21 * 60;
  var barraPieno = document.querySelector('.barra__pieno');
  var barraOra = document.getElementById('barraOra');
  var barraOraTxt = document.getElementById('barraOraTxt');

  function disegnaBarra(st) {
    if (!barraPieno) return;
    var now = romeNow();
    var dentroScala = now.mins >= SCALA_DA && now.mins <= SCALA_A;
    if (st && st.open && dentroScala) {
      var pct = ((now.mins - SCALA_DA) / (SCALA_A - SCALA_DA)) * 100;
      pct = Math.max(0, Math.min(100, pct));
      barraPieno.style.width = pct + '%';
      if (barraOra && barraOraTxt) {
        barraOra.hidden = false;
        barraOra.style.left = pct + '%';
        barraOraTxt.textContent = (root.lang === 'en' ? 'now ' : 'adesso ') + fmt(now.mins);
      }
    } else {
      // chiuso: si mostra la fascia intera, senza il cursore dell'ora
      barraPieno.style.width = '100%';
      if (barraOra) barraOra.hidden = true;
    }
  }

  renderHours();
  setInterval(renderHours, 60000);

  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  if (hasGsap && !reducedMotion) {
    window.bespokeHeroEntrance = function () {
      gsap.from('.hero__kicker, .hero__h, .hero__lead', {
        opacity: 0, y: 20, duration: .7, stagger: .1, ease: 'power3.out',
      });
      gsap.from('.barra, .hero__stato, .hero__cta', {
        opacity: 0, y: 16, duration: .6, stagger: .08, ease: 'power3.out', delay: .3,
      });
    };
  }
})();
