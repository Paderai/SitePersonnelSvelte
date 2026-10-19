<script lang="ts">
	import { t } from 'svelte-i18n';
	import { technologies, zones, getCategories } from '$lib/data/technical-depth-data';
	import type { Technology } from '$lib/data/technical-depth-data';

	// Catégories pour les filtres
	const categories = getCategories();
	let selectedCategory = $state<string | null>(null);

	// Couleurs par catégorie
	const categoryColors: Record<string, string> = {
		'Gestion': 'rgb(147, 51, 234)', // Violet
		'Domaines': 'rgb(59, 130, 246)', // Bleu
		'Bureautique': 'rgb(16, 185, 129)', // Vert émeraude
		'Programmation': 'rgb(249, 115, 22)', // Orange
		'IA': 'rgb(236, 72, 153)', // Rose
		'Modélisation': 'rgb(14, 165, 233)', // Cyan
		'Contenu': 'rgb(139, 92, 246)', // Violet clair
		'Infrastructure': 'rgb(34, 197, 94)', // Vert
		'Hardware': 'rgb(234, 179, 8)' // Jaune
	};

	// Filtrer les technologies
	const filteredTechnologies = $derived.by(() => {
		if (!selectedCategory) return technologies;
		return technologies.filter((t) => t.category === selectedCategory);
	});

	// État du zoom
	let zoomLevel = $state(1);
	let panX = $state(0);
	let panY = $state(0);

	// État du drag
	let isDragging = $state(false);
	let dragStartX = $state(0);
	let dragStartY = $state(0);
	let initialPanX = $state(0);
	let initialPanY = $state(0);

	function zoomIn() {
		zoomLevel = Math.min(zoomLevel * 1.3, 4);
	}

	function zoomOut() {
		zoomLevel = Math.max(zoomLevel / 1.3, 1);
		if (zoomLevel === 1) {
			panX = 0;
			panY = 0;
		}
	}

	function resetZoom() {
		zoomLevel = 1;
		panX = 0;
		panY = 0;
	}

	function handleMouseDown(e: MouseEvent) {
		if (zoomLevel > 1) {
			isDragging = true;
			dragStartX = e.clientX;
			dragStartY = e.clientY;
			initialPanX = panX;
			initialPanY = panY;
			if (svgElement) {
				svgElement.style.cursor = 'grabbing';
			}
		}
	}

	function handleMouseMove(e: MouseEvent) {
		if (isDragging && zoomLevel > 1) {
			const deltaX = e.clientX - dragStartX;
			const deltaY = e.clientY - dragStartY;
			panX = initialPanX + deltaX;
			panY = initialPanY + deltaY;
		}
	}

	function handleMouseUp() {
		isDragging = false;
		if (svgElement) {
			svgElement.style.cursor = zoomLevel > 1 ? 'grab' : 'default';
		}
	}

	function handleMouseLeave() {
		isDragging = false;
		if (svgElement) {
			svgElement.style.cursor = zoomLevel > 1 ? 'grab' : 'default';
		}
	}

	// Fonction pour calculer la position Y sur la courbe en S
	function calculateSCurveY(x: number): number {
		// Fonction logistique pour créer une courbe en S
		// f(x) = 1 / (1 + e^(-k(x - x0)))
		// où k contrôle la pente et x0 est le point médian
		const k = 0.08; // Pente de la courbe
		const x0 = 50; // Point médian à 50%
		return 100 / (1 + Math.exp(-k * (x - x0)));
	}

	// Points pour tracer la courbe en S
	const curvePoints = Array.from({ length: 101 }, (_, i) => ({
		x: i,
		y: calculateSCurveY(i)
	}));

	let hoveredTech = $state<Technology | null>(null);
	let svgElement: SVGSVGElement;

	// Dimensions du graphique
	const width = 800;
	const height = 500;
	const padding = 60;
	const plotWidth = width - 2 * padding;
	const plotHeight = height - 2 * padding;

	// Fonctions de conversion
	function xToScreen(x: number): number {
		return padding + (x / 100) * plotWidth;
	}

	function yToScreen(y: number): number {
		return height - padding - (y / 100) * plotHeight;
	}

	// Fonction pour ajouter un léger décalage aléatoire mais déterministe
	function getOffset(techName: string): { x: number; y: number } {
		// Utiliser le hash du nom pour générer un décalage déterministe
		let hash = 0;
		for (let i = 0; i < techName.length; i++) {
			hash = techName.charCodeAt(i) + ((hash << 5) - hash);
		}
		const xOffset = ((hash % 100) / 100) * 4 - 2; // -2 à +2
		const yOffset = (((hash >> 8) % 100) / 100) * 4 - 2; // -2 à +2
		return { x: xOffset, y: yOffset };
	}

	// Générer le path de la courbe en S
	const curvePath = curvePoints
		.map((p, i) => {
			const x = xToScreen(p.x);
			const y = yToScreen(p.y);
			return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
		})
		.join(' ');
