// Карты навыков. Каждый уровень — это категория (ряд дерева).
// requires — id навыков, которые нужно освоить, чтобы открыть этот навык.
// course — направление в каталоге курсов, где искать подходящие курсы.

export const skillTrees = {
  frontend: [
    {
      category: 'Основы',
      skills: [
        { id: 'html', name: 'HTML', description: 'Разметка страниц: теги, семантика, формы, таблицы и доступность.', requires: [], course: 'Frontend' },
        { id: 'css', name: 'CSS', description: 'Стили, Flexbox, Grid, адаптивная вёрстка и анимации.', requires: [], course: 'Frontend' },
      ],
    },
    {
      category: 'Программирование',
      skills: [
        { id: 'js', name: 'JavaScript', description: 'Переменные, функции, массивы, объекты, DOM и асинхронность.', requires: ['html', 'css'], course: 'Frontend' },
      ],
    },
    {
      category: 'Фреймворки',
      skills: [
        { id: 'react', name: 'React', description: 'Компоненты, props, state, хуки и маршрутизация.', requires: ['js'], course: 'Frontend' },
      ],
    },
    {
      category: 'Инструменты',
      skills: [
        { id: 'git', name: 'Git', description: 'Контроль версий: коммиты, ветки, слияния и GitHub.', requires: ['js'], course: 'Frontend' },
        { id: 'api', name: 'Работа с API', description: 'fetch, JSON, REST-запросы, обработка ошибок и загрузки.', requires: ['react'], course: 'Frontend' },
      ],
    },
    {
      category: 'Практика',
      skills: [
        { id: 'portfolio', name: 'Создание портфолио', description: 'Сайт-портфолио с лучшими работами, опубликованный в интернете.', requires: ['react', 'git'], course: 'Frontend' },
        { id: 'project', name: 'Собственный проект', description: 'Полноценное приложение с API, роутингом и сохранением данных.', requires: ['api', 'git'], course: 'Frontend' },
      ],
    },
  ],

  backend: [
    {
      category: 'Основы',
      skills: [
        { id: 'js', name: 'JavaScript', description: 'Синтаксис языка, функции, объекты, промисы и async/await.', requires: [], course: 'Backend' },
        { id: 'http', name: 'Основы HTTP', description: 'Запросы, ответы, методы, статусы и заголовки.', requires: [], course: 'Backend' },
      ],
    },
    {
      category: 'Серверная разработка',
      skills: [
        { id: 'node', name: 'Node.js', description: 'Серверный JavaScript, модули, npm и Express.', requires: ['js', 'http'], course: 'Backend' },
      ],
    },
    {
      category: 'Данные',
      skills: [
        { id: 'sql', name: 'SQL и базы данных', description: 'Таблицы, связи, запросы SELECT/JOIN, PostgreSQL.', requires: ['node'], course: 'Backend' },
        { id: 'rest', name: 'REST API', description: 'Проектирование API, CRUD-операции, валидация данных.', requires: ['node'], course: 'Backend' },
      ],
    },
    {
      category: 'Инструменты',
      skills: [
        { id: 'auth', name: 'Авторизация', description: 'Регистрация, хеширование паролей, JWT и сессии.', requires: ['rest', 'sql'], course: 'Backend' },
        { id: 'git', name: 'Git', description: 'Ветки, pull request, работа в команде.', requires: ['node'], course: 'Backend' },
      ],
    },
    {
      category: 'Практика',
      skills: [
        { id: 'docker', name: 'Docker и деплой', description: 'Контейнеры и публикация сервера в облаке.', requires: ['auth', 'git'], course: 'Backend' },
        { id: 'project', name: 'Собственный API-сервис', description: 'Готовый backend с БД, авторизацией и документацией.', requires: ['auth'], course: 'Backend' },
      ],
    },
  ],

  fullstack: [
    {
      category: 'Основы',
      skills: [
        { id: 'html', name: 'HTML и CSS', description: 'Вёрстка страниц, Flexbox, Grid и адаптивность.', requires: [], course: 'Frontend' },
        { id: 'js', name: 'JavaScript', description: 'Язык, DOM, асинхронность и модули.', requires: [], course: 'Frontend' },
      ],
    },
    {
      category: 'Frontend',
      skills: [
        { id: 'react', name: 'React', description: 'Компоненты, хуки, роутинг, состояние приложения.', requires: ['html', 'js'], course: 'Frontend' },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { id: 'node', name: 'Node.js + Express', description: 'Сервер, маршруты, middleware.', requires: ['js'], course: 'Backend' },
        { id: 'sql', name: 'Базы данных', description: 'SQL, PostgreSQL, моделирование данных.', requires: ['js'], course: 'Backend' },
      ],
    },
    {
      category: 'Интеграция',
      skills: [
        { id: 'api', name: 'Связка фронта и API', description: 'Запросы с клиента к своему серверу, авторизация.', requires: ['react', 'sql'], course: 'Backend' },
        { id: 'git', name: 'Git', description: 'Контроль версий и работа в команде.', requires: ['react'], course: 'Frontend' },
      ],
    },
    {
      category: 'Практика',
      skills: [
        { id: 'deploy', name: 'Деплой', description: 'Публикация клиента и сервера, домены, переменные окружения.', requires: ['api', 'git'], course: 'Backend' },
        { id: 'project', name: 'Fullstack-проект', description: 'Приложение «под ключ» от интерфейса до БД.', requires: ['api', 'git'], course: 'Backend' },
      ],
    },
  ],

  python: [
    {
      category: 'Основы',
      skills: [
        { id: 'syntax', name: 'Синтаксис Python', description: 'Переменные, условия, циклы, функции.', requires: [], course: 'Backend' },
      ],
    },
    {
      category: 'Программирование',
      skills: [
        { id: 'data', name: 'Структуры данных', description: 'Списки, словари, множества, кортежи.', requires: ['syntax'], course: 'Backend' },
        { id: 'oop', name: 'ООП', description: 'Классы, объекты, наследование, инкапсуляция.', requires: ['syntax'], course: 'Backend' },
      ],
    },
    {
      category: 'Фреймворки',
      skills: [
        { id: 'web', name: 'Django / FastAPI', description: 'Веб-приложения и API на Python.', requires: ['oop', 'data'], course: 'Backend' },
        { id: 'auto', name: 'Автоматизация', description: 'Скрипты, работа с файлами, парсинг, боты.', requires: ['data'], course: 'Backend' },
      ],
    },
    {
      category: 'Инструменты',
      skills: [
        { id: 'sql', name: 'SQL', description: 'Базы данных и ORM.', requires: ['web'], course: 'Backend' },
        { id: 'git', name: 'Git', description: 'Контроль версий и GitHub.', requires: ['oop'], course: 'Backend' },
      ],
    },
    {
      category: 'Практика',
      skills: [
        { id: 'project', name: 'Собственный проект', description: 'Telegram-бот или веб-сервис с базой данных.', requires: ['sql', 'git', 'auto'], course: 'Backend' },
      ],
    },
  ],

  uiux: [
    {
      category: 'Основы',
      skills: [
        { id: 'composition', name: 'Композиция и сетки', description: 'Баланс, выравнивание, модульные сетки.', requires: [], course: 'Design' },
        { id: 'typo', name: 'Типографика и цвет', description: 'Шрифтовые пары, иерархия, палитры, контраст.', requires: [], course: 'Design' },
      ],
    },
    {
      category: 'Инструменты',
      skills: [
        { id: 'figma', name: 'Figma', description: 'Фреймы, auto layout, компоненты и стили.', requires: ['composition', 'typo'], course: 'Design' },
      ],
    },
    {
      category: 'UX',
      skills: [
        { id: 'research', name: 'UX-исследования', description: 'Интервью, персоны, CJM, юзабилити-тесты.', requires: ['figma'], course: 'Design' },
        { id: 'proto', name: 'Прототипирование', description: 'Wireframes и интерактивные прототипы.', requires: ['figma'], course: 'Design' },
      ],
    },
    {
      category: 'Системы',
      skills: [
        { id: 'ds', name: 'Дизайн-система', description: 'UI-кит, токены, документация компонентов.', requires: ['proto'], course: 'Design' },
      ],
    },
    {
      category: 'Практика',
      skills: [
        { id: 'case', name: 'Кейс в портфолио', description: 'Полный кейс: от исследования до финального UI.', requires: ['research', 'ds'], course: 'Design' },
      ],
    },
  ],

  graphic: [
    {
      category: 'Основы',
      skills: [
        { id: 'composition', name: 'Композиция', description: 'Построение изображения, баланс и ритм.', requires: [], course: 'Design' },
        { id: 'color', name: 'Цветоведение', description: 'Цветовой круг, гармонии, психология цвета.', requires: [], course: 'Design' },
      ],
    },
    {
      category: 'Типографика',
      skills: [
        { id: 'typo', name: 'Типографика', description: 'Шрифты, кернинг, иерархия текста.', requires: ['composition'], course: 'Design' },
      ],
    },
    {
      category: 'Инструменты',
      skills: [
        { id: 'ps', name: 'Photoshop', description: 'Растровая графика, ретушь, коллажи.', requires: ['color'], course: 'Design' },
        { id: 'ai', name: 'Illustrator', description: 'Векторная графика, иконки, иллюстрации.', requires: ['typo', 'color'], course: 'Design' },
      ],
    },
    {
      category: 'Брендинг',
      skills: [
        { id: 'logo', name: 'Логотип и айдентика', description: 'Знак, фирменный стиль, брендбук.', requires: ['ai'], course: 'Design' },
      ],
    },
    {
      category: 'Практика',
      skills: [
        { id: 'portfolio', name: 'Портфолио', description: 'Подборка лучших работ на Behance.', requires: ['logo', 'ps'], course: 'Design' },
      ],
    },
  ],

  motion: [
    {
      category: 'Основы',
      skills: [
        { id: 'principles', name: '12 принципов анимации', description: 'Тайминг, сжатие и растяжение, упреждение.', requires: [], course: 'Motion Design' },
        { id: 'graphic', name: 'Основы графдизайна', description: 'Композиция, цвет и типографика для кадра.', requires: [], course: 'Design' },
      ],
    },
    {
      category: 'Инструменты',
      skills: [
        { id: 'ae', name: 'After Effects', description: 'Слои, ключевые кадры, маски, графики скорости.', requires: ['principles', 'graphic'], course: 'Motion Design' },
      ],
    },
    {
      category: 'Продвинутое',
      skills: [
        { id: 'kinetic', name: 'Кинетическая типографика', description: 'Анимированный текст и титры.', requires: ['ae'], course: 'Motion Design' },
        { id: 'char', name: 'Анимация персонажей', description: 'Риггинг и движение персонажей.', requires: ['ae'], course: 'Motion Design' },
      ],
    },
    {
      category: 'Постпродакшн',
      skills: [
        { id: 'edit', name: 'Монтаж и звук', description: 'Premiere Pro / DaVinci, синхронизация со звуком.', requires: ['kinetic'], course: 'Motion Design' },
      ],
    },
    {
      category: 'Практика',
      skills: [
        { id: 'reel', name: 'Шоурил', description: 'Видео-портфолио на 30–60 секунд.', requires: ['edit', 'char'], course: 'Motion Design' },
      ],
    },
  ],

  '3d': [
    {
      category: 'Основы',
      skills: [
        { id: 'blender', name: 'Интерфейс Blender', description: 'Навигация, объекты, трансформации.', requires: [], course: '3D' },
      ],
    },
    {
      category: 'Моделирование',
      skills: [
        { id: 'hard', name: 'Hard-surface', description: 'Моделирование техники и предметов.', requires: ['blender'], course: '3D' },
        { id: 'sculpt', name: 'Скульптинг', description: 'Органические формы и персонажи.', requires: ['blender'], course: '3D' },
      ],
    },
    {
      category: 'Материалы',
      skills: [
        { id: 'uv', name: 'UV и текстуры', description: 'Развёртка, PBR-материалы, Substance.', requires: ['hard'], course: '3D' },
      ],
    },
    {
      category: 'Визуализация',
      skills: [
        { id: 'light', name: 'Свет и рендер', description: 'Освещение, камеры, Cycles и Eevee.', requires: ['uv'], course: '3D' },
        { id: 'anim', name: '3D-анимация', description: 'Ключи, риг, простая анимация.', requires: ['sculpt'], course: '3D' },
      ],
    },
    {
      category: 'Практика',
      skills: [
        { id: 'scene', name: 'Готовая сцена', description: 'Законченная 3D-сцена для портфолио на ArtStation.', requires: ['light', 'anim'], course: '3D' },
      ],
    },
  ],

  data: [
    {
      category: 'Основы',
      skills: [
        { id: 'excel', name: 'Excel / Google Sheets', description: 'Формулы, сводные таблицы, фильтры.', requires: [], course: 'Analytics' },
        { id: 'math', name: 'Статистика', description: 'Среднее, медиана, распределения, корреляция.', requires: [], course: 'Analytics' },
      ],
    },
    {
      category: 'Данные',
      skills: [
        { id: 'sql', name: 'SQL', description: 'Выборки, JOIN, группировки, оконные функции.', requires: ['excel'], course: 'Analytics' },
      ],
    },
    {
      category: 'Программирование',
      skills: [
        { id: 'python', name: 'Python + pandas', description: 'Обработка и очистка данных в коде.', requires: ['sql', 'math'], course: 'Analytics' },
      ],
    },
    {
      category: 'Визуализация',
      skills: [
        { id: 'viz', name: 'Визуализация', description: 'Графики в matplotlib и seaborn.', requires: ['python'], course: 'Analytics' },
        { id: 'bi', name: 'BI-системы', description: 'Дашборды в Power BI / DataLens.', requires: ['sql'], course: 'Analytics' },
      ],
    },
    {
      category: 'Практика',
      skills: [
        { id: 'project', name: 'Аналитический проект', description: 'Исследование реального датасета с выводами.', requires: ['viz', 'bi'], course: 'Analytics' },
      ],
    },
  ],

  devops: [
    {
      category: 'Основы',
      skills: [
        { id: 'linux', name: 'Linux', description: 'Терминал, файлы, права, процессы.', requires: [], course: 'Backend' },
        { id: 'net', name: 'Сети', description: 'IP, DNS, HTTP, порты, SSH.', requires: [], course: 'Backend' },
      ],
    },
    {
      category: 'Скрипты',
      skills: [
        { id: 'bash', name: 'Bash / Python', description: 'Автоматизация рутинных задач.', requires: ['linux'], course: 'Backend' },
      ],
    },
    {
      category: 'Контейнеры',
      skills: [
        { id: 'docker', name: 'Docker', description: 'Образы, контейнеры, docker-compose.', requires: ['bash', 'net'], course: 'Backend' },
        { id: 'git', name: 'Git', description: 'Ветки и работа с репозиториями.', requires: ['bash'], course: 'Backend' },
      ],
    },
    {
      category: 'Автоматизация',
      skills: [
        { id: 'cicd', name: 'CI/CD', description: 'GitHub Actions, автосборка и тесты.', requires: ['docker', 'git'], course: 'Backend' },
      ],
    },
    {
      category: 'Практика',
      skills: [
        { id: 'cloud', name: 'Облако и мониторинг', description: 'Развёртывание в облаке, логи, метрики.', requires: ['cicd'], course: 'Backend' },
      ],
    },
  ],

  pm: [
    {
      category: 'Основы',
      skills: [
        { id: 'it', name: 'Как устроена IT-разработка', description: 'Роли в команде, этапы жизни продукта.', requires: [], course: null },
        { id: 'comm', name: 'Коммуникация', description: 'Встречи, переговоры, обратная связь.', requires: [], course: null },
      ],
    },
    {
      category: 'Методологии',
      skills: [
        { id: 'agile', name: 'Agile / Scrum', description: 'Спринты, бэклог, ретроспективы.', requires: ['it'], course: null },
      ],
    },
    {
      category: 'Инструменты',
      skills: [
        { id: 'jira', name: 'Jira / Trello', description: 'Таск-трекеры и доски задач.', requires: ['agile'], course: null },
        { id: 'metrics', name: 'Продуктовые метрики', description: 'Retention, конверсия, базовая аналитика.', requires: ['agile'], course: 'Analytics' },
      ],
    },
    {
      category: 'Управление',
      skills: [
        { id: 'risk', name: 'Риски и сроки', description: 'Планирование, оценка задач, управление рисками.', requires: ['jira', 'comm'], course: null },
      ],
    },
    {
      category: 'Практика',
      skills: [
        { id: 'project', name: 'Провести проект', description: 'Довести командный проект или хакатон до релиза.', requires: ['risk', 'metrics'], course: null },
      ],
    },
  ],
};

// Плоский список навыков профессии
export const getSkills = (professionId) =>
  (skillTrees[professionId] || []).flatMap((level) =>
    level.skills.map((s) => ({ ...s, category: level.category }))
  );
