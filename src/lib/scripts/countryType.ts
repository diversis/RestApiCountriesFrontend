export type countryType = {
	altSpellings: string[] | [];
	borders: string[] | [];
	capital: string[] | [];
	cca2: string;
	cca3: string;
	currencies: object;
	flags: { png: string; svg: string };
	name: { common: string | undefined; official: string | undefined; nativeName: object };
	population: number | undefined;
	region: string;
	subregion: string | undefined;
	tld: string[] | [];
	createdAt: number | undefined;
};
