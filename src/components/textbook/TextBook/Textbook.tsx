import React from 'react';
import { BtnNextPage, BtnPrevPage } from '../BtnPagination/BtnPageTextBook';
import WordsTextBook from '../WordsTextBook/WordsTextBook';
import '../BtnPagination/btnPageTextBook.css';
import UserAggregatedWords from '../../../utils/UsersAggregatedWords/UserAggregatedWords';
import { CurrentWords, ObjectAggr } from '../../interface/interfaces';
import HeaderTextbook from '../HeaderTextBook/HeaderTextbook';
import Words from '../../../utils/Words/Words';
import StudyProgress from '../StudyProgress/StudyProgress';

function Textbook() {
  const resultPage: number = JSON.parse(localStorage.getItem('numberPage') || '1');
  const resultHard: number = JSON.parse(localStorage.getItem('levelHard') || '0');
  const [currentCount, setCount] = React.useState<number>(resultPage);
  const [idHard, setIdHard] = React.useState<number>(resultHard);
  const [currentWords, setWords] = React.useState<CurrentWords[]>([]);
  const [resultLearnWords, setResultLearnWords] = React.useState();
  console.log(currentWords);

  React.useEffect(() => {
    localStorage.setItem('numberPage', JSON.stringify(currentCount));
    localStorage.setItem('levelHard', JSON.stringify(idHard));
  }, [currentCount, idHard]);

  const [userAggregatedWords, setUserAggregatedWords] = React.useState<CurrentWords[]>([]);
  const [userLearned, setUserLearned] = React.useState<CurrentWords[]>([]);
  const [loading, isLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    UserAggregatedWords.getDifficultWords()
      .then((res) => res)
      .then((data) => setUserAggregatedWords(data));

    UserAggregatedWords.getLearnedtWords()
      .then((res) => res)
      .then((data) => setUserLearned(data));
    UserAggregatedWords.isAllLearned(currentWords).then((res) => setResultLearnWords(res));
  }, []);

  const classHard = idHard !== 6 ? 'box-btn-page active' : 'box-btn-page';

  React.useEffect(() => {
    UserAggregatedWords.isAllLearned(currentWords).then((res) => setResultLearnWords(res));
  }, [userAggregatedWords, currentWords]);

  React.useEffect(() => {
    if (idHard !== 6) {
      isLoading(true);

      Words.getTextbookWords(idHard, currentCount - 1)
        .then((res) => {
          return res;
        })
        .then((data) => {
          setWords(data);
          isLoading(false);
        });
    }

    if (idHard === 6) {
      isLoading(true);

      UserAggregatedWords.getDifficultWords()
        .then((res) => res)
        .then((data) => {
          // isLoading(true);
          setWords(data);
          isLoading(false);
        });
    }
  }, [idHard, currentCount]);

  const [classStudy, isClassStudy] = React.useState<boolean>(false);
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
      <StudyProgress classStudy={classStudy} />;
      <div>
        <button type="button">Аудиовызов</button>
        <button type="button">Спринт</button>
      </div>
      <div className={classHard}>
        <BtnPrevPage
          setNumberPage={() => setCount(currentCount < 2 ? 1 : currentCount - 1)}
          currentCount={currentCount}
          loading={loading}
        />
        <div className={!resultLearnWords ? 'no' : 'page-learn'}>{currentCount}</div>
        <BtnNextPage
          setNumberPage={() => setCount(currentCount === 30 ? 30 : currentCount + 1)}
          currentCount={currentCount}
          loading={loading}
        />
      </div>
      <h2>Слова</h2>
      {loading ? (
        <div className="box-loading">1</div>
      ) : (
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
            isLoading={isLoading}
            isClassStudy={isClassStudy}
            classStudy={classStudy}
          />
        </section>
      )}
    </>
  );
}

export default Textbook;
