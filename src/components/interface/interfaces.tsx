export interface TypeSection {
  typeSection: string[];
  setDifficultyLevel: (id: number) => void;
  setNumberPage: () => void;
  difficultyLevel: number;
}

interface ResultWordInGames {
  isNew: boolean;
  audio: {
    right: number;
    wrong: number;
  };
  sprint: {
    right: number;
    wrong: number;
  };
}

export interface ContentWord {
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
  objectWord: ContentWord;
}

export interface PropsTextBookWords {
  objectWord: ContentWord;
  audioBtnDisabled: boolean;
  setAudioBtnDisabled: (disabled: boolean) => void;
  isflagPlayAudio: (v: boolean) => void;
  flagPlayAudio: boolean;
  userAggregatedWords: ContentWord[];
  setUserAggregatedWords: React.Dispatch<React.SetStateAction<ContentWord[]>>;
  difficultyLevel: number;
  setWords: React.Dispatch<React.SetStateAction<ContentWord[]>>;
  isClassStudy: React.Dispatch<React.SetStateAction<boolean>>;
  classStudy: boolean;
  setWord: React.Dispatch<React.SetStateAction<ContentWord | null>>;
  audioElement: HTMLAudioElement | undefined;
  setAudioElement: React.Dispatch<React.SetStateAction<HTMLAudioElement | undefined>>;
}

export interface PropsLocalDisabled {
  setLocalDisabled: (disabled: boolean) => void;
}
export interface PropsBtnPage {
  setNumberPage: () => void;
  numberPage: number;
  loading: boolean;
}

export interface PropsWordsTextBook {
  difficultyLevel: number;
  numberPage: number;
  userAggregatedWords: ContentWord[];
  setUserAggregatedWords: React.Dispatch<React.SetStateAction<ContentWord[]>>;
  setWords: React.Dispatch<React.SetStateAction<ContentWord[]>>;
  listWords: ContentWord[];
  isLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isClassStudy: React.Dispatch<React.SetStateAction<boolean>>;
  classStudy: boolean;
  setWord: React.Dispatch<React.SetStateAction<ContentWord | null>>;
  audioElement: HTMLAudioElement | undefined;
  setAudioElement: React.Dispatch<React.SetStateAction<HTMLAudioElement | undefined>>;
}

export interface PropsBtnWord {
  objectWord: ContentWord;
  setUserAggregatedWords: React.Dispatch<React.SetStateAction<ContentWord[]>>;
  classNameDifficulty: string;
  difficultyLevel: number;
  setWords: React.Dispatch<React.SetStateAction<ContentWord[]>>;
}

export interface PropsWordLearningProgress {
  word: ContentWord | null;
}
