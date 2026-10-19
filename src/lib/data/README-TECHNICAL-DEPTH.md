# Guide de configuration - Profondeur Technique

Ce fichier explique comment ajuster et ajouter des technologies dans la visualisation de la courbe en S.

## Fichier à modifier

📁 `src/lib/data/technical-depth-data.ts`

## Comment ajuster le niveau d'une technologie

1. Ouvrez le fichier `technical-depth-data.ts`
2. Trouvez la technologie que vous souhaitez modifier
3. Changez la valeur de `level` (entre 0 et 100)

### Exemple :
```typescript
{ name: 'Python', category: 'Programmation', level: 85 },
```

Pour augmenter le niveau de Python à 90% :
```typescript
{ name: 'Python', category: 'Programmation', level: 90 },
```

## Zones de la courbe en S

### 🔴 Zone Néophyte (0-30%)
**"On ne sait pas ce qu'on ne sait pas"**

Vous découvrez la technologie. L'apprentissage est lent car vous n'avez pas encore le contexte nécessaire pour comprendre les concepts avancés.

**Exemples de niveau :**
- 10-15% : Vous avez entendu parler, fait un tutoriel basique
- 20-25% : Vous pouvez faire des tâches simples avec de l'aide
- 28-30% : Vous commencez à comprendre les concepts de base

### 🟡 Zone Apprentissage (30-70%)
**"On commence à savoir ce qu'on ne sait pas"**

Phase d'apprentissage rapide. Vous comprenez les fondamentaux et vous savez identifier ce que vous devez encore apprendre.

**Exemples de niveau :**
- 35-45% : Vous êtes autonome pour les tâches courantes
- 50-60% : Vous pouvez résoudre la plupart des problèmes
- 65-70% : Vous maîtrisez bien la technologie, commencez à l'optimiser

### 🟢 Zone Expert (70-100%)
**"Maîtrise approfondie, taux d'apprentissage diminue"**

Vous avez une expertise solide. Le taux d'apprentissage ralentit car vous connaissez déjà l'essentiel.

**Exemples de niveau :**
- 72-80% : Vous êtes considéré comme référence dans votre équipe
- 82-90% : Vous pouvez enseigner et créer des architectures complexes
- 92-100% : Vous êtes un expert reconnu, vous contribuez à la communauté

## Comment ajouter une nouvelle technologie

### Méthode 1 : Ajouter dans une catégorie existante

Trouvez la section appropriée dans le fichier et ajoutez votre technologie :

```typescript
// ============================================
// PROGRAMMATION ET DÉVELOPPEMENT (60-85%)
// ============================================
{ name: 'Python', category: 'Programmation', level: 85 },
{ name: 'JavaScript/TypeScript', category: 'Programmation', level: 78 },
// Ajoutez votre nouvelle technologie ici :
{ name: 'Rust', category: 'Programmation', level: 50 },
```

### Méthode 2 : Créer une nouvelle catégorie

Si la technologie ne correspond à aucune catégorie existante :

```typescript
// ============================================
// BLOCKCHAIN ET WEB3 (40-60%) <- Nouvelle catégorie
// ============================================
{ name: 'Ethereum', category: 'Blockchain', level: 55 },
{ name: 'Solidity', category: 'Blockchain', level: 48 },
{ name: 'Smart Contracts', category: 'Blockchain', level: 52 },
```

## Catégories actuelles

- **Gestion** : Compétences en gestion de l'innovation et projets
- **Domaines** : Domaines d'expertise sectoriels (aérospatiale, santé, etc.)
- **Bureautique** : Suite Microsoft Office et Power Platform
- **Programmation** : Langages et frameworks de développement
- **IA** : Intelligence artificielle et science des données
- **Modélisation** : CAO et impression 3D
- **Contenu** : Création audio/vidéo
- **Infrastructure** : DevOps, cloud, bases de données
- **Hardware** : Électronique et systèmes embarqués

## Structure d'une technologie

```typescript
{
  name: string;        // Nom affiché (ex: "Python")
  category: string;    // Catégorie pour le filtre (ex: "Programmation")
  level: number;       // Niveau de 0 à 100
  description?: string; // (Optionnel) Description courte
}
```

## Conseils pour évaluer votre niveau

### Questions à se poser :

1. **Autonomie** : Puis-je accomplir des tâches complexes sans aide ?
2. **Résolution de problèmes** : Suis-je capable de déboguer et optimiser ?
3. **Enseignement** : Pourrais-je former quelqu'un d'autre ?
4. **Architecture** : Puis-je concevoir des solutions complètes ?
5. **Communauté** : Est-ce que je contribue à l'écosystème ?

### Échelle de référence :

| Niveau | Description |
|--------|-------------|
| 0-15   | Débutant absolu, première exposition |
| 15-30  | Débutant, comprend les bases |
| 30-45  | Débutant avancé, autonome sur tâches simples |
| 45-60  | Intermédiaire, résout la plupart des problèmes |
| 60-75  | Intermédiaire avancé, maîtrise solide |
| 75-85  | Avancé, peut enseigner et architecturer |
| 85-95  | Expert, référence dans le domaine |
| 95-100 | Expert reconnu, contributions majeures |

## Après modification

1. Sauvegardez le fichier `technical-depth-data.ts`
2. Le site se rechargera automatiquement (mode dev)
3. Vérifiez que votre technologie apparaît dans le graphique et la liste

## Exemples de modifications courantes

### Augmenter progressivement en apprenant :
```typescript
// Avant :
{ name: 'Docker', category: 'Infrastructure', level: 45 },

// Après quelques mois de pratique :
{ name: 'Docker', category: 'Infrastructure', level: 68 },
```

### Ajouter une stack complète :
```typescript
// ============================================
// STACK BLOCKCHAIN (nouveau)
// ============================================
{ name: 'Ethereum', category: 'Blockchain', level: 50 },
{ name: 'Web3.js', category: 'Blockchain', level: 45 },
{ name: 'Solidity', category: 'Blockchain', level: 42 },
{ name: 'Hardhat', category: 'Blockchain', level: 48 },
```

## Questions fréquentes

**Q : Dois-je tout mettre dans la zone expert ?**
R : Non ! L'honnêteté est importante. La diversité des niveaux montre votre largeur de compétences.

**Q : Puis-je avoir plusieurs technologies au même niveau ?**
R : Oui, absolument. C'est même fréquent dans les technologies connexes.

**Q : Quand dois-je créer une nouvelle catégorie ?**
R : Quand vous avez 3+ technologies d'un même domaine qui ne correspondent à aucune catégorie existante.

**Q : Les pourcentages sont-ils visibles publiquement ?**
R : Oui, ils apparaissent dans le graphique et la liste des technologies.

---

**Note** : Ce fichier est automatiquement synchronisé avec la page "Profondeur technique" du site.
