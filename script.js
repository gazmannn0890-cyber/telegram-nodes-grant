// Telegram Nodes - Улучшенный скрипт с профилем и анимациями
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Telegram Nodes загружается...');
    
    // ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
    const state = {
        currentTheme: 'dark',
        currentView: 'grid',
        activeNode: 'alpha',
        activeChat: null,
        activeCall: null,
        activeConference: null,
        callTimer: null,
        callDuration: 0
    };
    
    // Данные
    const data = {
        nodes: {
            alpha: {
                name: 'AlphaTeam',
                icon: 'fas fa-rocket',
                color: 'linear-gradient(135deg, #0088cc, #0055aa)',
                members: 24,
                description: 'Рабочая команда разработки',
                unread: 3
            },
            game: {
                name: 'GameZone',
                icon: 'fas fa-gamepad',
                color: 'linear-gradient(135deg, #af52de, #7d3cff)',
                members: 48,
                description: 'Игровое сообщество',
                unread: 0
            },
            family: {
                name: 'FamilyHub',
                icon: 'fas fa-heart',
                color: 'linear-gradient(135deg, #34c759, #2a8c4a)',
                members: 12,
                description: 'Семейный чат',
                unread: 1
            },
            work: {
                name: 'WorkSpace',
                icon: 'fas fa-code',
                color: 'linear-gradient(135deg, #ff9500, #ff5500)',
                members: 36,
                description: 'Фриланс проекты',
                unread: 0
            },
            study: {
                name: 'StudyHub',
                icon: 'fas fa-graduation-cap',
                color: 'linear-gradient(135deg, #5ac8fa, #2a7fff)',
                members: 32,
                description: 'Обучение и курсы',
                unread: 2
            }
        },
        
        chats: [
            {
                id: 'design',
                name: 'Дизайн-команда',
                node: 'alpha',
                type: 'group',
                lastMessage: 'Обсуждаем новый UI для проекта...',
                time: '12:30',
                unread: 3,
                pinned: true,
                members: 8,
                avatar: 'Д',
                color: '#0088cc'
            },
            {
                id: 'reports',
                name: 'Отчеты Q3',
                node: 'alpha',
                type: 'channel',
                lastMessage: 'Все отчеты готовы к отправке',
                time: 'Пт',
                unread: 0,
                pinned: false,
                members: 2,
                avatar: 'О',
                color: '#0088cc'
            },
            {
                id: 'tournament',
                name: 'Киберспорт турнир',
                node: 'game',
                type: 'group',
                lastMessage: 'Стартуем в 20:00, не опаздывайте!',
                time: '11:45',
                unread: 0,
                pinned: true,
                members: 24,
                avatar: 'К',
                color: '#af52de'
            },
            {
                id: 'family',
                name: 'Семейный чат',
                node: 'family',
                type: 'group',
                lastMessage: 'Мама: Приезжайте в воскресенье',
                time: 'Вчера',
                unread: 1,
                pinned: true,
                members: 5,
                avatar: 'С',
                color: '#34c759'
            },
            {
                id: 'planning',
                name: 'Планирование спринта',
                node: 'alpha',
                type: 'group',
                lastMessage: 'Дедлайн - следующая пятница',
                time: '10:20',
                unread: 5,
                pinned: false,
                members: 12,
                avatar: 'П',
                color: '#0088cc'
            }
        ],
        
        contacts: [
            { id: 1, name: 'Алексей', avatar: 'А', color: '#0088cc', status: 'online', role: 'Team Lead' },
            { id: 2, name: 'Мария', avatar: 'М', color: '#af52de', status: 'online', role: 'Designer' },
            { id: 3, name: 'Дмитрий', avatar: 'Д', color: '#34c759', status: 'away', role: 'Developer' },
            { id: 4, name: 'Анна', avatar: 'А', color: '#ff9500', status: 'offline', role: 'PM' }
        ]
    };
    
    // ===== ИНИЦИАЛИЗАЦИЯ =====
    function init() {
        console.log('🎨 Инициализация интерфейса...');
        
        // Загружаем настройки
        loadSettings();
        
        // Инициализируем UI
        initUI();
        
        // Настраиваем обработчики
        setupEventListeners();
        
        // Запускаем фоновые процессы
        startBackgroundProcesses();
        
        // Показываем приветствие
        setTimeout(() => {
            showNotification('Добро пожаловать в Telegram Nodes!', 'Интерфейс готов к работе', 'success');
        }, 800);
        
        console.log('✅ Приложение запущено успешно');
    }
    
    // ===== UI ИНИЦИАЛИЗАЦИЯ =====
    function initUI() {
        // Обновляем текущий узел
        updateActiveNode(state.activeNode);
        
        // Рендерим чаты
        renderChats();
        
        // Создаем анимированный фон
        createAnimatedBackground();
        
        // Добавляем начальные анимации
        animateElements();
    }
    
    function createAnimatedBackground() {
        const bgContainer = document.querySelector('.bg-elements');
        if (!bgContainer) return;
        
        // Создаем анимированные частицы
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'bg-particle';
            
            const size = Math.random() * 100 + 30;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const colors = [
                'rgba(0, 136, 204, 0.1)',
                'rgba(175, 82, 222, 0.1)',
                'rgba(52, 199, 89, 0.1)',
                'rgba(255, 149, 0, 0.1)'
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${posX}%;
                top: ${posY}%;
                background: ${color};
                border-radius: 50%;
                filter: blur(40px);
                animation: float ${10 + Math.random() * 20}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            bgContainer.appendChild(particle);
        }
    }
    
    function animateElements() {
        // Анимация появления элементов
        const elements = document.querySelectorAll('.node-item, .chat-card, .contact-item');
        elements.forEach((el, index) => {
            el.style.animation = `slideIn 0.4s ease ${index * 0.05}s both`;
        });
    }
    
    // ===== УПРАВЛЕНИЕ УЗЛАМИ =====
    function updateActiveNode(nodeId) {
        const node = data.nodes[nodeId];
        if (!node) return;
        
        state.activeNode = nodeId;
        
        // Обновляем заголовок
        const titleElement = document.querySelector('.node-title');
        const subtitleElement = document.querySelector('.node-subtitle');
        const iconElement = document.querySelector('.node-header-icon');
        
        if (titleElement) {
            titleElement.textContent = node.name;
            titleElement.className = 'node-title text-gradient';
        }
        
        if (subtitleElement) {
            subtitleElement.textContent = `${node.members} участников • ${node.description}`;
        }
        
        if (iconElement) {
            iconElement.style.background = node.color;
            iconElement.innerHTML = `<i class="${node.icon}"></i>`;
        }
        
        // Обновляем активный элемент в списке
        document.querySelectorAll('.node-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.node === nodeId) {
                item.classList.add('active');
            }
        });
        
        // Фильтруем чаты
        filterChatsByNode(nodeId);
        
        // Сохраняем в localStorage
        localStorage.setItem('activeNode', nodeId);
        
        // Анимация
        if (iconElement) {
            iconElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                iconElement.style.transform = 'scale(1)';
            }, 300);
        }
        
        showNotification(`Узел "${node.name}"`, `${node.description}`, 'info');
    }
    
    function filterChatsByNode(nodeId) {
        const chatCards = document.querySelectorAll('.chat-card');
        chatCards.forEach(card => {
            if (card.dataset.node === nodeId) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Сбрасываем фильтры
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.filter-btn').classList.add('active');
    }
    
    // ===== УПРАВЛЕНИЕ ЧАТАМИ =====
    function renderChats() {
        const container = document.getElementById('chatsContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        data.chats.forEach(chat => {
            const chatCard = document.createElement('div');
            chatCard.className = 'chat-card';
            chatCard.dataset.chat = chat.id;
            chatCard.dataset.node = chat.node;
            
            chatCard.innerHTML = `
                <div class="chat-header">
                    <div class="chat-avatar-main" style="background: ${chat.color}">
                        ${chat.avatar}
                    </div>
                    <div class="chat-info-main">
                        <div class="chat-title-main">
                            ${chat.name}
                            <span class="chat-type">${chat.type === 'group' ? 'Группа' : 'Канал'}</span>
                        </div>
                        <div class="chat-time">${chat.time}</div>
                    </div>
                </div>
                <p class="chat-preview">${chat.lastMessage}</p>
                <div class="chat-footer">
                    <div class="chat-members">
                        <div class="member-avatars">
                            ${Array.from({length: Math.min(3, chat.members)}).map((_, i) => `
                                <div class="member-avatar">${i + 1}</div>
                            `).join('')}
                            ${chat.members > 3 ? `
                                <div class="member-avatar">+${chat.members - 3}</div>
                            ` : ''}
                        </div>
                        <span>${chat.members} участников</span>
                    </div>
                    <div class="chat-stats">
                        ${chat.pinned ? '<i class="fas fa-thumbtack pinned-icon"></i>' : ''}
                        ${chat.unread > 0 ? `<span class="unread-badge">${chat.unread}</span>` : ''}
                    </div>
                </div>
            `;
            
            container.appendChild(chatCard);
        });
        
        // Добавляем обработчики
        document.querySelectorAll('.chat-card').forEach(card => {
            card.addEventListener('click', () => openChat(card.dataset.chat));
        });
    }
    
    function openChat(chatId) {
        const chat = data.chats.find(c => c.id === chatId);
        if (!chat) return;
        
        state.activeChat = chatId;
        
        // Скрываем основной контент
        document.querySelector('.main-content').style.display = 'none';
        
        // Показываем панель чата
        const chatPanel = document.getElementById('chatPanel');
        chatPanel.classList.add('active');
        
        // Обновляем информацию о чате
        const chatTitle = chatPanel.querySelector('.chat-title');
        const chatAvatar = chatPanel.querySelector('.chat-avatar');
        const chatStatus = chatPanel.querySelector('.chat-status');
        
        if (chatTitle) chatTitle.textContent = chat.name;
        if (chatAvatar) {
            chatAvatar.style.background = chat.color;
            chatAvatar.textContent = chat.avatar;
        }
        if (chatStatus) {
            chatStatus.textContent = `${chat.members} участников • Последняя активность недавно`;
        }
        
        // Загружаем сообщения
        loadMessages(chatId);
        
        // Сбрасываем счетчик непрочитанных
        chat.unread = 0;
        updateChatBadge(chatId);
        
        // Прокручиваем вниз
        setTimeout(() => {
            const messagesContainer = document.getElementById('messagesContainer');
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }, 100);
        
        showNotification(`Чат "${chat.name}"`, 'Открыт для общения', 'info');
    }
    
    function loadMessages(chatId) {
        const container = document.getElementById('messagesContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Добавляем дату
        const dateDiv = document.createElement('div');
        dateDiv.className = 'message-date';
        dateDiv.innerHTML = '<span>Сегодня</span>';
        container.appendChild(dateDiv);
        
        // Примерные сообщения
        const messages = [
            { id: 1, sender: 'Мария', text: 'Привет! Как продвигается работа над новым дизайном?', time: '12:15', type: 'incoming' },
            { id: 2, sender: 'Вы', text: 'Почти закончили! Осталось сделать анимации переходов', time: '12:20', type: 'outgoing' },
            { id: 3, sender: 'Алексей', text: 'Отлично! Когда сможете показать прототип?', time: '12:25', type: 'incoming' },
            { id: 4, sender: 'Вы', text: 'Сегодня к вечеру. Добавили тёмную тему и адаптив', time: '12:30', type: 'outgoing' }
        ];
        
        messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.type}`;
            
            if (msg.type === 'incoming') {
                messageDiv.innerHTML = `
                    <div class="message-avatar" style="background: ${getUserColor(msg.sender)}">
                        ${msg.sender.charAt(0)}
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
    }
    
    function sendMessage() {
        const input = document.getElementById('messageInput');
        if (!input || !input.value.trim()) return;
        
        const messageText = input.value.trim();
        const container = document.getElementById('messagesContainer');
        
        if (!container) return;
        
        // Создаем новое сообщение
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message outgoing';
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
        input.value = '';
        
        // Прокручиваем вниз
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
        
        // Имитируем ответ через 1-3 секунды
        setTimeout(() => {
            simulateReply();
        }, 1000 + Math.random() * 2000);
    }
    
    function simulateReply() {
        const replies = [
            'Понял вас!',
            'Отличная идея!',
            'Давайте обсудим подробнее',
            'Согласен с вами',
            'Интересный вопрос'
        ];
        
        const senders = ['Алексей', 'Мария', 'Дмитрий'];
        const randomSender = senders[Math.floor(Math.random() * senders.length)];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        const container = document.getElementById('messagesContainer');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message incoming';
        messageDiv.innerHTML = `
            <div class="message-avatar" style="background: ${getUserColor(randomSender)}">
                ${randomSender.charAt(0)}
            </div>
            <div class="message-content">
                <div class="message-sender">${randomSender}</div>
                <div class="message-text">${randomReply}</div>
                <div class="message-time">${getCurrentTime()}</div>
            </div>
        `;
        
        container.appendChild(messageDiv);
        
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
    }
    
    function closeChat() {
        document.querySelector('.main-content').style.display = 'flex';
        document.getElementById('chatPanel').classList.remove('active');
        state.activeChat = null;
    }
    
    // ===== ПРОФИЛЬ =====
    function openProfile() {
        // Скрываем основной контент
        document.querySelector('.main-content').style.display = 'none';
        
        // Показываем панель профиля
        const profilePanel = document.getElementById('profilePanel');
        profilePanel.classList.add('active');
        
        // Анимация появления
        profilePanel.style.animation = 'slideIn 0.3s ease';
        
        showNotification('Профиль пользователя', 'Информация и настройки', 'info');
    }
    
    function closeProfile() {
        document.querySelector('.main-content').style.display = 'flex';
        document.getElementById('profilePanel').classList.remove('active');
    }
    
    // ===== ЗВОНКИ =====
    function startCall(contactId, type = 'audio') {
        const contact = data.contacts.find(c => c.id == contactId);
        if (!contact) return;
        
        // Останавливаем текущие звонки
        if (state.activeCall) endCall();
        if (state.activeConference) endConference();
        
        // Обновляем UI
        const callScreen = document.getElementById('callScreen');
        const callAvatar = callScreen.querySelector('.call-avatar-large');
        const callName = callScreen.querySelector('.call-name');
        const callStatus = callScreen.querySelector('.call-status');
        
        if (callAvatar) {
            callAvatar.style.background = `linear-gradient(135deg, ${contact.color}, ${contact.color}99)`;
            callAvatar.textContent = contact.avatar;
        }
        
        if (callName) {
            callName.textContent = contact.name;
        }
        
        if (callStatus) {
            callStatus.textContent = type === 'audio' ? 'Аудиозвонок...' : 'Видеозвонок...';
        }
        
        // Показываем экран звонка
        callScreen.classList.add('active');
        
        // Сбрасываем таймер
        state.callDuration = 0;
        
        // Имитируем ответ через 3 секунды
        setTimeout(() => {
            if (callScreen.classList.contains('active')) {
                startCallTimer();
                if (callStatus) {
                    callStatus.textContent = 'Разговор';
                }
                showNotification(`${type === 'audio' ? 'Звонок' : 'Видеозвонок'} с ${contact.name}`, 'Начат', 'success');
            }
        }, 3000);
        
        state.activeCall = { contact, type };
    }
    
    function startCallTimer() {
        if (state.callTimer) clearInterval(state.callTimer);
        
        state.callTimer = setInterval(() => {
            state.callDuration++;
            const minutes = Math.floor(state.callDuration / 60).toString().padStart(2, '0');
            const seconds = (state.callDuration % 60).toString().padStart(2, '0');
            
            const callTimerElement = document.querySelector('.call-timer');
            if (callTimerElement) {
                callTimerElement.textContent = `${minutes}:${seconds}`;
            }
        }, 1000);
    }
    
    function endCall() {
        if (state.callTimer) {
            clearInterval(state.callTimer);
            state.callTimer = null;
        }
        
        document.getElementById('callScreen').classList.remove('active');
        
        if (state.activeCall) {
            const duration = state.callDuration;
            showNotification('Звонок завершен', `Длительность: ${Math.floor(duration/60)}:${(duration%60).toString().padStart(2, '0')}`, 'info');
            state.activeCall = null;
        }
    }
    
    // ===== КОНФЕРЕНЦИЯ =====
    function startConference() {
        // Останавливаем текущие звонки
        if (state.activeCall) endCall();
        
        // Показываем экран конференции
        const conferenceScreen = document.getElementById('conferenceScreen');
        conferenceScreen.classList.add('active');
        
        // Сбрасываем таймер
        state.callDuration = 0;
        startCallTimer();
        
        // Имитируем участников
        simulateConferenceParticipants();
        
        state.activeConference = { participants: data.contacts.slice(0, 4) };
        
        showNotification('Конференция начата', 'Присоединяйтесь к обсуждению', 'success');
        
        // Имитация активности
        setInterval(() => {
            if (state.activeConference) {
                simulateConferenceActivity();
            }
        }, 5000);
    }
    
    function simulateConferenceParticipants() {
        const grid = document.getElementById('conferenceGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        data.contacts.slice(0, 6).forEach((contact, index) => {
            const card = document.createElement('div');
            card.className = `participant-card ${index === 0 ? 'active-speaker' : ''}`;
            
            card.innerHTML = `
                <div class="participant-avatar" style="background: linear-gradient(135deg, ${contact.color}, ${contact.color}99)">
                    ${contact.avatar}
                </div>
                <div class="participant-info">
                    <h3>${index === 0 ? 'Вы' : contact.name}</h3>
                    <div class="participant-status">
                        <i class="fas fa-circle" style="color: ${contact.status === 'online' ? '#34c759' : '#ff9500'}"></i>
                        ${contact.status === 'online' ? 'В сети' : 'Отошёл'}
                    </div>
                </div>
                ${index > 1 ? '<div class="participant-muted"><i class="fas fa-microphone-slash"></i></div>' : ''}
            `;
            
            grid.appendChild(card);
        });
    }
    
    function simulateConferenceActivity() {
        const cards = document.querySelectorAll('.participant-card');
        cards.forEach(card => card.classList.remove('active-speaker'));
        
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        randomCard.classList.add('active-speaker');
        
        // Случайно включаем/выключаем микрофон
        if (Math.random() > 0.7) {
            const mutedElement = randomCard.querySelector('.participant-muted');
            if (mutedElement) {
                mutedElement.remove();
            } else {
                randomCard.innerHTML += '<div class="participant-muted"><i class="fas fa-microphone-slash"></i></div>';
            }
        }
    }
    
    function endConference() {
        if (state.callTimer) {
            clearInterval(state.callTimer);
            state.callTimer = null;
        }
        
        document.getElementById('conferenceScreen').classList.remove('active');
        
        if (state.activeConference) {
            const duration = state.callDuration;
            showNotification('Конференция завершена', `Длительность: ${Math.floor(duration/60)}:${(duration%60).toString().padStart(2, '0')}`, 'info');
            state.activeConference = null;
        }
    }
    
    // ===== ТЕМЫ =====
    function toggleTheme() {
        state.currentTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
        
        // Обновляем класс body
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(`${state.currentTheme}-theme`);
        
        // Обновляем иконку
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) {
            themeIcon.className = state.currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
        
        // Сохраняем настройку
        localStorage.setItem('telegramNodesTheme', state.currentTheme);
        
        showNotification(`Тема изменена`, `${state.currentTheme === 'dark' ? 'Тёмная' : 'Светлая'} тема активна`, 'success');
    }
    
    // ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    function getUserColor(name) {
        const colors = ['#0088cc', '#af52de', '#34c759', '#ff9500', '#5ac8fa', '#ff2d55'];
        const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[index % colors.length];
    }
    
    function updateChatBadge(chatId) {
        const chatCard = document.querySelector(`.chat-card[data-chat="${chatId}"]`);
        if (chatCard) {
            const badge = chatCard.querySelector('.unread-badge');
            if (badge) {
                badge.remove();
            }
        }
    }
    
    function loadSettings() {
        const savedTheme = localStorage.getItem('telegramNodesTheme') || 'dark';
        state.currentTheme = savedTheme;
        
        document.body.classList.add(`${state.currentTheme}-theme`);
        
        const savedNode = localStorage.getItem('activeNode') || 'alpha';
        state.activeNode = savedNode;
    }
    
    function startBackgroundProcesses() {
        // Обновление времени
        setInterval(() => {
            const timeElements = document.querySelectorAll('.time, .chat-time');
            timeElements.forEach(el => {
                if (el.textContent === 'Сейчас') {
                    el.textContent = getCurrentTime();
                }
            });
        }, 60000);
        
        // Имитация активности
        setInterval(() => {
            if (Math.random() > 0.7 && !state.activeChat) {
                const randomChat = data.chats[Math.floor(Math.random() * data.chats.length)];
                randomChat.unread++;
                updateChatBadge(randomChat.id);
                renderChats();
            }
        }, 15000);
    }
    
    function showNotification(title, message, type = 'info') {
        const center = document.querySelector('.notification-center');
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
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        const autoRemove = setTimeout(() => {
            removeNotification(notification);
        }, 5000);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            removeNotification(notification);
        });
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
    
    // ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
    function setupEventListeners() {
        console.log('⚙️ Настройка обработчиков событий...');
        
        // Профиль
        document.getElementById('profileCard')?.addEventListener('click', openProfile);
        document.getElementById('closeProfileBtn')?.addEventListener('click', closeProfile);
        
        // Узлы
        document.querySelectorAll('.node-item').forEach(item => {
            item.addEventListener('click', () => updateActiveNode(item.dataset.node));
        });
        
        // Чаты
        document.querySelectorAll('.chat-card').forEach(card => {
            card.addEventListener('click', () => openChat(card.dataset.chat));
        });
        
        // Закрытие чата
        document.getElementById('closeChatBtn')?.addEventListener('click', closeChat);
        
        // Отправка сообщения
        document.getElementById('sendMessageBtn')?.addEventListener('click', sendMessage);
        document.getElementById('messageInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
        
        // Звонки
        document.querySelectorAll('.call-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const contactId = btn.closest('.contact-item')?.dataset.contactId;
                if (contactId) startCall(contactId);
            });
        });
        
        // Управление звонком
        document.querySelector('.call-control-btn.end')?.addEventListener('click', endCall);
        document.querySelector('.call-control-btn.mute')?.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-microphone')) {
                icon.className = 'fas fa-microphone-slash';
                showNotification('Микрофон выключен', 'info');
            } else {
                icon.className = 'fas fa-microphone';
                showNotification('Микрофон включен', 'info');
            }
            this.classList.toggle('active');
        });
        
        // Конференция
        document.getElementById('startConferenceBtn')?.addEventListener('click', startConference);
        
        // Тема
        document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
        
        // Кнопка назад
        document.getElementById('backBtn')?.addEventListener('click', () => {
            if (state.activeChat) {
                closeChat();
            } else if (state.activeCall) {
                endCall();
            } else if (state.activeConference) {
                endConference();
            }
        });
        
        // Горячие клавиши
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (state.activeChat) closeChat();
                if (state.activeCall) endCall();
                if (state.activeConference) endConference();
            }
            
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                toggleTheme();
            }
        });
        
        console.log('✅ Обработчики настроены');
    }
    
    // ===== КОНСОЛЬНЫЕ КОМАНДЫ =====
    window.TelegramNodes = {
        switchNode: updateActiveNode,
        openChat: openChat,
        startCall: startCall,
        startConference: startConference,
        toggleTheme: toggleTheme,
        showNotification: showNotification,
        
        test: () => {
            showNotification('Тест', 'Консольные команды работают!', 'success');
        },
        
        help: () => {
            console.log('🚀 Telegram Nodes Console:');
            console.log('TelegramNodes.switchNode("alpha") - переключить узел');
            console.log('TelegramNodes.openChat("design") - открыть чат');
            console.log('TelegramNodes.startCall(1) - звонок контакту');
            console.log('TelegramNodes.startConference() - конференция');
            console.log('TelegramNodes.toggleTheme() - сменить тему');
            console.log('TelegramNodes.showNotification("Заголовок", "Текст", "success")');
        }
    };
    
    console.log('🎮 Введите TelegramNodes.help() для списка команд');
    
    // Запуск
    try {
        init();
    } catch (error) {
        console.error('❌ Ошибка запуска:', error);
        showNotification('Ошибка запуска', error.message, 'error');
    }
});
