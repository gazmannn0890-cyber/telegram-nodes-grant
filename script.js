// ============================================
// TELEGRAM NODES - ПОЛНАЯ ВЕРСИЯ
// Версия: 2.1 | Разработчик: Газман
// Строк кода: ~8000
// ============================================

// ████████████████████████████████████████████
// ███ КОНФИГУРАЦИЯ И ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ███
// ████████████████████████████████████████████

const CONFIG = {
    APP_NAME: 'Telegram Nodes',
    VERSION: '2.1',
    DEVELOPER: 'Газман',
    DEFAULT_THEME: 'dark',
    API_BASE_URL: 'https://api.telegram-nodes.com',
    
    FEATURES: {
        NODES: true,
        CHATS: true,
        CALLS: true,
        CONFERENCES: true,
        VOICE_MESSAGES: true,
        STICKERS: true,
        EMOJI: true,
        POLLS: true,
        BOTS: true,
        NOTIFICATIONS: true,
        FILES: true,
        GAMES: true
    },
    
    LIMITS: {
        MAX_FILE_SIZE: 2000,
        MAX_PARTICIPANTS: 100,
        MAX_NODES: 20,
        MAX_CHATS: 1000,
        MAX_MESSAGE_LENGTH: 4000,
        MAX_CONTACTS: 5000
    },
    
    COLORS: {
        PRIMARY: '#0088cc',
        SECONDARY: '#af52de',
        SUCCESS: '#34c759',
        WARNING: '#ff9500',
        ERROR: '#ff3b30',
        INFO: '#5ac8fa',
        INDIGO: '#5856d6'
    },
    
    ANIMATION_DURATIONS: {
        FAST: 200,
        NORMAL: 300,
        SLOW: 500,
        VERY_SLOW: 800
    },
    
    STORAGE_KEYS: {
        AUTH: 'telegram-nodes-auth-v2',
        SETTINGS: 'telegram-nodes-settings-v2',
        THEME: 'telegram-nodes-theme-v2',
        USER_DATA: 'telegram-nodes-user-data-v2',
        NODES_DATA: 'telegram-nodes-nodes-data-v2',
        CHATS_DATA: 'telegram-nodes-chats-data-v2',
        CONTACTS_DATA: 'telegram-nodes-contacts-data-v2'
    }
};

// ████████████████████████████████████████████
// ███ МОДЕЛИ ДАННЫХ И ТИПЫ ███
// ████████████████████████████████████████████

class User {
    constructor(data) {
        this.id = data.id || 1;
        this.name = data.name || 'Газман';
        this.username = data.username || '@gazman';
        this.avatar = data.avatar || 'Г';
        this.status = data.status || 'Основатель Telegram Nodes';
        this.online = data.online !== undefined ? data.online : true;
        this.bio = data.bio || 'Любитель кофе и технологий • Разработчик • Геймер • Дизайнер';
        this.location = data.location || 'Москва, Россия';
        this.phone = data.phone || '+7 (900) 123-45-67';
        this.email = data.email || 'gazman@telegram-nodes.com';
        this.joined = data.joined || '2023-01-15';
        this.lastSeen = data.lastSeen || 'только что';
        this.settings = data.settings || {
            notifications: true,
            sound: true,
            vibration: true,
            autoDownload: true,
            saveToGallery: true,
            privacy: 'everybody',
            language: 'ru',
            theme: 'auto'
        };
        this.stats = data.stats || {
            chats: 156,
            contacts: 48,
            nodes: 7,
            online: 1,
            messages: 25489,
            storage: 2.4,
            calls: 342,
            conferences: 56
        };
        this.achievements = data.achievements || [
            { id: 1, name: 'Первое сообщение', icon: 'fa-comment', unlocked: true },
            { id: 2, name: 'Активный пользователь', icon: 'fa-fire', unlocked: true },
            { id: 3, name: 'Создатель узлов', icon: 'fa-sitemap', unlocked: true },
            { id: 4, name: 'Мастер конференций', icon: 'fa-users', unlocked: false },
            { id: 5, name: 'Гуру уведомлений', icon: 'fa-bell', unlocked: true }
        ];
    }
}

class Node {
    constructor(data) {
        this.id = data.id || `node-${Date.now()}`;
        this.name = data.name || 'Новый узел';
        this.icon = data.icon || 'fas fa-users';
        this.color = data.color || CONFIG.COLORS.PRIMARY;
        this.description = data.description || 'Описание узла';
        this.members = data.members || 1;
        this.online = data.online || 1;
        this.unread = data.unread || 0;
        this.created = data.created || new Date().toISOString().split('T')[0];
        this.admin = data.admin || false;
        this.pinned = data.pinned || false;
        this.notifications = data.notifications || 'all';
        this.role = data.role || 'Участник';
        this.tags = data.tags || ['новый'];
        this.stats = data.stats || {
            messages: 0,
            files: 0,
            calls: 0,
            conferences: 0
        };
    }
}

class Chat {
    constructor(data) {
        this.id = data.id || `chat-${Date.now()}`;
        this.node = data.node || 'personal';
        this.name = data.name || 'Новый чат';
        this.type = data.type || 'personal';
        this.avatar = data.avatar || this.name.charAt(0);
        this.color = data.color || CONFIG.COLORS.PRIMARY;
        this.lastMessage = data.lastMessage || 'Начните общение';
        this.time = data.time || 'только что';
        this.unread = data.unread || 0;
        this.members = data.members || 2;
        this.online = data.online || 1;
        this.pinned = data.pinned || false;
        this.verified = data.verified || false;
        this.muted = data.muted || false;
        this.archived = data.archived || false;
        this.lastActivity = data.lastActivity || new Date().toISOString();
        this.tags = data.tags || ['личное'];
        this.permissions = data.permissions || {
            sendMessages: true,
            sendMedia: true,
            sendPolls: true,
            addMembers: true,
            pinMessages: true,
            changeInfo: true
        };
    }
}

class Contact {
    constructor(data) {
        this.id = data.id || Date.now();
        this.name = data.name || 'Новый контакт';
        this.avatar = data.avatar || this.name.charAt(0);
        this.status = data.status || 'offline';
        this.lastSeen = data.lastSeen || 'давно';
        this.activity = data.activity || 'Не в сети';
        this.color = data.color || CONFIG.COLORS.PRIMARY;
        this.username = data.username || `@${this.name.toLowerCase()}`;
        this.phone = data.phone || '+7 (900) XXX-XX-XX';
        this.email = data.email || `${this.name.toLowerCase()}@example.com`;
        this.isContact = data.isContact !== undefined ? data.isContact : true;
        this.isBlocked = data.isBlocked || false;
        this.mutualNodes = data.mutualNodes || [];
        this.notes = data.notes || '';
        this.tags = data.tags || ['новый'];
    }
}

class Message {
    constructor(data) {
        this.id = data.id || Date.now();
        this.sender = data.sender || 'Вы';
        this.text = data.text || '';
        this.time = data.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.type = data.type || 'outgoing';
        this.status = data.status || 'sent';
        this.avatar = data.avatar || this.sender.charAt(0);
        this.color = data.color || CONFIG.COLORS.PRIMARY;
        this.reactions = data.reactions || {};
        this.edited = data.edited || false;
        this.pinned = data.pinned || false;
        this.verified = data.verified || false;
        this.replyTo = data.replyTo || null;
        this.sticker = data.sticker || null;
        this.file = data.file || null;
        this.poll = data.poll || null;
    }
}

// ████████████████████████████████████████████
// ███ ХРАНИЛИЩЕ ДАННЫХ ███
// ████████████████████████████████████████████

class DataStore {
    constructor() {
        this.user = null;
        this.nodes = [];
        this.chats = [];
        this.contacts = [];
        this.messages = {};
        this.activity = [];
        this.files = [];
        this.calls = [];
        this.notifications = [];
        this.polls = [];
        this.bots = [];
        this.stickers = {
            popular: [],
            recent: []
        };
        this.emojis = {
            smileys: [],
            people: [],
            nature: [],
            objects: [],
            symbols: [],
            flags: []
        };
        
        this.init();
    }
    
    init() {
        this.loadFromStorage();
        if (!this.user) {
            this.loadSampleData();
        }
    }
    
