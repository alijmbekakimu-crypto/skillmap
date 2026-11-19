import { forwardRef } from 'react';
import { Check, Lock, Circle } from 'lucide-react';

const icons = { mastered: Check, available: Circle, locked: Lock };

const SkillCard = forwardRef(function SkillCard({ skill, status, active, onClick }, ref) {
  const Icon = icons[status];
  return (
    <button
      ref={ref}
      className={`skill-node skill-node--${status} ${active ? 'is-active' : ''}`}
      onClick={onClick}
    >
      <span className="skill-node__icon"><Icon size={14} /></span>
      <span className="skill-node__name">{skill.name}</span>
    </button>
  );
});

export default SkillCard;
