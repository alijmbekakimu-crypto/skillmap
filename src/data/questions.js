// Направления, по которым считаются баллы теста
export const DIRECTIONS = {
  programming: { id: 'programming', name: 'Программирование', color: '#8267F5' },
  design: { id: 'design', name: 'Дизайн', color: '#F5679B' },
  analytics: { id: 'analytics', name: 'Аналитика', color: '#35C9A1' },
  engineering: { id: 'engineering', name: 'Инженерия', color: '#F5A867' },
  management: { id: 'management', name: 'Менеджмент', color: '#67B4F5' },
};

// Каждый вариант ответа добавляет баллы в одно или несколько направлений
export const questions = [
  {
    id: 1,
    text: 'Чем тебе больше всего нравится заниматься в свободное время?',
    options: [
      { text: 'Разбираться, как устроены программы и сайты', scores: { programming: 3 } },
      { text: 'Рисовать, монтировать видео, делать красивые вещи', scores: { design: 3 } },
      { text: 'Решать головоломки и искать закономерности', scores: { analytics: 3 } },
      { text: 'Собирать, чинить, что-то конструировать', scores: { engineering: 3 } },
      { text: 'Организовывать друзей и придумывать мероприятия', scores: { management: 3 } },
    ],
  },
  {
    id: 2,
    text: 'Какой школьный предмет даётся тебе легче всего?',
    options: [
      { text: 'Информатика', scores: { programming: 3, engineering: 1 } },
      { text: 'Рисование / черчение', scores: { design: 3, engineering: 1 } },
      { text: 'Математика', scores: { analytics: 3, programming: 1 } },
      { text: 'Физика', scores: { engineering: 3, analytics: 1 } },
      { text: 'Обществознание / экономика', scores: { management: 3, analytics: 1 } },
    ],
  },
  {
    id: 3,
    text: 'В командном проекте ты обычно берёшь на себя…',
    options: [
      { text: 'Техническую часть — пишу код', scores: { programming: 3 } },
      { text: 'Оформление и презентацию', scores: { design: 3 } },
      { text: 'Сбор данных и выводы', scores: { analytics: 3 } },
      { text: 'Сборку и настройку оборудования', scores: { engineering: 3 } },
      { text: 'Распределение задач и контроль сроков', scores: { management: 3 } },
    ],
  },
  {
    id: 4,
    text: 'Что тебя больше радует в результате работы?',
    options: [
      { text: 'Всё работает без ошибок', scores: { programming: 2, engineering: 2 } },
      { text: 'Это выглядит стильно и красиво', scores: { design: 3 } },
      { text: 'Цифры подтвердили мою гипотезу', scores: { analytics: 3 } },
      { text: 'Команда довольна и сдала всё вовремя', scores: { management: 3 } },
    ],
  },
  {
    id: 5,
    text: 'Какое приложение тебе было бы интереснее создать?',
    options: [
      { text: 'Игру или чат-бота', scores: { programming: 3 } },
      { text: 'Красивый сайт-портфолио', scores: { design: 2, programming: 1 } },
      { text: 'Сервис статистики и прогнозов', scores: { analytics: 3 } },
      { text: 'Систему «умного дома»', scores: { engineering: 3, programming: 1 } },
      { text: 'Планировщик задач для команды', scores: { management: 2, programming: 1 } },
    ],
  },
  {
    id: 6,
    text: 'Как ты относишься к долгой работе за компьютером?',
    options: [
      { text: 'Отлично, могу часами писать код', scores: { programming: 3 } },
      { text: 'Нормально, если работаю с графикой', scores: { design: 3 } },
      { text: 'Нормально, если работаю с таблицами и данными', scores: { analytics: 3 } },
      { text: 'Лучше чередовать с работой руками', scores: { engineering: 3 } },
      { text: 'Лучше больше общаться с людьми', scores: { management: 3 } },
    ],
  },
  {
    id: 7,
    text: 'Какой навык ты хотел(а) бы прокачать в первую очередь?',
    options: [
      { text: 'Алгоритмическое мышление', scores: { programming: 3, analytics: 1 } },
      { text: 'Чувство цвета и композиции', scores: { design: 3 } },
      { text: 'Работу со статистикой', scores: { analytics: 3 } },
      { text: 'Проектирование систем', scores: { engineering: 3, programming: 1 } },
      { text: 'Лидерство и переговоры', scores: { management: 3 } },
    ],
  },
  {
    id: 8,
    text: 'Что ты сделаешь, если что-то сломалось?',
    options: [
      { text: 'Поищу ошибку в логах и исправлю', scores: { programming: 3 } },
      { text: 'Разберу устройство и найду проблему', scores: { engineering: 3 } },
      { text: 'Проанализирую, когда и почему это происходит', scores: { analytics: 3 } },
      { text: 'Найду человека, который быстро поможет', scores: { management: 3 } },
    ],
  },
  {
    id: 9,
    text: 'Какой контент ты чаще смотришь?',
    options: [
      { text: 'Туториалы по программированию', scores: { programming: 3 } },
      { text: 'Разборы дизайна, анимации, 3D', scores: { design: 3 } },
      { text: 'Научпоп и инфографику', scores: { analytics: 2, engineering: 1 } },
      { text: 'Про технику и изобретения', scores: { engineering: 3 } },
      { text: 'Про бизнес и успешные стартапы', scores: { management: 3 } },
    ],
  },
  {
    id: 10,
    text: 'Как ты принимаешь важные решения?',
    options: [
      { text: 'Логически, шаг за шагом', scores: { programming: 2, engineering: 1 } },
      { text: 'Доверяю интуиции и ощущениям', scores: { design: 3 } },
      { text: 'Собираю факты и сравниваю цифры', scores: { analytics: 3 } },
      { text: 'Советуюсь и учитываю мнения других', scores: { management: 3 } },
    ],
  },
  {
    id: 11,
    text: 'Какая рабочая среда тебе ближе?',
    options: [
      { text: 'Тихое место, наушники, код', scores: { programming: 3 } },
      { text: 'Креативная студия', scores: { design: 3 } },
      { text: 'Офис с дашбордами и отчётами', scores: { analytics: 3 } },
      { text: 'Лаборатория или серверная', scores: { engineering: 3 } },
      { text: 'Переговорки и встречи', scores: { management: 3 } },
    ],
  },
  {
    id: 12,
    text: 'Что тебе интереснее изучить?',
    options: [
      { text: 'JavaScript и Python', scores: { programming: 3 } },
      { text: 'Figma, After Effects, Blender', scores: { design: 3 } },
      { text: 'Excel, SQL и визуализацию данных', scores: { analytics: 3 } },
      { text: 'Linux, сети и серверы', scores: { engineering: 3, programming: 1 } },
      { text: 'Agile и управление проектами', scores: { management: 3 } },
    ],
  },
  {
    id: 13,
    text: 'Каким ты видишь себя через 5 лет?',
    options: [
      { text: 'Senior-разработчиком', scores: { programming: 3 } },
      { text: 'Арт-директором или дизайнером продукта', scores: { design: 3 } },
      { text: 'Экспертом по данным', scores: { analytics: 3 } },
      { text: 'Инженером сложных систем', scores: { engineering: 3 } },
      { text: 'Руководителем команды или основателем стартапа', scores: { management: 3 } },
    ],
  },
];
