// Structure de données pour les réalisations/projets
// Données extraites du document Word Réalisations_FP_Innovitech 2025-06-10b.docx

export interface Project {
	id: string;
	title: string;
	client?: string;
	category: string;
	year: string;
	period?: string;
	description: string;
	longDescription?: string;
	achievements?: string[];
	technologies?: string[];
	role?: string;
	teamSize?: string;
	imageUrl?: string;
	url?: string;
	status: 'completed' | 'in-progress' | 'planned';
}

export interface ProjectCategory {
	id: string;
	name: string;
	description: string;
}

// Catégories de projets
export const projectCategories: ProjectCategory[] = [
	{
		id: 'aerospace',
		name: 'Aérospatiale',
		description: 'Projets en aérospatiale et mobilité aérienne avancée'
	},
	{
		id: 'drones',
		name: 'Drones et MAA',
		description: 'Drones et mobilité aérienne avancée'
	},
	{
		id: 'health',
		name: 'Santé',
		description: 'Technologies médicales et santé'
	},
	{
		id: 'innovation-ecosystems',
		name: 'Écosystèmes d\'innovation',
		description: 'Lieux et écosystèmes d\'innovation'
	},
	{
		id: 'energy',
		name: 'Énergie',
		description: 'Énergies renouvelables et développement durable'
	},
	{
		id: 'digital-ai',
		name: 'Numérique et IA',
		description: 'Technologies numériques et intelligence artificielle'
	},
	{
		id: 'tools',
		name: 'Outils et méthodologies',
		description: 'Développement d\'outils internes'
	}
];

