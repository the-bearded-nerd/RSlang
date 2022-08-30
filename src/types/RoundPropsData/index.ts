import IWords from '../IWords';

export default interface RoundPropsData {
  data: IWords[];
  isMute: boolean;
  saveRoundResult: (current: IWords, status: boolean) => void;
  finishGame: () => void;
}
