import { Link, useNavigate } from 'react-router-dom';
import { RotateCcw, ArrowRight, Trophy, Signal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTopDirections, getProfessionMatches } from '../utils/recommendations';
import ProfessionIcon from '../components/ProfessionIcon';
import { DIFFICULTY } from '../data/professions';

export default function Results() {
  const { state, selectProfession } = useApp();
  const navigate = useNavigate();
  const result = state.testResult;

  if (!result) {
    return (
      <div className="page container empty-state">
        <div className="card">
          <h1>Результатов пока нет</h1>
          <p className="muted">Пройди тест, чтобы получить персональные рекомендации профессий.</p>
          <Link to="/test" className="btn btn--primary">Пройти тест <ArrowRight size={16} /></Link>
        </div>
      </div>
    );
  }

  const directions = getTopDirections(result.percents);
  const top = directions[0];
  const matches = getProfessionMatches(result.percents).slice(0, 4);

  const openSkills = (id) => {
    selectProfession(id);
    navigate(`/skills/${id}`);
  };

  return (
    <div className="page container">
      <div className="page-head">
        <div>
          <h1>Твои результаты</h1>
          <p className="muted">
            Тест пройден {new Date(result.date).toLocaleDateString('ru-RU')}. Больше всего тебе подходит направление{' '}
            <strong style={{ color: top.color }}>«{top.name}»</strong>.
          </p>
        </div>
        <Link to="/test" className="btn btn--ghost"><RotateCcw size={16} /> Пройти заново</Link>
      </div>

      <div className="results-grid">
        <div className="card">
          <h3 className="card-title">Совпадение по направлениям</h3>
          <div className="bars">
            {directions.map((d, i) => (
              <div key={d.id} className="bar-row">
                <div className="bar-row__label">
                  <span>{i === 0 && <Trophy size={14} className="text-accent2" />} {d.name}</span>
                  <strong>{d.percent}%</strong>
                </div>
                <div className="progress__track" style={{ height: 10 }}>
                  <div className="progress__fill" style={{ width: `${d.percent}%`, background: d.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card chart-card">
          <h3 className="card-title">Профиль интересов</h3>
          <RadarChart directions={directions} />
        </div>
      </div>

      <h2 className="section__title" style={{ marginTop: 40 }}>Рекомендованные профессии</h2>
      <div className="grid grid--2">
        {matches.map((p, i) => (
          <div key={p.id} className={`card rec-card hoverable ${i === 0 ? 'rec-card--best' : ''}`}>
            {i === 0 && <span className="rec-card__badge">Лучшее совпадение</span>}
            <div className="prof-card__head">
              <div className="icon-box"><ProfessionIcon name={p.icon} /></div>
              <div>
                <h3>{p.name}</h3>
                <span className="tag">{p.category}</span>
              </div>
              <span className="match-badge">{p.match}%</span>
            </div>
            <p className="muted">{p.description}</p>
            <div className="prof-card__meta">
              <span className={`level level--${p.difficulty}`}><Signal size={14} /> {DIFFICULTY[p.difficulty]}</span>
            </div>
            <button className="btn btn--primary btn--block" onClick={() => openSkills(p.id)}>
              Посмотреть навыки <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Простая радарная диаграмма на SVG
function RadarChart({ directions }) {
  const size = 260;
  const c = size / 2;
  const r = 95;
  const order = ['programming', 'design', 'analytics', 'engineering', 'management'];
  const items = order.map((id) => directions.find((d) => d.id === id));
  const point = (i, value) => {
    const angle = (Math.PI * 2 * i) / items.length - Math.PI / 2;
    return [c + Math.cos(angle) * r * value, c + Math.sin(angle) * r * value];
  };
  const polygon = items.map((d, i) => point(i, d.percent / 100).join(',')).join(' ');

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="radar">
      {[0.25, 0.5, 0.75, 1].map((k) => (
        <polygon
          key={k}
          points={items.map((_, i) => point(i, k).join(',')).join(' ')}
          fill="none"
          stroke="#2c3148"
        />
      ))}
      {items.map((_, i) => {
        const [x, y] = point(i, 1);
        return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="#2c3148" />;
      })}
      <polygon points={polygon} fill="rgba(130,103,245,.35)" stroke="#8267F5" strokeWidth="2" />
      {items.map((d, i) => {
        const [x, y] = point(i, d.percent / 100);
        const [lx, ly] = point(i, 1.22);
        return (
          <g key={d.id}>
            <circle cx={x} cy={y} r="4" fill={d.color} />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="radar__label">
              {d.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
