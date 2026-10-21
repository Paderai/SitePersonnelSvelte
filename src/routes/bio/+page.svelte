<script lang="ts">
	import { t } from 'svelte-i18n';
	import { cvData } from '$lib/data/cv-data';
	import { tl } from '$lib/i18n';
</script>

<div class="page-container">
	<div class="container">
		<header class="page-header">
			<div class="header-content">
				<img src="/photo-profile.jpg" alt={cvData.profile.name} class="bio-avatar" />
				<div>
					<h1 class="page-title">{$t('nav.bio')}</h1>
					<p class="page-subtitle">{$tl(cvData.profile.title)}</p>
				</div>
			</div>
		</header>

		<article class="content">
			<section class="bio-section highlight">
				<h2>{$t('bioPage.about')}</h2>
				<p class="lead">{$tl(cvData.profile.summary)}</p>
			</section>

			<section class="bio-section">
				<h2>{$t('bioPage.expertise')}</h2>
				<div class="skills-grid">
					{#each cvData.skills as skillCategory}
						<div class="skill-category">
							<h3>{$tl(skillCategory.category)}</h3>
							<ul>
								{#each skillCategory.items as skill}
									<li>{$tl(skill)}</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</section>

			<section class="bio-section">
				<h2>{$t('bioPage.languages')}</h2>
				<div class="languages-list">
					{#each cvData.languages as lang}
						<div class="language-item">
							<span class="language-name">{$tl(lang.language)}</span>
							<span class="language-level">{$tl(lang.level)}</span>
						</div>
					{/each}
				</div>
			</section>

			<section class="bio-section">
				<h2>{$t('bioPage.education')}</h2>
				{#each cvData.education as edu}
					<div class="education-item">
						<h3>{$tl(edu.degree)}</h3>
						<p class="institution">{edu.institution} - {$tl(edu.location)}</p>
						<p class="period">{edu.period}</p>
						{#if edu.description}
							<p class="description">{$tl(edu.description)}</p>
						{/if}
					</div>
				{/each}
			</section>

			<section class="bio-section">
				<h2>{$t('bioPage.contact')}</h2>
				<div class="contact-info">
					<div class="contact-item">
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
						<a href="mailto:{cvData.profile.email}">{cvData.profile.email}</a>
					</div>
					<div class="contact-item">
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
							<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
							<circle cx="12" cy="10" r="3"></circle>
						</svg>
						<span>{$tl(cvData.profile.location)}</span>
					</div>
					{#if cvData.profile.linkedin}
						<div class="contact-item">
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
							<a href={cvData.profile.linkedin} target="_blank" rel="noopener noreferrer"
								>LinkedIn</a
							>
						</div>
					{/if}
				</div>
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

	.header-content {
		display: flex;
		align-items: center;
		gap: 2rem;
		flex-direction: column;
	}

	@media (min-width: 640px) {
		.header-content {
			flex-direction: row;
		}
	}

	.bio-avatar {
		width: 8rem;
		height: 8rem;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: var(--shadow-md);
		border: 3px solid rgb(var(--color-primary));
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

	.bio-section {
		margin-bottom: 3rem;
	}

	.bio-section h2 {
		margin: 0 0 1rem 0;
		font-size: 1.75rem;
		font-weight: 600;
		color: rgb(var(--color-primary));
	}

	.bio-section p {
		margin: 0 0 1rem 0;
		font-size: 1.125rem;
	}

	.bio-section ul {
		margin: 0;
		padding-left: 1.5rem;
	}

	.bio-section li {
		margin-bottom: 0.5rem;
		font-size: 1.125rem;
	}

	.bio-section.highlight {
		background-color: rgb(var(--bg-secondary));
		padding: 2rem;
		border-radius: 0.75rem;
		border-left: 4px solid rgb(var(--color-primary));
	}

	.lead {
		font-size: 1.25rem !important;
		line-height: 1.8;
		font-weight: 400;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.skills-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.skill-category h3 {
		margin: 0 0 1rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: rgb(var(--color-primary));
	}

	.skill-category ul {
		margin: 0;
		padding-left: 1.5rem;
	}

	.languages-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.language-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: rgb(var(--bg-secondary));
		border-radius: 0.5rem;
	}

	.language-name {
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.language-level {
		color: rgb(var(--text-muted));
		font-size: 0.875rem;
	}

	.education-item {
		margin-bottom: 2rem;
		padding: 1.5rem;
		background-color: rgb(var(--bg-secondary));
		border-radius: 0.75rem;
	}

	.education-item h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.institution {
		margin: 0 0 0.25rem 0;
		color: rgb(var(--text-secondary));
		font-weight: 500;
	}

	.period {
		margin: 0 0 0.5rem 0;
		color: rgb(var(--text-muted));
		font-size: 0.875rem;
	}

	.description {
		margin: 0;
		font-style: italic;
		color: rgb(var(--text-secondary));
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem;
		background-color: rgb(var(--bg-secondary));
		border-radius: 0.5rem;
	}

	.contact-item svg {
		color: rgb(var(--color-primary));
		flex-shrink: 0;
	}

	.contact-item a {
		color: rgb(var(--text-primary));
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.contact-item a:hover {
		color: rgb(var(--color-primary));
	}
</style>
