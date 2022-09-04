/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import './textBookWords.css';
import { PropsTextBookWords } from '../../interface/interfaces';
import BtnStudiedWord from '../BtnStudiedWord/BtnStudiedWord';
import Users from '../../../utils/Users/User';
import BtnDifficultWord from '../BtnAddWord/BtnDifficultWord';
import Modal from '../../Modal/Modal';
import StudyProgress from '../StudyProgress/StudyProgress';

const baseURL = 'https://rslang-fe2022q1.herokuapp.com/';

function TextBookWords({
  objectWord,
  audioBtnDisabled,
  setAudioBtnDisabled,
  isflagPlayAudio,
  flagPlayAudio,
  setUserAggregatedWords,
  difficultyLevel,
  setWords,
  isClassStudy,
  classStudy,
  setWord,
  setAudioElement,
  audioElement,
}: PropsTextBookWords) {
  let str = '';
  if (objectWord.userWord?.difficulty === 'learned') {
    str = 'learned';
  } else if (objectWord.userWord?.difficulty === 'hard') {
    str = 'hard';
  } else {
    str = 'word';
  }
  const [activeModal, setActiveModal] = useState(false);
  const resultAuthorizad = Users.isAuthorized();

  const correctionTextMeaning = DOMPurify.sanitize(objectWord.textMeaning);
  const correctionTranslateTextMeaning = DOMPurify.sanitize(objectWord.textMeaningTranslate);
  const correctionTextExample = DOMPurify.sanitize(objectWord.textExample);
  const correctionTranslateTextExample = DOMPurify.sanitize(objectWord.textExampleTranslate);

  const [localAudioBtnDisabled, isLocalAudioBtnDisabled] = React.useState(true);

  const audioState = audioBtnDisabled !== true ? audioBtnDisabled : localAudioBtnDisabled;
  const audioWordMeaning = new Audio();
  const audioWordExample = new Audio();
  const audioWord = new Audio();

  const setPlay = (audio: HTMLAudioElement) => {
    audio.play();
  };

  React.useEffect(() => {
    if (!flagPlayAudio) {
      const valueAudio = audioElement;
      valueAudio?.pause();
      setAudioBtnDisabled(false);
      isLocalAudioBtnDisabled(true);
      isflagPlayAudio(false);
    } else {
      setAudioBtnDisabled(true);
    }
  }, [audioElement, flagPlayAudio]);

  return (
    <div className={str}>
      <img className="image-word" src={`${baseURL}${objectWord.image}`} alt="img" width={200} />
      <div className="box-word">
        <div className="name-word">
          <span>{objectWord.word} </span>
          <span>{objectWord.transcription} </span>
        </div>
        <div>{objectWord.wordTranslate}</div>
        <div className="audio-word">
          <button
            type="button"
            disabled={audioState}
            onClick={(e) => {
              if (e.target) {
                isLocalAudioBtnDisabled(false);
              }
              audioWordMeaning.src = `${baseURL}${objectWord.audioMeaning}`;
              audioWordExample.src = `${baseURL}${objectWord.audioExample}`;
              audioWord.src = `${baseURL}${objectWord.audio}`;
              if (flagPlayAudio === false) {
                isflagPlayAudio(true);
                setPlay(audioWord);
                setAudioElement(audioWord);
                audioWord.addEventListener('ended', () => {
                  setPlay(audioWordMeaning);
                  setAudioElement(audioWordMeaning);
                });
                audioWordMeaning.addEventListener('ended', () => {
                  setPlay(audioWordExample);
                  setAudioElement(audioWordExample);
                  audioWordExample.play();
                });
                audioWordExample.addEventListener('ended', () => {
                  setAudioBtnDisabled(false);
                  isLocalAudioBtnDisabled(true);
                  isflagPlayAudio(false);
                });
              } else {
                isflagPlayAudio(false);
                audioWord.pause();
                audioWordExample.pause();
                audioWordMeaning.pause();
                setAudioBtnDisabled(true);
              }
              setAudioBtnDisabled(true);
            }}
          >
            click
          </button>
        </div>
        <div dangerouslySetInnerHTML={{ __html: correctionTextMeaning }} />
        <div dangerouslySetInnerHTML={{ __html: correctionTranslateTextMeaning }} />
        <div dangerouslySetInnerHTML={{ __html: correctionTextExample }} />
        <div dangerouslySetInnerHTML={{ __html: correctionTranslateTextExample }} />
        <div className="wrapper-btn-word">
          <BtnDifficultWord
            objectWord={objectWord}
            setUserAggregatedWords={setUserAggregatedWords}
            classNameDifficulty={str}
            difficultyLevel={difficultyLevel}
            setWords={setWords}
          />
          <BtnStudiedWord
            objectWord={objectWord}
            setUserAggregatedWords={setUserAggregatedWords}
            classNameDifficulty={str}
            difficultyLevel={difficultyLevel}
            setWords={setWords}
          />

          <button
            type="button"
            disabled={
              !resultAuthorizad ||
              objectWord.userWord === undefined ||
              objectWord.userWord.optional === undefined
            }
            onClick={() => {
              setActiveModal(true);
              // if (classStudy) {
              //   document.body.style.overflow = '';
              //   isClassStudy(false);
              // } else {
              //   document.body.style.overflow = 'hidden';
              //   isClassStudy(true);
              //   setWord(objectWord);
              // }
            }}
          >
            Прогресс
          </button>
        </div>
      </div>
      <Modal active={activeModal} setActive={setActiveModal}>
        <StudyProgress word={objectWord} />
      </Modal>
    </div>
  );
}

export default TextBookWords;
