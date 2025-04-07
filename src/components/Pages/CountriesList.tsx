import styles from './CountriesList.module.scss';
import React, { useEffect, useState } from 'react';
import services from '../../services/countryService';
import { CountryBase } from '../../types';
import { filterByRegion, filterByName } from '../../utils';

import Card from '../Card';

const CountriesList = () => {
  const [countries, setCountries] = useState<CountryBase[] | null>(null);
  const [filterText, setFilterText] = useState('');
  const [filterOption, setFilterOption] = useState('');

  useEffect(() => {
    services.getAllFiltered().then((res) => setCountries(res));
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setFilterText(target.value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { target } = e;
    setFilterOption(target.value);
  };

  const renderCountries = () => {
    const filteredByRegion = filterByRegion(countries, filterOption);
    const filtered = filterByName(filteredByRegion, filterText);

    if (!filtered) return;

    return filtered.map((c) => (
      <Card
        key={c.name}
        name={c.name}
        population={c.population}
        region={c.region}
        capital={c.capital}
        flagImage={c.flagImage}
      />
    ));
  };

  return (
    <>
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
            name=""
            id=""
            placeholder="Search for a country..."
            onChange={handleSearch}
          />
        </div>

        <div className={`${styles.input_wrapper} ${styles.select_input}`}>
          <select name="" id="" onChange={handleSelect}>
            <option value="">Filter by region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europa</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>

      <div className={styles.cards_container}>
        {!countries && <div>Loading...</div>}
        {countries && renderCountries()}
      </div>
    </>
  );
};

export default CountriesList;
