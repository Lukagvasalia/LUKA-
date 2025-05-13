// Ждем загрузки DOM перед выполнением JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Функционал для мобильного меню
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    
    hamburgerMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(event) {
        const isClickInside = navMenu.contains(event.target) || hamburgerMenu.contains(event.target);
        
        if (!isClickInside && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
    
    // Функционал переключения языков
    const languageLinks = document.querySelectorAll('.language-content a');
    const languageBtn = document.querySelector('.language-btn');
    
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            
            // Обновляем текст кнопки
            languageBtn.textContent = lang.toUpperCase();
            
            // Вызываем функцию смены языка
            changeLanguage(lang);
        });
    });
    
    // Функция для смены языка
    function changeLanguage(lang) {
        console.log('Выбран язык:', lang);
        
        // Словарь переводов
        const translations = {
            'ru': {
                'home': 'Главная',
                'service': 'Услуги',
                'about': 'О нас',
                'contact': 'Контакты',
                'hero_title': 'ЭКИПИРОВКА ДЛЯ НАСТОЯЩИХ ПРИКЛЮЧЕНИЙ',
                'hero_text': 'Профессиональное снаряжение для охоты, экстремального туризма и выживания в самых суровых условиях природы',
                'about_btn': 'О нас'
            },
            'en': {
                'home': 'Home',
                'service': 'Service',
                'about': 'About',
                'contact': 'Contact',
                'hero_title': 'EQUIPMENT FOR REAL ADVENTURES',
                'hero_text': 'Professional gear for hunting, extreme tourism and survival in the most severe natural conditions',
                'about_btn': 'About me'
            },
            'ka': {
                'home': 'მთავარი',
                'service': 'სერვისი',
                'about': 'ჩვენს შესახებ',
                'contact': 'კონტაქტი',
                'hero_title': 'აღჭურვილობა ნამდვილი თავგადასავლებისთვის',
                'hero_text': 'პროფესიონალური აღჭურვილობა ნადირობისთვის, ექსტრემალური ტურიზმისთვის და გადარჩენისთვის ყველაზე მკაცრ ბუნებრივ პირობებში',
                'about_btn': 'ჩემ შესახებ'
            }
        };
        
        // Если у нас есть переводы для выбранного языка
        if (translations[lang]) {
            // Обновляем навигационные ссылки
            document.querySelectorAll('.nav-links a').forEach((link, index) => {
                const keys = ['home', 'service', 'about', 'contact'];
                if (keys[index]) {
                    link.textContent = translations[lang][keys[index]];
                }
            });
            
            // Обновляем контент героической секции
            const heroTitle = document.querySelector('.hero-title');
            const heroText = document.querySelector('.hero-text');
            const heroButton = document.querySelector('.hero-button');
            
            if (heroTitle) heroTitle.textContent = translations[lang]['hero_title'];
            if (heroText) heroText.textContent = translations[lang]['hero_text'];
            if (heroButton) heroButton.textContent = translations[lang]['about_btn'];
        }
        
        // Сохраняем выбранный язык в localStorage
        localStorage.setItem('selectedLanguage', lang);
    }
    
    // Проверяем, был ли ранее выбран язык
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && ['ru', 'en', 'ka'].includes(savedLanguage)) {
        languageBtn.textContent = savedLanguage.toUpperCase();
        // Применяем сохраненный язык
        changeLanguage(savedLanguage);
    }
    
    // Прокрутка к секциям при клике на ссылки навигации
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').replace('#', '');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60, // Компенсация высоты шапки
                    behavior: 'smooth'
                });
            }
            
            // Закрываем мобильное меню после клика
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
});