<script lang="ts">
	import { t } from 'svelte-i18n';

	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{
			name: 'Email',
			href: 'mailto:contact@sciencesconnexions.com',
			icon: 'email'
		},
		{
			name: 'LinkedIn',
			href: 'https://www.linkedin.com/in/francois-provencher',
			icon: 'linkedin'
		},
		{
			name: 'GitHub',
			href: 'https://github.com/francoisprovencher',
			icon: 'github'
		}
	];
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<!-- Section gauche - Informations -->
			<div class="footer-info">
				<h3 class="footer-title">{$t('home.title')}</h3>
				<p class="footer-subtitle">{$t('home.subtitle')}</p>
			</div>

			<!-- Section droite - Liens sociaux et copyright -->
			<div class="footer-links">
				<div class="social-links">
					{#each socialLinks as link}
						<a href={link.href} class="social-link" target="_blank" rel="noopener noreferrer">
							{#if link.icon === 'email'}
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
									<path
										d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
									></path>
									<polyline points="22,6 12,13 2,6"></polyline>
								</svg>
							{:else if link.icon === 'linkedin'}
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
									<path
										d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
									></path>
									<rect x="2" y="9" width="4" height="12"></rect>
									<circle cx="4" cy="4" r="2"></circle>
								</svg>
							{:else if link.icon === 'github'}
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
									<path
										d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
									></path>
								</svg>
							{/if}
							<span class="sr-only">{link.name}</span>
						</a>
					{/each}
				</div>

				<p class="copyright">
					{$t('footer.copyright', { values: { year: currentYear } })}
				</p>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		margin-top: auto;
		background-color: rgb(var(--bg-secondary));
		border-top: 1px solid rgb(var(--border-color));
	}

	.container {
		max-width: 80rem;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.footer-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.footer-content {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
	}

	.footer-info {
		flex: 1;
	}

	.footer-title {
		margin: 0 0 0.5rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.footer-subtitle {
		margin: 0;
		color: rgb(var(--text-secondary));
		font-size: 0.875rem;
	}

	.footer-links {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
	}

	@media (min-width: 768px) {
		.footer-links {
			align-items: flex-end;
		}
	}

	.social-links {
		display: flex;
		gap: 1rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.5rem;
		background-color: rgb(var(--bg-tertiary));
		color: rgb(var(--text-secondary));
		transition: all 0.2s ease;
		border: 1px solid rgb(var(--border-color));
	}

	.social-link:hover {
		color: rgb(var(--color-primary));
		background-color: rgb(var(--color-primary) / 0.1);
		border-color: rgb(var(--color-primary));
		transform: translateY(-2px);
	}

	.copyright {
		margin: 0;
		color: rgb(var(--text-muted));
		font-size: 0.875rem;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
