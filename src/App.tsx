import styles from './App.module.scss';
import { Routes, Route } from 'react-router';
import useLocalStorage from 'use-local-storage';

import CountriesList from './components/Pages/CountriesList';
import CountryElement from './components/Pages/CountryElement';
import Header from './components/Header';
import { AnimatePresence } from 'motion/react';

function App() {
  const preference = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorage('theme', preference);

  return (
    <AnimatePresence mode="wait">
      <div className={styles.app} data-theme={isDarkMode ? 'dark' : 'light'}>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
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
    </AnimatePresence>
  );
}

export default App;
