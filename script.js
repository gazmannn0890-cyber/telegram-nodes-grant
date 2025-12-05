// Telegram Nodes - Полностью исправленная версия с добавлениями
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Telegram Nodes запускается...');
    
    // ========== КОНФИГУРАЦИЯ ==========
    const config = {
        appName: 'Telegram Nodes',
        version: '2.1',
        developer: 'Газман',
        defaultTheme: 'dark',
        features: {
            nodes: true,
            chats: true,
            calls: true,
            games: true,
            notifications: true,
            emoji: true,
            conference: true
        }
    };
    
    // ========== АНИМАЦИИ И ЭФФЕКТЫ ==========
    const AnimationManager = {
        init() {
            this.addAnimationStyles();
            this.setupRippleEffects();
        },
        
        addAnimationStyles() {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(0, 136, 204, 0.3); }
                    50% { box-shadow: 0 0 40px rgba(0, 136, 204, 0.6); }
                }
                
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .ripple-effect {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                }
                
                .float-animation {
                    animation: float 3s ease-in-out infinite;
                }
                
                .pulse-animation {
                    animation: pulse 2s infinite;
                }
                
                .glow-animation {
                    animation: glow 2s infinite;
                }
                
                .slide-in-up {
                    animation: slideInUp 0.5s ease forwards;
                }
                
                .fade-in {
                    animation: fadeIn 0.5s ease forwards;
                }
            `;
            document.head.appendChild(style);
        },
        
        setupRippleEffects() {
            document.addEventListener('mousedown', function(e) {
                if (e.target.closest('button, .btn, .chat-card, .node-item, .contact-item')) {
                    const element = e.target.closest('button, .btn, .chat-card, .node-item, .contact-item');
                    if (element.classList.contains('no-ripple')) return;
                    
                    const rect = element.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    const ripple = document.createElement('span');
                    ripple.className = 'ripple-effect';
                    ripple.style.cssText = `
                        width: ${size}px;
                        height: ${size}px;
                        top: ${y}px;
                        left: ${x}px;
                    `;
                    
                    element.style.position = 'relative';
                    element.style.overflow = 'hidden';
                    element.appendChild(ripple);
                    
                    setTimeout(() => ripple.remove(), 600);
                }
            });
        },
        
        createRipple(event) {
            const btn = event.currentTarget;
            const ripple = document.createElement('span');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.className = 'ripple-effect';
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;
            
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        },
        
        animateElement(element, animation) {
            element.classList.add(animation);
            setTimeout(() => {
                element.classList.remove(animation);
            }, 2000);
        },
        
        addHoverEffects() {
            // Добавляем эффекты при наведении для всех интерактивных элементов
            const interactiveElements = document.querySelectorAll(
                'button, .btn, .chat-card, .node-item, .contact-item, .activity-item, .game-item'
            );
            
            interactiveElements.forEach(element => {
                element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                
                element.addEventListener('mouseenter', () => {
                    if (element.classList.contains('chat-card')) {
                        element.style.transform = 'translateY(-4px)';
                        element.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.6)';
                    } else if (element.classList.contains('node-item') || 
                               element.classList.contains('contact-item')) {
                        element.style.transform = 'translateX(4px)';
                    }
                });
                
                element.addEventListener('mouseleave', () => {
                    element.style.transform = '';
                    element.style.boxShadow = '';
                });
            });
        }
    };
    
    // ========== СИСТЕМА ВХОДА ==========
    const LoginSystem = {
        config: {
            credentials: {
                phone: '900123456',
                password: '111111'
            },
            demoUser: {
                name: 'Газман',
                username: '@gazman',
                avatar: 'Г'
            }
        },
        
        elements: {
            loginForm: null,
            loginPhone: null,
            loginPassword: null,
            loginButton: null,
            demoLogin: null,
            loginError: null,
            loginLoading: null
        },
        
        init() {
            this.cacheElements();
            this.setupEventListeners();
            this.initParticles();
            
            // Показываем форму входа с задержкой
            setTimeout(() => {
                this.showLoginForm();
            }, 1000);
        },
        
        cacheElements() {
            this.elements.loginForm = document.getElementById('login-form');
            this.elements.loginPhone = document.getElementById('login-phone');
            this.elements.loginPassword = document.getElementById('login-password');
            this.elements.loginButton = document.getElementById('login-button');
            this.elements.demoLogin = document.getElementById('demo-login');
            this.elements.loginError = document.getElementById('login-error');
            this.elements.loginLoading = document.getElementById('login-loading');
        },
        
        initParticles() {
            if (typeof particlesJS !== 'undefined') {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 80, density: { enable: true, value_area: 800 } },
                        color: { value: ["#0088cc", "#af52de", "#34c759", "#ff9500"] },
                        shape: { type: "circle" },
                        opacity: { value: 0.5, random: true },
                        size: { value: 3, random: true },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: "#0088cc",
                            opacity: 0.2,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: "none",
                            random: true,
                            straight: false,
                            out_mode: "out",
                            bounce: false
                        }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onhover: { enable: true, mode: "repulse" },
                            onclick: { enable: true, mode: "push" },
                            resize: true
                        }
                    },
                    retina_detect: true
                });
            }
        },
        
        showLoginForm() {
            this.elements.loginForm.classList.add('active');
            this.elements.loginPhone.focus();
        },
        
        setupEventListeners() {
            this.elements.loginButton.addEventListener('click', (e) => {
                AnimationManager.createRipple(e);
                this.handleLogin();
            });
            
            this.elements.demoLogin.addEventListener('click', (e) => {
                AnimationManager.createRipple(e);
                this.handleDemoLogin();
            });
            
            this.elements.loginPassword.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleLogin();
                }
            });
            
            // Забыли пароль
            document.getElementById('forgot-password').addEventListener('click', (e) => {
                e.preventDefault();
                this.showForgotPassword();
            });
            
            // Регистрация
            document.getElementById('register-link').addEventListener('click', (e) => {
                e.preventDefault();
                this.showRegistration();
            });
        },
        
        handleLogin() {
            const phone = this.elements.loginPhone.value.trim();
            const password = this.elements.loginPassword.value.trim();
            
            if (!phone || !password) {
                this.showError('Заполните все поля');
                return;
            }
            
            if (phone === this.config.credentials.phone && 
                password === this.config.credentials.password) {
                this.authenticate();
            } else {
                this.showError('Неверный номер телефона или пароль');
            }
        },
        
        handleDemoLogin() {
            this.elements.loginPhone.value = this.config.credentials.phone;
            this.elements.loginPassword.value = this.config.credentials.password;
            this.authenticate();
        },
        
        showError(message) {
            this.elements.loginError.textContent = message;
            this.elements.loginError.style.display = 'block';
            AnimationManager.animateElement(this.elements.loginError, 'pulse-animation');
            
            setTimeout(() => {
                this.elements.loginError.style.display = 'none';
            }, 3000);
        },
        
        authenticate() {
            this.showLoading(true);
            
            // Имитация задержки сети
            setTimeout(() => {
                this.showLoading(false);
                this.onLoginSuccess();
            }, 1500);
        },
        
        showLoading(show) {
            if (show) {
                this.elements.loginButton.disabled = true;
                this.elements.loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Вход...';
                this.elements.loginLoading.classList.add('active');
            } else {
                this.elements.loginButton.disabled = false;
                this.elements.loginButton.innerHTML = '<i class="fab fa-telegram-plane"></i> Войти через Telegram';
                this.elements.loginLoading.classList.remove('active');
            }
        },
        
        onLoginSuccess() {
            // Анимация успешного входа
            this.elements.loginForm.style.opacity = '0';
            this.elements.loginForm.style.transform = 'translate(-50%, -60%) scale(0.9)';
            
            setTimeout(() => {
                this.elements.loginForm.style.display = 'none';
                // Запускаем основное приложение
                MainApp.init();
            }, 500);
        },
        
        showForgotPassword() {
            // Временная реализация
            alert('Функция восстановления пароля в разработке. Используйте демо-логин.');
        },
        
        showRegistration() {
            // Временная реализация
            alert('Функция регистрации в разработке. Используйте демо-логин.');
        }
    };
    
    // ========== ОСНОВНОЕ ПРИЛОЖЕНИЕ ==========
    const MainApp = {
        isInitialized: false,
        
        init() {
            if (this.isInitialized) return;
            
            console.log('🎯 Инициализация основного приложения...');
            
            // Инициализируем анимации
            AnimationManager.init();
            AnimationManager.addHoverEffects();
            
            // Устанавливаем тему
            this.setTheme(state.theme);
            
            // Запускаем прелоадер приложения
            this.simulatePreloader();
            
            // Рендер данных
            this.renderProfile();
            this.renderNodes();
            this.renderContacts();
            this.renderActivity();
            this.updateCurrentNode();
            this.renderChats();
            this.renderEmojis();
            
            // Настройка обработчиков событий
            this.setupEventListeners();
            
            // Показать приветственное уведомление
            setTimeout(() => {
                this.showNotification('Добро пожаловать, Газман!', 'Telegram Nodes готов к работе', 'success');
                AnimationManager.animateElement(elements.profileCard, 'pulse-animation');
            }, 1500);
            
            // Симулировать активность
            this.simulateActivity();
            
            this.isInitialized = true;
        },
        
        simulatePreloader() {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress > 100) progress = 100;
                
                elements.progressFill.style.width = `${progress}%`;
                
                // Обновление статистики с анимацией счетчика
                if (progress >= 25) {
                    this.animateCounter(elements.statChats, appData.user.stats.chats);
                }
                if (progress >= 50) {
                    this.animateCounter(elements.statNodes, appData.user.stats.nodes);
                }
                if (progress >= 75) {
                    this.animateCounter(elements.statOnline, appData.user.stats.online);
                }
                
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        elements.preloader.classList.add('fade-out');
                        setTimeout(() => {
                            elements.preloader.style.display = 'none';
                            elements.appContainer.style.opacity = '1';
                            console.log('✅ Приложение загружено');
                        }, 300);
                    }, 500);
                }
            }, 100);
        },
        
        animateCounter(element, targetValue) {
            let current = parseInt(element.textContent) || 0;
            const increment = Math.ceil((targetValue - current) / 20);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetValue) {
                    current = targetValue;
                    clearInterval(timer);
                }
                element.textContent = current;
            }, 30);
        },
        
        // ========== ДАННЫЕ ПРИЛОЖЕНИЯ ==========
        appData: {
            user: {
                id: 1,
                name: 'Газман',
                username: '@gazman',
                avatar: 'Г',
                status: 'Основатель Telegram Nodes',
                online: true,
                bio: 'Любитель кофе и технологий • Разработчик',
                stats: {
                    chats: 156,
                    contacts: 48,
                    nodes: 7,
                    online: 1
                }
            },
            
            nodes: [
                {
                    id: 'alpha',
                    name: 'AlphaTeam',
                    icon: 'fas fa-rocket',
                    color: '#0088cc',
                    description: 'Рабочая команда разработки',
                    members: 24,
                    online: 12,
                    unread: 3,
                    created: '2024-01-15'
                },
                {
                    id: 'game',
                    name: 'GameZone',
                    icon: 'fas fa-gamepad',
                    color: '#af52de',
                    description: 'Игровое сообщество',
                    members: 48,
                    online: 23,
                    unread: 0,
                    created: '2024-02-20'
                },
                {
                    id: 'family',
                    name: 'Family',
                    icon: 'fas fa-heart',
                    color: '#34c759',
                    description: 'Семейный чат',
                    members: 12,
                    online: 4,
                    unread: 1,
                    created: '2024-03-05'
                },
                {
                    id: 'design',
                    name: 'DesignHub',
                    icon: 'fas fa-palette',
                    color: '#ff9500',
                    description: 'Дизайн и креатив',
                    members: 18,
                    online: 8,
                    unread: 0,
                    created: '2024-03-10'
                }
            ],
            
            chats: [
                {
                    id: 'design-team',
                    node: 'alpha',
                    name: 'Дизайн-команда',
                    type: 'group',
                    avatar: 'Д',
                    color: '#0088cc',
                    lastMessage: 'Обсуждаем новый UI для проекта...',
                    time: '12:30',
                    unread: 3,
                    members: 8,
                    online: 5,
                    pinned: true,
                    verified: false
                },
                {
                    id: 'reports-q3',
                    node: 'alpha',
                    name: 'Отчеты Q3',
                    type: 'channel',
                    avatar: 'О',
                    color: '#0088cc',
                    lastMessage: 'Все отчеты готовы к отправке',
                    time: 'Пт',
                    unread: 0,
                    members: 2,
                    online: 1,
                    pinned: false,
                    verified: true
                },
                {
                    id: 'cybersport',
                    node: 'game',
                    name: 'Киберспорт турнир',
                    type: 'group',
                    avatar: 'К',
                    color: '#af52de',
                    lastMessage: 'Стартуем в 20:00, не опаздывайте!',
                    time: '11:45',
                    unread: 0,
                    members: 24,
                    online: 16,
                    pinned: true,
                    verified: false
                },
                {
                    id: 'durov-chat',
                    node: 'alpha',
                    name: 'Павел Дуров',
                    type: 'personal',
                    avatar: 'ПД',
                    color: '#0088cc',
                    lastMessage: 'Новый функционал выглядит отлично!',
                    time: '10:30',
                    unread: 1,
                    members: 2,
                    online: 1,
                    pinned: true,
                    verified: true
                },
                {
                    id: 'cs2-tournament',
                    node: 'game',
                    name: 'CS2 Чемпионат',
                    type: 'group',
                    avatar: 'CS',
                    color: '#af52de',
                    lastMessage: 'Регистрация до 25 марта',
                    time: 'Вчера',
                    unread: 5,
                    members: 32,
                    online: 12,
                    pinned: false,
                    verified: true
                },
                {
                    id: 'family-chat',
                    node: 'family',
                    name: 'Семейный чат',
                    type: 'group',
                    avatar: 'С',
                    color: '#34c759',
                    lastMessage: 'Кто за пиццей сегодня?',
                    time: '09:15',
                    unread: 0,
                    members: 12,
                    online: 3,
                    pinned: false,
                    verified: false
                }
            ],
            
            contacts: [
                {
                    id: 1,
                    name: 'Алексей',
                    avatar: 'А',
                    status: 'online',
                    lastSeen: 'только что',
                    activity: 'В звонке',
                    color: '#0088cc'
                },
                {
                    id: 2,
                    name: 'Мария',
                    avatar: 'М',
                    status: 'typing',
                    lastSeen: 'печатает...',
                    activity: 'Онлайн',
                    color: '#af52de'
                },
                {
                    id: 3,
                    name: 'Павел Дуров',
                    avatar: 'ПД',
                    status: 'online',
                    lastSeen: '5 мин назад',
                    activity: 'В конференции',
                    color: '#34c759',
                    verified: true
                },
                {
                    id: 4,
                    name: 'Дмитрий',
                    avatar: 'Д',
                    status: 'online',
                    lastSeen: '2 ч назад',
                    activity: 'CS2 онлайн',
                    color: '#ff9500'
                },
                {
                    id: 5,
                    name: 'Екатерина',
                    avatar: 'Е',
                    status: 'offline',
                    lastSeen: 'вчера',
                    activity: 'Был(-а) 2 дня назад',
                    color: '#ff3b30'
                }
            ],
            
            activity: [
                {
                    id: 1,
                    user: 'Алексей',
                    action: 'calling',
                    text: 'Начинает звонок',
                    time: '2 мин назад',
                    icon: 'fas fa-phone'
                },
                {
                    id: 2,
                    user: 'Мария',
                    action: 'typing',
                    text: 'Печатает сообщение',
                    time: '5 мин назад',
                    icon: 'fas fa-keyboard'
                },
                {
                    id: 3,
                    user: 'Дмитрий',
                    action: 'gaming',
                    text: 'Играет в CS2',
                    time: '15 мин назад',
                    icon: 'fas fa-gamepad'
                },
                {
                    id: 4,
                    user: 'Павел Дуров',
                    action: 'conference',
                    text: 'В групповой конференции',
                    time: '30 мин назад',
                    icon: 'fas fa-users'
                }
            ],
            
            emojis: {
                smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯'],
                people: ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🦷', '🦴', '👀', '👁️', '👅', '👄'],
                nature: ['🐵', '🐒', '🦍', '🐶', '🐕', '🦮', '🐕‍🦺', '🐩', '🐺', '🦊', '🦝', '🐱', '🐈', '🦁', '🐯', '🐅', '🐆', '🐴', '🐎', '🦄', '🦓', '🦌', '🐮', '🐂', '🐃', '🐄', '🐷', '🐖', '🐗', '🐽', '🐏', '🐑', '🐐', '🐪', '🐫', '🦙', '🦒', '🐘', '🦏', '🦛', '🐭', '🐁', '🐀', '🐹', '🐰', '🐇', '🐿️'],
                objects: ['⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🎮', '🕹️', '🗜️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️', '⏲️', '⏰', '🕰️', '⌛', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯️', '🧯']
            },
            
            messages: {
                'design-team': [
                    {
                        id: 1,
                        sender: 'Мария',
                        text: 'Привет! Как продвигается работа над новым дизайном?',
                        time: '12:15',
                        type: 'incoming',
                        status: 'read'
                    },
                    {
                        id: 2,
                        sender: 'Вы',
                        text: 'Почти закончили! Осталось сделать анимации переходов',
                        time: '12:20',
                        type: 'outgoing',
                        status: 'read'
                    },
                    {
                        id: 3,
                        sender: 'Алексей',
                        text: 'Отлично! Когда сможете показать прототип?',
                        time: '12:25',
                        type: 'incoming',
                        status: 'read'
                    }
                ],
                'durov-chat': [
                    {
                        id: 1,
                        sender: 'Павел Дуров',
                        text: 'Привет! Вижу ты работаешь над новым интерфейсом для Telegram.',
                        time: '18:45',
                        type: 'incoming',
                        status: 'read',
                        verified: true
                    },
                    {
                        id: 2,
                        sender: 'Вы',
                        text: 'Да, Павел! Делаю улучшенную версию с узлами и конференциями.',
                        time: '19:20',
                        type: 'outgoing',
                        status: 'read'
                    }
                ]
            }
        },
        
        // ========== СОСТОЯНИЕ ПРИЛОЖЕНИЯ ==========
        state: {
            theme: localStorage.getItem('theme') || config.defaultTheme,
            activeNode: 'alpha',
            activeChat: null,
            searchQuery: '',
            currentFilter: 'all',
            currentSort: 'time',
            notifications: [],
            isSidebarVisible: window.innerWidth > 768,
            isTyping: false,
            isEmojiPanelOpen: false,
            isConferenceActive: false,
            conferenceTimer: 0,
            conferenceTimerInterval: null,
            isLoggedIn: false,
            isAuthenticating: false
        },
        
        // ========== DOM ЭЛЕМЕНТЫ ==========
        elements: {
            // Прелоадер
            preloader: document.getElementById('preloader'),
            progressFill: document.getElementById('progress-fill'),
            statChats: document.getElementById('stat-chats'),
            statNodes: document.getElementById('stat-nodes'),
            statOnline: document.getElementById('stat-online'),
            
            // Основные контейнеры
            appContainer: document.getElementById('app-container'),
            sidebar: document.getElementById('sidebar'),
            mainContent: document.getElementById('main-content'),
            chatPanel: document.getElementById('chat-panel'),
            conferencePanel: document.getElementById('conference-panel'),
            
            // Профиль
            profileCard: document.getElementById('profile-card'),
            profileMenuBtn: document.getElementById('profile-menu-btn'),
            profileModal: document.getElementById('profile-modal'),
            profileModalOverlay: document.getElementById('profile-modal-overlay'),
            closeProfileModal: document.getElementById('close-profile-modal'),
            
            // Поиск
            globalSearch: document.getElementById('global-search'),
            searchClear: document.getElementById('search-clear'),
            
            // Узлы
            nodesList: document.getElementById('nodes-list'),
            currentNode: document.getElementById('current-node'),
            
            // Контакты
            contactsList: document.getElementById('contacts-list'),
            
            // Активность
            activityList: document.getElementById('activity-list'),
            refreshActivityBtn: document.getElementById('refresh-activity-btn'),
            
            // Чаты
            chatsContainer: document.getElementById('chats-container'),
            emptyState: document.getElementById('empty-state'),
            
            // Хедер
            backBtn: document.getElementById('back-btn'),
            notificationsBtn: document.getElementById('notifications-btn'),
            themeToggle: document.getElementById('theme-toggle'),
            newChatBtn: document.getElementById('new-chat-btn'),
            startChatBtn: document.getElementById('start-chat-btn'),
            
            // Фильтры
            filterButtons: document.querySelectorAll('.filter-btn'),
            sortButtons: document.querySelectorAll('.sort-btn'),
            
            // Чат панель
            closeChatBtn: document.getElementById('close-chat-btn'),
            chatAvatar: document.getElementById('chat-avatar'),
            chatTitle: document.getElementById('chat-title'),
            chatStatus: document.getElementById('chat-status'),
            messagesContainer: document.getElementById('messages-container'),
            messageInput: document.getElementById('message-input'),
            sendBtn: document.getElementById('send-btn'),
            emojiToggleBtn: document.getElementById('emoji-toggle-btn'),
            emojiPanel: document.getElementById('emoji-panel'),
            emojiGrid: document.getElementById('emoji-grid'),
            emojiCategories: document.querySelectorAll('.emoji-category'),
            
            // Видеоконференция
            startConferenceBtn: document.getElementById('start-conference-btn'),
            closeConferenceBtn: document.getElementById('close-conference-btn'),
            conferenceTimer: document.getElementById('conference-timer'),
            conferenceGrid: document.getElementById('conference-grid'),
            confMuteBtn: document.getElementById('conf-mute-btn'),
            confVideoBtn: document.getElementById('conf-video-btn'),
            confEndBtn: document.getElementById('conf-end-btn'),
            
            // Уведомления
            notificationsContainer: document.getElementById('notifications-container')
        },
        
        // ========== РЕНДЕР ФУНКЦИИ ==========
        renderProfile() {
            const user = this.appData.user;
            const profileCard = this.elements.profileCard;
            
            if (profileCard) {
                const avatar = profileCard.querySelector('.avatar');
                const name = profileCard.querySelector('.profile-name');
                const status = profileCard.querySelector('.profile-status');
                
                if (avatar) avatar.textContent = user.avatar;
                if (name) name.textContent = user.name;
                if (status) status.textContent = `${user.username} • ${user.status}`;
            }
        },
        
        renderNodes() {
            const container = this.elements.nodesList;
            if (!container) return;
            
            container.innerHTML = '';
            
            this.appData.nodes.forEach((node, index) => {
                const nodeElement = document.createElement('div');
                nodeElement.className = `node-item ${this.state.activeNode === node.id ? 'active' : ''}`;
                nodeElement.dataset.node = node.id;
                
                nodeElement.innerHTML = `
                    <div class="node-icon" style="background: ${node.color}">
                        <i class="${node.icon}"></i>
                    </div>
                    <div class="node-info">
                        <div class="node-name">${node.name}</div>
                        <div class="node-description">${node.members} участников • ${node.online} онлайн</div>
                    </div>
                    ${node.unread > 0 ? `<span class="unread-badge pulse-animation">${node.unread}</span>` : ''}
                `;
                
                nodeElement.addEventListener('click', (e) => {
                    AnimationManager.createRipple(e);
                    setTimeout(() => this.switchNode(node.id), 150);
                });
                
                container.appendChild(nodeElement);
                
                // Анимация появления
                setTimeout(() => {
                    nodeElement.classList.add('slide-in-up');
                    nodeElement.style.animationDelay = `${index * 0.05}s`;
                }, 10);
            });
        },
        
        renderContacts() {
            const container = this.elements.contactsList;
            if (!container) return;
            
            container.innerHTML = '';
            
            this.appData.contacts.forEach((contact, index) => {
                const contactElement = document.createElement('div');
                contactElement.className = 'contact-item';
                contactElement.dataset.contact = contact.id;
                
                contactElement.innerHTML = `
                    <div class="contact-avatar" style="background: ${contact.color}">
                        ${contact.avatar}
                        <div class="contact-status ${contact.status}"></div>
                    </div>
                    <div class="contact-info">
                        <div class="contact-name">${contact.name} ${contact.verified ? '<i class="fas fa-check-circle" style="color: #34c759; font-size: 12px;"></i>' : ''}</div>
                        <div class="contact-last-seen">${contact.lastSeen}</div>
                    </div>
                `;
                
                contactElement.addEventListener('click', (e) => {
                    AnimationManager.createRipple(e);
                    this.showNotification(contact.name, 'Открыть чат с контактом', 'info');
                });
                
                container.appendChild(contactElement);
                
                // Анимация появления
                setTimeout(() => {
                    contactElement.classList.add('slide-in-up');
                    contactElement.style.animationDelay = `${index * 0.05}s`;
                }, 10);
            });
        },
        
        renderActivity() {
            const container = this.elements.activityList;
            if (!container) return;
            
            container.innerHTML = '';
            
            this.appData.activity.forEach((activity, index) => {
                const activityElement = document.createElement('div');
                activityElement.className = 'activity-item';
                
                activityElement.innerHTML = `
                    <div class="activity-icon">
                        <i class="${activity.icon}"></i>
                    </div>
                    <div class="activity-info">
                        <div class="activity-text">
                            <strong>${activity.user}</strong> ${activity.text}
                        </div>
                        <div class="activity-time">${activity.time}</div>
                    </div>
                `;
                
                container.appendChild(activityElement);
                
                // Анимация появления
                setTimeout(() => {
                    activityElement.classList.add('slide-in-up');
                    activityElement.style.animationDelay = `${index * 0.05}s`;
                }, 10);
            });
        },
        
        updateCurrentNode() {
            const node = this.appData.nodes.find(n => n.id === this.state.activeNode);
            if (!node) return;
            
            const container = this.elements.currentNode;
            if (!container) return;
            
            const icon = container.querySelector('.node-icon');
            const name = container.querySelector('.node-name');
            const description = container.querySelector('.node-description');
            
            if (icon) {
                icon.innerHTML = `<i class="${node.icon}"></i>`;
                icon.style.background = `linear-gradient(135deg, ${node.color}, ${node.color}dd)`;
                AnimationManager.animateElement(icon, 'pulse-animation');
            }
            if (name) name.textContent = node.name;
            if (description) description.textContent = `${node.members} участников • ${node.online} онлайн`;
        },
        
        renderChats() {
            const container = this.elements.chatsContainer;
            const emptyState = this.elements.emptyState;
            
            if (!container || !emptyState) return;
            
            // Фильтрация чатов
            let filteredChats = this.appData.chats.filter(chat => {
                // Фильтр по узлу
                if (chat.node !== this.state.activeNode) return false;
                
                // Фильтр по поиску
                if (this.state.searchQuery) {
                    const query = this.state.searchQuery.toLowerCase();
                    return chat.name.toLowerCase().includes(query) || 
                           chat.lastMessage.toLowerCase().includes(query);
                }
                
                // Индивидуальные фильтры
                switch (this.state.currentFilter) {
                    case 'unread':
                        return chat.unread > 0;
                    case 'personal':
                        return chat.type === 'personal';
                    case 'group':
                        return chat.type === 'group';
                    case 'channel':
                        return chat.type === 'channel';
                    case 'pinned':
                        return chat.pinned === true;
                    default:
                        return true;
                }
            });
            
            // Сортировка
            filteredChats.sort((a, b) => {
                if (this.state.currentSort === 'unread') {
                    return b.unread - a.unread;
                } else {
                    // Сортировка по времени
                    const timeOrder = { '12:30': 1, '11:45': 2, '10:30': 3, 'Пт': 4, 'Вчера': 5, '09:15': 6 };
                    return (timeOrder[a.time] || 99) - (timeOrder[b.time] || 99);
                }
            });
            
            container.innerHTML = '';
            
            if (filteredChats.length === 0) {
                emptyState.classList.add('active');
                AnimationManager.animateElement(emptyState, 'fade-in');
                return;
            }
            
            emptyState.classList.remove('active');
            
            filteredChats.forEach((chat, index) => {
                const chatCard = document.createElement('div');
                chatCard.className = 'chat-card';
                chatCard.dataset.chatId = chat.id;
                
                // Создание миниатюр участников
                const memberAvatars = Array.from(
                    { length: Math.min(3, chat.members) }, 
                    (_, i) => `<div class="member-avatar float-animation" style="animation-delay: ${i * 0.2}s">${i + 1}</div>`
                ).join('');
                
                chatCard.innerHTML = `
                    <div class="chat-card-header">
                        <div class="chat-avatar" style="background: ${chat.color}">
                            ${chat.avatar}
                        </div>
                        <div class="chat-info">
                            <div class="chat-title-row">
                                <h4 class="chat-name">${chat.name}</h4>
                                <span class="chat-time">${chat.time}</span>
                            </div>
                            <p class="chat-preview">${chat.lastMessage}</p>
                        </div>
                    </div>
                    <div class="chat-card-footer">
                        <div class="chat-members">
                            <div class="member-avatars">
                                ${memberAvatars}
                                ${chat.members > 3 ? `<div class="member-avatar">+${chat.members - 3}</div>` : ''}
                            </div>
                            <span>${chat.members} участников</span>
                        </div>
                        <div class="chat-badges">
                            ${chat.pinned ? '<i class="fas fa-thumbtack float-animation" style="color: #ff9500; margin-right: 8px;"></i>' : ''}
                            ${chat.unread > 0 ? `<span class="unread-badge pulse-animation">${chat.unread}</span>` : ''}
                        </div>
                    </div>
                `;
                
                chatCard.addEventListener('click', (e) => {
                    AnimationManager.createRipple(e);
                    setTimeout(() => this.openChat(chat.id), 150);
                });
                
                container.appendChild(chatCard);
                
                // Анимация появления
                setTimeout(() => {
                    chatCard.classList.add('slide-in-up');
                    chatCard.style.animationDelay = `${index * 0.05}s`;
                }, 10);
            });
        },
        
        renderEmojis() {
            const container = this.elements.emojiGrid;
            if (!container) return;
            
            container.innerHTML = '';
            
            // Рендерим смайлики
            Object.keys(this.appData.emojis).forEach(category => {
                this.appData.emojis[category].forEach(emoji => {
                    const emojiElement = document.createElement('div');
                    emojiElement.className = 'emoji-item';
                    emojiElement.textContent = emoji;
                    emojiElement.dataset.emoji = emoji;
                    emojiElement.addEventListener('click', (e) => {
                        AnimationManager.createRipple(e);
                        setTimeout(() => this.insertEmoji(emoji), 150);
                    });
                    container.appendChild(emojiElement);
                });
            });
        },
        
        // ========== ФУНКЦИИ ЧАТА ==========
        openChat(chatId) {
            const chat = this.appData.chats.find(c => c.id === chatId);
            if (!chat) return;
            
            this.state.activeChat = chatId;
            
            // Анимация перехода
            this.elements.chatPanel.classList.add('active');
            this.elements.mainContent.style.display = 'none';
            
            // Обновить информацию о чате
            this.elements.chatAvatar.textContent = chat.avatar;
            this.elements.chatAvatar.style.background = chat.color;
            AnimationManager.animateElement(this.elements.chatAvatar, 'pulse-animation');
            this.elements.chatTitle.textContent = chat.name;
            this.elements.chatStatus.textContent = `${chat.members} участников • ${chat.online} онлайн`;
            
            // Загрузить сообщения
            this.loadMessages(chatId);
            
            // Сбросить непрочитанные
            chat.unread = 0;
            this.renderChats();
            
            // Фокус на поле ввода с анимацией
            setTimeout(() => {
                this.elements.messageInput.focus();
                AnimationManager.animateElement(this.elements.messageInput, 'pulse-animation');
            }, 300);
            
            this.showNotification(`Чат "${chat.name}"`, 'Чат открыт', 'info');
        },
        
        closeChat() {
            this.state.activeChat = null;
            this.elements.chatPanel.classList.remove('active');
            this.elements.mainContent.style.display = 'flex';
            this.elements.messageInput.value = '';
            this.closeEmojiPanel();
        },
        
        loadMessages(chatId) {
            const container = this.elements.messagesContainer;
            if (!container) return;
            
            const messages = this.appData.messages[chatId] || [];
            container.innerHTML = '';
            
            // Добавить дату
            const dateElement = document.createElement('div');
            dateElement.className = 'message-date';
            dateElement.innerHTML = '<span>Сегодня</span>';
            container.appendChild(dateElement);
            
            messages.forEach((msg, index) => {
                const messageElement = document.createElement('div');
                messageElement.className = `message ${msg.type}`;
                
                if (msg.type === 'incoming') {
                    messageElement.innerHTML = `
                        <div class="message-avatar" style="background: ${this.getColorForName(msg.sender)}">
                            ${msg.sender.charAt(0)}
                        </div>
                        <div class="message-content">
                            <div class="message-header">
                                <span class="message-sender">${msg.sender} ${msg.verified ? '<i class="fas fa-check-circle" style="color: #34c759; font-size: 10px;"></i>' : ''}</span>
                                <span class="message-time">${msg.time}</span>
                            </div>
                            <div class="message-text">${msg.text}</div>
                        </div>
                    `;
                } else {
                    messageElement.innerHTML = `
                        <div class="message-content">
                            <div class="message-header">
                                <span class="message-sender">Вы</span>
                                <span class="message-time">${msg.time}</span>
                            </div>
                            <div class="message-text">${msg.text}</div>
                        </div>
                    `;
                }
                
                container.appendChild(messageElement);
                
                // Анимация появления сообщений с задержкой
                setTimeout(() => {
                    messageElement.classList.add('slide-in-up');
                    messageElement.style.animationDelay = `${index * 0.1}s`;
                }, 10);
            });
            
            // Прокрутить вниз
            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            }, 300);
        },
        
        sendMessage() {
            const input = this.elements.messageInput;
            if (!input || !input.value.trim() || !this.state.activeChat) return;
            
            const text = input.value.trim();
            const chatId = this.state.activeChat;
            const container = this.elements.messagesContainer;
            
            // Анимация отправки
            AnimationManager.animateElement(this.elements.sendBtn, 'pulse-animation');
            
            // Добавить сообщение от пользователя
            const userMessage = {
                id: Date.now(),
                sender: 'Вы',
                text: text,
                time: this.getCurrentTime(),
                type: 'outgoing',
                status: 'sent'
            };
            
            // Добавить в UI
            const messageElement = document.createElement('div');
            messageElement.className = 'message outgoing';
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-sender">Вы</span>
                        <span class="message-time">${userMessage.time}</span>
                    </div>
                    <div class="message-text">${userMessage.text}</div>
                </div>
            `;
            
            container.appendChild(messageElement);
            input.value = '';
            
            // Анимация появления сообщения
            setTimeout(() => {
                messageElement.classList.add('slide-in-up');
            }, 10);
            
            // Добавить в данные
            if (!this.appData.messages[chatId]) {
                this.appData.messages[chatId] = [];
            }
            this.appData.messages[chatId].push(userMessage);
            
            // Прокрутить вниз
            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            }, 100);
            
            // Симулировать ответ
            setTimeout(() => {
                this.simulateReply(chatId);
            }, 1000 + Math.random() * 2000);
            
            // Обновить список чатов
            this.updateChatPreview(chatId, text);
            
            // Закрыть панель эмодзи
            this.closeEmojiPanel();
        },
        
        simulateReply(chatId) {
            const replies = [
                'Понял вас!',
                'Отличная идея!',
                'Давайте обсудим подробнее',
                'Согласен с вами',
                'Интересный вопрос',
                'Спасибо за информацию!',
                'Жду продолжения'
            ];
            
            const senders = ['Алексей', 'Мария', 'Павел Дуров', 'Дмитрий'];
            const randomSender = senders[Math.floor(Math.random() * senders.length)];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            
            const replyMessage = {
                id: Date.now(),
                sender: randomSender,
                text: randomReply,
                time: this.getCurrentTime(),
                type: 'incoming',
                status: 'delivered'
            };
            
            // Добавить в данные
            if (!this.appData.messages[chatId]) {
                this.appData.messages[chatId] = [];
            }
            this.appData.messages[chatId].push(replyMessage);
            
            // Добавить в UI
            const container = this.elements.messagesContainer;
            const messageElement = document.createElement('div');
            messageElement.className = 'message incoming';
            messageElement.innerHTML = `
                <div class="message-avatar" style="background: ${this.getColorForName(randomSender)}">
                    ${randomSender.charAt(0)}
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-sender">${randomSender}</span>
                        <span class="message-time">${replyMessage.time}</span>
                    </div>
                    <div class="message-text">${replyMessage.text}</div>
                </div>
            `;
            
            container.appendChild(messageElement);
            
            // Анимация появления
            setTimeout(() => {
                messageElement.classList.add('slide-in-up');
            }, 10);
            
            // Прокрутить вниз
            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            }, 100);
            
            // Обновить список чатов
            const chat = this.appData.chats.find(c => c.id === chatId);
            if (chat) {
                chat.lastMessage = randomReply;
                chat.time = replyMessage.time;
                chat.unread = (chat.unread || 0) + 1;
                this.renderChats();
            }
            
            // Показать уведомление
            this.showNotification(randomSender, randomReply, 'info');
        },
        
        updateChatPreview(chatId, lastMessage) {
            const chat = this.appData.chats.find(c => c.id === chatId);
            if (chat) {
                chat.lastMessage = lastMessage;
                chat.time = this.getCurrentTime();
                this.renderChats();
            }
        },
        
        // ========== ЭМОДЗИ ==========
        insertEmoji(emoji) {
            const input = this.elements.messageInput;
            if (!input) return;
            
            const cursorPos = input.selectionStart;
            const textBefore = input.value.substring(0, cursorPos);
            const textAfter = input.value.substring(cursorPos);
            
            input.value = textBefore + emoji + textAfter;
            input.focus();
            input.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
            
            // Авторазмер textarea
            input.style.height = 'auto';
            input.style.height = (input.scrollHeight) + 'px';
        },
        
        toggleEmojiPanel() {
            this.state.isEmojiPanelOpen = !this.state.isEmojiPanelOpen;
            
            if (this.state.isEmojiPanelOpen) {
                this.elements.emojiPanel.classList.add('active');
                this.elements.emojiToggleBtn.classList.add('active');
            } else {
                this.closeEmojiPanel();
            }
        },
        
        closeEmojiPanel() {
            this.state.isEmojiPanelOpen = false;
            this.elements.emojiPanel.classList.remove('active');
            this.elements.emojiToggleBtn.classList.remove('active');
        },
        
        // ========== ВИДЕОКОНФЕРЕНЦИЯ ==========
        startConference() {
            AnimationManager.animateElement(this.elements.startConferenceBtn, 'pulse-animation');
            
            this.state.isConferenceActive = true;
            this.state.conferenceTimer = 0;
            
            // Показать панель конференции
            this.elements.conferencePanel.classList.add('active');
            this.elements.mainContent.style.display = 'none';
            this.elements.chatPanel.classList.remove('active');
            
            // Запустить таймер
            this.startConferenceTimer();
            
            // Загрузить участников
            this.renderConferenceParticipants();
            
            this.showNotification('Конференция', 'Конференция началась', 'success');
        },
        
        closeConference() {
            this.state.isConferenceActive = false;
            
            // Остановить таймер
            this.stopConferenceTimer();
            
            // Скрыть панель конференции
            this.elements.conferencePanel.classList.remove('active');
            this.elements.mainContent.style.display = 'flex';
            
            this.showNotification('Конференция', 'Конференция завершена', 'info');
        },
        
        startConferenceTimer() {
            this.stopConferenceTimer();
            
            this.state.conferenceTimerInterval = setInterval(() => {
                this.state.conferenceTimer++;
                this.updateConferenceTimer();
            }, 1000);
        },
        
        stopConferenceTimer() {
            if (this.state.conferenceTimerInterval) {
                clearInterval(this.state.conferenceTimerInterval);
                this.state.conferenceTimerInterval = null;
            }
        },
        
        updateConferenceTimer() {
            const minutes = Math.floor(this.state.conferenceTimer / 60);
            const seconds = this.state.conferenceTimer % 60;
            const timerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (this.elements.conferenceTimer) {
                this.elements.conferenceTimer.textContent = timerText;
            }
        },
        
        renderConferenceParticipants() {
            const container = this.elements.conferenceGrid;
            if (!container) return;
            
            container.innerHTML = '';
            
            // Добавить пользователя
            const userParticipant = document.createElement('div');
            userParticipant.className = 'participant-card active-speaker glow-animation';
            userParticipant.innerHTML = `
                <div class="participant-avatar" style="background: linear-gradient(135deg, var(--primary), var(--secondary))">
                    Г
                </div>
                <div class="participant-name">Вы (Ведущий)</div>
                <div class="participant-status">
                    <i class="fas fa-microphone"></i>
                </div>
            `;
            container.appendChild(userParticipant);
            
            // Анимация появления
            setTimeout(() => {
                userParticipant.classList.add('slide-in-up');
            }, 10);
            
            // Добавить контактов
            this.appData.contacts.slice(0, 3).forEach((contact, index) => {
                setTimeout(() => {
                    const participant = document.createElement('div');
                    participant.className = 'participant-card';
                    participant.innerHTML = `
                        <div class="participant-avatar" style="background: ${contact.color}">
                            ${contact.avatar}
                        </div>
                        <div class="participant-name">${contact.name}</div>
                        <div class="participant-status">
                            <i class="fas fa-microphone-slash"></i>
                        </div>
                    `;
                    container.appendChild(participant);
                    
                    // Анимация появления
                    setTimeout(() => {
                        participant.classList.add('slide-in-up');
                    }, 10);
                }, index * 200);
            });
        },
        
        // ========== ПРОФИЛЬ ==========
        openProfile() {
            this.elements.profileModal.classList.add('active');
            this.elements.profileModalOverlay.classList.add('active');
        },
        
        closeProfile() {
            this.elements.profileModal.classList.remove('active');
            this.elements.profileModalOverlay.classList.remove('active');
        },
        
        // ========== ТЕМЫ ==========
        setTheme(theme) {
            this.state.theme = theme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            // Обновить иконку
            const icon = this.elements.themeToggle?.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
            
            // Обновить фон
            document.body.style.background = theme === 'dark' ? '#0a0a0f' : '#f5f7ff';
        },
        
        toggleTheme() {
            AnimationManager.animateElement(this.elements.themeToggle, 'pulse-animation');
            const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
            this.showNotification('Тема изменена', `Переключено на ${newTheme === 'dark' ? 'тёмную' : 'светлую'} тему`, 'info');
        },
        
        // ========== УЗЛЫ ==========
        switchNode(nodeId) {
            this.state.activeNode = nodeId;
            
            // Обновить активный класс
            document.querySelectorAll('.node-item').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.node === nodeId) {
                    item.classList.add('active');
                    AnimationManager.animateElement(item, 'pulse-animation');
                }
            });
            
            // Обновить текущий узел
            this.updateCurrentNode();
            
            // Перерисовать чаты
            setTimeout(() => {
                this.renderChats();
            }, 200);
            
            // Показать уведомление
            const node = this.appData.nodes.find(n => n.id === nodeId);
            if (node) {
                this.showNotification(`Узел "${node.name}"`, node.description, 'info');
            }
        },
        
        // ========== УВЕДОМЛЕНИЯ ==========
        showNotification(title, message, type = 'info') {
            console.log(`📢 ${title}: ${message}`);
            
            const container = this.elements.notificationsContainer;
            if (!container) return;
            
            const notification = document.createElement('div');
            notification.className = 'notification';
            
            const iconMap = {
                'info': 'fas fa-info-circle',
                'success': 'fas fa-check-circle',
                'warning': 'fas fa-exclamation-circle',
                'error': 'fas fa-times-circle'
            };
            
            notification.innerHTML = `
                <div class="notification-icon" style="background: ${this.getColorForType(type)}">
                    <i class="${iconMap[type] || iconMap.info}"></i>
                </div>
                <div class="notification-content">
                    <h4 class="notification-title">${title}</h4>
                    <p class="notification-message">${message}</p>
                </div>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            container.appendChild(notification);
            
            // Анимация появления
            setTimeout(() => {
                notification.classList.add('slide-in-up');
            }, 10);
            
            // Автоудаление через 5 секунд
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.opacity = '0';
                    notification.style.transform = 'translateX(100px)';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }
            }, 5000);
            
            // Обработчик закрытия
            const closeBtn = notification.querySelector('.notification-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    notification.style.opacity = '0';
                    notification.style.transform = 'translateX(100px)';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                });
            }
        },
        
        // ========== ПОИСК ==========
        handleSearch() {
            this.state.searchQuery = this.elements.globalSearch.value.trim();
            this.renderChats();
            
            // Показать/скрыть кнопку очистки
            if (this.elements.searchClear) {
                if (this.state.searchQuery) {
                    this.elements.searchClear.style.display = 'flex';
                } else {
                    this.elements.searchClear.style.display = 'none';
                }
            }
        },
        
        clearSearch() {
            this.elements.globalSearch.value = '';
            this.state.searchQuery = '';
            this.renderChats();
            if (this.elements.searchClear) {
                this.elements.searchClear.style.display = 'none';
            }
        },
        
        // ========== ФИЛЬТРЫ И СОРТИРОВКА ==========
        setupFilters() {
            this.elements.filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Убрать активный класс у всех
                    this.elements.filterButtons.forEach(b => b.classList.remove('active'));
                    // Добавить активный класс нажатой кнопке
                    btn.classList.add('active');
                    // Обновить фильтр
                    this.state.currentFilter = btn.dataset.filter;
                    // Перерисовать чаты
                    this.renderChats();
                });
            });
            
            this.elements.sortButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Убрать активный класс у всех
                    this.elements.sortButtons.forEach(b => b.classList.remove('active'));
                    // Добавить активный класс нажатой кнопке
                    btn.classList.add('active');
                    // Обновить сортировку
                    this.state.currentSort = btn.dataset.sort;
                    // Перерисовать чаты
                    this.renderChats();
                });
            });
        },
        
        // ========== СИМУЛЯЦИЯ АКТИВНОСТИ ==========
        simulateActivity() {
            // Случайные уведомления
            const notifications = [
                { title: 'Павел Дуров онлайн', message: 'Только что зашел в сеть', type: 'info' },
                { title: 'Новое сообщение', message: 'У вас 3 новых сообщения', type: 'info' },
                { title: 'CS2 Турнир', message: 'Регистрация заканчивается через 2 дня', type: 'warning' }
            ];
            
            // Показать случайное уведомление каждые 30-60 секунд
            setInterval(() => {
                const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
                this.showNotification(randomNotif.title, randomNotif.message, randomNotif.type);
            }, 30000 + Math.random() * 30000);
        },
        
        // ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========
        setupEventListeners() {
            // Поиск
            if (this.elements.globalSearch) {
                this.elements.globalSearch.addEventListener('input', () => this.handleSearch());
            }
            
            if (this.elements.searchClear) {
                this.elements.searchClear.addEventListener('click', () => this.clearSearch());
            }
            
            // Кнопка "Назад"
            if (this.elements.backBtn) {
                this.elements.backBtn.addEventListener('click', () => {
                    if (this.state.activeChat) {
                        this.closeChat();
                    } else if (this.state.isConferenceActive) {
                        this.closeConference();
                    }
                });
            }
            
            // Кнопка закрытия чата
            if (this.elements.closeChatBtn) {
                this.elements.closeChatBtn.addEventListener('click', () => this.closeChat());
            }
            
            // Тема
            if (this.elements.themeToggle) {
                this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
            }
            
            // Уведомления
            if (this.elements.notificationsBtn) {
                this.elements.notificationsBtn.addEventListener('click', () => {
                    AnimationManager.animateElement(this.elements.notificationsBtn, 'pulse-animation');
                    this.showNotification('Уведомления', 'У вас 3 новых уведомления', 'info');
                });
            }
            
            // Новый чат
            if (this.elements.newChatBtn) {
                this.elements.newChatBtn.addEventListener('click', () => {
                    this.showNotification('Новый чат', 'Выберите контакты для начала разговора', 'info');
                });
            }
            
            if (this.elements.startChatBtn) {
                this.elements.startChatBtn.addEventListener('click', () => {
                    this.showNotification('Новый чат', 'Выберите контакты для начала разговора', 'info');
                });
            }
            
            // Отправка сообщения
            if (this.elements.sendBtn) {
                this.elements.sendBtn.addEventListener('click', () => this.sendMessage());
            }
            
            if (this.elements.messageInput) {
                this.elements.messageInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        this.sendMessage();
                    }
                });
                
                // Авторазмер textarea
                this.elements.messageInput.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = (this.scrollHeight) + 'px';
                });
            }
            
            // Эмодзи
            if (this.elements.emojiToggleBtn) {
                this.elements.emojiToggleBtn.addEventListener('click', () => this.toggleEmojiPanel());
            }
            
            // Категории эмодзи
            this.elements.emojiCategories?.forEach(category => {
                category.addEventListener('click', function() {
                    this.elements.emojiCategories.forEach(c => c.classList.remove('active'));
                    this.classList.add('active');
                    // Здесь можно реализовать фильтрацию эмодзи по категориям
                });
            });
            
            // Видеоконференция
            if (this.elements.startConferenceBtn) {
                this.elements.startConferenceBtn.addEventListener('click', () => this.startConference());
            }
            
            if (this.elements.closeConferenceBtn) {
                this.elements.closeConferenceBtn.addEventListener('click', () => this.closeConference());
            }
            
            if (this.elements.confEndBtn) {
                this.elements.confEndBtn.addEventListener('click', () => this.closeConference());
            }
            
            // Профиль
            if (this.elements.profileCard) {
                this.elements.profileCard.addEventListener('click', () => this.openProfile());
            }
            
            if (this.elements.profileMenuBtn) {
                this.elements.profileMenuBtn.addEventListener('click', () => this.openProfile());
            }
            
            if (this.elements.closeProfileModal) {
                this.elements.closeProfileModal.addEventListener('click', () => this.closeProfile());
            }
            
            if (this.elements.profileModalOverlay) {
                this.elements.profileModalOverlay.addEventListener('click', () => this.closeProfile());
            }
            
            // Обновление активности
            if (this.elements.refreshActivityBtn) {
                this.elements.refreshActivityBtn.addEventListener('click', () => {
                    this.renderActivity();
                    this.showNotification('Активность', 'Список активности обновлен', 'info');
                });
            }
            
            // Фильтры и сортировка
            this.setupFilters();
            
            // Клик вне элементов
            document.addEventListener('click', (e) => {
                // Закрытие панели эмодзи при клике вне
                if (!e.target.closest('.emoji-panel') && !e.target.closest('#emoji-toggle-btn')) {
                    this.closeEmojiPanel();
                }
                
                // Закрытие уведомлений при клике вне
                if (!e.target.closest('.notification')) {
                    document.querySelectorAll('.notification').forEach(notif => {
                        if (!notif.contains(e.target)) {
                            notif.style.opacity = '0';
                            setTimeout(() => {
                                if (notif.parentNode) {
                                    notif.parentNode.removeChild(notif);
                                }
                            }, 300);
                        }
                    });
                }
            });
            
            // Адаптивность
            window.addEventListener('resize', () => this.handleResize());
            this.handleResize();
        },
        
        handleResize() {
            this.state.isSidebarVisible = window.innerWidth > 768;
            if (this.elements.sidebar) {
                if (this.state.isSidebarVisible) {
                    this.elements.sidebar.style.transform = 'translateY(0)';
                } else {
                    this.elements.sidebar.style.transform = 'translateY(-100%)';
                }
            }
        },
        
        // ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
        getCurrentTime() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        },
        
        getColorForName(name) {
            const colors = ['#0088cc', '#af52de', '#34c759', '#ff9500', '#ff3b30', '#5ac8fa'];
            let hash = 0;
            for (let i = 0; i < name.length; i++) {
                hash = name.charCodeAt(i) + ((hash << 5) - hash);
            }
            return colors[Math.abs(hash) % colors.length];
        },
        
        getColorForType(type) {
            const colors = {
                'info': '#0088cc',
                'success': '#34c759',
                'warning': '#ff9500',
                'error': '#ff3b30'
            };
            return colors[type] || colors.info;
        },
        
        // ========== ГЛОБАЛЬНЫЕ ФУНКЦИИ ==========
        registerGlobalFunctions() {
            window.TelegramNodes = {
                // Основные функции
                openChat: (chatId) => this.openChat(chatId),
                closeChat: () => this.closeChat(),
                switchNode: (nodeId) => this.switchNode(nodeId),
                toggleTheme: () => this.toggleTheme(),
                showNotification: (title, message, type) => this.showNotification(title, message, type),
                startConference: () => this.startConference(),
                closeConference: () => this.closeConference(),
                
                // Данные
                getAppData: () => this.appData,
                getState: () => this.state,
                
                // Тестовые функции
                test: () => {
                    this.showNotification('Тест', 'Консольные команды работают!', 'success');
                    console.log('📊 Состояние приложения:', this.state);
                    console.log('📁 Данные приложения:', this.appData);
                },
                
                help: () => {
                    console.log('🚀 Telegram Nodes Console:');
                    console.log('TelegramNodes.openChat("design-team") - открыть чат');
                    console.log('TelegramNodes.switchNode("game") - переключить узел');
                    console.log('TelegramNodes.toggleTheme() - сменить тему');
                    console.log('TelegramNodes.showNotification("Заголовок", "Текст", "type")');
                    console.log('TelegramNodes.startConference() - начать конференцию');
                    console.log('TelegramNodes.getAppData() - получить все данные');
                    console.log('TelegramNodes.getState() - получить состояние');
                    console.log('TelegramNodes.test() - тестовая команда');
                    console.log('TelegramNodes.help() - эта справка');
                }
            };
        }
    };
    
    // ========== ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ==========
    try {
        console.log('🎯 Инициализация приложения...');
        
        // Сначала инициализируем систему входа
        LoginSystem.init();
        
        // Регистрируем глобальные функции
        MainApp.registerGlobalFunctions();
        
        console.log('✅ Telegram Nodes успешно инициализирован!');
        console.log('💡 Используйте TelegramNodes.help() для списка команд');
        
    } catch (error) {
        console.error('❌ Ошибка запуска:', error);
        // Показываем уведомление об ошибке
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff3b30;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(255, 59, 48, 0.3);
        `;
        errorDiv.textContent = `Ошибка запуска: ${error.message}`;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
});
