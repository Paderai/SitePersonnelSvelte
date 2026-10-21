// Structure de données pour les réalisations/projets
// Données extraites du document Word Réalisations_FP_Innovitech 2025-06-10b.docx
//
// Les champs de type Translatable acceptent soit une chaîne (identique dans toutes les langues),
// soit un objet { fr, en, es }. Dans les composants, afficher avec {$tl(valeur)}.

import type { Translatable } from '$lib/i18n';

export interface Project {
	id: string;
	title: Translatable;
	client?: Translatable;
	category: string;
	year: string;
	period?: string;
	description: Translatable;
	longDescription?: Translatable;
	achievements?: Translatable[];
	technologies?: Translatable[];
	role?: string;
	teamSize?: string;
	imageUrl?: string;
	url?: string;
	status: 'completed' | 'in-progress' | 'planned';
}

export interface ProjectCategory {
	id: string;
	name: Translatable;
	description: Translatable;
}

// Catégories de projets (les libellés affichés viennent de achievements.categories.* dans les fichiers de langue)
export const projectCategories: ProjectCategory[] = [
	{
		id: 'aerospace',
		name: { fr: 'Aérospatiale', en: 'Aerospace', es: 'Aeroespacial' },
		description: {
			fr: 'Projets en aérospatiale et mobilité aérienne avancée',
			en: 'Aerospace and advanced air mobility projects',
			es: 'Proyectos aeroespaciales y de movilidad aérea avanzada'
		}
	},
	{
		id: 'drones',
		name: { fr: 'Drones et MAA', en: 'Drones and AAM', es: 'Drones y MAA' },
		description: {
			fr: 'Drones et mobilité aérienne avancée',
			en: 'Drones and advanced air mobility',
			es: 'Drones y movilidad aérea avanzada'
		}
	},
	{
		id: 'health',
		name: { fr: 'Santé', en: 'Health', es: 'Salud' },
		description: {
			fr: 'Technologies médicales et santé',
			en: 'Medical technologies and health',
			es: 'Tecnologías médicas y salud'
		}
	},
	{
		id: 'innovation-ecosystems',
		name: {
			fr: "Écosystèmes d'innovation",
			en: 'Innovation ecosystems',
			es: 'Ecosistemas de innovación'
		},
		description: {
			fr: "Lieux et écosystèmes d'innovation",
			en: 'Innovation hubs and ecosystems',
			es: 'Espacios y ecosistemas de innovación'
		}
	},
	{
		id: 'energy',
		name: { fr: 'Énergie', en: 'Energy', es: 'Energía' },
		description: {
			fr: 'Énergies renouvelables et développement durable',
			en: 'Renewable energy and sustainable development',
			es: 'Energías renovables y desarrollo sostenible'
		}
	},
	{
		id: 'digital-ai',
		name: { fr: 'Numérique et IA', en: 'Digital and AI', es: 'Digital e IA' },
		description: {
			fr: 'Technologies numériques et intelligence artificielle',
			en: 'Digital technologies and artificial intelligence',
			es: 'Tecnologías digitales e inteligencia artificial'
		}
	},
	{
		id: 'tools',
		name: {
			fr: 'Outils et méthodologies',
			en: 'Tools and methodologies',
			es: 'Herramientas y metodologías'
		},
		description: {
			fr: "Développement d'outils internes",
			en: 'Internal tool development',
			es: 'Desarrollo de herramientas internas'
		}
	}
];

