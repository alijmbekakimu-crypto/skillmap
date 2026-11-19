import { Check } from 'lucide-react';

export default function QuestionCard({ question, index, total, selected, onSelect }) {
  return (
    <div className="card question" key={question.id}>
      <span className="question__num">Вопрос {index + 1} из {total}</span>
      <h2 className="question__text">{question.text}</h2>
      <div className="question__options">
        {question.options.map((opt, i) => (
          <button
            key={i}
            className={`option ${selected === i ? 'is-selected' : ''}`}
            onClick={() => onSelect(i)}
          >
            <span className="option__letter">{String.fromCharCode(65 + i)}</span>
            <span className="option__text">{opt.text}</span>
            {selected === i && <Check size={18} className="option__check" />}
          </button>
        ))}
      </div>
    </div>
  );
}
