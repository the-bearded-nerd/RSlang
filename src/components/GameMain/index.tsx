import React, { Component } from 'react';
import './index.css';

import Greeting from '../Greeting';
import Game from '../Game';

import LocalStorageService from '../../utils/LocalStorageService';
import Words from '../../utils/Words/Words';

// Import Types
import IWords from '../../types/IWords';
import GameMainState from '../../types/GameMainState';

import GameMainProps from '../../types/GameMainProps';

class GameMain extends Component<GameMainProps, GameMainState> {
  level: number;

  data: IWords[];

  constructor(props: GameMainProps) {
    super(props);
    this.state = {
      isGameStarted: false,
      isFullscreen: false,
      isMute: false,
    };
    this.data = [];
    this.level = 0;
  }

  componentDidMount() {
    const { onFullscreenChange } = this;
    document.addEventListener('fullscreenchange', onFullscreenChange);
    const storageData = LocalStorageService.getItem('gameWords');
    if (storageData) {
      this.data = LocalStorageService.getItem('gameWords') as IWords[];
    }
  }

  onFullscreenChange = () => {
    const status = !!document.fullscreenElement;
    this.setState({
      isFullscreen: status,
    });
    const { changeFullScreen } = this.props;
    changeFullScreen();
  };

  getData() {
    // ToDo
    console.log(this.level);
    Words.getWords().then((res) => {
      this.data = res;
      this.changeGameStatus();
    });
  }

  startGame = () => {
    if (this.data.length) {
      this.changeGameStatus();
    } else {
      this.getData();
    }
  };

  changeFullscreen = () => {
    const { isFullscreen } = this.state;
    if (!isFullscreen) {
      document.body.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  changeGameStatus = () => {
    const { isGameStarted } = this.state;
    this.setState({
      isGameStarted: !isGameStarted,
    });
  };

  changeLevel = (num: number) => {
    this.level = num;
  };

  changeMuteStatus = () => {
    const { isMute } = this.state;
    this.setState({
      isMute: !isMute,
    });
  };

  render() {
    const { isGameStarted, isMute } = this.state;
    const { gameName } = this.props;
    const gameOptions = {
      gameName,
      isMute,
      data: this.data,
      restartGame: this.startGame,
    };
    const greetOptions = {
      gameName,
      startGame: this.startGame,
      changeLevel: this.changeLevel,
    };
    return (
      <div className="audio-call">
        <span>
          <button className="fullscreen" type="button" onClick={this.changeFullscreen}>
            Fullscreen
          </button>
          <button type="button" onClick={this.changeMuteStatus}>
            {isMute ? 'Unmute' : 'Mute'}
          </button>
        </span>
        {!isGameStarted ? <Greeting options={greetOptions} /> : <Game options={gameOptions} />}
      </div>
    );
  }
}

export default GameMain;