    loadSampleData() {
        // Загрузка демо-данных
        this.user = new User({});
        
        this.nodes = [
            new Node({
                id: 'alpha',
                name: 'AlphaTeam',
                icon: 'fas fa-rocket',
                color: CONFIG.COLORS.PRIMARY,
                description: 'Рабочая команда разработки и управления проектами',
                members: 24,
                online: 12,
                unread: 3,
                admin: true,
                pinned: true,
                role: 'Создатель',
                tags: ['работа', 'разработка', 'управление']
            }),
            new Node({
                id: 'game',
                name: 'GameZone',
                icon: 'fas fa-gamepad',
                color: CONFIG.COLORS.SECONDARY,
                description: 'Игровое сообщество для любителей киберспорта',
                members: 48,
                online: 23,
                admin: true,
                pinned: true,
                role: 'Администратор',
                tags: ['игры', 'киберспорт', 'развлечения']
            }),
            new Node({
                id: 'family',
                name: 'Family',
                icon: 'fas fa-heart',
                color: CONFIG.COLORS.SUCCESS,
                description: 'Семейный чат для общения с близкими',
                members: 12,
                online: 4,
                unread: 1,
                admin: true,
                role: 'Создатель',
                tags: ['семья', 'личное', 'близкие']
            }),
            new Node({
                id: 'design',
                name: 'DesignHub',
                icon: 'fas fa-palette',
                color: CONFIG.COLORS.WARNING,
                description: 'Дизайн и креатив для профессионалов',
                members: 18,
                online: 8,
                admin: false,
                role: 'Участник',
                tags: ['дизайн', 'креатив', 'ui/ux']
            }),
            new Node({
                id: 'music',
                name: 'MusicLovers',
                icon: 'fas fa-music',
                color: CONFIG.COLORS.ERROR,
                description: 'Обмен музыкой и обсуждение новых релизов',
                members: 32,
                online: 15,
                unread: 5,
                admin: false,
                role: 'Участник',
                tags: ['музыка', 'развлечения', 'творчество']
            }),
            new Node({
                id: 'travel',
                name: 'TravelBuddy',
                icon: 'fas fa-plane',
                color: CONFIG.COLORS.INDIGO,
                description: 'Планирование путешествий и обмен опытом',
                members: 27,
                online: 9,
                unread: 2,
                admin: true,
                pinned: true,
                role: 'Модератор',
                tags: ['путешествия', 'отдых', 'приключения']
            }),
            new Node({
                id: 'fitness',
                name: 'FitnessClub',
                icon: 'fas fa-dumbbell',
                color: CONFIG.COLORS.INFO,
                description: 'Тренировки, питание и здоровый образ жизни',
                members: 41,
                online: 18,
                admin: false,
                role: 'Участник',
                tags: ['спорт', 'здоровье', 'фитнес']
            })
        ];
        
        this.chats = [
            new Chat({
                id: 'design-team',
                node: 'alpha',
                name: 'Дизайн-команда',
                type: 'group',
                avatar: 'Д',
                color: CONFIG.COLORS.PRIMARY,
                lastMessage: 'Обсуждаем новый UI для проекта. Завтра встреча в 11:00',
                time: '12:30',
                unread: 3,
                members: 8,
                online: 5,
                pinned: true,
                tags: ['работа', 'дизайн', 'проект']
            }),
            new Chat({
                id: 'durov-chat',
                node: 'alpha',
                name: 'Павел Дуров',
                type: 'personal',
                avatar: 'ПД',
                color: CONFIG.COLORS.PRIMARY,
                lastMessage: 'Новый функционал выглядит отлично! Давайте обсудим детали',
                time: '10:30',
                unread: 1,
                members: 2,
                online: 1,
                pinned: true,
                verified: true,
                tags: ['личное', 'работа', 'знакомства']
            }),
            new Chat({
                id: 'cybersport',
                node: 'game',
                name: 'Киберспорт турнир',
                type: 'group',
                avatar: 'К',
                color: CONFIG.COLORS.SECONDARY,
                lastMessage: 'Стартуем в 20:00, не опаздывайте! Регистрация обязательна',
                time: '11:45',
                members: 24,
                online: 16,
                pinned: true,
                tags: ['игры', 'киберспорт', 'турнир']
            }),
            new Chat({
                id: 'family-chat',
                node: 'family',
                name: 'Семейный чат',
                type: 'group',
                avatar: 'С',
                color: CONFIG.COLORS.SUCCESS,
                lastMessage: 'Кто за пиццей сегодня? Собираемся в 19:00',
                time: '09:15',
                members: 12,
                online: 3,
                tags: ['семья', 'еда', 'встречи']
            }),
            new Chat({
                id: 'music-share',
                node: 'music',
                name: 'Music Share',
                type: 'group',
                avatar: 'MS',
                color: CONFIG.COLORS.ERROR,
                lastMessage: 'Новый альбом выходит завтра! Кто уже предзаказал?',
                time: '08:45',
                unread: 7,
                members: 19,
                online: 11,
                pinned: true,
                muted: true,
                tags: ['музыка', 'новинки', 'альбомы']
            })
        ];
        
        this.contacts = [
            new Contact({
                id: 1,
                name: 'Алексей',
                avatar: 'А',
                status: 'online',
                lastSeen: 'только что',
                activity: 'В звонке',
                color: CONFIG.COLORS.PRIMARY,
                username: '@alexey_dev',
                phone: '+7 (900) 111-22-33',
                email: 'alexey@example.com',
                mutualNodes: ['alpha', 'design'],
                notes: 'Коллега по работе, разработчик',
                tags: ['работа', 'разработка', 'друг']
            }),
            new Contact({
                id: 2,
                name: 'Мария',
                avatar: 'М',
                status: 'typing',
                lastSeen: 'печатает...',
                activity: 'Онлайн',
                color: CONFIG.COLORS.SECONDARY,
                username: '@maria_design',
                phone: '+7 (900) 222-33-44',
                email: 'maria@example.com',
                mutualNodes: ['alpha', 'design', 'music'],
                notes: 'Дизайнер, работает над новым проектом',
                tags: ['работа', 'дизайн', 'музыка']
            }),
            new Contact({
                id: 3,
                name: 'Павел Дуров',
                avatar: 'ПД',
                status: 'online',
                lastSeen: '5 мин назад',
                activity: 'В конференции',
                color: CONFIG.COLORS.SUCCESS,
                username: '@durov',
                phone: '+7 (900) 333-44-55',
                email: 'durov@telegram.org',
                mutualNodes: ['alpha', 'game'],
                notes: 'Основатель Telegram',
                tags: ['знаменитость', 'разработка', 'лидер']
            }),
            new Contact({
                id: 4,
                name: 'Дмитрий',
                avatar: 'Д',
                status: 'online',
                lastSeen: '2 ч назад',
                activity: 'CS2 онлайн',
                color: CONFIG.COLORS.WARNING,
                username: '@dima_gamer',
                phone: '+7 (900) 444-55-66',
                email: 'dima@example.com',
                mutualNodes: ['game', 'fitness'],
                notes: 'Геймер, участвует в турнирах',
                tags: ['игры', 'спорт', 'друг']
            }),
            new Contact({
                id: 5,
                name: 'Екатерина',
                avatar: 'Е',
                status: 'offline',
                lastSeen: 'вчера',
                activity: 'Был(-а) 2 дня назад',
                color: CONFIG.COLORS.ERROR,
                username: '@katya_music',
                phone: '+7 (900) 555-66-77',
                email: 'katya@example.com',
                mutualNodes: ['music', 'travel'],
                notes: 'Любитель музыки, часто путешествует',
                tags: ['музыка', 'путешествия', 'знакомство']
            }),
            new Contact({
                id: 6,
                name: 'Иван',
                avatar: 'И',
                status: 'online',
                lastSeen: '30 мин назад',
                activity: 'В сети',
                color: CONFIG.COLORS.INDIGO,
                username: '@ivan_travel',
                phone: '+7 (900) 666-77-88',
                email: 'ivan@example.com',
                isContact: false,
                mutualNodes: ['travel'],
                tags: ['путешествия']
            }),
            new Contact({
                id: 7,
                name: 'Ольга',
                avatar: 'О',
                status: 'offline',
                lastSeen: 'неделю назад',
                activity: 'Был(-а) давно',
                color: CONFIG.COLORS.INFO,
                username: '@olga_fitness',
                phone: '+7 (900) 777-88-99',
                email: 'olga@example.com',
                mutualNodes: ['fitness'],
                notes: 'Тренер по фитнесу',
                tags: ['спорт', 'фитнес']
            })
        ];
        
        this.messages = {
            'design-team': [
                new Message({
                    id: 1,
                    sender: 'Мария',
                    text: 'Привет! Как продвигается работа над новым дизайном?',
                    time: '12:15',
                    type: 'incoming',
                    status: 'read',
                    avatar: 'М',
                    color: CONFIG.COLORS.SECONDARY,
                    reactions: {
                        '👍': ['Вы', 'Алексей'],
                        '❤️': ['Мария']
                    }
                }),
                new Message({
                    id: 2,
                    sender: 'Вы',
                    text: 'Почти закончили! Осталось сделать анимации переходов между экранами',
                    time: '12:20',
                    type: 'outgoing',
                    status: 'read',
                    reactions: {
                        '👏': ['Алексей'],
                        '🚀': ['Мария']
                    },
                    edited: true
                }),
                new Message({
                    id: 3,
                    sender: 'Алексей',
                    text: 'Отлично! Когда сможете показать прототип? Завтра в 11:00 подойдет?',
                    time: '12:25',
                    type: 'incoming',
                    status: 'read',
                    avatar: 'А',
                    color: CONFIG.COLORS.PRIMARY,
                    reactions: {
                        '👍': ['Вы']
                    },
                    pinned: true
                }),
                new Message({
                    id: 4,
                    sender: 'Вы',
                    text: 'Да, отлично! Приготовлю презентацию',
                    time: '12:26',
                    type: 'outgoing',
                    status: 'read'
                }),
                new Message({
                    id: 5,
                    sender: 'Мария',
                    text: 'Я тоже буду, принесу кофе ☕',
                    time: '12:27',
                    type: 'incoming',
                    status: 'read',
                    avatar: 'М',
                    color: CONFIG.COLORS.SECONDARY,
                    reactions: {
                        '☕': ['Вы', 'Алексей']
                    }
                })
            ],
            'durov-chat': [
                new Message({
                    id: 1,
                    sender: 'Павел Дуров',
                    text: 'Привет! Вижу ты работаешь над новым интерфейсом для Telegram. Интересная концепция с узлами!',
                    time: '18:45',
                    type: 'incoming',
                    status: 'read',
                    avatar: 'ПД',
                    color: CONFIG.COLORS.SUCCESS,
                    verified: true,
                    reactions: {
                        '👀': ['Вы']
                    },
                    pinned: true
                }),
                new Message({
                    id: 2,
                    sender: 'Вы',
                    text: 'Да, Павел! Делаю улучшенную версию с узлами и конференциями. Хочу сделать управление сообществами более удобным',
                    time: '19:20',
                    type: 'outgoing',
                    status: 'read',
                    reactions: {
                        '👍': ['Павел Дуров']
                    },
                    edited: true
                }),
                new Message({
                    id: 3,
                    sender: 'Павел Дуров',
                    text: 'Отличная идея! Если нужна помощь или совет - обращайся. Удачи с проектом! 🚀',
                    time: '19:25',
                    type: 'incoming',
                    status: 'read',
                    avatar: 'ПД',
                    color: CONFIG.COLORS.SUCCESS,
                    verified: true,
                    reactions: {
                        '🚀': ['Вы']
                    }
                })
            ]
        };
        
        this.activity = [
            {
                id: 1,
                user: 'Алексей',
                action: 'calling',
                text: 'Начинает звонок в Дизайн-команда',
                time: '2 мин назад',
                icon: 'fas fa-phone',
                color: CONFIG.COLORS.PRIMARY,
                node: 'alpha',
                chat: 'design-team'
            },
            {
                id: 2,
                user: 'Мария',
                action: 'typing',
                text: 'Печатает сообщение в Павел Дуров',
                time: '5 мин назад',
                icon: 'fas fa-keyboard',
                color: CONFIG.COLORS.SECONDARY,
                node: 'alpha',
                chat: 'durov-chat'
            },
            {
                id: 3,
                user: 'Дмитрий',
                action: 'gaming',
                text: 'Играет в CS2',
                time: '15 мин назад',
                icon: 'fas fa-gamepad',
                color: CONFIG.COLORS.WARNING,
                node: 'game',
                chat: null
            },
            {
                id: 4,
                user: 'Павел Дуров',
                action: 'conference',
                text: 'В групповой конференции в AlphaTeam',
                time: '30 мин назад',
                icon: 'fas fa-users',
                color: CONFIG.COLORS.SUCCESS,
                node: 'alpha',
                chat: null
            },
            {
                id: 5,
                user: 'Екатерина',
                action: 'upload',
                text: 'Отправила фото в Music Share',
                time: '1 ч назад',
                icon: 'fas fa-image',
                color: CONFIG.COLORS.ERROR,
                node: 'music',
                chat: 'music-share'
            }
        ];
        
        this.notifications = [
            {
                id: 1,
                title: 'Новое сообщение',
                message: 'Мария отправила сообщение в Дизайн-команда',
                type: 'message',
                time: '2 мин назад',
                read: false,
                node: 'alpha',
                chat: 'design-team'
            },
            {
                id: 2,
                title: 'Входящий звонок',
                message: 'Алексей звонит вам',
                type: 'call',
                time: '15 мин назад',
                read: true,
                node: 'alpha',
                chat: null
            },
            {
                id: 3,
                title: 'Новый участник',
                message: 'Дмитрий присоединился к узлу GameZone',
                type: 'node',
                time: '1 ч назад',
                read: true,
                node: 'game',
                chat: null
            },
            {
                id: 4,
                title: 'Обновление системы',
                message: 'Доступно обновление Telegram Nodes v2.1',
                type: 'system',
                time: '3 ч назад',
                read: false,
                node: null,
                chat: null
            }
        ];
        
        this.calls = [
            {
                id: 1,
                type: 'outgoing',
                contact: 'Алексей',
                duration: '5:32',
                time: 'Сегодня, 10:30',
                status: 'completed',
                node: 'alpha',
                video: false
            },
            {
                id: 2,
                type: 'incoming',
                contact: 'Мария',
                duration: '12:45',
                time: 'Вчера, 15:20',
                status: 'missed',
                node: 'alpha',
                video: true
            },
            {
                id: 3,
                type: 'conference',
                contact: 'AlphaTeam',
                duration: '45:18',
                time: '2 дня назад, 11:00',
                status: 'completed',
                node: 'alpha',
                video: true,
                participants: 8
            }
        ];
        
        this.files = [
            {
                id: 1,
                name: 'presentation.pptx',
                size: '24.5 MB',
                type: 'document',
                sender: 'Вы',
                time: 'Вчера',
                node: 'alpha',
                chat: 'design-team',
                icon: 'fas fa-file-powerpoint',
                color: CONFIG.COLORS.ERROR
            },
            {
                id: 2,
                name: 'design-mockup.fig',
                size: '12.3 MB',
                type: 'design',
                sender: 'Мария',
                time: 'Сегодня',
                node: 'alpha',
                chat: 'design-team',
                icon: 'fas fa-palette',
                color: CONFIG.COLORS.SECONDARY
            },
            {
                id: 3,
                name: 'meeting-recording.mp4',
                size: '156.7 MB',
                type: 'video',
                sender: 'Алексей',
                time: '2 дня назад',
                node: 'alpha',
                chat: 'design-team',
                icon: 'fas fa-video',
                color: CONFIG.COLORS.PRIMARY
            }
        ];
        
        this.polls = [
            {
                id: 1,
                question: 'Какое время для встречи подходит лучше?',
                options: [
                    { text: '10:00', votes: 3, percentage: 30 },
                    { text: '14:00', votes: 5, percentage: 50 },
                    { text: '16:00', votes: 2, percentage: 20 }
                ],
                totalVotes: 10,
                multiple: false,
                anonymous: false,
                created: 'Сегодня',
                expires: 'Завтра',
                node: 'alpha',
                chat: 'design-team',
                voted: true
            },
            {
                id: 2,
                question: 'Какую игру будем играть на турнире?',
                options: [
                    { text: 'CS2', votes: 12, percentage: 60 },
                    { text: 'Dota 2', votes: 5, percentage: 25 },
                    { text: 'Valorant', votes: 3, percentage: 15 }
                ],
                totalVotes: 20,
                multiple: true,
                anonymous: true,
                created: 'Вчера',
                expires: 'Через 3 дня',
                node: 'game',
                chat: 'cybersport',
                voted: false
            }
        ];
        
        this.bots = [
            {
                id: 1,
                name: 'MusicBot',
                username: '@music_bot',
                description: 'Поиск и прослушивание музыки',
                avatar: 'MB',
                color: CONFIG.COLORS.ERROR,
                node: 'music',
                commands: ['/play', '/search', '/lyrics']
            },
            {
                id: 2,
                name: 'NewsBot',
                username: '@news_bot',
                description: 'Последние новости и обновления',
                avatar: 'NB',
                color: CONFIG.COLORS.PRIMARY,
                node: 'alpha',
                commands: ['/news', '/subscribe', '/unsubscribe']
            },
            {
                id: 3,
                name: 'GameBot',
                username: '@game_bot',
                description: 'Организация игровых турниров',
                avatar: 'GB',
                color: CONFIG.COLORS.SECONDARY,
                node: 'game',
                commands: ['/tournament', '/register', '/score']
            }
        ];
        
        this.stickers = {
            popular: [
                { id: 1, emoji: '😊', url: 'sticker1.png', pack: 'Smileys' },
                { id: 2, emoji: '❤️', url: 'sticker2.png', pack: 'Hearts' },
                { id: 3, emoji: '🎉', url: 'sticker3.png', pack: 'Celebration' },
                { id: 4, emoji: '😂', url: 'sticker4.png', pack: 'Smileys' },
                { id: 5, emoji: '👍', url: 'sticker5.png', pack: 'Gestures' }
            ],
            recent: [
                { id: 6, emoji: '🔥', url: 'sticker6.png', pack: 'Trending' },
                { id: 7, emoji: '🚀', url: 'sticker7.png', pack: 'Space' }
            ]
        };
        
        this.emojis = {
            smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯'],
            people: ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🦷', '🦴', '👀', '👁️', '👅', '👄'],
            nature: ['🐵', '🐒', '🦍', '🐶', '🐕', '🦮', '🐕‍🦺', '🐩', '🐺', '🦊', '🦝', '🐱', '🐈', '🦁', '🐯', '🐅', '🐆', '🐴', '🐎', '🦄', '🦓', '🦌', '🐮', '🐂', '🐃', '🐄', '🐷', '🐖', '🐗', '🐽', '🐏', '🐑', '🐐', '🐪', '🐫', '🦙', '🦒', '🐘', '🦏', '🦛', '🐭', '🐁', '🐀', '🐹', '🐰', '🐇', '🐿️'],
            objects: ['⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🎮', '🕹️', '🗜️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️', '⏲️', '⏰', '🕰️', '⌛', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯️', '🧯'],
            symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️'],
            flags: ['🏁', '🚩', '🎌', '🏴', '🏳️', '🏳️‍🌈', '🏳️‍⚧️', '🏴‍☠️', '🇦🇫', '🇦🇽', '🇦🇱', '🇩🇿', '🇦🇸', '🇦🇩', '🇦🇴', '🇦🇮', '🇦🇶', '🇦🇬', '🇦🇷', '🇦🇲', '🇦🇼', '🇦🇺', '🇦🇹', '🇦🇿', '🇧🇸', '🇧🇭', '🇧🇩', '🇧🇧', '🇧🇾', '🇧🇪', '🇧🇿', '🇧🇯', '🇧🇲', '🇧🇹', '🇧🇴', '🇧🇦', '🇧🇼', '🇧🇷', '🇮🇴', '🇻🇬', '🇧🇳', '🇧🇬', '🇧🇫', '🇧🇮', '🇨🇻']
        };
        
        this.saveToStorage();
    }
    
    saveToStorage() {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(this.user));
            localStorage.setItem(CONFIG.STORAGE_KEYS.NODES_DATA, JSON.stringify(this.nodes));
            localStorage.setItem(CONFIG.STORAGE_KEYS.CHATS_DATA, JSON.stringify(this.chats));
            localStorage.setItem(CONFIG.STORAGE_KEYS.CONTACTS_DATA, JSON.stringify(this.contacts));
        } catch (e) {
            console.error('Ошибка сохранения данных:', e);
        }
    }
    
    loadFromStorage() {
        try {
            const userData = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_DATA);
            const nodesData = localStorage.getItem(CONFIG.STORAGE_KEYS.NODES_DATA);
            const chatsData = localStorage.getItem(CONFIG.STORAGE_KEYS.CHATS_DATA);
            const contactsData = localStorage.getItem(CONFIG.STORAGE_KEYS.CONTACTS_DATA);
            
            if (userData) this.user = new User(JSON.parse(userData));
            if (nodesData) this.nodes = JSON.parse(nodesData).map(data => new Node(data));
            if (chatsData) this.chats = JSON.parse(chatsData).map(data => new Chat(data));
            if (contactsData) this.contacts = JSON.parse(contactsData).map(data => new Contact(data));
        } catch (e) {
            console.error('Ошибка загрузки данных:', e);
        }
    }
    
    // Методы для работы с данными
    addNode(nodeData) {
        const node = new Node(nodeData);
        this.nodes.push(node);
        this.saveToStorage();
        return node;
    }
    
    removeNode(nodeId) {
        const index = this.nodes.findIndex(node => node.id === nodeId);
        if (index !== -1) {
            this.nodes.splice(index, 1);
            this.saveToStorage();
            return true;
        }
        return false;
    }
    
    updateNode(nodeId, updates) {
        const node = this.nodes.find(node => node.id === nodeId);
        if (node) {
            Object.assign(node, updates);
            this.saveToStorage();
            return node;
        }
        return null;
    }
    
    addChat(chatData) {
        const chat = new Chat(chatData);
        this.chats.push(chat);
        this.saveToStorage();
        return chat;
    }
    
    removeChat(chatId) {
        const index = this.chats.findIndex(chat => chat.id === chatId);
        if (index !== -1) {
            this.chats.splice(index, 1);
            delete this.messages[chatId];
            this.saveToStorage();
            return true;
        }
        return false;
    }
    
    addContact(contactData) {
        const contact = new Contact(contactData);
        this.contacts.push(contact);
        this.saveToStorage();
        return contact;
    }
    
    removeContact(contactId) {
        const index = this.contacts.findIndex(contact => contact.id === contactId);
        if (index !== -1) {
            this.contacts.splice(index, 1);
            this.saveToStorage();
            return true;
        }
        return false;
    }
    
    addMessage(chatId, messageData) {
        if (!this.messages[chatId]) {
            this.messages[chatId] = [];
        }
        
        const message = new Message(messageData);
        this.messages[chatId].push(message);
        return message;
    }
    
    getMessages(chatId) {
        return this.messages[chatId] || [];
    }
    
    getNode(nodeId) {
        return this.nodes.find(node => node.id === nodeId);
    }
    
    getChat(chatId) {
        return this.chats.find(chat => chat.id === chatId);
    }
    
    getContact(contactId) {
        return this.contacts.find(contact => contact.id === contactId);
    }
    
    getChatsByNode(nodeId) {
        return this.chats.filter(chat => chat.node === nodeId);
    }
    
    getFilteredChats(filter = {}) {
        let filtered = [...this.chats];
        
        if (filter.node && filter.node !== 'all') {
            filtered = filtered.filter(chat => chat.node === filter.node);
        }
        
        if (filter.type) {
            filtered = filtered.filter(chat => chat.type === filter.type);
        }
        
        if (filter.search) {
            const searchTerm = filter.search.toLowerCase();
            filtered = filtered.filter(chat => 
                chat.name.toLowerCase().includes(searchTerm) ||
                chat.lastMessage.toLowerCase().includes(searchTerm) ||
                chat.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }
        
        if (filter.unread) {
            filtered = filtered.filter(chat => chat.unread > 0);
        }
        
        if (filter.pinned) {
            filtered = filtered.filter(chat => chat.pinned);
        }
        
        if (filter.archived !== undefined) {
            filtered = filtered.filter(chat => chat.archived === filter.archived);
        }
        
        return filtered;
    }
    
    getFilteredContacts(filter = {}) {
        let filtered = [...this.contacts];
        
        if (filter.search) {
            const searchTerm = filter.search.toLowerCase();
            filtered = filtered.filter(contact =>
                contact.name.toLowerCase().includes(searchTerm) ||
                contact.username.toLowerCase().includes(searchTerm) ||
                contact.phone.includes(searchTerm)
            );
        }
        
        if (filter.status) {
            filtered = filtered.filter(contact => contact.status === filter.status);
        }
        
        if (filter.contact !== undefined) {
            filtered = filtered.filter(contact => contact.isContact === filter.contact);
        }
        
        return filtered;
    }
}

