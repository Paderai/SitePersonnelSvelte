import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: { adapter: adapter() }
};

export default {
  kit: {
    adapter: adapter({
      fallback: 'index.html', // important si vous avez du routing SPA
    }),
    paths: {
      base: '',               // important que ce soit vide pour cPanel
      assets: '',
    },
    prerender: {
      entries: ['*'],         // tout pré-générer
    }
  }
};