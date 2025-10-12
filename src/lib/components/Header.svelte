<script lang="ts">
	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import ThemeToggle from './ThemeToggle.svelte';
	import LanguageSelector from './LanguageSelector.svelte';

	let isMobileMenuOpen = $state(false);

	// Navigation items
	const navItems = [
		{ href: '/', label: 'nav.home' },
		{ href: '/bio', label: 'nav.bio' },
		{ href: '/francois_provencher', label: 'nav.cv' },
		{ href: '/realisations', label: 'nav.achievements' },
		{ href: '/innovation', label: 'nav.innovation' },
		{ href: '/profondeur', label: 'nav.depth' },
		{ href: '/incubateur', label: 'nav.incubator' },
		{ href: '/blog', label: 'nav.blog' },
		{ href: '/settings', label: 'nav.settings' }
	];

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}

	// Fermer le menu mobile si on change de page
	$effect(() => {
		const unsubscribe = page.subscribe(() => {
			isMobileMenuOpen = false;
		});
		return unsubscribe;
	});
</script>

<header class="header">
	<div class="container">
		<div class="header-content">
			<!-- Logo / Nom -->
			<a href="/" class="logo">
				<span class="logo-text">{$t('home.title')}</span>
			</a>

			<!-- Navigation Desktop -->
			<nav class="nav-desktop">
				{#each navItems as item}
					<a href={item.href} class="nav-link" class:active={$page.url.pathname === item.href}>
						{$t(item.label)}
					</a>
				{/each}
			</nav>

			<!-- Actions (Theme + Language) -->
			<div class="header-actions">
				<ThemeToggle />
				<LanguageSelector />

				<!-- Burger menu button (mobile only) -->
				<button
					onclick={toggleMobileMenu}
					class="mobile-menu-button"
					aria-label={$t('common.menu')}
					aria-expanded={isMobileMenuOpen}
				>
					{#if !isMobileMenuOpen}
						<!-- Icône menu burger -->
						<svg
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
							<line x1="3" y1="12" x2="21" y2="12"></line>
							<line x1="3" y1="6" x2="21" y2="6"></line>
							<line x1="3" y1="18" x2="21" y2="18"></line>
						</svg>
					{:else}
						<!-- Icône fermer (X) -->
						<svg
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
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					{/if}
				</button>
			</div>
		</div>

		<!-- Navigation Mobile -->
		{#if isMobileMenuOpen}
			<nav class="nav-mobile">
				{#each navItems as item}
					<a
						href={item.href}
						class="nav-link-mobile"
						class:active={$page.url.pathname === item.href}
						onclick={closeMobileMenu}
					>
						{$t(item.label)}
					</a>
				{/each}
			</nav>
		{/if}
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 40;
		background-color: rgb(var(--bg-primary) / 0.95);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid rgb(var(--border-color));
		box-shadow: var(--shadow-sm);
	}

	.container {
		max-width: 80rem;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 4rem;
		gap: 2rem;
	}

	.logo {
		text-decoration: none;
		color: rgb(var(--text-primary));
		font-weight: 600;
		font-size: 1.25rem;
		transition: color 0.2s ease;
		white-space: nowrap;
	}

	.logo:hover {
		color: rgb(var(--color-primary));
	}

	.logo-text {
		display: inline-block;
	}

	/* Navigation Desktop */
	.nav-desktop {
		display: none;
		gap: 0.5rem;
		flex: 1;
	}

	@media (min-width: 1024px) {
		.nav-desktop {
			display: flex;
		}
	}

	.nav-link {
		padding: 0.5rem 0.75rem;
		border-radius: 0.375rem;
		text-decoration: none;
		color: rgb(var(--text-secondary));
		font-size: 0.875rem;
		font-weight: 500;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.nav-link:hover {
		color: rgb(var(--color-primary));
		background-color: rgb(var(--bg-secondary));
	}

	.nav-link.active {
		color: rgb(var(--color-primary));
		background-color: rgb(var(--color-primary) / 0.1);
	}

	/* Header actions */
	.header-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	/* Mobile menu button */
	.mobile-menu-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.5rem;
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
		background-color: rgb(var(--bg-secondary));
		color: rgb(var(--text-primary));
		cursor: pointer;
		transition: all 0.2s ease;
	}

	@media (min-width: 1024px) {
		.mobile-menu-button {
			display: none;
		}
	}

	.mobile-menu-button:hover {
		background-color: rgb(var(--bg-tertiary));
		border-color: rgb(var(--color-primary));
	}

	/* Navigation Mobile */
	.nav-mobile {
		display: flex;
		flex-direction: column;
		padding: 1rem 0;
		border-top: 1px solid rgb(var(--border-color));
		animation: slideDown 0.2s ease;
	}

	@media (min-width: 1024px) {
		.nav-mobile {
			display: none;
		}
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

	.nav-link-mobile {
		padding: 0.75rem 1rem;
		text-decoration: none;
		color: rgb(var(--text-secondary));
		font-size: 1rem;
		font-weight: 500;
		transition: all 0.2s ease;
		border-radius: 0.375rem;
	}

	.nav-link-mobile:hover {
		color: rgb(var(--color-primary));
		background-color: rgb(var(--bg-secondary));
	}

	.nav-link-mobile.active {
		color: rgb(var(--color-primary));
		background-color: rgb(var(--color-primary) / 0.1);
	}
</style>