// ████████████████████████████████████████████
// ███ МЕНЕДЖЕР СОСТОЯНИЯ ПРИЛОЖЕНИЯ ███
// ████████████████████████████████████████████

class AppStateManager {
    constructor() {
        this.state = {
            // Аутентификация
            isLoggedIn: false,
            isAuthenticating: false,
            
            // Тема и настройки
            theme: localStorage.getItem(CONFIG.STORAGE_KEYS.THEME) || CONFIG.DEFAULT_THEME,
            language: 'ru',
            
            // Навигация
            activeNode: 'alpha',
            activeChat: null,
            activeView: 'chats', // chats, contacts, calls, files, settings
            isSidebarVisible: window.innerWidth > 768,
            
            // Фильтры и поиск
            searchQuery: '',
            currentFilter: 'all',
            currentSort: 'time',
            
            // Чат
            isTyping: false,
            isEmojiPanelOpen: false,
            isStickerPanelOpen: false,
            replyToMessage: null,
            editingMessage: null,
            selectedMessages: new Set(),
            editMode: false,
            
            // Конференция
            isConferenceActive: false,
            conferenceTimer: 0,
            conferenceTimerInterval: null,
            
            // Голосовые сообщения
            recordingVoice: false,
            voiceRecordTime: 0,
            voiceRecordInterval: null,
            
            // Загрузки
            uploadQueue: [],
            currentUploads: [],
            downloadQueue: [],
            currentDownloads: [],
            
            // Онлайн статусы
            onlineUsers: new Set(),
            typingUsers: new Set(),
            
            // Уведомления
            unreadCount: 0,
            
            // Эмодзи
            selectedEmojiCategory: 'smileys',
            
            // Поиск
            searchResults: {
                messages: [],
                files: [],
                contacts: []
            },
            
            // Голосовые сообщения
            voiceMessages: [],
            
            // Настройки
            settings: {
                notifications: true,
                sounds: true,
                vibrations: true,
                autoPlayMedia: true,
                saveToGallery: true,
                privacy: {
                    lastSeen: 'everybody',
                    profilePhoto: 'everybody',
                    calls: 'everybody',
                    groups: 'everybody'
                },
                chat: {
                    enterToSend: true,
                    largeEmoji: true,
                    saveDrafts: true,
                    suggestion: true
                },
                data: {
                    autoDownload: {
                        photos: 'wifi',
                        videos: 'wifi',
                        files: 'never'
                    },
                    storage: {
                        autoClear: false,
                        clearInterval: 'month'
                    }
                },
                language: 'ru',
                theme: 'auto'
            }
        };
        
        this.observers = [];
        this.init();
    }
    
    init() {
        this.loadSettings();
        this.checkAuth();
    }
    
    // Паттерн Наблюдатель
    subscribe(observer) {
        this.observers.push(observer);
    }
    
    unsubscribe(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
    
    notify(event, data) {
        this.observers.forEach(observer => {
            if (observer.update) {
                observer.update(event, data);
            }
        });
    }
    
    // Управление состоянием
    setState(updates) {
        const oldState = { ...this.state };
        this.state = { ...this.state, ...updates };
        
        // Определить какие части состояния изменились
        const changedKeys = Object.keys(updates);
        this.notify('stateChanged', { 
            updates, 
            oldState, 
            newState: this.state,
            changedKeys 
        });
        
        // Автосохранение важных полей
        this.autoSave();
    }
    
    autoSave() {
        // Сохраняем важные настройки
        localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, this.state.theme);
        localStorage.setItem(CONFIG.STORAGE_KEYS.SETTINGS, JSON.stringify(this.state.settings));
    }
    
    loadSettings() {
        try {
            const savedSettings = localStorage.getItem(CONFIG.STORAGE_KEYS.SETTINGS);
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                this.state.settings = { ...this.state.settings, ...settings };
            }
        } catch (e) {
            console.error('Ошибка загрузки настроек:', e);
        }
    }
    
    checkAuth() {
        try {
            const savedAuth = localStorage.getItem(CONFIG.STORAGE_KEYS.AUTH);
            if (savedAuth) {
                const authData = JSON.parse(savedAuth);
                if (authData.isLoggedIn && authData.expires > Date.now()) {
                    this.setState({ isLoggedIn: true });
                }
            }
        } catch (e) {
            console.error('Ошибка проверки авторизации:', e);
        }
    }
    
    // Геттеры для удобства
    get isMobile() {
        return window.innerWidth <= 768;
    }
    
    get isTablet() {
        return window.innerWidth > 768 && window.innerWidth <= 1024;
    }
    
    get isDesktop() {
        return window.innerWidth > 1024;
    }
    
    get activeNodeData() {
        return dataStore.getNode(this.state.activeNode);
    }
    
    get activeChatData() {
        return dataStore.getChat(this.state.activeChat);
    }
    
    get filteredChats() {
        return dataStore.getFilteredChats({
            node: this.state.activeNode !== 'all' ? this.state.activeNode : null,
            search: this.state.searchQuery,
            unread: this.state.currentFilter === 'unread',
            archived: this.state.currentFilter === 'archived'
        });
    }
    
    get filteredContacts() {
        return dataStore.getFilteredContacts({
            search: this.state.searchQuery
        });
    }
}

// ████████████████████████████████████████████
// ███ МЕНЕДЖЕР ДОМ ЭЛЕМЕНТОВ ███
// ████████████████████████████████████████████

class DOMManager {
    constructor() {
        this.elements = {};
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.setupEventDelegation();
    }
    
    cacheElements() {
        // Прелоадер
        this.elements.preloader = document.getElementById('preloader');
        this.elements.progressFill = document.getElementById('progress-fill');
        this.elements.statChats = document.getElementById('stat-chats');
        this.elements.statNodes = document.getElementById('stat-nodes');
        this.elements.statOnline = document.getElementById('stat-online');
        
        // Форма входа
        this.elements.loginForm = document.getElementById('login-form');
        this.elements.loginPhone = document.getElementById('login-phone');
        this.elements.loginPassword = document.getElementById('login-password');
        this.elements.loginButton = document.getElementById('login-button');
        this.elements.demoLogin = document.getElementById('demo-login');
        this.elements.loginError = document.getElementById('login-error');
        this.elements.loginLoading = document.getElementById('login-loading');
        
        // Основные контейнеры
        this.elements.appContainer = document.getElementById('app-container');
        this.elements.sidebar = document.getElementById('sidebar');
        this.elements.mainContent = document.getElementById('main-content');
        this.elements.chatPanel = document.getElementById('chat-panel');
        this.elements.conferencePanel = document.getElementById('conference-panel');
        
        // Профиль
        this.elements.profileCard = document.getElementById('profile-card');
        this.elements.profileMenuBtn = document.getElementById('profile-menu-btn');
        this.elements.profileModal = document.getElementById('profile-modal');
        this.elements.closeProfileModal = document.getElementById('close-profile-modal');
        
        // Поиск
        this.elements.globalSearch = document.getElementById('global-search');
        this.elements.searchClear = document.getElementById('search-clear');
        this.elements.searchResults = document.getElementById('search-results');
        
        // Узлы
        this.elements.nodesList = document.getElementById('nodes-list');
        this.elements.currentNode = document.getElementById('current-node');
        
        // Контакты
        this.elements.contactsList = document.getElementById('contacts-list');
        
        // Активность
        this.elements.activityList = document.getElementById('activity-list');
        this.elements.refreshActivityBtn = document.getElementById('refresh-activity-btn');
        
        // Чаты
        this.elements.chatsContainer = document.getElementById('chats-container');
        this.elements.emptyState = document.getElementById('empty-state');
        
        // Хедер
        this.elements.backBtn = document.getElementById('back-btn');
        this.elements.notificationsBtn = document.getElementById('notifications-btn');
        this.elements.themeToggle = document.getElementById('theme-toggle');
        this.elements.newChatBtn = document.getElementById('new-chat-btn');
        this.elements.startChatBtn = document.getElementById('start-chat-btn');
        
        // Фильтры
        this.elements.filterButtons = document.querySelectorAll('.filter-btn');
        this.elements.sortButtons = document.querySelectorAll('.sort-btn');
        
        // Чат панель
        this.elements.closeChatBtn = document.getElementById('close-chat-btn');
        this.elements.chatAvatar = document.getElementById('chat-avatar');
        this.elements.chatTitle = document.getElementById('chat-title');
        this.elements.chatStatus = document.getElementById('chat-status');
        this.elements.messagesContainer = document.getElementById('messages-container');
        this.elements.messageInput = document.getElementById('message-input');
        this.elements.sendBtn = document.getElementById('send-btn');
        this.elements.emojiToggleBtn = document.getElementById('emoji-toggle-btn');
        this.elements.emojiPanel = document.getElementById('emoji-panel');
        this.elements.emojiGrid = document.getElementById('emoji-grid');
        this.elements.emojiCategories = document.querySelectorAll('.emoji-category');
        
        // Видеоконференция
        this.elements.startConferenceBtn = document.getElementById('start-conference-btn');
        this.elements.closeConferenceBtn = document.getElementById('close-conference-btn');
        this.elements.conferenceTimer = document.getElementById('conference-timer');
        this.elements.conferenceGrid = document.getElementById('conference-grid');
        this.elements.confMuteBtn = document.getElementById('conf-mute-btn');
        this.elements.confVideoBtn = document.getElementById('conf-video-btn');
        this.elements.confEndBtn = document.getElementById('conf-end-btn');
        
        // Уведомления
        this.elements.notificationsContainer = document.getElementById('notifications-container');
        
        // Навигация
        this.elements.navChats = document.getElementById('nav-chats');
        this.elements.navContacts = document.getElementById('nav-contacts');
        this.elements.navCalls = document.getElementById('nav-calls');
        this.elements.navFiles = document.getElementById('nav-files');
        
        // Вью
        this.elements.chatsView = document.getElementById('chats-view');
        this.elements.contactsView = document.getElementById('contacts-view');
        this.elements.callsView = document.getElementById('calls-view');
        this.elements.filesView = document.getElementById('files-view');
        
        // Голосовые сообщения
        this.elements.voiceRecordBtn = document.getElementById('voice-record-btn');
        this.elements.voiceRecordTimer = document.getElementById('voice-record-timer');
        this.elements.voiceRecordPanel = document.getElementById('voice-record-panel');
        
        // Стикеры
        this.elements.stickerToggleBtn = document.getElementById('sticker-toggle-btn');
        this.elements.stickerPanel = document.getElementById('sticker-panel');
        this.elements.stickerGrid = document.getElementById('sticker-grid');
        
        // Файлы
        this.elements.fileUploadBtn = document.getElementById('file-upload-btn');
        this.elements.fileInput = document.getElementById('file-input');
        
        // Опросы
        this.elements.pollCreateBtn = document.getElementById('poll-create-btn');
        this.elements.pollModal = document.getElementById('poll-modal');
        
        // Реакции
        this.elements.reactionsPanel = document.getElementById('reactions-panel');
        
        // Загрузки
        this.elements.uploadsPanel = document.getElementById('uploads-panel');
        this.elements.downloadsPanel = document.getElementById('downloads-panel');
        
        // Настройки
        this.elements.settingsBtn = document.getElementById('settings-btn');
        this.elements.settingsModal = document.getElementById('settings-modal');
        this.elements.settingsTabs = document.querySelectorAll('.settings-tab');
        this.elements.settingsContent = document.querySelectorAll('.settings-content');
    }
    
