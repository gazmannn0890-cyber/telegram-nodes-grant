// Telegram Nodes Login - Улучшенная система входа
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Инициализация системы входа...');
    
    // Элементы
    const loginForm = document.getElementById('login-form');
    const phoneInput = document.getElementById('login-phone');
    const passwordInput = document.getElementById('login-password');
    const togglePassword = document.getElementById('toggle-password');
    const loginBtn = document.getElementById('login-button');
    const demoBtn = document.getElementById('demo-login');
    const errorMessage = document.getElementById('login-error');
    const loadingOverlay = document.getElementById('login-loading');
    const progressBar = document.querySelector('.loading-progress-bar');
    
    // Маска телефона
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value[0] === '7' || value[0] === '8') {
                value = '7' + value.substring(1);
            } else if (value[0] === '9') {
                value = '7' + value;
            }
            
            let formatted = '+7';
            
            if (value.length > 1) {
                formatted += ' (' + value.substring(1, 4);
            }
            if (value.length >= 4) {
                formatted += ') ' + value.substring(4, 7);
            }
            if (value.length >= 7) {
                formatted += '-' + value.substring(7, 9);
            }
            if (value.length >= 9) {
                formatted += '-' + value.substring(9, 11);
            }
            
            e.target.value = formatted.substring(0, 18);
        }
    });
    
    // Показать/скрыть пароль
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? 
            '<i class="fas fa-eye"></i>' : 
            '<i class="fas fa-eye-slash"></i>';
    });
    
    // Ввод пароля
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleLogin();
        }
    });
    
    // Кнопка входа
    loginBtn.addEventListener('click', handleLogin);
    
    // Демо-вход
    demoBtn.addEventListener('click', function() {
        phoneInput.value = '+7 (900) 123-45-67';
        passwordInput.value = '111111';
        
        // Анимация автозаполнения
        phoneInput.style.animation = 'none';
        passwordInput.style.animation = 'none';
        setTimeout(() => {
            phoneInput.style.animation = 'pulse 0.5s';
            passwordInput.style.animation = 'pulse 0.5s 0.2s';
        }, 10);
        
        setTimeout(handleLogin, 500);
    });
    
    // Обработка входа
    function handleLogin() {
        const phone = phoneInput.value.replace(/\D/g, '');
        const password = passwordInput.value.trim();
        
        // Валидация
        if (!validatePhone(phone)) {
            showError('Введите корректный номер телефона');
            shakeElement(phoneInput);
            return;
        }
        
        if (!validatePassword(password)) {
            showError('Пароль должен содержать не менее 6 символов');
            shakeElement(passwordInput);
            return;
        }
        
        // Проверка учетных данных
        if (phone === '79001234567' && password === '111111') {
            authenticateUser();
        } else {
            showError('Неверный номер телефона или пароль');
            shakeElement(loginForm);
        }
    }
    
    // Валидация телефона
    function validatePhone(phone) {
        return phone.length === 11 && phone.startsWith('79');
    }
    
    // Валидация пароля
    function validatePassword(password) {
        return password.length >= 6;
    }
    
    // Показать ошибку
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
        
        // Скрыть через 5 секунд
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
        
        // Звук ошибки (если разрешено)
        if (window.AudioContext) {
            playErrorSound();
        }
    }
    
    // Аутентификация
    function authenticateUser() {
        // Показать загрузку
        loadingOverlay.classList.add('active');
        loginBtn.disabled = true;
        demoBtn.disabled = true;
        
        // Анимация прогресса
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                completeAuthentication();
            }
        }, 100);
    }
    
    // Завершение аутентификации
    function completeAuthentication() {
        // Сохранить в localStorage
        const authData = {
            isLoggedIn: true,
            phone: phoneInput.value,
            timestamp: Date.now(),
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 дней
        };
        
        localStorage.setItem('telegram-nodes-auth', JSON.stringify(authData));
        
        // Анимация успеха
        loadingOverlay.querySelector('.loading-text').textContent = 'Успешный вход!';
        
        setTimeout(() => {
            // Переход к основному приложению
            window.location.href = 'app.html'; // или другой переход
        }, 1000);
    }
    
    // Анимация тряски
    function shakeElement(element) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'shake 0.5s ease';
        }, 10);
    }
    
    // Звук ошибки
    function playErrorSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 300;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Audio not supported');
        }
    }
    
    // Проверить существующую сессию
    function checkExistingSession() {
        try {
            const savedAuth = localStorage.getItem('telegram-nodes-auth');
            if (savedAuth) {
                const authData = JSON.parse(savedAuth);
                if (authData.isLoggedIn && authData.expires > Date.now()) {
                    // Автоматический вход
                    console.log('Автоматический вход...');
                    authenticateUser();
                }
            }
        } catch (e) {
            console.error('Ошибка проверки сессии:', e);
        }
    }
    
    // Инициализация
    function init() {
        // Проверить сессию
        checkExistingSession();
        
        // Фокус на поле ввода
        setTimeout(() => {
            phoneInput.focus();
        }, 500);
        
        // Добавить CSS анимацию тряски
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
        
        console.log('✅ Система входа готова');
    }
    
    // Запуск
    init();
});
