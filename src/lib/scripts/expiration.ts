const expirationLimit: number = 60 ** 3 * 1000;

export function notExpired(date: string | number, limit = expirationLimit) {
	const numLimit = limit;
	return +Date.now() - +date < numLimit;
}
