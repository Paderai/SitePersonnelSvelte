<script lang="ts">
	import { t } from 'svelte-i18n';
</script>

<div class="landing-container">
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-content">
			<div class="logo-container">
				<div class="logo-icon">
					<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
						<!-- Atome stylisé -->
						<circle cx="50" cy="50" r="8" fill="rgb(var(--color-primary))" />
						<ellipse cx="50" cy="50" rx="35" ry="15" fill="none" stroke="rgb(var(--color-primary))" stroke-width="2" />
						<ellipse cx="50" cy="50" rx="15" ry="35" fill="none" stroke="rgb(var(--color-accent))" stroke-width="2" />
						<ellipse cx="50" cy="50" rx="30" ry="25" fill="none" stroke="rgb(var(--color-primary))" stroke-width="2" transform="rotate(60 50 50)" />
					</svg>
				</div>
				<h1 class="site-title">Sciences Connexions</h1>
			</div>
			<p class="tagline">{$t('landing.tagline')}</p>
			<p class="description">{$t('landing.description')}</p>

			<div class="cta-buttons">
				<a href="/francois_provencher" class="btn btn-primary">
					{$t('landing.discover')}
					<span class="arrow">→</span>
				</a>
			</div>
		</div>

		<div class="hero-visual">
			<div class="floating-card card-1">
				<span class="icon">🚀</span>
				<span class="label">{$t('landing.innovation')}</span>
			</div>
			<div class="floating-card card-2">
				<span class="icon">🤝</span>
				<span class="label">{$t('landing.collaboration')}</span>
			</div>
			<div class="floating-card card-3">
				<span class="icon">⚙️</span>
				<span class="label">{$t('landing.expertise')}</span>
			</div>
			<div class="floating-card card-4">
				<span class="icon">🌐</span>
				<span class="label">{$t('landing.ecosystem')}</span>
			</div>
		</div>
	</section>
</div>

<style>
	.landing-container {
		width: 100%;
		min-height: 100vh;
	}

	/* Hero Section */
	.hero {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
		background: linear-gradient(135deg, rgb(var(--bg-primary)) 0%, rgb(var(--bg-secondary)) 100%);
		position: relative;
		overflow: hidden;
	}

	.hero-content {
		max-width: 800px;
		text-align: center;
		z-index: 2;
	}

	.logo-container {
		margin-bottom: 2rem;
	}

	.logo-icon {
		width: 120px;
		height: 120px;
		margin: 0 auto 1.5rem;
		animation: float 3s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-10px); }
	}

	.site-title {
		font-size: 4rem;
		font-weight: 800;
		background: linear-gradient(135deg, rgb(var(--color-primary)), rgb(var(--color-accent)));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin: 0;
		line-height: 1.2;
	}

	.tagline {
		font-size: 1.5rem;
		color: rgb(var(--text-primary));
		margin: 1rem 0;
		font-weight: 600;
	}

	.description {
		font-size: 1.125rem;
		color: rgb(var(--text-secondary));
		margin: 1.5rem 0 2.5rem;
		line-height: 1.7;
	}

	.cta-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2rem;
		border-radius: 0.5rem;
		font-weight: 600;
		font-size: 1.125rem;
		text-decoration: none;
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.btn-primary {
		background: rgb(var(--color-primary));
		color: white;
		border: 2px solid rgb(var(--color-primary));
	}

	.btn-primary:hover {
		background: transparent;
		color: rgb(var(--color-primary));
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	}

	.arrow {
		transition: transform 0.3s ease;
	}

	.btn:hover .arrow {
		transform: translateX(5px);
	}

	/* Floating Cards */
	.hero-visual {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		pointer-events: none;
		z-index: 1;
	}

	.floating-card {
		position: absolute;
		background: rgb(var(--bg-tertiary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 1rem;
		padding: 1rem 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		animation: floatCard 6s ease-in-out infinite;
	}

	.floating-card .icon {
		font-size: 2rem;
	}

	.floating-card .label {
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.card-1 {
		top: 15%;
		left: 10%;
		animation-delay: 0s;
	}

	.card-2 {
		top: 20%;
		right: 10%;
		animation-delay: 1.5s;
	}

	.card-3 {
		bottom: 25%;
		left: 8%;
		animation-delay: 3s;
	}

	.card-4 {
		bottom: 20%;
		right: 12%;
		animation-delay: 4.5s;
	}

	@keyframes floatCard {
		0%, 100% { transform: translateY(0px) rotate(-2deg); }
		50% { transform: translateY(-20px) rotate(2deg); }
	}

	/* Responsive */
	@media (max-width: 768px) {
		.site-title {
			font-size: 2.5rem;
		}

		.tagline {
			font-size: 1.25rem;
		}

		.floating-card {
			display: none;
		}
	}
</style>
