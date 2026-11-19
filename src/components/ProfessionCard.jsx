import { Link } from 'react-router-dom';
import { ArrowRight, Signal } from 'lucide-react';
import ProfessionIcon from './ProfessionIcon';
import ProgressBar from './ProgressBar';
import { DIFFICULTY } from '../data/professions';

export default function ProfessionCard({ profession, progress, match }) {
  return (
    <article className="card prof-card hoverable">
      <div className="prof-card__head">
        <div className="icon-box"><ProfessionIcon name={profession.icon} /></div>
        <div>
          <h3>{profession.name}</h3>
          <span className="tag">{profession.category}</span>
        </div>
        {match !== undefined && <span className="match-badge">{match}%</span>}
      </div>

      <p className="muted">{profession.description}</p>

      <div className="chips">
        {profession.skills.map((s) => <span key={s} className="chip">{s}</span>)}
      </div>

      <div className="prof-card__meta">
        <span className={`level level--${profession.difficulty}`}>
          <Signal size={14} /> {DIFFICULTY[profession.difficulty]}
        </span>
        <span className="muted small">{profession.salary}</span>
      </div>

      {progress !== undefined && progress > 0 && (
        <div className="prof-card__progress">
          <span className="small muted">Твой прогресс</span>
          <ProgressBar value={progress} showLabel />
        </div>
      )}

      <Link to={`/skills/${profession.id}`} className="btn btn--primary btn--block">
        Открыть карту навыков <ArrowRight size={16} />
      </Link>
    </article>
  );
}
