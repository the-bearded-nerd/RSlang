import React, { Component } from 'react';
import Round from '../Round';
import Result from '../Result';

import Words from '../../utils/Words/Words';
import IWords from '../../types/IWords';

interface GameState {
  isLoading: boolean;
  isGameFinished: boolean;
}

export default class Game extends Component<{}, GameState> {
  data: IWords[];

  constructor(props = {}) {
    super(props);
    this.state = {
      isLoading: true,
      isGameFinished: false,
    };
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

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <div>Loading</div>;
    }
    const { isGameFinished } = this.state;
    return <div>{!isGameFinished ? <Round data={this.data} /> : <Result />}</div>;
  }
}
