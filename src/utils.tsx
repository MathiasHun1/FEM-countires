import { Country } from './types';

export const filterByName = (
  countries: Country[] | undefined,
  filterText: string
) => {
  if (!countries) return;

  if (filterText === '') {
    return countries;
  }
  const result = countries.filter((c) =>
    c.name.toLocaleLowerCase().includes(filterText.toLowerCase())
  );
  return result;
};

export const filterByRegion = (
  countries: Country[] | null,
  region: string
): Country[] | undefined => {
  if (!countries) return;

  if (region === '') {
    return countries;
  }
  const result = countries.filter((c) => c.region === region);
  return result;
};
