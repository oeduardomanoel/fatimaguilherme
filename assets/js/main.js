(() => {
  const root = document.documentElement;
  const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const WHATS = '5547999638736';

  /* Links de WhatsApp com mensagem pronta por contexto */
  document.querySelectorAll('a[data-msg]').forEach((a) => {
    a.href = `https://wa.me/${WHATS}?text=${encodeURIComponent(a.dataset.msg)}`;
  });

  /* Ano do rodapé */
  const ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* Menu mobile */
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('menu');
  const topo = document.getElementById('topo');
  const fecharMenu = () => {
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menu');
    menu.classList.remove('is-open');
    topo.classList.remove('menu-aberto');
  };
  burger?.addEventListener('click', () => {
    const aberto = burger.getAttribute('aria-expanded') === 'true';
    if (aberto) return fecharMenu();
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fechar menu');
    menu.classList.add('is-open');
    topo.classList.add('menu-aberto');
  });
  menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', fecharMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fecharMenu(); });

  /* Reveal ao rolar, com escalonamento entre irmãos */
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduz) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const irmaos = [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal'));
        el.style.setProperty('--d', `${Math.min(irmaos.indexOf(el), 6) * 0.08}s`);
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* Scroll: header, barra de progresso, parallax, linha dos passos, botão flutuante */
  const barra = document.querySelector('.progress span');
  const retrato = document.querySelector('[data-parallax]');
  const linha = document.getElementById('linha');
  const passos = linha ? [...linha.querySelectorAll('.passo')] : [];
  const zap = document.querySelector('.zap');
  const hero = document.querySelector('.hero');
  const links = [...document.querySelectorAll('.menu a')];
  const secoes = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  let tick = false;
  const aoRolar = () => {
    tick = false;
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (barra) barra.style.setProperty('--p', h > 0 ? (y / h).toFixed(4) : 0);
    topo.classList.toggle('is-scrolled', y > 12);
    if (zap && hero) zap.classList.toggle('is-on', y > hero.offsetHeight * 0.6);

    if (retrato && !reduz && window.innerWidth > 960 && y < window.innerHeight * 1.2) {
      retrato.style.setProperty('--py', `${(y * 0.08).toFixed(1)}px`);
    }

    if (linha) {
      const r = linha.getBoundingClientRect();
      const alvo = window.innerHeight * 0.6;
      const fill = Math.min(Math.max((alvo - r.top) / r.height, 0), 1);
      linha.style.setProperty('--fill', fill.toFixed(3));
      passos.forEach((p) => {
        const pr = p.getBoundingClientRect();
        p.classList.toggle('is-feito', pr.top + 28 < alvo);
      });
    }

    let atual = null;
    secoes.forEach((s) => { if (s.getBoundingClientRect().top < window.innerHeight * 0.4) atual = s; });
    links.forEach((a) => a.classList.toggle('is-atual', atual && a.getAttribute('href') === `#${atual.id}`));
  };
  window.addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(aoRolar); } }, { passive: true });
  window.addEventListener('resize', aoRolar);
  aoRolar();

  /* Brilho que segue o cursor nos botões */
  document.querySelectorAll('.btn').forEach((b) => {
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      b.style.setProperty('--mx', `${e.clientX - r.left}px`);
      b.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  /* Mapa do pé */
  const SPOTS = {
    encravada: {
      tag: 'Unhas',
      titulo: 'Unha encravada',
      texto: 'Dor no canto da unha, vermelhidão e aquele incômodo que piora com sapato fechado. Retiro a parte que está machucando com técnica e delicadeza, e te ensino a cortar do jeito certo para diminuir a chance de voltar.',
      msg: 'Oi, Fátima! Estou com unha encravada e quero agendar uma avaliação.'
    },
    micose: {
      tag: 'Unha grossa ou amarelada',
      titulo: 'Micose de unha e laserterapia',
      texto: 'Unha amarelada, grossa, esfarelando ou com manchas costuma ser sinal de micose. Avalio o caso e uso a laserterapia como aliada no tratamento: moderna, rápida e sem dor.',
      msg: 'Oi, Fátima! Acho que estou com micose na unha e quero saber sobre a laserterapia.'
    },
    calos: {
      tag: 'Planta do pé',
      titulo: 'Calos e calosidades',
      texto: 'Calo, olho de peixe e pele grossa na frente do pé fazem cada passo doer. Removo com cuidado e te explico o que está causando o atrito, do calçado ao jeito de pisar.',
      msg: 'Oi, Fátima! Estou com calo no pé e quero agendar.'
    },
    reflexo: {
      tag: 'Arco do pé',
      titulo: 'Reflexologia podal',
      texto: 'Massagem por pontos nos pés, pensada para aliviar tensão, estresse e ansiedade. Uma pausa de verdade para quem passa o dia em pé ou com a cabeça cheia.',
      msg: 'Oi, Fátima! Quero agendar uma sessão de reflexologia podal.'
    },
    calcanhar: {
      tag: 'Calcanhar',
      titulo: 'Calcanhar rachado',
      texto: 'Pele ressecada que abre em fissuras e às vezes até sangra. Trato a região, deixo o calcanhar macio de novo e te passo os cuidados para fazer em casa.',
      msg: 'Oi, Fátima! Estou com o calcanhar rachado e quero agendar.'
    }
  };
  const painel = document.getElementById('painel');
  const pTag = document.getElementById('painel-tag');
  const pTit = document.getElementById('painel-titulo');
  const pTxt = document.getElementById('painel-texto');
  const pCta = document.getElementById('painel-cta');
  const pontos = document.querySelectorAll('.ponto');

  const ativar = (btn) => {
    const s = SPOTS[btn.dataset.spot];
    if (!s || btn.classList.contains('is-ativo')) return;
    pontos.forEach((p) => { p.classList.remove('is-ativo'); p.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('is-ativo');
    btn.setAttribute('aria-pressed', 'true');
    pTag.textContent = s.tag;
    pTit.textContent = s.titulo;
    pTxt.textContent = s.texto;
    pCta.dataset.msg = s.msg;
    pCta.href = `https://wa.me/${WHATS}?text=${encodeURIComponent(s.msg)}`;
    painel.classList.remove('is-trocando');
    void painel.offsetWidth;
    painel.classList.add('is-trocando');
  };
  pontos.forEach((p) => {
    p.addEventListener('click', () => ativar(p));
    p.addEventListener('mouseenter', () => { if (window.matchMedia('(hover: hover)').matches) ativar(p); });
  });
})();
