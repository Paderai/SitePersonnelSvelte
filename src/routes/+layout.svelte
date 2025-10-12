<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';

	let { children } = $props();

	// Initialiser le thème et la langue au chargement
	onMount(() => {
		// Restaurer le thème sauvegardé
		const savedTheme = localStorage.getItem('theme') || 'light';
		document.documentElement.setAttribute('data-theme', savedTheme);

		// Restaurer la langue sauvegardée
		const savedLocale = localStorage.getItem('locale');
		if (savedLocale) {
			locale.set(savedLocale);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="François Provencher - Ingénieur et consultant en innovation" />
</svelte:head>

<div class="app-layout">
	<Header />
	<main class="main-content">
		{@render children?.()}
	</main>
	<Footer />
</div>

<style>
	.app-layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.main-content {
		flex: 1;
		width: 100%;
	}
</style>
