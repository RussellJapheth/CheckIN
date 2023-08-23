import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	kit: {
		adapter: adapter()
	},
	preprocess: vitePreprocess()
};

export default config;
