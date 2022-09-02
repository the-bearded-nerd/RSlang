/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import User from '../User/User';

// ToDo: Статистика, О команде

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
        </ul>
      </nav>
      <User />
    </header>
  );
}

export default Header;
