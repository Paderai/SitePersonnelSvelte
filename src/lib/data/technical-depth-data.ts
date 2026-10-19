// Données pour la profondeur technique
// Fichier de configuration des technologies et de leur niveau de maîtrise

export interface Technology {
	name: string;
	category: string;
	level: number; // 0-100%
	description?: string;
}

/**
 * COMMENT AJUSTER LES NIVEAUX :
 *
 * - 0-30% : Zone Néophyte
 *   Vous découvrez la technologie, vous ne savez pas encore ce que vous ne savez pas.
 *   C'est le début de la courbe en S, l'apprentissage est lent.
 *
 * - 30-70% : Zone Apprentissage
 *   Vous commencez à comprendre la technologie et vous savez ce que vous ne savez pas.
 *   C'est la partie linéaire de la courbe, l'apprentissage est rapide.
 *
 * - 70-100% : Zone Expert
 *   Vous avez une maîtrise approfondie, le taux d'apprentissage diminue.
 *   Vous êtes dans la partie haute de la courbe en S.
 *
 * POUR AJOUTER UNE NOUVELLE TECHNOLOGIE :
 * Ajoutez simplement un nouvel objet dans le tableau ci-dessous avec :
 * - name: Le nom de la technologie
 * - category: La catégorie (créez-en une nouvelle si nécessaire)
 * - level: Le niveau de maîtrise (0-100%)
 * - description: (optionnel) Une description courte
 */

export const technologies: Technology[] = [
	// ============================================
	// GESTION ET INNOVATION (70-90%)
	// ============================================
	{ name: 'Gestion de l\'innovation', category: 'Gestion', level: 97 },
	{ name: 'Gestion de projets complexes', category: 'Gestion', level: 88 },
	{ name: 'Planification stratégique', category: 'Gestion', level: 85 },
	{ name: 'Développement d\'écosystèmes', category: 'Gestion', level: 88 },
	{ name: 'Gestion du changement', category: 'Gestion', level: 70 },
	{ name: 'Veille technologique', category: 'Gestion', level: 98 },

	// ============================================
	// AÉROSPATIALE ET DOMAINES TECHNIQUES (75-85%)
	// ============================================
	{ name: 'Aérospatiale', category: 'Domaines', level: 90 },
	{ name: 'Mobilité aérienne avancée', category: 'Domaines', level: 75 },
	{ name: 'Technologies médicales', category: 'Domaines', level: 35 },
	{ name: 'Ingénierie système', category: 'Domaines', level: 68 },

	// ============================================
	// BUREAUTIQUE ET OUTILS MICROSOFT (75-90%)
	// ============================================
	{ name: 'Microsoft Office 365', category: 'Bureautique', level: 95 },
	{ name: 'Power BI', category: 'Bureautique', level: 90 },
	{ name: 'Power Apps', category: 'Bureautique', level: 95 },
	{ name: 'Power Automate', category: 'Bureautique', level: 65 },
	{ name: 'SharePoint', category: 'Bureautique', level: 58 },
	{ name: 'OneNote', category: 'Bureautique', level: 75 },
	{ name: 'Teams/Zoom/Meet', category: 'Bureautique', level: 90 },
	{ name: 'Antidote', category: 'Bureautique', level: 75 },
	{ name: 'Dataverse', category: 'Bureautique', level: 85 },

	// ============================================
	// PROGRAMMATION ET DÉVELOPPEMENT (60-85%)
	// ============================================
	{ name: 'Python', category: 'Programmation', level: 85 },
	{ name: 'JavaScript/TypeScript', category: 'Programmation', level: 68 },
	{ name: 'HTML/CSS', category: 'Programmation', level: 70 },
	{ name: 'Svelte/SvelteKit', category: 'Programmation', level: 55 },
	{ name: 'React', category: 'Programmation', level: 35 },
	{ name: 'Vue', category: 'Programmation', level: 40 },
	{ name: 'Node.js', category: 'Programmation', level: 42 },
	{ name: 'Git/GitHub', category: 'Programmation', level: 70 },
	{ name: 'VS Code', category: 'Programmation', level: 75 },

	// ============================================
	// INTELLIGENCE ARTIFICIELLE ET DATA SCIENCE (70-85%)
	// ============================================
	{ name: 'IA générative (ChatGPT, Claude)', category: 'IA', level: 85 },
	{ name: 'OpenAI ', category: 'IA', level: 84 },
	{ name: 'Ollama', category: 'IA', level: 72 },
	{ name: 'LangChain', category: 'IA', level: 58 },
	{ name: 'PyTorch', category: 'IA', level: 38 },
	{ name: 'TensorFlow', category: 'IA', level: 18 },
	{ name: 'Jupyter Notebooks', category: 'IA', level: 80 },
	{ name: 'Analyse de données', category: 'IA', level: 82 },
	{ name: 'NumPy/SciPy', category: 'IA', level: 65 },

	// ============================================
	// MODÉLISATION ET CAO (60-75%)
	// ============================================
	{ name: 'Blender', category: 'Modélisation', level: 62 },
	{ name: 'Fusion 360', category: 'Modélisation', level: 58 },
	{ name: 'SolidWorks', category: 'Modélisation', level: 55 },
	{ name: 'Impression 3D', category: 'Modélisation', level: 55 },
	{ name: 'PrusaSlicer', category: 'Modélisation', level: 70 },

	// ============================================
	// CRÉATION DE CONTENU (50-70%)
	// ============================================
	{ name: 'DaVinci Resolve', category: 'Contenu', level: 56 },
	{ name: 'OBS Studio', category: 'Contenu', level: 48 },
	{ name: 'Audacity', category: 'Contenu', level: 45 },
	{ name: 'GIMP', category: 'Contenu', level: 42 },
	{ name: 'Unity/Unreal Engine', category: 'Contenu', level: 32 },

	// ============================================
	// INFRASTRUCTURE ET DEVOPS (65-72%)
	// ============================================
	{ name: 'Docker', category: 'Infrastructure', level: 38 },
	{ name: 'Linux', category: 'Infrastructure', level: 65 },
	{ name: 'Azure, AWS, Google Cloud', category: 'Infrastructure', level: 25 },
	{ name: 'SQL/Bases de données', category: 'Infrastructure', level: 65 },

	// ============================================
	// HARDWARE ET ÉLECTRONIQUE (60-70%)
	// ============================================
	{ name: 'Arduino', category: 'Hardware', level: 68 },
	{ name: 'Raspberry Pi', category: 'Hardware', level: 70 },
	{ name: 'Électronique', category: 'Hardware', level: 45 }

	// ============================================
	// POUR AJOUTER UNE NOUVELLE TECHNOLOGIE :
	// Décommentez et modifiez les lignes suivantes :
	// ============================================
	// { name: 'Nom de la technologie', category: 'Catégorie', level: 75 },
];

