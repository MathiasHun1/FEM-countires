import { useParams, Link } from 'react-router';
import { CountryExtended } from '../../types';
import { useState, useEffect, Fragment } from 'react';
import sevices from '../../services/countryService';
import styles from './CountryElement.module.scss';
import backSVG from '../../assets/back.svg';

const CountryElement = ({ isDarkmode }: { isDarkmode: boolean }) => {
  const [selectedCountry, setSelectedCountry] =
    useState<CountryExtended | null>(null);
  const { country } = useParams();

  useEffect(() => {
    if (country) {
      sevices.findByName(country).then((res) => setSelectedCountry(res));
    }
  }, [country]);

  if (!selectedCountry) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link
        to="/"
        className={`${styles.back_link} ${
          isDarkmode ? styles.link_darkmode : ''
        }`}
      >
        <div className={styles.svg_wrapper}>
          <img src={backSVG} alt="" />
        </div>
        Back
      </Link>

      {!selectedCountry && <div>Loading...</div>}
      {selectedCountry && (
        <div className={styles.content_wrapper}>
          <div className={styles.flag_wrapper}>
            <img src={selectedCountry.flagImage} alt="" />
          </div>

          <div className={styles.text_section}>
            <h2 className={styles.name}>{selectedCountry.name}</h2>
            <div className={styles.block_container}>
              <ul>
                <li>
                  <span>Native name: </span>
                  {selectedCountry.nativeName}
                </li>
                <li>
                  <span>Population: </span>
                  {selectedCountry.population}
                </li>
                <li>
                  <span>Region: </span>
                  {selectedCountry.region}
                </li>
                {selectedCountry.subregion && (
                  <li>
                    <span>Sub Region: </span>
                    {selectedCountry.subregion}
                  </li>
                )}
                <li>
                  <span>Capital: </span>
                  {selectedCountry.capital}
                </li>
              </ul>

              <ul>
                <li>
                  <span>Top Level Domain: </span>
                  {selectedCountry.domain}
                </li>
                <li>
                  <span>Currencies: </span>
                  {selectedCountry.currencies.map((c) => (
                    <Fragment key={c}>{c}</Fragment>
                  ))}
                </li>
                <li>
                  <span>Languages: </span>
                  {selectedCountry.languages.map((l) => (
                    <Fragment key={l}>{l}</Fragment>
                  ))}
                </li>
              </ul>
            </div>

            {selectedCountry.borderCountries && (
              <nav className={styles.borders_block}>
                <p className={styles.border_text}>Border Countries: </p>
                <div className={styles.links_container}>
                  {selectedCountry.borderCountries.map((c) => (
                    <Link
                      to={`/${c}`}
                      key={c}
                      className={`${styles.country_link} ${
                        isDarkmode ? styles.link_darkmode : ''
                      }`}
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              </nav>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CountryElement;
