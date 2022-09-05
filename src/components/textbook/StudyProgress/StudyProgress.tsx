import React from 'react';
import { PropsWordLearningProgress } from '../../interface/interfaces';
import './studyProgress.css';

function WordLearningProgress({ word }: PropsWordLearningProgress) {
  if (!word?.userWord) return <div />;
  return (
    <table className="table">
      <tbody>
        <tr>
          <td />
          <td>Верно выбрано</td>
          <td>Ошибка</td>
        </tr>
        <tr>
          <td>Спринт</td>
          <td>{word?.userWord.optional?.sprint.right}</td>
          <td>{word?.userWord.optional?.sprint.wrong}</td>
        </tr>
        <tr>
          <td>Аудиовызов</td>
          <td>{word?.userWord.optional?.audio.right}</td>
          <td>{word?.userWord.optional?.audio.wrong}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default WordLearningProgress;
