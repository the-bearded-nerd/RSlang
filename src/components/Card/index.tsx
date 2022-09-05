import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css';

// Constants
import url from '../../constants/url';
import correctSoundUrl from '../../constants/correct-sound-url';
import incorrectSoundUrl from '../../constants/incorrect-sound-url';

// Import Types
import CardProps from '../../types/CardProps';

export default class Card extends Component<CardProps> {
  currentWord;

  wordStatus;

  wordStatusSound;

  roundWords;

  rightAnswer;

  isMute;

  finishRound;

  constructor(props: CardProps) {
    super(props);
    const { options } = this.props;
    const { currentWord, wordStatus, roundWords, rightAnswer, isMute, finishRound } = options;
    this.currentWord = currentWord;
    this.wordStatus = wordStatus;
    this.roundWords = roundWords;
    this.rightAnswer = rightAnswer;
    this.isMute = isMute;
    this.finishRound = finishRound;
    this.wordStatusSound = new Audio();
  }

  componentDidMount() {
    window.addEventListener('keydown', this.finish);
    const src = this.wordStatus ? correctSoundUrl : incorrectSoundUrl;
    this.wordStatusSound.src = src;
    if (!this.isMute) {
      this.wordStatusSound.play();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.finish);
  }

  finish = () => {
    this.finishRound();
  };

  renderAnswers() {
    const guessClass = this.wordStatus ? 'guessed' : 'unguessed';
    return (
      <div className="answers">
        {this.roundWords.map((item, i) => {
          const className = i === this.rightAnswer ? guessClass : '';
          return (
            <div className={`non-active ${className}`} key={uuidv4()} role="button" tabIndex={0}>
              <span>{i + 1}</span>
              <span>{item.wordTranslate}</span>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { image, word } = this.currentWord;
    return (
      <div className="card">
        <img src={`${url}${image}`} alt="" />
        <p>{this.wordStatus ? 'отгадано' : 'не отгадано'}</p>
        <p>{word}</p>
        {this.renderAnswers()}
        <button className="btn card-btn" type="button" onClick={this.finish}>
          Далее
        </button>
      </div>
    );
  }
}
