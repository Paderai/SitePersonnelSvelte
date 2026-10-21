import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

// Identifiant de build affiché dans le footer : APP_BUILD_SHA si fourni,
// sinon le commit courant (le VPS build après git pull), sinon 'dev'.
function buildSha(): string {
	if (process.env.APP_BUILD_SHA) return process.env.APP_BUILD_SHA.slice(0, 7);
	try {
		return execSync('git rev-parse --short=7 HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
			.toString()
			.trim();
	} catch {
		return 'dev';
	}
}

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	define: {
		__APP_VERSION__: JSON.stringify(pkg.version),
		__APP_BUILD__: JSON.stringify(buildSha())
	},
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
