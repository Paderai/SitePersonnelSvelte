import { describe, it, expect } from 'vitest';
import {
	technologies,
	zones,
	getCategories,
	getTechnologiesByCategory,
	getTechStats,
	type Technology
} from './technical-depth-data';

describe('technical-depth-data', () => {
	describe('technologies array', () => {
		it('should not be empty', () => {
			expect(technologies.length).toBeGreaterThan(0);
		});

		it('should have valid technology objects', () => {
			technologies.forEach((tech) => {
				expect(tech).toHaveProperty('name');
				expect(tech).toHaveProperty('category');
				expect(tech).toHaveProperty('level');
				expect(typeof tech.name).toBe('string');
				expect(typeof tech.category).toBe('string');
				expect(typeof tech.level).toBe('number');
			});
		});

		it('should have levels between 0 and 100', () => {
			technologies.forEach((tech) => {
				expect(tech.level).toBeGreaterThanOrEqual(0);
				expect(tech.level).toBeLessThanOrEqual(100);
			});
		});

		it('should not have duplicate names', () => {
			const names = technologies.map((t) => t.name);
			const uniqueNames = new Set(names);
			expect(names.length).toBe(uniqueNames.size);
		});
	});

	describe('zones array', () => {
		it('should have exactly 3 zones', () => {
			expect(zones.length).toBe(3);
		});

		it('should have valid zone objects', () => {
			zones.forEach((zone) => {
				expect(zone).toHaveProperty('name');
				expect(zone).toHaveProperty('description');
				expect(zone).toHaveProperty('range');
				expect(zone).toHaveProperty('color');
				expect(zone).toHaveProperty('start');
				expect(zone).toHaveProperty('end');
			});
		});

		it('should have zones covering 0-100 range', () => {
			expect(zones[0].start).toBe(0);
			expect(zones[0].end).toBe(30);
			expect(zones[1].start).toBe(30);
			expect(zones[1].end).toBe(70);
			expect(zones[2].start).toBe(70);
			expect(zones[2].end).toBe(100);
		});

		it('should have continuous zones without gaps', () => {
			for (let i = 0; i < zones.length - 1; i++) {
				expect(zones[i].end).toBe(zones[i + 1].start);
			}
		});
	});

	describe('getCategories()', () => {
		it('should return an array of unique categories', () => {
			const categories = getCategories();
			expect(Array.isArray(categories)).toBe(true);
			expect(categories.length).toBeGreaterThan(0);

			const uniqueCategories = new Set(categories);
			expect(categories.length).toBe(uniqueCategories.size);
		});

		it('should include expected categories', () => {
			const categories = getCategories();
			expect(categories).toContain('Gestion');
			expect(categories).toContain('Programmation');
			expect(categories).toContain('IA');
		});
	});

	describe('getTechnologiesByCategory()', () => {
		it('should return technologies for a valid category', () => {
			const programmingTechs = getTechnologiesByCategory('Programmation');
			expect(Array.isArray(programmingTechs)).toBe(true);
			expect(programmingTechs.length).toBeGreaterThan(0);

			programmingTechs.forEach((tech) => {
				expect(tech.category).toBe('Programmation');
			});
		});

		it('should return empty array for invalid category', () => {
			const result = getTechnologiesByCategory('NonExistentCategory');
			expect(result).toEqual([]);
		});

		it('should return all technologies when combined', () => {
			const categories = getCategories();
			let totalCount = 0;

			categories.forEach((category) => {
				const techs = getTechnologiesByCategory(category);
				totalCount += techs.length;
			});

			expect(totalCount).toBe(technologies.length);
		});
	});

	describe('getTechStats()', () => {
		it('should return stats object with correct properties', () => {
			const stats = getTechStats();
			expect(stats).toHaveProperty('total');
			expect(stats).toHaveProperty('neophyte');
			expect(stats).toHaveProperty('learning');
			expect(stats).toHaveProperty('expert');
			expect(stats).toHaveProperty('averageLevel');
		});

		it('should have correct total count', () => {
			const stats = getTechStats();
			expect(stats.total).toBe(technologies.length);
		});

		it('should have sum of zones equal to total', () => {
			const stats = getTechStats();
			expect(stats.neophyte + stats.learning + stats.expert).toBe(stats.total);
		});

		it('should correctly categorize technologies by zones', () => {
			const stats = getTechStats();

			const manualNeophyte = technologies.filter((t) => t.level < 30).length;
			const manualLearning = technologies.filter((t) => t.level >= 30 && t.level < 70).length;
			const manualExpert = technologies.filter((t) => t.level >= 70).length;

			expect(stats.neophyte).toBe(manualNeophyte);
			expect(stats.learning).toBe(manualLearning);
			expect(stats.expert).toBe(manualExpert);
		});

		it('should have valid average level', () => {
			const stats = getTechStats();
			expect(stats.averageLevel).toBeGreaterThanOrEqual(0);
			expect(stats.averageLevel).toBeLessThanOrEqual(100);
			expect(Number.isInteger(stats.averageLevel)).toBe(true);
		});

		it('should calculate correct average', () => {
			const stats = getTechStats();
			const manualAverage = Math.round(
				technologies.reduce((sum, t) => sum + t.level, 0) / technologies.length
			);
			expect(stats.averageLevel).toBe(manualAverage);
		});
	});

	describe('data integrity', () => {
		it('should have technologies with valid category references', () => {
			const categories = getCategories();
			technologies.forEach((tech) => {
				expect(categories).toContain(tech.category);
			});
		});

		it('should have reasonable distribution across zones', () => {
			const stats = getTechStats();
			// Au moins une technologie dans chaque zone (sauf si le dataset est très petit)
			if (technologies.length >= 10) {
				expect(stats.neophyte).toBeGreaterThan(0);
				expect(stats.learning).toBeGreaterThan(0);
				expect(stats.expert).toBeGreaterThan(0);
			}
		});
	});
});
