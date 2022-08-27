import React, { Component } from 'react';

interface ResultProps {
  cb: () => void;
}

export default class Result extends Component<ResultProps> {
  restartGame;

  constructor(props: ResultProps) {
    super(props);
    this.restartGame = props.cb;
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keydownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.restartGame();
    }
  };

  render() {
    return (
      <div className="audio-call-result">
        <div>Result</div>
        <button type="button" onClick={this.restartGame}>
          Играть ещё
        </button>
      </div>
    );
  }
}