// Données des projets de François Provencher chez Innovitech
export const projectsData: Project[] = [
	// AÉROSPATIALE
	{
		id: 'proj001',
		title: 'Conteneur instrumenté pour transport de biomolécules par drone',
		category: 'aerospace',
		year: '2024',
		description:
			'Conception, rédaction d\'une demande de financement et développement d\'un conteneur instrumenté pour le transport de biomolécules fragiles (ADN, ARN, etc.) par drone.',
		achievements: [
			'Ingénierie système complète',
			'Gestion de projet',
			'Simulations avancées',
			'Développement du logiciel embarqué'
		],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj002',
		title: 'Stratégie d\'innovation pour entreprise de services en fabrication',
		category: 'aerospace',
		year: '2024',
		description:
			'Élaboration d\'une stratégie d\'innovation pour une entreprise de services en fabrication œuvrant dans les secteurs de l\'aérospatiale, de la défense et du transport terrestre.',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj003',
		title: 'Quantification des impacts environnementaux - CRIAQ',
		category: 'aerospace',
		year: '2024',
		description:
			'Quantification des impacts environnementaux des 35 vecteurs identifiés dans la feuille de route en aérospatiale du Consortium de Recherche et d\'Innovation en Aérospatiale (CRIAQ).',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj004',
		title: 'Livre blanc - Forum d\'innovation en aérospatiale 2024',
		category: 'aerospace',
		year: '2024',
		client: 'Aéro Montréal',
		description:
			'Rédaction du Livre blanc pour le Forum d\'innovation en aérospatiale 2024 organisé par Aéro Montréal.',
		role: 'Support (S)',
		status: 'completed'
	},
	{
		id: 'proj005',
		title: 'Livre blanc - Conférence DAIR to Innovate 2024',
		category: 'aerospace',
		year: '2024',
		description: 'Rédaction du Livre blanc pour la conférence DAIR to Innovate 2024.',
		role: 'Support (S)',
		status: 'completed'
	},
	{
		id: 'proj006',
		title: 'Étude d\'opportunité - Laboratoire acoustique aérospatiale',
		category: 'aerospace',
		year: '2023',
		description:
			'Réalisation d\'une étude d\'opportunité en vue de la création d\'un laboratoire acoustique dédié à l\'aérospatiale.',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj007',
		title: 'Cartographie de l\'écosystème aérospatial de l\'Ontario',
		category: 'aerospace',
		year: '2023',
		description: 'Cartographie complète de l\'écosystème aérospatial de l\'Ontario.',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj008',
		title: 'Appel à projets - Aérospatiale durable en Ontario',
		category: 'aerospace',
		year: '2023',
		description:
			'Soutien à la mise en place et à la gestion d\'un appel à projets pour l\'aérospatiale durable en Ontario.',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj009',
		title: 'Plateforme pancanadienne - Propulsion hybride électrique et hydrogène',
		category: 'aerospace',
		year: '2023',
		description:
			'Appui à la création d\'une plateforme pancanadienne de recherche sur la propulsion hybride électrique et hydrogène dans l\'aviation.',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj010',
		title: 'Modèle financier - Pôle Mirabel Zone d\'innovation Espace Aéro',
		category: 'aerospace',
		year: '2022',
		description:
			'Développement du modèle financier (coûts, revenus, clientèle potentielle, équipements, etc.) pour le plan d\'affaires du pôle Mirabel de la Zone d\'innovation Espace Aéro.',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj011',
		title: 'Modèle financier - Pôle Saint-Laurent Zone d\'innovation Espace Aéro',
		category: 'aerospace',
		year: '2022',
		description:
			'Développement du modèle financier pour le plan d\'affaires du pôle Saint-Laurent de la Zone d\'innovation Espace Aéro.',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj012',
		title: 'Plan d\'affaires - Pôle Mirabel',
		category: 'aerospace',
		year: '2022',
		description: 'Plan d\'affaires du pôle Mirabel de la Zone d\'innovation Espace Aéro.',
		role: 'Support (S)',
		status: 'completed'
	},
	{
		id: 'proj013',
		title: 'Plan d\'affaires - Pôle Saint-Laurent',
		category: 'aerospace',
		year: '2022',
		description: 'Plan d\'affaires du pôle Saint-Laurent de la Zone d\'innovation Espace Aéro.',
		role: 'Support (S)',
		status: 'completed'
	},
	{
		id: 'proj014',
		title: 'Étude de positionnement post-COVID - Centre d\'innovation aérospatiale',
		category: 'aerospace',
		year: '2021',
		description:
			'Réalisation d\'une étude de positionnement post-COVID pour un centre d\'innovation en aérospatiale.',
		role: 'Leader (L)',
		status: 'completed'
	},

	// DRONES ET MOBILITÉ AÉRIENNE AVANCÉE
	{
		id: 'proj020',
		title: 'Étude de préfaisabilité - Déploiement de drones en contexte minier',
		category: 'drones',
		year: '2024',
		description: 'Réalisation d\'une étude de préfaisabilité sur le déploiement de drones en contexte minier.',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj021',
		title: 'Positionnement stratégique - Consortium canadien en MAA',
		category: 'drones',
		year: '2024',
		description:
			'Conduite d\'une étude de positionnement stratégique pour un consortium canadien en mobilité aérienne avancée.',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj022',
		title: 'Méthodologie - Acceptabilité sociale de la MAA au Québec',
		category: 'drones',
		year: '2024',
		description:
			'Développement d\'une méthodologie spécifique à la gestion de l\'acceptabilité sociale de la MAA au Québec.',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj023',
		title: 'Analyse de positionnement optimal de vertiports',
		category: 'drones',
		year: '2024',
		description:
			'Analyse du positionnement optimal de vertiports dans dix villes du Québec dans le cadre du déploiement de la MAA.',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj024',
		title: 'Service de livraison de médicaments par drones - Vol d\'essai 170 km',
		category: 'drones',
		year: '2023',
		description:
			'Conception, planification et essais en vol d\'un service de livraison de médicaments et de collecte d\'échantillons biologiques par drones, à destination des régions éloignées dans le cadre d\'études cliniques.',
		achievements: ['Vol d\'essai réussi de 170 km'],
		role: 'Leader (L)',
		status: 'completed'
	},

	// SANTÉ ET TECHNOLOGIES MÉDICALES
	{
		id: 'proj030',
		title: 'Planification stratégique - Centre de recherche en maladies génétiques rares',
		category: 'health',
		year: '2024',
		description:
			'Élaboration de la planification stratégique et structuration de l\'innovation pour un centre de recherche dédié aux maladies génétiques rares.',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj031',
		title: 'Applications pour études cliniques en régions éloignées',
		category: 'health',
		year: '2023',
		description:
			'Définition des besoins, architecture, développement et déploiement de dix applications spécialisées pour la gestion des études cliniques en régions éloignées.',
		achievements: ['Développement et déploiement de 10 applications spécialisées'],
		technologies: ['PowerApps', 'Azure', 'JavaScript'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj032',
		title: 'Ateliers thématiques - Santé en espace lointain',
		category: 'health',
		year: '2023',
		client: 'Agence spatiale canadienne',
		description:
			'Conception et animation d\'ateliers thématiques sur la santé en espace lointain pour l\'Agence spatiale canadienne.',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj033',
		title: 'Conteneur pour agents thérapeutiques - Exploration spatiale',
		category: 'health',
		year: '2023',
		description:
			'Idéation, rédaction d\'une demande de financement et développement d\'un conteneur instrumenté pour le transport et la conservation d\'agents thérapeutiques fragiles (ADN, ARN, etc.) dans le cadre de missions d\'exploration spatiale en orbite haute (> 400 km).',
		achievements: [
			'Ingénierie système',
			'Simulations avancées',
			'Gestion de projet',
			'Développement logiciel embarqué'
		],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj034',
		title: 'Plan d\'affaires - Outil pédagogique maladies lipidiques',
		category: 'health',
		year: '2022',
		description:
			'Élaboration d\'un plan d\'affaires pour un outil pédagogique destiné à vulgariser les mécanismes biologiques liés aux maladies lipidiques.',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj035',
		title: 'Plan d\'affaires - Startup en espaces de recherche partagés',
		category: 'health',
		year: '2022',
		description:
			'Contribution à l\'élaboration du plan d\'affaires d\'une entreprise en démarrage dans l\'est de Montréal, spécialisée en espaces de recherche partagés en biotechnologies.',
		role: 'Support (S)',
		status: 'completed'
	},
	{
		id: 'proj036',
		title: 'Analyse de la filière ARN au Québec',
		category: 'health',
		year: '2022',
		description: 'Analyse de la filière académique et industrielle de l\'ARN au Québec.',
		role: 'Support (S)',
		status: 'completed'
	},

	// LIEUX ET ÉCOSYSTÈMES D\'INNOVATION
	{
		id: 'proj040',
		title: 'Développement économique Québec-Suisse',
		category: 'innovation-ecosystems',
		year: '2023',
		description:
			'Développement économique ciblé dans les secteurs de l\'aérospatiale, des technologies médicales, de la microélectronique et de l\'optique/photonique entre le Québec et la Suisse.',
		achievements: [
			'Analyse comparative des écosystèmes industriels',
			'Identification d\'entreprises aux expertises complémentaires',
			'Organisation de missions commerciales bilatérales',
			'Activités de maillage'
		],
		role: 'Leader (L)',
		status: 'completed'
	},

	// ÉNERGIES RENOUVELABLES ET DÉVELOPPEMENT DURABLE
	{
		id: 'proj050',
		title: 'Projet de recherche - Recyclage des avions en fin de vie',
		category: 'energy',
		year: '2024',
		description:
			'Rédaction d\'une proposition de projet de recherche impliquant 10 partenaires industriels et académiques sur le recyclage des avions en fin de vie.',
		achievements: ['Coordination de 10 partenaires'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj051',
		title: 'Structuration de l\'innovation - Entreprise de distribution d\'énergie',
		category: 'energy',
		year: '2023',
		description: 'Structuration de l\'innovation pour une entreprise majeure de distribution d\'énergie.',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj052',
		title: 'Étude - Transition industrielle de l\'est de Montréal',
		category: 'energy',
		year: '2023',
		description: 'Réalisation d\'une étude sur la transition industrielle de l\'est de Montréal.',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj053',
		title: 'Planification stratégique - Valorisation de biomasse par pyrolyse',
		category: 'energy',
		year: '2022',
		description:
			'Élaboration de la planification stratégique pour une entreprise spécialisée dans la valorisation de la biomasse par pyrolyse.',
		role: 'Leader (L)',
		status: 'completed'
	},

	// TECHNOLOGIES NUMÉRIQUES ET IA
	{
		id: 'proj060',
		title: 'Direction antenne canadienne - Centre de recherche français en IA',
		category: 'digital-ai',
		year: '2024',
		description: 'Direction générale de l\'antenne canadienne d\'un centre de recherche français en intelligence artificielle.',
		role: 'Leader (L)',
		status: 'in-progress'
	},
	{
		id: 'proj061',
		title: 'Programme de recherche collaborative France-Québec - IA générative',
		category: 'digital-ai',
		year: '2024',
		description:
			'Conception d\'un programme de recherche collaborative France-Québec sur l\'utilisation robuste et explicable de l\'utilisation de l\'IA générative pour les processus d\'entreprise critiques (assurance qualité, design, etc.).',
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj062',
		title: 'Étude de positionnement - Formation continue universitaire',
		category: 'digital-ai',
		year: '2023',
		description:
			'Étude de positionnement stratégique de l\'offre de formation continue d\'une grande université québécoise.',
		role: 'Leader (L)',
		status: 'completed'
	},

	// OUTILS, CODES SPÉCIALISÉS ET MÉTHODOLOGIES INTERNES
	{
		id: 'proj070',
		title: 'Radar de veille stratégique - 50+ technologies émergentes',
		category: 'tools',
		year: '2024',
		description:
			'Création d\'un radar de veille stratégique pour suivre l\'évolution de plus de 50 technologies émergentes (aérospatiale, fabrication avancée, IA, énergies renouvelables, biotechnologies, etc.).',
		technologies: ['Python', 'PowerBI', 'Web scraping'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj071',
		title: 'Base de données - 7000+ organisations innovantes',
		category: 'tools',
		year: '2024',
		description:
			'Constitution d\'une base de données interne regroupant plus de 7 000 organisations innovantes au Québec, au Canada et à l\'international.',
		technologies: ['SQL', 'Python', 'PowerBI'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj072',
		title: 'Application de simulation technico-économique - Biomasse',
		category: 'tools',
		year: '2023',
		description:
			'Développement d\'une application de simulation technico-économique pour évaluer la performance financière d\'un procédé de transformation de biomasse en fonction de paramètres techniques.',
		technologies: ['Python', 'JavaScript'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj073',
		title: 'Outils de simulation Monte Carlo',
		category: 'tools',
		year: '2023',
		description:
			'Conception d\'outils de simulation Monte Carlo pour la modélisation paramétrique de cas d\'affaires.',
		technologies: ['Python', 'NumPy'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj074',
		title: 'Algorithme de priorisation multicritère',
		category: 'tools',
		year: '2023',
		description: 'Développement d\'un algorithme de priorisation multicritère de projets.',
		technologies: ['Python'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj075',
		title: 'Mise à niveau - Incubateur numérique',
		category: 'tools',
		year: '2023',
		description: 'Mise à niveau d\'un incubateur numérique pour expérimenter les dernières technologies.',
		technologies: ['Arduino', 'Raspberry PI', 'Impression 3D'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj076',
		title: 'Intégration IA générative - Pratiques internes Innovitech',
		category: 'tools',
		year: '2024',
		description: 'Intégration de l\'intelligence artificielle générative dans les pratiques internes d\'Innovitech.',
		technologies: ['OpenAI API', 'Python', 'LangChain'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj077',
		title: 'Solution locale d\'analyse de documents - RAG',
		category: 'tools',
		year: '2024',
		description:
			'Développement de solutions locales d\'analyse sécurisée de documents basée sur l\'IA générative et la génération augmentée (RAG).',
		technologies: ['Python', 'LangChain', 'Ollama', 'ChromaDB'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj078',
		title: 'Agents IA - Besoins internes',
		category: 'tools',
		year: '2024',
		description: 'Développement d\'agent IA pour nos besoins internes.',
		technologies: ['Python', 'LangChain', 'OpenAI'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj079',
		title: 'Logiciel d\'automatisation - Reddition de comptes',
		category: 'tools',
		year: '2023',
		description: 'Développement d\'un logiciel d\'automatisation de la reddition de comptes pour projets collaboratifs.',
		technologies: ['Python', 'Excel', 'PowerAutomate'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj080',
		title: 'Simulateur financier - Réseau de vertiports MAA',
		category: 'tools',
		year: '2024',
		description:
			'Conception d\'un simulateur financier pour l\'évaluation d\'un réseau de vertiports en mobilité aérienne avancée.',
		technologies: ['Python', 'JavaScript', 'Excel'],
		role: 'Leader (L)',
		status: 'completed'
	}
];

// Fonction utilitaire pour filtrer les projets par catégorie
export function getProjectsByCategory(categoryId: string): Project[] {
	return projectsData.filter((project) => project.category === categoryId);
}

// Fonction utilitaire pour obtenir les projets par année
export function getProjectsByYear(year: string): Project[] {
	return projectsData.filter((project) => project.year === year);
}

// Fonction utilitaire pour obtenir les années disponibles
export function getAvailableYears(): string[] {
	const years = projectsData.map((project) => project.year);
	return [...new Set(years)].sort((a, b) => b.localeCompare(a));
}

// Statistiques
export function getProjectStats() {
	return {
		total: projectsData.length,
		completed: projectsData.filter((p) => p.status === 'completed').length,
		inProgress: projectsData.filter((p) => p.status === 'in-progress').length,
		planned: projectsData.filter((p) => p.status === 'planned').length,
		asLeader: projectsData.filter((p) => p.role === 'Leader (L)').length,
		asSupport: projectsData.filter((p) => p.role === 'Support (S)').length
	};
}
