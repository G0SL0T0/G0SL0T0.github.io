// <stdin>
import React, { useState, useEffect, useRef } from "https://esm.sh/react@18.2.0";
var PixelEcosystem = () => {
  const canvasRef = useRef(null);
  const [entities, setEntities] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({ pixels: 0, buttons: 0, baskets: 0, containers: 0 });
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, type: "add" });
  const [mouseDown, setMouseDown] = useState({ left: false, right: false, startTime: 0 });
  const [currentTip, setCurrentTip] = useState(0);
  const ENTITY_TYPES = {
    PIXEL: "pixel",
    BUTTON: "button",
    BASKET: "basket",
    CONTAINER: "container"
  };
  const BUTTON_TYPES = {
    COPY: "copy",
    MOVE: "move",
    DELETE: "delete",
    CREATE: "create"
  };
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
  const initializeEcosystem = () => {
    const newEntities = [];
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
  const updateStats = (entities2) => {
    let totalPixels = 0;
    let totalButtons = 0;
    let totalBaskets = 0;
    let totalContainers = 0;
    entities2.forEach((entity) => {
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
          entity.stored.forEach((stored) => {
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
  const getDistance = (entity1, entity2) => {
    const dx = entity1.x - entity2.x;
    const dy = entity1.y - entity2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };
  const findNearestEntity = (entity, entities2, targetType, excludeHidden = true) => {
    let nearest = null;
    let minDistance = Infinity;
    entities2.forEach((other) => {
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
  const moveTowards = (entity, target, speed = 1) => {
    const dx = target.x - entity.x;
    const dy = target.y - entity.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 0) {
      entity.vx = dx / distance * speed;
      entity.vy = dy / distance * speed;
    }
  };
  const moveAway = (entity, target, speed = 1) => {
    const dx = entity.x - target.x;
    const dy = entity.y - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 0) {
      entity.vx = dx / distance * speed;
      entity.vy = dy / distance * speed;
    }
  };
  const isAreaSafe = (x, y, entities2, radius = 100) => {
    return !entities2.some(
      (entity) => entity.type === ENTITY_TYPES.BASKET && !entity.hidden && Math.sqrt((entity.x - x) ** 2 + (entity.y - y) ** 2) < radius
    );
  };
  const isPathSafeToContainer = (entity, container, entities2) => {
    const dx = container.x - entity.x;
    const dy = container.y - entity.y;
    const pathDistance = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.ceil(pathDistance / 20);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const checkX = entity.x + dx * t;
      const checkY = entity.y + dy * t;
      const basketNearPath = entities2.some(
        (basket) => basket.type === ENTITY_TYPES.BASKET && !basket.hidden && basket.id !== entity.id && Math.sqrt((basket.x - checkX) ** 2 + (basket.y - checkY) ** 2) < 40
      );
      if (basketNearPath) {
        return false;
      }
    }
    return true;
  };
  const canPlaceContainer = (x, y, size, entities2) => {
    return !entities2.some(
      (entity) => entity.type === ENTITY_TYPES.CONTAINER && Math.sqrt((entity.x - x) ** 2 + (entity.y - y) ** 2) < size + entity.size
    );
  };
  const canPlaceBasket = (x, y, size, entities2) => {
    return !entities2.some(
      (entity) => entity.type === ENTITY_TYPES.BASKET && Math.sqrt((entity.x - x) ** 2 + (entity.y - y) ** 2) < size + entity.size + 10
    );
  };
  const updateEntities = (entities2) => {
    const newEntities = [...entities2];
    const toRemove = /* @__PURE__ */ new Set();
    const toAdd = [];
    newEntities.forEach((entity, index) => {
      if (toRemove.has(entity.id) || entity.hidden) return;
      switch (entity.type) {
        case ENTITY_TYPES.PIXEL:
        case ENTITY_TYPES.BUTTON:
          const nearestBasket = findNearestEntity(entity, newEntities, ENTITY_TYPES.BASKET);
          const isInDanger = nearestBasket && getDistance(entity, nearestBasket) < 100;
          if (isInDanger) {
            const nearestContainer2 = findNearestEntity(entity, newEntities, ENTITY_TYPES.CONTAINER);
            if (nearestContainer2) {
              const distanceToContainer = getDistance(entity, nearestContainer2);
              if (distanceToContainer < nearestContainer2.size) {
                entity.hidden = true;
                entity.containerId = nearestContainer2.id;
                nearestContainer2.stored.push({ ...entity });
                toRemove.add(entity.id);
              } else {
                if (isPathSafeToContainer(entity, nearestContainer2, newEntities)) {
                  moveTowards(entity, nearestContainer2, 2);
                } else {
                  moveAway(entity, nearestBasket, 2);
                  const allContainers = newEntities.filter(
                    (e) => e.type === ENTITY_TYPES.CONTAINER && e.id !== nearestContainer2.id && !e.hidden
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
              moveAway(entity, nearestBasket, 2);
            }
          } else {
            if (entity.type === ENTITY_TYPES.BUTTON) {
              const nearestPixel = findNearestEntity(entity, newEntities, ENTITY_TYPES.PIXEL);
              if (nearestPixel && entity.cooldown <= 0) {
                moveTowards(entity, nearestPixel, 0.8);
              }
            }
          }
          break;
        case ENTITY_TYPES.BASKET:
          const nearestContainer = findNearestEntity(entity, newEntities, ENTITY_TYPES.CONTAINER);
          const nearestBasketThreat = findNearestEntity(entity, newEntities, ENTITY_TYPES.BASKET);
          let shouldFlee = false;
          if (nearestContainer && getDistance(entity, nearestContainer) < 60) {
            moveAway(entity, nearestContainer, 1.5);
            shouldFlee = true;
          }
          if (nearestBasketThreat && getDistance(entity, nearestBasketThreat) < 40) {
            moveAway(entity, nearestBasketThreat, 1.2);
            shouldFlee = true;
          }
          if (!shouldFlee) {
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
          if (entity.stored.length > 0) {
            const isSafe = isAreaSafe(entity.x, entity.y, newEntities);
            if (isSafe) {
              if (!entity.releaseTimer) {
                entity.releaseTimer = 0;
              }
              entity.releaseTimer++;
              if (entity.releaseTimer >= 30) {
                const releasedEntity = entity.stored.pop();
                if (releasedEntity) {
                  releasedEntity.hidden = false;
                  releasedEntity.containerId = null;
                  const angle = Math.random() * Math.PI * 2;
                  const distance = entity.size + 25;
                  releasedEntity.x = entity.x + Math.cos(angle) * distance;
                  releasedEntity.y = entity.y + Math.sin(angle) * distance;
                  releasedEntity.x = Math.max(15, Math.min(785, releasedEntity.x));
                  releasedEntity.y = Math.max(15, Math.min(385, releasedEntity.y));
                  releasedEntity.vx = Math.cos(angle) * 1;
                  releasedEntity.vy = Math.sin(angle) * 1;
                  toAdd.push(releasedEntity);
                }
                entity.releaseTimer = 0;
              }
            } else {
              entity.releaseTimer = Math.max(0, entity.releaseTimer - 5);
            }
          }
          if (Math.random() < 5e-3) {
            entity.vx = (Math.random() - 0.5) * 0.5;
            entity.vy = (Math.random() - 0.5) * 0.5;
          }
          break;
      }
      if (!entity.hidden) {
        entity.x += entity.vx * entity.speed;
        entity.y += entity.vy * entity.speed;
        if (entity.x <= 0 || entity.x >= 800 - entity.size) {
          entity.vx *= -1;
          entity.x = Math.max(0, Math.min(800 - entity.size, entity.x));
        }
        if (entity.y <= 0 || entity.y >= 400 - entity.size) {
          entity.vy *= -1;
          entity.y = Math.max(0, Math.min(400 - entity.size, entity.y));
        }
      }
      entity.age++;
      if (entity.type === ENTITY_TYPES.BASKET) {
        newEntities.forEach((other) => {
          if (other.id !== entity.id && (other.type === ENTITY_TYPES.PIXEL || other.type === ENTITY_TYPES.BUTTON) && !other.hidden && getDistance(entity, other) < entity.size + other.size) {
            toRemove.add(other.id);
            entity.collected++;
          }
        });
      }
      if (entity.type === ENTITY_TYPES.BUTTON && entity.cooldown <= 0 && !entity.hidden) {
        const nearbyPixels = newEntities.filter(
          (other) => other.type === ENTITY_TYPES.PIXEL && other.id !== entity.id && !other.hidden && getDistance(entity, other) < 30
        );
        if (nearbyPixels.length > 0) {
          const target = nearbyPixels[0];
          switch (entity.buttonType) {
            case BUTTON_TYPES.COPY:
              const newPixel = createEntity(
                ENTITY_TYPES.PIXEL,
                entity.x + (Math.random() - 0.5) * 40,
                entity.y + (Math.random() - 0.5) * 40
              );
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
      if (Math.random() < 0.01 && !entity.hidden) {
        entity.vx += (Math.random() - 0.5) * 0.3;
        entity.vy += (Math.random() - 0.5) * 0.3;
      }
    });
    const filtered = newEntities.filter((entity) => !toRemove.has(entity.id));
    const result = [...filtered, ...toAdd];
    updateStats(result);
    return result;
  };
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    entities.filter((entity) => !entity.hidden).forEach((entity) => {
      ctx.save();
      ctx.translate(entity.x + entity.size / 2, entity.y + entity.size / 2);
      switch (entity.type) {
        case ENTITY_TYPES.PIXEL:
          ctx.fillStyle = entity.color;
          ctx.fillRect(-entity.size / 2, -entity.size / 2, entity.size, entity.size);
          break;
        case ENTITY_TYPES.BUTTON:
          ctx.strokeStyle = "#4CAF50";
          ctx.lineWidth = 2;
          ctx.strokeRect(-entity.size / 2, -entity.size / 2, entity.size, entity.size);
          ctx.fillStyle = "#4CAF50";
          ctx.font = "8px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const buttonText = entity.buttonType === BUTTON_TYPES.COPY ? "C" : entity.buttonType === BUTTON_TYPES.MOVE ? "M" : entity.buttonType === BUTTON_TYPES.CREATE ? "+" : "D";
          ctx.fillText(buttonText, 0, 0);
          break;
        case ENTITY_TYPES.BASKET:
          ctx.strokeStyle = "#FF9800";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, 0, entity.size / 2, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = "#FF9800";
          ctx.fillRect(-entity.size / 4, -2, entity.size / 2 * (entity.collected / entity.capacity), 4);
          break;
        case ENTITY_TYPES.CONTAINER:
          ctx.strokeStyle = "#2196F3";
          ctx.lineWidth = 2;
          ctx.strokeRect(-entity.size / 2, -entity.size / 2, entity.size, entity.size);
          ctx.fillStyle = "rgba(33, 150, 243, 0.2)";
          ctx.fillRect(-entity.size / 2 + 2, -entity.size / 2 + 2, entity.size - 4, entity.size - 4);
          if (entity.stored.length > 0) {
            ctx.fillStyle = "#2196F3";
            ctx.font = "10px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(entity.stored.length.toString(), 0, 0);
          }
          ctx.strokeStyle = "rgba(33, 150, 243, 0.1)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 0, entity.safeRadius, 0, Math.PI * 2);
          ctx.stroke();
          break;
      }
      ctx.restore();
    });
    if (contextMenu.visible) {
      drawContextMenu(ctx);
    }
  };
  const drawContextMenu = (ctx) => {
    const { x, y, type } = contextMenu;
    const radius = 60;
    const items = type === "add" ? [
      { type: ENTITY_TYPES.PIXEL, color: "#9C27B0", icon: "\u25A0" },
      { type: ENTITY_TYPES.BUTTON, color: "#4CAF50", icon: "B" },
      { type: ENTITY_TYPES.BASKET, color: "#FF9800", icon: "\u25CB" },
      { type: ENTITY_TYPES.CONTAINER, color: "#2196F3", icon: "\u25A1" }
    ] : [
      { type: ENTITY_TYPES.PIXEL, color: "#9C27B0", icon: "\u25A0" },
      { type: ENTITY_TYPES.BUTTON, color: "#4CAF50", icon: "B" },
      { type: ENTITY_TYPES.BASKET, color: "#FF9800", icon: "\u25CB" },
      { type: ENTITY_TYPES.CONTAINER, color: "#2196F3", icon: "\u25A1" }
    ];
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.beginPath();
    ctx.arc(x, y, radius + 10, 0, Math.PI * 2);
    ctx.fill();
    items.forEach((item, index) => {
      const angle = index / items.length * Math.PI * 2 - Math.PI / 2;
      const itemX = x + Math.cos(angle) * radius;
      const itemY = y + Math.sin(angle) * radius;
      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.arc(itemX, itemY, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(item.icon, itemX, itemY);
    });
    ctx.fillStyle = type === "add" ? "#4CAF50" : "#F44336";
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(type === "add" ? "+" : "\xD7", x, y);
  };
  const handleMenuClick = (clientX, clientY) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const clickY = clientY - rect.top;
    const { x, y, type } = contextMenu;
    const distance = Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2);
    if (distance > 80) {
      setContextMenu({ visible: false, x: 0, y: 0, type: "add" });
      return;
    }
    const items = [ENTITY_TYPES.PIXEL, ENTITY_TYPES.BUTTON, ENTITY_TYPES.BASKET, ENTITY_TYPES.CONTAINER];
    const angle = Math.atan2(clickY - y, clickX - x) + Math.PI / 2;
    const normalizedAngle = angle < 0 ? angle + Math.PI * 2 : angle;
    const itemIndex = Math.floor(normalizedAngle / (Math.PI * 2) * items.length);
    if (distance > 20 && distance < 80) {
      if (type === "add") {
        addEntityAt(items[itemIndex], x, y);
      } else {
        removeRandomEntity(items[itemIndex]);
      }
    }
    setContextMenu({ visible: false, x: 0, y: 0, type: "add" });
  };
  const addEntityAt = (type, x, y) => {
    if (type === ENTITY_TYPES.CONTAINER) {
      const tempEntity = createEntity(type, x - 10, y - 10);
      setEntities((prev) => {
        if (canPlaceContainer(tempEntity.x, tempEntity.y, tempEntity.size, prev)) {
          return [...prev, tempEntity];
        } else {
          let placed = false;
          for (let radius = 40; radius <= 100 && !placed; radius += 20) {
            for (let angle = 0; angle < Math.PI * 2 && !placed; angle += Math.PI / 4) {
              const newX = x + Math.cos(angle) * radius;
              const newY = y + Math.sin(angle) * radius;
              if (newX >= 0 && newX <= 770 && newY >= 0 && newY <= 370 && canPlaceContainer(newX, newY, tempEntity.size, prev)) {
                tempEntity.x = newX;
                tempEntity.y = newY;
                placed = true;
                return [...prev, tempEntity];
              }
            }
          }
          return prev;
        }
      });
    } else if (type === ENTITY_TYPES.BASKET) {
      const tempEntity = createEntity(type, x - 10, y - 10);
      setEntities((prev) => {
        if (canPlaceBasket(tempEntity.x, tempEntity.y, tempEntity.size, prev)) {
          return [...prev, tempEntity];
        } else {
          let placed = false;
          for (let radius = 30; radius <= 80 && !placed; radius += 15) {
            for (let angle = 0; angle < Math.PI * 2 && !placed; angle += Math.PI / 6) {
              const newX = x + Math.cos(angle) * radius;
              const newY = y + Math.sin(angle) * radius;
              if (newX >= 0 && newX <= 780 && newY >= 0 && newY <= 380 && canPlaceBasket(newX, newY, tempEntity.size, prev)) {
                tempEntity.x = newX;
                tempEntity.y = newY;
                placed = true;
                return [...prev, tempEntity];
              }
            }
          }
          return prev;
        }
      });
    } else {
      const newEntity = createEntity(type, x - 10, y - 10);
      setEntities((prev) => [...prev, newEntity]);
    }
  };
  const removeRandomEntity = (type) => {
    setEntities((prev) => {
      const entitiesOfType = prev.filter((e) => e.type === type && !e.hidden);
      if (entitiesOfType.length === 0) return prev;
      const randomIndex = Math.floor(Math.random() * entitiesOfType.length);
      const entityToRemove = entitiesOfType[randomIndex];
      return prev.filter((e) => e.id !== entityToRemove.id);
    });
  };
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
    if (holdTime > 200) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setContextMenu({
        visible: true,
        x,
        y,
        type: mouseDown.right ? "remove" : "add"
      });
    }
    setMouseDown({ left: false, right: false, startTime: 0 });
  };
  const handleCanvasClick = (e) => {
    if (contextMenu.visible) {
      handleMenuClick(e.clientX, e.clientY);
    }
  };
  useEffect(() => {
    if (!isRunning) return;
    const gameLoop = setInterval(() => {
      setEntities((prevEntities) => updateEntities(prevEntities));
    }, 50);
    return () => clearInterval(gameLoop);
  }, [isRunning]);
  useEffect(() => {
    draw();
  }, [entities, contextMenu]);
  useEffect(() => {
    initializeEcosystem();
  }, []);
  const tips = [
    "\u{1F3AF} \u0420\u0430\u0437\u043C\u0435\u0449\u0430\u0439\u0442\u0435 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u044B \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0447\u0435\u0441\u043A\u0438 - \u043E\u043D\u0438 \u043E\u0442\u043F\u0443\u0433\u0438\u0432\u0430\u044E\u0442 \u043A\u043E\u0440\u0437\u0438\u043D\u044B \u0432 \u0440\u0430\u0434\u0438\u0443\u0441\u0435 60px",
    "\u{1F3C3} \u041F\u0438\u043A\u0441\u0435\u043B\u0438 \u0438 \u043A\u043D\u043E\u043F\u043A\u0438 \u0443\u043C\u0435\u044E\u0442 \u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u044B\u0439 \u043C\u0430\u0440\u0448\u0440\u0443\u0442 \u043A \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u0430\u043C",
    "\u{1F504} \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043F\u0440\u0430\u0432\u0443\u044E \u043A\u043D\u043E\u043F\u043A\u0443 \u043C\u044B\u0448\u0438 \u0434\u043B\u044F \u0431\u044B\u0441\u0442\u0440\u043E\u0433\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432",
    "\u26A1 \u041A\u043D\u043E\u043F\u043A\u0438 CREATE \u0438\u043C\u0435\u044E\u0442 \u0442\u043E\u043B\u044C\u043A\u043E 10% \u0448\u0430\u043D\u0441 \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u043F\u0438\u043A\u0441\u0435\u043B\u044C \u043F\u0440\u0438 \u0430\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u0438",
    "\u{1F3AD} \u041A\u043E\u0440\u0437\u0438\u043D\u044B \u0431\u043E\u044F\u0442\u0441\u044F \u0434\u0440\u0443\u0433 \u0434\u0440\u0443\u0433\u0430 \u0438 \u043D\u0435 \u043C\u043E\u0433\u0443\u0442 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442\u044C \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043B\u0438\u0437\u043A\u043E",
    "\u{1F512} \u042D\u043B\u0435\u043C\u0435\u043D\u0442\u044B \u0432 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u0430\u0445 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0438\u0441\u0447\u0435\u0437\u0430\u044E\u0442 \u0438 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B \u043E\u0442 \u043A\u043E\u0440\u0437\u0438\u043D",
    "\u{1F3A8} \u041A\u043D\u043E\u043F\u043A\u0438 COPY \u0441\u043E\u0437\u0434\u0430\u044E\u0442 \u043F\u0438\u043A\u0441\u0435\u043B\u0438 \u0442\u043E\u0433\u043E \u0436\u0435 \u0446\u0432\u0435\u0442\u0430, \u0447\u0442\u043E \u0438 \u043E\u0440\u0438\u0433\u0438\u043D\u0430\u043B",
    "\u{1F30A} \u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u043E\u0432, \u0447\u0442\u043E\u0431\u044B \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u044B\u0435 \u0437\u043E\u043D\u044B",
    "\u{1F3AA} \u041A\u043E\u0440\u0437\u0438\u043D\u044B \u0441\u0442\u0430\u0440\u0430\u044E\u0442\u0441\u044F \u0434\u0435\u0440\u0436\u0430\u0442\u044C\u0441\u044F \u043F\u043E\u0434\u0430\u043B\u044C\u0448\u0435 \u043E\u0442 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u043E\u0432",
    "\u{1F3B2} \u041A\u0430\u0436\u0434\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0438\u043C\u0435\u0435\u0442 \u0443\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u0443\u044E \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u0438 \u043F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435",
    "\u{1F527} \u041A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u044B \u0432\u044B\u043F\u0443\u0441\u043A\u0430\u044E\u0442 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B \u043A\u0430\u0436\u0434\u044B\u0435 1.5 \u0441\u0435\u043A\u0443\u043D\u0434\u044B \u0432 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438",
    "\u{1F31F} \u042D\u043A\u043E\u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0441\u0430\u043C\u043E\u0431\u0430\u043B\u0430\u043D\u0441\u0438\u0440\u0443\u0435\u0442\u0441\u044F - \u043D\u0430\u0431\u043B\u044E\u0434\u0430\u0439\u0442\u0435 \u0437\u0430 \u0434\u0438\u043D\u0430\u043C\u0438\u043A\u043E\u0439!"
  ];
  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };
  const addEntity = (type) => {
    if (type === ENTITY_TYPES.CONTAINER) {
      let attempts = 0;
      const maxAttempts = 50;
      setEntities((prev) => {
        while (attempts < maxAttempts) {
          const newEntity = createEntity(type);
          if (canPlaceContainer(newEntity.x, newEntity.y, newEntity.size, prev)) {
            return [...prev, newEntity];
          }
          attempts++;
        }
        return prev;
      });
    } else if (type === ENTITY_TYPES.BASKET) {
      let attempts = 0;
      const maxAttempts = 50;
      setEntities((prev) => {
        while (attempts < maxAttempts) {
          const newEntity = createEntity(type);
          if (canPlaceBasket(newEntity.x, newEntity.y, newEntity.size, prev)) {
            return [...prev, newEntity];
          }
          attempts++;
        }
        return prev;
      });
    } else {
      const newEntity = createEntity(type);
      setEntities((prev) => [...prev, newEntity]);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "w-full h-full bg-gray-900 p-4" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-4xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-2" }, "\u041F\u0438\u043A\u0441\u0435\u043B\u044C\u043D\u0430\u044F \u042D\u043A\u043E\u0441\u0438\u0441\u0442\u0435\u043C\u0430"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-4 mb-4" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setIsRunning(!isRunning),
      className: `px-4 py-2 rounded font-medium ${isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white`
    },
    isRunning ? "\u041F\u0430\u0443\u0437\u0430" : "\u0421\u0442\u0430\u0440\u0442"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: initializeEcosystem,
      className: "px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium"
    },
    "\u0421\u0431\u0440\u043E\u0441"
  )), /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-white mb-2" }, "\u0411\u044B\u0441\u0442\u0440\u043E\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435:"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => addEntity(ENTITY_TYPES.PIXEL),
      className: "px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm"
    },
    "+ \u041F\u0438\u043A\u0441\u0435\u043B\u044C"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => addEntity(ENTITY_TYPES.BUTTON),
      className: "px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
    },
    "+ \u041A\u043D\u043E\u043F\u043A\u0430"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => addEntity(ENTITY_TYPES.BASKET),
      className: "px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm"
    },
    "+ \u041A\u043E\u0440\u0437\u0438\u043D\u0430"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => addEntity(ENTITY_TYPES.CONTAINER),
      className: "px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
    },
    "+ \u041A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440"
  )))), /* @__PURE__ */ React.createElement("div", { className: "bg-gray-800 rounded-lg p-4 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-4 gap-4 text-white text-sm" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-3 h-3 bg-purple-400" }), /* @__PURE__ */ React.createElement("span", null, "\u041F\u0438\u043A\u0441\u0435\u043B\u0438: ", stats.pixels))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-3 h-3 border-2 border-green-400" }), /* @__PURE__ */ React.createElement("span", null, "\u041A\u043D\u043E\u043F\u043A\u0438: ", stats.buttons))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-3 h-3 border-2 border-orange-400 rounded-full" }), /* @__PURE__ */ React.createElement("span", null, "\u041A\u043E\u0440\u0437\u0438\u043D\u044B: ", stats.baskets))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-3 h-3 border-2 border-blue-400" }), /* @__PURE__ */ React.createElement("span", null, "\u041A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u044B: ", stats.containers))))), /* @__PURE__ */ React.createElement("div", { className: "bg-gray-800 rounded-lg p-4" }, /* @__PURE__ */ React.createElement(
    "canvas",
    {
      ref: canvasRef,
      width: 800,
      height: 400,
      className: "border border-gray-600 rounded bg-gray-900 cursor-crosshair",
      onMouseDown: handleCanvasMouseDown,
      onMouseUp: handleCanvasMouseUp,
      onClick: handleCanvasClick,
      onContextMenu: (e) => e.preventDefault()
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "mt-4 text-sm text-gray-300" }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u044D\u043A\u043E\u0441\u0438\u0441\u0442\u0435\u043C\u044B:")), /* @__PURE__ */ React.createElement("ul", { className: "list-disc list-inside mt-2 space-y-1" }, /* @__PURE__ */ React.createElement("li", null, "\u{1F7E3} ", /* @__PURE__ */ React.createElement("strong", null, "\u041F\u0438\u043A\u0441\u0435\u043B\u0438"), " - \u043F\u0440\u044F\u0447\u0443\u0442\u0441\u044F \u0432 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u0430\u0445 \u043F\u0440\u0438 \u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438"), /* @__PURE__ */ React.createElement("li", null, "\u{1F7E9} ", /* @__PURE__ */ React.createElement("strong", null, "\u041A\u043D\u043E\u043F\u043A\u0438"), " - \u043A\u043E\u043F\u0438\u0440\u0443\u044E\u0442 \u043F\u0438\u043A\u0441\u0435\u043B\u0438, \u0438\u0449\u0443\u0442 \u0443\u0431\u0435\u0436\u0438\u0449\u0435 \u0432 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u0430\u0445"), /* @__PURE__ */ React.createElement("li", null, "\u{1F7E0} ", /* @__PURE__ */ React.createElement("strong", null, "\u041A\u043E\u0440\u0437\u0438\u043D\u044B"), " - \u043E\u0445\u043E\u0442\u044F\u0442\u0441\u044F \u0437\u0430 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u043C\u0438, \u043D\u043E \u0431\u043E\u044F\u0442\u0441\u044F \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u043E\u0432"), /* @__PURE__ */ React.createElement("li", null, "\u{1F7E6} ", /* @__PURE__ */ React.createElement("strong", null, "\u041A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u044B"), " - \u043E\u0442\u043F\u0443\u0433\u0438\u0432\u0430\u044E\u0442 \u043A\u043E\u0440\u0437\u0438\u043D\u044B \u0438 \u043C\u0435\u0434\u043B\u0435\u043D\u043D\u043E \u0432\u044B\u043F\u0443\u0441\u043A\u0430\u044E\u0442 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B"), /* @__PURE__ */ React.createElement("li", null, "\u{1F4F1} ", /* @__PURE__ */ React.createElement("strong", null, "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435"), " - \u0437\u0430\u0436\u043C\u0438\u0442\u0435 \u041B\u041A\u041C \u0434\u043B\u044F \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F, \u041F\u041A\u041C \u0434\u043B\u044F \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F")), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-xs text-gray-400" }, /* @__PURE__ */ React.createElement("strong", null, "\u0421\u043E\u0432\u0435\u0442:"), " \u042D\u043B\u0435\u043C\u0435\u043D\u0442\u044B \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0438\u0441\u0447\u0435\u0437\u0430\u044E\u0442 \u0432 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u0430\u0445 \u0438 \u043F\u043E\u044F\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u0433\u0434\u0430 \u043A\u043E\u0440\u0437\u0438\u043D \u043D\u0435\u0442 \u0440\u044F\u0434\u043E\u043C!")), /* @__PURE__ */ React.createElement("div", { className: "mt-4 bg-gray-800 rounded-lg p-4" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-white mb-3" }, "\u{1F4A1} \u0421\u043E\u0432\u0435\u0442\u044B"), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "bg-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-600 transition-colors",
      onClick: nextTip
    },
    /* @__PURE__ */ React.createElement("p", { className: "text-gray-200 text-sm leading-relaxed" }, tips[currentTip]),
    /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-400 mt-2" }, "\u{1F4A1} \u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u0434\u043B\u044F \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0433\u043E \u0441\u043E\u0432\u0435\u0442\u0430 (", currentTip + 1, "/", tips.length, ")")
  ))));
};
var stdin_default = PixelEcosystem;
export {
  stdin_default as default
};
