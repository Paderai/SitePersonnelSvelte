import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		fs: {
			strict: false,
			allow: ['..']
		},
		watch: {
			usePolling: true,
			interval: 1000,
			ignored: ['**/node_modules/**', '**/.git/**']
		}
	},
	optimizeDeps: {
		exclude: []
	}
});
