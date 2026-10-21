import { describe, it, expect } from 'vitest';
import { projectsData, projectCategories, getAvailableYears } from './projects-data';
import { localize, type Translatable } from '$lib/i18n';

// Toutes les variantes linguistiques d'un champ traduisible
const variants = (v: Translatable) => (typeof v === 'string' ? [v] : Object.values(v));

describe('projects-data', () => {
	describe('projectsData array', () => {
		it('should not be empty', () => {
			expect(projectsData.length).toBeGreaterThan(0);
		});

		it('should have valid project objects', () => {
			projectsData.forEach((project) => {
				expect(project).toHaveProperty('id');
				expect(project).toHaveProperty('title');
				expect(project).toHaveProperty('category');
				expect(project).toHaveProperty('year');
				expect(project).toHaveProperty('description');
				expect(project).toHaveProperty('status');

				expect(typeof project.id).toBe('string');
				expect(typeof localize(project.title, 'fr')).toBe('string');
				expect(typeof project.category).toBe('string');
				expect(typeof project.year).toBe('string');
				expect(typeof localize(project.description, 'fr')).toBe('string');
				expect(['completed', 'in-progress', 'planned']).toContain(project.status);
			});
		});

		it('should have unique project IDs', () => {
			const ids = projectsData.map((p) => p.id);
			const uniqueIds = new Set(ids);
			expect(ids.length).toBe(uniqueIds.size);
		});

		it('should have non-empty titles and descriptions', () => {
			projectsData.forEach((project) => {
				expect(localize(project.title, 'fr').length).toBeGreaterThan(0);
				expect(localize(project.description, 'fr').length).toBeGreaterThan(0);
			});
		});

		it('should have valid year format', () => {
			const yearRegex = /^\d{4}$/;
			projectsData.forEach((project) => {
				expect(yearRegex.test(project.year)).toBe(true);
				const year = parseInt(project.year);
				expect(year).toBeGreaterThanOrEqual(2000);
				expect(year).toBeLessThanOrEqual(new Date().getFullYear() + 5); // Max 5 ans dans le futur
			});
		});
	});

	describe('projectCategories array', () => {
		it('should not be empty', () => {
			expect(projectCategories.length).toBeGreaterThan(0);
		});

		it('should have valid category objects', () => {
			projectCategories.forEach((category) => {
				expect(category).toHaveProperty('id');
				expect(category).toHaveProperty('name');
				expect(typeof category.id).toBe('string');
				expect(localize(category.name, 'fr').length).toBeGreaterThan(0);
			});
		});

		it('should have unique category IDs', () => {
			const ids = projectCategories.map((c) => c.id);
			const uniqueIds = new Set(ids);
			expect(ids.length).toBe(uniqueIds.size);
		});

		it('should have unique category names', () => {
			const names = projectCategories.map((c) => localize(c.name, 'fr'));
			const uniqueNames = new Set(names);
			expect(names.length).toBe(uniqueNames.size);
		});
	});

	describe('getAvailableYears()', () => {
		it('should return an array of years', () => {
			const years = getAvailableYears();
			expect(Array.isArray(years)).toBe(true);
			expect(years.length).toBeGreaterThan(0);
		});

		it('should return unique years', () => {
			const years = getAvailableYears();
			const uniqueYears = new Set(years);
			expect(years.length).toBe(uniqueYears.size);
		});

		it('should return years sorted in descending order', () => {
			const years = getAvailableYears();
			for (let i = 0; i < years.length - 1; i++) {
				expect(parseInt(years[i])).toBeGreaterThanOrEqual(parseInt(years[i + 1]));
			}
		});

		it('should only include years from projects', () => {
			const years = getAvailableYears();
			const projectYears = projectsData.map((p) => p.year);

			years.forEach((year) => {
				expect(projectYears).toContain(year);
			});
		});
	});

	describe('data integrity', () => {
		it('should have all project categories referenced in projectCategories', () => {
			const categoryIds = projectCategories.map((c) => c.id);

			projectsData.forEach((project) => {
				expect(categoryIds).toContain(project.category);
			});
		});

		it('should have at least one project per category', () => {
			projectCategories.forEach((category) => {
				const projectsInCategory = projectsData.filter((p) => p.category === category.id);
				expect(projectsInCategory.length).toBeGreaterThan(0);
			});
		});

		it('should have valid achievements array if present', () => {
			projectsData.forEach((project) => {
				if (project.achievements) {
					expect(Array.isArray(project.achievements)).toBe(true);
					project.achievements.forEach((achievement) => {
						expect(typeof localize(achievement, 'fr')).toBe('string');
						expect(localize(achievement, 'fr').length).toBeGreaterThan(0);
					});
				}
			});
		});

		it('should have valid technologies array if present', () => {
			projectsData.forEach((project) => {
				if (project.technologies) {
					expect(Array.isArray(project.technologies)).toBe(true);
					project.technologies.forEach((tech) => {
						expect(typeof localize(tech, 'fr')).toBe('string');
						expect(localize(tech, 'fr').length).toBeGreaterThan(0);
					});
				}
			});
		});

		it('should not have sensitive information in anonymized projects', () => {
			// Vérifier qu'il n'y a pas de noms d'organisations spécifiques non autorisées
			const sensitiveKeywords = ['CRIAQ', 'Aéro Montréal'];

			projectsData.forEach((project) => {
				sensitiveKeywords.forEach((keyword) => {
					const fields = [project.title, project.description, ...(project.client ? [project.client] : [])];
					fields.flatMap(variants).forEach((text) => expect(text).not.toContain(keyword));
				});
			});
		});
	});

	describe('project status distribution', () => {
		it('should have at least some completed projects', () => {
			const completedProjects = projectsData.filter((p) => p.status === 'completed');
			expect(completedProjects.length).toBeGreaterThan(0);
		});

		it('should have valid status values', () => {
			const validStatuses = ['completed', 'in-progress', 'planned'];
			projectsData.forEach((project) => {
				expect(validStatuses).toContain(project.status);
			});
		});
	});
});
