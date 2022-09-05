import React from 'react';
import './index.css';
import User from '../User/User';

function MainPage() {
  return (
    <main className="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-welcome">
            <h1 className="hero__title">RSLang</h1>
            <p className="hero__text">
              Используй быстрый и эффективный способ изучения английского языка. Все самые лучшие
              методики в одном месте.
            </p>
            <User />
          </div>
          <div className="hero-image-box">
            <img className="hero__img" src="../../hero.jpg" alt="" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;
