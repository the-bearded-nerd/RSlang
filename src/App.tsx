import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/App-Header';
import MainPage from './components/App-Main';
import Games from './components/App-Games';
import GameMain from './components/GameMain';
import Textbook from './components/textbook/TextBook/Textbook';

function App() {
  const [isFullScreen, setFullScreen] = useState(false);
  const changeFullScreen = () => {
    const status = !isFullScreen;
    setFullScreen(status);
  };
  return (
    <div className="wrapper">
      <BrowserRouter>
        {/* <Header /> */}
        {!isFullScreen && <Header />}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="textbook" element={<Textbook />} />
          <Route path="games" element={<Games />} />
          <Route
            path="games/audio"
            element={<GameMain changeFullScreen={changeFullScreen} gameName="audio" />}
          />
          <Route
            path="games/sprint"
            element={<GameMain changeFullScreen={changeFullScreen} gameName="sprint" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
