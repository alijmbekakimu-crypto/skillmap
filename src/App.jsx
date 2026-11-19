import { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Test from './pages/Test';
import Results from './pages/Results';
import Professions from './pages/Professions';
import SkillMap from './pages/SkillMap';
import Courses from './pages/Courses';
import Profile from './pages/Profile';

// Прокрутка наверх при переходе между страницами
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="page container empty-state">
      <div className="card">
        <h1>404</h1>
        <p className="muted">Такой страницы нет.</p>
        <Link to="/" className="btn btn--primary">На главную</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/results" element={<Results />} />
          <Route path="/professions" element={<Professions />} />
          <Route path="/skills/:id" element={<SkillMap />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <span>© {new Date().getFullYear()} SkillMap — платформа профориентации</span>
          <span className="muted">Данные сохраняются в браузере</span>
        </div>
      </footer>
    </>
  );
}