</script>

<div class="page-container">
	<div class="container">
		<header class="page-header">
			<h1 class="page-title">{$t('nav.depth')}</h1>
			<p class="page-subtitle">Courbe d'apprentissage et maîtrise technologique</p>
		</header>

		<article class="content">
			<!-- Explication du concept -->
			<section class="intro-section">
				<h2>Le concept de profondeur technique</h2>
				<p>
					La profondeur technique représente ma capacité à comprendre différentes technologies
					suffisamment en détail pour en avoir une bonne connaissance fonctionnelle, sans
					nécessairement être expert en tout. L'objectif n'est pas d'atteindre le niveau de
					spécialiste dans chaque domaine, mais d'avoir une compréhension assez approfondie pour
					pouvoir appliquer ces technologies de manière efficace et, au besoin, approfondir mes
					connaissances pour aller aussi loin que nécessaire selon les besoins du projet.
				</p>
				<p>
					Cette approche se visualise parfaitement à travers une courbe en S, qui représente trois
					phases distinctes d'apprentissage. <strong>Avant le premier point d'inflexion (0-30%)</strong>,
					on est néophyte : on ne sait pas ce qu'on ne sait pas, et l'apprentissage est relativement
					lent. <strong>Dans la partie centrale (30-70%)</strong>, après avoir franchi le premier
					point d'inflexion, on entre dans une phase d'apprentissage accéléré où l'on commence à
					comprendre les concepts fondamentaux et à savoir ce qu'on ne sait pas encore. Finalement,
					<strong>après le second point d'inflexion (70-100%)</strong>, on atteint le niveau expert :
					la maîtrise est approfondie mais le taux d'apprentissage diminue car on a déjà acquis
					l'essentiel des connaissances disponibles.
				</p>

				<div class="zones-grid">
					{#each zones as zone}
						<div class="zone-card" style="border-left-color: {zone.color}">
							<h3>{zone.name}</h3>
							<p class="zone-range">{zone.range}</p>
							<p class="zone-description">{zone.description}</p>
						</div>
					{/each}
				</div>
			</section>

			<!-- Filtres par catégorie -->
			<section class="filter-section">
				<h3>Filtrer par catégorie:</h3>
				<div class="filter-buttons">
					<button
						class="filter-btn"
						class:active={selectedCategory === null}
						onclick={() => (selectedCategory = null)}
					>
						Toutes ({technologies.length})
					</button>
					{#each categories as category}
						<button
							class="filter-btn"
							class:active={selectedCategory === category}
							onclick={() => (selectedCategory = category)}
						>
							{category} ({technologies.filter((t) => t.category === category).length})
						</button>
					{/each}
				</div>
			</section>

			<!-- Graphique de la courbe en S -->
			<section class="graph-section">
				<div class="graph-header">
					<h3>Positionnement sur la courbe d'apprentissage</h3>
					<div class="zoom-controls">
						<button class="zoom-btn" onclick={zoomIn} title="Zoom avant">+</button>
						<button class="zoom-btn" onclick={zoomOut} title="Zoom arrière">−</button>
						<button class="zoom-btn reset" onclick={resetZoom} title="Réinitialiser">⟲</button>
					</div>
				</div>

				<!-- Légende des couleurs -->
				<div class="legend">
					{#each categories as category}
						<div class="legend-item">
							<span class="legend-color" style="background-color: {categoryColors[category]};"></span>
							<span class="legend-label">{category}</span>
						</div>
					{/each}
				</div>

				<div class="graph-container">
					<svg
						bind:this={svgElement}
						viewBox="0 0 {width} {height}"
						class="s-curve-graph"
						class:draggable={zoomLevel > 1}
						onmousedown={handleMouseDown}
						onmousemove={handleMouseMove}
						onmouseup={handleMouseUp}
						onmouseleave={handleMouseLeave}
					>
						<g transform="translate({panX}, {panY}) scale({zoomLevel})" transform-origin="center">
						<!-- Zones de fond colorées -->
						{#each zones as zone}
							<rect
								x={xToScreen(zone.start)}
								y={padding}
								width={xToScreen(zone.end) - xToScreen(zone.start)}
								height={plotHeight}
								fill={zone.color}
								opacity="0.08"
							/>
						{/each}

						<!-- Grille -->
						{#each [0, 25, 50, 75, 100] as tick}
							<!-- Lignes horizontales -->
							<line
								x1={padding}
								y1={yToScreen(tick)}
								x2={width - padding}
								y2={yToScreen(tick)}
								stroke="rgb(var(--border-color))"
								stroke-width="1"
								stroke-dasharray="4,4"
							/>
							<!-- Lignes verticales -->
							<line
								x1={xToScreen(tick)}
								y1={padding}
								x2={xToScreen(tick)}
								y2={height - padding}
								stroke="rgb(var(--border-color))"
								stroke-width="1"
								stroke-dasharray="4,4"
							/>
						{/each}

						<!-- Courbe en S -->
						<path d={curvePath} fill="none" stroke="rgb(var(--color-primary))" stroke-width="3" />

						<!-- Points d'inflexion (masqués pour éviter confusion) -->
						<circle
							cx={xToScreen(30)}
							cy={yToScreen(calculateSCurveY(30))}
							r="4"
							fill="rgb(var(--color-primary))"
							opacity="0.3"
						/>
						<circle
							cx={xToScreen(70)}
							cy={yToScreen(calculateSCurveY(70))}
							r="4"
							fill="rgb(var(--color-primary))"
							opacity="0.3"
						/>

						<!-- Technologies -->
						{#each filteredTechnologies as tech}
							{@const x = tech.level}
							{@const y = calculateSCurveY(x)}
							{@const offset = getOffset(tech.name)}
							<g
								class="tech-point"
								onmouseenter={() => (hoveredTech = tech)}
								onmouseleave={() => (hoveredTech = null)}
							>
								<circle
									cx={xToScreen(x) + offset.x}
									cy={yToScreen(y) + offset.y}
									r="5"
									fill={hoveredTech === tech ? 'rgb(var(--color-accent))' : (categoryColors[tech.category] || 'rgb(var(--color-primary))')}
									stroke="white"
									stroke-width="2"
									style="cursor: pointer; transition: all 0.2s;"
								/>
							</g>
						{/each}

						<!-- Axes -->
						<line
							x1={padding}
							y1={height - padding}
							x2={width - padding}
							y2={height - padding}
							stroke="rgb(var(--text-primary))"
							stroke-width="2"
						/>
						<line
							x1={padding}
							y1={padding}
							x2={padding}
							y2={height - padding}
							stroke="rgb(var(--text-primary))"
							stroke-width="2"
						/>

						<!-- Labels des axes -->
						{#each [0, 25, 50, 75, 100] as tick}
							<text
								x={xToScreen(tick)}
								y={height - padding + 25}
								text-anchor="middle"
								fill="rgb(var(--text-secondary))"
								font-size="12"
							>
								{tick}%
							</text>
							<text
								x={padding - 15}
								y={yToScreen(tick)}
								text-anchor="end"
								dominant-baseline="middle"
								fill="rgb(var(--text-secondary))"
								font-size="12"
							>
								{tick}%
							</text>
						{/each}

						<!-- Titres des axes -->
						<text
							x={width / 2}
							y={height - 10}
							text-anchor="middle"
							fill="rgb(var(--text-primary))"
							font-size="14"
							font-weight="600"
						>
							Temps / Expérience (%)
						</text>
						<text
							x={20}
							y={height / 2}
							text-anchor="middle"
							fill="rgb(var(--text-primary))"
							font-size="14"
							font-weight="600"
							transform="rotate(-90, 20, {height / 2})"
						>
							Niveau de maîtrise (%)
						</text>
						</g>
					</svg>

					<!-- Info bulle -->
					{#if hoveredTech}
						<div class="tooltip">
							<strong>{hoveredTech.name}</strong>
							<p>Catégorie: {hoveredTech.category}</p>
							<p>Niveau: {hoveredTech.level}%</p>
							<p class="zone-info">
								Zone: {hoveredTech.level < 30 ? 'Néophyte' : hoveredTech.level < 70 ? 'Apprentissage' : 'Expert'}
							</p>
						</div>
					{/if}
				</div>
			</section>

			<!-- Liste des technologies -->
			<section class="tech-list-section">
				<h3>Liste des technologies ({filteredTechnologies.length})</h3>
				<div class="tech-grid">
					{#each filteredTechnologies.sort((a, b) => b.level - a.level) as tech}
						<div
							class="tech-item"
							onmouseenter={() => (hoveredTech = tech)}
							onmouseleave={() => (hoveredTech = null)}
						>
							<div class="tech-header">
								<span class="tech-name">{tech.name}</span>
								<span class="tech-level">{tech.level}%</span>
							</div>
							<div class="tech-bar">
								<div class="tech-progress" style="width: {tech.level}%"></div>
							</div>
							<div class="tech-meta">
								<span class="tech-category">{tech.category}</span>
								<span
									class="tech-zone"
									style="color: {tech.level < 30 ? 'rgb(239 68 68)' : tech.level < 70 ? 'rgb(var(--color-accent))' : 'rgb(34 197 94)'}"
								>
									{tech.level < 30 ? 'Néophyte' : tech.level < 70 ? 'Apprentissage' : 'Expert'}
								</span>
							</div>
						</div>
					{/each}
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
		max-width: 80rem;
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
		gap: 3rem;
	}

	/* Section intro */
	.intro-section h2 {
		margin: 0 0 1rem 0;
		font-size: 1.75rem;
		font-weight: 600;
		color: rgb(var(--color-primary));
	}

	.intro-section p {
		margin: 0 0 1.5rem 0;
		font-size: 1.0625rem;
		line-height: 1.7;
		color: rgb(var(--text-secondary));
	}

	.zones-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.zone-card {
		padding: 1.5rem;
		background-color: rgb(var(--bg-secondary));
		border: 1px solid rgb(var(--border-color));
		border-left: 4px solid;
		border-radius: 0.5rem;
	}

	.zone-card h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.zone-range {
		margin: 0 0 0.5rem 0;
		font-size: 0.875rem;
		font-weight: 600;
		color: rgb(var(--color-primary));
	}

	.zone-description {
		margin: 0;
		font-size: 0.9375rem;
		color: rgb(var(--text-secondary));
		line-height: 1.5;
	}

	/* Filtres */
	.filter-section h3 {
		margin: 0 0 1rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.filter-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.filter-btn {
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

	.filter-btn:hover {
		background-color: rgb(var(--bg-primary));
		border-color: rgb(var(--color-primary));
	}

	.filter-btn.active {
		background-color: rgb(var(--color-primary));
		color: white;
		border-color: rgb(var(--color-primary));
	}

	/* Graphique */
	.graph-section h3 {
		margin: 0 0 1.5rem 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.graph-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.zoom-controls {
		display: flex;
		gap: 0.5rem;
	}

	.zoom-btn {
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgb(var(--bg-tertiary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.375rem;
		color: rgb(var(--text-primary));
		font-size: 1.25rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.zoom-btn:hover {
		background-color: rgb(var(--color-primary));
		color: white;
		border-color: rgb(var(--color-primary));
		transform: scale(1.05);
	}

	.zoom-btn.reset {
		font-size: 1.5rem;
	}

	/* Légende */
	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding: 1rem;
		background-color: rgb(var(--bg-secondary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.legend-color {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		border: 2px solid white;
		box-shadow: 0 0 0 1px rgb(var(--border-color));
	}

	.legend-label {
		font-size: 0.875rem;
		color: rgb(var(--text-secondary));
		font-weight: 500;
	}

	.graph-container {
		position: relative;
		background-color: rgb(var(--bg-secondary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.75rem;
		padding: 2rem;
	}

	.s-curve-graph {
		width: 100%;
		height: auto;
		transition: cursor 0.2s ease;
	}

	.s-curve-graph.draggable {
		cursor: grab;
	}

	.s-curve-graph.draggable:active {
		cursor: grabbing;
	}

	.tech-point {
		transition: all 0.2s ease;
	}

	.tech-point:hover circle {
		r: 7;
	}

	.tooltip {
		position: absolute;
		top: 2rem;
		right: 2rem;
		padding: 1rem;
		background-color: rgb(var(--bg-tertiary));
		border: 2px solid rgb(var(--color-primary));
		border-radius: 0.5rem;
		box-shadow: var(--shadow-lg);
		min-width: 200px;
		z-index: 10;
	}

	.tooltip strong {
		display: block;
		margin-bottom: 0.5rem;
		font-size: 1.125rem;
		color: rgb(var(--text-primary));
	}

	.tooltip p {
		margin: 0.25rem 0;
		font-size: 0.875rem;
		color: rgb(var(--text-secondary));
	}

	.zone-info {
		margin-top: 0.5rem;
		padding-top: 0.5rem;
		border-top: 1px solid rgb(var(--border-color));
		font-weight: 600;
	}

	/* Liste des technologies */
	.tech-list-section h3 {
		margin: 0 0 1.5rem 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.tech-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
	}

	.tech-item {
		padding: 1rem;
		background-color: rgb(var(--bg-secondary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
		transition: all 0.2s ease;
		cursor: pointer;
	}

	.tech-item:hover {
		border-color: rgb(var(--color-primary));
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.tech-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.tech-name {
		font-weight: 600;
		color: rgb(var(--text-primary));
	}

	.tech-level {
		font-weight: 700;
		color: rgb(var(--color-primary));
	}

	.tech-bar {
		height: 8px;
		background-color: rgb(var(--bg-tertiary));
		border-radius: 4px;
		overflow: hidden;
		margin-bottom: 0.5rem;
	}

	.tech-progress {
		height: 100%;
		background: linear-gradient(
			90deg,
			rgb(239 68 68) 0%,
			rgb(var(--color-accent)) 50%,
			rgb(34 197 94) 100%
		);
		transition: width 0.3s ease;
	}

	.tech-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.75rem;
	}

	.tech-category {
		color: rgb(var(--text-muted));
	}

	.tech-zone {
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.zones-grid {
			grid-template-columns: 1fr;
		}

		.tech-grid {
			grid-template-columns: 1fr;
		}

		.graph-container {
			padding: 1rem;
		}

		.tooltip {
			position: static;
			margin-top: 1rem;
		}
	}
</style>
