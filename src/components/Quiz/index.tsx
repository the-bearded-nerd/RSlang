import React, { Component } from 'react';
import './index.css';

import IWords from '../../types/IWords';

interface QuizProps {
  data: QuizOptions;
}

interface QuizOptions {
  changeQuizStatus: () => void;
  setWordStatus: (status: boolean) => void;
  btns: JSX.Element[];
  currentWord: IWords;
  audio: HTMLAudioElement;
}

export default class Quiz extends Component<QuizProps> {
  changeQuizStatus;

  setWordStatus;

  btns;

  audio;

  constructor(props: QuizProps) {
    super(props);
    this.changeQuizStatus = props.data.changeQuizStatus;
    this.setWordStatus = props.data.setWordStatus;
    this.btns = props.data.btns;
    this.audio = props.data.audio;
    this.playAudio();
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keydownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = (e: KeyboardEvent) => {
    const { changeQuizStatus, setWordStatus } = this;
    const key = +e.key;
    if (!Number.isNaN(key) && key > 0 && key <= 5) {
      if (this.btns[key - 1].props.className === 'isRight') {
        setWordStatus(true);
      }
      changeQuizStatus();
    }
    if (e.key === 'Enter') {
      setWordStatus(false);
      changeQuizStatus();
    }
    if (e.key.trim() === '') {
      this.playAudio();
    }
  };

  playAudio = () => {
    this.audio.play();
  };

  render() {
    return (
      <div className="audio-game-content">
        <div className="audio-wrapper">
          <button type="button" onClick={this.playAudio}>
            Play audio
          </button>
        </div>
        <div className="answers">{this.btns}</div>
        <button type="button">Skip</button>
      </div>
    );
  }
}
