import Users from '../Users/User';
import UserAggregatedWords from '../UsersAggregatedWords/UserAggregatedWords';

const baseURL = 'https://rslang-fe2022q1.herokuapp.com/';

class Words {
  static async getWords(group?: number, page?: number) {
    const requestURL = new URL('/words', baseURL);
    if (group) requestURL.searchParams.append('group', group.toString());
    if (page) requestURL.searchParams.append('page', page.toString());
    const response = await fetch(requestURL);
    if (response.ok) {
      const responseJSON = await response.json();
      return responseJSON;
    }
    return [];
  }

  static async getWordById(id: string) {
    const requestURL = new URL(`/words/${id}`, baseURL);
    const response = await fetch(requestURL);
    if (response.ok) {
      const responseJSON = await response.json();
      console.log(responseJSON);
      return responseJSON;
    }
    return [];
  }

  static async getTextbookWords(group: number, page: number) {
    let result;
    if (Users.isAuthorized()) result = await UserAggregatedWords.getUsersWords(group, page);
    else result = await this.getWords(group, page);
    return result;
  }

  static async get20RandomWordsByGroup(group: number) {
    const pageNumber = Math.floor(Math.random() * 29);
    const wordsFromGroup = await this.getWords(group, pageNumber);
    return wordsFromGroup;
  }
}
export default Words;
