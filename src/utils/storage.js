// Работа с LocalStorage
const KEY = 'skillmap_state_v1';

export const defaultState = {
  testResult: null, // { scores, percents, answers, date }
  selectedProfession: null, // id профессии
  progress: {}, // { [professionId]: [skillId, ...] }
  achievements: [], // [{ id, title, date }]
  viewedCourses: [], // [courseId, ...] — последние сверху
  lastSkill: null, // { professionId, skillId }
};

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaultState };
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return { ...defaultState };
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // хранилище недоступно — просто работаем без сохранения
  }
}

export function clearState() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