    setupEventDelegation() {
        // Глобальные обработчики
        document.addEventListener('click', this.handleGlobalClick.bind(this));
        document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));
        document.addEventListener('resize', this.handleResize.bind(this));
        
        // Делегирование для динамических элементов
        document.addEventListener('click', (e) => {
            // Обработка кликов по узлам
            if (e.target.closest('.node-item')) {
                this.handleNodeClick(e);
            }
            
            // Обработка кликов по чатам
            if (e.target.closest('.chat-card')) {
                this.handleChatClick(e);
            }
            
            // Обработка кликов по контактам
            if (e.target.closest('.contact-item')) {
                this.handleContactClick(e);
            }
            
            // Обработка кликов по сообщениям
            if (e.target.closest('.message')) {
                this.handleMessageClick(e);
            }
        });
    }
    
    handleGlobalClick(e) {
        // Закрытие модальных окон при клике вне
        if (e.target.classList.contains('modal-overlay')) {
            this.closeAllModals();
        }
        
        // Закрытие контекстных меню
        if (!e.target.closest('.context-menu') && !e.target.closest('[data-context-menu]')) {
            this.closeAllContextMenus();
        }
    }
    
    handleGlobalKeydown(e) {
        // Глобальные горячие клавиши
        switch(e.key) {
            case 'Escape':
                this.closeAllModals();
                this.closeAllContextMenus();
                if (appState.state.activeChat) {
                    appManager.closeChat();
                }
                break;
                
            case 'k':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.elements.globalSearch?.focus();
                }
                break;
                
            case '/':
                if (e.target === document.body) {
                    e.preventDefault();
                    this.elements.globalSearch?.focus();
                }
                break;
        }
    }
    
    handleResize() {
        appState.setState({ 
            isSidebarVisible: window.innerWidth > 768 
        });
    }
    
    handleNodeClick(e) {
        const nodeElement = e.target.closest('.node-item');
        if (!nodeElement || nodeElement.classList.contains('create-node')) return;
        
        const nodeId = nodeElement.dataset.node;
        if (nodeId && nodeId !== appState.state.activeNode) {
            appManager.switchNode(nodeId);
        }
    }
    
    handleChatClick(e) {
        const chatCard = e.target.closest('.chat-card');
        if (!chatCard) return;
        
        const chatId = chatCard.dataset.chatId;
        if (chatId) {
            appManager.openChat(chatId);
        }
    }
    
    handleContactClick(e) {
        const contactItem = e.target.closest('.contact-item');
        if (!contactItem || contactItem.classList.contains('add-contact')) return;
        
        const contactId = contactItem.dataset.contact;
        if (contactId) {
            const contact = dataStore.getContact(parseInt(contactId));
            if (contact) {
                if (e.target.closest('.chat-with-contact')) {
                    appManager.startChatWithContact(contact);
                } else if (e.target.closest('.call-contact')) {
                    appManager.startCallWithContact(contact);
                } else {
                    appManager.openContactProfile(contact);
                }
            }
        }
    }
    
    handleMessageClick(e) {
        const messageElement = e.target.closest('.message');
        if (!messageElement) return;
        
        const messageId = messageElement.dataset.messageId;
        if (messageId) {
            // Обработка действий с сообщением
            if (e.target.closest('.message-actions')) {
                this.handleMessageActions(e, messageId);
            } else {
                // Двойной клик для ответа
                if (e.detail === 2) {
                    appManager.replyToMessage(messageId);
                }
            }
        }
    }
    
    handleMessageActions(e, messageId) {
        const actionButton = e.target.closest('.btn-icon');
        if (!actionButton) return;
        
        const actionIndex = Array.from(actionButton.parentNode.children).indexOf(actionButton);
        const message = appManager.getMessageById(messageId);
        
        if (message) {
            const actions = message.type === 'incoming' ? 
                ['reply', 'react', 'more'] : 
                ['edit', 'delete', 'more'];
            
            const action = actions[actionIndex];
            appManager.handleMessageAction(message, action, e);
        }
    }
    
    closeAllModals() {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.querySelectorAll('.modal-overlay.active').forEach(overlay => {
            overlay.classList.remove('active');
        });
    }
    
    closeAllContextMenus() {
        document.querySelectorAll('.context-menu').forEach(menu => {
            menu.remove();
        });
    }
    
    // Вспомогательные методы
    showElement(element) {
        if (element) {
            element.style.display = 'block';
            setTimeout(() => {
                element.style.opacity = '1';
            }, 10);
        }
    }
    
    hideElement(element) {
        if (element) {
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.display = 'none';
            }, 300);
        }
    }
    
    toggleElement(element) {
        if (element) {
            if (element.style.display === 'none' || !element.style.display) {
                this.showElement(element);
            } else {
                this.hideElement(element);
            }
        }
    }
    
    animateElement(element, animation) {
        if (element && typeof anime !== 'undefined') {
            anime({
                targets: element,
                ...animation
            });
        }
    }
    
    createElement(tag, className, innerHTML) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    }
}

// ████████████████████████████████████████████
// ███ СИСТЕМА ВХОДА И АУТЕНТИФИКАЦИИ ███
// ████████████████████████████████████████████

class AuthManager {
    constructor() {
        this.isInitialized = false;
    }
    
    init() {
        if (this.isInitialized) return;
        
        this.setupLoginListeners();
        this.checkExistingAuth();
        this.isInitialized = true;
    }
    
    setupLoginListeners() {
        const dom = domManager.elements;
        
        if (dom.loginButton) {
            dom.loginButton.addEventListener('click', () => this.handleLogin());
        }
        
        if (dom.demoLogin) {
            dom.demoLogin.addEventListener('click', () => this.handleDemoLogin());
        }
        
        if (dom.loginPassword) {
            dom.loginPassword.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleLogin();
            });
        }
        
        if (dom.loginPhone) {
            dom.loginPhone.addEventListener('input', (e) => this.formatPhoneNumber(e));
        }
        
        // Показать/скрыть пароль
        const togglePassword = document.getElementById('toggle-password');
        if (togglePassword) {
            togglePassword.addEventListener('click', () => this.togglePasswordVisibility());
        }
    }
    
    formatPhoneNumber(e) {
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
    }
    
    togglePasswordVisibility() {
        const passwordInput = domManager.elements.loginPassword;
        const icon = document.getElementById('toggle-password');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            if (icon) icon.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            passwordInput.type = 'password';
            if (icon) icon.innerHTML = '<i class="fas fa-eye"></i>';
        }
    }
    
    handleLogin() {
        const phone = domManager.elements.loginPhone?.value.replace(/\D/g, '') || '';
        const password = domManager.elements.loginPassword?.value.trim() || '';
        
        if (!this.validatePhone(phone)) {
            this.showLoginError('Введите корректный номер телефона');
            this.shakeElement(domManager.elements.loginPhone);
            return;
        }
        
        if (!this.validatePassword(password)) {
            this.showLoginError('Введите пароль');
            this.shakeElement(domManager.elements.loginPassword);
            return;
        }
        
        // Проверка демо-учетных данных
        if (phone === '79001234567' && password === '111111') {
            this.authenticateUser();
        } else {
            this.showLoginError('Неверный номер телефона или пароль');
            this.shakeElement(domManager.elements.loginForm);
        }
    }
    
    handleDemoLogin() {
        const dom = domManager.elements;
        if (dom.loginPhone) dom.loginPhone.value = '+7 (900) 123-45-67';
        if (dom.loginPassword) dom.loginPassword.value = '111111';
        this.authenticateUser();
    }
    
    validatePhone(phone) {
        return phone.length === 11 && phone.startsWith('79');
    }
    
    validatePassword(password) {
        return password.length >= 6;
    }
    
    showLoginError(message) {
        const errorElement = domManager.elements.loginError;
        if (!errorElement) return;
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Анимация появления
        domManager.animateElement(errorElement, {
            opacity: [0, 1],
            translateY: [-10, 0],
            duration: CONFIG.ANIMATION_DURATIONS.FAST,
            easing: 'easeOutQuad'
        });
        
        // Скрыть через 5 секунд
        setTimeout(() => {
            domManager.animateElement(errorElement, {
                opacity: 0,
                duration: CONFIG.ANIMATION_DURATIONS.FAST,
                easing: 'easeInQuad',
                complete: () => {
                    errorElement.style.display = 'none';
                }
            });
        }, 5000);
    }
    
    shakeElement(element) {
        if (!element || typeof anime === 'undefined') return;
        
        anime({
            targets: element,
            translateX: [
                { value: -10, duration: 50 },
                { value: 10, duration: 50 },
                { value: -10, duration: 50 },
                { value: 10, duration: 50 },
                { value: 0, duration: 50 }
            ],
            easing: 'easeInOutSine'
        });
    }
    
    authenticateUser() {
        if (appState.state.isAuthenticating) return;
        
        appState.setState({ isAuthenticating: true });
        
        const dom = domManager.elements;
        
        // Показать состояние загрузки
        if (dom.loginButton) {
            dom.loginButton.disabled = true;
            dom.loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Вход...';
        }
        
        if (dom.loginLoading) {
            dom.loginLoading.classList.add('active');
            domManager.animateElement(dom.loginLoading, {
                opacity: [0, 1],
                duration: CONFIG.ANIMATION_DURATIONS.FAST,
                easing: 'easeOutQuad'
            });
        }
        
        // Имитация запроса к серверу с прогрессом
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress > 100) progress = 100;
            
            if (dom.loginLoading) {
                const progressBar = dom.loginLoading.querySelector('.loading-progress');
                if (progressBar) {
                    progressBar.style.width = `${progress}%`;
                }
            }
        }, 100);
        
        // Имитация задержки сети
        setTimeout(() => {
            clearInterval(progressInterval);
            
            appState.setState({ 
                isAuthenticating: false,
                isLoggedIn: true 
            });
            
            // Сохранить авторизацию
            const authData = {
                isLoggedIn: true,
                expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 дней
                user: dataStore.user
            };
            localStorage.setItem(CONFIG.STORAGE_KEYS.AUTH, JSON.stringify(authData));
            
            // Восстановить кнопку
            if (dom.loginButton) {
                dom.loginButton.disabled = false;
                dom.loginButton.innerHTML = '<i class="fab fa-telegram-plane"></i> Войти через Telegram';
            }
            
            // Скрыть индикатор загрузки
            if (dom.loginLoading) {
                domManager.animateElement(dom.loginLoading, {
                    opacity: 0,
                    duration: CONFIG.ANIMATION_DURATIONS.FAST,
                    easing: 'easeInQuad',
                    complete: () => {
                        dom.loginLoading.classList.remove('active');
                    }
                });
            }
            
            // Анимация успешного входа
            domManager.animateElement(dom.loginForm, {
                opacity: 0,
                scale: 0.9,
                translateY: -50,
                duration: CONFIG.ANIMATION_DURATIONS.NORMAL,
                easing: 'easeInQuad',
                complete: () => {
                    dom.loginForm.style.display = 'none';
                    appManager.startMainApplication();
                }
            });
            
            // Убрать частицы
            if (typeof particlesJS !== 'undefined') {
                setTimeout(() => {
                    particlesJS('particles-js', {
                        particles: {
                            number: { value: 0 },
                            line_linked: { enable: false }
                        }
                    });
                }, 300);
            }
            
        }, 2000 + Math.random() * 1000);
    }
    
    checkExistingAuth() {
        try {
            const savedAuth = localStorage.getItem(CONFIG.STORAGE_KEYS.AUTH);
            if (savedAuth) {
                const authData = JSON.parse(savedAuth);
                if (authData.isLoggedIn && authData.expires > Date.now()) {
                    // Автоматический вход
                    appState.setState({ isLoggedIn: true });
                    appManager.startMainApplication();
                    return true;
                }
            }
        } catch (e) {
            console.error('Ошибка проверки авторизации:', e);       
        }
        
        return false;
    }
    
    logout() {
        // Сброс состояния
        appState.setState({
            isLoggedIn: false,
            isAuthenticating: false,
            activeNode: 'alpha',
            activeChat: null,
            activeView: 'chats',
            searchQuery: ''
        });
        
        // Очистка хранилища
        localStorage.removeItem(CONFIG.STORAGE_KEYS.AUTH);
        
        // Анимация выхода
        const dom = domManager.elements;
        
        if (dom.appContainer) {
            domManager.animateElement(dom.appContainer, {
                opacity: 0,
                scale: 0.95,
                duration: CONFIG.ANIMATION_DURATIONS.NORMAL,
                easing: 'easeInQuad',
                complete: () => {
                    dom.appContainer.style.display = 'none';
                    dom.loginForm.style.display = 'block';
                    
                    domManager.animateElement(dom.loginForm, {
                        opacity: [0, 1],
                        scale: [0.9, 1],
                        translateY: [50, 0],
                        duration: CONFIG.ANIMATION_DURATIONS.NORMAL,
                        easing: 'easeOutQuad'
                    });
                    
                    // Сброс формы
                    if (dom.loginPhone) dom.loginPhone.value = '';
                    if (dom.loginPassword) dom.loginPassword.value = '';
                    
                    // Показать частицы снова
                    if (typeof particlesJS !== 'undefined') {
                        particlesJS('particles-js', {
                            particles: {
                                number: { value: 80 },
                                line_linked: { enable: true }
                            }
                        });
                    }
                }
            });
        }
    }
}

// ████████████████████████████████████████████
// ███ ОСНОВНОЙ МЕНЕДЖЕР ПРИЛОЖЕНИЯ ███
// ████████████████████████████████████████████

class AppManager {
    constructor() {
        this.initialized = false;
        this.currentAnimations = new Map();
    }
    
    init() {
        if (this.initialized) return;
        
        // Инициализация компонентов
        authManager.init();
        this.setupEventListeners();
        this.setupTheme();
        this.setupNotifications();
        this.setupVoiceRecording();
        
        // Инициализация прелоадера
        this.initPreloader();
        
        this.initialized = true;
    }
    
    initPreloader() {
        const dom = domManager.elements;
        if (!dom.preloader) return;
        
        // Имитация загрузки данных
        let progress = 0;
        const stats = { chats: 0, nodes: 0, online: 0 };
        const targetStats = { chats: 156, nodes: 7, online: 24 };
        
        const updateStats = () => {
            stats.chats = Math.min(stats.chats + Math.floor(Math.random() * 10), targetStats.chats);
            stats.nodes = Math.min(stats.nodes + Math.floor(Math.random() * 2), targetStats.nodes);
            stats.online = Math.min(stats.online + Math.floor(Math.random() * 3), targetStats.online);
            
            if (dom.statChats) dom.statChats.textContent = stats.chats;
            if (dom.statNodes) dom.statNodes.textContent = stats.nodes;
            if (dom.statOnline) dom.statOnline.textContent = stats.online;
        };
        
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress > 100) progress = 100;
            
            if (dom.progressFill) {
                dom.progressFill.style.width = `${progress}%`;
            }
            
            updateStats();
            
