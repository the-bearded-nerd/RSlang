import React, { useState } from 'react';
import Users from '../../utils/Users/User';
import SignOut from '../SignOut/SignOut';
import AuthorizationForm from '../AuthorizationForm/AuthorizationForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import Modal from '../Modal/Modal';

function SignOrRegister() {
  const [registrationActive, setRegistrationActive] = useState(false);
  const [signinActive, setSigninActive] = useState(false);
  return (
    <span>
      <button
        type="button"
        onClick={() => {
          setSigninActive(true);
        }}
      >
        Вход
      </button>
      <button
        type="button"
        onClick={() => {
          setRegistrationActive(true);
        }}
      >
        Регистрация
      </button>
      <Modal active={registrationActive} setActive={setRegistrationActive}>
        <RegistrationForm />
      </Modal>
      <Modal active={signinActive} setActive={setSigninActive}>
        <AuthorizationForm />
      </Modal>
    </span>
  );
}

function User() {
  return <span>{Users.isAuthorized() ? <SignOut /> : <SignOrRegister />}</span>;
}

export default User;
