import React from 'react';
import './studyProgress.css';

interface ClassStudy {
  classStudy: boolean;
}

function StudyProgress({ classStudy }: ClassStudy) {
  return (
    <div className={classStudy ? 'study' : 'no-study'}>
      <div>
        <div>
          <span>Угадал</span>
          <span>Ошибся</span>
        </div>
        <div>Аудиовызов</div>
        <div>Спринт</div>
      </div>
    </div>
  );
}

export default StudyProgress;
