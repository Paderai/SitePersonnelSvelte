<script lang="ts">
	import { t } from 'svelte-i18n';
</script>

<div class="page-container">
	<div class="container">
		<header class="page-header">
			<h1 class="page-title">{$t('nav.innovation')}</h1>
			<p class="page-subtitle">Ma vision et mes principes</p>
		</header>

		<article class="content">
			<section class="content-section">
				<h2>Gestion de l'innovation</h2>
				<p>Contenu à venir sur mes principes en gestion de l'innovation...</p>
			</section>
		</article>
	</div>
</div>

<style>
	.page-container {
		width: 100%;
		min-height: calc(100vh - 16rem);
	}

	.container {
		max-width: 56rem;
		margin: 0 auto;
		padding: 3rem 1rem;
	}

	.page-header {
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 2px solid rgb(var(--border-color));
	}

	.page-title {
		margin: 0 0 0.5rem 0;
		font-size: 2.5rem;
		font-weight: 700;
		color: rgb(var(--text-primary));
	}

	.page-subtitle {
		margin: 0;
		font-size: 1.25rem;
		color: rgb(var(--text-secondary));
	}

	.content {
		line-height: 1.7;
		color: rgb(var(--text-secondary));
	}

	.content-section {
		margin-bottom: 3rem;
	}

	.content-section h2 {
		margin: 0 0 1rem 0;
		font-size: 1.75rem;
		font-weight: 600;
		color: rgb(var(--color-primary));
	}

	.content-section p {
		margin: 0 0 1rem 0;
		font-size: 1.125rem;
	}
</style>
