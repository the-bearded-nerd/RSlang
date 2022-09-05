import React from 'react';
import Users from '../../utils/Users/User';

function SignOut() {
  const onSubmitHandler = (event: any) => {
    event.preventDefault();
    Users.signout();
    window.location.reload();
  };
  return (
    <form action="" onSubmit={onSubmitHandler}>
      <label htmlFor="SignOut">Привет, {Users.getName()}!</label>
      <input className="btn" type="submit" name="SignOut" value="Выйти" />
    </form>
  );
}

export default SignOut;
