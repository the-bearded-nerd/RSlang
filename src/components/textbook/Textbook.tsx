import React from 'react';
import { BtnNextPage, BtnPrevPage } from './BtnPageTextBook';
import HeaderTextbook from './HeaderTextbook';
import RenderWords from './RenderWords';
import './btnPageTextBook.css';

function Textbook() {
  const [currentCount, setCount] = React.useState<number>(1);
  const [idHard, setIdHard] = React.useState<number>(0);
  return (
    <>
      <h1>Учебник</h1>
      <h2>Уровни сложности</h2>
      <HeaderTextbook
        typeSection={[
          'Первый',
          'Второй',
          'Третий',
          'Четвертый',
          'Пятый',
          'Шестой',
          'Сложные слова',
        ]}
        setIdHard={(id) => setIdHard(id)}
        setNumberPage={() => setCount(1)}
      />
      <h2>Слова</h2>
      <RenderWords hard={idHard} numberPage={currentCount - 1} />
      <div className="box-btn-page">
        <BtnPrevPage setNumberPage={() => setCount(currentCount < 2 ? 1 : currentCount - 1)} />
        <div>{currentCount}</div>
        <BtnNextPage setNumberPage={() => setCount(currentCount === 29 ? 29 : currentCount + 1)} />
      </div>
    </>
  );
}

export default Textbook;
