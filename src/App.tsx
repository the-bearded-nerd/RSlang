import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/App-Header';
import Footer from './components/App-Footer';
import MainPage from './components/App-Main';
import Games from './components/App-Games';
import GameMain from './components/GameMain';
import Statistics from './components/Statistics/Statistics';
import Textbook from './components/textbook/TextBook/Textbook';
import About from './components/About';
import Statistic from './utils/Statistic/Statistic';
import Words from './utils/Words/Words';

function App() {
  Words.get20RandomWordsByGroup(1);
  const [isFullScreen, setFullScreen] = useState(false);
  const changeFullScreen = () => {
    const status = !isFullScreen;
    setFullScreen(status);
  };
  return (
    <div className="app">
      <BrowserRouter>
        {!isFullScreen && <Header />}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="textbook" element={<Textbook />} />
          <Route path="games" element={<Games />} />
          <Route path="statistic" element={<Statistics />} />
          <Route path="about" element={<About />} />
          <Route
            path="games/audio"
            element={<GameMain changeFullScreen={changeFullScreen} gameName="audio" />}
          />
          <Route
            path="games/sprint"
            element={<GameMain changeFullScreen={changeFullScreen} gameName="sprint" />}
          />
        </Routes>
        {!isFullScreen && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
