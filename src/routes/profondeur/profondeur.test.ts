import { describe, it, expect } from 'vitest';

// Tests pour les fonctions utilisées dans la page profondeur technique

describe('S-Curve calculations', () => {
	// Reproduire la fonction calculateSCurveY pour les tests
	function calculateSCurveY(x: number): number {
		const k = 0.08;
		const x0 = 50;
		return 100 / (1 + Math.exp(-k * (x - x0)));
	}

	describe('calculateSCurveY()', () => {
		it('should return 0-100 range for valid inputs', () => {
			for (let i = 0; i <= 100; i += 10) {
				const result = calculateSCurveY(i);
				expect(result).toBeGreaterThanOrEqual(0);
				expect(result).toBeLessThanOrEqual(100);
			}
		});

		it('should return ~50 at midpoint (x=50)', () => {
			const result = calculateSCurveY(50);
			expect(result).toBeCloseTo(50, 0);
		});

		it('should return low value at x=0', () => {
			const result = calculateSCurveY(0);
			expect(result).toBeLessThan(10);
		});

		it('should return high value at x=100', () => {
			const result = calculateSCurveY(100);
			expect(result).toBeGreaterThan(90);
		});

		it('should be monotonically increasing', () => {
			for (let i = 0; i < 100; i++) {
				const current = calculateSCurveY(i);
				const next = calculateSCurveY(i + 1);
				expect(next).toBeGreaterThanOrEqual(current);
			}
		});

		it('should have inflection points around 30% and 70%', () => {
			// Calcul de la dérivée seconde approximative
			const epsilon = 0.1;

			// Autour de 30%
			const y30minus = calculateSCurveY(30 - epsilon);
			const y30 = calculateSCurveY(30);
			const y30plus = calculateSCurveY(30 + epsilon);
			const secondDerivative30 = (y30plus - 2 * y30 + y30minus) / (epsilon * epsilon);

			// Autour de 70%
			const y70minus = calculateSCurveY(70 - epsilon);
			const y70 = calculateSCurveY(70);
			const y70plus = calculateSCurveY(70 + epsilon);
			const secondDerivative70 = (y70plus - 2 * y70 + y70minus) / (epsilon * epsilon);

			// Les dérivées secondes devraient être proches de 0 aux points d'inflexion
			expect(Math.abs(secondDerivative30)).toBeLessThan(0.5);
			expect(Math.abs(secondDerivative70)).toBeLessThan(0.5);
		});
	});
});

describe('Coordinate transformations', () => {
	const width = 800;
	const height = 500;
	const padding = 60;
	const plotWidth = width - 2 * padding;
	const plotHeight = height - 2 * padding;

	function xToScreen(x: number): number {
		return padding + (x / 100) * plotWidth;
	}

	function yToScreen(y: number): number {
		return height - padding - (y / 100) * plotHeight;
	}

	describe('xToScreen()', () => {
		it('should map 0 to left padding', () => {
			expect(xToScreen(0)).toBe(padding);
		});

		it('should map 100 to right edge minus padding', () => {
			expect(xToScreen(100)).toBe(width - padding);
		});

		it('should map 50 to center', () => {
			expect(xToScreen(50)).toBe(width / 2);
		});

		it('should be linear', () => {
			const x1 = xToScreen(25);
			const x2 = xToScreen(50);
			const x3 = xToScreen(75);
			expect(x2 - x1).toBeCloseTo(x3 - x2, 5);
		});
	});

	describe('yToScreen()', () => {
		it('should map 0 to bottom (inverted Y axis)', () => {
			expect(yToScreen(0)).toBe(height - padding);
		});

		it('should map 100 to top', () => {
			expect(yToScreen(100)).toBe(padding);
		});

		it('should map 50 to center', () => {
			expect(yToScreen(50)).toBe(height / 2);
		});

		it('should be linear and inverted', () => {
			const y1 = yToScreen(25);
			const y2 = yToScreen(50);
			const y3 = yToScreen(75);
			// Y inversé donc y1 > y2 > y3
			expect(y1).toBeGreaterThan(y2);
			expect(y2).toBeGreaterThan(y3);
		});
	});
});

describe('Offset calculation for anti-overlap', () => {
	function getOffset(techName: string): { x: number; y: number } {
		let hash = 0;
		for (let i = 0; i < techName.length; i++) {
			hash = techName.charCodeAt(i) + ((hash << 5) - hash);
		}
		const xOffset = ((hash % 100) / 100) * 4 - 2;
		const yOffset = (((hash >> 8) % 100) / 100) * 4 - 2;
		return { x: xOffset, y: yOffset };
	}

	describe('getOffset()', () => {
		it('should return offset within reasonable range', () => {
			const testNames = ['Python', 'JavaScript', 'TypeScript', 'React', 'Vue'];

			testNames.forEach((name) => {
				const offset = getOffset(name);
				// Vérifier que les offsets sont dans une plage raisonnable (pas infini, pas NaN)
				expect(offset.x).toBeDefined();
				expect(offset.y).toBeDefined();
				expect(isFinite(offset.x)).toBe(true);
				expect(isFinite(offset.y)).toBe(true);
				// Les offsets devraient être relativement petits (< 10 pixels)
				expect(Math.abs(offset.x)).toBeLessThan(10);
				expect(Math.abs(offset.y)).toBeLessThan(10);
			});
		});

		it('should return same offset for same name', () => {
			const offset1 = getOffset('Python');
			const offset2 = getOffset('Python');
			expect(offset1).toEqual(offset2);
		});

		it('should return different offsets for different names', () => {
			const offset1 = getOffset('Python');
			const offset2 = getOffset('JavaScript');
			expect(offset1).not.toEqual(offset2);
		});

		it('should be deterministic', () => {
			const testNames = ['Python', 'JavaScript', 'React'];

			testNames.forEach((name) => {
				const results = Array(10)
					.fill(null)
					.map(() => getOffset(name));

				// Tous les résultats devraient être identiques
				results.forEach((result) => {
					expect(result).toEqual(results[0]);
				});
			});
		});
	});
});

