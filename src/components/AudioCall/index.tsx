import React, { Component } from 'react';

import './index.css';

import Quiz from '../Quiz';
import Card from '../Card';

// helpers
import shuffle from '../../common/shuffle';

// Constants
import url from '../../constants/url';

// Types
import IWords from '../../types/IWords';
import RoundProps from '../../types/RoundProps';
import RoundState from '../../types/RoundState';

export default class AudioCall extends Component<RoundProps, RoundState> {
  data: IWords[];

  currentWord: IWords;

  wordStatus: boolean;

  audio: HTMLAudioElement;

  roundWords: IWords[];

  rightAnswer;

  saveRoundResult;

  finishGame: () => void;

  constructor(props: RoundProps) {
    super(props);
    this.state = {
      isQuizActive: true,
      currentRound: 0,
    };
    const { data, finishGame, saveRoundResult } = props.options;
    const { currentRound } = this.state;
    this.data = shuffle(data);

    this.currentWord = data[currentRound];
    this.audio = new Audio(`${url}${this.currentWord.audio}`);
    this.wordStatus = false;
    this.roundWords = [];
    this.rightAnswer = 0;

    this.getRoundWords();
    this.saveRoundResult = saveRoundResult;
    this.finishGame = finishGame;
  }

  getRoundWords() {
    const { currentWord } = this;
    const arr = this.data.filter((item) => item.word !== currentWord.word);
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
    const { data, saveRoundResult, wordStatus } = this;
    if (currentRound < this.data.length - 1) {
      saveRoundResult(data[currentRound], wordStatus);
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
    const { options } = this.props;

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
      currentWord,
      isMute: options.isMute,
      roundWords,
      rightAnswer,
      finishRound: this.finishRound,
    };
    const { isQuizActive } = this.state;
    return (
      <div className="Round">
        {isQuizActive ? <Quiz data={quizOptions} /> : <Card options={cardOptions} />}
      </div>
    );
  }
}
