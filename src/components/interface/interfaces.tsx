export interface TypeSection {
  typeSection: string[];
  setIdHard: (id: number) => void;
  setNumberPage: () => void;
  idHard: number;
}

interface ResultWordInGames {
  audio: {
    right: number;
    wrong: number;
  };
  sprint: {
    right: number;
    wrong: number;
  };
}

export interface CurrentWords {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
  userWord: {
    difficulty: string;
    optional?: ResultWordInGames;
  };
}

export interface InforWordsProps {
  objectWord: CurrentWords;
}

export interface PropsWordInfo {
  objectWord: CurrentWords;
  currentDisabled: boolean;
  setDisabled: (disabled: boolean) => void;
  isflagPlayAudio: (v: boolean) => void;
  flagPlayAudio: boolean;
  userAggregatedWords: CurrentWords[];
  setUserAggregatedWords: React.Dispatch<React.SetStateAction<CurrentWords[]>>;
  setUserLearned: React.Dispatch<React.SetStateAction<CurrentWords[]>>;
  hard: number;
  setWords: React.Dispatch<React.SetStateAction<CurrentWords[]>>;
}

export interface PropsLocalDisabled {
  setLocalDisabled: (disabled: boolean) => void;
}
export interface PropsBtnPage {
  setNumberPage: () => void;
  currentCount: number;
  loading: boolean;
}

export interface ObjectAggr {
  flag: boolean;
  words: CurrentWords[];
}
export interface PropsWordsTextBook {
  hard: number;
  numberPage: number;
  userAggregatedWords: CurrentWords[];
  setUserAggregatedWords: React.Dispatch<React.SetStateAction<CurrentWords[]>>;
  userLearned: CurrentWords[];
  setWords: React.Dispatch<React.SetStateAction<CurrentWords[]>>;
  currentWords: CurrentWords[];
  setUserLearned: React.Dispatch<React.SetStateAction<CurrentWords[]>>;
  isLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PropsDifficulWord {
  objectWord: CurrentWords;
  setUserAggregatedWords: React.Dispatch<React.SetStateAction<CurrentWords[]>>;
  classNameDifficul: string;
  setUserLearned: React.Dispatch<React.SetStateAction<CurrentWords[]>>;
  hard: number;
  setWords: React.Dispatch<React.SetStateAction<CurrentWords[]>>;
}

export interface PropsLearnedWord {
  objectWord: CurrentWords;
  setUserAggregatedWords: React.Dispatch<React.SetStateAction<CurrentWords[]>>;
  isFlagDifficul: React.Dispatch<React.SetStateAction<boolean | null>>;
  flagDifficul: boolean | null;
  setUserLearned: React.Dispatch<React.SetStateAction<CurrentWords[]>>;
}
