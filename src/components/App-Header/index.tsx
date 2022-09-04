import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import User from '../User/User';

function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/textbook">Учебник</Link>
          </li>
          <li>
            <Link to="/games">Игры</Link>
          </li>
          <li>
            <Link to="/statistic">Статистика</Link>
          </li>
          <li>
            <Link to="/about">О команде</Link>
          </li>
        </ul>
      </nav>
      <User />
    </header>
  );
}

export default Header;
