import React from 'react';
import './index.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_git">
          <a href="https://github.com/the-bearded-nerd">
            <img src="../../../logoGithub.svg" width="50" height="50" alt="logo.svg" />
          </a>
          <a href="https://github.com/bloodsuckers-spb">
            <img src="../../../logoGithub.svg" width="50" height="50" alt="logo.svg" />
          </a>
          <a href="https://github.com/laluna93">
            <img src="../../../logoGithub.svg" width="50" height="50" alt="logo.svg" />
          </a>
        </div>
        <p className="footer__year">2022</p>
        <a href="https://rs.school/js/">
          <img
            className="footer_logoRs"
            src="../../../logoRs.svg"
            width="100"
            height="100"
            alt="logoRs.svg"
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
