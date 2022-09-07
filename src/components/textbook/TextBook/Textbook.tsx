import React from 'react';
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { BtnNextPage, BtnPrevPage } from '../BtnPagination/BtnPageTextBook';
import WordsTextBook from '../WordsTextBook/TextBook';
import '../BtnPagination/btnPageTextBook.css';
import UserAggregatedWords from '../../../utils/UsersAggregatedWords/UserAggregatedWords';
import { ContentWord } from '../../interface/interfaces';
import HeaderTextbook from '../HeaderTextBook/HeaderTextbook';
import Words from '../../../utils/Words/Words';
import StudyProgress from '../StudyProgress/StudyProgress';
import LocalStorageService from '../../../utils/LocalStorageService/index';
import './index.css';
import Footer from '../../App-Footer';

function Textbook() {
  const storagePage: number = JSON.parse(localStorage.getItem('numberPage') || '1');
  const storageHard: number = JSON.parse(localStorage.getItem('levelHard') || '0');
  const [numberPage, setNumberPage] = React.useState<number>(storagePage);
  const [difficultyLevel, setDifficultyLevel] = React.useState<number>(storageHard);
  const [listWords, setWords] = React.useState<ContentWord[]>([]);
  const [resultLearnWords, setResultLearnWords] = React.useState();

  React.useEffect(() => {
    localStorage.setItem('numberPage', JSON.stringify(numberPage));
    localStorage.setItem('levelHard', JSON.stringify(difficultyLevel));
  }, [numberPage, difficultyLevel]);

  const [userAggregatedWords, setUserAggregatedWords] = React.useState<ContentWord[]>([]);
  const [loading, isLoading] = React.useState<boolean>(false);
  const [audioElement, setAudioElement] = React.useState<HTMLAudioElement>();

  React.useEffect(() => {
    UserAggregatedWords.getDifficultWords()
      .then((res) => res)
      .then((data) => setUserAggregatedWords(data));

    UserAggregatedWords.getLearnedtWords()
      .then((res) => res)
      .then((data) => data);
    UserAggregatedWords.isAllLearned(listWords).then((res) => setResultLearnWords(res));
  }, []);

  const classHard = difficultyLevel !== 6 ? 'box-btn-page active' : 'box-btn-page';

  React.useEffect(() => {
    UserAggregatedWords.isAllLearned(listWords).then((res) => setResultLearnWords(res));
  }, [userAggregatedWords, listWords]);

  React.useEffect(() => {
    if (difficultyLevel !== 6) {
      isLoading(true);

      Words.getTextbookWords(difficultyLevel, numberPage - 1)
        .then((res) => {
          return res;
        })
        .then((data) => {
          setWords(data);
          isLoading(false);
        });
    }

    if (difficultyLevel === 6) {
      isLoading(true);

      UserAggregatedWords.getDifficultWords()
        .then((res) => res)
        .then((data) => {
          setWords(data);
          isLoading(false);
        });
    }
  }, [difficultyLevel, numberPage]);

  const [classStudy, isClassStudy] = React.useState<boolean>(false);
  const [word, setWord] = React.useState<ContentWord | null>(null);
  // let classWords = '';
  // if (difficultyLevel !== 6) {
  //   classWords = 'all-words';
  // } else if (resultLearnWords) {
  //   classWords = 'learn';
  // } else {
  //   classWords = 'difficulty-words';
  // }

  const wordsAggr = difficultyLevel !== 6 ? 'all-words' : 'difficulty-words';
  // difficultyLevel !== 6 ? 'all-words' : 'difficulty-words'

  return (
    <>
      <main className="texbook-main">
        <div className="container">
          <div className="texbook-inner">
            <h2 className="texbook-title">Добро пожаловать в учебник!</h2>
            <h4 className="subtitle">Пожалуйста, Выберите уровень сложности</h4>
            <HeaderTextbook
              typeSection={['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Сложные']}
              setDifficultyLevel={(id) => setDifficultyLevel(id)}
              setNumberPage={() => setNumberPage(1)}
              difficultyLevel={difficultyLevel}
            />
            <nav className="textbook-games-nav">
              <ul className="nav-list">
                <li>
                  <Link
                    className={!resultLearnWords ? 'btn-game' : 'btn no-active'}
                    to="../games/audio"
                    onClick={() => {
                      LocalStorageService.setItem('gameWords', listWords);
                    }}
                  >
                    Аудиовызов
                  </Link>
                </li>
                <li>
                  <Link
                    className={!resultLearnWords ? 'btn-game' : 'btn no-active'}
                    to="../games/sprint"
                    onClick={() => {
                      LocalStorageService.setItem('gameWords', listWords);
                    }}
                  >
                    Спринт
                  </Link>
                </li>
              </ul>
            </nav>
            <div className={classHard}>
              <BtnPrevPage
                setNumberPage={() => setNumberPage(numberPage < 2 ? 1 : numberPage - 1)}
                numberPage={numberPage}
                loading={loading}
              />
              <div className={!resultLearnWords ? 'page' : 'page learn'}>{numberPage}</div>
              <BtnNextPage
                setNumberPage={() => setNumberPage(numberPage === 30 ? 30 : numberPage + 1)}
                numberPage={numberPage}
                loading={loading}
              />
            </div>
            {loading ? (
              <div className="box-loading">
                <ClimbingBoxLoader color="#ffffff" />
              </div>
            ) : (
              <section className={resultLearnWords ? 'all-words Learn' : wordsAggr}>
                <WordsTextBook
                  difficultyLevel={difficultyLevel}
                  numberPage={numberPage - 1}
                  userAggregatedWords={userAggregatedWords}
                  setUserAggregatedWords={setUserAggregatedWords}
                  setWords={setWords}
                  listWords={listWords}
                  isLoading={isLoading}
                  isClassStudy={isClassStudy}
                  classStudy={classStudy}
                  setWord={setWord}
                  setAudioElement={setAudioElement}
                  audioElement={audioElement}
                />
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Textbook;
