export default interface GreetingPropsOptions {
  startGame: () => void;
  changeLevel: (num: number) => void;
  gameName: string;
}
