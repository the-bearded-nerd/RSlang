const baseURL = 'https://rslang-fe2022q1.herokuapp.com/';

class UserAggregatedWords {
  static async getWordsByDifficulty(
    id: string,
    group?: number,
    page?: number,
    wordsPerPage?: number,
    difficulty?: string
  ) {
    const requestURL = new URL(`/users/${id}/aggregatedWords`, baseURL);
    if (group) requestURL.searchParams.append('group', group.toString());
    if (page) requestURL.searchParams.append('page', page.toString());
    if (wordsPerPage) requestURL.searchParams.append('wordsPerPage', wordsPerPage.toString());
    if (difficulty)
      requestURL.searchParams.append(
        'filter',
        `{"$or":[{"userWord.difficulty":"${difficulty}"},{"userWord.difficulty":"${difficulty}"}]}`
      );
    const response = await fetch(requestURL);
    if (response.ok) {
      const responseJSON = await response.json();
      console.log(responseJSON);
      return responseJSON;
    }
    return [];
  }

  static async getWordsById(userId: string, wordId: string) {
    const requestURL = new URL(`/users/${userId}/aggregatedWords/${wordId}`, baseURL);
    const response = await fetch(requestURL);
    if (response.ok) {
      const responseJSON = await response.json();
      return responseJSON;
    }
    return null;
  }
}

export default UserAggregatedWords;
