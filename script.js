// Telegram Nods - Universal Platform
// Основной JavaScript файл

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация приложения
    class TelegramNodsApp {
        constructor() {
            this.initialize();
        }
        
        initialize() {
            this.initElements();
            this.initEventListeners();
            this.initData();
            this.initPreloader();
            this.setupKeyboardShortcuts();
        }
        
        initElements() {
            // Основные элементы
            this.preloader = document.getElementById('preloader');
            this.planeContainer = document.getElementById('planeContainer');
            this.telegramPlane = document.getElementById('telegramPlane');
            this.loginScreen = document.getElementById('loginScreen');
            this.loginBtn = document.getElementById('loginBtn');
            this.loginInput = document.getElementById('loginInput');
            this.passwordInput = document.getElementById('passwordInput');
            this.appContainer = document.getElementById('appContainer');
            
            // Профиль и навигация
            this.profileHeader = document.getElementById('profileHeader');
            this.profileAvatar = document.getElementById('profileAvatar');
            this.profileMenuBtn = document.getElementById('profileMenuBtn');
            this.profileMenu = document.getElementById('profileMenu');
            
            // Категории и чаты
            this.categoryBtns = document.querySelectorAll('.category-btn');
            this.currentCategory = document.getElementById('currentCategory');
            this.activeCount = document.getElementById('activeCount');
            this.chatsGrid = document.getElementById('chatsGrid');
            this.globalSearch = document.getElementById('globalSearch');
            
            // Коммуникации
            this.startVoiceCall = document.getElementById('startVoiceCall');
            this.startVideoCall = document.getElementById('startVideoCall');
            this.startConference = document.getElementById('startConference');
            
            // Модальные окна
            this.callModal = document.getElementById('callModal');
            this.callContainer = document.getElementById('callContainer');
            this.conferenceModal = document.getElementById('conferenceModal');
            this.conferenceContainer = document.getElementById('conferenceContainer');
            
            // Сайдбар непрочитанных
            this.rightSidebar = document.getElementById('rightSidebar');
            this.closeSidebar = document.getElementById('closeSidebar');
            this.unreadMessages = document.getElementById('unreadMessages');
            this.markAllReadBtn = document.getElementById('markAllReadBtn');
            
            // Уведомления
            this.notificationsBtn = document.getElementById('notificationsBtn');
            this.notificationCenter = document.getElementById('notificationCenter');
            this.closeNotifications = document.getElementById('closeNotifications');
            this.notificationsList = document.getElementById('notificationsList');
            
            // Другие элементы
            this.createGroup = document.getElementById('createGroup');
            this.createChannel = document.getElementById('createChannel');
            
            // Текущее состояние
            this.currentFilter = 'all';
            this.currentSearch = '';
            this.isLoggedIn = false;
            this.isInCall = false;
            this.isInConference = false;
            this.callTimer = null;
            this.callStartTime = null;
            this.unreadMessagesCount = 24;
            
            // Анимационные константы
            this.planeAnimation = null;
        }
        
        initData() {
            // Данные чатов для разных категорий
            this.chatsData = {
                all: this.generateChats(12),
                professional: this.generateChats(8, 'professional'),
                development: this.generateChats(5, 'development'),
                security: this.generateChats(3, 'security'),
                gaming: this.generateChats(4, 'gaming'),
                government: this.generateChats(2, 'government'),
                education: this.generateChats(6, 'education')
            };
            
            // Данные непрочитанных сообщений
            this.unreadData = this.generateUnreadMessages();
            
            // Данные для демо-звонков
            this.callParticipants = [
                { id: 1, name: "Security Team", avatar: "ST", status: "online" },
                { id: 2, name: "Alpha Group", avatar: "AG", status: "online" },
                { id: 3, name: "Beta Testers", avatar: "BT", status: "away" }
            ];
            
            this.conferenceParticipants = [
                { id: 1, name: "John Smith", avatar: "JS", status: "speaking", role: "Host" },
                { id: 2, name: "Sarah Johnson", avatar: "SJ", status: "muted", role: "Participant" },
                { id: 3, name: "Mike Chen", avatar: "MC", status: "listening", role: "Participant" },
                { id: 4, name: "Alex Brown", avatar: "AB", status: "speaking", role: "Participant" },
                { id: 5, name: "Emma Wilson", avatar: "EW", status: "away", role: "Participant" },
                { id: 6, name: "David Lee", avatar: "DL", status: "listening", role: "Participant" }
            ];
            
            // Уведомления
            this.notifications = [
                {
                    id: 1,
                    title: "Новая версия доступна",
                    message: "Telegram Nods v2.5.0 с улучшенной безопасностью",
                    time: "5 минут назад",
                    read: false,
                    type: "update"
                },
                {
                    id: 2,
                    title: "Срочное сообщение",
                    message: "Проверьте безопасность ноды #12",
                    time: "15 минут назад",
                    read: false,
                    type: "security"
                },
                {
                    id: 3,
                    title: "Новый участник",
                    message: "Security Team присоединился к конференции",
                    time: "1 час назад",
                    read: true,
                    type: "conference"
                }
            ];
        }
        
        generateChats(count, category = 'all') {
            const categories = {
                professional: {
                    icons: ['fa-briefcase', 'fa-chart-line', 'fa-handshake'],
                    prefixes: ['Корпоративный', 'Бизнес', 'Проект', 'Команда', 'Менеджмент']
                },
                development: {
                    icons: ['fa-code', 'fa-terminal', 'fa-bug'],
                    prefixes: ['Разработка', 'DevOps', 'API', 'Бэкенд', 'Фронтенд']
                },
                security: {
                    icons: ['fa-shield-alt', 'fa-lock', 'fa-user-shield'],
                    prefixes: ['Безопасность', 'Крипто', 'Защита', 'Аудит', 'Мониторинг']
                },
                gaming: {
                    icons: ['fa-gamepad', 'fa-trophy', 'fa-users'],
                    prefixes: ['Гейминг', 'Клан', 'Турнир', 'Стрим', 'Киберспорт']
                },
                government: {
                    icons: ['fa-landmark', 'fa-file-contract', 'fa-scale-balanced'],
                    prefixes: ['Госструктура', 'Министерство', 'Агентство', 'Департамент', 'Комиссия']
                },
                education: {
                    icons: ['fa-graduation-cap', 'fa-book', 'fa-chalkboard'],
                    prefixes: ['Образование', 'Курс', 'Лекция', 'Семинар', 'Исследование']
                }
            };
            
            const chatData = [];
            const baseNames = [
                "Security", "Alpha", "Beta", "Gamma", "Delta", "Sigma", "Omega",
                "Development", "Operations", "Research", "Analysis", "Testing"
            ];
            
            const descriptions = [
                "Обсуждение проектов и координация работы команды",
                "Технические вопросы и поддержка инфраструктуры",
                "Планирование и управление ресурсами проекта",
                "Мониторинг системы и анализ производительности",
                "Разработка новых функций и улучшение безопасности",
                "Координация между отделами и планирование релизов"
            ];
            
            for (let i = 1; i <= count; i++) {
                const cat = categories[category] || categories.professional;
                const icon = cat.icons[Math.floor(Math.random() * cat.icons.length)];
                const prefix = cat.prefixes[Math.floor(Math.random() * cat.prefixes.length)];
                const baseName = baseNames[Math.floor(Math.random() * baseNames.length)];
                
                chatData.push({
                    id: i,
                    title: `${prefix} ${baseName} ${i}`,
                    category: category,
                    icon: icon,
                    description: descriptions[Math.floor(Math.random() * descriptions.length)],
                    members: Math.floor(Math.random() * 100) + 10,
                    unread: Math.floor(Math.random() * 5),
                    lastActive: `${Math.floor(Math.random() * 60)} минут назад`,
                    priority: Math.random() > 0.7 ? 'high' : 'normal'
                });
            }
            
            return chatData;
        }
        
        generateUnreadMessages() {
            return [
                {
                    id: 1,
                    sender: "Security Team",
                    senderInitials: "ST",
                    message: "Обнаружена попытка несанкционированного доступа. Требуется ваше подтверждение действий.",
                    time: "10:45",
                    category: "security",
                    urgent: true
                },
                {
                    id: 2,
                    sender: "Project Alpha",
                    senderInitials: "PA",
                    message: "Релиз v2.5.0 отложен из-за обнаруженных уязвимостей. Новый дедлайн - завтра.",
                    time: "09:30",
                    category: "professional",
                    urgent: true
                },
                {
                    id: 3,
                    sender: "DevOps Team",
                    senderInitials: "DT",
                    message: "Сервера нод требуют обновления безопасности. Запланируйте время для обслуживания.",
                    time: "Вчера, 16:20",
                    category: "development",
                    urgent: false
                },
                {
                    id: 4,
                    sender: "Gaming Tournament",
                    senderInitials: "GT",
                    message: "Регистрация на киберспортивный турнир открыта. Подтвердите участие команды.",
                    time: "Вчера, 14:45",
                    category: "gaming",
                    urgent: false
                },
                {
                    id: 5,
                    sender: "Government Liaison",
                    senderInitials: "GL",
                    message: "Требуется ваше присутствие на совещании по вопросам кибербезопасности.",
                    time: "Вчера, 12:10",
                    category: "government",
                    urgent: true
                }
            ];
        }
        
        initEventListeners() {
            // Вход в систему
            this.loginBtn.addEventListener('click', () => this.handleLogin());
            this.loginInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleLogin();
            });
            this.passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleLogin();
            });
            
            // Профиль
            this.profileHeader.addEventListener('click', () => this.toggleProfileMenu());
            this.profileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleProfileMenu();
            });
            
            // Категории чатов
            this.categoryBtns.forEach(btn => {
                btn.addEventListener('click', (e) => this.handleCategoryChange(e));
            });
            
            // Поиск
            this.globalSearch.addEventListener('input', 
                this.debounce(() => this.handleSearch(), 300)
            );
            
            // Звонки
            this.startVoiceCall.addEventListener('click', () => this.startVoiceCallDemo());
            this.startVideoCall.addEventListener('click', () => this.startVideoCallDemo());
            this.startConference.addEventListener('click', () => this.startConferenceDemo());
            
            // Сайдбар непрочитанных
            this.closeSidebar.addEventListener('click', () => this.closeUnreadSidebar());
            this.markAllReadBtn.addEventListener('click', () => this.markAllAsRead());
            
            // Уведомления
            this.notificationsBtn.addEventListener('click', () => this.toggleNotifications());
            this.closeNotifications.addEventListener('click', () => this.closeNotificationsPanel());
            
            // Создание чатов
            this.createGroup.addEventListener('click', () => this.createNewGroup());
            this.createChannel.addEventListener('click', () => this.createNewChannel());
            
            // Закрытие окон по ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeAllModals();
                }
            });
            
            // Клик вне модальных окон
            document.addEventListener('click', (e) => {
                if (this.callModal.classList.contains('active') && 
                    !e.target.closest('.call-container') && 
                    !e.target.closest('.call-control-btn')) {
                    this.endCall();
                }
                if (this.conferenceModal.classList.contains('active') && 
                    !e.target.closest('.conference-container') && 
                    !e.target.closest('.conference-control-btn')) {
                    this.leaveConference();
                }
            });
        }
        
        initPreloader() {
            // Автоматический клик по самолетику через 1.5 секунды
            setTimeout(() => {
                if (!this.isLoggedIn) {
                    this.telegramPlane.click();
                }
            }, 1500);
            
            // Обработчик клика по самолетику
            this.telegramPlane.addEventListener('click', () => {
                this.telegramPlane.style.animation = 'none';
                this.telegramPlane.style.cursor = 'default';
                
                // Показываем форму входа
                setTimeout(() => {
                    this.loginScreen.style.opacity = '0';
                    this.loginScreen.style.display = 'block';
                    
                    setTimeout(() => {
                        this.loginScreen.style.transition = 'opacity 0.5s ease';
                        this.loginScreen.style.opacity = '1';
                    }, 10);
                }, 500);
            });
        }
        
        handleLogin() {
            const login = this.loginInput.value.trim();
            const password = this.passwordInput.value.trim();
            
            if (login === '900123456' && password === '111111') {
                this.showLoginSuccess();
            } else {
                this.showLoginError();
            }
        }
        
        showLoginSuccess() {
            // Обновляем UI формы входа
            const loginForm = this.loginScreen.querySelector('.login-form');
            loginForm.innerHTML = `
                <div class="login-success">
                    <i class="fas fa-check-circle"></i>
                    <h3>Успешный вход!</h3>
                    <p>Подготовка платформы...</p>
                </div>
            `;
            
            // Запускаем анимацию полета самолетика к профилю
            setTimeout(() => {
                this.animatePlaneToProfile();
            }, 1000);
            
            // Через 2.5 секунды показываем основной интерфейс
            setTimeout(() => {
                this.preloader.classList.add('hidden');
                this.appContainer.classList.add('active');
                this.isLoggedIn = true;
                
                // Инициализируем основной интерфейс
                this.renderChats();
                this.renderUnreadMessages();
                this.renderNotifications();
                this.updateChatCount();
                
                // Показываем приветственное уведомление
                this.showNotification(
                    "Добро пожаловать в Telegram Nods!",
                    "Универсальная платформа для геймеров, разработчиков и профессионалов.",
                    "success"
                );
            }, 3500);
        }
        
        animatePlaneToProfile() {
            // Останавливаем текущую анимацию
            this.planeContainer.style.animation = 'none';
            this.telegramPlane.style.animation = 'none';
            
            // Запускаем анимацию полета к профилю
            this.telegramPlane.classList.add('fly-to-profile');
            
            // Добавляем мертвую петлю (делаем дополнительный оборот)
            setTimeout(() => {
                this.telegramPlane.style.transition = 'all 0.5s ease';
                this.telegramPlane.style.transform += ' rotate(360deg)';
            }, 250);
        }
        
        showLoginError() {
            const originalContent = this.loginScreen.querySelector('.login-form').innerHTML;
            
            // Эффект тряски
            this.loginScreen.style.animation = 'none';
            setTimeout(() => {
                this.loginScreen.style.animation = 'shake 0.5s ease';
            }, 10);
            
            // Сообщение об ошибке
            setTimeout(() => {
                this.loginScreen.querySelector('.login-form').innerHTML = `
                    <div class="login-error">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Ошибка входа</h3>
                        <p>Неверный логин или пароль</p>
                        <div class="demo-credentials">
                            <p>Для демо используйте:</p>
                            <p><strong>Логин:</strong> 900123456</p>
                            <p><strong>Пароль:</strong> 111111</p>
                        </div>
                        <button class="retry-btn" id="retryLoginBtn">
                            <i class="fas fa-redo"></i> Попробовать снова
                        </button>
                    </div>
                `;
                
                document.getElementById('retryLoginBtn').addEventListener('click', () => {
                    this.loginScreen.querySelector('.login-form').innerHTML = originalContent;
                    this.loginInput.value = '900123456';
                    this.passwordInput.value = '111111';
                    this.loginBtn.addEventListener('click', () => this.handleLogin());
                });
            }, 500);
        }
        
        toggleProfileMenu() {
            this.profileMenu.classList.toggle('active');
        }
        
        handleCategoryChange(event) {
            const btn = event.currentTarget;
            const category = btn.dataset.category;
            
            // Обновляем активную кнопку
            this.categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Обновляем заголовок
            const categoryNames = {
                'all': 'Все диалоги',
                'professional': 'Профессиональные',
                'development': 'Разработка',
                'security': 'Безопасность',
                'gaming': 'Гейминг',
                'government': 'Госструктуры',
                'education': 'Образование'
            };
            
            this.currentCategory.textContent = categoryNames[category];
            this.currentFilter = category;
            
            // Анимация перехода
            this.chatsGrid.classList.add('fade-in');
            
            setTimeout(() => {
                this.renderChats();
                this.updateChatCount();
                this.chatsGrid.classList.remove('fade-in');
            }, 300);
        }
        
        handleSearch() {
            this.currentSearch = this.globalSearch.value.toLowerCase();
            this.renderChats();
            this.updateChatCount();
        }
        
        renderChats() {
            this.chatsGrid.innerHTML = '';
            
            const chats = this.chatsData[this.currentFilter] || [];
            let filteredChats = chats;
            
            // Применяем поиск если есть
            if (this.currentSearch) {
                filteredChats = chats.filter(chat => 
                    chat.title.toLowerCase().includes(this.currentSearch) ||
                    chat.description.toLowerCase().includes(this.currentSearch)
                );
            }
            
            // Рендерим чаты с анимацией
            filteredChats.forEach((chat, index) => {
                const chatElement = this.createChatElement(chat);
                
                // Задержка для анимации появления
                chatElement.style.animationDelay = `${index * 0.1}s`;
                chatElement.classList.add('fade-in');
                
                this.chatsGrid.appendChild(chatElement);
            });
            
            // Если чатов нет
            if (filteredChats.length === 0) {
                this.chatsGrid.innerHTML = `
                    <div class="no-chats">
                        <i class="fas fa-comment-slash"></i>
                        <h3>Диалоги не найдены</h3>
                        <p>Попробуйте изменить поисковый запрос или выберите другую категорию</p>
                    </div>
                `;
            }
        }
        
        createChatElement(chat) {
            const element = document.createElement('div');
            element.className = `chat-card ${chat.priority === 'high' ? 'highlight' : ''}`;
            element.dataset.id = chat.id;
            
            element.innerHTML = `
                <div class="chat-header">
                    <div class="chat-category">
                        <i class="fas ${chat.icon}"></i>
                        <span>${this.getCategoryName(chat.category)}</span>
                    </div>
                    ${chat.unread > 0 ? `
                        <div class="chat-urgency">
                            ${chat.unread} непрочитанных
                        </div>
                    ` : ''}
                </div>
                
                <h3 class="chat-title">${chat.title}</h3>
                <p class="chat-description">${chat.description}</p>
                
                <div class="chat-stats">
                    <div class="chat-members">
                        <i class="fas fa-user-friends"></i>
                        <span>${chat.members} участников</span>
                    </div>
                    <div class="last-message">
                        <i class="fas fa-clock"></i>
                        <span>${chat.lastActive}</span>
                    </div>
                </div>
            `;
            
            // Добавляем обработчик клика
            element.addEventListener('click', () => {
                this.openChat(chat);
            });
            
            return element;
        }
        
        openChat(chat) {
            // Анимация выделения чата
            const chatElement = document.querySelector(`.chat-card[data-id="${chat.id}"]`);
            chatElement.classList.add('active');
            
            // Показываем уведомление
            this.showNotification(
                `Открыт чат: ${chat.title}`,
                `Переход в режим общения с ${chat.members} участниками`,
                "info"
            );
            
            // Через 2 секунды снимаем выделение
            setTimeout(() => {
                chatElement.classList.remove('active');
            }, 2000);
        }
        
        updateChatCount() {
            const chats = this.chatsData[this.currentFilter] || [];
            const count = this.currentSearch ? 
                chats.filter(c => 
                    c.title.toLowerCase().includes(this.currentSearch) ||
                    c.description.toLowerCase().includes(this.currentSearch)
                ).length : 
                chats.length;
            
            this.activeCount.textContent = `${count} активных диалогов`;
        }
        
        getCategoryName(category) {
            const names = {
                'professional': 'Профессиональный',
                'development': 'Разработка',
                'security': 'Безопасность',
                'gaming': 'Гейминг',
                'government': 'Госструктура',
                'education': 'Образование',
                'all': 'Общий'
            };
            
            return names[category] || 'Общий';
        }
        
        startVoiceCallDemo() {
            if (this.isInCall || this.isInConference) {
                this.showNotification(
                    "Уже есть активный вызов",
                    "Завершите текущий вызов перед началом нового",
                    "warning"
                );
                return;
            }
            
            this.isInCall = true;
            this.callStartTime = new Date();
            
            this.callContainer.innerHTML = `
                <div class="call-header">
                    <h2><i class="fas fa-phone"></i> Голосовой звонок</h2>
                    <div class="call-participants">Security Team • Alpha Group</div>
                </div>
                
                <div class="call-content">
                    <div class="call-avatar-large">
                        <i class="fas fa-phone-alt"></i>
                    </div>
                    
                    <div class="call-status">Идет голосовой звонок...</div>
                    <div class="call-timer" id="callTimer">00:00</div>
                    
                    <div class="call-controls">
                        <button class="call-control-btn mute" id="toggleMute">
                            <i class="fas fa-microphone"></i>
                        </button>
                        
                        <button class="call-control-btn hangup" id="endCallBtn">
                            <i class="fas fa-phone-slash"></i>
                        </button>
                        
                        <button class="call-control-btn video-toggle" id="toggleVideo">
                            <i class="fas fa-video-slash"></i>
                        </button>
                    </div>
                    
                    <button class="leave-call-btn" id="leaveCallBtn">
                        <i class="fas fa-sign-out-alt"></i> Покинуть звонок
                    </button>
                </div>
            `;
            
            this.callModal.classList.add('active');
            
            // Запускаем таймер
            this.startCallTimer();
            
            // Добавляем обработчики для кнопок звонка
            setTimeout(() => {
                document.getElementById('toggleMute').addEventListener('click', () => {
                    const icon = document.querySelector('#toggleMute i');
                    icon.classList.toggle('fa-microphone');
                    icon.classList.toggle('fa-microphone-slash');
                    
                    this.showNotification(
                        "Микрофон",
                        icon.classList.contains('fa-microphone-slash') ? 
                        "Микрофон отключен" : "Микрофон включен",
                        "info"
                    );
                });
                
                document.getElementById('toggleVideo').addEventListener('click', () => {
                    const icon = document.querySelector('#toggleVideo i');
                    icon.classList.toggle('fa-video');
                    icon.classList.toggle('fa-video-slash');
                    
                    this.showNotification(
                        "Камера",
                        icon.classList.contains('fa-video-slash') ? 
                        "Камера отключена" : "Камера включена",
                        "info"
                    );
                });
                
                document.getElementById('endCallBtn').addEventListener('click', () => this.endCall());
                document.getElementById('leaveCallBtn').addEventListener('click', () => this.endCall());
            }, 100);
            
            this.showNotification(
                "Голосовой звонок начат",
                "Вы подключены к конференции с Security Team",
                "success"
            );
        }
        
        startVideoCallDemo() {
            if (this.isInCall || this.isInConference) {
                this.showNotification(
                    "Уже есть активный вызов",
                    "Завершите текущий вызов перед началом нового",
                    "warning"
                );
                return;
            }
            
            this.isInCall = true;
            this.callStartTime = new Date();
            
            this.callContainer.innerHTML = `
                <div class="call-header">
                    <h2><i class="fas fa-video"></i> Видеозвонок</h2>
                    <div class="call-participants">3 участника онлайн</div>
                </div>
                
                <div class="call-content">
                    <div class="call-avatar-large">
                        <i class="fas fa-video"></i>
                    </div>
                    
                    <div class="call-status">Идет видеозвонок...</div>
                    <div class="call-timer" id="callTimer">00:00</div>
                    
                    <div class="call-grid">
                        <div class="video-feed">
                            <div style="font-size: 48px; margin-bottom: 10px;">
                                <i class="fas fa-user"></i>
                            </div>
                            <div>Security Team</div>
                        </div>
                        
                        <div class="video-feed">
                            <div style="font-size: 48px; margin-bottom: 10px;">
                                <i class="fas fa-user"></i>
                            </div>
                            <div>Вы</div>
                        </div>
                    </div>
                    
                    <div class="call-controls">
                        <button class="call-control-btn mute" id="toggleMute">
                            <i class="fas fa-microphone"></i>
                        </button>
                        
                        <button class="call-control-btn hangup" id="endCallBtn">
                            <i class="fas fa-phone-slash"></i>
                        </button>
                        
                        <button class="call-control-btn video-toggle" id="toggleVideo">
                            <i class="fas fa-video"></i>
                        </button>
                    </div>
                    
                    <button class="leave-call-btn" id="leaveCallBtn">
                        <i class="fas fa-sign-out-alt"></i> Покинуть видеозвонок
                    </button>
                </div>
            `;
            
            this.callModal.classList.add('active');
            
            // Запускаем таймер
            this.startCallTimer();
            
            // Добавляем обработчики
            setTimeout(() => {
                document.getElementById('toggleMute').addEventListener('click', () => {
                    const icon = document.querySelector('#toggleMute i');
                    icon.classList.toggle('fa-microphone');
                    icon.classList.toggle('fa-microphone-slash');
                });
                
                document.getElementById('toggleVideo').addEventListener('click', () => {
                    const icon = document.querySelector('#toggleVideo i');
                    icon.classList.toggle('fa-video');
                    icon.classList.toggle('fa-video-slash');
                });
                
                document.getElementById('endCallBtn').addEventListener('click', () => this.endCall());
                document.getElementById('leaveCallBtn').addEventListener('click', () => this.endCall());
            }, 100);
            
            this.showNotification(
                "Видеозвонок начат",
                "Вы подключены к видеоконференции",
                "success"
            );
        }
        
        startConferenceDemo() {
            if (this.isInCall || this.isInConference) {
                this.showNotification(
                    "Уже есть активный вызов",
                    "Завершите текущий вызов перед началом нового",
                    "warning"
                );
                return;
            }
            
            this.isInConference = true;
            this.callStartTime = new Date();
            
            this.conferenceContainer.innerHTML = `
                <div class="call-header">
                    <h2><i class="fas fa-users"></i> Видеоконференция</h2>
                    <div class="call-participants">6 участников • Вы - Host</div>
                </div>
                
                <div class="conference-grid" id="conferenceGrid">
                    <!-- Участники будут добавлены динамически -->
                </div>
                
                <div class="conference-controls">
                    <button class="conference-control-btn leave" id="leaveConferenceBtn">
                        <i class="fas fa-sign-out-alt"></i> Покинуть конференцию
                    </button>
                    
                    <button class="conference-control-btn settings" id="conferenceSettings">
                        <i class="fas fa-cog"></i> Настройки
                    </button>
                </div>
            `;
            
            // Добавляем участников
            this.renderConferenceParticipants();
            
            this.conferenceModal.classList.add('active');
            
            // Добавляем обработчики
            setTimeout(() => {
                document.getElementById('leaveConferenceBtn').addEventListener('click', () => this.leaveConference());
                document.getElementById('conferenceSettings').addEventListener('click', () => {
                    this.showNotification(
                        "Настройки конференции",
                        "Расширенные настройки доступны в полной версии",
                        "info"
                    );
                });
                
                // Симуляция смены активного говорящего
                setInterval(() => {
                    if (this.isInConference) {
                        this.simulateActiveSpeaker();
                    }
                }, 3000);
            }, 100);
            
            this.showNotification(
                "Конференция начата",
                "Вы создали видеоконференцию с 6 участниками",
                "success"
            );
        }
        
        renderConferenceParticipants() {
            const grid = document.getElementById('conferenceGrid');
            if (!grid) return;
            
            grid.innerHTML = '';
            
            this.conferenceParticipants.forEach(participant => {
                const participantElement = document.createElement('div');
                participantElement.className = `conference-participant ${participant.status === 'speaking' ? 'active-speaker' : ''}`;
                participantElement.dataset.id = participant.id;
                
                participantElement.innerHTML = `
                    <div class="participant-avatar">
                        ${participant.avatar}
                    </div>
                    <div class="participant-name">${participant.name}</div>
                    <div class="participant-status">
                        ${participant.status === 'speaking' ? 'Говорит' : 
                          participant.status === 'muted' ? 'Без звука' :
                          participant.status === 'listening' ? 'Слушает' : 'Неактивен'}
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); margin-top: 5px;">
                        ${participant.role}
                    </div>
                `;
                
                grid.appendChild(participantElement);
            });
        }
        
        simulateActiveSpeaker() {
            if (!this.isInConference) return;
            
            // Случайным образом выбираем нового говорящего
            const participants = document.querySelectorAll('.conference-participant');
            participants.forEach(p => p.classList.remove('active-speaker'));
            
            const randomIndex = Math.floor(Math.random() * participants.length);
            const randomParticipant = participants[randomIndex];
            
            // Обновляем статус в данных
            const participantId = parseInt(randomParticipant.dataset.id);
            this.conferenceParticipants.forEach(p => {
                p.status = p.id === participantId ? 'speaking' : 'listening';
            });
            
            randomParticipant.classList.add('active-speaker');
            const statusElement = randomParticipant.querySelector('.participant-status');
            if (statusElement) {
                statusElement.textContent = 'Говорит';
            }
        }
        
        startCallTimer() {
            if (this.callTimer) clearInterval(this.callTimer);
            
            this.callTimer = setInterval(() => {
                if (!this.callStartTime) return;
                
                const now = new Date();
                const diff = Math.floor((now - this.callStartTime) / 1000);
                const minutes = Math.floor(diff / 60);
                const seconds = diff % 60;
                
                const timerElement = document.getElementById('callTimer');
                if (timerElement) {
                    timerElement.textContent = 
                        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }
            }, 1000);
        }
        
        endCall() {
            this.isInCall = false;
            this.callModal.classList.remove('active');
            
            if (this.callTimer) {
                clearInterval(this.callTimer);
                this.callTimer = null;
            }
            
            this.callStartTime = null;
            
            this.showNotification(
                "Звонок завершен",
                "Вы покинули голосовой/видеозвонок",
                "info"
            );
        }
        
        leaveConference() {
            this.isInConference = false;
            this.conferenceModal.classList.remove('active');
            
            if (this.callTimer) {
                clearInterval(this.callTimer);
                this.callTimer = null;
            }
            
            this.callStartTime = null;
            
            this.showNotification(
                "Конференция завершена",
                "Вы покинули видеоконференцию",
                "info"
            );
        }
        
        closeUnreadSidebar() {
            this.rightSidebar.classList.remove('active');
        }
        
        renderUnreadMessages() {
            if (!this.unreadMessages) return;
            
            this.unreadMessages.innerHTML = '';
            
            this.unreadData.forEach((message, index) => {
                const messageElement = document.createElement('div');
                messageElement.className = 'unread-message-item';
                messageElement.style.animationDelay = `${index * 0.1}s`;
                messageElement.classList.add('fade-in');
                
                messageElement.innerHTML = `
                    <div class="message-header">
                        <div class="message-sender">
                            <div class="sender-avatar">${message.senderInitials}</div>
                            <span class="sender-name">${message.sender}</span>
                        </div>
                        <div class="message-time">${message.time}</div>
                    </div>
                    
                    <div class="message-content">${message.message}</div>
                    
                    <div class="message-actions">
                        <button class="message-action-btn reply">
                            <i class="fas fa-reply"></i> Ответить
                        </button>
                        <button class="message-action-btn mark-read">
                            <i class="fas fa-check"></i> Прочитано
                        </button>
                    </div>
                `;
                
                // Добавляем обработчики
                const replyBtn = messageElement.querySelector('.reply');
                const markReadBtn = messageElement.querySelector('.mark-read');
                
                replyBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.replyToMessage(message.id);
                });
                
                markReadBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.markMessageAsRead(message.id);
                });
                
                this.unreadMessages.appendChild(messageElement);
            });
        }
        
        replyToMessage(messageId) {
            const message = this.unreadData.find(m => m.id === messageId);
            if (message) {
                this.showNotification(
                    "Ответ на сообщение",
                    `Открыт чат с ${message.sender} для ответа`,
                    "info"
                );
                
                // Симуляция открытия чата
                setTimeout(() => {
                    this.closeUnreadSidebar();
                }, 1000);
            }
        }
        
        markMessageAsRead(messageId) {
            const messageIndex = this.unreadData.findIndex(m => m.id === messageId);
            if (messageIndex > -1) {
                this.unreadData.splice(messageIndex, 1);
                this.unreadMessagesCount--;
                
                // Обновляем счетчики
                this.updateUnreadCounters();
                
                // Перерисовываем список
                this.renderUnreadMessages();
                
                this.showNotification(
                    "Сообщение прочитано",
                    "Непрочитанное сообщение отмечено как прочитанное",
                    "success"
                );
            }
        }
        
        markAllAsRead() {
            this.unreadData = [];
            this.unreadMessagesCount = 0;
            
            this.updateUnreadCounters();
            this.renderUnreadMessages();
            
            this.showNotification(
                "Все сообщения прочитаны",
                "Все непрочитанные сообщения отмечены как прочитанные",
                "success"
            );
        }
        
        updateUnreadCounters() {
            // Обновляем счетчики на кнопках категорий
            document.querySelectorAll('.unread-count').forEach(counter => {
                counter.textContent = this.unreadMessagesCount;
            });
            
            // Обновляем счетчик уведомлений
            const notificationBadge = document.querySelector('.notification-badge');
            if (notificationBadge) {
                notificationBadge.textContent = this.notifications.filter(n => !n.read).length;
            }
        }
        
        toggleNotifications() {
            this.notificationCenter.classList.toggle('active');
        }
        
        closeNotificationsPanel() {
            this.notificationCenter.classList.remove('active');
        }
        
        renderNotifications() {
            if (!this.notificationsList) return;
            
            this.notificationsList.innerHTML = '';
            
            this.notifications.forEach(notification => {
                const notificationElement = document.createElement('div');
                notificationElement.className = `notification-item ${notification.read ? '' : 'unread'}`;
                
                notificationElement.innerHTML = `
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${notification.time}</div>
                `;
                
                notificationElement.addEventListener('click', () => {
                    notification.read = true;
                    this.renderNotifications();
                    this.updateUnreadCounters();
                });
                
                this.notificationsList.appendChild(notificationElement);
            });
        }
        
        createNewGroup() {
            this.showNotification(
                "Создание группы",
                "Функционал создания групп доступен в полной версии",
                "info"
            );
        }
        
        createNewChannel() {
            this.showNotification(
                "Создание канала",
                "Функционал создания каналов доступен в полной версии",
                "info"
            );
        }
        
        showNotification(title, message, type = 'info') {
            // Создаем элемент уведомления
            const notification = document.createElement('div');
            notification.className = 'notification-item unread';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                width: 300px;
                z-index: 4000;
                animation: slideInRight 0.3s ease;
            `;
            
            const icon = type === 'success' ? 'fa-check-circle' :
                        type === 'warning' ? 'fa-exclamation-triangle' :
                        type === 'error' ? 'fa-times-circle' : 'fa-info-circle';
            
            const color = type === 'success' ? 'var(--success-color)' :
                         type === 'warning' ? 'var(--warning-color)' :
                         type === 'error' ? 'var(--danger-color)' : 'var(--info-color)';
            
            notification.innerHTML = `
                <div class="notification-title" style="color: ${color};">
                    <i class="fas ${icon}"></i> ${title}
                </div>
                <div class="notification-message">${message}</div>
                <div class="notification-time">Только что</div>
            `;
            
            document.body.appendChild(notification);
            
            // Автоматическое скрытие
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 4000);
        }
        
        closeAllModals() {
            this.callModal.classList.remove('active');
            this.conferenceModal.classList.remove('active');
            this.notificationCenter.classList.remove('active');
            this.rightSidebar.classList.remove('active');
            this.profileMenu.classList.remove('active');
            
            if (this.isInCall) this.endCall();
            if (this.isInConference) this.leaveConference();
        }
        
        setupKeyboardShortcuts() {
            document.addEventListener('keydown', (e) => {
                // Ctrl + / - Поиск
                if (e.ctrlKey && e.key === '/') {
                    e.preventDefault();
                    this.globalSearch.focus();
                }
                
                // Ctrl + N - Новый чат
                if (e.ctrlKey && e.key === 'n') {
                    e.preventDefault();
                    this.createNewGroup();
                }
                
                // Ctrl + U - Непрочитанные
                if (e.ctrlKey && e.key === 'u') {
                    e.preventDefault();
                    this.rightSidebar.classList.toggle('active');
                }
                
                // Ctrl + B - Уведомления
                if (e.ctrlKey && e.key === 'b') {
                    e.preventDefault();
                    this.toggleNotifications();
                }
                
                // F1 - Помощь
                if (e.key === 'F1') {
                    e.preventDefault();
                    this.showNotification(
                        "Горячие клавиши",
                        "Ctrl+/ - Поиск | Ctrl+N - Новый чат | Ctrl+U - Непрочитанные | Ctrl+B - Уведомления | ESC - Закрыть всё",
                        "info"
                    );
                }
            });
        }
        
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    }
    
    // Инициализация приложения
    window.app = new TelegramNodsApp();
});
