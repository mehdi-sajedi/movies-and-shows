import { useState, useRef } from 'react';
import { useLocation } from 'react-router';
import { Link, useNavigate, createSearchParams } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';
import styles from './Nav.module.scss';
import MobileMenuBtn from './MobileMenuBtn';
import MobileMenu from './MobileMenu';

const Nav = () => {
  const [text, setText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const searchRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() === '') return;

    navigate({
      pathname: '/search',
      search: '?' + createSearchParams({ query: text }),
    });
  };

  const clearSearch = () => {
    setText('');
    searchRef.current.focus();
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <div className={styles.links}>
            <Link
              to="/movies"
              className={`${pathname.includes('movies') ? styles.active : ''}`}
            >
              Movies
            </Link>
            <Link
              to="/shows"
              className={`${pathname.includes('shows') ? styles.active : ''}`}
            >
              Shows
            </Link>
          </div>
          <MobileMenuBtn menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.search}>
              <HiOutlineSearch className={styles.magnify} />
              <input
                ref={searchRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="Search..."
              />
              {text !== '' && (
                <button>
                  <IoCloseOutline
                    onClick={clearSearch}
                    className={styles.clear}
                  />
                </button>
              )}
            </div>
          </form>
        </div>
      </nav>
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

export default Nav;
