// Telegram Nodes - Расширенный функциональный скрипт
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Загрузка Telegram Nodes...');
    
    // ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
    let currentView = 'grid'; // 'grid' или 'list'
    let currentTheme = 'dark';
    let currentChat = null;
    let currentCall = null;
    let currentConference = null;
    let callTimer = null;
    let callDuration = 0;
    
    // Конфигурация узлов
    const nodes = {
        alpha: {
            name: 'AlphaTeam',
            color: 'linear-gradient(135deg, #0088cc, #0055aa)',
            icon: 'fas fa-briefcase',
            members: 24,
            description: 'Рабочая команда разработки',
            chats: ['design', 'reports', 'planning', 'backend', 'frontend']
        },
        game: {
            name: 'GameZone',
            color: 'linear-gradient(135deg, #af52de, #7d3cff)',
            icon: 'fas fa-gamepad',
            members: 48,
            description: 'Игровое сообщество',
            chats: ['tournament', 'stream', 'team', 'news', 'lfg']
        },
        family: {
            name: 'FamilyHub',
            color: 'linear-gradient(135deg, #34c759, #2a8c4a)',
            icon: 'fas fa-home',
            members: 12,
            description: 'Семейный чат',
            chats: ['family', 'parents', 'kids', 'vacation']
        },
        work: {
            name: 'WorkSpace',
            color: 'linear-gradient(135deg, #ff9500, #ff5500)',
            icon: 'fas fa-code',
            members: 36,
            description: 'Фриланс проекты',
            chats: ['clients', 'invoices', 'projects', 'meetings']
        },
        study: {
            name: 'StudyHub',
            color: 'linear-gradient(135deg, #5ac8fa, #2a7fff)',
            icon: 'fas fa-graduation-cap',
            members: 32,
            description: 'Образовательный центр',
            chats: ['courses', 'homework', 'exams', 'resources']
        }
    };
    
    // Контакты
    const contacts = [
        { id: 1, name: 'Алексей', avatar: 'А', color: '#0088cc', status: 'online', role: 'Team Lead' },
        { id: 2, name: 'Мария', avatar: 'М', color: '#af52de', status: 'online', role: 'Designer' },
        { id: 3, name: 'Дмитрий', avatar: 'Д', color: '#34c759', status: 'away', role: 'Developer' },
        { id: 4, name: 'Анна', avatar: 'А', color: '#ff9500', status: 'offline', role: 'PM' },
        { id: 5, name: 'Сергей', avatar: 'С', color: '#5ac8fa', status: 'online', role: 'DevOps' },
        { id: 6, name: 'Елена', avatar: 'Е', color: '#ff2d55', status: 'online', role: 'QA' },
        { id: 7, name: 'Иван', avatar: 'И', color: '#5856d6', status: 'away', role: 'Frontend' },
        { id: 8, name: 'Ольга', avatar: 'О', color: '#ff9500', status: 'online', role: 'Backend' }
    ];
    
    // Чаты
    const chats = {
        design: {
            id: 'design',
            name: 'Дизайн-команда',
            node: 'alpha',
            type: 'group',
            lastMessage: 'Обсуждаем новый UI для Nodes...',
            time: '12:30',
            unread: 3,
            pinned: true,
            members: ['Алексей', 'Мария', 'Дмитрий', 'Анна'],
            avatar: 'Д',
            color: '#0088cc'
        },
        reports: {
            id: 'reports',
            name: 'Отчеты Q3',
            node: 'alpha',
            type: 'channel',
            lastMessage: 'Все отчеты готовы к отправке',
            time: 'Пт',
            unread: 0,
            pinned: false,
            members: ['Алексей', 'Сергей'],
            avatar: 'О',
            color: '#0088cc'
        },
        tournament: {
            id: 'tournament',
            name: 'Киберспорт турнир',
            node: 'game',
            type: 'group',
            lastMessage: 'Стартуем в 20:00, не опаздывайте!',
            time: '11:45',
            unread: 0,
            pinned: true,
            members: ['Дмитрий', 'Иван', 'Ольга'],
            avatar: 'К',
            color: '#af52de'
        },
        family: {
            id: 'family',
            name: 'Семейный чат',
            node: 'family',
            type: 'group',
            lastMessage: 'Мама: Приезжайте в воскресенье',
            time: 'Вчера',
            unread: 1,
            pinned: true,
            members: ['Анна', 'Елена', 'Иван'],
            avatar: 'С',
            color: '#34c759'
        },
        planning: {
            id: 'planning',
            name: 'Планирование спринта',
            node: 'alpha',
            type: 'group',
            lastMessage: 'Дедлайн - следующая пятница',
            time: '10:20',
            unread: 5,
            pinned: false,
            members: ['Алексей', 'Мария', 'Дмитрий', 'Сергей', 'Елена'],
            avatar: 'П',
            color: '#0088cc'
        },
        stream: {
            id: 'stream',
            name: 'Стрим трансляция',
            node: 'game',
            type: 'channel',
            lastMessage: 'Начинаем через 15 минут!',
            time: 'Сейчас',
            unread: 12,
            pinned: false,
            members: ['Дмитрий', 'Иван'],
            avatar: 'С',
            color: '#af52de'
        },
        clients: {
            id: 'clients',
            name: 'Общение с клиентами',
            node: 'work',
            type: 'group',
            lastMessage: 'Новый проект на 5000$',
            time: '09:15',
            unread: 0,
            pinned: true,
            members: ['Алексей', 'Мария'],
            avatar: 'К',
            color: '#ff9500'
        },
        courses: {
            id: 'courses',
            name: 'Онлайн курсы',
            node: 'study',
            type: 'channel',
            lastMessage: 'Новый урок по JavaScript',
            time: '08:30',
            unread: 2,
            pinned: false,
            members: ['Дмитрий', 'Ольга', 'Елена'],
            avatar: 'К',
            color: '#5ac8fa'
        }
    };
    
    // Сообщения для чатов
    const messages = {
        design: [
            { id: 1, sender: 'Мария', text: 'Привет! Как продвигается работа над новым дизайном?', time: '12:15', type: 'incoming' },
            { id: 2, sender: 'Вы', text: 'Почти закончили! Осталось сделать анимации переходов', time: '12:20', type: 'outgoing' },
            { id: 3, sender: 'Алексей', text: 'Отлично! Когда сможете показать прототип?', time: '12:25', type: 'incoming' },
            { id: 4, sender: 'Вы', text: 'Сегодня к вечеру. Добавили тёмную тему и адаптив', time: '12:30', type: 'outgoing' },
            { id: 5, sender: 'Дмитрий', text: 'Супер! Жду не дождусь посмотреть', time: '12:35', type: 'incoming' }
        ],
        family: [
            { id: 1, sender: 'Мама', text: 'Приезжайте в воскресенье на обед', time: 'Вчера 18:30', type: 'incoming' },
            { id: 2, sender: 'Вы', text: 'Хорошо, во сколько приходить?', time: 'Вчера 19:15', type: 'outgoing' },
            { id: 3, sender: 'Папа', text: 'К 14:00. Готовлю шашлык!', time: 'Вчера 19:45', type: 'incoming' },
            { id: 4, sender: 'Сестра', text: 'Я тоже буду с детьми', time: 'Сегодня 10:20', type: 'incoming' }
        ],
        tournament: [
            { id: 1, sender: 'Админ', text: 'Турнир начнётся в 20:00 по МСК', time: '11:30', type: 'incoming' },
            { id: 2, sender: 'Игрок1', text: 'Готовы разорвать всех!', time: '11:35', type: 'incoming' },
            { id: 3, sender: 'Вы', text: 'Наша команда в сборе', time: '11:40', type: 'outgoing' },
            { id: 4, sender: 'Админ', text: 'Призовой фонд - 1000$', time: '11:45', type: 'incoming' }
        ]
    };
    
    // ===== КЭШ ЭЛЕМЕНТОВ =====
    const elements = {
        // Основные панели
        sidePanel: document.querySelector('.side-panel'),
        mainContent: document.querySelector('.main-content'),
        chatPanel: document.querySelector('.chat-panel'),
        contactsPanel: document.querySelector('.contacts-panel'),
        settingsPanel: document.querySelector('.settings-panel'),
        callScreen: document.querySelector('.call-screen'),
        conferenceScreen: document.querySelector('.conference-screen'),
        
        // Навигация
        backBtn: document.querySelector('.back-btn'),
        backToList: document.querySelector('.back-to-list'),
        
        // Узлы
        nodeItems: document.querySelectorAll('.node-item'),
        currentNodeAvatar: document.querySelector('.current-node-avatar'),
        currentNodeTitle: document.querySelector('.node-details h2'),
        currentNodeDesc: document.querySelector('.node-details p'),
        
        // Чаты
        chatList: document.querySelector('.chat-list'),
        chatItems: document.querySelectorAll('.chat-item'),
        
        // Сообщения
        messagesContainer: document.querySelector('.messages-container'),
        messageInput: document.querySelector('.message-input'),
        sendBtn: document.querySelector('.send-btn'),
        
        // Поиск и фильтры
        searchInput: document.querySelector('.search-bar input'),
        filterBtns: document.querySelectorAll('.filter-btn'),
        viewBtns: document.querySelectorAll('.view-btn'),
        
        // Звонки
        callAvatar: document.querySelector('.call-avatar'),
        callName: document.querySelector('.call-info h2'),
        callStatus: document.querySelector('.call-status'),
        callTimer: document.querySelector('.call-timer'),
        callControls: document.querySelectorAll('.call-control-btn'),
        
        // Конференция
        conferenceGrid: document.querySelector('.conference-grid'),
        
        // Плавающие кнопки
        floatingBtns: document.querySelectorAll('.floating-btn'),
        themeToggle: document.querySelector('.theme-switch'),
        
        // Уведомления
        notificationCenter: document.querySelector('.notification-center')
    };
    
    // ===== ИНИЦИАЛИЗАЦИЯ =====
    function init() {
        console.log('🎮 Инициализация приложения...');
        
        // Создаем фоновые элементы
        createBackgroundParticles();
        
        // Загружаем сохраненные настройки
        loadSettings();
        
        // Инициализируем интерфейс
        initUI();
        
        // Настраиваем обработчики
        setupEventListeners();
        
        // Запускаем обновления
        startUpdates();
        
        // Показываем приветственное уведомление
        setTimeout(() => {
            showNotification('Добро пожаловать в Telegram Nodes!', 'Доступны все функции: чаты, звонки, конференции.', 'success');
        }, 1000);
        
        // Консольные команды
        setupConsoleCommands();
        
        console.log('✅ Приложение успешно запущено!');
    }
    
    // ===== UI ИНИЦИАЛИЗАЦИЯ =====
    function initUI() {
        // Обновляем информацию о текущем узле
        updateCurrentNode('alpha');
        
        // Рендерим список чатов
        renderChatList();
        
        // Создаем фоновые анимации
        createAnimations();
    }
    
    function createBackgroundParticles() {
        const bgContainer = document.querySelector('.bg-elements');
        if (!bgContainer) return;
        
        // Создаем частицы
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'bg-particle';
            
            // Случайные параметры
            const size = Math.random() * 100 + 50;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const color = i % 3 === 0 ? 'var(--tg-accent)' : 
                          i % 3 === 1 ? 'var(--tg-purple)' : 'var(--tg-cyan)';
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.background = color;
            particle.style.opacity = `${Math.random() * 0.1 + 0.05}`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            // Анимация движения
            particle.style.animation = `float ${10 + Math.random() * 20}s infinite ease-in-out`;
            
            bgContainer.appendChild(particle);
        }
    }
    
    function createAnimations() {
        // Анимация появления элементов
        const animatedElements = document.querySelectorAll('.chat-item, .node-item, .account-item');
        animatedElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.05}s`;
            el.style.animation = 'slideIn 0.5s ease backwards';
        });
    }
    
    // ===== УПРАВЛЕНИЕ УЗЛАМИ =====
    function updateCurrentNode(nodeId) {
        const node = nodes[nodeId];
        if (!node) return;
        
        // Обновляем аватар
        if (elements.currentNodeAvatar) {
            elements.currentNodeAvatar.style.background = node.color;
            elements.currentNodeAvatar.innerHTML = `<i class="${node.icon}"></i>`;
        }
        
        // Обновляем текст
        if (elements.currentNodeTitle) {
            elements.currentNodeTitle.textContent = node.name;
        }
        
        if (elements.currentNodeDesc) {
            elements.currentNodeDesc.innerHTML = `
                <i class="fas fa-users"></i> ${node.members} участников
                <span class="node-members">${node.description}</span>
            `;
        }
        
        // Обновляем активный элемент
        elements.nodeItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.node === nodeId) {
                item.classList.add('active');
            }
        });
        
        // Фильтруем чаты по узлу
        filterChatsByNode(nodeId);
        
        // Показываем уведомление
        showNotification(`Переключен на ${node.name}`, `Доступно чатов: ${node.chats.length}`, 'info');
    }
    
    function filterChatsByNode(nodeId) {
        const chatItems = document.querySelectorAll('.chat-item');
        chatItems.forEach(item => {
            const chatNode = item.dataset.node;
            if (chatNode === nodeId) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Сбрасываем фильтры
        elements.filterBtns.forEach(btn => btn.classList.remove('active'));
        elements.filterBtns[0].classList.add('active');
    }
    
    // ===== УПРАВЛЕНИЕ ЧАТАМИ =====
    function renderChatList() {
        const chatList = elements.chatList;
        if (!chatList) return;
        
        chatList.innerHTML = '';
        
        Object.values(chats).forEach(chat => {
            const chatElement = document.createElement('div');
            chatElement.className = 'chat-item';
            chatElement.dataset.chat = chat.id;
            chatElement.dataset.node = chat.node;
            
            const node = nodes[chat.node];
            const nodeColor = node ? node.color : '#0088cc';
            
            chatElement.innerHTML = `
                <div class="chat-header">
                    <div class="chat-avatar" data-node="${chat.node}" style="background: ${chat.color}">
                        ${chat.avatar}
                    </div>
                    <div class="chat-title">
                        <h3>
                            ${chat.name}
                            <span class="chat-type">${chat.type === 'group' ? 'Группа' : 'Канал'}</span>
                        </h3>
                        <div class="chat-time">${chat.time}</div>
                    </div>
                </div>
                <p class="chat-preview">${chat.lastMessage}</p>
                <div class="chat-stats">
                    <div class="chat-members">
                        <div class="member-avatars">
                            ${chat.members.slice(0, 3).map(member => `
                                <div class="member-avatar" title="${member}">${member.charAt(0)}</div>
                            `).join('')}
                            ${chat.members.length > 3 ? `
                                <div class="member-avatar">+${chat.members.length - 3}</div>
                            ` : ''}
                        </div>
                        <span>${chat.members.length} участников</span>
                    </div>
                    <div class="chat-activity">
                        ${chat.pinned ? '<i class="fas fa-thumbtack pinned-badge"></i>' : ''}
                        ${chat.unread > 0 ? `<span class="unread-count">${chat.unread}</span>` : ''}
                    </div>
                </div>
            `;
            
            chatList.appendChild(chatElement);
        });
        
        // Добавляем обработчики
        document.querySelectorAll('.chat-item').forEach(item => {
            item.addEventListener('click', () => openChat(item.dataset.chat));
        });
    }
    
    function openChat(chatId) {
        const chat = chats[chatId];
        if (!chat) return;
        
        currentChat = chatId;
        
        // Скрываем главный контент
        elements.mainContent.style.display = 'none';
        
        // Показываем панель чата
        elements.chatPanel.classList.add('active');
        
        // Обновляем заголовок
        const chatAvatar = elements.chatPanel.querySelector('.chat-panel-avatar');
        const chatTitle = elements.chatPanel.querySelector('.chat-panel-info h2');
        const chatInfo = elements.chatPanel.querySelector('.chat-panel-info p');
        
        if (chatAvatar) {
            chatAvatar.style.background = chat.color;
            chatAvatar.textContent = chat.avatar;
        }
        
        if (chatTitle) {
            chatTitle.textContent = chat.name;
        }
        
        if (chatInfo) {
            chatInfo.innerHTML = `
                <i class="fas fa-users"></i> ${chat.members.length} участников
                <i class="fas fa-circle" style="color: ${chat.type === 'group' ? '#34c759' : '#ff9500'}"></i>
                ${chat.type === 'group' ? 'Группа' : 'Канал'}
            `;
        }
        
        // Загружаем сообщения
        loadMessages(chatId);
        
        // Сбрасываем счетчик непрочитанных
        chat.unread = 0;
        updateChatBadge(chatId);
        
        // Показываем уведомление
        showNotification(`Открыт чат: ${chat.name}`, 'Можно начинать общение', 'info');
    }
    
    function loadMessages(chatId) {
        const container = elements.messagesContainer;
        if (!container) return;
        
        container.innerHTML = '';
        
        // Добавляем дату
        const dateDiv = document.createElement('div');
        dateDiv.className = 'message-date';
        dateDiv.innerHTML = '<span>Сегодня</span>';
        container.appendChild(dateDiv);
        
        // Загружаем сообщения
        const chatMessages = messages[chatId] || [];
        chatMessages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.type} ${msg.id === chatMessages.length ? 'new' : ''}`;
            
            if (msg.type === 'incoming') {
                messageDiv.innerHTML = `
                    <div class="message-avatar">
                        <div class="avatar" style="background: ${getUserColor(msg.sender)}">${msg.sender.charAt(0)}</div>
                    </div>
                    <div class="message-content">
                        <div class="message-sender">${msg.sender}</div>
                        <div class="message-text">${msg.text}</div>
                        <div class="message-time">${msg.time}</div>
                    </div>
                `;
            } else {
                messageDiv.innerHTML = `
                    <div class="message-content">
                        <div class="message-text">${msg.text}</div>
                        <div class="message-time">
                            ${msg.time}
                            <span class="message-status"><i class="fas fa-check-double"></i></span>
                        </div>
                    </div>
                `;
            }
            
            container.appendChild(messageDiv);
        });
        
        // Прокручиваем вниз
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
    }
    
    function sendMessage() {
        const input = elements.messageInput;
        if (!input || !input.value.trim()) return;
        
        const messageText = input.value.trim();
        const chatId = currentChat;
        
        if (!chatId) return;
        
        // Добавляем сообщение в UI
        const container = elements.messagesContainer;
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message outgoing new';
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${messageText}</div>
                <div class="message-time">
                    ${getCurrentTime()}
                    <span class="message-status"><i class="fas fa-check"></i></span>
                </div>
            </div>
        `;
        
        container.appendChild(messageDiv);
        
        // Очищаем поле ввода
        input.value = '';
        
        // Прокручиваем вниз
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
        
        // Имитируем ответ через 1-3 секунды
        setTimeout(() => {
            simulateReply(chatId);
        }, 1000 + Math.random() * 2000);
        
        // Логирование
        console.log(`💬 Сообщение отправлено в ${chatId}: ${messageText}`);
    }
    
    function simulateReply(chatId) {
        const replies = [
            'Понял!',
            'Интересно...',
            'Согласен с тобой',
            'Дай подумать',
            'Можешь подробнее?',
            'Отличная идея!',
            'Сделаю в ближайшее время',
            'Давай обсудим завтра'
        ];
        
        const senders = ['Алексей', 'Мария', 'Дмитрий', 'Анна', 'Сергей'];
        const randomSender = senders[Math.floor(Math.random() * senders.length)];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        const container = elements.messagesContainer;
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message incoming new';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <div class="avatar" style="background: ${getUserColor(randomSender)}">${randomSender.charAt(0)}</div>
            </div>
            <div class="message-content">
                <div class="message-sender">${randomSender}</div>
                <div class="message-text">${randomReply}</div>
                <div class="message-time">${getCurrentTime()}</div>
            </div>
        `;
        
        container.appendChild(messageDiv);
        
        // Прокручиваем вниз
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
    }
    
    function closeChat() {
        elements.mainContent.style.display = 'flex';
        elements.chatPanel.classList.remove('active');
        currentChat = null;
    }
    
    // ===== СИСТЕМА ЗВОНКОВ =====
    function startCall(contactId, type = 'audio') {
        const contact = contacts.find(c => c.id == contactId);
        if (!contact) return;
        
        // Останавливаем предыдущий звонок
        if (currentCall || currentConference) {
            endCall();
            endConference();
        }
        
        // Обновляем UI
        if (elements.callAvatar) {
            elements.callAvatar.style.background = contact.color;
            elements.callAvatar.textContent = contact.avatar;
        }
        
        if (elements.callName) {
            elements.callName.textContent = contact.name;
        }
        
        if (elements.callStatus) {
            elements.callStatus.textContent = type === 'audio' ? 'Аудиозвонок' : 'Видеозвонок';
        }
        
        if (elements.callTimer) {
            elements.callTimer.textContent = '00:00';
        }
        
        // Показываем экран звонка
        elements.callScreen.classList.add('active');
        
        // Сбрасываем таймер
        callDuration = 0;
        
        // Имитируем ответ через 3 секунды
        setTimeout(() => {
            if (elements.callScreen.classList.contains('active')) {
                startCallTimer();
                if (elements.callStatus) {
                    elements.callStatus.textContent = 'Разговор';
                }
                showNotification(`Начат ${type === 'audio' ? 'аудиозвонок' : 'видеозвонок'} с ${contact.name}`, 'success');
            }
        }, 3000);
        
        currentCall = { contact, type, startTime: new Date() };
    }
    
    function startCallTimer() {
        if (callTimer) clearInterval(callTimer);
        
        callTimer = setInterval(() => {
            callDuration++;
            const minutes = Math.floor(callDuration / 60).toString().padStart(2, '0');
            const seconds = (callDuration % 60).toString().padStart(2, '0');
            
            if (elements.callTimer) {
                elements.callTimer.textContent = `${minutes}:${seconds}`;
            }
        }, 1000);
    }
    
    function endCall() {
        if (callTimer) {
            clearInterval(callTimer);
            callTimer = null;
        }
        
        elements.callScreen.classList.remove('active');
        
        if (currentCall) {
            const duration = callDuration;
            showNotification(`Звонок завершен`, `Длительность: ${Math.floor(duration/60)}:${(duration%60).toString().padStart(2, '0')}`, 'info');
            currentCall = null;
        }
    }
    
    function toggleMute() {
        const muteBtn = document.querySelector('.call-control-btn.mute i');
        if (muteBtn.classList.contains('fa-microphone')) {
            muteBtn.className = 'fas fa-microphone-slash';
            showNotification('Микрофон выключен', 'info');
        } else {
            muteBtn.className = 'fas fa-microphone';
            showNotification('Микрофон включен', 'info');
        }
        
        const muteControl = document.querySelector('.call-control-btn.mute');
        muteControl.classList.toggle('active');
    }
    
    function toggleSpeaker() {
        const speakerBtn = document.querySelector('.call-control-btn.speaker i');
        if (speakerBtn.classList.contains('fa-volume-up')) {
            speakerBtn.className = 'fas fa-volume-mute';
            showNotification('Динамик выключен', 'info');
        } else {
            speakerBtn.className = 'fas fa-volume-up';
            showNotification('Динамик включен', 'info');
        }
        
        const speakerControl = document.querySelector('.call-control-btn.speaker');
        speakerControl.classList.toggle('active');
    }
    
    // ===== КОНФЕРЕНЦИЯ =====
    function startConference() {
        // Останавливаем текущие звонки
        if (currentCall) endCall();
        
        // Создаем участников конференции
        const participants = [...contacts].slice(0, 6).map((contact, index) => ({
            ...contact,
            muted: index > 0,
            isYou: index === 0,
            activeSpeaker: index === 0
        }));
        
        // Рендерим участников
        renderConferenceParticipants(participants);
        
        // Показываем экран конференции
        elements.conferenceScreen.classList.add('active');
        
        // Запускаем таймер
        callDuration = 0;
        startCallTimer();
        
        // Обновляем статус
        currentConference = {
            participants,
            startTime: new Date(),
            activeSpeaker: 0
        };
        
        // Показываем уведомление
        showNotification('Конференция начата', `Участников: ${participants.length}`, 'success');
        
        // Имитируем смену активного говорящего
        setInterval(() => {
            if (currentConference) {
                simulateConferenceActivity();
            }
        }, 5000);
    }
    
    function renderConferenceParticipants(participants) {
        const grid = elements.conferenceGrid;
        if (!grid) return;
        
        grid.innerHTML = '';
        
        participants.forEach((participant, index) => {
            const card = document.createElement('div');
            card.className = `participant-card ${participant.activeSpeaker ? 'active-speaker' : ''}`;
            
            card.innerHTML = `
                <div class="participant-avatar" style="background: ${participant.color}">
                    ${participant.avatar}
                </div>
                <div class="participant-info">
                    <h3>${participant.isYou ? 'Вы' : participant.name}</h3>
                    <div class="participant-status">
                        <i class="fas fa-circle" style="color: ${participant.status === 'online' ? '#34c759' : '#ff9500'}"></i>
                        ${participant.status === 'online' ? 'В сети' : 'Отошёл'}
                    </div>
                </div>
                ${participant.muted ? '<div class="participant-muted"><i class="fas fa-microphone-slash"></i></div>' : ''}
            `;
            
            grid.appendChild(card);
        });
    }
    
    function simulateConferenceActivity() {
        if (!currentConference) return;
        
        // Случайно выбираем нового активного говорящего
        const oldSpeaker = currentConference.activeSpeaker;
        let newSpeaker;
        do {
            newSpeaker = Math.floor(Math.random() * currentConference.participants.length);
        } while (newSpeaker === oldSpeaker);
        
        // Обновляем состояние
        currentConference.activeSpeaker = newSpeaker;
        currentConference.participants.forEach((p, i) => {
            p.activeSpeaker = i === newSpeaker;
        });
        
        // Обновляем UI
        renderConferenceParticipants(currentConference.participants);
        
        // Случайно включаем/выключаем микрофон
        if (Math.random() > 0.7) {
            const randomParticipant = Math.floor(Math.random() * currentConference.participants.length);
            currentConference.participants[randomParticipant].muted = !currentConference.participants[randomParticipant].muted;
            renderConferenceParticipants(currentConference.participants);
        }
    }
    
    function endConference() {
        if (callTimer) {
            clearInterval(callTimer);
            callTimer = null;
        }
        
        elements.conferenceScreen.classList.remove('active');
        
        if (currentConference) {
            const duration = callDuration;
            showNotification('Конференция завершена', `Длительность: ${Math.floor(duration/60)}:${(duration%60).toString().padStart(2, '0')}`, 'info');
            currentConference = null;
        }
    }
    
    function addParticipantToConference() {
        if (!currentConference) return;
        
        // Находим контакт, которого еще нет в конференции
        const existingIds = currentConference.participants.map(p => p.id);
        const newContact = contacts.find(c => !existingIds.includes(c.id));
        
        if (newContact) {
            currentConference.participants.push({
                ...newContact,
                muted: true,
                isYou: false,
                activeSpeaker: false
            });
            
            renderConferenceParticipants(currentConference.participants);
            showNotification(`${newContact.name} присоединился к конференции`, 'info');
        } else {
            showNotification('Нет доступных контактов для добавления', 'warning');
        }
    }
    
    // ===== УПРАВЛЕНИЕ ТЕМАМИ =====
    function toggleTheme() {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Обновляем класс body
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(`${currentTheme}-theme`);
        
        // Обновляем иконку
        const themeIcon = document.querySelector('.theme-switch i');
        if (themeIcon) {
            themeIcon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
        
        // Сохраняем настройку
        localStorage.setItem('telegramNodesTheme', currentTheme);
        
        // Показываем уведомление
        showNotification(`Тема изменена: ${currentTheme === 'dark' ? 'Тёмная' : 'Светлая'}`, 'info');
    }
    
    // ===== ФИЛЬТРЫ И ПОИСК =====
    function applyFilter(filterType) {
        const chatItems = document.querySelectorAll('.chat-item');
        
        switch(filterType) {
            case 'Все чаты':
                chatItems.forEach(item => item.style.display = 'block');
                break;
            case 'Непрочитанные':
                chatItems.forEach(item => {
                    const hasUnread = item.querySelector('.unread-count');
                    item.style.display = hasUnread ? 'block' : 'none';
                });
                break;
            case 'Закреплённые':
                chatItems.forEach(item => {
                    const isPinned = item.querySelector('.pinned-badge');
                    item.style.display = isPinned ? 'block' : 'none';
                });
                break;
            case 'Личные':
                chatItems.forEach(item => {
                    const isPersonal = !item.dataset.node || item.dataset.node === 'family';
                    item.style.display = isPersonal ? 'block' : 'none';
                });
                break;
        }
        
        // Обновляем активную кнопку
        elements.filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === filterType) {
                btn.classList.add('active');
            }
        });
    }
    
    function toggleView() {
        currentView = currentView === 'grid' ? 'list' : 'grid';
        const chatList = elements.chatList;
        
        if (chatList) {
            chatList.classList.toggle('list-view', currentView === 'list');
        }
        
        // Обновляем кнопки
        elements.viewBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === currentView) {
                btn.classList.add('active');
            }
        });
        
        showNotification(`Режим просмотра: ${currentView === 'grid' ? 'Сетка' : 'Список'}`, 'info');
    }
    
    function searchChats(query) {
        const chatItems = document.querySelectorAll('.chat-item');
        const searchTerm = query.toLowerCase().trim();
        
        if (!searchTerm) {
            chatItems.forEach(item => item.style.display = 'block');
            return;
        }
        
        chatItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const preview = item.querySelector('.chat-preview').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || preview.includes(searchTerm)) {
                item.style.display = 'block';
                item.style.animation = 'pulse 0.5s ease';
                setTimeout(() => item.style.animation = '', 500);
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // ===== УВЕДОМЛЕНИЯ =====
    function showNotification(title, message, type = 'info') {
        const center = elements.notificationCenter;
        if (!center) return;
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-header">
                <div class="notification-title">
                    <i class="fas fa-${getNotificationIcon(type)}"></i>
                    ${title}
                </div>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="notification-body">${message}</div>
        `;
        
        center.appendChild(notification);
        
        // Показываем с анимацией
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Авто-удаление через 5 секунд
        const autoRemove = setTimeout(() => {
            removeNotification(notification);
        }, 5000);
        
        // Кнопка закрытия
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            removeNotification(notification);
        });
        
        console.log(`📢 ${type.toUpperCase()}: ${title} - ${message}`);
    }
    
    function removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    function getNotificationIcon(type) {
        const icons = {
            'info': 'info-circle',
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle'
        };
        return icons[type] || 'info-circle';
    }
    
    // ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    function getUserColor(name) {
        const colors = ['#0088cc', '#af52de', '#34c759', '#ff9500', '#5ac8fa', '#ff2d55', '#5856d6'];
        const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[index % colors.length];
    }
    
    function updateChatBadge(chatId) {
        const chatItem = document.querySelector(`.chat-item[data-chat="${chatId}"]`);
        if (chatItem) {
            const badge = chatItem.querySelector('.unread-count');
            if (badge) {
                badge.remove();
            }
        }
    }
    
    function loadSettings() {
        const savedTheme = localStorage.getItem('telegramNodesTheme') || 'dark';
        currentTheme = savedTheme;
        
        // Применяем тему
        document.body.classList.add(`${currentTheme}-theme`);
        
        // Обновляем иконку
        const themeIcon = document.querySelector('.theme-switch i');
        if (themeIcon) {
            themeIcon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
    
    function startUpdates() {
        // Обновление времени в реальном времени
        setInterval(() => {
            const timeElements = document.querySelectorAll('.time, .chat-time');
            timeElements.forEach(el => {
                if (el.textContent === 'Сейчас') {
                    el.textContent = getCurrentTime();
                }
            });
        }, 60000); // Каждую минуту
        
        // Имитация активности
        setInterval(() => {
            if (Math.random() > 0.7) {
                simulateRandomActivity();
            }
        }, 10000); // Каждые 10 секунд
    }
    
    function simulateRandomActivity() {
        const activities = [
            () => {
                const randomChat = Object.keys(chats)[Math.floor(Math.random() * Object.keys(chats).length)];
                if (chats[randomChat]) {
                    chats[randomChat].unread++;
                    renderChatList();
                }
            },
            () => {
                const randomContact = contacts[Math.floor(Math.random() * contacts.length)];
                if (randomContact.status !== 'online') {
                    randomContact.status = 'online';
                }
            },
            () => {
                const now = new Date();
                const hour = now.getHours();
                if (hour >= 9 && hour <= 18 && Math.random() > 0.8) {
                    showNotification('Новое сообщение', 'Кто-то написал в чат', 'info');
                }
            }
        ];
        
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        randomActivity();
    }
    
    // ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
    function setupEventListeners() {
        console.log('⚙️ Настройка обработчиков событий...');
        
        // ===== УЗЛЫ =====
        elements.nodeItems.forEach(item => {
            item.addEventListener('click', function() {
                const nodeId = this.dataset.node;
                if (nodeId) {
                    updateCurrentNode(nodeId);
                }
            });
        });
        
        // ===== ЧАТЫ =====
        // Отправка сообщения
        if (elements.sendBtn) {
            elements.sendBtn.addEventListener('click', sendMessage);
        }
        
        if (elements.messageInput) {
            elements.messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }
        
        // ===== НАВИГАЦИЯ =====
        // Кнопка назад
        if (elements.backBtn) {
            elements.backBtn.addEventListener('click', function() {
                if (currentChat) {
                    closeChat();
                } else if (currentCall) {
                    endCall();
                } else if (currentConference) {
                    endConference();
                } else {
                    // Возврат к списку узлов
                    showNotification('Навигация', 'Вы на главном экране', 'info');
                }
            });
        }
        
        // Возврат из чата
        if (elements.backToList) {
            elements.backToList.addEventListener('click', closeChat);
        }
        
        // ===== ПОИСК И ФИЛЬТРЫ =====
        // Поиск
        if (elements.searchInput) {
            elements.searchInput.addEventListener('input', function() {
                searchChats(this.value);
            });
        }
        
        // Фильтры
        elements.filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                applyFilter(this.textContent);
            });
        });
        
        // Переключение вида
        elements.viewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                toggleView();
            });
        });
        
        // ===== ЗВОНКИ И КОНФЕРЕНЦИИ =====
        // Звонки из контактов
        document.addEventListener('click', function(e) {
            if (e.target.closest('.call-btn')) {
                const btn = e.target.closest('.call-btn');
                const contactId = btn.closest('.contact-item')?.dataset.contactId;
                const type = btn.classList.contains('video') ? 'video' : 'audio';
                
                if (contactId) {
                    e.stopPropagation();
                    startCall(contactId, type);
                }
            }
        });
        
        // Управление звонком
        elements.callControls?.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.classList.contains('mute')) {
                    toggleMute();
                } else if (this.classList.contains('end')) {
                    endCall();
                } else if (this.classList.contains('video')) {
                    showNotification('Видео', 'Переключение видео (в разработке)', 'info');
                } else if (this.classList.contains('speaker')) {
                    toggleSpeaker();
                }
            });
        });
        
        // ===== ПЛАВАЮЩИЕ КНОПКИ =====
        elements.floatingBtns?.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.classList.contains('contacts')) {
                    showNotification('Контакты', 'Панель контактов (в разработке)', 'info');
                } else if (this.classList.contains('theme')) {
                    toggleTheme();
                } else if (this.classList.contains('conference')) {
                    startConference();
                }
            });
        });
        
        // Переключение темы
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', toggleTheme);
        }
        
        // ===== ГОРЯЧИЕ КЛАВИШИ =====
        document.addEventListener('keydown', function(e) {
            // Esc - закрытие всего
            if (e.key === 'Escape') {
                if (currentChat) {
                    closeChat();
                } else if (currentCall) {
                    endCall();
                } else if (currentConference) {
                    endConference();
                }
            }
            
            // Ctrl/Cmd + N - новый чат
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                showNotification('Новый чат', 'Создание чата (в разработке)', 'info');
            }
            
            // Ctrl/Cmd + T - переключение темы
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                toggleTheme();
            }
            
            // Ctrl/Cmd + F - поиск
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                elements.searchInput?.focus();
            }
            
            // Ctrl/Cmd + C - конференция
            if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
                e.preventDefault();
                startConference();
            }
        });
        
        // ===== ДРУГИЕ =====
        // Закрытие модалок по клику вне
        document.addEventListener('click', function(e) {
            if (e.target === elements.callScreen) {
                endCall();
            }
            
            if (e.target === elements.conferenceScreen) {
                endConference();
            }
        });
        
        console.log('✅ Обработчики настроены');
    }
    
    // ===== КОНСОЛЬНЫЕ КОМАНДЫ =====
    function setupConsoleCommands() {
        window.TelegramNodes = {
            // Управление
            switchNode: updateCurrentNode,
            openChat: openChat,
            startCall: startCall,
            startConference: startConference,
            
            // Уведомления
            notify: showNotification,
            
            // Тестирование
            testCall: () => startCall(1, 'audio'),
            testVideoCall: () => startCall(2, 'video'),
            testConference: startConference,
            testMessage: () => {
                if (currentChat) {
                    const input = elements.messageInput;
                    input.value = 'Тестовое сообщение от консоли';
                    sendMessage();
                }
            },
            
            // Информация
            getState: () => ({
                currentTheme,
                currentChat,
                currentCall,
                currentConference,
                nodes: Object.keys(nodes),
                chats: Object.keys(chats)
            }),
            
            // Утилиты
            help: () => {
                console.log('🚀 Telegram Nodes Console Commands:');
                console.log('TelegramNodes.switchNode("alpha") - переключить узел');
                console.log('TelegramNodes.openChat("design") - открыть чат');
                console.log('TelegramNodes.startCall(1, "audio") - звонок контакту');
                console.log('TelegramNodes.startConference() - начать конференцию');
                console.log('TelegramNodes.notify("Заголовок", "Текст", "success") - уведомление');
                console.log('TelegramNodes.testCall() - тестовый звонок');
                console.log('TelegramNodes.testConference() - тест конференции');
                console.log('TelegramNodes.getState() - текущее состояние');
            }
        };
        
        console.log('🎮 Telegram Nodes готов к работе!');
        console.log('Наберите TelegramNodes.help() для списка команд');
    }
    
    // ===== ЗАПУСК =====
    try {
        init();
    } catch (error) {
        console.error('❌ Ошибка при запуске:', error);
        showNotification('Ошибка при запуске', error.message, 'error');
    }
});
