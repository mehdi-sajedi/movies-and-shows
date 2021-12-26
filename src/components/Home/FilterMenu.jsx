import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import styles from './FilterMenu.module.scss';
import { IoCloseOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import CustomRange from './CustomRange';
import { movieGenres } from '../Utilities/helpers';
import { watchProviders } from '../Utilities/watch-providers';
import _ from 'lodash';
import CustomCheckbox from './CustomCheckbox';

const FilterMenu = () => {
  const { appState, dispatch, filterState, dispatchFilter } =
    useContext(AppContext);

  const { pathname } = useLocation();

  const closeMenu = (e) => {
    console.log(e.target);
    if (
      e.target.classList.contains('overlay') ||
      e.target.classList.contains('closeBtn') ||
      e.target.classList.contains('submit')
    ) {
      dispatch({ type: 'CLOSE-FILTER-MENU' });
    }
  };

  const resetForm = () => {
    dispatchFilter({ type: 'RESET' });
  };

  const applyFilters = (e) => {
    e.preventDefault();
    dispatch({
      type: 'APPLY-FILTERS',
      payload: { filterState, route: pathname },
    });
  };

  return createPortal(
    <>
      <div
        className={`${styles.overlay} ${
          appState.filterMenuOpen ? styles.active : ''
        } overlay`}
        onClick={closeMenu}
      ></div>
      <div
        className={`${styles.menu} ${
          appState.filterMenuOpen ? styles.active : ''
        } `}
      >
        <IoCloseOutline
          onClick={closeMenu}
          className={`${styles.closeBtn} ${
            !appState.filterMenuOpen ? styles.removePointer : ''
          } closeBtn`}
        />
        <header className={styles.header}>Filter & Sort</header>
        <form onSubmit={applyFilters} className={styles.form}>
          <CustomRange
            name="Year"
            defaults={[1980, 2022]}
            state={filterState.year.value}
            action="SET-YEAR"
            min={1980}
            max={2022}
            step={1}
            tipFormatter={(v) => v}
            marks={{
              1980: `1980`,
              2022: `2022`,
            }}
          />
          <CustomRange
            name="Runtime"
            defaults={[0, 240]}
            state={filterState.runtime.value}
            action="SET-RUNTIME"
            min={0}
            max={240}
            step={10}
            tipFormatter={(v) => `${v}m`}
            marks={{
              0: `0m`,
              240: `240m`,
            }}
          />
          <CustomRange
            name="Rating"
            defaults={[0, 100]}
            state={filterState.rating.value}
            action="SET-RATING"
            min={0}
            max={100}
            step={1}
            tipFormatter={(v) => `${v}`}
            marks={{
              0: `0`,
              100: `100`,
            }}
          />
          <div className={styles.movieGenres}>
            <h3 className={styles.movieGenresTitle}>Genres</h3>
            <ul className={styles.movieGenresList}>
              {movieGenres.map((obj) => (
                <CustomCheckbox
                  key={_.uniqueId()}
                  name={obj.name}
                  id={obj.id}
                  group="movie-genres"
                  action="TOGGLE-GENRE"
                  state="genres"
                />
              ))}
            </ul>
          </div>

          <ul className={styles.watchProviders}>
            {watchProviders.map((provider) => (
              <CustomCheckbox
                key={_.uniqueId()}
                name={provider.provider_name}
                id={provider.provider_id}
                group="watch-providers"
                action="TOGGLE-WATCH-PROVIDER"
                state="watchProviders"
                img={provider.logo_path}
              />
            ))}
          </ul>

          <div className={styles.formButtons}>
            <button
              className={`${styles.reset} ${styles.btn}`}
              typeof="reset"
              onClick={resetForm}
            >
              Reset
            </button>
            <button
              onClick={closeMenu}
              className={`${styles.submit} ${styles.btn} submit`}
              typeof="submit"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </>,
    document.getElementById('filterMenu')
  );
};

export default React.memo(FilterMenu);