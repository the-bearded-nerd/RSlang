import IWords from '../IWords';

export default interface ResultPropsData {
  guessedWords: IWords[];
  unGuessedWords: IWords[];
  bestSequence: number;
  restartGame: () => void;
}
