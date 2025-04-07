import styles from './Card.module.scss';
import { CountryBase } from '../types';
import { Link } from 'react-router';

const Card = (props: CountryBase) => {
  const { name, population, region, capital, flagImage } = props;

  return (
    <Link to={`/${name}`} className={styles.link}>
      <div className={styles.card}>
        <div className={styles.image_wrapper}>
          <img src={flagImage} alt="" />
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
