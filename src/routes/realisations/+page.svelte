<script lang="ts">
	import { t } from 'svelte-i18n';
	import { projectsData, projectCategories, getAvailableYears } from '$lib/data/projects-data';
	import { tl } from '$lib/i18n';

	let selectedCategory = $state<string | null>(null);
	let selectedYear = $state<string | null>(null);

	// Filtrer les projets selon la catégorie et l'année sélectionnées
	const filteredProjects = $derived.by(() => {
		let filtered = projectsData;

		if (selectedCategory) {
			filtered = filtered.filter((p) => p.category === selectedCategory);
		}

		if (selectedYear) {
			filtered = filtered.filter((p) => p.year === selectedYear);
		}

		return filtered;
	});

	const availableYears = getAvailableYears();
</script>

<div class="page-container">
	<div class="container">
		<header class="page-header">
			<h1 class="page-title">{$t('nav.achievements')}</h1>
			<p class="page-subtitle">{$t('achievements.subtitle')}</p>
		</header>

		<!-- Filtres -->
		<div class="filters">
			<div class="filter-group">
				<label>{$t('achievements.filterCategory')}</label>
				<div class="filter-buttons">
					<button
						class="filter-button"
						class:active={selectedCategory === null}
						onclick={() => (selectedCategory = null)}
					>
						{$t('achievements.filterAll')}
					</button>
					{#each projectCategories as category}
						<button
							class="filter-button"
							class:active={selectedCategory === category.id}
							onclick={() => (selectedCategory = category.id)}
						>
							{$t(`achievements.categories.${category.id}`)}
						</button>
					{/each}
				</div>
			</div>

			<div class="filter-group">
				<label>{$t('achievements.filterYear')}</label>
				<div class="filter-buttons">
					<button
						class="filter-button"
						class:active={selectedYear === null}
						onclick={() => (selectedYear = null)}
					>
						{$t('achievements.filterAll')}
					</button>
					{#each availableYears as year}
						<button
							class="filter-button"
							class:active={selectedYear === year}
							onclick={() => (selectedYear = year)}
						>
							{year}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Compteur de projets -->
		<div class="projects-count">
			<p>{filteredProjects.length > 1 ? $t('achievements.projectCountPlural', { values: { count: filteredProjects.length } }) : $t('achievements.projectCount', { values: { count: filteredProjects.length } })}</p>
		</div>

		<!-- Grille de projets -->
		<div class="projects-grid">
			{#each filteredProjects as project}
				<article class="project-card">
					<div class="project-header">
						<div class="project-meta">
							<span class="project-category">{$t(`achievements.categories.${project.category}`)}</span>
							<span class="project-year">{project.year}</span>
						</div>
						<span class="project-status status-{project.status}">
							{#if project.status === 'completed'}✓{:else if project.status === 'in-progress'}⏳{:else}📅{/if}
						</span>
					</div>
					<h3 class="project-title">{$tl(project.title)}</h3>
					{#if project.client}
						<p class="project-client">{$t('achievements.client')} {$tl(project.client)}</p>
					{/if}
					<p class="project-description">{$tl(project.description)}</p>

					{#if project.achievements && project.achievements.length > 0}
						<div class="project-achievements">
							<strong>{$t('achievements.keyAchievements')}</strong>
							<ul>
								{#each project.achievements.slice(0, 2) as achievement}
									<li>{$tl(achievement)}</li>
								{/each}
							</ul>
						</div>
					{/if}

					{#if project.technologies && project.technologies.length > 0}
						<div class="project-tech">
							{#each project.technologies as tech}
								<span class="tech-tag">{$tl(tech)}</span>
							{/each}
						</div>
					{/if}
				</article>
			{/each}
		</div>

		{#if filteredProjects.length === 0}
			<div class="no-results">
				<p>{$t('achievements.noResults')}</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.page-container {
		width: 100%;
		min-height: calc(100vh - 16rem);
	}

	.container {
		max-width: 80rem;
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
		margin: 0 0 0.5rem 0;
		font-size: 1.25rem;
		color: rgb(var(--text-secondary));
	}

	.projects-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.projects-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.projects-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.project-card {
		padding: 2rem;
		background-color: rgb(var(--bg-secondary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.75rem;
		transition: all 0.2s ease;
		display: flex;
		flex-direction: column;
	}

	.project-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
		border-color: rgb(var(--color-primary));
	}

	.project-header {
		margin-bottom: 1rem;
	}

	.project-meta {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.project-category,
	.project-year {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		border-radius: 9999px;
	}

	.project-category {
		background-color: rgb(var(--color-primary) / 0.1);
		color: rgb(var(--color-primary));
	}

	.project-year {
		background-color: rgb(var(--bg-tertiary));
		color: rgb(var(--text-muted));
	}

	.project-title {
		margin: 0 0 0.75rem 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.project-description {
		margin: 0 0 1.5rem 0;
		color: rgb(var(--text-secondary));
		line-height: 1.6;
		flex: 1;
	}

	.project-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: none;
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.375rem;
		color: rgb(var(--color-primary));
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		align-self: flex-start;
	}

	.project-link:hover {
		background-color: rgb(var(--color-primary) / 0.05);
		border-color: rgb(var(--color-primary));
	}

	/* Filtres */
	.filters {
		margin-bottom: 2rem;
		padding: 1.5rem;
		background-color: rgb(var(--bg-secondary));
		border-radius: 0.75rem;
		border: 1px solid rgb(var(--border-color));
	}

	.filter-group {
		margin-bottom: 1rem;
	}

	.filter-group:last-child {
		margin-bottom: 0;
	}

	.filter-group label {
		display: block;
		margin-bottom: 0.75rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.filter-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.filter-button {
		padding: 0.5rem 1rem;
		background-color: rgb(var(--bg-tertiary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.375rem;
		color: rgb(var(--text-secondary));
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.filter-button:hover {
		background-color: rgb(var(--bg-primary));
		border-color: rgb(var(--color-primary));
	}

	.filter-button.active {
		background-color: rgb(var(--color-primary));
		color: white;
		border-color: rgb(var(--color-primary));
	}

	.projects-count {
		margin-bottom: 1.5rem;
	}

	.projects-count p {
		color: rgb(var(--text-muted));
		font-size: 0.875rem;
	}

	/* Statut du projet */
	.project-status {
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		font-size: 0.875rem;
	}

	.status-completed {
		background-color: rgb(34 197 94 / 0.1);
		color: rgb(34 197 94);
	}

	.status-in-progress {
		background-color: rgb(var(--color-accent) / 0.1);
		color: rgb(var(--color-accent));
	}

	.status-planned {
		background-color: rgb(var(--color-primary) / 0.1);
		color: rgb(var(--color-primary));
	}

	/* Client */
	.project-client {
		margin: 0 0 0.75rem 0;
		color: rgb(var(--text-muted));
		font-size: 0.875rem;
		font-style: italic;
	}

	/* Réalisations clés */
	.project-achievements {
		margin: 1rem 0;
		padding: 0.75rem;
		background-color: rgb(var(--bg-primary));
		border-left: 3px solid rgb(var(--color-accent));
		border-radius: 0.375rem;
	}

	.project-achievements strong {
		color: rgb(var(--text-primary));
		font-size: 0.875rem;
	}

	.project-achievements ul {
		margin: 0.5rem 0 0 0;
		padding-left: 1.25rem;
	}

	.project-achievements li {
		font-size: 0.875rem;
		margin-bottom: 0.25rem;
		color: rgb(var(--text-secondary));
	}

	/* Technologies */
	.project-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		margin-top: 1rem;
	}

	/* Aucun résultat */
	.no-results {
		padding: 3rem 2rem;
		text-align: center;
		background-color: rgb(var(--bg-secondary));
		border-radius: 0.75rem;
		border: 2px dashed rgb(var(--border-color));
	}

	.no-results p {
		margin: 0;
		color: rgb(var(--text-muted));
		font-size: 1.125rem;
	}
</style>
