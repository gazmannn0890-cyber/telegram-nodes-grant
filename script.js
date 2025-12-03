// Telegram Nodes REVOLUTION - ПОЛНЫЙ ОПТИМИЗИРОВАННЫЙ СКРИПТ
document.addEventListener('DOMContentLoaded', function() {
    // ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
    let currentNode = 'alpha';
    let chameleonMode = true;
    let currentTimeMode = 'day';
    let currentMood = 'focus';
    let aiNotifications = [];
    let isProfileOpen = false;
    
    // Состояние звонков
    let callState = {
        active: false,
        type: null, // 'audio', 'video', 'conference'
        timer: 0,
        timerInterval: null,
        muted: false,
        speaker: false,
        video: false,
        contact: null
    };
    
    // Контакты
    let contacts = [
        { id: 1, name: 'Алексей', avatar: 'А', color: '#0088cc', status: 'online', lastSeen: '2 мин назад', phone: '+7 900 123-45-67' },
        { id: 2, name: 'Мария', avatar: 'М', color: '#af52de', status: 'online', lastSeen: 'только что', phone: '+7 900 234-56-78' },
        { id: 3, name: 'Дмитрий', avatar: 'Д', color: '#34c759', status: 'away', lastSeen: '10 мин назад', phone: '+7 900 345-67-89' },
        { id: 4, name: 'Анна', avatar: 'А', color: '#ff9500', status: 'offline', lastSeen: '2 часа назад', phone: '+7 900 456-78-90' },
        { id: 5, name: 'Сергей', avatar: 'С', color: '#5ac8fa', status: 'online', lastSeen: '5 мин назад', phone: '+7 900 567-89-01' },
        { id: 6, name: 'Елена', avatar: 'Е', color: '#ff2d55', status: 'online', lastSeen: '1 мин назад', phone: '+7 900 678-90-12' }
    ];
    
    // Конференция
    let conference = {
        active: false,
        participants: [],
        timer: 0,
        maxParticipants: 8
    };
    
    // AI помощник
    let aiAssistant = {
        name: 'NOVA',
        personality: 'helpful',
        suggestions: [],
        reminders: []
    };
    
    // ===== КЭШ ЭЛЕМЕНТОВ =====
    const elements = {
        // Хамелеон
        chameleonToggle: document.getElementById('chameleonToggle'),
        chameleonStatus: document.getElementById('chameleonStatus'),
        toggleChameleonBtn: document.getElementById('toggleChameleon'),
        currentMode: document.getElementById('currentMode'),
        
        // Время
        currentTime: document.getElementById('currentTime'),
        timePeriod: document.getElementById('timePeriod'),
        timeSimulator: document.getElementById('timeSimulator'),
        
        // AI
        aiNotification: document.getElementById('aiNotification'),
        closeAiNotification: document.getElementById('closeAiNotification'),
        aiQuickBtn: document.getElementById('aiQuickBtn'),
        
        // Узлы
        livingNodes: document.querySelectorAll('.living-node'),
        chameleonNodes: document.querySelectorAll('.chameleon-node'),
        allNodes: document.querySelectorAll('.node-item'),
        
        // Контролы
        adaptationButtons: document.querySelectorAll('.adapt-btn'),
        timeButtons: document.querySelectorAll('.time-btn'),
        moodButtons: document.querySelectorAll('.mood-btn'),
        
        // Тема
        themeButtons: document.querySelectorAll('.theme-btn'),
        
        // Контакты
        contactsBtn: document.getElementById('contactsBtn'),
        contactsDropdown: document.getElementById('contactsDropdown'),
        closeContacts: document.getElementById('closeContacts'),
        contactsList: document.getElementById('contactsList'),
        searchContacts: document.getElementById('searchContacts'),
        
        // Звонки
        callModal: document.getElementById('callModal'),
        videoCallModal: document.getElementById('videoCallModal'),
        conferenceModal: document.getElementById('conferenceModal'),
        
        // Профиль
        profileLink: document.getElementById('profile-link'),
        profilePage: document.querySelector('.profile-page'),
        profileBackBtn: document.querySelector('.profile-back-btn'),
        
        // Фоны
        bgPreviews: document.querySelectorAll('.bg-preview'),
        
        // Скриншот
        screenshotBtn: document.querySelector('.screenshot-btn')
    };

    // ===== ИНИЦИАЛИЗАЦИЯ =====
    function init() {
        console.log('🚀 Инициализация Telegram Nodes REVOLUTION...');
        
        // Загружаем настройки
        loadSettings();
        
        // Инициализируем время
        updateTime();
        setInterval(updateTime, 30000); // Обновляем каждые 30 секунд
        
        // Инициализируем AI
        initAI();
        
        // Инициализируем контакты
        initContacts();
        
        // Инициализируем адаптацию узлов
        initNodes();
        
        // Настраиваем все обработчики
        setupEventListeners();
        
        // Запускаем фоновые процессы
        startBackgroundProcesses();
        
        // Показываем приветствие
        setTimeout(() => {
            showAINotification('Добро пожаловать в живые пространства Telegram Nodes! Режим "Хамелеон" адаптирует интерфейс под вашу активность.');
        }, 1500);
        
        // Консольные команды
        setupConsoleCommands();
        
        console.log('✅ Приложение успешно запущено!');
    }

    // ===== ВРЕМЯ И АДАПТАЦИЯ =====
    function updateTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        
        // Определяем период дня
        let period = '';
        let timeMode = '';
        
        if (hours >= 5 && hours < 12) {
            period = 'Утро';
            timeMode = 'morning';
        } else if (hours >= 12 && hours < 17) {
            period = 'День';
            timeMode = 'day';
        } else if (hours >= 17 && hours < 22) {
            period = 'Вечер';
            timeMode = 'evening';
        } else {
            period = 'Ночь';
            timeMode = 'night';
        }
        
        // Обновляем только если изменился период
        if (currentTimeMode !== timeMode) {
            currentTimeMode = timeMode;
            updateTimeClasses();
            
            if (chameleonMode) {
                adaptNodesToTime();
                updateAIByTime();
            }
        }
        
        // Обновляем интерфейс
        if (elements.currentTime) {
            elements.currentTime.textContent = `${hours}:${minutes}`;
        }
        
        if (elements.timePeriod) {
            elements.timePeriod.textContent = period;
        }
        
        // Обновляем статус
        updateChameleonStatus();
    }

    function updateTimeClasses() {
        // Удаляем старые классы
        const timeClasses = ['time-morning', 'time-day', 'time-evening', 'time-night'];
        document.body.classList.remove(...timeClasses);
        
        // Добавляем новый класс
        document.body.classList.add(`time-${currentTimeMode}`);
    }

    function updateMoodClasses() {
        // Удаляем старые классы
        const moodClasses = ['mood-focus', 'mood-creative', 'mood-relax', 'mood-energy'];
        document.body.classList.remove(...moodClasses);
        
        // Добавляем новый класс
        document.body.classList.add(`mood-${currentMood}`);
    }

    // ===== АДАПТАЦИЯ УЗЛОВ =====
    function initNodes() {
        // Начальная адаптация узлов
        adaptNodesToTime();
        
        // Настраиваем анимации
        setupNodeAnimations();
    }

    function adaptNodesToTime() {
        if (!chameleonMode) return;
        
        const nodeConfigs = {
            'alpha': {
                morning: { 
                    color: 'linear-gradient(135deg, #0088cc, #40b7e8)',
                    icon: 'fa-sun',
                    label: 'Утро • Планирование',
                    mood: 'focus'
                },
                day: { 
                    color: 'linear-gradient(135deg, #006699, #1a8ccc)',
                    icon: 'fa-briefcase',
                    label: 'День • Фокус',
                    mood: 'focus'
                },
                evening: { 
                    color: 'linear-gradient(135deg, #005580, #0d6da8)',
                    icon: 'fa-chart-line',
                    label: 'Вечер • Анализ',
                    mood: 'creative'
                },
                night: { 
                    color: 'linear-gradient(135deg, #00334d, #004d73)',
                    icon: 'fa-moon',
                    label: 'Ночь • Отдых',
                    mood: 'relax'
                }
            },
            'game': {
                morning: { 
                    color: 'linear-gradient(135deg, #af52de, #bf5af2)',
                    icon: 'fa-coffee',
                    label: 'Утро • Разминка',
                    mood: 'energy'
                },
                day: { 
                    color: 'linear-gradient(135deg, #8a2be2, #9b30ff)',
                    icon: 'fa-gamepad',
                    label: 'День • Энергия',
                    mood: 'energy'
                },
                evening: { 
                    color: 'linear-gradient(135deg, #6a1b9a, #7b1fa2)',
                    icon: 'fa-trophy',
                    label: 'Вечер • Турниры',
                    mood: 'creative'
                },
                night: { 
                    color: 'linear-gradient(135deg, #4a148c, #5c1b9e)',
                    icon: 'fa-moon',
                    label: 'Ночь • Расслабление',
                    mood: 'relax'
                }
            },
            'family': {
                morning: { 
                    color: 'linear-gradient(135deg, #34c759, #30d158)',
                    icon: 'fa-coffee',
                    label: 'Утро • Завтрак',
                    mood: 'relax'
                },
                day: { 
                    color: 'linear-gradient(135deg, #2e8b57, #32a852)',
                    icon: 'fa-home',
                    label: 'День • Связь',
                    mood: 'focus'
                },
                evening: { 
                    color: 'linear-gradient(135deg, #228b22, #2a9c2a)',
                    icon: 'fa-utensils',
                    label: 'Вечер • Ужин',
                    mood: 'relax'
                },
                night: { 
                    color: 'linear-gradient(135deg, #1b5e20, #217a26)',
                    icon: 'fa-bed',
                    label: 'Ночь • Отдых',
                    mood: 'relax'
                }
            }
        };

        // Используем requestAnimationFrame для плавности
        requestAnimationFrame(() => {
            elements.livingNodes.forEach(node => {
                const nodeType = node.dataset.node;
                const config = nodeConfigs[nodeType]?.[currentTimeMode];
                
                if (config) {
                    // Обновляем аватар
                    const avatar = node.querySelector('.node-avatar');
                    if (avatar) {
                        avatar.style.background = config.color;
                        avatar.dataset.mood = config.mood;
                        
                        // Обновляем иконку
                        const timeIcon = node.querySelector('.node-time-indicator i');
                        if (timeIcon) {
                            timeIcon.className = `fas ${config.icon}`;
                        }
                    }
                    
                    // Обновляем текст
                    const adaptationLabel = node.querySelector('.adaptation-label');
                    if (adaptationLabel) {
                        adaptationLabel.textContent = config.label;
                    }
                    
                    // Обновляем дата-атрибуты
                    node.dataset.time = currentTimeMode;
                    node.dataset.mood = config.mood;
                }
            });
            
            // Обновляем текущий узел в хедере
            updateCurrentNodeAdaptation();
        });
    }

    function updateCurrentNodeAdaptation() {
        const moodLabels = {
            'focus': 'фокус',
            'creative': 'креатив',
            'relax': 'отдых',
            'energy': 'энергия'
        };
        
        const timeLabels = {
            'morning': 'утро',
            'day': 'день',
            'evening': 'вечер',
            'night': 'ночь'
        };
        
        if (elements.currentMode) {
            elements.currentMode.textContent = 
                `Хамелеон • ${timeLabels[currentTimeMode]} • ${moodLabels[currentMood]}`;
        }
        
        // Обновляем подзаголовок
        const adaptationValue = document.querySelector('.adaptation-value');
        if (adaptationValue) {
            adaptationValue.textContent = `${timeLabels[currentTimeMode]} ${moodLabels[currentMood]}`;
        }
    }

    function setupNodeAnimations() {
        // Анимация при наведении
        elements.allNodes.forEach(node => {
            node.addEventListener('mouseenter', function() {
                if (chameleonMode) {
                    this.style.transform = 'translateX(5px) scale(1.02)';
                }
            });
            
            node.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
        
        // Клик по узлу
        elements.allNodes.forEach(node => {
            node.addEventListener('click', function(e) {
                if (e.target.closest('.node-avatar') || e.target.closest('.node-info')) {
                    const nodeType = this.dataset.node;
                    switchToNode(nodeType);
                }
            });
        });
    }

    function switchToNode(nodeType) {
        currentNode = nodeType;
        
        // Обновляем активный узел
        elements.allNodes.forEach(n => n.classList.remove('active'));
        document.querySelector(`.node-item[data-node="${nodeType}"]`)?.classList.add('active');
        
        // Обновляем хедер
        const nodeNames = {
            'alpha': 'AlphaTeam',
            'game': 'GameZone',
            'family': 'FamilyHub'
        };
        
        const headerTitle = document.querySelector('.current-node h2');
        if (headerTitle) {
            headerTitle.textContent = nodeNames[nodeType] || 'AlphaTeam';
        }
        
        // Анимация перехода
        const activeNode = document.querySelector(`.node-item[data-node="${nodeType}"]`);
        if (activeNode) {
            activeNode.style.transform = 'scale(1.05)';
            setTimeout(() => {
                activeNode.style.transform = '';
            }, 300);
        }
        
        // AI реакция
        showAINotification(`Переключено на ${nodeNames[nodeType]}. Адаптирую интерфейс...`);
        
        // Сохраняем
        saveSettings();
    }

    // ===== УПРАВЛЕНИЕ ХАМЕЛЕОНОМ =====
    function toggleChameleonMode() {
        chameleonMode = !chameleonMode;
        
        if (chameleonMode) {
            // Включаем
            document.body.classList.add('chameleon-active');
            adaptNodesToTime();
            showAINotification('Режим "Хамелеон" включен. Узлы адаптируются под время суток.');
        } else {
            // Выключаем
            document.body.classList.remove('chameleon-active');
            resetNodesToDefault();
            showAINotification('Режим "Хамелеон" выключен. Узлы используют стандартные настройки.');
        }
        
        updateChameleonStatus();
        updateChameleonToggleButton();
        saveSettings();
    }

    function updateChameleonStatus() {
        if (!elements.chameleonStatus) return;
        
        if (chameleonMode) {
            elements.chameleonStatus.textContent = 'Авто-адаптация';
            elements.chameleonStatus.style.color = '#34c759';
        } else {
            elements.chameleonStatus.textContent = 'Выключен';
            elements.chameleonStatus.style.color = '#ff3b30';
        }
    }

    function updateChameleonToggleButton() {
        if (!elements.toggleChameleonBtn) return;
        
        if (chameleonMode) {
            elements.toggleChameleonBtn.classList.add('active');
            elements.toggleChameleonBtn.innerHTML = `
                <i class="fas fa-palette"></i>
                <span>Режим Хамелеон</span>
                <div class="toggle-indicator"></div>
            `;
        } else {
            elements.toggleChameleonBtn.classList.remove('active');
            elements.toggleChameleonBtn.innerHTML = `
                <i class="fas fa-palette"></i>
                <span>Включить Хамелеон</span>
            `;
        }
    }

    function resetNodesToDefault() {
        const defaultColors = {
            'alpha': 'linear-gradient(135deg, #0088cc, #40b7e8)',
            'game': 'linear-gradient(135deg, #af52de, #bf5af2)',
            'family': 'linear-gradient(135deg, #34c759, #30d158)'
        };
        
        elements.livingNodes.forEach(node => {
            const nodeType = node.dataset.node;
            const avatar = node.querySelector('.node-avatar');
            
            if (avatar && defaultColors[nodeType]) {
                avatar.style.background = defaultColors[nodeType];
                
                // Сбрасываем иконку
                const timeIcon = node.querySelector('.node-time-indicator i');
                if (timeIcon) {
                    timeIcon.className = 'fas fa-circle';
                }
                
                // Сбрасываем текст
                const adaptationLabel = node.querySelector('.adaptation-label');
                if (adaptationLabel) {
                    adaptationLabel.textContent = 'Стандартный режим';
                }
            }
        });
    }

    function setTimeMode(mode) {
        currentTimeMode = mode;
        updateTimeClasses();
        
        if (chameleonMode) {
            adaptNodesToTime();
        }
        
        updateChameleonStatus();
        saveSettings();
    }

    function setMood(mood) {
        currentMood = mood;
        updateMoodClasses();
        
        // Обновляем активные кнопки
        elements.moodButtons?.forEach(btn => {
            if (btn.dataset.mood === mood) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        updateCurrentNodeAdaptation();
        
        // AI реакция
        const moodMessages = {
            'focus': 'Отличный выбор для продуктивной работы! Фокусируюсь на задачах.',
            'creative': 'Включаю креативный режим. Готов помогать с идеями!',
            'relax': 'Расслабляющий режим активирован. Отдыхайте и наслаждайтесь общением.',
            'energy': 'Заряжаю энергией! Готов к активным обсуждениям и играм!'
        };
        
        showAINotification(moodMessages[mood]);
        saveSettings();
    }

    // ===== AI ПОМОЩНИК =====
    function initAI() {
        // Инициализируем AI уведомления
        aiNotifications = [
            {
                id: 1,
                type: 'suggestion',
                message: 'Заметил, что вы часто обсуждаете дизайн. Хотите создать отдельный канал?',
                actions: ['Создать канал', 'Отложить'],
                priority: 'high'
            },
            {
                id: 2,
                type: 'reminder',
                message: 'Не забудьте ответить маме в FamilyHub. Она ждёт ответа с 14:00.',
                actions: ['Ответить сейчас', 'Напомнить позже'],
                priority: 'medium'
            },
            {
                id: 3,
                type: 'analysis',
                message: 'Активность в AlphaTeam выросла на 24% за неделю. Отличный результат!',
                actions: ['Посмотреть статистику', 'Закрыть'],
                priority: 'low'
            }
        ];
        
        // Генерируем случайные предложения
        generateAISuggestions();
    }

    function updateAIByTime() {
        const timeMessages = {
            'morning': 'Доброе утро! Готов помочь спланировать день.',
            'day': 'Рабочий день в разгаре. Нужна помощь с задачами?',
            'evening': 'Вечер — время подводить итоги. Хотите проанализировать день?',
            'night': 'Поздний вечер. Отличное время для творчества или отдыха.'
        };
        
        if (Math.random() > 0.7) { // 30% шанс
            showAINotification(timeMessages[currentTimeMode]);
        }
    }

    function showAINotification(message, type = 'info', duration = 10000) {
        if (!elements.aiNotification) return;
        
        // Обновляем сообщение
        const aiText = elements.aiNotification.querySelector('.ai-message p');
        if (aiText) {
            aiText.textContent = message;
        }
        
        // Показываем
        elements.aiNotification.style.display = 'block';
        elements.aiNotification.style.animation = 'aiSlideIn 0.5s ease';
        
        // Авто-скрытие
        setTimeout(() => {
            if (elements.aiNotification.style.display !== 'none') {
                hideAINotification();
            }
        }, duration);
        
        console.log(`🤖 ${aiAssistant.name}: ${message}`);
    }

    function hideAINotification() {
        if (!elements.aiNotification) return;
        
        elements.aiNotification.style.animation = 'aiSlideOut 0.5s ease forwards';
        setTimeout(() => {
            elements.aiNotification.style.display = 'none';
        }, 500);
    }

    function getAISuggestion() {
        const suggestions = [
            'Предлагаю создать тему для обсуждения новых идей в AlphaTeam',
            'Заметил снижение активности в GameZone. Хотите организовать турнир?',
            'FamilyHub был неактивен 2 дня. Напоминаю о звонке родителям',
            'На основе вашей активности рекомендую настроить авто-ответы для рабочих чатов',
            'Обнаружены похожие обсуждения в разных узлах. Предлагаю объединить темы'
        ];
        
        return suggestions[Math.floor(Math.random() * suggestions.length)];
    }

    function generateAISuggestions() {
        // Генерация AI предложений на основе времени
        setInterval(() => {
            if (chameleonMode && Math.random() > 0.8) { // 20% шанс
                showAINotification(getAISuggestion(), 'suggestion', 8000);
            }
        }, 600000); // Каждые 10 минут
    }

    // ===== СИСТЕМА ЗВОНКОВ =====
    function initContacts() {
        // Загружаем контакты в интерфейс
        loadContacts();
        
        // Настраиваем поиск
        setupContactSearch();
    }

    function loadContacts() {
        if (!elements.contactsList) return;
        
        elements.contactsList.innerHTML = '';
        
        contacts.forEach(contact => {
            const contactItem = document.createElement('div');
            contactItem.className = 'contact-item';
            contactItem.dataset.contactId = contact.id;
            
            const statusClass = `status-${contact.status}`;
            const statusText = contact.status === 'online' ? 'В сети' :
                              contact.status === 'away' ? 'Отошёл' : 'Не в сети';
            
            contactItem.innerHTML = `
                <div class="contact-avatar" style="background: ${contact.color};">
                    ${contact.avatar}
                </div>
                <div class="contact-info">
                    <div class="contact-name">${contact.name}</div>
                    <div class="contact-status">
                        <span class="status-indicator ${statusClass}"></span>
                        <span>${statusText} • ${contact.lastSeen}</span>
                    </div>
                </div>
                <div class="contact-actions">
                    <button class="call-btn" data-action="audio" data-contact-id="${contact.id}" title="Аудиозвонок">
                        <i class="fas fa-phone"></i>
                    </button>
                    <button class="call-btn video" data-action="video" data-contact-id="${contact.id}" title="Видеозвонок">
                        <i class="fas fa-video"></i>
                    </button>
                    <button class="call-btn conference" data-action="conference" data-contact-id="${contact.id}" title="Конференция">
                        <i class="fas fa-users"></i>
                    </button>
                </div>
            `;
            
            elements.contactsList.appendChild(contactItem);
        });
    }

    function setupContactSearch() {
        if (!elements.searchContacts) return;
        
        elements.searchContacts.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            document.querySelectorAll('.contact-item').forEach(item => {
                const contactName = item.querySelector('.contact-name').textContent.toLowerCase();
                item.style.display = contactName.includes(searchTerm) ? 'flex' : 'none';
            });
        });
    }

    function startCall(contactId, type = 'audio') {
        const contact = contacts.find(c => c.id == contactId);
        if (!contact) return;
        
        // Останавливаем предыдущий звонок
        stopCall();
        
        // Обновляем состояние
        callState.active = true;
        callState.type = type;
        callState.contact = contact;
        callState.timer = 0;
        
        // Настраиваем модальное окно
        if (type === 'video') {
            // Видеозвонок
            setupVideoCallModal(contact);
            elements.videoCallModal?.classList.add('active');
        } else {
            // Аудиозвонок
            setupAudioCallModal(contact);
            elements.callModal?.classList.add('active');
        }
        
        // Имитируем ответ через 3 секунды
        setTimeout(() => {
            if (callState.active) {
                startCallTimer();
                if (type === 'video') {
                    simulateVideoCall();
                }
                updateCallStatus('Разговор');
            }
        }, 3000);
        
        // Показываем уведомление
        showNotification(`${type === 'video' ? 'Видеозвонок' : 'Звонок'} с ${contact.name}`, 'info');
    }

    function startConference(contactId) {
        const contact = contacts.find(c => c.id == contactId);
        if (!contact) return;
        
        // Останавливаем текущий звонок
        stopCall();
        
        // Начинаем конференцию
        conference.active = true;
        conference.participants = [
            { id: 0, name: 'Вы', avatar: 'Я', color: '#0088cc', status: 'online', muted: false },
            { id: contact.id, ...contact, muted: false }
        ];
        conference.timer = 0;
        
        // Показываем модалку конференции
        setupConferenceModal();
        elements.conferenceModal?.classList.add('active');
        
        // Запускаем таймер
        startCallTimer();
        
        // Показываем уведомление
        showNotification(`Конференция с ${contact.name}`, 'info');
    }

    function setupAudioCallModal(contact) {
        if (!elements.callModal) return;
        
        document.getElementById('callAvatar').style.background = contact.color;
        document.getElementById('callAvatarText').textContent = contact.avatar;
        document.getElementById('callContactName').textContent = contact.name;
        document.getElementById('callStatus').textContent = 'Вызов...';
        document.getElementById('callTimer').textContent = '00:00';
    }

    function setupVideoCallModal(contact) {
        if (!elements.videoCallModal) return;
        
        document.getElementById('remoteVideoLabel').textContent = contact.name;
    }

    function setupConferenceModal() {
        if (!elements.conferenceModal) return;
        
        const participantsContainer = document.getElementById('conferenceParticipants');
        if (!participantsContainer) return;
        
        participantsContainer.innerHTML = '';
        
        conference.participants.forEach(participant => {
            const participantCard = document.createElement('div');
            participantCard.className = 'participant-card';
            
            participantCard.innerHTML = `
                <div class="participant-avatar" style="background: ${participant.color};">
                    ${participant.avatar}
                </div>
                <div class="participant-name">${participant.name}</div>
                <div class="participant-status">${participant.status}</div>
                ${participant.muted ? '<div class="participant-muted"><i class="fas fa-microphone-slash"></i></div>' : ''}
            `;
            
            participantsContainer.appendChild(participantCard);
        });
        
        // Обновляем счетчик
        const countElement = document.getElementById('participantCount');
        if (countElement) {
            countElement.textContent = `${conference.participants.length} участника`;
        }
    }

    function startCallTimer() {
        if (callState.timerInterval) {
            clearInterval(callState.timerInterval);
        }
        
        callState.timerInterval = setInterval(() => {
            callState.timer++;
            conference.timer++;
            
            const minutes = Math.floor(callState.timer / 60).toString().padStart(2, '0');
            const seconds = (callState.timer % 60).toString().padStart(2, '0');
            
            // Обновляем таймер звонка
            const callTimer = document.getElementById('callTimer');
            if (callTimer) {
                callTimer.textContent = `${minutes}:${seconds}`;
            }
            
            // Обновляем таймер конференции
            const conferenceTimer = document.getElementById('conferenceTimer');
            if (conferenceTimer) {
                conferenceTimer.textContent = `${minutes}:${seconds}`;
            }
        }, 1000);
    }

    function stopCall() {
        callState.active = false;
        conference.active = false;
        
        if (callState.timerInterval) {
            clearInterval(callState.timerInterval);
            callState.timerInterval = null;
        }
        
        // Закрываем все модалки
        document.querySelectorAll('.call-modal.active, .conference-modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        
        // Сбрасываем состояние
        callState.timer = 0;
        callState.muted = false;
        callState.speaker = false;
        callState.video = false;
        callState.contact = null;
        callState.type = null;
        
        // Обновляем UI
        updateCallControls();
        
        // Уведомление
        showNotification('Звонок завершен', 'info');
    }

    function updateCallStatus(status) {
        const statusElement = document.getElementById('callStatus');
        if (statusElement) {
            statusElement.textContent = status;
        }
    }

    function toggleMute() {
        callState.muted = !callState.muted;
        
        const muteBadge = document.getElementById('muteBadge');
        if (muteBadge) {
            muteBadge.style.display = callState.muted ? 'block' : 'none';
        }
        
        const muteBtn = document.querySelector('#callMute i, #videoMute i, #conferenceMute i');
        if (muteBtn) {
            muteBtn.className = callState.muted ? 'fas fa-microphone-slash' : 'fas fa-microphone';
        }
        
        showNotification(callState.muted ? 'Микрофон выключен' : 'Микрофон включен', 'info');
    }

    function toggleSpeaker() {
        callState.speaker = !callState.speaker;
        
        const speakerBtn = document.querySelector('#callSpeaker i, #videoSpeaker i, #conferenceSpeaker i');
        if (speakerBtn) {
            speakerBtn.className = callState.speaker ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        }
        
        showNotification(callState.speaker ? 'Динамик включен' : 'Динамик выключен', 'info');
    }

    function toggleVideo() {
        callState.video = !callState.video;
        
        const videoBtn = document.querySelector('#callVideo i, #toggleVideo i, #conferenceVideo i');
        if (videoBtn) {
            videoBtn.className = callState.video ? 'fas fa-video-slash' : 'fas fa-video';
        }
        
        const localVideo = document.getElementById('localVideo');
        if (localVideo) {
            localVideo.style.opacity = callState.video ? '1' : '0.5';
        }
        
        showNotification(callState.video ? 'Камера включена' : 'Камера выключена', 'info');
    }

    function simulateVideoCall() {
        const localVideo = document.getElementById('localVideo');
        const remoteVideo = document.getElementById('remoteVideo');
        
        if (localVideo) {
            localVideo.innerHTML = '<div class="video-label">Вы</div>';
            localVideo.style.background = 'linear-gradient(135deg, #0088cc, #40b7e8)';
        }
        
        if (remoteVideo) {
            remoteVideo.innerHTML = '<div class="video-label" id="remoteVideoLabel"></div>';
            remoteVideo.style.background = 'linear-gradient(135deg, #af52de, #bf5af2)';
        }
    }

    // ===== УПРАВЛЕНИЕ ТЕМАМИ И ФОНАМИ =====
    function setupThemes() {
        if (!elements.themeButtons) return;
        
        elements.themeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const theme = this.dataset.theme;
                
                // Обновляем активную кнопку
                elements.themeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Меняем тему
                document.body.classList.remove('day-theme', 'night-theme');
                document.body.classList.add(`${theme}-theme`);
                
                // Сохраняем
                localStorage.setItem('telegramNodesTheme', theme);
                
                showNotification(`Тема изменена: ${theme === 'day' ? 'День' : 'Ночь'}`);
            });
        });
        
        // Загружаем сохраненную тему
        const savedTheme = localStorage.getItem('telegramNodesTheme') || 'day';
        document.body.classList.add(`${savedTheme}-theme`);
        
        // Активируем кнопку
        elements.themeButtons.forEach(btn => {
            if (btn.dataset.theme === savedTheme) {
                btn.classList.add('active');
            }
        });
    }

    function setupBackgrounds() {
        if (!elements.bgPreviews) return;
        
        elements.bgPreviews.forEach(preview => {
            preview.addEventListener('click', function() {
                const bgType = this.dataset.bg;
                
                // Обновляем активный превью
                elements.bgPreviews.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                
                // Меняем фон
                document.body.className = document.body.className.replace(/\bbg-\S+/g, '');
                if (bgType !== 'default') {
                    document.body.classList.add(`bg-${bgType}`);
                }
                
                // Особый случай для дракона
                const dragonContainer = document.querySelector('.dragon-container');
                if (bgType === 'dragon' && dragonContainer) {
                    dragonContainer.style.display = 'block';
                } else if (dragonContainer) {
                    dragonContainer.style.display = 'none';
                }
                
                // Сохраняем
                localStorage.setItem('telegramNodesBackground', bgType);
                
                showNotification(`Фон изменен: ${this.title}`);
            });
        });
        
        // Загружаем сохраненный фон
        const savedBg = localStorage.getItem('telegramNodesBackground') || 'default';
        const savedPreview = document.querySelector(`.bg-preview[data-bg="${savedBg}"]`);
        if (savedPreview) {
            savedPreview.classList.add('active');
            if (savedBg !== 'default') {
                document.body.classList.add(`bg-${savedBg}`);
            }
            
            // Активируем дракона если нужно
            if (savedBg === 'dragon') {
                const dragonContainer = document.querySelector('.dragon-container');
                if (dragonContainer) {
                    dragonContainer.style.display = 'block';
                }
            }
        }
    }

    // ===== СИСТЕМА ПРОФИЛЯ =====
    function setupProfile() {
        if (!elements.profileLink || !elements.profilePage || !elements.profileBackBtn) return;
        
        // Открытие профиля
        elements.profileLink.addEventListener('click', openProfilePage);
        
        // Закрытие профиля
        elements.profileBackBtn.addEventListener('click', closeProfilePage);
        
        // Дополнительные обработчики профиля
        setupProfileEventListeners();
    }

    function openProfilePage() {
        if (!elements.profilePage) return;
        
        const mainContainer = document.querySelector('.container');
        
        // Прячем основной контейнер
        mainContainer.style.opacity = '0';
        mainContainer.style.transform = 'scale(0.95)';
        mainContainer.style.pointerEvents = 'none';
        
        // Показываем профиль
        elements.profilePage.style.display = 'block';
        
        // Анимация
        setTimeout(() => {
            elements.profilePage.style.animation = 'slideInRight 0.3s ease';
        }, 10);
        
        // Обновляем информацию
        updateProfileInfo();
        
        isProfileOpen = true;
        showNotification('Открыт профиль узла', 'info');
    }

    function closeProfilePage() {
        if (!elements.profilePage) return;
        
        const mainContainer = document.querySelector('.container');
        
        // Анимация закрытия
        elements.profilePage.style.animation = 'slideOutRight 0.3s ease';
        
        setTimeout(() => {
            elements.profilePage.style.display = 'none';
            
            // Восстанавливаем основной контейнер
            mainContainer.style.opacity = '1';
            mainContainer.style.transform = 'scale(1)';
            mainContainer.style.pointerEvents = 'auto';
        }, 300);
        
        isProfileOpen = false;
    }

    function updateProfileInfo() {
        const nodeTitles = {
            'alpha': 'AlphaTeam',
            'game': 'GameZone',
            'family': 'FamilyHub'
        };
        
        const currentNodeTitle = nodeTitles[currentNode] || 'AlphaTeam';
        
        // Обновляем название профиля
        const profileName = document.querySelector('.profile-name');
        if (profileName) {
            profileName.textContent = currentNodeTitle;
        }
        
        // Обновляем статус
        const profileStatus = document.querySelector('.profile-status');
        if (profileStatus) {
            const statusText = chameleonMode ? 
                `Адаптивный режим • ${getRandomNumber(20, 50)} участника` :
                `Стандартный режим • ${getRandomNumber(20, 50)} участника`;
            profileStatus.textContent = statusText;
        }
        
        // Обновляем статистику
        updateProfileStats();
    }

    function updateProfileStats() {
        // Генерируем случайную статистику
        const messagesPerDay = getRandomNumber(50, 300);
        const activityHours = getRandomNumber(1, 24);
        const onlinePercentage = getRandomNumber(60, 95);
        const daysAgo = getRandomNumber(1, 30);
        
        // Обновляем значения
        const statValues = document.querySelectorAll('.stat-value');
        if (statValues.length >= 4) {
            statValues[0].textContent = messagesPerDay;
            statValues[1].textContent = `${activityHours}ч`;
            statValues[2].textContent = `${onlinePercentage}%`;
            statValues[3].textContent = `${daysAgo}д`;
        }
        
        // Обновляем количество участников
        const memberCount = getRandomNumber(15, 100);
        const membersTitle = document.querySelector('.info-card:nth-child(3) h3');
        if (membersTitle) {
            membersTitle.innerHTML = `<i class="fas fa-users"></i> Участники (${memberCount})`;
        }
    }

    function setupProfileEventListeners() {
        // Редактирование профиля
        const profileEditBtn = document.querySelector('.profile-edit-btn');
        if (profileEditBtn) {
            profileEditBtn.addEventListener('click', function() {
                showNotification('Редактирование профиля (в разработке)', 'info');
            });
        }
        
        // Переключатели настроек
        document.querySelectorAll('.setting-toggle input').forEach(toggle => {
            toggle.addEventListener('change', function() {
                const settingName = this.closest('.setting-item').querySelector('h4').textContent;
                showNotification(`Настройка "${settingName}" ${this.checked ? 'включена' : 'выключена'}`, 'info');
            });
        });
        
        // Кнопки действий в профиле
        document.querySelectorAll('.profile-action-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.querySelector('span').textContent;
                showNotification(`Действие: ${action}`, 'info');
            });
        });
        
        // Опасные кнопки
        document.querySelectorAll('.danger-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.querySelector('span').textContent;
                if (confirm(`Вы уверены, что хотите ${action.toLowerCase()}? Это действие нельзя отменить!`)) {
                    showNotification(`Выполнено: ${action}`, 'success');
                    if (action === 'Покинуть узел') {
                        setTimeout(() => {
                            closeProfilePage();
                        }, 1500);
                    }
                }
            });
        });
    }

    // ===== СИСТЕМА УВЕДОМЛЕНИЙ =====
    function showNotification(message, type = 'info', duration = 3000) {
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Автоматическое скрытие
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
        
        // Звуковое уведомление (опционально)
        playNotificationSound(type);
        
        // Логирование
        console.log(`📢 ${type.toUpperCase()}: ${message}`);
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

    function playNotificationSound(type) {
        // В реальном приложении здесь было бы воспроизведение звука
        // Например: new Audio('notification.mp3').play();
    }

    // ===== СОХРАНЕНИЕ И ЗАГРУЗКА =====
    function saveSettings() {
        const settings = {
            chameleonMode,
            currentTimeMode,
            currentMood,
            currentNode,
            theme: document.body.classList.contains('night-theme') ? 'night' : 'day',
            background: localStorage.getItem('telegramNodesBackground') || 'default',
            contacts,
            aiNotifications
        };
        
        try {
            localStorage.setItem('telegramNodesSettings', JSON.stringify(settings));
            console.log('💾 Настройки сохранены');
        } catch (e) {
            console.error('Ошибка сохранения настроек:', e);
        }
    }

    function loadSettings() {
        const saved = localStorage.getItem('telegramNodesSettings');
        
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                
                // Восстанавливаем настройки
                chameleonMode = settings.chameleonMode ?? true;
                currentTimeMode = settings.currentTimeMode || 'day';
                currentMood = settings.currentMood || 'focus';
                currentNode = settings.currentNode || 'alpha';
                
                // Применяем настройки
                updateChameleonStatus();
                updateChameleonToggleButton();
                setTimeMode(currentTimeMode);
                setMood(currentMood);
                
                // Восстанавливаем контакты
                if (settings.contacts) {
                    contacts = settings.contacts;
                }
                
                console.log('💾 Настройки загружены');
                
            } catch (e) {
                console.error('Ошибка загрузки настроек:', e);
            }
        }
    }

    // ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function startBackgroundProcesses() {
        // Фоновое обновление статусов контактов
        setInterval(() => {
            updateContactStatuses();
        }, 60000); // Каждую минуту
        
        // Проверка напоминаний
        setInterval(() => {
            checkReminders();
        }, 30000); // Каждые 30 секунд
    }

    function updateContactStatuses() {
        // Случайное обновление статусов контактов
        contacts.forEach(contact => {
            if (Math.random() > 0.7) { // 30% шанс на изменение
                const statuses = ['online', 'away', 'offline'];
                const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                
                if (contact.status !== newStatus) {
                    contact.status = newStatus;
                    contact.lastSeen = getRandomLastSeen();
                    loadContacts(); // Перезагружаем список
                }
            }
        });
    }

    function getRandomLastSeen() {
        const options = ['только что', '1 мин назад', '2 мин назад', '5 мин назад', '10 мин назад', '30 мин назад', '1 час назад', '2 часа назад'];
        return options[Math.floor(Math.random() * options.length)];
    }

    function checkReminders() {
        // Проверка напоминаний (упрощённая версия)
        if (Math.random() > 0.9) { // 10% шанс
            const reminders = [
                'Не забудьте ответить на важное сообщение',
                'Проверьте задачи на сегодня',
                'Запланирован созвон через 15 минут'
            ];
            
            showNotification(reminders[Math.floor(Math.random() * reminders.length)], 'info');
        }
    }

    // ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
    function setupEventListeners() {
        console.log('⚙️ Настройка обработчиков событий...');
        
        // Хамелеон
        if (elements.chameleonToggle) {
            elements.chameleonToggle.addEventListener('click', toggleChameleonMode);
        }
        
        if (elements.toggleChameleonBtn) {
            elements.toggleChameleonBtn.addEventListener('click', toggleChameleonMode);
        }
        
        // AI уведомления
        if (elements.closeAiNotification) {
            elements.closeAiNotification.addEventListener('click', hideAINotification);
        }
        
        if (elements.aiQuickBtn) {
            elements.aiQuickBtn.addEventListener('click', () => {
                showAINotification(getAISuggestion(), 'suggestion');
                elements.aiQuickBtn.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    elements.aiQuickBtn.style.transform = 'scale(1)';
                }, 300);
            });
        }
        
        // Кнопки адаптации
        elements.adaptationButtons?.forEach(btn => {
            btn.addEventListener('click', function() {
                const adaptMode = this.dataset.adapt;
                
                // Обновляем активную кнопку
                elements.adaptationButtons?.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                if (adaptMode === 'auto') {
                    toggleChameleonMode();
                } else {
                    setMood(adaptMode);
                }
            });
        });
        
        // Симулятор времени
        if (elements.timeSimulator) {
            elements.timeSimulator.addEventListener('change', function() {
                const selectedTime = this.value;
                setTimeMode(selectedTime);
                
                // Обновляем отображение времени
                const timeMap = {
                    'morning': '06:00',
                    'day': '14:00',
                    'evening': '20:00',
                    'night': '02:00'
                };
                
                if (elements.currentTime) {
                    elements.currentTime.textContent = timeMap[selectedTime];
                }
                
                if (elements.timePeriod) {
                    elements.timePeriod.textContent = 
                        selectedTime === 'morning' ? 'Утро' :
                        selectedTime === 'day' ? 'День' :
                        selectedTime === 'evening' ? 'Вечер' : 'Ночь';
                }
            });
        }
        
        // Кнопки времени
        elements.timeButtons?.forEach(btn => {
            btn.addEventListener('click', function() {
                const time = this.dataset.time;
                
                elements.timeButtons?.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                setTimeMode(time);
            });
        });
        
        // Кнопки настроения
        elements.moodButtons?.forEach(btn => {
            btn.addEventListener('click', function() {
                const mood = this.dataset.mood;
                setMood(mood);
            });
        });
        
        // Контакты
        if (elements.contactsBtn && elements.contactsDropdown) {
            elements.contactsBtn.addEventListener('click', () => {
                elements.contactsDropdown.classList.toggle('active');
            });
            
            if (elements.closeContacts) {
                elements.closeContacts.addEventListener('click', () => {
                    elements.contactsDropdown.classList.remove('active');
                });
            }
            
            // Закрытие по клику вне области
            document.addEventListener('click', (e) => {
                if (!elements.contactsBtn.contains(e.target) && 
                    !elements.contactsDropdown.contains(e.target) && 
                    elements.contactsDropdown.classList.contains('active')) {
                    elements.contactsDropdown.classList.remove('active');
                }
            });
        }
        
        // Звонки
        document.addEventListener('click', function(e) {
            // Кнопки звонков в контактах
            if (e.target.closest('.call-btn')) {
                const btn = e.target.closest('.call-btn');
                const contactId = btn.dataset.contactId;
                const action = btn.dataset.action;
                
                switch(action) {
                    case 'audio':
                        startCall(contactId, 'audio');
                        break;
                    case 'video':
                        startCall(contactId, 'video');
                        break;
                    case 'conference':
                        startConference(contactId);
                        break;
                }
                
                // Закрываем меню контактов
                if (elements.contactsDropdown) {
                    elements.contactsDropdown.classList.remove('active');
                }
            }
            
            // Управление звонком
            const callControls = {
                'callDecline': () => stopCall(),
                'callAccept': () => {
                    updateCallStatus('Разговор');
                    startCallTimer();
                },
                'callMute': () => toggleMute(),
                'callVideo': () => toggleVideo(),
                'callSpeaker': () => toggleSpeaker(),
                'videoDecline': () => stopCall(),
                'videoMute': () => toggleMute(),
                'toggleVideo': () => toggleVideo(),
                'videoSpeaker': () => toggleSpeaker(),
                'endConference': () => stopCall(),
                'conferenceMute': () => toggleMute(),
                'conferenceVideo': () => toggleVideo(),
                'conferenceSpeaker': () => toggleSpeaker(),
                'addParticipant': () => {
                    const newParticipant = contacts[Math.floor(Math.random() * contacts.length)];
                    if (conference.participants.length < conference.maxParticipants) {
                        conference.participants.push({
                            ...newParticipant,
                            muted: false
                        });
                        setupConferenceModal();
                        showNotification(`${newParticipant.name} присоединился к конференции`, 'info');
                    } else {
                        showNotification('Достигнут лимит участников конференции', 'warning');
                    }
                }
            };
            
            const controlId = e.target.closest('button')?.id;
            if (controlId && callControls[controlId]) {
                callControls[controlId]();
            }
        });
        
        // Закрытие модалок по клику вне
        document.querySelectorAll('.call-modal, .conference-modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    stopCall();
                }
            });
        });
        
        // Горячие клавиши
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (callState.active) {
                    stopCall();
                } else if (isProfileOpen) {
                    closeProfilePage();
                } else if (elements.contactsDropdown?.classList.contains('active')) {
                    elements.contactsDropdown.classList.remove('active');
                }
            }
            
            if (e.key === 'm' && (e.ctrlKey || e.metaKey)) {
                toggleMute();
                e.preventDefault();
            }
            
            if (e.key === 'h' && (e.ctrlKey || e.metaKey)) {
                toggleChameleonMode();
                e.preventDefault();
            }
        });
        
        // Тема
        setupThemes();
        
        // Фоны
        setupBackgrounds();
        
        // Профиль
        setupProfile();
        
        // Скриншот
        if (elements.screenshotBtn) {
            elements.screenshotBtn.addEventListener('click', takeScreenshot);
        }
        
        console.log('✅ Обработчики событий настроены');
    }

    function takeScreenshot() {
        showNotification('Скриншот сохранен в буфер обмена', 'success');
        
        // В реальном приложении здесь была бы логика создания скриншота
        // Например, с использованием html2canvas
    }

    // ===== КОНСОЛЬНЫЕ КОМАНДЫ =====
    function setupConsoleCommands() {
        window.telegramNodes = {
            // Управление хамелеоном
            chameleon: {
                toggle: toggleChameleonMode,
                status: () => chameleonMode ? 'Включен' : 'Выключен',
                setTime: setTimeMode,
                setMood: setMood
            },
            
            // AI помощник
            ai: {
                notify: showAINotification,
                suggestion: getAISuggestion,
                status: () => aiAssistant
            },
            
            // Звонки
            calls: {
                start: (contactId, type = 'audio') => {
                    const contact = contacts.find(c => c.id == contactId);
                    if (contact) startCall(contactId, type);
                },
                stop: stopCall,
                conference: startConference
            },
            
            // Узлы
            nodes: {
                switch: switchToNode,
                current: () => currentNode,
                list: () => ['alpha', 'game', 'family']
            },
            
            // Утилиты
            utils: {
                notification: showNotification,
                randomNumber: getRandomNumber,
                reloadContacts: loadContacts,
                save: saveSettings,
                load: loadSettings
            },
            
            // Демо режимы
            demo: {
                morning: () => setTimeMode('morning'),
                day: () => setTimeMode('day'),
                evening: () => setTimeMode('evening'),
                night: () => setTimeMode('night'),
                focus: () => setMood('focus'),
                creative: () => setMood('creative'),
                relax: () => setMood('relax'),
                energy: () => setMood('energy'),
                animateNodes: () => {
                    elements.allNodes.forEach((node, index) => {
                        setTimeout(() => {
                            node.style.transform = 'scale(1.1)';
                            setTimeout(() => {
                                node.style.transform = '';
                            }, 300);
                        }, index * 100);
                    });
                    showNotification('Анимация узлов запущена', 'success');
                }
            }
        };
        
        // Выводим справку
        console.log('🚀 Telegram Nodes REVOLUTION');
        console.log('Доступные команды:');
        console.log('- telegramNodes.chameleon.toggle() - переключить хамелеон');
        console.log('- telegramNodes.chameleon.setTime("morning/day/evening/night")');
        console.log('- telegramNodes.chameleon.setMood("focus/creative/relax/energy")');
        console.log('- telegramNodes.ai.notify("сообщение") - AI уведомление');
        console.log('- telegramNodes.calls.start(1, "audio/video") - звонок контакту');
        console.log('- telegramNodes.nodes.switch("alpha/game/family") - переключить узел');
        console.log('- telegramNodes.demo.morning() - демо утра');
        console.log('');
        console.log('📞 Контакты: 1-Алексей, 2-Мария, 3-Дмитрий, 4-Анна, 5-Сергей, 6-Елена');
    }

    // ===== ЗАПУСК ПРИЛОЖЕНИЯ =====
    function startApplication() {
        // Проверяем поддержку localStorage
        if (!window.localStorage) {
            console.warn('⚠️ localStorage не поддерживается, некоторые функции могут быть ограничены');
        }
        
        // Проверяем поддержку CSS переменных
        if (!window.CSS || !CSS.supports('color', 'var(--test)')) {
            console.warn('⚠️ CSS переменные не поддерживаются');
            document.body.classList.add('no-css-variables');
        }
        
        // Запускаем инициализацию
        try {
            init();
            console.log('🎉 Приложение успешно запущено!');
        } catch (error) {
            console.error('❌ Ошибка при запуске приложения:', error);
            showNotification('Ошибка при запуске приложения', 'error');
        }
    }

    // Запускаем приложение
    startApplication();
});

// Добавляем CSS для уведомлений и анимаций
document.head.insertAdjacentHTML('beforeend', `
<style>
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #34C759;
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
        max-width: 300px;
        pointer-events: none;
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
        pointer-events: auto;
    }
    
    .notification.info {
        background: #007AFF;
    }
    
    .notification.success {
        background: #34C759;
    }
    
    .notification.error {
        background: #FF3B30;
    }
    
    .notification.warning {
        background: #FF9500;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        font-size: 18px;
    }
    
    @keyframes aiSlideOut {
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    /* Оптимизации для анимаций */
    .chameleon-node, .node-pulse, .ai-pulse, .call-pulse {
        transform: translateZ(0);
        backface-visibility: hidden;
    }
    
    /* Адаптация для мобильных */
    @media (max-width: 768px) {
        .notification {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
</style>
`);

// Полифиллы (если нужны)
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = window.webkitRequestAnimationFrame || 
                                   window.mozRequestAnimationFrame || 
                                   function(callback) {
                                       return window.setTimeout(callback, 1000 / 60);
                                   };
}
