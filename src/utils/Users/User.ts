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
    const requestURL = new URL(`/signin`, baseURL);
    requestURL.searchParams.append('email', email);
    requestURL.searchParams.append('password', password);
    const response = await fetch(requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const responseJSON = await response.json();
      localStorage.setItem('userData', responseJSON);
    }
    return {
      ok: response.ok,
      errcode: response.ok ? null : response.status,
    };
  }
}

export default Users;
