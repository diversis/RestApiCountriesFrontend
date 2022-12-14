import type { PageLoad } from './$types';
export function load({ params }) {
	return {
		slug: params.slug
	};
}
