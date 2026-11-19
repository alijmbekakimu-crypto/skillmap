// weights — насколько профессия связана с каждым направлением теста (0..1)
export const CATEGORIES = ['Все', 'Разработка', 'Дизайн', 'Аналитика', 'Инженерия', 'Менеджмент'];

export const DIFFICULTY = {
  1: 'Начальный',
  2: 'Средний',
  3: 'Продвинутый',
};

export const professions = [
  {
    id: 'frontend',
    name: 'Frontend-разработчик',
    category: 'Разработка',
    icon: 'Monitor',
    difficulty: 1,
    salary: 'от 60 000 сом',
    description:
      'Создаёт внешнюю часть сайтов и веб-приложений: то, что пользователь видит и с чем взаимодействует в браузере.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'REST API'],
    weights: { programming: 1, design: 0.5, analytics: 0.1, engineering: 0.2, management: 0.1 },
  },
  {
    id: 'backend',
    name: 'Backend-разработчик',
    category: 'Разработка',
    icon: 'Server',
    difficulty: 2,
    salary: 'от 70 000 сом',
    description:
      'Разрабатывает серверную логику, базы данных и API — всё, что работает «под капотом» приложения.',
    skills: ['Node.js', 'SQL', 'REST API', 'Авторизация', 'Docker', 'Git'],
    weights: { programming: 1, design: 0, analytics: 0.3, engineering: 0.6, management: 0.1 },
  },
  {
    id: 'fullstack',
    name: 'Fullstack-разработчик',
    category: 'Разработка',
    icon: 'Layers',
    difficulty: 3,
    salary: 'от 90 000 сом',
    description:
      'Совмещает frontend и backend: может в одиночку собрать полноценное веб-приложение от интерфейса до базы данных.',
    skills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'Деплой'],
    weights: { programming: 1, design: 0.3, analytics: 0.2, engineering: 0.5, management: 0.2 },
  },
  {
    id: 'python',
    name: 'Python-разработчик',
    category: 'Разработка',
    icon: 'Code2',
    difficulty: 2,
    salary: 'от 70 000 сом',
    description:
      'Пишет программы на Python: веб-сервисы, ботов, скрипты автоматизации и инструменты для работы с данными.',
    skills: ['Python', 'ООП', 'Django / FastAPI', 'SQL', 'Git', 'Автоматизация'],
    weights: { programming: 1, design: 0, analytics: 0.5, engineering: 0.4, management: 0 },
  },
  {
    id: 'uiux',
    name: 'UI/UX-дизайнер',
    category: 'Дизайн',
    icon: 'PenTool',
    difficulty: 1,
    salary: 'от 55 000 сом',
    description:
      'Проектирует удобные и красивые интерфейсы: исследует пользователей, создаёт прототипы и дизайн-системы.',
    skills: ['Figma', 'Композиция', 'Типографика', 'Прототипирование', 'UX-исследования'],
    weights: { programming: 0.2, design: 1, analytics: 0.4, engineering: 0, management: 0.3 },
  },
  {
    id: 'graphic',
    name: 'Графический дизайнер',
    category: 'Дизайн',
    icon: 'Palette',
    difficulty: 1,
    salary: 'от 40 000 сом',
    description:
      'Создаёт визуальные материалы: логотипы, фирменный стиль, баннеры, упаковку и иллюстрации.',
    skills: ['Композиция', 'Цвет', 'Типографика', 'Photoshop', 'Illustrator', 'Брендинг'],
    weights: { programming: 0, design: 1, analytics: 0.1, engineering: 0, management: 0.2 },
  },
  {
    id: 'motion',
    name: 'Motion Designer',
    category: 'Дизайн',
    icon: 'Clapperboard',
    difficulty: 2,
    salary: 'от 50 000 сом',
    description:
      'Оживляет графику: делает анимацию для рекламы, интерфейсов, видео и соцсетей.',
    skills: ['Основы анимации', 'After Effects', 'Тайминг', 'Монтаж', 'Звук'],
    weights: { programming: 0.1, design: 1, analytics: 0, engineering: 0.2, management: 0.1 },
  },
  {
    id: '3d',
    name: '3D-художник',
    category: 'Дизайн',
    icon: 'Box',
    difficulty: 3,
    salary: 'от 55 000 сом',
    description:
      'Создаёт трёхмерные модели, сцены и визуализации для игр, кино, рекламы и архитектуры.',
    skills: ['Blender', 'Моделирование', 'Текстуры', 'Освещение', 'Рендер'],
    weights: { programming: 0.1, design: 1, analytics: 0, engineering: 0.5, management: 0 },
  },
  {
    id: 'data',
    name: 'Data Analyst',
    category: 'Аналитика',
    icon: 'BarChart3',
    difficulty: 2,
    salary: 'от 65 000 сом',
    description:
      'Собирает и анализирует данные, находит закономерности и помогает бизнесу принимать решения на основе цифр.',
    skills: ['Excel', 'SQL', 'Статистика', 'Python', 'Визуализация', 'BI-системы'],
    weights: { programming: 0.5, design: 0.2, analytics: 1, engineering: 0.1, management: 0.3 },
  },
  {
    id: 'devops',
    name: 'DevOps-инженер',
    category: 'Инженерия',
    icon: 'Cpu',
    difficulty: 3,
    salary: 'от 90 000 сом',
    description:
      'Настраивает серверы, автоматизирует сборку и развёртывание приложений, следит за стабильностью систем.',
    skills: ['Linux', 'Сети', 'Docker', 'CI/CD', 'Облака', 'Мониторинг'],
    weights: { programming: 0.5, design: 0, analytics: 0.3, engineering: 1, management: 0.1 },
  },
  {
    id: 'pm',
    name: 'Project Manager',
    category: 'Менеджмент',
    icon: 'Users',
    difficulty: 2,
    salary: 'от 60 000 сом',
    description:
      'Управляет IT-проектами: планирует задачи, координирует команду и отвечает за результат в срок.',
    skills: ['Agile / Scrum', 'Планирование', 'Коммуникация', 'Jira', 'Управление рисками'],
    weights: { programming: 0.2, design: 0.2, analytics: 0.4, engineering: 0.1, management: 1 },
  },
];

export const getProfession = (id) => professions.find((p) => p.id === id);
