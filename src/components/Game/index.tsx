import React, { Component } from 'react';
import Round from '../Round';
import Result from '../Result';

import IWords from '../../types/IWords';
import GameState from '../../types/GameState';

interface GameProps {
  options: GamePropsData;
}

interface GamePropsData {
  data: IWords[];
  restartGame: () => void;
}

export default class Game extends Component<GameProps, GameState> {
  guessedWords: IWords[];

  unGuessedWords: IWords[];

  data: IWords[];

  restartGame: () => void;

  constructor(props: GameProps) {
    super(props);
    this.state = {
      isGameFinished: false,
    };
    const { data, restartGame } = props.options;
    this.data = data;
    this.restartGame = restartGame;
    this.guessedWords = [];
    this.unGuessedWords = [];
  }

  saveRoundResult = (current: IWords, status: boolean) => {
    if (status) {
      this.guessedWords.push(current);
    } else {
      this.unGuessedWords.push(current);
    }
  };

  finishGame = () => {
    this.setState({
      isGameFinished: true,
    });
  };

  render() {
    const { isGameFinished } = this.state;
    const { data, finishGame, restartGame, saveRoundResult } = this;
    const { guessedWords, unGuessedWords } = this;
    const roundOptions = {
      data,
      saveRoundResult,
      finishGame,
    };
    const resultOptions = {
      guessedWords,
      unGuessedWords,
      restartGame,
    };
    return (
      <div className="game">
        {!isGameFinished ? <Round data={roundOptions} /> : <Result data={resultOptions} />}
      </div>
    );
  }
}
