document.addEventListener('DOMContentLoaded', function() {
    // Инициализация приложения
    class TelegramNodsApp {
        constructor() {
            this.initElements();
            this.initData();
            this.initEventListeners();
            this.setupBackgroundEffects();
        }
        
        initElements() {
            // Основные элементы
            this.preloader = document.getElementById('preloader');
            this.loaderPlane = document.getElementById('loaderPlane');
            this.loginForm = document.getElementById('loginForm');
            this.loginBtn = document.getElementById('loginBtn');
            this.loginInput = document.getElementById('loginInput');
            this.passwordInput = document.getElementById('passwordInput');
            this.mainContainer = document.getElementById('mainContainer');
            this.chatsContainer = document.getElementById('chatsContainer');
            
            // Навигация
            this.chatTypes = document.querySelectorAll('.chat-type');
            this.currentChatType = document.getElementById('currentChatType');
            this.chatCount = document.getElementById('chatCount');
            this.searchInput = document.getElementById('searchInput');
            
            // Профиль и настройки
            this.profileBtn = document.getElementById('profileBtn');
            this.profileModal = document.getElementById('profileModal');
            this.closeProfile = document.getElementById('closeProfile');
            this.settingsBtn = document.getElementById('settingsBtn');
            this.settingsModal = document.getElementById('settingsModal');
            
            // Непрочитанные сообщения
            this.unreadSidebar = document.getElementById('unreadSidebar');
            this.closeUnread = document.getElementById('closeUnread');
            this.unreadMessagesList = document.getElementById('unreadMessagesList');
            this.markAllRead = document.getElementById('markAllRead');
            this.totalUnreadCount = document.getElementById('totalUnreadCount');
            this.unreadSidebarCount = document.getElementById('unreadSidebarCount');
            
            // Текущее состояние
            this.currentFilter = 'all';
            this.currentSearch = '';
            this.activeChatId = null;
            this.isLoggedIn = false;
            this.unreadMessages = {};
        }
        
        initData() {
            // Данные чатов
            this.chatsData = [
                {
                    id: 1,
                    title: "Alpha Team",
                    type: "group",
                    icon: "fas fa-users",
                    description: "Основная команда разработки и управления нодами. Обсуждение технических вопросов и координация работы.",
                    members: 24,
                    lastActivity: "2 мин назад",
                    unread: 3,
                    unreadMessages: [
                        { 
                            id: 1,
                            from: "Alex", 
                            text: "Обновил конфигурацию нод, проверьте логи. На узлах 3-7 замечена повышенная нагрузка.", 
                            time: "10:45",
                            avatarColor: "#0088cc"
                        },
                        { 
                            id: 2,
                            from: "Maria", 
                            text: "Новая версия клиента готова к тестированию. Нужны волонтеры для stress-тестов.", 
                            time: "10:30",
                            avatarColor: "#ff4757"
                        },
                        { 
                            id: 3,
                            from: "System", 
                            text: "Обнаружена повышенная нагрузка на узлы 5-8. Рекомендуется проверить конфигурацию балансировки.", 
                            time: "09:15",
                            avatarColor: "#2ed573"
                        }
                    ],
                    isPinned: true,
                    isMuted: false
                },
                {
                    id: 2,
                    title: "Beta Testers",
                    type: "group",
                    icon: "fas fa-vial",
                    description: "Тестирование новых функций и отчеты об ошибках. Только для проверенных тестировщиков.",
                    members: 156,
                    lastActivity: "1 час назад",
                    unread: 0,
                    isPinned: false,
                    isMuted: true
                },
                {
                    id: 3,
                    title: "Security Alerts",
                    type: "channel",
                    icon: "fas fa-shield-alt",
                    description: "Обновления безопасности и мониторинг угроз. Экстренные оповещения о vulnerabilities.",
                    members: 89,
                    lastActivity: "5 часов назад",
                    unread: 1,
                    unreadMessages: [
                        { 
                            id: 4,
                            from: "Security Bot", 
                            text: "Зафиксирована попытка несанкционированного доступа к ноде #12. IP заблокирован, инцидент расследуется.", 
                            time: "08:20",
                            avatarColor: "#ffa502"
                        }
                    ],
                    isPinned: true,
                    isMuted: false
                },
                {
                    id: 4,
                    title: "Личные сообщения",
                    type: "personal",
                    icon: "fas fa-user",
                    description: "Приватные обсуждения и конфиденциальные данные. Шифрование end-to-end.",
                    members: 2,
                    lastActivity: "Только что",
                    unread: 5,
                    unreadMessages: [
                        { 
                            id: 5,
                            from: "Admin", 
                            text: "Ваш запрос на повышение лимитов одобрен. Новые квоты вступят в силу с завтрашнего дня.", 
                            time: "11:30",
                            avatarColor: "#8ab4f8"
                        },
                        { 
                            id: 6,
                            from: "Support", 
                            text: "Ответ на ваш тикет #4567: Проблема с синхронизацией нод решена. Перезапустите клиент для применения исправлений.", 
                            time: "10:15",
                            avatarColor: "#2ed573"
                        },
                        { 
                            id: 7,
                            from: "Partner", 
                            text: "Предложение о сотрудничестве: готовы предоставить дополнительные ресурсы для вашей сети нод.", 
                            time: "Вчера, 16:45",
                            avatarColor: "#ff4757"
                        },
                        { 
                            id: 8,
                            from: "System", 
                            text: "Ежемесячный отчет по активности нод готов. Ваши ноды обработали 45ТБ данных за последний месяц.", 
                            time: "Вчера, 14:20",
                            avatarColor: "#a0a0a0"
                        },
                        { 
                            id: 9,
                            from: "Notification", 
                            text: "Запланированное обновление в 03:00. Ожидаются кратковременные перебои в работе некоторых нод.", 
                            time: "Вчера, 12:10",
                            avatarColor: "#ffa502"
                        }
                    ],
                    isPinned: true,
                    isMuted: false
                },
                {
                    id: 5,
                    title: "Техподдержка",
                    type: "group",
                    icon: "fas fa-headset",
                    description: "Решение технических вопросов и консультации. Среднее время ответа: 15 минут.",
                    members: 342,
                    lastActivity: "3 часа назад",
                    unread: 0,
                    isPinned: false,
                    isMuted: false
                },
                {
                    id: 6,
                    title: "Новости проекта",
                    type: "channel",
                    icon: "fas fa-bullhorn",
                    description: "Официальные анонсы и обновления проекта. Подписка обязательна для всех участников.",
                    members: 1245,
                    lastActivity: "Вчера",
                    unread: 2,
                    unreadMessages: [
                        { 
                            id: 10,
                            from: "News Bot", 
                            text: "Выпущено обновление v2.3.1 с исправлениями критических уязвимостей. Обновление обязательно для всех нод.", 
                            time: "Вчера, 18:30",
                            avatarColor: "#0088cc"
                        },
                        { 
                            id: 11,
                            from: "News Bot", 
                            text: "Запланированы технические работы на 15 декабря с 02:00 до 06:00. В это время возможны перебои в работе.", 
                            time: "Вчера, 15:45",
                            avatarColor: "#0088cc"
                        }
                    ],
                    isPinned: false,
                    isMuted: true
                },
                {
                    id: 7,
                    title: "Разработчики Core",
                    type: "group",
                    icon: "fas fa-code",
                    description: "Обсуждение архитектуры и разработки ядра системы. Только для core разработчиков.",
                    members: 12,
                    lastActivity: "2 дня назад",
                    unread: 0,
                    isPinned: true,
                    isMuted: false
                },
                {
                    id: 8,
                    title: "Мониторинг сети",
                    type: "channel",
                    icon: "fas fa-chart-line",
                    description: "Графики нагрузки и статистика работы сети в реальном времени.",
                    members: 67,
                    lastActivity: "30 мин назад",
                    unread: 1,
                    unreadMessages: [
                        { 
                            id: 12,
                            from: "Monitor Bot", 
                            text: "Пиковая нагрузка на сеть достигла 85%. Рекомендуется добавить дополнительные ноды в кластер 3.", 
                            time: "11:55",
                            avatarColor: "#ffa502"
                        }
                    ],
                    isPinned: false,
                    isMuted: false
                }
            ];
            
            // Инициализация непрочитанных сообщений
            this.initializeUnreadMessages();
        }
        
        initializeUnreadMessages() {
            this.unreadMessages = {};
            let totalUnread = 0;
            
            this.chatsData.forEach(chat => {
                if (chat.unread > 0 && chat.unreadMessages) {
                    this.unreadMessages[chat.id] = chat.unreadMessages;
                    totalUnread += chat.unread;
                }
            });
            
            this.updateUnreadCount(totalUnread);
        }
        
        initEventListeners() {
            // Анимация загрузки
            this.loaderPlane.addEventListener('click', () => this.handlePlaneClick());
            
            // Логин
            this.loginBtn.addEventListener('click', () => this.handleLogin());
            this.loginInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleLogin();
            });
            this.passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleLogin();
            });
            
            // Фильтрация чатов
            this.chatTypes.forEach(type => {
                type.addEventListener('click', (e) => this.handleChatTypeFilter(e));
            });
            
            // Поиск
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
            
            // Профиль
            this.profileBtn.addEventListener('click', () => this.openProfileModal());
            this.closeProfile.addEventListener('click', () => this.closeProfileModal());
            this.profileModal.addEventListener('click', (e) => {
                if (e.target === this.profileModal) this.closeProfileModal();
            });
            
            // Настройки
            this.settingsBtn.addEventListener('click', () => this.openSettingsModal());
            
            // Непрочитанные сообщения
            this.closeUnread.addEventListener('click', () => this.closeUnreadSidebar());
            this.markAllRead.addEventListener('click', () => this.markAllAsRead());
            
            // Закрытие модальных окон по ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeProfileModal();
                    this.closeUnreadSidebar();
                    if (this.settingsModal.classList.contains('active')) {
                        this.settingsModal.classList.remove('active');
                    }
                }
            });
            
            // Автоматический запуск анимации
            setTimeout(() => {
                if (!this.isLoggedIn) {
                    this.loaderPlane.click();
                }
            }, 2000);
        }
        
        setupBackgroundEffects() {
            // Создаем анимированный фон
            const bgEffects = document.createElement('div');
            bgEffects.className = 'background-effects';
            bgEffects.innerHTML = `
                <div class="gradient-bg"></div>
                <div class="floating-shapes">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            `;
            document.body.insertBefore(bgEffects, document.body.firstChild);
        }
        
        handlePlaneClick() {
            // Анимация улетания самолетика
            this.loaderPlane.style.animation = 'planeTakeoff 1s forwards';
            this.loaderPlane.style.pointerEvents = 'none';
            
            // Показ формы входа
            setTimeout(() => {
                this.loginForm.classList.add('visible');
                this.loginForm.style.opacity = '1';
                this.loginForm.style.transform = 'translateY(0)';
            }, 800);
        }
        
        handleLogin() {
            const login = this.loginInput.value.trim();
            const password = this.passwordInput.value.trim();
            
            if (login === '900123456' && password === '111111') {
                this.showSuccessLogin();
            } else {
                this.showErrorLogin();
            }
        }
        
        showSuccessLogin() {
            this.loginForm.innerHTML = `
                <div class="login-success">
                    <i class="fas fa-check-circle"></i>
                    <h3>Успешный вход!</h3>
                    <p>Загрузка Telegram Nods...</p>
                </div>
            `;
            
            // Имитация загрузки
            setTimeout(() => {
                this.preloader.style.opacity = '0';
                
                setTimeout(() => {
                    this.preloader.classList.add('hidden');
                    this.mainContainer.style.display = 'block';
                    this.isLoggedIn = true;
                    
                    // Рендерим интерфейс
                    this.renderChats();
                    this.updateChatCount();
                    
                    // Плавное появление
                    setTimeout(() => {
                        this.mainContainer.classList.add('active');
                    }, 50);
                    
                    // Обновляем фон
                    this.setupBackgroundEffects();
                }, 500);
            }, 1500);
        }
        
        showErrorLogin() {
            const originalHTML = this.loginForm.innerHTML;
            
            // Эффект ошибки
            this.loginForm.style.animation = 'none';
            void this.loginForm.offsetWidth; // Trigger reflow
            this.loginForm.style.animation = 'shake 0.5s ease';
            
            // Сообщение об ошибке
            setTimeout(() => {
                this.loginForm.innerHTML = `
                    <div class="login-error">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Ошибка входа</h3>
                        <p>Неверный логин или пароль</p>
                        <button class="retry-btn" id="retryBtn">Попробовать снова</button>
                    </div>
                `;
                
                document.getElementById('retryBtn').addEventListener('click', () => {
                    this.loginForm.innerHTML = originalHTML;
                    this.initEventListeners(); // Re-attach listeners
                });
            }, 500);
        }
        
        handleChatTypeFilter(e) {
            const typeElement = e.currentTarget;
            const type = typeElement.dataset.type;
            
            // Обновляем активный элемент
            this.chatTypes.forEach(t => t.classList.remove('active'));
            typeElement.classList.add('active');
            
            // Анимация перехода
            this.chatsContainer.classList.add('fade-in');
            
            setTimeout(() => {
                this.currentFilter = type;
                this.renderChats();
                this.updateChatCount();
                
                // Обновляем заголовок
                const typeNames = {
                    'all': 'Все чаты',
                    'unread': 'Непрочитанные',
                    'personal': 'Личные сообщения',
                    'groups': 'Группы',
                    'channels': 'Каналы'
                };
                
                this.currentChatType.textContent = typeNames[type];
                this.chatsContainer.classList.remove('fade-in');
            }, 300);
        }
        
        handleSearch(e) {
            this.currentSearch = e.target.value.toLowerCase();
            
            // Дебаунс поиска
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.renderChats();
                this.updateChatCount();
            }, 300);
        }
        
        renderChats() {
            // Фильтрация чатов
            let filteredChats = this.chatsData.filter(chat => {
                // Фильтр по типу
                if (this.currentFilter === 'unread' && chat.unread === 0) return false;
                if (this.currentFilter === 'personal' && chat.type !== 'personal') return false;
                if (this.currentFilter === 'groups' && chat.type !== 'group') return false;
                if (this.currentFilter === 'channels' && chat.type !== 'channel') return false;
                
                // Фильтр по поиску
                if (this.currentSearch) {
                    const searchTerm = this.currentSearch.toLowerCase();
                    return chat.title.toLowerCase().includes(searchTerm) ||
                           chat.description.toLowerCase().includes(searchTerm);
                }
                
                return true;
            });
            
            // Сортировка: закрепленные сверху, затем по непрочитанным, затем по активности
            filteredChats.sort((a, b) => {
                if (a.isPinned !== b.isPinned) return b.isPinned - a.isPinned;
                if (a.unread !== b.unread) return b.unread - a.unread;
                return b.id - a.id; // Просто для демо, обычно по времени последнего сообщения
            });
            
            // Очищаем контейнер
            this.chatsContainer.innerHTML = '';
            
            // Рендерим чаты
            filteredChats.forEach(chat => {
                const chatElement = this.createChatElement(chat);
                this.chatsContainer.appendChild(chatElement);
            });
            
            // Анимация появления
            this.animateChatsAppearance();
        }
        
        createChatElement(chat) {
            const chatElement = document.createElement('div');
            chatElement.className = `chat-card ${this.activeChatId === chat.id ? 'active' : ''}`;
            chatElement.dataset.id = chat.id;
            
            // Определяем иконку типа
            const typeIcons = {
                'group': 'fas fa-users',
                'channel': 'fas fa-bullhorn',
                'personal': 'fas fa-user'
            };
            
            const typeNames = {
                'group': 'Группа',
                'channel': 'Канал',
                'personal': 'Личные'
            };
            
            chatElement.innerHTML = `
                ${chat.isPinned ? '<div class="pinned-indicator"><i class="fas fa-thumbtack"></i></div>' : ''}
                ${chat.isMuted ? '<div class="muted-indicator"><i class="fas fa-volume-mute"></i></div>' : ''}
                
                <div class="chat-header">
                    <div class="chat-type-indicator">
                        <i class="${typeIcons[chat.type] || 'fas fa-comment'}"></i>
                        <span>${typeNames[chat.type]}</span>
                    </div>
                    ${chat.unread > 0 ? `
                        <div class="unread-badge" data-chat-id="${chat.id}">
                            ${chat.unread}
                        </div>
                    ` : ''}
                </div>
                
                <h3 class="chat-title">${chat.title}</h3>
                <p class="chat-description">${chat.description}</p>
                
                <div class="chat-meta">
                    <div class="chat-members">
                        <i class="fas fa-user-friends"></i>
                        <span>${chat.members}</span>
                    </div>
                    <div class="last-activity">
                        ${chat.lastActivity}
                    </div>
                </div>
            `;
            
            // Обработчики событий
            chatElement.addEventListener('click', (e) => this.handleChatClick(e, chat));
            
            // Обработчик для бейджа непрочитанных
            const unreadBadge = chatElement.querySelector('.unread-badge');
            if (unreadBadge) {
                unreadBadge.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showUnreadMessages(chat.id);
                });
            }
            
            return chatElement;
        }
        
        animateChatsAppearance() {
            const chatCards = this.chatsContainer.querySelectorAll('.chat-card');
            
            chatCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
        
        handleChatClick(e, chat) {
            // Не обрабатываем клик по бейджу
            if (e.target.closest('.unread-badge')) return;
            
            // Снимаем активность с предыдущего чата
            document.querySelectorAll('.chat-card').forEach(card => {
                card.classList.remove('active');
            });
            
            // Активируем текущий чат
            const chatElement = e.currentTarget;
            chatElement.classList.add('active');
            this.activeChatId = chat.id;
            
            // Анимация активации
            chatElement.style.boxShadow = '0 0 0 5px rgba(0, 136, 204, 0.3)';
            setTimeout(() => {
                chatElement.style.boxShadow = '';
            }, 500);
            
            // Если есть непрочитанные - отмечаем как прочитанные
            if (chat.unread > 0) {
                this.markChatAsRead(chat.id);
            }
        }
        
        showUnreadMessages(chatId) {
            const chat = this.chatsData.find(c => c.id === chatId);
            if (!chat || !chat.unreadMessages) return;
            
            // Обновляем счетчик в сайдбаре
            this.unreadSidebarCount.textContent = `${chat.unreadMessages.length} сообщений`;
            
            // Очищаем список
            this.unreadMessagesList.innerHTML = '';
            
            // Добавляем сообщения
            chat.unreadMessages.forEach(msg => {
                const messageElement = this.createUnreadMessageElement(msg);
                this.unreadMessagesList.appendChild(messageElement);
            });
            
            // Открываем сайдбар
            this.unreadSidebar.classList.add('active');
        }
        
        createUnreadMessageElement(message) {
            const element = document.createElement('div');
            element.className = 'unread-message';
            element.dataset.id = message.id;
            
            element.innerHTML = `
                <div class="message-header">
                    <div class="message-sender">
                        <div class="sender-avatar" style="background: ${message.avatarColor}">
                            ${message.from.charAt(0)}
                        </div>
                        <span>${message.from}</span>
                    </div>
                    <div class="message-time">${message.time}</div>
                </div>
                <div class="message-text">${message.text}</div>
            `;
            
            element.addEventListener('click', () => {
                this.markMessageAsRead(message.id);
                element.classList.add('read');
                setTimeout(() => {
                    element.remove();
                    this.updateUnreadSidebarCount();
                }, 300);
            });
            
            return element;
        }
        
        markMessageAsRead(messageId) {
            // Находим чат, содержащий это сообщение
            for (const chat of this.chatsData) {
                if (chat.unreadMessages) {
                    const messageIndex = chat.unreadMessages.findIndex(m => m.id === messageId);
                    if (messageIndex > -1) {
                        chat.unreadMessages.splice(messageIndex, 1);
                        chat.unread = Math.max(0, chat.unread - 1);
                        
                        // Обновляем интерфейс
                        this.updateUnreadCount();
                        this.renderChats();
                        break;
                    }
                }
            }
        }
        
        markChatAsRead(chatId) {
            const chat = this.chatsData.find(c => c.id === chatId);
            if (chat && chat.unread > 0) {
                chat.unread = 0;
                chat.unreadMessages = [];
                
                // Обновляем интерфейс
                this.updateUnreadCount();
                this.renderChats();
                
                // Закрываем сайдбар, если он открыт для этого чата
                if (this.unreadSidebar.classList.contains('active')) {
                    const currentChatId = parseInt(this.unreadSidebar.dataset.chatId || '0');
                    if (currentChatId === chatId) {
                        this.closeUnreadSidebar();
                    }
                }
            }
        }
        
        markAllAsRead() {
            let totalMarked = 0;
            
            this.chatsData.forEach(chat => {
                if (chat.unread > 0) {
                    totalMarked += chat.unread;
                    chat.unread = 0;
                    chat.unreadMessages = [];
                }
            });
            
            // Обновляем интерфейс
            this.updateUnreadCount();
            this.renderChats();
            this.closeUnreadSidebar();
            
            // Показываем уведомление
            this.showNotification(`${totalMarked} сообщений отмечены как прочитанные`);
        }
        
        updateUnreadCount(total = null) {
            if (total === null) {
                total = this.chatsData.reduce((sum, chat) => sum + chat.unread, 0);
            }
            
            this.totalUnreadCount.textContent = total;
            
            // Анимация обновления счетчика
            if (total > 0) {
                this.totalUnreadCount.classList.add('pulse');
            } else {
                this.totalUnreadCount.classList.remove('pulse');
            }
        }
        
        updateUnreadSidebarCount() {
            const count = this.unreadMessagesList.children.length;
            this.unreadSidebarCount.textContent = `${count} сообщений`;
            
            if (count === 0) {
                setTimeout(() => this.closeUnreadSidebar(), 1000);
            }
        }
        
        updateChatCount() {
            const visibleChats = this.chatsContainer.children.length;
            this.chatCount.textContent = `${visibleChats} чатов`;
        }
        
        openProfileModal() {
            this.profileModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        closeProfileModal() {
            this.profileModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        openSettingsModal() {
            this.settingsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        closeUnreadSidebar() {
            this.unreadSidebar.classList.remove('active');
        }
        
        showNotification(message) {
            // Создаем уведомление
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            `;
            
            document.body.appendChild(notification);
            
            // Анимация появления
            setTimeout(() => notification.classList.add('show'), 10);
            
            // Автоматическое скрытие
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    }
    
    // Запуск приложения
    const app = new TelegramNodsApp();
    
    // Добавляем стили для уведомлений
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, var(--success-color), #32d489);
            color: white;
            padding: 16px 24px;
            border-radius: var(--radius);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 3000;
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification i {
            font-size: 20px;
        }
        
        .pinned-indicator {
            position: absolute;
            top: 10px;
            left: 10px;
            color: var(--warning-color);
            font-size: 14px;
        }
        
        .muted-indicator {
            position: absolute;
            top: 10px;
            right: 10px;
            color: var(--text-muted);
            font-size: 14px;
        }
        
        .sender-avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            margin-right: 8px;
            font-size: 12px;
        }
        
        .login-success, .login-error {
            text-align: center;
            animation: formAppear 0.5s ease;
        }
        
        .login-success i {
            font-size: 64px;
            color: var(--success-color);
            margin-bottom: 20px;
        }
        
        .login-error i {
            font-size: 64px;
            color: var(--danger-color);
            margin-bottom: 20px;
        }
        
        .login-success h3, .login-error h3 {
            margin-bottom: 10px;
            color: var(--text-primary);
        }
        
        .login-success p, .login-error p {
            color: var(--text-secondary);
            margin-bottom: 20px;
        }
        
        .retry-btn {
            padding: 12px 24px;
            background: var(--primary-color);
            border: none;
            border-radius: var(--radius);
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .retry-btn:hover {
            background: var(--primary-dark);
        }
    `;
    document.head.appendChild(notificationStyles);
});
