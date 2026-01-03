let lastScrollTop = 0;
const navbar = document.querySelector('.nav-bar');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down → hide navbar
    navbar.style.top = '-80px';
  } else {
    // Scrolling up → show navbar
    navbar.style.top = '0';
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
});


const categories = document.querySelectorAll('.category');
categories.forEach(cat => cat.s = 'none'); // Hide all categories initially