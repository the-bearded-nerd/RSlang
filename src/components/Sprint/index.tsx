import React, { Component } from 'react';

// helpers
import shuffle from '../../common/shuffle';
import randomInteger from '../../common/randomInteger';

// Constants
import correctSoundUrl from '../../constants/correct-sound-url';
import incorrectSoundUrl from '../../constants/incorrect-sound-url';

import RoundProps from '../../types/RoundProps';
import SprintState from '../../types/SprintState';
import IWords from '../../types/IWords';

export default class Sprint extends Component<RoundProps, SprintState> {
  data: IWords[];

  out;

  score;

  coefficient;

  sequense;

  audio;

  currentRound;

  saveRoundResult;

  finishGame;

  constructor(props: RoundProps) {
    super(props);
    this.state = {
      timeLeft: 60,
      result: false,
    };
    const { options } = this.props;
    const { data } = options;
    this.data = shuffle(data);
    this.currentRound = 0;
    this.score = 0;
    this.coefficient = 20;
    this.sequense = 0;
    this.audio = new Audio();
    this.out = '';
    this.startGame();
    this.finishGame = options.finishGame;
    this.saveRoundResult = options.saveRoundResult;
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyboardHandler);
    this.startTimer();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyboardHandler);
  }

  startGame = () => {
    const { result } = this.state;
    const { currentRound } = this;
    if (result) {
      const { wordTranslate } = this.data[currentRound];
      this.out = wordTranslate;
    } else {
      const arr = this.data.filter((item, i) => i !== currentRound);
      const num = randomInteger(0, arr.length - 1);
      const { wordTranslate } = arr[num];
      this.out = wordTranslate;
    }
  };

  changeRound = () => {
    const { currentRound } = this;
    const num = currentRound + 1;
    if (currentRound < this.data.length - 1) {
      this.currentRound = num;
      this.startRound();
    } else {
      this.finishGame();
    }
  };

  startRound = () => {
    const { currentRound } = this;
    const res = !!randomInteger(0, 1);
    console.log(res);
    if (res) {
      const { wordTranslate } = this.data[currentRound];
      this.out = wordTranslate;
    } else {
      const arr = this.data.filter((item, i) => i !== currentRound);
      const num = randomInteger(0, arr.length - 1);
      const { wordTranslate } = arr[num];
      this.out = wordTranslate;
    }
    this.setState({
      result: res,
    });
  };

  handleLeftBtn = () => {
    this.verifyAnswer(true);
  };

  handleRightBtn = () => {
    this.verifyAnswer(false);
  };

  verifyAnswer = (answer: boolean) => {
    const { result } = this.state;
    const { data, currentRound } = this;
    const status = answer === result;
    this.playAudio(status);
    this.saveRoundResult(data[currentRound], status);
    this.handleAnswer(status);
  };

  handleAnswer = (status: boolean) => {
    if (status) {
      const { coefficient, sequense, score } = this;
      this.score = score + 1 * coefficient;
      if (this.sequense < 3) {
        this.sequense = sequense + 1;
      }
    } else {
      this.sequense = 0;
    }
    this.changeRound();
  };

  playAudio = (status: boolean) => {
    const { options } = this.props;
    const { isMute } = options;
    const url = status ? correctSoundUrl : incorrectSoundUrl;
    this.audio.src = url;
    if (!isMute) {
      this.audio.play();
    }
  };

  startTimer = () => {
    const { finishGame } = this;
    const timer = setInterval(() => {
      const { timeLeft } = this.state;
      const time = timeLeft - 1;
      if (time === 0) {
        clearInterval(timer);
        finishGame();
      }
      this.setState({
        timeLeft: time,
      });
    }, 1000);
    return this;
  };

  keyboardHandler = () => {
    console.log(this);
  };

  render() {
    const { timeLeft } = this.state;
    const { data, score, out, currentRound } = this;
    const { word } = data[currentRound];
    return (
      <div className="sprint">
        <p>{timeLeft}</p>
        <p>Текущий результат {score}</p>
        <h3>Sprint</h3>
        <span>Количество птичек: {this.sequense}</span>
        <p>{word}</p>
        <p>{out}</p>
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
