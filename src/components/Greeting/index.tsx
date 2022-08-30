import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

// import types
import GreetingProps from '../../types/GreetingProps';

export default class Greeting extends Component<GreetingProps> {
  levels;

  startGame;

  changeLevel;

  constructor(props: GreetingProps) {
    super(props);
    const { startGame, changeLevel } = props.options;
    this.levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
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
    return (
      <div className="audio-call-greeting">
        <h2>Аудиовызов</h2>
        <p>Выберите из предложенных вариантов ответов правильный перевод слова, который услышите</p>
        <ul>
          <li>Используйте мышь, чтобы выбрать.</li>
          <li>Используйте цифровые клавиши от 1 до 5 для выбора ответа</li>
          <li>Используйте пробел для повтроного звучания слова</li>
          <li>Используйте клавишу Enter для подсказки или для перехода к следующему слову</li>
        </ul>
        <div>
          <h3>Выберите уровень сложности</h3>
          {this.renderBtns()}
        </div>
        <p>press Enter to start or click on button below</p>
        <button type="button" onClick={this.startGame}>
          Начать
        </button>
      </div>
    );
  }
}
