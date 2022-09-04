const baseURL = 'https://rslang-fe2022q1.herokuapp.com/';

class Users {
  static async create(name: string, email: string, password: string) {
    const newUser = { name, email, password };
    const requestURL = new URL('/users', baseURL);
    const response = await fetch(requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newUser),
    });
    return {
      ok: response.ok,
      errcode: response.ok ? null : response.status,
    };
  }

  static async get(id: string) {
    const requestURL = new URL(`/users/${id}`, baseURL);
    const response = await fetch(requestURL);
    if (response.ok) {
      const responseJSON = await response.json();
      return responseJSON;
    }
    return null;
  }

  static async update(id: string, email: string, password: string) {
    const updatedData = { email, password };
    const requestURL = new URL(`/users/${id}`, baseURL);
    const response = await fetch(requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(updatedData),
    });
    return {
      ok: response.ok,
      errcode: response.ok ? null : response.status,
    };
  }

  static async delete(id: string) {
    const requestURL = new URL(`/users/${id}`, baseURL);
    const response = await fetch(requestURL, {
      method: 'DELETE',
    });
    return {
      ok: response.status === 204,
      errcode: response.status === 204 ? null : response.status,
    };
  }

  static async tokens(id: string) {
    const requestURL = new URL(`/users/${id}/tokens`, baseURL);
    const response = await fetch(requestURL);
    if (response.ok) {
      const responseJSON = await response.json();
      return responseJSON;
    }
    return null;
  }

  static async signin(email: string, password: string) {
    const loginTime = Date.now();
    const requestURL = new URL(`/signin`, baseURL);
    requestURL.searchParams.append('email', email);
    requestURL.searchParams.append('password', password);
    const response = await fetch(requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const responseJSON = await response.json();
      localStorage.setItem('userName', responseJSON.name);
      localStorage.setItem('userId', responseJSON.userId);
      localStorage.setItem('refreshToken', responseJSON.refreshToken);
      localStorage.setItem('token', responseJSON.token);
      localStorage.setItem('loginTime', JSON.stringify(loginTime));
    }
    return {
      ok: response.ok,
      errcode: response.ok ? null : response.status,
    };
  }

  static signout() {
    localStorage.clear();
  }

  static isAuthorized() {
    const isAuth = !!localStorage.getItem('userName');
    if (isAuth) {
      const loginTime = JSON.parse(localStorage.getItem('loginTime') as string);
      const interval = Date.now() - loginTime;
      const hoursPastLogin = interval / 1000 / 60 / 60;
      console.log(hoursPastLogin);
      if (hoursPastLogin > 4) {
        this.signout();
        window.location.reload();
        return false;
      }
    }
    return !!localStorage.getItem('userName');
  }

  static getName() {
    return localStorage.getItem('userName');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static getId() {
    return localStorage.getItem('userId');
  }
}

export default Users;
