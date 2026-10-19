# Guide de test - CV-Svelte

## Installation des dépendances de test

Les dépendances de test sont déjà configurées dans `package.json`. Pour les installer :

```bash
npm install
```

## Exécution des tests

### Exécuter tous les tests une fois
```bash
npm test
```

### Exécuter les tests en mode watch (ré-exécute automatiquement quand les fichiers changent)
```bash
npm run test:watch
```

### Exécuter les tests avec interface UI interactive
```bash
npm run test:ui
```

### Exécuter les tests avec rapport de couverture
```bash
npm run test:coverage
```

## Structure des tests

```
src/
├── lib/
│   └── data/
│       ├── technical-depth-data.test.ts    # Tests pour données techniques
│       └── projects-data.test.ts           # Tests pour données projets
├── routes/
│   └── profondeur/
│       └── profondeur.test.ts              # Tests pour page profondeur
└── tests/
    └── setup.ts                            # Configuration globale des tests
```

## Tests implémentés

### 1. Tests des données techniques (`technical-depth-data.test.ts`)

**Couverture :**
- ✅ Validation du tableau `technologies`
  - Technologies non vides
  - Structure valide des objets
  - Niveaux entre 0-100
  - Pas de doublons de noms

- ✅ Validation du tableau `zones`
  - Exactement 3 zones
  - Structure valide
  - Couverture 0-100% sans gaps

- ✅ Fonction `getCategories()`
  - Retourne catégories uniques
  - Inclut les catégories attendues

- ✅ Fonction `getTechnologiesByCategory()`
  - Filtre correctement par catégorie
  - Retourne tableau vide pour catégorie invalide
  - Somme égale au total

- ✅ Fonction `getTechStats()`
  - Structure correcte de l'objet retourné
  - Compte total correct
  - Somme des zones égale au total
  - Catégorisation correcte par zones
  - Moyenne valide et correcte

**Exemple de test :**
```typescript
it('should have levels between 0 and 100', () => {
  technologies.forEach((tech) => {
    expect(tech.level).toBeGreaterThanOrEqual(0);
    expect(tech.level).toBeLessThanOrEqual(100);
  });
});
```

### 2. Tests des données projets (`projects-data.test.ts`)

**Couverture :**
- ✅ Validation du tableau `projectsData`
  - Projets non vides
  - Structure valide des objets
  - IDs uniques
  - Format d'année valide (YYYY)
  - Status valides (completed/in-progress/planned)

- ✅ Validation du tableau `projectCategories`
  - Catégories non vides
  - IDs et noms uniques

- ✅ Fonction `getAvailableYears()`
  - Retourne années uniques
  - Trié en ordre décroissant
  - Contient seulement années de projets

- ✅ Intégrité des données
  - Références de catégories valides
  - Au moins un projet par catégorie
  - Pas d'informations sensibles (anonymisation)

**Exemple de test :**
```typescript
it('should not have sensitive information in anonymized projects', () => {
  const sensitiveKeywords = ['CRIAQ', 'Aéro Montréal'];

  projectsData.forEach((project) => {
    sensitiveKeywords.forEach((keyword) => {
      expect(project.title).not.toContain(keyword);
    });
  });
});
```

### 3. Tests de la page profondeur (`profondeur.test.ts`)

**Couverture :**
- ✅ Calculs de courbe en S
  - Fonction logistique correcte
  - Valeurs dans range 0-100
  - Valeur ~50 au point médian
  - Fonction monotone croissante
  - Points d'inflexion à 30% et 70%

- ✅ Transformations de coordonnées
  - `xToScreen()` - mapping correct
  - `yToScreen()` - mapping inversé correct
  - Linéarité des transformations

- ✅ Calcul d'offset anti-chevauchement
  - Offsets dans range attendu (-2 à +2)
  - Déterministe (même résultat pour même input)
  - Différent pour inputs différents

- ✅ Fonctionnalité zoom/pan
  - Zoom limité à 4x maximum
  - Dézoom limité à 1x minimum
  - Facteur de zoom correct (1.3)
  - Reset pan quand zoom = 1

- ✅ Couleurs par catégorie
  - 9 catégories
  - Format RGB valide
  - Couleurs uniques

- ✅ Filtrage
  - Retourne tous si pas de filtre
  - Filtre correctement par catégorie
  - Tableau vide pour catégorie inexistante

