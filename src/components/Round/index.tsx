import React, { Component, MouseEvent, MouseEventHandler } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

  randomWords: IWords[];

  btns: JSX.Element[];

  audio: HTMLAudioElement;

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
    this.randomWords = [];
    this.btns = [];
    this.setRandomWords();
    this.setAnswersBtns();
    this.finishGame = cb;
  }

  setRandomWords() {
    const { currentRound } = this.state;
    const arr = this.data.filter((_, i) => i !== currentRound);
    const temp = shuffle(arr);
    this.randomWords = temp.slice(0, 4);
  }

  setWordStatus = (status = false) => {
    this.wordStatus = status;
  };

  setAnswersBtns() {
    const { currentWord } = this;
    const { wordTranslate } = currentWord;
    const answers = this.randomWords.map((item) => {
      return (
        <button key={uuidv4()} type="button" disabled={false} onClick={this.clickHandler}>
          {item.wordTranslate}
        </button>
      );
    });
    const rightAnswer = (
      <button className="isRight" key={uuidv4()} type="button" onClick={this.clickHandler}>
        {wordTranslate}
      </button>
    );
    answers.push(rightAnswer);
    this.btns = shuffle(answers);
  }

  clickHandler = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLButtonElement;
    const status = target.className === 'isRight';
    this.setWordStatus(status);
    this.changeQuizStatus();
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
      this.setRandomWords();
      this.setAnswersBtns();
      this.setState({
        currentRound: num,
        isQuizActive: !isQuizActive,
      });
    } else {
      this.finishGame();
    }
  };

  render() {
    const { currentWord, changeQuizStatus, setWordStatus, btns, audio } = this;
    const quizOptions = {
      changeQuizStatus,
      setWordStatus,
      btns,
      currentWord,
      audio,
    };
    const cardOptions = {
      wordStatus: this.wordStatus,
      finishRound: this.finishRound,
      btns: this.btns,
    };
    const { isQuizActive } = this.state;
    return <div>{isQuizActive ? <Quiz data={quizOptions} /> : <Card data={cardOptions} />}</div>;
  }
}
