import { getSkills } from '../data/skills';

// Статусы навыков
export const STATUS = {
  mastered: 'Освоен',
  available: 'Доступен',
  locked: 'Заблокирован',
};

export function getSkillStatus(skill, masteredIds) {
  if (masteredIds.includes(skill.id)) return 'mastered';
  const ready = skill.requires.every((r) => masteredIds.includes(r));
  return ready ? 'available' : 'locked';
}

export function getProgressPercent(professionId, masteredIds = []) {
  const skills = getSkills(professionId);
  if (!skills.length) return 0;
  const count = skills.filter((s) => masteredIds.includes(s.id)).length;
  return Math.round((count / skills.length) * 100);
}

// Все навыки, которые зависят (прямо или косвенно) от данного
export function getDependents(professionId, skillId) {
  const skills = getSkills(professionId);
  const result = new Set();
  const walk = (id) => {
    skills.forEach((s) => {
      if (s.requires.includes(id) && !result.has(s.id)) {
        result.add(s.id);
        walk(s.id);
      }
    });
  };
  walk(skillId);
  return [...result];
}

// Следующий доступный (ещё не освоенный) навык — для «Продолжить обучение»
export function getNextSkill(professionId, masteredIds = []) {
  return getSkills(professionId).find((s) => getSkillStatus(s, masteredIds) === 'available') || null;
}
