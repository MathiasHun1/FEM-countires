import styles from './App.module.scss';
import darkmodeSVG from './assets/darkMode.svg';
import lightmodeSVG from './assets/lightMode.svg';
import { Routes, Route } from 'react-router';
import { useState } from 'react';
import { flushSync } from 'react-dom';

import CountriesList from './components/Pages/CountriesList';
import CountryElement from './components/Pages/CountryElement';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const themeMode = isDarkMode ? 'dark' : 'light';

  const renderModeText = () => {
    return isDarkMode ? 'Light Mode' : 'Dark Mode';
  };

  const toggleDarkMode = () => {
    document.startViewTransition(() => {
      flushSync(() => setIsDarkMode(!isDarkMode));
    });
  };

  return (
    <div className={styles.app} data-theme={themeMode}>
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
          <Route path="/:country" element={<CountryElement />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
