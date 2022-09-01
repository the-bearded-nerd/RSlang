import React from 'react';
import { BtnNextPage, BtnPrevPage } from '../BtnPagination/BtnPageTextBook';
import HeaderTextbook from '../HeaderTextBook/HeaderTextbook';
import WordsTextBook from '../WordsTextBook/WordsTextBook';
import '../BtnPagination/btnPageTextBook.css';
import UserAggregatedWords from '../../../utils/UsersAggregatedWords/UserAggregatedWords';
import { CurrentWords } from '../../interface/interfaces';

function Textbook() {
  const resultPage: number = JSON.parse(localStorage.getItem('numberPage') || '1');
  const resultHard: number = JSON.parse(localStorage.getItem('levelHard') || '0');
  const [currentCount, setCount] = React.useState<number>(resultPage);
  const [idHard, setIdHard] = React.useState<number>(resultHard);
  const [currentWords, setWords] = React.useState<CurrentWords[]>([]);
  const [learnPage, isLearnPage] = React.useState<boolean>(false);

  React.useEffect(() => {
    localStorage.setItem('numberPage', JSON.stringify(currentCount));
    localStorage.setItem('levelHard', JSON.stringify(idHard));
  }, [currentCount, idHard]);

  const [userAggregatedWords, setUserAggregatedWords] = React.useState<CurrentWords[]>([]);
  const [userLearned, setUserLearned] = React.useState<CurrentWords[]>([]);
  React.useEffect(() => {
    UserAggregatedWords.getDifficultWords()
      .then((res) => res)
      .then((data) => setUserAggregatedWords(data));

    UserAggregatedWords.getLearnedtWords()
      .then((res) => res)
      .then((data) => setUserLearned(data));
  }, []);

  const classHard = idHard !== 6 ? 'box-btn-page active' : 'box-btn-page';

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
        idHard={idHard}
      />

      <h2>Слова</h2>
      <section className={idHard !== 6 ? 'page' : 'difficul'}>
        <WordsTextBook
          hard={idHard}
          numberPage={currentCount - 1}
          userAggregatedWords={userAggregatedWords}
          setUserAggregatedWords={setUserAggregatedWords}
          userLearned={userLearned}
          setWords={setWords}
          currentWords={currentWords}
          setUserLearned={setUserLearned}
          isLearnPage={isLearnPage}
        />

        <div className={classHard}>
          <BtnPrevPage
            setNumberPage={() => setCount(currentCount < 2 ? 1 : currentCount - 1)}
            currentCount={currentCount}
            currentWords={currentWords}
            isLearnPage={isLearnPage}
          />
          <div className={learnPage ? 'page-learn' : 'no'}>{currentCount}</div>
          <BtnNextPage
            setNumberPage={() => setCount(currentCount === 30 ? 30 : currentCount + 1)}
            currentCount={currentCount}
            currentWords={currentWords}
            isLearnPage={isLearnPage}
          />
        </div>
      </section>
    </>
  );
}

export default Textbook;
