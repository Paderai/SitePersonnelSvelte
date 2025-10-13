# Guide de déploiement sur cPanel

Ce guide explique comment déployer votre site CV-Svelte sur cPanel pour www.sciencesconnexions.com.

## 📦 Pré-requis

- Accès à votre compte cPanel
- Le site a été construit avec `npm run build`
- Le dossier `build` contient tous les fichiers statiques

## 🚀 Étapes de déploiement

### 1. Préparer les fichiers

Le build a créé un dossier `build` avec tous les fichiers nécessaires :
- Fichiers HTML pour chaque page
- Dossier `_app` avec les assets (JS, CSS, images)
- Images statiques (photo-profile.jpg)
- robots.txt

**Important** : Les fichiers Word (.docx) dans le dossier `build` ne sont pas nécessaires pour la production. Vous pouvez les supprimer avant le déploiement :
- CV_François-Provencher_Innovitech Sept 2024.docx
- Réalisations_FP_Innovitech 2025-06-10b.docx

### 2. Connexion à cPanel

1. Connectez-vous à votre cPanel
2. Naviguez vers **Gestionnaire de fichiers** (File Manager)
3. Allez dans le répertoire `public_html` de votre domaine www.sciencesconnexions.com

### 3. Upload des fichiers

**Option A : Via le gestionnaire de fichiers cPanel**

1. Dans `public_html`, supprimez tous les anciens fichiers (si nécessaire, faites une sauvegarde d'abord)
2. Cliquez sur **Upload** dans le gestionnaire de fichiers
3. Sélectionnez tous les fichiers du dossier `build` (sauf les .docx)
4. Attendez que l'upload soit terminé

**Option B : Via FTP**

1. Connectez-vous via FTP (FileZilla, WinSCP, etc.)
2. Naviguez vers `public_html`
3. Uploadez tout le contenu du dossier `build` (sauf les .docx)
4. Assurez-vous que la structure est préservée :
   ```
   public_html/
   ├── _app/
   │   ├── immutable/
   │   └── version.json
   ├── index.html
   ├── bio.html
   ├── francois_provencher.html
   ├── realisations.html
   ├── settings.html
   ├── photo-profile.jpg
   └── robots.txt
   ```

### 4. Configuration du .htaccess (optionnel mais recommandé)

Créez ou modifiez le fichier `.htaccess` dans `public_html` pour améliorer les performances et la sécurité :

```apache
# Activer la compression Gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache des ressources statiques
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Redirection HTTPS (si certificat SSL installé)
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Pages d'erreur personnalisées
ErrorDocument 404 /index.html
```

### 5. Vérification

1. Visitez https://www.sciencesconnexions.com
2. Testez toutes les pages :
   - ✅ Page d'accueil
   - ✅ Biographie
   - ✅ CV
   - ✅ Réalisations
   - ✅ Paramètres
3. Testez les fonctionnalités :
   - ✅ Changement de thème (clair/sombre)
   - ✅ Changement de langue (FR/EN/ES)
   - ✅ Navigation mobile (menu burger)
   - ✅ Filtres de projets
   - ✅ Sauvegarde des paramètres

## 🔄 Mises à jour futures

Pour mettre à jour le site après des modifications :

1. Modifiez votre code localement
2. Exécutez `npm run build`
3. Uploadez uniquement les fichiers modifiés vers cPanel
4. Videz le cache de votre navigateur pour voir les changements

**Astuce** : Les fichiers dans `_app/immutable/` ont des noms avec hash qui changent à chaque build, donc pas besoin de vider le cache navigateur pour ces fichiers.

## 🛠️ Résolution de problèmes

### Le site ne s'affiche pas correctement

- Vérifiez que tous les fichiers ont été uploadés
- Vérifiez les permissions (755 pour les dossiers, 644 pour les fichiers)
- Videz le cache de votre navigateur (Ctrl+Shift+R)

### Les liens ne fonctionnent pas

- Vérifiez que tous les fichiers .html sont présents
- Vérifiez le fichier .htaccess
- Assurez-vous que le dossier `_app` est complet

### Les styles CSS ne s'appliquent pas

- Vérifiez que le dossier `_app/immutable/` contient tous les fichiers CSS
- Inspectez la console du navigateur pour voir les erreurs 404
- Vérifiez les permissions des fichiers

### Les paramètres ne se sauvegardent pas

- C'est normal, ils sont sauvegardés dans le localStorage du navigateur
- Chaque visiteur aura ses propres préférences
- Les paramètres sont liés au navigateur et à l'appareil

## 📊 Structure du site déployé

```
www.sciencesconnexions.com/
├── index.html              # Page d'accueil
├── bio.html               # Page biographie
├── francois_provencher.html # Page CV
├── realisations.html      # Page réalisations
├── settings.html          # Page paramètres
├── innovation.html        # Page gestion de l'innovation (placeholder)
├── profondeur.html        # Page profondeur technique (placeholder)
├── incubateur.html        # Page incubateur (placeholder)
├── blog.html             # Page blog (placeholder)
├── photo-profile.jpg     # Photo de profil
├── robots.txt           # SEO
└── _app/                # Assets Svelte
    ├── immutable/       # Fichiers JS/CSS avec hash
    │   ├── assets/      # CSS
    │   ├── chunks/      # JS chunks
    │   ├── entry/       # Points d'entrée
    │   └── nodes/       # Composants de page
    └── version.json     # Version du build
```

## 🎯 Checklist finale

Avant de déployer en production :

- [ ] Build réussi sans erreurs
- [ ] Test en local avec `npm run preview`
- [ ] Suppression des fichiers .docx du dossier build
- [ ] Backup de l'ancien site (si applicable)
- [ ] Upload de tous les fichiers
- [ ] Configuration .htaccess
- [ ] Test de toutes les pages
- [ ] Test sur mobile
- [ ] Test des 3 langues (FR/EN/ES)
- [ ] Test du thème clair/sombre
- [ ] Vérification SEO (balises meta, robots.txt)

## 📧 Support

Pour toute question ou problème, référez-vous à :
- Documentation SvelteKit : https://kit.svelte.dev/docs
- Documentation adapter-static : https://kit.svelte.dev/docs/adapter-static
- Support cPanel de votre hébergeur

---

**Date du dernier build** : 12 octobre 2025
**Version** : 1.0.0
**Statut** : ✅ Prêt pour production
