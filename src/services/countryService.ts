import axios from 'axios';
import { CountryBase } from '../types';

const baseUrl = 'https://restcountries.com/v3.1';

// ----- TODO ------//
// Make the fetched data type-safe at runtime, using a runtime validation library

const getAllCountries = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/all?fields=name,population,region,capital,flags`
    );
    const result = response.data;

    const formedResult = result.map(
      (country: any): CountryBase => ({
        name: country.name.common as string,
        population: country.population as number,
        region: country.region as string,
        capital: country.capital as string,
        flagImage: country.flags.svg as string,
      })
    );
    return formedResult;
  } catch (error) {
    console.error(`Error happened while fetching data: ${error}`);
    throw new Error('Failed to fetch data');
  }
};

const getCountryByName = async (name: string) => {
  try {
    const result = await axios.get(`${baseUrl}/name/${name}`);
    const country = result.data[0];

    const currencyKeys = Object.keys(country.currencies);
    const nativeNameKey = Object.keys(country.name.nativeName)[0];

    console.log(currencyKeys);

    return {
      name: country.name.common as string,
      population: country.population as number,
      region: country.region as string,
      capital: country.capital as string,
      flagImage: country.flags.svg as string,
      nativeName: country.name.nativeName[nativeNameKey].common as
        | string
        | undefined,
      subregion: country.subregion as string | undefined,
      domain: country.tld as string,
      currencies: currencyKeys as string[],
      languages: Object.values(country.languages) as string[],
      borderCountries: country.borderCountries as string[] | undefined,
    };
  } catch (error) {
    console.error(error);
  }
};

export default { getAllCountries, getCountryByName };
