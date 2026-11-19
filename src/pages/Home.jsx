import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ClipboardCheck, GitBranch, BookOpen, TrendingUp, Check, Lock, Circle } from 'lucide-react';
import { ProgressRing } from '../components/ProgressBar';
import { useApp } from '../context/AppContext';

const features = [
  { icon: ClipboardCheck, title: 'Тест профориентации', text: '13 вопросов определят, что тебе ближе: код, дизайн, аналитика, инженерия или менеджмент.' },
  { icon: Compass, title: 'Персональные рекомендации', text: 'Процент совпадения с каждой профессией рассчитывается по твоим ответам.' },
  { icon: GitBranch, title: 'Интерактивная карта навыков', text: 'Дерево навыков показывает, что учить и в каком порядке. Новые навыки открываются по мере прогресса.' },
  { icon: BookOpen, title: 'Каталог курсов', text: 'Подборка курсов по направлениям с фильтрами по уровню и стоимости.' },
];

// Демонстрационные узлы мини-карты
const demo = [
  { name: 'HTML', x: 70, y: 40, s: 'mastered' },
  { name: 'CSS', x: 230, y: 40, s: 'mastered' },
  { name: 'JavaScript', x: 150, y: 130, s: 'mastered' },
  { name: 'React', x: 80, y: 220, s: 'available' },
  { name: 'Git', x: 220, y: 220, s: 'available' },
  { name: 'Портфолио', x: 150, y: 310, s: 'locked' },
];
const demoEdges = [[0, 2], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5]];
const demoIcon = { mastered: Check, available: Circle, locked: Lock };

export default function Home() {
  const { state } = useApp();

  return (
    <div className="page">
      <section className="hero container">
        <div className="hero__text">
          <span className="pill"><TrendingUp size={14} /> Платформа профориентации для старта в IT</span>
          <h1>
            Найди свой путь <br /> в мире <span className="gradient-text">профессий</span>
          </h1>
          <p className="hero__sub">
            SkillMap помогает понять, какая IT-профессия тебе подходит, показывает карту навыков,
            которые нужно освоить, и подбирает курсы для обучения. Весь прогресс сохраняется.
          </p>
          <div className="hero__actions">
            <Link to="/test" className="btn btn--primary btn--lg">
              {state.testResult ? 'Пройти тест заново' : 'Пройти тест'} <ArrowRight size={18} />
            </Link>
            <Link to="/professions" className="btn btn--ghost btn--lg">Исследовать профессии</Link>
          </div>
          <div className="hero__stats">
            <div><strong>11</strong><span>профессий</span></div>
            <div><strong>70+</strong><span>навыков</span></div>
            <div><strong>20</strong><span>курсов</span></div>
          </div>
        </div>

        <div className="card demo">
          <div className="demo__head">
            <div>
              <span className="small muted">Пример карты навыков</span>
              <h3>Frontend-разработчик</h3>
            </div>
            <ProgressRing value={50} size={72} stroke={7} />
          </div>
          <div className="demo__map">
            <svg viewBox="0 0 300 350" className="demo__lines" preserveAspectRatio="none">
              {demoEdges.map(([a, b], i) => {
                const A = demo[a];
                const B = demo[b];
                const done = A.s === 'mastered' && B.s === 'mastered';
                const open = A.s === 'mastered';
                return (
                  <path
                    key={i}
                    d={`M${A.x} ${A.y + 16} C ${A.x} ${(A.y + B.y) / 2}, ${B.x} ${(A.y + B.y) / 2}, ${B.x} ${B.y - 16}`}
                    stroke={done ? '#35C9A1' : open ? '#8267F5' : '#3a3f55'}
                    strokeWidth="2"
                    strokeDasharray={open ? '0' : '5 5'}
                    fill="none"
                  />
                );
              })}
            </svg>
            {demo.map((n) => {
              const Icon = demoIcon[n.s];
              return (
                <div
                  key={n.name}
                  className={`skill-node skill-node--${n.s} demo__node`}
                  style={{ left: `${(n.x / 300) * 100}%`, top: `${(n.y / 350) * 100}%` }}
                >
                  <span className="skill-node__icon"><Icon size={12} /></span>
                  <span className="skill-node__name">{n.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container section">
        <h2 className="section__title">Почему SkillMap</h2>
        <p className="section__sub muted">Всё, что нужно, чтобы выбрать направление и начать двигаться к цели.</p>
        <div className="grid grid--4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card feature hoverable">
              <div className="icon-box"><Icon size={22} /></div>
              <h3>{title}</h3>
              <p className="muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="card cta">
          <div>
            <h2>Не знаешь, с чего начать?</h2>
            <p className="muted">Пройди тест за 3 минуты и получи персональный план развития.</p>
          </div>
          <Link to="/test" className="btn btn--primary btn--lg">Начать <ArrowRight size={18} /></Link>
        </div>
      </section>
    </div>
  );
}
