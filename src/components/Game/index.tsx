import React, { Component } from 'react';
import Round from '../Round';
import Result from '../Result';

import Words from '../../utils/Words/Words';
import IWords from '../../types/IWords';

interface GameProps {
  restartGame: () => void;
}

interface GameState {
  isLoading: boolean;
  isGameFinished: boolean;
}

export default class Game extends Component<GameProps, GameState> {
  data: IWords[];

  restartGame: () => void;

  constructor(props: GameProps) {
    super(props);
    this.state = {
      isLoading: true,
      isGameFinished: false,
    };
    this.restartGame = props.restartGame;
    this.data = [];
  }

  componentDidMount() {
    Words.getWords().then((res) => {
      this.data = res;
      this.setState({
        isLoading: false,
      });
    });
  }

  finishGame = () => {
    this.setState({
      isGameFinished: true,
    });
  };

  render() {
    const { isLoading, isGameFinished } = this.state;
    const { data, finishGame, restartGame } = this;
    if (isLoading) {
      return <div>Loading</div>;
    }

    return (
      <div>
        {!isGameFinished ? <Round data={data} cb={finishGame} /> : <Result cb={restartGame} />}
      </div>
    );
  }
}
