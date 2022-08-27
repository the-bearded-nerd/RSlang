import React, { Component } from 'react';

interface CardProps {
  data: CardOptions;
}

interface CardOptions {
  wordStatus: boolean;
  btns: JSX.Element[];
  finishRound: () => void;
}

export default class Card extends Component<CardProps> {
  wordStatus;

  btns;

  finishRound;

  constructor(props: CardProps) {
    super(props);
    const { data } = this.props;
    this.wordStatus = data.wordStatus;
    this.finishRound = data.finishRound;
    this.btns = data.btns;
  }

  componentDidMount() {
    window.addEventListener('keydown', this.finish);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.finish);
  }

  finish = () => {
    this.finishRound();
  };

  render() {
    return (
      <>
        <div>Card</div>
        <div>{this.wordStatus ? 'отгадано' : 'не отгадано'}</div>
        {this.btns.map((btn) => {
          const clone = React.cloneElement(btn, { disabled: true });
          return clone;
        })}
        <button type="button" onClick={this.finish}>
          Далее
        </button>
      </>
    );
  }
}
