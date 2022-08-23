import React from 'react';
import './index.css';

function Greeting({ fn }: any) {
  const keydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      window.removeEventListener('keydown', keydownHandler);
      fn();
    }
  };

  window.addEventListener('keydown', keydownHandler);
  return (
    <div className="greeting">
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
      <button type="button" onClick={fn}>
        Начать
      </button>
    </div>
  );
}

export default Greeting;