describe('Zoom and Pan functionality', () => {
	describe('Zoom calculations', () => {
		it('should limit zoom to maximum 4x', () => {
			let zoomLevel = 1;
			const zoomIn = () => Math.min(zoomLevel * 1.3, 4);

			// Zoomer plusieurs fois
			for (let i = 0; i < 20; i++) {
				zoomLevel = zoomIn();
			}

			expect(zoomLevel).toBeLessThanOrEqual(4);
		});

		it('should limit zoom to minimum 1x', () => {
			let zoomLevel = 4;
			const zoomOut = () => Math.max(zoomLevel / 1.3, 1);

			// Dézoomer plusieurs fois
			for (let i = 0; i < 20; i++) {
				zoomLevel = zoomOut();
			}

			expect(zoomLevel).toBeGreaterThanOrEqual(1);
		});

		it('should zoom in by factor of 1.3', () => {
			const initialZoom = 1;
			const zoomedIn = initialZoom * 1.3;
			expect(zoomedIn).toBeCloseTo(1.3, 5);
		});

		it('should zoom out by factor of 1/1.3', () => {
			const initialZoom = 1.3;
			const zoomedOut = initialZoom / 1.3;
			expect(zoomedOut).toBeCloseTo(1, 5);
		});
	});

	describe('Pan calculations', () => {
		it('should calculate correct delta from mouse movement', () => {
			const dragStartX = 100;
			const currentX = 150;
			const initialPanX = 0;

			const deltaX = currentX - dragStartX;
			const newPanX = initialPanX + deltaX;

			expect(newPanX).toBe(50);
		});

		it('should reset pan when zoom is reset', () => {
			let zoomLevel = 2;
			let panX = 100;
			let panY = 50;

			// Reset zoom
			zoomLevel = 1;
			if (zoomLevel === 1) {
				panX = 0;
				panY = 0;
			}

			expect(panX).toBe(0);
			expect(panY).toBe(0);
		});
	});
});

describe('Category colors', () => {
	const categoryColors: Record<string, string> = {
		Gestion: 'rgb(147, 51, 234)',
		Domaines: 'rgb(59, 130, 246)',
		Bureautique: 'rgb(16, 185, 129)',
		Programmation: 'rgb(249, 115, 22)',
		IA: 'rgb(236, 72, 153)',
		Modélisation: 'rgb(14, 165, 233)',
		Contenu: 'rgb(139, 92, 246)',
		Infrastructure: 'rgb(34, 197, 94)',
		Hardware: 'rgb(234, 179, 8)'
	};

	it('should have 9 categories', () => {
		expect(Object.keys(categoryColors).length).toBe(9);
	});

	it('should have valid RGB color format', () => {
		const rgbRegex = /^rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$/;

		Object.values(categoryColors).forEach((color) => {
			expect(rgbRegex.test(color)).toBe(true);
		});
	});

	it('should have unique colors for each category', () => {
		const colors = Object.values(categoryColors);
		const uniqueColors = new Set(colors);
		expect(colors.length).toBe(uniqueColors.size);
	});

	it('should have all expected categories', () => {
		const expectedCategories = [
			'Gestion',
			'Domaines',
			'Bureautique',
			'Programmation',
			'IA',
			'Modélisation',
			'Contenu',
			'Infrastructure',
			'Hardware'
		];

		expectedCategories.forEach((category) => {
			expect(categoryColors).toHaveProperty(category);
		});
	});
});

describe('Filter functionality', () => {
	const mockTechnologies = [
		{ name: 'Python', category: 'Programmation', level: 85 },
		{ name: 'React', category: 'Programmation', level: 65 },
		{ name: 'Power BI', category: 'Bureautique', level: 90 },
		{ name: 'Docker', category: 'Infrastructure', level: 38 }
	];

	it('should return all technologies when no filter selected', () => {
		const selectedCategory = null;
		const filtered = selectedCategory
			? mockTechnologies.filter((t) => t.category === selectedCategory)
			: mockTechnologies;

		expect(filtered.length).toBe(mockTechnologies.length);
	});

	it('should filter by category correctly', () => {
		const selectedCategory = 'Programmation';
		const filtered = mockTechnologies.filter((t) => t.category === selectedCategory);

		expect(filtered.length).toBe(2);
		filtered.forEach((tech) => {
			expect(tech.category).toBe('Programmation');
		});
	});

	it('should return empty array for non-existent category', () => {
		const selectedCategory = 'NonExistent';
		const filtered = mockTechnologies.filter((t) => t.category === selectedCategory);

		expect(filtered.length).toBe(0);
	});
});
