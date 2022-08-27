import React, { Component } from 'react';

export default class Result extends Component {
  constructor(props = {}) {
    super(props);
  }

  render() {
    return (
      <div className="audio-call-result">
        <div>Result</div>
        <button type="button">Играть ещё</button>
      </div>
    );
  }
}
