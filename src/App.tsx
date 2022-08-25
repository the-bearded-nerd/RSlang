import React from 'react';
import './App.css';
import AuthorizationForm from './components/AuthorizationForm/AuthorizationForm';
import SignOut from './components/SignOut/SignOut';
import Users from './utils/Users/User';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import UserAggregatedWords from './utils/UsersAggregatedWords/UserAggregatedWords';

function App() {
  return (
    <div className="App">
      {Users.isAuthorized() ? <SignOut /> : <AuthorizationForm />}
      <RegistrationForm />
      <button
        type="button"
        onClick={async () => {
          const hardWords = await UserAggregatedWords.getDifficultWords();
          console.log(hardWords);
        }}
      >
        Сложные слова
      </button>
      <button
        type="button"
        onClick={async () => {
          const learnedWords = await UserAggregatedWords.getLearnedtWords();
          console.log(learnedWords);
        }}
      >
        Выученные слова
      </button>
    </div>
  );
}

export default App;
