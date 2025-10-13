<script lang="ts">
	import { t } from 'svelte-i18n';

	// État des accordéons
	let expandedSections = $state<string[]>(['genesis']);

	function toggleSection(section: string) {
		if (expandedSections.includes(section)) {
			expandedSections = expandedSections.filter((s) => s !== section);
		} else {
			expandedSections = [...expandedSections, section];
		}
	}

	// Définition des applications par catégorie
	interface App {
		name: string;
		icon: string;
		description: string;
	}

	interface AppCategory {
		id: string;
		titleKey: string;
		apps: App[];
	}

	const appCategories: AppCategory[] = [
		{
			id: 'office',
			titleKey: 'incubator.software.office.title',
			apps: [
				{
					name: 'Microsoft 365',
					icon: '📝',
					description: 'incubator.software.office.microsoft365'
				},
				{
					name: 'SharePoint',
					icon: '🔗',
					description: 'incubator.software.office.sharepoint'
				},
				{
					name: 'OneNote',
					icon: '📓',
					description: 'incubator.software.office.onenote'
				},
				{
					name: 'Teams / Zoom / Meet',
					icon: '💬',
					description: 'incubator.software.office.communication'
				},
				{
					name: 'Antidote',
					icon: '✍️',
					description: 'incubator.software.office.antidote'
				}
			]
		},
		{
			id: 'power',
			titleKey: 'incubator.software.power.title',
			apps: [
				{
					name: 'Power BI',
					icon: '📊',
					description: 'incubator.software.power.bi'
				},
				{
					name: 'Power Automate',
					icon: '⚡',
					description: 'incubator.software.power.automate'
				},
				{
					name: 'Power Apps',
					icon: '🔧',
					description: 'incubator.software.power.apps'
				},
				{
					name: 'Dataverse',
					icon: '🗄️',
					description: 'incubator.software.power.dataverse'
				}
			]
		},
		{
			id: 'content',
			titleKey: 'incubator.software.content.title',
			apps: [
				{
					name: 'DaVinci Resolve',
					icon: '🎬',
					description: 'incubator.software.content.davinci'
				},
				{
					name: 'Audacity',
					icon: '🎵',
					description: 'incubator.software.content.audacity'
				},
				{
					name: 'OBS Studio',
					icon: '📹',
					description: 'incubator.software.content.obs'
				},
				{
					name: 'Unity / Unreal',
					icon: '🎮',
					description: 'incubator.software.content.gameengines'
				}
			]
		},
		{
			id: 'graphics',
			titleKey: 'incubator.software.graphics.title',
			apps: [
				{
					name: 'GIMP',
					icon: '🎨',
					description: 'incubator.software.graphics.gimp'
				},
				{
					name: 'Blender',
					icon: '🧊',
					description: 'incubator.software.graphics.blender'
				},
				{
					name: 'Fusion 360',
					icon: '📐',
					description: 'incubator.software.graphics.fusion'
				},
				{
					name: 'PrusaSlicer',
					icon: '🖨️',
					description: 'incubator.software.graphics.slicer'
				}
			]
		},
		{
			id: 'development',
			titleKey: 'incubator.software.development.title',
			apps: [
				{
					name: 'VS Code',
					icon: '💻',
					description: 'incubator.software.development.vscode'
				},
				{
					name: 'GitHub',
					icon: '🐙',
					description: 'incubator.software.development.github'
				},
				{
					name: 'Docker',
					icon: '🐳',
					description: 'incubator.software.development.docker'
				},
				{
					name: 'Node.js',
					icon: '🟢',
					description: 'incubator.software.development.nodejs'
				},
				{
					name: 'Python',
					icon: '🐍',
					description: 'incubator.software.development.python'
				},
				{
					name: 'Svelte/React/Vue',
					icon: '⚛️',
					description: 'incubator.software.development.frameworks'
				}
			]
		},
		{
			id: 'ai',
			titleKey: 'incubator.software.ai.title',
			apps: [
				{
					name: 'Jupyter',
					icon: '📔',
					description: 'incubator.software.ai.jupyter'
				},
				{
					name: 'PyTorch',
					icon: '🔥',
					description: 'incubator.software.ai.pytorch'
				},
				{
					name: 'TensorFlow',
					icon: '🧠',
					description: 'incubator.software.ai.tensorflow'
				},
				{
					name: 'OpenAI',
					icon: '🤖',
					description: 'incubator.software.ai.openai'
				},
				{
					name: 'Claude',
					icon: '💭',
					description: 'incubator.software.ai.claude'
				},
				{
					name: 'Ollama',
					icon: '🦙',
					description: 'incubator.software.ai.ollama'
				}
			]
		}
	];
