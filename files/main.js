/* ============================================================
   main.js
   - Sticky header
   - Mobile nav
   - Scroll reveal
   - Contact form (with optional Formspree/Vercel integration)
   - Footer year
============================================================ */

// ── Footer year ──────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Sticky header ────────────────────────────────────────────
const header = document.getElementById('site-header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Mobile nav toggle ────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ── Scroll reveal ────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Contact form ─────────────────────────────────────────────
//
// HOW TO ENABLE FORM SUBMISSIONS:
//
// Option A — Formspree (easiest):
//   1. Create a free account at https://formspree.io
//   2. Create a new form, copy your endpoint URL
//   3. Set FORM_ENDPOINT below to your Formspree URL
//      e.g. 'https://formspree.io/f/xabcdefg'
//
// Option B — Vercel serverless function:
//   1. Create api/contact.js (see api/contact.example.js)
//   2. Set FORM_ENDPOINT to '/api/contact'
//
// Option C — Leave as '' to disable (form shows a placeholder message)
//
const FORM_ENDPOINT = ''; // ← PASTE YOUR ENDPOINT HERE

const form       = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    // Basic validation
    let valid = true;
    ['name', 'email', 'message'].forEach(id => {
      const input = form.querySelector(`#${id}`);
      if (!input.value.trim()) {
        input.classList.add('error');
        valid = false;
      }
    });

    const emailInput = form.querySelector('#email');
    if (emailInput.value && !isValidEmail(emailInput.value)) {
      emailInput.classList.add('error');
      valid = false;
    }

    if (!valid) {
      showStatus('Please fill in all required fields correctly.', 'error-msg');
      return;
    }

    if (!FORM_ENDPOINT) {
      // Demo mode — no endpoint configured
      showStatus('✓ Message received! (Configure FORM_ENDPOINT in main.js to enable real submissions.)', 'success');
      form.reset();
      return;
    }

    // Submit
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const data = Object.fromEntries(new FormData(form));
      const res  = await fetch(FORM_ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body:    JSON.stringify(data),
      });

      if (res.ok) {
        showStatus('✓ Message sent! We\'ll be in touch soon.', 'success');
        form.reset();
      } else {
        throw new Error('Server error');
      }
    } catch {
      showStatus('Something went wrong. Please try again or email us directly.', 'error-msg');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  });

  // Clear error state on input
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => input.classList.remove('error'));
  });
}

function showStatus(msg, cls) {
  formStatus.textContent = msg;
  formStatus.className   = `form__status ${cls}`;
}

function clearErrors() {
  formStatus.textContent = '';
  formStatus.className   = 'form__status';
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Smooth anchor offset (accounts for fixed header) ─────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 16;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
