import Users from '../Users/User';

const baseURL = 'https://rslang-fe2022q1.herokuapp.com/';

class UserAggregatedWords {
  static async getUsersWords(group: number, page: number, wordsPerPage = 20) {
    const id = Users.getId();
    const requestURL = new URL(`/users/${id}/aggregatedWords`, baseURL);
    const token = Users.getToken();
    if (wordsPerPage) requestURL.searchParams.append('wordsPerPage', wordsPerPage.toString());
    requestURL.searchParams.append('filter', `{"$and":[{"page":${page}},{"group":${group}}]}`);
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
      const result = responseJSON[0].paginatedResults;
      const newKey = 'id';
      const oldKey = '_id';
      for (let i = 0; i < result.length; i += 1) {
        result[i][newKey] = result[i][oldKey];
        delete result[i][oldKey];
      }
      return result;
    }
    return [];
  }

  static async getWordsByDifficulty(
    difficulty: string,
    wordsPerPage = 4000,
    group?: number,
    page?: number
  ) {
    const id = Users.getId();
    const requestURL = new URL(`/users/${id}/aggregatedWords`, baseURL);
    const token = Users.getToken();
    if (group) requestURL.searchParams.append('group', group.toString());
    if (page) requestURL.searchParams.append('page', page.toString());
    if (wordsPerPage) requestURL.searchParams.append('wordsPerPage', wordsPerPage.toString());
    requestURL.searchParams.append('filter', `{"userWord.difficulty":"${difficulty}"}`);
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
    return [];
  }

  static async getDifficultWords() {
    if (!Users.isAuthorized()) return [];
    const difficultWrods = await UserAggregatedWords.getWordsByDifficulty('hard');
    const result = difficultWrods[0].paginatedResults;
    const newKey = 'id';
    const oldKey = '_id';
    for (let i = 0; i < result.length; i += 1) {
      result[i][newKey] = result[i][oldKey];
      delete result[i][oldKey];
    }
    return result;
  }

  static async getLearnedtWords() {
    if (!Users.isAuthorized()) return [];
    const result = await UserAggregatedWords.getWordsByDifficulty('learned');
    return result[0].paginatedResults;
  }

  static async getSetDifficultWords() {
    const response = await UserAggregatedWords.getWordsByDifficulty('hard');
    const hardWords = response[0].paginatedResults;
    const fieldName = '_id';
    const IDs = hardWords.map((elem: any) => elem[fieldName]);
    const result = new Set(IDs);
    return result;
  }

  static async getSetLearnedtWords() {
    const response = await UserAggregatedWords.getWordsByDifficulty('learned');
    const learnedWords = response[0].paginatedResults;
    const fieldName = '_id';
    const IDs = learnedWords.map((elem: any) => elem[fieldName]);
    const result = new Set(IDs);
    return result;
  }

  static async getWordsById(userId: string, wordId: string) {
    const requestURL = new URL(`/users/${userId}/aggregatedWords/${wordId}`, baseURL);
    const token = Users.getToken();
    const response = await fetch(requestURL, {
      method: 'GET',
      credentials: 'include',
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

  static async isAllLearned(words: any) {
    return words.every(
      (elem: any) =>
        Object.prototype.hasOwnProperty.call(elem, 'userWord') &&
        elem.userWord.difficulty === 'learned'
    );
  }
}

export default UserAggregatedWords;
