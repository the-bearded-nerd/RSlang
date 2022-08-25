import React from 'react';
import { BtnNextPage, BtnPrevPage } from '../BtnPagination/BtnPageTextBook';
import HeaderTextbook from '../HeaderTextBook/HeaderTextbook';
import WordsTextBook from '../RenderWords/RenderWords';
import '../BtnPagination/btnPageTextBook.css';

function Textbook() {
  const resultPage: number = JSON.parse(localStorage.getItem('numberPage') || '1');
  const resultHard: number = JSON.parse(localStorage.getItem('levelHard') || '0');
  const [currentCount, setCount] = React.useState<number>(resultPage);
  const [idHard, setIdHard] = React.useState<number>(resultHard);

  React.useEffect(() => {
    localStorage.setItem('numberPage', JSON.stringify(currentCount));
    localStorage.setItem('levelHard', JSON.stringify(idHard));
  }, [currentCount, idHard]);

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
      <WordsTextBook hard={idHard} numberPage={currentCount - 1} />
      <div className="box-btn-page">
        <BtnPrevPage setNumberPage={() => setCount(currentCount < 2 ? 1 : currentCount - 1)} />
        <div>{currentCount}</div>
        <BtnNextPage setNumberPage={() => setCount(currentCount === 30 ? 30 : currentCount + 1)} />
      </div>
    </>
  );
}

export default Textbook;