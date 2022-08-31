import React from 'react';
import './App.css';
import User from './components/User/User';
import UserAggregatedWords from './utils/UsersAggregatedWords/UserAggregatedWords';
import Statistic from './utils/Statistic/Statistic';
import UsersWords from './utils/UsersWords/UsersWords';
import Words from './utils/Words/Words';

function App() {
  return (
    <div className="App">
      <User />
      <button
        type="button"
        onClick={async () => {
          const hardWords = await UserAggregatedWords.getLearnedtWords();
          console.log(hardWords);
        }}
      >
        Выученные слова
      </button>
      <button
        type="button"
        onClick={async () => {
          await Statistic.saveTurnResult('5e9f5ee35eb9e72bc21af4a3', 'audio', true, 1);
        }}
      >
        Правильный ответ
      </button>

      <button
        type="button"
        onClick={async () => {
          await Statistic.saveTurnResult('5e9f5ee35eb9e72bc21af4a3', 'audio', false, 1);
        }}
      >
        Неправильный ответ
      </button>

      <button
        type="button"
        onClick={async () => {
          await UsersWords.createWordWithOptional('5e9f5ee35eb9e72bc21af4a3', ' ');
        }}
      >
        Сохраняем слово с optional
      </button>
      <button
        type="button"
        onClick={async () => {
          await UsersWords.deleteWord('5e9f5ee35eb9e72bc21af4a3');
        }}
      >
        Удаляем слово
      </button>
      <br />
      <button
        type="button"
        onClick={async () => {
          const stat = await Statistic.getStatistic();
          console.log(stat);
        }}
      >
        получаем статистику
      </button>
      <button
        type="button"
        onClick={async () => {
          const words = await Words.getTextbookWords(0, 0);
          console.log(words);
        }}
      >
        Получаем слова
      </button>
    </div>
  );
}

export default App;
