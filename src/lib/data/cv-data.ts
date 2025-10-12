// Structure de données pour le CV
// Données extraites du document Word CV_François-Provencher_Innovitech Sept 2024.docx

export interface Experience {
	id: string;
	title: string;
	company: string;
	location: string;
	period: string;
	description: string[];
	achievements?: string[];
	technologies?: string[];
}

export interface Education {
	id: string;
	degree: string;
	institution: string;
	location: string;
	period: string;
	description?: string;
}

export interface Certification {
	id: string;
	name: string;
	issuer: string;
	date: string;
	url?: string;
}

export interface Skill {
	category: string;
	items: string[];
}

export interface CVData {
	profile: {
		name: string;
		title: string;
		summary: string;
		email: string;
		phone?: string;
		location: string;
		linkedin?: string;
		website?: string;
	};
	experiences: Experience[];
	education: Education[];
	certifications: Certification[];
	skills: Skill[];
	languages: {
		language: string;
		level: string;
	}[];
}

// Données du CV de François Provencher
export const cvData: CVData = {
	profile: {
		name: 'François Provencher, Ing., M.Sc.A.',
		title: 'Directeur principal, innovation et technologie',
		summary:
			'Ingénieur et consultant expert avec plus de 25 ans d\'expérience en gestion de l\'innovation, transformation numérique et développement technologique. Expertise approfondie en aérospatiale, technologies émergentes, IA et gestion de projets stratégiques complexes.',
		email: 'francois.provencher@innovitech.com',
		phone: '438 455-3542',
		location: 'Montréal, Québec (Canada)',
		linkedin: 'https://www.linkedin.com/in/francois-provencher',
		website: 'https://www.sciencesconnexions.com'
	},
	experiences: [
		{
			id: 'exp1',
			title: 'Directeur principal, innovation et technologie',
			company: 'Innovitech',
			location: 'Montréal, Québec (Canada)',
			period: '2024 – Présent',
			description: [
				'Responsable de l\'innovation et des développements technologiques pour l\'ensemble d\'Innovitech (IA, science des données, développement d\'applications spécialisées)',
				'Exécuter les mandats de consultation stratégiques dans tous les domaines couverts par l\'entreprise',
				'Développement des affaires et de partenariats stratégiques',
				'Veille technologique',
				'Développer les méthodologies et outils technologiques'
			],
			technologies: ['IA générative', 'Python', 'PowerBI', 'PowerApps', 'JavaScript']
		},
		{
			id: 'exp2',
			title: 'Consultant expert, stratégie et innovation',
			company: 'Innovitech',
			location: 'Montréal, Québec (Canada)',
			period: '2021 – 2024',
			description: [
				'Exécuter des mandats de consultation en stratégie et gestion de l\'innovation',
				'Drones, mobilité aérienne avancée, études cliniques décentralisées, propulsion hydrogène, plans d\'affaires, développement d\'écosystèmes d\'innovation',
				'Contribuer au développement des affaires',
				'Veille technologique',
				'Développer les méthodologies et outils de consultation'
			],
			achievements: [
				'Direction de plus de 50 projets majeurs en innovation',
				'Développement de méthodologies propriétaires en gestion de l\'innovation'
			]
		},
		{
			id: 'exp3',
			title: 'Directeur, innovation industrielle',
			company: 'Investissement Québec - CRIQ',
			location: 'Québec (Canada)',
			period: '2020 – 2021',
			description: [
				'Créer une nouvelle équipe en innovation industrielle',
				'Développer la feuille de route en innovation d\'Investissement Québec',
				'Cartographier l\'écosystème d\'innovation du Québec (250+ organismes)',
				'Gérer la veille technologique',
				'Travailler avec les équipes de développement des affaires',
				'Gérer une équipe de 18 chercheurs (ingénieurs, informaticiens, physiciens, chimistes, etc.)',
				'Gérer les budgets, les projets, les livrables et la satisfaction des clients'
			],
			achievements: [
				'Création d\'une équipe multidisciplinaire performante',
				'Cartographie complète de l\'écosystème québécois d\'innovation'
			]
		},
		{
			id: 'exp4',
			title: 'Directeur associé à l\'innovation (Innovation Officer)',
			company: 'Pratt & Whitney Canada (P&WC)',
			location: 'Montréal, Québec (Canada)',
			period: '2019 – 2020',
			description: [
				'Créer un bureau d\'innovation portant sur les technologies numériques émergentes',
				'Développer un radar de veille et effectuer la veille technologique',
				'Développer les processus de gestion de l\'innovation',
				'Conseiller la haute direction sur les technologies numériques',
				'Mettre en place des projets d\'innovation avec des startups et des universités'
			]
		},
		{
			id: 'exp5',
			title: 'Directeur des relations d\'affaires (BRM)',
			company: 'Pratt & Whitney Canada (P&WC)',
			location: 'Montréal, Québec (Canada)',
			period: '2017 – 2019',
			description: [
				'Point de contact principal entre l\'ingénierie et les technologies de l\'information (TI)',
				'Gérer le portfolio et le budget TI pour l\'ingénierie',
				'Créer les plans stratégiques de transformation numérique',
				'Développer un incubateur numérique'
			],
			achievements: [
				'Mise en place d\'un incubateur numérique innovant',
				'Transformation numérique de l\'ingénierie'
			]
		},
		{
			id: 'exp6',
			title: 'Directeur, Gestion étendue du cycle de vie du produit',
			company: 'Pratt & Whitney Canada (P&WC)',
			location: 'Montréal, Québec (Canada)',
			period: '2015 – 2017',
			description: [
				'Créer et diriger une organisation de 400 personnes (ingénierie, opérations, après-marché) dans le cadre d\'une transformation numérique',
				'Assurer la livraison et la qualité des services pour l\'ensemble des clients internes',
				'Membre de l\'équipe de direction pour la mise en place d\'une solution PLM (8 000 usagers, 45 applications remplacées, budget ~50 M$)'
			],
			achievements: [
				'Direction d\'une équipe de 400 personnes',
				'Transformation numérique majeure (budget 50 M$)'
			]
		},
		{
			id: 'exp7',
			title: 'Directeur, bureau de collaboration technologique',
			company: 'Pratt & Whitney Canada (P&WC)',
			location: 'Montréal, Québec (Canada)',
			period: '2013 – 2015',
			description: [
				'Gérer le département responsable de la recherche collaborative avec les universités (~10 M$/an)',
				'Administration des contrats de recherche avec les gouvernements',
				'Obtention des crédits d\'impôt à la R et D',
				'Gestion des programmes de recherche collaborative',
				'Développer un programme de recherche de 1 milliard de dollars (prêt de 300 M$)',
				'Membre de plusieurs comités et conseils d\'administration de l\'écosystème'
			],
			achievements: [
				'Développement d\'un programme de recherche de 1 milliard $',
				'Gestion de 10 M$/an en recherche collaborative'
			]
		},
		{
			id: 'exp8',
			title: 'Ingénieur de projet, recherche et technologie',
			company: 'Pratt & Whitney Canada (P&WC)',
			location: 'Montréal, Québec (Canada)',
			period: '2010 – 2012',
			description: [
				'Développer et mettre en place un processus de gestion de technologie basé sur l\'échelle TRL',
				'Créer une base de données pour gérer portfolio de projets de recherche et contrats associés',
				'Gérer des projets de recherche sur différentes technologies'
			]
		},
		{
			id: 'exp9',
			title: 'Architecte de solution et gestionnaire de projet PLM',
			company: 'Pratt & Whitney Canada (P&WC)',
			location: 'Montréal, Québec (Canada)',
			period: '2005 – 2009',
			description: [
				'Piloter la réingénierie du processus de conception des moteurs et gérer les requis associés',
				'Gérer les activités, l\'échéancier et les risques du projet (budget >15 M$)',
				'Gérer une équipe de 30 personnes provenant de plusieurs fournisseurs'
			],
			achievements: ['Gestion d\'équipe multi-fournisseurs de 30 personnes']
		},
		{
			id: 'exp10',
			title: 'Gestionnaire, consultation et meilleures pratiques PLM',
			company: 'Dassault Systèmes',
			location: 'Canada/International',
			period: '1998 – 2005',
			description: [
				'Analyser les besoins des clients et préparer les offres de services',
				'Gérer l\'exécution des projets et s\'assurer de la satisfaction des clients',
				'Gérer une équipe de consultants',
				'Consultant PLM (plusieurs clients, dont Boeing, Bombardier et Chrysler)',
				'Aider les clients à définir leur stratégie et à préparer la justification (business case)',
				'Définir les requis pour l\'amélioration des processus d\'affaires',
				'Gérer le changement organisationnel',
				'Préparer et donner des démonstrations et des formations'
			],
			achievements: ['Travail avec clients majeurs (Boeing, Bombardier, Chrysler)']
		},
		{
			id: 'exp11',
			title: 'Consultant en management de la technologie',
			company: 'MANAVUE INC.',
			location: 'Canada',
			period: '1995 – 1998',
			description: ['Consultation en management de la technologie pour divers clients']
		},
		{
			id: 'exp12',
			title: 'Représentant technique',
			company: 'Les Plastiques Fusionex inc.',
			location: 'Canada',
			period: '1994 – 1995',
			description: ['Support technique et représentation commerciale']
		}
	],
	education: [
		{
			id: 'edu1',
			degree: 'Maîtrise en Management de la technologie (M.Sc.A.)',
			institution: 'École Polytechnique de Montréal',
			location: 'Montréal, Québec',
			period: '1995 – 1999',
			description:
				'Thèse: Analyse comparative des systèmes de conception assistée par ordinateur (CAO)'
		},
		{
			id: 'edu2',
			degree: 'Baccalauréat en génie mécanique, orientation matériaux',
			institution: 'École Polytechnique de Montréal',
			location: 'Montréal, Québec',
			period: '1990 – 1994'
		},
		{
			id: 'edu3',
			degree: 'Diplôme d\'Études collégiales en sciences pures et appliquées',
			institution: 'Collège de Maisonneuve',
			location: 'Montréal, Québec',
			period: '1988 – 1990'
		}
	],
	certifications: [
		{
			id: 'cert1',
			name: 'Business Relationship Management Professional (BRMP®)',
			issuer: 'BRM Institute',
			date: '2017'
		},
		{
			id: 'cert2',
			name: 'SAFe® Agilist - Gestion de projet Agile',
			issuer: 'Scaled Agile',
			date: '2018'
		},
		{
			id: 'cert3',
			name: 'Gestion du changement organisationnel',
			issuer: 'Formation professionnelle',
			date: '2015'
		}
	],
	skills: [
		{
			category: 'Gestion de l\'innovation',
			items: [
				'Stratégie d\'innovation',
				'Gestion de projets complexes',
				'Développement d\'écosystèmes',
				'Veille technologique',
				'Transformation numérique',
				'Gestion du changement'
			]
		},
		{
			category: 'Domaines d\'expertise',
			items: [
				'Aérospatiale',
				'Mobilité aérienne avancée (drones)',
				'Technologies médicales',
				'Intelligence artificielle',
				'Énergies renouvelables',
				'Biotechnologies'
			]
		},
		{
			category: 'Technologies et outils',
			items: [
				'Office 365',
				'PowerApps',
				'PowerBI',
				'Power Query',
				'JavaScript',
				'HTML/CSS',
				'Python',
				'PyTorch',
				'IA générative'
			]
		},
		{
			category: 'Technologies avancées',
			items: [
				'WordPress',
				'cPanel',
				'Linux',
				'Blender',
				'Impression 3D',
				'Arduino',
				'Raspberry PI'
			]
		},
		{
			category: 'Compétences en gestion',
			items: [
				'Leadership d\'équipe (jusqu\'à 400 personnes)',
				'Gestion de budgets (>50 M$)',
				'Développement des affaires',
				'Relations clients',
				'Gestion de portfolio',
				'Planification stratégique'
			]
		}
	],
	languages: [
		{ language: 'Français', level: 'Langue maternelle' },
		{ language: 'Anglais', level: 'Bilingue professionnel' }
	]
};
