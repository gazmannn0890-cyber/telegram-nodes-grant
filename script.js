// Telegram Nodes - Полная система (2000+ строк)
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Telegram Nodes инициализируется...');
    
    // ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
    const AppState = {
        // Пользователь
        user: {
            id: 1,
            name: 'Иван Петров',
            username: '@ivanpetrov',
            phone: '+7 (900) 123-45-67',
            email: 'ivan@example.com',
            avatar: 'И',
            status: 'online',
            bio: 'Digital nomad & developer',
            online: true,
            lastSeen: new Date(),
            settings: {
                theme: 'dark',
                notifications: true,
                sounds: true,
                autoDownload: true,
                privacy: 'public',
                language: 'ru'
            }
        },
        
        // Текущее состояние приложения
        currentView: 'chats',
        activeNode: 'alpha',
        activeChat: null,
        activeCall: null,
        activeConference: null,
        
        // Таймеры
        callTimer: null,
        callDuration: 0,
        conferenceTimer: null,
        conferenceDuration: 0,
        
        // Данные
        nodes: new Map(),
        chats: new Map(),
        contacts: new Map(),
        messages: new Map(),
        
        // Кэш
        cache: new Map(),
        
        // Состояния
        isTyping: false,
        isSearching: false,
        isEmojiOpen: false,
        isContextMenuOpen: false,
        isLoading: false
    };
    
    // ===== СИСТЕМА КЭШИРОВАНИЯ =====
    class CacheSystem {
        constructor() {
            this.cache = new Map();
            this.maxSize = 100;
            this.ttl = 5 * 60 * 1000; // 5 минут
        }
        
        set(key, value, ttl = this.ttl) {
            this.cleanup();
            if (this.cache.size >= this.maxSize) {
                const firstKey = this.cache.keys().next().value;
                this.cache.delete(firstKey);
            }
            
            this.cache.set(key, {
                value,
                expiry: Date.now() + ttl,
                timestamp: Date.now()
            });
        }
        
        get(key) {
            const item = this.cache.get(key);
            if (!item) return null;
            
            if (Date.now() > item.expiry) {
                this.cache.delete(key);
                return null;
            }
            
            return item.value;
        }
        
        delete(key) {
            return this.cache.delete(key);
        }
        
        clear() {
            this.cache.clear();
        }
        
        cleanup() {
            const now = Date.now();
            for (const [key, item] of this.cache) {
                if (now > item.expiry) {
                    this.cache.delete(key);
                }
            }
        }
    }
    
    const cacheSystem = new CacheSystem();
    
    // ===== СИСТЕМА СОБЫТИЙ =====
    class EventSystem {
        constructor() {
            this.events = new Map();
        }
        
        on(event, callback) {
            if (!this.events.has(event)) {
                this.events.set(event, []);
            }
            this.events.get(event).push(callback);
        }
        
        off(event, callback) {
            if (!this.events.has(event)) return;
            
            const callbacks = this.events.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
        
        emit(event, data) {
            if (!this.events.has(event)) return;
            
            this.events.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event handler for ${event}:`, error);
                }
            });
        }
    }
    
    const eventSystem = new EventSystem();
    
    // ===== СИСТЕМА УВЕДОМЛЕНИЙ =====
    class NotificationSystem {
        constructor() {
            this.container = document.querySelector('.notification-system');
            this.notifications = [];
            this.maxNotifications = 50;
        }
        
        show(title, message, options = {}) {
            const notification = {
                id: Date.now() + Math.random(),
                title,
                message,
                type: options.type || 'info',
                duration: options.duration || 5000,
                icon: this.getIcon(options.type),
                timestamp: new Date(),
                read: false
            };
            
            // Добавляем в историю
            this.notifications.unshift(notification);
            if (this.notifications.length > this.maxNotifications) {
                this.notifications.pop();
            }
            
            // Отображаем уведомление
            this.displayNotification(notification);
            
            // Воспроизводим звук
            if (AppState.user.settings.sounds) {
                this.playSound(notification.type);
            }
            
            // Отправляем событие
            eventSystem.emit('notification', notification);
            
            return notification.id;
        }
        
        displayNotification(notification) {
            if (!this.container) return;
            
            const notificationElement = document.createElement('div');
            notificationElement.className = `notification ${notification.type}`;
            notificationElement.dataset.id = notification.id;
            
            notificationElement.innerHTML = `
                <div class="notification-header">
                    <div class="notification-title">
                        <i class="${notification.icon}"></i>
                        ${notification.title}
                    </div>
                    <button class="notification-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="notification-body">${notification.message}</div>
            `;
            
            this.container.appendChild(notificationElement);
            
            // Анимация появления
            requestAnimationFrame(() => {
                notificationElement.classList.add('show');
            });
            
            // Кнопка закрытия
            const closeBtn = notificationElement.querySelector('.notification-close');
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeNotification(notification.id);
            });
            
            // Авто-удаление
            if (notification.duration > 0) {
                setTimeout(() => {
                    this.removeNotification(notification.id);
                }, notification.duration);
            }
        }
        
        removeNotification(id) {
            const element = this.container.querySelector(`[data-id="${id}"]`);
            if (element) {
                element.classList.remove('show');
                setTimeout(() => {
                    if (element.parentNode) {
                        element.parentNode.removeChild(element);
                    }
                }, 300);
            }
        }
        
        getIcon(type) {
            const icons = {
                info: 'fas fa-info-circle',
                success: 'fas fa-check-circle',
                warning: 'fas fa-exclamation-triangle',
                error: 'fas fa-times-circle',
                message: 'fas fa-comment',
                call: 'fas fa-phone',
                conference: 'fas fa-video'
            };
            return icons[type] || 'fas fa-bell';
        }
        
        playSound(type) {
            const soundMap = {
                message: document.getElementById('messageSound'),
                call: document.getElementById('callSound'),
                default: document.getElementById('notificationSound')
            };
            
            const sound = soundMap[type] || soundMap.default;
            if (sound) {
                sound.currentTime = 0;
                sound.play().catch(e => console.log('Sound play failed:', e));
            }
        }
        
        clearAll() {
            this.container.innerHTML = '';
            this.notifications = [];
        }
    }
    
    const notificationSystem = new NotificationSystem();
    
    // ===== СИСТЕМА ДАННЫХ =====
    class DataSystem {
        constructor() {
            this.init();
        }
        
        init() {
            this.loadDefaultData();
            this.loadFromStorage();
            this.setupAutoSave();
        }
        
        loadDefaultData() {
            // Узлы
            AppState.nodes.set('alpha', {
                id: 'alpha',
                name: 'AlphaTeam',
                icon: 'fas fa-rocket',
                color: '#0088cc',
                gradient: 'linear-gradient(135deg, #0088cc, #0055aa)',
                description: 'Рабочая команда разработки',
                members: 24,
                online: 12,
                created: '2024-01-15',
                privacy: 'private',
                tags: ['работа', 'разработка', 'команда'],
                stats: { messages: 1245, files: 156, calls: 23 },
                unread: 3,
                pinned: true
            });
            
            AppState.nodes.set('game', {
                id: 'game',
                name: 'GameZone',
                icon: 'fas fa-gamepad',
                color: '#af52de',
                gradient: 'linear-gradient(135deg, #af52de, #7d3cff)',
                description: 'Игровое сообщество и турниры',
                members: 48,
                online: 28,
                created: '2024-02-10',
                privacy: 'public',
                tags: ['игры', 'киберспорт', 'сообщество'],
                stats: { messages: 3567, files: 89, calls: 45 },
                unread: 0,
                pinned: true
            });
            
            // Чаты
            AppState.chats.set('design', {
                id: 'design',
                node: 'alpha',
                name: 'Дизайн-команда',
                type: 'group',
                avatar: 'Д',
                color: '#0088cc',
                description: 'Обсуждение дизайна и UI/UX',
                members: 8,
                online: 5,
                lastMessage: {
                    text: 'Обсуждаем новый UI для проекта...',
                    sender: 'Мария',
                    time: '12:30',
                    read: false
                },
                unread: 3,
                pinned: true,
                muted: false,
                archived: false
            });
            
            // Контакты
            AppState.contacts.set(1, {
                id: 1,
                name: 'Алексей',
                avatar: 'А',
                color: '#0088cc',
                status: 'online',
                lastSeen: '2 мин назад',
                phone: '+7 (900) 123-45-67',
                email: 'alexey@example.com',
                bio: 'Team Lead • Fullstack Developer',
                online: true,
                favorite: true,
                notifications: true
            });
            
            // Сообщения
            AppState.messages.set('design', [
                {
                    id: 1,
                    chatId: 'design',
                    sender: 2,
                    text: 'Привет всем! Как продвигается работа над новым дизайном?',
                    time: '12:15',
                    type: 'text',
                    status: 'read',
                    edited: false
                },
                {
                    id: 2,
                    chatId: 'design',
                    sender: AppState.user.id,
                    text: 'Почти закончили! Осталось сделать анимации переходов',
                    time: '12:20',
                    type: 'text',
                    status: 'read',
                    edited: true
                }
            ]);
        }
        
        loadFromStorage() {
            try {
                const savedData = localStorage.getItem('telegramNodesData');
                if (savedData) {
                    const data = JSON.parse(savedData);
                    // Восстанавливаем данные из localStorage
                }
            } catch (error) {
                console.error('Error loading from storage:', error);
            }
        }
        
        saveToStorage() {
            try {
                const data = {
                    user: AppState.user,
                    nodes: Array.from(AppState.nodes.entries()),
                    chats: Array.from(AppState.chats.entries()),
                    contacts: Array.from(AppState.contacts.entries()),
                    messages: Array.from(AppState.messages.entries())
                };
                localStorage.setItem('telegramNodesData', JSON.stringify(data));
            } catch (error) {
                console.error('Error saving to storage:', error);
            }
        }
        
        setupAutoSave() {
            setInterval(() => this.saveToStorage(), 30000); // Каждые 30 секунд
        }
    }
    
    const dataSystem = new DataSystem();

    // Добавляем после инициализации DataSystem

class ActivitySystem {
    constructor() {
        this.activities = new Map();
        this.init();
    }
    
    init() {
        this.loadActivities();
        this.setupUpdates();
    }
    
    loadActivities() {
        // Пример активностей
        this.activities.set(1, {
            id: 1,
            contactId: 1,
            type: 'calling',
            contactName: 'Алексей',
            status: 'В звонке',
            duration: '5:23',
            icon: 'fas fa-phone',
            color: '#34c759'
        });
        
        this.activities.set(2, {
            id: 2,
            contactId: 2,
            type: 'conference',
            contactName: 'Мария',
            status: 'В конференции',
            duration: '12:45',
            icon: 'fas fa-video',
            color: '#0088cc'
        });
        
        this.activities.set(3, {
            id: 3,
            contactId: 3,
            type: 'gaming',
            contactName: 'Дмитрий',
            status: 'Играет в CS2',
            duration: '45:12',
            icon: 'fas fa-gamepad',
            color: '#ff9500'
        });
        
        this.activities.set(4, {
            id: 4,
            contactId: 4,
            type: 'typing',
            contactName: 'Анна',
            status: 'Печатает...',
            duration: '',
            icon: 'fas fa-keyboard',
            color: '#5ac8fa'
        });
        
        // Павел Дуров
        this.activities.set(5, {
            id: 5,
            contactId: 5,
            type: 'conference',
            contactName: 'Павел Дуров',
            status: 'Проводит митап',
            duration: '1:30:15',
            icon: 'fas fa-users',
            color: '#0088cc'
        });
    }
    
    renderActivities() {
        const container = document.getElementById('activityList');
        if (!container) return;
        
        container.innerHTML = '';
        
        for (const activity of this.activities.values()) {
            const activityElement = document.createElement('div');
            activityElement.className = `activity-item ${activity.type}`;
            activityElement.dataset.activity = activity.id;
            
            activityElement.innerHTML = `
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-info">
                    <div class="activity-name">${activity.contactName}</div>
                    <div class="activity-status">
                        <span>${activity.status}</span>
                    </div>
                </div>
                ${activity.duration ? `<div class="activity-duration">${activity.duration}</div>` : ''}
            `;
            
            activityElement.addEventListener('click', () => {
                this.handleActivityClick(activity);
            });
            
            container.appendChild(activityElement);
        }
    }
    
    handleActivityClick(activity) {
        switch(activity.type) {
            case 'calling':
                uiSystem.startCall(activity.contactId, 'audio');
                break;
            case 'conference':
                notificationSystem.show(
                    'Присоединиться к конференции?',
                    `${activity.contactName} ${activity.status.toLowerCase()}`,
                    {
                        type: 'conference',
                        duration: 5000,
                        actions: [
                            {
                                label: 'Присоединиться',
                                callback: () => uiSystem.startConference()
                            }
                        ]
                    }
                );
                break;
            case 'gaming':
                this.showGameInfo(activity);
                break;
        }
    }
    
    showGameInfo(activity) {
        notificationSystem.show(
            'Игровая активность',
            `${activity.contactName} играет в Counter-Strike 2`,
            {
                type: 'info',
                duration: 3000,
                icon: 'fas fa-gamepad'
            }
        );
    }
    
    setupUpdates() {
        // Обновляем таймеры каждую секунду
        setInterval(() => {
            this.updateDurations();
            this.renderActivities();
        }, 1000);
        
        // Случайные обновления активности
        setInterval(() => {
            this.randomActivityUpdate();
        }, 30000);
    }
    
    updateDurations() {
        for (const activity of this.activities.values()) {
            if (activity.duration && activity.duration !== '') {
                // Увеличиваем время на 1 секунду
                const timeParts = activity.duration.split(':');
                if (timeParts.length === 2) {
                    let minutes = parseInt(timeParts[0]);
                    let seconds = parseInt(timeParts[1]) + 1;
                    
                    if (seconds >= 60) {
                        minutes++;
                        seconds = 0;
                    }
                    
                    activity.duration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }
            }
        }
    }
    
    randomActivityUpdate() {
        const activities = Array.from(this.activities.values());
        if (activities.length > 0) {
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            
            // Случайно меняем статус
            const statuses = ['В звонке', 'Печатает...', 'Онлайн', 'Не беспокоить'];
            randomActivity.status = statuses[Math.floor(Math.random() * statuses.length)];
            
            // Обновляем отображение
            this.renderActivities();
        }
    }
}

const activitySystem = new ActivitySystem();

// Обновляем класс UISystem
UISystem.prototype.init = function() {
    this.cacheElements();
    this.setupTheme();
    this.setupEventListeners();
    this.renderInitialData();
    this.setupProfileEditing();
    this.setupSettings();
};

UISystem.prototype.setupProfileEditing = function() {
    const editBtn = document.getElementById('editProfileBtn');
    const cancelBtn = document.getElementById('cancelEditBtn');
    const saveBtn = document.getElementById('saveProfileBtn');
    const editSection = document.getElementById('profileEditSection');
    const profileSection = document.querySelector('.profile-section');
    
    if (editBtn && editSection && profileSection) {
        editBtn.addEventListener('click', () => {
            profileSection.style.display = 'none';
            editSection.style.display = 'block';
            this.populateEditForm();
        });
        
        cancelBtn?.addEventListener('click', () => {
            editSection.style.display = 'none';
            profileSection.style.display = 'block';
        });
        
        saveBtn?.addEventListener('click', () => {
            this.saveProfileChanges();
            editSection.style.display = 'none';
            profileSection.style.display = 'block';
        });
    }
};

UISystem.prototype.populateEditForm = function() {
    document.getElementById('editName').value = AppState.user.name;
    document.getElementById('editUsername').value = AppState.user.username;
    document.getElementById('editBio').value = AppState.user.bio;
};

UISystem.prototype.saveProfileChanges = function() {
    const newName = document.getElementById('editName').value;
    const newUsername = document.getElementById('editUsername').value;
    const newBio = document.getElementById('editBio').value;
    
    AppState.user.name = newName;
    AppState.user.username = newUsername;
    AppState.user.bio = newBio;
    
    // Обновляем отображение профиля
    this.updateProfileDisplay();
    
    notificationSystem.show('Профиль обновлён', 'Изменения сохранены', {
        type: 'success',
        duration: 3000
    });
    
    // Сохраняем в localStorage
    dataSystem.saveToStorage();
};

UISystem.prototype.updateProfileDisplay = function() {
    const profileName = document.querySelector('.profile-name');
    const profileStatus = document.querySelector('.profile-status');
    
    if (profileName) {
        profileName.textContent = AppState.user.name;
    }
    
    if (profileStatus) {
        profileStatus.textContent = AppState.user.username;
    }
    
    // Обновляем аватар
    const avatarText = document.querySelector('.avatar-text');
    if (avatarText) {
        avatarText.textContent = AppState.user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
};

UISystem.prototype.setupSettings = function() {
    const settingsBtn = document.getElementById('settingsBtn');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const soundToggle = document.getElementById('soundToggle');
    const vibrationToggle = document.getElementById('vibrationToggle');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            this.openSettings();
        });
    }
    
    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', () => {
            this.closeSettings();
        });
    }
    
    if (soundToggle) {
        soundToggle.checked = AppState.user.settings.sounds;
        soundToggle.addEventListener('change', (e) => {
            AppState.user.settings.sounds = e.target.checked;
            dataSystem.saveToStorage();
        });
    }
    
    if (vibrationToggle) {
        vibrationToggle.checked = AppState.user.settings.vibration;
        vibrationToggle.addEventListener('change', (e) => {
            AppState.user.settings.vibration = e.target.checked;
            dataSystem.saveToStorage();
        });
    }
    
    themeOptions?.forEach(option => {
        option.addEventListener('click', (e) => {
            const theme = e.currentTarget.dataset.theme;
            this.setTheme(theme);
            
            // Обновляем активный класс
            themeOptions.forEach(opt => opt.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });
};

UISystem.prototype.openSettings = function() {
    document.getElementById('settingsPanel').classList.add('active');
};

UISystem.prototype.closeSettings = function() {
    document.getElementById('settingsPanel').classList.remove('active');
};

UISystem.prototype.setTheme = function(theme) {
    if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? 'dark' : 'light';
    }
    
    AppState.user.settings.theme = theme;
    document.body.className = `${theme}-theme`;
    localStorage.setItem('theme', theme);
    
    const themeIcon = this.elements.themeToggleBtn?.querySelector('i');
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
};

// Обновляем инициализацию данных
DataSystem.prototype.loadDefaultData = function() {
    // Обновляем имя пользователя
    AppState.user.name = 'Газман';
    AppState.user.username = '@gazman';
    AppState.user.bio = 'Основатель Telegram Nodes • Любитель кофе и технологий';
    
    // Добавляем Павла Дурова в контакты
    AppState.contacts.set(5, {
        id: 5,
        name: 'Павел Дуров',
        avatar: 'ПД',
        color: '#0088cc',
        status: 'online',
        lastSeen: 'только что',
        phone: '',
        email: 'durov@telegram.org',
        bio: 'Основатель Telegram • Digital nomad',
        online: true,
        favorite: true,
        notifications: true,
        activity: 'conference',
        game: null
    });
    
    // Добавляем чат с Павлом Дуровым
    AppState.chats.set('durov', {
        id: 'durov',
        node: 'personal',
        name: 'Павел Дуров',
        type: 'personal',
        avatar: 'ПД',
        color: '#0088cc',
        description: 'Основатель Telegram',
        members: 2,
        online: 1,
        lastMessage: {
            text: 'Новый функционал выглядит отлично!',
            sender: 'Павел Дуров',
            time: 'Сегодня 10:30',
            read: false
        },
        unread: 1,
        pinned: true,
        muted: false,
        archived: false,
        verified: true
    });
    
    // Добавляем сообщения в чат с Дуровым
    AppState.messages.set('durov', [
        {
            id: 1,
            chatId: 'durov',
            sender: 5,
            text: 'Привет! Вижу ты работаешь над новым интерфейсом для Telegram.',
            time: 'Вчера 18:45',
            type: 'text',
            status: 'read',
            edited: false
        },
        {
            id: 2,
            chatId: 'durov',
            sender: AppState.user.id,
            text: 'Да, Павел! Делаю улучшенную версию с узлами и конференциями.',
            time: 'Вчера 19:20',
            type: 'text',
            status: 'read',
            edited: true
        },
        {
            id: 3,
            chatId: 'durov',
            sender: 5,
            text: 'Отличная идея! Узлы - это то, что нужно для организации чатов.',
            time: 'Сегодня 10:15',
            type: 'text',
            status: 'read',
            edited: false
        },
        {
            id: 4,
            chatId: 'durov',
            sender: 5,
            text: 'Новый функционал выглядит отлично! Жду релиза.',
            time: 'Сегодня 10:30',
            type: 'text',
            status: 'delivered',
            edited: false
        }
    ]);
    
    // Добавляем больше узлов
    AppState.nodes.set('music', {
        id: 'music',
        name: 'MusicLovers',
        icon: 'fas fa-music',
        color: '#ff2d55',
        gradient: 'linear-gradient(135deg, #ff2d55, #ff375f)',
        description: 'Обсуждение музыки и концертов',
        members: 18,
        online: 9,
        created: '2024-02-28',
        privacy: 'public',
        tags: ['музыка', 'концерты', 'треки'],
        stats: { messages: 892, files: 45, calls: 12 },
        unread: 2,
        pinned: false
    });
    
    AppState.nodes.set('travel', {
        id: 'travel',
        name: 'TravelBlog',
        icon: 'fas fa-plane',
        color: '#ffcc00',
        gradient: 'linear-gradient(135deg, #ffcc00, #ff9500)',
        description: 'Путешествия и приключения',
        members: 32,
        online: 14,
        created: '2024-03-05',
        privacy: 'public',
        tags: ['путешествия', 'отдых', 'приключения'],
        stats: { messages: 1567, files: 234, calls: 8 },
        unread: 0,
        pinned: false
    });
    
    // Добавляем больше чатов
    AppState.chats.set('music_news', {
        id: 'music_news',
        node: 'music',
        name: 'Новости музыки',
        type: 'channel',
        avatar: 'Н',
        color: '#ff2d55',
        description: 'Свежие релизы и новости индустрии',
        members: 156,
        online: 42,
        lastMessage: {
            text: 'Новый альбом Taylor Swift уже доступен!',
            sender: 'Бот новостей',
            time: '2 часа назад',
            read: true
        },
        unread: 0,
        pinned: true,
        muted: false,
        archived: false
    });
    
    AppState.chats.set('travel_photos', {
        id: 'travel_photos',
        node: 'travel',
        name: 'Фото путешествий',
        type: 'group',
        avatar: 'Ф',
        color: '#ffcc00',
        description: 'Делимся фотографиями из поездок',
        members: 24,
        online: 8,
        lastMessage: {
            text: 'Посмотрите на эти виды с Бали! 🌴',
            sender: 'Анна',
            time: 'Вчера',
            read: false
        },
        unread: 3,
        pinned: false,
        muted: false,
        archived: false
    });
};

// Обновляем отрисовку контактов с активностью
UISystem.prototype.renderContacts = function() {
    if (!this.elements.contactsList) return;
    
    this.elements.contactsList.innerHTML = '';
    
    for (const [id, contact] of AppState.contacts) {
        const contactElement = document.createElement('div');
        contactElement.className = 'contact-item';
        contactElement.dataset.contact = id;
        
        // Получаем активность контакта
        const activity = activitySystem.activities.get(id);
        const activityClass = activity ? `activity-${activity.type}` : '';
        const activityIcon = activity ? activity.icon : '';
        
        contactElement.innerHTML = `
            <div class="contact-avatar" style="background: ${contact.color}">
                ${contact.avatar}
                ${activity ? `<div class="activity-badge ${activity.type}"><i class="${activityIcon}"></i></div>` : ''}
            </div>
            <div class="contact-info">
                <div class="contact-name">${contact.name}</div>
                <div class="contact-status">
                    <span class="contact-status-dot status-${contact.status}"></span>
                    ${this.getContactStatusText(contact, activity)}
                </div>
                ${activity ? `<div class="contact-status-extended">${activity.status}</div>` : ''}
            </div>
        `;
        
        contactElement.addEventListener('click', () => this.startChatWithContact(id));
        this.elements.contactsList.appendChild(contactElement);
    }
};

UISystem.prototype.getContactStatusText = function(contact, activity) {
    if (activity) {
        switch(activity.type) {
            case 'calling':
                return 'В звонке';
            case 'conference':
                return 'В конференции';
            case 'gaming':
                return 'В игре';
            case 'typing':
                return 'Печатает...';
        }
    }
    
    switch(contact.status) {
        case 'online':
            return 'В сети';
        case 'away':
            return 'Отошёл';
        case 'busy':
            return 'Занят';
        default:
            return 'Не в сети';
    }
};

// Добавляем функцию для игр
UISystem.prototype.setupGames = function() {
    const gameItems = document.querySelectorAll('.game-item');
    gameItems.forEach(item => {
        item.addEventListener('click', () => {
            const game = item.dataset.game;
            this.showGamePlayers(game);
        });
    });
};

UISystem.prototype.showGamePlayers = function(game) {
    let players = [];
    
    switch(game) {
        case 'cs2':
            players = [
                { name: 'Дмитрий', status: 'В игре', rank: 'Global Elite', time: '45 мин' },
                { name: 'Алексей', status: 'Ожидание', rank: 'Legendary Eagle', time: '5 мин' },
                { name: 'Иван', status: 'В меню', rank: 'Supreme', time: '2 мин' }
            ];
            break;
        case 'dota':
            players = [
                { name: 'Мария', status: 'В игре', rank: 'Ancient', time: '32 мин' },
                { name: 'Сергей', status: 'Ожидание', rank: 'Divine', time: '8 мин' }
            ];
            break;
    }
    
    const modalContent = `
        <div class="game-players-modal">
            <h3>Игроки в ${game === 'cs2' ? 'CS2' : 'Dota 2'}</h3>
            <div class="players-list">
                ${players.map(player => `
                    <div class="player-item">
                        <div class="player-avatar">${player.name.charAt(0)}</div>
                        <div class="player-info">
                            <div class="player-name">${player.name}</div>
                            <div class="player-details">
                                <span class="player-status">${player.status}</span>
                                <span class="player-rank">${player.rank}</span>
                                <span class="player-time">${player.time}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="btn-primary" id="joinGameBtn">
                <i class="fas fa-gamepad"></i>
                Присоединиться
            </button>
        </div>
    `;
    
    this.showCustomModal('Игровая активность', modalContent);
    
    document.getElementById('joinGameBtn')?.addEventListener('click', () => {
        notificationSystem.show('Присоединение к игре', 'Запуск игры...', {
            type: 'info',
            duration: 3000
        });
        this.closeModal();
    });
};

UISystem.prototype.showCustomModal = function(title, content) {
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
};

UISystem.prototype.closeModal = function() {
    const modal = document.querySelector('.custom-modal');
    if (modal) {
        modal.remove();
    }
};

// Обновляем init функцию
function init() {
    console.log('🎯 Telegram Nodes запускается...');
    
    // Показываем приветственное уведомление
    setTimeout(() => {
        notificationSystem.show(
            'Добро пожаловать, Газман!',
            'Telegram Nodes готов к работе. Новые функции активированы.',
            { type: 'success', duration: 5000 }
        );
        
        // Показываем уведомление от Дурова
        setTimeout(() => {
            notificationSystem.show(
                'Павел Дуров',
                'Новый функционал выглядит отлично!',
                { 
                    type: 'message', 
                    duration: 8000,
                    icon: 'fas fa-check-circle',
                    actions: [
                        {
                            label: 'Ответить',
                            callback: () => uiSystem.openChat('durov')
                        }
                    ]
                }
            );
        }, 2000);
    }, 1000);
    
    // Инициализируем активности
    activitySystem.renderActivities();
    
    // Настраиваем игры
    uiSystem.setupGames();
    
    // Инициализируем обновления статуса
    initStatusUpdates();
    
    console.log('✅ Приложение успешно запущено с новыми функциями');
}

// Добавляем консольные команды
window.TelegramNodes = {
    ...window.TelegramNodes,
    
    // Новые команды
    editProfile: () => {
        const editBtn = document.getElementById('editProfileBtn');
        if (editBtn) editBtn.click();
    },
    
    openSettings: () => {
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) settingsBtn.click();
    },
    
    showActivity: () => {
        activitySystem.renderActivities();
        notificationSystem.show('Активность', 'Список активностей обновлён', {
            type: 'info',
            duration: 2000
        });
    },
    
    startGame: (game = 'cs2') => {
        const gameEvent = {
            id: Date.now(),
            contactId: AppState.user.id,
            type: 'gaming',
            contactName: AppState.user.name,
            status: `Играет в ${game.toUpperCase()}`,
            duration: '00:00',
            icon: 'fas fa-gamepad',
            color: '#ff9500'
        };
        
        activitySystem.activities.set(gameEvent.id, gameEvent);
        activitySystem.renderActivities();
        
        notificationSystem.show('Игра запущена', `Начата игра в ${game.toUpperCase()}`, {
            type: 'info',
            duration: 3000,
            icon: 'fas fa-gamepad'
        });
    },
    
    simulateCall: (contactId = 1) => {
        uiSystem.startCall(contactId, 'audio');
    },
    
    helpExtended: () => {
        console.log('🎮 Расширенные команды Telegram Nodes:');
        console.log('TelegramNodes.editProfile() - редактировать профиль');
        console.log('TelegramNodes.openSettings() - открыть настройки');
        console.log('TelegramNodes.showActivity() - показать активность');
        console.log('TelegramNodes.startGame("cs2") - начать игру');
        console.log('TelegramNodes.simulateCall(1) - имитировать звонок');
        console.log('TelegramNodes.openChat("durov") - чат с Павлом Дуровым');
    }
};

console.log('🎮 Введите TelegramNodes.helpExtended() для расширенных команд');
    
    // ===== СИСТЕМА UI =====
    class UISystem {
        constructor() {
            this.elements = {};
            this.init();
        }
        
        init() {
            this.cacheElements();
            this.setupTheme();
            this.setupEventListeners();
            this.renderInitialData();
        }
        
        cacheElements() {
            // Основные контейнеры
            this.elements = {
                sidePanel: document.querySelector('.side-panel'),
                mainContent: document.querySelector('.main-content'),
                chatPanel: document.getElementById('chatPanel'),
                profilePanel: document.getElementById('profilePanel'),
                callScreen: document.getElementById('callScreen'),
                conferenceScreen: document.getElementById('conferenceScreen'),
                
                // Списки
                nodesList: document.getElementById('nodesList'),
                contactsList: document.getElementById('contactsList'),
                chatsContainer: document.getElementById('chatsContainer'),
                messagesScroll: document.getElementById('messagesScroll'),
                conferenceGrid: document.getElementById('conferenceGrid'),
                
                // Кнопки
                backBtn: document.getElementById('backBtn'),
                closeChatBtn: document.getElementById('closeChatBtn'),
                closeProfileBtn: document.getElementById('closeProfileBtn'),
                sendMessageBtn: document.getElementById('sendMessageBtn'),
                messageInput: document.getElementById('messageInput'),
                themeToggleBtn: document.getElementById('themeToggleBtn'),
                newChatBtn: document.getElementById('newChatBtn'),
                startConferenceBtn: document.getElementById('startConferenceBtn'),
                
                // Состояния
                emptyState: document.getElementById('emptyState'),
                typingIndicator: document.getElementById('typingIndicator'),
                loadingOverlay: document.getElementById('loadingOverlay')
            };
        }
        
        setupTheme() {
            const savedTheme = localStorage.getItem('theme') || AppState.user.settings.theme;
            document.body.className = `${savedTheme}-theme`;
            AppState.user.settings.theme = savedTheme;
            
            // Обновляем иконку темы
            const themeIcon = this.elements.themeToggleBtn?.querySelector('i');
            if (themeIcon) {
                themeIcon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
        
        setupEventListeners() {
            // Навигация
            this.elements.backBtn?.addEventListener('click', () => this.handleBack());
            this.elements.closeChatBtn?.addEventListener('click', () => this.closeChat());
            this.elements.closeProfileBtn?.addEventListener('click', () => this.closeProfile());
            
            // Сообщения
            this.elements.sendMessageBtn?.addEventListener('click', () => this.sendMessage());
            this.elements.messageInput?.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            // Тема
            this.elements.themeToggleBtn?.addEventListener('click', () => this.toggleTheme());
            
            // Новый чат
            this.elements.newChatBtn?.addEventListener('click', () => this.showNewChatModal());
            
            // Конференция
            this.elements.startConferenceBtn?.addEventListener('click', () => this.startConference());
            
            // Горячие клавиши
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.handleEscape();
                if (e.ctrlKey && e.key === 'k') {
                    e.preventDefault();
                    document.getElementById('globalSearch')?.focus();
                }
            });
        }
        
        renderInitialData() {
            this.renderNodes();
            this.renderContacts();
            this.renderChats();
        }
        
        renderNodes() {
            if (!this.elements.nodesList) return;
            
            this.elements.nodesList.innerHTML = '';
            
            for (const [id, node] of AppState.nodes) {
                const nodeElement = document.createElement('div');
                nodeElement.className = `node-item ${AppState.activeNode === id ? 'active' : ''}`;
                nodeElement.dataset.node = id;
                
                nodeElement.innerHTML = `
                    <div class="node-icon" style="background: ${node.gradient}">
                        <i class="${node.icon}"></i>
                    </div>
                    <div class="node-info">
                        <div class="node-name">${node.name}</div>
                        <div class="node-desc">${node.description}</div>
                    </div>
                    ${node.unread > 0 ? `<div class="node-badge">${node.unread}</div>` : ''}
                `;
                
                nodeElement.addEventListener('click', () => this.switchNode(id));
                this.elements.nodesList.appendChild(nodeElement);
            }
        }
        
        renderContacts() {
            if (!this.elements.contactsList) return;
            
            this.elements.contactsList.innerHTML = '';
            
            for (const [id, contact] of AppState.contacts) {
                const contactElement = document.createElement('div');
                contactElement.className = 'contact-item';
                contactElement.dataset.contact = id;
                
                contactElement.innerHTML = `
                    <div class="contact-avatar" style="background: ${contact.color}">
                        ${contact.avatar}
                    </div>
                    <div class="contact-info">
                        <div class="contact-name">${contact.name}</div>
                        <div class="contact-status">${contact.status}</div>
                    </div>
                    ${contact.online ? '<div class="contact-badge"></div>' : ''}
                `;
                
                contactElement.addEventListener('click', () => this.startChatWithContact(id));
                this.elements.contactsList.appendChild(contactElement);
            }
        }
        
        renderChats() {
            if (!this.elements.chatsContainer || !this.elements.emptyState) return;
            
            const filteredChats = Array.from(AppState.chats.values())
                .filter(chat => chat.node === AppState.activeNode && !chat.archived);
            
            if (filteredChats.length === 0) {
                this.elements.emptyState.style.display = 'block';
                this.elements.chatsContainer.style.display = 'none';
                return;
            }
            
            this.elements.emptyState.style.display = 'none';
            this.elements.chatsContainer.style.display = 'grid';
            this.elements.chatsContainer.innerHTML = '';
            
            filteredChats.forEach(chat => {
                const chatElement = document.createElement('div');
                chatElement.className = `chat-card ${AppState.activeChat === chat.id ? 'active' : ''}`;
                chatElement.dataset.chat = chat.id;
                
                chatElement.innerHTML = `
                    <div class="chat-card-header">
                        <div class="chat-avatar-main" style="background: ${chat.color}">
                            ${chat.avatar}
                        </div>
                        <div class="chat-info-main">
                            <div class="chat-title-main">
                                ${chat.name}
                                <span class="chat-type">${chat.type === 'group' ? 'Группа' : 'Канал'}</span>
                            </div>
                            <div class="chat-time">${chat.lastMessage.time}</div>
                        </div>
                    </div>
                    <p class="chat-preview">${chat.lastMessage.text}</p>
                    <div class="chat-footer">
                        <div class="chat-members">
                            <div class="member-avatars">
                                ${Array.from({length: Math.min(3, chat.members)})
                                    .map((_, i) => `<div class="member-avatar">${i + 1}</div>`)
                                    .join('')}
                                ${chat.members > 3 ? 
                                    `<div class="member-avatar">+${chat.members - 3}</div>` : ''}
                            </div>
                            <span>${chat.members} участников</span>
                        </div>
                        <div class="chat-stats">
                            ${chat.pinned ? '<i class="fas fa-thumbtack pinned-icon"></i>' : ''}
                            ${chat.unread > 0 ? 
                                `<span class="unread-badge">${chat.unread}</span>` : ''}
                        </div>
                    </div>
                `;
                
                chatElement.addEventListener('click', () => this.openChat(chat.id));
                this.elements.chatsContainer.appendChild(chatElement);
            });
        }
        
        renderMessages(chatId) {
            if (!this.elements.messagesScroll) return;
            
            const messages = AppState.messages.get(chatId) || [];
            this.elements.messagesScroll.innerHTML = '';
            
            // Добавляем дату
            const dateElement = document.createElement('div');
            dateElement.className = 'message-date';
            dateElement.innerHTML = '<span>Сегодня</span>';
            this.elements.messagesScroll.appendChild(dateElement);
            
            // Добавляем сообщения
            messages.forEach(message => {
                const messageElement = this.createMessageElement(message);
                this.elements.messagesScroll.appendChild(messageElement);
            });
            
            // Прокручиваем вниз
            this.scrollToBottom();
        }
        
        createMessageElement(message) {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${message.sender === AppState.user.id ? 'outgoing' : 'incoming'}`;
            
            if (message.sender === AppState.user.id) {
                messageElement.innerHTML = `
                    <div class="message-content">
                        <div class="message-text">${message.text}</div>
                        <div class="message-meta">
                            <span class="message-time">${message.time}</span>
                            <span class="message-status">
                                <i class="fas fa-${this.getMessageStatusIcon(message.status)}"></i>
                            </span>
                        </div>
                    </div>
                `;
            } else {
                const contact = AppState.contacts.get(message.sender);
                messageElement.innerHTML = `
                    <div class="message-avatar" style="background: ${contact?.color || '#0088cc'}">
                        ${contact?.avatar || '?'}
                    </div>
                    <div class="message-content">
                        <div class="message-sender">${contact?.name || 'Неизвестный'}</div>
                        <div class="message-text">${message.text}</div>
                        <div class="message-meta">
                            <span class="message-time">${message.time}</span>
                            ${message.edited ? '<span class="message-edited">(ред.)</span>' : ''}
                        </div>
                    </div>
                `;
            }
            
            return messageElement;
        }
        
        getMessageStatusIcon(status) {
            const icons = {
                sending: 'clock',
                sent: 'check',
                delivered: 'check-double',
                read: 'check-double text-primary'
            };
            return icons[status] || 'check';
        }
        
        // ===== ОСНОВНЫЕ ДЕЙСТВИЯ =====
        switchNode(nodeId) {
            AppState.activeNode = nodeId;
            this.renderChats();
            this.updateContextInfo();
            eventSystem.emit('node:switch', nodeId);
        }
        
        openChat(chatId) {
            const chat = AppState.chats.get(chatId);
            if (!chat) return;
            
            AppState.activeChat = chatId;
            
            // Переключаем вид
            this.elements.mainContent.style.display = 'none';
            this.elements.chatPanel.classList.add('active');
            
            // Обновляем информацию о чате
            this.updateChatInfo(chat);
            
            // Загружаем сообщения
            this.renderMessages(chatId);
            
            // Сбрасываем счетчик непрочитанных
            chat.unread = 0;
            this.renderChats();
            
            // Показываем уведомление
            notificationSystem.show(`Чат "${chat.name}"`, 'Открыт для общения', {
                type: 'message',
                duration: 2000
            });
        }
        
        closeChat() {
            AppState.activeChat = null;
            this.elements.mainContent.style.display = 'flex';
            this.elements.chatPanel.classList.remove('active');
        }
        
        sendMessage() {
            const input = this.elements.messageInput;
            if (!input || !input.value.trim() || !AppState.activeChat) return;
            
            const messageText = input.value.trim();
            const chatId = AppState.activeChat;
            
            // Создаем сообщение
            const message = {
                id: Date.now(),
                chatId: chatId,
                sender: AppState.user.id,
                text: messageText,
                time: this.getCurrentTime(),
                type: 'text',
                status: 'sending',
                edited: false
            };
            
            // Добавляем в хранилище
            const chatMessages = AppState.messages.get(chatId) || [];
            chatMessages.push(message);
            AppState.messages.set(chatId, chatMessages);
            
            // Отображаем
            const messageElement = this.createMessageElement(message);
            this.elements.messagesScroll.appendChild(messageElement);
            
            // Очищаем поле ввода
            input.value = '';
            
            // Прокручиваем вниз
            this.scrollToBottom();
            
            // Имитируем отправку
            setTimeout(() => {
                message.status = 'sent';
                this.updateMessageStatus(message.id, 'sent');
                
                // Имитируем ответ
                setTimeout(() => {
                    this.simulateReply(chatId);
                }, 1000 + Math.random() * 2000);
            }, 500 + Math.random() * 1000);
        }
        
        simulateReply(chatId) {
            const replies = [
                'Понял вас!',
                'Отличная идея!',
                'Давайте обсудим подробнее',
                'Согласен с вами',
                'Интересный вопрос'
            ];
            
            const contacts = Array.from(AppState.contacts.values());
            const randomContact = contacts[Math.floor(Math.random() * contacts.length)];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            
            const message = {
                id: Date.now(),
                chatId: chatId,
                sender: randomContact.id,
                text: randomReply,
                time: this.getCurrentTime(),
                type: 'text',
                status: 'delivered',
                edited: false
            };
            
            const chatMessages = AppState.messages.get(chatId) || [];
            chatMessages.push(message);
            AppState.messages.set(chatId, chatMessages);
            
            const messageElement = this.createMessageElement(message);
            this.elements.messagesScroll.appendChild(messageElement);
            this.scrollToBottom();
            
            notificationSystem.show(randomContact.name, randomReply, {
                type: 'message',
                duration: 3000
            });
        }
        
        updateMessageStatus(messageId, status) {
            const messageElements = document.querySelectorAll(`[data-message-id="${messageId}"]`);
            messageElements.forEach(element => {
                const statusIcon = element.querySelector('.message-status i');
                if (statusIcon) {
                    statusIcon.className = `fas fa-${this.getMessageStatusIcon(status)}`;
                }
            });
        }
        
        scrollToBottom() {
            if (this.elements.messagesScroll) {
                this.elements.messagesScroll.scrollTop = this.elements.messagesScroll.scrollHeight;
            }
        }
        
        toggleTheme() {
            const newTheme = AppState.user.settings.theme === 'dark' ? 'light' : 'dark';
            AppState.user.settings.theme = newTheme;
            document.body.className = `${newTheme}-theme`;
            localStorage.setItem('theme', newTheme);
            
            const themeIcon = this.elements.themeToggleBtn?.querySelector('i');
            if (themeIcon) {
                themeIcon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
            }
            
            notificationSystem.show('Тема изменена', 
                `Переключено на ${newTheme === 'dark' ? 'тёмную' : 'светлую'} тему`, {
                type: 'info',
                icon: newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun'
            });
        }
        
        startConference() {
            this.elements.conferenceScreen.classList.add('active');
            this.startConferenceTimer();
            
            notificationSystem.show('Конференция начата', 
                'Присоединяйтесь к обсуждению', {
                type: 'conference',
                duration: 3000
            });
        }
        
        startConferenceTimer() {
            if (AppState.conferenceTimer) clearInterval(AppState.conferenceTimer);
            
            AppState.conferenceTimer = setInterval(() => {
                AppState.conferenceDuration++;
                const minutes = Math.floor(AppState.conferenceDuration / 60).toString().padStart(2, '0');
                const seconds = (AppState.conferenceDuration % 60).toString().padStart(2, '0');
                
                const timerElement = document.getElementById('conferenceTimer');
                if (timerElement) {
                    timerElement.textContent = `${minutes}:${seconds}`;
                }
            }, 1000);
        }
        
        showNewChatModal() {
            // Здесь будет модальное окно создания нового чата
            notificationSystem.show('Новый чат', 
                'Выберите контакты для начала разговора', {
                type: 'info',
                duration: 3000
            });
        }
        
        // ===== ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ =====
        getCurrentTime() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        }
        
        updateContextInfo() {
            const node = AppState.nodes.get(AppState.activeNode);
            if (!node) return;
            
            const contextIcon = document.querySelector('.context-icon');
            const contextTitle = document.querySelector('.context-title');
            const contextSubtitle = document.querySelector('.context-subtitle');
            
            if (contextIcon) {
                contextIcon.style.background = node.gradient;
                contextIcon.innerHTML = `<i class="${node.icon}"></i>`;
            }
            
            if (contextTitle) {
                contextTitle.textContent = node.name;
            }
            
            if (contextSubtitle) {
                contextSubtitle.textContent = `${node.members} участников • ${node.online} онлайн`;
            }
        }
        
        updateChatInfo(chat) {
            const chatAvatar = document.querySelector('.chat-avatar');
            const chatTitle = document.querySelector('.chat-title');
            const chatStatus = document.querySelector('.status-text');
            
            if (chatAvatar) {
                chatAvatar.style.background = chat.color;
                chatAvatar.textContent = chat.avatar;
            }
            
            if (chatTitle) {
                chatTitle.textContent = chat.name;
            }
            
            if (chatStatus) {
                chatStatus.textContent = `${chat.members} участников • ${chat.online} онлайн`;
            }
        }
        
        handleBack() {
            if (AppState.activeChat) {
                this.closeChat();
            } else if (AppState.activeCall) {
                this.endCall();
            } else if (AppState.activeConference) {
                this.endConference();
            }
        }
        
        handleEscape() {
            if (AppState.activeChat) this.closeChat();
            if (AppState.activeCall) this.endCall();
            if (AppState.activeConference) this.endConference();
        }
        
        startChatWithContact(contactId) {
            const contact = AppState.contacts.get(contactId);
            if (!contact) return;
            
            // Создаем новый чат или находим существующий
            const chatId = `contact_${contactId}`;
            if (!AppState.chats.has(chatId)) {
                const newChat = {
                    id: chatId,
                    node: 'personal',
                    name: contact.name,
                    type: 'personal',
                    avatar: contact.avatar,
                    color: contact.color,
                    description: contact.bio,
                    members: 2,
                    online: contact.online ? 2 : 1,
                    lastMessage: { text: '', sender: '', time: '', read: true },
                    unread: 0,
                    pinned: false,
                    muted: false,
                    archived: false
                };
                AppState.chats.set(chatId, newChat);
            }
            
            this.openChat(chatId);
        }
        
        // ===== ЗВОНКИ =====
        startCall(contactId, type = 'audio') {
            const contact = AppState.contacts.get(contactId);
            if (!contact) return;
            
            AppState.activeCall = { contact, type };
            this.elements.callScreen.classList.add('active');
            this.startCallTimer();
            
            notificationSystem.show(`${type === 'audio' ? 'Звонок' : 'Видеозвонок'}`, 
                `Вызов ${contact.name}`, {
                type: 'call',
                duration: 3000
            });
        }
        
        startCallTimer() {
            if (AppState.callTimer) clearInterval(AppState.callTimer);
            
            AppState.callTimer = setInterval(() => {
                AppState.callDuration++;
                const minutes = Math.floor(AppState.callDuration / 60).toString().padStart(2, '0');
                const seconds = (AppState.callDuration % 60).toString().padStart(2, '0');
                
                const timerElement = document.getElementById('callTimer');
                if (timerElement) {
                    timerElement.textContent = `${minutes}:${seconds}`;
                }
            }, 1000);
        }
        
        endCall() {
            if (AppState.callTimer) {
                clearInterval(AppState.callTimer);
                AppState.callTimer = null;
            }
            
            this.elements.callScreen.classList.remove('active');
            AppState.activeCall = null;
            
            notificationSystem.show('Звонок завершен', 
                `Длительность: ${AppState.callDuration} сек`, {
                type: 'info',
                duration: 3000
            });
            
            AppState.callDuration = 0;
        }
        
        endConference() {
            if (AppState.conferenceTimer) {
                clearInterval(AppState.conferenceTimer);
                AppState.conferenceTimer = null;
            }
            
            this.elements.conferenceScreen.classList.remove('active');
            AppState.activeConference = null;
            
            notificationSystem.show('Конференция завершена', 
                `Длительность: ${AppState.conferenceDuration} сек`, {
                type: 'info',
                duration: 3000
            });
            
            AppState.conferenceDuration = 0;
        }
        
        showLoading() {
            if (this.elements.loadingOverlay) {
                this.elements.loadingOverlay.style.display = 'flex';
            }
        }
        
        hideLoading() {
            if (this.elements.loadingOverlay) {
                this.elements.loadingOverlay.style.display = 'none';
            }
        }
    }
    
    const uiSystem = new UISystem();
    
    // ===== ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ =====
    function init() {
        console.log('🎯 Telegram Nodes запускается...');
        
        // Показываем приветственное уведомление
        setTimeout(() => {
            notificationSystem.show(
                'Добро пожаловать в Telegram Nodes!',
                'Современный мессенджер с узлами и конференциями',
                { type: 'success', duration: 5000 }
            );
        }, 1000);
        
        // Инициализируем обновления статуса
        initStatusUpdates();
        
        console.log('✅ Приложение успешно запущено');
    }
    
    function initStatusUpdates() {
        // Обновление времени
        setInterval(() => {
            const timeElements = document.querySelectorAll('.time, .chat-time');
            timeElements.forEach(el => {
                if (el.textContent === 'Сейчас') {
                    el.textContent = uiSystem.getCurrentTime();
                }
            });
        }, 60000);
        
        // Имитация активности
        setInterval(() => {
            if (!AppState.activeChat && Math.random() > 0.7) {
                const chats = Array.from(AppState.chats.values());
                const randomChat = chats[Math.floor(Math.random() * chats.length)];
                if (randomChat) {
                    randomChat.unread++;
                    uiSystem.renderChats();
                }
            }
        }, 15000);
    }
    
    // Глобальные методы для консоли
    window.TelegramNodes = {
        openChat: (chatId) => uiSystem.openChat(chatId),
        startCall: (contactId, type) => uiSystem.startCall(contactId, type),
        startConference: () => uiSystem.startConference(),
        toggleTheme: () => uiSystem.toggleTheme(),
        showNotification: (title, message, type) => 
            notificationSystem.show(title, message, { type }),
        
        getState: () => ({ ...AppState }),
        getNodes: () => Array.from(AppState.nodes.values()),
        getChats: () => Array.from(AppState.chats.values()),
        getContacts: () => Array.from(AppState.contacts.values()),
        
        test: () => {
            notificationSystem.show('Тест', 'Консольные команды работают!', {
                type: 'success',
                duration: 3000
            });
        },
        
        help: () => {
            console.log('🚀 Telegram Nodes Console Commands:');
            console.log('TelegramNodes.openChat("chatId") - открыть чат');
            console.log('TelegramNodes.startCall(1, "audio") - звонок контакту');
            console.log('TelegramNodes.startConference() - начать конференцию');
            console.log('TelegramNodes.toggleTheme() - сменить тему');
            console.log('TelegramNodes.showNotification("Заголовок", "Текст", "type")');
            console.log('TelegramNodes.getState() - получить состояние приложения');
            console.log('TelegramNodes.getNodes() - получить список узлов');
            console.log('TelegramNodes.test() - тестовая команда');
        }
    };
    
    console.log('🎮 Введите TelegramNodes.help() для списка команд');
    
    // Запуск приложения
    try {
        init();
    } catch (error) {
        console.error('❌ Ошибка запуска:', error);
        notificationSystem.show('Ошибка запуска', error.message, { type: 'error' });
    }
});
