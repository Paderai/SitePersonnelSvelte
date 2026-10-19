# Architecture du Site Web CV-Svelte

## Vue d'ensemble

Ce site web est un portfolio/CV interactif développé avec **SvelteKit 5**, configuré comme un site statique déployable sur cPanel. Il présente les compétences, réalisations et projets professionnels de manière interactive et multilingue.

### Technologies principales

- **Framework**: SvelteKit 5 avec Svelte 5 (runes: `$state`, `$derived`, `$effect`)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS v4 (via plugin Vite)
- **Internationalisation**: svelte-i18n (FR/EN/ES)
- **Build**: Vite
- **Déploiement**: Adapter static (`@sveltejs/adapter-static`)

### Architecture générale

```
CV-Svelte/
├── src/
│   ├── routes/              # Pages (routing basé sur fichiers)
│   │   ├── +layout.svelte   # Layout global
│   │   ├── +page.svelte     # Page d'accueil
│   │   ├── profondeur/      # Page profondeur technique
│   │   ├── realisations/    # Page réalisations
│   │   ├── incubateur/      # Page incubateur numérique
│   │   └── settings/        # Page paramètres
│   ├── lib/
│   │   ├── components/      # Composants réutilisables
│   │   ├── data/           # Données et configuration
│   │   └── i18n/           # Traductions
│   └── app.css             # Styles globaux Tailwind
├── static/                 # Assets statiques
├── svelte.config.js        # Configuration SvelteKit
├── vite.config.ts          # Configuration Vite
└── tailwind.config.js      # Configuration Tailwind
```

---

## Éléments clés de l'architecture

### 1. Configuration de base

#### **svelte.config.js** - Configuration SvelteKit
```javascript
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      fallback: 'index.html',  // SPA routing
      pages: 'build',
      assets: 'build',
      precompress: false
    }),
    paths: {
      base: '',
      assets: ''
    },
    prerender: {
      entries: ['*']  // Pré-générer toutes les routes
    }
  }
};
```

**Pourquoi cette configuration ?**
- `adapter-static` génère un site statique déployable sur n'importe quel hébergeur
- `fallback: 'index.html'` permet le routing côté client (SPA)
- `prerender: ['*']` pré-génère toutes les pages pour de meilleures performances

#### **vite.config.ts** - Configuration Vite et Tailwind
```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default {
  plugins: [
    sveltekit(),
    tailwindcss()  // Tailwind CSS v4 via plugin
  ]
};
```

---

### 2. Système de routing

SvelteKit utilise le **routing basé sur fichiers** dans le dossier `src/routes/`.

#### Structure des routes
```
src/routes/
├── +layout.svelte           # Layout appliqué à toutes les pages
├── +page.svelte             # Page d'accueil (/)
├── profondeur/
│   └── +page.svelte         # /profondeur
├── realisations/
│   └── +page.svelte         # /realisations
├── incubateur/
│   └── +page.svelte         # /incubateur
└── settings/
    └── +page.svelte         # /settings
```

#### **+layout.svelte** - Layout global

**Responsabilités:**
- Charge et configure svelte-i18n
- Importe les styles globaux (`app.css`)
- Fournit la structure HTML de base
- Gère le thème (clair/sombre) via localStorage
- Inclut les composants globaux (Header, Footer, Navigation)

**Code clé:**
```svelte
<script lang="ts">
  import { register, init, locale } from 'svelte-i18n';
  import '../app.css';

  // Configuration i18n
  register('fr', () => import('$lib/i18n/locales/fr.json'));
  register('en', () => import('$lib/i18n/locales/en.json'));
  register('es', () => import('$lib/i18n/locales/es.json'));

  init({
    fallbackLocale: 'fr',
    initialLocale: 'fr'
  });
</script>

<slot />  <!-- Contenu de chaque page -->
```

---

### 3. Système de thèmes et personnalisation

#### **app.css** - Variables CSS et thèmes

Le système de thèmes utilise des **CSS custom properties** (variables CSS) pour gérer les couleurs en mode clair et sombre.

