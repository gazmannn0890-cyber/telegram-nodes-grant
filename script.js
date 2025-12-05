// Telegram Nodes - Оптимизированная версия с анимациями
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Telegram Nodes запускается...');
    
    // ========== КОНФИГУРАЦИЯ ==========
    const config = {
        appName: 'Telegram Nodes',
        version: '2.5',
        developer: 'Газман',
        defaultTheme: 'dark',
        loginCredentials: {
            phone: '900123456',
            password: '111111'
        },
        features: {
            nodes: true,
            chats: true,
            calls: true,
            games: true,
            notifications: true,
            emoji: true,
            conference: true,
            animations: true
        }
    };
    
    // ========== АНИМАЦИИ И ПЕРЕХОДЫ ==========
    const animations = {
        applyCardAnimation(element) {
            if (!config.features.animations) return;
            
            element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        },
        
        fadeIn(element, duration = 300) {
            if (!config.features.animations) {
                element.style.opacity = '1';
                return;
            }
            
            element.style.transition = `opacity ${duration}ms ease`;
            element.style.opacity = '1';
        },
        
        slideIn(element, direction = 'right', duration = 300) {
            if (!config.features.animations) {
                element.style.transform = 'translateX(0)';
                return;
            }
            
            const transforms = {
                right: 'translateX(20px)',
                left: 'translateX(-20px)',
                up: 'translateY(-20px)',
                down: 'translateY(20px)'
            };
            
            element.style.transform = transforms[direction] || 'translateX(20px)';
            element.style.opacity = '0';
            element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            
            requestAnimationFrame(() => {
                element.style.transform = 'translate(0, 0)';
                element.style.opacity = '1';
            });
        },
        
        pulse(element, scale = 1.05) {
            if (!config.features.animations) return;
            
            element.style.transform = `scale(${scale})`;
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
        },
        
        shake(element) {
            if (!config.features.animations) return;
            
            element.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                element.style.animation = '';
            }, 500);
        },
        
        ripple(event) {
            if (!config.features.animations) return;
            
            const btn = event.currentTarget;
            const ripple = document.createElement('span');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    };
    
    // Добавляем CSS для анимаций
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .chat-card {
            animation: cardAppear 0.3s ease forwards;
            opacity: 0;
            transform: translateY(20px);
        }
        
        @keyframes cardAppear {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .node-item, .contact-item, .activity-item, .game-item {
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .message {
            animation: messageAppear 0.3s ease forwards;
        }
        
        .notification {
            animation: notificationSlideIn 0.3s ease forwards;
        }
        
        @keyframes notificationSlideIn {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .gradient-border {
            position: relative;
            background: var(--bg-card);
        }
        
        .gradient-border::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, var(--primary), var(--secondary), var(--primary));
            border-radius: inherit;
            z-index: -1;
            animation: borderRotate 3s linear infinite;
        }
        
        @keyframes borderRotate {
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // ========== ДАННЫЕ ПРИЛОЖЕНИЯ ==========
    const appData = {
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
    };
    
    // ========== СОСТОЯНИЕ ПРИЛОЖЕНИЯ ==========
    let state = {
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
    };
    
    // ========== DOM ЭЛЕМЕНТЫ ==========
    const elements = {
        // Прелоадер и вход
        preloader: document.getElementById('preloader'),
        progressFill: document.getElementById('progress-fill'),
        statChats: document.getElementById('stat-chats'),
        statNodes: document.getElementById('stat-nodes'),
        statOnline: document.getElementById('stat-online'),
        loginForm: document.getElementById('login-form'),
        loginPhone: document.getElementById('login-phone'),
        loginPassword: document.getElementById('login-password'),
        loginButton: document.getElementById('login-button'),
        demoLogin: document.getElementById('demo-login'),
        loginError: document.getElementById('login-error'),
        
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
    };
    
    // ========== ИНИЦИАЛИЗАЦИЯ ==========
    function init() {
        console.log('🎯 Инициализация Telegram Nodes...');
        
        // Инициализация частиц
        initParticles();
        
        // Показываем форму входа
        setTimeout(() => {
            animations.fadeIn(elements.loginForm);
            elements.loginForm.classList.add('active');
            elements.loginPhone.focus();
        }, 1500);
        
        // Настройка обработчиков событий для входа
        setupLoginListeners();
    }
    
    // ========== ЧАСТИЦЫ ФОНА ==========
    function initParticles() {
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
    }
    
    // ========== СИСТЕМА ВХОДА ==========
    function setupLoginListeners() {
        elements.loginButton.addEventListener('click', handleLogin);
        elements.demoLogin.addEventListener('click', handleDemoLogin);
        elements.loginPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleLogin();
        });
        
        // Добавляем ripple эффект кнопкам
        elements.loginButton.addEventListener('mousedown', animations.ripple);
        elements.demoLogin.addEventListener('mousedown', animations.ripple);
    }
    
    function handleLogin() {
        if (state.isAuthenticating) return;
        
        const phone = elements.loginPhone.value.trim();
        const password = elements.loginPassword.value.trim();
        
        if (!phone || !password) {
            showLoginError('Заполните все поля');
            return;
        }
        
        if (phone === config.loginCredentials.phone && 
            password === config.loginCredentials.password) {
            authenticateUser();
        } else {
            showLoginError('Неверный номер телефона или пароль');
            animations.shake(elements.loginForm);
        }
    }
    
    function handleDemoLogin() {
        elements.loginPhone.value = config.loginCredentials.phone;
        elements.loginPassword.value = config.loginCredentials.password;
        authenticateUser();
    }
    
    function showLoginError(message) {
        elements.loginError.textContent = message;
        elements.loginError.style.display = 'block';
        setTimeout(() => {
            elements.loginError.style.display = 'none';
        }, 3000);
    }
    
    function authenticateUser() {
        state.isAuthenticating = true;
        
        // Анимация загрузки
        elements.loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Вход...';
        elements.loginButton.disabled = true;
        
        // Имитация задержки сети
        setTimeout(() => {
            // Успешный вход
            state.isLoggedIn = true;
            elements.loginForm.style.opacity = '0';
            elements.loginForm.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                startApplication();
            }, 500);
            
        }, 1500);
    }
    
    function startApplication() {
        // Скрываем форму входа
        elements.loginForm.style.display = 'none';
        
        // Запускаем прелоадер приложения
        simulatePreloader();
        
        // Инициализируем основное приложение
        setTimeout(() => {
            initApplication();
        }, 1000);
    }
    
    // ========== ПРЕЛОАДЕР ==========
    function simulatePreloader() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            elements.progressFill.style.width = `${progress}%`;
            
            // Обновление статистики с анимацией
            if (progress >= 25) {
                animateCounter(elements.statChats, appData.user.stats.chats);
            }
            if (progress >= 50) {
                animateCounter(elements.statNodes, appData.user.stats.nodes);
            }
            if (progress >= 75) {
                animateCounter(elements.statOnline, appData.user.stats.online);
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
    }
    
    function animateCounter(element, targetValue) {
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
    }
    
    // ========== ОСНОВНОЕ ПРИЛОЖЕНИЕ ==========
    function initApplication() {
        // Установка темы
        setTheme(state.theme);
        
        // Рендер данных с анимациями
        renderProfile();
        renderNodes();
        renderContacts();
        renderActivity();
        updateCurrentNode();
        renderChats();
        renderEmojis();
        
        // Настройка обработчиков событий
        setupEventListeners();
        
        // Показать приветственное уведомление
        setTimeout(() => {
            showNotification('Добро пожаловать, Газман!', 'Telegram Nodes готов к работе', 'success');
            animations.pulse(elements.profileCard);
        }, 1500);
        
        // Симулировать активность
        simulateActivity();
        
        // Добавляем плавные переходы
        addSmoothTransitions();
    }
    
    // ========== ПЛАВНЫЕ ПЕРЕХОДЫ ==========
    function addSmoothTransitions() {
        // Добавляем анимации всем интерактивным элементам
        document.querySelectorAll('.btn, .header-btn, .icon-btn, .chat-action-btn, .input-btn, .filter-btn, .sort-btn').forEach(btn => {
            btn.addEventListener('mousedown', animations.ripple);
            btn.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // Анимации карточек
        document.querySelectorAll('.chat-card, .node-item, .contact-item, .activity-item').forEach(card => {
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // Плавный скролл
        document.querySelectorAll('.scrollable').forEach(container => {
            container.style.scrollBehavior = 'smooth';
        });
    }
    
    // ========== РЕНДЕР ФУНКЦИИ С АНИМАЦИЯМИ ==========
    function renderNodes() {
        const container = elements.nodesList;
        if (!container) return;
        
        container.innerHTML = '';
        
        appData.nodes.forEach((node, index) => {
            const nodeElement = document.createElement('div');
            nodeElement.className = `node-item ${state.activeNode === node.id ? 'active' : ''}`;
            nodeElement.dataset.node = node.id;
            
            nodeElement.innerHTML = `
                <div class="node-icon" style="background: ${node.color}">
                    <i class="${node.icon}"></i>
                </div>
                <div class="node-info">
                    <div class="node-name">${node.name}</div>
                    <div class="node-description">${node.members} участников • ${node.online} онлайн</div>
                </div>
                ${node.unread > 0 ? `<span class="unread-badge">${node.unread}</span>` : ''}
            `;
            
            nodeElement.addEventListener('click', () => {
                animations.pulse(nodeElement);
                setTimeout(() => switchNode(node.id), 150);
            });
            
            container.appendChild(nodeElement);
            
            // Последовательная анимация появления
            setTimeout(() => {
                animations.slideIn(nodeElement, 'left');
            }, index * 50);
        });
    }
    
    function renderChats() {
        const container = elements.chatsContainer;
        const emptyState = elements.emptyState;
        
        if (!container || !emptyState) return;
        
        // Фильтрация чатов
        let filteredChats = appData.chats.filter(chat => {
            // Фильтр по узлу
            if (chat.node !== state.activeNode) return false;
            
            // Фильтр по поиску
            if (state.searchQuery) {
                const query = state.searchQuery.toLowerCase();
                return chat.name.toLowerCase().includes(query) || 
                       chat.lastMessage.toLowerCase().includes(query);
            }
            
            // Индивидуальные фильтры
            switch (state.currentFilter) {
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
            if (state.currentSort === 'unread') {
                return b.unread - a.unread;
            } else {
                // Сортировка по времени
                const timeOrder = { '12:30': 1, '11:45': 2, '10:30': 3, 'Пт': 4, 'Вчера': 5, '09:15': 6 };
                return (timeOrder[a.time] || 99) - (timeOrder[b.time] || 99);
            }
        });
        
        container.innerHTML = '';
        
        if (filterchedats.length === 0) {
            animations.fadeIn(emptyState);
            emptyState.classList.add('active');
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
                (_, i) => `<div class="member-avatar" style="animation-delay: ${i * 0.1}s">${i + 1}</div>`
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
                        ${chat.pinned ? '<i class="fas fa-thumbtack" style="color: #ff9500; margin-right: 8px; animation: float 3s ease-in-out infinite;"></i>' : ''}
                        ${chat.unread > 0 ? `<span class="unread-badge pulse">${chat.unread}</span>` : ''}
                    </div>
                </div>
            `;
            
            chatCard.addEventListener('click', () => {
                animations.pulse(chatCard);
                setTimeout(() => openChat(chat.id), 150);
            });
            
            container.appendChild(chatCard);
            
            // Последовательная анимация появления
            setTimeout(() => {
                animations.applyCardAnimation(chatCard);
            }, index * 50);
        });
    }
    
    function renderContacts() {
        const container = elements.contactsList;
        if (!container) return;
        
        container.innerHTML = '';
        
        appData.contacts.forEach((contact, index) => {
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
            
            contactElement.addEventListener('click', () => {
                animations.pulse(contactElement);
                showNotification(contact.name, 'Открыть чат с контактом', 'info');
            });
            
            container.appendChild(contactElement);
            
            // Анимация появления
            setTimeout(() => {
                animations.slideIn(contactElement, 'left');
            }, index * 50);
        });
    }
    
    function renderActivity() {
        const container = elements.activityList;
        if (!container) return;
        
        container.innerHTML = '';
        
        appData.activity.forEach((activity, index) => {
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
                animations.slideIn(activityElement, 'left');
            }, index * 50);
        });
    }
    
    // ========== ФУНКЦИИ ЧАТА С АНИМАЦИЯМИ ==========
    function openChat(chatId) {
        const chat = appData.chats.find(c => c.id === chatId);
        if (!chat) return;
        
        state.activeChat = chatId;
        
        // Анимация перехода
        animations.slideIn(elements.chatPanel, 'right');
        
        // Обновить UI
        elements.mainContent.style.display = 'none';
        elements.chatPanel.classList.add('active');
        
        // Обновить информацию о чате
        elements.chatAvatar.textContent = chat.avatar;
        elements.chatAvatar.style.background = chat.color;
        animations.pulse(elements.chatAvatar);
        elements.chatTitle.textContent = chat.name;
        elements.chatStatus.textContent = `${chat.members} участников • ${chat.online} онлайн`;
        
        // Загрузить сообщения
        loadMessages(chatId);
        
        // Сбросить непрочитанные
        chat.unread = 0;
        renderChats();
        
        // Фокус на поле ввода с анимацией
        setTimeout(() => {
            elements.messageInput.focus();
            animations.pulse(elements.messageInput);
        }, 300);
        
        showNotification(`Чат "${chat.name}"`, 'Чат открыт', 'info');
    }
    
    function closeChat() {
        animations.slideIn(elements.mainContent, 'left');
        
        setTimeout(() => {
            state.activeChat = null;
            elements.chatPanel.classList.remove('active');
            elements.mainContent.style.display = 'flex';
            elements.messageInput.value = '';
            closeEmojiPanel();
        }, 300);
    }
    
    function loadMessages(chatId) {
        const container = elements.messagesContainer;
        if (!container) return;
        
        const messages = appData.messages[chatId] || [];
        container.innerHTML = '';
        
        // Добавить дату
        const dateElement = document.createElement('div');
        dateElement.className = 'message-date';
        dateElement.innerHTML = '<span>Сегодня</span>';
        animations.fadeIn(dateElement);
        container.appendChild(dateElement);
        
        messages.forEach((msg, index) => {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${msg.type}`;
            
            if (msg.type === 'incoming') {
                messageElement.innerHTML = `
                    <div class="message-avatar" style="background: ${getColorForName(msg.sender)}">
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
                animations.slideIn(messageElement, msg.type === 'incoming' ? 'left' : 'right');
            }, index * 100);
        });
        
        // Прокрутить вниз
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 300);
    }
    
    function sendMessage() {
        const input = elements.messageInput;
        if (!input || !input.value.trim() || !state.activeChat) return;
        
        const text = input.value.trim();
        const chatId = state.activeChat;
        const container = elements.messagesContainer;
        
        // Анимация отправки
        animations.pulse(elements.sendBtn);
        
        // Добавить сообщение от пользователя
        const userMessage = {
            id: Date.now(),
            sender: 'Вы',
            text: text,
            time: getCurrentTime(),
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
            animations.slideIn(messageElement, 'right');
        }, 10);
        
        // Добавить в данные
        if (!appData.messages[chatId]) {
            appData.messages[chatId] = [];
        }
        appData.messages[chatId].push(userMessage);
        
        // Прокрутить вниз
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
        
        // Симулировать ответ
        setTimeout(() => {
            simulateReply(chatId);
        }, 1000 + Math.random() * 2000);
        
        // Обновить список чатов
        updateChatPreview(chatId, text);
        
        // Закрыть панель эмодзи
        closeEmojiPanel();
    }
    
    function simulateReply(chatId) {
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
            time: getCurrentTime(),
            type: 'incoming',
            status: 'delivered'
        };
        
        // Добавить в данные
        if (!appData.messages[chatId]) {
            appData.messages[chatId] = [];
        }
        appData.messages[chatId].push(replyMessage);
        
        // Добавить в UI
        const container = elements.messagesContainer;
        const messageElement = document.createElement('div');
        messageElement.className = 'message incoming';
        messageElement.innerHTML = `
            <div class="message-avatar" style="background: ${getColorForName(randomSender)}">
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
            animations.slideIn(messageElement, 'left');
        }, 10);
        
        // Прокрутить вниз
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
        
        // Обновить список чатов
        const chat = appData.chats.find(c => c.id === chatId);
        if (chat) {
            chat.lastMessage = randomReply;
            chat.time = replyMessage.time;
            chat.unread = (chat.unread || 0) + 1;
            renderChats();
        }
        
        // Показать уведомление
        showNotification(randomSender, randomReply, 'info');
    }
    
    // ========== ВИДЕОКОНФЕРЕНЦИЯ С АНИМАЦИЯМИ ==========
    function startConference() {
        // Анимация кнопки
        animations.pulse(elements.startConferenceBtn);
        
        state.isConferenceActive = true;
        state.conferenceTimer = 0;
        
        // Анимация появления
        animations.fadeIn(elements.conferencePanel);
        
        // Показать панель конференции
        elements.conferencePanel.classList.add('active');
        elements.mainContent.style.display = 'none';
        elements.chatPanel.classList.remove('active');
        
        // Запустить таймер
        startConferenceTimer();
        
        // Загрузить участников
        renderConferenceParticipants();
        
        showNotification('Конференция', 'Конференция началась', 'success');
    }
    
    function closeConference() {
        state.isConferenceActive = false;
        
        // Остановить таймер
        stopConferenceTimer();
        
        // Анимация закрытия
        animations.fadeIn(elements.mainContent);
        
        setTimeout(() => {
            // Скрыть панель конференции
            elements.conferencePanel.classList.remove('active');
            elements.mainContent.style.display = 'flex';
        }, 300);
        
        showNotification('Конференция', 'Конференция завершена', 'info');
    }
    
    function renderConferenceParticipants() {
        const container = elements.conferenceGrid;
        if (!container) return;
        
        container.innerHTML = '';
        
        // Добавить пользователя
        const userParticipant = document.createElement('div');
        userParticipant.className = 'participant-card active-speaker';
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
        animations.fadeIn(userParticipant);
        
        // Добавить контактов
        appData.contacts.slice(0, 3).forEach((contact, index) => {
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
                animations.slideIn(participant, 'up');
            }, index * 200);
        });
    }
    
    // ========== ОБНОВЛЕННЫЕ ФУНКЦИИ ==========
    function switchNode(nodeId) {
        state.activeNode = nodeId;
        
        // Обновить активный класс с анимацией
        document.querySelectorAll('.node-item').forEach(item => {
            if (item.dataset.node === nodeId) {
                item.classList.add('active');
                animations.pulse(item);
            } else {
                item.classList.remove('active');
            }
        });
        
        // Обновить текущий узел
        updateCurrentNode();
        
        // Перерисовать чаты с анимацией
        setTimeout(() => {
            renderChats();
        }, 200);
        
        // Показать уведомление
        const node = appData.nodes.find(n => n.id === nodeId);
        if (node) {
            showNotification(`Узел "${node.name}"`, node.description, 'info');
        }
    }
    
    function toggleTheme() {
        animations.pulse(elements.themeToggle);
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        showNotification('Тема изменена', `Переключено на ${newTheme === 'dark' ? 'тёмную' : 'светлую'} тему`, 'info');
    }
    
    // ========== УВЕДОМЛЕНИЯ С АНИМАЦИЯМИ ==========
    function showNotification(title, message, type = 'info') {
        console.log(`📢 ${title}: ${message}`);
        
        const container = elements.notificationsContainer;
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
            <div class="notification-icon" style="background: ${getColorForType(type)}">
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
        animations.slideIn(notification, 'right');
        
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
    }
    
    // ========== ОБНОВЛЕННЫЕ ОБРАБОТЧИКИ ==========
    function setupEventListeners() {
        // Поиск
        if (elements.globalSearch) {
            elements.globalSearch.addEventListener('input', handleSearch);
        }
        
        if (elements.searchClear) {
            elements.searchClear.addEventListener('click', clearSearch);
        }
        
        // Кнопка "Назад"
        if (elements.backBtn) {
            elements.backBtn.addEventListener('click', () => {
                if (state.activeChat) {
                    closeChat();
                } else if (state.isConferenceActive) {
                    closeConference();
                }
            });
        }
        
        // Тема
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', toggleTheme);
        }
        
        // Уведомления
        if (elements.notificationsBtn) {
            elements.notificationsBtn.addEventListener('click', () => {
                animations.pulse(elements.notificationsBtn);
                showNotification('Уведомления', 'У вас 3 новых уведомления', 'info');
            });
        }
        
        // Отправка сообщения
        if (elements.sendBtn) {
            elements.sendBtn.addEventListener('click', sendMessage);
        }
        
        if (elements.messageInput) {
            elements.messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }
        
        // Видеоконференция
        if (elements.startConferenceBtn) {
            elements.startConferenceBtn.addEventListener('click', startConference);
        }
        
        // Профиль
        if (elements.profileCard) {
            elements.profileCard.addEventListener('click', openProfile);
        }
        
        // Добавляем ripple эффект ко всем кнопкам
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('mousedown', animations.ripple);
        });
        
        // Адаптивность
        window.addEventListener('resize', handleResize);
        handleResize();
    }
    
    // ========== ОСТАЛЬНЫЕ ФУНКЦИИ ==========
    function renderProfile() {
        const user = appData.user;
        const profileCard = elements.profileCard;
        
        if (profileCard) {
            const avatar = profileCard.querySelector('.avatar');
            const name = profileCard.querySelector('.profile-name');
            const status = profileCard.querySelector('.profile-status');
            
            if (avatar) avatar.textContent = user.avatar;
            if (name) name.textContent = user.name;
            if (status) status.textContent = `${user.username} • ${user.status}`;
        }
    }
    
    function updateCurrentNode() {
        const node = appData.nodes.find(n => n.id === state.activeNode);
        if (!node) return;
        
        const container = elements.currentNode;
        if (!container) return;
        
        const icon = container.querySelector('.node-icon');
        const name = container.querySelector('.node-name');
        const description = container.querySelector('.node-description');
        
        if (icon) {
            icon.innerHTML = `<i class="${node.icon}"></i>`;
            icon.style.background = `linear-gradient(135deg, ${node.color}, ${node.color}dd)`;
            animations.pulse(icon);
        }
        if (name) name.textContent = node.name;
        if (description) description.textContent = `${node.members} участников • ${node.online} онлайн`;
    }
    
    function renderEmojis() {
        const container = elements.emojiGrid;
        if (!container) return;
        
        container.innerHTML = '';
        
        Object.keys(appData.emojis).forEach(category => {
            appData.emojis[category].forEach(emoji => {
                const emojiElement = document.createElement('div');
                emojiElement.className = 'emoji-item';
                emojiElement.textContent = emoji;
                emojiElement.dataset.emoji = emoji;
                emojiElement.addEventListener('click', () => {
                    animations.pulse(emojiElement);
                    setTimeout(() => insertEmoji(emoji), 150);
                });
                container.appendChild(emojiElement);
            });
        });
    }
    
    function updateChatPreview(chatId, lastMessage) {
        const chat = appData.chats.find(c => c.id === chatId);
        if (chat) {
            chat.lastMessage = lastMessage;
            chat.time = getCurrentTime();
            renderChats();
        }
    }
    
    function insertEmoji(emoji) {
        const input = elements.messageInput;
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
    }
    
    function toggleEmojiPanel() {
        state.isEmojiPanelOpen = !state.isEmojiPanelOpen;
        
        if (state.isEmojiPanelOpen) {
            elements.emojiPanel.classList.add('active');
            elements.emojiToggleBtn.classList.add('active');
            animations.slideIn(elements.emojiPanel, 'up');
        } else {
            closeEmojiPanel();
        }
    }
    
    function closeEmojiPanel() {
        state.isEmojiPanelOpen = false;
        elements.emojiPanel.classList.remove('active');
        elements.emojiToggleBtn.classList.remove('active');
    }
    
    function startConferenceTimer() {
        stopConferenceTimer();
        
        state.conferenceTimerInterval = setInterval(() => {
            state.conferenceTimer++;
            updateConferenceTimer();
        }, 1000);
    }
    
    function stopConferenceTimer() {
        if (state.conferenceTimerInterval) {
            clearInterval(state.conferenceTimerInterval);
            state.conferenceTimerInterval = null;
        }
    }
    
    function updateConferenceTimer() {
        const minutes = Math.floor(state.conferenceTimer / 60);
        const seconds = state.conferenceTimer % 60;
        const timerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (elements.conferenceTimer) {
            elements.conferenceTimer.textContent = timerText;
        }
    }
    
    function openProfile() {
        elements.profileModal.classList.add('active');
        elements.profileModalOverlay.classList.add('active');
        animations.fadeIn(elements.profileModal);
        animations.fadeIn(elements.profileModalOverlay);
    }
    
    function closeProfile() {
        elements.profileModal.classList.remove('active');
        elements.profileModalOverlay.classList.remove('active');
    }
    
    function setTheme(theme) {
        state.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const icon = elements.themeToggle?.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    function handleSearch() {
        state.searchQuery = elements.globalSearch.value.trim();
        renderChats();
        
        if (elements.searchClear) {
            if (state.searchQuery) {
                elements.searchClear.style.display = 'flex';
                animations.fadeIn(elements.searchClear);
            } else {
                elements.searchClear.style.display = 'none';
            }
        }
    }
    
    function clearSearch() {
        elements.globalSearch.value = '';
        state.searchQuery = '';
        renderChats();
        if (elements.searchClear) {
            elements.searchClear.style.display = 'none';
        }
    }
    
    function simulateActivity() {
        const notifications = [
            { title: 'Павел Дуров онлайн', message: 'Только что зашел в сеть', type: 'info' },
            { title: 'Новое сообщение', message: 'У вас 3 новых сообщения', type: 'info' },
            { title: 'CS2 Турнир', message: 'Регистрация заканчивается через 2 дня', type: 'warning' }
        ];
        
        setInterval(() => {
            const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
            showNotification(randomNotif.title, randomNotif.message, randomNotif.type);
        }, 30000 + Math.random() * 30000);
    }
    
    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    function getColorForName(name) {
        const colors = ['#0088cc', '#af52de', '#34c759', '#ff9500', '#ff3b30', '#5ac8fa'];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    }
    
    function getColorForType(type) {
        const colors = {
            'info': '#0088cc',
            'success': '#34c759',
            'warning': '#ff9500',
            'error': '#ff3b30'
        };
        return colors[type] || colors.info;
    }
    
    function handleResize() {
        state.isSidebarVisible = window.innerWidth > 768;
        if (elements.sidebar) {
            if (state.isSidebarVisible) {
                elements.sidebar.style.transform = 'translateY(0)';
            } else {
                elements.sidebar.style.transform = 'translateY(-100%)';
            }
        }
    }
    
    // ========== ГЛОБАЛЬНЫЕ ФУНКЦИИ ==========
    window.TelegramNodes = {
        openChat: openChat,
        closeChat: closeChat,
        switchNode: switchNode,
        toggleTheme: toggleTheme,
        showNotification: showNotification,
        startConference: startConference,
        closeConference: closeConference,
        
        getAppData: () => appData,
        getState: () => state,
        
        test: () => {
            showNotification('Тест', 'Консольные команды работают!', 'success');
            console.log('📊 Состояние приложения:', state);
            console.log('📁 Данные приложения:', appData);
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
    
    // ========== ЗАПУСК ==========
    try {
        init();
        console.log('✅ Telegram Nodes успешно инициализирован!');
        console.log('💡 Используйте TelegramNodes.help() для списка команд');
        
    } catch (error) {
        console.error('❌ Ошибка запуска:', error);
        showNotification('Ошибка запуска', error.message, 'error');
    }
});
