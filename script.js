// Keep the original pages intact while adding navigation and small-screen behavior.
const responsiveStyles = document.createElement('link');
responsiveStyles.rel = 'stylesheet';
responsiveStyles.href = 'css/legacy-responsive.css';
document.head.append(responsiveStyles);

document.addEventListener('DOMContentLoaded', () => {
  const destinations = {
    Home: 'index.html', About: 'about.html', Services: 'page/services.html',
    Project: 'page/project.html', FAQ: 'page/faq.html', Blog: 'page/blog.html',
    Shop: 'page/shop.html', Contact: 'page/contact.html'
  };

  document.querySelectorAll('.nav-link a').forEach(link => {
    const destination = destinations[link.textContent.trim()];
    if (destination) link.href = destination;
  });

  const nav = document.querySelector('.nav-link');
  const navbar = document.querySelector('.navbar');
  if (nav && navbar) {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'legacy-menu-toggle';
    toggle.setAttribute('aria-label', 'Open navigation');
    toggle.setAttribute('aria-controls', 'legacy-nav-list');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    nav.querySelector('ul').id = 'legacy-nav-list';
    navbar.insertBefore(toggle, nav);

    const close = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      toggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    };
    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      if (!open) return close();
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation');
      toggle.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
    });
    nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 900) close(); });
  }

  const categories = document.querySelectorAll('.category-cols a');
  ['interior', 'decoration', 'exterior', 'kitchen'].forEach((item, index) => {
    if (categories[index]) categories[index].href = `page/services.html#${item}`;
  });
  document.querySelectorAll('.more-infor a').forEach(link => { link.href = 'page/project.html'; });
  document.querySelectorAll('.our-services-cols-big-swap a, .about-me-text-item a').forEach(link => { link.href = 'page/contact.html'; });
  document.querySelectorAll('.shop-info-box a, .shop-info-box-extra a, .shop-info-box-extra-2 a, .shop-info-box-extra-3 a, .shop-info-box-extra-4 a').forEach(link => { link.href = 'page/shop.html'; });
  document.querySelectorAll('.footer-link-item a, .about-me-img-overlay a, .about-my-social-media a').forEach(link => {
    if (link.querySelector('.fa-envelope')) link.href = 'mailto:example@gmail.com';
    else link.removeAttribute('href');
  });
});
