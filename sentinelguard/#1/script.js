document.addEventListener('DOMContentLoaded', function() {
    // Анимация при загрузке
    const elements = document.querySelectorAll('.stat-card, .panel');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });

    // Инициализация графиков
    initCharts();

    // Остальной ваш код (обработчики событий и т.д.)...
    // Обработка клика по уведомлениям
    const notification = document.querySelector('.notification');
    notification.addEventListener('click', function() {
        // Создаем всплывающее окно с уведомлениями
        const notificationPopup = document.createElement('div');
        notificationPopup.className = 'notification-popup';
        notificationPopup.innerHTML = `
            <div class="popup-header">
                <h3>Новые уведомления (3)</h3>
                <button class="close-btn">&times;</button>
            </div>
            <ul class="notification-list">
                <li class="notification-item critical">
                    <i class="fas fa-skull-crossbones"></i>
                    <div class="notification-content">
                        <div class="notification-title">Критическая угроза</div>
                        <div class="notification-text">Обнаружена попытка взлома сервера</div>
                        <div class="notification-time">2 мин назад</div>
                    </div>
                </li>
                <li class="notification-item warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div class="notification-content">
                        <div class="notification-title">Подозрительная активность</div>
                        <div class="notification-text">Необычный трафик с рабочей станции</div>
                        <div class="notification-time">15 мин назад</div>
                    </div>
                </li>
                <li class="notification-item info">
                    <i class="fas fa-info-circle"></i>
                    <div class="notification-content">
                        <div class="notification-title">Системное обновление</div>
                        <div class="notification-text">Доступно новое обновление безопасности</div>
                        <div class="notification-time">1 час назад</div>
                    </div>
                </li>
            </ul>
            <div class="popup-footer">
                <button class="btn btn-primary">Пометить все как прочитанные</button>
            </div>
        `;
        
        document.body.appendChild(notificationPopup);
        
        // Закрытие по кнопке
        notificationPopup.querySelector('.close-btn').addEventListener('click', function() {
            document.body.removeChild(notificationPopup);
        });
        
        // Закрытие по клику вне окна
        document.addEventListener('click', function outsideClick(e) {
            if (!notificationPopup.contains(e.target) && e.target !== notification) {
                document.body.removeChild(notificationPopup);
                document.removeEventListener('click', outsideClick);
            }
        });
    });
    
    // Обновление данных по кнопке
    const refreshBtn = document.getElementById('refresh-btn');
    refreshBtn.addEventListener('click', function() {
        // Анимация вращения
        refreshBtn.style.transform = 'rotate(360deg)';
        refreshBtn.style.transition = 'transform 0.7s ease';
        
        setTimeout(() => {
            refreshBtn.style.transform = 'rotate(0deg)';
            
            // Имитация обновления данных
            const threatsBlocked = document.querySelector('.stat-card:nth-child(2) .stat-value');
            const currentValue = parseInt(threatsBlocked.textContent.replace(/,/g, ''));
            const randomIncrement = Math.floor(Math.random() * 10) + 1;
            threatsBlocked.textContent = (currentValue + randomIncrement).toLocaleString();
            
            // Анимация обновления
            threatsBlocked.style.transform = 'scale(1.1)';
            threatsBlocked.style.color = 'var(--success)';
            setTimeout(() => {
                threatsBlocked.style.transform = 'scale(1)';
                threatsBlocked.style.color = '';
            }, 500);
            
            // Обновление времени в заголовке
            const now = new Date();
            document.querySelector('.page-title p').textContent = 
                `Последнее обновление: сегодня, ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
            
            // Обновление графиков
            updateCharts();
        }, 1000);
    });
    
    // Переключение временных периодов графика
    const timeButtons = document.querySelectorAll('.btn-group .btn');
    timeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            timeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Обновление графика при переключении периода
            updateCharts();
        });
    });
    
    // Обработка кнопки "Прочитать все"
    document.getElementById('mark-all-read').addEventListener('click', function() {
        const threatIcons = document.querySelectorAll('.threat-icon.critical');
        threatIcons.forEach(icon => {
            icon.classList.remove('critical');
            icon.classList.add('info');
            icon.innerHTML = '<i class="fas fa-check-circle"></i>';
        });
        
        // Обновляем счетчик в сайдбаре
        document.querySelector('.nav-link.active .nav-badge').textContent = '0';
        
        // Всплывающее уведомление
        showToast('Все уведомления помечены как прочитанные');
    });
    
    // Обработка кнопки быстрого действия
    const quickActionBtn = document.getElementById('quick-action-btn');
    quickActionBtn.addEventListener('click', function() {
        // Создаем меню быстрых действий
        const actionMenu = document.createElement('div');
        actionMenu.className = 'action-menu';
        actionMenu.innerHTML = `
            <button class="action-menu-item">
                <i class="fas fa-shield-alt"></i>
                <span>Новое правило защиты</span>
            </button>
            <button class="action-menu-item">
                <i class="fas fa-user-plus"></i>
                <span>Добавить пользователя</span>
            </button>
            <button class="action-menu-item">
                <i class="fas fa-scan"></i>
                <span>Запустить проверку</span>
            </button>
            <button class="action-menu-item">
                <i class="fas fa-file-export"></i>
                <span>Экспорт отчета</span>
            </button>
        `;
        
        document.body.appendChild(actionMenu);
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function outsideClick(e) {
            if (!actionMenu.contains(e.target) && e.target !== quickActionBtn) {
                document.body.removeChild(actionMenu);
                document.removeEventListener('click', outsideClick);
            }
        });
        
        // Обработка выбора пунктов меню
        actionMenu.querySelectorAll('.action-menu-item').forEach(item => {
            item.addEventListener('click', function() {
                showToast(`Действие: "${item.querySelector('span').textContent}"`);
                document.body.removeChild(actionMenu);
            });
        });
    });
    
    // Функция для показа toast-уведомлений
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Удаление toast после анимации
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 3000);
    }
    
    // Имитация обновления данных в реальном времени
    setInterval(() => {
        const activeThreats = document.querySelector('.stat-card:nth-child(3) .stat-value');
        const currentValue = parseInt(activeThreats.textContent);
        const newValue = currentValue + (Math.random() > 0.6 ? 1 : -1);
        
        if (newValue >= 0) {
            activeThreats.textContent = newValue;
            const changeElement = activeThreats.nextElementSibling;
            
            if (newValue > currentValue) {
                changeElement.innerHTML = '<i class="fas fa-arrow-up"></i> 1 новая';
                changeElement.className = 'stat-change negative';
            } else if (newValue < currentValue) {
                changeElement.innerHTML = '<i class="fas fa-arrow-down"></i> 1 меньше';
                changeElement.className = 'stat-change positive';
            }
        }
    }, 5000);
    
    // Анимация для критических элементов
    setInterval(() => {
        const criticalIcon = document.querySelector('.stat-card:nth-child(4) .stat-icon');
        criticalIcon.classList.toggle('pulse');
    }, 2000);
    
    // Обработка кликов по элементам угроз
    document.querySelectorAll('.threat-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.querySelector('i').className.split(' ')[1];
            
            switch(action) {
                case 'fa-search-plus':
                    showToast('Подробная информация об угрозе');
                    break;
                case 'fa-ellipsis-v':
                    // Показываем контекстное меню
                    showContextMenu(this, [
                        { icon: 'fa-ban', text: 'Блокировать источник' },
                        { icon: 'fa-flag', text: 'Пометить как ложное срабатывание' },
                        { icon: 'fa-bell-slash', text: 'Отключить уведомления' }
                    ]);
                    break;
            }
        });
    });
    
    // Функция показа контекстного меню
    function showContextMenu(element, items) {
        const rect = element.getBoundingClientRect();
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        
        let menuHTML = '';
        items.forEach(item => {
            menuHTML += `
                <button class="context-menu-item">
                    <i class="fas ${item.icon}"></i>
                    <span>${item.text}</span>
                </button>
            `;
        });
        
        menu.innerHTML = menuHTML;
        menu.style.top = `${rect.bottom + window.scrollY}px`;
        menu.style.left = `${rect.left + window.scrollX}px`;
        
        document.body.appendChild(menu);
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function outsideClick(e) {
            if (!menu.contains(e.target)) {
                document.body.removeChild(menu);
                document.removeEventListener('click', outsideClick);
            }
        });
        
        // Обработка выбора пунктов меню
        menu.querySelectorAll('.context-menu-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                showToast(`Выбрано: "${item.querySelector('span').textContent}"`);
                document.body.removeChild(menu);
            });
        });
    }
    
    // Обработка клика по профилю пользователя
    document.getElementById('user-profile').addEventListener('click', function(e) {
        e.stopPropagation();
        
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu-popup';
        userMenu.innerHTML = `
            <div class="user-menu-header">
                <div class="user-avatar">SG</div>
                <div class="user-info">
                    <div class="user-name">Security Admin</div>
                    <div class="user-email">admin@sentinelguard.ru</div>
                </div>
            </div>
            <div class="user-menu-items">
                <button class="user-menu-item">
                    <i class="fas fa-user-cog"></i>
                    <span>Настройки профиля</span>
                </button>
                <button class="user-menu-item">
                    <i class="fas fa-moon"></i>
                    <span>Темная тема</span>
                    <div class="toggle-switch">
                        <input type="checkbox" id="theme-switch">
                        <label for="theme-switch"></label>
                    </div>
                </button>
                <button class="user-menu-item">
                    <i class="fas fa-bell"></i>
                    <span>Настройки уведомлений</span>
                </button>
                <button class="user-menu-item">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Выйти</span>
                </button>
            </div>
        `;
        
        const rect = this.getBoundingClientRect();
        userMenu.style.top = `${rect.bottom + window.scrollY + 5}px`;
        userMenu.style.right = `${window.innerWidth - rect.right + window.scrollX}px`;
        
        document.body.appendChild(userMenu);
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function outsideClick(e) {
            if (!userMenu.contains(e.target) && e.target !== this) {
                document.body.removeChild(userMenu);
                document.removeEventListener('click', outsideClick);
            }
        }.bind(this));
        
        // Обработка переключения темы
        userMenu.querySelector('#theme-switch').addEventListener('change', function() {
            document.body.classList.toggle('dark-theme');
            showToast(this.checked ? 'Темная тема включена' : 'Темная тема выключена');
        });
    });

    // Функции для работы с графиками
    let threatChart;

    function initCharts() {
        const ctx = document.createElement('canvas');
        const chartContainer = document.querySelector('.chart-placeholder');
        chartContainer.innerHTML = '';
        chartContainer.appendChild(ctx);
        
        // Создаем график
        threatChart = new Chart(ctx, {
            type: 'line',
            data: getChartData('hour'),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: getComputedStyle(document.body).getPropertyValue('--dark')
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: getComputedStyle(document.body).getPropertyValue('--gray-light')
                        },
                        ticks: {
                            color: getComputedStyle(document.body).getPropertyValue('--gray')
                        }
                    },
                    y: {
                        grid: {
                            color: getComputedStyle(document.body).getPropertyValue('--gray-light')
                        },
                        ticks: {
                            color: getComputedStyle(document.body).getPropertyValue('--gray')
                        },
                        beginAtZero: true
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    function updateCharts() {
        const activePeriod = document.querySelector('.btn-group .btn.active').textContent.toLowerCase();
        threatChart.data = getChartData(activePeriod);
        threatChart.update();
    }

    function getChartData(period) {
        let labels, malwareData, intrusionData, phishingData;
        
        switch(period) {
            case 'день':
            case 'day':
                labels = Array.from({length: 24}, (_, i) => `${i}:00`);
                malwareData = generateRandomData(24, 5, 20);
                intrusionData = generateRandomData(24, 2, 15);
                phishingData = generateRandomData(24, 1, 10);
                break;
            case 'неделя':
            case 'week':
                labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
                malwareData = generateRandomData(7, 10, 50);
                intrusionData = generateRandomData(7, 5, 30);
                phishingData = generateRandomData(7, 2, 20);
                break;
            case 'час':
            case 'hour':
            default:
                labels = Array.from({length: 60}, (_, i) => i);
                malwareData = generateRandomData(60, 0, 10);
                intrusionData = generateRandomData(60, 0, 7);
                phishingData = generateRandomData(60, 0, 5);
        }
        
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Вредоносное ПО',
                    data: malwareData,
                    borderColor: '#ff7675',
                    backgroundColor: 'rgba(255, 118, 117, 0.1)',
                    tension: 0.3,
                    borderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 5
                },
                {
                    label: 'Вторжения',
                    data: intrusionData,
                    borderColor: '#fdcb6e',
                    backgroundColor: 'rgba(253, 203, 110, 0.1)',
                    tension: 0.3,
                    borderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 5
                },
                {
                    label: 'Фишинг',
                    data: phishingData,
                    borderColor: '#6c5ce7',
                    backgroundColor: 'rgba(108, 92, 231, 0.1)',
                    tension: 0.3,
                    borderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 5
                }
            ]
        };
    }

    function generateRandomData(length, min, max) {
        return Array.from({length}, () => Math.floor(Math.random() * (max - min + 1) + min));
    }
});