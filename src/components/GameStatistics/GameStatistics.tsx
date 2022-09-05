import React from 'react';

function GameStatistics(props: any) {
  const { gameName, learnedWords, right, wrong, longestSeries } = props;
  const hitRate = right + wrong === 0 ? 0 : Math.floor((100 * right) / (right + wrong));
  return (
    <div className="game-statistics">
      <h4>Статистика {gameName} на сегодня:</h4>
      <p>Новых слов за сегодня: {learnedWords}</p>
      <p>Процент правильных ответов: {hitRate}%</p>
      <p>Лучшая серия: {longestSeries}</p>
    </div>
  );
}

export default GameStatistics;
