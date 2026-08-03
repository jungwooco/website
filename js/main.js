/* 정우씨앤에어(주) — jungwooco.com */

document.addEventListener('DOMContentLoaded', function () {
  // 모바일 내비게이션 토글
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  // 푸터 연도
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 헤더 스크롤 상태
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    header.classList.toggle('scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // 스크롤 등장 애니메이션
  var revealTargets = document.querySelectorAll(
    '.section-head, .card, .spec, .fact, .service-item, .step, .about-copy, .info-table, .contact-card, .contact-form, .cta-inner, .map-wrap'
  );
  revealTargets.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = Math.min((i % 5) * 60, 240) + 'ms';
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in'); });
  }

  // 문의 폼 (Formspree)
  // 사용법: contact.html 의 <form data-formspree-id="..."> 에
  // Formspree 폼 ID를 넣으면 활성화됩니다. (README.md 참고)
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');
    var formspreeId = form.getAttribute('data-formspree-id') || '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!formspreeId) {
        status.className = 'form-status err';
        status.textContent =
          '폼 전송이 아직 연동되지 않았습니다. seanair@jungwooco.com 으로 메일 주시면 바로 회신드리겠습니다.';
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = '전송 중...';

      fetch('https://formspree.io/f/' + formspreeId, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            status.className = 'form-status ok';
            status.textContent = '문의가 접수되었습니다. 확인 후 회신드리겠습니다.';
          } else {
            throw new Error('submit failed');
          }
        })
        .catch(function () {
          status.className = 'form-status err';
          status.textContent =
            '전송에 실패했습니다. seanair@jungwooco.com 으로 직접 메일 주시기 바랍니다.';
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = '문의 보내기';
        });
    });
  }
});
