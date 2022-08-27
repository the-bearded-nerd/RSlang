import React, { Component } from 'react';
import './index.css';

import Greeting from '../Greeting';
import Game from '../Game';

interface AudioCallState {
  isGameStarted: boolean;
}

class AudioCall extends Component<{}, AudioCallState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      isGameStarted: false,
    };
  }

  changeState = () => {
    const { isGameStarted } = this.state;
    this.setState({
      isGameStarted: !isGameStarted,
    });
  };

  render() {
    const { isGameStarted } = this.state;
    return (
      <div className="audio-call">
        {!isGameStarted ? <Greeting cb={this.changeState} /> : <Game />}
      </div>
    );
  }
}

export default AudioCall;
