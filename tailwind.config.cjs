/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Nunito Sans', 'sans-serif'],
			serif: ['Nunito Sans', 'serif']
		},
		extend: {
			colors: {
				'dark-mode-dark-blue': 'hsl(209, 23%, 22%)',
				'dark-mode-very-dark-blue': 'hsl(207, 26%, 17%)',
				'light-mode-very-dark-blue': 'hsl(200, 15%, 8%)',
				'light-mode-dark-gray': 'hsl(0, 0%, 52%)',
				'light-mode-very-light-gray': 'hsl(0, 0%, 98%)',
				'any-white': 'hsl(0, 0%, 100%)'
			},
			boxShadow: {
				'img-light':
					'0 0 7.5px 3px hsla(200, 15%, 8%, 0.549),0 0 11px 5px hsla(0, 0%, 52%, 0.362),0 0 17px 9px hsla(0, 0%, 98%, 0.18)',
				'img-dark':
					'0 0 7.5px 3px hsla(209, 23%, 22%, 0.549),0 0 11px 5px hsla(0, 0%, 100%, 0.362),0 0 17px 9px hsla(0, 0%, 100%, 0.18)'
			}
		}
	},
	plugins: []
};
