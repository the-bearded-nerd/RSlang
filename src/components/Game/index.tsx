import React, { Component } from 'react';
import AudioCall from '../AudioCall';
import Result from '../Result';
import Sprint from '../Sprint';
import Statistic from '../../utils/Statistic/Statistic';

// Types
import IWords from '../../types/IWords';
import GameProps from '../../types/GameProps';
import GameState from '../../types/GameState';

export default class Game extends Component<GameProps, GameState> {
  guessedWords: IWords[];

  unGuessedWords: IWords[];

  currentSequence: number;

  bestSequence: number;

  data: IWords[];

  restartGame: () => void;

  constructor(props: GameProps) {
    super(props);
    this.state = {
      isGameFinished: false,
    };
    const { data, restartGame } = props.options;
    this.data = data;
    this.guessedWords = [];
    this.unGuessedWords = [];
    this.currentSequence = 0;
    this.bestSequence = 0;
    this.restartGame = restartGame;
  }

  compareSequences = (current: IWords, status: boolean) => {
    this.currentSequence = status ? this.currentSequence + 1 : 0;
    const { currentSequence, bestSequence } = this;
    if (currentSequence > bestSequence) {
      this.bestSequence = currentSequence;
    }
    this.sendRoundStat(current, status);
  };

  saveRoundResult = (current: IWords, status: boolean) => {
    if (status) {
      this.guessedWords.push(current);
    } else {
      this.unGuessedWords.push(current);
    }
    this.compareSequences(current, status);
  };

  finishGame = () => {
    this.setState({
      isGameFinished: true,
    });
  };

  sendRoundStat(current: IWords, status: boolean) {
    console.log('sendRoundStat', status);
    const { options } = this.props;
    const { id } = current;
    const { gameName } = options;
    const { bestSequence } = this;
    Statistic.saveTurnResult(id, gameName, status, bestSequence);
  }

  renderRound() {
    const { options } = this.props;
    const { gameName, isMute } = options;
    const { data, finishGame, saveRoundResult } = this;
    const gameOptions = {
      data,
      isMute,
      saveRoundResult,
      finishGame,
    };
    return gameName === 'audio' ? (
      <AudioCall options={gameOptions} />
    ) : (
      <Sprint options={gameOptions} />
    );
  }

  render() {
    const { isGameFinished } = this.state;
    const { restartGame, guessedWords, unGuessedWords, bestSequence } = this;
    const resultOptions = {
      guessedWords,
      unGuessedWords,
      bestSequence,
      restartGame,
    };
    return (
      <div className="game">
        {!isGameFinished ? this.renderRound() : <Result data={resultOptions} />}
      </div>
    );
  }
}
