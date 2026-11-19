import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Map, Menu, X, User } from 'lucide-react';

const links = [
  { to: '/', label: 'Главная', end: true },
  { to: '/test', label: 'Тест' },
  { to: '/professions', label: 'Профессии' },
  { to: '/courses', label: 'Курсы' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="logo" onClick={close}>
          <span className="logo__icon"><Map size={20} /></span>
          Skill<span className="text-accent">Map</span>
        </Link>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} onClick={close} className="navbar__link">
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/profile" onClick={close} className="navbar__link navbar__profile">
            <User size={16} /> Кабинет
          </NavLink>
        </nav>

        <button className="navbar__burger" onClick={() => setOpen(!open)} aria-label="Меню">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
