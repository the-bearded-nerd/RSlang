import IWords from '../IWords';

export default interface GamePropsData {
  data: IWords[];
  isMute: boolean;
  restartGame: () => void;
}
