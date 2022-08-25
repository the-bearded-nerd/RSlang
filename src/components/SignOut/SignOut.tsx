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
      <label htmlFor="SignOut">Hi, {Users.getName()}!</label>
      <input type="submit" name="SignOut" value="SignOut" />
    </form>
  );
}

export default SignOut;
