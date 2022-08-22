import React from 'react';
import { InforWordsProps } from '../interface/interfaces';

const baseURL = 'https://rslang-fe2022q1.herokuapp.com/';

function AudioWords({ objectWord }: InforWordsProps) {
  const audioWordMeaning = new Audio(`${baseURL}${objectWord.audioMeaning}`);
  const audioWordExample = new Audio(`${baseURL}${objectWord.audioExample}`);
  audioWordMeaning.addEventListener('ended', () => {
    audioWordExample.play();
  });

  const audioWord = new Audio(`${baseURL}${objectWord.audio}`);
  audioWord.addEventListener('ended', () => audioWordMeaning.play());

  function playAudioWord() {
    audioWord.play();
  }
  return (
    <div className="audio-word">
      <img className="img-audio" src="" alt={objectWord.word} width={200} />
      <button type="button" onClick={() => playAudioWord()}>
        click
      </button>
    </div>
  );
}

export default AudioWords;
