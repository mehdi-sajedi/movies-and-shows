import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from './MobileMenu.module.scss';

const MobileMenu = () => {
  const { appState, dispatch } = useContext(AppContext);

  const closeOverlay = (e) => {
    if (e.target.tagName === 'A' || e.target.classList.contains('overlay')) {
      dispatch({ type: 'TOGGLE-NAV-MENU' });
    }
  };

  return createPortal(
    <div onClick={closeOverlay} className={styles.menuWrap}>
      <div
        className={`${styles.menu} ${
          appState.navMenuOpen ? styles.active : ''
        }`}
      >
        <div className={`overlay ${styles.overlay}`}>
          <div className={styles.linksWrap}>
            <ul className={styles.links}>
              <li>
                <Link to="/movies">Movies</Link>
              </li>
              <li>
                <Link to="/shows">Shows</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('mobileMenu')
  );
};

export default MobileMenu;
