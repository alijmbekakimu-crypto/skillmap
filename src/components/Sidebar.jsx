import { Link } from 'react-router-dom';
import { X, Check, Lock, BookOpen, Unlock, RotateCcw } from 'lucide-react';
import { STATUS } from '../utils/skills';

// Боковая панель с подробностями о выбранном навыке
export default function Sidebar({ skill, status, allSkills, masteredIds, onToggle, onClose }) {
  if (!skill) {
    return (
      <aside className="card sidebar sidebar--empty">
        <p className="muted">Нажми на любой навык в дереве, чтобы увидеть подробности и отметить его как освоенный.</p>
        <div className="legend">
          <span><i className="dot dot--mastered" /> Освоен</span>
          <span><i className="dot dot--available" /> Доступен</span>
          <span><i className="dot dot--locked" /> Заблокирован</span>
        </div>
      </aside>
    );
  }

  const nameOf = (id) => allSkills.find((s) => s.id === id)?.name || id;
  const unlocks = allSkills.filter((s) => s.requires.includes(skill.id));

  return (
    <aside className="card sidebar">
      <div className="sidebar__head">
        <span className={`status status--${status}`}>{STATUS[status]}</span>
        <button className="icon-btn" onClick={onClose} aria-label="Закрыть"><X size={18} /></button>
      </div>
      <span className="tag">{skill.category}</span>
      <h2>{skill.name}</h2>
      <p className="muted">{skill.description}</p>

      <div className="sidebar__block">
        <h4><Lock size={14} /> Требования для открытия</h4>
        {skill.requires.length === 0 ? (
          <p className="small muted">Нет — навык доступен с самого начала.</p>
        ) : (
          <ul className="req-list">
            {skill.requires.map((id) => (
              <li key={id} className={masteredIds.includes(id) ? 'done' : ''}>
                {masteredIds.includes(id) ? <Check size={14} /> : <Lock size={14} />} {nameOf(id)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {unlocks.length > 0 && (
        <div className="sidebar__block">
          <h4><Unlock size={14} /> Открывает</h4>
          <div className="chips">
            {unlocks.map((s) => <span key={s.id} className="chip">{s.name}</span>)}
          </div>
        </div>
      )}

      <div className="sidebar__actions">
        {status === 'locked' && (
          <button className="btn btn--block" disabled>
            <Lock size={16} /> Сначала освой требования
          </button>
        )}
        {status === 'available' && (
          <button className="btn btn--accent btn--block" onClick={onToggle}>
            <Check size={16} /> Отметить как освоенный
          </button>
        )}
        {status === 'mastered' && (
          <button className="btn btn--ghost btn--block" onClick={onToggle}>
            <RotateCcw size={16} /> Снять отметку
          </button>
        )}
        <Link
          to={skill.course ? `/courses?direction=${encodeURIComponent(skill.course)}` : '/courses'}
          className="btn btn--primary btn--block"
        >
          <BookOpen size={16} /> Подходящие курсы
        </Link>
      </div>
    </aside>
  );
}
