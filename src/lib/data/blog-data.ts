// Structure de données pour le blog

export interface BlogPost {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	author: string;
	publishedDate: string;
	updatedDate?: string;
	category: string;
	tags: string[];
	image?: string;
	published: boolean;
}

export interface BlogCategory {
	id: string;
	name: string;
	description: string;
}

// Catégories de blog
export const blogCategories: BlogCategory[] = [
	{
		id: 'innovation',
		name: 'Innovation',
		description: 'Stratégies et tendances en gestion de l\'innovation'
	},
	{
		id: 'technology',
		name: 'Technologie',
		description: 'Technologies émergentes et transformation numérique'
	},
	{
		id: 'aerospace',
		name: 'Aérospatiale',
		description: 'Actualités et analyses du secteur aérospatial'
	},
	{
		id: 'ai',
		name: 'Intelligence Artificielle',
		description: 'IA générative et applications pratiques'
	},
	{
		id: 'leadership',
		name: 'Leadership',
		description: 'Gestion d\'équipe et développement professionnel'
	}
];

// Posts de blog initiaux (exemples)
export const initialBlogPosts: BlogPost[] = [
	{
		id: '1',
		slug: 'bienvenue-sciences-connexions',
		title: 'Bienvenue sur Sciences Connexions',
		excerpt: 'Premier article du blog dédié à l\'innovation, la technologie et l\'aérospatiale.',
		content: `# Bienvenue sur Sciences Connexions

Je suis ravi de lancer ce blog où je partagerai mes réflexions et analyses sur l'innovation, la transformation numérique et les technologies émergentes.

## À propos de ce blog

Ce blog couvrira plusieurs thématiques :

- **Innovation** : Stratégies, méthodologies et meilleures pratiques
- **Technologie** : IA, IoT, cloud computing et autres technologies émergentes
- **Aérospatiale** : Tendances et développements dans l'industrie
- **Leadership** : Gestion d'équipe et développement professionnel

## Ce que vous pouvez attendre

Des articles réguliers basés sur :
- Mon expérience de 25+ ans dans l'innovation
- Des analyses de cas concrets
- Des réflexions sur les tendances émergentes
- Des conseils pratiques pour les professionnels

Restez connectés!`,
		author: 'François Provencher, Ing., M.Sc.A.',
		publishedDate: '2025-10-12',
		category: 'innovation',
		tags: ['introduction', 'innovation', 'technologie'],
		published: true
	}
];

// Fonctions utilitaires
export function getBlogPosts(): BlogPost[] {
	if (typeof window === 'undefined') return initialBlogPosts;

	const stored = localStorage.getItem('blogPosts');
	if (stored) {
		return JSON.parse(stored);
	}
	return initialBlogPosts;
}

export function saveBlogPosts(posts: BlogPost[]): void {
	if (typeof window === 'undefined') return;
	localStorage.setItem('blogPosts', JSON.stringify(posts));
}

export function getPublishedPosts(): BlogPost[] {
	return getBlogPosts()
		.filter(post => post.published)
		.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
	return getBlogPosts().find(post => post.slug === slug);
}

export function getPostsByCategory(categoryId: string): BlogPost[] {
	return getPublishedPosts().filter(post => post.category === categoryId);
}

export function getPostsByTag(tag: string): BlogPost[] {
	return getPublishedPosts().filter(post => post.tags.includes(tag));
}

export function getAllTags(): string[] {
	const tags = new Set<string>();
	getBlogPosts().forEach(post => {
		post.tags.forEach(tag => tags.add(tag));
	});
	return Array.from(tags).sort();
}

export function createSlug(title: string): string {
	return title
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '') // Enlever les accents
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function generatePostId(): string {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