**Exemple de test complexe :**
```typescript
it('should have inflection points around 30% and 70%', () => {
  const epsilon = 0.1;

  // Calcul de la dérivée seconde approximative à 30%
  const y30minus = calculateSCurveY(30 - epsilon);
  const y30 = calculateSCurveY(30);
  const y30plus = calculateSCurveY(30 + epsilon);
  const secondDerivative30 = (y30plus - 2 * y30 + y30minus) / (epsilon * epsilon);

  // La dérivée seconde devrait être proche de 0 au point d'inflexion
  expect(Math.abs(secondDerivative30)).toBeLessThan(0.5);
});
```

## Configuration des tests

### `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts']
  }
});
```

### `src/tests/setup.ts`

Configure l'environnement de test :
- Mock de `localStorage`
- Mock de `window.matchMedia`
- Configuration globale pour tous les tests

## Bonnes pratiques

### Écrire un nouveau test

1. **Créer le fichier de test** à côté du fichier source avec extension `.test.ts`
   ```
   src/lib/utils/myFunction.ts
   src/lib/utils/myFunction.test.ts
   ```

2. **Structure de base**
   ```typescript
   import { describe, it, expect } from 'vitest';
   import { myFunction } from './myFunction';

   describe('myFunction', () => {
     it('should do something', () => {
       const result = myFunction(input);
       expect(result).toBe(expectedOutput);
     });
   });
   ```

3. **Grouper les tests connexes**
   ```typescript
   describe('User management', () => {
     describe('createUser', () => {
       it('should create user with valid data', () => {
         // ...
       });

       it('should reject user with invalid email', () => {
         // ...
       });
     });
   });
   ```

### Assertions communes

```typescript
// Égalité
expect(value).toBe(10);
expect(value).toEqual({ name: 'Test' });

// Comparaisons
expect(value).toBeGreaterThan(5);
expect(value).toBeLessThanOrEqual(100);
expect(value).toBeCloseTo(3.14, 2); // Précision 2 décimales

// Types
expect(value).toBeDefined();
expect(value).toBeNull();
expect(value).toBeTruthy();
expect(Array.isArray(value)).toBe(true);

// Tableaux et objets
expect(array).toContain('item');
expect(object).toHaveProperty('key');
expect(array.length).toBe(5);

// Exceptions
expect(() => dangerousFunction()).toThrow();
```

### Tests asynchrones

```typescript
it('should fetch data', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});
```

## Couverture de code

Pour générer un rapport de couverture complet :

```bash
npm run test:coverage
```

Le rapport sera généré dans `coverage/` et affichera :
- Pourcentage de lignes couvertes
- Pourcentage de branches couvertes
- Pourcentage de fonctions couvertes
- Fichiers non couverts

### Objectifs de couverture

- **Données** : ≥ 90% (critique pour l'intégrité)
- **Logique métier** : ≥ 80%
- **Utilitaires** : ≥ 85%
- **Composants UI** : ≥ 60% (tests d'intégration recommandés)

## Tests d'intégration (à venir)

Pour tester les composants Svelte interactifs :

```typescript
import { render, fireEvent } from '@testing-library/svelte';
import MyComponent from './MyComponent.svelte';

it('should handle click event', async () => {
  const { getByText } = render(MyComponent);
  const button = getByText('Click me');

  await fireEvent.click(button);

  expect(getByText('Clicked!')).toBeInTheDocument();
});
```

## CI/CD Integration

### GitHub Actions example

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm test
      - run: npm run test:coverage
```

## Débogage des tests

### Mode debug

```bash
# Exécuter un seul fichier de test
npx vitest run src/lib/data/technical-depth-data.test.ts

# Mode verbose
npx vitest --reporter=verbose

# Utiliser l'UI pour déboguer
npm run test:ui
```

### Utiliser `console.log` dans les tests

```typescript
it('should debug values', () => {
  const result = myFunction();
  console.log('Result:', result); // Visible dans la console
  expect(result).toBeDefined();
});
```

### Tests focus et skip

```typescript
// Exécuter seulement ce test
it.only('should run only this test', () => {
  // ...
});

// Ignorer ce test
it.skip('should skip this test', () => {
  // ...
});
```

## Ressources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/svelte-testing-library/intro)
- [Svelte Testing Guide](https://svelte.dev/docs/testing)

## Maintenance

### Mettre à jour les tests après modifications

1. **Modification de données** : Mettre à jour les tests correspondants
2. **Nouvelle fonctionnalité** : Ajouter nouveaux tests
3. **Bug fix** : Ajouter test de régression

### Exécuter les tests avant commit

```bash
# Vérifier que tout fonctionne
npm test
npm run check
npm run lint
```

---

**Dernière mise à jour** : 2025-01-13
**Coverage actuelle** : ~95% pour les fichiers de données
