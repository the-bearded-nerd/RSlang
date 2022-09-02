import IWords from '../IWords';

export default interface QuizOptions {
  changeQuizStatus: () => void;
  setWordStatus: (status: boolean) => void;
  roundWords: IWords[];
  audio: HTMLAudioElement;
  rightAnswer: number;
}
