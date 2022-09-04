import React from 'react';
import { PropsWordLearningProgress } from '../../interface/interfaces';
import './studyProgress.css';

function WordLearningProgress({ classStudy, isClassStudy, word }: PropsWordLearningProgress) {
  return (
    <div className={classStudy ? 'study' : 'no-study'}>
      <button
        type="button"
        onClick={() => {
          isClassStudy(false);
          document.body.style.overflow = '';
        }}
      >
        Закрыть
      </button>
      <h2 className="buttonStudy">{word?.word}</h2>
      {word?.userWord === undefined ? (
        <h1>Прогресса изучения слова {word?.word} нет </h1>
      ) : (
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
      )}
    </div>
  );
}

export default WordLearningProgress;
