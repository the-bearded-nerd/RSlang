import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './index.css';

function Header() {
  return (
    <header className="header">
      <nav>
        <Link to="/games">games</Link>
      </nav>
      <Outlet />
    </header>
  );
}

export default Header;
