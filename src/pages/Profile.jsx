import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Award, BookOpen, PlayCircle, Target, CheckCircle2, RefreshCw, Trash2, ArrowRight, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { professions, getProfession } from '../data/professions';
import { getSkills } from '../data/skills';
import { getCourse } from '../data/courses';
import { getProgressPercent, getNextSkill } from '../utils/skills';
import { getTopDirections } from '../utils/recommendations';
import { ProgressRing } from '../components/ProgressBar';
import ProgressBar from '../components/ProgressBar';
import ProfessionIcon from '../components/ProfessionIcon';

export default function Profile() {
  const { state, selectProfession, resetAll } = useApp();
  const navigate = useNavigate();
  const profId = state.selectedProfession;
  const profession = getProfession(profId);

  const [confirmReset, setConfirmReset] = useState(false);

  // Сброс в два нажатия (без системного окна confirm)
  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4000);
      return;
    }
    resetAll();
    navigate('/');
  };

  const changeProfession = (e) => {
    if (e.target.value) selectProfession(e.target.value);
  };

  const ProfessionSelect = (
    <label className="select select--wide">
      <span><RefreshCw size={14} /> {profession ? 'Изменить профессию' : 'Выбрать профессию'}</span>
      <select value={profId || ''} onChange={changeProfession}>
        <option value="" disabled>— выбери профессию —</option>
        {professions.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
    </label>
  );

  if (!profession) {
    return (
      <div className="page container">
        <div className="page-head"><h1>Личный кабинет</h1></div>
        <div className="card empty-profile">
          <Target size={40} className="text-accent" />
          <h2>Профессия ещё не выбрана</h2>
          <p className="muted">Пройди тест, чтобы получить рекомендации, или выбери профессию сразу.</p>
          <div className="hero__actions" style={{ justifyContent: 'center' }}>
            <Link to="/test" className="btn btn--primary">Пройти тест</Link>
            <Link to="/professions" className="btn btn--ghost">Каталог профессий</Link>
          </div>
          {ProfessionSelect}
        </div>
      </div>
    );
  }

  const mastered = state.progress[profId] || [];
  const skills = getSkills(profId);
  const masteredCount = skills.filter((s) => mastered.includes(s.id)).length;
  const percent = getProgressPercent(profId, mastered);
  const nextSkill = getNextSkill(profId, mastered);
  const viewed = state.viewedCourses.map(getCourse).filter(Boolean);
  const topDirection = state.testResult ? getTopDirections(state.testResult.percents)[0] : null;

  // Другие профессии, в которых есть прогресс
  const otherProgress = professions
    .filter((p) => p.id !== profId && (state.progress[p.id] || []).length > 0)
    .map((p) => ({ ...p, percent: getProgressPercent(p.id, state.progress[p.id]) }));

  return (
    <div className="page container">
      <div className="page-head">
        <div>
          <h1>Личный кабинет</h1>
          <p className="muted">Твой план развития и прогресс обучения.</p>
        </div>
        <button className="btn btn--ghost btn--sm danger" onClick={handleReset}><Trash2 size={14} /> {confirmReset ? 'Точно сбросить? Нажми ещё раз' : 'Сбросить прогресс'}</button>
      </div>

      <div className="profile-grid">
        <div className="card profile-main">
          <div className="profile-main__info">
            <div className="icon-box icon-box--lg"><ProfessionIcon name={profession.icon} size={28} /></div>
            <div>
              <span className="small muted">Выбранная профессия</span>
              <h2>{profession.name}</h2>
              <span className="tag">{profession.category}</span>
            </div>
          </div>
          {ProfessionSelect}
        </div>

        <div className="card stat-card">
          <ProgressRing value={percent} size={110} stroke={10} label="прогресс" />
          <div>
            <span className="small muted">Общий прогресс</span>
            <h3>{percent}%</h3>
            <Link to={`/skills/${profId}`} className="link">Открыть карту <ArrowRight size={14} /></Link>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon"><CheckCircle2 size={28} /></div>
          <div>
            <span className="small muted">Освоено навыков</span>
            <h3>{masteredCount} <span className="muted">/ {skills.length}</span></h3>
            {topDirection && <span className="small muted">Сильное направление: {topDirection.name}</span>}
          </div>
        </div>
      </div>

      <div className="profile-cols">
        <div className="card">
          <h3 className="card-title"><PlayCircle size={18} /> Продолжить обучение</h3>
          {nextSkill ? (
            <div className="continue">
              <div>
                <span className="tag">{nextSkill.category}</span>
                <h4>{nextSkill.name}</h4>
                <p className="muted small">{nextSkill.description}</p>
              </div>
              <div className="continue__actions">
                <Link to={`/skills/${profId}?skill=${nextSkill.id}`} className="btn btn--primary btn--sm">
                  К навыку <ArrowRight size={14} />
                </Link>
                <Link
                  to={nextSkill.course ? `/courses?direction=${encodeURIComponent(nextSkill.course)}` : '/courses'}
                  className="btn btn--ghost btn--sm"
                >
                  <BookOpen size={14} /> Курсы
                </Link>
              </div>
            </div>
          ) : (
            <p className="muted">🎉 Все навыки освоены! Попробуй изучить смежную профессию.</p>
          )}

          <h3 className="card-title" style={{ marginTop: 28 }}><Clock size={18} /> Последние просмотренные курсы</h3>
          {viewed.length === 0 ? (
            <p className="muted small">
              Пока пусто. <Link to="/courses" className="link">Открой каталог курсов</Link>
            </p>
          ) : (
            <ul className="mini-list">
              {viewed.map((c) => (
                <li key={c.id}>
                  <div>
                    <strong>{c.title}</strong>
                    <span className="small muted">{c.direction} · {c.level} · {c.free ? 'Бесплатно' : 'Платно'}</span>
                  </div>
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="link small">Открыть</a>
                  ) : (
                    <span className="small muted">Ссылка появится позже</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h3 className="card-title"><Award size={18} /> Последние достижения</h3>
          {state.achievements.length === 0 ? (
            <p className="muted small">Достижений пока нет — пройди тест или освой первый навык.</p>
          ) : (
            <ul className="achievements">
              {state.achievements.slice(0, 6).map((a) => (
                <li key={a.id}>
                  <span className="achievements__icon"><Award size={16} /></span>
                  <div>
                    <span>{a.title}</span>
                    <span className="small muted">{new Date(a.date).toLocaleDateString('ru-RU')}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {otherProgress.length > 0 && (
            <>
              <h3 className="card-title" style={{ marginTop: 28 }}>Другие карты навыков</h3>
              <ul className="mini-list">
                {otherProgress.map((p) => (
                  <li key={p.id}>
                    <Link to={`/skills/${p.id}`} className="mini-list__link">
                      <strong>{p.name}</strong>
                      <ProgressBar value={p.percent} showLabel height={6} />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
