import { describe, it, expect } from 'vitest';
import { cvData } from './cv-data';
import { projectsData, projectCategories } from './projects-data';
import fr from '$lib/i18n/locales/fr.json';
import en from '$lib/i18n/locales/en.json';
import es from '$lib/i18n/locales/es.json';

const LANGS = ['fr', 'en', 'es'] as const;

// Parcourt une structure et retourne le chemin de chaque objet { fr, ... } incomplet
function findIncomplete(node: unknown, path = ''): string[] {
	if (Array.isArray(node)) return node.flatMap((item, i) => findIncomplete(item, `${path}[${i}]`));
	if (node && typeof node === 'object') {
		const obj = node as Record<string, unknown>;
		if (typeof obj.fr === 'string') {
			return LANGS.filter((l) => typeof obj[l] !== 'string' || !(obj[l] as string).trim()).map(
				(l) => `${path} (${l})`
			);
		}
		return Object.entries(obj).flatMap(([k, v]) => findIncomplete(v, path ? `${path}.${k}` : k));
	}
	return [];
}

function flattenKeys(obj: Record<string, unknown>, prefix = ''): string[] {
	return Object.entries(obj).flatMap(([k, v]) =>
		v && typeof v === 'object' ? flattenKeys(v as Record<string, unknown>, `${prefix}${k}.`) : [`${prefix}${k}`]
	);
}

describe('translations', () => {
	it('cv-data: every translatable field has fr, en and es', () => {
		expect(findIncomplete(cvData)).toEqual([]);
	});

	it('projects-data: every translatable field has fr, en and es', () => {
		expect(findIncomplete({ projectCategories, projectsData })).toEqual([]);
	});

	it('locale files: en and es have the same keys as fr', () => {
		const frKeys = flattenKeys(fr).sort();
		expect(flattenKeys(en).sort()).toEqual(frKeys);
		expect(flattenKeys(es).sort()).toEqual(frKeys);
	});
});