**Structure:**
```css
:root {
  /* Couleurs de base */
  --color-primary: 59 130 246;      /* Bleu */
  --color-accent: 251 191 36;       /* Jaune */

  /* Variables intermédiaires pour les fonds */
  --light-bg-primary: 248 250 252;
  --light-bg-secondary: 241 245 249;
  --dark-bg-primary: 15 23 42;
  --dark-bg-secondary: 30 41 59;
}

/* Mode clair */
:root[data-theme="light"] {
  --bg-primary: var(--light-bg-primary);
  --bg-secondary: var(--light-bg-secondary);
  --text-primary: 15 23 42;
}

/* Mode sombre */
:root[data-theme="dark"] {
  --bg-primary: var(--dark-bg-primary);
  --bg-secondary: var(--dark-bg-secondary);
  --text-primary: 248 250 252;
}
```

**Utilisation dans les composants:**
```css
.card {
  background-color: rgb(var(--bg-secondary));
  color: rgb(var(--text-primary));
}
```

#### **Page Settings** - Personnalisation

La page `/settings` permet de personnaliser:
- Couleur primaire
- Couleur d'accent
- Police de caractères
- Taille de police
- Espacement
- Couleurs de fond (mode clair et sombre)

**Persistance:**
Les paramètres sont sauvegardés dans `localStorage` et appliqués dynamiquement via JavaScript:

```typescript
function applySettings(settings: Settings) {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', settings.primaryColor);
  root.style.setProperty('--light-bg-primary', settings.lightBgPrimary);
  // ... autres variables
  localStorage.setItem('cv-settings', JSON.stringify(settings));
}
```

---

### 4. Internationalisation (i18n)

#### Structure des traductions

```
src/lib/i18n/locales/
├── fr.json    # Français (langue par défaut)
├── en.json    # Anglais
└── es.json    # Espagnol
```

#### Format des fichiers de traduction
```json
{
  "nav": {
    "home": "Accueil",
    "achievements": "Réalisations",
    "depth": "Profondeur technique"
  },
  "incubator": {
    "title": "Incubateur Numérique",
    "subtitle": "Mon laboratoire d'innovation"
  }
}
```

#### Utilisation dans les composants
```svelte
<script lang="ts">
  import { t, locale } from 'svelte-i18n';
</script>

<h1>{$t('nav.home')}</h1>
<button onclick={() => $locale.set('en')}>English</button>
```

---

### 5. Gestion des données

Les données sont centralisées dans `src/lib/data/` pour faciliter les mises à jour.

#### **technical-depth-data.ts** - Données de profondeur technique

**Structure:**
```typescript
export interface Technology {
  name: string;
  category: string;
  level: number;  // 0-100%
  description?: string;
}

export const technologies: Technology[] = [
  { name: 'Python', category: 'Programmation', level: 85 },
  { name: 'Power BI', category: 'Bureautique', level: 90 },
  // ... 60+ technologies
];

export const zones = [
  {
    name: 'Zone Néophyte',
    range: '0-30%',
    color: 'rgb(239 68 68)',
    start: 0,
    end: 30
  },
  // ... 3 zones
];
```

**Fonctions utilitaires:**
```typescript
export function getCategories(): string[] {
  return [...new Set(technologies.map(t => t.category))];
}

export function getTechStats() {
  return {
    total: technologies.length,
    neophyte: technologies.filter(t => t.level < 30).length,
    expert: technologies.filter(t => t.level >= 70).length
  };
}
```

#### **projects-data.ts** - Données des réalisations

**Structure:**
```typescript
export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  client?: string;
  description: string;
  achievements?: string[];
  technologies?: string[];
  status: 'completed' | 'in-progress' | 'planned';
}

export const projectsData: Project[] = [
  // ... projets
];

export const projectCategories = [
  { id: 'innovation', name: 'Innovation' },
  { id: 'digital', name: 'Transformation numérique' },
  // ...
];
```

---

### 6. Pages principales

#### **Page d'accueil** (`/`)

**Sections:**
- Hero section avec titre et CTA
- Présentation
- Compétences clés
- Statistiques

**Caractéristiques:**
- Animations d'entrée
- Liens vers les autres sections
- Design responsive

#### **Page Profondeur Technique** (`/profondeur`)

**Concept:** Visualisation de la maîtrise des technologies via une courbe en S basée sur la fonction logistique.

**Composants clés:**

