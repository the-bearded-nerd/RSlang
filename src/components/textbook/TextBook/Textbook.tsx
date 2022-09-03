import React from 'react';
import { Link } from 'react-router-dom';
import { BtnNextPage, BtnPrevPage } from '../BtnPagination/BtnPageTextBook';
import WordsTextBook from '../WordsTextBook/WordsTextBook';
import '../BtnPagination/btnPageTextBook.css';
import UserAggregatedWords from '../../../utils/UsersAggregatedWords/UserAggregatedWords';
import { CurrentWords } from '../../interface/interfaces';
import HeaderTextbook from '../HeaderTextBook/HeaderTextbook';
import LocalStorageService from '../../../utils/LocalStorageService/index';

function Textbook() {
  const resultPage: number = JSON.parse(localStorage.getItem('numberPage') || '1');
  const resultHard: number = JSON.parse(localStorage.getItem('levelHard') || '0');
  const [currentCount, setCount] = React.useState<number>(resultPage);
  const [idHard, setIdHard] = React.useState<number>(resultHard);
  const [currentWords, setWords] = React.useState<CurrentWords[]>([]);
  const [resultLearnWords, setResultLearnWords] = React.useState();

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

  React.useEffect(() => {
    UserAggregatedWords.isAllLearned(currentWords).then((res) => setResultLearnWords(res));
  });

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
      <nav className="textbook-games-nav">
        <ul className="nav-list">
          <li>
            <Link
              to="../games/audio"
              onClick={() => {
                LocalStorageService.setItem('gameWords', currentWords);
              }}
            >
              Аудиовызов
            </Link>
          </li>
          <li>
            <Link
              to="../games/sprint"
              onClick={() => {
                LocalStorageService.setItem('gameWords', currentWords);
              }}
            >
              Спринт
            </Link>
          </li>
        </ul>
      </nav>
      <div className={classHard}>
        <BtnPrevPage
          setNumberPage={() => setCount(currentCount < 2 ? 1 : currentCount - 1)}
          currentCount={currentCount}
          currentWords={currentWords}
        />
        <div className={!resultLearnWords ? 'no' : 'page-learn'}>{currentCount}</div>
        <BtnNextPage
          setNumberPage={() => setCount(currentCount === 30 ? 30 : currentCount + 1)}
          currentCount={currentCount}
          currentWords={currentWords}
        />
      </div>

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
        />
      </section>
    </>
  );
}

export default Textbook;