</script>

<div class="page-container">
	<div class="container">
		<header class="page-header">
			<h1 class="page-title">{$t('incubator.title')}</h1>
			<p class="page-subtitle">{$t('incubator.subtitle')}</p>
		</header>

		<article class="content">
			<!-- Section La genèse -->
			<section class="accordion-section">
				<button
					class="accordion-header"
					class:expanded={expandedSections.includes('genesis')}
					onclick={() => toggleSection('genesis')}
				>
					<h2>{$t('incubator.genesis.title')}</h2>
					<svg
						class="chevron"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="6 9 12 15 18 9"></polyline>
					</svg>
				</button>
				{#if expandedSections.includes('genesis')}
					<div class="accordion-content">
						<p>{$t('incubator.genesis.text')}</p>
					</div>
				{/if}
			</section>

			<!-- Section L'objectif -->
			<section class="accordion-section">
				<button
					class="accordion-header"
					class:expanded={expandedSections.includes('objective')}
					onclick={() => toggleSection('objective')}
				>
					<h2>{$t('incubator.objective.title')}</h2>
					<svg
						class="chevron"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="6 9 12 15 18 9"></polyline>
					</svg>
				</button>
				{#if expandedSections.includes('objective')}
					<div class="accordion-content">
						<p>{$t('incubator.objective.text')}</p>
					</div>
				{/if}
			</section>

			<!-- Section 2025 -->
			<section class="accordion-section">
				<button
					class="accordion-header"
					class:expanded={expandedSections.includes('current')}
					onclick={() => toggleSection('current')}
				>
					<h2>{$t('incubator.current.title')}</h2>
					<svg
						class="chevron"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="6 9 12 15 18 9"></polyline>
					</svg>
				</button>
				{#if expandedSections.includes('current')}
					<div class="accordion-content">
						<p>{$t('incubator.current.text')}</p>
					</div>
				{/if}
			</section>

			<!-- Section Équipements -->
			<section class="accordion-section">
				<button
					class="accordion-header"
					class:expanded={expandedSections.includes('equipment')}
					onclick={() => toggleSection('equipment')}
				>
					<h2>{$t('incubator.equipment.title')}</h2>
					<svg
						class="chevron"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="6 9 12 15 18 9"></polyline>
					</svg>
				</button>
				{#if expandedSections.includes('equipment')}
					<div class="accordion-content">
						<ul class="equipment-list">
							<li>🖥️ {$t('incubator.equipment.desktop')}</li>
							<li>💻 {$t('incubator.equipment.laptop')}</li>
							<li>🍓 {$t('incubator.equipment.raspberry')}</li>
							<li>⚙️ {$t('incubator.equipment.arduino')}</li>
							<li>🖨️ {$t('incubator.equipment.printer')}</li>
							<li>🎥 {$t('incubator.equipment.avmaterial')}</li>
							<li>🔌 {$t('incubator.equipment.electronics')}</li>
						</ul>
					</div>
				{/if}
			</section>

			<!-- Section Logiciels -->
			<section class="accordion-section">
				<button
					class="accordion-header"
					class:expanded={expandedSections.includes('software')}
					onclick={() => toggleSection('software')}
				>
					<h2>{$t('incubator.software.title')}</h2>
					<svg
						class="chevron"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="6 9 12 15 18 9"></polyline>
					</svg>
				</button>
				{#if expandedSections.includes('software')}
					<div class="accordion-content">
						{#each appCategories as category}
							<div class="app-category">
								<h3 class="category-title">{$t(category.titleKey)}</h3>
								<div class="apps-grid">
									{#each category.apps as app}
										<div class="app-card">
											<div class="app-icon">{app.icon}</div>
											<div class="app-info">
												<h4 class="app-name">{app.name}</h4>
												<p class="app-description">{$t(app.description)}</p>
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</section>

			<!-- Section La suite -->
			<section class="accordion-section">
				<button
					class="accordion-header"
					class:expanded={expandedSections.includes('future')}
					onclick={() => toggleSection('future')}
				>
					<h2>{$t('incubator.future.title')}</h2>
					<svg
						class="chevron"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="6 9 12 15 18 9"></polyline>
					</svg>
				</button>
				{#if expandedSections.includes('future')}
					<div class="accordion-content">
						<p>{$t('incubator.future.text')}</p>

						<h3 class="projects-title">{$t('incubator.future.projectsTitle')}</h3>
						<ul class="projects-list">
							<li>🌐 {$t('incubator.future.project1')}</li>
							<li>🧠 {$t('incubator.future.project2')}</li>
							<li>📡 {$t('incubator.future.project3')}</li>
							<li>⚛️ {$t('incubator.future.project4')}</li>
							<li>☁️ {$t('incubator.future.project5')}</li>
						</ul>

						<p class="conclusion">{$t('incubator.future.conclusion')}</p>
					</div>
				{/if}
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
		max-width: 64rem;
		margin: 0 auto;
		padding: 3rem 1rem;
	}

	.page-header {
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 2px solid rgb(var(--border-color));
		text-align: center;
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
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	/* Accordéon */
	.accordion-section {
		background-color: rgb(var(--bg-secondary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.75rem;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.accordion-section:hover {
		border-color: rgb(var(--color-primary));
	}

	.accordion-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 1.5rem;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		transition: all 0.2s ease;
	}

	.accordion-header:hover {
		background-color: rgb(var(--bg-tertiary));
	}

	.accordion-header h2 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: rgb(var(--color-primary));
	}

	.chevron {
		flex-shrink: 0;
		transition: transform 0.3s ease;
		color: rgb(var(--color-primary));
	}

	.accordion-header.expanded .chevron {
		transform: rotate(180deg);
	}

	.accordion-content {
		padding: 0 1.5rem 1.5rem 1.5rem;
		color: rgb(var(--text-secondary));
		line-height: 1.7;
		animation: slideDown 0.3s ease;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.accordion-content p {
		margin: 0 0 1rem 0;
		font-size: 1.0625rem;
	}

	.accordion-content p:last-child {
		margin-bottom: 0;
	}

	/* Listes d'équipements */
	.equipment-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.75rem;
	}

	.equipment-list li {
		padding: 0.75rem;
		background-color: rgb(var(--bg-tertiary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
		font-size: 1rem;
	}

	/* Applications */
	.app-category {
		margin-bottom: 2rem;
	}

	.app-category:last-child {
		margin-bottom: 0;
	}

	.category-title {
		margin: 0 0 1rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
		padding-bottom: 0.5rem;
		border-bottom: 2px solid rgb(var(--color-primary));
	}

	.apps-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}

	.app-card {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		background-color: rgb(var(--bg-tertiary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
		transition: all 0.2s ease;
	}

	.app-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
		border-color: rgb(var(--color-primary));
	}

	.app-icon {
		font-size: 2rem;
		flex-shrink: 0;
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgb(var(--bg-secondary));
		border-radius: 0.5rem;
	}

	.app-info {
		flex: 1;
	}

	.app-name {
		margin: 0 0 0.25rem 0;
		font-size: 1rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.app-description {
		margin: 0;
		font-size: 0.875rem;
		color: rgb(var(--text-secondary));
		line-height: 1.4;
	}

	/* Projets futurs */
	.projects-title {
		margin: 1.5rem 0 1rem 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.projects-list {
		list-style: none;
		padding: 0;
		margin: 0 0 1.5rem 0;
		display: grid;
		gap: 0.75rem;
	}

	.projects-list li {
		padding: 0.75rem;
		background-color: rgb(var(--bg-tertiary));
		border-left: 3px solid rgb(var(--color-primary));
		border-radius: 0.375rem;
		font-size: 1rem;
	}

	.conclusion {
		margin-top: 1.5rem;
		padding: 1rem;
		background-color: rgb(var(--color-primary) / 0.1);
		border-left: 3px solid rgb(var(--color-primary));
		border-radius: 0.375rem;
	}

	@media (max-width: 768px) {
		.apps-grid {
			grid-template-columns: 1fr;
		}

		.page-title {
			font-size: 2rem;
		}

		.accordion-header h2 {
			font-size: 1.25rem;
		}
	}
</style>
