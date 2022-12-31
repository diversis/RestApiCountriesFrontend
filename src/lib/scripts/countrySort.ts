import type { countryType } from './countryType';

export function compareCountriesByName(a: countryType, b: countryType): 1 | -1 | 0 {
	if (!a.name.common) return -1;
	if (!b.name.common) return 1;
	if (a.name.common > b.name.common) return 1;
	if (a.name.common === b.name.common) return 0;
	if (a.name.common < b.name.common) return -1;
	return -1;
}
