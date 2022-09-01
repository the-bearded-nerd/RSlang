import React, { Component } from 'react';

// helpers
import shuffle from '../../common/shuffle';
import randomInteger from '../../common/randomInteger';

import RoundProps from '../../types/RoundProps';
import IWords from '../../types/IWords';

interface SprintState {
  currentRound: number;
  currentWord: string;
  randomAnswer: string;
  timeLeft: number;
}

export default class Sprint extends Component<RoundProps, SprintState> {
  data: IWords[];

  constructor(props: RoundProps) {
    super(props);
    this.state = {
      currentRound: 0,
      currentWord: '',
      randomAnswer: '',
      timeLeft: 60,
    };
    const { options } = this.props;
    const { data } = options;
    Object.assign(this, options);
    this.data = shuffle(data);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyboardHandler);
    this.startRound();
    this.startTimer();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyboardHandler);
  }

  setCurrentWord() {
    const { currentRound } = this.state;
    const { data } = this;
    const { word } = data[currentRound];
    this.setState({
      currentWord: word,
    });
  }

  getRandomAnswer() {
    const { data } = this;
    const { currentWord } = this.state;
    const arrayOfAnwers = data.filter((el) => el.word === currentWord);
    const num = randomInteger(0, this.data.length - 2);
    const { wordTranslate } = data[num];
    const answer = wordTranslate;
    this.setState({
      randomAnswer: wordTranslate,
    });
  }

  handleRightBtn = () => {
    console.log('handleRightBtn');
    console.log(this);
  };

  handleLeftBtn = () => {
    console.log('handleLeftBtn');
    console.log(this);
  };

  keyboardHandler() {
    console.log(this);
  }

  startRound() {
    this.setCurrentWord();
    this.getRandomAnswer();
  }

  startTimer() {
    const timer = setInterval(() => {
      const { timeLeft } = this.state;
      const time = timeLeft - 1;
      if (time === 0) {
        clearInterval(timer);
      }
      this.setState({
        timeLeft: time,
      });
    }, 1000);
  }

  render() {
    const { currentWord, randomAnswer, timeLeft } = this.state;
    return (
      <div className="sprint">
        <h3>Sprint</h3>
        <p>{timeLeft}</p>
        <p>{currentWord}</p>
        <p>{randomAnswer}</p>
        <span>
          <button type="button" onClick={this.handleLeftBtn}>
            Верно
          </button>
          <button type="button" onClick={this.handleRightBtn}>
            Неверно
          </button>
        </span>
      </div>
    );
  }
}
