// Telegram Nodes - Interactive Prototype

document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const body = document.body;
    const themeButtons = document.querySelectorAll('.theme-btn');
    const nodeItems = document.querySelectorAll('.node-item');
    const switchItems = document.querySelectorAll('.switch-item');
    const chatItems = document.querySelectorAll('.chat-item');
    const addNodeBtn = document.querySelector('.add-node');
    const createNodePanel = document.querySelector('.create-node-panel');
    const cancelCreateBtn = document.querySelector('.btn-secondary');
    const confirmCreateBtn = document.querySelector('.btn-primary');
    const colorOptions = document.querySelectorAll('.color-option');
    const screenshotBtn = document.querySelector('.screenshot-btn');
    const adminPanel = document.querySelector('.node-admin-panel');
    const backBtn = document.querySelector('.back-btn');
    const bgPreviews = document.querySelectorAll('.bg-preview');
    const dragonContainer = document.querySelector('.dragon-container');
    const fireDragon = document.querySelector('.fire-dragon');

    // Текущее состояние
    let currentTheme = 'day';
    let currentNode = 'alpha';
    let selectedColor = 'blue';
    let currentBackground = 'default';

    // Инициализация
    init();

    function init() {
        // Установка обработчиков событий
        setupEventListeners();
        
        // Показать начальное состояние
        updateUI();
        
        // Анимация появления
        setTimeout(() => {
            document.querySelector('.container').classList.add('fade-in');
        }, 100);
        
        // Инициализируем взаимодействие с драконом
        setTimeout(setupDragonInteraction, 1000);
    }

    function setupEventListeners() {
        // Переключение тем
        themeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const theme = this.dataset.theme;
                switchTheme(theme);
                
                // Обновление активной кнопки
                themeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Выбор фона
        bgPreviews.forEach(preview => {
            preview.addEventListener('click', function() {
                const bgType = this.dataset.bg;
                selectBackground(bgType);
                
                // Обновление активного превью
                bgPreviews.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Выбор узла в боковом меню
        nodeItems.forEach(item => {
            item.addEventListener('click', function() {
                const node = this.dataset.node;
                selectNode(node);
                
                // Обновление индикаторов
                nodeItems.forEach(i => {
                    i.classList.remove('active');
                    const indicator = i.querySelector('.node-indicator');
                    if (indicator) indicator.style.display = 'none';
                });
                
                this.classList.add('active');
                const indicator = this.querySelector('.node-indicator');
                if (indicator) indicator.style.display = 'block';
                
                // Показать админ-панель для AlphaTeam
                if (node === 'alpha') {
                    adminPanel.style.display = 'block';
                } else {
                    adminPanel.style.display = 'none';
                }
            });
        });

        // Quick Switch фильтры
        switchItems.forEach(item => {
            item.addEventListener('click', function() {
                if (this.classList.contains('add')) {
                    toggleCreateNodePanel();
                    return;
                }
                
                const filter = this.textContent.toLowerCase();
                filterChats(filter);
                
                // Обновление активного фильтра
                switchItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Создание узла
        addNodeBtn.addEventListener('click', toggleCreateNodePanel);
        cancelCreateBtn.addEventListener('click', toggleCreateNodePanel);
        
        confirmCreateBtn.addEventListener('click', function() {
            const nodeName = document.querySelector('input[type="text"]').value;
            createNewNode(nodeName, selectedColor);
            toggleCreateNodePanel();
        });

        // Выбор цвета
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                selectedColor = this.dataset.color;
            });
        });

        // Клик по чату
        chatItems.forEach(item => {
            item.addEventListener('click', function() {
                // Анимация клика
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // Показать уведомление
                showNotification('Чат открыт', 'success');
            });
        });

        // Скриншот
        screenshotBtn.addEventListener('click', takeScreenshot);

        // Кнопка назад
        backBtn.addEventListener('click', function() {
            showNotification('Возврат к общему списку', 'info');
        });

        // Анимация при наведении на элементы
        setupHoverEffects();
    }

    function switchTheme(theme) {
        currentTheme = theme;
        body.classList.remove('day-theme', 'night-theme');
        body.classList.add(theme + '-theme');
        
        // Анимация перехода
        body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 500);
        
        showNotification('Тема изменена: ' + (theme === 'day' ? 'День' : 'Ночь'), 'info');
    }

    function selectBackground(bgType) {
        currentBackground = bgType;
        const container = document.querySelector('.container');
        
        // Убираем все классы фонов
        container.classList.remove('with-bg');
        container.className = container.className.replace(/bg-\w+/g, '');
        dragonContainer.style.display = 'none';
        
        // Добавляем оверлей фона
        let bgOverlay = document.querySelector('.container-bg-overlay');
        if (!bgOverlay) {
            bgOverlay = document.createElement('div');
            bgOverlay.className = 'container-bg-overlay';
            container.appendChild(bgOverlay);
        }
        
        // Применяем выбранный фон
        switch(bgType) {
            case 'default':
                bgOverlay.style.background = '';
                container.classList.remove('with-bg');
                break;
                
            case 'gradient1':
                container.classList.add('with-bg');
                bgOverlay.style.background = 'linear-gradient(135deg, #0088cc, #6a11cb, #2575fc)';
                break;
                
            case 'gradient2':
                container.classList.add('with-bg');
                bgOverlay.style.background = 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)';
                break;
                
            case 'pattern1':
                container.classList.add('with-bg');
                bgOverlay.style.background = 
                    'radial-gradient(circle at 20% 80%, rgba(64, 183, 232, 0.15) 0%, transparent 50%), ' +
                    'radial-gradient(circle at 80% 20%, rgba(175, 82, 222, 0.15) 0%, transparent 50%), ' +
                    'var(--tg-bg)';
                break;
                
            case 'pattern2':
                container.classList.add('with-bg');
                bgOverlay.style.background = 
                    'linear-gradient(45deg, transparent 48%, rgba(52, 199, 89, 0.1) 50%, transparent 52%), ' +
                    'linear-gradient(-45deg, transparent 48%, rgba(255, 59, 48, 0.1) 50%, transparent 52%), ' +
                    'var(--tg-bg)';
                bgOverlay.style.backgroundSize = '40px 40px';
                break;
                
            case 'animated':
                container.classList.add('with-bg');
                bgOverlay.style.background = 'linear-gradient(135deg, var(--tg-bg), var(--tg-bg-secondary))';
                bgOverlay.classList.add('bg-animated');
                break;
                
            case 'space':
                container.classList.add('with-bg');
                bgOverlay.style.background = 
                    'radial-gradient(ellipse at 20% 30%, rgba(64, 183, 232, 0.3) 0%, transparent 40%), ' +
                    'radial-gradient(ellipse at 80% 70%, rgba(175, 82, 222, 0.3) 0%, transparent 40%), ' +
                    'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a1a 100%)';
                break;
                
            case 'watercolor':
                container.classList.add('with-bg');
                bgOverlay.style.background = 
                    'radial-gradient(circle at 10% 20%, rgba(64, 183, 232, 0.4) 0%, transparent 40%), ' +
                    'radial-gradient(circle at 90% 80%, rgba(175, 82, 222, 0.4) 0%, transparent 40%), ' +
                    'radial-gradient(circle at 50% 50%, rgba(52, 199, 89, 0.3) 0%, transparent 50%), ' +
                    'linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%)';
                break;
                
            case 'neon':
                container.classList.add('with-bg');
                bgOverlay.style.background = 
                    'linear-gradient(135deg, #0f0f1a 0%, #1a0f2a 25%, #0f1a2a 50%, #1a2a0f 75%, #0f0f1a 100%)';
                break;
                
            case 'dragon':
                container.classList.add('with-bg');
                dragonContainer.style.display = 'block';
                bgOverlay.style.background = 'linear-gradient(135deg, #0a0a2a, #1a1a3a)';
                
                // Анимация дракона при активации
                fireDragon.style.animation = 'none';
                setTimeout(() => {
                    fireDragon.style.animation = 'fly-around 25s infinite linear';
                }, 10);
                break;
        }
        
        showNotification(`Фон изменен: ${getBgName(bgType)}`, 'info');
    }
    
    function getBgName(bgType) {
        const names = {
            'default': 'Стандартный',
            'gradient1': 'Сине-фиолетовый градиент',
            'gradient2': 'Темный градиент',
            'pattern1': 'Радиальный паттерн',
            'pattern2': 'Линейный паттерн',
            'animated': 'Анимированный',
            'space': 'Космос',
            'watercolor': 'Акварель',
            'neon': 'Неон',
            'dragon': 'Огненный дракон!'
        };
        return names[bgType] || bgType;
    }
    
    function selectNode(node) {
        currentNode = node;
        
        // Обновление заголовка
        const nodeTitles = {
            'alpha': 'AlphaTeam',
            'game': 'GameZone',
            'family': 'FamilyHub'
        };
        
        const titleElement = document.querySelector('.current-node h2');
        const avatarElement = document.querySelector('.current-node .node-avatar');
        
        if (titleElement && nodeTitles[node]) {
            titleElement.textContent = nodeTitles[node];
        }
        
        // Обновление аватара
        const gradients = {
            'alpha': 'linear-gradient(135deg, #0088cc, #40b7e8)',
            'game': 'linear-gradient(135deg, #af52de, #bf5af2)',
            'family': 'linear-gradient(135deg, #34c759, #30d158)'
        };
        
        if (avatarElement && gradients[node]) {
            avatarElement.style.background = gradients[node];
        }
        
        // Анимация
        const container = document.querySelector('.container');
        container.style.transform = 'scale(0.99)';
        setTimeout(() => {
            container.style.transform = 'scale(1)';
        }, 300);
        
        showNotification('Переключено на узел: ' + nodeTitles[node], 'success');
    }

    function filterChats(filter) {
        chatItems.forEach(item => {
            const itemNode = item.dataset.node;
            const nodeNames = {
                'alpha': 'alphateam',
                'game': 'gamezone',
                'family': 'familyhub'
            };
            
            if (filter === 'все' || nodeNames[itemNode] === filter) {
                item.style.display = 'flex';
                item.style.animation = 'fadeIn 0.3s ease';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Анимация
        const chatList = document.querySelector('.chat-list');
        chatList.style.opacity = '0.5';
        setTimeout(() => {
            chatList.style.opacity = '1';
        }, 300);
    }

    function toggleCreateNodePanel() {
        const isVisible = createNodePanel.style.display === 'block';
        createNodePanel.style.display = isVisible ? 'none' : 'block';
        
        // Анимация
        if (!isVisible) {
            createNodePanel.style.transform = 'translateY(20px)';
            createNodePanel.style.opacity = '0';
            setTimeout(() => {
                createNodePanel.style.transition = 'all 0.3s ease';
                createNodePanel.style.transform = 'translateY(0)';
                createNodePanel.style.opacity = '1';
            }, 10);
        }
        
        showNotification(isVisible ? 'Создание узла отменено' : 'Начните создание нового узла', 'info');
    }

    function createNewNode(name, color) {
        // Создание нового элемента узла
        const nodesSection = document.querySelector('.nodes-section');
        const newNode = document.createElement('div');
        newNode.className = 'node-item';
        newNode.dataset.node = name.toLowerCase().replace(/\s+/g, '_');
        
        const colorGradients = {
            'blue': 'linear-gradient(135deg, #0088cc, #40b7e8)',
            'purple': 'linear-gradient(135deg, #af52de, #bf5af2)',
            'green': 'linear-gradient(135deg, #34c759, #30d158)',
            'orange': 'linear-gradient(135deg, #ff9500, #ff9f0a)',
            'lightblue': 'linear-gradient(135deg, #5ac8fa, #64d2ff)'
        };
        
        const icons = {
            'blue': 'fas fa-cogs',
            'purple': 'fas fa-gamepad',
            'green': 'fas fa-home',
            'orange': 'fas fa-palette',
            'lightblue': 'fas fa-graduation-cap'
        };
        
        newNode.innerHTML = `
            <div class="node-avatar" style="background: ${colorGradients[color]};">
                <i class="${icons[color]}"></i>
            </div>
            <span>${name}</span>
        `;
        
        // Вставка перед кнопкой "Создать узел"
        nodesSection.insertBefore(newNode, addNodeBtn);
        
        // Добавление обработчика
        newNode.addEventListener('click', function() {
            nodeItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            selectNode(this.dataset.node);
        });
        
        // Добавление в Quick Switch
        const quickSwitch = document.querySelector('.quick-switch');
        const newSwitch = document.createElement('div');
        newSwitch.className = 'switch-item';
        newSwitch.textContent = name;
        
        newSwitch.addEventListener('click', function() {
            switchItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            filterChats(name.toLowerCase());
        });
        
        // Вставка перед кнопкой "+"
        const addButton = quickSwitch.querySelector('.add');
        quickSwitch.insertBefore(newSwitch, addButton);
        
        // Анимация
        newNode.style.opacity = '0';
        newNode.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            newNode.style.transition = 'all 0.3s ease';
            newNode.style.opacity = '1';
            newNode.style.transform = 'scale(1)';
        }, 10);
        
        showNotification(`Узел "${name}" создан успешно!`, 'success');
        
        // Обновление списка элементов
        const allNodeItems = document.querySelectorAll('.node-item');
        const allSwitchItems = document.querySelectorAll('.switch-item');
        
        // Перепривязываем обработчики
        allNodeItems.forEach(item => {
            item.addEventListener('click', function() {
                const node = this.dataset.node;
                selectNode(node);
                
                allNodeItems.forEach(i => {
                    i.classList.remove('active');
                    const indicator = i.querySelector('.node-indicator');
                    if (indicator) indicator.style.display = 'none';
                });
                
                this.classList.add('active');
            });
        });
    }

    function takeScreenshot() {
        const container = document.querySelector('.container');
        
        // Эффект вспышки
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.background = 'white';
        flash.style.opacity = '0';
        flash.style.zIndex = '9999';
        flash.style.pointerEvents = 'none';
        document.body.appendChild(flash);
        
        // Анимация вспышки
        flash.animate([
            { opacity: 0 },
            { opacity: 0.7 },
            { opacity: 0 }
        ], {
            duration: 300,
            easing: 'ease-out'
        });
        
        setTimeout(() => {
            flash.remove();
        }, 300);
        
        // Эффект на контейнере
        container.style.boxShadow = '0 0 0 4px var(--tg-blue)';
        setTimeout(() => {
            container.style.boxShadow = '';
        }, 500);
        
        showNotification('Скриншот сохранен! (в реальном приложении)', 'success');
    }

    function showNotification(message, type) {
        // Удаляем старые уведомления
        const oldNotifications = document.querySelectorAll('.notification');
        oldNotifications.forEach(n => n.remove());
        
        // Создание уведомления
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#34C759' : '#007AFF'};
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
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
                notification.remove();
            }, 300);
        }, 3000);
    }

    function setupHoverEffects() {
        // Парящие эффекты для интерактивных элементов
        const hoverElements = document.querySelectorAll('.node-item, .chat-item, .switch-item, .btn-primary, .btn-secondary');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            el.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
    
    function setupDragonInteraction() {
        const nodeAvatars = document.querySelectorAll('.node-avatar');
        
        nodeAvatars.forEach(avatar => {
            avatar.addEventListener('mouseenter', function() {
                if (currentBackground === 'dragon') {
                    // Дракон летит к этой иконке
                    const rect = this.getBoundingClientRect();
                    const containerRect = document.querySelector('.container').getBoundingClientRect();
                    
                    const x = rect.left - containerRect.left + rect.width / 2;
                    const y = rect.top - containerRect.top + rect.height / 2;
                    
                    // Сохраняем текущую анимацию
                    const currentAnimation = fireDragon.style.animation;
                    
                    // Временно меняем позицию дракона
                    fireDragon.style.left = `${x - 90}px`;
                    fireDragon.style.top = `${y - 60}px`;
                    fireDragon.style.animation = 'fire-pulse 0.5s infinite alternate';
                    
                    // Возвращаем обычную анимацию через 1 секунду
                    setTimeout(() => {
                        fireDragon.style.animation = currentAnimation;
                    }, 1000);
                }
            });
        });
    }

    function updateUI() {
        // Установка начального активного узла
        const initialNode = document.querySelector('.node-item[data-node="alpha"]');
        if (initialNode) {
            initialNode.classList.add('active');
            const indicator = initialNode.querySelector('.node-indicator');
            if (indicator) indicator.style.display = 'block';
        }
        
        // Установка начального активного фильтра
        const initialFilter = document.querySelector('.switch-item:first-child');
        if (initialFilter) {
            initialFilter.classList.add('active');
        }
        
        // Установка начального активного цвета
        const initialColor = document.querySelector('.color-option[data-color="blue"]');
        if (initialColor) {
            initialColor.classList.add('active');
        }
        
        // Показать админ-панель для AlphaTeam
        adminPanel.style.display = 'block';
    }

    // Дополнительные функции для демонстрации
    window.demoSwitchNode = function(nodeName) {
        const node = document.querySelector(`.node-item[data-node="${nodeName}"]`);
        if (node) node.click();
    };
    
    window.demoCreateNode = function(name, color) {
        const colorOption = document.querySelector(`.color-option[data-color="${color}"]`);
        if (colorOption) colorOption.click();
        
        document.querySelector('input[type="text"]').value = name;
        document.querySelector('.btn-primary').click();
    };
    
    window.demoSwitchTheme = function(theme) {
        const themeBtn = document.querySelector(`.theme-btn[data-theme="${theme}"]`);
        if (themeBtn) themeBtn.click();
    };
    
    window.demoSwitchBackground = function(bgType) {
        const bgPreview = document.querySelector(`.bg-preview[data-bg="${bgType}"]`);
        if (bgPreview) bgPreview.click();
    };

    // Консольные команды для демо
    console.log('🎨 Telegram Nodes Prototype Loaded!');
    console.log('Доступные команды:');
    console.log('- demoSwitchNode("alpha") - переключить на узел');
    console.log('- demoCreateNode("DesignLab", "orange") - создать узел');
    console.log('- demoSwitchTheme("night") - переключить тему');
    console.log('- demoSwitchBackground("dragon") - включить дракона!');
});
