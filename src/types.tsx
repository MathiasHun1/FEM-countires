export interface CountryBase {
  name: string;
  population: number;
  region: string;
  capital: string;
  flagImage: string;
}

export interface CountryExtended extends CountryBase {
  nativeName?: string;
  subregion?: string;
  domain: string;
  currencies: string[];
  languages: string[];
  borderCountries?: string[];
}
