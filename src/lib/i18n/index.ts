import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';
import { derived } from 'svelte/store';

// Enregistrer les langues disponibles
register('fr', () => import('./locales/fr.json'));
register('en', () => import('./locales/en.json'));
register('es', () => import('./locales/es.json'));

export const defaultLocale = 'fr';

// Export des constantes utiles
export const availableLocales = [
	{ code: 'fr', name: 'Français (Québec)', flag: '🇨🇦' },
	{ code: 'en', name: 'English (Canada)', flag: '🇨🇦' },
	{ code: 'es', name: 'Español', flag: '🇪🇸' }
];

const supportedCodes = availableLocales.map((l) => l.code);

// Ramène une locale comme « en-US » à une langue supportée (« en »), sinon null
function normalizeLocale(value: string | null | undefined): string | null {
	if (!value) return null;
	const base = value.toLowerCase().split('-')[0];
	return supportedCodes.includes(base) ? base : null;
}

// Langue initiale : choix sauvegardé > langue du navigateur > français
function detectInitialLocale(): string {
	if (typeof window === 'undefined') return defaultLocale;
	let saved: string | null = null;
	try {
		saved = localStorage.getItem('locale');
	} catch {
		// localStorage indisponible (navigation privée, etc.)
	}
	return normalizeLocale(saved) ?? normalizeLocale(getLocaleFromNavigator()) ?? defaultLocale;
}

// Initialiser avec le français comme langue de repli
export function initI18n() {
	init({
		fallbackLocale: defaultLocale,
		initialLocale: detectInitialLocale()
	});
}

// Changer de langue et mémoriser le choix
export function setLocale(code: string) {
	const normalized = normalizeLocale(code) ?? defaultLocale;
	locale.set(normalized);
	try {
		localStorage.setItem('locale', normalized);
	} catch {
		// ignorer
	}
}

// Garder l'attribut <html lang> synchronisé (accessibilité et SEO)
if (typeof document !== 'undefined') {
	locale.subscribe((value) => {
		const normalized = normalizeLocale(value);
		if (normalized) document.documentElement.lang = normalized;
	});
}

/**
 * Contenu traduisible dans les fichiers de données ($lib/data).
 * Le français est obligatoire; l'anglais et l'espagnol retombent sur le français s'ils manquent.
 */
export type Localized = { fr: string; en?: string; es?: string };
export type Translatable = string | Localized;

export function localize(value: Translatable, lang?: string | null): string {
	if (typeof value === 'string') return value;
	const code = normalizeLocale(lang) as keyof Localized | null;
	return (code && value[code]) || value.fr;
}

/** Store à utiliser comme $t : {$tl(project.title)} */
export const tl = derived(locale, ($locale) => (value: Translatable) => localize(value, $locale));

/** Locale BCP 47 pour le formatage des nombres et dates */
export const intlLocale = derived(locale, ($locale) => {
	const code = normalizeLocale($locale) ?? defaultLocale;
	return { fr: 'fr-CA', en: 'en-CA', es: 'es' }[code] as string;
});
