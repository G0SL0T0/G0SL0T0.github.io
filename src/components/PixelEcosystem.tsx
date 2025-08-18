// src/components/PixelEcosystem.tsx
'use client';
import { useEffect, useRef, useState } from 'react';

// Определяем интерфейсы для всех типов данных
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

interface Trail {
  x: number;
  y: number;
  size: number;
  color: string;
  life: number;
}

interface BaseEntity {
  id: string;
  type: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  energy: number;
  hidden: boolean;
  containerId: string | null;
}

interface PixelEntity extends BaseEntity {
  type: 'pixel';
  color: string;
  size: number;
  speed: number;
  evolved: boolean;
  panicMode: boolean;
  targetContainer: ContainerEntity | null;
  avoidanceAngle: number;
}

interface ButtonEntity extends BaseEntity {
  type: 'button';
  buttonType: string;
  size: number;
  speed: number;
  cooldown: number;
  powerLevel: number;
  copyEffect: number;
  panicMode: boolean;
  targetContainer: ContainerEntity | null;
  avoidanceAngle: number;
  mergeEffect: number;
}

interface BasketEntity extends BaseEntity {
  type: 'basket';
  size: number;
  speed: number;
  capacity: number;
  collected: number;
  level: number;
  experience: number;
  levelUpEffect: number;
  targetPrey: PixelEntity | ButtonEntity | null;
  huntingGroup: BasketEntity[];
  avoidanceMode: boolean;
  targetContainer: ContainerEntity | null;
  avoidanceDistance: number;
  interceptionMode: boolean;
  collisionCooldown: number;
}

interface ContainerEntity extends BaseEntity {
  type: 'container';
  size: number;
  speed: number;
  stored: (PixelEntity | ButtonEntity)[];
  safeRadius: number;
  releaseTimer: number;
  shieldEnergy: number;
  shelterMode: boolean;
  shelterTimer: number;
  absorptionRadius: number;
  releaseRate: number;
}

type Entity = PixelEntity | ButtonEntity | BasketEntity | ContainerEntity;
type PreyEntity = PixelEntity | ButtonEntity;

