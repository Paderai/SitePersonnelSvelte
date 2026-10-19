<script lang="ts">
	import { t } from 'svelte-i18n';
	import { cvData } from '$lib/data/cv-data';
</script>

<div class="cv-page">
	<div class="container">
		<!-- En-tête avec photo -->
		<header class="cv-header">
			<div class="header-content">
				<img src="/photo-profile.jpg" alt={cvData.profile.name} class="cv-avatar" />
				<div class="header-info">
					<h1 class="cv-title">{cvData.profile.name}</h1>
					<p class="cv-subtitle">{cvData.profile.title}</p>
					<div class="contact-links">
						<div class="contact-item">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
								<circle cx="12" cy="10" r="3"></circle>
							</svg>
							<span>{cvData.profile.location}</span>
						</div>
						<div class="contact-item">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
								></path>
								<polyline points="22,6 12,13 2,6"></polyline>
							</svg>
							<a href="mailto:{cvData.profile.email}">{cvData.profile.email}</a>
						</div>
						{#if cvData.profile.linkedin}
							<div class="contact-item">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
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
				</div>
			</div>
		</header>

		<!-- Contenu du CV -->
		<div class="cv-content">
			<!-- Profil -->
			<section class="cv-section">
				<h2 class="section-title">{$t('bioPage.about')}</h2>
				<p class="profile-summary">{cvData.profile.summary}</p>
			</section>

			<!-- Expérience professionnelle -->
			<section class="cv-section">
				<h2 class="section-title">Expérience professionnelle</h2>
				{#each cvData.experiences as exp}
					<div class="experience-item">
						<div class="experience-header">
							<h3 class="experience-title">{exp.title}</h3>
							<span class="experience-period">{exp.period}</span>
						</div>
						<p class="experience-company">{exp.company} - {exp.location}</p>
						<ul class="experience-description">
							{#each exp.description as desc}
								<li>{desc}</li>
							{/each}
						</ul>
						{#if exp.achievements && exp.achievements.length > 0}
							<div class="experience-achievements">
								<strong>Réalisations clés :</strong>
								<ul>
									{#each exp.achievements as achievement}
										<li>{achievement}</li>
									{/each}
								</ul>
							</div>
						{/if}
						{#if exp.technologies && exp.technologies.length > 0}
							<div class="experience-tech">
								{#each exp.technologies as tech}
									<span class="tech-badge">{tech}</span>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</section>

			<!-- Compétences -->
			<section class="cv-section">
				<h2 class="section-title">{$t('bioPage.expertise')}</h2>
				<div class="skills-grid">
					{#each cvData.skills as skillCategory}
						<div class="skill-category">
							<h3 class="skill-category-title">{skillCategory.category}</h3>
							<ul class="skill-list">
								{#each skillCategory.items as skill}
									<li>{skill}</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</section>

			<!-- Formation -->
			<section class="cv-section">
				<h2 class="section-title">{$t('bioPage.education')}</h2>
				{#each cvData.education as edu}
					<div class="education-item">
						<h3 class="education-degree">{edu.degree}</h3>
						<p class="education-institution">{edu.institution} - {edu.location}</p>
						<p class="education-period">{edu.period}</p>
						{#if edu.description}
							<p class="education-description">{edu.description}</p>
						{/if}
					</div>
				{/each}
			</section>

			<!-- Langues -->
			<section class="cv-section">
				<h2 class="section-title">{$t('bioPage.languages')}</h2>
				<div class="languages-grid">
					{#each cvData.languages as lang}
						<div class="language-item">
							<span class="language-name">{lang.language}</span>
							<span class="language-level">{lang.level}</span>
						</div>
					{/each}
				</div>
			</section>
		</div>
	</div>
</div>

<style>
	.cv-page {
		width: 100%;
		min-height: calc(100vh - 16rem);
		background-color: rgb(var(--bg-primary));
	}

	.container {
		max-width: 56rem;
		margin: 0 auto;
		padding: 3rem 1rem;
	}

	/* En-tête */
	.cv-header {
		margin-bottom: 3rem;
		padding: 2rem;
		background-color: rgb(var(--bg-secondary));
		border-radius: 1rem;
		border: 1px solid rgb(var(--border-color));
	}

	.header-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		text-align: center;
	}

	@media (min-width: 640px) {
		.header-content {
			flex-direction: row;
			text-align: left;
		}
	}

	.cv-avatar {
		width: 10rem;
		height: 10rem;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: var(--shadow-md);
		border: 4px solid rgb(var(--color-primary));
		flex-shrink: 0;
	}

	.header-info {
		flex: 1;
	}

	.cv-title {
		margin: 0 0 0.5rem 0;
		font-size: 2rem;
		font-weight: 700;
		color: rgb(var(--text-primary));
	}

	.cv-subtitle {
		margin: 0 0 1rem 0;
		font-size: 1.25rem;
		color: rgb(var(--color-primary));
		font-weight: 500;
	}

	.contact-links {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: rgb(var(--text-secondary));
		font-size: 0.875rem;
	}

	.contact-item svg {
		color: rgb(var(--color-primary));
		flex-shrink: 0;
	}

	.contact-item a {
		color: rgb(var(--text-secondary));
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.contact-item a:hover {
		color: rgb(var(--color-primary));
	}

	/* Contenu */
	.cv-content {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.cv-section {
		padding: 2rem;
		background-color: rgb(var(--bg-secondary));
		border-radius: 0.75rem;
		border: 1px solid rgb(var(--border-color));
	}

	.section-title {
		margin: 0 0 1.5rem 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: rgb(var(--color-primary));
		border-bottom: 2px solid rgb(var(--color-primary));
		padding-bottom: 0.5rem;
	}

	.profile-summary {
		margin: 0;
		font-size: 1.125rem;
		line-height: 1.7;
		color: rgb(var(--text-secondary));
	}

	/* Compétences */
	.skills-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 768px) {
		.skills-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.skill-category-title {
		margin: 0 0 0.75rem 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.skill-list {
		margin: 0;
		padding-left: 1.5rem;
		list-style-type: disc;
	}

	.skill-list li {
		margin-bottom: 0.5rem;
		color: rgb(var(--text-secondary));
		line-height: 1.5;
	}

	/* Formation */
	.education-item {
		margin-bottom: 1.5rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid rgb(var(--border-color));
	}

	.education-item:last-child {
		margin-bottom: 0;
		padding-bottom: 0;
		border-bottom: none;
	}

	.education-degree {
		margin: 0 0 0.5rem 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.education-institution {
		margin: 0 0 0.25rem 0;
		color: rgb(var(--text-secondary));
		font-weight: 500;
	}

	.education-period {
		margin: 0 0 0.5rem 0;
		color: rgb(var(--text-muted));
		font-size: 0.875rem;
		font-style: italic;
	}

	.education-description {
		margin: 0;
		color: rgb(var(--text-secondary));
		line-height: 1.6;
		font-size: 0.9375rem;
	}

	/* Langues */
	.languages-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}

	@media (min-width: 640px) {
		.languages-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.language-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: rgb(var(--bg-tertiary));
		border-radius: 0.5rem;
		border: 1px solid rgb(var(--border-color));
	}

	.language-name {
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.language-level {
		color: rgb(var(--text-muted));
		font-size: 0.875rem;
	}

	/* Expérience professionnelle */
	.experience-item {
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid rgb(var(--border-color));
	}

	.experience-item:last-child {
		margin-bottom: 0;
		padding-bottom: 0;
		border-bottom: none;
	}

	.experience-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 0.5rem;
		flex-wrap: wrap;
	}

	.experience-title {
		margin: 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
		flex: 1;
		min-width: 200px;
	}

	.experience-period {
		color: rgb(var(--text-muted));
		font-size: 0.875rem;
		font-weight: 500;
		white-space: nowrap;
	}

	.experience-company {
		margin: 0 0 1rem 0;
		color: rgb(var(--text-secondary));
		font-weight: 500;
	}

	.experience-description {
		margin: 0 0 1rem 0;
		padding-left: 1.5rem;
		list-style-type: disc;
	}

	.experience-description li {
		margin-bottom: 0.5rem;
		color: rgb(var(--text-secondary));
		line-height: 1.6;
	}

	.experience-achievements {
		margin: 1rem 0;
		padding: 0.75rem;
		background-color: rgb(var(--bg-primary));
		border-left: 3px solid rgb(var(--color-accent));
		border-radius: 0.375rem;
	}

	.experience-achievements strong {
		color: rgb(var(--text-primary));
		font-size: 0.875rem;
	}

	.experience-achievements ul {
		margin: 0.5rem 0 0 0;
		padding-left: 1.25rem;
	}

	.experience-achievements li {
		font-size: 0.875rem;
		margin-bottom: 0.25rem;
		color: rgb(var(--text-secondary));
	}

	.experience-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		margin-top: 1rem;
	}

	.tech-badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		background-color: rgb(var(--color-primary) / 0.1);
		color: rgb(var(--color-primary));
		border-radius: 9999px;
		border: 1px solid rgb(var(--color-primary) / 0.2);
	}
</style>
