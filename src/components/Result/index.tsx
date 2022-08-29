import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import IWords from '../../types/IWords';

interface ResultProps {
  data: ResultPropsData;
}

interface ResultPropsData {
  restartGame: () => void;
  guessedWords: IWords[];
  unGuessedWords: IWords[];
}

export default class Result extends Component<ResultProps> {
  guessedWords;

  unGuessedWords;

  restartGame;

  constructor(props: ResultProps) {
    super(props);
    const { guessedWords, unGuessedWords, restartGame } = props.data;
    this.guessedWords = guessedWords;
    this.unGuessedWords = unGuessedWords;
    this.restartGame = restartGame;
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keydownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.restartGame();
    }
  };

  renderResult() {
    return (
      <div className="words-status">
        <h3>Отгаданные слова</h3>
        <ul className="result">
          {this.guessedWords.map((el) => (
            <li key={uuidv4()}>
              <span>{`${el.word} - ${el.wordTranslate}`}</span>
            </li>
          ))}
        </ul>
        <h3>Неотгаданные слова</h3>
        <ul className="result">
          {this.unGuessedWords.map((el) => (
            <li key={uuidv4()}>
              <span>{`${el.word} - ${el.wordTranslate}`}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="audio-call-result">
        {this.renderResult()}
        <button type="button" onClick={this.restartGame}>
          Играть ещё
        </button>
      </div>
    );
  }
}