export default function PixelEcosystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({ pixels: 0, buttons: 0, baskets: 0, containers: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [trails, setTrails] = useState<Trail[]>([]);
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
  const [entities, setEntities] = useState<Entity[]>([]);
  
  // Режим отладки для визуализации хитбоксов
  const DEBUG_HITBOXES = false;
  
  // Вспомогательная функция для получения цвета сущности
  const getEntityColor = (entity: Entity): string => {
    switch (entity.type) {
      case ENTITY_TYPES.PIXEL:
        return (entity as PixelEntity).color;
      case ENTITY_TYPES.BUTTON:
        return '#4CAF50';
      case ENTITY_TYPES.BASKET:
        return '#FF9800';
      case ENTITY_TYPES.CONTAINER:
        return '#2196F3';
      default:
        return '#ffffff';
    }
  };
  
  // Создание новой сущности
  const createEntity = (type: string, x?: number, y?: number, buttonType?: string): Entity => {
    const baseEntity: BaseEntity = {
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
          type: 'pixel',
          color: `hsl(${Math.random() * 360}, 70%, 50%)`,
          size: 4,
          speed: 0.5 + Math.random() * 0.5, // 0.5-1.0
          evolved: false,
          panicMode: false,
          targetContainer: null,
          avoidanceAngle: 0 // Угол обхода препятствий
        };
      case ENTITY_TYPES.BUTTON:
        return {
          ...baseEntity,
          type: 'button',
          buttonType: buttonType || Object.values(BUTTON_TYPES)[Math.floor(Math.random() * 4)],
          size: 12,
          speed: 0.5 + Math.random() * 0.3, // 0.5-0.8
          cooldown: 0,
          powerLevel: 1,
          copyEffect: 0,
          panicMode: false,
          targetContainer: null,
          avoidanceAngle: 0, // Угол обхода препятствий
          mergeEffect: 0
        };
      case ENTITY_TYPES.BASKET:
        return {
          ...baseEntity,
          type: 'basket',
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
          avoidanceDistance: 350, // Увеличенное расстояние избегания
          interceptionMode: false, // Режим перехвата пути к контейнеру
          collisionCooldown: 0 // Кулдаун после столкновения
        };
      case ENTITY_TYPES.CONTAINER:
        return {
          ...baseEntity,
          type: 'container',
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
        // Добавляем обработку неизвестного типа
        return {
          ...baseEntity,
          type: 'pixel', // По умолчанию создаем пиксель
          color: `hsl(${Math.random() * 360}, 70%, 50%)`,
          size: 4,
          speed: 0.5 + Math.random() * 0.5,
          evolved: false,
          panicMode: false,
          targetContainer: null,
          avoidanceAngle: 0
        } as Entity; // Явное приведение типа
    }
  };
  
  // Функция для добавления конкретного типа сущности
  const addSpecificEntity = (type: string) => {
    setEntities(prev => [...prev, createEntity(type)]);
    playSound(400, 50);
  };
  
  // Функция для создания частиц
  const createParticles = (x: number, y: number, color: string, count: number) => {
    const newParticles: Particle[] = []; // Явно указываем тип массива
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
    const newEntities: Entity[] = [];
    
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
  const updateStats = (entities: Entity[]) => {
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
          const container = entity as ContainerEntity; // Приводим к типу ContainerEntity
          if (container.stored) {
            container.stored.forEach((stored) => {
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
  const getDistance = (entity1: Entity, entity2: Entity) => {
    const dx = entity1.x - entity2.x;
    const dy = entity1.y - entity2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  // Поиск ближайшего элемента определенного типа
  const findNearestEntity = (entity: Entity, entities: Entity[], targetType: string, excludeHidden = true) => {
    let nearest: Entity | null = null;
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
  
  // Новая функция: поиск лучшей цели для корзины (максимально удаленной от контейнеров)
  const findBestTargetForBasket = (basket: BasketEntity, entities: Entity[]): PreyEntity | null => {
    let bestTarget: PreyEntity | null = null;
    let bestScore = -Infinity;
    
    // Ищем все возможные цели (пиксели и кнопки)
    const potentialTargets = entities.filter(entity => 
      (entity.type === ENTITY_TYPES.PIXEL || entity.type === ENTITY_TYPES.BUTTON) &&
      !entity.hidden &&
      entity.id !== basket.id
    ) as PreyEntity[];
    
    potentialTargets.forEach(target => {
      // Расстояние от корзины до цели
      const distanceToTarget = getDistance(basket, target);
      
      // Находим ближайший контейнер к цели
      const nearestContainerToTarget = findNearestEntity(target, entities, ENTITY_TYPES.CONTAINER) as ContainerEntity | null;
      const distanceToContainer = nearestContainerToTarget ? 
        getDistance(target, nearestContainerToTarget) : 1000; // Если контейнера нет, считаем расстояние большим
      
      // Вычисляем "ценность" цели: чем ближе к корзине и чем дальше от контейнера - тем лучше
      // Используем обратное расстояние до цели (чтобы ближе было лучше) и прямое расстояние до контейнера
      const targetValue = (1 / (distanceToTarget + 1)) * distanceToContainer;
      
      if (targetValue > bestScore) {
        bestScore = targetValue;
        bestTarget = target;
      }
    });
    
    return bestTarget;
  };
  
  // Движение к цели
  const moveTowards = (entity: Entity, target: Entity, speed = 1) => {
    const dx = target.x - entity.x;
    const dy = target.y - entity.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      entity.vx = (dx / distance) * speed;
      entity.vy = (dy / distance) * speed;
    }
  };
  
  // Движение от цели (убегание)
  const moveAway = (entity: Entity, target: Entity, speed = 1) => {
    const dx = entity.x - target.x;
    const dy = entity.y - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      entity.vx = (dx / distance) * speed;
      entity.vy = (dy / distance) * speed;
    }
  };
  
  // Новая функция: обход препятствий для пикселей и кнопок
  const avoidObstacles = (entity: Entity, target: Entity, entities: Entity[], speed = 1) => {
    // Вектор к цели
    const dx = target.x - entity.x;
    const dy = target.y - entity.y;
    const distanceToTarget = Math.sqrt(dx * dx + dy * dy);
    
    if (distanceToTarget === 0) return;
    
    let targetVectorX = dx / distanceToTarget;
    let targetVectorY = dy / distanceToTarget;
    
    // Проверяем наличие корзин на пути
    const dangerRadius = 80; // Радиус обнаружения опасности
    const dangerousBaskets = entities.filter(e => 
      e.type === ENTITY_TYPES.BASKET && 
      !e.hidden &&
      getDistance(entity, e) < dangerRadius
    ) as BasketEntity[];
    
    if (dangerousBaskets.length > 0) {
      // Вычисляем вектор избегания (сумма векторов от всех опасных корзин)
      let avoidVectorX = 0;
      let avoidVectorY = 0;
      
      dangerousBaskets.forEach(basket => {
        const basketDx = entity.x - basket.x;
        const basketDy = entity.y - basket.y;
        const basketDistance = Math.sqrt(basketDx * basketDx + basketDy * basketDy);
        
        if (basketDistance > 0) {
          // Чем ближе корзина, тем сильнее отталкивание
          const force = Math.max(0, 1 - basketDistance / dangerRadius);
          avoidVectorX += (basketDx / basketDistance) * force;
          avoidVectorY += (basketDy / basketDistance) * force;
        }
      });
      
      // Нормализуем вектор избегания
      const avoidLength = Math.sqrt(avoidVectorX * avoidVectorX + avoidVectorY * avoidVectorY);
      if (avoidLength > 0) {
        avoidVectorX /= avoidLength;
        avoidVectorY /= avoidLength;
      }
      
      // Комбинируем векторы: 70% к цели, 30% избегание
      const combinedVectorX = targetVectorX * 0.7 + avoidVectorX * 0.3;
      const combinedVectorY = targetVectorY * 0.7 + avoidVectorY * 0.3;
      
      // Нормализуем итоговый вектор
      const combinedLength = Math.sqrt(combinedVectorX * combinedVectorX + combinedVectorY * combinedVectorY);
      if (combinedLength > 0) {
        entity.vx = (combinedVectorX / combinedLength) * speed;
        entity.vy = (combinedVectorY / combinedLength) * speed;
      }
    } else {
      // Если препятствий нет, просто движемся к цели
      entity.vx = targetVectorX * speed;
      entity.vy = targetVectorY * speed;
    }
  };
  
  // Новая функция: предотвращение столкновений между корзинами
  const preventBasketCollisions = (basket: BasketEntity, entities: Entity[]) => {
    // Уменьшаем кулдаун столкновения
    if (basket.collisionCooldown > 0) {
      basket.collisionCooldown--;
    }
    
    // Проверяем столкновения с другими корзинами
    const otherBaskets = entities.filter(e => 
      e.type === ENTITY_TYPES.BASKET && 
      !e.hidden &&
      e.id !== basket.id
    ) as BasketEntity[];
    
    otherBaskets.forEach(otherBasket => {
      const distance = getDistance(basket, otherBasket);
      const minDistance = (basket.size + otherBasket.size) / 2; // Минимальное расстояние между центрами
      
      if (distance < minDistance && basket.collisionCooldown === 0) {
        // Вычисляем вектор отталкивания
        const dx = basket.x - otherBasket.x;
        const dy = basket.y - otherBasket.y;
        
        if (distance > 0) {
          // Нормализуем вектор
          const pushX = dx / distance;
          const pushY = dy / distance;
          
          // Сила отталкивания зависит от степени пересечения
          const overlap = minDistance - distance;
          const pushForce = Math.min(overlap * 0.5, 2); // Ограничиваем максимальную силу отталкивания
          
          // Применяем отталкивание
          basket.vx += pushX * pushForce;
          basket.vy += pushY * pushForce;
          
          // Устанавливаем кулдаун для предотвращения дрожания
          basket.collisionCooldown = 5;
        }
      }
    });
  };
  
  // Проверка безопасности зоны (нет корзин рядом)
  const isAreaSafe = (x: number, y: number, entities: Entity[], radius = 100) => {
    return !entities.some(entity => 
      entity.type === ENTITY_TYPES.BASKET && 
      !entity.hidden &&
      Math.sqrt((entity.x - x) ** 2 + (entity.y - y) ** 2) < radius
    );
  };
  
  // Обновление сущностей
  const updateEntities = (entities: Entity[]) => {
    const newEntities = [...entities];
    const toRemove = new Set<string>();
    const toAdd: Entity[] = [];
    
    // Создание следов движения
    const newTrails: Trail[] = [...trails];
    
    // Формирование охотничьих групп для корзин
    const baskets = newEntities.filter(e => e.type === ENTITY_TYPES.BASKET && !e.hidden) as BasketEntity[];
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
    
    newEntities.forEach((entity) => {
      if (toRemove.has(entity.id) || entity.hidden) return;
      
      // Создание следов движения
      if (!entity.hidden && (Math.abs(entity.vx) > 0.5 || Math.abs(entity.vy) > 0.5)) {
        newTrails.push({
          x: entity.x + entity.size/2,
          y: entity.y + entity.size/2,
          size: entity.size / 3,
          color: getEntityColor(entity),
          life: 20
        });
      }
      
      // Логика поведения для каждого типа
      switch (entity.type) {
        case ENTITY_TYPES.PIXEL:
          const pixel = entity as PixelEntity;
          // Эволюция пикселей
          if (pixel.age > 500 && pixel.energy > 80 && !pixel.evolved) {
            if (Math.random() < 0.001) {
              pixel.evolved = true;
              pixel.size = 6;
              pixel.speed = 1.2;
              pixel.color = `hsl(${(parseInt(pixel.color.split('(')[1].split(',')[0]) + 180) % 360}, 70%, 60%)`;
              createParticles(pixel.x + pixel.size/2, pixel.y + pixel.size/2, pixel.color, 15);
              playSound(600, 200);
            }
          }
          
          // Проверяем близость к корзинам
          const nearestBasket = findNearestEntity(pixel, newEntities, ENTITY_TYPES.BASKET) as BasketEntity | null;
          const isInDanger = nearestBasket && getDistance(pixel, nearestBasket) < 100;
          
          if (isInDanger) {
            // Активируем панический режим
            pixel.panicMode = true;
            
            // Ищем ближайший контейнер для убежища
            const nearestContainer = findNearestEntity(pixel, newEntities, ENTITY_TYPES.CONTAINER) as ContainerEntity | null;
            if (nearestContainer) {
              pixel.targetContainer = nearestContainer;
              const distanceToContainer = getDistance(pixel, nearestContainer);
              
              // Если достаточно близко к контейнеру, прячемся в него
              if (distanceToContainer < nearestContainer.absorptionRadius) {
                pixel.hidden = true;
                pixel.containerId = nearestContainer.id;
                nearestContainer.stored.push({...pixel});
                toRemove.add(pixel.id);
                createParticles(pixel.x + pixel.size/2, pixel.y + pixel.size/2, pixel.color, 5);
              } else {
                // Используем функцию обхода препятствий для движения к контейнеру
                avoidObstacles(pixel, nearestContainer, newEntities, 1.8);
              }
            } else {
              // Нет контейнера, просто убегаем от корзины
              moveAway(pixel, nearestBasket, 2.2);
            }
          } else {
            // Выключаем панический режим
            pixel.panicMode = false;
            pixel.targetContainer = null;
            
            // Обычное поведение - просто летаем по полю
            pixel.vx += (Math.random() - 0.5) * 0.5;
            pixel.vy += (Math.random() - 0.5) * 0.5;
          }
          break;
          
        case ENTITY_TYPES.BUTTON:
          const button = entity as ButtonEntity;
          // Объединение кнопок одного типа
          if (!button.hidden && button.powerLevel === 1) {
            const nearbyButtons = newEntities.filter(other => 
              other.type === ENTITY_TYPES.BUTTON && 
              other.id !== button.id && 
              !other.hidden &&
              (other as ButtonEntity).buttonType === button.buttonType &&
              (other as ButtonEntity).powerLevel === 1 &&
              getDistance(button, other) < 40
            ) as ButtonEntity[];
            
            if (nearbyButtons.length > 0 && Math.random() < 0.005) {
              // Объединяем кнопки
              button.size = 16;
              button.powerLevel = 2;
              button.cooldown = 0;
              
              // Удаляем вторую кнопку
              toRemove.add(nearbyButtons[0].id);
              
              // Визуальный эффект объединения
              button.mergeEffect = 20;
              createParticles(button.x + button.size/2, button.y + button.size/2, '#4CAF50', 10);
              playSound(500, 150);
            }
          }
          
          // Проверяем близость к корзинам
          const buttonNearestBasket = findNearestEntity(button, newEntities, ENTITY_TYPES.BASKET) as BasketEntity | null;
          const buttonIsInDanger = buttonNearestBasket && getDistance(button, buttonNearestBasket) < 100;
          
          if (buttonIsInDanger) {
            // Активируем панический режим
            button.panicMode = true;
            
            // Ищем ближайший контейнер для убежища
            const buttonNearestContainer = findNearestEntity(button, newEntities, ENTITY_TYPES.CONTAINER) as ContainerEntity | null;
            if (buttonNearestContainer) {
              button.targetContainer = buttonNearestContainer;
              const distanceToContainer = getDistance(button, buttonNearestContainer);
              
              // Если достаточно близко к контейнеру, прячемся в него
              if (distanceToContainer < buttonNearestContainer.absorptionRadius) {
                button.hidden = true;
                button.containerId = buttonNearestContainer.id;
                buttonNearestContainer.stored.push({...button});
                toRemove.add(button.id);
                createParticles(button.x + button.size/2, button.y + button.size/2, '#4CAF50', 5);
              } else {
                // Используем функцию обхода препятствий для движения к контейнеру
                avoidObstacles(button, buttonNearestContainer, newEntities, 1.8);
              }
            } else {
              // Нет контейнера, просто убегаем от корзины
              moveAway(button, buttonNearestBasket, 2.2);
            }
          } else {
            // Выключаем панический режим
            button.panicMode = false;
            button.targetContainer = null;
            
            // Обычное поведение - просто летаем по полю
            button.vx += (Math.random() - 0.5) * 0.5;
            button.vy += (Math.random() - 0.5) * 0.5;
          }
          break;
          
        case ENTITY_TYPES.BASKET:
          const basket = entity as BasketEntity;
          // Проверяем наличие контейнеров поблизости
          const nearestContainer = findNearestEntity(basket, newEntities, ENTITY_TYPES.CONTAINER) as ContainerEntity | null;
          if (nearestContainer) {
            const distanceToContainer = getDistance(basket, nearestContainer);
            
            // Улучшенная логика избегания контейнеров
            if (distanceToContainer < basket.avoidanceDistance) {
              basket.avoidanceMode = true;
              basket.targetContainer = nearestContainer;
              basket.targetPrey = null; // Игнорируем добычу при избегании контейнера
              moveAway(basket, nearestContainer, 2.5); // Увеличиваем скорость убегания
            } else {
              basket.avoidanceMode = false;
              basket.targetContainer = null;
            }
          }
          
          // Если не в режиме избегания, охотимся за добычей
          if (!basket.avoidanceMode) {
            // Используем новую функцию поиска лучшей цели
            const huntTarget = findBestTargetForBasket(basket, newEntities);
            
            if (huntTarget) {
              basket.targetPrey = huntTarget;
              
              // Проверяем, не движется ли цель к контейнеру (режим перехвата)
              if (huntTarget.panicMode && huntTarget.targetContainer) {
                basket.interceptionMode = true;
                
                // Рассчитываем точку перехвата между целью и контейнером
                const targetToContainerX = huntTarget.targetContainer.x - huntTarget.x;
                const targetToContainerY = huntTarget.targetContainer.y - huntTarget.y;
                const distanceToContainer = Math.sqrt(targetToContainerX * targetToContainerX + targetToContainerY * targetToContainerY);
                
                // Точка на пути от цели к контейнеру (на 30% пути)
                const interceptionX = huntTarget.x + (targetToContainerX / distanceToContainer) * (distanceToContainer * 0.3);
                const interceptionY = huntTarget.y + (targetToContainerY / distanceToContainer) * (distanceToContainer * 0.3);
                
                // Двигаемся к точке перехвата
                moveTowards(basket, { x: interceptionX, y: interceptionY } as Entity, basket.speed * 1.2);
              } else {
                basket.interceptionMode = false;
                
                // Координация с другими корзинами
                if (basket.huntingGroup.length > 0) {
                  // Стратегия окружения
                  const angleToPrey = Math.atan2(huntTarget.y - basket.y, huntTarget.x - basket.x);
                  const distanceToPrey = getDistance(basket, huntTarget);
                  
                  // Определяем позицию в окружении
                  let desiredAngle = angleToPrey;
                  const groupSize = basket.huntingGroup.length + 1;
                  const angleStep = (Math.PI * 2) / groupSize;
                  
                  // Находим свою позицию в группе
                  const groupIndex = basket.huntingGroup.findIndex(b => b.id < basket.id);
                  desiredAngle += angleStep * (groupIndex + 1);
                  
                  // Желаемое расстояние до цели
                  const desiredDistance = 60;
                  
                  // Рассчитываем желаемую позицию
                  const desiredX = huntTarget.x + Math.cos(desiredAngle) * desiredDistance;
                  const desiredY = huntTarget.y + Math.sin(desiredAngle) * desiredDistance;
                  
                  // Двигаемся к желаемой позиции
                  const dx = desiredX - basket.x;
                  const dy = desiredY - basket.y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  
                  if (distance > 0) {
                    basket.vx = (dx / distance) * basket.speed;
                    basket.vy = (dy / distance) * basket.speed;
                  }
                } else {
                  // Если группы нет, просто движемся к цели
                  moveTowards(basket, huntTarget, basket.speed);
                }
              }
            } else {
              basket.targetPrey = null;
              basket.interceptionMode = false;
            }
          }
          break;
          
        case ENTITY_TYPES.CONTAINER:
          const container = entity as ContainerEntity;
          // Восстановление щита
          if (container.shieldEnergy < 100) {
            container.shieldEnergy += 0.2;
          }
          
          // Активация режима убежища при опасности
          const nearbyBaskets = newEntities.filter(other => 
            other.type === ENTITY_TYPES.BASKET && 
            !other.hidden &&
            getDistance(container, other) < container.safeRadius * 1.5
          ) as BasketEntity[];
          
          if (nearbyBaskets.length > 0 && !container.shelterMode && container.shieldEnergy > 50) {
            container.shelterMode = true;
            container.shelterTimer = 100; // Длительность режима убежища
            playSound(700, 300);
          }
          
          // Режим убежища
          if (container.shelterMode) {
            container.shelterTimer--;
            
            if (container.shelterTimer <= 0) {
              container.shelterMode = false;
            }
            
            // Расход энергии щита
            container.shieldEnergy -= 0.5;
          }
          
          // Замедление корзин в радиусе действия
          newEntities.forEach(other => {
            if (other.type === ENTITY_TYPES.BASKET && !other.hidden) {
              const distance = getDistance(container, other);
              if (distance < container.safeRadius) {
                // Замедление корзины
                other.vx *= 0.9;
                other.vy *= 0.9;
                
                // Расход энергии щита
                container.shieldEnergy -= 0.2;
              }
            }
          });
          
          // Выпуск сущностей из контейнера (без КД, но с шансом)
          if (container.stored && container.stored.length > 0) {
            // Выпускаем сущности с определенным шансом в каждом кадре
            if (Math.random() < container.releaseRate) {
              const releasedEntity = container.stored.pop();
              if (releasedEntity) {
                releasedEntity.hidden = false;
                releasedEntity.containerId = null;
                
                // Размещаем элемент рядом с контейнером
                const angle = Math.random() * Math.PI * 2;
                const distance = container.size + 25;
                releasedEntity.x = container.x + Math.cos(angle) * distance;
                releasedEntity.y = container.y + Math.sin(angle) * distance;
                
                // Убедимся, что элемент не выходит за границы канваса
                releasedEntity.x = Math.max(15, Math.min(785, releasedEntity.x));
                releasedEntity.y = Math.max(15, Math.min(385, releasedEntity.y));
                
                // Задаем начальную скорость от контейнера
                releasedEntity.vx = Math.cos(angle) * 1.0;
                releasedEntity.vy = Math.sin(angle) * 1.0;
                
                toAdd.push(releasedEntity);
                createParticles(releasedEntity.x, releasedEntity.y, getEntityColor(releasedEntity), 8);
                playSound(350, 100);
              }
            }
          }
          
          // Медленное случайное движение
          if (Math.random() < 0.005) {
            container.vx = (Math.random() - 0.5) * 0.5;
            container.vy = (Math.random() - 0.5) * 0.5;
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
      
      // Предотвращение столкновений для корзин
      if (entity.type === ENTITY_TYPES.BASKET && !entity.hidden) {
        preventBasketCollisions(entity as BasketEntity, newEntities);
      }
      
      // Обновляем возраст
      entity.age++;
      
      // Логика для корзин - поглощение (только видимых элементов)
      if (entity.type === ENTITY_TYPES.BASKET) {
        const basket = entity as BasketEntity;
        newEntities.forEach(other => {
          if (other.id !== basket.id && 
              (other.type === ENTITY_TYPES.PIXEL || other.type === ENTITY_TYPES.BUTTON) &&
              !other.hidden &&
              getDistance(basket, other) < basket.size + other.size) {
            toRemove.add(other.id);
            basket.collected++;
            basket.experience += 10;
            
            // Повышение уровня
            if (basket.experience >= basket.level * 50) {
              basket.level++;
              basket.experience = 0;
              basket.size += 2;
              basket.speed += 0.05;
              basket.capacity += 2;
              basket.levelUpEffect = 30;
              playSound(800, 300);
            }
            
            // Создаем частицы
            createParticles(
              other.x + other.size/2, 
              other.y + other.size/2, 
              getEntityColor(other), 
              10
            );
            playSound(200, 100);
          }
        });
      }
      
      if ('cooldown' in entity && entity.cooldown > 0) {
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
            const pixel = entity as PixelEntity;
            if (pixel.evolved) {
              ctx.save();
              ctx.shadowColor = pixel.color;
              ctx.shadowBlur = 10;
              ctx.fillStyle = pixel.color;
              ctx.fillRect(-pixel.size / 2, -pixel.size / 2, pixel.size, pixel.size);
              ctx.restore();
            } else {
              ctx.fillStyle = pixel.color;
              ctx.fillRect(-pixel.size / 2, -pixel.size / 2, pixel.size, pixel.size);
            }
            
            // Индикатор паники
            if (pixel.panicMode) {
              ctx.save();
              ctx.strokeStyle = '#FF0000';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.arc(0, 0, pixel.size, 0, Math.PI * 2);
              ctx.stroke();
              ctx.restore();
            }
            break;
            
          case ENTITY_TYPES.BUTTON:
            const button = entity as ButtonEntity;
            ctx.strokeStyle = '#4CAF50';
            ctx.lineWidth = 2;
            ctx.strokeRect(-button.size / 2, -button.size / 2, button.size, button.size);
            
            ctx.fillStyle = '#4CAF50';
            ctx.font = '8px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const buttonText = button.buttonType === BUTTON_TYPES.COPY ? 'C' : 
                            button.buttonType === BUTTON_TYPES.MOVE ? 'M' :
                            button.buttonType === BUTTON_TYPES.CREATE ? '+' : 'D';
            ctx.fillText(buttonText, 0, 0);
            
            // Эффект объединения
            if (button.mergeEffect > 0) {
              ctx.globalAlpha = button.mergeEffect / 20;
              ctx.fillStyle = '#FFD700';
              ctx.fillRect(-button.size / 2, -button.size / 2, button.size, button.size);
              button.mergeEffect--;
            }
            
            // Эффект копирования
            if (button.copyEffect > 0) {
              ctx.save();
              ctx.globalAlpha = button.copyEffect / 15;
              ctx.strokeStyle = '#00FFFF';
              ctx.lineWidth = 2;
              
              // Рисуем круги, расходящиеся от центра кнопки
              for (let i = 0; i < 3; i++) {
                const radius = (button.copyEffect / 15) * (i + 1) * 15;
                ctx.beginPath();
                ctx.arc(0, 0, radius, 0, Math.PI * 2);
                ctx.stroke();
              }
              
              ctx.restore();
              button.copyEffect--;
            }
            
            // Индикатор уровня силы
            if (button.powerLevel > 1) {
              ctx.save();
              ctx.strokeStyle = '#FFD700';
              ctx.lineWidth = 2;
              ctx.strokeRect(-button.size / 2, -button.size / 2, button.size, button.size);
              ctx.restore();
            }
            
            // Индикатор паники
            if (button.panicMode) {
              ctx.save();
              ctx.strokeStyle = '#FF0000';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.arc(0, 0, button.size, 0, Math.PI * 2);
              ctx.stroke();
              ctx.restore();
            }
            break;
            
          case ENTITY_TYPES.BASKET:
            const basket = entity as BasketEntity;
            ctx.strokeStyle = '#FF9800';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(0, 0, basket.size / 2, 0, Math.PI * 2);
            ctx.stroke();
            
            // Отображение уровня
            ctx.fillStyle = '#FF9800';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`Lv.${basket.level}`, 0, -basket.size/2 - 5);
            
            // Эффект повышения уровня
            if (basket.levelUpEffect > 0) {
              ctx.save();
              ctx.globalAlpha = basket.levelUpEffect / 30;
              ctx.strokeStyle = '#FFD700';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(0, 0, basket.size/2 + basket.levelUpEffect/2, 0, Math.PI * 2);
              ctx.stroke();
              ctx.restore();
              basket.levelUpEffect--;
            }
            
            // Улучшенный индикатор избегания контейнеров
            if (basket.avoidanceMode) {
              ctx.save();
              ctx.strokeStyle = '#FF0000';
              ctx.lineWidth = 3;
              ctx.setLineDash([5, 3]);
              ctx.beginPath();
              ctx.arc(0, 0, basket.size + 5, 0, Math.PI * 2);
              ctx.stroke();
              
              // Добавим пульсирующий эффект
              const pulseSize = basket.size + 5 + Math.sin(Date.now() / 200) * 5;
              ctx.beginPath();
              ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
              ctx.globalAlpha = 0.5;
              ctx.stroke();
              ctx.restore();
            }
            
            // Индикатор режима перехвата
            if (basket.interceptionMode) {
              ctx.save();
              ctx.strokeStyle = '#FFFF00';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(0, 0, basket.size, 0, Math.PI * 2);
              ctx.stroke();
              ctx.restore();
            }
            break;
            
          case ENTITY_TYPES.CONTAINER:
            const container = entity as ContainerEntity;
            // Защитное поле
            ctx.save();
            ctx.globalAlpha = container.shieldEnergy / 100 * 0.3;
            ctx.strokeStyle = '#2196F3';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, container.safeRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
            
            // Радиус поглощения (уменьшен)
            ctx.save();
            ctx.globalAlpha = 0.2;
            ctx.strokeStyle = '#00FF00';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, 0, container.absorptionRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
            
            // Индикатор энергии щита
            ctx.fillStyle = 'rgba(33, 150, 243, 0.7)';
            ctx.fillRect(-container.size/2, -container.size/2 - 8, container.size * (container.shieldEnergy / 100), 3);
            
            ctx.strokeStyle = '#2196F3';
            ctx.lineWidth = 2;
            ctx.strokeRect(-container.size / 2, -container.size / 2, container.size, container.size);
            
            ctx.fillStyle = 'rgba(33, 150, 243, 0.2)';
            ctx.fillRect(-container.size / 2 + 2, -container.size / 2 + 2, container.size - 4, container.size - 4);
            
            // Показываем количество скрытых элементов
            if (container.stored && container.stored.length > 0) {
              ctx.fillStyle = '#2196F3';
              ctx.font = '10px Arial';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(container.stored.length.toString(), 0, 0);
            }
            
            // Режим убежища
            if (container.shelterMode) {
              ctx.save();
              ctx.strokeStyle = '#00FF00';
              ctx.lineWidth = 3;
              ctx.strokeRect(-container.size / 2, -container.size / 2, container.size, container.size);
              
              // Эффект пульсации
              const pulse = Math.sin(Date.now() / 200) * 0.2 + 0.8;
              ctx.globalAlpha = pulse * 0.3;
              ctx.fillStyle = '#00FF00';
              ctx.fillRect(-container.size / 2, -container.size / 2, container.size, container.size);
              ctx.restore();
            }
            
            // Радиус безопасности (слабо видимый)
            ctx.strokeStyle = 'rgba(33, 150, 243, 0.1)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, 0, container.safeRadius, 0, Math.PI * 2);
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
          let entityToRemove: Entity | null = null;
          
          prev.forEach(entity => {
            const distance = Math.sqrt((entity.x - x) ** 2 + (entity.y - y) ** 2);
            if (distance < minDistance && distance < 30) {
              minDistance = distance;
              entityToRemove = entity;
            }
          });
          
          if (entityToRemove) {
            // Явно приводим к типу Entity, чтобы избежать ошибки типа never
            const removedEntity = entityToRemove as Entity;
            createParticles(
              removedEntity.x + removedEntity.size/2, 
              removedEntity.y + removedEntity.size/2, 
              getEntityColor(removedEntity), 
              15
            );
            playSound(200, 100);
            return prev.filter(e => e.id !== removedEntity.id);
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
            <li>🟣 <strong>Пиксели</strong> - при виде корзины ищут контейнер как убежище, обходя препятствия</li>
            <li>🟩 <strong>Кнопки</strong> - копируют пиксели с повышенным шансом, ищут убежище в контейнерах</li>
            <li>🟠 <strong>Корзины</strong> - быстрые, координируют действия для перехвата добычи, избегают контейнеров</li>
            <li>🟦 <strong>Контейнеры</strong> - работают как станции, сущности сами решают входить или нет</li>
          </ul>
        </div>
      </div>
    </section>
  );
}