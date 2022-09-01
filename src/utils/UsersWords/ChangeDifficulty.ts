import UsersWords from './UsersWords';
import Statistic from '../Statistic/Statistic';

export default class ChangeDifficulty {
  static async setDifficult(wordId: string) {
    const isCreated = await UsersWords.getWord(wordId);
    if (isCreated) {
      UsersWords.updateWord(wordId, 'hard');
    } else {
      UsersWords.createWord(wordId, 'hard');
    }
  }

  static async setLearned(wordId: string) {
    Statistic.increaseLearnedWordsCount();
    const isCreated = await UsersWords.getWord(wordId);
    if (isCreated) {
      UsersWords.updateWord(wordId, 'learned');
    } else {
      UsersWords.createWord(wordId, 'learned');
    }
  }

  static async resetDifficulty(wordId: string) {
    const isCreated = await UsersWords.getWord(wordId);
    if (isCreated) {
      if (isCreated.difficulty === 'learned') Statistic.decreaseLearnedWordsCount();
      UsersWords.updateWord(wordId, ' ');
    }
  }
}
