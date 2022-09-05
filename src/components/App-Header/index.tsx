import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="nav__link">
            RSLang
          </Link>
          <nav className="header-nav">
            <ul className="nav-list">
              <li>
                <Link to="/" className="nav__link">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/textbook" className="nav__link">
                  Учебник
                </Link>
              </li>
              <li>
                <Link to="/games" className="nav__link">
                  Игры
                </Link>
              </li>
              <li>
                <Link to="/statistic" className="nav__link">
                  Статистика
                </Link>
              </li>
              <li>
                <Link to="/about" className="nav__link">
                  О команде
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
