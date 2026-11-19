import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Star, CheckCircle2 } from 'lucide-react';
import { getProfession } from '../data/professions';
import { skillTrees, getSkills } from '../data/skills';
import { useApp } from '../context/AppContext';
import { getSkillStatus, getProgressPercent } from '../utils/skills';
import SkillCard from '../components/SkillCard';
import Sidebar from '../components/Sidebar';
import { ProgressRing } from '../components/ProgressBar';
import ProfessionIcon from '../components/ProfessionIcon';

export default function SkillMap() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { state, toggleSkill, selectProfession } = useApp();
  const [activeId, setActiveId] = useState(searchParams.get('skill'));

  const profession = getProfession(id);
  const levels = skillTrees[id] || [];
  const allSkills = getSkills(id);
  const mastered = state.progress[id] || [];
  const percent = getProgressPercent(id, mastered);

  // Положения карточек для отрисовки соединительных линий
  const treeRef = useRef(null);
  const nodeRefs = useRef({});
  const [edges, setEdges] = useState([]);
  const [box, setBox] = useState({ w: 0, h: 0 });

  const measure = useCallback(() => {
    const tree = treeRef.current;
    if (!tree) return;
    const tb = tree.getBoundingClientRect();
    const result = [];
    allSkills.forEach((skill) => {
      skill.requires.forEach((reqId) => {
        const from = nodeRefs.current[reqId];
        const to = nodeRefs.current[skill.id];
        if (!from || !to) return;
        const a = from.getBoundingClientRect();
        const b = to.getBoundingClientRect();
        result.push({
          key: `${reqId}-${skill.id}`,
          from: reqId,
          to: skill.id,
          x1: a.left + a.width / 2 - tb.left,
          y1: a.bottom - tb.top,
          x2: b.left + b.width / 2 - tb.left,
          y2: b.top - tb.top,
        });
      });
    });
    setEdges(result);
    setBox({ w: tb.width, h: tb.height });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useLayoutEffect(() => {
    measure();
  }, [measure, activeId, mastered.length]);

  useEffect(() => {
    const tree = treeRef.current;
    if (!tree) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(tree);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  useEffect(() => {
    setActiveId(searchParams.get('skill'));
  }, [id, searchParams]);

  if (!profession) {
    return (
      <div className="page container empty-state">
        <div className="card">
          <h1>Профессия не найдена</h1>
          <Link to="/professions" className="btn btn--primary">К каталогу профессий</Link>
        </div>
      </div>
    );
  }

  const activeSkill = allSkills.find((s) => s.id === activeId) || null;
  const isSelected = state.selectedProfession === id;
  const masteredCount = allSkills.filter((s) => mastered.includes(s.id)).length;

  const edgeClass = (e) => {
    const fromDone = mastered.includes(e.from);
    const toDone = mastered.includes(e.to);
    if (fromDone && toDone) return 'edge edge--mastered';
    if (fromDone) return 'edge edge--available';
    return 'edge edge--locked';
  };

  return (
    <div className="page container">
      <Link to="/professions" className="back-link"><ArrowLeft size={16} /> Все профессии</Link>

      <div className="card skillmap-head">
        <div className="skillmap-head__info">
          <div className="icon-box icon-box--lg"><ProfessionIcon name={profession.icon} size={28} /></div>
          <div>
            <span className="small muted">Карта навыков</span>
            <h1>{profession.name}</h1>
            <p className="muted">
              Освоено {masteredCount} из {allSkills.length} навыков
            </p>
          </div>
        </div>
        <div className="skillmap-head__right">
          {isSelected ? (
            <span className="selected-badge"><CheckCircle2 size={16} /> Моя профессия</span>
          ) : (
            <button className="btn btn--ghost" onClick={() => selectProfession(id)}>
              <Star size={16} /> Сделать моей профессией
            </button>
          )}
          <ProgressRing value={percent} size={96} stroke={9} label="освоено" />
        </div>
      </div>

      <div className="skillmap-layout">
        <div className="card tree-wrap">
          <div className="tree" ref={treeRef}>
            <svg className="tree__lines" width={box.w} height={box.h}>
              {edges.map((e) => {
                const midY = (e.y1 + e.y2) / 2;
                return (
                  <path
                    key={e.key}
                    className={edgeClass(e)}
                    d={`M ${e.x1} ${e.y1} C ${e.x1} ${midY}, ${e.x2} ${midY}, ${e.x2} ${e.y2}`}
                  />
                );
              })}
            </svg>

            {levels.map((level, i) => (
              <div key={level.category} className="tree__level">
                <span className="tree__label">
                  <b>{i + 1}</b> {level.category}
                </span>
                <div className="tree__row">
                  {level.skills.map((skill) => {
                    const full = { ...skill, category: level.category };
                    return (
                      <SkillCard
                        key={skill.id}
                        ref={(el) => (nodeRefs.current[skill.id] = el)}
                        skill={full}
                        status={getSkillStatus(full, mastered)}
                        active={activeId === skill.id}
                        onClick={() => setActiveId(skill.id)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Sidebar
          skill={activeSkill}
          status={activeSkill ? getSkillStatus(activeSkill, mastered) : null}
          allSkills={allSkills}
          masteredIds={mastered}
          onToggle={() => toggleSkill(id, activeSkill.id)}
          onClose={() => setActiveId(null)}
        />
      </div>
    </div>
  );
}
