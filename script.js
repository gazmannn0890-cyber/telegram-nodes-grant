// Telegram Nodes - Полностью рабочая версия
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Telegram Nodes запускается...');
    
    // ========== КОНФИГУРАЦИЯ ==========
    const config = {
        appName: 'Telegram Nodes',
        version: '2.0',
        developer: 'Газман',
        defaultTheme: 'dark',
        features: {
            nodes: true,
            chats: true,
            calls: false,
            games: true,
            notifications: true
        }
    };
    
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
                },
                {
                    id: 4,
                    sender: 'Вы',
                    text: 'Завтра к 15:00 будет готово. Сделаем презентацию для всей команды.',
                    time: '12:28',
                    type: 'outgoing',
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
                },
                {
                    id: 3,
                    sender: 'Павел Дуров',
                    text: 'Отличная идея! Узлы - это то, что нужно для организации чатов.',
                    time: '10:15',
                    type: 'incoming',
                    status: 'read',
                    verified: true
                },
                {
                    id: 4,
                    sender: 'Павел Дуров',
                    text: 'Новый функционал выглядит отлично! Жду релиза.',
                    time: '10:30',
                    type: 'incoming',
                    status: 'read',
                    verified: true
                }
            ],
            'cs2-tournament': [
                {
                    id: 1,
                    sender: 'Дмитрий',
                    text: 'Ребята, все готовы к турниру? Команды уже формируются!',
                    time: '14:20',
                    type: 'incoming',
                    status: 'read'
                },
                {
                    id: 2,
                    sender: 'Вы',
                    text: 'Да, наша команда готова. Ждём расписание матчей.',
                    time: '14:25',
                    type: 'outgoing',
                    status: 'read'
                },
                {
                    id: 3,
                    sender: 'Алексей',
                    text: 'У меня есть предложение по стратегии, обсудим перед игрой?',
                    time: '14:30',
                    type: 'incoming',
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
        isTyping: false
    };
    
    // ========== DOM ЭЛЕМЕНТЫ ==========
    const elements = {
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
        
        // Профиль
        profileCard: document.getElementById('profile-card'),
        profileMenuBtn: document.getElementById('profile-menu-btn'),
        
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
        
        // Фильтры и сортировка
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
        
        // Уведомления
        notificationsContainer: document.getElementById('notifications-container'),
        
        // Модальные окна
        modalOverlay: document.getElementById('modal-overlay'),
        newChatModal: document.getElementById('new-chat-modal')
    };
    
    // ========== ИНИЦИАЛИЗАЦИЯ ==========
    function init() {
        console.log('🎯 Инициализация Telegram Nodes...');
        
        // Установка темы
        setTheme(state.theme);
        
        // Загрузка прелоадера
        simulatePreloader();
        
        // Рендер данных
        renderProfile();
        renderNodes();
        renderContacts();
        renderActivity();
        updateCurrentNode();
        renderChats();
        
        // Настройка обработчиков событий
        setupEventListeners();
        
        // Показать приветственное уведомление
        setTimeout(() => {
            showNotification('Добро пожаловать, Газман!', 'Telegram Nodes готов к работе', 'success');
        }, 1500);
        
        // Симулировать активность
        simulateActivity();
    }
    
    // ========== ФУНКЦИИ ПРЕЛОАДЕРА ==========
    function simulatePreloader() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            elements.progressFill.style.width = `${progress}%`;
            
            // Обновление статистики
            if (progress >= 25) {
                elements.statChats.textContent = appData.user.stats.chats;
            }
            if (progress >= 50) {
                elements.statNodes.textContent = appData.user.stats.nodes;
            }
            if (progress >= 75) {
                elements.statOnline.textContent = appData.user.stats.online;
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
    
    // ========== РЕНДЕР ФУНКЦИИ ==========
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
    
    function renderNodes() {
        const container = elements.nodesList;
        if (!container) return;
        
        container.innerHTML = '';
        
        appData.nodes.forEach(node => {
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
            
            nodeElement.addEventListener('click', () => switchNode(node.id));
            container.appendChild(nodeElement);
        });
    }
    
    function renderContacts() {
        const container = elements.contactsList;
        if (!container) return;
        
        container.innerHTML = '';
        
        appData.contacts.forEach(contact => {
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
            
            contactElement.addEventListener('click', () => showNotification(contact.name, 'Открыть чат с контактом', 'info'));
            container.appendChild(contactElement);
        });
    }
    
    function renderActivity() {
        const container = elements.activityList;
        if (!container) return;
        
        container.innerHTML = '';
        
        appData.activity.forEach(activity => {
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
        
        if (icon) {
            icon.innerHTML = `<i class="${node.icon}"></i>`;
            icon.style.background = `linear-gradient(135deg, ${node.color}, ${node.color}dd)`;
        }
        if (name) name.textContent = node.name;
        if (description) description.textContent = `${node.members} участников • ${node.online} онлайн`;
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
            
            // Фильтр по типу
            switch (state.currentFilter) {
                case 'unread':
                    return chat.unread > 0;
                case 'personal':
                    return chat.type === 'personal';
                case 'group':
                    return chat.type === 'group';
                case 'channel':
                    return chat.type === 'channel';
                default:
                    return true;
            }
        });
        
        // Сортировка
        filteredChats.sort((a, b) => {
            if (state.currentSort === 'unread') {
                return b.unread - a.unread;
            } else {
                // Сортировка по времени (простая имитация)
                const timeOrder = { '12:30': 1, '11:45': 2, '10:30': 3, 'Пт': 4, 'Вчера': 5, '09:15': 6 };
                return (timeOrder[a.time] || 99) - (timeOrder[b.time] || 99);
            }
        });
        
        container.innerHTML = '';
        
        if (filteredChats.length === 0) {
            emptyState.classList.add('active');
            return;
        }
        
        emptyState.classList.remove('active');
        
        filteredChats.forEach(chat => {
            const chatCard = document.createElement('div');
            chatCard.className = 'chat-card';
            chatCard.dataset.chatId = chat.id;
            
            // Создание миниатюр участников
            const memberAvatars = Array.from(
                { length: Math.min(3, chat.members) }, 
                (_, i) => `<div class="member-avatar">${i + 1}</div>`
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
                        ${chat.pinned ? '<i class="fas fa-thumbtack" style="color: #ff9500; margin-right: 8px;"></i>' : ''}
                        ${chat.unread > 0 ? `<span class="unread-badge">${chat.unread}</span>` : ''}
                    </div>
                </div>
            `;
            
            chatCard.addEventListener('click', () => openChat(chat.id));
            container.appendChild(chatCard);
        });
    }
    
    // ========== ФУНКЦИИ ЧАТА ==========
    function openChat(chatId) {
        const chat = appData.chats.find(c => c.id === chatId);
        if (!chat) return;
        
        state.activeChat = chatId;
        
        // Обновить UI
        elements.mainContent.style.display = 'none';
        elements.chatPanel.classList.add('active');
        
        // Обновить информацию о чате
        elements.chatAvatar.textContent = chat.avatar;
        elements.chatAvatar.style.background = chat.color;
        elements.chatTitle.textContent = chat.name;
        elements.chatStatus.textContent = `${chat.members} участников • ${chat.online} онлайн`;
        
        // Загрузить сообщения
        loadMessages(chatId);
        
        // Сбросить непрочитанные
        chat.unread = 0;
        renderChats();
        
        // Фокус на поле ввода
        setTimeout(() => {
            elements.messageInput.focus();
        }, 100);
        
        showNotification(`Чат "${chat.name}"`, 'Чат открыт', 'info');
    }
    
    function closeChat() {
        state.activeChat = null;
        elements.chatPanel.classList.remove('active');
        elements.mainContent.style.display = 'flex';
        elements.messageInput.value = '';
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
        container.appendChild(dateElement);
        
        messages.forEach(msg => {
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
        });
        
        // Прокрутить вниз
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
    }
    
    function sendMessage() {
        const input = elements.messageInput;
        if (!input || !input.value.trim() || !state.activeChat) return;
        
        const text = input.value.trim();
        const chatId = state.activeChat;
        const container = elements.messagesContainer;
        
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
        
        // Добавить в данные (если есть массив сообщений для этого чата)
        if (appData.messages[chatId]) {
            appData.messages[chatId].push(userMessage);
        }
        
        // Прокрутить вниз
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
        
        // Симулировать ответ через 1-3 секунды
        setTimeout(() => {
            simulateReply(chatId);
        }, 1000 + Math.random() * 2000);
        
        // Обновить список чатов
        updateChatPreview(chatId, text);
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
        if (appData.messages[chatId]) {
            appData.messages[chatId].push(replyMessage);
        }
        
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
    
    function updateChatPreview(chatId, lastMessage) {
        const chat = appData.chats.find(c => c.id === chatId);
        if (chat) {
            chat.lastMessage = lastMessage;
            chat.time = getCurrentTime();
            renderChats();
        }
    }
    
    // ========== ФУНКЦИИ УЗЛОВ ==========
    function switchNode(nodeId) {
        state.activeNode = nodeId;
        
        // Обновить активный класс
        document.querySelectorAll('.node-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.node === nodeId) {
                item.classList.add('active');
            }
        });
        
        // Обновить текущий узел в хедере
        updateCurrentNode();
        
        // Перерисовать чаты
        renderChats();
        
        // Показать уведомление
        const node = appData.nodes.find(n => n.id === nodeId);
        if (node) {
            showNotification(`Узел "${node.name}"`, node.description, 'info');
        }
    }
    
    // ========== ФУНКЦИИ ТЕМЫ ==========
    function setTheme(theme) {
        state.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Обновить иконку
        const icon = elements.themeToggle?.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    function toggleTheme() {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        showNotification('Тема изменена', `Переключено на ${newTheme === 'dark' ? 'тёмную' : 'светлую'} тему`, 'info');
    }
    
    // ========== УВЕДОМЛЕНИЯ ==========
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
    
    // ========== ПОИСК ==========
    function handleSearch() {
        state.searchQuery = elements.globalSearch.value.trim();
        renderChats();
        
        // Показать/скрыть кнопку очистки
        if (elements.searchClear) {
            if (state.searchQuery) {
                elements.searchClear.style.display = 'flex';
            } else {
                elements.searchClear.style.display = 'none';
            }
        }
    }
    
    function clearSearch() {
        elements.globalSearch.value = '';
        state.searchQuery = '';
        renderChats();
        elements.searchClear.style.display = 'none';
    }
    
    // ========== ФИЛЬТРЫ И СОРТИРОВКА ==========
    function setupFilters() {
        elements.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Убрать активный класс у всех
                elements.filterButtons.forEach(b => b.classList.remove('active'));
                // Добавить активный класс нажатой кнопке
                btn.classList.add('active');
                // Обновить фильтр
                state.currentFilter = btn.textContent.toLowerCase();
                if (state.currentFilter === 'ещё') state.currentFilter = 'all';
                // Перерисовать чаты
                renderChats();
            });
        });
        
        elements.sortButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Убрать активный класс у всех
                elements.sortButtons.forEach(b => b.classList.remove('active'));
                // Добавить активный класс нажатой кнопке
                btn.classList.add('active');
                // Обновить сортировку
                state.currentSort = btn.dataset.sort;
                // Перерисовать чаты
                renderChats();
            });
        });
    }
    
    // ========== СИМУЛЯЦИЯ АКТИВНОСТИ ==========
    function simulateActivity() {
        // Случайные уведомления
        const notifications = [
            { title: 'Павел Дуров онлайн', message: 'Только что зашел в сеть', type: 'info' },
            { title: 'Новое сообщение', message: 'У вас 3 новых сообщения', type: 'info' },
            { title: 'CS2 Турнир', message: 'Регистрация заканчивается через 2 дня', type: 'warning' },
            { title: 'Система', message: 'Все компоненты работают стабильно', type: 'success' }
        ];
        
        // Показать случайное уведомление каждые 30-60 секунд
        setInterval(() => {
            const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
            showNotification(randomNotif.title, randomNotif.message, randomNotif.type);
        }, 30000 + Math.random() * 30000);
        
        // Обновить статус "печатает" каждые 2-3 минуты
        setInterval(() => {
            const randomContact = appData.contacts[Math.floor(Math.random() * appData.contacts.length)];
            if (randomContact.status !== 'offline') {
                randomContact.status = 'typing';
                randomContact.lastSeen = 'печатает...';
                renderContacts();
                
                // Вернуть статус через 10 секунд
                setTimeout(() => {
                    randomContact.status = 'online';
                    randomContact.lastSeen = 'только что';
                    renderContacts();
                }, 10000);
            }
        }, 120000 + Math.random() * 60000);
    }
    
    // ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========
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
                }
            });
        }
        
        // Кнопка закрытия чата
        if (elements.closeChatBtn) {
            elements.closeChatBtn.addEventListener('click', closeChat);
        }
        
        // Тема
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', toggleTheme);
        }
        
        // Уведомления
        if (elements.notificationsBtn) {
            elements.notificationsBtn.addEventListener('click', () => {
                showNotification('Уведомления', 'У вас 3 новых уведомления', 'info');
            });
        }
        
        // Новый чат
        if (elements.newChatBtn) {
            elements.newChatBtn.addEventListener('click', () => {
                showNotification('Новый чат', 'Выберите контакты для начала разговора', 'info');
            });
        }
        
        if (elements.startChatBtn) {
            elements.startChatBtn.addEventListener('click', () => {
                showNotification('Новый чат', 'Выберите контакты для начала разговора', 'info');
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
            
            // Авторазмер textarea
            elements.messageInput.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
        }
        
        // Обновление активности
        if (elements.refreshActivityBtn) {
            elements.refreshActivityBtn.addEventListener('click', () => {
                renderActivity();
                showNotification('Активность', 'Список активности обновлен', 'info');
            });
        }
        
        // Фильтры и сортировка
        setupFilters();
        
        // Клик вне элементов
        document.addEventListener('click', (e) => {
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
        window.addEventListener('resize', handleResize);
        handleResize();
    }
    
    function handleResize() {
        state.isSidebarVisible = window.innerWidth > 768;
        if (elements.sidebar) {
            if (state.isSidebarVisible) {
                elements.sidebar.style.left = '0';
            } else {
                elements.sidebar.style.left = '-100%';
            }
        }
    }
    
    // ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
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
    
    // ========== ГЛОБАЛЬНЫЕ ФУНКЦИИ ==========
    window.TelegramNodes = {
        // Основные функции
        openChat: openChat,
        closeChat: closeChat,
        switchNode: switchNode,
        toggleTheme: toggleTheme,
        showNotification: showNotification,
        
        // Данные
        getAppData: () => appData,
        getState: () => state,
        
        // Тестовые функции
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
            console.log('TelegramNodes.getAppData() - получить все данные');
            console.log('TelegramNodes.getState() - получить состояние');
            console.log('TelegramNodes.test() - тестовая команда');
            console.log('TelegramNodes.help() - эта справка');
        }
    };
    
    // ========== ЗАПУСК ==========
    try {
        init();
        console.log('✅ Telegram Nodes успешно запущен!');
        console.log('👤 Пользователь:', appData.user.name);
        console.log('📱 Узлов:', appData.nodes.length);
        console.log('💬 Чатов:', appData.chats.length);
        console.log('🔧 Версия:', config.version);
        
        // Показать справку в консоли
        setTimeout(() => {
            console.log('💡 Используйте TelegramNodes.help() для списка команд');
        }, 2000);
        
    } catch (error) {
        console.error('❌ Ошибка запуска:', error);
        showNotification('Ошибка запуска', error.message, 'error');
    }
});
