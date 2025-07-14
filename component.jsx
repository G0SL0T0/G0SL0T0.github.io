import React, { useState, useEffect, useRef } from 'react';

const PixelEcosystem = () => {
  const canvasRef = useRef(null);
  const [entities, setEntities] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({ pixels: 0, buttons: 0, baskets: 0, containers: 0 });
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, type: 'add' });
  const [mouseDown, setMouseDown] = useState({ left: false, right: false, startTime: 0 });
  const [currentTip, setCurrentTip] = useState(0);

  // Типы сущностей
  const ENTITY_TYPES = {
    PIXEL: 'pixel',
    BUTTON: 'button',
    BASKET: 'basket',
    CONTAINER: 'container'
  };

  // Типы кнопок
  const BUTTON_TYPES = {
    COPY: 'copy',
    MOVE: 'move',
    DELETE: 'delete',
    CREATE: 'create'
  };

  // Создание новой сущности
  const createEntity = (type, x, y, buttonType = null) => {
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
  };

  // Инициализация экосистемы
  const initializeEcosystem = () => {
    const newEntities = [];
    
    // Создаем начальные сущности
    for (let i = 0; i < 40; i++) {
      newEntities.push(createEntity(ENTITY_TYPES.PIXEL));
    }
    for (let i = 0; i < 15; i++) {
      newEntities.push(createEntity(ENTITY_TYPES.BUTTON));
    }
    for (let i = 0; i < 4; i++) {
      newEntities.push(createEntity(ENTITY_TYPES.BASKET));
    }
    for (let i = 0; i < 3; i++) {
      newEntities.push(createEntity(ENTITY_TYPES.CONTAINER));
    }
    
    setEntities(newEntities);
  };

  // Обновление статистики (включая скрытые элементы)
  const updateStats = (entities) => {
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
          // Добавляем скрытые элементы в контейнере
          entity.stored.forEach(stored => {
            if (stored.type === ENTITY_TYPES.PIXEL) totalPixels++;
            if (stored.type === ENTITY_TYPES.BUTTON) totalButtons++;
          });
          break;
      }
    });

    setStats({
      pixels: totalPixels,
      buttons: totalButtons,
      baskets: totalBaskets,
      containers: totalContainers
    });
  };

  // Функция расстояния между сущностями
  const getDistance = (entity1, entity2) => {
    const dx = entity1.x - entity2.x;
    const dy = entity1.y - entity2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Поиск ближайшего элемента определенного типа
  const findNearestEntity = (entity, entities, targetType, excludeHidden = true) => {
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
  };

  // Движение к цели
  const moveTowards = (entity, target, speed = 1) => {
    const dx = target.x - entity.x;
    const dy = target.y - entity.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      entity.vx = (dx / distance) * speed;
      entity.vy = (dy / distance) * speed;
    }
  };

  // Движение от цели (убегание)
  const moveAway = (entity, target, speed = 1) => {
    const dx = entity.x - target.x;
    const dy = entity.y - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      entity.vx = (dx / distance) * speed;
      entity.vy = (dy / distance) * speed;
    }
  };

  // Проверка безопасности зоны (нет корзин рядом)
  const isAreaSafe = (x, y, entities, radius = 100) => {
    return !entities.some(entity => 
      entity.type === ENTITY_TYPES.BASKET && 
      !entity.hidden &&
      Math.sqrt((entity.x - x) ** 2 + (entity.y - y) ** 2) < radius
    );
  };

  // Проверка пути к контейнеру на наличие корзин
  const isPathSafeToContainer = (entity, container, entities) => {
    const dx = container.x - entity.x;
    const dy = container.y - entity.y;
    const pathDistance = Math.sqrt(dx * dx + dy * dy);
    
    // Проверяем точки вдоль пути
    const steps = Math.ceil(pathDistance / 20); // Проверяем каждые 20 пикселей
    
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
  };

  // Проверка на перекрытие с другими контейнерами
  const canPlaceContainer = (x, y, size, entities) => {
    return !entities.some(entity => 
      entity.type === ENTITY_TYPES.CONTAINER &&
      Math.sqrt((entity.x - x) ** 2 + (entity.y - y) ** 2) < size + entity.size
    );
  };

  // Проверка на перекрытие с другими корзинами
  const canPlaceBasket = (x, y, size, entities) => {
    return !entities.some(entity => 
      entity.type === ENTITY_TYPES.BASKET &&
      Math.sqrt((entity.x - x) ** 2 + (entity.y - y) ** 2) < size + entity.size + 10
    );
  };

  // Логика взаимодействий
  const updateEntities = (entities) => {
    const newEntities = [...entities];
    const toRemove = new Set();
    const toAdd = [];

    newEntities.forEach((entity, index) => {
      if (toRemove.has(entity.id) || entity.hidden) return;

      // Логика поведения для каждого типа
      switch (entity.type) {
        case ENTITY_TYPES.PIXEL:
        case ENTITY_TYPES.BUTTON:
          // Проверяем близость к корзинам
          const nearestBasket = findNearestEntity(entity, newEntities, ENTITY_TYPES.BASKET);
          const isInDanger = nearestBasket && getDistance(entity, nearestBasket) < 100;
          
          if (isInDanger) {
            // Ищем ближайший контейнер для убежища
            const nearestContainer = findNearestEntity(entity, newEntities, ENTITY_TYPES.CONTAINER);
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
                if (isPathSafeToContainer(entity, nearestContainer, newEntities)) {
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
                    if (isPathSafeToContainer(entity, altContainer, newEntities)) {
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
              const nearestPixel = findNearestEntity(entity, newEntities, ENTITY_TYPES.PIXEL);
              if (nearestPixel && entity.cooldown <= 0) {
                moveTowards(entity, nearestPixel, 0.8);
              }
            }
          }
          break;

        case ENTITY_TYPES.BASKET:
          // Корзины боятся контейнеров и убегают от них
          const nearestContainer = findNearestEntity(entity, newEntities, ENTITY_TYPES.CONTAINER);
          const nearestBasketThreat = findNearestEntity(entity, newEntities, ENTITY_TYPES.BASKET);
          
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
            // Корзины охотятся за видимыми пикселями и кнопками только если не убегают
            const targetPixel = findNearestEntity(entity, newEntities, ENTITY_TYPES.PIXEL);
            const targetButton = findNearestEntity(entity, newEntities, ENTITY_TYPES.BUTTON);
            
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
            const isSafe = isAreaSafe(entity.x, entity.y, newEntities);
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
                  
                  // Размещаем элемент рядом с контейнером, но на безопасном расстоянии
                  const angle = Math.random() * Math.PI * 2;
                  const distance = entity.size + 25; // Немного дальше от контейнера
                  releasedEntity.x = entity.x + Math.cos(angle) * distance;
                  releasedEntity.y = entity.y + Math.sin(angle) * distance;
                  
                  // Убедимся, что элемент не выходит за границы канваса
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
              // Если не безопасно, сбрасываем таймер, но не полностью
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

      // Логика для корзин - поглощение (только видимых элементов)
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
    const result = [...filtered, ...toAdd];
    
    updateStats(result);
    return result;
  };

  // Отрисовка
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
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
          
          // Радиус безопасности (слабо видимый)
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
      drawContextMenu(ctx);
    }
  };

  // Отрисовка кругового меню
  const drawContextMenu = (ctx) => {
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
  };

  // Обработка клика по меню
  const handleMenuClick = (clientX, clientY) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const clickY = clientY - rect.top;
    
    const { x, y, type } = contextMenu;
    const distance = Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2);
    
    if (distance > 80) {
      setContextMenu({ visible: false, x: 0, y: 0, type: 'add' });
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
    
    setContextMenu({ visible: false, x: 0, y: 0, type: 'add' });
  };

  // Добавление элемента в определенной позиции
  const addEntityAt = (type, x, y) => {
    // Для контейнеров проверяем, можно ли их разместить
    if (type === ENTITY_TYPES.CONTAINER) {
      const tempEntity = createEntity(type, x - 10, y - 10);
      
      setEntities(prev => {
        if (canPlaceContainer(tempEntity.x, tempEntity.y, tempEntity.size, prev)) {
          return [...prev, tempEntity];
        } else {
          // Если нельзя разместить в этой позиции, ищем ближайшую свободную
          let placed = false;
          for (let radius = 40; radius <= 100 && !placed; radius += 20) {
            for (let angle = 0; angle < Math.PI * 2 && !placed; angle += Math.PI / 4) {
              const newX = x + Math.cos(angle) * radius;
              const newY = y + Math.sin(angle) * radius;
              
              if (newX >= 0 && newX <= 770 && newY >= 0 && newY <= 370 &&
                  canPlaceContainer(newX, newY, tempEntity.size, prev)) {
                tempEntity.x = newX;
                tempEntity.y = newY;
                placed = true;
                return [...prev, tempEntity];
              }
            }
          }
          // Если так и не нашли место, не добавляем контейнер
          return prev;
        }
      });
    } else if (type === ENTITY_TYPES.BASKET) {
      // Для корзин проверяем, можно ли их разместить
      const tempEntity = createEntity(type, x - 10, y - 10);
      
      setEntities(prev => {
        if (canPlaceBasket(tempEntity.x, tempEntity.y, tempEntity.size, prev)) {
          return [...prev, tempEntity];
        } else {
          // Если нельзя разместить в этой позиции, ищем ближайшую свободную
          let placed = false;
          for (let radius = 30; radius <= 80 && !placed; radius += 15) {
            for (let angle = 0; angle < Math.PI * 2 && !placed; angle += Math.PI / 6) {
              const newX = x + Math.cos(angle) * radius;
              const newY = y + Math.sin(angle) * radius;
              
              if (newX >= 0 && newX <= 780 && newY >= 0 && newY <= 380 &&
                  canPlaceBasket(newX, newY, tempEntity.size, prev)) {
                tempEntity.x = newX;
                tempEntity.y = newY;
                placed = true;
                return [...prev, tempEntity];
              }
            }
          }
          // Если так и не нашли место, не добавляем корзину
          return prev;
        }
      });
    } else {
      // Для остальных типов добавляем как обычно
      const newEntity = createEntity(type, x - 10, y - 10);
      setEntities(prev => [...prev, newEntity]);
    }
  };

  // Удаление случайного элемента определенного типа
  const removeRandomEntity = (type) => {
    setEntities(prev => {
      const entitiesOfType = prev.filter(e => e.type === type && !e.hidden);
      if (entitiesOfType.length === 0) return prev;
      
      const randomIndex = Math.floor(Math.random() * entitiesOfType.length);
      const entityToRemove = entitiesOfType[randomIndex];
      
      return prev.filter(e => e.id !== entityToRemove.id);
    });
  };

  // Обработчики мыши для канваса
  const handleCanvasMouseDown = (e) => {
    e.preventDefault();
    const isRightClick = e.button === 2;
    
    setMouseDown({
      left: !isRightClick,
      right: isRightClick,
      startTime: Date.now()
    });
  };

  const handleCanvasMouseUp = (e) => {
    const holdTime = Date.now() - mouseDown.startTime;
    
    if (holdTime > 200) { // Долгое нажатие
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setContextMenu({
        visible: true,
        x,
        y,
        type: mouseDown.right ? 'remove' : 'add'
      });
    }
    
    setMouseDown({ left: false, right: false, startTime: 0 });
  };

  const handleCanvasClick = (e) => {
    if (contextMenu.visible) {
      handleMenuClick(e.clientX, e.clientY);
    }
  };

  // Игровой цикл
  useEffect(() => {
    if (!isRunning) return;

    const gameLoop = setInterval(() => {
      setEntities(prevEntities => updateEntities(prevEntities));
    }, 50);

    return () => clearInterval(gameLoop);
  }, [isRunning]);

  // Отрисовка
  useEffect(() => {
    draw();
  }, [entities, contextMenu]);

  // Инициализация при загрузке
  useEffect(() => {
    initializeEcosystem();
  }, []);

  // Советы для пользователей
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

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  // Добавление обычных кнопок
  const addEntity = (type) => {
    if (type === ENTITY_TYPES.CONTAINER) {
      // Для контейнеров ищем свободное место
      let attempts = 0;
      const maxAttempts = 50;
      
      setEntities(prev => {
        while (attempts < maxAttempts) {
          const newEntity = createEntity(type);
          if (canPlaceContainer(newEntity.x, newEntity.y, newEntity.size, prev)) {
            return [...prev, newEntity];
          }
          attempts++;
        }
        // Если не нашли место за 50 попыток, не добавляем
        return prev;
      });
    } else if (type === ENTITY_TYPES.BASKET) {
      // Для корзин ищем свободное место
      let attempts = 0;
      const maxAttempts = 50;
      
      setEntities(prev => {
        while (attempts < maxAttempts) {
          const newEntity = createEntity(type);
          if (canPlaceBasket(newEntity.x, newEntity.y, newEntity.size, prev)) {
            return [...prev, newEntity];
          }
          attempts++;
        }
        // Если не нашли место за 50 попыток, не добавляем
        return prev;
      });
    } else {
      // Для остальных типов добавляем как обычно
      const newEntity = createEntity(type);
      setEntities(prev => [...prev, newEntity]);
    }
  };

  return (
    <div className="w-full h-full bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-white mb-2">Пиксельная Экосистема</h1>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-4 py-2 rounded font-medium ${
                isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {isRunning ? 'Пауза' : 'Старт'}
            </button>
            <button
              onClick={initializeEcosystem}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium"
            >
              Сброс
            </button>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">Быстрое добавление:</h3>
            <div className="flex gap-2">
              <button
                onClick={() => addEntity(ENTITY_TYPES.PIXEL)}
                className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm"
              >
                + Пиксель
              </button>
              <button
                onClick={() => addEntity(ENTITY_TYPES.BUTTON)}
                className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
              >
                + Кнопка
              </button>
              <button
                onClick={() => addEntity(ENTITY_TYPES.BASKET)}
                className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm"
              >
                + Корзина
              </button>
              <button
                onClick={() => addEntity(ENTITY_TYPES.CONTAINER)}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
              >
                + Контейнер
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-4 gap-4 text-white text-sm">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-400"></div>
                <span>Пиксели: {stats.pixels}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-green-400"></div>
                <span>Кнопки: {stats.buttons}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-orange-400 rounded-full"></div>
                <span>Корзины: {stats.baskets}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-blue-400"></div>
                <span>Контейнеры: {stats.containers}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="border border-gray-600 rounded bg-gray-900 cursor-crosshair"
            onMouseDown={handleCanvasMouseDown}
            onMouseUp={handleCanvasMouseUp}
            onClick={handleCanvasClick}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>

        <div className="mt-4 text-sm text-gray-300">
          <p><strong>Правила экосистемы:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>🟣 <strong>Пиксели</strong> - прячутся в контейнерах при опасности</li>
            <li>🟩 <strong>Кнопки</strong> - копируют пиксели, ищут убежище в контейнерах</li>
            <li>🟠 <strong>Корзины</strong> - охотятся за элементами, но боятся контейнеров</li>
            <li>🟦 <strong>Контейнеры</strong> - отпугивают корзины и медленно выпускают элементы</li>
            <li>📱 <strong>Управление</strong> - зажмите ЛКМ для добавления, ПКМ для удаления</li>
          </ul>
          <p className="mt-2 text-xs text-gray-400">
            <strong>Совет:</strong> Элементы полностью исчезают в контейнерах и появляются только когда корзин нет рядом!
          </p>
        </div>

        <div className="mt-4 bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">💡 Советы</h3>
          <div 
            className="bg-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-600 transition-colors"
            onClick={nextTip}
          >
            <p className="text-gray-200 text-sm leading-relaxed">
              {tips[currentTip]}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              💡 Кликните для следующего совета ({currentTip + 1}/{tips.length})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelEcosystem;