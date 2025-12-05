// Telegram Nodes - Полная версия с системой входа (3000+ строк)
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
            conference: true,
            voiceMessages: true,
            stickers: true,
            files: true,
            polls: true,
            bots: true
        },
        limits: {
            maxFileSize: 2000,
            maxParticipants: 100,
            maxNodes: 20,
            maxChats: 1000
        },
        api: {
            baseUrl: 'https://api.telegram-nodes.com',
            endpoints: {
                messages: '/v1/messages',
                nodes: '/v1/nodes',
                users: '/v1/users',
                media: '/v1/media'
            }
        }
    };

// sw.js в корне проекта
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('telegram-nodes-v1').then(cache => {
            return cache.addAll([
                './',
                './index.html',
                './style.css',
                './login.css',
                './script.js'
            ]);
        })
    );
});
    
    // ========== ДАННЫЕ ПРИЛОЖЕНИЯ ==========
    const appData = {
        user: {
            id: 1,
            name: 'Газман',
            username: '@gazman',
            avatar: 'Г',
            status: 'Основатель Telegram Nodes',
            online: true,
            bio: 'Любитель кофе и технологий • Разработчик • Геймер • Дизайнер',
            location: 'Москва, Россия',
            phone: '+7 (900) 123-45-67',
            email: 'gazman@telegram-nodes.com',
            joined: '2023-01-15',
            lastSeen: 'только что',
            settings: {
                notifications: true,
                sound: true,
                vibration: true,
                autoDownload: true,
                saveToGallery: true,
                privacy: 'everybody',
                language: 'ru',
                theme: 'auto'
            },
            stats: {
                chats: 156,
                contacts: 48,
                nodes: 7,
                online: 1,
                messages: 25489,
                storage: 2.4,
                calls: 342,
                conferences: 56
            },
            achievements: [
                { id: 1, name: 'Первое сообщение', icon: 'fa-comment', unlocked: true },
                { id: 2, name: 'Активный пользователь', icon: 'fa-fire', unlocked: true },
                { id: 3, name: 'Создатель узлов', icon: 'fa-sitemap', unlocked: true },
                { id: 4, name: 'Мастер конференций', icon: 'fa-users', unlocked: false },
                { id: 5, name: 'Гуру уведомлений', icon: 'fa-bell', unlocked: true }
            ]
        },
        
        nodes: [
            {
                id: 'alpha',
                name: 'AlphaTeam',
                icon: 'fas fa-rocket',
                color: '#0088cc',
                description: 'Рабочая команда разработки и управления проектами',
                members: 24,
                online: 12,
                unread: 3,
                created: '2024-01-15',
                admin: true,
                pinned: true,
                notifications: 'all',
                role: 'Создатель',
                tags: ['работа', 'разработка', 'управление'],
                stats: {
                    messages: 12456,
                    files: 234,
                    calls: 45,
                    conferences: 12
                }
            },
            {
                id: 'game',
                name: 'GameZone',
                icon: 'fas fa-gamepad',
                color: '#af52de',
                description: 'Игровое сообщество для любителей киберспорта',
                members: 48,
                online: 23,
                unread: 0,
                created: '2024-02-20',
                admin: true,
                pinned: true,
                notifications: 'mentions',
                role: 'Администратор',
                tags: ['игры', 'киберспорт', 'развлечения'],
                stats: {
                    messages: 8567,
                    files: 123,
                    calls: 89,
                    conferences: 8
                }
            },
            {
                id: 'family',
                name: 'Family',
                icon: 'fas fa-heart',
                color: '#34c759',
                description: 'Семейный чат для общения с близкими',
                members: 12,
                online: 4,
                unread: 1,
                created: '2024-03-05',
                admin: true,
                pinned: false,
                notifications: 'all',
                role: 'Создатель',
                tags: ['семья', 'личное', 'близкие'],
                stats: {
                    messages: 3456,
                    files: 45,
                    calls: 67,
                    conferences: 3
                }
            },
            {
                id: 'design',
                name: 'DesignHub',
                icon: 'fas fa-palette',
                color: '#ff9500',
                description: 'Дизайн и креатив для профессионалов',
                members: 18,
                online: 8,
                unread: 0,
                created: '2024-03-10',
                admin: false,
                pinned: false,
                notifications: 'none',
                role: 'Участник',
                tags: ['дизайн', 'креатив', 'ui/ux'],
                stats: {
                    messages: 5678,
                    files: 167,
                    calls: 23,
                    conferences: 5
                }
            },
            {
                id: 'music',
                name: 'MusicLovers',
                icon: 'fas fa-music',
                color: '#ff3b30',
                description: 'Обмен музыкой и обсуждение новых релизов',
                members: 32,
                online: 15,
                unread: 5,
                created: '2024-03-12',
                admin: false,
                pinned: false,
                notifications: 'all',
                role: 'Участник',
                tags: ['музыка', 'развлечения', 'творчество'],
                stats: {
                    messages: 7890,
                    files: 289,
                    calls: 34,
                    conferences: 7
                }
            },
            {
                id: 'travel',
                name: 'TravelBuddy',
                icon: 'fas fa-plane',
                color: '#5856d6',
                description: 'Планирование путешествий и обмен опытом',
                members: 27,
                online: 9,
                unread: 2,
                created: '2024-03-15',
                admin: true,
                pinned: true,
                notifications: 'mentions',
                role: 'Модератор',
                tags: ['путешествия', 'отдых', 'приключения'],
                stats: {
                    messages: 4321,
                    files: 156,
                    calls: 29,
                    conferences: 4
                }
            },
            {
                id: 'fitness',
                name: 'FitnessClub',
                icon: 'fas fa-dumbbell',
                color: '#5ac8fa',
                description: 'Тренировки, питание и здоровый образ жизни',
                members: 41,
                online: 18,
                unread: 0,
                created: '2024-03-18',
                admin: false,
                pinned: false,
                notifications: 'none',
                role: 'Участник',
                tags: ['спорт', 'здоровье', 'фитнес'],
                stats: {
                    messages: 6543,
                    files: 98,
                    calls: 41,
                    conferences: 6
                }
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
                lastMessage: 'Обсуждаем новый UI для проекта. Завтра встреча в 11:00',
                time: '12:30',
                unread: 3,
                members: 8,
                online: 5,
                pinned: true,
                verified: false,
                muted: false,
                archived: false,
                lastActivity: '2024-03-20T12:30:00',
                tags: ['работа', 'дизайн', 'проект'],
                permissions: {
                    sendMessages: true,
                    sendMedia: true,
                    sendPolls: true,
                    addMembers: false,
                    pinMessages: false,
                    changeInfo: false
                }
            },
            {
                id: 'reports-q3',
                node: 'alpha',
                name: 'Отчеты Q3',
                type: 'channel',
                avatar: 'О',
                color: '#0088cc',
                lastMessage: 'Все отчеты готовы к отправке. Пожалуйста, проверьте данные',
                time: 'Пт',
                unread: 0,
                members: 2,
                online: 1,
                pinned: false,
                verified: true,
                muted: true,
                archived: false,
                lastActivity: '2024-03-19T16:45:00',
                tags: ['работа', 'отчеты', 'финансы'],
                permissions: {
                    sendMessages: false,
                    sendMedia: false,
                    sendPolls: false,
                    addMembers: false,
                    pinMessages: false,
                    changeInfo: false
                }
            },
            {
                id: 'cybersport',
                node: 'game',
                name: 'Киберспорт турнир',
                type: 'group',
                avatar: 'К',
                color: '#af52de',
                lastMessage: 'Стартуем в 20:00, не опаздывайте! Регистрация обязательна',
                time: '11:45',
                unread: 0,
                members: 24,
                online: 16,
                pinned: true,
                verified: false,
                muted: false,
                archived: false,
                lastActivity: '2024-03-20T11:45:00',
                tags: ['игры', 'киберспорт', 'турнир'],
                permissions: {
                    sendMessages: true,
                    sendMedia: true,
                    sendPolls: true,
                    addMembers: true,
                    pinMessages: true,
                    changeInfo: false
                }
            },
            {
                id: 'durov-chat',
                node: 'alpha',
                name: 'Павел Дуров',
                type: 'personal',
                avatar: 'ПД',
                color: '#0088cc',
                lastMessage: 'Новый функционал выглядит отлично! Давайте обсудим детали',
                time: '10:30',
                unread: 1,
                members: 2,
                online: 1,
                pinned: true,
                verified: true,
                muted: false,
                archived: false,
                lastActivity: '2024-03-20T10:30:00',
                tags: ['личное', 'работа', 'знакомства'],
                permissions: {
                    sendMessages: true,
                    sendMedia: true,
                    sendPolls: true,
                    addMembers: true,
                    pinMessages: true,
                    changeInfo: true
                }
            },
            {
                id: 'cs2-tournament',
                node: 'game',
                name: 'CS2 Чемпионат',
                type: 'group',
                avatar: 'CS',
                color: '#af52de',
                lastMessage: 'Регистрация до 25 марта. Призовой фонд $10,000',
                time: 'Вчера',
                unread: 5,
                members: 32,
                online: 12,
                pinned: false,
                verified: true,
                muted: false,
                archived: false,
                lastActivity: '2024-03-19T14:20:00',
                tags: ['игры', 'cs2', 'турнир', 'призы'],
                permissions: {
                    sendMessages: true,
                    sendMedia: true,
                    sendPolls: false,
                    addMembers: false,
                    pinMessages: false,
                    changeInfo: false
                }
            },
            {
                id: 'family-chat',
                node: 'family',
                name: 'Семейный чат',
                type: 'group',
                avatar: 'С',
                color: '#34c759',
                lastMessage: 'Кто за пиццей сегодня? Собираемся в 19:00',
                time: '09:15',
                unread: 0,
                members: 12,
                online: 3,
                pinned: false,
                verified: false,
                muted: false,
                archived: false,
                lastActivity: '2024-03-20T09:15:00',
                tags: ['семья', 'еда', 'встречи'],
                permissions: {
                    sendMessages: true,
                    sendMedia: true,
                    sendPolls: true,
                    addMembers: true,
                    pinMessages: true,
                    changeInfo: true
                }
            },
            {
                id: 'code-review',
                node: 'alpha',
                name: 'Code Review',
                type: 'group',
                avatar: 'CR',
                color: '#0088cc',
                lastMessage: 'Нужно ревью для нового PR. Кто может посмотреть?',
                time: 'Вчера',
                unread: 2,
                members: 6,
                online: 3,
                pinned: false,
                verified: false,
                muted: false,
                archived: true,
                lastActivity: '2024-03-19T17:30:00',
                tags: ['работа', 'код', 'разработка'],
                permissions: {
                    sendMessages: true,
                    sendMedia: true,
                    sendPolls: false,
                    addMembers: false,
                    pinMessages: false,
                    changeInfo: false
                }
            },
            {
                id: 'music-share',
                node: 'music',
                name: 'Music Share',
                type: 'group',
                avatar: 'MS',
                color: '#ff3b30',
                lastMessage: 'Новый альбом выходит завтра! Кто уже предзаказал?',
                time: '08:45',
                unread: 7,
                members: 19,
                online: 11,
                pinned: true,
                verified: false,
                muted: true,
                archived: false,
                lastActivity: '2024-03-20T08:45:00',
                tags: ['музыка', 'новинки', 'альбомы'],
                permissions: {
                    sendMessages: true,
                    sendMedia: true,
                    sendPolls: true,
                    addMembers: true,
                    pinMessages: true,
                    changeInfo: false
                }
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
                color: '#0088cc',
                username: '@alexey_dev',
                phone: '+7 (900) 111-22-33',
                email: 'alexey@example.com',
                isContact: true,
                isBlocked: false,
                mutualNodes: ['alpha', 'design'],
                notes: 'Коллега по работе, разработчик',
                tags: ['работа', 'разработка', 'друг']
            },
            {
                id: 2,
                name: 'Мария',
                avatar: 'М',
                status: 'typing',
                lastSeen: 'печатает...',
                activity: 'Онлайн',
                color: '#af52de',
                username: '@maria_design',
                phone: '+7 (900) 222-33-44',
                email: 'maria@example.com',
                isContact: true,
                isBlocked: false,
                mutualNodes: ['alpha', 'design', 'music'],
                notes: 'Дизайнер, работает над новым проектом',
                tags: ['работа', 'дизайн', 'музыка']
            },
            {
                id: 3,
                name: 'Павел Дуров',
                avatar: 'ПД',
                status: 'online',
                lastSeen: '5 мин назад',
                activity: 'В конференции',
                color: '#34c759',
                username: '@durov',
                phone: '+7 (900) 333-44-55',
                email: 'durov@telegram.org',
                isContact: true,
                isBlocked: false,
                mutualNodes: ['alpha', 'game'],
                notes: 'Основатель Telegram',
                tags: ['знаменитость', 'разработка', 'лидер']
            },
            {
                id: 4,
                name: 'Дмитрий',
                avatar: 'Д',
                status: 'online',
                lastSeen: '2 ч назад',
                activity: 'CS2 онлайн',
                color: '#ff9500',
                username: '@dima_gamer',
                phone: '+7 (900) 444-55-66',
                email: 'dima@example.com',
                isContact: true,
                isBlocked: false,
                mutualNodes: ['game', 'fitness'],
                notes: 'Геймер, участвует в турнирах',
                tags: ['игры', 'спорт', 'друг']
            },
            {
                id: 5,
                name: 'Екатерина',
                avatar: 'Е',
                status: 'offline',
                lastSeen: 'вчера',
                activity: 'Был(-а) 2 дня назад',
                color: '#ff3b30',
                username: '@katya_music',
                phone: '+7 (900) 555-66-77',
                email: 'katya@example.com',
                isContact: true,
                isBlocked: false,
                mutualNodes: ['music', 'travel'],
                notes: 'Любитель музыки, часто путешествует',
                tags: ['музыка', 'путешествия', 'знакомство']
            },
            {
                id: 6,
                name: 'Иван',
                avatar: 'И',
                status: 'online',
                lastSeen: '30 мин назад',
                activity: 'В сети',
                color: '#5856d6',
                username: '@ivan_travel',
                phone: '+7 (900) 666-77-88',
                email: 'ivan@example.com',
                isContact: false,
                isBlocked: false,
                mutualNodes: ['travel'],
                notes: '',
                tags: ['путешествия']
            },
            {
                id: 7,
                name: 'Ольга',
                avatar: 'О',
                status: 'offline',
                lastSeen: 'неделю назад',
                activity: 'Был(-а) давно',
                color: '#5ac8fa',
                username: '@olga_fitness',
                phone: '+7 (900) 777-88-99',
                email: 'olga@example.com',
                isContact: true,
                isBlocked: false,
                mutualNodes: ['fitness'],
                notes: 'Тренер по фитнесу',
                tags: ['спорт', 'фитнес']
            }
        ],
        
        activity: [
            {
                id: 1,
                user: 'Алексей',
                action: 'calling',
                text: 'Начинает звонок в Дизайн-команда',
                time: '2 мин назад',
                icon: 'fas fa-phone',
                color: '#0088cc',
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
                color: '#af52de',
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
                color: '#ff9500',
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
                color: '#34c759',
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
                color: '#ff3b30',
                node: 'music',
                chat: 'music-share'
            },
            {
                id: 6,
                user: 'Иван',
                action: 'travel',
                text: 'Поделился локацией в TravelBuddy',
                time: '2 ч назад',
                icon: 'fas fa-map-marker-alt',
                color: '#5856d6',
                node: 'travel',
                chat: null
            },
            {
                id: 7,
                user: 'Ольга',
                action: 'fitness',
                text: 'Обновила достижения в FitnessClub',
                time: '3 ч назад',
                icon: 'fas fa-dumbbell',
                color: '#5ac8fa',
                node: 'fitness',
                chat: null
            }
        ],
        
        emojis: {
            smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯'],
            people: ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🦷', '🦴', '👀', '👁️', '👅', '👄'],
            nature: ['🐵', '🐒', '🦍', '🐶', '🐕', '🦮', '🐕‍🦺', '🐩', '🐺', '🦊', '🦝', '🐱', '🐈', '🦁', '🐯', '🐅', '🐆', '🐴', '🐎', '🦄', '🦓', '🦌', '🐮', '🐂', '🐃', '🐄', '🐷', '🐖', '🐗', '🐽', '🐏', '🐑', '🐐', '🐪', '🐫', '🦙', '🦒', '🐘', '🦏', '🦛', '🐭', '🐁', '🐀', '🐹', '🐰', '🐇', '🐿️'],
            objects: ['⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🎮', '🕹️', '🗜️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️', '⏲️', '⏰', '🕰️', '⌛', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯️', '🧯'],
            symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️'],
            flags: ['🏁', '🚩', '🎌', '🏴', '🏳️', '🏳️‍🌈', '🏳️‍⚧️', '🏴‍☠️', '🇦🇫', '🇦🇽', '🇦🇱', '🇩🇿', '🇦🇸', '🇦🇩', '🇦🇴', '🇦🇮', '🇦🇶', '🇦🇬', '🇦🇷', '🇦🇲', '🇦🇼', '🇦🇺', '🇦🇹', '🇦🇿', '🇧🇸', '🇧🇭', '🇧🇩', '🇧🇧', '🇧🇾', '🇧🇪', '🇧🇿', '🇧🇯', '🇧🇲', '🇧🇹', '🇧🇴', '🇧🇦', '🇧🇼', '🇧🇷', '🇮🇴', '🇻🇬', '🇧🇳', '🇧🇬', '🇧🇫', '🇧🇮', '🇨🇻']
        },
        
        stickers: {
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
        },
        
        messages: {
            'design-team': [
                {
                    id: 1,
                    sender: 'Мария',
                    text: 'Привет! Как продвигается работа над новым дизайном?',
                    time: '12:15',
                    type: 'incoming',
                    status: 'read',
                    avatar: 'М',
                    color: '#af52de',
                    reactions: {
                        '👍': ['Вы', 'Алексей'],
                        '❤️': ['Мария']
                    },
                    edited: false,
                    pinned: false
                },
                {
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
                    edited: true,
                    pinned: false
                },
                {
                    id: 3,
                    sender: 'Алексей',
                    text: 'Отлично! Когда сможете показать прототип? Завтра в 11:00 подойдет?',
                    time: '12:25',
                    type: 'incoming',
                    status: 'read',
                    avatar: 'А',
                    color: '#0088cc',
                    reactions: {
                        '👍': ['Вы']
                    },
                    edited: false,
                    pinned: true
                },
                {
                    id: 4,
                    sender: 'Вы',
                    text: 'Да, отлично! Приготовлю презентацию',
                    time: '12:26',
                    type: 'outgoing',
                    status: 'read',
                    reactions: {},
                    edited: false,
                    pinned: false
                },
                {
                    id: 5,
                    sender: 'Мария',
                    text: 'Я тоже буду, принесу кофе ☕',
                    time: '12:27',
                    type: 'incoming',
                    status: 'read',
                    avatar: 'М',
                    color: '#af52de',
                    reactions: {
                        '☕': ['Вы', 'Алексей']
                    },
                    edited: false,
                    pinned: false
                }
            ],
            'durov-chat': [
                {
                    id: 1,
                    sender: 'Павел Дуров',
                    text: 'Привет! Вижу ты работаешь над новым интерфейсом для Telegram. Интересная концепция с узлами!',
                    time: '18:45',
                    type: 'incoming',
                    status: 'read',
                    avatar: 'ПД',
                    color: '#34c759',
                    verified: true,
                    reactions: {
                        '👀': ['Вы']
                    },
                    edited: false,
                    pinned: true
                },
                {
                    id: 2,
                    sender: 'Вы',
                    text: 'Да, Павел! Делаю улучшенную версию с узлами и конференциями. Хочу сделать управление сообществами более удобным',
                    time: '19:20',
                    type: 'outgoing',
                    status: 'read',
                    reactions: {
                        '👍': ['Павел Дуров']
                    },
                    edited: true,
                    pinned: false
                },
                {
                    id: 3,
                    sender: 'Павел Дуров',
                    text: 'Отличная идея! Если нужна помощь или совет - обращайся. Удачи с проектом! 🚀',
                    time: '19:25',
                    type: 'incoming',
                    status: 'read',
                    avatar: 'ПД',
                    color: '#34c759',
                    verified: true,
                    reactions: {
                        '🚀': ['Вы']
                    },
                    edited: false,
                    pinned: false
                }
            ]
        },
        
        files: [
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
                color: '#ff3b30'
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
                color: '#af52de'
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
                color: '#0088cc'
            },
            {
                id: 4,
                name: 'project-spec.pdf',
                size: '8.9 MB',
                type: 'document',
                sender: 'Вы',
                time: 'Неделю назад',
                node: 'alpha',
                chat: 'reports-q3',
                icon: 'fas fa-file-pdf',
                color: '#ff3b30'
            }
        ],
        
        polls: [
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
        ],
        
        notifications: [
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
        ],
        
        calls: [
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
        ],
        
        bots: [
            {
                id: 1,
                name: 'MusicBot',
                username: '@music_bot',
                description: 'Поиск и прослушивание музыки',
                avatar: 'MB',
                color: '#ff3b30',
                node: 'music',
                commands: ['/play', '/search', '/lyrics']
            },
            {
                id: 2,
                name: 'NewsBot',
                username: '@news_bot',
                description: 'Последние новости и обновления',
                avatar: 'NB',
                color: '#0088cc',
                node: 'alpha',
                commands: ['/news', '/subscribe', '/unsubscribe']
            },
            {
                id: 3,
                name: 'GameBot',
                username: '@game_bot',
                description: 'Организация игровых турниров',
                avatar: 'GB',
                color: '#af52de',
                node: 'game',
                commands: ['/tournament', '/register', '/score']
            }
        ]
    };
    
    // ========== СОСТОЯНИЕ ПРИЛОЖЕНИЯ ==========
    let state = {
        theme: localStorage.getItem('theme') || config.defaultTheme,
        activeNode: 'alpha',
        activeChat: null,
        searchQuery: '',
        currentFilter: 'all',
        currentSort: 'time',
        currentView: 'chats', // chats, contacts, files, calls
        notifications: [],
        isSidebarVisible: window.innerWidth > 768,
        isTyping: false,
        isEmojiPanelOpen: false,
        isStickerPanelOpen: false,
        isConferenceActive: false,
        conferenceTimer: 0,
        conferenceTimerInterval: null,
        isLoggedIn: false,
        isAuthenticating: false,
        selectedContacts: new Set(),
        selectedMessages: new Set(),
        editMode: false,
        replyToMessage: null,
        recordingVoice: false,
        voiceRecordTime: 0,
        voiceRecordInterval: null,
        currentPage: 'main',
        modalOpen: null,
        loading: false,
        onlineUsers: new Set([1, 2, 3, 4]),
        typingUsers: new Set(),
        unreadCount: 15,
        selectedEmojiCategory: 'smileys',
        searchResults: {
            messages: [],
            files: [],
            contacts: []
        },
        voiceMessages: [],
        uploadQueue: [],
        currentUploads: [],
        downloadQueue: [],
        currentDownloads: [],
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

function setupOfflineSupport() {
    window.addEventListener('online', () => {
        showNotification('Соединение восстановлено', 'Вы снова онлайн', 'success');
    });
    
    window.addEventListener('offline', () => {
        showNotification('Нет соединения', 'Проверьте подключение к интернету', 'error');
    });
}
    
    // ========== DOM ЭЛЕМЕНТЫ ==========
    const elements = {
        // Прелоадер
        preloader: document.getElementById('preloader'),
        progressFill: document.getElementById('progress-fill'),
        statChats: document.getElementById('stat-chats'),
        statNodes: document.getElementById('stat-nodes'),
        statOnline: document.getElementById('stat-online'),
        
        // Форма входа
        loginForm: document.getElementById('login-form'),
        loginPhone: document.getElementById('login-phone'),
        loginPassword: document.getElementById('login-password'),
        loginButton: document.getElementById('login-button'),
        demoLogin: document.getElementById('demo-login'),
        loginError: document.getElementById('login-error'),
        loginLoading: document.getElementById('login-loading'),
        
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
        searchResults: document.getElementById('search-results'),
        
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
        notificationsContainer: document.getElementById('notifications-container'),
        
        // Модальные окна
        modals: {
            settings: document.getElementById('settings-modal'),
            newChat: document.getElementById('new-chat-modal'),
            profile: document.getElementById('profile-modal'),
            nodeSettings: document.getElementById('node-settings-modal'),
            search: document.getElementById('search-modal')
        },
        
        // Кнопки навигации
        navChats: document.getElementById('nav-chats'),
        navContacts: document.getElementById('nav-contacts'),
        navCalls: document.getElementById('nav-calls'),
        navFiles: document.getElementById('nav-files'),
        
        // Контейнеры для разных вью
        chatsView: document.getElementById('chats-view'),
        contactsView: document.getElementById('contacts-view'),
        callsView: document.getElementById('calls-view'),
        filesView: document.getElementById('files-view'),
        
        // Голосовые сообщения
        voiceRecordBtn: document.getElementById('voice-record-btn'),
        voiceRecordTimer: document.getElementById('voice-record-timer'),
        voiceRecordPanel: document.getElementById('voice-record-panel'),
        
        // Стикеры
        stickerToggleBtn: document.getElementById('sticker-toggle-btn'),
        stickerPanel: document.getElementById('sticker-panel'),
        stickerGrid: document.getElementById('sticker-grid'),
        
        // Файлы
        fileUploadBtn: document.getElementById('file-upload-btn'),
        fileInput: document.getElementById('file-input'),
        
        // Опросы
        pollCreateBtn: document.getElementById('poll-create-btn'),
        pollModal: document.getElementById('poll-modal'),
        
        // Реакции
        reactionsPanel: document.getElementById('reactions-panel'),
        
        // Загрузки
        uploadsPanel: document.getElementById('uploads-panel'),
        downloadsPanel: document.getElementById('downloads-panel'),
        
        // Настройки
        settingsBtn: document.getElementById('settings-btn'),
        settingsModal: document.getElementById('settings-modal'),
        settingsTabs: document.querySelectorAll('.settings-tab'),
        settingsContent: document.querySelectorAll('.settings-content')
    };
    
    // ========== СИСТЕМА ВХОДА ==========
    function initLoginSystem() {
        console.log('🔐 Инициализация системы входа...');
        
        // Проверка авторизации в localStorage
        const savedAuth = localStorage.getItem('telegram-nodes-auth');
        if (savedAuth) {
            try {
                const authData = JSON.parse(savedAuth);
                if (authData.isLoggedIn && authData.expires > Date.now()) {
                    // Автоматический вход
                    state.isLoggedIn = true;
                    startMainApplication();
                    return;
                }
            } catch (e) {
                console.error('Ошибка загрузки авторизации:', e);
            }
        }
        
        // Инициализация частиц
        initParticles();
        
        // Показываем форму входа с задержкой
        setTimeout(() => {
            if (elements.loginForm) {
                elements.loginForm.classList.add('active');
                elements.loginPhone.focus();
                
                // Анимация появления
                anime({
                    targets: elements.loginForm,
                    opacity: [0, 1],
                    scale: [0.9, 1],
                    translateY: [20, 0],
                    duration: 500,
                    easing: 'easeOutBack'
                });
            }
        }, 1000);
        
        // Настройка обработчиков событий для входа
        setupLoginListeners();
    }
    
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { 
                        value: 120, 
                        density: { 
                            enable: true, 
                            value_area: 1000 
                        } 
                    },
                    color: { 
                        value: ["#0088cc", "#af52de", "#34c759", "#ff9500", "#ff3b30", "#5856d6", "#5ac8fa"] 
                    },
                    shape: { 
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        }
                    },
                    opacity: { 
                        value: 0.6, 
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: { 
                        value: 4, 
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 180,
                        color: "#0088cc",
                        opacity: 0.3,
                        width: 1.5
                    },
                    move: {
                        enable: true,
                        speed: 3,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: true,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { 
                            enable: true, 
                            mode: "repulse" 
                        },
                        onclick: { 
                            enable: true, 
                            mode: "push" 
                        },
                        resize: true
                    },
                    modes: {
                        repulse: {
                            distance: 100,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        }
    }
    
    function setupLoginListeners() {
        if (elements.loginButton) {
            elements.loginButton.addEventListener('click', handleLogin);
        }
        
        if (elements.demoLogin) {
            elements.demoLogin.addEventListener('click', handleDemoLogin);
        }
        
        if (elements.loginPassword) {
            elements.loginPassword.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleLogin();
            });
        }
        
        // Маска для телефона
        if (elements.loginPhone) {
            elements.loginPhone.addEventListener('input', formatPhoneNumber);
        }
        
        // Забыли пароль
        const forgotPassword = document.getElementById('forgot-password');
        if (forgotPassword) {
            forgotPassword.addEventListener('click', (e) => {
                e.preventDefault();
                showForgotPasswordModal();
            });
        }
        
        // Регистрация
        const registerLink = document.getElementById('register-link');
        if (registerLink) {
            registerLink.addEventListener('click', (e) => {
                e.preventDefault();
                showRegisterModal();
            });
        }
        
        // Показать/скрыть пароль
        const togglePassword = document.getElementById('toggle-password');
        if (togglePassword) {
            togglePassword.addEventListener('click', togglePasswordVisibility);
        }
    }
    
    function formatPhoneNumber(e) {
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
    
    function togglePasswordVisibility() {
        const passwordInput = elements.loginPassword;
        const icon = document.getElementById('toggle-password');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            passwordInput.type = 'password';
            icon.innerHTML = '<i class="fas fa-eye"></i>';
        }
    }
    
    function showForgotPasswordModal() {
        showLoginError('Функция восстановления пароля временно недоступна. Используйте демо-вход');
    }
    
    function showRegisterModal() {
        showLoginError('Регистрация закрыта в бета-версии. Используйте демо-вход');
    }
    
    function handleLogin() {
        const phone = elements.loginPhone.value.replace(/\D/g, '');
        const password = elements.loginPassword.value.trim();
        
        if (!phone || phone.length !== 11) {
            showLoginError('Введите корректный номер телефона');
            shakeElement(elements.loginPhone);
            return;
        }
        
        if (!password) {
            showLoginError('Введите пароль');
            shakeElement(elements.loginPassword);
            return;
        }
        
        if (phone === '79001234567' && password === '111111') {
            authenticateUser();
        } else {
            showLoginError('Неверный номер телефона или пароль');
            shakeElement(elements.loginForm);
        }
    }
    
    function handleDemoLogin() {
        elements.loginPhone.value = '+7 (900) 123-45-67';
        elements.loginPassword.value = '111111';
        authenticateUser();
    }
    
    function showLoginError(message) {
        elements.loginError.textContent = message;
        elements.loginError.style.display = 'block';
        
        // Анимация появления
        anime({
            targets: elements.loginError,
            opacity: [0, 1],
            translateY: [-10, 0],
            duration: 300,
            easing: 'easeOutQuad'
        });
        
        setTimeout(() => {
            anime({
                targets: elements.loginError,
                opacity: 0,
                duration: 300,
                easing: 'easeInQuad',
                complete: () => {
                    elements.loginError.style.display = 'none';
                }
            });
        }, 5000);
    }
    
    function shakeElement(element) {
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
    
    function authenticateUser() {
        if (state.isAuthenticating) return;
        
        state.isAuthenticating = true;
        
        // Показать загрузку
        elements.loginButton.disabled = true;
        elements.loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Вход...';
        if (elements.loginLoading) {
            elements.loginLoading.classList.add('active');
            
            // Анимация загрузки
            anime({
                targets: elements.loginLoading,
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
        
        // Имитация задержки сети с прогрессом
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress > 100) progress = 100;
            
            if (elements.loginLoading) {
                const progressBar = elements.loginLoading.querySelector('.loading-progress');
                if (progressBar) {
                    progressBar.style.width = `${progress}%`;
                }
            }
        }, 100);
        
        // Имитация запроса к серверу
        setTimeout(() => {
            clearInterval(progressInterval);
            state.isAuthenticating = false;
            state.isLoggedIn = true;
            
            // Сохранить авторизацию
            const authData = {
                isLoggedIn: true,
                expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 дней
                user: appData.user
            };
            localStorage.setItem('telegram-nodes-auth', JSON.stringify(authData));
            
            // Скрыть загрузку
            elements.loginButton.disabled = false;
            elements.loginButton.innerHTML = '<i class="fab fa-telegram-plane"></i> Войти через Telegram';
            if (elements.loginLoading) {
                anime({
                    targets: elements.loginLoading,
                    opacity: 0,
                    duration: 300,
                    easing: 'easeInQuad',
                    complete: () => {
                        elements.loginLoading.classList.remove('active');
                    }
                });
            }
            
            // Анимация успешного входа
            anime({
                targets: elements.loginForm,
                opacity: 0,
                scale: 0.9,
                translateY: -50,
                duration: 500,
                easing: 'easeInQuad',
                complete: () => {
                    elements.loginForm.style.display = 'none';
                    
                    // Запускаем основное приложение
                    startMainApplication();
                }
            });
            
            // Анимация частиц
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
    
    // ========== ОСНОВНОЕ ПРИЛОЖЕНИЕ ==========
    function startMainApplication() {
        console.log('🎯 Запуск основного приложения...');
        
        // Установка темы
        setTheme(state.theme);
        
        // Запускаем прелоадер приложения
        simulatePreloader();
        
        // Инициализируем основное приложение
        setTimeout(() => {
            initApplication();
        }, 1000);
    }

// Добавить в script.js в функцию initApplication()
function showLoadingIndicator(show = true) {
    const loader = document.getElementById('global-loader');
    if (!loader && show) {
        const loaderEl = document.createElement('div');
        loaderEl.id = 'global-loader';
        loaderEl.className = 'global-loader';
        loaderEl.innerHTML = '<div class="loader-spinner"></div>';
        document.body.appendChild(loaderEl);
    }
    if (loader) {
        loader.style.display = show ? 'flex' : 'none';
    }
}
    
    // ========== ПРЕЛОАДЕР ==========
    function simulatePreloader() {
        if (!elements.preloader) return;
        
        // Сброс прогресса
        elements.progressFill.style.width = '0%';
        elements.statChats.textContent = '0';
        elements.statNodes.textContent = '0';
        elements.statOnline.textContent = '0';
        
        // Анимация появления
        elements.preloader.style.display = 'flex';
        anime({
            targets: elements.preloader,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 12 + 3;
            if (progress > 100) progress = 100;
            
            // Анимация прогресса
            anime({
                targets: elements.progressFill,
                width: `${progress}%`,
                duration: 200,
                easing: 'easeOutQuad'
            });
            
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
                    // Анимация скрытия прелоадера
                    anime({
                        targets: elements.preloader,
                        opacity: 0,
                        duration: 300,
                        easing: 'easeInQuad',
                        complete: () => {
                            elements.preloader.style.display = 'none';
                            
                            // Показать основное приложение
                            anime({
                                targets: elements.appContainer,
                                opacity: [0, 1],
                                duration: 500,
                                easing: 'easeOutQuad'
                            });
                            
                            console.log('✅ Приложение загружено');
                        }
                    });
                }, 500);
            }
        }, 100);
    }
    
    function animateCounter(element, targetValue) {
        if (!element) return;
        
        const startValue = parseInt(element.textContent) || 0;
        const duration = 1000;
        const startTime = Date.now();
        
        function updateCounter() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Эффект easeOutQuad
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easeProgress);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = targetValue;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // ========== ИНИЦИАЛИЗАЦИЯ ==========
    function initApplication() {
        console.log('🎯 Инициализация приложения...');
        
        // Рендер данных
        renderProfile();
        renderNodes();
        renderContacts();
        renderActivity();
        updateCurrentNode();
        renderChats();
        renderEmojis();
        renderStickers();
        renderFiles();
        renderCalls();
        renderNotifications();
        
        // Настройка обработчиков событий
        setupEventListeners();
        
        // Проверить обновления
        checkForUpdates();
        
        // Показать приветственное уведомление
        setTimeout(() => {
            showNotification('Добро пожаловать, Газман!', 'Telegram Nodes v2.1 готов к работе', 'success');
            
            // Показать советы
            setTimeout(() => {
                showNotification('Совет', 'Используйте Ctrl+K для быстрого поиска', 'info');
            }, 2000);
        }, 1500);
        
        // Симулировать активность
        simulateActivity();
        
        // Запустить онлайн-таймер
        startOnlineTimer();
        
        // Проверить непрочитанные сообщения
        updateUnreadCount();
        
        // Загрузить настройки
        loadSettings();
    }
    
    // ========== РЕНДЕР ФУНКЦИИ ==========
    function renderProfile() {
        const user = appData.user;
        const profileCard = elements.profileCard;
        
        if (profileCard) {
            const avatar = profileCard.querySelector('.avatar');
            const name = profileCard.querySelector('.profile-name');
            const status = profileCard.querySelector('.profile-status');
            const stats = profileCard.querySelector('.profile-stats');
            
            if (avatar) {
                avatar.textContent = user.avatar;
                avatar.style.background = getColorForName(user.name);
                
                // Добавить онлайн статус
                if (user.online) {
                    const onlineDot = document.createElement('div');
                    onlineDot.className = 'online-dot';
                    avatar.appendChild(onlineDot);
                }
            }
            
            if (name) {
                name.textContent = user.name;
                name.innerHTML += ' <i class="fas fa-check-circle verified-badge"></i>';
            }
            
            if (status) {
                status.textContent = `${user.username} • ${user.status}`;
            }
            
            if (stats) {
                stats.innerHTML = `
                    <div class="stat-item">
                        <div class="stat-value">${user.stats.chats}</div>
                        <div class="stat-label">Чаты</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${user.stats.nodes}</div>
                        <div class="stat-label">Узлы</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${user.stats.online}</div>
                        <div class="stat-label">Онлайн</div>
                    </div>
                `;
            }
        }
        
        // Обновить профиль в модальном окне
        updateProfileModal();
    }
    
    function updateProfileModal() {
        const user = appData.user;
        const modal = elements.modals.profile;
        
        if (!modal) return;
        
        // Аватар
        const avatar = modal.querySelector('.profile-modal-avatar');
        if (avatar) {
            avatar.textContent = user.avatar;
            avatar.style.background = getColorForName(user.name);
        }
        
        // Основная информация
        modal.querySelector('.profile-modal-name').textContent = user.name;
        modal.querySelector('.profile-modal-username').textContent = user.username;
        modal.querySelector('.profile-modal-status').textContent = user.status;
        modal.querySelector('.profile-modal-bio').textContent = user.bio;
        
        // Контактная информация
        modal.querySelector('.profile-phone').textContent = user.phone;
        modal.querySelector('.profile-email').textContent = user.email;
        modal.querySelector('.profile-location').textContent = user.location;
        
        // Статистика
        const statsContainer = modal.querySelector('.profile-stats-grid');
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="stat-card">
                    <i class="fas fa-comments"></i>
                    <div class="stat-info">
                        <div class="stat-value">${user.stats.chats}</div>
                        <div class="stat-label">Чатов</div>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-sitemap"></i>
                    <div class="stat-info">
                        <div class="stat-value">${user.stats.nodes}</div>
                        <div class="stat-label">Узлов</div>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-envelope"></i>
                    <div class="stat-info">
                        <div class="stat-value">${user.stats.messages}</div>
                        <div class="stat-label">Сообщений</div>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-phone"></i>
                    <div class="stat-info">
                        <div class="stat-value">${user.stats.calls}</div>
                        <div class="stat-label">Звонков</div>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-users"></i>
                    <div class="stat-info">
                        <div class="stat-value">${user.stats.conferences}</div>
                        <div class="stat-label">Конференций</div>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-database"></i>
                    <div class="stat-info">
                        <div class="stat-value">${user.stats.storage} GB</div>
                        <div class="stat-label">Памяти</div>
                    </div>
                </div>
            `;
        }
        
        // Достижения
        const achievementsContainer = modal.querySelector('.achievements-grid');
        if (achievementsContainer) {
            achievementsContainer.innerHTML = '';
            user.achievements.forEach(achievement => {
                const achievementEl = document.createElement('div');
                achievementEl.className = `achievement ${achievement.unlocked ? 'unlocked' : 'locked'}`;
                achievementEl.innerHTML = `
                    <i class="fas ${achievement.icon}"></i>
                    <span>${achievement.name}</span>
                `;
                achievementsContainer.appendChild(achievementEl);
            });
        }
    }
    
    function renderNodes() {
        const container = elements.nodesList;
        if (!container) return;
        
        container.innerHTML = '';
        
        appData.nodes.forEach(node => {
            const nodeElement = document.createElement('div');
            nodeElement.className = `node-item ${state.activeNode === node.id ? 'active' : ''} ${node.pinned ? 'pinned' : ''}`;
            nodeElement.dataset.node = node.id;
            
            // Создание индикатора онлайн
            const onlineIndicator = node.online > 0 ? `
                <div class="node-online-indicator">
                    <span>${node.online}</span>
                </div>
            ` : '';
            
            // Создание бейджа админа
            const adminBadge = node.admin ? '<i class="fas fa-crown admin-badge"></i>' : '';
            
            nodeElement.innerHTML = `
                <div class="node-icon" style="background: ${node.color}">
                    <i class="${node.icon}"></i>
                    ${onlineIndicator}
                </div>
                <div class="node-info">
                    <div class="node-name">
                        ${node.name}
                        ${adminBadge}
                        ${node.pinned ? '<i class="fas fa-thumbtack pin-badge"></i>' : ''}
                    </div>
                    <div class="node-description">${node.members} участников • ${node.online} онлайн</div>
                    <div class="node-tags">
                        ${node.tags.map(tag => `<span class="node-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="node-actions">
                    ${node.unread > 0 ? `<span class="unread-badge">${node.unread}</span>` : ''}
                    <div class="node-notification-status ${node.notifications}">
                        <i class="fas fa-bell${node.notifications === 'none' ? '-slash' : ''}"></i>
                    </div>
                </div>
            `;
            
            nodeElement.addEventListener('click', (e) => {
                if (!e.target.closest('.node-actions')) {
                    switchNode(node.id);
                }
            });
            
            // Добавить обработчики для действий
            const actions = nodeElement.querySelector('.node-actions');
            if (actions) {
                actions.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showNodeActionsMenu(node, e);
                });
            }
            
            // Добавить контекстное меню
            nodeElement.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                showNodeContextMenu(node, e);
            });
            
            container.appendChild(nodeElement);
        });
        
        // Добавить кнопку создания нового узла
        const createNodeBtn = document.createElement('div');
        createNodeBtn.className = 'node-item create-node';
        createNodeBtn.innerHTML = `
            <div class="node-icon" style="background: var(--surface-color)">
                <i class="fas fa-plus"></i>
            </div>
            <div class="node-info">
                <div class="node-name">Создать узел</div>
                <div class="node-description">Новое сообщество</div>
            </div>
        `;
        createNodeBtn.addEventListener('click', () => {
            showCreateNodeModal();
        });
        container.appendChild(createNodeBtn);
    }
    
    function showNodeActionsMenu(node, event) {
        // Создать меню действий
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.position = 'fixed';
        menu.style.left = `${event.clientX}px`;
        menu.style.top = `${event.clientY}px`;
        menu.style.zIndex = '1000';
        
        menu.innerHTML = `
            <div class="menu-item" data-action="pin">
                <i class="fas fa-thumbtack"></i>
                ${node.pinned ? 'Открепить' : 'Закрепить'}
            </div>
            <div class="menu-item" data-action="notifications">
                <i class="fas fa-bell"></i>
                Уведомления
            </div>
            <div class="menu-item" data-action="settings">
                <i class="fas fa-cog"></i>
                Настройки узла
            </div>
            <div class="menu-item" data-action="members">
                <i class="fas fa-users"></i>
                Участники
            </div>
            <div class="menu-divider"></div>
            <div class="menu-item text-danger" data-action="leave">
                <i class="fas fa-sign-out-alt"></i>
                Покинуть узел
            </div>
        `;
        
        document.body.appendChild(menu);
        
        // Обработчики для пунктов меню
        menu.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                handleNodeAction(node, action);
                document.body.removeChild(menu);
            });
        });

