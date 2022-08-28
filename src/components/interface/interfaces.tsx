export interface TypeSection {
  typeSection: string[];
  setIdHard: (id: number) => void;
  setNumberPage: () => void;
  idHard: number;
}

export interface CurrentWords {
  [x: string]: any;
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
}

export interface InforWordsProps {
  objectWord: CurrentWords;
}

export interface PropsWordInfo {
  objectWord: CurrentWords;
  currentDisabled: boolean;
  setDisabled: (disabled: boolean) => void;
  setFlag: (v: boolean) => void;
  flag: boolean;
  userAggregatedWords: CurrentWords[];
  className: string;
}

export interface PropsLocalDisabled {
  setLocalDisabled: (disabled: boolean) => void;
}
export interface PropsBtnPage {
  setNumberPage: () => void;
  currentCount: number;
}

export interface PropsWords {
  hard: number;
  numberPage: number;
  userAggregatedWords: CurrentWords[];
  setUserAggregatedWords: (str: CurrentWords[]) => void;
}

export interface IdWord {
  id: string;
  userAggregatedWords?: CurrentWords[];
}
