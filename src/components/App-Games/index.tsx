import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './index.css';

function Games() {
  return (
    <>
      <h3 className="games-title">Выбор игры</h3>
      <nav className="games-nav">
        <Link to="/games/audio">audio</Link>
        <Link to="/games/sprint">sprint</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default Games;