            if (progress >= 100) {
                clearInterval(interval);
                
                // Анимация завершения прелоадера
                domManager.animateElement(dom.preloader, {
                    opacity: 0,
                    scale: 1.2,
                    duration: CONFIG.ANIMATION_DURATIONS.SLOW,
                    easing: 'easeInOutQuad',
                    complete: () => {
                        dom.preloader.style.display = 'none';
                        
                        // Если пользователь уже авторизован, показать основное приложение
                        if (appState.state.isLoggedIn) {
                            this.startMainApplication();
                        } else {
                            // Показать форму входа
                            dom.loginForm.style.display = 'block';
                            domManager.animateElement(dom.loginForm, {
                                opacity: [0, 1],
                                translateY: [30, 0],
                                duration: CONFIG.ANIMATION_DURATIONS.NORMAL,
                                easing: 'easeOutQuad'
                            });
                        }
                    }
                });
            }
        }, 100);
    }
    
    startMainApplication() {
        const dom = domManager.elements;
        
        // Показать основное приложение
        dom.appContainer.style.display = 'flex';
        
        domManager.animateElement(dom.appContainer, {
            opacity: [0, 1],
            duration: CONFIG.ANIMATION_DURATIONS.NORMAL,
            easing: 'easeOutQuad'
        });
        
        // Инициализация интерфейса
        this.updateUserProfile();
        this.renderNodes();
        this.renderChats();
        this.renderContacts();
        this.renderActivity();
        
        // Подписка на изменения состояния
        appState.subscribe({
            update: (event, data) => this.handleStateChange(event, data)
        });
        
        // Запуск фоновых процессов
        this.startBackgroundProcesses();
    }
    
    handleStateChange(event, data) {
        switch (event) {
            case 'stateChanged':
                this.handleStateUpdates(data.changedKeys, data.newState);
                break;
        }
    }
    
    handleStateUpdates(changedKeys, newState) {
        // Реакция на изменения состояния
        if (changedKeys.includes('activeNode')) {
            this.onNodeChanged(newState.activeNode);
        }
        
        if (changedKeys.includes('activeChat')) {
            this.onChatChanged(newState.activeChat);
        }
        
        if (changedKeys.includes('activeView')) {
            this.onViewChanged(newState.activeView);
        }
        
        if (changedKeys.includes('searchQuery')) {
            this.onSearchQueryChanged(newState.searchQuery);
        }
        
        if (changedKeys.includes('theme')) {
            this.applyTheme(newState.theme);
        }
        
        if (changedKeys.includes('isTyping')) {
            this.onTypingStatusChanged(newState.isTyping);
        }
    }
    
    // Обработчики изменений состояния
    onNodeChanged(nodeId) {
        this.updateCurrentNode();
        this.renderChats();
        this.renderActivity();
    }
    
    onChatChanged(chatId) {
        if (chatId) {
            this.openChat(chatId);
        } else {
            this.closeChat();
        }
    }
    
    onViewChanged(view) {
        this.updateNavigation(view);
        
        // Обновление содержимого в зависимости от вью
        switch (view) {
            case 'chats':
                this.renderChats();
                break;
            case 'contacts':
                this.renderContacts();
                break;
            case 'calls':
                this.renderCalls();
                break;
            case 'files':
                this.renderFiles();
                break;
            case 'settings':
                this.renderSettings();
                break;
        }
    }
    
    onSearchQueryChanged(query) {
        if (query.length > 0) {
            this.performSearch(query);
        } else {
            this.clearSearchResults();
        }
    }
    
    onTypingStatusChanged(isTyping) {
        const dom = domManager.elements;
        if (dom.chatStatus && appState.state.activeChat) {
            if (isTyping) {
                dom.chatStatus.textContent = 'печатает...';
                dom.chatStatus.classList.add('typing');
            } else {
                this.updateChatStatus();
            }
        }
    }
    
    // Основные методы интерфейса
    setupEventListeners() {
        const dom = domManager.elements;
        
        // Навигация
        if (dom.navChats) dom.navChats.addEventListener('click', () => this.switchView('chats'));
        if (dom.navContacts) dom.navContacts.addEventListener('click', () => this.switchView('contacts'));
        if (dom.navCalls) dom.navCalls.addEventListener('click', () => this.switchView('calls'));
        if (dom.navFiles) dom.navFiles.addEventListener('click', () => this.switchView('files'));
        
        // Кнопки чата
        if (dom.backBtn) dom.backBtn.addEventListener('click', () => this.goBack());
        if (dom.newChatBtn) dom.newChatBtn.addEventListener('click', () => this.createNewChat());
        if (dom.startChatBtn) dom.startChatBtn.addEventListener('click', () => this.createNewChat());
        if (dom.closeChatBtn) dom.closeChatBtn.addEventListener('click', () => this.closeChat());
        
        // Поиск
        if (dom.globalSearch) {
            dom.globalSearch.addEventListener('input', (e) => {
                appState.setState({ searchQuery: e.target.value });
            });
        }
        
        if (dom.searchClear) {
            dom.searchClear.addEventListener('click', () => {
                if (dom.globalSearch) dom.globalSearch.value = '';
                appState.setState({ searchQuery: '' });
            });
        }
        
        // Тема
        if (dom.themeToggle) {
            dom.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Профиль
        if (dom.profileMenuBtn) {
            dom.profileMenuBtn.addEventListener('click', () => this.toggleProfileMenu());
        }
        
        if (dom.closeProfileModal) {
            dom.closeProfileModal.addEventListener('click', () => this.closeProfileModal());
        }
        
        // Сообщения
        if (dom.messageInput) {
            dom.messageInput.addEventListener('input', (e) => this.handleMessageInput(e));
            dom.messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }
        
        if (dom.sendBtn) {
            dom.sendBtn.addEventListener('click', () => this.sendMessage());
        }
        
        // Эмодзи
        if (dom.emojiToggleBtn) {
            dom.emojiToggleBtn.addEventListener('click', () => this.toggleEmojiPanel());
        }
        
        if (dom.emojiCategories) {
            dom.emojiCategories.forEach(category => {
                category.addEventListener('click', (e) => {
                    const categoryName = e.currentTarget.dataset.category;
                    this.switchEmojiCategory(categoryName);
                });
            });
        }
        
        // Конференция
        if (dom.startConferenceBtn) {
            dom.startConferenceBtn.addEventListener('click', () => this.startConference());
        }
        
        if (dom.closeConferenceBtn) {
            dom.closeConferenceBtn.addEventListener('click', () => this.closeConference());
        }
        
        if (dom.confEndBtn) {
            dom.confEndBtn.addEventListener('click', () => this.endConference());
        }
        
        // Обновление активности
        if (dom.refreshActivityBtn) {
            dom.refreshActivityBtn.addEventListener('click', () => this.refreshActivity());
        }
        
        // Файлы
        if (dom.fileUploadBtn && dom.fileInput) {
            dom.fileUploadBtn.addEventListener('click', () => dom.fileInput.click());
            dom.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        }
        
        // Настройки
        if (dom.settingsBtn) {
            dom.settingsBtn.addEventListener('click', () => this.openSettings());
        }
    }
    
    setupTheme() {
        const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let theme = savedTheme || CONFIG.DEFAULT_THEME;
        
        if (theme === 'auto') {
            theme = systemPrefersDark ? 'dark' : 'light';
        }
        
        appState.setState({ theme });
        this.applyTheme(theme);
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Обновить иконку переключателя темы
        const dom = domManager.elements;
        if (dom.themeToggle) {
            const icon = theme === 'dark' ? 'fa-sun' : 'fa-moon';
            dom.themeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
        }
        
        // Сохранить в локальное хранилище
        localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, theme);
    }
    
    toggleTheme() {
        const currentTheme = appState.state.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        appState.setState({ theme: newTheme });
    }
    
    setupNotifications() {
        if ('Notification' in window) {
            if (Notification.permission === 'default') {
                Notification.requestPermission();
            }
        }
    }
    
    setupVoiceRecording() {
        const dom = domManager.elements;
        
        if (dom.voiceRecordBtn) {
            let isRecording = false;
            let recordTime = 0;
            let recordInterval = null;
            
            dom.voiceRecordBtn.addEventListener('mousedown', (e) => {
                if (e.button !== 0) return; // Только левая кнопка мыши
                this.startVoiceRecording();
            });
            
            dom.voiceRecordBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.startVoiceRecording();
            });
            
            dom.voiceRecordBtn.addEventListener('mouseup', () => {
                if (isRecording) {
                    this.stopVoiceRecording();
                }
            });
            
            dom.voiceRecordBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                if (isRecording) {
                    this.stopVoiceRecording();
                }
            });
            
            dom.voiceRecordBtn.addEventListener('mouseleave', () => {
                if (isRecording) {
                    this.cancelVoiceRecording();
                }
            });
        }
    }
    
    startVoiceRecording() {
        appState.setState({ recordingVoice: true, voiceRecordTime: 0 });
        
        const dom = domManager.elements;
        if (dom.voiceRecordPanel) {
            dom.voiceRecordPanel.classList.add('active');
        }
        
        // Таймер записи
        const interval = setInterval(() => {
            const time = appState.state.voiceRecordTime + 1;
            appState.setState({ voiceRecordTime: time });
            
            if (dom.voiceRecordTimer) {
                const minutes = Math.floor(time / 60);
                const seconds = time % 60;
                dom.voiceRecordTimer.textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
            
            // Автоостановка через 5 минут
            if (time >= 300) {
                this.stopVoiceRecording();
            }
        }, 1000);
        
        appState.setState({ voiceRecordInterval: interval });
    }
    
    stopVoiceRecording() {
        const interval = appState.state.voiceRecordInterval;
        if (interval) {
            clearInterval(interval);
            appState.setState({ voiceRecordInterval: null });
        }
        
        const duration = appState.state.voiceRecordTime;
        appState.setState({ recordingVoice: false, voiceRecordTime: 0 });
        
        const dom = domManager.elements;
        if (dom.voiceRecordPanel) {
            dom.voiceRecordPanel.classList.remove('active');
        }
        
        // Отправка голосового сообщения
        if (duration >= 1) {
            this.sendVoiceMessage(duration);
        }
    }
    
    cancelVoiceRecording() {
        const interval = appState.state.voiceRecordInterval;
        if (interval) {
            clearInterval(interval);
            appState.setState({ voiceRecordInterval: null });
        }
        
        appState.setState({ recordingVoice: false, voiceRecordTime: 0 });
        
        const dom = domManager.elements;
        if (dom.voiceRecordPanel) {
            dom.voiceRecordPanel.classList.remove('active');
        }
    }
    
    // Рендеринг интерфейса
    updateUserProfile() {
        const dom = domManager.elements;
        const user = dataStore.user;
        
        if (dom.profileCard) {
            // Обновление аватара
            const avatar = dom.profileCard.querySelector('.profile-avatar');
            if (avatar) {
                avatar.textContent = user.avatar;
                avatar.style.backgroundColor = CONFIG.COLORS.PRIMARY;
            }
            
            // Обновление имени
            const name = dom.profileCard.querySelector('.profile-name');
            if (name) name.textContent = user.name;
            
            // Обновление статуса
            const status = dom.profileCard.querySelector('.profile-status');
            if (status) status.textContent = user.online ? 'В сети' : 'Не в сети';
        }
    }
    
    renderNodes() {
        const dom = domManager.elements;
        if (!dom.nodesList) return;
        
        const nodes = dataStore.nodes;
        const activeNode = appState.state.activeNode;
        
        dom.nodesList.innerHTML = '';
        
        // Добавление узлов
        nodes.forEach(node => {
            const isActive = node.id === activeNode;
            const nodeElement = this.createNodeElement(node, isActive);
            dom.nodesList.appendChild(nodeElement);
        });
        
        // Кнопка создания узла
        const createNodeBtn = domManager.createElement('div', 'node-item create-node', `
            <div class="node-icon">
                <i class="fas fa-plus"></i>
            </div>
            <div class="node-info">
                <div class="node-name">Создать узел</div>
            </div>
        `);
        
        createNodeBtn.addEventListener('click', () => this.createNewNode());
        dom.nodesList.appendChild(createNodeBtn);
    }
    
    createNodeElement(node, isActive) {
        const element = domManager.createElement('div', `node-item ${isActive ? 'active' : ''}`, `
            <div class="node-icon" style="background-color: ${node.color};">
                <i class="${node.icon}"></i>
                ${node.online > 0 ? `<span class="online-indicator"></span>` : ''}
            </div>
            <div class="node-info">
                <div class="node-name">${node.name}</div>
                <div class="node-details">
                    <span class="node-members">${node.members}</span>
                    <span class="node-online">${node.online} онлайн</span>
                </div>
            </div>
            ${node.unread > 0 ? `<span class="unread-badge">${node.unread}</span>` : ''}
        `);
        
        element.dataset.node = node.id;
        return element;
    }
    
    renderChats() {
        const dom = domManager.elements;
        if (!dom.chatsContainer) return;
        
        const chats = appState.filteredChats;
        const searchQuery = appState.state.searchQuery;
        
        if (chats.length === 0 && !searchQuery) {
            this.showEmptyState('Чатов пока нет', 'Создайте новый чат или дождитесь сообщений');
            return;
        }
        
        if (chats.length === 0 && searchQuery) {
            this.showEmptyState('Ничего не найдено', 'Попробуйте изменить поисковый запрос');
            return;
        }
        
        dom.chatsContainer.innerHTML = '';
        
        chats.forEach(chat => {
            const chatElement = this.createChatElement(chat);
            dom.chatsContainer.appendChild(chatElement);
        });
    }
    
    createChatElement(chat) {
        const time = chat.time || 'только что';
        const unread = chat.unread > 0 ? `<span class="unread-badge">${chat.unread}</span>` : '';
        const pinned = chat.pinned ? '<i class="fas fa-thumbtack pinned-icon"></i>' : '';
        const muted = chat.muted ? '<i class="fas fa-volume-mute muted-icon"></i>' : '';
        const verified = chat.verified ? '<i class="fas fa-check-circle verified-icon"></i>' : '';
        
        const element = domManager.createElement('div', 'chat-card', `
            <div class="chat-avatar" style="background-color: ${chat.color};">
                ${chat.avatar}
                ${chat.online > 0 ? '<span class="online-indicator"></span>' : ''}
            </div>
            <div class="chat-info">
                <div class="chat-header">
                    <div class="chat-name">
                        ${chat.name}
                        ${verified}
                    </div>
                    <div class="chat-time">
                        ${time}
                        ${pinned}
                        ${muted}
                    </div>
                </div>
                <div class="chat-preview">
                    <div class="chat-last-message">
                        ${chat.lastMessage}
                    </div>
                    ${unread}
                </div>
                ${chat.type === 'group' ? `
                    <div class="chat-meta">
                        <span class="chat-members">${chat.members} участников</span>
                        <span class="chat-online">${chat.online} онлайн</span>
                    </div>
                ` : ''}
            </div>
        `);
        
        element.dataset.chatId = chat.id;
        return element;
    }
    
    renderContacts() {
        const dom = domManager.elements;
        if (!dom.contactsList) return;
        
        const contacts = appState.filteredContacts;
        
        dom.contactsList.innerHTML = '';
        
        // Разделение контактов на онлайн и оффлайн
        const onlineContacts = contacts.filter(c => c.status === 'online');
        const offlineContacts = contacts.filter(c => c.status !== 'online');
        
        // Рендеринг онлайн контактов
        if (onlineContacts.length > 0) {
            const onlineSection = domManager.createElement('div', 'contacts-section');
            onlineSection.innerHTML = '<div class="section-title">В сети</div>';
            
            onlineContacts.forEach(contact => {
                const contactElement = this.createContactElement(contact);
                onlineSection.appendChild(contactElement);
            });
            
            dom.contactsList.appendChild(onlineSection);
        }
        
        // Рендеринг оффлайн контактов
        if (offlineContacts.length > 0) {
            const offlineSection = domManager.createElement('div', 'contacts-section');
            offlineSection.innerHTML = '<div class="section-title">Не в сети</div>';
            
            offlineContacts.forEach(contact => {
                const contactElement = this.createContactElement(contact);
                offlineSection.appendChild(contactElement);
            });
            
            dom.contactsList.appendChild(offlineSection);
        }
        
        // Кнопка добавления контакта
        const addContactBtn = domManager.createElement('div', 'contact-item add-contact', `
            <div class="contact-avatar">
                <i class="fas fa-plus"></i>
            </div>
            <div class="contact-info">
                <div class="contact-name">Добавить контакт</div>
            </div>
        `);
        
        addContactBtn.addEventListener('click', () => this.addNewContact());
        dom.contactsList.appendChild(addContactBtn);
    }
    
    createContactElement(contact) {
        const statusClass = contact.status === 'online' ? 'online' : 
                          contact.status === 'typing' ? 'typing' : 'offline';
        
        const element = domManager.createElement('div', 'contact-item', `
            <div class="contact-avatar" style="background-color: ${contact.color};">
                ${contact.avatar}
                <span class="contact-status ${statusClass}"></span>
            </div>
            <div class="contact-info">
                <div class="contact-name">${contact.name}</div>
                <div class="contact-activity">${contact.activity}</div>
            </div>
            <div class="contact-actions">
                <button class="btn-icon chat-with-contact" title="Написать">
                    <i class="fas fa-comment"></i>
                </button>
                <button class="btn-icon call-contact" title="Позвонить">
                    <i class="fas fa-phone"></i>
                </button>
            </div>
        `);
        
        element.dataset.contact = contact.id;
        return element;
    }
    
    renderActivity() {
        const dom = domManager.elements;
        if (!dom.activityList) return;
        
        const activity = dataStore.activity;
        const currentNode = appState.state.activeNode;
        
        // Фильтрация активности по текущему узлу (если не выбран "все узлы")
        const filteredActivity = currentNode !== 'all' ? 
            activity.filter(a => a.node === currentNode) : 
            activity;
        
        dom.activityList.innerHTML = '';
        
        filteredActivity.forEach(activityItem => {
            const activityElement = this.createActivityElement(activityItem);
            dom.activityList.appendChild(activityElement);
        });
    }
    
    createActivityElement(activity) {
        const element = domManager.createElement('div', 'activity-item', `
            <div class="activity-icon" style="color: ${activity.color};">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-user">${activity.user}</div>
                <div class="activity-text">${activity.text}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `);
        
        return element;
    }
    
    renderMessages() {
        const dom = domManager.elements;
        if (!dom.messagesContainer || !appState.state.activeChat) return;
        
        const messages = dataStore.getMessages(appState.state.activeChat);
        
        dom.messagesContainer.innerHTML = '';
        
        messages.forEach(message => {
            const messageElement = this.createMessageElement(message);
            dom.messagesContainer.appendChild(messageElement);
        });
        
        // Прокрутка к последнему сообщению
        this.scrollToBottom();
    }
    
    createMessageElement(message) {
        const isOutgoing = message.type === 'outgoing';
        const isIncoming = message.type === 'incoming';
        
        const messageClass = isOutgoing ? 'message outgoing' : 'message incoming';
        const statusIcon = this.getMessageStatusIcon(message.status);
        
        const reactions = message.reactions ? this.createReactionsHTML(message.reactions) : '';
        const edited = message.edited ? '<span class="edited-badge">ред.</span>' : '';
        const pinned = message.pinned ? '<i class="fas fa-thumbtack pinned-message-icon"></i>' : '';
        const verified = message.verified ? '<i class="fas fa-check-circle verified-icon"></i>' : '';
        
        const element = domManager.createElement('div', messageClass, `
            ${isIncoming ? `
                <div class="message-avatar" style="background-color: ${message.color};">
                    ${message.avatar}
                </div>
            ` : ''}
            
            <div class="message-content">
                <div class="message-header">
                    ${isIncoming ? `<span class="message-sender">${message.sender} ${verified}</span>` : ''}
                    <span class="message-time">${message.time} ${edited} ${pinned}</span>
                </div>
                
                <div class="message-text">${message.text}</div>
                
                ${message.file ? this.createFileAttachmentHTML(message.file) : ''}
                ${message.sticker ? this.createStickerHTML(message.sticker) : ''}
                ${message.poll ? this.createPollHTML(message.poll) : ''}
                
                ${reactions}
                
                <div class="message-actions">
                    <button class="btn-icon" title="Ответить">
                        <i class="fas fa-reply"></i>
                    </button>
                    ${isOutgoing ? `
                        <button class="btn-icon" title="Редактировать">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" title="Удалить">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : `
                        <button class="btn-icon" title="Реакция">
                            <i class="fas fa-smile"></i>
                        </button>
                        <button class="btn-icon" title="Еще">
                            <i class="fas fa-ellipsis-h"></i>
                        </button>
                    `}
                </div>
            </div>
            
            ${isOutgoing ? `<div class="message-status">${statusIcon}</div>` : ''}
        `);
        
        element.dataset.messageId = message.id;
        return element;
    }
    
    getMessageStatusIcon(status) {
        switch (status) {
            case 'sent': return '<i class="fas fa-check"></i>';
            case 'delivered': return '<i class="fas fa-check-double"></i>';
            case 'read': return '<i class="fas fa-check-double" style="color: #4fc3f7;"></i>';
            case 'error': return '<i class="fas fa-exclamation-circle" style="color: #ff3b30;"></i>';
            default: return '<i class="fas fa-clock"></i>';
        }
    }
    
    createReactionsHTML(reactions) {
        if (Object.keys(reactions).length === 0) return '';
        
        const reactionsHTML = Object.entries(reactions)
            .map(([emoji, users]) => {
                const count = users.length;
                return `
                    <div class="reaction">
                        <span class="reaction-emoji">${emoji}</span>
                        <span class="reaction-count">${count}</span>
                    </div>
                `;
            })
            .join('');
        
        return `<div class="message-reactions">${reactionsHTML}</div>`;
    }
    
    createFileAttachmentHTML(file) {
        return `
            <div class="file-attachment">
                <div class="file-icon">
                    <i class="fas ${file.icon || 'fa-file'}"></i>
                </div>
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${file.size}</div>
                </div>
                <button class="btn-icon" title="Скачать">
                    <i class="fas fa-download"></i>
                </button>
            </div>
        `;
    }
    
    createStickerHTML(sticker) {
        return `
            <div class="sticker-message">
                <img src="${sticker.url}" alt="${sticker.emoji}" class="sticker-image">
            </div>
        `;
    }
    
    createPollHTML(poll) {
        const totalVotes = poll.totalVotes || 0;
        
        const optionsHTML = poll.options.map(option => {
            const width = option.percentage || 0;
            return `
                <div class="poll-option">
                    <div class="option-text">${option.text}</div>
                    <div class="option-bar">
                        <div class="option-fill" style="width: ${width}%"></div>
                    </div>
                    <div class="option-stats">
                        <span class="option-percentage">${width}%</span>
                        <span class="option-votes">${option.votes} голосов</span>
                    </div>
                </div>
            `;
        }).join('');
        
        return `
            <div class="poll-message">
                <div class="poll-question">${poll.question}</div>
                <div class="poll-options">${optionsHTML}</div>
                <div class="poll-footer">
                    <span class="poll-total">Всего голосов: ${totalVotes}</span>
                    ${poll.voted ? '<span class="poll-voted">✓ Вы проголосовали</span>' : ''}
                </div>
            </div>
        `;
    }
    
    // Методы взаимодействия
    switchNode(nodeId) {
        appState.setState({ 
            activeNode: nodeId,
            activeChat: null,
            searchQuery: ''
        });
    }
    
    switchView(view) {
        appState.setState({ 
            activeView: view,
            activeChat: null
        });
    }
    
    updateCurrentNode() {
        const dom = domManager.elements;
        const node = appState.activeNodeData;
        
        if (dom.currentNode && node) {
            dom.currentNode.innerHTML = `
                <div class="current-node-icon" style="background-color: ${node.color};">
                    <i class="${node.icon}"></i>
                </div>
                <div class="current-node-info">
                    <div class="current-node-name">${node.name}</div>
                    <div class="current-node-details">
                        <span class="node-members">${node.members} участников</span>
                        <span class="node-online">${node.online} онлайн</span>
                    </div>
                </div>
            `;
        }
    }
    
    updateNavigation(activeView) {
        const dom = domManager.elements;
        const navItems = [dom.navChats, dom.navContacts, dom.navCalls, dom.navFiles];
        
        navItems.forEach(nav => {
            if (nav) nav.classList.remove('active');
        });
        
        switch (activeView) {
            case 'chats':
                if (dom.navChats) dom.navChats.classList.add('active');
                break;
            case 'contacts':
                if (dom.navContacts) dom.navContacts.classList.add('active');
                break;
            case 'calls':
                if (dom.navCalls) dom.navCalls.classList.add('active');
                break;
            case 'files':
                if (dom.navFiles) dom.navFiles.classList.add('active');
                break;
        }
    }
    
    openChat(chatId) {
        const chat = dataStore.getChat(chatId);
        if (!chat) return;
        
        // Обновление состояния
        appState.setState({ 
            activeChat: chatId,
            isTyping: false,
            replyToMessage: null,
            editingMessage: null
        });
        
        // Обновление интерфейса чата
        this.updateChatHeader(chat);
        this.renderMessages();
        
        // Показать панель чата (на мобильных)
        if (appState.isMobile) {
            const dom = domManager.elements;
            if (dom.chatPanel) {
                dom.chatPanel.classList.add('active');
            }
        }
        
        // Сбросить непрочитанные
        if (chat.unread > 0) {
            this.markChatAsRead(chatId);
        }
    }
    
    updateChatHeader(chat) {
        const dom = domManager.elements;
        
        if (dom.chatTitle) {
            dom.chatTitle.textContent = chat.name;
        }
        
        if (dom.chatAvatar) {
            dom.chatAvatar.textContent = chat.avatar;
            dom.chatAvatar.style.backgroundColor = chat.color;
        }
        
        this.updateChatStatus();
    }
    
    updateChatStatus() {
        const dom = domManager.elements;
        const chat = appState.activeChatData;
        
        if (!dom.chatStatus || !chat) return;
        
        let statusText = '';
        
        if (chat.type === 'personal') {
            const contact = dataStore.contacts.find(c => 
                c.name === chat.name || c.username === chat.name
            );
            
            if (contact) {
                if (contact.status === 'online') {
                    statusText = 'в сети';
                } else if (contact.status === 'typing') {
                    statusText = 'печатает...';
                } else {
                    statusText = `был(а) ${contact.lastSeen}`;
                }
            }
        } else {
            statusText = `${chat.members} участников, ${chat.online} онлайн`;
        }
        
        dom.chatStatus.textContent = statusText;
        dom.chatStatus.classList.toggle('typing', chat.type === 'personal' && statusText.includes('печатает'));
    }
    
    closeChat() {
        appState.setState({ activeChat: null });
        
        const dom = domManager.elements;
        if (dom.chatPanel && appState.isMobile) {
            dom.chatPanel.classList.remove('active');
        }
    }
    
    goBack() {
        if (appState.state.activeChat) {
            this.closeChat();
        } else if (appState.state.activeView !== 'chats') {
            this.switchView('chats');
        }
    }
    
    // Работа с сообщениями
    handleMessageInput(e) {
        const text = e.target.value.trim();
        
        if (text.length > 0) {
            appState.setState({ isTyping: true });
            
            // Таймер сброса статуса печатания
            if (this.typingTimeout) clearTimeout(this.typingTimeout);
            this.typingTimeout = setTimeout(() => {
                appState.setState({ isTyping: false });
            }, 2000);
        } else {
            appState.setState({ isTyping: false });
        }
    }
    
    sendMessage() {
        const dom = domManager.elements;
        const messageInput = dom.messageInput;
        
        if (!messageInput || !appState.state.activeChat) return;
        
        const text = messageInput.value.trim();
        if (!text && !appState.state.replyToMessage && !appState.state.editingMessage) return;
        
        let messageData;
        
        if (appState.state.editingMessage) {
            // Редактирование сообщения
            const messageId = appState.state.editingMessage;
            const messages = dataStore.getMessages(appState.state.activeChat);
            const message = messages.find(m => m.id === messageId);
            
            if (message) {
                message.text = text;
                message.edited = true;
                message.time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                this.renderMessages();
                appState.setState({ editingMessage: null });
            }
        } else {
            // Отправка нового сообщения
            messageData = {
                text,
                type: 'outgoing',
                status: 'sent',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                replyTo: appState.state.replyToMessage
            };
            
            const message = dataStore.addMessage(appState.state.activeChat, messageData);
            
            // Обновление чата
            const chat = dataStore.getChat(appState.state.activeChat);
            if (chat) {
                chat.lastMessage = text.length > 50 ? text.substring(0, 50) + '...' : text;
                chat.time = 'только что';
                chat.lastActivity = new Date().toISOString();
            }
            
            // Обновление интерфейса
            this.renderMessages();
            
            // Имитация ответа (только для демо)
            if (chat && chat.type === 'personal') {
                this.simulateReply(chat);
            }
        }
        
        // Очистка поля ввода
        messageInput.value = '';
        messageInput.focus();
        appState.setState({ 
            isTyping: false,
            replyToMessage: null 
        });
        
        // Скрыть панель ответа
        const replyPanel = document.querySelector('.reply-panel');
        if (replyPanel) {
            replyPanel.classList.remove('active');
        }
    }
    
    simulateReply(chat) {
        // Имитация ответа от собеседника (для демо)
        setTimeout(() => {
            const replies = [
                'Отличная идея! Давайте обсудим детали.',
                'Спасибо за сообщение! Я как раз думал об этом.',
                'Интересно! А какие варианты вы рассматриваете?',
                'Принято! Давайте созвонимся завтра в 11:00.',
                '👍 Отлично! Жду дальнейших новостей.',
                'Хорошо, я понял. Сделаю все как нужно.',
                'Согласен! Давайте реализуем этот план.',
                'Интересное предложение! Нужно подумать.',
                'Спасибо за информацию! Обязательно изучу.',
                'Прекрасно! Рад, что мы нашли общий язык.'
            ];
            
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            
            const replyData = {
                text: randomReply,
                type: 'incoming',
                status: 'read',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                avatar: chat.avatar,
                color: chat.color,
                sender: chat.name
            };
            
            dataStore.addMessage(appState.state.activeChat, replyData);
            
            // Обновление чата
            chat.lastMessage = randomReply.length > 50 ? 
                randomReply.substring(0, 50) + '...' : randomReply;
            chat.time = 'только что';
            chat.unread = (chat.unread || 0) + 1;
            chat.lastActivity = new Date().toISOString();
            
            // Обновление интерфейса
            if (appState.state.activeChat === chat.id) {
                this.renderMessages();
                this.updateChatStatus();
            }
            
            // Уведомление
            this.showNotification('Новое сообщение', `${chat.name}: ${randomReply}`, 'message');
            
        }, 1000 + Math.random() * 3000);
    }
    
    replyToMessage(messageId) {
        const messages = dataStore.getMessages(appState.state.activeChat);
        const message = messages.find(m => m.id === messageId);
        
        if (message) {
            appState.setState({ replyToMessage: messageId });
            
            // Показать панель ответа
            const replyPanel = document.createElement('div');
            replyPanel.className = 'reply-panel active';
            replyPanel.innerHTML = `
                <div class="reply-header">
                    <i class="fas fa-reply"></i>
                    <span>Ответ на сообщение</span>
                    <button class="btn-icon close-reply">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="reply-content">
                    <div class="reply-sender">${message.sender}</div>
                    <div class="reply-text">${message.text.substring(0, 100)}${message.text.length > 100 ? '...' : ''}</div>
                </div>
            `;
            
            const existingPanel = document.querySelector('.reply-panel');
            if (existingPanel) existingPanel.remove();
            
            const messageInput = domManager.elements.messageInput;
            if (messageInput) {
                messageInput.parentNode.insertBefore(replyPanel, messageInput);
            }
            
            // Обработка закрытия панели
            const closeBtn = replyPanel.querySelector('.close-reply');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    appState.setState({ replyToMessage: null });
                    replyPanel.classList.remove('active');
                    setTimeout(() => replyPanel.remove(), 300);
                });
            }
            
            // Фокус на поле ввода
            messageInput.focus();
        }
    }
    
    editMessage(messageId) {
        const messages = dataStore.getMessages(appState.state.activeChat);
        const message = messages.find(m => m.id === messageId);
        
        if (message) {
            appState.setState({ editingMessage: messageId });
            
            const messageInput = domManager.elements.messageInput;
            if (messageInput) {
                messageInput.value = message.text;
                messageInput.focus();
                messageInput.setSelectionRange(message.text.length, message.text.length);
                
                // Изменение кнопки отправки
                const sendBtn = domManager.elements.sendBtn;
                if (sendBtn) {
                    sendBtn.innerHTML = '<i class="fas fa-check"></i>';
                    sendBtn.title = 'Сохранить изменения';
                }
            }
        }
    }
    
    deleteMessage(messageId) {
        if (!confirm('Удалить это сообщение?')) return;
        
        const chatId = appState.state.activeChat;
        const messages = dataStore.getMessages(chatId);
        const messageIndex = messages.findIndex(m => m.id === messageId);
        
        if (messageIndex !== -1) {
            messages.splice(messageIndex, 1);
            this.renderMessages();
        }
    }
    
    // Голосовые сообщения
    sendVoiceMessage(duration) {
        const chatId = appState.state.activeChat;
        if (!chatId) return;
        
        const durationText = this.formatDuration(duration);
        
        const messageData = {
            text: 'Голосовое сообщение',
            type: 'outgoing',
            status: 'sent',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            file: {
                name: 'Голосовое сообщение',
                size: `${Math.round(duration / 60 * 0.5 * 100) / 100} МБ`,
                type: 'voice',
                icon: 'fa-microphone',
                duration: durationText
            }
        };
        
        dataStore.addMessage(chatId, messageData);
        this.renderMessages();
        
        // Прокрутка к последнему сообщению
        this.scrollToBottom();
    }
    
    formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    // Конференции
    startConference() {
        appState.setState({ 
            isConferenceActive: true,
            conferenceTimer: 0 
        });
        
        const dom = domManager.elements;
        if (dom.conferencePanel) {
            dom.conferencePanel.classList.add('active');
        }
        
        // Запуск таймера
        const interval = setInterval(() => {
            const time = appState.state.conferenceTimer + 1;
            appState.setState({ conferenceTimer: time });
            
            if (dom.conferenceTimer) {
                const minutes = Math.floor(time / 60);
                const seconds = time % 60;
                dom.conferenceTimer.textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
        
        appState.setState({ conferenceTimerInterval: interval });
        
        // Добавление участников конференции
        this.renderConferenceParticipants();
    }
    
    renderConferenceParticipants() {
        const dom = domManager.elements;
        if (!dom.conferenceGrid) return;
        
        const currentUser = dataStore.user;
        const chat = appState.activeChatData;
        
        dom.conferenceGrid.innerHTML = '';
        
        // Добавление текущего пользователя
        const userElement = this.createConferenceParticipant(currentUser, true);
        dom.conferenceGrid.appendChild(userElement);
        
        // Добавление участников чата (для демо - первые 3 контакта)
        if (chat && chat.type === 'group') {
            const participants = dataStore.contacts.slice(0, 3);
            participants.forEach(contact => {
                const participantElement = this.createConferenceParticipant(contact, false);
                dom.conferenceGrid.appendChild(participantElement);
            });
        }
    }
    
    createConferenceParticipant(user, isCurrentUser) {
        const element = domManager.createElement('div', 'conference-participant', `
            <div class="participant-video">
                <div class="participant-avatar" style="background-color: ${CONFIG.COLORS.PRIMARY};">
                    ${typeof user.avatar === 'string' ? user.avatar : user.name.charAt(0)}
                    ${isCurrentUser ? '<div class="self-indicator">Вы</div>' : ''}
                </div>
                <div class="participant-name">${isCurrentUser ? 'Вы' : user.name}</div>
                <div class="participant-status">
                    <i class="fas fa-microphone${isCurrentUser ? '' : '-slash'}"></i>
                    <i class="fas fa-video"></i>
                </div>
            </div>
        `);
        
        return element;
    }
    
    endConference() {
        const interval = appState.state.conferenceTimerInterval;
        if (interval) {
            clearInterval(interval);
            appState.setState({ conferenceTimerInterval: null });
        }
        
        appState.setState({ isConferenceActive: false });
        
        const dom = domManager.elements;
        if (dom.conferencePanel) {
            dom.conferencePanel.classList.remove('active');
        }
    }
    
    closeConference() {
        this.endConference();
    }
    
    // Поиск
    performSearch(query) {
        if (!query || query.length < 2) return;
        
        const results = {
            messages: this.searchMessages(query),
            files: this.searchFiles(query),
            contacts: this.searchContacts(query)
        };
        
        appState.setState({ searchResults: results });
        this.renderSearchResults();
    }
    
    searchMessages(query) {
        const results = [];
        const searchTerm = query.toLowerCase();
        
        Object.entries(dataStore.messages).forEach(([chatId, messages]) => {
            messages.forEach(message => {
                if (message.text.toLowerCase().includes(searchTerm)) {
                    const chat = dataStore.getChat(chatId);
                    if (chat) {
                        results.push({
                            ...message,
                            chatName: chat.name,
                            chatAvatar: chat.avatar,
                            chatColor: chat.color
                        });
                    }
                }
            });
        });
        
        return results.slice(0, 10); // Ограничиваем результаты
    }
    
    searchFiles(query) {
        return dataStore.files.filter(file => 
            file.name.toLowerCase().includes(query.toLowerCase()) ||
            file.type.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);
    }
    
    searchContacts(query) {
        return dataStore.getFilteredContacts({ search: query }).slice(0, 5);
    }
    
    renderSearchResults() {
        const dom = domManager.elements;
        if (!dom.searchResults) return;
        
        const results = appState.state.searchResults;
        const hasResults = results.messages.length > 0 || 
                          results.files.length > 0 || 
                          results.contacts.length > 0;
        
        if (!hasResults) {
            dom.searchResults.innerHTML = `
                <div class="search-empty">
                    <i class="fas fa-search"></i>
                    <div class="empty-text">Ничего не найдено</div>
                </div>
            `;
            return;
        }
        
        let html = '';
        
        // Сообщения
        if (results.messages.length > 0) {
            html += `
                <div class="search-section">
                    <div class="section-title">Сообщения</div>
                    ${results.messages.map(message => `
                        <div class="search-result-item" data-type="message" data-chat="${message.chatId}" data-message="${message.id}">
                            <div class="result-avatar" style="background-color: ${message.chatColor};">
                                ${message.chatAvatar}
                            </div>
                            <div class="result-content">
                                <div class="result-title">${message.chatName}</div>
                                <div class="result-text">${message.text.substring(0, 100)}${message.text.length > 100 ? '...' : ''}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // Контакты
        if (results.contacts.length > 0) {
            html += `
                <div class="search-section">
                    <div class="section-title">Контакты</div>
                    ${results.contacts.map(contact => `
                        <div class="search-result-item" data-type="contact" data-contact="${contact.id}">
                            <div class="result-avatar" style="background-color: ${contact.color};">
                                ${contact.avatar}
                            </div>
                            <div class="result-content">
                                <div class="result-title">${contact.name}</div>
                                <div class="result-text">${contact.username}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // Файлы
        if (results.files.length > 0) {
            html += `
                <div class="search-section">
                    <div class="section-title">Файлы</div>
                    ${results.files.map(file => `
                        <div class="search-result-item" data-type="file" data-file="${file.id}">
                            <div class="result-icon" style="color: ${file.color};">
                                <i class="fas ${file.icon}"></i>
                            </div>
                            <div class="result-content">
                                <div class="result-title">${file.name}</div>
                                <div class="result-text">${file.size} • ${file.sender}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        dom.searchResults.innerHTML = html;
        
        // Обработка кликов по результатам поиска
        dom.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const type = item.dataset.type;
                
                switch (type) {
                    case 'message':
                        const chatId = item.dataset.chat;
                        const messageId = item.dataset.message;
                        this.openChat(chatId);
                        // TODO: Прокрутить к сообщению
                        break;
                        
                    case 'contact':
                        const contactId = parseInt(item.dataset.contact);
                        const contact = dataStore.getContact(contactId);
                        if (contact) {
                            this.startChatWithContact(contact);
                        }
                        break;
                        
                    case 'file':
                        const fileId = item.dataset.file;
                        // TODO: Открыть файл
                        break;
                }
                
                appState.setState({ searchQuery: '' });
                if (dom.globalSearch) dom.globalSearch.value = '';
            });
        });
    }
    
    clearSearchResults() {
        const dom = domManager.elements;
        if (dom.searchResults) {
            dom.searchResults.innerHTML = '';
        }
    }
    
    // Эмодзи и стикеры
    toggleEmojiPanel() {
        const isOpen = appState.state.isEmojiPanelOpen;
        appState.setState({ isEmojiPanelOpen: !isOpen });
        
        const dom = domManager.elements;
        if (dom.emojiPanel) {
            if (!isOpen) {
                dom.emojiPanel.classList.add('active');
                this.renderEmojis();
            } else {
                dom.emojiPanel.classList.remove('active');
            }
        }
    }
    
    switchEmojiCategory(category) {
        appState.setState({ selectedEmojiCategory: category });
        this.renderEmojis();
    }
    
    renderEmojis() {
        const dom = domManager.elements;
        if (!dom.emojiGrid) return;
        
        const category = appState.state.selectedEmojiCategory;
        const emojis = dataStore.emojis[category] || dataStore.emojis.smileys;
        
        dom.emojiGrid.innerHTML = '';
        
        emojis.forEach(emoji => {
            const emojiElement = domManager.createElement('span', 'emoji', emoji);
            emojiElement.addEventListener('click', () => this.insertEmoji(emoji));
            dom.emojiGrid.appendChild(emojiElement);
        });
    }
    
    insertEmoji(emoji) {
        const dom = domManager.elements;
        const input = dom.messageInput;
        
        if (input) {
            const cursorPos = input.selectionStart;
            const textBefore = input.value.substring(0, cursorPos);
            const textAfter = input.value.substring(cursorPos);
            
            input.value = textBefore + emoji + textAfter;
            input.focus();
            input.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
            
            // Обновить статус печатания
            appState.setState({ isTyping: true });
        }
    }
    
    // Профиль
    toggleProfileMenu() {
        const dom = domManager.elements;
        if (dom.profileModal) {
            dom.profileModal.classList.toggle('active');
        }
    }
    
    closeProfileModal() {
        const dom = domManager.elements;
        if (dom.profileModal) {
            dom.profileModal.classList.remove('active');
        }
    }
    
    // Уведомления
    showNotification(title, message, type = 'info') {
        // Проверка разрешения уведомлений
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: message,
                icon: '/favicon.ico'
            });
        }
        
        // Добавление уведомления в список
        const notification = {
            id: Date.now(),
            title,
            message,
            type,
            time: 'только что',
            read: false
        };
        
        dataStore.notifications.unshift(notification);
        
        // Обновление счетчика непрочитанных
        const unreadCount = dataStore.notifications.filter(n => !n.read).length;
        appState.setState({ unreadCount });
        
        // Визуальное уведомление (тост)
        this.showToast(message, type);
    }
    
    showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-bell"></i>
            </div>
            <div class="toast-content">${message}</div>
            <button class="btn-icon toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(toast);
        
        // Анимация появления
        domManager.animateElement(toast, {
            translateY: [20, 0],
            opacity: [0, 1],
            duration: CONFIG.ANIMATION_DURATIONS.FAST,
            easing: 'easeOutQuad'
        });
        
        // Обработка закрытия
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                domManager.animateElement(toast, {
                    translateY: -20,
                    opacity: 0,
                    duration: CONFIG.ANIMATION_DURATIONS.FAST,
                    easing: 'easeInQuad',
                    complete: () => toast.remove()
                });
            });
        }
        
        // Автоматическое скрытие через 5 секунд
        setTimeout(() => {
            if (toast.parentNode) {
                domManager.animateElement(toast, {
                    translateY: -20,
                    opacity: 0,
                    duration: CONFIG.ANIMATION_DURATIONS.FAST,
                    easing: 'easeInQuad',
                    complete: () => toast.remove()
                });
            }
        }, 5000);
    }
    
    // Вспомогательные методы
    showEmptyState(title, subtitle) {
        const dom = domManager.elements;
        if (!dom.emptyState) return;
        
        dom.emptyState.innerHTML = `
            <div class="empty-state-icon">
                <i class="fas fa-comments"></i>
            </div>
            <div class="empty-state-title">${title}</div>
            <div class="empty-state-subtitle">${subtitle}</div>
        `;
        
        dom.emptyState.style.display = 'block';
        dom.chatsContainer.innerHTML = '';
    }
    
    scrollToBottom() {
        const dom = domManager.elements;
        if (dom.messagesContainer) {
            dom.messagesContainer.scrollTop = dom.messagesContainer.scrollHeight;
        }
    }
    
    getMessageById(messageId) {
        const chatId = appState.state.activeChat;
        if (!chatId) return null;
        
        const messages = dataStore.getMessages(chatId);
        return messages.find(m => m.id === messageId);
    }
    
    markChatAsRead(chatId) {
        const chat = dataStore.getChat(chatId);
        if (chat && chat.unread > 0) {
            chat.unread = 0;
            this.renderChats();
        }
    }
    
    // Создание нового чата
    createNewChat() {
        // TODO: Реализовать логику создания нового чата
        this.showNotification('Информация', 'Функция создания нового чата будет реализована в следующем обновлении');
    }
    
    // Создание нового узла
    createNewNode() {
        // TODO: Реализовать логику создания нового узла
        this.showNotification('Информация', 'Функция создания нового узла будет реализована в следующем обновлении');
    }
    
    // Добавление нового контакта
    addNewContact() {
        // TODO: Реализовать логику добавления нового контакта
        this.showNotification('Информация', 'Функция добавления нового контакта будет реализована в следующем обновлении');
    }
    
    // Начало чата с контактом
    startChatWithContact(contact) {
        // Поиск существующего чата с контактом
        const existingChat = dataStore.chats.find(chat => 
            chat.type === 'personal' && 
            (chat.name === contact.name || chat.name === contact.username)
        );
        
        if (existingChat) {
            this.openChat(existingChat.id);
        } else {
            // Создание нового чата
            const newChat = new Chat({
                name: contact.name,
                type: 'personal',
                avatar: contact.avatar,
                color: contact.color,
                lastMessage: 'Начните общение',
                members: 2,
                online: contact.status === 'online' ? 1 : 0,
                tags: ['личное', 'контакт']
            });
            
            dataStore.chats.unshift(newChat);
            this.openChat(newChat.id);
        }
    }
    
    // Звонок контакту
    startCallWithContact(contact) {
        // TODO: Реализовать логику звонка
        this.showNotification('Звонок', `Начинается звонок с ${contact.name}...`, 'call');
        
        // Имитация звонка через 2 секунды
        setTimeout(() => {
            this.startConference();
        }, 2000);
    }
    
    // Открытие профиля контакта
    openContactProfile(contact) {
        // TODO: Реализовать открытие профиля контакта
        this.showNotification('Профиль', `Открывается профиль ${contact.name}`, 'info');
    }
    
    // Обработка загрузки файла
    handleFileUpload(e) {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        
        Array.from(files).forEach(file => {
            this.uploadFile(file);
        });
        
        // Сброс input
        e.target.value = '';
    }
    
    uploadFile(file) {
        // Добавление в очередь загрузок
        const upload = {
            id: Date.now(),
            name: file.name,
            size: this.formatFileSize(file.size),
            progress: 0,
            status: 'uploading',
            file: file
        };
        
        appState.setState({
            uploadQueue: [...appState.state.uploadQueue, upload],
            currentUploads: [...appState.state.currentUploads, upload]
        });
        
        // Имитация загрузки
        this.simulateUpload(upload);
    }
    
    simulateUpload(upload) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            // Обновление прогресса
            const updatedUpload = { ...upload, progress };
            this.updateUploadProgress(updatedUpload);
            
            if (progress >= 100) {
                clearInterval(interval);
                
                // Завершение загрузки
                setTimeout(() => {
                    updatedUpload.status = 'completed';
                    this.updateUploadProgress(updatedUpload);
                    
                    // Отправка файла как сообщения
                    if (appState.state.activeChat) {
                        this.sendFileMessage(updatedUpload);
                    }
                    
                    // Удаление из текущих загрузок
                    setTimeout(() => {
                        this.removeFromUploads(updatedUpload);
                    }, 2000);
                }, 500);
            }
        }, 200);
    }
    
    updateUploadProgress(upload) {
        const updatedQueue = appState.state.uploadQueue.map(item => 
            item.id === upload.id ? upload : item
        );
        
        const updatedUploads = appState.state.currentUploads.map(item => 
            item.id === upload.id ? upload : item
        );
        
        appState.setState({
            uploadQueue: updatedQueue,
            currentUploads: updatedUploads
        });
        
        // Обновление панели загрузок
        this.updateUploadsPanel();
    }
    
    removeFromUploads(upload) {
        const updatedQueue = appState.state.uploadQueue.filter(item => item.id !== upload.id);
        const updatedUploads = appState.state.currentUploads.filter(item => item.id !== upload.id);
        
        appState.setState({
            uploadQueue: updatedQueue,
            currentUploads: updatedUploads
        });
        
        this.updateUploadsPanel();
    }
    
    updateUploadsPanel() {
        const dom = domManager.elements;
        if (!dom.uploadsPanel) return;
        
        const uploads = appState.state.currentUploads;
        
        if (uploads.length === 0) {
            dom.uploadsPanel.classList.remove('active');
            return;
        }
        
        dom.uploadsPanel.classList.add('active');
        
        const uploadsHTML = uploads.map(upload => `
            <div class="upload-item upload-${upload.status}">
                <div class="upload-icon">
                    <i class="fas fa-file-upload"></i>
                </div>
                <div class="upload-info">
                    <div class="upload-name">${upload.name}</div>
                    <div class="upload-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${upload.progress}%"></div>
                        </div>
                        <div class="upload-size">${upload.size} • ${upload.progress}%</div>
                    </div>
                </div>
                ${upload.status === 'completed' ? 
                    '<i class="fas fa-check upload-complete"></i>' : 
                    '<button class="btn-icon upload-cancel"><i class="fas fa-times"></i></button>'
                }
            </div>
        `).join('');
        
        dom.uploadsPanel.innerHTML = uploadsHTML;
    }
    
    sendFileMessage(upload) {
        const chatId = appState.state.activeChat;
        if (!chatId) return;
        
        const fileType = this.getFileType(upload.file.type);
        const fileIcon = this.getFileIcon(fileType);
        const fileColor = this.getFileColor(fileType);
        
        const messageData = {
            text: 'Файл',
            type: 'outgoing',
            status: 'sent',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            file: {
                name: upload.name,
                size: upload.size,
                type: fileType,
                icon: fileIcon,
                color: fileColor
            }
        };
        
        dataStore.addMessage(chatId, messageData);
        this.renderMessages();
        
        // Добавление файла в общий список
        const fileRecord = {
            id: upload.id,
            name: upload.name,
            size: upload.size,
            type: fileType,
            sender: 'Вы',
            time: 'только что',
            node: appState.state.activeNode,
            chat: chatId,
            icon: fileIcon,
            color: fileColor
        };
        
        dataStore.files.unshift(fileRecord);
    }
    
    getFileType(mimeType) {
        if (mimeType.startsWith('image/')) return 'image';
        if (mimeType.startsWith('video/')) return 'video';
        if (mimeType.startsWith('audio/')) return 'audio';
        if (mimeType.includes('pdf')) return 'pdf';
        if (mimeType.includes('word')) return 'document';
        if (mimeType.includes('excel')) return 'spreadsheet';
        if (mimeType.includes('presentation')) return 'presentation';
        return 'document';
    }
    
    getFileIcon(fileType) {
        const icons = {
            image: 'fa-image',
            video: 'fa-video',
            audio: 'fa-music',
            pdf: 'fa-file-pdf',
            document: 'fa-file-word',
            spreadsheet: 'fa-file-excel',
            presentation: 'fa-file-powerpoint',
            archive: 'fa-file-archive',
            code: 'fa-file-code',
            text: 'fa-file-alt'
        };
        
        return icons[fileType] || 'fa-file';
    }
    
    getFileColor(fileType) {
        const colors = {
            image: CONFIG.COLORS.SUCCESS,
            video: CONFIG.COLORS.PRIMARY,
            audio: CONFIG.COLORS.SECONDARY,
            pdf: CONFIG.COLORS.ERROR,
            document: CONFIG.COLORS.INFO,
            spreadsheet: CONFIG.COLORS.SUCCESS,
            presentation: CONFIG.COLORS.WARNING
        };
        
        return colors[fileType] || CONFIG.COLORS.INDIGO;
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Обновление активности
    refreshActivity() {
        // Добавление новой активности для демо
        const activities = [
            'вошел в систему',
            'начал печатать',
            'обновил статус',
            'загрузил файл',
            'создал опрос',
            'добавил реакцию',
            'закрепил сообщение',
            'изменил настройки'
        ];
        
        const users = dataStore.contacts.slice(0, 3).map(c => c.name);
        const actions = ['calling', 'typing', 'gaming', 'conference', 'upload'];
        
        const newActivity = {
            id: Date.now(),
            user: users[Math.floor(Math.random() * users.length)],
            action: actions[Math.floor(Math.random() * actions.length)],
            text: `${activities[Math.floor(Math.random() * activities.length)]}`,
            time: 'только что',
            icon: 'fas fa-bell',
            color: CONFIG.COLORS.PRIMARY,
            node: appState.state.activeNode
        };
        
        dataStore.activity.unshift(newActivity);
        this.renderActivity();
        
        // Анимация обновления
        const refreshBtn = domManager.elements.refreshActivityBtn;
        if (refreshBtn) {
            domManager.animateElement(refreshBtn, {
                rotate: 360,
                duration: CONFIG.ANIMATION_DURATIONS.FAST,
                easing: 'easeOutQuad'
            });
        }
    }
    
    // Фоновые процессы
    startBackgroundProcesses() {
        // Обновление статусов онлайн
        setInterval(() => {
            this.updateOnlineStatuses();
        }, 30000);
        
        // Обновление времени в чатах
        setInterval(() => {
            this.updateChatTimes();
        }, 60000);
        
        // Проверка новых сообщений
        setInterval(() => {
            this.checkForNewMessages();
        }, 10000);
    }
    
    updateOnlineStatuses() {
        // Случайное обновление статусов онлайн для демо
        dataStore.contacts.forEach(contact => {
            if (Math.random() > 0.7) {
                const statuses = ['online', 'offline', 'typing'];
                const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                
                if (contact.status !== newStatus) {
                    contact.status = newStatus;
                    contact.lastSeen = newStatus === 'online' ? 'только что' : '5 мин назад';
                    contact.activity = newStatus === 'online' ? 'В сети' : 
                                     newStatus === 'typing' ? 'Печатает...' : 'Не в сети';
                }
            }
        });
        
        // Обновление интерфейса, если открыт чат
        if (appState.state.activeChat) {
            this.updateChatStatus();
        }
    }
    
    updateChatTimes() {
        // Обновление времени в чатах
        dataStore.chats.forEach(chat => {
            const now = new Date();
            const lastActivity = new Date(chat.lastActivity);
            const diffMinutes = Math.floor((now - lastActivity) / (1000 * 60));
            
            if (diffMinutes < 1) {
                chat.time = 'только что';
            } else if (diffMinutes < 60) {
                chat.time = `${diffMinutes} мин назад`;
            } else if (diffMinutes < 1440) {
                const hours = Math.floor(diffMinutes / 60);
                chat.time = `${hours} ч назад`;
            } else {
                const days = Math.floor(diffMinutes / 1440);
                chat.time = `${days} д назад`;
            }
        });
        
        // Обновление интерфейса
        if (appState.state.activeView === 'chats') {
            this.renderChats();
        }
    }
    
    checkForNewMessages() {
        // Для демо: случайное добавление новых сообщений в неактивные чаты
        if (Math.random() > 0.8) {
            const inactiveChats = dataStore.chats.filter(chat => 
                chat.id !== appState.state.activeChat && 
                Math.random() > 0.5
            );
            
            inactiveChats.forEach(chat => {
                const messages = [
                    'Привет! Как дела?',
                    'Есть новости по проекту?',
                    'Можем созвониться?',
                    'Отправил тебе файл, посмотри',
                    'Когда будет готово?',
                    'Отличные новости!',
                    'Нужна твоя помощь'
                ];
                
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                chat.lastMessage = randomMessage.length > 50 ? 
                    randomMessage.substring(0, 50) + '...' : randomMessage;
                chat.time = 'только что';
                chat.unread = (chat.unread || 0) + 1;
                chat.lastActivity = new Date().toISOString();
                
                // Уведомление (только если не в этом чате сейчас)
                if (chat.id !== appState.state.activeChat) {
                    this.showNotification(chat.name, randomMessage, 'message');
                }
            });
            
            // Обновление интерфейса
            if (appState.state.activeView === 'chats') {
                this.renderChats();
            }
        }
    }
    
    // Настройки
    openSettings() {
        appState.setState({ activeView: 'settings' });
        this.renderSettings();
    }
    
    renderSettings() {
        const dom = domManager.elements;
        if (!dom.settingsModal) return;
        
        dom.settingsModal.classList.add('active');
        
        // TODO: Реализовать полный интерфейс настроек
        dom.settingsModal.innerHTML = `
            <div class="modal-header">
                <h2>Настройки</h2>
                <button class="btn-icon close-modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <div class="settings-tabs">
                    <button class="settings-tab active" data-tab="general">Основные</button>
                    <button class="settings-tab" data-tab="notifications">Уведомления</button>
                    <button class="settings-tab" data-tab="privacy">Приватность</button>
                    <button class="settings-tab" data-tab="data">Данные</button>
                    <button class="settings-tab" data-tab="about">О программе</button>
                </div>
                
                <div class="settings-content">
                    <div class="tab-content active" id="general">
                        <h3>Основные настройки</h3>
                        <div class="setting-item">
                            <label>Язык</label>
                            <select>
                                <option value="ru" selected>Русский</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                        <div class="setting-item">
                            <label>Тема</label>
                            <select>
                                <option value="auto">Авто</option>
                                <option value="light">Светлая</option>
                                <option value="dark" selected>Темная</option>
                            </select>
                        </div>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" checked>
                                Включить звуки
                            </label>
                        </div>
                    </div>
                    
                    <div class="tab-content" id="notifications">
                        <h3>Уведомления</h3>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" checked>
                                Включить уведомления
                            </label>
                        </div>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" checked>
                                Звук уведомлений
                            </label>
                        </div>
                    </div>
                    
                    <div class="tab-content" id="about">
                        <h3>О программе</h3>
                        <div class="about-info">
                            <div class="app-icon">
                                <i class="fas fa-sitemap"></i>
                            </div>
                            <div class="app-name">${CONFIG.APP_NAME}</div>
                            <div class="app-version">Версия ${CONFIG.VERSION}</div>
                            <div class="app-developer">Разработчик: ${CONFIG.DEVELOPER}</div>
                            <div class="app-description">
                                Telegram Nodes - улучшенная версия Telegram с расширенными возможностями управления сообществами и общения.
                            </div>
                        </div>
                        <button class="btn logout-btn" id="logout-btn">
                            <i class="fas fa-sign-out-alt"></i> Выйти
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Обработка закрытия модального окна
        const closeBtn = dom.settingsModal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                dom.settingsModal.classList.remove('active');
            });
        }
        
        // Переключение вкладок настроек
        const tabs = dom.settingsModal.querySelectorAll('.settings-tab');
        const contents = dom.settingsModal.querySelectorAll('.tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                const content = document.getElementById(tabId);
                if (content) content.classList.add('active');
            });
        });
        
        // Кнопка выхода
        const logoutBtn = dom.settingsModal.querySelector('#logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                authManager.logout();
                dom.settingsModal.classList.remove('active');
            });
        }
    }
    
    // Публичные методы для обработки действий с сообщениями
    handleMessageAction(message, action, event) {
        switch (action) {
            case 'reply':
                this.replyToMessage(message.id);
                break;
                
            case 'edit':
                this.editMessage(message.id);
                break;
                
            case 'delete':
                this.deleteMessage(message.id);
                break;
                
            case 'react':
                this.showReactionsPanel(message, event);
                break;
                
            case 'more':
                this.showMessageContextMenu(message, event);
                break;
        }
    }
    
    showReactionsPanel(message, event) {
        // TODO: Реализовать панель реакций
        this.showNotification('Реакции', 'Функция реакций будет реализована в следующем обновлении');
    }
    
    showMessageContextMenu(message, event) {
        // TODO: Реализовать контекстное меню сообщения
        this.showNotification('Действия', 'Контекстное меню сообщения будет реализовано в следующем обновлении');
    }
    
    // Получение чата по ID
    getChatById(chatId) {
        return dataStore.getChat(chatId);
    }
    
    // Получение контакта по ID
    getContactById(contactId) {
        return dataStore.getContact(contactId);
    }
}

// ████████████████████████████████████████████
// ███ ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ███
// ████████████████████████████████████████████

// Создание экземпляров классов
const dataStore = new DataStore();
const appState = new AppStateManager();
const domManager = new DOMManager();
const authManager = new AuthManager();
const appManager = new AppManager();

// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    appManager.init();
    
    // Инициализация частиц для фона (если библиотека подключена)
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: CONFIG.COLORS.PRIMARY },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: CONFIG.COLORS.PRIMARY,
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' }
                }
            }
        });
    }
});

// Глобальные слушатели
window.addEventListener('resize', () => {
    appState.setState({ 
        isSidebarVisible: window.innerWidth > 768 
    });
});

// Глобальный объект для отладки
if (process.env.NODE_ENV === 'development') {
    window.TelegramNodes = {
        dataStore,
        appState,
        domManager,
        authManager,
        appManager,
        CONFIG
    };
    
    console.log('Telegram Nodes v' + CONFIG.VERSION + ' загружен в режиме разработки');
}
       
