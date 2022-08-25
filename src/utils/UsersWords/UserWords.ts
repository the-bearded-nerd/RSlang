const baseURL = 'https://rslang-fe2022q1.herokuapp.com/';
import Users from '../Users/User';

class UsersWords {
  static async getWords(id: string) {
    const requestURL = new URL(`/users/${id}/words`, baseURL);
    const response = await fetch(requestURL);
    if (response.ok) {
      const responseJSON = await response.json();
      console.log(responseJSON);
      return responseJSON;
    }
    return [];
  }

  static async createWord(wordId: string, difficulty: string) {
    const userId = Users.getId();
    const requestURL = new URL(`/users/${userId}/words/${wordId}`, baseURL);
    const token = Users.getToken();
    const response = await fetch(requestURL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ difficulty }),
    });
    return {
      ok: response.ok,
      errcode: response.ok ? null : response.status,
    };
  }

  static async getWord(wordId: string) {
    const userId = Users.getId();
    const requestURL = new URL(`/users/${userId}/words/${wordId}`, baseURL);
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

  static async updateWord(wordId: string, difficulty: string) {
    const userId = Users.getId();
    const requestURL = new URL(`/users/${userId}/words/${wordId}`, baseURL);
    const token = Users.getToken();
    const response = await fetch(requestURL, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ difficulty }),
    });
    return {
      ok: response.ok,
      errcode: response.ok ? null : response.status,
    };
  }

  static async deleteWord(wordId: string) {
    const userId = Users.getId();
    const token = Users.getToken();
    const requestURL = new URL(`/users/${userId}/words/${wordId}`, baseURL);
    const response = await fetch(requestURL, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return {
      ok: response.ok,
      errcode: response.ok ? null : response.status,
    };
  }

  static async setDifficult(wordId: string) {
    const isCreated = await UsersWords.getWord(wordId);
    if (isCreated) {
      UsersWords.updateWord(wordId, 'hard');
    } else {
      UsersWords.createWord(wordId, 'hard');
    }
  }

  static async setLearned(wordId: string) {
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
      UsersWords.updateWord(wordId, '');
    }
  }
}
export default UsersWords;
