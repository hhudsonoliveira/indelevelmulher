/* =================================================================
   INDELÉVEL MULHER — comportamento da página
   1) Contagem regressiva até 2 de outubro de 2026, 8h (America/Bahia = UTC-3)
   2) CTA fixo no mobile, revelado depois do hero
   ================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     1. CONTAGEM REGRESSIVA
     Cada dígito vive numa janela de 1em. Quando o valor muda, só
     aquele dígito rola para cima — os demais ficam parados.
     --------------------------------------------------------------- */
  var root = document.getElementById('countdown');
  if (!root) return;

  var srOut = document.getElementById('countdownSr');
  var target = new Date(root.getAttribute('data-target')).getTime();

  var groups = {};
  Array.prototype.forEach.call(root.querySelectorAll('.cd-digits'), function (el) {
    groups[el.getAttribute('data-unit')] = el;
  });

  function makeDigit(char) {
    var digit = document.createElement('span');
    digit.className = 'cd-digit';
    digit.dataset.v = char;

    var track = document.createElement('span');
    track.className = 'cd-track';

    var cell = document.createElement('span');
    cell.className = 'cd-cell';
    cell.textContent = char;

    track.appendChild(cell);
    digit.appendChild(track);

    /* terminada a rolagem, descarta o dígito antigo e zera o transform */
    track.addEventListener('transitionend', function () { settle(track); });

    return digit;
  }

  /* Encerra qualquer rolagem em andamento mantendo só o dígito final. */
  function settle(track) {
    track.style.transition = 'none';
    track.style.transform = 'none';
    while (track.children.length > 1) {
      track.removeChild(track.firstElementChild);
    }
  }

  function setDigit(digit, char) {
    if (digit.dataset.v === char) return;
    digit.dataset.v = char;

    var track = digit.firstElementChild;
    settle(track);

    if (reduceMotion) {
      track.firstElementChild.textContent = char;
      return;
    }

    var next = document.createElement('span');
    next.className = 'cd-cell';
    next.textContent = char;
    track.appendChild(next);

    void track.offsetHeight; /* reflow antes de transicionar */
    track.style.transition = 'transform 220ms cubic-bezier(0.23, 1, 0.32, 1)';
    track.style.transform = 'translateY(-50%)';
  }

  function render(group, value) {
    var text = String(value);
    if (text.length < 2) text = '0' + text;

    /* o número de dígitos só muda em virada de casa (ex.: 100 → 99 dias) */
    while (group.children.length < text.length) {
      group.appendChild(makeDigit(text.charAt(group.children.length)));
    }
    while (group.children.length > text.length) {
      group.removeChild(group.firstElementChild);
    }

    for (var i = 0; i < text.length; i++) {
      setDigit(group.children[i], text.charAt(i));
    }
  }

  function finish() {
    root.innerHTML = '';
    root.className = 'countdown countdown--over';
    root.textContent = 'O INDELÉVEL MULHER começou.';
    if (srOut) srOut.textContent = 'O evento já começou.';
  }

  var lastMinuteAnnounced = -1;

  function tick() {
    var remaining = target - Date.now();

    if (remaining <= 0) {
      finish();
      clearInterval(timer);
      return;
    }

    var totalSeconds = Math.floor(remaining / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    render(groups.dias, days);
    render(groups.horas, hours);
    render(groups.minutos, minutes);
    render(groups.segundos, seconds);

    /* resumo para leitores de tela — atualizado sem anunciar a cada segundo */
    if (srOut && minutes !== lastMinuteAnnounced) {
      lastMinuteAnnounced = minutes;
      srOut.textContent = 'Faltam ' + days + ' dias, ' + hours + ' horas e ' +
        minutes + ' minutos para o início do evento, em 2 de outubro de 2026 às 8h.';
    }
  }

  var timer = setInterval(tick, 250); /* 250ms evita pular segundos por drift */
  tick();
})();


(function () {
  'use strict';

  /* ---------------------------------------------------------------
     2. CTA FIXO NO MOBILE
     Aparece quando o hero sai da tela e some sobre o CTA final,
     para não duplicar o mesmo botão na mesma dobra.
     --------------------------------------------------------------- */
  var sticky = document.getElementById('stickyCta');
  var hero = document.getElementById('topo');
  var finalCta = document.getElementById('inscricao');

  if (sticky && hero && 'IntersectionObserver' in window) {
    sticky.removeAttribute('hidden');

    var pastHero = false;
    var onFinal = false;

    function sync() {
      sticky.classList.toggle('is-visible', pastHero && !onFinal);
    }

    new IntersectionObserver(function (entries) {
      pastHero = !entries[0].isIntersecting;
      sync();
    }, { rootMargin: '-40px 0px 0px 0px' }).observe(hero);

    if (finalCta) {
      new IntersectionObserver(function (entries) {
        onFinal = entries[0].isIntersecting;
        sync();
      }, { threshold: 0.25 }).observe(finalCta);
    }
  }
})();
