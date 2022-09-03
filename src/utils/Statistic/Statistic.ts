import UsersWords from '../UsersWords/UsersWords';
import Users from '../Users/User';

const baseURL = 'https://rslang-fe2022q1.herokuapp.com/';

class Statistic {
  static async saveTurnResult(
    wordId: string,
    game: string,
    isRightAnswer: boolean,
    longestSeries: number
  ) {
    console.log(isRightAnswer);
    if (!Users.isAuthorized()) return;
    const word = await UsersWords.getWord(wordId);
    console.log(word);
    if (word) {
      let { difficulty } = word;
      const { optional } = word;
      optional.currentRight = isRightAnswer ? optional.currentRight + 1 : 0;
      optional[game].right = isRightAnswer ? optional[game].right + 1 : optional[game].right;
      optional.currentWrong = isRightAnswer ? 0 : optional.currentWrong + 1;
      optional[game].wrong = isRightAnswer ? optional[game].wrong : optional[game].wrong + 1;
      optional.lastChanged = this.getDate();
      if (!isRightAnswer && difficulty === 'learned') {
        difficulty = ' ';
      }
      if (
        (optional.currentRight >= 3 && difficulty === ' ') ||
        (optional.currentRight >= 5 && difficulty === 'hard')
      ) {
        difficulty = 'learned';
      }

      this.saveUserStat(game, isRightAnswer, optional.isNew, longestSeries);
      if (optional.isNew) optional.isNew = false;
      UsersWords.updateWordWithOptional(wordId, difficulty, optional);
    } else {
      console.log('слова нет');
      const difficulty = ' ';
      const optional = {
        isNew: false,
        lastChanged: this.getDate(),
        currentRight: isRightAnswer ? 1 : 0,
        currentWrong: !isRightAnswer ? 1 : 0,
        audio: {
          right: game === 'audio' && isRightAnswer ? 1 : 0,
          wrong: game === 'audio' && !isRightAnswer ? 1 : 0,
        },
        sprint: {
          right: game === 'sprint' && isRightAnswer ? 1 : 0,
          wrong: game === 'spring' && !isRightAnswer ? 1 : 0,
        },
      };
      this.saveUserStat(game, isRightAnswer, true, longestSeries);
      UsersWords.createWordWithOptional(wordId, difficulty, optional);
    }
  }

  static async saveUserStat(
    game: string,
    isRightAnswer: boolean,
    isNewWord: boolean,
    longestSeries: number
  ) {
    const statistic = await this.getStatistic();
    if (statistic) {
      const learnedCount = isNewWord ? 1 : 0;
      statistic.learnedWords += learnedCount;
      const currentDate = this.getDate();
      statistic.optional.wordStatistics[currentDate] = statistic.optional.wordStatistics[
        currentDate
      ]
        ? statistic.optional.wordStatistics[currentDate] + learnedCount
        : statistic.learnedWords;
      statistic.optional.gameStatistics[game].learnedWords += learnedCount;
      statistic.optional.gameStatistics[game].right += learnedCount;
      statistic.optional.gameStatistics[game].wrong += 1 - learnedCount;
      statistic.optional.gameStatistics[game].longestSeries = Math.max(
        statistic.optional.gameStatistics[game].longestSeries,
        longestSeries
      );
      statistic.optional.gameStatistics[game].lastChanged = currentDate;
      this.saveStatistics(statistic.learnedWords, statistic.optional);
    } else {
      const learnedWords = isNewWord ? 1 : 0;
      const optional = {
        wordStatistics: {
          [this.getDate()]: learnedWords,
        },
        gameStatistics: {
          audio: {
            right: game === 'audio' && isRightAnswer ? 1 : 0,
            wrong: game === 'audio' && !isRightAnswer ? 1 : 0,
            learnedWords: game === 'audio' && isNewWord ? 1 : 0,
            lastChanged: game === 'audio' ? this.getDate() : null,
            longestSeries: game === 'audio' ? longestSeries : 0,
          },
          sprint: {
            right: game === 'sprint' && isRightAnswer ? 1 : 0,
            wrong: game === 'spring' && !isRightAnswer ? 1 : 0,
            learnedWords: game === 'sprint' && isNewWord ? 1 : 0,
            lastChanged: game === 'sprint' ? this.getDate() : null,
            longestSeries: game === 'sprint' ? longestSeries : 0,
          },
        },
      };
      this.saveStatistics(learnedWords, optional);
    }
  }

  static async getStatistic() {
    const id = Users.getId();
    const token = Users.getToken();
    const requestURL = new URL(`/users/${id}/statistics`, baseURL);
    const response = await fetch(requestURL, {
      method: 'GET',
      credentials: 'omit',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    if (response.ok) {
      const responseJSON = await response.json();
      return responseJSON;
    }
    return null;
  }

  static async saveStatistics(learnedWords: any, optional: any) {
    const userId = Users.getId();
    const requestURL = new URL(`/users/${userId}/statistics`, baseURL);
    const token = Users.getToken();
    const response = await fetch(requestURL, {
      method: 'PUT',
      credentials: 'omit',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ learnedWords, optional }),
    });
    return {
      ok: response.ok,
      errcode: response.ok ? null : response.status,
    };
  }

  static getDate() {
    const date = new Date();
    const currDate = [
      '0'.concat(date.getDate().toString()),
      '0'.concat((date.getMonth() + 1).toString()),
      date.getFullYear().toString(),
    ]
      .map((component) => component.slice(-2))
      .join('.');
    return currDate;
  }

  static async increaseLearnedWordsCount() {
    if (!Users.isAuthorized()) return;
    const stat = await this.getStatistic();
    let { learnedWords } = stat;
    const { optional } = stat;
    const date = this.getDate();
    if (optional.wordStatistics[date]) optional.wordStatistics[date] += 1;
    else optional.wordStatistics[date] = 1;
    learnedWords += 1;
    this.saveStatistics(learnedWords, optional);
  }

  static async decreaseLearnedWordsCount() {
    if (!Users.isAuthorized()) return;
    const stat = await Statistic.getStatistic();
    let { learnedWords } = stat;
    const { optional } = stat;
    const date = this.getDate();
    if (optional.wordStatistics[date]) optional.wordStatistics[date] -= 1;
    else optional.wordStatistics[date] = 0;
    learnedWords -= 1;
    this.saveStatistics(learnedWords, optional);
  }
}

export default Statistic;