1. **Courbe en S mathématique**
```typescript
function calculateSCurveY(x: number): number {
  const k = 0.08;      // Pente
  const x0 = 50;       // Point médian
  return 100 / (1 + Math.exp(-k * (x - x0)));
}
```

2. **Graphique SVG interactif**
   - Points colorés par catégorie
   - Zones colorées (Néophyte/Apprentissage/Expert)
   - Tooltips au survol
   - Grille de référence

3. **Système de zoom et pan**
```typescript
let zoomLevel = $state(1);
let panX = $state(0);
let panY = $state(0);

function zoomIn() {
  zoomLevel = Math.min(zoomLevel * 1.3, 4);
}

function handleMouseDown(e: MouseEvent) {
  if (zoomLevel > 1) {
    isDragging = true;
    // ... logique de drag
  }
}
```

4. **Filtrage par catégorie**
```typescript
let selectedCategory = $state<string | null>(null);

const filteredTechnologies = $derived.by(() => {
  if (!selectedCategory) return technologies;
  return technologies.filter(t => t.category === selectedCategory);
});
```

5. **Codes couleur par catégorie**
```typescript
const categoryColors: Record<string, string> = {
  'Gestion': 'rgb(147, 51, 234)',      // Violet
  'Programmation': 'rgb(249, 115, 22)', // Orange
  'IA': 'rgb(236, 72, 153)',           // Rose
  // ... 9 catégories
};
```

6. **Anti-chevauchement des points**
```typescript
function getOffset(techName: string): { x: number; y: number } {
  let hash = 0;
  for (let i = 0; i < techName.length; i++) {
    hash = techName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const xOffset = ((hash % 100) / 100) * 4 - 2;
  const yOffset = (((hash >> 8) % 100) / 100) * 4 - 2;
  return { x: xOffset, y: yOffset };
}
```

**Fonctionnalités:**
- ✅ Graphique SVG interactif avec courbe en S
- ✅ Zoom (+, -, reset) jusqu'à 4x
- ✅ Pan (cliquer-glisser) quand zoomé
- ✅ Filtrage par catégorie
- ✅ 9 codes couleur par catégorie
- ✅ Légende interactive
- ✅ Tooltips au survol
- ✅ Liste synchronisée avec barres de progression
- ✅ Points légèrement décalés pour éviter chevauchement
- ✅ Points d'inflexion à 30% et 70% (semi-transparents)

#### **Page Réalisations** (`/realisations`)

**Système de filtrage:**
```typescript
let selectedCategory = $state<string | null>(null);
let selectedYear = $state<string | null>(null);

const filteredProjects = $derived.by(() => {
  let filtered = projectsData;
  if (selectedCategory) {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }
  if (selectedYear) {
    filtered = filtered.filter(p => p.year === selectedYear);
  }
  return filtered;
});
```

**Cartes de projets:**
- Catégorie et année
- Statut (✓ complété, ⏳ en cours, 📅 planifié)
- Description
- Réalisations clés (2 affichées)
- Technologies utilisées (tags)
- Hover effects

**Anonymisation:** Les noms de clients sensibles sont remplacés par des termes génériques pour la confidentialité.

#### **Page Incubateur Numérique** (`/incubateur`)

**Structure en accordéon:**
```typescript
let expandedSections = $state<string[]>(['genesis']);

function toggleSection(section: string) {
  if (expandedSections.includes(section)) {
    expandedSections = expandedSections.filter(s => s !== section);
  } else {
    expandedSections = [...expandedSections, section];
  }
}
```

**Sections:**
1. **La genèse** - Origine du concept
2. **L'objectif** - Vision et mission
3. **2025** - État actuel
4. **Équipements** - Matériel disponible
5. **Logiciels** - Applications organisées en 6 catégories
6. **La suite** - Projets futurs

**Cartes d'applications:**
```svelte
<div class="app-card">
  <div class="app-icon">{app.icon}</div>
  <div class="app-info">
    <h4>{app.name}</h4>
    <p>{$t(app.description)}</p>
  </div>
</div>
```

---

### 7. Composants réutilisables

#### Structure recommandée pour les composants