// Données des projets de François Provencher chez Innovitech
export const projectsData: Project[] = [
	// AÉROSPATIALE
	{
		id: 'proj001',
		title: {
			fr: 'Conteneur instrumenté pour transport de biomolécules par drone',
			en: 'Instrumented container for transporting biomolecules by drone',
			es: 'Contenedor instrumentado para el transporte de biomoléculas por dron'
		},
		category: 'aerospace',
		year: '2024',
		description: {
			fr: "Conception, rédaction d'une demande de financement et développement d'un conteneur instrumenté pour le transport de biomolécules fragiles (ADN, ARN, etc.) par drone.",
			en: 'Design, funding application writing and development of an instrumented container for transporting fragile biomolecules (DNA, RNA, etc.) by drone.',
			es: 'Diseño, redacción de una solicitud de financiación y desarrollo de un contenedor instrumentado para el transporte de biomoléculas frágiles (ADN, ARN, etc.) por dron.'
		},
		achievements: [
			{
				fr: 'Ingénierie système complète',
				en: 'Complete systems engineering',
				es: 'Ingeniería de sistemas completa'
			},
			{ fr: 'Gestion de projet', en: 'Project management', es: 'Gestión de proyectos' },
			{ fr: 'Simulations avancées', en: 'Advanced simulations', es: 'Simulaciones avanzadas' },
			{
				fr: 'Développement du logiciel embarqué',
				en: 'Embedded software development',
				es: 'Desarrollo del software embarcado'
			}
		],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj002',
		title: {
			fr: "Stratégie d'innovation pour entreprise de services en fabrication",
			en: 'Innovation strategy for a manufacturing services company',
			es: 'Estrategia de innovación para una empresa de servicios de fabricación'
		},
		category: 'aerospace',
		year: '2024',
		description: {
			fr: "Élaboration d'une stratégie d'innovation pour une entreprise de services en fabrication œuvrant dans les secteurs de l'aérospatiale, de la défense et du transport terrestre.",
			en: 'Development of an innovation strategy for a manufacturing services company operating in the aerospace, defence and ground transportation sectors.',
			es: 'Elaboración de una estrategia de innovación para una empresa de servicios de fabricación que opera en los sectores aeroespacial, de defensa y de transporte terrestre.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj003',
		title: {
			fr: 'Quantification des impacts environnementaux - Consortium de recherche',
			en: 'Quantifying environmental impacts - Research consortium',
			es: 'Cuantificación de los impactos ambientales - Consorcio de investigación'
		},
		category: 'aerospace',
		year: '2024',
		description: {
			fr: "Quantification des impacts environnementaux des 35 vecteurs identifiés dans la feuille de route en aérospatiale d'un consortium de recherche et d'innovation en aérospatiale.",
			en: 'Quantification of the environmental impacts of the 35 vectors identified in the aerospace roadmap of an aerospace research and innovation consortium.',
			es: 'Cuantificación de los impactos ambientales de los 35 vectores identificados en la hoja de ruta aeroespacial de un consorcio de investigación e innovación aeroespacial.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj004',
		title: {
			fr: "Livre blanc - Forum d'innovation en aérospatiale 2024",
			en: 'White paper - 2024 Aerospace Innovation Forum',
			es: 'Libro blanco - Foro de Innovación Aeroespacial 2024'
		},
		category: 'aerospace',
		year: '2024',
		client: {
			fr: 'Grappe industrielle aérospatiale',
			en: 'Aerospace industry cluster',
			es: 'Clúster industrial aeroespacial'
		},
		description: {
			fr: "Rédaction du Livre blanc pour le Forum d'innovation en aérospatiale 2024 organisé par une grappe industrielle aérospatiale.",
			en: 'Writing of the white paper for the 2024 Aerospace Innovation Forum organized by an aerospace industry cluster.',
			es: 'Redacción del libro blanco para el Foro de Innovación Aeroespacial 2024 organizado por un clúster industrial aeroespacial.'
		},
		role: 'Support (S)',
		status: 'completed'
	},
	{
		id: 'proj005',
		title: {
			fr: "Livre blanc - Conférence d'innovation en aérospatiale 2024",
			en: 'White paper - 2024 Aerospace Innovation Conference',
			es: 'Libro blanco - Conferencia de Innovación Aeroespacial 2024'
		},
		category: 'aerospace',
		year: '2024',
		description: {
			fr: "Rédaction du Livre blanc pour une conférence d'innovation en aérospatiale et défense 2024.",
			en: 'Writing of the white paper for a 2024 aerospace and defence innovation conference.',
			es: 'Redacción del libro blanco para una conferencia de innovación aeroespacial y de defensa 2024.'
		},
		role: 'Support (S)',
		status: 'completed'
	},
	{
		id: 'proj006',
		title: {
			fr: "Étude d'opportunité - Laboratoire acoustique aérospatiale",
			en: 'Opportunity study - Aerospace acoustics laboratory',
			es: 'Estudio de oportunidad - Laboratorio de acústica aeroespacial'
		},
		category: 'aerospace',
		year: '2023',
		description: {
			fr: "Réalisation d'une étude d'opportunité en vue de la création d'un laboratoire acoustique dédié à l'aérospatiale.",
			en: 'Opportunity study for the creation of an acoustics laboratory dedicated to aerospace.',
			es: 'Realización de un estudio de oportunidad para la creación de un laboratorio de acústica dedicado al sector aeroespacial.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj007',
		title: {
			fr: "Cartographie de l'écosystème aérospatial de l'Ontario",
			en: "Mapping Ontario's aerospace ecosystem",
			es: 'Cartografía del ecosistema aeroespacial de Ontario'
		},
		category: 'aerospace',
		year: '2023',
		description: {
			fr: "Cartographie complète de l'écosystème aérospatial de l'Ontario.",
			en: "Complete mapping of Ontario's aerospace ecosystem.",
			es: 'Cartografía completa del ecosistema aeroespacial de Ontario.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj008',
		title: {
			fr: 'Appel à projets - Aérospatiale durable en Ontario',
			en: 'Call for projects - Sustainable aerospace in Ontario',
			es: 'Convocatoria de proyectos - Aeroespacial sostenible en Ontario'
		},
		category: 'aerospace',
		year: '2023',
		description: {
			fr: "Soutien à la mise en place et à la gestion d'un appel à projets pour l'aérospatiale durable en Ontario.",
			en: 'Support for setting up and managing a call for projects on sustainable aerospace in Ontario.',
			es: 'Apoyo a la puesta en marcha y gestión de una convocatoria de proyectos sobre aeroespacial sostenible en Ontario.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj009',
		title: {
			fr: 'Plateforme pancanadienne - Propulsion hybride électrique et hydrogène',
			en: 'Pan-Canadian platform - Hybrid-electric and hydrogen propulsion',
			es: 'Plataforma pancanadiense - Propulsión híbrida eléctrica y de hidrógeno'
		},
		category: 'aerospace',
		year: '2023',
		description: {
			fr: "Appui à la création d'une plateforme pancanadienne de recherche sur la propulsion hybride électrique et hydrogène dans l'aviation.",
			en: 'Support for the creation of a pan-Canadian research platform on hybrid-electric and hydrogen propulsion in aviation.',
			es: 'Apoyo a la creación de una plataforma pancanadiense de investigación sobre propulsión híbrida eléctrica y de hidrógeno en la aviación.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj010',
		title: {
			fr: "Modèle financier - Pôle d'une zone d'innovation en aérospatiale",
			en: 'Financial model - Hub of an aerospace innovation zone',
			es: 'Modelo financiero - Polo de una zona de innovación aeroespacial'
		},
		category: 'aerospace',
		year: '2022',
		description: {
			fr: "Développement du modèle financier (coûts, revenus, clientèle potentielle, équipements, etc.) pour le plan d'affaires d'un pôle d'une zone d'innovation en aérospatiale.",
			en: 'Development of the financial model (costs, revenues, potential clients, equipment, etc.) for the business plan of a hub within an aerospace innovation zone.',
			es: 'Desarrollo del modelo financiero (costos, ingresos, clientela potencial, equipos, etc.) para el plan de negocio de un polo de una zona de innovación aeroespacial.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj011',
		title: {
			fr: "Modèle financier - Pôle d'une zone d'innovation en aérospatiale",
			en: 'Financial model - Hub of an aerospace innovation zone',
			es: 'Modelo financiero - Polo de una zona de innovación aeroespacial'
		},
		category: 'aerospace',
		year: '2022',
		description: {
			fr: "Développement du modèle financier pour le plan d'affaires d'un pôle d'une zone d'innovation en aérospatiale.",
			en: 'Development of the financial model for the business plan of a hub within an aerospace innovation zone.',
			es: 'Desarrollo del modelo financiero para el plan de negocio de un polo de una zona de innovación aeroespacial.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj012',
		title: {
			fr: "Plan d'affaires - Pôle d'une zone d'innovation",
			en: 'Business plan - Innovation zone hub',
			es: 'Plan de negocio - Polo de una zona de innovación'
		},
		category: 'aerospace',
		year: '2022',
		description: {
			fr: "Plan d'affaires d'un pôle d'une zone d'innovation en aérospatiale.",
			en: 'Business plan for a hub within an aerospace innovation zone.',
			es: 'Plan de negocio de un polo de una zona de innovación aeroespacial.'
		},
		role: 'Support (S)',
		status: 'completed'
	},
	{
		id: 'proj013',
		title: {
			fr: "Plan d'affaires - Pôle d'une zone d'innovation",
			en: 'Business plan - Innovation zone hub',
			es: 'Plan de negocio - Polo de una zona de innovación'
		},
		category: 'aerospace',
		year: '2022',
		description: {
			fr: "Plan d'affaires d'un pôle d'une zone d'innovation en aérospatiale.",
			en: 'Business plan for a hub within an aerospace innovation zone.',
			es: 'Plan de negocio de un polo de una zona de innovación aeroespacial.'
		},
		role: 'Support (S)',
		status: 'completed'
	},
	{
		id: 'proj014',
		title: {
			fr: "Étude de positionnement post-COVID - Centre d'innovation aérospatiale",
			en: 'Post-COVID positioning study - Aerospace innovation centre',
			es: 'Estudio de posicionamiento pos-COVID - Centro de innovación aeroespacial'
		},
		category: 'aerospace',
		year: '2021',
		description: {
			fr: "Réalisation d'une étude de positionnement post-COVID pour un centre d'innovation en aérospatiale.",
			en: 'Post-COVID positioning study for an aerospace innovation centre.',
			es: 'Realización de un estudio de posicionamiento pos-COVID para un centro de innovación aeroespacial.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},

	// DRONES ET MOBILITÉ AÉRIENNE AVANCÉE
	{
		id: 'proj020',
		title: {
			fr: 'Étude de préfaisabilité - Déploiement de drones en contexte minier',
			en: 'Prefeasibility study - Drone deployment in a mining context',
			es: 'Estudio de prefactibilidad - Despliegue de drones en el contexto minero'
		},
		category: 'drones',
		year: '2024',
		description: {
			fr: "Réalisation d'une étude de préfaisabilité sur le déploiement de drones en contexte minier.",
			en: 'Prefeasibility study on deploying drones in a mining context.',
			es: 'Realización de un estudio de prefactibilidad sobre el despliegue de drones en el contexto minero.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj021',
		title: {
			fr: 'Positionnement stratégique - Consortium canadien en MAA',
			en: 'Strategic positioning - Canadian AAM consortium',
			es: 'Posicionamiento estratégico - Consorcio canadiense de MAA'
		},
		category: 'drones',
		year: '2024',
		description: {
			fr: "Conduite d'une étude de positionnement stratégique pour un consortium canadien en mobilité aérienne avancée.",
			en: 'Strategic positioning study for a Canadian advanced air mobility consortium.',
			es: 'Realización de un estudio de posicionamiento estratégico para un consorcio canadiense de movilidad aérea avanzada.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj022',
		title: {
			fr: 'Méthodologie - Acceptabilité sociale de la MAA au Québec',
			en: 'Methodology - Social acceptability of AAM in Quebec',
			es: 'Metodología - Aceptabilidad social de la MAA en Quebec'
		},
		category: 'drones',
		year: '2024',
		description: {
			fr: "Développement d'une méthodologie spécifique à la gestion de l'acceptabilité sociale de la MAA au Québec.",
			en: 'Development of a methodology specific to managing the social acceptability of AAM in Quebec.',
			es: 'Desarrollo de una metodología específica para gestionar la aceptabilidad social de la MAA en Quebec.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj023',
		title: {
			fr: 'Analyse de positionnement optimal de vertiports',
			en: 'Optimal vertiport location analysis',
			es: 'Análisis de la ubicación óptima de vertipuertos'
		},
		category: 'drones',
		year: '2024',
		description: {
			fr: 'Analyse du positionnement optimal de vertiports dans dix villes du Québec dans le cadre du déploiement de la MAA.',
			en: 'Analysis of optimal vertiport locations in ten Quebec cities as part of AAM deployment.',
			es: 'Análisis de la ubicación óptima de vertipuertos en diez ciudades de Quebec en el marco del despliegue de la MAA.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj024',
		title: {
			fr: "Service de livraison de médicaments par drones - Vol d'essai 170 km",
			en: 'Drone medication delivery service - 170 km test flight',
			es: 'Servicio de entrega de medicamentos con drones - Vuelo de prueba de 170 km'
		},
		category: 'drones',
		year: '2023',
		description: {
			fr: "Conception, planification et essais en vol d'un service de livraison de médicaments et de collecte d'échantillons biologiques par drones, à destination des régions éloignées dans le cadre d'études cliniques.",
			en: 'Design, planning and flight testing of a drone service for delivering medication and collecting biological samples in remote regions as part of clinical trials.',
			es: 'Diseño, planificación y pruebas de vuelo de un servicio de entrega de medicamentos y recogida de muestras biológicas con drones, destinado a regiones remotas en el marco de ensayos clínicos.'
		},
		achievements: [
			{
				fr: "Vol d'essai réussi de 170 km",
				en: 'Successful 170 km test flight',
				es: 'Vuelo de prueba exitoso de 170 km'
			}
		],
		role: 'Leader (L)',
		status: 'completed'
	},

	// SANTÉ ET TECHNOLOGIES MÉDICALES
	{
		id: 'proj030',
		title: {
			fr: 'Planification stratégique - Centre de recherche en maladies génétiques rares',
			en: 'Strategic planning - Rare genetic disease research centre',
			es: 'Planificación estratégica - Centro de investigación en enfermedades genéticas raras'
		},
		category: 'health',
		year: '2024',
		description: {
			fr: "Élaboration de la planification stratégique et structuration de l'innovation pour un centre de recherche dédié aux maladies génétiques rares.",
			en: 'Strategic planning and innovation structuring for a research centre dedicated to rare genetic diseases.',
			es: 'Elaboración de la planificación estratégica y estructuración de la innovación para un centro de investigación dedicado a las enfermedades genéticas raras.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj031',
		title: {
			fr: 'Applications pour études cliniques en régions éloignées',
			en: 'Applications for clinical trials in remote regions',
			es: 'Aplicaciones para ensayos clínicos en regiones remotas'
		},
		category: 'health',
		year: '2023',
		description: {
			fr: 'Définition des besoins, architecture, développement et déploiement de dix applications spécialisées pour la gestion des études cliniques en régions éloignées.',
			en: 'Requirements definition, architecture, development and deployment of ten specialized applications for managing clinical trials in remote regions.',
			es: 'Definición de necesidades, arquitectura, desarrollo y despliegue de diez aplicaciones especializadas para la gestión de ensayos clínicos en regiones remotas.'
		},
		achievements: [
			{
				fr: 'Développement et déploiement de 10 applications spécialisées',
				en: 'Developed and deployed 10 specialized applications',
				es: 'Desarrollo y despliegue de 10 aplicaciones especializadas'
			}
		],
		technologies: ['PowerApps', 'Azure', 'JavaScript'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj032',
		title: {
			fr: 'Ateliers thématiques - Santé en espace lointain',
			en: 'Thematic workshops - Health in deep space',
			es: 'Talleres temáticos - Salud en el espacio profundo'
		},
		category: 'health',
		year: '2023',
		client: {
			fr: 'Agence spatiale nationale',
			en: 'National space agency',
			es: 'Agencia espacial nacional'
		},
		description: {
			fr: "Conception et animation d'ateliers thématiques sur la santé en espace lointain pour une agence spatiale nationale.",
			en: 'Design and facilitation of thematic workshops on health in deep space for a national space agency.',
			es: 'Diseño y animación de talleres temáticos sobre la salud en el espacio profundo para una agencia espacial nacional.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj033',
		title: {
			fr: 'Conteneur pour agents thérapeutiques - Exploration spatiale',
			en: 'Container for therapeutic agents - Space exploration',
			es: 'Contenedor para agentes terapéuticos - Exploración espacial'
		},
		category: 'health',
		year: '2023',
		description: {
			fr: "Idéation, rédaction d'une demande de financement et développement d'un conteneur instrumenté pour le transport et la conservation d'agents thérapeutiques fragiles (ADN, ARN, etc.) dans le cadre de missions d'exploration spatiale en orbite haute (> 400 km).",
			en: 'Ideation, funding application writing and development of an instrumented container for transporting and preserving fragile therapeutic agents (DNA, RNA, etc.) during high-orbit (> 400 km) space exploration missions.',
			es: 'Ideación, redacción de una solicitud de financiación y desarrollo de un contenedor instrumentado para el transporte y la conservación de agentes terapéuticos frágiles (ADN, ARN, etc.) en misiones de exploración espacial en órbita alta (> 400 km).'
		},
		achievements: [
			{ fr: 'Ingénierie système', en: 'Systems engineering', es: 'Ingeniería de sistemas' },
			{ fr: 'Simulations avancées', en: 'Advanced simulations', es: 'Simulaciones avanzadas' },
			{ fr: 'Gestion de projet', en: 'Project management', es: 'Gestión de proyectos' },
			{
				fr: 'Développement logiciel embarqué',
				en: 'Embedded software development',
				es: 'Desarrollo de software embarcado'
			}
		],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj034',
		title: {
			fr: "Plan d'affaires - Outil pédagogique maladies lipidiques",
			en: 'Business plan - Educational tool on lipid disorders',
			es: 'Plan de negocio - Herramienta pedagógica sobre enfermedades lipídicas'
		},
		category: 'health',
		year: '2022',
		description: {
			fr: "Élaboration d'un plan d'affaires pour un outil pédagogique destiné à vulgariser les mécanismes biologiques liés aux maladies lipidiques.",
			en: 'Business plan for an educational tool designed to explain the biological mechanisms of lipid disorders to a general audience.',
			es: 'Elaboración de un plan de negocio para una herramienta pedagógica destinada a divulgar los mecanismos biológicos de las enfermedades lipídicas.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj035',
		title: {
			fr: "Plan d'affaires - Startup en espaces de recherche partagés",
			en: 'Business plan - Shared research space startup',
			es: 'Plan de negocio - Startup de espacios de investigación compartidos'
		},
		category: 'health',
		year: '2022',
		description: {
			fr: "Contribution à l'élaboration du plan d'affaires d'une entreprise en démarrage dans l'est de Montréal, spécialisée en espaces de recherche partagés en biotechnologies.",
			en: 'Contribution to the business plan of an east-end Montreal startup specializing in shared biotechnology research spaces.',
			es: 'Contribución a la elaboración del plan de negocio de una empresa emergente del este de Montreal especializada en espacios de investigación compartidos en biotecnología.'
		},
		role: 'Support (S)',
		status: 'completed'
	},
	{
		id: 'proj036',
		title: {
			fr: 'Analyse de la filière ARN au Québec',
			en: 'Analysis of the RNA sector in Quebec',
			es: 'Análisis del sector del ARN en Quebec'
		},
		category: 'health',
		year: '2022',
		description: {
			fr: "Analyse de la filière académique et industrielle de l'ARN au Québec.",
			en: 'Analysis of the academic and industrial RNA sector in Quebec.',
			es: 'Análisis del sector académico e industrial del ARN en Quebec.'
		},
		role: 'Support (S)',
		status: 'completed'
	},

	// LIEUX ET ÉCOSYSTÈMES D'INNOVATION
	{
		id: 'proj040',
		title: {
			fr: 'Développement économique Québec-Suisse',
			en: 'Quebec-Switzerland economic development',
			es: 'Desarrollo económico Quebec-Suiza'
		},
		category: 'innovation-ecosystems',
		year: '2023',
		description: {
			fr: "Développement économique ciblé dans les secteurs de l'aérospatiale, des technologies médicales, de la microélectronique et de l'optique/photonique entre le Québec et la Suisse.",
			en: 'Targeted economic development between Quebec and Switzerland in aerospace, medical technologies, microelectronics and optics/photonics.',
			es: 'Desarrollo económico focalizado entre Quebec y Suiza en los sectores aeroespacial, de tecnologías médicas, microelectrónica y óptica/fotónica.'
		},
		achievements: [
			{
				fr: 'Analyse comparative des écosystèmes industriels',
				en: 'Comparative analysis of industrial ecosystems',
				es: 'Análisis comparativo de los ecosistemas industriales'
			},
			{
				fr: "Identification d'entreprises aux expertises complémentaires",
				en: 'Identification of companies with complementary expertise',
				es: 'Identificación de empresas con conocimientos complementarios'
			},
			{
				fr: 'Organisation de missions commerciales bilatérales',
				en: 'Organization of bilateral trade missions',
				es: 'Organización de misiones comerciales bilaterales'
			},
			{
				fr: 'Activités de maillage',
				en: 'Matchmaking activities',
				es: 'Actividades de vinculación empresarial'
			}
		],
		role: 'Leader (L)',
		status: 'completed'
	},

	// ÉNERGIES RENOUVELABLES ET DÉVELOPPEMENT DURABLE
	{
		id: 'proj050',
		title: {
			fr: 'Projet de recherche - Recyclage des avions en fin de vie',
			en: 'Research project - Recycling end-of-life aircraft',
			es: 'Proyecto de investigación - Reciclaje de aviones al final de su vida útil'
		},
		category: 'energy',
		year: '2024',
		description: {
			fr: "Rédaction d'une proposition de projet de recherche impliquant 10 partenaires industriels et académiques sur le recyclage des avions en fin de vie.",
			en: 'Writing of a research project proposal involving 10 industrial and academic partners on recycling end-of-life aircraft.',
			es: 'Redacción de una propuesta de proyecto de investigación con 10 socios industriales y académicos sobre el reciclaje de aviones al final de su vida útil.'
		},
		achievements: [
			{
				fr: 'Coordination de 10 partenaires',
				en: 'Coordinated 10 partners',
				es: 'Coordinación de 10 socios'
			}
		],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj051',
		title: {
			fr: "Structuration de l'innovation - Entreprise de distribution d'énergie",
			en: 'Innovation structuring - Energy distribution company',
			es: 'Estructuración de la innovación - Empresa de distribución de energía'
		},
		category: 'energy',
		year: '2023',
		description: {
			fr: "Structuration de l'innovation pour une entreprise majeure de distribution d'énergie.",
			en: 'Innovation structuring for a major energy distribution company.',
			es: 'Estructuración de la innovación para una importante empresa de distribución de energía.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj052',
		title: {
			fr: "Étude - Transition industrielle de l'est de Montréal",
			en: "Study - Industrial transition of Montreal's east end",
			es: 'Estudio - Transición industrial del este de Montreal'
		},
		category: 'energy',
		year: '2023',
		description: {
			fr: "Réalisation d'une étude sur la transition industrielle de l'est de Montréal.",
			en: "Study on the industrial transition of Montreal's east end.",
			es: 'Realización de un estudio sobre la transición industrial del este de Montreal.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj053',
		title: {
			fr: 'Planification stratégique - Valorisation de biomasse par pyrolyse',
			en: 'Strategic planning - Biomass upgrading through pyrolysis',
			es: 'Planificación estratégica - Valorización de biomasa mediante pirólisis'
		},
		category: 'energy',
		year: '2022',
		description: {
			fr: "Élaboration de la planification stratégique pour une entreprise spécialisée dans la valorisation de la biomasse par pyrolyse.",
			en: 'Strategic planning for a company specializing in biomass upgrading through pyrolysis.',
			es: 'Elaboración de la planificación estratégica para una empresa especializada en la valorización de biomasa mediante pirólisis.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},

	// TECHNOLOGIES NUMÉRIQUES ET IA
	{
		id: 'proj060',
		title: {
			fr: 'Direction antenne canadienne - Centre de recherche français en IA',
			en: 'Head of Canadian branch - French AI research centre',
			es: 'Dirección de la sede canadiense - Centro de investigación francés en IA'
		},
		category: 'digital-ai',
		year: '2024',
		description: {
			fr: "Direction générale de l'antenne canadienne d'un centre de recherche français en intelligence artificielle.",
			en: 'General management of the Canadian branch of a French artificial intelligence research centre.',
			es: 'Dirección general de la sede canadiense de un centro de investigación francés en inteligencia artificial.'
		},
		role: 'Leader (L)',
		status: 'in-progress'
	},
	{
		id: 'proj061',
		title: {
			fr: 'Programme de recherche collaborative France-Québec - IA générative',
			en: 'France-Quebec collaborative research program - Generative AI',
			es: 'Programa de investigación colaborativa Francia-Quebec - IA generativa'
		},
		category: 'digital-ai',
		year: '2024',
		description: {
			fr: "Conception d'un programme de recherche collaborative France-Québec sur l'utilisation robuste et explicable de l'utilisation de l'IA générative pour les processus d'entreprise critiques (assurance qualité, design, etc.).",
			en: 'Design of a France-Quebec collaborative research program on the robust and explainable use of generative AI in critical business processes (quality assurance, design, etc.).',
			es: 'Diseño de un programa de investigación colaborativa Francia-Quebec sobre el uso robusto y explicable de la IA generativa en procesos empresariales críticos (aseguramiento de la calidad, diseño, etc.).'
		},
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj062',
		title: {
			fr: 'Étude de positionnement - Formation continue universitaire',
			en: 'Positioning study - University continuing education',
			es: 'Estudio de posicionamiento - Formación continua universitaria'
		},
		category: 'digital-ai',
		year: '2023',
		description: {
			fr: "Étude de positionnement stratégique de l'offre de formation continue d'une grande université québécoise.",
			en: 'Strategic positioning study of the continuing education offering of a major Quebec university.',
			es: 'Estudio de posicionamiento estratégico de la oferta de formación continua de una gran universidad quebequense.'
		},
		role: 'Leader (L)',
		status: 'completed'
	},

	// OUTILS, CODES SPÉCIALISÉS ET MÉTHODOLOGIES INTERNES
	{
		id: 'proj070',
		title: {
			fr: 'Radar de veille stratégique - 50+ technologies émergentes',
			en: 'Strategic watch radar - 50+ emerging technologies',
			es: 'Radar de vigilancia estratégica - Más de 50 tecnologías emergentes'
		},
		category: 'tools',
		year: '2024',
		description: {
			fr: "Création d'un radar de veille stratégique pour suivre l'évolution de plus de 50 technologies émergentes (aérospatiale, fabrication avancée, IA, énergies renouvelables, biotechnologies, etc.).",
			en: 'Creation of a strategic watch radar tracking more than 50 emerging technologies (aerospace, advanced manufacturing, AI, renewable energy, biotechnology, etc.).',
			es: 'Creación de un radar de vigilancia estratégica para seguir la evolución de más de 50 tecnologías emergentes (aeroespacial, fabricación avanzada, IA, energías renovables, biotecnología, etc.).'
		},
		technologies: ['Python', 'PowerBI', 'Web scraping'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj071',
		title: {
			fr: 'Base de données - 7000+ organisations innovantes',
			en: 'Database - 7,000+ innovative organizations',
			es: 'Base de datos - Más de 7000 organizaciones innovadoras'
		},
		category: 'tools',
		year: '2024',
		description: {
			fr: "Constitution d'une base de données interne regroupant plus de 7 000 organisations innovantes au Québec, au Canada et à l'international.",
			en: 'Creation of an internal database of more than 7,000 innovative organizations in Quebec, Canada and internationally.',
			es: 'Creación de una base de datos interna con más de 7000 organizaciones innovadoras en Quebec, Canadá y a nivel internacional.'
		},
		technologies: ['SQL', 'Python', 'PowerBI'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj072',
		title: {
			fr: 'Application de simulation technico-économique - Biomasse',
			en: 'Techno-economic simulation application - Biomass',
			es: 'Aplicación de simulación tecnoeconómica - Biomasa'
		},
		category: 'tools',
		year: '2023',
		description: {
			fr: "Développement d'une application de simulation technico-économique pour évaluer la performance financière d'un procédé de transformation de biomasse en fonction de paramètres techniques.",
			en: 'Development of a techno-economic simulation application to assess the financial performance of a biomass conversion process based on technical parameters.',
			es: 'Desarrollo de una aplicación de simulación tecnoeconómica para evaluar el rendimiento financiero de un proceso de transformación de biomasa en función de parámetros técnicos.'
		},
		technologies: ['Python', 'JavaScript'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj073',
		title: {
			fr: 'Outils de simulation Monte Carlo',
			en: 'Monte Carlo simulation tools',
			es: 'Herramientas de simulación Monte Carlo'
		},
		category: 'tools',
		year: '2023',
		description: {
			fr: "Conception d'outils de simulation Monte Carlo pour la modélisation paramétrique de cas d'affaires.",
			en: 'Design of Monte Carlo simulation tools for parametric business case modelling.',
			es: 'Diseño de herramientas de simulación Monte Carlo para la modelización paramétrica de casos de negocio.'
		},
		technologies: ['Python', 'NumPy'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj074',
		title: {
			fr: 'Algorithme de priorisation multicritère',
			en: 'Multi-criteria prioritization algorithm',
			es: 'Algoritmo de priorización multicriterio'
		},
		category: 'tools',
		year: '2023',
		description: {
			fr: "Développement d'un algorithme de priorisation multicritère de projets.",
			en: 'Development of a multi-criteria project prioritization algorithm.',
			es: 'Desarrollo de un algoritmo de priorización multicriterio de proyectos.'
		},
		technologies: ['Python'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj075',
		title: {
			fr: 'Mise à niveau - Incubateur numérique',
			en: 'Upgrade - Digital incubator',
			es: 'Actualización - Incubadora digital'
		},
		category: 'tools',
		year: '2023',
		description: {
			fr: "Mise à niveau d'un incubateur numérique pour expérimenter les dernières technologies.",
			en: 'Upgrade of a digital incubator to experiment with the latest technologies.',
			es: 'Actualización de una incubadora digital para experimentar con las últimas tecnologías.'
		},
		technologies: [
			'Arduino',
			'Raspberry PI',
			{ fr: 'Impression 3D', en: '3D printing', es: 'Impresión 3D' }
		],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj076',
		title: {
			fr: 'Intégration IA générative - Pratiques internes Innovitech',
			en: 'Generative AI integration - Innovitech internal practices',
			es: 'Integración de IA generativa - Prácticas internas de Innovitech'
		},
		category: 'tools',
		year: '2024',
		description: {
			fr: "Intégration de l'intelligence artificielle générative dans les pratiques internes d'Innovitech.",
			en: "Integration of generative artificial intelligence into Innovitech's internal practices.",
			es: 'Integración de la inteligencia artificial generativa en las prácticas internas de Innovitech.'
		},
		technologies: ['OpenAI API', 'Python', 'LangChain'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj077',
		title: {
			fr: "Solution locale d'analyse de documents - RAG",
			en: 'On-premise document analysis solution - RAG',
			es: 'Solución local de análisis de documentos - RAG'
		},
		category: 'tools',
		year: '2024',
		description: {
			fr: "Développement de solutions locales d'analyse sécurisée de documents basée sur l'IA générative et la génération augmentée (RAG).",
			en: 'Development of on-premise solutions for secure document analysis based on generative AI and retrieval-augmented generation (RAG).',
			es: 'Desarrollo de soluciones locales de análisis seguro de documentos basadas en IA generativa y generación aumentada por recuperación (RAG).'
		},
		technologies: ['Python', 'LangChain', 'Ollama', 'ChromaDB'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj078',
		title: {
			fr: 'Agents IA - Besoins internes',
			en: 'AI agents - Internal needs',
			es: 'Agentes de IA - Necesidades internas'
		},
		category: 'tools',
		year: '2024',
		description: {
			fr: "Développement d'agent IA pour nos besoins internes.",
			en: 'Development of AI agents for our internal needs.',
			es: 'Desarrollo de agentes de IA para nuestras necesidades internas.'
		},
		technologies: ['Python', 'LangChain', 'OpenAI'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj079',
		title: {
			fr: "Logiciel d'automatisation - Reddition de comptes",
			en: 'Automation software - Progress reporting',
			es: 'Software de automatización - Rendición de cuentas'
		},
		category: 'tools',
		year: '2023',
		description: {
			fr: "Développement d'un logiciel d'automatisation de la reddition de comptes pour projets collaboratifs.",
			en: 'Development of software that automates progress reporting for collaborative projects.',
			es: 'Desarrollo de un software de automatización de la rendición de cuentas para proyectos colaborativos.'
		},
		technologies: ['Python', 'Excel', 'PowerAutomate'],
		role: 'Leader (L)',
		status: 'completed'
	},
	{
		id: 'proj080',
		title: {
			fr: 'Simulateur financier - Réseau de vertiports MAA',
			en: 'Financial simulator - AAM vertiport network',
			es: 'Simulador financiero - Red de vertipuertos de MAA'
		},
		category: 'tools',
		year: '2024',
		description: {
			fr: "Conception d'un simulateur financier pour l'évaluation d'un réseau de vertiports en mobilité aérienne avancée.",
			en: 'Design of a financial simulator for evaluating an advanced air mobility vertiport network.',
			es: 'Diseño de un simulador financiero para evaluar una red de vertipuertos de movilidad aérea avanzada.'
		},
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
