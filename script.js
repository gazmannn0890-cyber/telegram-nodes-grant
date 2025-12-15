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
            this.setupDemoAvatar();
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
            
            // Коммуникации - обновляем ID
            this.startVoiceCall = document.getElementById('startVoiceCall');
            this.startVideoCall = document.getElementById('startVideoCall');
            this.startConference = document.getElementById('startConference');
            
            // Убираем заголовок "Коммуникация"
            const commSection = document.querySelector('.calls-section');
            if (commSection) {
                const title = commSection.querySelector('h3');
                if (title) {
                    title.style.display = 'none';
                }
            // Коммуникации - исправленные обработчики (ОБНОВЛЕНО)
    this.startVoiceCall = document.getElementById('startVoiceCall');
    this.startVideoCall = document.getElementById('startVideoCall');
    this.startConference = document.getElementById('startConference');
    
    // Исправляем метод removeCommunicationTitle
    this.removeCommunicationTitle = function() {
        const commSection = document.querySelector('.calls-section');
        if (commSection) {
            const title = commSection.querySelector('h3');
            if (title) {
                title.style.display = 'none';
            }
        }
    };
            
            // Модальные окна
            this.callModal = document.getElementById('callModal');
            this.callContainer = document.getElementById('callContainer');
            this.conferenceModal = document.getElementById('conferenceModal');
            this.conferenceContainer = document.getElementById('conferenceContainer');
            
            // Модальное окно выбора контактов для звонка
            this.contactsModal = document.getElementById('contactsModal');
            this.contactsList = document.getElementById('contactsList');
            this.confirmCallBtn = document.getElementById('confirmCallBtn');
            this.cancelCallBtn = document.getElementById('cancelCallBtn');
            
            // Модальное окно создания группы
            this.groupModal = document.getElementById('groupModal');
            this.groupContactsList = document.getElementById('groupContactsList');
            this.confirmGroupBtn = document.getElementById('confirmGroupBtn');
            this.cancelGroupBtn = document.getElementById('cancelGroupBtn');
            this.groupNameInput = document.getElementById('groupNameInput');
            
            // Модальное окно создания канала
            this.channelModal = document.getElementById('channelModal');
            this.channelNameInput = document.getElementById('channelNameInput');
            this.confirmChannelBtn = document.getElementById('confirmChannelBtn');
            this.cancelChannelBtn = document.getElementById('cancelChannelBtn');
            
            // Сайдбар контактов - исправлено имя элемента
            this.contactsSidebar = document.getElementById('contactsSidebar');
            this.contactsListSidebar = document.getElementById('contactsListSidebar');
            this.closeContactsSidebarBtn = document.getElementById('closeContactsSidebar');
            
            // Сайдбар непрочитанных
            this.rightSidebar = document.getElementById('rightSidebar');
            this.closeSidebar = document.getElementById('closeSidebar');
            this.unreadMessages = document.getElementById('unreadMessages');
            this.markAllReadBtn = document.getElementById('markAllReadBtn');

// Сайдбар контактов
    this.contactsSidebar = document.getElementById('contactsSidebar');
    this.contactsListSidebar = document.getElementById('contactsListSidebar');
    this.openContactsBtn = document.getElementById('openContactsBtn');
    this.closeContactsSidebar = document.getElementById('closeContactsSidebar');
    this.contactsSearch = document.getElementById('contactsSearch');
                
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
            this.selectedContacts = [];
            this.selectedGroupContacts = [];
            this.currentCallType = ''; // 'voice', 'video', 'conference'
        }
        
        setupDemoAvatar() {
            // Устанавливаем демо-аватар для профиля
            const avatarElement = this.profileAvatar.querySelector('img');
            if (avatarElement) {
                avatarElement.src = 'https://ui-avatars.com/api/?name=TN&background=0088cc&color=fff&size=128';
            }
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
            
            // Данные контактов для сайдбара
            this.contacts = [
                { 
                    id: 1, 
                    name: "Павел Дуров", 
                    username: "@durov", 
                    phone: "+7 900 123-45-67", 
                    avatar: "PD", 
                    status: "online", 
                    category: "founder",
                    bio: "Основатель Telegram. Предприниматель и программист.",
                    lastSeen: "был(а) только что"
                },
                { 
                    id: 2, 
                    name: "Security Team", 
                    username: "@security", 
                    phone: "Внутренний 101", 
                    avatar: "ST", 
                    status: "online", 
                    category: "security",
                    bio: "Команда безопасности платформы",
                    lastSeen: "в сети"
                },
                { 
                    id: 3, 
                    name: "Alpha Group", 
                    username: "@alpha", 
                    phone: "Внутренний 102", 
                    avatar: "AG", 
                    status: "online", 
                    category: "professional",
                    bio: "Основная рабочая группа",
                    lastSeen: "в сети"
                },
                { 
                    id: 4, 
                    name: "John Smith", 
                    username: "@jsmith", 
                    phone: "+1 234 567-89-00", 
                    avatar: "JS", 
                    status: "away", 
                    category: "professional",
                    bio: "Руководитель проектов",
                    lastSeen: "был(а) 5 минут назад"
                },
                { 
                    id: 5, 
                    name: "Sarah Johnson", 
                    username: "@sarahj", 
                    phone: "+44 7911 123456", 
                    avatar: "SJ", 
                    status: "online", 
                    category: "government",
                    bio: "Координатор по госпроектам",
                    lastSeen: "в сети"
                },
                { 
                    id: 6, 
                    name: "Mike Chen", 
                    username: "@mikec", 
                    phone: "+86 138 0013 8000", 
                    avatar: "MC", 
                    status: "online", 
                    category: "development",
                    bio: "Lead Developer",
                    lastSeen: "в сети"
                },
                { 
                    id: 7, 
                    name: "Alex Brown", 
                    username: "@alexb", 
                    phone: "+61 412 345 678", 
                    avatar: "AB", 
                    status: "away", 
                    category: "gaming",
                    bio: "Гейм-дизайнер",
                    lastSeen: "был(а) 1 час назад"
                },
                { 
                    id: 8, 
                    name: "Emma Wilson", 
                    username: "@emmaw", 
                    phone: "+33 6 12 34 56 78", 
                    avatar: "EW", 
                    status: "online", 
                    category: "education",
                    bio: "Преподаватель IT",
                    lastSeen: "в сети"
                },
                { 
                    id: 9, 
                    name: "David Lee", 
                    username: "@davidl", 
                    phone: "+82 10 1234 5678", 
                    avatar: "DL", 
                    status: "online", 
                    category: "security",
                    bio: "Специалист по кибербезопасности",
                    lastSeen: "в сети"
                },
                { 
                    id: 10, 
                    name: "Lisa Wang", 
                    username: "@lisaw", 
                    phone: "+86 139 0013 8000", 
                    avatar: "LW", 
                    status: "offline", 
                    category: "professional",
                    bio: "Менеджер по продукту",
                    lastSeen: "был(а) вчера"
                }
            ];
            
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
                    priority: Math.random() > 0.7 ? 'high' : 'normal',
                    active: true
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
                () => this.debounce(() => this.handleSearch(), 300)
            );
            
            // Коммуникации - исправленные обработчики
            if (this.startVoiceCall) {
                this.startVoiceCall.addEventListener('click', () => this.openContactsModal('voice'));
            }
            
            if (this.startVideoCall) {
                this.startVideoCall.addEventListener('click', () => this.openContactsModal('video'));
            }
            
            if (this.startConference) {
                this.startConference.addEventListener('click', () => this.openContactsModal('conference'));
            }
            
            // Модальное окно выбора контактов для звонка
            if (this.confirmCallBtn) {
                this.confirmCallBtn.addEventListener('click', () => this.startSelectedCall());
            }
            
            if (this.cancelCallBtn) {
                this.cancelCallBtn.addEventListener('click', () => this.closeContactsModal());
            // Сайдбар контактов
    if (this.openContactsBtn) {
        this.openContactsBtn.addEventListener('click', () => this.openContactsSidebar());
    }
    
    if (this.closeContactsSidebar) {
        this.closeContactsSidebar.addEventListener('click', () => this.closeContactsSidebarFunc());
    }
    
    if (this.contactsSearch) {
        this.contactsSearch.addEventListener('input', 
            this.debounce(() => this.filterContacts(), 300)
        );
    // Добавить новый метод для открытия сайдбара контактов
openContactsSidebar() {
    if (this.contactsSidebar) {
        this.contactsSidebar.classList.add('active');
        this.renderContactsSidebar();
    }
// Обновить метод renderContactsSidebar
renderContactsSidebar() {
    if (!this.contactsListSidebar) return;
    
    const searchTerm = this.contactsSearch ? this.contactsSearch.value.toLowerCase() : '';
    
    this.contactsListSidebar.innerHTML = '';
    
    const filteredContacts = this.contacts.filter(contact => 
        !searchTerm || 
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.username.toLowerCase().includes(searchTerm) ||
        contact.phone.toLowerCase().includes(searchTerm)
    );
    
    filteredContacts.forEach(contact => {
        const contactElement = document.createElement('div');
        contactElement.className = 'contact-sidebar-item';
        contactElement.dataset.id = contact.id;
        
        contactElement.innerHTML = `
            <div class="contact-sidebar-avatar ${contact.status}">
                ${contact.avatar}
            </div>
            <div class="contact-sidebar-info">
                <div class="contact-sidebar-name">${contact.name}</div>
                <div class="contact-sidebar-status">${this.getStatusText(contact.status)} • ${contact.username}</div>
            </div>
        `;
        
        // Обработчик клика для открытия карточки контакта
        contactElement.addEventListener('click', () => {
            this.openContactCard(contact);
        });
        
        this.contactsListSidebar.appendChild(contactElement);
    });
    
    // Если контактов нет
    if (filteredContacts.length === 0) {
        this.contactsListSidebar.innerHTML = `
            <div class="no-contacts">
                <i class="fas fa-user-slash"></i>
                <p>Контакты не найдены</p>
            </div>
        `;
    }
}

// Добавить метод фильтрации контактов
filterContacts() {
    this.renderContactsSidebar();
}

// Добавить метод для открытия модального окна создания группы (исправленный)
openGroupModal() {
    console.log('Opening group modal'); // Для отладки
    this.selectedGroupContacts = [];
    
    if (this.groupModal) {
        // Рендерим список контактов для группы
        this.renderGroupContactsList();
        
        // Сбрасываем имя группы
        if (this.groupNameInput) {
            this.groupNameInput.value = '';
        }
        
        // Показываем модальное окно
        this.groupModal.classList.add('active');
        
        // Активируем кнопку подтверждения
        this.updateConfirmGroupButton();
    } else {
        console.error('Group modal not found');
    }
}

// Добавить метод для открытия модального окна создания канала (исправленный)
openChannelModal() {
    console.log('Opening channel modal'); // Для отладки
    
    if (this.channelModal) {
        if (this.channelNameInput) {
            this.channelNameInput.value = '';
        }
        this.channelModal.classList.add('active');
    } else {
        console.error('Channel modal not found');
    }
}
            
            // Модальное окно создания группы
            if (this.confirmGroupBtn) {
                this.confirmGroupBtn.addEventListener('click', () => this.createGroupWithContacts());
            }
            
            if (this.cancelGroupBtn) {
                this.cancelGroupBtn.addEventListener('click', () => this.closeGroupModal());
            }
            
            // Модальное окно создания канала
            if (this.confirmChannelBtn) {
                this.confirmChannelBtn.addEventListener('click', () => this.createNewChannelWithName());
            }
            
            if (this.cancelChannelBtn) {
                this.cancelChannelBtn.addEventListener('click', () => this.closeChannelModal());
            }
            
            // Создание группы и канала - исправленные обработчики
            if (this.createGroup) {
                this.createGroup.addEventListener('click', () => this.openGroupModal());
            }
            
            if (this.createChannel) {
                this.createChannel.addEventListener('click', () => this.openChannelModal());
            }
            
            // Сайдбар контактов - исправлено имя метода
            if (this.closeContactsSidebarBtn) {
                this.closeContactsSidebarBtn.addEventListener('click', () => this.closeContactsSidebarFunc());
            }
            
            // Сайдбар непрочитанных
            if (this.closeSidebar) {
                this.closeSidebar.addEventListener('click', () => this.closeUnreadSidebar());
            }
            
            if (this.markAllReadBtn) {
                this.markAllReadBtn.addEventListener('click', () => this.markAllAsRead());
            }
            
            // Уведомления
            if (this.notificationsBtn) {
                this.notificationsBtn.addEventListener('click', () => this.toggleNotifications());
            }
            
            if (this.closeNotifications) {
                this.closeNotifications.addEventListener('click', () => this.closeNotificationsPanel());
            }
            
            // Закрытие окон по ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeAllModals();
                }
            });
            
            // Клик вне модальных окон
            document.addEventListener('click', (e) => {
                if (this.callModal && this.callModal.classList.contains('active') && 
                    !e.target.closest('.call-container') && 
                    !e.target.closest('.call-control-btn')) {
                    this.endCall();
                }
                if (this.conferenceModal && this.conferenceModal.classList.contains('active') && 
                    !e.target.closest('.conference-container') && 
                    !e.target.closest('.conference-control-btn')) {
                    this.leaveConference();
                }
                if (this.contactsModal && this.contactsModal.classList.contains('active') && 
                    !e.target.closest('.contacts-modal-content')) {
                    this.closeContactsModal();
                }
                if (this.groupModal && this.groupModal.classList.contains('active') && 
                    !e.target.closest('.group-modal-content')) {
                    this.closeGroupModal();
                }
                if (this.channelModal && this.channelModal.classList.contains('active') && 
                    !e.target.closest('.channel-modal-content')) {
                    this.closeChannelModal();
                }
         // Коммуникации - УБЕДИТЕСЬ что этот код есть:
    if (this.startVoiceCall) {
        this.startVoiceCall.addEventListener('click', () => {
            console.log('Voice call clicked'); // Для отладки
            this.openContactsModal('voice');
        });
    }
    
    if (this.startVideoCall) {
        this.startVideoCall.addEventListener('click', () => {
            console.log('Video call clicked'); // Для отладки
            this.openContactsModal('video');
        });
    }
    
    if (this.startConference) {
        this.startConference.addEventListener('click', () => {
            console.log('Conference clicked'); // Для отладки
            this.openContactsModal('conference');
      // Создание группы и канала
    if (this.createGroup) {
        this.createGroup.addEventListener('click', (e) => {
            console.log('Create group clicked'); // Для отладки
            e.stopPropagation();
            this.openGroupModal();
        });
    }
    
    if (this.createChannel) {
        this.createChannel.addEventListener('click', (e) => {
            console.log('Create channel clicked'); // Для отладки
            e.stopPropagation();
            this.openChannelModal();
        });
    }
        
        initPreloader() {
            // Автоматический клик по самолетику через 1.5 секунды
            setTimeout(() => {
                if (!this.isLoggedIn && this.telegramPlane) {
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
                this.renderContactsSidebar();
                this.setupDemoAvatar();
                
                // Убираем нижние иконки (статус нод)
                this.hideBottomIcons();
                
                // Убираем заголовок "Коммуникация"
                this.removeCommunicationTitle();
                
                // Показываем приветственное уведомление
                this.showNotification(
                    "Добро пожаловать в Telegram Nods!",
                    "Универсальная платформа для геймеров, разработчиков и профессионалов.",
                    "success"
                );
            }, 3500);
        }
        
        hideBottomIcons() {
            // Ищем и скрываем нижние иконки статуса нод
            const bottomIcons = document.querySelector('.node-status-container');
            if (bottomIcons) {
                bottomIcons.style.display = 'none';
            }
        }
        
        removeCommunicationTitle() {
            // Убираем заголовок "Коммуникация"
            const commSection = document.querySelector('.calls-section');
            if (commSection) {
                const title = commSection.querySelector('h3');
                if (title) {
                    title.style.display = 'none';
                }
            }
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
            if (!this.chatsGrid) return;
            
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
            element.dataset.chatId = chat.id;
            
            element.innerHTML = `
                <div class="chat-header">
                    <div class="chat-category">
                        <i class="fas ${chat.icon}"></i>
                        <span>${this.getCategoryName(chat.category)}</span>
                    </div>
                    ${chat.unread > 0 ? `
                        <div class="chat-urgency">
                            <span class="unread-count-badge">${chat.unread}</span> непрочитанных
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
            
            // Добавляем обработчик клика на весь чат
            element.addEventListener('click', () => {
                this.openChat(chat);
            });
            
            return element;
        }
        
        openChat(chat) {
            // Уменьшаем счетчик непрочитанных
            if (chat.unread > 0) {
                chat.unread = 0;
                this.updateChatUnreadCount(chat.id);
                this.updateUnreadCounters();
            }
            
            // Создаем и показываем модальное окно чата
            const chatModal = document.createElement('div');
            chatModal.className = 'chat-modal';
            chatModal.innerHTML = `
                <div class="chat-modal-content">
                    <div class="chat-modal-header">
                        <div class="chat-modal-title">
                            <div class="chat-avatar">
                                <i class="fas ${chat.icon}"></i>
                            </div>
                            <div>
                                <h3>${chat.title}</h3>
                                <div class="chat-subtitle">
                                    <span class="online-status">● онлайн</span>
                                    <span> • ${chat.members} участников</span>
                                </div>
                            </div>
                        </div>
                        <button class="close-chat-modal">&times;</button>
                    </div>
                    
                    <div class="chat-modal-body">
                        <div class="chat-info-bar">
                            <div class="chat-info-item">
                                <i class="fas fa-info-circle"></i>
                                <span>${this.getCategoryName(chat.category)}</span>
                            </div>
                            <div class="chat-info-item">
                                <i class="fas fa-clock"></i>
                                <span>Активность: ${chat.lastActive}</span>
                            </div>
                        </div>
                        
                        <div class="chat-messages-container">
                            <div class="chat-messages">
                                <div class="message-date">Сегодня</div>
                                
                                <div class="message incoming">
                                    <div class="message-avatar">
                                        ${chat.title.substring(0, 2)}
                                    </div>
                                    <div class="message-content">
                                        <div class="message-sender">${chat.title}</div>
                                        <div class="message-text">Добро пожаловать в чат! Этот чат активен и готов к общению.</div>
                                        <div class="message-time">10:45</div>
                                    </div>
                                </div>
                                
                                <div class="message outgoing">
                                    <div class="message-avatar">
                                        <span>TN</span>
                                    </div>
                                    <div class="message-content">
                                        <div class="message-sender">Вы</div>
                                        <div class="message-text">Привет! Я подключился к чату.</div>
                                        <div class="message-time">10:46</div>
                                    </div>
                                </div>
                                
                                <div class="message incoming">
                                    <div class="message-avatar">
                                        ${chat.title.substring(0, 2)}
                                    </div>
                                    <div class="message-content">
                                        <div class="message-sender">${chat.title}</div>
                                        <div class="message-text">Рады видеть вас здесь! Мы обсуждаем ${chat.description.toLowerCase()}</div>
                                        <div class="message-time">10:47</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="chat-input-container">
                            <div class="chat-input">
                                <input type="text" placeholder="Введите сообщение..." id="chatMessageInput">
                                <div class="chat-input-actions">
                                    <button class="chat-attachment-btn">
                                        <i class="fas fa-paperclip"></i>
                                    </button>
                                    <button id="sendMessageBtn">
                                        <i class="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="chat-actions-bar">
                                <button class="chat-action-btn">
                                    <i class="fas fa-phone"></i>
                                </button>
                                <button class="chat-action-btn">
                                    <i class="fas fa-video"></i>
                                </button>
                                <button class="chat-action-btn">
                                    <i class="fas fa-user-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(chatModal);
            
            // Анимация появления
            setTimeout(() => {
                chatModal.classList.add('active');
            }, 10);
            
            // Обработчики для модального окна чата
            const closeBtn = chatModal.querySelector('.close-chat-modal');
            const sendBtn = chatModal.querySelector('#sendMessageBtn');
            const messageInput = chatModal.querySelector('#chatMessageInput');
            
            closeBtn.addEventListener('click', () => {
                chatModal.classList.remove('active');
                setTimeout(() => {
                    if (chatModal.parentNode) {
                        chatModal.parentNode.removeChild(chatModal);
                    }
                }, 300);
            });
            
            sendBtn.addEventListener('click', () => {
                const message = messageInput.value.trim();
                if (message) {
                    this.sendChatMessage(chatModal, message, chat.title.substring(0, 2));
                    messageInput.value = '';
                }
            });
            
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const message = messageInput.value.trim();
                    if (message) {
                        this.sendChatMessage(chatModal, message, chat.title.substring(0, 2));
                        messageInput.value = '';
                    }
                }
            });
            
            // Обработчики для кнопок действий в чате
            const callBtn = chatModal.querySelector('.chat-actions-bar .fa-phone').closest('button');
            const videoBtn = chatModal.querySelector('.chat-actions-bar .fa-video').closest('button');
            const addUserBtn = chatModal.querySelector('.chat-actions-bar .fa-user-plus').closest('button');
            
            if (callBtn) {
                callBtn.addEventListener('click', () => {
                    this.startVoiceCallToContact(chat.title, chat.title.substring(0, 2));
                    chatModal.classList.remove('active');
                    setTimeout(() => {
                        if (chatModal.parentNode) {
                            chatModal.parentNode.removeChild(chatModal);
                        }
                    }, 300);
                });
            }
            
            if (videoBtn) {
                videoBtn.addEventListener('click', () => {
                    this.startVideoCallToContact(chat.title, chat.title.substring(0, 2));
                    chatModal.classList.remove('active');
                    setTimeout(() => {
                        if (chatModal.parentNode) {
                            chatModal.parentNode.removeChild(chatModal);
                        }
                    }, 300);
                });
            }
            
            if (addUserBtn) {
                addUserBtn.addEventListener('click', () => {
                    this.showNotification(
                        "Добавление участника",
                        "Функция добавления участников доступна в полной версии",
                        "info"
                    );
                });
            }
            
            // Клик вне окна для закрытия
            chatModal.addEventListener('click', (e) => {
                if (e.target === chatModal) {
                    chatModal.classList.remove('active');
                    setTimeout(() => {
                        if (chatModal.parentNode) {
                            chatModal.parentNode.removeChild(chatModal);
                        }
                    }, 300);
                }
            });
            
            this.showNotification(
                `Открыт чат: ${chat.title}`,
                `Вы перешли в режим общения с ${chat.members} участниками`,
                "success"
            );
        }
        
        sendChatMessage(chatModal, message, avatarText) {
            const messagesContainer = chatModal.querySelector('.chat-messages');
            
            const messageElement = document.createElement('div');
            messageElement.className = 'message outgoing';
            messageElement.innerHTML = `
                <div class="message-avatar">
                    <span>TN</span>
                </div>
                <div class="message-content">
                    <div class="message-sender">Вы</div>
                    <div class="message-text">${message}</div>
                    <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                </div>
            `;
            
            messagesContainer.appendChild(messageElement);
            
            // Прокручиваем вниз
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Симуляция ответа через 1 секунду
            setTimeout(() => {
                const replyElement = document.createElement('div');
                replyElement.className = 'message incoming';
                replyElement.innerHTML = `
                    <div class="message-avatar">
                        ${avatarText}
                    </div>
                    <div class="message-content">
                        <div class="message-sender">${chatModal.querySelector('.chat-modal-title h3').textContent}</div>
                        <div class="message-text">Сообщение получено. Спасибо за ваше сообщение!</div>
                        <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </div>
                `;
                
                messagesContainer.appendChild(replyElement);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
        }
        
        markChatAsRead(chatId) {
            // Находим чат во всех категориях
            for (const category in this.chatsData) {
                const chatIndex = this.chatsData[category].findIndex(chat => chat.id === chatId);
                if (chatIndex > -1 && this.chatsData[category][chatIndex].unread > 0) {
                    this.chatsData[category][chatIndex].unread = 0;
                    
                    // Обновляем отображение
                    const chatElement = document.querySelector(`.chat-card[data-chat-id="${chatId}"]`);
                    if (chatElement) {
                        const urgencyDiv = chatElement.querySelector('.chat-urgency');
                        if (urgencyDiv) {
                            urgencyDiv.remove();
                        }
                    }
                    
                    this.showNotification(
                        "Чат прочитан",
                        "Все сообщения в чате отмечены как прочитанные",
                        "success"
                    );
                    break;
                }
            }
        }
        
        updateChatUnreadCount(chatId) {
            // Обновляем счетчик в данных
            for (const category in this.chatsData) {
                const chat = this.chatsData[category].find(c => c.id === chatId);
                if (chat && chat.unread > 0) {
                    chat.unread = 0;
                }
            }
            
            // Обновляем отображение
            const chatElement = document.querySelector(`.chat-card[data-chat-id="${chatId}"]`);
            if (chatElement) {
                const urgencyDiv = chatElement.querySelector('.chat-urgency');
                if (urgencyDiv) {
                    urgencyDiv.remove();
                }
            }
        }
        
        updateChatCount() {
            const chats = this.chatsData[this.currentFilter] || [];
            const count = this.currentSearch ? 
                chats.filter(c => 
                    c.title.toLowerCase().includes(this.currentSearch) ||
                    c.description.toLowerCase().includes(this.currentSearch)
                ).length : 
                chats.length;
            
            if (this.activeCount) {
                this.activeCount.textContent = `${count} активных диалогов`;
            }
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
        
        openContactsModal(callType) {
            this.currentCallType = callType;
            this.selectedContacts = [];
            
            // Заголовок в зависимости от типа звонка
            const titles = {
                'voice': 'Голосовой звонок',
                'video': 'Видеозвонок',
                'conference': 'Конференция'
            };
            
            if (this.contactsModal) {
                const titleElement = this.contactsModal.querySelector('h2');
                const infoElement = this.contactsModal.querySelector('.call-type-info');
                
                if (titleElement) {
                    titleElement.innerHTML = 
                        `<i class="fas ${callType === 'voice' ? 'fa-phone' : callType === 'video' ? 'fa-video' : 'fa-users'}"></i> ${titles[callType]}`;
                }
                
                if (infoElement) {
                    infoElement.textContent = 
                        `Выберите контакты для ${titles[callType].toLowerCase()}`;
                }
                
                // Рендерим список контактов
                this.renderContactsListForCall();
                
                // Показываем модальное окно
                this.contactsModal.classList.add('active');
            }
        }
        
        renderContactsListForCall() {
            if (!this.contactsList) return;
            
            this.contactsList.innerHTML = '';
            
            this.contacts.forEach(contact => {
                const contactElement = document.createElement('div');
                contactElement.className = 'contact-item';
                contactElement.dataset.id = contact.id;
                
                contactElement.innerHTML = `
                    <div class="contact-select">
                        <input type="${this.currentCallType === 'conference' ? 'checkbox' : 'radio'}" 
                               name="contactSelect" 
                               id="contact_${contact.id}"
                               value="${contact.id}">
                    </div>
                    
                    <div class="contact-avatar ${contact.status}">
                        ${contact.avatar}
                    </div>
                    
                    <div class="contact-info">
                        <div class="contact-name">${contact.name}</div>
                        <div class="contact-status">${this.getStatusText(contact.status)} • ${this.getCategoryName(contact.category)}</div>
                    </div>
                `;
                
                // Обработчик выбора контакта
                const input = contactElement.querySelector('input');
                input.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        if (this.currentCallType === 'conference') {
                            this.selectedContacts.push(contact.id);
                        } else {
                            this.selectedContacts = [contact.id];
                        }
                    } else {
                        const index = this.selectedContacts.indexOf(contact.id);
                        if (index > -1) {
                            this.selectedContacts.splice(index, 1);
                        }
                    }
                    
                    // Активируем кнопку подтверждения если выбран хотя бы один контакт
                    if (this.confirmCallBtn) {
                        this.confirmCallBtn.disabled = this.selectedContacts.length === 0;
                    }
                });
                
                this.contactsList.appendChild(contactElement);
            });
            
            // Сбрасываем состояние кнопки
            if (this.confirmCallBtn) {
                this.confirmCallBtn.disabled = true;
            }
        }
        
        getStatusText(status) {
            const statuses = {
                'online': 'В сети',
                'away': 'Отошел',
                'offline': 'Не в сети',
                'busy': 'Занят'
            };
            return statuses[status] || status;
        }
        
        startSelectedCall() {
            if (this.selectedContacts.length === 0) {
                this.showNotification(
                    "Ошибка",
                    "Выберите хотя бы один контакт для звонка",
                    "error"
                );
                return;
            }
            
            this.closeContactsModal();
            
            // Получаем информацию о выбранных контактах
            const selectedContactsInfo = this.contacts.filter(contact => 
                this.selectedContacts.includes(contact.id)
            );
            
            // Запускаем соответствующий тип звонка
            switch (this.currentCallType) {
                case 'voice':
                    this.startVoiceCallWithContacts(selectedContactsInfo);
                    break;
                case 'video':
                    this.startVideoCallWithContacts(selectedContactsInfo);
                    break;
                case 'conference':
                    this.startConferenceWithContacts(selectedContactsInfo);
                    break;
            }
        }
        
        startVoiceCallWithContacts(contacts) {
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
            
            const participantsNames = contacts.map(c => c.name).join(' • ');
            
            if (this.callContainer) {
                this.callContainer.innerHTML = `
                    <div class="call-header">
                        <h2><i class="fas fa-phone"></i> Голосовой звонок</h2>
                        <div class="call-participants">${participantsNames}</div>
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
                
                if (this.callModal) {
                    this.callModal.classList.add('active');
                }
                
                // Запускаем таймер
                this.startCallTimer();
                
                // Добавляем обработчики для кнопок звонка
                setTimeout(() => {
                    const toggleMute = document.getElementById('toggleMute');
                    const toggleVideo = document.getElementById('toggleVideo');
                    const endCallBtn = document.getElementById('endCallBtn');
                    const leaveCallBtn = document.getElementById('leaveCallBtn');
                    
                    if (toggleMute) {
                        toggleMute.addEventListener('click', () => {
                            const icon = toggleMute.querySelector('i');
                            icon.classList.toggle('fa-microphone');
                            icon.classList.toggle('fa-microphone-slash');
                            
                            this.showNotification(
                                "Микрофон",
                                icon.classList.contains('fa-microphone-slash') ? 
                                "Микрофон отключен" : "Микрофон включен",
                                "info"
                            );
                        });
                    }
                    
                    if (toggleVideo) {
                        toggleVideo.addEventListener('click', () => {
                            const icon = toggleVideo.querySelector('i');
                            icon.classList.toggle('fa-video');
                            icon.classList.toggle('fa-video-slash');
                            
                            this.showNotification(
                                "Камера",
                                icon.classList.contains('fa-video-slash') ? 
                                "Камера отключена" : "Камера включена",
                                "info"
                            );
                        });
                    }
                    
                    if (endCallBtn) endCallBtn.addEventListener('click', () => this.endCall());
                    if (leaveCallBtn) leaveCallBtn.addEventListener('click', () => this.endCall());
                }, 100);
            }
            
            this.showNotification(
                "Голосовой звонок начат",
                `Вы подключены к звонку с ${contacts.length} участником(ами)`,
                "success"
            );
        }
        
        startVoiceCallToContact(name, avatar) {
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
            
            if (this.callContainer) {
                this.callContainer.innerHTML = `
                    <div class="call-header">
                        <h2><i class="fas fa-phone"></i> Голосовой звонок</h2>
                        <div class="call-participants">${name}</div>
                    </div>
                    
                    <div class="call-content">
                        <div class="call-avatar-large">
                            <div class="call-contact-avatar">${avatar}</div>
                        </div>
                        
                        <div class="call-status">Идет звонок с ${name}...</div>
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
                            <i class="fas fa-sign-out-alt"></i> Завершить звонок
                        </button>
                    </div>
                `;
                
                if (this.callModal) {
                    this.callModal.classList.add('active');
                }
                
                // Запускаем таймер
                this.startCallTimer();
                
                // Добавляем обработчики для кнопок звонка
                setTimeout(() => {
                    const toggleMute = document.getElementById('toggleMute');
                    const toggleVideo = document.getElementById('toggleVideo');
                    const endCallBtn = document.getElementById('endCallBtn');
                    const leaveCallBtn = document.getElementById('leaveCallBtn');
                    
                    if (toggleMute) {
                        toggleMute.addEventListener('click', () => {
                            const icon = toggleMute.querySelector('i');
                            icon.classList.toggle('fa-microphone');
                            icon.classList.toggle('fa-microphone-slash');
                        });
                    }
                    
                    if (toggleVideo) {
                        toggleVideo.addEventListener('click', () => {
                            const icon = toggleVideo.querySelector('i');
                            icon.classList.toggle('fa-video');
                            icon.classList.toggle('fa-video-slash');
                        });
                    }
                    
                    if (endCallBtn) endCallBtn.addEventListener('click', () => this.endCall());
                    if (leaveCallBtn) leaveCallBtn.addEventListener('click', () => this.endCall());
                }, 100);
            }
            
            this.showNotification(
                "Звонок начат",
                `Вы звоните ${name}`,
                "success"
            );
        }
        
        startVideoCallToContact(name, avatar) {
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
            
            if (this.callContainer) {
                this.callContainer.innerHTML = `
                    <div class="call-header">
                        <h2><i class="fas fa-video"></i> Видеозвонок</h2>
                        <div class="call-participants">${name}</div>
                    </div>
                    
                    <div class="call-content">
                        <div class="call-grid">
                            <div class="video-feed contact">
                                <div class="video-avatar">${avatar}</div>
                                <div class="video-name">${name}</div>
                            </div>
                            
                            <div class="video-feed you">
                                <div class="video-avatar">TN</div>
                                <div class="video-name">Вы</div>
                            </div>
                        </div>
                        
                        <div class="call-status">Идет видеозвонок с ${name}...</div>
                        <div class="call-timer" id="callTimer">00:00</div>
                        
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
                            <i class="fas fa-sign-out-alt"></i> Завершить видеозвонок
                        </button>
                    </div>
                `;
                
                if (this.callModal) {
                    this.callModal.classList.add('active');
                }
                
                // Запускаем таймер
                this.startCallTimer();
                
                // Добавляем обработчики
                setTimeout(() => {
                    const toggleMute = document.getElementById('toggleMute');
                    const toggleVideo = document.getElementById('toggleVideo');
                    const endCallBtn = document.getElementById('endCallBtn');
                    const leaveCallBtn = document.getElementById('leaveCallBtn');
                    
                    if (toggleMute) {
                        toggleMute.addEventListener('click', () => {
                            const icon = toggleMute.querySelector('i');
                            icon.classList.toggle('fa-microphone');
                            icon.classList.toggle('fa-microphone-slash');
                        });
                    }
                    
                    if (toggleVideo) {
                        toggleVideo.addEventListener('click', () => {
                            const icon = toggleVideo.querySelector('i');
                            icon.classList.toggle('fa-video');
                            icon.classList.toggle('fa-video-slash');
                        });
                    }
                    
                    if (endCallBtn) endCallBtn.addEventListener('click', () => this.endCall());
                    if (leaveCallBtn) leaveCallBtn.addEventListener('click', () => this.endCall());
                }, 100);
            }
            
            this.showNotification(
                "Видеозвонок начат",
                `Вы звоните ${name}`,
                "success"
            );
        }
        
        startCallTimer() {
            this.callStartTime = new Date();
            this.callTimer = setInterval(() => {
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
            if (this.callModal) {
                this.callModal.classList.remove('active');
            }
            
            if (this.callTimer) {
                clearInterval(this.callTimer);
                this.callTimer = null;
            }
            
            this.callStartTime = null;
            
            this.showNotification(
                "Звонок завершен",
                "Вы завершили звонок",
                "info"
            );
        }
        
        leaveConference() {
            this.isInConference = false;
            if (this.conferenceModal) {
                this.conferenceModal.classList.remove('active');
            }
            
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
        
        closeContactsModal() {
            if (this.contactsModal) {
                this.contactsModal.classList.remove('active');
            }
            this.selectedContacts = [];
            this.currentCallType = '';
        }
        
        openGroupModal() {
            this.selectedGroupContacts = [];
            this.groupNameInput.value = '';
            
            if (this.groupModal) {
                // Рендерим список контактов для группы
                this.renderGroupContactsList();
                
                // Показываем модальное окно
                this.groupModal.classList.add('active');
            }
        }
        
        renderGroupContactsList() {
            if (!this.groupContactsList) return;
            
            this.groupContactsList.innerHTML = '';
            
            this.contacts.forEach(contact => {
                const contactElement = document.createElement('div');
                contactElement.className = 'contact-item';
                contactElement.dataset.id = contact.id;
                
                contactElement.innerHTML = `
                    <div class="contact-select">
                        <input type="checkbox" 
                               name="groupContactSelect" 
                               id="group_contact_${contact.id}"
                               value="${contact.id}">
                    </div>
                    
                    <div class="contact-avatar ${contact.status}">
                        ${contact.avatar}
                    </div>
                    
                    <div class="contact-info">
                        <div class="contact-name">${contact.name}</div>
                        <div class="contact-status">${this.getStatusText(contact.status)} • ${this.getCategoryName(contact.category)}</div>
                    </div>
                `;
                
                // Обработчик выбора контакта
                const input = contactElement.querySelector('input');
                input.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        this.selectedGroupContacts.push(contact.id);
                    } else {
                        const index = this.selectedGroupContacts.indexOf(contact.id);
                        if (index > -1) {
                            this.selectedGroupContacts.splice(index, 1);
                        }
                    }
                    
                    // Активируем кнопку подтверждения если выбраны контакты и введено имя
                    this.updateConfirmGroupButton();
                });
                
                this.groupContactsList.appendChild(contactElement);
            });
            
            // Обработчик ввода имени группы
            if (this.groupNameInput) {
                this.groupNameInput.addEventListener('input', () => {
                    this.updateConfirmGroupButton();
                });
                
                // Сбрасываем состояние кнопки
                if (this.confirmGroupBtn) {
                    this.confirmGroupBtn.disabled = true;
                }
            }
        }
        
        updateConfirmGroupButton() {
            const hasName = this.groupNameInput && this.groupNameInput.value.trim().length > 0;
            const hasContacts = this.selectedGroupContacts.length > 0;
            if (this.confirmGroupBtn) {
                this.confirmGroupBtn.disabled = !(hasName && hasContacts);
            }
        }
        
        createGroupWithContacts() {
            const groupName = this.groupNameInput ? this.groupNameInput.value.trim() : '';
            
            if (!groupName) {
                this.showNotification(
                    "Ошибка",
                    "Введите название группы",
                    "error"
                );
                return;
            }
            
            if (this.selectedGroupContacts.length === 0) {
                this.showNotification(
                    "Ошибка",
                    "Выберите хотя бы одного участника для группы",
                    "error"
                );
                return;
            }
            
            // Получаем информацию о выбранных контактах
            const selectedContactsInfo = this.contacts.filter(contact => 
                this.selectedGroupContacts.includes(contact.id)
            );
            
            // Закрываем модальное окно
            this.closeGroupModal();
            
            // Создаем новую группу
            const newGroupId = Date.now(); // Используем timestamp как ID
            const newGroup = {
                id: newGroupId,
                title: groupName,
                category: 'professional',
                icon: 'fa-users',
                description: `Группа создана с ${selectedContactsInfo.length} участниками`,
                members: selectedContactsInfo.length + 1, // +1 для себя
                unread: 1,
                lastActive: 'Только что',
                priority: 'high',
                active: true
            };
            
            // Добавляем группу во все категории и в профессиональные
            this.chatsData.all.unshift(newGroup);
            this.chatsData.professional.unshift(newGroup);
            
            // Обновляем отображение
            this.currentFilter = 'all';
            this.renderChats();
            this.updateChatCount();
            
            this.showNotification(
                "Группа создана",
                `Группа "${groupName}" успешно создана с ${selectedContactsInfo.length} участниками`,
                "success"
            );
        }
        
        closeGroupModal() {
            if (this.groupModal) {
                this.groupModal.classList.remove('active');
            }
            this.selectedGroupContacts = [];
        }
        
        openChannelModal() {
            if (this.channelModal) {
                if (this.channelNameInput) {
                    this.channelNameInput.value = '';
                }
                this.channelModal.classList.add('active');
            }
        }
        
        createNewChannelWithName() {
            const channelName = this.channelNameInput ? this.channelNameInput.value.trim() : '';
            
            if (!channelName) {
                this.showNotification(
                    "Ошибка",
                    "Введите название канала",
                    "error"
                );
                return;
            }
            
            // Закрываем модальное окно
            this.closeChannelModal();
            
            // Создаем новый канал
            const newChannelId = Date.now();
            const newChannel = {
                id: newChannelId,
                title: channelName,
                category: 'professional',
                icon: 'fa-bullhorn',
                description: `Канал "${channelName}" - публичные объявления`,
                members: Math.floor(Math.random() * 1000) + 100,
                unread: 3,
                lastActive: 'Только что',
                priority: 'high',
                active: true
            };
            
            // Добавляем канал во все категории
            this.chatsData.all.unshift(newChannel);
            
            // Обновляем отображение
            this.currentFilter = 'all';
            this.renderChats();
            this.updateChatCount();
            
            this.showNotification(
                "Канал создан",
                `Канал "${channelName}" успешно создан`,
                "success"
            );
        }
        
        closeChannelModal() {
            if (this.channelModal) {
                this.channelModal.classList.remove('active');
            }
        }
        
        renderContactsSidebar() {
            if (!this.contactsListSidebar) return;
            
            this.contactsListSidebar.innerHTML = '';
            
            this.contacts.forEach(contact => {
                const contactElement = document.createElement('div');
                contactElement.className = 'contact-sidebar-item';
                contactElement.dataset.id = contact.id;
                
                contactElement.innerHTML = `
                    <div class="contact-sidebar-avatar ${contact.status}">
                        ${contact.avatar}
                    </div>
                    <div class="contact-sidebar-info">
                        <div class="contact-sidebar-name">${contact.name}</div>
                        <div class="contact-sidebar-status">${this.getStatusText(contact.status)}</div>
                    </div>
                `;
                
                // Обработчик клика для открытия карточки контакта
                contactElement.addEventListener('click', () => {
                    this.openContactCard(contact);
                });
                
                this.contactsListSidebar.appendChild(contactElement);
            });
        }
        
        openContactCard(contact) {
            // Создаем модальное окно карточки контакта
            const contactCardModal = document.createElement('div');
            contactCardModal.className = 'contact-card-modal';
            contactCardModal.innerHTML = `
                <div class="contact-card-content">
                    <div class="contact-card-header">
                        <button class="close-contact-card">&times;</button>
                        <div class="contact-card-actions">
                            <button class="contact-card-action-btn" data-action="audio">
                                <i class="fas fa-phone"></i>
                            </button>
                            <button class="contact-card-action-btn" data-action="video">
                                <i class="fas fa-video"></i>
                            </button>
                            <button class="contact-card-action-btn" data-action="message">
                                <i class="fas fa-comment"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="contact-card-body">
                        <div class="contact-card-avatar ${contact.status}">
                            ${contact.avatar}
                        </div>
                        
                        <div class="contact-card-name">${contact.name}</div>
                        <div class="contact-card-username">${contact.username}</div>
                        
                        <div class="contact-card-info">
                            <div class="contact-info-item">
                                <i class="fas fa-phone"></i>
                                <span>${contact.phone}</span>
                            </div>
                            <div class="contact-info-item">
                                <i class="fas fa-circle"></i>
                                <span class="status-text">${this.getStatusText(contact.status)} • ${contact.lastSeen}</span>
                            </div>
                            <div class="contact-info-item">
                                <i class="fas fa-briefcase"></i>
                                <span>${this.getCategoryName(contact.category)}</span>
                            </div>
                        </div>
                        
                        <div class="contact-card-bio">
                            <h4>О себе</h4>
                            <p>${contact.bio}</p>
                        </div>
                        
                        <div class="contact-card-actions-main">
                            <button class="contact-card-main-btn audio-call">
                                <i class="fas fa-phone"></i>
                                <span>Аудиозвонок</span>
                            </button>
                            <button class="contact-card-main-btn video-call">
                                <i class="fas fa-video"></i>
                                <span>Видеозвонок</span>
                            </button>
                            <button class="contact-card-main-btn message">
                                <i class="fas fa-comment"></i>
                                <span>Сообщение</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(contactCardModal);
            
            // Анимация появления
            setTimeout(() => {
                contactCardModal.classList.add('active');
            }, 10);
            
            // Обработчики для карточки контакта
            const closeBtn = contactCardModal.querySelector('.close-contact-card');
            const audioCallBtn = contactCardModal.querySelector('.audio-call');
            const videoCallBtn = contactCardModal.querySelector('.video-call');
            const messageBtn = contactCardModal.querySelector('.message');
            
            closeBtn.addEventListener('click', () => {
                contactCardModal.classList.remove('active');
                setTimeout(() => {
                    if (contactCardModal.parentNode) {
                        contactCardModal.parentNode.removeChild(contactCardModal);
                    }
                }, 300);
            });
            
            audioCallBtn.addEventListener('click', () => {
                this.startVoiceCallToContact(contact.name, contact.avatar);
                contactCardModal.classList.remove('active');
                setTimeout(() => {
                    if (contactCardModal.parentNode) {
                        contactCardModal.parentNode.removeChild(contactCardModal);
                    }
                }, 300);
            });
            
            videoCallBtn.addEventListener('click', () => {
                this.startVideoCallToContact(contact.name, contact.avatar);
                contactCardModal.classList.remove('active');
                setTimeout(() => {
                    if (contactCardModal.parentNode) {
                        contactCardModal.parentNode.removeChild(contactCardModal);
                    }
                }, 300);
            });
            
            messageBtn.addEventListener('click', () => {
                this.openChatWithContact(contact);
                contactCardModal.classList.remove('active');
                setTimeout(() => {
                    if (contactCardModal.parentNode) {
                        contactCardModal.parentNode.removeChild(contactCardModal);
                    }
                }, 300);
            });
            
            // Клик вне окна для закрытия
            contactCardModal.addEventListener('click', (e) => {
                if (e.target === contactCardModal) {
                    contactCardModal.classList.remove('active');
                    setTimeout(() => {
                        if (contactCardModal.parentNode) {
                            contactCardModal.parentNode.removeChild(contactCardModal);
                        }
                    }, 300);
                }
            });
        }
        
        openChatWithContact(contact) {
            // Создаем чат с контактом
            const chat = {
                id: Date.now(),
                title: contact.name,
                category: 'professional',
                icon: 'fa-user',
                description: `Личная переписка с ${contact.name}`,
                members: 2,
                unread: 0,
                lastActive: 'Только что',
                priority: 'normal',
                active: true
            };
            
            this.openChat(chat);
        }
        
        closeContactsSidebarFunc() {
            if (this.contactsSidebar) {
                this.contactsSidebar.classList.remove('active');
            }
        }
        
        closeUnreadSidebar() {
            if (this.rightSidebar) {
                this.rightSidebar.classList.remove('active');
            }
        }
        
        renderUnreadMessages() {
            if (!this.unreadMessages) return;
            
            this.unreadMessages.innerHTML = '';
            
            this.unreadData.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.className = 'unread-message-item';
                messageElement.innerHTML = `
                    <div class="message-header">
                        <div class="message-sender">
                            <div class="sender-avatar">${message.senderInitials}</div>
                            <span class="sender-name">${message.sender}</span>
                        </div>
                        <span class="message-time">${message.time}</span>
                    </div>
                    <div class="message-content">
                        ${message.message}
                    </div>
                    <div class="message-actions">
                        <button class="message-action-btn reply">Ответить</button>
                        <button class="message-action-btn mark-read">Прочитано</button>
                    </div>
                `;
                
                // Добавляем обработчики
                const replyBtn = messageElement.querySelector('.reply');
                const markReadBtn = messageElement.querySelector('.mark-read');
                
                replyBtn.addEventListener('click', () => {
                    this.showNotification(
                        "Ответ на сообщение",
                        "Функция ответа будет доступна в следующем обновлении",
                        "info"
                    );
                });
                
                markReadBtn.addEventListener('click', () => {
                    messageElement.remove();
                    this.unreadMessagesCount--;
                    this.updateUnreadCounters();
                    this.showNotification(
                        "Сообщение прочитано",
                        "Сообщение отмечено как прочитанное",
                        "success"
                    );
                });
                
                this.unreadMessages.appendChild(messageElement);
            });
        }
        
        markAllAsRead() {
            this.unreadMessages.innerHTML = '<p class="no-unread">Нет непрочитанных сообщений</p>';
            this.unreadMessagesCount = 0;
            this.updateUnreadCounters();
            this.showNotification(
                "Все сообщения прочитаны",
                "Все непрочитанные сообщения отмечены как прочитанные",
                "success"
            );
        }
        
        updateUnreadCounters() {
            // Обновляем счетчики в боковом меню
            const unreadCountElements = document.querySelectorAll('.unread-count');
            unreadCountElements.forEach(el => {
                const category = el.closest('.category-btn').dataset.category;
                if (category === 'all') {
                    el.textContent = this.unreadMessagesCount;
                }
            });
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
                    notificationElement.classList.remove('unread');
                    this.showNotification(
                        notification.title,
                        notification.message,
                        "info"
                    );
                });
                
                this.notificationsList.appendChild(notificationElement);
            });
        }
        
        toggleNotifications() {
            if (this.notificationCenter) {
                this.notificationCenter.classList.toggle('active');
            }
        }
        
        closeNotificationsPanel() {
            if (this.notificationCenter) {
                this.notificationCenter.classList.remove('active');
            }
        }
        
        showNotification(title, message, type = 'info') {
            // Создаем элемент уведомления
            const notification = document.createElement('div');
            notification.className = `notification-toast ${type}`;
            notification.innerHTML = `
                <div class="notification-icon">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${title}</div>
                    <div class="notification-message">${message}</div>
                </div>
                <button class="notification-close">&times;</button>
            `;
            
            // Добавляем в body
            document.body.appendChild(notification);
            
            // Показываем с анимацией
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            // Автоматическое скрытие через 5 секунд
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 5000);
            
            // Обработчик закрытия
            const closeBtn = notification.querySelector('.notification-close');
            closeBtn.addEventListener('click', () => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            });
        }
        
        closeAllModals() {
            this.closeContactsModal();
            this.closeGroupModal();
            this.closeChannelModal();
            this.closeNotificationsPanel();
            this.endCall();
            this.leaveConference();
        }
        
        setupKeyboardShortcuts() {
            document.addEventListener('keydown', (e) => {
                // Ctrl + / для поиска
                if (e.ctrlKey && e.key === '/') {
                    e.preventDefault();
                    if (this.globalSearch) {
                        this.globalSearch.focus();
                    }
                }
                
                // Escape для закрытия модальных окон
                if (e.key === 'Escape') {
                    this.closeAllModals();
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
        
        // Недостающие методы для других типов вызовов
        startVideoCallWithContacts(contacts) {
            // Аналогично startVoiceCallWithContacts, но для видео
            this.startVoiceCallWithContacts(contacts); // Временно используем ту же реализацию
        }
        
        startConferenceWithContacts(contacts) {
            // Реализация конференции
            this.showNotification(
                "Конференция",
                "Начало конференции с выбранными участниками",
                "info"
            );
        }
    }
    
    // Инициализация приложения
    window.app = new TelegramNodsApp();
});