```
src/lib/components/
├── Header.svelte        # En-tête avec navigation
├── Footer.svelte        # Pied de page
├── ThemeToggle.svelte   # Bouton thème clair/sombre
├── LanguageSwitch.svelte # Sélecteur de langue
└── Card.svelte          # Carte générique
```

#### Exemple de composant typé
```svelte
<script lang="ts">
  interface Props {
    title: string;
    description?: string;
    onClick?: () => void;
  }

  let { title, description, onClick }: Props = $props();
</script>

<div class="card" onclick={onClick}>
  <h3>{title}</h3>
  {#if description}
    <p>{description}</p>
  {/if}
</div>
```

---

### 8. Patterns Svelte 5 utilisés

#### **Runes** - Nouvelle API de réactivité

**$state** - État réactif local
```typescript
let count = $state(0);
let user = $state({ name: 'Jean', age: 30 });
```

**$derived** - Valeurs dérivées
```typescript
let count = $state(0);
let doubled = $derived(count * 2);

// Version complexe
const filteredList = $derived.by(() => {
  return items.filter(item => item.active);
});
```

**$effect** - Effets secondaires
```typescript
$effect(() => {
  console.log(`Count is now: ${count}`);
  // Cleanup automatique
});
```

**$props** - Props de composant
```typescript
interface Props {
  title: string;
  count?: number;
}

let { title, count = 0 }: Props = $props();
```

#### **Réactivité fine**

Svelte 5 suit les dépendances précisément:
```svelte
{#if user.name}
  <!-- Se met à jour seulement si user.name change -->
  <p>{user.name}</p>
{/if}
```

---

### 9. Styling et design system

#### **Conventions de nommage CSS**

```css
.page-container       /* Conteneur principal */
.page-header         /* En-tête de page */
.page-title          /* Titre principal */
.section-name        /* Section spécifique */
.component-element   /* Élément d'un composant */
```

#### **Variables CSS personnalisées**

**Couleurs:**
- `--color-primary`: Couleur principale (bleu par défaut)
- `--color-accent`: Couleur d'accent (jaune par défaut)
- `--bg-primary/secondary/tertiary`: Niveaux de fond
- `--text-primary/secondary/muted`: Niveaux de texte
- `--border-color`: Couleur des bordures

**Espacements:**
- `--spacing-xs`: 0.25rem
- `--spacing-sm`: 0.5rem
- `--spacing-md`: 1rem
- `--spacing-lg`: 1.5rem
- `--spacing-xl`: 2rem

**Ombres:**
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
```

#### **Responsive design**

Breakpoints Tailwind:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

Exemple:
```css
@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

### 10. Build et déploiement

#### **Commandes de build**

```bash
# Développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview

# Vérification TypeScript
npm run check

# Linting et formatting
npm run lint
npm run format
```

#### **Process de build**

1. **Vite compile** les fichiers TypeScript et Svelte
2. **Tailwind** génère le CSS optimisé
3. **SvelteKit** pré-génère toutes les routes statiques
4. **Output** dans le dossier `build/`

#### **Structure du build**

```
build/
├── _app/
│   ├── immutable/      # Assets avec hash (cacheable)
│   └── version.json
├── index.html          # Page d'accueil
├── profondeur.html     # Page profondeur
├── realisations.html   # Page réalisations
└── ...autres pages
```

#### **Déploiement sur cPanel**

1. Build du projet: `npm run build`
2. Upload du contenu du dossier `build/` vers `public_html/`
3. Configuration `.htaccess` pour SPA routing (si nécessaire):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

### 11. Performance et optimisations

#### **Code splitting**

SvelteKit charge automatiquement:
- Les routes de manière lazy (chargement à la demande)
- Les traductions par langue
- Les composants de manière optimale

#### **Pré-rendering**

Toutes les pages sont pré-générées en HTML statique:
- SEO optimal
- Temps de chargement minimal
- Fonctionne sans JavaScript

#### **Optimisations CSS**

- Tailwind purge les classes inutilisées
- CSS critique inline dans `<head>`
- Variables CSS pour éviter la duplication

#### **Optimisations d'images**

Recommandations:
- Utiliser WebP avec fallback
- Lazy loading avec `loading="lazy"`
- Responsive images avec `srcset`

---

### 12. Maintenance et évolution

#### **Ajouter une nouvelle technologie**

