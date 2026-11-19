import { createContext, useContext, useEffect, useState } from 'react';
import { loadState, saveState, clearState, defaultState } from '../utils/storage';
import { getDependents, getProgressPercent } from '../utils/skills';
import { getSkills } from '../data/skills';
import { getProfession } from '../data/professions';

const AppContext = createContext(null);

// Добавляет достижение, если его ещё нет
function withAchievement(state, id, title) {
  if (state.achievements.some((a) => a.id === id)) return state;
  return {
    ...state,
    achievements: [{ id, title, date: new Date().toISOString() }, ...state.achievements],
  };
}

export function AppProvider({ children }) {
  const [state, setState] = useState(loadState);

  // Сохраняем в LocalStorage при каждом изменении
  useEffect(() => {
    saveState(state);
  }, [state]);

  const saveTestResult = (result) => {
    setState((prev) =>
      withAchievement(
        { ...prev, testResult: { ...result, date: new Date().toISOString() } },
        'test',
        'Пройден тест профориентации'
      )
    );
  };

  const selectProfession = (professionId) => {
    setState((prev) => {
      const name = getProfession(professionId)?.name || professionId;
      return withAchievement(
        { ...prev, selectedProfession: professionId },
        `choose-${professionId}`,
        `Выбрана профессия: ${name}`
      );
    });
  };

  // Отметить / снять отметку «Освоен»
  const toggleSkill = (professionId, skillId) => {
    setState((prev) => {
      const current = prev.progress[professionId] || [];
      let next;
      if (current.includes(skillId)) {
        // снимаем отметку и со всех зависимых навыков
        const dependents = getDependents(professionId, skillId);
        next = current.filter((id) => id !== skillId && !dependents.includes(id));
      } else {
        next = [...current, skillId];
      }

      let newState = {
        ...prev,
        progress: { ...prev.progress, [professionId]: next },
        lastSkill: { professionId, skillId },
      };

      if (!current.includes(skillId)) {
        const skill = getSkills(professionId).find((s) => s.id === skillId);
        const prof = getProfession(professionId);
        newState = withAchievement(newState, 'first-skill', 'Освоен первый навык');
        newState = withAchievement(
          newState,
          `skill-${professionId}-${skillId}`,
          `Освоен навык «${skill?.name}» (${prof?.name})`
        );
        const percent = getProgressPercent(professionId, next);
        if (percent >= 50) newState = withAchievement(newState, `half-${professionId}`, `${prof?.name}: пройдено 50% карты`);
        if (percent === 100) newState = withAchievement(newState, `full-${professionId}`, `${prof?.name}: карта навыков пройдена полностью!`);
      }
      return newState;
    });
  };

  const viewCourse = (courseId) => {
    setState((prev) => ({
      ...prev,
      viewedCourses: [courseId, ...prev.viewedCourses.filter((id) => id !== courseId)].slice(0, 6),
    }));
  };

  const resetAll = () => {
    clearState();
    setState({ ...defaultState });
  };

  const value = { state, saveTestResult, selectProfession, toggleSkill, viewCourse, resetAll };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
