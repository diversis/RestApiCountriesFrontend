export type countryType = {
	altSpellings: string[] | [];
	borders: string[] | [];
	capital: string[] | [];
	cca2: string;
	cca3: string;
	currencies: { [code: string]: { name: string; symbol: string } };
	flags: { png: string; svg: string };
	languages: { [code: string]: string };
	name: { common: string | undefined; official: string | undefined; nativeName: object };
	population: number | undefined;
	region: string;
	subregion: string | undefined;
	tld: string[] | [];
	createdAt?: number | undefined;
};
export type borderType = {
	cca3: string;
	name: string;
};
