import React from 'react';
import './App.css';
import User from './components/User/User';
import UserAggregatedWords from './utils/UsersAggregatedWords/UserAggregatedWords';

function App() {
  return (
    <div className="App">
      {/* {Users.isAuthorized() ? <SignOut /> : <AuthorizationForm />}
      <button
        type="button"
        onClick={async () => {
          const hardWords = await UserAggregatedWords.getSetDifficultWords();
          console.log(hardWords);
        }}
      >
        Сложные слова
      </button>
      <button
        type="button"
        onClick={async () => {
          const learnedWords = await UserAggregatedWords.getSetLearnedtWords();
          console.log(learnedWords);
        }}
      >
        Выученные слова
      </button>
      <button type="button" onClick={() => setModalActive(true)}>
        Открыть модалку
      </button>

      <Modal active={modalActive} setActive={setModalActive} /> */}
      <User />
      <button
        type="button"
        onClick={async () => {
          const hardWords = await UserAggregatedWords.getSetDifficultWords();
          console.log(hardWords);
        }}
      >
        Сложные слова
      </button>
    </div>
  );
}

export default App;
