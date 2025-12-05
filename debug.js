// debug.js - тестовый скрипт
console.log('=== DEBUG MODE ===');

// Проверяем библиотеки
console.log('Anime.js:', typeof anime !== 'undefined' ? '✅ Загружен' : '❌ Не загружен');
console.log('Particles.js:', typeof particlesJS !== 'undefined' ? '✅ Загружен' : '❌ Не загружен');

// Проверяем основные элементы
const elements = ['preloader', 'login-form', 'app-container'];
elements.forEach(id => {
    const el = document.getElementById(id);
    console.log(`${id}:`, el ? '✅ Найден' : '❌ Не найден');
});

// Автозапуск через 5 секунд
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && getComputedStyle(preloader).display !== 'none') {
        console.log('🚨 Автоматически скрываем прелоадер');
        preloader.style.display = 'none';
        
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.style.display = 'block';
        }
    }
}, 5000);
