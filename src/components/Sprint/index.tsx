import React, { Component } from 'react';
import './index.css';

// helpers
import shuffle from '../../common/shuffle';
import randomInteger from '../../common/randomInteger';

// Constants
import correctSoundUrl from '../../constants/correct-sound-url';
import incorrectSoundUrl from '../../constants/incorrect-sound-url';

// Types
import SprintProps from '../../types/SprintProps';
import SprintState from '../../types/SprintState';
import IWords from '../../types/IWords';

export default class Sprint extends Component<SprintProps, SprintState> {
  data: IWords[];

  out;

  score;

  coefficient;

  sequense;

  audio;

  currentRound;

  saveRoundResult;

  finishGame;

  constructor(props: SprintProps) {
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

  componentDidUpdate() {
    window.addEventListener('keydown', this.keyboardHandler);
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
      const { sequense, score } = this;
      this.sequense = sequense + 1;
      this.coefficient = Math.floor(this.sequense / 4 + 1);
      console.log(this.coefficient);
      this.score = score + 20 * this.coefficient;
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

  keyboardHandler = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      this.handleRightBtn();
    }
    if (e.key === 'ArrowLeft') {
      this.handleLeftBtn();
    }
  };

  showBirdsAmount = () => {
    let out = 0;
    const { sequense } = this;
    if (sequense < 4) {
      out = sequense;
    }
    if (sequense > 4) {
      out = sequense % 4;
    }
    return out;
  };

  render() {
    const { timeLeft } = this.state;
    const { data, score, out, currentRound } = this;
    const { word } = data[currentRound];
    return (
      <div className="sprint">
        <p>{timeLeft}</p>
        <p>Текущий результат {score}</p>
        <div className="sprint-card">
          <h3>Sprint</h3>
          <span>Количество птичек: {this.showBirdsAmount()}</span>
          <p>{word}</p>
          <p>{out}</p>
          <span className="sprint-btns">
            <button className="sprint-btn" type="button" onClick={this.handleLeftBtn}>
              Верно
            </button>
            <button className="sprint-btn" type="button" onClick={this.handleRightBtn}>
              Неверно
            </button>
          </span>
        </div>
      </div>
    );
  }
}
