import styles from './Card.module.scss';
import { CountryBase } from '../types';
import { Link } from 'react-router';
import { motion } from 'motion/react';

const Card = (props: CountryBase) => {
  const { name, population, region, capital, flagImage } = props;

  return (
    <Link to={`/${name}`} className={styles.link}>
      <div className={styles.card}>
        <div className={styles.image_wrapper}>
          <motion.img
            src={flagImage}
            alt={`Flag of ${name}`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className={styles.text_wrapper}>
          <h2 className={styles.title}>{name}</h2>
          <ul className={styles.list}>
            <li>
              <strong>Population:</strong> {population.toLocaleString()}
            </li>
            <li>
              <strong>Region:</strong> {region}
            </li>
            <li>
              <strong>Capital:</strong> {capital}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default Card;
