import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css';

import IWords from '../../types/IWords';

// Constants
import url from '../../constants/url';

interface CardProps {
  data: CardOptions;
}

interface CardOptions {
  currentWord: IWords;
  wordStatus: boolean;
  roundWords: IWords[];
  rightAnswer: number;
  finishRound: () => void;
}

export default class Card extends Component<CardProps> {
  currentWord;

  wordStatus;

  roundWords;

  rightAnswer;

  finishRound;

  constructor(props: CardProps) {
    super(props);
    const { data } = this.props;
    this.currentWord = data.currentWord;
    this.wordStatus = data.wordStatus;
    this.roundWords = data.roundWords;
    this.rightAnswer = data.rightAnswer;
    this.finishRound = data.finishRound;
  }

  componentDidMount() {
    window.addEventListener('keydown', this.finish);
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
        <button type="button" onClick={this.finish}>
          Далее
        </button>
      </div>
    );
  }
}
