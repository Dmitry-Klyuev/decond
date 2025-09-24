// Мобильное меню
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if(targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if(targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });

      // Закрываем мобильное меню после клика
      if(navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    }
  });
});

// Анимация появления элементов при скролле
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Наблюдаем за карточками преимуществ
document.querySelectorAll('.feature-card').forEach(card => {
  observer.observe(card);
});

// Фиксация навигации при скролле
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if(window.scrollY > 100) {
    header.style.background = 'rgba(255,255,255,0.98)';
    header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.background = 'rgba(255,255,255,0.95)';
    header.style.boxShadow = '0 2px 10px rgba(139, 69, 19, 0.1)';
  }
});

// Обработка кнопок мессенджеров
document.querySelectorAll('.messenger-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Можно добавить аналитику или подтверждение
    console.log('Переход в мессенджер: ', this.href);
    // Здесь можно добавить счетчик аналитики
  });
});