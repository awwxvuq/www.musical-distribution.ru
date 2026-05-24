/* ============================================
   javascript.js — Основной скрипт сайта
   ============================================ */

// Ждем полной загрузки DOM перед выполнением
document.addEventListener('DOMContentLoaded', () => {

    // Получаем необходимые элементы
    const navbar = document.getElementById('navbar');
    const allNavLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    // Защита: если навигация или ссылки не найдены, прекращаем выполнение
    if (!navbar || allNavLinks.length === 0) {
        console.warn('Элементы навигации не найдены. Скрипт не запущен.');
        return;
    }

    /* ============================================
       1. ОБРАБОТЧИК СКРОЛЛА
       - Меняет фон навбара
       - Подсвечивает активный пункт меню
       ============================================ */
    function handleScroll() {
        // Фон навбара при прокрутке
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Определение активной секции
        const scrollPos = window.scrollY + 150; // Отступ под фиксированный хедер
        let currentId = '';

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentId = section.getAttribute('id');
            }
        });

        // Обновляем активный класс у ссылок
        allNavLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${currentId}`;
            link.classList.toggle('active', isActive);
        });
    }

    // Привязываем обработчик скролла
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Вызываем сразу при загрузке, чтобы установить начальное состояние


    /* ============================================
       2. ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ
       ============================================ */
    allNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    /* ============================================
       3. АНИМАЦИЯ ПОЯВЛЕНИЯ (SCROLL REVEAL)
       ============================================ */
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target); // Прекращаем отслеживание после появления
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

}); // Конец DOMContentLoaded