<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from 'svelte-i18n';

	// Types pour les paramètres
	interface Settings {
		primaryColor: string;
		accentColor: string;
		fontFamily: string;
		fontSize: string;
		spacing: string;
	}

	// Paramètres par défaut
	const defaultSettings: Settings = {
		primaryColor: '50 125 200', // #327DC8
		accentColor: '255 200 87', // #FFC857
		fontFamily: 'system-ui',
		fontSize: '16',
		spacing: '1'
	};

	// État des paramètres
	let settings = $state<Settings>({ ...defaultSettings });
	let hasChanges = $state(false);

	// Options disponibles
	const fontFamilies = [
		{ value: 'system-ui', label: 'System UI (Défaut)' },
		{ value: 'Inter', label: 'Inter' },
		{ value: 'Roboto', label: 'Roboto' },
		{ value: 'Open Sans', label: 'Open Sans' },
		{ value: 'Lato', label: 'Lato' },
		{ value: 'Montserrat', label: 'Montserrat' },
		{ value: 'Georgia', label: 'Georgia (Serif)' },
		{ value: 'Times New Roman', label: 'Times New Roman (Serif)' },
		{ value: 'Courier New', label: 'Courier New (Monospace)' }
	];

	const fontSizes = [
		{ value: '14', label: 'Petit (14px)' },
		{ value: '16', label: 'Normal (16px)' },
		{ value: '18', label: 'Grand (18px)' },
		{ value: '20', label: 'Très grand (20px)' }
	];

	const spacingOptions = [
		{ value: '0.75', label: 'Compact' },
		{ value: '1', label: 'Normal' },
		{ value: '1.25', label: 'Confortable' },
		{ value: '1.5', label: 'Spacieux' }
	];

	// Couleurs prédéfinies
	const presetColors = {
		primary: [
			{ value: '50 125 200', label: 'Bleu (défaut)', hex: '#327DC8' },
			{ value: '34 197 94', label: 'Vert', hex: '#22C55E' },
			{ value: '239 68 68', label: 'Rouge', hex: '#EF4444' },
			{ value: '168 85 247', label: 'Violet', hex: '#A855F7' },
			{ value: '236 72 153', label: 'Rose', hex: '#EC4899' },
			{ value: '249 115 22', label: 'Orange', hex: '#F97316' }
		],
		accent: [
			{ value: '255 200 87', label: 'Jaune doré (défaut)', hex: '#FFC857' },
			{ value: '234 179 8', label: 'Jaune', hex: '#EAB308' },
			{ value: '14 165 233', label: 'Bleu ciel', hex: '#0EA5E9' },
			{ value: '20 184 166', label: 'Turquoise', hex: '#14B8A6' },
			{ value: '251 146 60', label: 'Orange', hex: '#FB923C' },
			{ value: '251 113 133', label: 'Rose', hex: '#FB7185' }
		]
	};

	// Charger les paramètres depuis localStorage
	onMount(() => {
		const savedSettings = localStorage.getItem('customSettings');
		if (savedSettings) {
			settings = { ...defaultSettings, ...JSON.parse(savedSettings) };
			applySettings(settings);
		}
	});

	// Appliquer les paramètres au DOM
	function applySettings(newSettings: Settings) {
		const root = document.documentElement;

		// Couleurs
		root.style.setProperty('--color-primary', newSettings.primaryColor);
		root.style.setProperty('--color-accent', newSettings.accentColor);

		// Police
		root.style.setProperty('--font-family', newSettings.fontFamily);
		document.body.style.fontFamily = newSettings.fontFamily;

		// Taille de police
		root.style.setProperty('--font-size-base', `${newSettings.fontSize}px`);
		document.documentElement.style.fontSize = `${newSettings.fontSize}px`;

		// Espacement
		root.style.setProperty('--spacing-scale', newSettings.spacing);
	}

	// Sauvegarder les paramètres
	function saveSettings() {
		localStorage.setItem('customSettings', JSON.stringify(settings));
		applySettings(settings);
		hasChanges = false;
	}

	// Réinitialiser aux valeurs par défaut
	function resetSettings() {
		settings = { ...defaultSettings };
		localStorage.removeItem('customSettings');
		applySettings(settings);
		hasChanges = false;
	}

	// Détecter les changements
	function handleChange() {
		hasChanges = true;
	}

	// Convertir RGB en hex pour l'input color
	function rgbToHex(rgb: string): string {
		const [r, g, b] = rgb.split(' ').map(Number);
		return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
	}

	// Convertir hex en RGB
	function hexToRgb(hex: string): string {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (result) {
			return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
		}
		return settings.primaryColor;
	}
