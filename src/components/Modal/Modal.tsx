import React from 'react';
import './Modal.css';

function Modal({ active, setActive, children }: any) {
  return (
    <div
      role="none"
      className={active ? 'modal active' : 'modal'}
      onClick={() => {
        setActive(false);
        console.log('нажал мимо окна');
      }}
    >
      <div
        role="none"
        className={active ? 'modal__content active' : 'modal__content'}
        onClick={(e) => {
          e.stopPropagation();
          console.log('нажал в окно');
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
