// src/components/PixelEcosystem.tsx
'use client';
import { useEffect, useRef, useState } from 'react';

export default function PixelEcosystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({ pixels: 0, buttons: 0, baskets: 0, containers: 0 });
  const [particles, setParticles] = useState<any[]>([]);
  const [trails, setTrails] = useState<any[]>([]);
  const [performance, setPerformance] = useState<'high' | 'medium' | 'low'>('high');
  
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
  
  // Состояние для хранения сущностей
  const [entities, setEntities] = useState<any[]>([]);
  
  // Режим отладки для визуализации хитбоксов
  const DEBUG_HITBOXES = false;
  
  // Создание новой сущности
  const createEntity = (type: string, x?: number, y?: number, buttonType?: string) => {
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
          speed: 0.5 + Math.random() * 0.5, // 0.5-1.0
          evolved: false,
          panicMode: false,
          targetContainer: null
        };
      case ENTITY_TYPES.BUTTON:
        return {
          ...baseEntity,
          buttonType: buttonType || Object.values(BUTTON_TYPES)[Math.floor(Math.random() * 4)],
          size: 12,
          speed: 0.5 + Math.random() * 0.3, // 0.5-0.8
          cooldown: 0,
          powerLevel: 1,
          copyEffect: 0,
          panicMode: false,
          targetContainer: null
        };
      case ENTITY_TYPES.BASKET:
        return {
          ...baseEntity,
          size: 20,
          speed: 0.6 + Math.random() * 0.1, // 0.6-0.7 (чуть быстрее пикселей)
          capacity: 10,
          collected: 0,
          level: 1,
          experience: 0,
          levelUpEffect: 0,
          targetPrey: null,
          huntingGroup: [],
          avoidanceMode: false,
          targetContainer: null,
          avoidanceDistance: 250, // Увеличенное расстояние избегания
          ignoreDistance: 200, // Расстояние, на котором корзина игнорирует контейнер
          interceptionMode: false // Режим перехвата пути к контейнеру
        };
      case ENTITY_TYPES.CONTAINER:
        return {
          ...baseEntity,
          size: 30,
          speed: 0.1 + Math.random() * 0.2,
          stored: [],
          safeRadius: 60, // Увеличен радиус безопасности
          releaseTimer: 0,
          shieldEnergy: 100,
          shelterMode: false,
          shelterTimer: 0,
          absorptionRadius: 25, // Уменьшен радиус поглощения (сущности должны сами решать войти)
          releaseRate: 0.02 // Шанс выпуска сущности в каждом кадре
        };
      default:
        return baseEntity;
    }
  };
  
  // Функция для добавления конкретного типа сущности
  const addSpecificEntity = (type: string) => {
    setEntities(prev => [...prev, createEntity(type)]);
    playSound(400, 50);
  };
  
  // Функция для создания частиц
  const createParticles = (x: number, y: number, color: string, count: number) => {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 3 + 1,
        color,
        life: Math.random() * 30 + 20
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };
  
  // Функция для воспроизведения звуков
  const playSound = (frequency: number, duration: number) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gainNode.gain.value = 0.02; // Тихий звук
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration / 1000);
    } catch (e) {
      console.error("Ошибка воспроизведения звука:", e);
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
    updateStats(newEntities);
    setIsRunning(false);
  };
  
  // Обновление статистики
  const updateStats = (entities: any[]) => {
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
          if (entity.stored) {
            entity.stored.forEach((stored: any) => {
              if (stored.type === ENTITY_TYPES.PIXEL) totalPixels++;
              if (stored.type === ENTITY_TYPES.BUTTON) totalButtons++;
            });
          }
          break;
      }
    });
    
    setStats({
      pixels: totalPixels,
      buttons: totalButtons,
      baskets: totalBaskets,
      containers: totalContainers
    });
    
    // Обновление показателя производительности
    const totalEntities = totalPixels + totalButtons + totalBaskets + totalContainers;
    if (totalEntities > 150) {
      setPerformance('low');
    } else if (totalEntities > 100) {
      setPerformance('medium');
    } else {
      setPerformance('high');
    }
  };
  
  // Функция расстояния между сущностями
  const getDistance = (entity1: any, entity2: any) => {
    const dx = entity1.x - entity2.x;
    const dy = entity1.y - entity2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  // Поиск ближайшего элемента определенного типа
  const findNearestEntity = (entity: any, entities: any[], targetType: string, excludeHidden = true) => {
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
  const moveTowards = (entity: any, target: any, speed = 1) => {
    const dx = target.x - entity.x;
    const dy = target.y - entity.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      entity.vx = (dx / distance) * speed;
      entity.vy = (dy / distance) * speed;
    }
  };
  
  // Движение от цели (убегание)
  const moveAway = (entity: any, target: any, speed = 1) => {
    const dx = entity.x - target.x;
    const dy = entity.y - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      entity.vx = (dx / distance) * speed;
      entity.vy = (dy / distance) * speed;
    }
  };
  
  // Проверка безопасности зоны (нет корзин рядом)
  const isAreaSafe = (x: number, y: number, entities: any[], radius = 100) => {
    return !entities.some(entity => 
      entity.type === ENTITY_TYPES.BASKET && 
      !entity.hidden &&
      Math.sqrt((entity.x - x) ** 2 + (entity.y - y) ** 2) < radius
    );
  };
  
  // Обновление сущностей
  const updateEntities = (entities: any[]) => {
    const newEntities = [...entities];
    const toRemove = new Set();
    const toAdd: any[] = [];
    
    // Создание следов движения
    const newTrails = [...trails];
    
    // Формирование охотничьих групп для корзин
    const baskets = newEntities.filter(e => e.type === ENTITY_TYPES.BASKET && !e.hidden);
    baskets.forEach(basket => {
      basket.huntingGroup = [];
    });
    
    // Группируем корзины для охоты
    for (let i = 0; i < baskets.length; i++) {
      for (let j = i + 1; j < baskets.length; j++) {
        const distance = getDistance(baskets[i], baskets[j]);
        if (distance < 150) { // Если корзины близко друг к другу
          baskets[i].huntingGroup.push(baskets[j]);
          baskets[j].huntingGroup.push(baskets[i]);
        }
      }
    }
    
    newEntities.forEach((entity, index) => {
      if (toRemove.has(entity.id) || entity.hidden) return;
      
      // Создание следов движения
      if (!entity.hidden && (Math.abs(entity.vx) > 0.5 || Math.abs(entity.vy) > 0.5)) {
        newTrails.push({
          x: entity.x + entity.size/2,
          y: entity.y + entity.size/2,
          size: entity.size / 3,
          color: entity.type === ENTITY_TYPES.PIXEL ? entity.color : 
                 entity.type === ENTITY_TYPES.BUTTON ? '#4CAF50' :
                 entity.type === ENTITY_TYPES.BASKET ? '#FF9800' : '#2196F3',
          life: 20
        });
      }
      
      // Логика поведения для каждого типа
      switch (entity.type) {
        case ENTITY_TYPES.PIXEL:
          // Эволюция пикселей
          if (entity.age > 500 && entity.energy > 80 && !entity.evolved) {
            if (Math.random() < 0.001) {
              entity.evolved = true;
              entity.size = 6;
              entity.speed = 1.2;
              entity.color = `hsl(${(parseInt(entity.color.split('(')[1].split(',')[0]) + 180) % 360}, 70%, 60%)`;
              createParticles(entity.x + entity.size/2, entity.y + entity.size/2, entity.color, 15);
              playSound(600, 200);
            }
          }
          
          // Проверяем близость к корзинам
          const nearestBasket = findNearestEntity(entity, newEntities, ENTITY_TYPES.BASKET);
          const isInDanger = nearestBasket && getDistance(entity, nearestBasket) < 100;
          
          if (isInDanger) {
            // Активируем панический режим
            entity.panicMode = true;
            
            // Ищем ближайший контейнер для убежища
            const nearestContainer = findNearestEntity(entity, newEntities, ENTITY_TYPES.CONTAINER);
            if (nearestContainer) {
              entity.targetContainer = nearestContainer;
              const distanceToContainer = getDistance(entity, nearestContainer);
              
              // Если достаточно близко к контейнеру, прячемся в него
              if (distanceToContainer < nearestContainer.absorptionRadius) {
                entity.hidden = true;
                entity.containerId = nearestContainer.id;
                nearestContainer.stored.push({...entity});
                toRemove.add(entity.id);
                createParticles(entity.x + entity.size/2, entity.y + entity.size/2, entity.color || '#ffffff', 5);
              } else {
                // Активно движемся к контейнеру
                moveTowards(entity, nearestContainer, 1.8);
              }
            } else {
              // Нет контейнера, просто убегаем от корзины
              moveAway(entity, nearestBasket, 2.2);
            }
          } else {
            // Выключаем панический режим
            entity.panicMode = false;
            entity.targetContainer = null;
            
            // Обычное поведение - просто летаем по полю
            entity.vx += (Math.random() - 0.5) * 0.5;
            entity.vy += (Math.random() - 0.5) * 0.5;
          }
          break;
          
        case ENTITY_TYPES.BUTTON:
          // Объединение кнопок одного типа
          if (!entity.hidden && entity.powerLevel === 1) {
            const nearbyButtons = newEntities.filter(other => 
              other.type === ENTITY_TYPES.BUTTON && 
              other.id !== entity.id && 
              !other.hidden &&
              other.buttonType === entity.buttonType &&
              other.powerLevel === 1 &&
              getDistance(entity, other) < 40
            );
            
            if (nearbyButtons.length > 0 && Math.random() < 0.005) {
              // Объединяем кнопки
              entity.size = 16;
              entity.powerLevel = 2;
              entity.cooldown = 0;
              
              // Удаляем вторую кнопку
              toRemove.add(nearbyButtons[0].id);
              
              // Визуальный эффект объединения
              entity.mergeEffect = 20;
              createParticles(entity.x + entity.size/2, entity.y + entity.size/2, '#4CAF50', 10);
              playSound(500, 150);
            }
          }
          
          // Проверяем близость к корзинам
          const buttonNearestBasket = findNearestEntity(entity, newEntities, ENTITY_TYPES.BASKET);
          const buttonIsInDanger = buttonNearestBasket && getDistance(entity, buttonNearestBasket) < 100;
          
          if (buttonIsInDanger) {
            // Активируем панический режим
            entity.panicMode = true;
            
            // Ищем ближайший контейнер для убежища
            const buttonNearestContainer = findNearestEntity(entity, newEntities, ENTITY_TYPES.CONTAINER);
            if (buttonNearestContainer) {
              entity.targetContainer = buttonNearestContainer;
              const distanceToContainer = getDistance(entity, buttonNearestContainer);
              
              // Если достаточно близко к контейнеру, прячемся в него
              if (distanceToContainer < buttonNearestContainer.absorptionRadius) {
                entity.hidden = true;
                entity.containerId = buttonNearestContainer.id;
                buttonNearestContainer.stored.push({...entity});
                toRemove.add(entity.id);
                createParticles(entity.x + entity.size/2, entity.y + entity.size/2, '#4CAF50', 5);
              } else {
                // Активно движемся к контейнеру
                moveTowards(entity, buttonNearestContainer, 1.8);
              }
            } else {
              // Нет контейнера, просто убегаем от корзины
              moveAway(entity, buttonNearestBasket, 2.2);
            }
          } else {
            // Выключаем панический режим
            entity.panicMode = false;
            entity.targetContainer = null;
            
            // Обычное поведение - просто летаем по полю
            entity.vx += (Math.random() - 0.5) * 0.5;
            entity.vy += (Math.random() - 0.5) * 0.5;
          }
          break;
          
        case ENTITY_TYPES.BASKET:
          // Проверяем наличие контейнеров поблизости
          const nearestContainer = findNearestEntity(entity, newEntities, ENTITY_TYPES.CONTAINER);
          if (nearestContainer) {
            const distanceToContainer = getDistance(entity, nearestContainer);
            
            if (distanceToContainer < entity.ignoreDistance) {
              // Если контейнер достаточно близко, игнорируем его и продолжаем охоту
              entity.avoidanceMode = false;
              entity.targetContainer = null;
            } else if (distanceToContainer < entity.avoidanceDistance) {
              // Если контейнер слишком близко, активно избегаем
              entity.avoidanceMode = true;
              entity.targetContainer = nearestContainer;
              entity.targetPrey = null; // Игнорируем добычу при избегании контейнера
              moveAway(entity, nearestContainer, 2.0); // Увеличиваем скорость убегания
            } else {
              // Если контейнер далеко, не обращаем на него внимания
              entity.avoidanceMode = false;
              entity.targetContainer = null;
            }
          }
          
          // Если не в режиме избегания, охотимся за добычей
          if (!entity.avoidanceMode) {
            // Охотимся за видимыми пикселями и кнопками
            const targetPixel = findNearestEntity(entity, newEntities, ENTITY_TYPES.PIXEL);
            const targetButton = findNearestEntity(entity, newEntities, ENTITY_TYPES.BUTTON);
            
            let huntTarget = null;
            if (targetPixel && targetButton) {
              huntTarget = getDistance(entity, targetPixel) < getDistance(entity, targetButton) ? targetPixel : targetButton;
            } else {
              huntTarget = targetPixel || targetButton;
            }
            
            if (huntTarget) {
              entity.targetPrey = huntTarget;
              
              // Проверяем, не движется ли цель к контейнеру (режим перехвата)
              if (huntTarget.panicMode && huntTarget.targetContainer) {
                entity.interceptionMode = true;
                
                // Рассчитываем точку перехвата между целью и контейнером
                const targetToContainerX = huntTarget.targetContainer.x - huntTarget.x;
                const targetToContainerY = huntTarget.targetContainer.y - huntTarget.y;
                const distanceToContainer = Math.sqrt(targetToContainerX * targetToContainerX + targetToContainerY * targetToContainerY);
                
                // Точка на пути от цели к контейнеру (на 30% пути)
                const interceptionX = huntTarget.x + (targetToContainerX / distanceToContainer) * (distanceToContainer * 0.3);
                const interceptionY = huntTarget.y + (targetToContainerY / distanceToContainer) * (distanceToContainer * 0.3);
                
                // Двигаемся к точке перехвата
                moveTowards(entity, { x: interceptionX, y: interceptionY }, entity.speed * 1.2);
              } else {
                entity.interceptionMode = false;
                
                // Координация с другими корзинами
                if (entity.huntingGroup.length > 0) {
                  // Стратегия окружения
                  const angleToPrey = Math.atan2(huntTarget.y - entity.y, huntTarget.x - entity.x);
                  const distanceToPrey = getDistance(entity, huntTarget);
                  
                  // Определяем позицию в окружении
                  let desiredAngle = angleToPrey;
                  const groupSize = entity.huntingGroup.length + 1;
                  const angleStep = (Math.PI * 2) / groupSize;
                  
                  // Находим свою позицию в группе
                  const groupIndex = entity.huntingGroup.findIndex(b => b.id < entity.id);
                  desiredAngle += angleStep * (groupIndex + 1);
                  
                  // Желаемое расстояние до цели
                  const desiredDistance = 60;
                  
                  // Рассчитываем желаемую позицию
                  const desiredX = huntTarget.x + Math.cos(desiredAngle) * desiredDistance;
                  const desiredY = huntTarget.y + Math.sin(desiredAngle) * desiredDistance;
                  
                  // Двигаемся к желаемой позиции
                  const dx = desiredX - entity.x;
                  const dy = desiredY - entity.y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  
                  if (distance > 0) {
                    entity.vx = (dx / distance) * entity.speed;
                    entity.vy = (dy / distance) * entity.speed;
                  }
                } else {
                  // Если группы нет, просто движемся к цели
                  moveTowards(entity, huntTarget, entity.speed);
                }
              }
            } else {
              entity.targetPrey = null;
              entity.interceptionMode = false;
            }
          }
          break;
          
        case ENTITY_TYPES.CONTAINER:
          // Восстановление щита
          if (entity.shieldEnergy < 100) {
            entity.shieldEnergy += 0.2;
          }
          
          // Активация режима убежища при опасности
          const nearbyBaskets = newEntities.filter(other => 
            other.type === ENTITY_TYPES.BASKET && 
            !other.hidden &&
            getDistance(entity, other) < entity.safeRadius * 1.5
          );
          
          if (nearbyBaskets.length > 0 && !entity.shelterMode && entity.shieldEnergy > 50) {
            entity.shelterMode = true;
            entity.shelterTimer = 100; // Длительность режима убежища
            playSound(700, 300);
          }
          
          // Режим убежища
          if (entity.shelterMode) {
            entity.shelterTimer--;
            
            if (entity.shelterTimer <= 0) {
              entity.shelterMode = false;
            }
            
            // Расход энергии щита
            entity.shieldEnergy -= 0.5;
          }
          
          // Замедление корзин в радиусе действия
          newEntities.forEach(other => {
            if (other.type === ENTITY_TYPES.BASKET && !other.hidden) {
              const distance = getDistance(entity, other);
              if (distance < entity.safeRadius) {
                // Замедление корзины
                other.vx *= 0.9;
                other.vy *= 0.9;
                
                // Расход энергии щита
                entity.shieldEnergy -= 0.2;
              }
            }
          });
          
          // Выпуск сущностей из контейнера (без КД, но с шансом)
          if (entity.stored && entity.stored.length > 0) {
            // Выпускаем сущности с определенным шансом в каждом кадре
            if (Math.random() < entity.releaseRate) {
              const releasedEntity = entity.stored.pop();
              if (releasedEntity) {
                releasedEntity.hidden = false;
                releasedEntity.containerId = null;
                
                // Размещаем элемент рядом с контейнером
                const angle = Math.random() * Math.PI * 2;
                const distance = entity.size + 25;
                releasedEntity.x = entity.x + Math.cos(angle) * distance;
                releasedEntity.y = entity.y + Math.sin(angle) * distance;
                
                // Убедимся, что элемент не выходит за границы канваса
                releasedEntity.x = Math.max(15, Math.min(785, releasedEntity.x));
                releasedEntity.y = Math.max(15, Math.min(385, releasedEntity.y));
                
                // Задаем начальную скорость от контейнера
                releasedEntity.vx = Math.cos(angle) * 1.0;
                releasedEntity.vy = Math.sin(angle) * 1.0;
                
                toAdd.push(releasedEntity);
                createParticles(releasedEntity.x, releasedEntity.y, releasedEntity.color || '#ffffff', 8);
                playSound(350, 100);
              }
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
        
        // Бесконечное поле (как в змейке)
        if (entity.x < -entity.size) {
          entity.x = 800;
        } else if (entity.x > 800) {
          entity.x = -entity.size;
        }
        
        if (entity.y < -entity.size) {
          entity.y = 400;
        } else if (entity.y > 400) {
          entity.y = -entity.size;
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
            entity.experience += 10;
            
            // Повышение уровня
            if (entity.experience >= entity.level * 50) {
              entity.level++;
              entity.experience = 0;
              entity.size += 2;
              entity.speed += 0.05;
              entity.capacity += 2;
              entity.levelUpEffect = 30;
              playSound(800, 300);
            }
            
            // Создаем частицы
            createParticles(
              other.x + other.size/2, 
              other.y + other.size/2, 
              other.color || '#ffffff', 
              10
            );
            playSound(200, 100);
          }
        });
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
    
    // Обновление следов
    const updatedTrails = newTrails
      .map(t => ({
        ...t,
        life: t.life - 1,
        size: t.size * 0.95
      }))
      .filter(t => t.life > 0);
    setTrails(updatedTrails);
    
    // Обновление частиц
    const updatedParticles = particles
      .map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        life: p.life - 1,
        size: p.size * 0.98
      }))
      .filter(p => p.life > 0);
    setParticles(updatedParticles);
    
    // Удаляем помеченные сущности
    const filtered = newEntities.filter(entity => !toRemove.has(entity.id));
    
    // Добавляем новые сущности
    const result = [...filtered, ...toAdd];
    
    updateStats(result);
    return result;
  };
  
  // Отрисовка
  const draw = () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Очистка холста
      ctx.fillStyle = '#0a1128';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Рисуем следы
      trails.forEach(trail => {
        ctx.save();
        ctx.globalAlpha = trail.life / 40;
        ctx.fillStyle = trail.color;
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, trail.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      // Рисуем частицы
      particles.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.life / 50;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      // Рисуем только видимые сущности
      entities.filter(entity => !entity.hidden).forEach(entity => {
        ctx.save();
        ctx.translate(entity.x + entity.size / 2, entity.y + entity.size / 2);
        
        switch (entity.type) {
          case ENTITY_TYPES.PIXEL:
            if (entity.evolved) {
              ctx.save();
              ctx.shadowColor = entity.color;
              ctx.shadowBlur = 10;
              ctx.fillStyle = entity.color;
              ctx.fillRect(-entity.size / 2, -entity.size / 2, entity.size, entity.size);
              ctx.restore();
            } else {
              ctx.fillStyle = entity.color;
              ctx.fillRect(-entity.size / 2, -entity.size / 2, entity.size, entity.size);
            }
            
            // Индикатор паники
            if (entity.panicMode) {
              ctx.save();
              ctx.strokeStyle = '#FF0000';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.arc(0, 0, entity.size, 0, Math.PI * 2);
              ctx.stroke();
              ctx.restore();
            }
            
            // Линия к цели (контейнеру)
            if (entity.targetContainer) {
              ctx.save();
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(
                entity.targetContainer.x - entity.x + entity.size/2,
                entity.targetContainer.y - entity.y + entity.size/2
              );
              ctx.stroke();
              ctx.restore();
            }
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
            
            // Эффект объединения
            if (entity.mergeEffect > 0) {
              ctx.globalAlpha = entity.mergeEffect / 20;
              ctx.fillStyle = '#FFD700';
              ctx.fillRect(-entity.size / 2, -entity.size / 2, entity.size, entity.size);
              entity.mergeEffect--;
            }
            
            // Эффект копирования
            if (entity.copyEffect > 0) {
              ctx.save();
              ctx.globalAlpha = entity.copyEffect / 15;
              ctx.strokeStyle = '#00FFFF';
              ctx.lineWidth = 2;
              
              // Рисуем круги, расходящиеся от центра кнопки
              for (let i = 0; i < 3; i++) {
                const radius = (entity.copyEffect / 15) * (i + 1) * 15;
                ctx.beginPath();
                ctx.arc(0, 0, radius, 0, Math.PI * 2);
                ctx.stroke();
              }
              
              ctx.restore();
              entity.copyEffect--;
            }
            
            // Индикатор уровня силы
            if (entity.powerLevel > 1) {
              ctx.save();
              ctx.strokeStyle = '#FFD700';
              ctx.lineWidth = 2;
              ctx.strokeRect(-entity.size / 2, -entity.size / 2, entity.size, entity.size);
              ctx.restore();
            }
            
            // Индикатор паники
            if (entity.panicMode) {
              ctx.save();
              ctx.strokeStyle = '#FF0000';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.arc(0, 0, entity.size, 0, Math.PI * 2);
              ctx.stroke();
              ctx.restore();
            }
            
            // Линия к цели (контейнеру)
            if (entity.targetContainer) {
              ctx.save();
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(
                entity.targetContainer.x - entity.x + entity.size/2,
                entity.targetContainer.y - entity.y + entity.size/2
              );
              ctx.stroke();
              ctx.restore();
            }
            break;
            
          case ENTITY_TYPES.BASKET:
            ctx.strokeStyle = '#FF9800';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(0, 0, entity.size / 2, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.fillStyle = '#FF9800';
            ctx.fillRect(-entity.size / 4, -2, (entity.size / 2) * (entity.collected / entity.capacity), 4);
            
            // Отображение уровня
            ctx.fillStyle = '#FF9800';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`Lv.${entity.level}`, 0, -entity.size/2 - 5);
            
            // Эффект повышения уровня
            if (entity.levelUpEffect > 0) {
              ctx.save();
              ctx.globalAlpha = entity.levelUpEffect / 30;
              ctx.strokeStyle = '#FFD700';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(0, 0, entity.size/2 + entity.levelUpEffect/2, 0, Math.PI * 2);
              ctx.stroke();
              ctx.restore();
              entity.levelUpEffect--;
            }
            
            // Индикатор избегания контейнеров
            if (entity.avoidanceMode) {
              ctx.save();
              ctx.strokeStyle = '#FF0000';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(0, 0, entity.size, 0, Math.PI * 2);
              ctx.stroke();
              ctx.restore();
            }
            
            // Индикатор режима перехвата
            if (entity.interceptionMode) {
              ctx.save();
              ctx.strokeStyle = '#FFFF00';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(0, 0, entity.size, 0, Math.PI * 2);
              ctx.stroke();
              ctx.restore();
            }
            
            // Линия к цели (добыче)
            if (entity.targetPrey) {
              ctx.save();
              ctx.strokeStyle = 'rgba(255, 152, 0, 0.5)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(
                entity.targetPrey.x - entity.x + entity.size/2,
                entity.targetPrey.y - entity.y + entity.size/2
              );
              ctx.stroke();
              ctx.restore();
            }
            
            // Линия от контейнера (если избегает)
            if (entity.targetContainer) {
              ctx.save();
              ctx.strokeStyle = 'rgba(255, 0, 0, 0.7)';
              ctx.lineWidth = 2;
              ctx.setLineDash([5, 3]);
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(
                entity.targetContainer.x - entity.x + entity.size/2,
                entity.targetContainer.y - entity.y + entity.size/2
              );
              ctx.stroke();
              ctx.restore();
            }
            break;
            
          case ENTITY_TYPES.CONTAINER:
            // Защитное поле
            ctx.save();
            ctx.globalAlpha = entity.shieldEnergy / 100 * 0.3;
            ctx.strokeStyle = '#2196F3';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, entity.safeRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
            
            // Радиус поглощения (уменьшен)
            ctx.save();
            ctx.globalAlpha = 0.2;
            ctx.strokeStyle = '#00FF00';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, 0, entity.absorptionRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
            
            // Индикатор энергии щита
            ctx.fillStyle = 'rgba(33, 150, 243, 0.7)';
            ctx.fillRect(-entity.size/2, -entity.size/2 - 8, entity.size * (entity.shieldEnergy / 100), 3);
            
            ctx.strokeStyle = '#2196F3';
            ctx.lineWidth = 2;
            ctx.strokeRect(-entity.size / 2, -entity.size / 2, entity.size, entity.size);
            
            ctx.fillStyle = 'rgba(33, 150, 243, 0.2)';
            ctx.fillRect(-entity.size / 2 + 2, -entity.size / 2 + 2, entity.size - 4, entity.size - 4);
            
            // Показываем количество скрытых элементов
            if (entity.stored && entity.stored.length > 0) {
              ctx.fillStyle = '#2196F3';
              ctx.font = '10px Arial';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(entity.stored.length.toString(), 0, 0);
            }
            
            // Режим убежища
            if (entity.shelterMode) {
              ctx.save();
              ctx.strokeStyle = '#00FF00';
              ctx.lineWidth = 3;
              ctx.strokeRect(-entity.size / 2, -entity.size / 2, entity.size, entity.size);
              
              // Эффект пульсации
              const pulse = Math.sin(Date.now() / 200) * 0.2 + 0.8;
              ctx.globalAlpha = pulse * 0.3;
              ctx.fillStyle = '#00FF00';
              ctx.fillRect(-entity.size / 2, -entity.size / 2, entity.size, entity.size);
              ctx.restore();
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
        
        // Визуализация хитбоксов при отладке
        if (DEBUG_HITBOXES) {
          ctx.save();
          ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
          ctx.lineWidth = 1;
          
          if (entity.type === ENTITY_TYPES.BASKET) {
            ctx.beginPath();
            ctx.arc(entity.x + entity.size/2, entity.y + entity.size/2, entity.size/2, 0, Math.PI * 2);
            ctx.stroke();
          } else {
            ctx.strokeRect(entity.x, entity.y, entity.size, entity.size);
          }
          
          ctx.restore();
        }
      });
    } catch (error) {
      console.error("Ошибка при отрисовке:", error);
    }
  };
  
  // Игровой цикл
  useEffect(() => {
    if (!isRunning) return;
    
    const gameLoop = setInterval(() => {
      setEntities(prevEntities => updateEntities(prevEntities));
    }, 50); // 20 FPS
    
    return () => clearInterval(gameLoop);
  }, [isRunning]);
  
  // Отрисовка при изменении сущностей
  useEffect(() => {
    draw();
  }, [entities, particles, trails]);
  
  useEffect(() => {
    initializeEcosystem();
    
    // Добавляем отложенный вызов draw() после инициализации
    const timer = setTimeout(() => {
      draw();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Обработчики событий для кнопок
  const handleStart = () => {
    setIsRunning(!isRunning);
    playSound(500, 100);
  };
  
  const handleReset = () => {
    setIsRunning(false);
    initializeEcosystem();
    setParticles([]);
    setTrails([]);
    playSound(300, 150);
  };
  
  // Обработчики событий мыши для холста
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (e.button === 0) { // ЛКМ - добавление
        // Добавляем случайную сущность
        const types = [ENTITY_TYPES.PIXEL, ENTITY_TYPES.BUTTON, ENTITY_TYPES.BASKET, ENTITY_TYPES.CONTAINER];
        const randomType = types[Math.floor(Math.random() * types.length)];
        setEntities(prev => [...prev, createEntity(randomType, x - 10, y - 10)]);
        playSound(400, 50);
      } else if (e.button === 2) { // ПКМ - удаление
        // Находим ближайшую сущность и удаляем ее
        setEntities(prev => {
          let minDistance = Infinity;
          let entityToRemove = null;
          
          prev.forEach(entity => {
            const distance = Math.sqrt((entity.x - x) ** 2 + (entity.y - y) ** 2);
            if (distance < minDistance && distance < 30) {
              minDistance = distance;
              entityToRemove = entity;
            }
          });
          
          if (entityToRemove) {
            createParticles(
              entityToRemove.x + entityToRemove.size/2, 
              entityToRemove.y + entityToRemove.size/2, 
              entityToRemove.type === ENTITY_TYPES.PIXEL ? entityToRemove.color : 
              entityToRemove.type === ENTITY_TYPES.BUTTON ? '#4CAF50' :
              entityToRemove.type === ENTITY_TYPES.BASKET ? '#FF9800' : '#2196F3', 
              15
            );
            playSound(200, 100);
            return prev.filter(e => e.id !== entityToRemove.id);
          }
          return prev;
        });
      }
    };
    
    // Блокируем контекстное меню при ПКМ
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);
  
  return (
    <section className="game-container">
      {/* Декоративные частицы на фоне */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              opacity: Math.random() * 0.4 + 0.1,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      <div className="game-wrapper">
        <h2>Пиксельная Экосистема</h2>
        <p>Интерактивная симуляция экосистемы с различными сущностями</p>
        
        <div className="game-controls">
          <button 
            onClick={handleStart}
            className="game-button start"
          >
            <i className="fas fa-play"></i> {isRunning ? 'Пауза' : 'Запустить'}
          </button>
          <button 
            onClick={handleReset}
            className="game-button reset"
          >
            <i className="fas fa-redo"></i> Сброс
          </button>
        </div>
        
        <div className="game-status">
          <div className="status-indicator">
            <div className={`status-light ${isRunning ? 'active' : ''}`}></div>
            <span>{isRunning ? 'Симуляция запущена' : 'Симуляция на паузе'}</span>
          </div>
          
          <div className="performance-indicator">
            <span>Производительность: </span>
            <span className={`performance-value ${performance}`}>
              {performance === 'high' ? 'Высокая' : performance === 'medium' ? 'Средняя' : 'Низкая'}
            </span>
          </div>
        </div>
        
        <div className="game-stats">
          <div className="stat-item">
            <div className="stat-icon pixel"></div>
            <span>Пиксели: {stats.pixels}</span>
          </div>
          <div className="stat-item">
            <div className="stat-icon button"></div>
            <span>Кнопки: {stats.buttons}</span>
          </div>
          <div className="stat-item">
            <div className="stat-icon basket"></div>
            <span>Корзины: {stats.baskets}</span>
          </div>
          <div className="stat-item">
            <div className="stat-icon container"></div>
            <span>Контейнеры: {stats.containers}</span>
          </div>
        </div>
        
        <div className="entity-controls">
          <h3>Добавить сущность:</h3>
          <div className="entity-buttons">
            <button 
              className="entity-button pixel-button"
              onClick={() => addSpecificEntity(ENTITY_TYPES.PIXEL)}
              title="Добавить пиксель"
            >
              <i className="fas fa-square"></i>
            </button>
            <button 
              className="entity-button button-button"
              onClick={() => addSpecificEntity(ENTITY_TYPES.BUTTON)}
              title="Добавить кнопку"
            >
              <i className="fas fa-square"></i>
            </button>
            <button 
              className="entity-button basket-button"
              onClick={() => addSpecificEntity(ENTITY_TYPES.BASKET)}
              title="Добавить корзину"
            >
              <i className="fas fa-circle"></i>
            </button>
            <button 
              className="entity-button container-button"
              onClick={() => addSpecificEntity(ENTITY_TYPES.CONTAINER)}
              title="Добавить контейнер"
            >
              <i className="fas fa-square"></i>
            </button>
          </div>
        </div>
        
        <canvas 
          ref={canvasRef} 
          width="800" 
          height="400"
          className="game-canvas"
        ></canvas>
        
        <div className="game-instructions">
          <p>Управление: ЛКМ - добавить случайную сущность, ПКМ - удалить сущность</p>
        </div>
        
        <div className="game-rules">
          <h3>Правила экосистемы</h3>
          <ul>
            <li>🟣 <strong>Пиксели</strong> - при виде корзины ищут контейнер как убежище, иначе свободно летают</li>
            <li>🟩 <strong>Кнопки</strong> - копируют пиксели с повышенным шансом, ищут убежище в контейнерах</li>
            <li>🟠 <strong>Корзины</strong> - быстрые, координируют действия для перехвата добычи, избегают близких контейнеров</li>
            <li>🟦 <strong>Контейнеры</strong> - работают как станции, сущности сами решают входить или нет</li>
          </ul>
        </div>
      </div>
    </section>
  );
}