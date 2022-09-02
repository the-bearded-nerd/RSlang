import IWords from '../IWords';

export default interface CardOptions {
  isMute: boolean;
  currentWord: IWords;
  wordStatus: boolean;
  roundWords: IWords[];
  rightAnswer: number;
  finishRound: () => void;
}
