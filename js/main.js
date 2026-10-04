const siteRoot = document.body.dataset.root || '';
const currentPage = document.body.dataset.page || 'home';

const routes = [
  ['home', 'Home', `${siteRoot}index.html`],
  ['about', 'About', `${siteRoot}about.html`],
  ['services', 'Services', `${siteRoot}page/services.html`],
  ['project', 'Project', `${siteRoot}page/project.html`],
  ['faq', 'FAQ', `${siteRoot}page/faq.html`],
  ['blog', 'Blog', `${siteRoot}page/blog.html`],
  ['shop', 'Shop', `${siteRoot}page/shop.html`],
  ['contact', 'Contact', `${siteRoot}page/contact.html`],
];

class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.className = 'site-header';
    this.innerHTML = `
      <div class="container nav">
        <a class="brand" href="${siteRoot}index.html" aria-label="X-Tra home"><img src="${siteRoot}image/logo-x tra.png" alt="X-Tra" width="82" height="82"></a>
        <button class="nav__toggle" type="button" aria-controls="primary-nav" aria-expanded="false" aria-label="Open navigation"><i class="fa-solid fa-bars" aria-hidden="true"></i></button>
        <nav aria-label="Main navigation"><ul id="primary-nav" class="nav__links">${routes.map(([key, label, href]) => `<li><a href="${href}" ${key === currentPage ? 'aria-current="page"' : ''}>${label}</a></li>`).join('')}</ul></nav>
      </div>`;
    const button = this.querySelector('.nav__toggle');
    const links = this.querySelector('.nav__links');
    const close = () => {
      links.classList.remove('is-open');
      this.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Open navigation');
      button.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    };
    button.addEventListener('click', () => {
      const open = !links.classList.contains('is-open');
      if (!open) { close(); return; }
      links.classList.add('is-open');
      this.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('aria-label', 'Close navigation');
      button.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
    });
    links.addEventListener('click', event => { if (event.target.closest('a')) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 900) close(); });
    const onScroll = () => this.classList.toggle('is-scrolled', window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer"><div class="container footer__main">
        <div><a class="footer__logo" href="${siteRoot}index.html" aria-label="X-Tra home"><img src="${siteRoot}image/logo-x tra.png" alt="X-Tra" width="110" height="90"></a><p>Modern & minimal design for the spaces we live in.</p></div>
        <div><h3>Explore</h3><nav class="footer__nav" aria-label="Footer navigation">${routes.map(([, label, href]) => `<a href="${href}">${label}</a>`).join('')}</nav></div>
        <div class="footer__contact"><h3>Get in touch</h3><p>Have a space in mind? Let's talk about it.</p><a href="mailto:example@gmail.com">example@gmail.com</a><div class="footer__social"><a href="mailto:example@gmail.com" aria-label="Email X-Tra"><i class="fa-solid fa-envelope" aria-hidden="true"></i></a></div></div>
      </div><div class="footer__bottom"><div class="container">&copy; ${new Date().getFullYear()} X-Tra. All rights reserved.</div></div></footer>`;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => {
      item.classList.toggle('is-active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

const contactForm = document.querySelector('[data-contact-form]');
const requestedFilter = new URLSearchParams(window.location.search).get('category');
if (requestedFilter) document.querySelector(`[data-filter="${CSS.escape(requestedFilter)}"]`)?.click();

contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const fields = new FormData(contactForm);
  const subject = `X-Tra enquiry from ${fields.get('name')}`;
  const body = `Name: ${fields.get('name')}\nEmail: ${fields.get('email')}\nProject type: ${fields.get('type')}\n\n${fields.get('message')}`;
  window.location.href = `mailto:example@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('[data-form-status]').textContent = 'Your email app should open with the message ready to send.';
});
