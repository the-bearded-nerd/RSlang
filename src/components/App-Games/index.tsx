import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './index.css';

function Games() {
  return (
    <div className="games-main">
      <h3 className="games-title">Выбор игры</h3>
      <nav className="games-nav">
        <Link to="/games/audio" className="btn">
          Аудиовызов
        </Link>
        <Link to="/games/sprint" className="btn">
          Спринт
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Games;
