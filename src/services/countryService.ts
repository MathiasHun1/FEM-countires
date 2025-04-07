import axios from 'axios';
import { CountryBase, CountryExtended } from '../types';

const baseUrl = 'https://restcountries.com/v3.1';

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/all`);
  return response.data;
};

const getAllFiltered = async () => {
  const response = await axios.get(`${baseUrl}/all`);
  const result = response.data;

  const filteredRes = result.map((country: any): CountryBase => {
    return {
      name: country.name.common as string,
      population: country.population as number,
      region: country.region as string,
      capital: country.capital as string,
      flagImage: country.flags.svg as string,
    };
  });
  return filteredRes;
};

const findByName = async (name: string) => {
  const response = await axios.get(`${baseUrl}/all`); // all countries, because the other API paths are unreliable
  const result = response.data;

  //find a country by its common name
  const selected = result.find((country: any) => country.name.common === name);
  const currencies: string[] = [];
  const languages: string[] = [];
  const nativeNameValues: any =
    Object.values(selected.name?.nativeName ?? {})[0] || null;
  const nativeName: string = nativeNameValues ? nativeNameValues.common : null;

  for (const currency in selected.currencies) {
    currencies.push(selected.currencies[currency].name);
  }

  for (const lang in selected.languages) {
    languages.push(selected.languages[lang]);
  }

  // find the selected country's neighbours by cca3 codes:
  const borderCountries: string[] = [];
  if (selected.borders) {
    selected.borders.map((cca3: string) => {
      const found = result.find((c: any) => c.cca3 === cca3);
      borderCountries.push(found.name.common);
    });
  }

  const data: CountryExtended = {
    name: selected.name.common as string,
    population: selected.population as number,
    region: selected.region as string,
    capital: selected.capital as string,
    flagImage: selected.flags.svg as string,
    nativeName: nativeName as string | undefined,
    subregion: selected.subregion as string | undefined,
    domain: selected.tld as string,
    currencies: currencies as string[],
    languages: languages as string[],
    borderCountries: borderCountries as string[] | undefined,
  };

  return selected ? data : null;
};

export default { getAll, getAllFiltered, findByName };
