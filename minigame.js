
document.addEventListener('DOMContentLoaded', function() {
    // 1. Создаем основной контейнер игры
    const gameContainer = document.createElement('div');
    gameContainer.className = 'game-container';
    
    // 2. Создаем UI элементы
    gameContainer.innerHTML = `
        <div class="game-ui max-w-4xl mx-auto">
            <div class="game-header mb-6 p-4 bg-gray-800 rounded-lg shadow-lg">
                <h1 class="game-title text-3xl font-bold text-white mb-4 text-center">🐾 Пиксельная Экосистема</h1>
                
                <div class="flex flex-wrap justify-center gap-4 mb-4">
                    <button id="toggle-game" class="game-button px-6 py-3 btn-start text-white">
                        Старт
                    </button>
                    <button id="reset-game" class="game-button px-6 py-3 btn-reset text-white">
                        Сброс
                    </button>
                </div>
                
                <div class="entity-controls mb-2">
                    <h3 class="text-lg font-semibold text-white mb-3 text-center">Добавить элементы:</h3>
                    <div class="flex flex-wrap justify-center gap-3">
                        <button id="add-pixel" class="entity-button px-4 py-2 btn-pixel text-white">
                            <i class="fas fa-square mr-2"></i>Пиксель
                        </button>
                        <button id="add-button" class="entity-button px-4 py-2 btn-button text-white">
                            <i class="fas fa-square-full mr-2"></i>Кнопка
                        </button>
                        <button id="add-basket" class="entity-button px-4 py-2 btn-basket text-white">
                            <i class="fas fa-circle mr-2"></i>Корзина
                        </button>
                        <button id="add-container" class="entity-button px-4 py-2 btn-container text-white">
                            <i class="fas fa-cube mr-2"></i>Контейнер
                        </button>
                    </div>
                </div>
            </div>

            <div class="game-stats bg-gray-800 rounded-lg p-4 mb-6 shadow-lg">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-white text-sm">
                    <div class="stat-card bg-purple-900/50 p-3 rounded-lg">
                        <div class="flex items-center gap-3">
                            <div class="w-4 h-4 bg-purple-400 rounded-sm"></div>
                            <span id="pixels-count" class="font-medium">Пиксели: 0</span>
                        </div>
                    </div>
                    <div class="stat-card bg-green-900/50 p-3 rounded-lg">
                        <div class="flex items-center gap-3">
                            <div class="w-4 h-4 border-2 border-green-400 rounded-sm"></div>
                            <span id="buttons-count" class="font-medium">Кнопки: 0</span>
                        </div>
                    </div>
                    <div class="stat-card bg-orange-900/50 p-3 rounded-lg">
                        <div class="flex items-center gap-3">
                            <div class="w-4 h-4 border-2 border-orange-400 rounded-full"></div>
                            <span id="baskets-count" class="font-medium">Корзины: 0</span>
                        </div>
                    </div>
                    <div class="stat-card bg-blue-900/50 p-3 rounded-lg">
                        <div class="flex items-center gap-3">
                            <div class="w-4 h-4 border-2 border-blue-400 rounded-sm"></div>
                            <span id="containers-count" class="font-medium">Контейнеры: 0</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="game-canvas-container bg-gray-800 rounded-lg p-4 mb-6 shadow-lg">
                <canvas id="game-canvas" width="800" height="400" class="border-2 border-gray-700 rounded-lg bg-gray-900 cursor-crosshair w-full"></canvas>
            </div>

            <div class="game-info grid md:grid-cols-2 gap-6">
                <div class="game-rules bg-gray-800 rounded-lg p-5 shadow-lg">
                    <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <i class="fas fa-book"></i> Правила экосистемы
                    </h3>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-2">
                            <span class="text-purple-400">🟣</span>
                            <span><strong>Пиксели</strong> - прячутся в контейнерах при опасности</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-green-400">🟩</span>
                            <span><strong>Кнопки</strong> - копируют пиксели, ищут убежище</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-orange-400">🟠</span>
                            <span><strong>Корзины</strong> - охотятся за элементами, боятся контейнеров</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-400">🟦</span>
                            <span><strong>Контейнеры</strong> - защищают элементы и отпугивают корзины</span>
                        </li>
                    </ul>
                </div>

                <div class="game-tips bg-gray-800 rounded-lg p-5 shadow-lg select-none">
                    <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <i class="fas fa-lightbulb"></i> Советы
                    </h3>
                    <div id="tip-container" class="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors user-select-none">
                        <p id="current-tip" class="text-gray-200 text-sm leading-relaxed select-none"></p>
                        <p class="text-xs text-gray-400 mt-3 flex items-center gap-1 select-none">
                            <i class="fas fa-mouse-pointer"></i> Кликните для следующего совета 
                            (<span id="tip-counter">1</span>/<span id="total-tips">0</span>)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 3. Добавляем стили динамически
    const style = document.createElement('style');
    style.textContent = `
        .game-container {
            padding: 4rem 0;
            background-color: #343a40;
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        #game-canvas {
            width: 100%;
            max-width: 800px;
            height: 400px;
            display: block;
            margin: 0 auto;
            background-color: #212529;
        }
        
        /* Адаптивные стили */
        @media (max-width: 768px) {
            .game-controls {
                flex-direction: column;
            }
            
            .entity-controls .flex {
                flex-wrap: wrap;
            }
            
            .game-stats .grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (max-width: 480px) {
            .game-title {
                font-size: 1.5rem !important;
            }
            
            .game-stats .grid {
                grid-template-columns: 1fr;
            }
        }

        .game-rules h3, .game-tips h3 {
            color: white !important; /* Белый цвет для заголовков */
        }

        /* Убираем градиент для заголовков (если был) */
        .game-rules h3, .game-tips h3 {
            background: none !important;
            -webkit-background-clip: initial !important;
            background-clip: initial !important;
            color: white !important;
            text-shadow: none !important;
        }        

        .game-tips, 
        .game-tips *,
        #tip-container,
        #current-tip,
        #tip-counter,
        #total-tips {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }

        /* Защита от копирования через контекстное меню */
        #tip-container {
            -webkit-touch-callout: none;
        }

    `;
    document.head.appendChild(style);

    // 4. Вставляем игру в страницу
    const gameSection = document.getElementById('pixel-ecosystem-game');
    gameSection.appendChild(gameContainer);

    // 5. Инициализация игры (ваш существующий код)
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    // Константы и переменные игры
    const ENTITY_TYPES = {
        PIXEL: 'pixel',
        BUTTON: 'button',
        BASKET: 'basket',
        CONTAINER: 'container'
    };

    const BUTTON_TYPES = {
        COPY: 'copy',
        MOVE: 'move',
        DELETE: 'delete',
        CREATE: 'create'
    };

    let entities = [];
    let isRunning = false;
    let stats = { pixels: 0, buttons: 0, baskets: 0, containers: 0 };
    let contextMenu = { visible: false, x: 0, y: 0, type: 'add' };
    let mouseDown = { left: false, right: false, startTime: 0 };
    let currentTip = 0;

    const tips = [
        "🎯 Размещайте контейнеры стратегически - они отпугивают корзины в радиусе 60px",
        "🏃 Пиксели и кнопки умеют планировать безопасный маршрут к контейнерам",
        "🔄 Используйте правую кнопку мыши для быстрого удаления элементов",
        "⚡ Кнопки CREATE имеют только 10% шанс создать новый пиксель при активации",
        "🎭 Корзины боятся друг друга и не могут подходить слишком близко",
        "🔒 Элементы в контейнерах полностью исчезают и защищены от корзин",
        "🎨 Кнопки COPY создают пиксели того же цвета, что и оригинал",
        "🌊 Добавьте больше контейнеров, чтобы создать безопасные зоны",
        "🎪 Корзины стараются держаться подальше от контейнеров",
        "🎲 Каждый элемент имеет уникальную скорость и поведение",
        "🔧 Контейнеры выпускают элементы каждые 1.5 секунды в безопасности",
        "🌟 Экосистема самобалансируется - наблюдайте за динамикой!"
    ];

    // Получаем элементы DOM

    //const canvas = document.getElementById('game-canvas');
    //const ctx = canvas.getContext('2d');

    const toggleGameBtn = document.getElementById('toggle-game');
    const resetGameBtn = document.getElementById('reset-game');
    const addPixelBtn = document.getElementById('add-pixel');
    const addButtonBtn = document.getElementById('add-button');
    const addBasketBtn = document.getElementById('add-basket');
    const addContainerBtn = document.getElementById('add-container');
    const currentTipElement = document.getElementById('current-tip');
    const tipCounterElement = document.getElementById('tip-counter');
    const totalTipsElement = document.getElementById('total-tips');
    const tipContainer = document.getElementById('tip-container');
    const pixelsCountElement = document.getElementById('pixels-count');
    const buttonsCountElement = document.getElementById('buttons-count');
    const basketsCountElement = document.getElementById('baskets-count');
    const containersCountElement = document.getElementById('containers-count');

    // Инициализация игры
    function initializeEcosystem() {
        entities = [];
        
        // Создаем начальные сущности
        for (let i = 0; i < 40; i++) {
            entities.push(createEntity(ENTITY_TYPES.PIXEL));
        }
        for (let i = 0; i < 15; i++) {
            entities.push(createEntity(ENTITY_TYPES.BUTTON));
        }
        for (let i = 0; i < 4; i++) {
            entities.push(createEntity(ENTITY_TYPES.BASKET));
        }
        for (let i = 0; i < 3; i++) {
            entities.push(createEntity(ENTITY_TYPES.CONTAINER));
        }
        
        updateStats();
        draw();
        
        // Инициализация советов
        currentTipElement.textContent = tips[0];
        totalTipsElement.textContent = tips.length;
        tipCounterElement.textContent = 1;
    }

    // Создание новой сущности
    function createEntity(type, x, y, buttonType = null) {
        const baseEntity = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            x: x || Math.random() * 760,
            y: y || Math.random() * 360,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            age: 0,
            energy: 100,
            hidden: false,
            containerId: null
        };

        switch (type) {
            case ENTITY_TYPES.PIXEL:
                return {
                    ...baseEntity,
                    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                    size: 4,
                    speed: 0.5 + Math.random() * 1
                };
            case ENTITY_TYPES.BUTTON:
                return {
                    ...baseEntity,
                    buttonType: buttonType || Object.values(BUTTON_TYPES)[Math.floor(Math.random() * 4)],
                    size: 12,
                    speed: 0.3 + Math.random() * 0.7,
                    cooldown: 0
                };
            case ENTITY_TYPES.BASKET:
                return {
                    ...baseEntity,
                    size: 20,
                    speed: 0.2 + Math.random() * 0.3,
                    capacity: 10,
                    collected: 0
                };
            case ENTITY_TYPES.CONTAINER:
                return {
                    ...baseEntity,
                    size: 30,
                    speed: 0.1 + Math.random() * 0.2,
                    stored: [],
                    safeRadius: 35,
                    releaseTimer: 0
                };
            default:
                return baseEntity;
        }
    }

    // Обновление статистики
    function updateStats() {
        let totalPixels = 0;
        let totalButtons = 0;
        let totalBaskets = 0;
        let totalContainers = 0;

        entities.forEach(entity => {
            switch (entity.type) {
                case ENTITY_TYPES.PIXEL:
                    totalPixels++;
                    break;
                case ENTITY_TYPES.BUTTON:
                    totalButtons++;
                    break;
                case ENTITY_TYPES.BASKET:
                    totalBaskets++;
                    break;
                case ENTITY_TYPES.CONTAINER:
                    totalContainers++;
                    entity.stored.forEach(stored => {
                        if (stored.type === ENTITY_TYPES.PIXEL) totalPixels++;
                        if (stored.type === ENTITY_TYPES.BUTTON) totalButtons++;
                    });
                    break;
            }
        });

        stats = {
            pixels: totalPixels,
            buttons: totalButtons,
            baskets: totalBaskets,
            containers: totalContainers
        };

        // Обновляем DOM
        pixelsCountElement.textContent = `Пиксели: ${stats.pixels}`;
        buttonsCountElement.textContent = `Кнопки: ${stats.buttons}`;
        basketsCountElement.textContent = `Корзины: ${stats.baskets}`;
        containersCountElement.textContent = `Контейнеры: ${stats.containers}`;
    }

    // Функция расстояния между сущностями
    function getDistance(entity1, entity2) {
        const dx = entity1.x - entity2.x;
        const dy = entity1.y - entity2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Поиск ближайшего элемента определенного типа
    function findNearestEntity(entity, targetType, excludeHidden = true) {
        let nearest = null;
        let minDistance = Infinity;
        
        entities.forEach(other => {
            if (other.id === entity.id || other.type !== targetType) return;
            if (excludeHidden && other.hidden) return;
            
            const distance = getDistance(entity, other);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = other;
            }
        });
        
        return nearest;
    }

    // Движение к цели
    function moveTowards(entity, target, speed = 1) {
        const dx = target.x - entity.x;
        const dy = target.y - entity.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            entity.vx = (dx / distance) * speed;
            entity.vy = (dy / distance) * speed;
        }
    }

    // Движение от цели (убегание)
    function moveAway(entity, target, speed = 1) {
        const dx = entity.x - target.x;
        const dy = entity.y - target.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            entity.vx = (dx / distance) * speed;
            entity.vy = (dy / distance) * speed;
        }
    }

    // Проверка безопасности зоны (нет корзин рядом)
    function isAreaSafe(x, y, radius = 100) {
        return !entities.some(entity => 
            entity.type === ENTITY_TYPES.BASKET && 
            !entity.hidden &&
            Math.sqrt((entity.x - x) ** 2 + (entity.y - y) ** 2) < radius
        );
    }

    // Проверка пути к контейнеру на наличие корзин
    function isPathSafeToContainer(entity, container) {
        const dx = container.x - entity.x;
        const dy = container.y - entity.y;
        const pathDistance = Math.sqrt(dx * dx + dy * dy);
        
        // Проверяем точки вдоль пути
        const steps = Math.ceil(pathDistance / 20);
        
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const checkX = entity.x + dx * t;
            const checkY = entity.y + dy * t;
            
            // Проверяем, есть ли корзины рядом с этой точкой на пути
            const basketNearPath = entities.some(basket => 
                basket.type === ENTITY_TYPES.BASKET && 
                !basket.hidden &&
                basket.id !== entity.id &&
                Math.sqrt((basket.x - checkX) ** 2 + (basket.y - checkY) ** 2) < 40
            );
            
            if (basketNearPath) {
                return false;
            }
        }
        
        return true;
    }

    // Проверка на перекрытие с другими контейнерами
    function canPlaceContainer(x, y, size) {
        return !entities.some(entity => 
            entity.type === ENTITY_TYPES.CONTAINER &&
            Math.sqrt((entity.x - x) ** 2 + (entity.y - y) ** 2) < size + entity.size
        );
    }

    // Проверка на перекрытие с другими корзинами
    function canPlaceBasket(x, y, size) {
        return !entities.some(entity => 
            entity.type === ENTITY_TYPES.BASKET &&
            Math.sqrt((entity.x - x) ** 2 + (entity.y - y) ** 2) < size + entity.size + 10
        );
    }

    // Обновление сущностей
    function updateEntities() {
        const newEntities = [...entities];
        const toRemove = new Set();
        const toAdd = [];

        newEntities.forEach((entity, index) => {
            if (toRemove.has(entity.id)) {return;}

            // Логика поведения для каждого типа
            switch (entity.type) {
                case ENTITY_TYPES.PIXEL:
                case ENTITY_TYPES.BUTTON:
                    // Проверяем близость к корзинам
                    const nearestBasket = findNearestEntity(entity, ENTITY_TYPES.BASKET);
                    const isInDanger = nearestBasket && getDistance(entity, nearestBasket) < 100;
                    
                    if (isInDanger) {
                        // Ищем ближайший контейнер для убежища
                        const nearestContainer = findNearestEntity(entity, ENTITY_TYPES.CONTAINER);
                        if (nearestContainer) {
                            const distanceToContainer = getDistance(entity, nearestContainer);
                            
                            // Если достаточно близко к контейнеру, прячемся в него
                            if (distanceToContainer < nearestContainer.size) {
                                entity.hidden = true;
                                entity.containerId = nearestContainer.id;
                                nearestContainer.stored.push({...entity});
                                toRemove.add(entity.id);
                            } else {
                                // Проверяем безопасность пути к контейнеру
                                if (isPathSafeToContainer(entity, nearestContainer)) {
                                    // Путь безопасен, бежим к контейнеру
                                    moveTowards(entity, nearestContainer, 2);
                                } else {
                                    // Путь опасен, ищем обходной путь или убегаем от корзины
                                    moveAway(entity, nearestBasket, 2);
                                    
                                    // Попытаемся найти альтернативный контейнер
                                    const allContainers = newEntities.filter(e => 
                                        e.type === ENTITY_TYPES.CONTAINER && 
                                        e.id !== nearestContainer.id &&
                                        !e.hidden
                                    );
                                    
                                    for (const altContainer of allContainers) {
                                        if (isPathSafeToContainer(entity, altContainer)) {
                                            moveTowards(entity, altContainer, 2);
                                            break;
                                        }
                                    }
                                }
                            }
                        } else {
                            // Нет контейнера, просто убегаем от корзины
                            moveAway(entity, nearestBasket, 2);
                        }
                    } else {
                        // Обычное поведение
                        if (entity.type === ENTITY_TYPES.BUTTON) {
                            const nearestPixel = findNearestEntity(entity, ENTITY_TYPES.PIXEL);
                            if (nearestPixel && entity.cooldown <= 0) {
                                moveTowards(entity, nearestPixel, 0.8);
                            }
                        }
                    }
                    break;

                case ENTITY_TYPES.BASKET:
                    // Корзины боятся контейнеров и убегают от них
                    const nearestContainer = findNearestEntity(entity, ENTITY_TYPES.CONTAINER);
                    const nearestBasketThreat = findNearestEntity(entity, ENTITY_TYPES.BASKET);
                    
                    let shouldFlee = false;
                    
                    // Убегают от контейнеров
                    if (nearestContainer && getDistance(entity, nearestContainer) < 60) {
                        moveAway(entity, nearestContainer, 1.5);
                        shouldFlee = true;
                    }
                    
                    // Убегают от других корзин
                    if (nearestBasketThreat && getDistance(entity, nearestBasketThreat) < 40) {
                        moveAway(entity, nearestBasketThreat, 1.2);
                        shouldFlee = true;
                    }
                    
                    if (!shouldFlee) {
                        // Корзины охотятся за видимыми пикселями и кнопками
                        const targetPixel = findNearestEntity(entity, ENTITY_TYPES.PIXEL);
                        const targetButton = findNearestEntity(entity, ENTITY_TYPES.BUTTON);
                        
                        let huntTarget = null;
                        if (targetPixel && targetButton) {
                            huntTarget = getDistance(entity, targetPixel) < getDistance(entity, targetButton) ? targetPixel : targetButton;
                        } else {
                            huntTarget = targetPixel || targetButton;
                        }
                        
                        if (huntTarget) {
                            moveTowards(entity, huntTarget, 1.2);
                        }
                    }
                    break;

                case ENTITY_TYPES.CONTAINER:
                    // Контейнеры проверяют, можно ли выпустить скрытые элементы
                    if (entity.stored.length > 0) {
                        const isSafe = isAreaSafe(entity.x, entity.y);
                        if (isSafe) {
                            // Выпускаем элементы более активно
                            if (!entity.releaseTimer) {
                                entity.releaseTimer = 0;
                            }
                            entity.releaseTimer++;
                            
                            // Выпускаем каждые 30 кадров (примерно 2 раза в секунду)
                            if (entity.releaseTimer >= 30) { 
                                const releasedEntity = entity.stored.pop();
                                if (releasedEntity) {
                                    releasedEntity.hidden = false;
                                    releasedEntity.containerId = null;
                                    
                                    // Размещаем элемент рядом с контейнером
                                    const angle = Math.random() * Math.PI * 2;
                                    const distance = entity.size + 25;
                                    releasedEntity.x = entity.x + Math.cos(angle) * distance;
                                    releasedEntity.y = entity.y + Math.sin(angle) * distance;
                                    
                                    // Убедимся, что элемент не выходит за границы
                                    releasedEntity.x = Math.max(15, Math.min(785, releasedEntity.x));
                                    releasedEntity.y = Math.max(15, Math.min(385, releasedEntity.y));
                                    
                                    // Задаем начальную скорость от контейнера
                                    releasedEntity.vx = Math.cos(angle) * 1.0;
                                    releasedEntity.vy = Math.sin(angle) * 1.0;
                                    
                                    toAdd.push(releasedEntity);
                                }
                                entity.releaseTimer = 0;
                            }
                        } else {
                            // Если не безопасно, сбрасываем таймер
                            entity.releaseTimer = Math.max(0, entity.releaseTimer - 5);
                        }
                    }
                    
                    // Медленное случайное движение
                    if (Math.random() < 0.005) {
                        entity.vx = (Math.random() - 0.5) * 0.5;
                        entity.vy = (Math.random() - 0.5) * 0.5;
                    }
                    break;
            }

            // Обновляем позицию (только для видимых сущностей)
            if (!entity.hidden) {
                entity.x += entity.vx * entity.speed;
                entity.y += entity.vy * entity.speed;

                // Отскок от границ
                if (entity.x <= 0 || entity.x >= 800 - entity.size) {
                    entity.vx *= -1;
                    entity.x = Math.max(0, Math.min(800 - entity.size, entity.x));
                }
                if (entity.y <= 0 || entity.y >= 400 - entity.size) {
                    entity.vy *= -1;
                    entity.y = Math.max(0, Math.min(400 - entity.size, entity.y));
                }
            }

            // Обновляем возраст
            entity.age++;

            // Логика для корзин - поглощение
            if (entity.type === ENTITY_TYPES.BASKET) {
                newEntities.forEach(other => {
                    if (other.id !== entity.id && 
                        (other.type === ENTITY_TYPES.PIXEL || other.type === ENTITY_TYPES.BUTTON) &&
                        !other.hidden &&
                        getDistance(entity, other) < entity.size + other.size) {
                        toRemove.add(other.id);
                        entity.collected++;
                    }
                });
            }

            // Логика для кнопок - копирование
            if (entity.type === ENTITY_TYPES.BUTTON && entity.cooldown <= 0 && !entity.hidden) {
                const nearbyPixels = newEntities.filter(other => 
                    other.type === ENTITY_TYPES.PIXEL && 
                    other.id !== entity.id && 
                    !other.hidden &&
                    getDistance(entity, other) < 30
                );

                if (nearbyPixels.length > 0) {
                    const target = nearbyPixels[0];
                    
                    switch (entity.buttonType) {
                        case BUTTON_TYPES.COPY:
                            const newPixel = createEntity(ENTITY_TYPES.PIXEL, 
                                entity.x + (Math.random() - 0.5) * 40, 
                                entity.y + (Math.random() - 0.5) * 40);
                            newPixel.color = target.color;
                            toAdd.push(newPixel);
                            entity.cooldown = 100;
                            break;
                        case BUTTON_TYPES.MOVE:
                            target.vx = (Math.random() - 0.5) * 4;
                            target.vy = (Math.random() - 0.5) * 4;
                            entity.cooldown = 60;
                            break;
                        case BUTTON_TYPES.CREATE:
                            if (Math.random() < 0.1) {
                                toAdd.push(createEntity(ENTITY_TYPES.PIXEL, entity.x, entity.y));
                                entity.cooldown = 150;
                            }
                            break;
                    }
                }
            }

            if (entity.cooldown > 0) {
                entity.cooldown--;
            }

            // Добавляем немного случайности в движение
            if (Math.random() < 0.01 && !entity.hidden) {
                entity.vx += (Math.random() - 0.5) * 0.3;
                entity.vy += (Math.random() - 0.5) * 0.3;
            }
        });

        // Удаляем помеченные сущности
        const filtered = newEntities.filter(entity => !toRemove.has(entity.id));
        
        // Добавляем новые сущности
        entities = [...filtered, ...toAdd];
        
        updateStats();
    }

    // Отрисовка
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Фон
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Рисуем только видимые сущности
        entities.filter(entity => !entity.hidden).forEach(entity => {
            ctx.save();
            ctx.translate(entity.x + entity.size / 2, entity.y + entity.size / 2);

            switch (entity.type) {
                case ENTITY_TYPES.PIXEL:
                    ctx.fillStyle = entity.color;
                    ctx.fillRect(-entity.size / 2, -entity.size / 2, entity.size, entity.size);
                    break;
                
                case ENTITY_TYPES.BUTTON:
                    ctx.strokeStyle = '#4CAF50';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(-entity.size / 2, -entity.size / 2, entity.size, entity.size);
                    
                    ctx.fillStyle = '#4CAF50';
                    ctx.font = '8px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    const buttonText = entity.buttonType === BUTTON_TYPES.COPY ? 'C' :
                                    entity.buttonType === BUTTON_TYPES.MOVE ? 'M' :
                                    entity.buttonType === BUTTON_TYPES.CREATE ? '+' : 'D';
                    ctx.fillText(buttonText, 0, 0);
                    break;
                
                case ENTITY_TYPES.BASKET:
                    ctx.strokeStyle = '#FF9800';
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.arc(0, 0, entity.size / 2, 0, Math.PI * 2);
                    ctx.stroke();
                    
                    ctx.fillStyle = '#FF9800';
                    ctx.fillRect(-entity.size / 4, -2, (entity.size / 2) * (entity.collected / entity.capacity), 4);
                    break;
                
                case ENTITY_TYPES.CONTAINER:
                    ctx.strokeStyle = '#2196F3';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(-entity.size / 2, -entity.size / 2, entity.size, entity.size);
                    
                    ctx.fillStyle = 'rgba(33, 150, 243, 0.2)';
                    ctx.fillRect(-entity.size / 2 + 2, -entity.size / 2 + 2, entity.size - 4, entity.size - 4);
                    
                    // Показываем количество скрытых элементов
                    if (entity.stored.length > 0) {
                        ctx.fillStyle = '#2196F3';
                        ctx.font = '10px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(entity.stored.length.toString(), 0, 0);
                    }
                    
                    // Радиус безопасности
                    ctx.strokeStyle = 'rgba(33, 150, 243, 0.1)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(0, 0, entity.safeRadius, 0, Math.PI * 2);
                    ctx.stroke();
                    break;
            }

            ctx.restore();
        });

        // Рисуем контекстное меню
        if (contextMenu.visible) {
            drawContextMenu();
        }
    }

    // Отрисовка кругового меню
    function drawContextMenu() {
        const { x, y, type } = contextMenu;
        const radius = 60;
        const items = type === 'add' 
            ? [
                { type: ENTITY_TYPES.PIXEL, color: '#9C27B0', icon: '■' },
                { type: ENTITY_TYPES.BUTTON, color: '#4CAF50', icon: 'B' },
                { type: ENTITY_TYPES.BASKET, color: '#FF9800', icon: '○' },
                { type: ENTITY_TYPES.CONTAINER, color: '#2196F3', icon: '□' }
              ]
            : [
                { type: ENTITY_TYPES.PIXEL, color: '#9C27B0', icon: '■' },
                { type: ENTITY_TYPES.BUTTON, color: '#4CAF50', icon: 'B' },
                { type: ENTITY_TYPES.BASKET, color: '#FF9800', icon: '○' },
                { type: ENTITY_TYPES.CONTAINER, color: '#2196F3', icon: '□' }
              ];

        // Фон меню
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.beginPath();
        ctx.arc(x, y, radius + 10, 0, Math.PI * 2);
        ctx.fill();

        // Элементы меню
        items.forEach((item, index) => {
            const angle = (index / items.length) * Math.PI * 2 - Math.PI / 2;
            const itemX = x + Math.cos(angle) * radius;
            const itemY = y + Math.sin(angle) * radius;

            // Кружок элемента
            ctx.fillStyle = item.color;
            ctx.beginPath();
            ctx.arc(itemX, itemY, 20, 0, Math.PI * 2);
            ctx.fill();

            // Иконка
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(item.icon, itemX, itemY);
        });

        // Центральная кнопка
        ctx.fillStyle = type === 'add' ? '#4CAF50' : '#F44336';
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(type === 'add' ? '+' : '×', x, y);
    }

    // Обработка клика по меню
    function handleMenuClick(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        const clickX = clientX - rect.left;
        const clickY = clientY - rect.top;
        
        const { x, y, type } = contextMenu;
        const distance = Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2);
        
        if (distance > 80) {
            contextMenu = { visible: false, x: 0, y: 0, type: 'add' };
            draw();
            return;
        }

        // Определяем, на какой элемент кликнули
        const items = [ENTITY_TYPES.PIXEL, ENTITY_TYPES.BUTTON, ENTITY_TYPES.BASKET, ENTITY_TYPES.CONTAINER];
        const angle = Math.atan2(clickY - y, clickX - x) + Math.PI / 2;
        const normalizedAngle = angle < 0 ? angle + Math.PI * 2 : angle;
        const itemIndex = Math.floor((normalizedAngle / (Math.PI * 2)) * items.length);
        
        if (distance > 20 && distance < 80) {
            if (type === 'add') {
                addEntityAt(items[itemIndex], x, y);
            } else {
                removeRandomEntity(items[itemIndex]);
            }
        }
        
        contextMenu = { visible: false, x: 0, y: 0, type: 'add' };
        draw();
    }

    // Добавление элемента в определенной позиции
    function addEntityAt(type, x, y) {
        // Проверка контейнеров размещения
        if (type === ENTITY_TYPES.CONTAINER) {
            const tempEntity = createEntity(type, x - 10, y - 10);
            
            if (canPlaceContainer(tempEntity.x, tempEntity.y, tempEntity.size)) {
                entities.push(tempEntity);
            } else {
                // В случае неудачи ищем другую позицию.
                let placed = false;
                for (let radius = 40; radius <= 100 && !placed; radius += 20) {
                    for (let angle = 0; angle < Math.PI * 2 && !placed; angle += Math.PI / 4) {
                        const newX = x + Math.cos(angle) * radius;
                        const newY = y + Math.sin(angle) * radius;
                        
                        if (newX >= 0 && newX <= 770 && newY >= 0 && newY <= 370 &&
                            canPlaceContainer(newX, newY, tempEntity.size)) {
                            tempEntity.x = newX;
                            tempEntity.y = newY;
                            placed = true;
                            entities.push(tempEntity);
                        }
                    }
                }
            }
        } else if (type === ENTITY_TYPES.BASKET) {
            // Проверка корзин 
            const tempEntity = createEntity(type, x - 10, y - 10);
            
            if (canPlaceBasket(tempEntity.x, tempEntity.y, tempEntity.size)) {
                entities.push(tempEntity);
            } else {
                // Если нельзя разместить в этой позиции, ищем ближайшую свободную
                let placed = false;
                for (let radius = 30; radius <= 80 && !placed; radius += 15) {
                    for (let angle = 0; angle < Math.PI * 2 && !placed; angle += Math.PI / 6) {
                        const newX = x + Math.cos(angle) * radius;
                        const newY = y + Math.sin(angle) * radius;
                        
                        if (newX >= 0 && newX <= 780 && newY >= 0 && newY <= 380 &&
                            canPlaceBasket(newX, newY, tempEntity.size)) {
                            tempEntity.x = newX;
                            tempEntity.y = newY;
                            placed = true;
                            entities.push(tempEntity);
                        }
                    }
                }
            }
        } else {
            // Для остальных типов добавляем как обычно
            const newEntity = createEntity(type, x - 10, y - 10);
            entities.push(newEntity);
        }
        
        updateStats();
        draw();
    }

    // Удаление случайного элемента определенного типа
    function removeRandomEntity(type) {
        const entitiesOfType = entities.filter(e => e.type === type && !e.hidden);
        if (entitiesOfType.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * entitiesOfType.length);
        const entityToRemove = entitiesOfType[randomIndex];
        
        entities = entities.filter(e => e.id !== entityToRemove.id);
        updateStats();
        draw();
    }

    // Обработчики мыши для канваса
    function handleCanvasMouseDown(e) {
        e.preventDefault();
        const isRightClick = e.button === 2;
        
        mouseDown = {
            left: !isRightClick,
            right: isRightClick,
            startTime: Date.now()
        };
    }

    function handleCanvasMouseUp(e) {
        const holdTime = Date.now() - mouseDown.startTime;
        
        if (holdTime > 200) { // Долгое нажатие
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            contextMenu = {
                visible: true,
                x,
                y,
                type: mouseDown.right ? 'remove' : 'add'
            };
            draw();
        }
        
        mouseDown = { left: false, right: false, startTime: 0 };
    }

    function handleCanvasClick(e) {
        if (contextMenu.visible) {
            handleMenuClick(e.clientX, e.clientY);
        }
    }

    // Игровой цикл
    let gameLoop;
    function startGameLoop() {
        if (gameLoop) clearInterval(gameLoop);
        gameLoop = setInterval(() => {
            updateEntities();
            draw();
        }, 50);
    }

    function stopGameLoop() {
        if (gameLoop) clearInterval(gameLoop);
        gameLoop = null;
    }

    // Добавление обычных кнопок
    function addEntity(type) {
        if (type === ENTITY_TYPES.CONTAINER) {
            // Для контейнеров ищем свободное место
            let attempts = 0;
            const maxAttempts = 50;
            
            while (attempts < maxAttempts) {
                const newEntity = createEntity(type);
                if (canPlaceContainer(newEntity.x, newEntity.y, newEntity.size)) {
                    entities.push(newEntity);
                    updateStats();
                    draw();
                    return;
                }
                attempts++;
            }
        } else if (type === ENTITY_TYPES.BASKET) {
            // Для корзин ищем свободное место
            let attempts = 0;
            const maxAttempts = 50;
            
            while (attempts < maxAttempts) {
                const newEntity = createEntity(type);
                if (canPlaceBasket(newEntity.x, newEntity.y, newEntity.size)) {
                    entities.push(newEntity);
                    updateStats();
                    draw();
                    return;
                }
                attempts++;
            }
        } else {
            // Для остальных типов добавляем как обычно
            const newEntity = createEntity(type);
            entities.push(newEntity);
            updateStats();
            draw();
        }
    }

    // Смена совета
    function nextTip() {
        currentTip = (currentTip + 1) % tips.length;
        currentTipElement.textContent = tips[currentTip];
        tipCounterElement.textContent = currentTip + 1;
    }

    // Обработчики событий
    toggleGameBtn.addEventListener('click', () => {
        isRunning = !isRunning;
        if (isRunning) {
            startGameLoop();
            toggleGameBtn.textContent = 'Пауза';
            toggleGameBtn.classList.remove('btn-start');
            toggleGameBtn.classList.add('btn-pause');
        } else {
            stopGameLoop();
            toggleGameBtn.textContent = 'Старт';
            toggleGameBtn.classList.remove('btn-pause');
            toggleGameBtn.classList.add('btn-start');
        }
    });

    resetGameBtn.addEventListener('click', () => {
        stopGameLoop();
        isRunning = false;
        toggleGameBtn.textContent = 'Старт';
        toggleGameBtn.classList.remove('bg-red-500', 'hover:bg-red-600');
        toggleGameBtn.classList.add('bg-green-500', 'hover:bg-green-600');
        initializeEcosystem();
    });

    addPixelBtn.addEventListener('click', () => addEntity(ENTITY_TYPES.PIXEL));
    addButtonBtn.addEventListener('click', () => addEntity(ENTITY_TYPES.BUTTON));
    addBasketBtn.addEventListener('click', () => addEntity(ENTITY_TYPES.BASKET));
    addContainerBtn.addEventListener('click', () => addEntity(ENTITY_TYPES.CONTAINER));

    tipContainer.addEventListener('click', nextTip);

    canvas.addEventListener('mousedown', handleCanvasMouseDown);
    canvas.addEventListener('mouseup', handleCanvasMouseUp);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    // Инициализация игры
    initializeEcosystem();

    document.getElementById('tip-container').addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Блокировка выделения текста при клике
    document.getElementById('tip-container').addEventListener('mousedown', function(e) {
        if (e.detail > 1) { // Блокировка двойного клика
            e.preventDefault();
        }
    });

});