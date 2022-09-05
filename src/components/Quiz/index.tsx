import React, { Component, MouseEvent } from 'react';
import './index.css';
import { v4 as uuidv4 } from 'uuid';

// Import types
import QuizProps from '../../types/QuizProps';

export default class Quiz extends Component<QuizProps> {
  roundWords;

  audio;

  rightAnswer;

  changeQuizStatus;

  setWordStatus;

  constructor(props: QuizProps) {
    super(props);
    const { data } = props;
    this.rightAnswer = data.rightAnswer;
    this.roundWords = data.roundWords;
    this.audio = data.audio;
    this.audio.autoplay = true;
    this.setWordStatus = data.setWordStatus;
    this.changeQuizStatus = data.changeQuizStatus;
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
      const status = key === this.rightAnswer + 1;
      setWordStatus(status);
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

  clickHandler = (e: MouseEvent) => {
    e.stopPropagation();
    const firstChild = e.currentTarget.firstChild as HTMLElement;
    const value = firstChild.textContent?.trim() as string;
    const status = +value === this.rightAnswer + 1;
    this.setWordStatus(status);
    this.changeQuizStatus();
  };

  skip = () => {
    this.setWordStatus(false);
    this.changeQuizStatus();
  };

  renderAnswers() {
    return (
      <div className="answers">
        {this.roundWords.map((item, i) => {
          return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
              className="answers__item"
              key={uuidv4()}
              role="button"
              tabIndex={0}
              onClick={this.clickHandler}
            >
              <span>{i + 1}</span>
              <span>{item.wordTranslate}</span>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div className="audio-game-content">
        <div className="audio-wrapper">
          <button type="button" onClick={this.playAudio}>
            Play audio
          </button>
        </div>
        {this.renderAnswers()}
        <button className="btn" type="button" onClick={this.skip}>
          Skip
        </button>
      </div>
    );
  }
}
