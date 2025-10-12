import { initI18n } from '$lib/i18n';
import { waitLocale } from 'svelte-i18n';

// Initialiser i18n
initI18n();

export const prerender = true;
export const ssr = false;

export async function load() {
	// Attendre que les traductions soient chargées
	await waitLocale();
}