// Zones de la courbe en S
export const zones = [
	{
		name: 'Zone Néophyte',
		description: 'On ne sait pas ce qu\'on ne sait pas',
		range: '0-30%',
		color: 'rgb(239 68 68)', // Rouge
		start: 0,
		end: 30
	},
	{
		name: 'Zone Apprentissage',
		description: 'On commence à savoir ce qu\'on ne sait pas',
		range: '30-70%',
		color: 'rgb(var(--color-accent))', // Jaune
		start: 30,
		end: 70
	},
	{
		name: 'Zone Expert',
		description: 'Maîtrise approfondie, taux d\'apprentissage diminue',
		range: '70-100%',
		color: 'rgb(34 197 94)', // Vert
		start: 70,
		end: 100
	}
];

// Fonction utilitaire pour obtenir toutes les catégories uniques
export function getCategories(): string[] {
	return [...new Set(technologies.map((t) => t.category))];
}

// Fonction utilitaire pour obtenir les technologies d'une catégorie
export function getTechnologiesByCategory(category: string): Technology[] {
	return technologies.filter((t) => t.category === category);
}

// Fonction utilitaire pour obtenir les statistiques
export function getTechStats() {
	const totalTech = technologies.length;
	const neophyte = technologies.filter((t) => t.level < 30).length;
	const learning = technologies.filter((t) => t.level >= 30 && t.level < 70).length;
	const expert = technologies.filter((t) => t.level >= 70).length;

	return {
		total: totalTech,
		neophyte,
		learning,
		expert,
		averageLevel: Math.round(technologies.reduce((sum, t) => sum + t.level, 0) / totalTech)
	};
}
