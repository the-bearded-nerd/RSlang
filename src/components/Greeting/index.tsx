import React, { Component } from 'react';

interface GreetingProps {
  cb: () => void;
}

export default class Greeting extends Component<GreetingProps> {
  cb;

  constructor(props: GreetingProps) {
    super(props);
    const { cb } = this.props;
    this.cb = cb;
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keydownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.cb();
    }
  };

  render() {
    const { cb } = this;
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
        <p>тут нужно реализовать выбор сложности</p>
        <p>а так же нужно реализовать полный экран</p>
        <p>press Enter to start or click on button below</p>
        <button type="button" onClick={cb}>
          Начать
        </button>
      </div>
    );
  }
}
