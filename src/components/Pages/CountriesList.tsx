import styles from './CountriesList.module.scss';
import { useEffect, useState } from 'react';
import { filterCountries } from '../../utils';
import { useFecthAll } from '../../hooks/useFetchAll';

import { motion } from 'motion/react';
import Card from '../Card';

const CountriesList = () => {
  const { allCountries, isError } = useFecthAll();
  const [nameFilterText, setNameFilterText] = useState('');
  const [regionFilterText, setRegionFilterText] = useState('');
  const [renderCount, setRenderCount] = useState<number>(8);

  const countriesToRender = filterCountries(
    allCountries,
    regionFilterText,
    nameFilterText
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [allCountries]);

  const handleScroll = () => {
    const height = window.scrollY + window.innerHeight;
    const docHeight = document.body.scrollHeight;

    if (height >= docHeight - 10) {
      setRenderCount((prev) => prev + 4);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
    },
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
  };

  if (isError) {
    return (
      <>
        <p>Error happened in loading data</p>
      </>
    );
  }

  if (!countriesToRender) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div>
      <div className={styles.input_section}>
        <div className={`${styles.input_wrapper} ${styles.text_input}`}>
          <div className={styles.icon_wrapper}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#848484"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </div>
          <input
            type="text"
            name="search"
            id="text"
            placeholder="Search for a country..."
            onChange={(e) => setNameFilterText(e.target.value)}
          />
        </div>

        <div className={`${styles.input_wrapper} ${styles.select_input}`}>
          <select
            name="select_region"
            id="select"
            onChange={(e) => setRegionFilterText(e.target.value)}
          >
            <option value="">Filter by region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europa</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>

      <motion.div
        className={styles.cards_container}
        variants={containerVariant}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.5 }}
        key={countriesToRender ? 'loaded' : 'loading'}
      >
        {countriesToRender.map((c, index) => {
          if (index < renderCount) {
            return (
              <motion.div
                variants={itemVariants}
                key={index}
                transition={{ delay: 0.2 }}
              >
                <Card
                  key={c.name}
                  name={c.name}
                  population={c.population}
                  region={c.region}
                  capital={c.capital}
                  flagImage={c.flagImage}
                />
              </motion.div>
            );
          }
        })}
      </motion.div>
    </motion.div>
  );
};

export default CountriesList;
