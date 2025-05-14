import styles from './Header.module.scss';
import { flushSync } from 'react-dom';
import lightmodeSVG from '../assets/lightMode.svg';
import darkmodeSVG from '../assets/darkMode.svg';
import { motion } from 'motion/react';

interface Props {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const Header = ({ isDarkMode, setIsDarkMode }: Props) => {
  const toggleDarkMode = () => {
    document.startViewTransition(() => {
      // force react to make the DOM changes syncronously, so the visual effect visible
      flushSync(() => setIsDarkMode(!isDarkMode));
    });
  };

  const renderModeText = () => {
    return isDarkMode ? 'Light Mode' : 'Dark Mode';
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Where in the world?</h1>
      <button className={styles.mode_wrapper} onClick={toggleDarkMode}>
        <span className={styles.svgWrapper}>
          {isDarkMode ? (
            <motion.img
              src={lightmodeSVG}
              alt=""
              initial={{ rotate: -360 }}
              exit={{ rotate: 360 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              key={1}
            />
          ) : (
            <motion.img
              src={darkmodeSVG}
              alt=""
              initial={{ rotate: -360 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              key={2}
            />
          )}
        </span>
        <span>{renderModeText()}</span>
      </button>
    </header>
  );
};

export default Header;
