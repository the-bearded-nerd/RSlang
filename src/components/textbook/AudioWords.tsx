import React from 'react';
import { PropsAudioWords } from '../interface/interfaces';

const baseURL = 'https://rslang-fe2022q1.herokuapp.com/';

function AudioWords({ objectWord, currentDisabled, setDisabled }: PropsAudioWords) {
  // const [currentDisabled, setDisabled] = React.useState(false);
  const audioWordMeaning = new Audio(`${baseURL}${objectWord.audioMeaning}`);
  const audioWordExample = new Audio(`${baseURL}${objectWord.audioExample}`);
  audioWordExample.addEventListener('ended', () => {
    setDisabled(false);
    console.log('12');
  });
  audioWordMeaning.addEventListener('ended', () => {
    audioWordExample.play();
  });
  console.log(setDisabled);

  const audioWord = new Audio(`${baseURL}${objectWord.audio}`);
  audioWord.addEventListener('ended', () => audioWordMeaning.play());

  function playAudioWord() {
    audioWord.play();
  }

  return (
    <div className="audio-word">
      <img className="img-audio" src="" alt={objectWord.word} width={200} />
      <button
        disabled={currentDisabled}
        type="button"
        onClick={() => {
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
