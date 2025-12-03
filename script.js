// Telegram Nodes REVOLUTION - Script with Chameleon Mode
document.addEventListener('DOMContentLoaded', function() {
    // Глобальные переменные
    let currentNode = 'alpha';
    let chameleonMode = true;
    let currentTimeMode = 'day';
    let currentMood = 'focus';
    let aiNotifications = [];
    
    // Элементы интерфейса
    const elements = {
        // Управление хамелеоном
        chameleonToggle: document.getElementById('chameleonToggle'),
        chameleonStatus: document.getElementById('chameleonStatus'),
        toggleChameleonBtn: document.getElementById('toggleChameleon'),
        
        // Время и адаптация
        currentTime: document.getElementById('currentTime'),
        timePeriod: document.getElementById('timePeriod'),
        timeSimulator: document.getElementById('timeSimulator'),
        currentMode: document.getElementById('currentMode'),
        
        // AI элементы
        aiNotification: document.getElementById('aiNotification'),
        closeAiNotification: document.getElementById('closeAiNotification'),
        aiQuickBtn: document.getElementById('aiQuickBtn'),
        
        // Узлы
        livingNodes: document.querySelectorAll('.living-node'),
        chameleonNodes: document.querySelectorAll('.chameleon-node'),
        
        // Контролы
        adaptationButtons: document.querySelectorAll('.adapt-btn'),
        timeButtons: document.querySelectorAll('.time-btn'),
        moodButtons: document.querySelectorAll('.mood-btn')
    };

    // ===== ИНИЦИАЛИЗАЦИЯ =====
    function init() {
        // Обновляем время
        updateTime();
        
        // Загружаем сохраненные настройки
        loadSettings();
        
        // Инициализируем AI помощника
        initAI();
        
        // Настраиваем события
        setupEventListeners();
        
        // Первоначальная адаптация узлов
        adaptNodesToTime();
        
        // Показываем приветственное сообщение AI
        setTimeout(() => {
            showAINotification('Добро пожаловать в живые пространства! Режим "Хамелеон" адаптирует узлы под вашу активность.');
        }, 1000);
        
        // Консольные команды для демо
        setupConsoleCommands();
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
        
        // Обновляем время в интерфейсе
        if (elements.currentTime) {
            elements.currentTime.textContent = `${hours}:${minutes}`;
        }
        
        if (elements.timePeriod) {
            elements.timePeriod.textContent = period;
        }
        
        // Обновляем режим времени
        currentTimeMode = timeMode;
        
        // Адаптируем интерфейс
        updateTimeClasses();
        
        // Обновляем статус
        updateChameleonStatus();
        
        // Адаптируем узлы
        if (chameleonMode) {
            adaptNodesToTime();
        }
    }

    function updateTimeClasses() {
        // Удаляем старые классы времени
        document.body.classList.remove('time-morning', 'time-day', 'time-evening', 'time-night');
        
        // Добавляем новый класс времени
        document.body.classList.add(`time-${currentTimeMode}`);
    }

    function updateMoodClasses() {
        // Удаляем старые классы настроения
        document.body.classList.remove('mood-focus', 'mood-creative', 'mood-relax', 'mood-energy');
        
        // Добавляем новый класс настроения
        document.body.classList.add(`mood-${currentMood}`);
    }

    // ===== АДАПТАЦИЯ УЗЛОВ =====
    function adaptNodesToTime() {
        if (!chameleonMode) return;
        
        const nodeConfigs = {
            'alpha': {
                morning: { icon: 'fa-sun', color: 'linear-gradient(135deg, #0088cc, #40b7e8)', label: 'Утро • Планирование' },
                day: { icon: 'fa-briefcase', color: 'linear-gradient(135deg, #006699, #1a8ccc)', label: 'День • Фокус' },
                evening: { icon: 'fa-chart-line', color: 'linear-gradient(135deg, #005580, #0d6da8)', label: 'Вечер • Анализ' },
                night: { icon: 'fa-moon', color: 'linear-gradient(135deg, #00334d, #004d73)', label: 'Ночь • Отдых' }
            },
            'game': {
                morning: { icon: 'fa-coffee', color: 'linear-gradient(135deg, #af52de, #bf5af2)', label: 'Утро • Разминка' },
                day: { icon: 'fa-gamepad', color: 'linear-gradient(135deg, #8a2be2, #9b30ff)', label: 'День • Энергия' },
                evening: { icon: 'fa-trophy', color: 'linear-gradient(135deg, #6a1b9a, #7b1fa2)', label: 'Вечер • Турниры' },
                night: { icon: 'fa-moon', color: 'linear-gradient(135deg, #4a148c, #5c1b9e)', label: 'Ночь • Расслабление' }
            },
            'family': {
                morning: { icon: 'fa-coffee', color: 'linear-gradient(135deg, #34c759, #30d158)', label: 'Утро • Завтрак' },
                day: { icon: 'fa-home', color: 'linear-gradient(135deg, #2e8b57, #32a852)', label: 'День • Связь' },
                evening: { icon: 'fa-utensils', color: 'linear-gradient(135deg, #228b22, #2a9c2a)', label: 'Вечер • Ужин' },
                night: { icon: 'fa-bed', color: 'linear-gradient(135deg, #1b5e20, #217a26)', label: 'Ночь • Отдых' }
            }
        };

        // Обновляем каждый узел
        elements.livingNodes.forEach(node => {
            const nodeType = node.dataset.node;
            const config = nodeConfigs[nodeType][currentTimeMode];
            
            if (config) {
                // Обновляем цвет
                const avatar = node.querySelector('.node-avatar');
                if (avatar) {
                    avatar.style.background = config.color;
                }
                
                // Обновляем иконку времени
                const timeIcon = node.querySelector('.node-time-indicator i');
                if (timeIcon) {
                    timeIcon.className = `fas ${config.icon}`;
                }
                
                // Обновляем текст адаптации
                const adaptationLabel = node.querySelector('.adaptation-label');
                if (adaptationLabel) {
                    adaptationLabel.textContent = config.label;
                }
                
                // Обновляем дата-атрибуты
                node.dataset.time = currentTimeMode;
            }
        });
        
        // Обновляем основной узел в хедере
        updateCurrentNodeAdaptation();
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
        
        // Обновляем подзаголовок текущего узла
        const adaptationValue = document.querySelector('.adaptation-value');
        if (adaptationValue) {
            adaptationValue.textContent = `${timeLabels[currentTimeMode]} ${moodLabels[currentMood]}`;
        }
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
    }

    function showAINotification(message, type = 'info', actions = []) {
        if (!elements.aiNotification) return;
        
        // Обновляем сообщение
        const aiText = elements.aiNotification.querySelector('.ai-message p');
        if (aiText) {
            aiText.textContent = message;
        }
        
        // Показываем уведомление
        elements.aiNotification.style.display = 'block';
        elements.aiNotification.style.animation = 'aiSlideIn 0.5s ease';
        
        // Автоматическое скрытие через 10 секунд
        setTimeout(() => {
            if (elements.aiNotification.style.display !== 'none') {
                hideAINotification();
            }
        }, 10000);
        
        // Логируем в консоль
        console.log(`🤖 NOVA: ${message}`);
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

    // ===== УПРАВЛЕНИЕ ХАМЕЛЕОНОМ =====
    function toggleChameleonMode() {
        chameleonMode = !chameleonMode;
        
        if (chameleonMode) {
            // Включаем режим хамелеона
            document.body.classList.add('chameleon-active');
            elements.chameleonStatus.textContent = 'Авто-адаптация';
            
            // Адаптируем узлы
            adaptNodesToTime();
            
            // Показываем уведомление
            showAINotification('Режим "Хамелеон" включен. Узлы адаптируются под время суток и вашу активность.');
        } else {
            // Выключаем режим хамелеона
            document.body.classList.remove('chameleon-active');
            elements.chameleonStatus.textContent = 'Выключен';
            
            // Возвращаем стандартные цвета
            resetNodesToDefault();
            
            showAINotification('Режим "Хамелеон" выключен. Узлы используют стандартные настройки.');
        }
        
        // Обновляем кнопку
        updateChameleonToggleButton();
        
        // Сохраняем настройки
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
                
                // Сбрасываем иконку времени
                const timeIcon = node.querySelector('.node-time-indicator i');
                if (timeIcon) {
                    timeIcon.className = 'fas fa-circle';
                }
                
                // Сбрасываем текст адаптации
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
        
        // Обновляем активные кнопки настроения
        elements.moodButtons.forEach(btn => {
            if (btn.dataset.mood === mood) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Обновляем адаптацию
        updateCurrentNodeAdaptation();
        
        // Показываем AI реакцию
        const moodMessages = {
            'focus': 'Отличный выбор для продуктивной работы! Фокусируюсь на задачах.',
            'creative': 'Включаю креативный режим. Готов помогать с идеями!',
            'relax': 'Расслабляющий режим активирован. Отдыхайте и наслаждайтесь общением.',
            'energy': 'Заряжаю энергией! Готов к активным обсуждениям и играм!'
        };
        
        showAINotification(moodMessages[mood]);
        saveSettings();
    }

    // ===== СОХРАНЕНИЕ И ЗАГРУЗКА НАСТРОЕК =====
    function saveSettings() {
        const settings = {
            chameleonMode,
            currentTimeMode,
            currentMood,
            currentNode
        };
        
        localStorage.setItem('telegramNodesSettings', JSON.stringify(settings));
    }

    function loadSettings() {
        const saved = localStorage.getItem('telegramNodesSettings');
        
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                chameleonMode = settings.chameleonMode || true;
                currentTimeMode = settings.currentTimeMode || 'day';
                currentMood = settings.currentMood || 'focus';
                currentNode = settings.currentNode || 'alpha';
                
                // Применяем настройки
                updateChameleonStatus();
                updateChameleonToggleButton();
                setTimeMode(currentTimeMode);
                setMood(currentMood);
                
            } catch (e) {
                console.log('Ошибка загрузки настроек:', e);
            }
        }
    }

    // ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
    function setupEventListeners() {
        // Переключение режима хамелеона
        if (elements.chameleonToggle) {
            elements.chameleonToggle.addEventListener('click', toggleChameleonMode);
        }
        
        if (elements.toggleChameleonBtn) {
            elements.toggleChameleonBtn.addEventListener('click', toggleChameleonMode);
        }
        
        // Закрытие AI уведомления
        if (elements.closeAiNotification) {
            elements.closeAiNotification.addEventListener('click', hideAINotification);
        }
        
        // Кнопка AI помощи
        if (elements.aiQuickBtn) {
            elements.aiQuickBtn.addEventListener('click', () => {
                showAINotification(getAISuggestion(), 'suggestion');
                
                // Анимация кнопки
                elements.aiQuickBtn.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    elements.aiQuickBtn.style.transform = 'scale(1)';
                }, 300);
            });
        }
        
        // Кнопки адаптации
        elements.adaptationButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const adaptMode = this.dataset.adapt;
                
                // Обновляем активную кнопку
                elements.adaptationButtons.forEach(b => b.classList.remove('active'));
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
        elements.timeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const time = this.dataset.time;
                
                elements.timeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                setTimeMode(time);
            });
        });
        
        // Кнопки настроения
        elements.moodButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const mood = this.dataset.mood;
                setMood(mood);
            });
        });
        
        // Клики по живым узлам
        elements.livingNodes.forEach(node => {
            node.addEventListener('click', function() {
                const nodeType = this.dataset.node;
                currentNode = nodeType;
                
                // Обновляем активный узел
                elements.livingNodes.forEach(n => n.classList.remove('active'));
                this.classList.add('active');
                
                // Показываем информацию об узле
                const nodeNames = {
                    'alpha': 'AlphaTeam',
                    'game': 'GameZone',
                    'family': 'FamilyHub'
                };
                
                showAINotification(`Переключено на ${nodeNames[nodeType]}. Адаптирую интерфейс под этот узел.`);
                
                // Анимация перехода
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
                
                saveSettings();
            });
        });
        
        // Анимация при ховере над узлами
        elements.chameleonNodes.forEach(node => {
            node.addEventListener('mouseenter', function() {
                if (chameleonMode) {
                    this.style.transform = 'scale(1.15)';
                    this.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                }
            });
            
            node.addEventListener('mouseleave', function() {
                if (chameleonMode) {
                    this.style.transform = 'scale(1)';
                }
            });
        });
        
        // Обновление времени каждую минуту
        setInterval(updateTime, 60000);
        
        // Случайные AI уведомления
        setInterval(() => {
            if (chameleonMode && Math.random() > 0.7) {
                showAINotification(getAISuggestion(), 'suggestion');
            }
        }, 300000); // Каждые 5 минут
    }

    // ===== КОНСОЛЬНЫЕ КОМАНДЫ ДЛЯ ДЕМО =====
    function setupConsoleCommands() {
        window.demoChameleon = {
            // Управление хамелеоном
            toggle: function() {
                toggleChameleonMode();
                console.log(`🎨 Режим Хамелеон: ${chameleonMode ? 'ВКЛ' : 'ВЫКЛ'}`);
            },
            
            // Смена времени
            setTime: function(time) {
                const validTimes = ['morning', 'day', 'evening', 'night'];
                if (validTimes.includes(time)) {
                    setTimeMode(time);
                    console.log(`⏰ Установлено время: ${time}`);
                } else {
                    console.log('Доступные значения: morning, day, evening, night');
                }
            },
            
            // Смена настроения
            setMood: function(mood) {
                const validMoods = ['focus', 'creative', 'relax', 'energy'];
                if (validMoods.includes(mood)) {
                    setMood(mood);
                    console.log(`😊 Установлено настроение: ${mood}`);
                } else {
                    console.log('Доступные значения: focus, creative, relax, energy');
                }
            },
            
            // AI уведомления
            aiNotification: function(message) {
                showAINotification(message || 'Тестовое сообщение от AI помощника');
            },
            
            // Статистика
            stats: function() {
                console.log('📊 Текущая статистика:');
                console.log('- Режим Хамелеон:', chameleonMode ? 'ВКЛ' : 'ВЫКЛ');
                console.log('- Время суток:', currentTimeMode);
                console.log('- Настроение:', currentMood);
                console.log('- Активный узел:', currentNode);
                console.log('- AI уведомлений:', aiNotifications.length);
            },
            
            // Анимации узлов
            animateNodes: function() {
                elements.chameleonNodes.forEach((node, index) => {
                    setTimeout(() => {
                        node.style.transform = 'scale(1.2)';
                        setTimeout(() => {
                            node.style.transform = 'scale(1)';
                        }, 500);
                    }, index * 200);
                });
                console.log('✨ Запущена анимация узлов');
            }
        };
        
        // Выводим доступные команды
        console.log('🚀 Telegram Nodes REVOLUTION загружен!');
        console.log('Доступные демо-команды:');
        console.log('- demoChameleon.toggle() - переключить режим хамелеона');
        console.log('- demoChameleon.setTime("morning/day/evening/night") - сменить время');
        console.log('- demoChameleon.setMood("focus/creative/relax/energy") - сменить настроение');
        console.log('- demoChameleon.aiNotification("сообщение") - показать AI уведомление');
        console.log('- demoChameleon.stats() - показать статистику');
        console.log('- demoChameleon.animateNodes() - анимировать узлы');
        console.log('\n✨ Режим "Хамелеон" делает узлы живыми и адаптивными!');
    }

    // ===== СУЩЕСТВУЮЩИЕ ФУНКЦИИ ИЗ ПРЕДЫДУЩЕЙ ВЕРСИИ =====
    // Добавляем здесь функции из старого script.js, которые нужно сохранить
    
    // Функция показа уведомлений
    function showNotification(message, type = 'info') {
        // Старая функция показа уведомлений (оставляем для совместимости)
        console.log(`📢 ${type.toUpperCase()}: ${message}`);
        
        // Можно добавить визуальное уведомление
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Автоматическое скрытие
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Управление темами (день/ночь)
    function setupThemeSwitcher() {
        const themeButtons = document.querySelectorAll('.theme-btn');
        
        themeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const theme = this.dataset.theme;
                
                // Обновляем активную кнопку
                themeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Меняем тему
                document.body.classList.remove('day-theme', 'night-theme');
                document.body.classList.add(`${theme}-theme`);
                
                // Сохраняем тему
                localStorage.setItem('telegramNodesTheme', theme);
                
                showNotification(`Тема изменена: ${theme === 'day' ? 'День' : 'Ночь'}`);
            });
        });
        
        // Загружаем сохраненную тему
        const savedTheme = localStorage.getItem('telegramNodesTheme') || 'day';
        document.body.classList.add(`${savedTheme}-theme`);
        
        // Активируем кнопку
        themeButtons.forEach(btn => {
            if (btn.dataset.theme === savedTheme) {
                btn.classList.add('active');
            }
        });
    }

    // Управление фонами
    function setupBackgroundSelector() {
        const bgPreviews = document.querySelectorAll('.bg-preview');
        
        bgPreviews.forEach(preview => {
            preview.addEventListener('click', function() {
                const bgType = this.dataset.bg;
                
                // Обновляем активный превью
                bgPreviews.forEach(p => p.classList.remove('active'));
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
                
                // Сохраняем фон
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

    // Управление профилем (оставляем старую логику)
    function openProfilePage() {
        const profilePage = document.querySelector('.profile-page');
        const mainContainer = document.querySelector('.container');
        
        if (!profilePage || !mainContainer) return;
        
        // Прячем основной контейнер
        mainContainer.style.opacity = '0';
        mainContainer.style.transform = 'scale(0.95)';
        mainContainer.style.pointerEvents = 'none';
        
        // Показываем страницу профиля
        profilePage.style.display = 'block';
        
        // Анимация
        setTimeout(() => {
            profilePage.style.animation = 'slideInRight 0.3s ease';
        }, 10);
        
        // Обновляем информацию профиля
        updateProfileInfo();
        
        showNotification('Открыт профиль узла', 'info');
    }
    
    function closeProfilePage() {
        const profilePage = document.querySelector('.profile-page');
        const mainContainer = document.querySelector('.container');
        
        if (!profilePage || !mainContainer) return;
        
        // Анимация закрытия
        profilePage.style.animation = 'slideOutRight 0.3s ease';
        
        setTimeout(() => {
            profilePage.style.display = 'none';
            
            // Восстанавливаем основной контейнер
            mainContainer.style.opacity = '1';
            mainContainer.style.transform = 'scale(1)';
            mainContainer.style.pointerEvents = 'auto';
        }, 300);
    }
    
    function updateProfileInfo() {
        const nodeTitles = {
            'alpha': 'AlphaTeam',
            'game': 'GameZone',
            'family': 'FamilyHub'
        };
        
        const currentNodeTitle = nodeTitles[currentNode] || 'AlphaTeam';
        
        // Обновляем название профиля если есть элемент
        const profileName = document.querySelector('.profile-name');
        if (profileName) {
            profileName.textContent = currentNodeTitle;
        }
        
        // Обновляем статус с учетом режима хамелеона
        const profileStatus = document.querySelector('.profile-status');
        if (profileStatus) {
            const statusText = chameleonMode ? 
                `Адаптивный режим • ${getRandomNumber(20, 50)} участника` :
                `Стандартный режим • ${getRandomNumber(20, 50)} участника`;
            profileStatus.textContent = statusText;
        }
    }
    
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Инициализация существующих функций
    function initExistingFeatures() {
        // Тема
        setupThemeSwitcher();
        
        // Фоны
        setupBackgroundSelector();
        
        // Профиль
        const profileLink = document.getElementById('profile-link');
        if (profileLink) {
            profileLink.addEventListener('click', openProfilePage);
        }
        
        const profileBackBtn = document.querySelector('.profile-back-btn');
        if (profileBackBtn) {
            profileBackBtn.addEventListener('click', closeProfilePage);
        }
        
        // Другие существующие обработчики...
        // (Добавьте здесь другие функции из старого script.js)
    }

    // ===== ЗАПУСК ВСЕГО =====
    function startApplication() {
        // Инициализируем новые функции хамелеона
        init();
        
        // Инициализируем существующие функции
        initExistingFeatures();
        
        // Финальная инициализация
        console.log('🚀 Telegram Nodes REVOLUTION успешно запущен!');
        console.log('🎨 Режим "Хамелеон" активирован');
        console.log('🤖 AI помощник NOVA готов к работе');
    }

    // Запускаем приложение
    startApplication();
});

// Добавляем CSS для уведомлений
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
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
        transition: all 0.3s ease;
        max-width: 300px;
    }
    
    .notification-info {
        background: #007AFF;
    }
    
    .notification-success {
        background: #34C759;
    }
    
    .notification-error {
        background: #FF3B30;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    @keyframes aiSlideOut {
        to {
            transform: translateX(-50%) translateY(-20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);
