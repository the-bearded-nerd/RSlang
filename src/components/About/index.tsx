import React from 'react';
import './index.css';

export default function About() {
  return (
    <main className="about-main">
      <div className="container">
        <div className="inner-about">
          <h4 className="title">О команде</h4>
          <div className="cards">
            <div className="card">
              <div className="title">Дмитрий</div>
              <img className="card__image" src="../../about-photos/dmk.png" alt="" />
              <div className="subtitle">Team lead</div>
              <ul className="card-list-item">
                <li>Общее руководство проектом</li>
                <li>Разработка статистики</li>
                <li>Работа с бэкендом</li>
              </ul>
            </div>
            <div className="card">
              <div className="title">Анна</div>
              <img className="card-img" src="../../about-photos/ann.jpg" alt="" />
              <div className="subtitle">Frontend developer</div>
              <ul className="card-list-item">
                <li>разработка учебника и списка слов</li>
                <li>прогресс изучения и изученные слова</li>
              </ul>
            </div>
            <div className="card">
              <div className="title">Виталий</div>
              <div className="subtitle">Frontend developer</div>
              <ul className="card-list-item">
                <li>разработка игр Аудиовызов и Спринт</li>
                <li>настройка роутинга</li>
                <li>верстка приложения</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
