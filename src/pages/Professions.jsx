import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { professions, CATEGORIES } from '../data/professions';
import ProfessionCard from '../components/ProfessionCard';
import { useApp } from '../context/AppContext';
import { getProgressPercent } from '../utils/skills';
import { getProfessionMatches } from '../utils/recommendations';

export default function Professions() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Все');
  const { state } = useApp();

  // Если тест пройден — показываем процент совпадения на карточках
  const matchMap = useMemo(() => {
    if (!state.testResult) return {};
    return Object.fromEntries(getProfessionMatches(state.testResult.percents).map((p) => [p.id, p.match]));
  }, [state.testResult]);

  const filtered = professions.filter((p) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.skills.some((s) => s.toLowerCase().includes(q));
    const matchesCategory = category === 'Все' || p.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="page container">
      <div className="page-head">
        <div>
          <h1>Каталог профессий</h1>
          <p className="muted">Изучи направления, требования и открой карту навыков любой профессии.</p>
        </div>
      </div>

      <div className="toolbar">
        <div className="search">
          <Search size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию или навыку: React, Figma, SQL…"
          />
          {query && (
            <button className="icon-btn" onClick={() => setQuery('')} aria-label="Очистить"><X size={16} /></button>
          )}
        </div>
        <div className="tabs">
          {CATEGORIES.map((c) => (
            <button key={c} className={`tab ${category === c ? 'is-active' : ''}`} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card empty">
          <p>Ничего не найдено по запросу «{query}».</p>
          <button className="btn btn--ghost" onClick={() => { setQuery(''); setCategory('Все'); }}>Сбросить фильтры</button>
        </div>
      ) : (
        <div className="grid grid--3">
          {filtered.map((p) => (
            <ProfessionCard
              key={p.id}
              profession={p}
              match={matchMap[p.id]}
              progress={getProgressPercent(p.id, state.progress[p.id])}
            />
          ))}
        </div>
      )}
    </div>
  );
}
