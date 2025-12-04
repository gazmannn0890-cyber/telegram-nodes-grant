// Telegram Nodes - Полный рабочий скрипт
document.addEventListener('DOMContentLoaded', function() {
    // ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
    let currentChat = null;
    let currentCall = null;
    let currentTheme = 'day';
    
    // ===== КЭШ ЭЛЕМЕНТОВ =====
    const elements = {
        // Чаты
        chatItems: document.querySelectorAll('.chat-item'),
        chatPanel: document.getElementById('chatPanel'),
        backToList: document.querySelector('.back-to-list'),
        messageInput: document.getElementById('messageInput'),
        sendMessage: document.getElementById('sendMessage'),
        
        // Узлы
        nodeItems: document.querySelectorAll('.node-item'),
        createPanel: document.getElementById('createPanel'),
        closePanel: document.querySelector('.close-panel'),
        floatingBtn: document.querySelector('.floating-btn'),
        
        // Звонки
        callBtns: document.querySelectorAll('.call-btn'),
        callModal: document.getElementById('callModal'),
        closeCall: document.querySelector('.close-call'),
        controlBtns: document.querySelectorAll('.control-btn'),
        
        // Темы
        themeBtns: document.querySelectorAll('.theme-btn'),
        
        // Фильтры
        filterBtns: document.querySelectorAll('.filter-btn'),
        
        // Профиль
        profileLink: document.getElementById('profileLink'),
        
        // Кнопки
        newChatBtn: document.querySelector('.new-chat-btn'),
        searchBtn: document.querySelector('.search-btn'),
        backBtn: document.querySelector('.back-btn')
    };

    // ===== ИНИЦИАЛИЗАЦИЯ =====
    function init() {
        console.log('🚀 Инициализация Telegram Nodes...');
        
        // Загружаем сохраненную тему
        loadTheme();
        
        // Настраиваем обработчики
        setupEventListeners();
        
        // Инициализируем чаты
        initChats();
        
        // Показываем уведомление
        setTimeout(() => {
            showNotification('Telegram Nodes загружен!', 'info');
        }, 1000);
        
        console.log('✅ Приложение готово к работе');
    }

    // ===== УПРАВЛЕНИЕ ЧАТАМИ =====
    function initChats() {
        // Добавляем анимацию появления чатов
        elements.chatItems.forEach((item, index) => {
            item.style.animation = `slideIn 0.3s ease ${index * 0.1}s both`;
        });
    }

    function openChat(chatId) {
        currentChat = chatId;
        
        // Скрываем список чатов
        document.querySelector('.main-content').style.display = 'none';
        
        // Показываем панель чата
        elements.chatPanel.classList.add('active');
        
        // Обновляем заголовок чата
        const chatElement = document.querySelector(`.chat-item[data-chat="${chatId}"]`);
        if (chatElement) {
            const chatTitle = chatElement.querySelector('h4').textContent;
            const chatAvatar = chatElement.querySelector('.avatar').textContent;
            const chatColor = chatElement.querySelector('.avatar').style.background;
            
            // Обновляем заголовок
            const panelTitle = elements.chatPanel.querySelector('h3');
            const panelAvatar = elements.chatPanel.querySelector('.avatar');
            
            if (panelTitle) panelTitle.textContent = chatTitle;
            if (panelAvatar) {
                panelAvatar.textContent = chatAvatar;
                panelAvatar.style.background = chatColor;
            }
            
            // Помечаем как прочитанное
            const unreadBadge = chatElement.querySelector('.unread');
            if (unreadBadge) {
                unreadBadge.style.display = 'none';
            }
        }
        
        // Прокручиваем вниз
        setTimeout(() => {
            const messagesContainer = elements.chatPanel.querySelector('.messages-container');
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }, 100);
        
        showNotification(`Открыт чат "${chatId}"`, 'info');
    }

    function closeChat() {
        // Показываем список чатов
        document.querySelector('.main-content').style.display = 'flex';
        
        // Скрываем панель чата
        elements.chatPanel.classList.remove('active');
        
        currentChat = null;
    }

    function sendMessage() {
        const messageText = elements.messageInput.value.trim();
        if (!messageText) return;
        
        // Создаем новое сообщение
        const messagesContainer = elements.chatPanel.querySelector('.messages-container');
        if (messagesContainer) {
            const newMessage = document.createElement('div');
            newMessage.className = 'message outgoing new';
            newMessage.innerHTML = `
                <div class="message-content">
                    <div class="message-text">${messageText}</div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            `;
            
            messagesContainer.appendChild(newMessage);
            
            // Очищаем поле ввода
            elements.messageInput.value = '';
            
            // Прокручиваем вниз
            setTimeout(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 100);
            
            // Имитируем ответ через 1-3 секунды
            setTimeout(() => {
                simulateReply();
            }, 1000 + Math.random() * 2000);
        }
    }

    function simulateReply() {
        const replies = [
            'Понял вас!',
            'Отличная идея!',
            'Давайте обсудим подробнее',
            'Согласен с вами',
            'Интересный вопрос, дайте подумать...',
            'Можете показать пример?'
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const messagesContainer = elements.chatPanel.querySelector('.messages-container');
        
        if (messagesContainer) {
            const replyMessage = document.createElement('div');
            replyMessage.className = 'message incoming new';
            replyMessage.innerHTML = `
                <div class="message-avatar">
                    <div class="avatar small" style="background: #af52de;">М</div>
                </div>
                <div class="message-content">
                    <div class="message-sender">Мария</div>
                    <div class="message-text">${randomReply}</div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            `;
            
            messagesContainer.appendChild(replyMessage);
            
            // Прокручиваем вниз
            setTimeout(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 100);
        }
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // ===== УПРАВЛЕНИЕ УЗЛАМИ =====
    function openCreatePanel() {
        elements.createPanel.classList.add('active');
        showNotification('Создание нового узла', 'info');
    }

    function closeCreatePanel() {
        elements.createPanel.classList.remove('active');
    }

    function switchNode(nodeType) {
        // Обновляем активный узел
        elements.nodeItems.forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNode = document.querySelector(`.node-item[data-node="${nodeType}"]`);
        if (activeNode) {
            activeNode.classList.add('active');
            
            // Обновляем заголовок
            const nodeTitle = activeNode.querySelector('span').textContent;
            const nodeAvatar = activeNode.querySelector('.node-avatar');
            
            document.querySelector('.current-node h2').textContent = nodeTitle;
            document.querySelector('.current-node .node-avatar').style.background = 
                nodeAvatar.style.background;
            document.querySelector('.current-node .node-avatar i').className = 
                nodeAvatar.querySelector('i').className;
            
            // Показываем уведомление
            showNotification(`Переключен на узел "${nodeTitle}"`, 'info');
            
            // Фильтруем чаты по узлу
            filterChatsByNode(nodeType);
        }
    }

    function filterChatsByNode(nodeType) {
        const nodeColors = {
            'alpha': '#0088cc',
            'game': '#af52de',
            'family': '#34c759'
        };
        
        const targetColor = nodeColors[nodeType];
        
        elements.chatItems.forEach(item => {
            const chatColor = item.querySelector('.avatar').style.background;
            if (chatColor === targetColor) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Сбрасываем фильтры
        elements.filterBtns.forEach(btn => btn.classList.remove('active'));
        elements.filterBtns[0].classList.add('active'); // "Все чаты"
    }

    // ===== СИСТЕМА ЗВОНКОВ =====
    function startCall(contactId, type = 'audio') {
        const contactItem = document.querySelector(`.contact-item[data-contact="${contactId}"]`);
        if (!contactItem) return;
        
        const contactName = contactItem.querySelector('strong').textContent;
        const contactAvatar = contactItem.querySelector('.avatar').textContent;
        const contactColor = contactItem.querySelector('.avatar').style.background;
        
        // Обновляем модалку
        document.getElementById('callContactName').textContent = contactName;
        document.getElementById('callAvatar').textContent = contactAvatar;
        document.getElementById('callAvatar').style.background = contactColor;
        document.getElementById('callStatus').textContent = 'Вызов...';
        document.getElementById('callTimer').textContent = '00:00';
        
        // Показываем модалку
        elements.callModal.classList.add('active');
        
        // Имитируем ответ через 3 секунды
        setTimeout(() => {
            if (elements.callModal.classList.contains('active')) {
                startCallTimer();
                document.getElementById('callStatus').textContent = 'Разговор';
                showNotification(`${type === 'audio' ? 'Звонок' : 'Видеозвонок'} с ${contactName}`, 'info');
            }
        }, 3000);
    }

    function startCallTimer() {
        let seconds = 0;
        const timerElement = document.getElementById('callTimer');
        
        currentCall = setInterval(() => {
            seconds++;
            const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
            const secs = (seconds % 60).toString().padStart(2, '0');
            timerElement.textContent = `${minutes}:${secs}`;
        }, 1000);
    }

    function endCall() {
        if (currentCall) {
            clearInterval(currentCall);
            currentCall = null;
        }
        
        elements.callModal.classList.remove('active');
        showNotification('Звонок завершен', 'info');
    }

    function toggleMute() {
        const muteBtn = document.querySelector('.control-btn.mute i');
        if (muteBtn.classList.contains('fa-microphone')) {
            muteBtn.className = 'fas fa-microphone-slash';
            showNotification('Микрофон выключен', 'info');
        } else {
            muteBtn.className = 'fas fa-microphone';
            showNotification('Микрофон включен', 'info');
        }
    }

    // ===== УПРАВЛЕНИЕ ТЕМАМИ =====
    function switchTheme(theme) {
        currentTheme = theme;
        
        // Обновляем класс body
        document.body.classList.remove('day-theme', 'night-theme');
        document.body.classList.add(`${theme}-theme`);
        
        // Обновляем активную кнопку
        elements.themeBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.classList.contains(theme)) {
                btn.classList.add('active');
            }
        });
        
        // Сохраняем тему
        localStorage.setItem('telegramNodesTheme', theme);
        
        showNotification(`Тема изменена: ${theme === 'day' ? 'День' : 'Ночь'}`, 'info');
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem('telegramNodesTheme') || 'day';
        switchTheme(savedTheme);
    }

    // ===== ФИЛЬТРЫ ЧАТОВ =====
    function applyFilter(filterType) {
        // Обновляем активную кнопку
        elements.filterBtns.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Применяем фильтр
        switch(filterType) {
            case 'Все чаты':
                elements.chatItems.forEach(item => item.style.display = 'flex');
                break;
            case 'Непрочитанные':
                elements.chatItems.forEach(item => {
                    const hasUnread = item.querySelector('.unread');
                    item.style.display = hasUnread ? 'flex' : 'none';
                });
                break;
            case 'Закреплённые':
                elements.chatItems.forEach(item => {
                    const isPinned = item.querySelector('.fa-pin');
                    item.style.display = isPinned ? 'flex' : 'none';
                });
                break;
            case 'Личные':
                // Пример фильтрации личных чатов
                elements.chatItems.forEach(item => {
                    const title = item.querySelector('h4').textContent;
                    item.style.display = !title.includes('команда') && 
                                       !title.includes('Отчеты') && 
                                       !title.includes('турнир') ? 'flex' : 'none';
                });
                break;
        }
    }

    // ===== УВЕДОМЛЕНИЯ =====
    function showNotification(message, type = 'info') {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Добавляем на страницу
        document.body.appendChild(notification);
        
        // Показываем с анимацией
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Авто-удаление через 3 секунды
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
        
        console.log(`📢 ${type}: ${message}`);
    }

    // ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
    function setupEventListeners() {
        console.log('⚙️ Настройка обработчиков событий...');
        
        // ===== ЧАТЫ =====
        // Клик по чату
        elements.chatItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (e.target.classList.contains('call-btn')) return;
                openChat(this.dataset.chat);
            });
        });
        
        // Возврат к списку чатов
        if (elements.backToList) {
            elements.backToList.addEventListener('click', closeChat);
        }
        
        // Отправка сообщения
        if (elements.sendMessage) {
            elements.sendMessage.addEventListener('click', sendMessage);
        }
        
        if (elements.messageInput) {
            elements.messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
        
        // ===== УЗЛЫ =====
        // Переключение узлов
        elements.nodeItems.forEach(item => {
            item.addEventListener('click', function() {
                if (this.classList.contains('add')) {
                    openCreatePanel();
                } else {
                    switchNode(this.dataset.node);
                }
            });
        });
        
        // Создание узла
        if (elements.closePanel) {
            elements.closePanel.addEventListener('click', closeCreatePanel);
        }
        
        // Кнопка создания
        if (elements.floatingBtn) {
            elements.floatingBtn.addEventListener('click', openCreatePanel);
        }
        
        // Кнопка нового чата
        if (elements.newChatBtn) {
            elements.newChatBtn.addEventListener('click', () => {
                showNotification('Создание нового чата (в разработке)', 'info');
            });
        }
        
        // ===== ЗВОНКИ =====
        // Кнопки звонка в контактах
        elements.callBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const contactItem = this.closest('.contact-item');
                const type = this.classList.contains('video') ? 'video' : 'audio';
                startCall(contactItem.dataset.contact, type);
            });
        });
        
        // Управление звонком
        if (elements.closeCall) {
            elements.closeCall.addEventListener('click', endCall);
        }
        
        elements.controlBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.classList.contains('mute')) {
                    toggleMute();
                } else if (this.classList.contains('end')) {
                    endCall();
                } else if (this.classList.contains('speaker')) {
                    showNotification('Переключен режим динамика', 'info');
                }
            });
        });
        
        // ===== ТЕМЫ =====
        elements.themeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const theme = this.classList.contains('day') ? 'day' : 'night';
                switchTheme(theme);
            });
        });
        
        // ===== ФИЛЬТРЫ =====
        elements.filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                applyFilter(this.textContent);
            });
        });
        
        // ===== ПРОЧИЕ КНОПКИ =====
        // Кнопка назад
        if (elements.backBtn) {
            elements.backBtn.addEventListener('click', () => {
                if (currentChat) {
                    closeChat();
                } else {
                    showNotification('Возврат на главную', 'info');
                }
            });
        }
        
        // Кнопка поиска
        if (elements.searchBtn) {
            elements.searchBtn.addEventListener('click', () => {
                showNotification('Поиск (в разработке)', 'info');
            });
        }
        
        // Профиль
        if (elements.profileLink) {
            elements.profileLink.addEventListener('click', () => {
                showNotification('Профиль пользователя (в разработке)', 'info');
            });
        }
        
        // Закрытие модалок по клику вне
        document.addEventListener('click', function(e) {
            if (e.target === elements.callModal) {
                endCall();
            }
        });
        
        // Горячие клавиши
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (elements.callModal.classList.contains('active')) {
                    endCall();
                } else if (elements.chatPanel.classList.contains('active')) {
                    closeChat();
                } else if (elements.createPanel.classList.contains('active')) {
                    closeCreatePanel();
                }
            }
            
            if (e.key === 't' && (e.ctrlKey || e.metaKey)) {
                switchTheme(currentTheme === 'day' ? 'night' : 'day');
                e.preventDefault();
            }
        });
        
        console.log('✅ Обработчики настроены');
    }

    // ===== КОНСОЛЬНЫЕ КОМАНДЫ =====
    window.telegramNodes = {
        // Управление темами
        theme: {
            day: () => switchTheme('day'),
            night: () => switchTheme('night'),
            toggle: () => switchTheme(currentTheme === 'day' ? 'night' : 'day')
        },
        
        // Управление чатами
        chat: {
            open: (chatId) => {
                const chat = document.querySelector(`.chat-item[data-chat="${chatId}"]`);
                if (chat) chat.click();
            },
            close: closeChat,
            send: sendMessage
        },
        
        // Управление узлами
        node: {
            switch: switchNode,
            create: openCreatePanel
        },
        
        // Звонки
        call: {
            start: (contactId) => startCall(contactId),
            end: endCall
        },
        
        // Уведомления
        notify: showNotification,
        
        // Утилиты
        help: () => {
            console.log('🚀 Telegram Nodes Console Commands:');
            console.log('telegramNodes.theme.day() - тема "День"');
            console.log('telegramNodes.theme.night() - тема "Ночь"');
            console.log('telegramNodes.chat.open("design") - открыть чат');
            console.log('telegramNodes.node.switch("alpha") - переключить узел');
            console.log('telegramNodes.notify("текст", "info/error") - уведомление');
        }
    };
    
    console.log('🚀 Telegram Nodes готов!');
    console.log('Наберите telegramNodes.help() для списка команд');
    
    // ===== ЗАПУСК =====
    try {
        init();
    } catch (error) {
        console.error('❌ Ошибка при запуске:', error);
        showNotification('Ошибка при запуске приложения', 'error');
    }
});
