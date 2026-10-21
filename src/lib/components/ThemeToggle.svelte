<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from 'svelte-i18n';

	let theme = $state<'light' | 'dark'>('light');

	// Initialiser le thème au chargement
	onMount(() => {
		// Vérifier la préférence sauvegardée ou utiliser dark par défaut (selon TODO)
		const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		theme = savedTheme || (prefersDark ? 'dark' : 'light');
		applyTheme(theme);

		// Écouter les changements de préférence système
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			if (!localStorage.getItem('theme')) {
				theme = e.matches ? 'dark' : 'light';
				applyTheme(theme);
			}
		};
		mediaQuery.addEventListener('change', handleChange);

		return () => mediaQuery.removeEventListener('change', handleChange);
	});

	function applyTheme(newTheme: 'light' | 'dark') {
		document.documentElement.setAttribute('data-theme', newTheme);
	}

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		localStorage.setItem('theme', theme);
		applyTheme(theme);
	}
</script>

<button
	onclick={toggleTheme}
	class="theme-toggle"
	aria-label={theme === 'light' ? $t('theme.enableDark') : $t('theme.enableLight')}
	title={theme === 'light' ? $t('theme.dark') : $t('theme.light')}
>
	{#if theme === 'light'}
		<!-- Icône Lune (mode sombre) -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
		</svg>
	{:else}
		<!-- Icône Soleil (mode clair) -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="12" cy="12" r="5"></circle>
			<line x1="12" y1="1" x2="12" y2="3"></line>
			<line x1="12" y1="21" x2="12" y2="23"></line>
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
			<line x1="1" y1="12" x2="3" y2="12"></line>
			<line x1="21" y1="12" x2="23" y2="12"></line>
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.5rem;
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
		background-color: rgb(var(--bg-secondary));
		color: rgb(var(--text-primary));
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.theme-toggle:hover {
		background-color: rgb(var(--bg-tertiary));
		border-color: rgb(var(--color-primary));
	}

	.theme-toggle:focus {
		outline: 2px solid rgb(var(--color-primary));
		outline-offset: 2px;
	}

	.theme-toggle svg {
		transition: transform 0.2s ease;
	}

	.theme-toggle:hover svg {
		transform: rotate(15deg);
	}
</style>
