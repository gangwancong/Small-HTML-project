/* ========================================
   Creative Studio — Interactive Behaviors
   ======================================== */

// --- DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {

  // ---- Navigation scroll effect ----
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Project filter tabs ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;

      projectCards.forEach((card, i) => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          card.style.display = '';
          card.style.animation = `fadeInUp 0.4s ease-out ${i * 0.05}s both`;
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ---- Scroll reveal animations ----
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // ---- Contact form validation ----
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');
  const btnArrow = submitBtn.querySelector('.btn-arrow');
  const formSuccess = document.getElementById('formSuccess');

  function showError(inputId, errorId, message) {
    const errorEl = document.getElementById(errorId);
    errorEl.textContent = message;
    const input = document.getElementById(inputId);
    input.setAttribute('aria-invalid', 'true');
    input.style.borderColor = 'var(--color-destructive)';
  }

  function clearError(inputId, errorId) {
    const errorEl = document.getElementById(errorId);
    errorEl.textContent = '';
    const input = document.getElementById(inputId);
    input.removeAttribute('aria-invalid');
    input.style.borderColor = '';
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Real-time validation on blur
  ['name', 'email', 'message'].forEach(field => {
    const input = document.getElementById(field);
    const error = document.getElementById(field + 'Error');

    input.addEventListener('blur', () => {
      if (!input.value.trim()) {
        showError(field, field + 'Error', '此字段为必填项。');
      } else if (field === 'email' && !validateEmail(input.value)) {
        showError(field, field + 'Error', '请输入有效的邮箱地址。');
      } else {
        clearError(field, field + 'Error');
      }
    });

    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true' && input.value.trim()) {
        if (field === 'email') {
          if (validateEmail(input.value)) clearError(field, field + 'Error');
        } else {
          clearError(field, field + 'Error');
        }
      }
    });
  });

    // 表单提交
    e.preventDefault();

    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // 验证姓名
    if (!name.value.trim()) {
      showError('name', 'nameError', '请输入你的名字。');
      isValid = false;
    } else {
      clearError('name', 'nameError');
    }

    // 验证邮箱
    if (!email.value.trim()) {
      showError('email', 'emailError', '请输入你的邮箱。');
      isValid = false;
    } else if (!validateEmail(email.value)) {
      showError('email', 'emailError', '请输入有效的邮箱地址。');
      isValid = false;
    } else {
      clearError('email', 'emailError');
    }

    // 验证留言
    if (!message.value.trim()) {
      showError('message', 'messageError', '请告诉我们你的项目信息。');
      isValid = false;
    } else {
      clearError('message', 'messageError');
    }

    if (!isValid) {
      // Focus first invalid field
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // 模拟提交
    btnText.textContent = '发送中...';
    btnSpinner.hidden = false;
    btnArrow.style.display = 'none';
    submitBtn.disabled = true;

    try {
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 成功状态
      form.reset();
      formSuccess.hidden = false;
      submitBtn.disabled = false;
      btnText.textContent = '发送消息';
      btnSpinner.hidden = true;
      btnArrow.style.display = '';

      // 隐藏成功提示
      setTimeout(() => {
        formSuccess.hidden = true;
      }, 5000);
    } catch (err) {
      btnText.textContent = 'Send Message';
      btnSpinner.hidden = true;
      btnArrow.style.display = '';
      submitBtn.disabled = false;
    }
  });

  // ---- Parallax-like subtle effect on hero shapes ----
  const shapes = document.querySelectorAll('.shape');

  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      shapes.forEach((shape, i) => {
        const speed = (i + 1) * 8;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px) rotate(${15 + x * 3}deg)`;
      });
    }, { passive: true });
  }

  // ---- Active nav link highlighting ----
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.querySelectorAll('.nav-link:not(.nav-link--cta)').forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--color-primary)';
          }
        });
      }
    });
  }, { passive: true });

});
