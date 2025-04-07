import styles from './App.module.scss';
import darkmodeSVG from './assets/darkMode.svg';
import { Routes, Route } from 'react-router';

import CountriesList from './components/Pages/CountriesList';
import CountryElement from './components/Pages/CountryElement';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Where in the world?</h1>
        <div className={styles.mode_wrapper}>
          <div className={styles.svgWrapper}>
            <img src={darkmodeSVG} alt="" loading="lazy" />
          </div>
          <p>Dark mode</p>
        </div>
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
