export interface TypeSection {
  typeSection: string[];
  setIdHard: (id: number) => void;
  setNumberPage: () => void;
  idHard: number;
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
}

export interface InforWordsProps {
  objectWord: CurrentWords;
}

export interface PropsAudioWords {
  objectWord: CurrentWords;
  currentDisabled: boolean;
  setDisabled: (disabled: boolean) => void;
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
}
