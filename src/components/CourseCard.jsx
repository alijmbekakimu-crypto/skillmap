import { ExternalLink, Globe, Clock, Signal } from 'lucide-react';

export default function CourseCard({ course, onOpen }) {
  return (
    <article className="card course-card hoverable">
      <div className="course-card__top">
        <span className="tag">{course.direction}</span>
        <span className={`price ${course.free ? 'price--free' : 'price--paid'}`}>
          {course.free ? 'Бесплатно' : 'Платно'}
        </span>
      </div>
      <h3>{course.title}</h3>
      <p className="muted">{course.description}</p>
      <div className="course-card__meta">
        <span><Signal size={14} /> {course.level}</span>
        <span><Globe size={14} /> {course.language}</span>
      </div>
      <div className="course-card__footer">
        <span className="small muted">{course.platform}</span>
        {course.url ? (
          <a
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost btn--sm"
            onClick={() => onOpen?.(course.id)}
          >
            Перейти <ExternalLink size={14} />
          </a>
        ) : (
          <button className="btn btn--ghost btn--sm" onClick={() => onOpen?.(course.id)} title="Сохранить в просмотренные">
            <Clock size={14} /> Ссылка появится позже
          </button>
        )}
      </div>
    </article>
  );
}
