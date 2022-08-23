import React from 'react';
import { PropsAudioWords } from '../../interface/interfaces';

const baseURL = 'https://rslang-fe2022q1.herokuapp.com/';

function AudioWords({ objectWord, currentDisabled, setDisabled }: PropsAudioWords) {
  const [isLocalDisabled, setLocalDisabled] = React.useState(true);
  const audioWordMeaning = new Audio(`${baseURL}${objectWord.audioMeaning}`);
  const audioWordExample = new Audio(`${baseURL}${objectWord.audioExample}`);
  audioWordExample.addEventListener('ended', () => {
    setDisabled(false);
    setLocalDisabled(true);
  });
  audioWordMeaning.addEventListener('ended', () => {
    audioWordExample.play();
  });

  const audioWord = new Audio(`${baseURL}${objectWord.audio}`);
  audioWord.addEventListener('ended', () => audioWordMeaning.play());

  function playAudioWord() {
    audioWord.play();
  }

  const booleanState = currentDisabled !== true ? currentDisabled : isLocalDisabled;
  return (
    <div className="audio-word">
      <img className="img-audio" src="" alt={objectWord.word} width={200} />
      <button
        disabled={booleanState}
        type="button"
        onClick={(e) => {
          if (e.target) {
            setLocalDisabled(false);
          }
          setDisabled(true);
          playAudioWord();
        }}
      >
        click
      </button>
    </div>
  );
}

export default AudioWords;
