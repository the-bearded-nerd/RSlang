import IWords from '../IWords';

export default interface GamePropsData {
  gameName: string;
  data: IWords[];
  isMute: boolean;
  restartGame: () => void;
}
