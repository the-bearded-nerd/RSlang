import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AudioGameProps from '../../types/AudioGameProps';
import './index.css';

// Common
import shuffle from '../../common/shuffle';

// Constants
import url from '../../constants/url';

import { AudioGameState } from '../../types/AudioGameState';
import IWords from '../../types/IWords';

class AudioGame extends Component<AudioGameProps, AudioGameState> {
  audio: HTMLAudioElement;

  currentWord: IWords;

  wordStatus: boolean;

  constructor(props: AudioGameProps) {
    super(props);
    this.state = {
      isActive: true,
      currentRound: 0,
    };
    const { currentRound } = this.state;
    const { data } = this.props;
    this.currentWord = data[currentRound];
    this.wordStatus = false;
    this.audio = new Audio(`${url}${this.currentWord.audio}`);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keydownHandler);
    this.playAudio();
  }

  componentDidUpdate() {
    const { currentRound } = this.state;
    const { data } = this.props;
    this.currentWord = data[currentRound];
    this.audio = new Audio(`${url}${this.currentWord.audio}`);
    window.removeEventListener('keydown', this.keydownHandler);
    window.addEventListener('keydown', this.keydownHandler);
    const { isActive } = this.state;
    if (isActive) {
      this.playAudio();
      this.wordStatus = false;
    }
  }

  getAnswer = () => {
    const { isActive } = this.state;
    this.setState({
      isActive: !isActive,
    });
  };

  setRightAnswer = () => {
    this.wordStatus = true;
    this.getAnswer();
  };

  setWrongAnswer = () => {
    this.wordStatus = false;
    this.getAnswer();
  };

  setAnswersBtns() {
    const { props, setRightAnswer, setWrongAnswer } = this;
    const { currentRound } = this.state;
    const { wordTranslate } = props.data[currentRound];
    const arr = [1, 2, 3, 4, 5];
    const { isActive } = this.state;
    const buttons = arr.map((item, i) => {
      return (
        <button
          key={uuidv4()}
          type="button"
          onClick={!i ? setRightAnswer : setWrongAnswer}
          disabled={!isActive}
        >
          {!i ? wordTranslate : item}
        </button>
      );
    });
    return shuffle(buttons);
  }

  finishRound = () => {
    const { isActive, currentRound } = this.state;
    this.setState({
      currentRound: currentRound + 1,
      isActive: !isActive,
    });
  };

  playAudio = () => {
    this.audio.play();
  };

  showAudioBtn = () => {
    return (
      <div className="audio-block">
        <button type="button" onClick={this.playAudio}>
          Play audio
        </button>
      </div>
    );
  };

  showCardLayout = () => {
    const { currentRound } = this.state;
    const { data } = this.props;
    const { word, image } = data[currentRound];
    return (
      <>
        <div className="audio-call-card">
          <img src={`${url}${image}`} alt="" />
          <p>{word}</p>
        </div>
        <div>{this.wordStatus ? 'Верно' : 'Неверно'}</div>
        <button type="button" onClick={this.finishRound}>
          Next
        </button>
      </>
    );
  };

  showGuessLayout = () => {
    return (
      <>
        {this.showAudioBtn()}
        <div className="aswersBtns">{this.setAnswersBtns()}</div>
        <button type="button" onClick={this.setWrongAnswer}>
          Skip
        </button>
      </>
    );
  };

  keydownHandler = (e: KeyboardEvent) => {
    const { isActive } = this.state;
    switch (e.key) {
      case ' ':
        return this.audio.play();
      case 'Enter':
        return isActive ? this.getAnswer() : this.finishRound();
      default:
        return false;
    }
  };

  render() {
    const { isActive } = this.state;
    return (
      <div className="audio-game-content">
        {isActive ? this.showGuessLayout() : this.showCardLayout()}
      </div>
    );
  }
}

export default AudioGame;
