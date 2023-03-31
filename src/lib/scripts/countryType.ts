export type countryType = {
	altSpellings: readonly string[] | [];
	borders: readonly string[] | [];
	capital: readonly string[] | [];
	cca2: string;
	cca3: string;
	currencies: { readonly [code: string]: { name: string; symbol: string } };
	flags: { png: string; svg: string; alt: string };
	languages: { readonly [code: string]: string };
	name: {
		common: string | undefined;
		official: string | undefined;
		nativeName: { readonly [code: string]: { official: string } };
	};
	population: number | undefined;
	region: string;
	subregion: string | undefined;
	tld: readonly string[] | [];
	createdAt?: number | undefined;
};
export type borderType = {
	cca3: string;
	name: string;
};
