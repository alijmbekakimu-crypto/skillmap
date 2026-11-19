import { questions, DIRECTIONS } from '../data/questions';
import { professions } from '../data/professions';

const directionIds = Object.keys(DIRECTIONS);

// Максимально возможное количество баллов по каждому направлению
function getMaxScores() {
  const max = Object.fromEntries(directionIds.map((d) => [d, 0]));
  questions.forEach((q) => {
    directionIds.forEach((d) => {
      max[d] += Math.max(...q.options.map((o) => o.scores[d] || 0));
    });
  });
  return max;
}

// answers — массив индексов выбранных вариантов (по порядку вопросов)
export function calculateScores(answers) {
  const scores = Object.fromEntries(directionIds.map((d) => [d, 0]));
  answers.forEach((optionIndex, qIndex) => {
    const option = questions[qIndex]?.options[optionIndex];
    if (!option) return;
    Object.entries(option.scores).forEach(([dir, value]) => {
      scores[dir] += value;
    });
  });

  const max = getMaxScores();
  const percents = Object.fromEntries(
    directionIds.map((d) => [d, max[d] ? Math.round((scores[d] / max[d]) * 100) : 0])
  );
  return { scores, percents };
}

// Направления, отсортированные по проценту
export function getTopDirections(percents) {
  return directionIds
    .map((id) => ({ ...DIRECTIONS[id], percent: percents[id] || 0 }))
    .sort((a, b) => b.percent - a.percent);
}

// Процент совпадения профессии: взвешенное среднее процентов по направлениям.
// Затем нормализуем так, чтобы лучшая профессия была ближе к 100%,
// но значения оставались честными (не больше реального интереса).
export function getProfessionMatches(percents) {
  const results = professions.map((p) => {
    let sum = 0;
    let weightSum = 0;
    directionIds.forEach((d) => {
      const w = p.weights[d] || 0;
      sum += (percents[d] || 0) * w * w; // квадрат веса — главное направление важнее
      weightSum += w * w;
    });
    const match = weightSum ? Math.round(sum / weightSum) : 0;
    return { ...p, match };
  });
  return results.sort((a, b) => b.match - a.match);
}
