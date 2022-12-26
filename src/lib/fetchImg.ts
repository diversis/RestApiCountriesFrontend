export const fetchImg = async (url: string) => {
	const response = await fetch(url);
	const blob = await response.blob();

	return new Promise(function (resolve) {
		let reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject('Error: ', error);
	});
};
