import React, { Component, MouseEvent, MouseEventHandler } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './index.css';

import Quiz from '../Quiz';
import Card from '../Card';

// Constants
import url from '../../constants/url';

import shuffle from '../../common/shuffle';

import IWords from '../../types/IWords';

interface RoundState {
  isQuizActive: boolean;
  currentRound: number;
}

interface RoundProps {
  data: IWords[];
  cb: () => void;
}

export default class Round extends Component<RoundProps, RoundState> {
  data: IWords[];

  currentWord: IWords;

  wordStatus: boolean;

  audio: HTMLAudioElement;

  roundWords: IWords[];

  rightAnswer: number;

  finishGame: () => void;

  constructor(props: RoundProps) {
    super(props);
    this.state = {
      isQuizActive: true,
      currentRound: 0,
    };
    const { data, cb } = this.props;
    const { currentRound } = this.state;
    this.data = shuffle(data);

    this.currentWord = data[currentRound];
    this.audio = new Audio(`${url}${this.currentWord.audio}`);
    this.wordStatus = false;
    this.roundWords = [];

    this.rightAnswer = 0;

    this.getRoundWords();
    this.finishGame = cb;
  }

  getRoundWords() {
    const { currentRound } = this.state;
    const { currentWord } = this;
    const arr = this.data.filter((_, i) => i !== currentRound);
    const temp = shuffle(arr).slice(0, 4);
    temp.push(currentWord);
    this.roundWords = shuffle(temp);
    this.rightAnswer = this.roundWords.findIndex((item) => item === currentWord);
  }

  setWordStatus = (status = false) => {
    this.wordStatus = status;
  };

  changeQuizStatus = () => {
    const { isQuizActive } = this.state;
    this.setState({
      isQuizActive: !isQuizActive,
    });
  };

  finishRound = () => {
    const { currentRound, isQuizActive } = this.state;
    if (currentRound < this.data.length - 1) {
      const num = currentRound + 1;
      this.currentWord = this.data[num];
      this.wordStatus = false;
      this.audio.src = `${url}${this.currentWord.audio}`;
      this.getRoundWords();
      this.setState({
        currentRound: num,
        isQuizActive: !isQuizActive,
      });
    } else {
      this.finishGame();
    }
  };

  render() {
    const { currentWord, rightAnswer, changeQuizStatus, setWordStatus, roundWords, audio } = this;
    const quizOptions = {
      changeQuizStatus,
      setWordStatus,
      roundWords,
      currentWord,
      rightAnswer,
      audio,
    };
    const cardOptions = {
      wordStatus: this.wordStatus,
      finishRound: this.finishRound,
      roundWords,
      rightAnswer,
      currentWord,
    };
    const { isQuizActive } = this.state;
    return (
      <div className="Round">
        {isQuizActive ? <Quiz data={quizOptions} /> : <Card data={cardOptions} />}
      </div>
    );
  }
}
