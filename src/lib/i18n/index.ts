import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

// Enregistrer les langues disponibles
register('fr', () => import('./locales/fr.json'));
register('en', () => import('./locales/en.json'));
register('es', () => import('./locales/es.json'));

// Initialiser avec le français comme langue par défaut
export function initI18n() {
	init({
		fallbackLocale: 'fr',
		initialLocale: getLocaleFromNavigator()
	});
}

// Export des constantes utiles
export const availableLocales = [
	{ code: 'fr', name: 'Français', flag: '🇫🇷' },
	{ code: 'en', name: 'English', flag: '🇬🇧' },
	{ code: 'es', name: 'Español', flag: '🇪🇸' }
];
