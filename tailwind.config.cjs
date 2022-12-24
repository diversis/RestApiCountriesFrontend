/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Nunito Sans', 'sans-serif'],
			serif: ['Nunito Sans', 'serif']
		},
		screens: {
			xs: '375px',

			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px'
			// => @media (min-width: 1536px) { ... }
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
					'0 0 7.5px 3px hsla(209, 23%, 22%, 0.549),0 0 11px 5px hsla(0, 0%, 100%, 0.362),0 0 17px 9px hsla(0, 0%, 100%, 0.18)',
				'card-light':
					'0 0 7.5px 3px hsla(200, 15%, 8%, 0.549),0 0 11px 5px hsla(0, 0%, 52%, 0.362),0 0 17px 9px hsla(0, 0%, 98%, 0.18),inset 0 0 2px 2px hsla(200, 15%, 8%, 0.549),inset 0 0 5px 4px hsla(0, 0%, 52%, 0.362),inset 0 0 9px 5px hsla(0, 0%, 98%, 0.18)',
				'card-dark':
					'0 0 3px 2px hsla(209, 23%, 22%, 0.549),0 0 6px 3px hsla(0, 0%, 100%, 0.362),0 0 10px 5px hsla(0, 0%, 100%, 0.18),inset 0 0 2px 1px hsla(209, 23%, 22%, 0.549),inset 0 0 5px 4px hsla(0, 0%, 100%, 0.362),inset 0 0 9px 5px hsla(0, 0%, 100%, 0.18)',
				around: '0 0 5px 2px hsla(209, 23%, 22%, 0.549)'
			},
			transitionTimingFunction: {
				theme: 'cubic-bezier(0.005, 0.05, 0.95, 0.005)',
				switch: 'cubic-bezier(0.23, 0.13, 0.42, 0.23)'
			}
		}
	},
	plugins: []
};