</script>

<div class="settings-page">
	<div class="container">
		<header class="page-header">
			<h1 class="page-title">{$t('settings.title')}</h1>
			<p class="page-subtitle">{$t('settings.subtitle')}</p>
		</header>

		<div class="settings-grid">
			<!-- Section Couleurs -->
			<section class="settings-section">
				<h2 class="section-title">{$t('settings.colors.title')}</h2>

				<!-- Couleur primaire -->
				<div class="setting-group">
					<label class="setting-label">{$t('settings.colors.primary')}</label>
					<div class="color-options">
						{#each presetColors.primary as color}
							<button
								class="color-preset"
								class:active={settings.primaryColor === color.value}
								style="background-color: {color.hex}"
								title={color.label}
								onclick={() => {
									settings.primaryColor = color.value;
									handleChange();
								}}
							>
								{#if settings.primaryColor === color.value}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="white"
										stroke-width="3"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								{/if}
							</button>
						{/each}
					</div>
					<div class="custom-color">
						<label for="primary-custom">{$t('settings.colors.custom')}</label>
						<input
							type="color"
							id="primary-custom"
							value={rgbToHex(settings.primaryColor)}
							oninput={(e) => {
								settings.primaryColor = hexToRgb(e.currentTarget.value);
								handleChange();
							}}
						/>
					</div>
				</div>

				<!-- Couleur d'accent -->
				<div class="setting-group">
					<label class="setting-label">{$t('settings.colors.accent')}</label>
					<div class="color-options">
						{#each presetColors.accent as color}
							<button
								class="color-preset"
								class:active={settings.accentColor === color.value}
								style="background-color: {color.hex}"
								title={color.label}
								onclick={() => {
									settings.accentColor = color.value;
									handleChange();
								}}
							>
								{#if settings.accentColor === color.value}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="white"
										stroke-width="3"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								{/if}
							</button>
						{/each}
					</div>
					<div class="custom-color">
						<label for="accent-custom">{$t('settings.colors.custom')}</label>
						<input
							type="color"
							id="accent-custom"
							value={rgbToHex(settings.accentColor)}
							oninput={(e) => {
								settings.accentColor = hexToRgb(e.currentTarget.value);
								handleChange();
							}}
						/>
					</div>
				</div>
			</section>

			<!-- Section Typographie -->
			<section class="settings-section">
				<h2 class="section-title">{$t('settings.typography.title')}</h2>

				<!-- Police -->
				<div class="setting-group">
					<label class="setting-label" for="font-family">
						{$t('settings.typography.fontFamily')}
					</label>
					<select
						id="font-family"
						class="setting-select"
						bind:value={settings.fontFamily}
						onchange={handleChange}
					>
						{#each fontFamilies as font}
							<option value={font.value}>{font.label}</option>
						{/each}
					</select>
				</div>

				<!-- Taille de police -->
				<div class="setting-group">
					<label class="setting-label" for="font-size">
						{$t('settings.typography.fontSize')}
					</label>
					<select
						id="font-size"
						class="setting-select"
						bind:value={settings.fontSize}
						onchange={handleChange}
					>
						{#each fontSizes as size}
							<option value={size.value}>{size.label}</option>
						{/each}
					</select>
					<div class="preview-text" style="font-size: {settings.fontSize}px;">
						{$t('settings.typography.preview')}
					</div>
				</div>
			</section>

			<!-- Section Layout -->
			<section class="settings-section">
				<h2 class="section-title">{$t('settings.layout.title')}</h2>

				<!-- Espacement -->
				<div class="setting-group">
					<label class="setting-label" for="spacing">
						{$t('settings.layout.spacing')}
					</label>
					<select
						id="spacing"
						class="setting-select"
						bind:value={settings.spacing}
						onchange={handleChange}
					>
						{#each spacingOptions as spacing}
							<option value={spacing.value}>{spacing.label}</option>
						{/each}
					</select>
				</div>
			</section>
		</div>

		<!-- Actions -->
		<div class="actions">
			<button class="btn btn-secondary" onclick={resetSettings}>
				{$t('settings.actions.reset')}
			</button>
			<button class="btn btn-primary" onclick={saveSettings} disabled={!hasChanges}>
				{$t('settings.actions.save')}
			</button>
		</div>
	</div>
</div>

<style>
	.settings-page {
		min-height: calc(100vh - 8rem);
		padding: 2rem 0;
	}

	.container {
		max-width: 80rem;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.page-header {
		margin-bottom: 3rem;
	}

	.page-title {
		margin: 0 0 0.5rem 0;
		font-size: 2rem;
		font-weight: 700;
		color: rgb(var(--text-primary));
	}

	.page-subtitle {
		margin: 0;
		font-size: 1rem;
		color: rgb(var(--text-secondary));
	}

	.settings-grid {
		display: grid;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	@media (min-width: 1024px) {
		.settings-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.settings-section {
		padding: 1.5rem;
		background-color: rgb(var(--bg-secondary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.75rem;
	}

	.section-title {
		margin: 0 0 1.5rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
		border-bottom: 2px solid rgb(var(--color-primary));
		padding-bottom: 0.5rem;
	}

	.setting-group {
		margin-bottom: 1.5rem;
	}

	.setting-group:last-child {
		margin-bottom: 0;
	}

	.setting-label {
		display: block;
		margin-bottom: 0.75rem;
		font-weight: 500;
		color: rgb(var(--text-primary));
	}

	.setting-select {
		width: 100%;
		padding: 0.625rem 0.875rem;
		background-color: rgb(var(--bg-primary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
		color: rgb(var(--text-primary));
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.setting-select:hover {
		border-color: rgb(var(--color-primary));
	}

	.setting-select:focus {
		outline: none;
		border-color: rgb(var(--color-primary));
		box-shadow: 0 0 0 3px rgb(var(--color-primary) / 0.1);
	}

	.color-options {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.color-preset {
		width: 3rem;
		height: 3rem;
		border: 3px solid transparent;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 4px rgb(0 0 0 / 0.1);
	}

	.color-preset:hover {
		transform: scale(1.1);
		box-shadow: 0 4px 8px rgb(0 0 0 / 0.15);
	}

	.color-preset.active {
		border-color: rgb(var(--text-primary));
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.2);
	}

	.custom-color {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem;
		background-color: rgb(var(--bg-primary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
	}

	.custom-color label {
		font-size: 0.875rem;
		color: rgb(var(--text-secondary));
	}

	.custom-color input[type='color'] {
		width: 3rem;
		height: 2.5rem;
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.375rem;
		cursor: pointer;
	}

	.preview-text {
		margin-top: 1rem;
		padding: 1rem;
		background-color: rgb(var(--bg-primary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
		color: rgb(var(--text-primary));
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		padding-top: 2rem;
		border-top: 1px solid rgb(var(--border-color));
	}

	.btn {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 0.5rem;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn-primary {
		background-color: rgb(var(--color-primary));
		color: white;
	}

	.btn-primary:hover:not(:disabled) {
		background-color: rgb(var(--color-primary-dark));
		transform: translateY(-1px);
		box-shadow: 0 4px 8px rgb(var(--color-primary) / 0.3);
	}

	.btn-secondary {
		background-color: rgb(var(--bg-tertiary));
		color: rgb(var(--text-primary));
		border: 1px solid rgb(var(--border-color));
	}

	.btn-secondary:hover {
		background-color: rgb(var(--bg-secondary));
		border-color: rgb(var(--color-primary));
	}
</style>
