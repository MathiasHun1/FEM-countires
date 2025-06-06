import { CountryBase } from './types';

export const filterCountries = (
  data: CountryBase[] | null,
  regionFilterText = '',
  nameFilterText = ''
): CountryBase[] | null => {
  if (!data) {
    return null;
  }

  let result = data;

  if (regionFilterText) {
    result = result.filter((c) => c.region === regionFilterText);
  }

  if (nameFilterText) {
    result = result.filter((c) =>
      c.name.toLocaleLowerCase().includes(nameFilterText.toLowerCase())
    );
  }

  return result.sort((a, b) => a.name.localeCompare(b.name)); //return countries sorted by name
};
