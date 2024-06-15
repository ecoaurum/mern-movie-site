import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import styles from './Footer.module.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const links = (
    <>
      <p>
        <HashLink to="/about">About me</HashLink>
      </p>
      <p>
        <HashLink to="/services">Services</HashLink>
      </p>
      <p>
        <Link to="/portfolio">Portfolio</Link>
      </p>
      <p>
        <HashLink to="/contact">Contacts</HashLink>
      </p>
    </>
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerLogo}>
          <Link to="/" onClick={scrollToTop}>
            <img src="/images/logo/logo9.png" alt="Logo" />
          </Link>
        </div>
        <div className={styles.footerContainer}>
          <div className={styles.box}>{links}</div>
          <div className={styles.box}>{links}</div>
          <div className={styles.box}>{links}</div>
        </div>
        <div className={styles.footerMedias}>
          <div>
            <Link
              to="https://www.linkedin.com/in/alexander-sakaly"
              target="_blank"
            >
              <i className="fab fa-linkedin-in"></i>
            </Link>
          </div>
          <div>
            <Link to="https://github.com/ecoaurum" target="_blank">
              <i className="fab fa-github-alt"></i>
            </Link>
          </div>
          <div>
            <Link to="https://t.me/ecoaurum" target="_blank">
              <i className="fab fa-telegram"></i>
            </Link>
          </div>
          <div>
            <Link
              to="https://www.facebook.com/aleksandr.ecoaurum"
              target="_blank"
            >
              <i className="fab fa-facebook-f"></i>
            </Link>
          </div>
          <div>
            <Link to="https://www.instagram.com/aleksander_sql" target="_blank">
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
        </div>
        <span className={styles.footerCopyright}>
          Copyright ©{currentYear} All rights reserved
        </span>
      </div>
    </footer>
  );
};
