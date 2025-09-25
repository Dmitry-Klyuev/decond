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

ymaps.ready(init);

function init() {
  const map = new ymaps.Map('map', {
    center: [53.082110, 30.053237],
    zoom: 13,
    controls: ['zoomControl', 'fullscreenControl']
  });

  // Точки на карте
  const points = [
    {
      id: 1,
      coords: [53.076641, 30.051692],
      title: 'Королевская тысяча',
      color: '#10B981', // green-500
      balloonContent: `
                <div class="p-4">
                    <h4 class="font-bold text-lg mb-2">Королевская тысяча</h4>
                    <p class="text-gray-600">г. Рогачев, ул. Ленина, д. 45</p>
                    <p class="text-gray-600">+375291082828</p>
                </div>
            `
    },
    {
      id: 2,
      coords: [53.087059, 30.050398],
      title: 'Евросток',
      color: '#3B82F6', // blue-500
      balloonContent: `
                <div class="p-4">
                    <h4 class="font-bold text-lg mb-2">Евросток</h4>
                    <p class="text-gray-600">г. Рогачев, ул. Урицкого, д. 110</p>
                    <p class="text-gray-600">+375296149873</p>
                </div>
            `
    },
  ];

  // Создаем метки
  points.forEach(point => {
    const placemark = new ymaps.Placemark(point.coords, {
      balloonContent: point.balloonContent,
      iconCaption: point.title
    }, {
      preset: 'islands#circleIcon',
      iconColor: point.color
    });

    map.geoObjects.add(placemark);
  });

  // Обработчики для списка точек
  document.querySelectorAll('.point-item').forEach(item => {
    item.addEventListener('click', function() {
      const pointId = parseInt(this.dataset.point);
      const point = points.find(p => p.id === pointId);

      if (point) {
        map.setCenter(point.coords, 15);

        // Удаляем активные классы у всех элементов
        document.querySelectorAll('.point-item').forEach(i => {
          i.classList.remove('bg-blue-50', 'border-l-4', 'border-green-500');
        });

        // Добавляем активные классы к текущему элементу
        this.classList.add('bg-blue-50', 'border-l-4', 'border-green-500');
      }
    });
  });
}