<script lang="ts">
	import { t } from 'svelte-i18n';
</script>

<div class="home-page">
	<div class="container">
		<!-- Hero Section -->
		<section class="hero">
			<div class="hero-content">
				<div class="avatar-container">
					<img
						src="/photo-profile.jpg"
						alt="François Provencher"
						class="avatar"
					/>
				</div>

				<div class="hero-text">
					<h1 class="hero-title">{$t('home.title')}</h1>
					<p class="hero-subtitle">{$t('home.subtitle')}</p>
					<p class="hero-intro">{$t('home.intro')}</p>
				</div>
			</div>
		</section>

		<!-- Content Section -->
		<section class="content-section">
			<div class="card">
				<h2>Bienvenue</h2>
				<p>
					Ce site est actuellement en construction. Prochainement, vous y trouverez des
					informations complètes sur mon parcours, mes réalisations et ma vision de l'innovation.
				</p>
			</div>

			<div class="cards-grid">
				<a href="/bio" class="feature-card">
					<div class="card-icon">📖</div>
					<h3>{$t('nav.bio')}</h3>
					<p>Découvrez mon parcours professionnel</p>
				</a>

				<a href="/francois_provencher" class="feature-card">
					<div class="card-icon">📄</div>
					<h3>{$t('nav.cv')}</h3>
					<p>Consultez mon curriculum vitae</p>
				</a>

				<a href="/realisations" class="feature-card">
					<div class="card-icon">🚀</div>
					<h3>{$t('nav.achievements')}</h3>
					<p>Explorez mes projets et réalisations</p>
				</a>

				<a href="/innovation" class="feature-card">
					<div class="card-icon">💡</div>
					<h3>{$t('nav.innovation')}</h3>
					<p>Ma vision de la gestion de l'innovation</p>
				</a>
			</div>
		</section>
	</div>
</div>

<style>
	.home-page {
		width: 100%;
	}

	.container {
		max-width: 80rem;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.hero {
		padding: 4rem 0;
		border-bottom: 1px solid rgb(var(--border-color));
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		text-align: center;
	}

	@media (min-width: 768px) {
		.hero-content {
			flex-direction: row;
			text-align: left;
			gap: 3rem;
		}
	}

	.avatar-container {
		flex-shrink: 0;
	}

	.avatar {
		width: 10rem;
		height: 10rem;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: var(--shadow-lg);
		border: 4px solid rgb(var(--color-primary));
	}

	.hero-text {
		flex: 1;
	}

	.hero-title {
		margin: 0 0 0.5rem 0;
		font-size: 2.5rem;
		font-weight: 700;
		color: rgb(var(--text-primary));
		line-height: 1.2;
	}

	@media (min-width: 768px) {
		.hero-title {
			font-size: 3rem;
		}
	}

	.hero-subtitle {
		margin: 0 0 1rem 0;
		font-size: 1.25rem;
		font-weight: 500;
		color: rgb(var(--color-primary));
	}

	.hero-intro {
		margin: 0;
		font-size: 1.125rem;
		color: rgb(var(--text-secondary));
		line-height: 1.6;
	}

	.content-section {
		padding: 4rem 0;
	}

	.card {
		padding: 2rem;
		background-color: rgb(var(--bg-secondary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.75rem;
		margin-bottom: 3rem;
	}

	.card h2 {
		margin: 0 0 1rem 0;
		font-size: 1.75rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.card p {
		margin: 0;
		color: rgb(var(--text-secondary));
		line-height: 1.6;
	}

	.cards-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 640px) {
		.cards-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.cards-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.feature-card {
		padding: 2rem 1.5rem;
		background-color: rgb(var(--bg-tertiary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.75rem;
		text-decoration: none;
		transition: all 0.2s ease;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.feature-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
		border-color: rgb(var(--color-primary));
	}

	.card-icon {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.feature-card h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.feature-card p {
		margin: 0;
		font-size: 0.875rem;
		color: rgb(var(--text-muted));
	}
</style>