// В script.js в функции handleNodeAction и подобных
function provideHapticFeedback() {
    if (navigator.vibrate) {
        navigator.vibrate(50); // Короткая вибрация
    }
}
        
        // Закрыть меню при клике вне
        setTimeout(() => {
            const closeMenu = (e) => {
                if (!menu.contains(e.target)) {
                    document.body.removeChild(menu);
                    document.removeEventListener('click', closeMenu);
                }
            };
            document.addEventListener('click', closeMenu);
        });
        
        // Анимация появления
        anime({
            targets: menu,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 200,
            easing: 'easeOutQuad'
        });
    }
    
    function showNodeContextMenu(node, event) {
        event.preventDefault();
        showNodeActionsMenu(node, event);
    }
    
    function handleNodeAction(node, action) {
        switch (action) {
            case 'pin':
                node.pinned = !node.pinned;
                renderNodes();
                showNotification(
                    node.pinned ? 'Узел закреплен' : 'Узел откреплен',
                    node.name,
                    'success'
                );
                break;
            case 'notifications':
                toggleNodeNotifications(node);
                break;
            case 'settings':
                openNodeSettings(node);
                break;
            case 'members':
                showNodeMembers(node);
                break;
            case 'leave':
                confirmLeaveNode(node);
                break;
        }
    }
    
    function toggleNodeNotifications(node) {
        const notifications = ['all', 'mentions', 'none'];
        const currentIndex = notifications.indexOf(node.notifications);
        const nextIndex = (currentIndex + 1) % notifications.length;
        node.notifications = notifications[nextIndex];
        
        renderNodes();
        
        const messages = {
            all: 'Все уведомления включены',
            mentions: 'Только упоминания',
            none: 'Уведомления отключены'
        };
        
        showNotification('Уведомления', `${node.name}: ${messages[node.notifications]}`, 'info');
    }
    
    function openNodeSettings(node) {
        showNotification('Настройки узла', `Открыты настройки для ${node.name}`, 'info');
        // В реальном приложении здесь будет открытие модального окна
    }
    
    function showNodeMembers(node) {
        const members = [
            { name: 'Газман', role: 'Создатель', online: true },
            { name: 'Алексей', role: 'Админ', online: true },
            { name: 'Мария', role: 'Участник', online: false },
            { name: 'Дмитрий', role: 'Участник', online: true },
            // ... больше участников
        ];
        
        const modal = document.createElement('div');
        modal.className = 'modal members-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Участники узла "${node.name}"</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="members-list">
                        ${members.map(member => `
                            <div class="member-item">
                                <div class="member-avatar">
                                    ${member.name.charAt(0)}
                                    ${member.online ? '<div class="online-dot"></div>' : ''}
                                </div>
                                <div class="member-info">
                                    <div class="member-name">${member.name}</div>
                                    <div class="member-role">${member.role}</div>
                                </div>
                                <div class="member-actions">
                                    <button class="btn-icon" title="Написать">
                                        <i class="fas fa-comment"></i>
                                    </button>
                                    <button class="btn-icon" title="Позвонить">
                                        <i class="fas fa-phone"></i>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary">Пригласить участников</button>
                    <button class="btn btn-primary">Закрыть</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Обработчики
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('.btn-primary').addEventListener('click', () => {
            modal.remove();
        });
        
        // Анимация
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    function confirmLeaveNode(node) {
        const modal = document.createElement('div');
        modal.className = 'modal confirm-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Покинуть узел</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="warning-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Вы уверены, что хотите покинуть узел "${node.name}"?</p>
                        <p class="text-muted">Вы больше не будете получать уведомления от этого узла.</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancel-leave">Отмена</button>
                    <button class="btn btn-danger" id="confirm-leave">Покинуть узел</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Обработчики
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('#cancel-leave').addEventListener('click', () => modal.remove());
        modal.querySelector('#confirm-leave').addEventListener('click', () => {
            // Удалить узел
            const index = appData.nodes.findIndex(n => n.id === node.id);
            if (index !== -1) {
                appData.nodes.splice(index, 1);
                renderNodes();
                
                // Если активный узел удален, переключиться на первый
                if (state.activeNode === node.id && appData.nodes.length > 0) {
                    switchNode(appData.nodes[0].id);
                }
                
                showNotification('Узел покинут', `Вы покинули узел "${node.name}"`, 'info');
            }
            modal.remove();
        });
        
        // Анимация
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    function showCreateNodeModal() {
        const modal = document.createElement('div');
        modal.className = 'modal create-node-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Создать новый узел</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="create-node-form">
                        <div class="form-group">
                            <label for="node-name">Название узла</label>
                            <input type="text" id="node-name" class="form-control" placeholder="Например: Рабочая команда" required>
                        </div>
                        <div class="form-group">
                            <label for="node-description">Описание</label>
                            <textarea id="node-description" class="form-control" placeholder="Опишите цель вашего узла" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Иконка узла</label>
                            <div class="icon-selector">
                                <div class="icon-option selected" data-icon="fa-rocket">
                                    <i class="fas fa-rocket"></i>
                                </div>
                                <div class="icon-option" data-icon="fa-users">
                                    <i class="fas fa-users"></i>
                                </div>
                                <div class="icon-option" data-icon="fa-gamepad">
                                    <i class="fas fa-gamepad"></i>
                                </div>
                                <div class="icon-option" data-icon="fa-palette">
                                    <i class="fas fa-palette"></i>
                                </div>
                                <div class="icon-option" data-icon="fa-music">
                                    <i class="fas fa-music"></i>
                                </div>
                                <div class="icon-option" data-icon="fa-plane">
                                    <i class="fas fa-plane"></i>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Цвет узла</label>
                            <div class="color-selector">
                                <div class="color-option selected" style="background: #0088cc" data-color="#0088cc"></div>
                                <div class="color-option" style="background: #af52de" data-color="#af52de"></div>
                                <div class="color-option" style="background: #34c759" data-color="#34c759"></div>
                                <div class="color-option" style="background: #ff9500" data-color="#ff9500"></div>
                                <div class="color-option" style="background: #ff3b30" data-color="#ff3b30"></div>
                                <div class="color-option" style="background: #5856d6" data-color="#5856d6"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Приватность</label>
                            <div class="privacy-selector">
                                <label class="radio-label">
                                    <input type="radio" name="privacy" value="public" checked>
                                    <span>Публичный (может найти любой)</span>
                                </label>
                                <label class="radio-label">
                                    <input type="radio" name="privacy" value="private">
                                    <span>Приватный (только по приглашению)</span>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancel-create">Отмена</button>
                    <button class="btn btn-primary" id="submit-create">Создать узел</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Инициализация выбора иконки
        modal.querySelectorAll('.icon-option').forEach(option => {
            option.addEventListener('click', () => {
                modal.querySelectorAll('.icon-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            });
        });
        
        // Инициализация выбора цвета
        modal.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', () => {
                modal.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            });
        });
        
        // Обработчики
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('#cancel-create').addEventListener('click', () => modal.remove());
        modal.querySelector('#submit-create').addEventListener('click', () => {
            const name = modal.querySelector('#node-name').value;
            const description = modal.querySelector('#node-description').value;
            const icon = modal.querySelector('.icon-option.selected').dataset.icon;
            const color = modal.querySelector('.color-option.selected').dataset.color;
            const privacy = modal.querySelector('input[name="privacy"]:checked').value;
            
            if (!name.trim()) {
                showNotification('Ошибка', 'Введите название узла', 'error');
                return;
            }
            
            // Создать новый узел
            const newNode = {
                id: 'node-' + Date.now(),
                name: name,
                icon: 'fas ' + icon,
                color: color,
                description: description || 'Новый узел',
                members: 1,
                online: 1,
                unread: 0,
                created: new Date().toISOString().split('T')[0],
                admin: true,
                pinned: false,
                notifications: 'all',
                role: 'Создатель',
                tags: ['новый'],
                stats: {
                    messages: 0,
                    files: 0,
                    calls: 0,
                    conferences: 0
                }
            };
            
            appData.nodes.push(newNode);
            renderNodes();
            switchNode(newNode.id);
            
            showNotification('Узел создан', `Узел "${name}" успешно создан`, 'success');
            modal.remove();
        });
        
        // Анимация
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    function renderContacts() {
        const container = elements.contactsList;
        if (!container) return;
        
        container.innerHTML = '';
        
        // Группировка по первой букве
        const groupedContacts = {};
        appData.contacts.forEach(contact => {
            const firstLetter = contact.name.charAt(0).toUpperCase();
            if (!groupedContacts[firstLetter]) {
                groupedContacts[firstLetter] = [];
            }
            groupedContacts[firstLetter].push(contact);
        });
        
        // Сортировка букв
        const sortedLetters = Object.keys(groupedContacts).sort();
        
        sortedLetters.forEach(letter => {
            // Заголовок буквы
            const letterHeader = document.createElement('div');
            letterHeader.className = 'contacts-letter';
            letterHeader.textContent = letter;
            container.appendChild(letterHeader);
            
            // Контакты на эту букву
            groupedContacts[letter].forEach(contact => {
                const contactElement = document.createElement('div');
                contactElement.className = 'contact-item';
                contactElement.dataset.contact = contact.id;
                
                // Определить статус
                let statusIcon = '';
                let statusClass = '';
                switch (contact.status) {
                    case 'online':
                        statusIcon = '<i class="fas fa-circle"></i>';
                        statusClass = 'online';
                        break;
                    case 'typing':
                        statusIcon = '<i class="fas fa-keyboard"></i>';
                        statusClass = 'typing';
                        break;
                    case 'offline':
                        statusIcon = '<i class="far fa-clock"></i>';
                        statusClass = 'offline';
                        break;
                }
                
                contactElement.innerHTML = `
                    <div class="contact-avatar" style="background: ${contact.color}">
                        ${contact.avatar}
                        <div class="contact-status ${statusClass}"></div>
                    </div>
                    <div class="contact-info">
                        <div class="contact-name">
                            ${contact.name}
                            ${contact.verified ? '<i class="fas fa-check-circle verified-badge"></i>' : ''}
                            ${contact.isContact ? '<i class="fas fa-user-friends contact-badge"></i>' : ''}
                        </div>
                        <div class="contact-details">
                            <span class="contact-last-seen">${contact.lastSeen}</span>
                            <span class="contact-activity">• ${contact.activity}</span>
                        </div>
                        <div class="contact-tags">
                            ${contact.tags.map(tag => `<span class="contact-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="contact-actions">
                        <button class="btn-icon chat-with-contact" title="Написать">
                            <i class="fas fa-comment"></i>
                        </button>
                        <button class="btn-icon call-contact" title="Позвонить">
                            <i class="fas fa-phone"></i>
                        </button>
                    </div>
                `;
                
                // Обработчики
                contactElement.addEventListener('click', (e) => {
                    if (!e.target.closest('.contact-actions')) {
                        openContactProfile(contact);
                    }
                });
                
                contactElement.querySelector('.chat-with-contact').addEventListener('click', (e) => {
                    e.stopPropagation();
                    startChatWithContact(contact);
                });
                
                contactElement.querySelector('.call-contact').addEventListener('click', (e) => {
                    e.stopPropagation();
                    startCallWithContact(contact);
                });
                
                // Контекстное меню
                contactElement.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    showContactContextMenu(contact, e);
                });
                
                container.appendChild(contactElement);
            });
        });
        
        // Добавить кнопку добавления контакта
        const addContactBtn = document.createElement('div');
        addContactBtn.className = 'contact-item add-contact';
        addContactBtn.innerHTML = `
            <div class="contact-avatar">
                <i class="fas fa-plus"></i>
            </div>
            <div class="contact-info">
                <div class="contact-name">Добавить контакт</div>
                <div class="contact-details">Найти пользователя по имени или номеру</div>
            </div>
        `;
        addContactBtn.addEventListener('click', () => {
            showAddContactModal();
        });
        container.appendChild(addContactBtn);
    }
    
    function openContactProfile(contact) {
        const modal = document.createElement('div');
        modal.className = 'modal contact-profile-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Профиль контакта</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="contact-profile-header">
                        <div class="contact-avatar-large" style="background: ${contact.color}">
                            ${contact.avatar}
                            <div class="contact-status-large ${contact.status}"></div>
                        </div>
                        <div class="contact-info-large">
                            <h2>${contact.name}</h2>
                            <p class="contact-username">${contact.username}</p>
                            <p class="contact-status-text">${contact.activity}</p>
                            <div class="contact-actions-large">
                                <button class="btn btn-primary" id="start-chat">
                                    <i class="fas fa-comment"></i> Написать
                                </button>
                                <button class="btn btn-secondary" id="start-call">
                                    <i class="fas fa-phone"></i> Позвонить
                                </button>
                                <button class="btn btn-icon" id="more-actions">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="contact-details-section">
                        <h4>Контактная информация</h4>
                        <div class="detail-item">
                            <i class="fas fa-phone"></i>
                            <span>${contact.phone}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-envelope"></i>
                            <span>${contact.email}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>Был(а) в сети: ${contact.lastSeen}</span>
                        </div>
                    </div>
                    
                    <div class="shared-nodes-section">
                        <h4>Общие узлы</h4>
                        <div class="shared-nodes">
                            ${contact.mutualNodes.map(nodeId => {
                                const node = appData.nodes.find(n => n.id === nodeId);
                                return node ? `
                                    <div class="shared-node">
                                        <div class="node-icon-small" style="background: ${node.color}">
                                            <i class="${node.icon}"></i>
                                        </div>
                                        <span>${node.name}</span>
                                    </div>
                                ` : '';
                            }).join('')}
                        </div>
                    </div>
                    
                    ${contact.notes ? `
                    <div class="notes-section">
                        <h4>Заметки</h4>
                        <p>${contact.notes}</p>
                    </div>
                    ` : ''}
                    
                    <div class="contact-tags-section">
                        <h4>Теги</h4>
                        <div class="tags-list">
                            ${contact.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="edit-contact">Редактировать</button>
                    <button class="btn btn-danger" id="block-contact">Заблокировать</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Обработчики
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('#start-chat').addEventListener('click', () => {
            startChatWithContact(contact);
            modal.remove();
        });
        modal.querySelector('#start-call').addEventListener('click', () => {
            startCallWithContact(contact);
            modal.remove();
        });
        modal.querySelector('#edit-contact').addEventListener('click', () => {
            editContact(contact);
            modal.remove();
        });
        modal.querySelector('#block-contact').addEventListener('click', () => {
            blockContact(contact);
            modal.remove();
        });
        
        // Анимация
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    function startChatWithContact(contact) {
        // Поиск существующего чата
        const existingChat = appData.chats.find(chat => 
            chat.type === 'personal' && chat.name === contact.name
        );
        
        if (existingChat) {
            openChat(existingChat.id);
        } else {
            // Создать новый чат
            const newChat = {
                id: 'chat-' + Date.now(),
                node: 'personal',
                name: contact.name,
                type: 'personal',
                avatar: contact.avatar,
                color: contact.color,
                lastMessage: 'Начните общение',
                time: 'только что',
                unread: 0,
                members: 2,
                online: contact.status === 'online' ? 1 : 0,
                pinned: false,
                verified: contact.verified,
                muted: false,
                archived: false,
                lastActivity: new Date().toISOString(),
                tags: ['личное'],
                permissions: {
                    sendMessages: true,
                    sendMedia: true,
                    sendPolls: true,
                    addMembers: true,
                    pinMessages: true,
                    changeInfo: true
                }
            };
            
            appData.chats.push(newChat);
            renderChats();
            openChat(newChat.id);
            
            showNotification('Новый чат', `Чат с ${contact.name} создан`, 'success');
        }
    }
    
    function startCallWithContact(contact) {
        showNotification('Звонок', `Вызов ${contact.name}...`, 'info');
        
        // Имитация звонка
        setTimeout(() => {
            const answer = Math.random() > 0.3; // 70% шанс ответа
            
            if (answer) {
                showNotification('Звонок', `${contact.name} отвечает`, 'success');
                
                // Запись звонка
                const call = {
                    id: Date.now(),
                    type: 'outgoing',
                    contact: contact.name,
                    duration: '0:00',
                    time: 'Сейчас',
                    status: 'in_progress',
                    node: 'personal',
                    video: false
                };
                
                // Здесь можно открыть интерфейс звонка
            } else {
                showNotification('Звонок', `${contact.name} не отвечает`, 'error');
            }
        }, 2000);
    }
    
    function showContactContextMenu(contact, event) {
        event.preventDefault();
        
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.position = 'fixed';
        menu.style.left = `${event.clientX}px`;
        menu.style.top = `${event.clientY}px`;
        menu.style.zIndex = '1000';
        
        menu.innerHTML = `
            <div class="menu-item" data-action="chat">
                <i class="fas fa-comment"></i>
                Написать сообщение
            </div>
            <div class="menu-item" data-action="call">
                <i class="fas fa-phone"></i>
                Позвонить
            </div>
            <div class="menu-item" data-action="video">
                <i class="fas fa-video"></i>
                Видеозвонок
            </div>
            <div class="menu-divider"></div>
            <div class="menu-item" data-action="profile">
                <i class="fas fa-user"></i>
                Открыть профиль
            </div>
            <div class="menu-item" data-action="edit">
                <i class="fas fa-edit"></i>
                Редактировать
            </div>
            <div class="menu-divider"></div>
            <div class="menu-item" data-action="block">
                <i class="fas fa-ban"></i>
                ${contact.isBlocked ? 'Разблокировать' : 'Заблокировать'}
            </div>
            <div class="menu-item text-danger" data-action="delete">
                <i class="fas fa-trash"></i>
                Удалить контакт
            </div>
        `;
        
        document.body.appendChild(menu);
        
        // Обработчики
        menu.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                handleContactAction(contact, action);
                document.body.removeChild(menu);
            });
        });
        
        // Закрыть меню при клике вне
        setTimeout(() => {
            const closeMenu = (e) => {
                if (!menu.contains(e.target)) {
                    document.body.removeChild(menu);
                    document.removeEventListener('click', closeMenu);
                }
            };
            document.addEventListener('click', closeMenu);
        });
        
        // Анимация
        anime({
            targets: menu,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 200,
            easing: 'easeOutQuad'
        });
    }
    
    function handleContactAction(contact, action) {
        switch (action) {
            case 'chat':
                startChatWithContact(contact);
                break;
            case 'call':
                startCallWithContact(contact);
                break;
            case 'video':
                startVideoCallWithContact(contact);
                break;
            case 'profile':
                openContactProfile(contact);
                break;
            case 'edit':
                editContact(contact);
                break;
            case 'block':
                toggleBlockContact(contact);
                break;
            case 'delete':
                confirmDeleteContact(contact);
                break;
        }
    }
    
    function startVideoCallWithContact(contact) {
        showNotification('Видеозвонок', `Видеовызов ${contact.name}...`, 'info');
    }
    
    function editContact(contact) {
        const modal = document.createElement('div');
        modal.className = 'modal edit-contact-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Редактировать контакт</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="edit-contact-form">
                        <div class="form-group">
                            <label for="contact-name">Имя</label>
                            <input type="text" id="contact-name" class="form-control" value="${contact.name}" required>
                        </div>
                        <div class="form-group">
                            <label for="contact-phone">Телефон</label>
                            <input type="tel" id="contact-phone" class="form-control" value="${contact.phone}">
                        </div>
                        <div class="form-group">
                            <label for="contact-email">Email</label>
                            <input type="email" id="contact-email" class="form-control" value="${contact.email}">
                        </div>
                        <div class="form-group">
                            <label for="contact-notes">Заметки</label>
                            <textarea id="contact-notes" class="form-control" rows="3">${contact.notes || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Теги</label>
                            <div class="tags-input">
                                <div class="tags-list" id="contact-tags-list">
                                    ${contact.tags.map(tag => `
                                        <span class="tag">
                                            ${tag}
                                            <button type="button" class="tag-remove">&times;</button>
                                        </span>
                                    `).join('')}
                                </div>
                                <input type="text" class="form-control" id="new-tag" placeholder="Добавить тег">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancel-edit">Отмена</button>
                    <button class="btn btn-primary" id="save-contact">Сохранить</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Управление тегами
        const tagsList = modal.querySelector('#contact-tags-list');
        const newTagInput = modal.querySelector('#new-tag');
        
        newTagInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && newTagInput.value.trim()) {
                e.preventDefault();
                addTag(newTagInput.value.trim());
                newTagInput.value = '';
            }
        });
        
        function addTag(tag) {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.innerHTML = `
                ${tag}
                <button type="button" class="tag-remove">&times;</button>
            `;
            
            tagElement.querySelector('.tag-remove').addEventListener('click', () => {
                tagElement.remove();
            });
            
            tagsList.appendChild(tagElement);
        }
        
        // Удаление существующих тегов
        tagsList.querySelectorAll('.tag-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.tag').remove();
            });
        });
        
        // Обработчики
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('#cancel-edit').addEventListener('click', () => modal.remove());
        modal.querySelector('#save-contact').addEventListener('click', () => {
            // Обновить контакт
            contact.name = modal.querySelector('#contact-name').value;
            contact.phone = modal.querySelector('#contact-phone').value;
            contact.email = modal.querySelector('#contact-email').value;
            contact.notes = modal.querySelector('#contact-notes').value;
            
            // Обновить теги
            contact.tags = Array.from(tagsList.querySelectorAll('.tag'))
                .map(tag => tag.textContent.replace('×', '').trim());
            
            renderContacts();
            showNotification('Контакт обновлен', `${contact.name} успешно обновлен`, 'success');
            modal.remove();
        });
        
        // Анимация
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    function toggleBlockContact(contact) {
        contact.isBlocked = !contact.isBlocked;
        renderContacts();
        
        showNotification(
            contact.isBlocked ? 'Контакт заблокирован' : 'Контакт разблокирован',
            contact.name,
            contact.isBlocked ? 'warning' : 'success'
        );
    }
    
    function confirmDeleteContact(contact) {
        const modal = document.createElement('div');
        modal.className = 'modal confirm-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Удалить контакт</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="warning-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Вы уверены, что хотите удалить контакт "${contact.name}"?</p>
                        <p class="text-muted">Это действие нельзя отменить. Все чаты с этим контактом будут удалены.</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancel-delete">Отмена</button>
                    <button class="btn btn-danger" id="confirm-delete">Удалить контакт</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Обработчики
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('#cancel-delete').addEventListener('click', () => modal.remove());
        modal.querySelector('#confirm-delete').addEventListener('click', () => {
            // Удалить контакт
            const index = appData.contacts.findIndex(c => c.id === contact.id);
            if (index !== -1) {
                appData.contacts.splice(index, 1);
                renderContacts();
                
                // Удалить связанные чаты
                appData.chats = appData.chats.filter(chat => 
                    !(chat.type === 'personal' && chat.name === contact.name)
                );
                
                if (state.activeChat) {
                    const activeChat = appData.chats.find(c => c.id === state.activeChat);
                    if (!activeChat) {
                        closeChat();
                    }
                }
                
                renderChats();
                
                showNotification('Контакт удален', `${contact.name} удален из вашего списка`, 'info');
            }
            modal.remove();
        });
        
        // Анимация
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    function showAddContactModal() {
        const modal = document.createElement('div');
        modal.className = 'modal add-contact-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Добавить контакт</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="add-contact-form">
                        <div class="form-group">
                            <label for="search-contact">Поиск пользователя</label>
                            <input type="text" id="search-contact" class="form-control" placeholder="Имя, username или номер телефона">
                            <div class="search-results" id="contact-search-results"></div>
                        </div>
                        <div class="divider">
                            <span>ИЛИ</span>
                        </div>
                        <div class="form-group">
                            <label for="new-contact-name">Имя</label>
                            <input type="text" id="new-contact-name" class="form-control" placeholder="Введите имя">
                        </div>
                        <div class="form-group">
                            <label for="new-contact-phone">Телефон</label>
                            <input type="tel" id="new-contact-phone" class="form-control" placeholder="+7 (900) 123-45-67">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancel-add">Отмена</button>
                    <button class="btn btn-primary" id="save-new-contact">Добавить</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Поиск пользователей
        const searchInput = modal.querySelector('#search-contact');
        const resultsContainer = modal.querySelector('#contact-search-results');
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            resultsContainer.innerHTML = '';
            
            if (query.length < 2) return;
            
            // Имитация поиска
            const mockResults = [
                { name: 'Александр', username: '@alexander', phone: '+7 (900) 111-22-33' },
                { name: 'Анна', username: '@anna', phone: '+7 (900) 222-33-44' },
                { name: 'Борис', username: '@boris', phone: '+7 (900) 333-44-55' }
            ].filter(user => 
                user.name.toLowerCase().includes(query) ||
                user.username.toLowerCase().includes(query) ||
                user.phone.includes(query)
            );
            
            mockResults.forEach(user => {
                const result = document.createElement('div');
                result.className = 'search-result-item';
                result.innerHTML = `
                    <div class="result-avatar">${user.name.charAt(0)}</div>
                    <div class="result-info">
                        <div class="result-name">${user.name}</div>
                        <div class="result-details">${user.username} • ${user.phone}</div>
                    </div>
                    <button class="btn btn-sm btn-primary add-from-search">Добавить</button>
                `;
                
                result.querySelector('.add-from-search').addEventListener('click', () => {
                    // Добавить контакт из результатов поиска
                    addNewContact({
                        name: user.name,
                        phone: user.phone,
                        username: user.username
                    });
                    modal.remove();
                });
                
                resultsContainer.appendChild(result);
            });
        });
        
        // Обработчики
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('#cancel-add').addEventListener('click', () => modal.remove());
        modal.querySelector('#save-new-contact').addEventListener('click', () => {
            const name = modal.querySelector('#new-contact-name').value.trim();
            const phone = modal.querySelector('#new-contact-phone').value.trim();
            
            if (!name) {
                showNotification('Ошибка', 'Введите имя контакта', 'error');
                return;
            }
            
            addNewContact({ name, phone });
            modal.remove();
        });
        
        // Анимация
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    function addNewContact(contactData) {
        const newContact = {
            id: Date.now(),
            name: contactData.name,
            avatar: contactData.name.charAt(0),
            status: 'offline',
            lastSeen: 'давно',
            activity: 'Не в сети',
            color: getColorForName(contactData.name),
            username: contactData.username || '@' + contactData.name.toLowerCase(),
            phone: contactData.phone || '+7 (900) XXX-XX-XX',
            email: contactData.email || contactData.name.toLowerCase() + '@example.com',
            isContact: true,
            isBlocked: false,
            mutualNodes: [],
            notes: '',
            tags: ['новый']
        };
        
        appData.contacts.push(newContact);
        renderContacts();
        
        showNotification('Контакт добавлен', `${contactData.name} добавлен в ваш список`, 'success');
    }
    
    function renderActivity() {
        const container = elements.activityList;
        if (!container) return;
        
        container.innerHTML = '';
        
        // Сгруппировать активность по времени
        const groupedActivity = {
            'Сейчас': [],
            'Сегодня': [],
            'Вчера': [],
            'Ранее': []
        };
        
        appData.activity.forEach(activity => {
            // Простая группировка по времени
            if (activity.time.includes('мин') || activity.time.includes('час')) {
                groupedActivity['Сейчас'].push(activity);
            } else if (activity.time.includes('Сегодня')) {
                groupedActivity['Сегодня'].push(activity);
            } else if (activity.time.includes('Вчера')) {
                groupedActivity['Вчера'].push(activity);
            } else {
                groupedActivity['Ранее'].push(activity);
            }
        });
        
        // Отобразить группы
        Object.keys(groupedActivity).forEach(group => {
            const activities = groupedActivity[group];
            if (activities.length === 0) return;
            
            // Заголовок группы
            const groupHeader = document.createElement('div');
            groupHeader.className = 'activity-group-header';
            groupHeader.textContent = group;
            container.appendChild(groupHeader);
            
            // Элементы активности
            activities.forEach(activity => {
                const activityElement = document.createElement('div');
                activityElement.className = 'activity-item';
                activityElement.dataset.id = activity.id;
                
                activityElement.innerHTML = `
                    <div class="activity-icon" style="background: ${activity.color}">
                        <i class="${activity.icon}"></i>
                    </div>
                    <div class="activity-info">
                        <div class="activity-text">
                            <strong>${activity.user}</strong> ${activity.text}
                        </div>
                        <div class="activity-details">
                            <span class="activity-time">${activity.time}</span>
                            ${activity.node ? `<span class="activity-node">• ${getNodeName(activity.node)}</span>` : ''}
                        </div>
                    </div>
                    <button class="activity-action" title="Действие">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                `;
                
                // Обработчики
                activityElement.addEventListener('click', () => {
                    handleActivityClick(activity);
                });
                
                activityElement.querySelector('.activity-action').addEventListener('click', (e) => {
                    e.stopPropagation();
                    showActivityActions(activity, e);
                });
                
                container.appendChild(activityElement);
            });
        });
        
        // Если нет активности
        if (container.children.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-activity';
            emptyState.innerHTML = `
                <i class="fas fa-stream"></i>
                <p>Пока нет активности</p>
                <small>Здесь будут отображаться действия ваших контактов</small>
            `;
            container.appendChild(emptyState);
        }
    }
    
    function getNodeName(nodeId) {
        const node = appData.nodes.find(n => n.id === nodeId);
        return node ? node.name : nodeId;
    }
    
    function handleActivityClick(activity) {
        if (activity.chat) {
            openChat(activity.chat);
        } else if (activity.node) {
            switchNode(activity.node);
        }
    }
    
    function showActivityActions(activity, event) {
        event.stopPropagation();
        
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.position = 'fixed';
        menu.style.left = `${event.clientX}px`;
        menu.style.top = `${event.clientY}px`;
        menu.style.zIndex = '1000';
        
        menu.innerHTML = `
            <div class="menu-item" data-action="hide">
                <i class="fas fa-eye-slash"></i>
                Скрыть
            </div>
            <div class="menu-item" data-action="notify">
                <i class="fas fa-bell"></i>
                Уведомить позже
            </div>
            <div class="menu-divider"></div>
            <div class="menu-item" data-action="clear">
                <i class="fas fa-trash"></i>
                Очистить историю активности
            </div>
        `;
        
        document.body.appendChild(menu);
        
        // Обработчики
        menu.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                handleActivityAction(activity, action);
                document.body.removeChild(menu);
            });
        });
        
        // Закрыть меню
        setTimeout(() => {
            const closeMenu = (e) => {
                if (!menu.contains(e.target)) {
                    document.body.removeChild(menu);
                    document.removeEventListener('click', closeMenu);
                }
            };
            document.addEventListener('click', closeMenu);
        });
        
        // Анимация
        anime({
            targets: menu,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 200,
            easing: 'easeOutQuad'
        });
    }
    
    function handleActivityAction(activity, action) {
        switch (action) {
            case 'hide':
                // Удалить активность
                appData.activity = appData.activity.filter(a => a.id !== activity.id);
                renderActivity();
                showNotification('Активность скрыта', 'Элемент удален из ленты', 'info');
                break;
            case 'notify':
                showNotification('Напоминание', 'Напоминание установлено на 1 час', 'success');
                break;
            case 'clear':
                confirmClearActivity();
                break;
        }
    }
    
    function confirmClearActivity() {
        const modal = document.createElement('div');
        modal.className = 'modal confirm-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Очистить историю активности</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="warning-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Вы уверены, что хотите очистить всю историю активности?</p>
                        <p class="text-muted">Это действие нельзя отменить. Вся история активности будет удалена.</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancel-clear">Отмена</button>
                    <button class="btn btn-danger" id="confirm-clear">Очистить историю</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Обработчики
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('#cancel-clear').addEventListener('click', () => modal.remove());
        modal.querySelector('#confirm-clear').addEventListener('click', () => {
            appData.activity = [];
            renderActivity();
            showNotification('История очищена', 'Вся активность удалена', 'info');
            modal.remove();
        });
        
        // Анимация
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    function updateCurrentNode() {
        const node = appData.nodes.find(n => n.id === state.activeNode);
        if (!node) return;
        
        const container = elements.currentNode;
        if (!container) return;
        
        const icon = container.querySelector('.node-icon');
        const name = container.querySelector('.node-name');
        const description = container.querySelector('.node-description');
        const stats = container.querySelector('.node-stats');
        
        if (icon) {
            icon.innerHTML = `<i class="${node.icon}"></i>`;
            icon.style.background = `linear-gradient(135deg, ${node.color}, ${node.color}dd)`;
        }
        if (name) name.textContent = node.name;
        if (description) description.textContent = node.description;
        
        if (stats) {
            stats.innerHTML = `
                <div class="node-stat">
                    <i class="fas fa-users"></i>
                    <span>${node.members}</span>
                </div>
                <div class="node-stat">
                    <i class="fas fa-circle online-dot"></i>
                    <span>${node.online}</span>
                </div>
                <div class="node-stat">
                    <i class="fas fa-comment"></i>
                    <span>${node.unread}</span>
                </div>
            `;
        }
        
        // Обновить заголовок страницы
        document.title = `${node.name} - Telegram Nodes`;
    }
    
    function renderChats() {
        const container = elements.chatsContainer;
        const emptyState = elements.emptyState;
        
        if (!container || !emptyState) return;
        
        // Фильтрация чатов
        let filteredChats = appData.chats.filter(chat => {
            // Фильтр по узлу
            if (state.activeNode !== 'all' && chat.node !== state.activeNode) {
                return false;
            }
            
            // Фильтр по поиску
            if (state.searchQuery) {
                const query = state.searchQuery.toLowerCase();
                return (
                    chat.name.toLowerCase().includes(query) ||
                    chat.lastMessage.toLowerCase().includes(query) ||
                    chat.tags.some(tag => tag.toLowerCase().includes(query))
                );
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
                case 'muted':
                    return chat.muted === true;
                case 'archived':
                    return chat.archived === true;
                default:
                    return !chat.archived; // 'all' не показывает архивные
            }
        });
        
        // Сортировка
        filteredChats.sort((a, b) => {
            if (state.currentSort === 'unread') {
                return b.unread - a.unread;
            } else if (state.currentSort === 'members') {
                return b.members - a.members;
            } else if (state.currentSort === 'name') {
                return a.name.localeCompare(b.name);
            } else {
                // Сортировка по времени
                const timeOrder = { 
                    'только что': 1, 
                    '12:30': 2, 
                    '11:45': 3, 
                    '10:30': 4, 
                    'Пт': 5, 
                    'Вчера': 6, 
                    '09:15': 7 
                };
                return (timeOrder[a.time] || 99) - (timeOrder[b.time] || 99);
            }
        });
        
        container.innerHTML = '';
        
        if (filteredChats.length === 0) {
            emptyState.classList.add('active');
            emptyState.innerHTML = `
                <i class="fas fa-comments"></i>
                <h3>${state.searchQuery ? 'Ничего не найдено' : 'Нет чатов'}</h3>
                <p>${state.searchQuery ? 'Попробуйте изменить поисковый запрос' : 'Создайте новый чат или присоединитесь к существующему'}</p>
                ${!state.searchQuery ? `<button class="btn btn-primary" id="create-first-chat">Создать чат</button>` : ''}
            `;
            
            if (!state.searchQuery) {
                emptyState.querySelector('#create-first-chat').addEventListener('click', () => {
                    showNewChatModal();
                });
            }
            return;
        }
        
        emptyState.classList.remove('active');
        
        // Сгруппировать закрепленные и обычные чаты
        const pinnedChats = filteredChats.filter(chat => chat.pinned);
        const regularChats = filteredChats.filter(chat => !chat.pinned);
        
        // Отобразить закрепленные чаты
        if (pinnedChats.length > 0) {
            const pinnedSection = document.createElement('div');
            pinnedSection.className = 'chats-section';
            pinnedSection.innerHTML = `
                <div class="section-header">
                    <i class="fas fa-thumbtack"></i>
                    <span>Закрепленные</span>
                </div>
            `;
            
            pinnedChats.forEach(chat => {
                pinnedSection.appendChild(createChatCard(chat));
            });
            
            container.appendChild(pinnedSection);
        }
        
        // Отобразить обычные чаты
        if (regularChats.length > 0) {
            const regularSection = document.createElement('div');
            regularSection.className = 'chats-section';
            
            if (pinnedChats.length > 0) {
                regularSection.innerHTML = `
                    <div class="section-header">
                        <span>Все чаты</span>
                    </div>
                `;
            }
            
            regularChats.forEach(chat => {
                regularSection.appendChild(createChatCard(chat));
            });
            
            container.appendChild(regularSection);
        }
    }
    
    function createChatCard(chat) {
        const chatCard = document.createElement('div');
        chatCard.className = `chat-card ${chat.muted ? 'muted' : ''} ${chat.archived ? 'archived' : ''}`;
        chatCard.dataset.chatId = chat.id;
        
        // Создание миниатюр участников
        let memberAvatars = '';
        if (chat.type === 'group' || chat.type === 'channel') {
            const memberCount = Math.min(3, chat.members);
            memberAvatars = Array.from({ length: memberCount }, (_, i) => 
                `<div class="member-avatar" style="background: ${getColorForIndex(i)}">${i + 1}</div>`
            ).join('');
            
            if (chat.members > 3) {
                memberAvatars += `<div class="member-avatar more">+${chat.members - 3}</div>`;
            }
        }
        
        // Иконка типа чата
        let typeIcon = '';
        switch (chat.type) {
            case 'group':
                typeIcon = '<i class="fas fa-users"></i>';
                break;
            case 'channel':
                typeIcon = '<i class="fas fa-bullhorn"></i>';
                break;
            case 'personal':
                typeIcon = '<i class="fas fa-user"></i>';
                break;
        }
        
        chatCard.innerHTML = `
            <div class="chat-card-content">
                <div class="chat-avatar" style="background: ${chat.color}">
                    ${chat.avatar}
                    ${chat.verified ? '<i class="fas fa-check-circle verified-badge"></i>' : ''}
                    ${chat.muted ? '<i class="fas fa-bell-slash mute-badge"></i>' : ''}
                </div>
                <div class="chat-info">
                    <div class="chat-header">
                        <h4 class="chat-name">
                            ${chat.name}
                            ${typeIcon}
                        </h4>
                        <span class="chat-time">${chat.time}</span>
                    </div>
                    <div class="chat-preview">
                        <p>${chat.lastMessage}</p>
                        ${chat.type === 'personal' ? `
                            <div class="chat-status">
                                <i class="fas fa-circle ${chat.online > 0 ? 'online' : 'offline'}"></i>
                                <span>${chat.online > 0 ? 'онлайн' : 'не в сети'}</span>
                            </div>
                        ` : ''}
                    </div>
                    <div class="chat-footer">
                        ${chat.type !== 'personal' ? `
                            <div class="chat-members">
                                <div class="member-avatars">
                                    ${memberAvatars}
                                </div>
                                <span>${chat.members} участников</span>
                            </div>
                        ` : ''}
                        <div class="chat-tags">
                            ${chat.tags.map(tag => `<span class="chat-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="chat-actions">
                    ${chat.unread > 0 ? `
                        <span class="unread-badge">${chat.unread}</span>
                    ` : ''}
                    ${chat.pinned ? '<i class="fas fa-thumbtack pinned-icon"></i>' : ''}
                </div>
            </div>
        `;
        
        // Обработчики
        chatCard.addEventListener('click', (e) => {
            if (!e.target.closest('.chat-actions')) {
                openChat(chat.id);
            }
        });
        
        // Контекстное меню
        chatCard.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showChatContextMenu(chat, e);
        });
        
        // Двойной клик для закрепления
        let clickTimer;
        chatCard.addEventListener('click', (e) => {
            if (!e.target.closest('.chat-actions')) {
                clearTimeout(clickTimer);
                clickTimer = setTimeout(() => {}, 300);
            }
        });
        
        chatCard.addEventListener('dblclick', (e) => {
            if (!e.target.closest('.chat-actions')) {
                clearTimeout(clickTimer);
                togglePinChat(chat);
            }
        });
        
        return chatCard;
    }
    
    function getColorForIndex(index) {
        const colors = ['#0088cc', '#af52de', '#34c759', '#ff9500', '#ff3b30', '#5856d6'];
        return colors[index % colors.length];
    }
    
    function showChatContextMenu(chat, event) {
        event.preventDefault();
        
        const menu = document.createElement('div');
        menu.className = 'context-menu chat-context-menu';
        menu.style.position = 'fixed';
        menu.style.left = `${event.clientX}px`;
        menu.style.top = `${event.clientY}px`;
        menu.style.zIndex = '1000';
        
        menu.innerHTML = `
            <div class="menu-item" data-action="pin">
                <i class="fas fa-thumbtack"></i>
                ${chat.pinned ? 'Открепить' : 'Закрепить'}
            </div>
            <div class="menu-item" data-action="mute">
                <i class="fas fa-bell${chat.muted ? '' : '-slash'}"></i>
                ${chat.muted ? 'Включить уведомления' : 'Отключить уведомления'}
            </div>
            <div class="menu-item" data-action="archive">
                <i class="fas fa-archive"></i>
                ${chat.archived ? 'Разархивировать' : 'Архивировать'}
            </div>
            <div class="menu-divider"></div>
            <div class="menu-item" data-action="mark-read">
                <i class="fas fa-check-double"></i>
                Отметить как прочитанное
            </div>
            <div class="menu-item" data-action="clear-history">
                <i class="fas fa-trash"></i>
                Очистить историю
            </div>
            <div class="menu-divider"></div>
            <div class="menu-item" data-action="settings">
                <i class="fas fa-cog"></i>
                Настройки чата
            </div>
            <div class="menu-item text-danger" data-action="leave">
                <i class="fas fa-sign-out-alt"></i>
                Покинуть чат
            </div>
        `;
        
        document.body.appendChild(menu);
        
        // Обработчики
        menu.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                handleChatAction(chat, action);
                document.body.removeChild(menu);
            });
        });
        
        // Закрыть меню
        setTimeout(() => {
            const closeMenu = (e) => {
                if (!menu.contains(e.target)) {
                    document.body.removeChild(menu);
                    document.removeEventListener('click', closeMenu);
                }
            };
            document.addEventListener('click', closeMenu);
        });
        
        // Анимация
        anime({
            targets: menu,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 200,
            easing: 'easeOutQuad'
        });
    }
    
    function handleChatAction(chat, action) {
        switch (action) {
            case 'pin':
                togglePinChat(chat);
                break;
            case 'mute':
                toggleMuteChat(chat);
                break;
            case 'archive':
                toggleArchiveChat(chat);
                break;
            case 'mark-read':
                markChatAsRead(chat);
                break;
            case 'clear-history':
                confirmClearChatHistory(chat);
                break;
            case 'settings':
                openChatSettings(chat);
                break;
            case 'leave':
                confirmLeaveChat(chat);
                break;
        }
    }
    
    function togglePinChat(chat) {
        chat.pinned = !chat.pinned;
        renderChats();
        
        showNotification(
            chat.pinned ? 'Чат закреплен' : 'Чат откреплен',
            chat.name,
            'success'
        );
    }
    
    function toggleMuteChat(chat) {
        chat.muted = !chat.muted;
        renderChats();
        
        showNotification(
            chat.muted ? 'Уведомления отключены' : 'Уведомления включены',
            `Для чата "${chat.name}"`,
            'info'
        );
    }
    
    function toggleArchiveChat(chat) {
        chat.archived = !chat.archived;
        renderChats();
        
        showNotification(
            chat.archived ? 'Чат архивирован' : 'Чат разархивирован',
            chat.name,
            'info'
        );
        
        // Если чат открыт и архивирован - закрыть его
        if (chat.archived && state.activeChat === chat.id) {
            closeChat();
        }
    }
    
    function markChatAsRead(chat) {
        chat.unread = 0;
        renderChats();
        updateUnreadCount();
        
        showNotification('Чат прочитан', `Все сообщения в "${chat.name}" отмечены как прочитанные`, 'success');
    }
    
    function confirmClearChatHistory(chat) {
        const modal = document.createElement('div');
        modal.className = 'modal confirm-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Очистить историю</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="warning-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Вы уверены, что хотите очистить историю чата "${chat.name}"?</p>
                        <p class="text-muted">Все сообщения будут удалены. Это действие нельзя отменить.</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancel-clear">Отмена</button>
                    <button class="btn btn-danger" id="confirm-clear">Очистить историю</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Обработчики
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('#cancel-clear').addEventListener('click', () => modal.remove());
        modal.querySelector('#confirm-clear').addEventListener('click', () => {
            // Очистить историю сообщений
            if (appData.messages[chat.id]) {
                delete appData.messages[chat.id];
            }
            
            // Сбросить последнее сообщение
            chat.lastMessage = 'История очищена';
            chat.unread = 0;
            chat.time = 'только что';
            
            renderChats();
            if (state.activeChat === chat.id) {
                loadMessages(chat.id);
            }
            
            showNotification('История очищена', `История чата "${chat.name}" удалена`, 'info');
            modal.remove();
        });
        
        // Анимация
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    function openChatSettings(chat) {
        showNotification('Настройки чата', `Открыты настройки для "${chat.name}"`, 'info');
        // В реальном приложении здесь будет открытие модального окна настроек
    }
    
    function confirmLeaveChat(chat) {
        const modal = document.createElement('div');
        modal.className = 'modal confirm-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Покинуть чат</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="warning-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Вы уверены, что хотите покинуть чат "${chat.name}"?</p>
                        ${chat.type === 'group' ? 
                            '<p class="text-muted">Вы больше не будете получать сообщения от этого чата.</p>' : 
                            '<p class="text-muted">Это действие нельзя отменить.</p>'}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancel-leave">Отмена</button>
                    <button class="btn btn-danger" id="confirm-leave">Покинуть чат</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Обработчики
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('#cancel-leave').addEventListener('click', () => modal.remove());
        modal.querySelector('#confirm-leave').addEventListener('click', () => {
            // Удалить чат
            const index = appData.chats.findIndex(c => c.id === chat.id);
            if (index !== -1) {
                appData.chats.splice(index, 1);
                
                // Удалить историю сообщений
                if (appData.messages[chat.id]) {
                    delete appData.messages[chat.id];
                }
                
                renderChats();
                
                // Если чат открыт - закрыть его
                if (state.activeChat === chat.id) {
                    closeChat();
                }
                
                showNotification('Чат покинут', `Вы покинули чат "${chat.name}"`, 'info');
            }
            modal.remove();
        });
        
        // Анимация
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    function showNewChatModal() {
        const modal = document.createElement('div');
        modal.className = 'modal new-chat-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Новый чат</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="new-chat-options">
                        <div class="chat-option" data-type="personal">
                            <div class="option-icon">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="option-info">
                                <h4>Личный чат</h4>
                                <p>Общайтесь с одним человеком</p>
                            </div>
                        </div>
                        <div class="chat-option" data-type="group">
                            <div class="option-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="option-info">
                                <h4>Групповой чат</h4>
                                <p>Создайте чат для команды или друзей</p>
                            </div>
                        </div>
                        <div class="chat-option" data-type="channel">
                            <div class="option-icon">
                                <i class="fas fa-bullhorn"></i>
                            </div>
                            <div class="option-info">
                                <h4>Канал</h4>
                                <p>Вещание для большой аудитории</p>
                            </div>
                        </div>
                        <div class="chat-option" data-type="conference">
                            <div class="option-icon">
                                <i class="fas fa-video"></i>
                            </div>
                            <div class="option-info">
                                <h4>Конференция</h4>
                                <p>Голосовая или видео конференция</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Обработчики для вариантов
        modal.querySelectorAll('.chat-option').forEach(option => {
            option.addEventListener('click', () => {
                const type = option.dataset.type;
                modal.remove();
                
                switch (type) {
                    case 'personal':
                        showCreatePersonalChat();
                        break;
                    case 'group':
                        showCreateGroupChat();
                        break;
                    case 'channel':
                        showCreateChannel();
                        break;
                    case 'conference':
                        startConference();
                        break;
                }
            });
        });
        
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        
        // Анимация
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    function showCreatePersonalChat() {
        const modal = document.createElement('div');
        modal.className = 'modal create-chat-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Новый личный чат</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="create-personal-chat-form">
                        <div class="form-group">
                            <label for="search-contact-chat">Выберите контакт</label>
                            <input type="text" id="search-contact-chat" class="form-control" placeholder="Поиск контактов...">
                            <div class="contacts-list-select" id="chat-contacts-list">
                                ${appData.contacts.map(contact => `
                                    <div class="contact-select-item" data-id="${contact.id}">
                                        <div class="contact-avatar" style="background: ${contact.color}">
                                            ${contact.avatar}
                                        </div>
                                        <div class="contact-info">
                                            <div class="contact-name">${contact.name}</div>
                                            <div class="contact-status">${contact.activity}</div>
                                        </div>
                                        <input type="radio" name="selected-contact" value="${contact.id}">
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="first-message">Первое сообщение (необязательно)</label>
                            <textarea id="first-message" class="form-control" placeholder="Начните разговор..." rows="3"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancel-create-chat">Отмена</button>
                    <button class="btn btn-primary" id="create-personal-chat">Создать чат</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Поиск контактов
        const searchInput = modal.querySelector('#search-contact-chat');
        const contactsList = modal.querySelector('#chat-contacts-list');
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const items = contactsList.querySelectorAll('.contact-select-item');
            
            items.forEach(item => {
                const name = item.querySelector('.contact-name').textContent.toLowerCase();
                item.style.display = name.includes(query) ? 'flex' : 'none';
            });
        });
        
        // Выбор контакта
        contactsList.querySelectorAll('.contact-select-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.matches('input[type="radio"]')) {
                    const radio = item.querySelector('input[type="radio"]');
                    radio.checked = !radio.checked;
                }
            });
        });
        
        // Обработчики
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('#cancel-create-chat').addEventListener('click', () => modal.remove());
        modal.querySelector('#create-personal-chat').addEventListener('click', () => {
            const selectedContact = modal.querySelector('input[name="selected-contact"]:checked');
            const firstMessage = modal.querySelector('#first-message').value;
            
            if (!selectedContact) {
                showNotification('Ошибка', 'Выберите контакт', 'error');
                return;
            }
            
            const contactId = parseInt(selectedContact.value);
            const contact = appData.contacts.find(c => c.id === contactId);
            
            if (contact) {
                // Проверить, существует ли уже чат
                const existingChat = appData.chats.find(chat => 
                    chat.type === 'personal' && chat.name === contact.name
                );
                
                if (existingChat) {
                    openChat(existingChat.id);
                    showNotification('Чат существует', 'Чат с этим контактом уже существует', 'info');
                } else {
                    // Создать новый чат
                    const newChat = {
                        id: 'chat-' + Date.now(),
                        node: 'personal',
                        name: contact.name,
                        type: 'personal',
                        avatar: contact.avatar,
                        color: contact.color,
                        lastMessage: firstMessage || 'Чат создан',
                        time: 'только что',
                        unread: 0,
                        members: 2,
                        online: contact.status === 'online' ? 1 : 0,
                        pinned: false,
                        verified: contact.verified,
                        muted: false,
                        archived: false,
                        lastActivity: new Date().toISOString(),
                        tags: ['личное'],
                        permissions: {
                            sendMessages: true,
                            sendMedia: true,
                            sendPolls: true,
                            addMembers: true,
                            pinMessages: true,
                            changeInfo: true
                        }
                    };
                    
                    appData.chats.push(newChat);
                    
                    // Добавить первое сообщение, если указано
                    if (firstMessage) {
                        appData.messages[newChat.id] = [{
                            id: 1,
                            sender: 'Вы',
                            text: firstMessage,
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            type: 'outgoing',
                            status: 'sent'
                        }];
                    }
                    
                    renderChats();
                    openChat(newChat.id);
                    
                    showNotification('Чат создан', `Чат с ${contact.name} создан`, 'success');
                }
                
                modal.remove();
            }
        });
        
        // Анимация
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    function showCreateGroupChat() {
        showNotification('Создание группы', 'Функция создания группы в разработке', 'info');
    }
    
    function showCreateChannel() {
        showNotification('Создание канала', 'Функция создания канала в разработке', 'info');
    }
    
    function renderEmojis() {
        const container = elements.emojiGrid;
        if (!container) return;
        
        container.innerHTML = '';
        
        // Рендерим смайлики по категориям
        Object.keys(appData.emojis).forEach(category => {
            // Заголовок категории
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'emoji-category-header';
            categoryHeader.textContent = getCategoryName(category);
            categoryHeader.dataset.category = category;
            container.appendChild(categoryHeader);
            
            // Смайлики
            const emojisRow = document.createElement('div');
            emojisRow.className = 'emojis-row';
            
            appData.emojis[category].forEach(emoji => {
                const emojiElement = document.createElement('div');
                emojiElement.className = 'emoji-item';
                emojiElement.textContent = emoji;
                emojiElement.dataset.emoji = emoji;
                emojiElement.title = `:${emoji}:`;
                
                emojiElement.addEventListener('click', () => {
                    insertEmoji(emoji);
                    // Вибрация, если поддерживается
                    if (navigator.vibrate) {
                        navigator.vibrate(50);
                    }
                });
                
                // Долгое нажатие для предпросмотра
                let longPressTimer;
                emojiElement.addEventListener('mousedown', () => {
                    longPressTimer = setTimeout(() => {
                        showEmojiPreview(emoji, emojiElement);
                    }, 500);
                });
                
                emojiElement.addEventListener('mouseup', () => {
                    clearTimeout(longPressTimer);
                });
                
                emojiElement.addEventListener('mouseleave', () => {
                    clearTimeout(longPressTimer);
                });
                
                emojisRow.appendChild(emojiElement);
            });
            
            container.appendChild(emojisRow);
        });
        
        // Кнопка недавних эмодзи
        const recentEmojis = document.createElement('div');
        recentEmojis.className = 'emoji-category-header';
        recentEmojis.textContent = 'Недавние';
        container.appendChild(recentEmojis);
        
        const recentRow = document.createElement('div');
        recentRow.className = 'emojis-row';
        recentRow.innerHTML = `
            <div class="emoji-item">😊</div>
            <div class="emoji-item">👍</div>
            <div class="emoji-item">❤️</div>
            <div class="emoji-item">😂</div>
            <div class="emoji-item">🔥</div>
            <div class="emoji-item">🚀</div>
        `;
        container.appendChild(recentRow);
    }
    
    function getCategoryName(category) {
        const names = {
            smileys: 'Смайлики и эмоции',
            people: 'Люди и жесты',
            nature: 'Животные и природа',
            objects: 'Предметы',
            symbols: 'Символы',
            flags: 'Флаги'
        };
        return names[category] || category;
    }
    
    function showEmojiPreview(emoji, element) {
        const preview = document.createElement('div');
        preview.className = 'emoji-preview';
        preview.textContent = emoji;
        preview.style.fontSize = '48px';
        preview.style.background = 'var(--surface-color)';
        preview.style.padding = '20px';
        preview.style.borderRadius = '12px';
        preview.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        preview.style.position = 'fixed';
        preview.style.zIndex = '10000';
        
        // Позиционирование
        const rect = element.getBoundingClientRect();
        preview.style.left = `${rect.left + rect.width / 2 - 40}px`;
        preview.style.top = `${rect.top - 80}px`;
        
        document.body.appendChild(preview);
        
        // Анимация появления
        anime({
            targets: preview,
            scale: [0, 1],
            opacity: [0, 1],
            duration: 200,
            easing: 'easeOutBack'
        });
        
        // Удалить через 1 секунду
        setTimeout(() => {
            anime({
                targets: preview,
                scale: 0,
                opacity: 0,
                duration: 200,
                easing: 'easeInBack',
                complete: () => {
                    if (preview.parentNode) {
                        preview.parentNode.removeChild(preview);
                    }
                }
            });
        }, 1000);
    }
    
    function renderStickers() {
        const container = elements.stickerGrid;
        if (!container) return;
        
        container.innerHTML = '';
        
        // Популярные стикеры
        const popularSection = document.createElement('div');
        popularSection.className = 'stickers-section';
        popularSection.innerHTML = `
            <div class="section-header">Популярные</div>
            <div class="stickers-row">
                ${appData.stickers.popular.map(sticker => `
                    <div class="sticker-item" data-sticker="${sticker.id}">
                        <div class="sticker-emoji">${sticker.emoji}</div>
                        <div class="sticker-pack">${sticker.pack}</div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(popularSection);
        
        // Недавние стикеры
        const recentSection = document.createElement('div');
        recentSection.className = 'stickers-section';
        recentSection.innerHTML = `
            <div class="section-header">Недавние</div>
            <div class="stickers-row">
                ${appData.stickers.recent.map(sticker => `
                    <div class="sticker-item" data-sticker="${sticker.id}">
                        <div class="sticker-emoji">${sticker.emoji}</div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(recentSection);
        
        // Обработчики для стикеров
        container.querySelectorAll('.sticker-item').forEach(sticker => {
            sticker.addEventListener('click', () => {
                const stickerId = sticker.dataset.sticker;
                sendSticker(stickerId);
            });
        });
    }
    
    function renderFiles() {
        const container = elements.filesView;
        if (!container) return;
        
        // Эта функция будет вызвана при переключении на вкладку файлов
        if (state.currentView === 'files') {
            container.innerHTML = `
                <div class="files-header">
                    <h3>Файлы</h3>
                    <div class="file-filters">
                        <button class="filter-btn active" data-filter="all">Все</button>
                        <button class="filter-btn" data-filter="photos">Фото</button>
                        <button class="filter-btn" data-filter="videos">Видео</button>
                        <button class="filter-btn" data-filter="documents">Документы</button>
                    </div>
                </div>
                <div class="files-grid" id="files-grid">
                    <!-- Файлы будут загружены здесь -->
                </div>
            `;
            
            // Загрузить файлы
            loadFiles();
            
            // Обработчики фильтров
            container.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    loadFiles(e.currentTarget.dataset.filter);
                });
            });
        }
    }
    
    function loadFiles(filter = 'all') {
        const container = document.getElementById('files-grid');
        if (!container) return;
        
        let filteredFiles = appData.files;
        
        if (filter !== 'all') {
            filteredFiles = appData.files.filter(file => file.type === filter);
        }
        
        container.innerHTML = '';
        
        if (filteredFiles.length === 0) {
            container.innerHTML = `
                <div class="empty-files">
                    <i class="fas fa-folder-open"></i>
                    <p>Нет файлов</p>
                    <small>Здесь будут отображаться отправленные и полученные файлы</small>
                </div>
            `;
            return;
        }
        
        filteredFiles.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.className = 'file-card';
            fileElement.dataset.fileId = file.id;
            
            fileElement.innerHTML = `
                <div class="file-icon" style="color: ${file.color}">
                    <i class="${file.icon}"></i>
                </div>
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-details">
                        <span class="file-size">${file.size}</span>
                        <span class="file-sender">от ${file.sender}</span>
                    </div>
                    <div class="file-meta">
                        <span class="file-time">${file.time}</span>
                        <span class="file-node">• ${getNodeName(file.node)}</span>
                    </div>
                </div>
                <div class="file-actions">
                    <button class="btn-icon" title="Скачать">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            `;
            
            // Обработчики
            fileElement.addEventListener('click', () => {
                openFilePreview(file);
            });
            
            fileElement.querySelector('.file-actions .btn-icon').addEventListener('click', (e) => {
                e.stopPropagation();
                downloadFile(file);
            });
            
            container.appendChild(fileElement);
        });
    }
    
    function openFilePreview(file) {
        showNotification('Просмотр файла', `Открыт файл "${file.name}"`, 'info');
        // В реальном приложении здесь будет открытие просмотра файла
    }
    
    function downloadFile(file) {
        showNotification('Загрузка', `Файл "${file.name}" загружается...`, 'info');
        
        // Имитация загрузки
        setTimeout(() => {
            showNotification('Загрузка завершена', `Файл "${file.name}" сохранен`, 'success');
        }, 1500);
    }
    
    function renderCalls() {
        const container = elements.callsView;
        if (!container) return;
        
        // Эта функция будет вызвана при переключении на вкладку звонков
        if (state.currentView === 'calls') {
            container.innerHTML = `
                <div class="calls-header">
                    <h3>Звонки</h3>
                    <div class="call-filters">
                        <button class="filter-btn active" data-filter="all">Все</button>
                        <button class="filter-btn" data-filter="missed">Пропущенные</button>
                        <button class="filter-btn" data-filter="incoming">Входящие</button>
                        <button class="filter-btn" data-filter="outgoing">Исходящие</button>
                    </div>
                </div>
                <div class="calls-list" id="calls-list">
                    <!-- Звонки будут загружены здесь -->
                </div>
            `;
            
            // Загрузить звонки
            loadCalls();
            
            // Обработчики фильтров
            container.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    loadCalls(e.currentTarget.dataset.filter);
                });
            });
        }
    }
    
    function loadCalls(filter = 'all') {
        const container = document.getElementById('calls-list');
        if (!container) return;
        
        let filteredCalls = appData.calls;
        
        if (filter !== 'all') {
            filteredCalls = appData.calls.filter(call => {
                if (filter === 'missed') return call.status === 'missed';
                if (filter === 'incoming') return call.type === 'incoming';
                if (filter === 'outgoing') return call.type === 'outgoing';
                return true;
            });
        }
        
        container.innerHTML = '';
        
        if (filteredCalls.length === 0) {
            container.innerHTML = `
                <div class="empty-calls">
                    <i class="fas fa-phone"></i>
                    <p>Нет звонков</p>
                    <small>Здесь будет история ваших звонков</small>
                </div>
            `;
            return;
        }
        
        // Сгруппировать по датам
        const groupedCalls = {};
        filteredCalls.forEach(call => {
            const date = call.time.split(',')[0]; // Берем только дату
            if (!groupedCalls[date]) {
                groupedCalls[date] = [];
            }
            groupedCalls[date].push(call);
        });
        
        // Отобразить группы
        Object.keys(groupedCalls).forEach(date => {
            const dateHeader = document.createElement('div');
            dateHeader.className = 'calls-date';
            dateHeader.textContent = date;
            container.appendChild(dateHeader);
            
            groupedCalls[date].forEach(call => {
                const callElement = document.createElement('div');
                callElement.className = `call-item ${call.status}`;
                
                let callIcon = '';
                let callStatus = '';
                
                if (call.type === 'conference') {
                    callIcon = '<i class="fas fa-users"></i>';
                    callStatus = 'Конференция';
                } else {
                    callIcon = call.type === 'incoming' 
                        ? '<i class="fas fa-phone-alt"></i>' 
                        : '<i class="fas fa-phone-alt" style="transform: rotate(135deg)"></i>';
                    
                    callStatus = call.status === 'missed' ? 'Пропущенный' : 
                                call.type === 'incoming' ? 'Входящий' : 'Исходящий';
                }
                
                callElement.innerHTML = `
                    <div class="call-icon ${call.type} ${call.status}">
                        ${callIcon}
                    </div>
                    <div class="call-info">
                        <div class="call-contact">${call.contact}</div>
                        <div class="call-details">
                            <span class="call-type">${callStatus}</span>
                            ${call.video ? '<span class="call-video"><i class="fas fa-video"></i></span>' : ''}
                        </div>
                    </div>
                    <div class="call-meta">
                        <div class="call-time">${call.time.split(',')[1]}</div>
                        <div class="call-duration">${call.duration}</div>
                    </div>
                    <div class="call-actions">
                        <button class="btn-icon" title="Позвонить">
                            <i class="fas fa-phone"></i>
                        </button>
                        <button class="btn-icon" title="Информация">
                            <i class="fas fa-info-circle"></i>
                        </button>
                    </div>
                `;
                
                // Обработчики
                callElement.addEventListener('click', (e) => {
                    if (!e.target.closest('.call-actions')) {
                        showCallDetails(call);
                    }
                });
                
                callElement.querySelector('.call-actions .btn-icon:first-child').addEventListener('click', (e) => {
                    e.stopPropagation();
                    makeCall(call.contact);
                });
                
                callElement.querySelector('.call-actions .btn-icon:last-child').addEventListener('click', (e) => {
                    e.stopPropagation();
                    showCallDetails(call);
                });
                
                container.appendChild(callElement);
            });
        });
    }
    
    function makeCall(contact) {
        showNotification('Звонок', `Вызов ${contact}...`, 'info');
    }
    
    function showCallDetails(call) {
        const modal = document.createElement('div');
        modal.className = 'modal call-details-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Детали звонка</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="call-details-header">
                        <div class="call-icon-large ${call.type} ${call.status}">
                            ${call.type === 'conference' ? 
                                '<i class="fas fa-users"></i>' : 
                                '<i class="fas fa-phone-alt"></i>'}
                        </div>
                        <div class="call-info-large">
                            <h4>${call.contact}</h4>
                            <p class="call-type-large">${call.type === 'conference' ? 'Конференция' : 'Звонок'}</p>
                        </div>
                    </div>
                    
                    <div class="call-details-info">
                        <div class="detail-row">
                            <span class="detail-label">Статус:</span>
                            <span class="detail-value ${call.status}">${getCallStatusText(call.status)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Дата и время:</span>
                            <span class="detail-value">${call.time}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Длительность:</span>
                            <span class="detail-value">${call.duration}</span>
                        </div>
                        ${call.type === 'conference' ? `
                        <div class="detail-row">
                            <span class="detail-label">Участники:</span>
                            <span class="detail-value">${call.participants}</span>
                        </div>
                        ` : ''}
                        ${call.video ? `
                        <div class="detail-row">
                            <span class="detail-label">Тип:</span>
                            <span class="detail-value">Видеозвонок <i class="fas fa-video"></i></span>
                        </div>
                        ` : ''}
                        ${call.node ? `
                        <div class="detail-row">
                            <span class="detail-label">Узел:</span>
                            <span class="detail-value">${getNodeName(call.node)}</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="delete-call">
                        <i class="fas fa-trash"></i> Удалить запись
                    </button>
                    <button class="btn btn-primary" id="call-again">
                        <i class="fas fa-phone"></i> Позвонить снова
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Обработчики
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('#delete-call').addEventListener('click', () => {
            confirmDeleteCall(call);
            modal.remove();
        });
        modal.querySelector('#call-again').addEventListener('click', () => {
            makeCall(call.contact);
            modal.remove();
        });
        
        // Анимация
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    function getCallStatusText(status) {
        const statuses = {
            'completed': 'Завершен',
            'missed': 'Пропущен',
            'in_progress': 'В процессе'
        };
        return statuses[status] || status;
    }
    
    function confirmDeleteCall(call) {
        const modal = document.createElement('div');
        modal.className = 'modal confirm-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Удалить запись звонка</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="warning-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Вы уверены, что хотите удалить запись звонка с ${call.contact}?</p>
                        <p class="text-muted">Это действие нельзя отменить.</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancel-delete">Отмена</button>
                    <button class="btn btn-danger" id="confirm-delete">Удалить</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Обработчики
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('#cancel-delete').addEventListener('click', () => modal.remove());
        modal.querySelector('#confirm-delete').addEventListener('click', () => {
            // Удалить звонок
            const index = appData.calls.findIndex(c => c.id === call.id);
            if (index !== -1) {
                appData.calls.splice(index, 1);
                loadCalls();
                showNotification('Запись удалена', 'Запись звонка удалена', 'info');
            }
            modal.remove();
        });
        
        // Анимация
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    function renderNotifications() {
        const container = elements.notificationsContainer;
        if (!container) return;
        
        container.innerHTML = '';
        
        appData.notifications.forEach(notification => {
            const notificationElement = document.createElement('div');
            notificationElement.className = `notification ${notification.type} ${notification.read ? 'read' : 'unread'}`;
            notificationElement.dataset.id = notification.id;
            
            let icon = '';
            switch (notification.type) {
                case 'message':
                    icon = '<i class="fas fa-comment"></i>';
                    break;
                case 'call':
                    icon = '<i class="fas fa-phone"></i>';
                    break;
                case 'node':
                    icon = '<i class="fas fa-sitemap"></i>';
                    break;
                case 'system':
                    icon = '<i class="fas fa-cog"></i>';
                    break;
                default:
                    icon = '<i class="fas fa-bell"></i>';
            }
            
            notificationElement.innerHTML = `
                <div class="notification-icon">
                    ${icon}
                </div>
                <div class="notification-content">
                    <div class="notification-header">
                        <div class="notification-title">${notification.title}</div>
                        <div class="notification-time">${notification.time}</div>
                    </div>
                    <div class="notification-message">${notification.message}</div>
                    ${notification.node || notification.chat ? `
                    <div class="notification-context">
                        ${notification.node ? `<span class="node-context">${getNodeName(notification.node)}</span>` : ''}
                        ${notification.chat ? `<span class="chat-context">${getChatName(notification.chat)}</span>` : ''}
                    </div>
                    ` : ''}
                </div>
                <div class="notification-actions">
                    ${!notification.read ? `
                    <button class="btn-icon mark-read" title="Отметить как прочитанное">
                        <i class="fas fa-check"></i>
                    </button>
                    ` : ''}
                    <button class="btn-icon close-notification" title="Закрыть">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            // Обработчики
            notificationElement.addEventListener('click', () => {
                handleNotificationClick(notification);
            });
            
            notificationElement.querySelector('.mark-read')?.addEventListener('click', (e) => {
                e.stopPropagation();
                markNotificationAsRead(notification);
            });
            
            notificationElement.querySelector('.close-notification').addEventListener('click', (e) => {
                e.stopPropagation();
                removeNotification(notification);
            });
            
            container.appendChild(notificationElement);
        });
        
        // Если нет уведомлений
        if (appData.notifications.length === 0) {
            container.innerHTML = `
                <div class="empty-notifications">
                    <i class="fas fa-bell-slash"></i>
                    <p>Нет уведомлений</p>
                    <small>Здесь будут появляться ваши уведомления</small>
                </div>
            `;
        }
    }
    
    function getChatName(chatId) {
        const chat = appData.chats.find(c => c.id === chatId);
        return chat ? chat.name : chatId;
    }
    
    function handleNotificationClick(notification) {
        markNotificationAsRead(notification);
        
        if (notification.chat) {
            openChat(notification.chat);
        } else if (notification.node) {
            switchNode(notification.node);
        }
    }
    
    function markNotificationAsRead(notification) {
        notification.read = true;
        renderNotifications();
        updateUnreadCount();
    }
    
    function removeNotification(notification) {
        const index = appData.notifications.findIndex(n => n.id === notification.id);
        if (index !== -1) {
            appData.notifications.splice(index, 1);
            renderNotifications();
            updateUnreadCount();
        }
    }
    
    function updateUnreadCount() {
        const unreadCount = appData.notifications.filter(n => !n.read).length;
        state.unreadCount = unreadCount;
        
        // Обновить бейдж на кнопке уведомлений
        const notificationsBtn = elements.notificationsBtn;
        if (notificationsBtn) {
            const badge = notificationsBtn.querySelector('.notification-badge') || 
                         document.createElement('span');
            
            if (unreadCount > 0) {
                badge.className = 'notification-badge';
                badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
                
                if (!notificationsBtn.contains(badge)) {
                    notificationsBtn.appendChild(badge);
                }
                
                // Анимация пульсации
                anime({
                    targets: badge,
                    scale: [1, 1.2, 1],
                    duration: 300,
                    easing: 'easeInOutSine'
                });
            } else {
                if (notificationsBtn.contains(badge)) {
                    notificationsBtn.removeChild(badge);
                }
            }
        }
    }
    
    // ========== ФУНКЦИИ ЧАТА ==========
    function openChat(chatId) {
        const chat = appData.chats.find(c => c.id === chatId);
        if (!chat) return;
        
        state.activeChat = chatId;
        
        // Обновить UI
        elements.mainContent.style.display = 'none';
        elements.chatPanel.classList.add('active');
        
        // Анимация открытия
        anime({
            targets: elements.chatPanel,
            translateX: ['100%', '0%'],
            duration: 300,
            easing: 'easeOutQuad'
        });
        
        // Обновить информацию о чате
        updateChatHeader(chat);
        
        // Загрузить сообщения
        loadMessages(chatId);
        
        // Сбросить непрочитанные
        if (chat.unread > 0) {
            chat.unread = 0;
            renderChats();
            updateUnreadCount();
        }
        
        // Фокус на поле ввода
        setTimeout(() => {
            elements.messageInput.focus();
        }, 100);
        
        // Показать уведомление только если не в демо-режиме
        if (!state.isAuthenticating) {
            showNotification(`Чат "${chat.name}"`, 'Чат открыт', 'info');
        }
    }
    
    function updateChatHeader(chat) {
        if (!elements.chatAvatar || !elements.chatTitle || !elements.chatStatus) return;
        
        elements.chatAvatar.textContent = chat.avatar;
        elements.chatAvatar.style.background = chat.color;
        
        if (chat.verified) {
            elements.chatTitle.innerHTML = `${chat.name} <i class="fas fa-check-circle verified-badge"></i>`;
        } else {
            elements.chatTitle.textContent = chat.name;
        }
        
        if (chat.type === 'personal') {
            const contact = appData.contacts.find(c => c.name === chat.name);
            if (contact) {
                elements.chatStatus.textContent = contact.status === 'online' ? 'онлайн' : contact.lastSeen;
            } else {
                elements.chatStatus.textContent = chat.online > 0 ? 'онлайн' : 'не в сети';
            }
        } else {
            elements.chatStatus.textContent = `${chat.members} участников • ${chat.online} онлайн`;
        }
        
        // Обновить заголовок страницы
        document.title = `${chat.name} - Telegram Nodes`;
    }
    
    function closeChat() {
        if (!state.activeChat) return;
        
        // Анимация закрытия
        anime({
            targets: elements.chatPanel,
            translateX: ['0%', '100%'],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                state.activeChat = null;
                elements.chatPanel.classList.remove('active');
                elements.mainContent.style.display = 'flex';
                elements.messageInput.value = '';
                closeEmojiPanel();
                closeStickerPanel();
                
                // Восстановить заголовок страницы
                const node = appData.nodes.find(n => n.id === state.activeNode);
                document.title = node ? `${node.name} - Telegram Nodes` : 'Telegram Nodes';
            }
        });
    }
    
    function loadMessages(chatId) {
        const container = elements.messagesContainer;
        if (!container) return;
        
        const messages = appData.messages[chatId] || [];
        container.innerHTML = '';
        
        // Группировка сообщений по дате
        const groupedMessages = {};
        messages.forEach(msg => {
            const date = 'Сегодня'; // В реальном приложении здесь будет реальная дата
            if (!groupedMessages[date]) {
                groupedMessages[date] = [];
            }
            groupedMessages[date].push(msg);
        });
        
        // Отобразить группы
        Object.keys(groupedMessages).forEach(date => {
            // Заголовок даты
            const dateElement = document.createElement('div');
            dateElement.className = 'message-date';
            dateElement.innerHTML = `<span>${date}</span>`;
            container.appendChild(dateElement);
            
            // Сообщения на эту дату
            groupedMessages[date].forEach(msg => {
                const messageElement = createMessageElement(msg);
                container.appendChild(messageElement);
            });
        });
        
        // Прокрутить вниз с анимацией
        setTimeout(() => {
            anime({
                targets: container,
                scrollTop: container.scrollHeight,
                duration: 500,
                easing: 'easeOutQuad'
            });
        }, 100);
        
        // Показать индикатор загрузки старых сообщений
        if (messages.length > 0) {
            const loadMoreBtn = document.createElement('div');
            loadMoreBtn.className = 'load-more-messages';
            loadMoreBtn.innerHTML = `
                <button class="btn btn-sm">
                    <i class="fas fa-history"></i>
                    Загрузить более ранние сообщения
                </button>
            `;
            
            loadMoreBtn.querySelector('button').addEventListener('click', () => {
                loadMoreMessages(chatId);
                loadMoreBtn.remove();
            });
            
            container.insertBefore(loadMoreBtn, container.firstChild);
        }
    }
    
    function createMessageElement(msg) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${msg.type} ${msg.status || ''}`;
        messageElement.dataset.messageId = msg.id;
        
        if (msg.type === 'incoming') {
            const senderColor = msg.color || getColorForName(msg.sender);
            
            messageElement.innerHTML = `
                <div class="message-avatar" style="background: ${senderColor}">
                    ${msg.avatar || msg.sender.charAt(0)}
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-sender">${msg.sender}</span>
                        ${msg.verified ? '<i class="fas fa-check-circle verified-badge"></i>' : ''}
                        <span class="message-time">${msg.time}</span>
                        ${msg.edited ? '<span class="message-edited">(ред.)</span>' : ''}
                        ${msg.pinned ? '<i class="fas fa-thumbtack pinned-badge"></i>' : ''}
                    </div>
                    <div class="message-text">${msg.text}</div>
                    ${msg.reactions && Object.keys(msg.reactions).length > 0 ? `
                    <div class="message-reactions">
                        ${Object.entries(msg.reactions).map(([emoji, users]) => `
                            <div class="reaction" title="${users.join(', ')}">
                                ${emoji} <span>${users.length}</span>
                            </div>
                        `).join('')}
                    </div>
                    ` : ''}
                </div>
                <div class="message-actions">
                    <button class="btn-icon" title="Ответить">
                        <i class="fas fa-reply"></i>
                    </button>
                    <button class="btn-icon" title="Реакции">
                        <i class="fas fa-smile"></i>
                    </button>
                    <button class="btn-icon" title="Дополнительно">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
            `;
        } else {
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-sender">Вы</span>
                        <span class="message-time">${msg.time}</span>
                        <span class="message-status">
                            ${msg.status === 'read' ? '<i class="fas fa-check-double"></i>' :
                              msg.status === 'sent' ? '<i class="fas fa-check"></i>' :
                              '<i class="fas fa-clock"></i>'}
                        </span>
                        ${msg.edited ? '<span class="message-edited">(ред.)</span>' : ''}
                    </div>
                    <div class="message-text">${msg.text}</div>
                    ${msg.reactions && Object.keys(msg.reactions).length > 0 ? `
                    <div class="message-reactions">
                        ${Object.entries(msg.reactions).map(([emoji, users]) => `
                            <div class="reaction" title="${users.join(', ')}">
                                ${emoji} <span>${users.length}</span>
                            </div>
                        `).join('')}
                    </div>
                    ` : ''}
                </div>
                <div class="message-actions">
                    <button class="btn-icon" title="Изменить">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" title="Удалить">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn-icon" title="Дополнительно">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
            `;
        }
        
        // Добавить обработчики
        setupMessageHandlers(messageElement, msg);
        
        return messageElement;
    }
    
    function setupMessageHandlers(element, msg) {
        // Клик по сообщению (двойной клик для ответа)
        let clickTimer;
        element.addEventListener('click', (e) => {
            if (!e.target.closest('.message-actions')) {
                clearTimeout(clickTimer);
                clickTimer = setTimeout(() => {
                    // Одиночный клик - ничего
                }, 300);
            }
        });
        
        element.addEventListener('dblclick', (e) => {
            if (!e.target.closest('.message-actions')) {
                clearTimeout(clickTimer);
                replyToMessage(msg);
            }
        });
        
        // Действия сообщения
        const actions = element.querySelector('.message-actions');
        if (actions) {
            actions.addEventListener('click', (e) => {
                const button = e.target.closest('.btn-icon');
                if (button) {
                    const action = Array.from(button.parentNode.children).indexOf(button);
                    handleMessageAction(msg, action, e);
                }
            });
        }
        
        // Контекстное меню
        element.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showMessageContextMenu(msg, e);
        });
    }
    
    function replyToMessage(msg) {
        state.replyToMessage = msg;
        
        // Показать индикатор ответа
        const replyIndicator = document.createElement('div');
        replyIndicator.className = 'reply-indicator';
        replyIndicator.innerHTML = `
            <div class="reply-info">
                <div class="reply-sender">Ответ на ${msg.sender}</div>
                <div class="reply-text">${msg.text.substring(0, 50)}${msg.text.length > 50 ? '...' : ''}</div>
            </div>
            <button class="btn-icon cancel-reply">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        const inputContainer = elements.messageInput.parentNode;
        inputContainer.insertBefore(replyIndicator, elements.messageInput);
        
        replyIndicator.querySelector('.cancel-reply').addEventListener('click', () => {
            state.replyToMessage = null;
            replyIndicator.remove();
        });
        
        // Фокус на поле ввода
        elements.messageInput.focus();
    }
    
    function handleMessageAction(msg, actionIndex, event) {
        event.stopPropagation();
        
        const actions = msg.type === 'incoming' ? 
            ['reply', 'react', 'more'] : 
            ['edit', 'delete', 'more'];
        
        const action = actions[actionIndex];
        
        switch (action) {
            case 'reply':
                replyToMessage(msg);
                break;
            case 'react':
                showReactionsPanel(msg, event);
                break;
            case 'edit':
                editMessage(msg);
                break;
            case 'delete':
                confirmDeleteMessage(msg);
                break;
            case 'more':
                showMessageMoreMenu(msg, event);
                break;
        }
    }
    
    function showReactionsPanel(msg, event) {
        const reactions = ['👍', '❤️', '😂', '😮', '😢', '🙏', '🔥', '👏'];
        
        const panel = document.createElement('div');
        panel.className = 'reactions-panel';
        panel.innerHTML = reactions.map(emoji => `
            <div class="reaction-option" data-emoji="${emoji}">
                ${emoji}
            </div>
        `).join('');
        
        panel.style.position = 'fixed';
        panel.style.left = `${event.clientX - 100}px`;
        panel.style.top = `${event.clientY - 60}px`;
        panel.style.zIndex = '1000';
        
        document.body.appendChild(panel);
        
        // Обработчики реакций
        panel.querySelectorAll('.reaction-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const emoji = e.currentTarget.dataset.emoji;
                addReactionToMessage(msg, emoji);
                document.body.removeChild(panel);
            });
        });
        
        // Закрыть при клике вне
        setTimeout(() => {
            const closePanel = (e) => {
                if (!panel.contains(e.target)) {
                    document.body.removeChild(panel);
                    document.removeEventListener('click', closePanel);
                }
            };
            document.addEventListener('click', closePanel);
        });
        
        // Анимация
        anime({
            targets: panel,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 200,
            easing: 'easeOutQuad'
        });
    }
    
    function addReactionToMessage(msg, emoji) {
        if (!msg.reactions) {
            msg.reactions = {};
        }
        
        if (!msg.reactions[emoji]) {
            msg.reactions[emoji] = [];
        }
        
        // Проверить, не поставил ли уже пользователь эту реакцию
        if (!msg.reactions[emoji].includes('Вы')) {
            msg.reactions[emoji].push('Вы');
            
            // Обновить сообщение в UI
            if (state.activeChat) {
                loadMessages(state.activeChat);
            }
            
            showNotification('Реакция', `Вы отреагировали ${emoji}`, 'success');
        }
    }
    
    function editMessage(msg) {
        if (msg.type !== 'outgoing') return;
        
        // Заменить поле ввода на текст сообщения
        elements.messageInput.value = msg.text;
        elements.messageInput.focus();
        
        // Показать индикатор редактирования
        const editIndicator = document.createElement('div');
        editIndicator.className = 'edit-indicator';
        editIndicator.innerHTML = `
            <div class="edit-info">
                <div class="edit-text">Редактирование сообщения</div>
            </div>
            <button class="btn-icon cancel-edit">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        const inputContainer = elements.messageInput.parentNode;
        inputContainer.insertBefore(editIndicator, elements.messageInput);
        
        // Сохранить ссылку на редактируемое сообщение
        state.editingMessage = msg;
        
        editIndicator.querySelector('.cancel-edit').addEventListener('click', () => {
            state.editingMessage = null;
            elements.messageInput.value = '';
            editIndicator.remove();
        });
    }
    
    function confirmDeleteMessage(msg) {
        const modal = document.createElement('div');
        modal.className = 'modal confirm-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Удалить сообщение</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="warning-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Вы уверены, что хотите удалить это сообщение?</p>
                        <p class="text-muted">${msg.text.substring(0, 100)}${msg.text.length > 100 ? '...' : ''}</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancel-delete">Отмена</button>
                    <button class="btn btn-danger" id="confirm-delete">Удалить</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Обработчики
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('#cancel-delete').addEventListener('click', () => modal.remove());
        modal.querySelector('#confirm-delete').addEventListener('click', () => {
            deleteMessage(msg);
            modal.remove();
        });
        
        // Анимация
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    function deleteMessage(msg) {
        const chatId = state.activeChat;
        if (!chatId || !appData.messages[chatId]) return;
        
        const messages = appData.messages[chatId];
        const index = messages.findIndex(m => m.id === msg.id);
        
        if (index !== -1) {
            messages.splice(index, 1);
            loadMessages(chatId);
            showNotification('Сообщение удалено', 'Сообщение было удалено', 'success');
        }
    }
    
    function showMessageContextMenu(msg, event) {
        event.preventDefault();
        
        const menu = document.createElement('div');
        menu.className = 'context-menu message-context-menu';
        menu.style.position = 'fixed';
        menu.style.left = `${event.clientX}px`;
        menu.style.top = `${event.clientY}px`;
        menu.style.zIndex = '1000';
        
        const isOutgoing = msg.type === 'outgoing';
        
        menu.innerHTML = `
            <div class="menu-item" data-action="reply">
                <i class="fas fa-reply"></i>
                Ответить
            </div>
            <div class="menu-item" data-action="forward">
                <i class="fas fa-share"></i>
                Переслать
            </div>
            <div class="menu-item" data-action="copy">
                <i class="fas fa-copy"></i>
                Копировать текст
            </div>
            <div class="menu-item" data-action="select">
                <i class="fas fa-check-square"></i>
                Выбрать
            </div>
            <div class="menu-divider"></div>
            ${isOutgoing ? `
            <div class="menu-item" data-action="edit">
                <i class="fas fa-edit"></i>
                Редактировать
            </div>
            ` : ''}
            <div class="menu-item text-danger" data-action="delete">
                <i class="fas fa-trash"></i>
                Удалить
            </div>
            <div class="menu-divider"></div>
            <div class="menu-item" data-action="pin">
                <i class="fas fa-thumbtack"></i>
                ${msg.pinned ? 'Открепить' : 'Закрепить'}
            </div>
            <div class="menu-item" data-action="report">
                <i class="fas fa-flag"></i>
                Пожаловаться
            </div>
        `;
        
        document.body.appendChild(menu);
        
        // Обработчики
        menu.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                handleMessageContextAction(msg, action);
                document.body.removeChild(menu);
            });
        });
        
        // Закрыть меню
        setTimeout(() => {
            const closeMenu = (e) => {
                if (!menu.contains(e.target)) {
                    document.body.removeChild(menu);
                    document.removeEventListener('click', closeMenu);
                }
            };
            document.addEventListener('click', closeMenu);
        });
        
        // Анимация
        anime({
            targets: menu,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 200,
            easing: 'easeOutQuad'
        });
    }
    
    function handleMessageContextAction(msg, action) {
        switch (action) {
            case 'reply':
                replyToMessage(msg);
                break;
            case 'forward':
                forwardMessage(msg);
                break;
            case 'copy':
                copyMessageText(msg);
                break;
            case 'select':
                selectMessage(msg);
                break;
            case 'edit':
                editMessage(msg);
                break;
            case 'delete':
                confirmDeleteMessage(msg);
                break;
            case 'pin':
                togglePinMessage(msg);
                break;
            case 'report':
                reportMessage(msg);
                break;
        }
    }
    
    function forwardMessage(msg) {
        showNotification('Пересылка', 'Выберите чат для пересылки сообщения', 'info');
        // В реальном приложении здесь будет выбор чата
    }
    
    function copyMessageText(msg) {
        navigator.clipboard.writeText(msg.text).then(() => {
            showNotification('Скопировано', 'Текст сообщения скопирован в буфер обмена', 'success');
        }).catch(() => {
            // Fallback для старых браузеров
            const textArea = document.createElement('textarea');
            textArea.value = msg.text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Скопировано', 'Текст сообщения скопирован в буфер обмена', 'success');
        });
    }
    
    function selectMessage(msg) {
        state.selectedMessages.add(msg.id);
        
        // Включить режим выбора
        state.editMode = true;
        
        // Обновить UI
        updateEditModeUI();
        
        showNotification('Выбор', 'Сообщение выбрано. Выберите другие или выполните действие', 'info');
    }
    
    function updateEditModeUI() {
        if (state.editMode) {
            // Показать панель действий
            const actionsPanel = document.createElement('div');
            actionsPanel.className = 'edit-actions-panel';
            actionsPanel.innerHTML = `
                <div class="edit-info">
                    <span id="selected-count">${state.selectedMessages.size} выбрано</span>
                </div>
                <div class="edit-buttons">
                    <button class="btn-icon" title="Удалить выбранные">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn-icon" title="Переслать">
                        <i class="fas fa-share"></i>
                    </button>
                    <button class="btn-icon" title="Копировать">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="btn-icon" title="Отменить выбор" id="cancel-edit-mode">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            // Добавить панель
            const chatHeader = document.querySelector('.chat-header');
            if (chatHeader) {
                chatHeader.appendChild(actionsPanel);
            }
            
            // Обработчики
            actionsPanel.querySelector('#cancel-edit-mode').addEventListener('click', () => {
                cancelEditMode();
            });
            
            // Обновить стиль выбранных сообщений
            document.querySelectorAll('.message').forEach(message => {
                const messageId = parseInt(message.dataset.messageId);
                if (state.selectedMessages.has(messageId)) {
                    message.classList.add('selected');
                }
            });
        } else {
            // Удалить панель действий
            const actionsPanel = document.querySelector('.edit-actions-panel');
            if (actionsPanel) {
                actionsPanel.remove();
            }
            
            // Сбросить стиль выбранных сообщений
            document.querySelectorAll('.message.selected').forEach(message => {
                message.classList.remove('selected');
            });
            
            // Очистить выбранные сообщения
            state.selectedMessages.clear();
        }
    }
    
    function cancelEditMode() {
        state.editMode = false;
        state.selectedMessages.clear();
        updateEditModeUI();
    }
    
    function togglePinMessage(msg) {
        msg.pinned = !msg.pinned;
        
        if (state.activeChat) {
            loadMessages(state.activeChat);
        }
        
        showNotification(
            msg.pinned ? 'Сообщение закреплено' : 'Сообщение откреплено',
            msg.text.substring(0, 50) + (msg.text.length > 50 ? '...' : ''),
            'info'
        );
    }
    
    function reportMessage(msg) {
        showNotification('Жалоба', 'Жалоба на сообщение отправлена модераторам', 'info');
    }
    
    function showMessageMoreMenu(msg, event) {
        // Похоже на контекстное меню, но вызывается из кнопки "еще"
        showMessageContextMenu(msg, event);
    }
    
    function loadMoreMessages(chatId) {
        // Имитация загрузки старых сообщений
        showNotification('Загрузка', 'Загрузка более ранних сообщений...', 'info');
        
        setTimeout(() => {
            // Добавить старые сообщения
            const oldMessages = [
                {
                    id: Date.now() - 100000,
                    sender: 'Мария',
                    text: 'Это более старое сообщение',
                    time: '11:00',
                    type: 'incoming',
                    status: 'read'
                },
                {
                    id: Date.now() - 200000,
                    sender: 'Вы',
                    text: 'Да, я помню',
                    time: '10:55',
                    type: 'outgoing',
                    status: 'read'
                }
            ];
            
            if (!appData.messages[chatId]) {
                appData.messages[chatId] = [];
            }
            
            appData.messages[chatId].unshift(...oldMessages);
            loadMessages(chatId);
            
            showNotification('Загружено', 'Более ранние сообщения загружены', 'success');
        }, 1000);
    }
    
    function sendMessage() {
        const input = elements.messageInput;
        if (!input || !input.value.trim() || !state.activeChat) return;
        
        const chat = appData.chats.find(c => c.id === state.activeChat);
        if (!chat) return;
        
        // Проверить, редактируем ли мы существующее сообщение
        if (state.editingMessage) {
            editExistingMessage(state.editingMessage, input.value.trim());
            return;
        }
        
        // Создать новое сообщение
        const newMessage = {
            id: Date.now(),
            sender: 'Вы',
            text: input.value.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'outgoing',
            status: 'sent',
            reactions: {}
        };
        
        // Добавить информацию об ответе, если есть
        if (state.replyToMessage) {
            newMessage.replyTo = state.replyToMessage;
        }
        
        // Добавить в историю
        if (!appData.messages[state.activeChat]) {
            appData.messages[state.activeChat] = [];
        }
        appData.messages[state.activeChat].push(newMessage);
        
        // Обновить последнее сообщение в чате
        chat.lastMessage = newMessage.text;
        chat.time = 'только что';
        chat.lastActivity = new Date().toISOString();
        
        // Очистить поле ввода и убрать индикаторы
        input.value = '';
        state.replyToMessage = null;
        state.editingMessage = null;
        
        // Убрать индикаторы ответа/редактирования
        const replyIndicator = input.parentNode.querySelector('.reply-indicator');
        const editIndicator = input.parentNode.querySelector('.edit-indicator');
        if (replyIndicator) replyIndicator.remove();
        if (editIndicator) editIndicator.remove();
        
        // Обновить UI
        loadMessages(state.activeChat);
        renderChats();
        
        // Показать уведомление
        showNotification('Сообщение отправлено', `В чат "${chat.name}"`, 'success');
        
        // Симулировать ответ через 1-3 секунды
        setTimeout(() => {
            simulateReply(chat);
        }, 1000 + Math.random() * 2000);
        
        // Анимация отправки
        anime({
            targets: input,
            scale: [1, 0.95, 1],
            duration: 200,
            easing: 'easeOutQuad'
        });
    }
    
    function editExistingMessage(msg, newText) {
        if (newText === msg.text) {
            // Текст не изменился
            state.editingMessage = null;
            elements.messageInput.value = '';
            
            const editIndicator = elements.messageInput.parentNode.querySelector('.edit-indicator');
            if (editIndicator) editIndicator.remove();
            
            return;
        }
        
        // Обновить сообщение
        msg.text = newText;
        msg.edited = true;
        msg.time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (ред.)';
        
        // Обновить последнее сообщение в чате, если это было последнее сообщение
        const chat = appData.chats.find(c => c.id === state.activeChat);
        if (chat) {
            const messages = appData.messages[state.activeChat];
            if (messages && messages.length > 0 && messages[messages.length - 1].id === msg.id) {
                chat.lastMessage = msg.text + ' (ред.)';
                renderChats();
            }
        }
        
        // Очистить поле ввода
        state.editingMessage = null;
        elements.messageInput.value = '';
        
        // Убрать индикатор редактирования
        const editIndicator = elements.messageInput.parentNode.querySelector('.edit-indicator');
        if (editIndicator) editIndicator.remove();
        
        // Обновить UI
        if (state.activeChat) {
            loadMessages(state.activeChat);
        }
        
        showNotification('Сообщение изменено', 'Сообщение успешно отредактировано', 'success');
    }
    
    function simulateReply(chat) {
        if (!chat || !state.activeChat) return;
        
        const responses = [
            'Отличная идея! Давайте обсудим это подробнее.',
            'Я как раз об этом думал. У меня есть несколько предложений.',
            'Отправил вам файл с предложениями по этому вопросу.',
            'Можем созвониться, чтобы обсудить детали?',
            'Спасибо за информацию! Буду ждать обновлений.',
            'Интересно! А как насчет альтернативного варианта?',
            'Понял. Нужно ли мне что-то сделать с этим?',
            'Отлично! Будем двигаться в этом направлении.',
            'У меня возник вопрос по этому поводу. Можем обсудить?',
            'Принято к сведению. Держу в курсе!'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        // Определить отправителя
        let sender, avatar, color;
        if (chat.type === 'personal') {
            sender = chat.name.split(' ')[0];
            avatar = chat.avatar;
            color = chat.color;
        } else {
            // Случайный участник группы
            const participants = ['Алексей', 'Мария', 'Дмитрий', 'Екатерина', 'Иван'];
            sender = participants[Math.floor(Math.random() * participants.length)];
            avatar = sender.charAt(0);
            color = getColorForName(sender);
        }
        
        const replyMessage = {
            id: Date.now(),
            sender: sender,
            text: randomResponse,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'incoming',
            status: 'read',
            avatar: avatar,
            color: color
        };
        
        if (!appData.messages[state.activeChat]) {
            appData.messages[state.activeChat] = [];
        }
        appData.messages[state.activeChat].push(replyMessage);
        
        // Обновить последнее сообщение в списке чатов
        const chatIndex = appData.chats.findIndex(c => c.id === state.activeChat);
        if (chatIndex !== -1) {
            appData.chats[chatIndex].lastMessage = randomResponse;
            appData.chats[chatIndex].unread = (appData.chats[chatIndex].unread || 0) + 1;
            appData.chats[chatIndex].time = 'только что';
            appData.chats[chatIndex].lastActivity = new Date().toISOString();
        }
        
        // Обновить UI если чат открыт
        if (state.activeChat) {
            loadMessages(state.activeChat);
        }
        
        // Обновить список чатов
        renderChats();
        updateUnreadCount();
        
        // Показать уведомление, если чат не активен или свернут
        if (document.hidden || !state.activeChat) {
            showNotification(`Новое сообщение от ${sender}`, randomResponse, 'info');
        }
    }
    
    function sendSticker(stickerId) {
        if (!state.activeChat) return;
        
        const chat = appData.chats.find(c => c.id === state.activeChat);
        if (!chat) return;
        
        // Найти стикер
        const sticker = [...appData.stickers.popular, ...appData.stickers.recent]
            .find(s => s.id === parseInt(stickerId));
        
        if (!sticker) return;
        
        // Создать сообщение-стикер
        const stickerMessage = {
            id: Date.now(),
            sender: 'Вы',
            text: `[Стикер: ${sticker.emoji}]`,
            sticker: sticker,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'outgoing',
            status: 'sent'
        };
        
        // Добавить в историю
        if (!appData.messages[state.activeChat]) {
            appData.messages[state.activeChat] = [];
        }
        appData.messages[state.activeChat].push(stickerMessage);
        
        // Обновить последнее сообщение в чате
        chat.lastMessage = sticker.emoji + ' [Стикер]';
        chat.time = 'только что';
        chat.lastActivity = new Date().toISOString();
        
        // Обновить UI
        loadMessages(state.activeChat);
        renderChats();
        
        // Закрыть панель стикеров
        closeStickerPanel();
        
        // Показать уведомление
        showNotification('Стикер отправлен', `Стикер отправлен в "${chat.name}"`, 'success');
        
        // Симулировать ответ стикером
        setTimeout(() => {
            simulateStickerReply(chat);
        }, 1500);
    }
    
    function simulateStickerReply(chat) {
        if (!chat || !state.activeChat) return;
        
        const stickerReplies = [
            { emoji: '👍', pack: 'Gestures' },
            { emoji: '❤️', pack: 'Hearts' },
            { emoji: '😂', pack: 'Smileys' },
            { emoji: '👏', pack: 'Gestures' }
        ];
        
        const randomSticker = stickerReplies[Math.floor(Math.random() * stickerReplies.length)];
        
        // Определить отправителя
        let sender;
        if (chat.type === 'personal') {
            sender = chat.name.split(' ')[0];
        } else {
            const participants = ['Алексей', 'Мария', 'Дмитрий'];
            sender = participants[Math.floor(Math.random() * participants.length)];
        }
        
        const stickerMessage = {
            id: Date.now(),
            sender: sender,
            text: `[Стикер: ${randomSticker.emoji}]`,
            sticker: { emoji: randomSticker.emoji, pack: randomSticker.pack },
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'incoming',
            status: 'read'
        };
        
        appData.messages[state.activeChat].push(stickerMessage);
        
        // Обновить UI если чат открыт
        if (state.activeChat) {
            loadMessages(state.activeChat);
        }
        
        // Показать уведомление
        if (document.hidden || !state.activeChat) {
            showNotification(`Стикер от ${sender}`, randomSticker.emoji, 'info');
        }
    }
    
    // ========== ФУНКЦИИ КОНФЕРЕНЦИИ ==========
    function startConference() {
        if (state.isConferenceActive) return;
        
        state.isConferenceActive = true;
        state.conferenceTimer = 0;
        
        // Показать панель конференции
        elements.conferencePanel.classList.add('active');
        
        // Анимация появления
        anime({
            targets: elements.conferencePanel,
            translateY: ['100%', '0%'],
            duration: 300,
            easing: 'easeOutQuad'
        });
        
        // Запустить таймер
        state.conferenceTimerInterval = setInterval(() => {
            state.conferenceTimer++;
            updateConferenceTimer();
        }, 1000);
        
        // Создать участников конференции
        createConferenceParticipants();
        
        // Начать симуляцию конференции
        simulateConference();
        
        // Показать уведомление
        showNotification('Видеоконференция', 'Конференция начата', 'success');
    }
    
    function closeConference() {
        if (!state.isConferenceActive) return;
        
        // Анимация закрытия
        anime({
            targets: elements.conferencePanel,
            translateY: ['0%', '100%'],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                state.isConferenceActive = false;
                elements.conferencePanel.classList.remove('active');
                
                // Остановить таймер
                if (state.conferenceTimerInterval) {
                    clearInterval(state.conferenceTimerInterval);
                    state.conferenceTimerInterval = null;
                }
                
                // Показать уведомление
                showNotification('Видеоконференция', 'Конференция завершена', 'info');
            }
        });
    }
    
    function updateConferenceTimer() {
        const timerElement = elements.conferenceTimer;
        if (!timerElement) return;
        
        const minutes = Math.floor(state.conferenceTimer / 60);
        const seconds = state.conferenceTimer % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    function createConferenceParticipants() {
        const container = elements.conferenceGrid;
        if (!container) return;
        
        container.innerHTML = '';
        
        // Добавить текущего пользователя
        const userElement = document.createElement('div');
        userElement.className = 'conference-participant host';
        userElement.innerHTML = `
            <div class="participant-video">
                <div class="participant-avatar" style="background: #0088cc">
                    ${appData.user.avatar}
                    <div class="participant-status online">
                        <i class="fas fa-microphone"></i>
                        <i class="fas fa-video"></i>
                    </div>
                </div>
                <div class="participant-info">
                    <div class="participant-name">Вы (Ведущий)</div>
                    <div class="participant-actions">
                        <button class="btn-icon active" id="conf-mute-toggle">
                            <i class="fas fa-microphone"></i>
                        </button>
                        <button class="btn-icon active" id="conf-video-toggle">
                            <i class="fas fa-video"></i>
                        </button>
                        <button class="btn-icon" id="conf-settings">
                            <i class="fas fa-cog"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(userElement);
        
        // Добавить обработчики для кнопок
        userElement.querySelector('#conf-mute-toggle').addEventListener('click', (e) => {
            const icon = e.currentTarget.querySelector('i');
            e.currentTarget.classList.toggle('active');
            if (e.currentTarget.classList.contains('active')) {
                icon.classList.replace('fa-microphone-slash', 'fa-microphone');
            } else {
                icon.classList.replace('fa-microphone', 'fa-microphone-slash');
            }
        });
        
        userElement.querySelector('#conf-video-toggle').addEventListener('click', (e) => {
            const icon = e.currentTarget.querySelector('i');
            e.currentTarget.classList.toggle('active');
            if (e.currentTarget.classList.contains('active')) {
                icon.classList.replace('fa-video-slash', 'fa-video');
            } else {
                icon.classList.replace('fa-video', 'fa-video-slash');
            }
        });
        
        // Добавить случайных участников
        const participants = appData.contacts.slice(0, 4);
        participants.forEach((contact, index) => {
            const participantElement = document.createElement('div');
            participantElement.className = 'conference-participant';
            
            const isSpeaking = Math.random() > 0.7;
            const hasVideo = Math.random() > 0.3;
            const isMuted = Math.random() > 0.5;
            
            participantElement.innerHTML = `
                <div class="participant-video">
                    ${hasVideo ? `
                    <div class="video-feed">
                        <div class="video-overlay">
                            <div class="participant-avatar" style="background: ${contact.color}">
                                ${contact.avatar}
                            </div>
                        </div>
                        ${isSpeaking ? '<div class="speaking-indicator"></div>' : ''}
                    </div>
                    ` : `
                    <div class="participant-avatar large" style="background: ${contact.color}">
                        ${contact.avatar}
                        ${isSpeaking ? '<div class="speaking-indicator"></div>' : ''}
                    </div>
                    `}
                    <div class="participant-info">
                        <div class="participant-name">
                            ${contact.name}
                            ${index === 0 ? '<span class="co-host">Соведущий</span>' : ''}
                        </div>
                        <div class="participant-status">
                            <i class="fas fa-microphone${isMuted ? '-slash' : ''}"></i>
                            <i class="fas fa-video${hasVideo ? '' : '-slash'}"></i>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(participantElement);
        });
    }
    
    function simulateConference() {
        // Симуляция активности в конференции
        setInterval(() => {
            if (!state.isConferenceActive) return;
            
            const participants = elements.conferenceGrid.querySelectorAll('.conference-participant:not(.host)');
            if (participants.length === 0) return;
            
            // Случайный участник начинает говорить
            if (Math.random() > 0.8) {
                const randomParticipant = participants[Math.floor(Math.random() * participants.length)];
                const speakingIndicator = randomParticipant.querySelector('.speaking-indicator');
                if (speakingIndicator) {
                    speakingIndicator.classList.add('active');
                    
                    setTimeout(() => {
                        speakingIndicator.classList.remove('active');
                    }, 3000);
                }
            }
            
            // Случайный участник включает/выключает видео
            if (Math.random() > 0.9) {
                const randomParticipant = participants[Math.floor(Math.random() * participants.length)];
                const videoIcon = randomParticipant.querySelector('.fa-video, .fa-video-slash');
                if (videoIcon) {
                    if (videoIcon.classList.contains('fa-video')) {
                        videoIcon.classList.replace('fa-video', 'fa-video-slash');
                    } else {
                        videoIcon.classList.replace('fa-video-slash', 'fa-video');
                    }
                }
            }
        }, 5000);
    }
    
    // ========== ГОЛОСОВЫЕ СООБЩЕНИЯ ==========
    function startVoiceRecording() {
        if (state.recordingVoice) return;
        
        state.recordingVoice = true;
        state.voiceRecordTime = 0;
        
        // Показать панель записи
        if (elements.voiceRecordPanel) {
            elements.voiceRecordPanel.classList.add('active');
            
            // Анимация появления
            anime({
                targets: elements.voiceRecordPanel,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 200,
                easing: 'easeOutQuad'
            });
        }
        
        // Запустить таймер
        state.voiceRecordInterval = setInterval(() => {
            state.voiceRecordTime++;
            updateVoiceRecordTimer();
            
            // Визуальная обратная связь
            if (elements.voiceRecordTimer) {
                const intensity = Math.sin(state.voiceRecordTime * 0.5) * 0.5 + 0.5;
                elements.voiceRecordTimer.style.transform = `scale(${1 + intensity * 0.1})`;
            }
        }, 1000);
        
        // Включить вибрацию (если поддерживается)
        if (navigator.vibrate) {
            navigator.vibrate([100]);
        }
        
        // Захват аудио (имитация)
        showNotification('Запись', 'Запись голосового сообщения начата', 'info');
    }
    
    function stopVoiceRecording() {
        if (!state.recordingVoice) return;
        
        state.recordingVoice = false;
        
        // Остановить таймер
        if (state.voiceRecordInterval) {
            clearInterval(state.voiceRecordInterval);
            state.voiceRecordInterval = null;
        }
        
        // Скрыть панель записи
        if (elements.voiceRecordPanel) {
            anime({
                targets: elements.voiceRecordPanel,
                opacity: 0,
                translateY: 20,
                duration: 200,
                easing: 'easeInQuad',
                complete: () => {
                    elements.voiceRecordPanel.classList.remove('active');
                }
            });
        }
        
        // Если запись была достаточно длинной, отправить
        if (state.voiceRecordTime >= 1) {
            sendVoiceMessage(state.voiceRecordTime);
        } else {
            showNotification('Запись отменена', 'Запись слишком короткая', 'warning');
        }
        
        // Выключить вибрацию
        if (navigator.vibrate) {
            navigator.vibrate(0);
        }
    }
    
    function cancelVoiceRecording() {
        if (!state.recordingVoice) return;
        
        state.recordingVoice = false;
        
        // Остановить таймер
        if (state.voiceRecordInterval) {
            clearInterval(state.voiceRecordInterval);
            state.voiceRecordInterval = null;
        }
        
        // Скрыть панель записи
        if (elements.voiceRecordPanel) {
            elements.voiceRecordPanel.classList.remove('active');
        }
        
        showNotification('Запись отменена', 'Голосовое сообщение не сохранено', 'info');
    }
    
    function updateVoiceRecordTimer() {
        const timerElement = elements.voiceRecordTimer;
        if (!timerElement) return;
        
        const minutes = Math.floor(state.voiceRecordTime / 60);
        const seconds = state.voiceRecordTime % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    function sendVoiceMessage(duration) {
        if (!state.activeChat) return;
        
        const chat = appData.chats.find(c => c.id === state.activeChat);
        if (!chat) return;
        
        const durationText = formatDuration(duration);
        
        // Создать сообщение с голосовым сообщением
        const voiceMessage = {
            id: Date.now(),
            sender: 'Вы',
            text: `[Голосовое сообщение: ${durationText}]`,
            voice: {
                duration: duration,
                durationText: durationText,
                waveform: generateWaveform()
            },
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'outgoing',
            status: 'sent'
        };
        
        // Добавить в историю
        if (!appData.messages[state.activeChat]) {
            appData.messages[state.activeChat] = [];
        }
        appData.messages[state.activeChat].push(voiceMessage);
        
        // Обновить последнее сообщение в чате
        chat.lastMessage = '🎤 Голосовое сообщение';
        chat.time = 'только что';
        chat.lastActivity = new Date().toISOString();
        
        // Обновить UI
        loadMessages(state.activeChat);
        renderChats();
        
        // Показать уведомление
        showNotification('Голосовое сообщение отправлено', `${durationText} • "${chat.name}"`, 'success');
        
        // Симулировать ответ голосовым сообщением
        setTimeout(() => {
            simulateVoiceReply(chat);
        }, 2000);
    }
    
    function formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    function generateWaveform() {
        // Генерация случайной волновой формы
        const points = 20;
        const waveform = [];
        for (let i = 0; i < points; i++) {
            waveform.push(Math.random() * 100);
        }
        return waveform;
    }
    
    function simulateVoiceReply(chat) {
        if (!chat || !state.activeChat) return;
        
        const duration = 5 + Math.floor(Math.random() * 30);
        const durationText = formatDuration(duration);
        
        // Определить отправителя
        let sender;
        if (chat.type === 'personal') {
            sender = chat.name.split(' ')[0];
        } else {
            const participants = ['Алексей', 'Мария', 'Дмитрий'];
            sender = participants[Math.floor(Math.random() * participants.length)];
        }
        
        const voiceMessage = {
            id: Date.now(),
            sender: sender,
            text: `[Голосовое сообщение: ${durationText}]`,
            voice: {
                duration: duration,
                durationText: durationText,
                waveform: generateWaveform()
            },
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'incoming',
            status: 'read'
        };
        
        appData.messages[state.activeChat].push(voiceMessage);
        
        // Обновить UI если чат открыт
        if (state.activeChat) {
            loadMessages(state.activeChat);
        }
        
        // Показать уведомление
        if (document.hidden || !state.activeChat) {
            showNotification(`Голосовое сообщение от ${sender}`, durationText, 'info');
        }
    }
    
    // ========== УТИЛИТЫ ==========
    function setTheme(theme) {
        state.theme = theme;
        localStorage.setItem('telegram-nodes-theme', theme);
        document.body.setAttribute('data-theme', theme);
        
        // Обновить иконку переключателя
        const themeToggle = elements.themeToggle;
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
        }
    }
    
    function switchNode(nodeId) {
        if (state.activeNode === nodeId) return;
        
        state.activeNode = nodeId;
        
        // Анимация перехода
        anime({
            targets: elements.chatsContainer,
            opacity: [1, 0.5, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });
        
        // Обновить UI
        renderNodes();
        updateCurrentNode();
        renderChats();
        
        // Сбросить поиск
        if (elements.globalSearch) {
            elements.globalSearch.value = '';
            state.searchQuery = '';
        }
        
        // Показать уведомление
        const node = appData.nodes.find(n => n.id === nodeId);
        if (node) {
            showNotification('Узел изменен', `Переключен на ${node.name}`, 'info');
        }
    }
    
    function switchView(view) {
        if (state.currentView === view) return;
        
        state.currentView = view;
        
        // Скрыть все вью
        if (elements.chatsView) elements.chatsView.style.display = 'none';
        if (elements.contactsView) elements.contactsView.style.display = 'none';
        if (elements.callsView) elements.callsView.style.display = 'none';
        if (elements.filesView) elements.filesView.style.display = 'none';
        
        // Показать выбранную вью
        switch (view) {
            case 'chats':
                if (elements.chatsView) {
                    elements.chatsView.style.display = 'block';
                    renderChats();
                }
                break;
            case 'contacts':
                if (elements.contactsView) {
                    elements.contactsView.style.display = 'block';
                    renderContacts();
                }
                break;
            case 'calls':
                if (elements.callsView) {
                    elements.callsView.style.display = 'block';
                    renderCalls();
                }
                break;
            case 'files':
                if (elements.filesView) {
                    elements.filesView.style.display = 'block';
                    renderFiles();
                }
                break;
        }
        
        // Обновить активную кнопку навигации
        updateNavButtons(view);
    }
    
    function updateNavButtons(activeView) {
        const navButtons = [
            { element: elements.navChats, view: 'chats' },
            { element: elements.navContacts, view: 'contacts' },
            { element: elements.navCalls, view: 'calls' },
            { element: elements.navFiles, view: 'files' }
        ];
        
        navButtons.forEach(nav => {
            if (nav.element) {
                if (nav.view === activeView) {
                    nav.element.classList.add('active');
                } else {
                    nav.element.classList.remove('active');
                }
            }
        });
    }
    
    function showNotification(title, message, type = 'info') {
        const notification = {
            id: Date.now(),
            title: title,
            message: message,
            type: type,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false
        };
        
        appData.notifications.unshift(notification);
        
        // Ограничить количество уведомлений
        if (appData.notifications.length > 50) {
            appData.notifications.pop();
        }
        
        // Обновить UI уведомлений
        renderNotifications();
        updateUnreadCount();
        
        // Показать всплывающее уведомление (тост)
        createToastNotification(notification);
        
        // Воспроизвести звук уведомления (если включено)
        if (state.settings.notifications && state.settings.sounds) {
            playNotificationSound(type);
        }
        
        // Вибрация (если включено и поддерживается)
        if (state.settings.notifications && state.settings.vibrations && navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    }
    
    function playNotificationSound(type) {
        // Создать звук уведомления
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            
            // Разные звуки для разных типов уведомлений
            switch (type) {
                case 'success':
                    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
                    break;
                case 'error':
                    oscillator.frequency.setValueAtTime(349.23, audioContext.currentTime); // F4
                    break;
                case 'warning':
                    oscillator.frequency.setValueAtTime(392.00, audioContext.currentTime); // G4
                    break;
                default:
                    oscillator.frequency.setValueAtTime(440.00, audioContext.currentTime); // A4
            }
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Audio context not supported');
        }
    }
    
    function createToastNotification(notification) {
        // Проверить, активно ли окно
        if (document.hidden) return;
        
        const toast = document.createElement('div');
        toast.className = `toast-notification ${notification.type}`;
        toast.dataset.notificationId = notification.id;
        
        let icon = '';
        switch (notification.type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            case 'warning':
                icon = '<i class="fas fa-exclamation-triangle"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle"></i>';
        }
        
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <div class="toast-title">${notification.title}</div>
                <div class="toast-message">${notification.message}</div>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(toast);
        
        // Анимация появления
        anime({
            targets: toast,
            opacity: [0, 1],
            translateY: [-20, 0],
            duration: 300,
            easing: 'easeOutQuad'
        });
        
        // Автоматическое закрытие через 5 секунд
        const autoClose = setTimeout(() => {
            closeToast(toast);
        }, 5000);
        
        // Закрытие по клику
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoClose);
            closeToast(toast);
        });
        
        // Клик по тосту открывает уведомления
        toast.addEventListener('click', (e) => {
            if (e.target !== closeBtn && !closeBtn.contains(e.target)) {
                clearTimeout(autoClose);
                closeToast(toast);
                // Показать панель уведомлений
                showNotificationsPanel();
            }
        });
    }
    
    function closeToast(toast) {
        anime({
            targets: toast,
            opacity: 0,
            translateY: -20,
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }
        });
    }
    
    function showNotificationsPanel() {
        // Создать панель уведомлений
        const panel = document.createElement('div');
        panel.className = 'notifications-panel';
        panel.innerHTML = `
            <div class="panel-header">
                <h3>Уведомления</h3>
                <button class="panel-close">&times;</button>
            </div>
            <div class="panel-body" id="notifications-panel-body">
                <!-- Уведомления будут здесь -->
            </div>
            <div class="panel-footer">
                <button class="btn btn-secondary" id="mark-all-read">Отметить все как прочитанные</button>
                <button class="btn btn-primary" id="close-notifications">Закрыть</button>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Загрузить уведомления в панель
        const panelBody = panel.querySelector('#notifications-panel-body');
        if (panelBody) {
            appData.notifications.forEach(notification => {
                const notifElement = document.createElement('div');
                notifElement.className = `panel-notification ${notification.read ? 'read' : 'unread'}`;
                notifElement.innerHTML = `
                    <div class="notification-icon">
                        ${notification.type === 'message' ? '<i class="fas fa-comment"></i>' :
                          notification.type === 'call' ? '<i class="fas fa-phone"></i>' :
                          notification.type === 'node' ? '<i class="fas fa-sitemap"></i>' :
                          '<i class="fas fa-bell"></i>'}
                    </div>
                    <div class="notification-content">
                        <div class="notification-title">${notification.title}</div>
                        <div class="notification-message">${notification.message}</div>
                        <div class="notification-time">${notification.time}</div>
                    </div>
                `;
                
                notifElement.addEventListener('click', () => {
                    handleNotificationClick(notification);
                    panel.remove();
                });
                
                panelBody.appendChild(notifElement);
            });
        }
        
        // Обработчики
        panel.querySelector('.panel-close').addEventListener('click', () => panel.remove());
        panel.querySelector('#close-notifications').addEventListener('click', () => panel.remove());
        panel.querySelector('#mark-all-read').addEventListener('click', () => {
            appData.notifications.forEach(n => n.read = true);
            renderNotifications();
            updateUnreadCount();
            panel.remove();
            showNotification('Уведомления', 'Все уведомления отмечены как прочитанные', 'success');
        });
        
        // Анимация появления
        anime({
            targets: panel,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    function getColorForName(name) {
        const colors = ['#0088cc', '#af52de', '#34c759', '#ff9500', '#ff3b30', '#5856d6', '#5ac8fa'];
        if (!name) return colors[0];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
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
        
        // Анимация
        anime({
            targets: input,
            scale: [1, 1.02, 1],
            duration: 200,
            easing: 'easeOutQuad'
        });
    }
    
    function toggleEmojiPanel() {
        state.isEmojiPanelOpen = !state.isEmojiPanelOpen;
        
        if (elements.emojiPanel) {
            if (state.isEmojiPanelOpen) {
                elements.emojiPanel.classList.add('active');
                elements.emojiToggleBtn.classList.add('active');
                closeStickerPanel(); // Закрыть панель стикеров
                
                // Анимация появления
                anime({
                    targets: elements.emojiPanel,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            } else {
                anime({
                    targets: elements.emojiPanel,
                    opacity: 0,
                    translateY: 20,
                    duration: 200,
                    easing: 'easeInQuad',
                    complete: () => {
                        elements.emojiPanel.classList.remove('active');
                        elements.emojiToggleBtn.classList.remove('active');
                    }
                });
            }
        }
    }
    
    function closeEmojiPanel() {
        state.isEmojiPanelOpen = false;
        
        if (elements.emojiPanel) {
            elements.emojiPanel.classList.remove('active');
        }
        if (elements.emojiToggleBtn) {
            elements.emojiToggleBtn.classList.remove('active');
        }
    }
    
    function toggleStickerPanel() {
        state.isStickerPanelOpen = !state.isStickerPanelOpen;
        
        if (elements.stickerPanel) {
            if (state.isStickerPanelOpen) {
                elements.stickerPanel.classList.add('active');
                elements.stickerToggleBtn.classList.add('active');
                closeEmojiPanel(); // Закрыть панель эмодзи
                
                // Анимация появления
                anime({
                    targets: elements.stickerPanel,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            } else {
                anime({
                    targets: elements.stickerPanel,
                    opacity: 0,
                    translateY: 20,
                    duration: 200,
                    easing: 'easeInQuad',
                    complete: () => {
                        elements.stickerPanel.classList.remove('active');
                        elements.stickerToggleBtn.classList.remove('active');
                    }
                });
            }
        }
    }
    
    function closeStickerPanel() {
        state.isStickerPanelOpen = false;
        
        if (elements.stickerPanel) {
            elements.stickerPanel.classList.remove('active');
        }
        if (elements.stickerToggleBtn) {
            elements.stickerToggleBtn.classList.remove('active');
        }
    }
    
    function simulateActivity() {
        // Случайные действия каждые 30-60 секунд
        setInterval(() => {
            if (document.hidden) return;
            
            const actions = [
                // Новое сообщение
                () => {
                    const activeChats = appData.chats.filter(chat => 
                        !chat.archived && chat.id !== state.activeChat
                    );
                    
                    if (activeChats.length > 0) {
                        const randomChat = activeChats[Math.floor(Math.random() * activeChats.length)];
                        randomChat.unread = (randomChat.unread || 0) + 1;
                        randomChat.lastMessage = getRandomMessage();
                        randomChat.time = 'только что';
                        randomChat.lastActivity = new Date().toISOString();
                        
                        renderChats();
                        updateUnreadCount();
                        
                        // Показать уведомление, если уведомления включены
                        if (state.settings.notifications && !randomChat.muted) {
                            showNotification('Новое сообщение', `В чате "${randomChat.name}"`, 'info');
                        }
                    }
                },
                
                // Изменение статуса контакта
                () => {
                    const contacts = appData.contacts.filter(c => 
                        c.status !== 'offline' && Math.random() > 0.7
                    );
                    
                    if (contacts.length > 0) {
                        const randomContact = contacts[Math.floor(Math.random() * contacts.length)];
                        const oldStatus = randomContact.status;
                        
                        // Сменить статус
                        const statuses = ['online', 'typing', 'offline'];
                        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                        
                        randomContact.status = newStatus;
                        randomContact.lastSeen = getLastSeenText(newStatus);
                        randomContact.activity = getActivityText(newStatus);
                        
                        renderContacts();
                        
                        // Если контакт стал онлайн
                        if (oldStatus === 'offline' && newStatus === 'online') {
                            showNotification(`${randomContact.name}`, 'Сейчас онлайн', 'info');
                        }
                    }
                },
                
                // Активность в узле
                () => {
                    const nodes = appData.nodes.filter(n => n.id !== state.activeNode);
                    
                    if (nodes.length > 0) {
                        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
                        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, или 1
                        
                        randomNode.online = Math.max(0, Math.min(
                            randomNode.members, 
                            randomNode.online + change
                        ));
                        
                        renderNodes();
                        updateCurrentNode();
                    }
                },
                
                // Новая активность
                () => {
                    const users = ['Алексей', 'Мария', 'Дмитрий', 'Екатерина', 'Иван'];
                    const actions = [
                        { icon: 'fa-comment', text: 'отправил сообщение' },
                        { icon: 'fa-phone', text: 'начал звонок' },
                        { icon: 'fa-video', text: 'начал видеозвонок' },
                        { icon: 'fa-gamepad', text: 'играет в игру' },
                        { icon: 'fa-music', text: 'слушает музыку' }
                    ];
                    
                    const randomUser = users[Math.floor(Math.random() * users.length)];
                    const randomAction = actions[Math.floor(Math.random() * actions.length)];
                    
                    const newActivity = {
                        id: Date.now(),
                        user: randomUser,
                        action: randomAction.text.split(' ')[0],
                        text: randomAction.text,
                        time: 'только что',
                        icon: 'fas ' + randomAction.icon,
                        color: getColorForName(randomUser)
                    };
                    
                    appData.activity.unshift(newActivity);
                    
                    // Ограничить количество
                    if (appData.activity.length > 20) {
                        appData.activity.pop();
                    }
                    
                    renderActivity();
                }
            ];
            
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            if (Math.random() > 0.5) { // 50% шанс
                randomAction();
            }
        }, 30000 + Math.random() * 30000); // 30-60 секунд
    }
    
    function getRandomMessage() {
        const messages = [
            'Привет! Как дела?',
            'Посмотри на это!',
            'У тебя есть минутка?',
            'Нужна твоя помощь',
            'Отличные новости!',
            'Жду твоего ответа',
            'Встречаемся в 18:00',
            'Отправил тебе файл',
            'Что думаешь по этому поводу?',
            'Срочно! Позвони мне'
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }
    
    function getLastSeenText(status) {
        switch (status) {
            case 'online': return 'только что';
            case 'typing': return 'печатает...';
            case 'offline': return 'давно';
            default: return 'недавно';
        }
    }
    
    function getActivityText(status) {
        switch (status) {
            case 'online': return 'В сети';
            case 'typing': return 'Печатает...';
            case 'offline': return 'Не в сети';
            default: return 'Офлайн';
        }
    }
    
    function startOnlineTimer() {
        // Обновлять статус онлайн каждые 5 минут
        setInterval(() => {
            if (document.hidden) return;
            
            appData.user.online = true;
            appData.user.lastSeen = 'только что';
            
            // Обновить статус в UI
            renderProfile();
        }, 5 * 60 * 1000);
        
        // Обновлять статус при фокусе окна
        window.addEventListener('focus', () => {
            appData.user.online = true;
            appData.user.lastSeen = 'только что';
            renderProfile();
        });
        
        // При скрытии окна - стать офлайн через 1 минуту
        window.addEventListener('blur', () => {
            setTimeout(() => {
                if (document.hidden) {
                    appData.user.online = false;
                    appData.user.lastSeen = '1 мин назад';
                    renderProfile();
                }
            }, 60000);
        });
    }
    
    function checkForUpdates() {
        // Проверить обновления каждые 24 часа
        const lastCheck = localStorage.getItem('telegram-nodes-update-check');
        const now = Date.now();
        
        if (!lastCheck || now - parseInt(lastCheck) > 24 * 60 * 60 * 1000) {
            // Имитация проверки обновлений
            setTimeout(() => {
                if (Math.random() > 0.7) { // 30% шанс на обновление
                    showNotification('Доступно обновление', 'Telegram Nodes v2.2', 'system');
                }
            }, 5000);
            
            localStorage.setItem('telegram-nodes-update-check', now.toString());
        }
    }
    
    function loadSettings() {
        const savedSettings = localStorage.getItem('telegram-nodes-settings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                Object.assign(state.settings, settings);
                
                // Применить настройки
                applySettings();
            } catch (e) {
                console.error('Ошибка загрузки настроек:', e);
            }
        }
    }
    
    function saveSettings() {
        localStorage.setItem('telegram-nodes-settings', JSON.stringify(state.settings));
        applySettings();
        showNotification('Настройки сохранены', 'Настройки успешно применены', 'success');
    }
    
    function applySettings() {
        // Применить тему
        if (state.settings.theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        } else {
            setTheme(state.settings.theme);
        }
        
        // Применить настройки уведомлений
        // (в реальном приложении здесь будет настройка Push-уведомлений)
        
        // Применить настройки звука
        // (в реальном приложении здесь будет настройка громкости)
        
        console.log('Настройки применены:', state.settings);
    }
    
    function openSettings() {
        const modal = elements.settingsModal;
        if (!modal) return;
        
        modal.classList.add('active');
        
        // Загрузить текущие настройки в форму
        loadSettingsIntoForm();
        
        // Анимация появления
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    function closeSettings() {
        const modal = elements.settingsModal;
        if (!modal) return;
        
        anime({
            targets: modal,
            opacity: 0,
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                modal.classList.remove('active');
            }
        });
    }
    
    function loadSettingsIntoForm() {
        // Эта функция загрузит настройки в форму настроек
        // В реальном приложении здесь будет заполнение всех полей формы
        
        // Пример для нескольких полей:
        const form = document.getElementById('settings-form');
        if (form) {
            // Уведомления
            form.querySelector('#notifications-enabled').checked = state.settings.notifications;
            form.querySelector('#sounds-enabled').checked = state.settings.sounds;
            form.querySelector('#vibrations-enabled').checked = state.settings.vibrations;
            
            // Конфиденциальность
            form.querySelector('#last-seen').value = state.settings.privacy.lastSeen;
            form.querySelector('#profile-photo').value = state.settings.privacy.profilePhoto;
            
            // Чат
            form.querySelector('#enter-to-send').checked = state.settings.chat.enterToSend;
            form.querySelector('#large-emoji').checked = state.settings.chat.largeEmoji;
            
            // Данные
            form.querySelector('#auto-download-photos').value = state.settings.data.autoDownload.photos;
            form.querySelector('#auto-download-videos').value = state.settings.data.autoDownload.videos;
            
            // Язык и тема
            form.querySelector('#language').value = state.settings.language;
            form.querySelector('#theme').value = state.settings.theme;
        }
    }
    
    // ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========
    function setupEventListeners() {
        console.log('🔧 Настройка обработчиков событий...');
        
        // Переключение темы
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', () => {
                const newTheme = state.theme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
                showNotification('Тема изменена', `Переключено на ${newTheme === 'dark' ? 'темную' : 'светлую'} тему`, 'info');
                
                // Сохранить в настройки
                state.settings.theme = newTheme;
                saveSettings();
            });
        }
        
        // Поиск
        if (elements.globalSearch) {
            elements.globalSearch.addEventListener('input', (e) => {
                state.searchQuery = e.target.value;
                
                if (elements.searchClear) {
                    elements.searchClear.style.display = state.searchQuery ? 'flex' : 'none';
                }
                
                // Поиск в реальном времени
                performSearch(state.searchQuery);
            });
            
            elements.globalSearch.addEventListener('focus', () => {
                if (elements.searchClear) {
                    elements.searchClear.style.display = state.searchQuery ? 'flex' : 'none';
                }
            });
            
            elements.globalSearch.addEventListener('blur', () => {
                setTimeout(() => {
                    if (elements.searchClear) {
                        elements.searchClear.style.display = 'none';
                    }
                }, 200);
            });
        }
        
        if (elements.searchClear) {
            elements.searchClear.addEventListener('click', () => {
                state.searchQuery = '';
                if (elements.globalSearch) {
                    elements.globalSearch.value = '';
                }
                elements.searchClear.style.display = 'none';
                renderChats();
                
                // Скрыть результаты поиска
                if (elements.searchResults) {
                    elements.searchResults.classList.remove('active');
                }
            });
        }
        
        // Фильтры чатов
        elements.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.filter;
                state.currentFilter = filter;
                
                // Обновить активный фильтр
                elements.filterButtons.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                renderChats();
            });
        });
        
        // Сортировка чатов
        elements.sortButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sort = e.currentTarget.dataset.sort;
                state.currentSort = sort;
                
                // Обновить активную сортировку
                elements.sortButtons.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                renderChats();
            });
        });
        
        // Навигация
        if (elements.navChats) {
            elements.navChats.addEventListener('click', () => switchView('chats'));
        }
        
        if (elements.navContacts) {
            elements.navContacts.addEventListener('click', () => switchView('contacts'));
        }
        
        if (elements.navCalls) {
            elements.navCalls.addEventListener('click', () => switchView('calls'));
        }
        
        if (elements.navFiles) {
            elements.navFiles.addEventListener('click', () => switchView('files'));
        }
        
        // Чат
        if (elements.closeChatBtn) {
            elements.closeChatBtn.addEventListener('click', closeChat);
        }
        
        if (elements.sendBtn) {
            elements.sendBtn.addEventListener('click', sendMessage);
        }
        
        if (elements.messageInput) {
            elements.messageInput.addEventListener('keypress', (e) => {
                if (state.settings.chat.enterToSend) {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                    }
                }
            });
            
            elements.messageInput.addEventListener('input', () => {
                state.isTyping = elements.messageInput.value.trim().length > 0;
                
                // Автоматическое увеличение высоты
                elements.messageInput.style.height = 'auto';
                elements.messageInput.style.height = Math.min(elements.messageInput.scrollHeight, 120) + 'px';
            });
            
            // Голосовое сообщение при длительном нажатии
            let voiceTimer;
            elements.messageInput.addEventListener('mousedown', (e) => {
                if (e.button === 0) { // Левая кнопка мыши
                    voiceTimer = setTimeout(() => {
                        startVoiceRecording();
                    }, 500);
                }
            });
            
            elements.messageInput.addEventListener('mouseup', (e) => {
                if (e.button === 0) {
                    clearTimeout(voiceTimer);
                    if (state.recordingVoice) {
                        stopVoiceRecording();
                    }
                }
            });
            
            elements.messageInput.addEventListener('mouseleave', () => {
                clearTimeout(voiceTimer);
                if (state.recordingVoice) {
                    cancelVoiceRecording();
                }
            });
        }
        
        // Смайлики
        if (elements.emojiToggleBtn) {
            elements.emojiToggleBtn.addEventListener('click', toggleEmojiPanel);
        }
        
        // Стикеры
        if (elements.stickerToggleBtn) {
            elements.stickerToggleBtn.addEventListener('click', toggleStickerPanel);
        }
        
        // Категории эмодзи
        elements.emojiCategories.forEach(category => {
            category.addEventListener('click', (e) => {
                const categoryName = e.currentTarget.dataset.category;
                state.selectedEmojiCategory = categoryName;
                
                // Прокрутить к выбранной категории
                const emojiGrid = elements.emojiGrid;
                const categoryIndex = Object.keys(appData.emojis).indexOf(categoryName);
                if (categoryIndex !== -1 && emojiGrid) {
                    const categoryHeaders = emojiGrid.querySelectorAll('.emoji-category-header');
                    if (categoryHeaders[categoryIndex]) {
                        categoryHeaders[categoryIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
        
        // Видеоконференция
        if (elements.startConferenceBtn) {
            elements.startConferenceBtn.addEventListener('click', startConference);
        }
        
        if (elements.closeConferenceBtn) {
            elements.closeConferenceBtn.addEventListener('click', closeConference);
        }
        
        if (elements.confEndBtn) {
            elements.confEndBtn.addEventListener('click', closeConference);
        }
        
        // Профиль
        if (elements.profileMenuBtn) {
            elements.profileMenuBtn.addEventListener('click', () => {
                if (elements.profileModal) {
                    openProfileModal();
                }
            });
        }
        
        if (elements.closeProfileModal) {
            elements.closeProfileModal.addEventListener('click', closeProfileModal);
        }
        
        if (elements.profileModalOverlay) {
            elements.profileModalOverlay.addEventListener('click', closeProfileModal);
        }
        
        // Кнопка "Назад"
        if (elements.backBtn) {
            elements.backBtn.addEventListener('click', handleBackButton);
        }
        
        // Уведомления
        if (elements.notificationsBtn) {
            elements.notificationsBtn.addEventListener('click', () => {
                showNotificationsPanel();
            });
        }
        
        // Обновление активности
        if (elements.refreshActivityBtn) {
            elements.refreshActivityBtn.addEventListener('click', () => {
                renderActivity();
                showNotification('Активность', 'Список активности обновлен', 'success');
            });
        }
        
        // Новый чат
        if (elements.newChatBtn || elements.startChatBtn) {
            const newChatHandler = () => {
                showNewChatModal();
            };
            
            if (elements.newChatBtn) {
                elements.newChatBtn.addEventListener('click', newChatHandler);
            }
            if (elements.startChatBtn) {
                elements.startChatBtn.addEventListener('click', newChatHandler);
            }
        }
        
        // Настройки
        if (elements.settingsBtn) {
            elements.settingsBtn.addEventListener('click', openSettings);
        }
        
        // Закрытие модальных окон при нажатии ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Закрыть активные модальные окна
                if (elements.profileModal && elements.profileModal.classList.contains('active')) {
                    closeProfileModal();
                }
                
                if (elements.settingsModal && elements.settingsModal.classList.contains('active')) {
                    closeSettings();
                }
                
                if (state.activeChat) {
                    closeChat();
                }
                
                if (state.isConferenceActive) {
                    closeConference();
                }
                
                if (state.recordingVoice) {
                    cancelVoiceRecording();
                }
            }
            
            // Горячие клавиши
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'k':
                        e.preventDefault();
                        if (elements.globalSearch) {
                            elements.globalSearch.focus();
                        }
                        break;
                    case 'n':
                        e.preventDefault();
                        showNewChatModal();
                        break;
                    case 't':
                        e.preventDefault();
                        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
                        setTheme(newTheme);
                        break;
                    case ',':
                        e.preventDefault();
                        openSettings();
                        break;
                }
            }
        });
        
        // Обработка кликов вне панелей
        document.addEventListener('click', (e) => {
            // Закрытие панели смайликов при клике вне
            if (state.isEmojiPanelOpen && elements.emojiPanel && elements.emojiToggleBtn) {
                if (!elements.emojiPanel.contains(e.target) && !elements.emojiToggleBtn.contains(e.target)) {
                    closeEmojiPanel();
                }
            }
            
            // Закрытие панели стикеров при клике вне
            if (state.isStickerPanelOpen && elements.stickerPanel && elements.stickerToggleBtn) {
                if (!elements.stickerPanel.contains(e.target) && !elements.stickerToggleBtn.contains(e.target)) {
                    closeStickerPanel();
                }
            }
        });
        
        // Адаптивность
        window.addEventListener('resize', handleResize);
        handleResize(); // Инициализация
        
        // Видимость страницы
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        // Drag & Drop для файлов
        setupFileDrop();
    }
    
    function handleBackButton() {
        if (state.activeChat) {
            closeChat();
        } else if (state.isConferenceActive) {
            closeConference();
        } else if (state.currentView !== 'chats') {
            switchView('chats');
        }
    }
    
    function openProfileModal() {
        if (elements.profileModal) {
            elements.profileModal.classList.add('active');
            if (elements.profileModalOverlay) {
                elements.profileModalOverlay.classList.add('active');
            }
            
            updateProfileModal();
            
            // Анимация
            anime({
                targets: elements.profileModal,
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    }
    
    function closeProfileModal() {
        if (elements.profileModal) {
            anime({
                targets: elements.profileModal,
                opacity: 0,
                scale: 0.9,
                duration: 300,
                easing: 'easeInQuad',
                complete: () => {
                    elements.profileModal.classList.remove('active');
                    if (elements.profileModalOverlay) {
                        elements.profileModalOverlay.classList.remove('active');
                    }
                }
            });
        }
    }
    
    function handleResize() {
        state.isSidebarVisible = window.innerWidth > 768;
        
        if (elements.sidebar) {
            if (state.isSidebarVisible) {
                elements.sidebar.classList.add('active');
            } else {
                elements.sidebar.classList.remove('active');
            }
        }
        
        // Обновить высоту поля ввода сообщения
        if (elements.messageInput) {
            elements.messageInput.style.height = 'auto';
            elements.messageInput.style.height = Math.min(elements.messageInput.scrollHeight, 120) + 'px';
        }
    }
    
    function handleVisibilityChange() {
        if (document.hidden) {
            // Страница скрыта
            appData.user.online = false;
            appData.user.lastSeen = 'только что';
        } else {
            // Страница видима
            appData.user.online = true;
            appData.user.lastSeen = 'только что';
        }
        renderProfile();
    }
    
    function setupFileDrop() {
        // Drag & Drop для файлов
        const dropZone = document.querySelector('.chat-input-area') || document.body;
        
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.add('drag-over');
        });
        
        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.remove('drag-over');
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleDroppedFiles(files);
            }
        });
    }
    
    function handleDroppedFiles(files) {
        if (!state.activeChat) {
            showNotification('Ошибка', 'Выберите чат для отправки файлов', 'error');
            return;
        }
        
        const chat = appData.chats.find(c => c.id === state.activeChat);
        if (!chat) return;
        
        Array.from(files).slice(0, 5).forEach(file => { // Ограничение 5 файлов
            uploadFile(file, chat);
        });
    }
    
    function uploadFile(file, chat) {
        // Проверить размер файла
        const maxSize = config.limits.maxFileSize * 1024 * 1024; // MB to bytes
        if (file.size > maxSize) {
            showNotification('Ошибка', `Файл "${file.name}" слишком большой (макс. ${config.limits.maxFileSize}MB)`, 'error');
            return;
        }
        
        // Добавить в очередь загрузок
        const uploadId = Date.now();
        const upload = {
            id: uploadId,
            file: file,
            chat: chat,
            progress: 0,
            status: 'pending'
        };
        
        state.uploadQueue.push(upload);
        
        // Показать уведомление о начале загрузки
        showNotification('Загрузка файла', `Начата загрузка "${file.name}"`, 'info');
        
        // Имитация загрузки
        simulateUpload(upload);
    }
    
    function simulateUpload(upload) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            
            upload.progress = progress;
            
            // Обновить UI загрузки
            updateUploadsUI();
            
            if (progress >= 100) {
                clearInterval(interval);
                upload.status = 'completed';
                
                // Добавить файл в историю
                const fileExtension = upload.file.name.split('.').pop().toLowerCase();
                let fileType = 'document';
                let icon = 'fas fa-file';
                
                if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
                    fileType = 'photo';
                    icon = 'fas fa-image';
                } else if (['mp4', 'avi', 'mov', 'mkv'].includes(fileExtension)) {
                    fileType = 'video';
                    icon = 'fas fa-video';
                } else if (['mp3', 'wav', 'ogg'].includes(fileExtension)) {
                    fileType = 'audio';
                    icon = 'fas fa-music';
                } else if (['pdf'].includes(fileExtension)) {
                    icon = 'fas fa-file-pdf';
                } else if (['doc', 'docx'].includes(fileExtension)) {
                    icon = 'fas fa-file-word';
                } else if (['xls', 'xlsx'].includes(fileExtension)) {
                    icon = 'fas fa-file-excel';
                } else if (['ppt', 'pptx'].includes(fileExtension)) {
                    icon = 'fas fa-file-powerpoint';
                } else if (['zip', 'rar', '7z'].includes(fileExtension)) {
                    icon = 'fas fa-file-archive';
                }
                
                const newFile = {
                    id: Date.now(),
                    name: upload.file.name,
                    size: formatFileSize(upload.file.size),
                    type: fileType,
                    sender: 'Вы',
                    time: 'только что',
                    node: upload.chat.node,
                    chat: upload.chat.id,
                    icon: icon,
                    color: getColorForName(upload.file.name)
                };
                
                appData.files.unshift(newFile);
                
                // Добавить сообщение о файле
                if (!appData.messages[upload.chat.id]) {
                    appData.messages[upload.chat.id] = [];
                }
                
                const fileMessage = {
                    id: Date.now(),
                    sender: 'Вы',
                    text: `[Файл: ${upload.file.name}]`,
                    file: newFile,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    type: 'outgoing',
                    status: 'sent'
                };
                
                appData.messages[upload.chat.id].push(fileMessage);
                
                // Обновить чат
                upload.chat.lastMessage = `📎 ${upload.file.name}`;
                upload.chat.time = 'только что';
                upload.chat.lastActivity = new Date().toISOString();
                
                // Обновить UI
                if (state.activeChat === upload.chat.id) {
                    loadMessages(upload.chat.id);
                }
                renderChats();
                
                // Удалить из очереди
                const index = state.uploadQueue.findIndex(u => u.id === upload.id);
                if (index !== -1) {
                    state.uploadQueue.splice(index, 1);
                }
                
                // Показать уведомление
                showNotification('Файл загружен', `${upload.file.name} отправлен в "${upload.chat.name}"`, 'success');
                
                // Обновить UI загрузок
                updateUploadsUI();
            }
        }, 100);
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    function updateUploadsUI() {
        // Обновить UI загрузок (например, показать прогресс в каком-то элементе)
        // В реальном приложении здесь будет обновление панели загрузок
        
        if (state.uploadQueue.length > 0) {
            const totalProgress = state.uploadQueue.reduce((sum, upload) => sum + upload.progress, 0) / state.uploadQueue.length;
            
            // Можно показать прогресс в заголовке или отдельной панели
            const uploadsBadge = document.getElementById('uploads-badge') || document.createElement('div');
            uploadsBadge.id = 'uploads-badge';
            uploadsBadge.className = 'uploads-badge';
            uploadsBadge.textContent = `📤 ${Math.round(totalProgress)}%`;
            uploadsBadge.title = `${state.uploadQueue.length} файлов загружаются`;
            
            const header = document.querySelector('.app-header');
            if (header && !header.contains(uploadsBadge)) {
                header.appendChild(uploadsBadge);
            }
        } else {
            const uploadsBadge = document.getElementById('uploads-badge');
            if (uploadsBadge) {
                uploadsBadge.remove();
            }
        }
    }
    
    function performSearch(query) {
        if (!query.trim()) {
            if (elements.searchResults) {
                elements.searchResults.classList.remove('active');
            }
            return;
        }
        
        const lowerQuery = query.toLowerCase();
        state.searchResults = {
            messages: [],
            files: [],
            contacts: []
        };
        
        // Поиск в сообщениях
        Object.entries(appData.messages).forEach(([chatId, messages]) => {
            const chat = appData.chats.find(c => c.id === chatId);
            if (chat) {
                messages.forEach(msg => {
                    if (msg.text.toLowerCase().includes(lowerQuery)) {
                        state.searchResults.messages.push({
                            chat: chat,
                            message: msg,
                            preview: msg.text.substring(0, 100) + (msg.text.length > 100 ? '...' : '')
                        });
                    }
                });
            }
        });
        
        // Поиск в файлах
        appData.files.forEach(file => {
            if (file.name.toLowerCase().includes(lowerQuery)) {
                state.searchResults.files.push(file);
            }
        });
        
        // Поиск в контактах
        appData.contacts.forEach(contact => {
            if (contact.name.toLowerCase().includes(lowerQuery) || 
                contact.username.toLowerCase().includes(lowerQuery)) {
                state.searchResults.contacts.push(contact);
            }
        });
        
        // Показать результаты
        showSearchResults();
    }
    
    function showSearchResults() {
        if (!elements.searchResults) return;
        
        const results = state.searchResults;
        const hasResults = results.messages.length > 0 || 
                          results.files.length > 0 || 
                          results.contacts.length > 0;
        
        if (!hasResults) {
            elements.searchResults.classList.remove('active');
            return;
        }
        
        elements.searchResults.classList.add('active');
        elements.searchResults.innerHTML = `
            <div class="search-results-header">
                <h4>Результаты поиска</h4>
                <button class="btn-icon close-results">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="search-results-body">
                ${results.messages.length > 0 ? `
                <div class="results-section">
                    <h5>Сообщения (${results.messages.length})</h5>
                    <div class="results-list messages-results">
                        ${results.messages.slice(0, 5).map(result => `
                            <div class="search-result-item message-result" data-chat="${result.chat.id}" data-message="${result.message.id}">
                                <div class="result-icon">
                                    <i class="fas fa-comment"></i>
                                </div>
                                <div class="result-content">
                                    <div class="result-title">${result.chat.name}</div>
                                    <div class="result-preview">${result.preview}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${results.contacts.length > 0 ? `
                <div class="results-section">
                    <h5>Контакты (${results.contacts.length})</h5>
                    <div class="results-list contacts-results">
                        ${results.contacts.slice(0, 5).map(contact => `
                            <div class="search-result-item contact-result" data-contact="${contact.id}">
                                <div class="result-avatar" style="background: ${contact.color}">
                                    ${contact.avatar}
                                </div>
                                <div class="result-content">
                                    <div class="result-title">${contact.name}</div>
                                    <div class="result-details">${contact.username}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${results.files.length > 0 ? `
                <div class="results-section">
                    <h5>Файлы (${results.files.length})</h5>
                    <div class="results-list files-results">
                        ${results.files.slice(0, 5).map(file => `
                            <div class="search-result-item file-result" data-file="${file.id}">
                                <div class="result-icon" style="color: ${file.color}">
                                    <i class="${file.icon}"></i>
                                </div>
                                <div class="result-content">
                                    <div class="result-title">${file.name}</div>
                                    <div class="result-details">${file.size} • от ${file.sender}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${results.messages.length > 5 || results.contacts.length > 5 || results.files.length > 5 ? `
                <div class="more-results">
                    <button class="btn btn-sm" id="show-all-results">
                        Показать все результаты (${results.messages.length + results.contacts.length + results.files.length})
                    </button>
                </div>
                ` : ''}
            </div>
        `;
        
        // Обработчики
        elements.searchResults.querySelector('.close-results').addEventListener('click', () => {
            elements.searchResults.classList.remove('active');
        });
        
        // Обработчики результатов
        elements.searchResults.querySelectorAll('.message-result').forEach(item => {
            item.addEventListener('click', () => {
                const chatId = item.dataset.chat;
                const messageId = parseInt(item.dataset.message);
                
                // Открыть чат и прокрутить к сообщению
                openChat(chatId);
                
                // Прокрутить к сообщению через небольшую задержку
                setTimeout(() => {
                    const messageElement = document.querySelector(`.message[data-message-id="${messageId}"]`);
                    if (messageElement) {
                        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        
                        // Подсветить сообщение
                        messageElement.classList.add('highlighted');
                        setTimeout(() => {
                            messageElement.classList.remove('highlighted');
                        }, 2000);
                    }
                }, 300);
                
                elements.searchResults.classList.remove('active');
            });
        });
        
        elements.searchResults.querySelectorAll('.contact-result').forEach(item => {
            item.addEventListener('click', () => {
                const contactId = parseInt(item.dataset.contact);
                const contact = appData.contacts.find(c => c.id === contactId);
                
                if (contact) {
                    openContactProfile(contact);
                }
                
                elements.searchResults.classList.remove('active');
            });
        });
        
        elements.searchResults.querySelectorAll('.file-result').forEach(item => {
            item.addEventListener('click', () => {
                const fileId = parseInt(item.dataset.file);
                const file = appData.files.find(f => f.id === fileId);
                
                if (file) {
                    openFilePreview(file);
                }
                
                elements.searchResults.classList.remove('active');
            });
        });
        
        if (elements.searchResults.querySelector('#show-all-results')) {
            elements.searchResults.querySelector('#show-all-results').addEventListener('click', () => {
                showFullSearchResults();
            });
        }
        
        // Анимация появления
        anime({
            targets: elements.searchResults,
            opacity: [0, 1],
            translateY: [-10, 0],
            duration: 200,
            easing: 'easeOutQuad'
        });
    }
    
    function showFullSearchResults() {
        const modal = document.createElement('div');
        modal.className = 'modal search-results-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Результаты поиска: "${state.searchQuery}"</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="search-tabs">
                        <button class="search-tab active" data-tab="messages">
                            Сообщения (${state.searchResults.messages.length})
                        </button>
                        <button class="search-tab" data-tab="contacts">
                            Контакты (${state.searchResults.contacts.length})
                        </button>
                        <button class="search-tab" data-tab="files">
                            Файлы (${state.searchResults.files.length})
                        </button>
                    </div>
                    <div class="search-content">
                        <div class="tab-content active" id="messages-tab">
                            ${state.searchResults.messages.map(result => `
                                <div class="full-result-item" data-chat="${result.chat.id}" data-message="${result.message.id}">
                                    <div class="result-avatar" style="background: ${result.chat.color}">
                                        ${result.chat.avatar}
                                    </div>
                                    <div class="result-content">
                                        <div class="result-header">
                                            <div class="result-title">${result.chat.name}</div>
                                            <div class="result-time">${result.message.time}</div>
                                        </div>
                                        <div class="result-preview">${result.message.text}</div>
                                        <div class="result-sender">${result.message.sender}</div>
                                    </div>
                                </div>
                            `).join('')}
                            ${state.searchResults.messages.length === 0 ? `
                                <div class="empty-results">
                                    <i class="fas fa-comment-slash"></i>
                                    <p>Сообщения не найдены</p>
                                </div>
                            ` : ''}
                        </div>
                        <div class="tab-content" id="contacts-tab">
                            ${state.searchResults.contacts.map(contact => `
                                <div class="full-result-item" data-contact="${contact.id}">
                                    <div class="result-avatar" style="background: ${contact.color}">
                                        ${contact.avatar}
                                    </div>
                                    <div class="result-content">
                                        <div class="result-header">
                                            <div class="result-title">${contact.name}</div>
                                            <div class="result-status ${contact.status}">${contact.activity}</div>
                                        </div>
                                        <div class="result-details">${contact.username} • ${contact.phone}</div>
                                    </div>
                                </div>
                            `).join('')}
                            ${state.searchResults.contacts.length === 0 ? `
                                <div class="empty-results">
                                    <i class="fas fa-user-slash"></i>
                                    <p>Контакты не найдены</p>
                                </div>
                            ` : ''}
                        </div>
                        <div class="tab-content" id="files-tab">
                            ${state.searchResults.files.map(file => `
                                <div class="full-result-item" data-file="${file.id}">
                                    <div class="result-icon" style="color: ${file.color}">
                                        <i class="${file.icon}"></i>
                                    </div>
                                    <div class="result-content">
                                        <div class="result-header">
                                            <div class="result-title">${file.name}</div>
                                            <div class="result-size">${file.size}</div>
                                        </div>
                                        <div class="result-details">от ${file.sender} • ${file.time} • ${getNodeName(file.node)}</div>
                                    </div>
                                </div>
                            `).join('')}
                            ${state.searchResults.files.length === 0 ? `
                                <div class="empty-results">
                                    <i class="fas fa-file-slash"></i>
                                    <p>Файлы не найдены</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" id="close-search-modal">Закрыть</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Обработчики вкладок
        modal.querySelectorAll('.search-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                
                // Активировать вкладку
                modal.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
                modal.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                e.currentTarget.classList.add('active');
                document.getElementById(`${tabName}-tab`).classList.add('active');
            });
        });
        
        // Обработчики результатов (аналогично быстрым результатам)
        modal.querySelectorAll('.full-result-item[data-chat]').forEach(item => {
            item.addEventListener('click', () => {
                const chatId = item.dataset.chat;
                const messageId = parseInt(item.dataset.message);
                
                openChat(chatId);
                
                setTimeout(() => {
                    const messageElement = document.querySelector(`.message[data-message-id="${messageId}"]`);
                    if (messageElement) {
                        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        messageElement.classList.add('highlighted');
                        setTimeout(() => {
                            messageElement.classList.remove('highlighted');
                        }, 2000);
                    }
                }, 300);
                
                modal.remove();
            });
        });
        
        modal.querySelectorAll('.full-result-item[data-contact]').forEach(item => {
            item.addEventListener('click', () => {
                const contactId = parseInt(item.dataset.contact);
                const contact = appData.contacts.find(c => c.id === contactId);
                
                if (contact) {
                    openContactProfile(contact);
                }
                
                modal.remove();
            });
        });
        
        modal.querySelectorAll('.full-result-item[data-file]').forEach(item => {
            item.addEventListener('click', () => {
                const fileId = parseInt(item.dataset.file);
                const file = appData.files.find(f => f.id === fileId);
                
                if (file) {
                    openFilePreview(file);
                }
                
                modal.remove();
            });
        });
        
        // Обработчики закрытия
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('#close-search-modal').addEventListener('click', () => modal.remove());
        
        // Анимация
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    // ========== ЗАПУСК ПРИЛОЖЕНИЯ ==========
    console.log('🚀 Инициализация системы входа...');
    
    // Сначала инициализируем систему входа
    initLoginSystem();
    
    // Экспорт для отладки
    window.appData = appData;
    window.state = state;
    window.elements = elements;
    window.app = {
        switchNode,
        openChat,
        sendMessage,
        showNotification,
        startConference,
        setTheme,
        renderChats,
        renderContacts,
        renderNodes
    };
    
    console.log('✅ Telegram Nodes инициализирован!');
});
