<script lang="ts">
	import { t } from 'svelte-i18n';
	import { cvData } from '$lib/data/cv-data';

	let expandedSections = $state<Set<string>>(new Set(['profile']));

	function toggleSection(section: string) {
		if (expandedSections.has(section)) {
			expandedSections.delete(section);
		} else {
			expandedSections.add(section);
		}
		expandedSections = new Set(expandedSections);
	}
</script>

<div class="page-container">
	<div class="container">
		<header class="page-header">
			<h1 class="page-title">{$t('nav.cv')}</h1>
			<p class="page-subtitle">{cvData.profile.name}</p>
			<div class="header-actions">
				<a
					href="/CV_François-Provencher_Innovitech Sept 2024.docx"
					download
					class="download-button"
				>
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
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
						<polyline points="7 10 12 15 17 10"></polyline>
						<line x1="12" y1="15" x2="12" y2="3"></line>
					</svg>
					Télécharger le CV complet
				</a>
			</div>
		</header>

		<div class="cv-content">
			<!-- Section Profil -->
			<div class="accordion">
				<div class="accordion-item">
					<button
						class="accordion-header"
						class:expanded={expandedSections.has('profile')}
						onclick={() => toggleSection('profile')}
					>
						<span class="accordion-title">👤 Profil</span>
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
							class="chevron"
							class:rotated={expandedSections.has('profile')}
						>
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</button>
					{#if expandedSections.has('profile')}
						<div class="accordion-content">
							<p class="summary">{cvData.profile.summary}</p>
							<div class="contact-grid">
								<div class="contact-item">
									<strong>Email:</strong> {cvData.profile.email}
								</div>
								<div class="contact-item">
									<strong>Localisation:</strong> {cvData.profile.location}
								</div>
							</div>
						</div>
					{/if}
				</div>

				<!-- Section Expérience -->
				<div class="accordion-item">
					<button
						class="accordion-header"
						class:expanded={expandedSections.has('experience')}
						onclick={() => toggleSection('experience')}
					>
						<span class="accordion-title">💼 Expérience professionnelle</span>
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
							class="chevron"
							class:rotated={expandedSections.has('experience')}
						>
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</button>
					{#if expandedSections.has('experience')}
						<div class="accordion-content">
							{#each cvData.experiences as exp}
								<div class="experience-item">
									<h4>{exp.title}</h4>
									<p class="company">{exp.company} - {exp.location}</p>
									<p class="period">{exp.period}</p>
									<ul class="description-list">
										{#each exp.description as desc}
											<li>{desc}</li>
										{/each}
									</ul>
									{#if exp.achievements && exp.achievements.length > 0}
										<div class="achievements">
											<strong>Réalisations:</strong>
											<ul>
												{#each exp.achievements as achievement}
													<li>{achievement}</li>
												{/each}
											</ul>
										</div>
									{/if}
									{#if exp.technologies && exp.technologies.length > 0}
										<div class="tech-tags">
											{#each exp.technologies as tech}
												<span class="tech-tag">{tech}</span>
											{/each}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Section Formation -->
				<div class="accordion-item">
					<button
						class="accordion-header"
						class:expanded={expandedSections.has('education')}
						onclick={() => toggleSection('education')}
					>
						<span class="accordion-title">🎓 Formation</span>
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
							class="chevron"
							class:rotated={expandedSections.has('education')}
						>
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</button>
					{#if expandedSections.has('education')}
						<div class="accordion-content">
							{#each cvData.education as edu}
								<div class="education-item">
									<h4>{edu.degree}</h4>
									<p class="institution">{edu.institution} - {edu.location}</p>
									<p class="period">{edu.period}</p>
									{#if edu.description}
										<p class="description">{edu.description}</p>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Section Compétences -->
				<div class="accordion-item">
					<button
						class="accordion-header"
						class:expanded={expandedSections.has('skills')}
						onclick={() => toggleSection('skills')}
					>
						<span class="accordion-title">🛠️ Compétences</span>
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
							class="chevron"
							class:rotated={expandedSections.has('skills')}
						>
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</button>
					{#if expandedSections.has('skills')}
						<div class="accordion-content">
							<div class="skills-grid">
								{#each cvData.skills as skillCategory}
									<div class="skill-category">
										<h4>{skillCategory.category}</h4>
										<div class="skill-tags">
											{#each skillCategory.items as skill}
												<span class="skill-tag">{skill}</span>
											{/each}
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>

				<!-- Section Langues -->
				<div class="accordion-item">
					<button
						class="accordion-header"
						class:expanded={expandedSections.has('languages')}
						onclick={() => toggleSection('languages')}
					>
						<span class="accordion-title">🌍 Langues</span>
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
							class="chevron"
							class:rotated={expandedSections.has('languages')}
						>
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</button>
					{#if expandedSections.has('languages')}
						<div class="accordion-content">
							<div class="languages-grid">
								{#each cvData.languages as lang}
									<div class="language-item">
										<span class="language-name">{lang.language}</span>
										<span class="language-level">{lang.level}</span>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>

				<!-- Section Certifications -->
				{#if cvData.certifications.length > 0}
					<div class="accordion-item">
						<button
							class="accordion-header"
							class:expanded={expandedSections.has('certifications')}
							onclick={() => toggleSection('certifications')}
						>
							<span class="accordion-title">📜 Certifications</span>
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
								class="chevron"
								class:rotated={expandedSections.has('certifications')}
							>
								<polyline points="6 9 12 15 18 9"></polyline>
							</svg>
						</button>
						{#if expandedSections.has('certifications')}
							<div class="accordion-content">
								{#each cvData.certifications as cert}
									<div class="certification-item">
										<h4>{cert.name}</h4>
										<p class="issuer">{cert.issuer}</p>
										<p class="date">{cert.date}</p>
										{#if cert.url}
											<a href={cert.url} target="_blank" rel="noopener noreferrer"
												>Voir la certification</a
											>
										{/if}
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
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
		margin: 0 0 1.5rem 0;
		font-size: 1.25rem;
		color: rgb(var(--text-secondary));
	}

	.header-actions {
		display: flex;
		gap: 1rem;
	}

	.download-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background-color: rgb(var(--color-primary));
		color: white;
		border-radius: 0.5rem;
		text-decoration: none;
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.download-button:hover {
		background-color: rgb(var(--color-primary-dark));
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}

	.cv-content {
		margin-top: 2rem;
	}

	.accordion {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.accordion-item {
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.75rem;
		overflow: hidden;
		background-color: rgb(var(--bg-secondary));
	}

	.accordion-header {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem 1.5rem;
		background: none;
		border: none;
		cursor: pointer;
		transition: background-color 0.2s ease;
		text-align: left;
	}

	.accordion-header:hover {
		background-color: rgb(var(--bg-tertiary));
	}

	.accordion-header.expanded {
		background-color: rgb(var(--color-primary) / 0.05);
	}

	.accordion-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.chevron {
		transition: transform 0.2s ease;
		color: rgb(var(--text-secondary));
	}

	.chevron.rotated {
		transform: rotate(180deg);
	}

	.accordion-content {
		padding: 0 1.5rem 1.5rem 1.5rem;
		color: rgb(var(--text-secondary));
		animation: slideDown 0.2s ease;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-0.5rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Profile Section */
	.summary {
		margin: 0 0 1.5rem 0;
		font-size: 1.125rem;
		line-height: 1.7;
		color: rgb(var(--text-primary));
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}

	@media (min-width: 640px) {
		.contact-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.contact-item {
		padding: 0.75rem;
		background-color: rgb(var(--bg-tertiary));
		border-radius: 0.375rem;
		font-size: 0.9375rem;
	}

	.contact-item strong {
		color: rgb(var(--text-primary));
	}

	/* Experience Section */
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

	.experience-item h4 {
		margin: 0 0 0.5rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.company {
		margin: 0 0 0.25rem 0;
		color: rgb(var(--text-primary));
		font-weight: 500;
	}

	.period {
		margin: 0 0 1rem 0;
		color: rgb(var(--text-muted));
		font-size: 0.875rem;
	}

	.description-list {
		margin: 0 0 1rem 0;
		padding-left: 1.5rem;
	}

	.description-list li {
		margin-bottom: 0.5rem;
		line-height: 1.6;
	}

	.achievements {
		margin: 1rem 0;
		padding: 1rem;
		background-color: rgb(var(--color-accent) / 0.05);
		border-left: 3px solid rgb(var(--color-accent));
		border-radius: 0.375rem;
	}

	.achievements strong {
		color: rgb(var(--text-primary));
	}

	.achievements ul {
		margin: 0.5rem 0 0 0;
		padding-left: 1.5rem;
	}

	.tech-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.tech-tag {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		background-color: rgb(var(--color-primary) / 0.1);
		color: rgb(var(--color-primary));
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 500;
	}

	/* Education Section */
	.education-item {
		margin-bottom: 1.5rem;
		padding: 1.25rem;
		background-color: rgb(var(--bg-tertiary));
		border-radius: 0.5rem;
	}

	.education-item:last-child {
		margin-bottom: 0;
	}

	.education-item h4 {
		margin: 0 0 0.5rem 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.institution {
		margin: 0 0 0.25rem 0;
		color: rgb(var(--text-secondary));
		font-weight: 500;
	}

	.description {
		margin: 0.5rem 0 0 0;
		font-style: italic;
		color: rgb(var(--text-secondary));
	}

	/* Skills Section */
	.skills-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	.skill-category h4 {
		margin: 0 0 0.75rem 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: rgb(var(--color-primary));
	}

	.skill-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.skill-tag {
		display: inline-block;
		padding: 0.375rem 0.875rem;
		background-color: rgb(var(--bg-tertiary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.375rem;
		font-size: 0.875rem;
		color: rgb(var(--text-primary));
	}

	/* Languages Section */
	.languages-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}

	.language-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: rgb(var(--bg-tertiary));
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

	/* Certifications Section */
	.certification-item {
		margin-bottom: 1.5rem;
		padding: 1.25rem;
		background-color: rgb(var(--bg-tertiary));
		border-radius: 0.5rem;
	}

	.certification-item:last-child {
		margin-bottom: 0;
	}

	.certification-item h4 {
		margin: 0 0 0.5rem 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.issuer {
		margin: 0 0 0.25rem 0;
		color: rgb(var(--text-secondary));
	}

	.date {
		margin: 0 0 0.75rem 0;
		color: rgb(var(--text-muted));
		font-size: 0.875rem;
	}

	.certification-item a {
		color: rgb(var(--color-primary));
		text-decoration: none;
		font-weight: 500;
	}

	.certification-item a:hover {
		text-decoration: underline;
	}
</style>
