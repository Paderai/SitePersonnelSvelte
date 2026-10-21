<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import { t } from 'svelte-i18n';

	let { children } = $props();

	// Initialiser le thème au chargement (la langue est restaurée dans $lib/i18n)
	onMount(() => {
		// Restaurer le thème sauvegardé
		const savedTheme = localStorage.getItem('theme') || 'light';
		document.documentElement.setAttribute('data-theme', savedTheme);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content={$t('meta.description')} />
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
