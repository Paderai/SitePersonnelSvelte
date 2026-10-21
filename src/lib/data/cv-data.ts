// Structure de données pour le CV
// Données extraites du document Word CV_François-Provencher_Innovitech Sept 2024.docx
//
// Les champs de type Translatable acceptent soit une chaîne (identique dans toutes les langues,
// ex. noms propres), soit un objet { fr, en, es }. Dans les composants, afficher avec {$tl(valeur)}.

import type { Translatable } from '$lib/i18n';

export interface Experience {
	id: string;
	title: Translatable;
	company: string;
	location: Translatable;
	period: Translatable;
	description: Translatable[];
	achievements?: Translatable[];
	technologies?: Translatable[];
}

export interface Education {
	id: string;
	degree: Translatable;
	institution: string;
	location: Translatable;
	period: string;
	description?: Translatable;
}

export interface Certification {
	id: string;
	name: Translatable;
	issuer: Translatable;
	date: string;
	url?: string;
}

export interface Skill {
	category: Translatable;
	items: Translatable[];
}

export interface CVData {
	profile: {
		name: string;
		title: Translatable;
		summary: Translatable;
		email: string;
		phone?: string;
		location: Translatable;
		linkedin?: string;
		website?: string;
		flipboard?: string;
	};
	experiences: Experience[];
	education: Education[];
	certifications: Certification[];
	skills: Skill[];
	languages: {
		language: Translatable;
		level: Translatable;
	}[];
}

const montreal: Translatable = {
	fr: 'Montréal, Québec (Canada)',
	en: 'Montreal, Quebec (Canada)',
	es: 'Montreal, Quebec (Canadá)'
};

