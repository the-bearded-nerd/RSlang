import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Import Constans
import url from '../../constants/url';

// Import Types
import ResultProps from '../../types/ResultProps';

export default class Result extends Component<ResultProps> {
  guessedWords;

  unGuessedWords;

  bestSequence;

  restartGame;

  constructor(props: ResultProps) {
    super(props);
    const { guessedWords, unGuessedWords, bestSequence, restartGame } = props.data;
    this.guessedWords = guessedWords;
    this.unGuessedWords = unGuessedWords;
    this.bestSequence = bestSequence;
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

  renderGuessedWords() {
    return (
      <div className="words-status">
        <h3>Отгаданные слова</h3>
        <ul className="result">
          {this.guessedWords.map((el) => {
            const audio = new Audio(`${url}${el.audio}`);
            return (
              <li key={uuidv4()}>
                <button
                  type="button"
                  onClick={() => {
                    audio.play();
                  }}
                >
                  Sound on
                </button>
                <span>{`${el.word} - ${el.wordTranslate}`}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  renderUnguessedWords() {
    return (
      <>
        <h3>Неотгаданные слова</h3>
        <ul className="result">
          {this.unGuessedWords.map((el) => {
            const audio = new Audio(`${url}${el.audio}`);
            return (
              <li key={uuidv4()}>
                <button
                  type="button"
                  onClick={() => {
                    audio.play();
                  }}
                >
                  Sound on
                </button>
                <span>{`${el.word} - ${el.wordTranslate}`}</span>
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  render() {
    return (
      <div className="audio-call-result">
        <div>лучшая серия из отгаданых подряд слов - {this.bestSequence}</div>
        {this.renderGuessedWords()}
        {this.renderUnguessedWords()}
        <button className="btn" type="button" onClick={this.restartGame}>
          Играть ещё
        </button>
      </div>
    );
  }
}
