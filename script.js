// Telegram Nodes - Рабочая версия для GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Telegram Nodes запускается...');
    
    // ========== ДАННЫЕ ПРИЛОЖЕНИЯ ==========
    const appData = {
        user: {
            id: 1,
            name: 'Газман',
            username: '@gazman',
            avatar: 'Г',
            status: 'Основатель Telegram Nodes',
            online: true
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
                unread: 3
            },
            {
                id: 'game',
                name: 'GameZone',
                icon: 'fas fa-gamepad',
                color: '#af52de',
                description: 'Игровое сообщество',
                members: 48,
                online: 23,
                unread: 0
            },
            {
                id: 'family',
                name: 'Family',
                icon: 'fas fa-heart',
                color: '#34c759',
                description: 'Семейный чат',
                members: 12,
                online: 4,
                unread: 1
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
                pinned: true
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
                pinned: true
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
                pinned: false
            }
        ],
        
        emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳']
    };
    
    // ========== СОСТОЯНИЕ ==========
    let state = {
        theme: 'dark',
        activeNode: 'alpha',
        activeChat: null,
        currentFilter: 'all',
        isEmojiPanelOpen: false,
        isConferenceActive: false,
        conferenceTimer: 0
    };
    
    // ========== ИНИЦИАЛИЗАЦИЯ ==========
    function init() {
        console.log('🎯 Инициализация Telegram Nodes...');
        
        // Установка темы
        setTheme(state.theme);
        
        // Загрузка прелоадера
        simulatePreloader();
        
        // Настройка обработчиков
        setupEventListeners();
        
        // Загрузка эмодзи
        loadEmojis();
        
        // Приветственное уведомление
        setTimeout(function() {
            showNotification('Добро пожаловать, Газман!', 'Telegram Nodes готов к работе', 'success');
        }, 1500);
    }
    
    // ========== ПРЕЛОАДЕР ==========
    function simulatePreloader() {
        var progress = 0;
        var interval = setInterval(function() {
            progress += 15;
            if (progress > 100) progress = 100;
            
            var progressFill = document.getElementById('progress-fill');
            if (progressFill) progressFill.style.width = progress + '%';
            
            // Обновление статистики
            if (progress >= 25) {
                var statChats = document.getElementById('stat-chats');
                if (statChats) statChats.textContent = '156';
            }
            if (progress >= 50) {
                var statNodes = document.getElementById('stat-nodes');
                if (statNodes) statNodes.textContent = '7';
            }
            if (progress >= 75) {
                var statOnline = document.getElementById('stat-online');
                if (statOnline) statOnline.textContent = '1';
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(function() {
                    var preloader = document.getElementById('preloader');
                    if (preloader) {
                        preloader.classList.add('fade-out');
                        setTimeout(function() {
                            preloader.style.display = 'none';
                            var app = document.getElementById('app-container');
                            if (app) app.style.opacity = '1';
                            console.log('✅ Приложение загружено');
                        }, 300);
                    }
                }, 500);
            }
        }, 100);
    }
    
    // ========== ОСНОВНЫЕ ФУНКЦИИ ==========
    function switchNode(nodeId) {
        state.activeNode = nodeId;
        
        // Обновить активный класс
        var nodeItems = document.querySelectorAll('.node-item');
        nodeItems.forEach(function(item) {
            item.classList.remove('active');
            if (item.dataset.node === nodeId) {
                item.classList.add('active');
            }
        });
        
        // Обновить текущий узел
        updateCurrentNode();
        
        // Фильтровать чаты
        filterChatsByNode();
        
        // Уведомление
        var node = appData.nodes.find(function(n) { return n.id === nodeId; });
        if (node) {
            showNotification('Узел "' + node.name + '"', node.description, 'info');
        }
    }
    
    function updateCurrentNode() {
        var node = appData.nodes.find(function(n) { return n.id === state.activeNode; });
        if (!node) return;
        
        var container = document.getElementById('current-node');
        if (!container) return;
        
        var icon = container.querySelector('.node-icon');
        var name = container.querySelector('.node-name');
        var description = container.querySelector('.node-description');
        
        if (icon) {
            icon.innerHTML = '<i class="' + node.icon + '"></i>';
            icon.style.background = 'linear-gradient(135deg, ' + node.color + ', ' + node.color + 'dd)';
        }
        if (name) name.textContent = node.name;
        if (description) description.textContent = node.members + ' участников • ' + node.online + ' онлайн';
    }
    
    function filterChatsByNode() {
        var chatCards = document.querySelectorAll('.chat-card');
        chatCards.forEach(function(card) {
            var chat = appData.chats.find(function(c) { return c.id === card.dataset.chatId; });
            if (chat && chat.node === state.activeNode) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    function openChat(chatId) {
        var chat = appData.chats.find(function(c) { return c.id === chatId; });
        if (!chat) return;
        
        state.activeChat = chatId;
        
        // Показать панель чата
        var mainContent = document.getElementById('main-content');
        var chatPanel = document.getElementById('chat-panel');
        if (mainContent) mainContent.style.display = 'none';
        if (chatPanel) chatPanel.classList.add('active');
        
        // Обновить информацию
        var chatAvatar = document.getElementById('chat-avatar');
        var chatTitle = document.getElementById('chat-title');
        var chatStatus = document.getElementById('chat-status');
        
        if (chatAvatar) {
            chatAvatar.textContent = chat.avatar;
            chatAvatar.style.background = chat.color;
        }
        if (chatTitle) chatTitle.textContent = chat.name;
        if (chatStatus) chatStatus.textContent = chat.members + ' участников • ' + chat.online + ' онлайн';
        
        // Загрузить сообщения
        loadMessages(chatId);
        
        // Сбросить непрочитанные
        chat.unread = 0;
        updateChatBadge(chatId);
        
        // Уведомление
        showNotification('Чат "' + chat.name + '"', 'Чат открыт', 'info');
    }
    
    function closeChat() {
        state.activeChat = null;
        
        var chatPanel = document.getElementById('chat-panel');
        var mainContent = document.getElementById('main-content');
        var messageInput = document.getElementById('message-input');
        
        if (chatPanel) chatPanel.classList.remove('active');
        if (mainContent) mainContent.style.display = 'flex';
        if (messageInput) messageInput.value = '';
        
        closeEmojiPanel();
    }
    
    function loadMessages(chatId) {
        var container = document.getElementById('messages-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Примерные сообщения
        var messages = [
            { sender: 'Мария', text: 'Привет! Как продвигается работа?', time: '12:15', type: 'incoming' },
            { sender: 'Вы', text: 'Почти закончили!', time: '12:20', type: 'outgoing' },
            { sender: 'Алексей', text: 'Отлично! Когда сможете показать?', time: '12:25', type: 'incoming' }
        ];
        
        messages.forEach(function(msg) {
            var messageElement = document.createElement('div');
            messageElement.className = 'message ' + msg.type;
            
            if (msg.type === 'incoming') {
                messageElement.innerHTML = '\
                    <div class="message-avatar">' + msg.sender.charAt(0) + '</div>\
                    <div class="message-content">\
                        <div class="message-header">\
                            <span class="message-sender">' + msg.sender + '</span>\
                            <span class="message-time">' + msg.time + '</span>\
                        </div>\
                        <div class="message-text">' + msg.text + '</div>\
                    </div>\
                ';
            } else {
                messageElement.innerHTML = '\
                    <div class="message-content">\
                        <div class="message-header">\
                            <span class="message-sender">Вы</span>\
                            <span class="message-time">' + msg.time + '</span>\
                        </div>\
                        <div class="message-text">' + msg.text + '</div>\
                    </div>\
                ';
            }
            
            container.appendChild(messageElement);
        });
        
        // Прокрутить вниз
        setTimeout(function() {
            container.scrollTop = container.scrollHeight;
        }, 100);
    }
    
    function sendMessage() {
        var input = document.getElementById('message-input');
        if (!input || !input.value.trim() || !state.activeChat) return;
        
        var text = input.value.trim();
        var container = document.getElementById('messages-container');
        
        // Добавить сообщение
        var messageElement = document.createElement('div');
        messageElement.className = 'message outgoing';
        messageElement.innerHTML = '\
            <div class="message-content">\
                <div class="message-header">\
                    <span class="message-sender">Вы</span>\
                    <span class="message-time">' + getCurrentTime() + '</span>\
                </div>\
                <div class="message-text">' + text + '</div>\
            </div>\
        ';
        
        container.appendChild(messageElement);
        input.value = '';
        
        // Прокрутить вниз
        setTimeout(function() {
            container.scrollTop = container.scrollHeight;
        }, 100);
        
        // Симулировать ответ
        setTimeout(function() {
            simulateReply();
        }, 1000 + Math.random() * 2000);
        
        // Закрыть эмодзи
        closeEmojiPanel();
    }
    
    function simulateReply() {
        var replies = ['Понял вас!', 'Отличная идея!', 'Давайте обсудим', 'Согласен'];
        var senders = ['Алексей', 'Мария', 'Павел Дуров'];
        
        var randomSender = senders[Math.floor(Math.random() * senders.length)];
        var randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        var container = document.getElementById('messages-container');
        var messageElement = document.createElement('div');
        messageElement.className = 'message incoming';
        messageElement.innerHTML = '\
            <div class="message-avatar">' + randomSender.charAt(0) + '</div>\
            <div class="message-content">\
                <div class="message-header">\
                    <span class="message-sender">' + randomSender + '</span>\
                    <span class="message-time">' + getCurrentTime() + '</span>\
                </div>\
                <div class="message-text">' + randomReply + '</div>\
            </div>\
        ';
        
        container.appendChild(messageElement);
        
        setTimeout(function() {
            container.scrollTop = container.scrollHeight;
        }, 100);
        
        showNotification(randomSender, randomReply, 'info');
    }
    
    function updateChatBadge(chatId) {
        var chatCard = document.querySelector('.chat-card[data-chat-id="' + chatId + '"]');
        if (chatCard) {
            var badge = chatCard.querySelector('.unread-badge');
            if (badge) badge.style.display = 'none';
        }
    }
    
    // ========== ЭМОДЗИ ==========
    function loadEmojis() {
        var container = document.getElementById('emoji-grid');
        if (!container) return;
        
        container.innerHTML = '';
        
        appData.emojis.forEach(function(emoji) {
            var emojiElement = document.createElement('div');
            emojiElement.className = 'emoji-item';
            emojiElement.textContent = emoji;
            emojiElement.addEventListener('click', function() {
                insertEmoji(emoji);
            });
            container.appendChild(emojiElement);
        });
    }
    
    function insertEmoji(emoji) {
        var input = document.getElementById('message-input');
        if (!input) return;
        
        var cursorPos = input.selectionStart;
        var textBefore = input.value.substring(0, cursorPos);
        var textAfter = input.value.substring(cursorPos);
        
        input.value = textBefore + emoji + textAfter;
        input.focus();
        input.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
        
        // Авторазмер
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + 'px';
    }
    
    function toggleEmojiPanel() {
        state.isEmojiPanelOpen = !state.isEmojiPanelOpen;
        var panel = document.getElementById('emoji-panel');
        var button = document.getElementById('emoji-toggle-btn');
        
        if (panel) {
            if (state.isEmojiPanelOpen) {
                panel.classList.add('active');
                if (button) button.classList.add('active');
            } else {
                panel.classList.remove('active');
                if (button) button.classList.remove('active');
            }
        }
    }
    
    function closeEmojiPanel() {
        state.isEmojiPanelOpen = false;
        var panel = document.getElementById('emoji-panel');
        var button = document.getElementById('emoji-toggle-btn');
        
        if (panel) panel.classList.remove('active');
        if (button) button.classList.remove('active');
    }
    
    // ========== ВИДЕОКОНФЕРЕНЦИЯ ==========
    function startConference() {
        state.isConferenceActive = true;
        state.conferenceTimer = 0;
        
        var conferencePanel = document.getElementById('conference-panel');
        var mainContent = document.getElementById('main-content');
        
        if (conferencePanel) conferencePanel.classList.add('active');
        if (mainContent) mainContent.style.display = 'none';
        
        startConferenceTimer();
        renderConferenceParticipants();
        
        showNotification('Конференция', 'Конференция началась', 'success');
    }
    
    function closeConference() {
        state.isConferenceActive = false;
        
        stopConferenceTimer();
        
        var conferencePanel = document.getElementById('conference-panel');
        var mainContent = document.getElementById('main-content');
        
        if (conferencePanel) conferencePanel.classList.remove('active');
        if (mainContent) mainContent.style.display = 'flex';
        
        showNotification('Конференция', 'Конференция завершена', 'info');
    }
    
    function startConferenceTimer() {
        var timerInterval = setInterval(function() {
            state.conferenceTimer++;
            updateConferenceTimer();
        }, 1000);
        
        state.conferenceTimerInterval = timerInterval;
    }
    
    function stopConferenceTimer() {
        if (state.conferenceTimerInterval) {
            clearInterval(state.conferenceTimerInterval);
            state.conferenceTimerInterval = null;
        }
    }
    
    function updateConferenceTimer() {
        var minutes = Math.floor(state.conferenceTimer / 60);
        var seconds = state.conferenceTimer % 60;
        var timerText = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        
        var timerElement = document.getElementById('conference-timer');
        if (timerElement) timerElement.textContent = timerText;
    }
    
    function renderConferenceParticipants() {
        var container = document.getElementById('conference-grid');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Участники
        var participants = [
            { name: 'Вы (Ведущий)', avatar: 'Г', color: '#0088cc' },
            { name: 'Алексей', avatar: 'А', color: '#0088cc' },
            { name: 'Мария', avatar: 'М', color: '#af52de' },
            { name: 'Павел Дуров', avatar: 'ПД', color: '#34c759' }
        ];
        
        participants.forEach(function(participant) {
            var participantElement = document.createElement('div');
            participantElement.className = 'participant-card';
            if (participant.name === 'Вы (Ведущий)') {
                participantElement.classList.add('active-speaker');
            }
            
            participantElement.innerHTML = '\
                <div class="participant-avatar" style="background: ' + participant.color + '">\
                    ' + participant.avatar + '\
                </div>\
                <div class="participant-name">' + participant.name + '</div>\
                <div class="participant-status">\
                    <i class="fas fa-microphone' + (participant.name === 'Вы (Ведущий)' ? '' : '-slash') + '"></i>\
                </div>\
            ';
            
            container.appendChild(participantElement);
        });
    }
    
    // ========== ТЕМЫ ==========
    function setTheme(theme) {
        state.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        var icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    function toggleTheme() {
        var newTheme = state.theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        showNotification('Тема изменена', 'Переключено на ' + (newTheme === 'dark' ? 'тёмную' : 'светлую') + ' тему', 'info');
    }
    
    // ========== ФИЛЬТРЫ ==========
    function setupFilters() {
        var filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                // Убрать активный класс
                filterButtons.forEach(function(b) {
                    b.classList.remove('active');
                });
                
                // Добавить активный класс
                this.classList.add('active');
                
                // Применить фильтр
                state.currentFilter = this.dataset.filter;
                applyChatFilter();
            });
        });
    }
    
    function applyChatFilter() {
        var chatCards = document.querySelectorAll('.chat-card');
        var activeChats = document.querySelectorAll('.chat-card[data-chat-id]');
        
        activeChats.forEach(function(card) {
            var chat = appData.chats.find(function(c) { return c.id === card.dataset.chatId; });
            if (!chat) return;
            
            var shouldShow = true;
            
            switch (state.currentFilter) {
                case 'unread':
                    shouldShow = chat.unread > 0;
                    break;
                case 'personal':
                    shouldShow = chat.type === 'personal';
                    break;
                case 'group':
                    shouldShow = chat.type === 'group';
                    break;
                case 'channel':
                    shouldShow = chat.type === 'channel';
                    break;
                case 'pinned':
                    shouldShow = chat.pinned === true;
                    break;
                default:
                    shouldShow = true;
            }
            
            card.style.display = shouldShow ? 'block' : 'none';
        });
    }
    
    // ========== УВЕДОМЛЕНИЯ ==========
    function showNotification(title, message, type) {
        console.log('📢 ' + title + ': ' + message);
        
        var container = document.getElementById('notifications-container');
        if (!container) return;
        
        var notification = document.createElement('div');
        notification.className = 'notification';
        
        var icon = 'fas fa-info-circle';
        var color = '#0088cc';
        
        if (type === 'success') {
            icon = 'fas fa-check-circle';
            color = '#34c759';
        } else if (type === 'warning') {
            icon = 'fas fa-exclamation-circle';
            color = '#ff9500';
        } else if (type === 'error') {
            icon = 'fas fa-times-circle';
            color = '#ff3b30';
        }
        
        notification.innerHTML = '\
            <div class="notification-icon" style="background: ' + color + '">\
                <i class="' + icon + '"></i>\
            </div>\
            <div class="notification-content">\
                <h4 class="notification-title">' + title + '</h4>\
                <p class="notification-message">' + message + '</p>\
            </div>\
            <button class="notification-close">\
                <i class="fas fa-times"></i>\
            </button>\
        ';
        
        container.appendChild(notification);
        
        // Автоудаление
        setTimeout(function() {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100px)';
                setTimeout(function() {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
        
        // Закрытие
        var closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100px)';
                setTimeout(function() {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            });
        }
    }
    
    // ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
    function getCurrentTime() {
        var now = new Date();
        var hours = now.getHours().toString().padStart(2, '0');
        var minutes = now.getMinutes().toString().padStart(2, '0');
        return hours + ':' + minutes;
    }
    
    // ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========
    function setupEventListeners() {
        // Узлы
        var nodeItems = document.querySelectorAll('.node-item');
        nodeItems.forEach(function(item) {
            item.addEventListener('click', function() {
                switchNode(this.dataset.node);
            });
        });
        
        // Чаты
        var chatCards = document.querySelectorAll('.chat-card');
        chatCards.forEach(function(card) {
            card.addEventListener('click', function() {
                openChat(this.dataset.chatId);
            });
        });
        
        // Кнопка "Назад"
        var backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                if (state.activeChat) {
                    closeChat();
                } else if (state.isConferenceActive) {
                    closeConference();
                }
            });
        }
        
        // Закрытие чата
        var closeChatBtn = document.getElementById('close-chat-btn');
        if (closeChatBtn) {
            closeChatBtn.addEventListener('click', closeChat);
        }
        
        // Тема
        var themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        // Уведомления
        var notificationsBtn = document.getElementById('notifications-btn');
        if (notificationsBtn) {
            notificationsBtn.addEventListener('click', function() {
                showNotification('Уведомления', 'У вас 3 новых уведомления', 'info');
            });
        }
        
        // Новый чат
        var newChatBtn = document.getElementById('new-chat-btn');
        if (newChatBtn) {
            newChatBtn.addEventListener('click', function() {
                showNotification('Новый чат', 'Выберите контакты для начала разговора', 'info');
            });
        }
        
        // Профиль
        var profileCard = document.getElementById('profile-card');
        if (profileCard) {
            profileCard.addEventListener('click', function() {
                showNotification('Профиль', 'Газман • @gazman • Основатель', 'info');
            });
        }
        
        // Отправка сообщения
        var sendBtn = document.getElementById('send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', sendMessage);
        }
        
        var messageInput = document.getElementById('message-input');
        if (messageInput) {
            messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
            
            messageInput.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
            });
        }
        
        // Эмодзи
        var emojiToggleBtn = document.getElementById('emoji-toggle-btn');
        if (emojiToggleBtn) {
            emojiToggleBtn.addEventListener('click', toggleEmojiPanel);
        }
        
        // Видеоконференция
        var startConferenceBtn = document.getElementById('start-conference-btn');
        if (startConferenceBtn) {
            startConferenceBtn.addEventListener('click', startConference);
        }
        
        var closeConferenceBtn = document.getElementById('close-conference-btn');
        if (closeConferenceBtn) {
            closeConferenceBtn.addEventListener('click', closeConference);
        }
        
        var confEndBtn = document.getElementById('conf-end-btn');
        if (confEndBtn) {
            confEndBtn.addEventListener('click', closeConference);
        }
        
        // Фильтры
        setupFilters();
        
        // Клик вне элементов
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.emoji-panel') && !e.target.closest('#emoji-toggle-btn')) {
                closeEmojiPanel();
            }
        });
    }
    
    // ========== ЗАПУСК ==========
    try {
        init();
        console.log('✅ Telegram Nodes успешно запущен!');
        console.log('👤 Пользователь:', appData.user.name);
        console.log('📱 Узлов:', appData.nodes.length);
        console.log('💬 Чатов:', appData.chats.length);
        
        // Глобальные функции для консоли
        window.TelegramNodes = {
            openChat: openChat,
            switchNode: switchNode,
            toggleTheme: toggleTheme,
            showNotification: showNotification,
            startConference: startConference,
            test: function() {
                showNotification('Тест', 'Консольные команды работают!', 'success');
            },
            help: function() {
                console.log('🚀 Telegram Nodes Console:');
                console.log('TelegramNodes.openChat("design-team")');
                console.log('TelegramNodes.switchNode("game")');
                console.log('TelegramNodes.toggleTheme()');
                console.log('TelegramNodes.showNotification("Заголовок", "Текст", "type")');
                console.log('TelegramNodes.startConference()');
                console.log('TelegramNodes.test()');
                console.log('TelegramNodes.help()');
            }
        };
        
        setTimeout(function() {
            console.log('💡 Используй TelegramNodes.help() для списка команд');
        }, 2000);
        
    } catch (error) {
        console.error('❌ Ошибка запуска:', error);
        showNotification('Ошибка запуска', error.message, 'error');
    }
});