// Données du CV de François Provencher
export const cvData: CVData = {
	profile: {
		name: 'François Provencher, Ing., M.Sc.A.',
		title: {
			fr: 'Directeur principal, innovation et technologie',
			en: 'Senior Director, Innovation and Technology',
			es: 'Director principal de innovación y tecnología'
		},
		summary: {
			fr: "Ingénieur et consultant expert avec plus de 30 ans d'expérience en gestion, innovation, aérospatiale, technologies numériques et développement technologique. Expertise approfondie en aérospatiale, technologies émergentes, IA et gestion de projets stratégiques complexes.",
			en: 'Engineer and expert consultant with over 30 years of experience in management, innovation, aerospace, digital technologies and technology development. In-depth expertise in aerospace, emerging technologies, AI and the management of complex strategic projects.',
			es: 'Ingeniero y consultor experto con más de 30 años de experiencia en gestión, innovación, aeroespacial, tecnologías digitales y desarrollo tecnológico. Amplia experiencia en el sector aeroespacial, tecnologías emergentes, IA y gestión de proyectos estratégicos complejos.'
		},
		email: 'francois.provencher@innovitech.com',
		phone: '438 455-3542',
		location: montreal,
		linkedin: 'https://www.linkedin.com/in/francois-provencher',
		website: 'https://www.sciencesconnexions.com',
		flipboard:
			'https://flipboard.com/@SConnexions?from=share&utm_source=flipboard&utm_medium=curator_share'
	},
	experiences: [
		{
			id: 'exp1',
			title: {
				fr: 'Directeur principal, innovation et technologie',
				en: 'Senior Director, Innovation and Technology',
				es: 'Director principal de innovación y tecnología'
			},
			company: 'Innovitech',
			location: montreal,
			period: { fr: '2024 – Présent', en: '2024 – Present', es: '2024 – Actualidad' },
			description: [
				{
					fr: "Responsable de l'innovation et des développements technologiques pour l'ensemble d'Innovitech (IA, science des données, développement d'applications spécialisées)",
					en: 'Responsible for innovation and technology development across Innovitech (AI, data science, specialized application development)',
					es: 'Responsable de la innovación y los desarrollos tecnológicos de todo Innovitech (IA, ciencia de datos, desarrollo de aplicaciones especializadas)'
				},
				{
					fr: "Exécuter les mandats de consultation stratégiques dans tous les domaines couverts par l'entreprise",
					en: "Deliver strategic consulting mandates in all of the firm's areas of practice",
					es: 'Ejecutar mandatos de consultoría estratégica en todos los ámbitos que cubre la empresa'
				},
				{
					fr: 'Développement des affaires et de partenariats stratégiques',
					en: 'Business development and strategic partnerships',
					es: 'Desarrollo de negocios y de alianzas estratégicas'
				},
				{ fr: 'Veille technologique', en: 'Technology watch', es: 'Vigilancia tecnológica' },
				{
					fr: 'Développer les méthodologies et outils technologiques',
					en: 'Develop methodologies and technology tools',
					es: 'Desarrollar metodologías y herramientas tecnológicas'
				}
			],
			technologies: [
				{ fr: 'IA générative', en: 'Generative AI', es: 'IA generativa' },
				'Python',
				'PowerBI',
				'PowerApps',
				'JavaScript'
			]
		},
		{
			id: 'exp2',
			title: {
				fr: 'Consultant expert, stratégie et innovation',
				en: 'Expert Consultant, Strategy and Innovation',
				es: 'Consultor experto en estrategia e innovación'
			},
			company: 'Innovitech',
			location: montreal,
			period: '2021 – 2024',
			description: [
				{
					fr: "Exécuter des mandats de consultation en stratégie et gestion de l'innovation",
					en: 'Deliver consulting mandates in strategy and innovation management',
					es: 'Ejecutar mandatos de consultoría en estrategia y gestión de la innovación'
				},
				{
					fr: "Drones, mobilité aérienne avancée, études cliniques décentralisées, propulsion hydrogène, plans d'affaires, développement d'écosystèmes d'innovation",
					en: 'Drones, advanced air mobility, decentralized clinical trials, hydrogen propulsion, business plans, innovation ecosystem development',
					es: 'Drones, movilidad aérea avanzada, ensayos clínicos descentralizados, propulsión por hidrógeno, planes de negocio, desarrollo de ecosistemas de innovación'
				},
				{
					fr: 'Contribuer au développement des affaires',
					en: 'Contribute to business development',
					es: 'Contribuir al desarrollo de negocios'
				},
				{ fr: 'Veille technologique', en: 'Technology watch', es: 'Vigilancia tecnológica' },
				{
					fr: 'Développer les méthodologies et outils de consultation',
					en: 'Develop consulting methodologies and tools',
					es: 'Desarrollar metodologías y herramientas de consultoría'
				}
			],
			achievements: [
				{
					fr: 'Direction de plus de 50 projets majeurs en innovation',
					en: 'Led more than 50 major innovation projects',
					es: 'Dirección de más de 50 proyectos importantes de innovación'
				},
				{
					fr: "Développement de méthodologies propriétaires en gestion de l'innovation",
					en: 'Developed proprietary innovation management methodologies',
					es: 'Desarrollo de metodologías propias de gestión de la innovación'
				}
			]
		},
		{
			id: 'exp3',
			title: {
				fr: 'Directeur, innovation industrielle',
				en: 'Director, Industrial Innovation',
				es: 'Director de innovación industrial'
			},
			company: 'Investissement Québec - CRIQ',
			location: { fr: 'Québec (Canada)', en: 'Quebec City (Canada)', es: 'Quebec (Canadá)' },
			period: '2020 – 2021',
			description: [
				{
					fr: 'Créer une nouvelle équipe en innovation industrielle',
					en: 'Build a new industrial innovation team',
					es: 'Crear un nuevo equipo de innovación industrial'
				},
				{
					fr: "Développer la feuille de route en innovation d'Investissement Québec",
					en: "Develop Investissement Québec's innovation roadmap",
					es: 'Desarrollar la hoja de ruta de innovación de Investissement Québec'
				},
				{
					fr: "Cartographier l'écosystème d'innovation du Québec (250+ organismes)",
					en: "Map Quebec's innovation ecosystem (250+ organizations)",
					es: 'Cartografiar el ecosistema de innovación de Quebec (más de 250 organismos)'
				},
				{
					fr: 'Gérer la veille technologique',
					en: 'Manage technology watch',
					es: 'Gestionar la vigilancia tecnológica'
				},
				{
					fr: 'Travailler avec les équipes de développement des affaires',
					en: 'Work with business development teams',
					es: 'Trabajar con los equipos de desarrollo de negocios'
				},
				{
					fr: 'Gérer une équipe de 18 chercheurs (ingénieurs, informaticiens, physiciens, chimistes, etc.)',
					en: 'Manage a team of 18 researchers (engineers, computer scientists, physicists, chemists, etc.)',
					es: 'Dirigir un equipo de 18 investigadores (ingenieros, informáticos, físicos, químicos, etc.)'
				},
				{
					fr: 'Gérer les budgets, les projets, les livrables et la satisfaction des clients',
					en: 'Manage budgets, projects, deliverables and client satisfaction',
					es: 'Gestionar presupuestos, proyectos, entregables y la satisfacción de los clientes'
				}
			],
			achievements: [
				{
					fr: "Création d'une équipe multidisciplinaire performante",
					en: 'Built a high-performing multidisciplinary team',
					es: 'Creación de un equipo multidisciplinario de alto rendimiento'
				},
				{
					fr: "Cartographie complète de l'écosystème québécois d'innovation",
					en: "Complete map of Quebec's innovation ecosystem",
					es: 'Cartografía completa del ecosistema de innovación de Quebec'
				}
			]
		},
		{
			id: 'exp4',
			title: {
				fr: "Directeur associé à l'innovation (Innovation Officer)",
				en: 'Associate Director, Innovation (Innovation Officer)',
				es: 'Director asociado de innovación (Innovation Officer)'
			},
			company: 'Pratt & Whitney Canada (P&WC)',
			location: montreal,
			period: '2019 – 2020',
			description: [
				{
					fr: "Créer un bureau d'innovation portant sur les technologies numériques émergentes",
					en: 'Create an innovation office focused on emerging digital technologies',
					es: 'Crear una oficina de innovación centrada en las tecnologías digitales emergentes'
				},
				{
					fr: 'Développer un radar de veille et effectuer la veille technologique',
					en: 'Develop a technology radar and carry out technology watch',
					es: 'Desarrollar un radar de vigilancia y realizar la vigilancia tecnológica'
				},
				{
					fr: "Développer les processus de gestion de l'innovation",
					en: 'Develop innovation management processes',
					es: 'Desarrollar los procesos de gestión de la innovación'
				},
				{
					fr: 'Conseiller la haute direction sur les technologies numériques',
					en: 'Advise senior management on digital technologies',
					es: 'Asesorar a la alta dirección sobre las tecnologías digitales'
				},
				{
					fr: "Mettre en place des projets d'innovation avec des startups et des universités",
					en: 'Set up innovation projects with startups and universities',
					es: 'Poner en marcha proyectos de innovación con startups y universidades'
				}
			]
		},
		{
			id: 'exp5',
			title: {
				fr: "Directeur des relations d'affaires (BRM)",
				en: 'Business Relationship Manager (BRM)',
				es: 'Director de relaciones de negocio (BRM)'
			},
			company: 'Pratt & Whitney Canada (P&WC)',
			location: montreal,
			period: '2017 – 2019',
			description: [
				{
					fr: "Point de contact principal entre l'ingénierie et les technologies de l'information (TI)",
					en: 'Main point of contact between Engineering and Information Technology (IT)',
					es: 'Principal punto de contacto entre ingeniería y tecnologías de la información (TI)'
				},
				{
					fr: "Gérer le portfolio et le budget TI pour l'ingénierie",
					en: 'Manage the IT portfolio and budget for Engineering',
					es: 'Gestionar la cartera y el presupuesto de TI para ingeniería'
				},
				{
					fr: 'Créer les plans stratégiques de transformation numérique',
					en: 'Create strategic digital transformation plans',
					es: 'Elaborar los planes estratégicos de transformación digital'
				},
				{
					fr: 'Développer un incubateur numérique',
					en: 'Develop a digital incubator',
					es: 'Desarrollar una incubadora digital'
				}
			],
			achievements: [
				{
					fr: "Mise en place d'un incubateur numérique innovant",
					en: 'Launched an innovative digital incubator',
					es: 'Puesta en marcha de una incubadora digital innovadora'
				},
				{
					fr: "Transformation numérique de l'ingénierie",
					en: 'Digital transformation of Engineering',
					es: 'Transformación digital de la ingeniería'
				}
			]
		},
		{
			id: 'exp6',
			title: {
				fr: 'Directeur, Gestion étendue du cycle de vie du produit',
				en: 'Director, Extended Product Lifecycle Management',
				es: 'Director de gestión ampliada del ciclo de vida del producto'
			},
			company: 'Pratt & Whitney Canada (P&WC)',
			location: montreal,
			period: '2015 – 2017',
			description: [
				{
					fr: "Créer et diriger une organisation de 400 personnes (ingénierie, opérations, après-marché) dans le cadre d'une transformation numérique",
					en: 'Create and lead a 400-person organization (engineering, operations, aftermarket) as part of a digital transformation',
					es: 'Crear y dirigir una organización de 400 personas (ingeniería, operaciones, posventa) en el marco de una transformación digital'
				},
				{
					fr: "Assurer la livraison et la qualité des services pour l'ensemble des clients internes",
					en: 'Ensure service delivery and quality for all internal clients',
					es: 'Garantizar la entrega y la calidad de los servicios para todos los clientes internos'
				},
				{
					fr: "Membre de l'équipe de direction pour la mise en place d'une solution PLM (8 000 usagers, 45 applications remplacées, budget ~50 M$)",
					en: 'Member of the leadership team for the deployment of a PLM solution (8,000 users, 45 applications replaced, ~$50M budget)',
					es: 'Miembro del equipo directivo para la implantación de una solución PLM (8000 usuarios, 45 aplicaciones sustituidas, presupuesto de ~50 M$)'
				}
			],
			achievements: [
				{
					fr: "Direction d'une équipe de 400 personnes",
					en: 'Led a team of 400 people',
					es: 'Dirección de un equipo de 400 personas'
				},
				{
					fr: 'Transformation numérique majeure (budget 50 M$)',
					en: 'Major digital transformation ($50M budget)',
					es: 'Gran transformación digital (presupuesto de 50 M$)'
				}
			]
		},
		{
			id: 'exp7',
			title: {
				fr: 'Directeur, bureau de collaboration technologique',
				en: 'Director, Technology Collaboration Office',
				es: 'Director de la oficina de colaboración tecnológica'
			},
			company: 'Pratt & Whitney Canada (P&WC)',
			location: montreal,
			period: '2013 – 2015',
			description: [
				{
					fr: 'Gérer le département responsable de la recherche collaborative avec les universités (~10 M$/an)',
					en: 'Manage the department responsible for collaborative research with universities (~$10M/year)',
					es: 'Dirigir el departamento responsable de la investigación colaborativa con universidades (~10 M$/año)'
				},
				{
					fr: 'Administration des contrats de recherche avec les gouvernements',
					en: 'Administer research contracts with governments',
					es: 'Administración de los contratos de investigación con los gobiernos'
				},
				{
					fr: "Obtention des crédits d'impôt à la R et D",
					en: 'Secure R&D tax credits',
					es: 'Obtención de créditos fiscales de I+D'
				},
				{
					fr: 'Gestion des programmes de recherche collaborative',
					en: 'Manage collaborative research programs',
					es: 'Gestión de los programas de investigación colaborativa'
				},
				{
					fr: 'Développer un programme de recherche de 1 milliard de dollars (prêt de 300 M$)',
					en: 'Develop a $1 billion research program ($300M loan)',
					es: 'Desarrollar un programa de investigación de 1000 millones de dólares (préstamo de 300 M$)'
				},
				{
					fr: "Membre de plusieurs comités et conseils d'administration de l'écosystème",
					en: 'Member of several committees and boards of directors within the ecosystem',
					es: 'Miembro de varios comités y consejos de administración del ecosistema'
				}
			],
			achievements: [
				{
					fr: "Développement d'un programme de recherche de 1 milliard $",
					en: 'Developed a $1 billion research program',
					es: 'Desarrollo de un programa de investigación de 1000 millones de dólares'
				},
				{
					fr: 'Gestion de 10 M$/an en recherche collaborative',
					en: 'Managed $10M/year in collaborative research',
					es: 'Gestión de 10 M$/año en investigación colaborativa'
				}
			]
		},
		{
			id: 'exp8',
			title: {
				fr: 'Ingénieur de projet, recherche et technologie',
				en: 'Project Engineer, Research and Technology',
				es: 'Ingeniero de proyecto, investigación y tecnología'
			},
			company: 'Pratt & Whitney Canada (P&WC)',
			location: montreal,
			period: '2010 – 2012',
			description: [
				{
					fr: "Développer et mettre en place un processus de gestion de technologie basé sur l'échelle TRL",
					en: 'Develop and implement a technology management process based on the TRL scale',
					es: 'Desarrollar e implantar un proceso de gestión tecnológica basado en la escala TRL'
				},
				{
					fr: 'Créer une base de données pour gérer portfolio de projets de recherche et contrats associés',
					en: 'Create a database to manage the research project portfolio and related contracts',
					es: 'Crear una base de datos para gestionar la cartera de proyectos de investigación y sus contratos'
				},
				{
					fr: 'Gérer des projets de recherche sur différentes technologies',
					en: 'Manage research projects on various technologies',
					es: 'Gestionar proyectos de investigación sobre diversas tecnologías'
				}
			]
		},
		{
			id: 'exp9',
			title: {
				fr: 'Architecte de solution et gestionnaire de projet PLM',
				en: 'Solution Architect and PLM Project Manager',
				es: 'Arquitecto de soluciones y jefe de proyecto PLM'
			},
			company: 'Pratt & Whitney Canada (P&WC)',
			location: montreal,
			period: '2005 – 2009',
			description: [
				{
					fr: 'Piloter la réingénierie du processus de conception des moteurs et gérer les requis associés',
					en: 'Lead the re-engineering of the engine design process and manage the related requirements',
					es: 'Dirigir la reingeniería del proceso de diseño de motores y gestionar los requisitos asociados'
				},
				{
					fr: "Gérer les activités, l'échéancier et les risques du projet (budget >15 M$)",
					en: 'Manage project activities, schedule and risks (budget >$15M)',
					es: 'Gestionar las actividades, el calendario y los riesgos del proyecto (presupuesto >15 M$)'
				},
				{
					fr: 'Gérer une équipe de 30 personnes provenant de plusieurs fournisseurs',
					en: 'Manage a team of 30 people from several vendors',
					es: 'Dirigir un equipo de 30 personas procedentes de varios proveedores'
				}
			],
			achievements: [
				{
					fr: "Gestion d'équipe multi-fournisseurs de 30 personnes",
					en: 'Managed a 30-person multi-vendor team',
					es: 'Gestión de un equipo multiproveedor de 30 personas'
				}
			]
		},
		{
			id: 'exp10',
			title: {
				fr: 'Gestionnaire, consultation et meilleures pratiques PLM',
				en: 'Manager, PLM Consulting and Best Practices',
				es: 'Gerente de consultoría y mejores prácticas PLM'
			},
			company: 'Dassault Systèmes',
			location: { fr: 'Canada/International', en: 'Canada/International', es: 'Canadá/Internacional' },
			period: '1998 – 2005',
			description: [
				{
					fr: 'Analyser les besoins des clients et préparer les offres de services',
					en: 'Analyze client needs and prepare service proposals',
					es: 'Analizar las necesidades de los clientes y preparar las ofertas de servicios'
				},
				{
					fr: "Gérer l'exécution des projets et s'assurer de la satisfaction des clients",
					en: 'Manage project execution and ensure client satisfaction',
					es: 'Gestionar la ejecución de los proyectos y garantizar la satisfacción de los clientes'
				},
				{
					fr: 'Gérer une équipe de consultants',
					en: 'Manage a team of consultants',
					es: 'Dirigir un equipo de consultores'
				},
				{
					fr: 'Consultant PLM (plusieurs clients, dont Boeing, Bombardier et Chrysler)',
					en: 'PLM consultant (several clients, including Boeing, Bombardier and Chrysler)',
					es: 'Consultor PLM (varios clientes, entre ellos Boeing, Bombardier y Chrysler)'
				},
				{
					fr: 'Aider les clients à définir leur stratégie et à préparer la justification (business case)',
					en: 'Help clients define their strategy and prepare the business case',
					es: 'Ayudar a los clientes a definir su estrategia y preparar la justificación (business case)'
				},
				{
					fr: "Définir les requis pour l'amélioration des processus d'affaires",
					en: 'Define requirements for business process improvement',
					es: 'Definir los requisitos para la mejora de los procesos de negocio'
				},
				{
					fr: 'Gérer le changement organisationnel',
					en: 'Manage organizational change',
					es: 'Gestionar el cambio organizacional'
				},
				{
					fr: 'Préparer et donner des démonstrations et des formations',
					en: 'Prepare and deliver demonstrations and training',
					es: 'Preparar e impartir demostraciones y formaciones'
				}
			],
			achievements: [
				{
					fr: 'Travail avec clients majeurs (Boeing, Bombardier, Chrysler)',
					en: 'Worked with major clients (Boeing, Bombardier, Chrysler)',
					es: 'Trabajo con grandes clientes (Boeing, Bombardier, Chrysler)'
				}
			]
		},
		{
			id: 'exp11',
			title: {
				fr: 'Consultant en management de la technologie',
				en: 'Technology Management Consultant',
				es: 'Consultor en gestión de la tecnología'
			},
			company: 'MANAVUE INC.',
			location: { fr: 'Canada', en: 'Canada', es: 'Canadá' },
			period: '1995 – 1998',
			description: [
				{
					fr: 'Consultation en management de la technologie pour divers clients',
					en: 'Technology management consulting for various clients',
					es: 'Consultoría en gestión de la tecnología para diversos clientes'
				}
			]
		},
		{
			id: 'exp12',
			title: {
				fr: 'Représentant technique',
				en: 'Technical Representative',
				es: 'Representante técnico'
			},
			company: 'Les Plastiques Fusionex inc.',
			location: { fr: 'Canada', en: 'Canada', es: 'Canadá' },
			period: '1994 – 1995',
			description: [
				{
					fr: 'Support technique et représentation commerciale',
					en: 'Technical support and sales representation',
					es: 'Soporte técnico y representación comercial'
				}
			]
		}
	],
	education: [
		{
			id: 'edu1',
			degree: {
				fr: 'Maîtrise en Management de la technologie (M.Sc.A.)',
				en: "Master's in Technology Management (M.A.Sc.)",
				es: 'Maestría en Gestión de la Tecnología (M.Sc.A.)'
			},
			institution: 'École Polytechnique de Montréal',
			location: { fr: 'Montréal, Québec', en: 'Montreal, Quebec', es: 'Montreal, Quebec' },
			period: '1995 – 1999',
			description: {
				fr: 'Thèse: Analyse comparative des systèmes de conception assistée par ordinateur (CAO)',
				en: 'Thesis: Comparative analysis of computer-aided design (CAD) systems',
				es: 'Tesis: Análisis comparativo de los sistemas de diseño asistido por ordenador (CAD)'
			}
		},
		{
			id: 'edu2',
			degree: {
				fr: 'Baccalauréat en génie mécanique, orientation matériaux',
				en: "Bachelor's in Mechanical Engineering, Materials option",
				es: 'Licenciatura en Ingeniería Mecánica, orientación en materiales'
			},
			institution: 'École Polytechnique de Montréal',
			location: { fr: 'Montréal, Québec', en: 'Montreal, Quebec', es: 'Montreal, Quebec' },
			period: '1990 – 1994'
		},
		{
			id: 'edu3',
			degree: {
				fr: "Diplôme d'Études collégiales en sciences pures et appliquées",
				en: 'College Diploma (DEC) in Pure and Applied Sciences',
				es: 'Diploma de estudios colegiales (DEC) en ciencias puras y aplicadas'
			},
			institution: 'Collège de Maisonneuve',
			location: { fr: 'Montréal, Québec', en: 'Montreal, Quebec', es: 'Montreal, Quebec' },
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
			name: {
				fr: 'SAFe® Agilist - Gestion de projet Agile',
				en: 'SAFe® Agilist - Agile Project Management',
				es: 'SAFe® Agilist - Gestión ágil de proyectos'
			},
			issuer: 'Scaled Agile',
			date: '2018'
		},
		{
			id: 'cert3',
			name: {
				fr: 'Gestion du changement organisationnel',
				en: 'Organizational Change Management',
				es: 'Gestión del cambio organizacional'
			},
			issuer: {
				fr: 'Formation professionnelle',
				en: 'Professional training',
				es: 'Formación profesional'
			},
			date: '2015'
		}
	],
	skills: [
		{
			category: {
				fr: "Gestion de l'innovation",
				en: 'Innovation Management',
				es: 'Gestión de la innovación'
			},
			items: [
				{
					fr: "Stratégie d'innovation",
					en: 'Innovation strategy',
					es: 'Estrategia de innovación'
				},
				{
					fr: 'Gestion de projets complexes',
					en: 'Complex project management',
					es: 'Gestión de proyectos complejos'
				},
				{
					fr: "Développement d'écosystèmes",
					en: 'Ecosystem development',
					es: 'Desarrollo de ecosistemas'
				},
				{ fr: 'Veille technologique', en: 'Technology watch', es: 'Vigilancia tecnológica' },
				{
					fr: 'Transformation numérique',
					en: 'Digital transformation',
					es: 'Transformación digital'
				},
				{ fr: 'Gestion du changement', en: 'Change management', es: 'Gestión del cambio' }
			]
		},
		{
			category: {
				fr: "Domaines d'expertise",
				en: 'Areas of Expertise',
				es: 'Áreas de especialización'
			},
			items: [
				{ fr: 'Aérospatiale', en: 'Aerospace', es: 'Aeroespacial' },
				{
					fr: 'Mobilité aérienne avancée (drones)',
					en: 'Advanced air mobility (drones)',
					es: 'Movilidad aérea avanzada (drones)'
				},
				{
					fr: 'Technologies médicales',
					en: 'Medical technologies',
					es: 'Tecnologías médicas'
				},
				{
					fr: 'Intelligence artificielle',
					en: 'Artificial intelligence',
					es: 'Inteligencia artificial'
				},
				{
					fr: 'Énergies renouvelables',
					en: 'Renewable energy',
					es: 'Energías renovables'
				},
				{ fr: 'Biotechnologies', en: 'Biotechnology', es: 'Biotecnología' }
			]
		},
		{
			category: {
				fr: 'Technologies et outils',
				en: 'Technologies and Tools',
				es: 'Tecnologías y herramientas'
			},
			items: [
				'Office 365',
				'PowerApps',
				'PowerBI',
				'Power Query',
				'JavaScript',
				'HTML/CSS',
				'Python',
				'PyTorch',
				{ fr: 'IA générative', en: 'Generative AI', es: 'IA generativa' },
				'Git/GitHub',
				'JIRA/Confluence',
				'SharePoint',
				'ERP/CRM (Dynamics, SAP, Oracle)',
				'PLM (Dassault Systèmes)',
				{
					fr: 'Gestion de projet (MS Project, Smartsheet, MS Planner, Trello, MS Teams)',
					en: 'Project management (MS Project, Smartsheet, MS Planner, Trello, MS Teams)',
					es: 'Gestión de proyectos (MS Project, Smartsheet, MS Planner, Trello, MS Teams)'
				},
				{
					fr: 'Modélisation 3D (Blender, SolidWorks, CATIA)',
					en: '3D modeling (Blender, SolidWorks, CATIA)',
					es: 'Modelado 3D (Blender, SolidWorks, CATIA)'
				},
				{
					fr: 'Analyse de données (Excel, R, MATLAB)',
					en: 'Data analysis (Excel, R, MATLAB)',
					es: 'Análisis de datos (Excel, R, MATLAB)'
				},
				{
					fr: 'Gestion de la relation client (CRM)',
					en: 'Customer relationship management (CRM)',
					es: 'Gestión de la relación con el cliente (CRM)'
				},
				{
					fr: 'Gestion du cycle de vie des produits (PLM)',
					en: 'Product lifecycle management (PLM)',
					es: 'Gestión del ciclo de vida del producto (PLM)'
				},
				{
					fr: 'Développement web (front-end et back-end)',
					en: 'Web development (front-end and back-end)',
					es: 'Desarrollo web (front-end y back-end)'
				},
				{
					fr: 'Impression 3D et prototypage rapide',
					en: '3D printing and rapid prototyping',
					es: 'Impresión 3D y prototipado rápido'
				},
				{
					fr: 'IoT (Internet des objets)',
					en: 'IoT (Internet of Things)',
					es: 'IoT (Internet de las cosas)'
				},
				{
					fr: 'Automatisation (RPA, macros VBA)',
					en: 'Automation (RPA, VBA macros)',
					es: 'Automatización (RPA, macros VBA)'
				},
				'Cloud computing (Azure, AWS, Google Cloud)',
				{
					fr: 'Cybersécurité de base',
					en: 'Cybersecurity fundamentals',
					es: 'Ciberseguridad básica'
				},
				{
					fr: 'Gestion de bases de données (SQL, NoSQL)',
					en: 'Database management (SQL, NoSQL)',
					es: 'Gestión de bases de datos (SQL, NoSQL)'
				}
			]
		},
		{
			category: {
				fr: 'Technologies avancées',
				en: 'Advanced Technologies',
				es: 'Tecnologías avanzadas'
			},
			items: [
				'WordPress',
				'cPanel',
				'Linux',
				'Blender',
				{ fr: 'Impression 3D', en: '3D printing', es: 'Impresión 3D' },
				'Arduino',
				'Raspberry PI'
			]
		},
		{
			category: {
				fr: 'Compétences en gestion',
				en: 'Management Skills',
				es: 'Competencias de gestión'
			},
			items: [
				{
					fr: "Leadership d'équipe (jusqu'à 400 personnes)",
					en: 'Team leadership (up to 400 people)',
					es: 'Liderazgo de equipos (hasta 400 personas)'
				},
				{
					fr: 'Gestion de budgets (>50 M$)',
					en: 'Budget management (>$50M)',
					es: 'Gestión de presupuestos (>50 M$)'
				},
				{
					fr: 'Développement des affaires',
					en: 'Business development',
					es: 'Desarrollo de negocios'
				},
				{ fr: 'Relations clients', en: 'Client relations', es: 'Relaciones con clientes' },
				{ fr: 'Gestion de portfolio', en: 'Portfolio management', es: 'Gestión de carteras' },
				{
					fr: 'Planification stratégique',
					en: 'Strategic planning',
					es: 'Planificación estratégica'
				}
			]
		}
	],
	languages: [
		{
			language: { fr: 'Français', en: 'French', es: 'Francés' },
			level: { fr: 'Langue maternelle', en: 'Native language', es: 'Lengua materna' }
		},
		{
			language: { fr: 'Anglais', en: 'English', es: 'Inglés' },
			level: {
				fr: 'Bilingue professionnel',
				en: 'Professional bilingual proficiency',
				es: 'Bilingüe profesional'
			}
		}
	]
};
