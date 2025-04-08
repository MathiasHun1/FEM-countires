import styles from './App.module.scss';
import darkmodeSVG from './assets/darkMode.svg';
import lightmodeSVG from './assets/lightMode.svg';
import { Routes, Route } from 'react-router';
import { flushSync } from 'react-dom';
import useLocalStorage from 'use-local-storage';

import CountriesList from './components/Pages/CountriesList';
import CountryElement from './components/Pages/CountryElement';

function App() {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('theme', false);

  const renderModeText = () => {
    return isDarkMode ? 'Light Mode' : 'Dark Mode';
  };

  const toggleDarkMode = () => {
    document.startViewTransition(() => {
      // force react to make the DOM changes syncronously, so the visual effect visible
      flushSync(() => setIsDarkMode(!isDarkMode));
    });
  };

  return (
    <div className={styles.app} data-theme={isDarkMode ? 'dark' : 'light'}>
      <header className={styles.header}>
        <h1 className={styles.title}>Where in the world?</h1>
        <button className={styles.mode_wrapper} onClick={toggleDarkMode}>
          <div className={styles.svgWrapper}>
            {isDarkMode ? (
              <img src={lightmodeSVG} alt="" />
            ) : (
              <img src={darkmodeSVG} alt="" />
            )}
          </div>
          <p>{renderModeText()}</p>
        </button>
      </header>

      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<CountriesList />} />
          <Route
            path="/:country"
            element={<CountryElement isDarkmode={isDarkMode} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