1. Ouvrir `src/lib/data/technical-depth-data.ts`
2. Ajouter l'entrée:
```typescript
{ name: 'Rust', category: 'Programmation', level: 50 }
```
3. La technologie apparaît automatiquement sur la courbe et dans la liste

#### **Ajouter un nouveau projet**

1. Ouvrir `src/lib/data/projects-data.ts`
2. Ajouter l'entrée:
```typescript
{
  id: 'projet-x',
  title: 'Projet X',
  category: 'innovation',
  year: '2025',
  description: '...',
  status: 'in-progress'
}
```

#### **Ajouter une nouvelle traduction**

1. Ouvrir `src/lib/i18n/locales/fr.json` (et en.json, es.json)
2. Ajouter la clé:
```json
{
  "section": {
    "newKey": "Nouvelle traduction"
  }
}
```
3. Utiliser dans le composant: `{$t('section.newKey')}`

#### **Créer une nouvelle page**

1. Créer `src/routes/nouvelle-page/+page.svelte`
2. Ajouter le contenu:
```svelte
<script lang="ts">
  import { t } from 'svelte-i18n';
</script>

<div class="page-container">
  <h1>{$t('newPage.title')}</h1>
</div>
```
3. La route `/nouvelle-page` est automatiquement disponible

---

### 13. Bonnes pratiques

#### **TypeScript**

- Toujours typer les interfaces
- Utiliser `$props()` pour les composants
- Éviter `any`, préférer `unknown`

#### **Svelte**

- Utiliser les runes Svelte 5 (`$state`, `$derived`, `$effect`)
- Éviter la mutation directe, préférer la réassignation
- Nommer les event handlers avec `handle` prefix

#### **CSS**

- Utiliser les variables CSS pour les valeurs réutilisables
- Scoper les styles dans les composants
- Mobile-first pour le responsive

#### **Accessibilité**

- Utiliser les balises sémantiques (`<nav>`, `<main>`, `<article>`)
- Ajouter `aria-label` aux boutons sans texte
- Assurer le contraste des couleurs (WCAG AA minimum)

#### **Sécurité**

- Pas de données sensibles dans le code client
- Anonymiser les informations confidentielles
- Valider les entrées utilisateur

---

## Diagrammes d'architecture

### Flux de données - Page Profondeur Technique

```
technical-depth-data.ts
        ↓
    technologies[]
        ↓
  profondeur/+page.svelte
        ↓
  ┌─────────────────────┐
  │  Filtrage catégorie │ → selectedCategory ($state)
  └─────────────────────┘
        ↓
  filteredTechnologies ($derived)
        ↓
  ┌──────────────────────────────────┐
  │  Graphique SVG                   │
  │  - Courbe en S (logistique)      │
  │  - Points (+ offset anti-overlap)│
  │  - Zoom/Pan (transform)          │
  │  - Couleurs par catégorie        │
  └──────────────────────────────────┘
        ↓
  Tooltip (hoveredTech)
```

### Flux de thème

```
localStorage
    ↓
Settings Page
    ↓
applySettings()
    ↓
CSS Variables (--color-primary, --bg-primary, etc.)
    ↓
document.documentElement.style.setProperty()
    ↓
Tous les composants (via rgb(var(--color-primary)))
```

### Flux i18n

```
i18n/locales/*.json
        ↓
    register()
        ↓
      init()
        ↓
   +layout.svelte
        ↓
    $locale store
        ↓
   $t('key') dans composants
        ↓
    Texte traduit
```

---

## Conclusion

Cette architecture offre:

✅ **Modularité** - Composants réutilisables et données séparées
✅ **Performance** - Pré-rendering, code splitting, CSS optimisé
✅ **Maintenabilité** - TypeScript, structure claire, documentation
✅ **Évolutivité** - Facile d'ajouter pages, technologies, traductions
✅ **UX moderne** - Animations, thèmes, multilingue, interactivité
✅ **SEO-friendly** - HTML statique, métadonnées, accessibilité

Le site est prêt pour la production et peut être facilement étendu avec de nouvelles fonctionnalités.

---

**Version**: 1.0
**Dernière mise à jour**: 2025-01-13
**Auteur**: Architecture documentée pour CV-Svelte
