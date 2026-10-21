<script lang="ts">
	import { locale, t } from 'svelte-i18n';
	import { availableLocales, setLocale } from '$lib/i18n';

	let isOpen = $state(false);
	let currentLocale = $state('fr');

	// Souscrire aux changements de locale
	$effect(() => {
		const unsubscribe = locale.subscribe((value) => {
			if (value) currentLocale = value;
		});
		return unsubscribe;
	});

	function changeLocale(newLocale: string) {
		setLocale(newLocale);
		isOpen = false;
	}

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	// Fermer le dropdown si on clique ailleurs
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.language-selector')) {
			isOpen = false;
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	});

	// Trouver la langue actuelle (dérivée pour réactivité)
	const currentLang = $derived(availableLocales.find((l) => l.code === currentLocale));
</script>

<div class="language-selector">
	<button
		onclick={toggleDropdown}
		class="language-button"
		aria-label={$t('language.select')}
		aria-expanded={isOpen}
	>
		<span class="flag">
			{availableLocales.find((l) => l.code === currentLocale)?.flag || '🌐'}
		</span>
		<span class="code">{currentLocale.toUpperCase()}</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="chevron"
			class:open={isOpen}
		>
			<polyline points="6 9 12 15 18 9"></polyline>
		</svg>
	</button>

	{#if isOpen}
		<div class="dropdown">
			{#each availableLocales as lang}
				<button
					onclick={() => changeLocale(lang.code)}
					class="dropdown-item"
					class:active={currentLocale === lang.code}
				>
					<span class="flag">{lang.flag}</span>
					<span class="name">{lang.name}</span>
					{#if currentLocale === lang.code}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="check"
						>
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.language-selector {
		position: relative;
	}

	.language-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
		background-color: rgb(var(--bg-secondary));
		color: rgb(var(--text-primary));
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.language-button:hover {
		background-color: rgb(var(--bg-tertiary));
		border-color: rgb(var(--color-primary));
	}

	.language-button:focus {
		outline: 2px solid rgb(var(--color-primary));
		outline-offset: 2px;
	}

	.flag {
		font-size: 1.25rem;
		line-height: 1;
	}

	.code {
		font-family: monospace;
	}

	.chevron {
		transition: transform 0.2s ease;
	}

	.chevron.open {
		transform: rotate(180deg);
	}

	.dropdown {
		position: absolute;
		top: calc(100% + 0.5rem);
		right: 0;
		min-width: 12rem;
		background-color: rgb(var(--bg-tertiary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
		box-shadow: var(--shadow-lg);
		overflow: hidden;
		z-index: 50;
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

	.dropdown-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		padding: 0.75rem 1rem;
		border: none;
		background: none;
		color: rgb(var(--text-primary));
		cursor: pointer;
		transition: background-color 0.15s ease;
		font-size: 0.875rem;
		text-align: left;
	}

	.dropdown-item:hover {
		background-color: rgb(var(--bg-secondary));
	}

	.dropdown-item.active {
		background-color: rgb(var(--color-primary) / 0.1);
		color: rgb(var(--color-primary));
	}

	.dropdown-item .name {
		flex: 1;
	}

	.check {
		color: rgb(var(--color-primary));
	}
</style>
