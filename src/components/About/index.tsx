import React from 'react';
import './index.css';
import Footer from '../App-Footer';

export default function About() {
  return (
    <>
      <main className="about-main">
        <div className="container">
          <div className="inner-about">
            <h4 className="title">О команде</h4>
            <div className="cards">
              <div className="card">
                <h3 className="subtitle">Дмитрий</h3>
                <div className="card__img">
                  <img src="../../about-photos/dmk.png" alt="" />
                </div>
                <h4 className="subtitle">Team lead</h4>
                <ul className="card-list-item">
                  <li>Общее руководство проектом</li>
                  <li>Разработка статистики</li>
                  <li>Работа с бэкендом</li>
                </ul>
                <a href="https://github.com/the-bearded-nerd">
                  <img src="../../../logoGithub.svg" width="50" height="50" alt="logo.svg" />
                </a>
              </div>
              <div className="card">
                <h3 className="subtitle">Анна</h3>
                <div className="card__img">
                  <img src="../../about-photos/ann.jpg" alt="" />
                </div>
                <h4 className="subtitle">Frontend developer</h4>
                <ul className="card-list-item">
                  <li>Разработка учебника и списка слов</li>
                  <li>Прогресс изучения и изученные слова</li>
                </ul>
                <a href="https://github.com/laluna93">
                  <img src="../../../logoGithub.svg" width="50" height="50" alt="logo.svg" />
                </a>
              </div>
              <div className="card">
                <h3 className="subtitle">Виталий</h3>
                <div className="card__img">
                  <img src="../../about-photos/vit.jpg" alt="" />
                </div>
                <h4 className="subtitle">Frontend developer</h4>
                <ul className="card-list-item">
                  <li>Разработка игр Аудиовызов и Спринт</li>
                  <li>Настройка роутинга</li>
                  <li>Верстка приложения</li>
                </ul>
                <a href="https://github.com/bloodsuckers-spb">
                  <img src="../../../logoGithub.svg" width="50" height="50" alt="logo.svg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
