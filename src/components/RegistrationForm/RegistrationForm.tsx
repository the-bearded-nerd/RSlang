import React, { useState } from 'react';
import Users from '../../utils/Users/User';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    await Users.create(name, email, password);
    window.location.reload();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor="name">
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
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
          className="password-input"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
      </label>
      <input type="submit" value="Зарегистрироваться" />
    </form>
  );
}

export default RegistrationForm;
