import { useState, useEffect } from 'react';
import services from '../services/countryService';
import { CountryBase } from '../types';

export const useFecthAll = () => {
  const [allCountries, setAllCountries] = useState<CountryBase[] | null>(null);
  const [isError, setIsError] = useState<boolean | null>(null);

  useEffect(() => {
    services
      .getAllCountries()
      .then((res) => {
        setAllCountries(res);
        setIsError(false);
      })
      .catch((error) => {
        setIsError(true);
        console.error(error);
      });
  }, []);

  return {
    allCountries,
    isError,
  };
};
