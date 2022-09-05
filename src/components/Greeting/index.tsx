import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Constants
import greetingContent from '../../constants/greetingContent';

// import types
import GreetingProps from '../../types/GreetingProps';

export default class Greeting extends Component<GreetingProps> {
  levels;

  gameName;

  startGame;

  changeLevel;

  isFromTextbook;

  constructor(props: GreetingProps) {
    super(props);
    const { startGame, changeLevel, gameName, isFromTextbook } = props.options;
    this.levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    this.isFromTextbook = isFromTextbook;
    this.gameName = gameName;
    this.startGame = startGame;
    this.changeLevel = changeLevel;
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keydownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.startGame();
    }
  };

  selectLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const num = +value.trim();
    this.changeLevel(num);
  };

  renderBtns() {
    if (this.isFromTextbook) {
      return <div />;
    }
    return (
      <select onChange={this.selectLevel} defaultValue={0}>
        {this.levels.map((el, i) => (
          <option key={uuidv4()} value={`${i}`}>
            {el}
          </option>
        ))}
      </select>
    );
  }

  render() {
    const { gameName } = this;
    const obj = greetingContent[gameName];
    return (
      <div className="game-greeting">
        <h2>{obj.title}</h2>
        <p>{obj.definition}</p>
        <ul>
          {obj.listItems.map((el) => (
            <li key={uuidv4()}>{el}</li>
          ))}
        </ul>
        <div>
          <h3>Выберите уровень сложности</h3>
          {this.renderBtns()}
        </div>
        <p>press Enter to start or click on button below</p>
        <button className="btn" type="button" onClick={this.startGame}>
          Начать
        </button>
      </div>
    );
  }
}
