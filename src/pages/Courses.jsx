import { useSearchParams } from 'react-router-dom';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { courses, COURSE_DIRECTIONS, COURSE_LEVELS } from '../data/courses';
import CourseCard from '../components/CourseCard';
import { useApp } from '../context/AppContext';

const PRICES = [
  { id: 'all', label: 'Любая' },
  { id: 'free', label: 'Бесплатные' },
  { id: 'paid', label: 'Платные' },
];

export default function Courses() {
  // Фильтры хранятся в адресной строке — так на курсы можно перейти со страницы навыка
  const [params, setParams] = useSearchParams();
  const direction = params.get('direction') || 'all';
  const level = params.get('level') || 'all';
  const price = params.get('price') || 'all';
  const query = params.get('q') || '';
  const { viewCourse } = useApp();

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const filtered = courses.filter((c) => {
    const q = query.trim().toLowerCase();
    return (
      (direction === 'all' || c.direction === direction) &&
      (level === 'all' || c.level === level) &&
      (price === 'all' || (price === 'free' ? c.free : !c.free)) &&
      (!q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
    );
  });

  const hasFilters = direction !== 'all' || level !== 'all' || price !== 'all' || query;

  return (
    <div className="page container">
      <div className="page-head">
        <div>
          <h1>Каталог курсов</h1>
          <p className="muted">
            Курсы по направлениям. Карточки с пометкой «демо» — примеры, ссылки на них появятся позже.
          </p>
        </div>
      </div>

      <div className="tabs tabs--scroll">
        <button className={`tab ${direction === 'all' ? 'is-active' : ''}`} onClick={() => setFilter('direction', 'all')}>
          Все направления
        </button>
        {COURSE_DIRECTIONS.map((d) => (
          <button key={d} className={`tab ${direction === d ? 'is-active' : ''}`} onClick={() => setFilter('direction', d)}>
            {d}
          </button>
        ))}
      </div>

      <div className="card filters">
        <SlidersHorizontal size={18} className="muted" />
        <div className="search search--flat">
          <Search size={16} />
          <input value={query} onChange={(e) => setFilter('q', e.target.value)} placeholder="Поиск курса…" />
        </div>
        <label className="select">
          <span>Уровень</span>
          <select value={level} onChange={(e) => setFilter('level', e.target.value)}>
            <option value="all">Любой</option>
            {COURSE_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </label>
        <label className="select">
          <span>Стоимость</span>
          <select value={price} onChange={(e) => setFilter('price', e.target.value)}>
            {PRICES.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        </label>
        {hasFilters && (
          <button className="btn btn--ghost btn--sm" onClick={() => setParams({}, { replace: true })}>
            <X size={14} /> Сбросить
          </button>
        )}
      </div>

      <p className="small muted results-count">Найдено курсов: {filtered.length}</p>

      {filtered.length === 0 ? (
        <div className="card empty">
          <p>По выбранным фильтрам курсов нет.</p>
          <button className="btn btn--ghost" onClick={() => setParams({}, { replace: true })}>Сбросить фильтры</button>
        </div>
      ) : (
        <div className="grid grid--3">
          {filtered.map((c) => <CourseCard key={c.id} course={c} onOpen={viewCourse} />)}
        </div>
      )}
    </div>
  );
}
