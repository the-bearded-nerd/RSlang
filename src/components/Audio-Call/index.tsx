import React, { useEffect, useState } from 'react';
import './index.css';

import Words from '../../utils/Words/Words';
import IWords from '../../types/IWords';

import Greeting from '../Audio-Call-Greeting';
import AudioGame from '../Audio-Game';

function AudioCall() {
  const [words, setWords] = useState<IWords[]>([]);
  const [isGameStarted, setGameStatus] = useState(false);

  const switchGameStatus = () => {
    setGameStatus(!isGameStarted);
  };

  useEffect(() => {
    Words.getWords().then((res: IWords[]) => setWords(res));
  }, []);

  return (
    <div className="audio-game">
      {!isGameStarted ? <Greeting fn={switchGameStatus} /> : <AudioGame data={words} />}
    </div>
  );
}

export default AudioCall;
