import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { questions } from '../data/questions';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import { calculateScores } from '../utils/recommendations';
import { useApp } from '../context/AppContext';

export default function Test() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const { saveTestResult } = useApp();
  const navigate = useNavigate();

  const total = questions.length;
  const answeredCount = answers.filter((a) => a !== null).length;
  const isLast = current === total - 1;
  const selected = answers[current];

  const handleSelect = (optionIndex) => {
    const next = [...answers];
    next[current] = optionIndex;
    setAnswers(next);
  };

  const handleNext = () => {
    if (selected === null) return;
    if (isLast) {
      const result = calculateScores(answers);
      saveTestResult({ ...result, answers });
      navigate('/results');
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="page container test">
      <div className="test__header">
        <h1>Тест профориентации</h1>
        <p className="muted">Выбери вариант, который лучше всего описывает тебя. Здесь нет правильных и неправильных ответов.</p>
        <div className="test__progress">
          <ProgressBar value={Math.round((answeredCount / total) * 100)} />
          <span className="small muted">{answeredCount}/{total}</span>
        </div>
        <div className="test__dots">
          {questions.map((q, i) => (
            <button
              key={q.id}
              className={`dot-step ${i === current ? 'is-current' : ''} ${answers[i] !== null ? 'is-done' : ''}`}
              onClick={() => (answers[i] !== null || i <= answeredCount) && setCurrent(i)}
              aria-label={`Вопрос ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <QuestionCard
        key={current}
        question={questions[current]}
        index={current}
        total={total}
        selected={selected}
        onSelect={handleSelect}
      />

      <div className="test__nav">
        <button className="btn btn--ghost" onClick={() => setCurrent(current - 1)} disabled={current === 0}>
          <ArrowLeft size={16} /> Назад
        </button>
        <button className="btn btn--primary" onClick={handleNext} disabled={selected === null}>
          {isLast ? (<>Узнать результат <Sparkles size={16} /></>) : (<>Далее <ArrowRight size={16} /></>)}
        </button>
      </div>
    </div>
  );
}
