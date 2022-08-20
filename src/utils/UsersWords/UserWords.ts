const baseURL = 'https://rslang-fe2022q1.herokuapp.com/';

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

  static async createWord(userId: string, wordId: string, difficulty: string) {
    const requestURL = new URL(`/users/${userId}/words/${wordId}`, baseURL);
    const response = await fetch(requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ difficulty }),
    });
    return {
      ok: response.ok,
      errcode: response.ok ? null : response.status,
    };
  }

  static async getWord(userId: string, wordId: string) {
    const requestURL = new URL(`/users/${userId}/words/${wordId}`, baseURL);
    const response = await fetch(requestURL);
    if (response.ok) {
      const responseJSON = await response.json();
      return responseJSON;
    }
    return null;
  }

  static async updateWord(userId: string, wordId: string, difficulty: string) {
    const requestURL = new URL(`/users/${userId}/words/${wordId}`, baseURL);
    const response = await fetch(requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ difficulty }),
    });
    return {
      ok: response.ok,
      errcode: response.ok ? null : response.status,
    };
  }

  static async deleteWord(userId: string, wordId: string) {
    const requestURL = new URL(`/users/${userId}/words/${wordId}`, baseURL);
    const response = await fetch(requestURL, {
      method: 'DELETE',
    });
    return {
      ok: response.ok,
      errcode: response.ok ? null : response.status,
    };
  }
}
export default UsersWords;
