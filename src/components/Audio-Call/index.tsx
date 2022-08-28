import React, { Component } from 'react';
import './index.css';

import Greeting from '../Greeting';
import Game from '../Game';

interface AudioCallState {
  isGameStarted: boolean;
  isFullscreen: boolean;
}

class AudioCall extends Component<{}, AudioCallState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      isGameStarted: false,
      isFullscreen: false,
    };
  }

  componentDidMount() {
    const { onFullscreenChange } = this;
    document.addEventListener('fullscreenchange', onFullscreenChange);
  }

  onFullscreenChange = () => {
    const status = !!document.fullscreenElement;
    this.setState({
      isFullscreen: status,
    });
  };

  changeState = () => {
    const { isGameStarted } = this.state;
    this.setState({
      isGameStarted: !isGameStarted,
    });
  };

  changeFullscreen = () => {
    const { isFullscreen } = this.state;
    if (!isFullscreen) {
      document.body.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  render() {
    const { isGameStarted } = this.state;
    return (
      <div className="audio-call">
        <button className="fullscreen" type="button" onClick={this.changeFullscreen}>
          Fullscreen
        </button>
        {!isGameStarted ? (
          <Greeting cb={this.changeState} />
        ) : (
          <Game restartGame={this.changeState} />
        )}
      </div>
    );
  }
}

export default AudioCall;
