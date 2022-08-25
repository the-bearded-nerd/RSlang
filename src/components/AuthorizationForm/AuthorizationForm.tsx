import React, { useState } from 'react';
import Users from '../../utils/Users/User';

function AuthorizationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    await Users.signin(email, password);
    window.location.reload();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default AuthorizationForm;
