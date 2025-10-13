# Guide de connexion FTP depuis cPanel

## 📋 Méthode 1: Obtenir les informations FTP depuis cPanel

### Étape 1: Créer un compte FTP dans cPanel

1. **Connectez-vous à votre cPanel**
2. Dans la section **Fichiers**, cherchez **Comptes FTP** (FTP Accounts)
3. Cliquez sur **Comptes FTP**

### Étape 2: Créer ou utiliser un compte FTP existant

**Option A: Utiliser votre compte principal**
- **Hôte FTP**: Généralement `ftp.votredomaine.com` ou `votredomaine.com`
- **Nom d'utilisateur**: Votre nom d'utilisateur cPanel (souvent le même que votre login cPanel)
- **Mot de passe**: Votre mot de passe cPanel
- **Port**: 21 (FTP standard) ou 22 (SFTP/SSH si disponible)

**Option B: Créer un nouveau compte FTP**
1. Dans la page **Comptes FTP**, descendez à la section "Ajouter un compte FTP"
2. Remplissez:
   - **Identifiant**: Exemple: `siteupload`
   - **Mot de passe**: Créez un mot de passe fort
   - **Répertoire**: `/public_html` (pour accès direct au site)
   - **Quota**: Illimité ou selon vos besoins
3. Cliquez sur **Créer un compte FTP**

### Étape 3: Noter les informations de connexion

Une fois le compte créé, notez:
```
Hôte FTP: ftp.sciencesconnexions.com (ou IP du serveur)
Nom d'utilisateur: votre_compte_ftp@sciencesconnexions.com
Mot de passe: [votre mot de passe]
Port: 21 (FTP) ou 22 (SFTP)
```

---

## 💻 Méthode 2: Télécharger et configurer FileZilla (Recommandé)

### Étape 1: Télécharger FileZilla

1. Allez sur https://filezilla-project.org/
2. Téléchargez **FileZilla Client** (GRATUIT)
3. Installez le logiciel sur votre ordinateur

### Étape 2: Configurer la connexion dans FileZilla

1. **Ouvrez FileZilla**
2. Cliquez sur **Fichier** → **Gestionnaire de sites** (ou Ctrl+S)
3. Cliquez sur **Nouveau site**
4. Nommez-le: "SciencesConnexions"
5. **Remplissez les informations**:

   ```
   Protocole: FTP - File Transfer Protocol
   Hôte: ftp.sciencesconnexions.com
   Port: 21
   Chiffrement: Utiliser FTP explicite sur TLS si disponible
   Type d'authentification: Normal
   Identifiant: votre_compte_ftp@sciencesconnexions.com
   Mot de passe: [votre mot de passe]
   ```

6. Cliquez sur **Connexion**

### Étape 3: Naviguer et uploader

Une fois connecté:
- **Panneau gauche**: Votre ordinateur local
- **Panneau droit**: Votre serveur distant

**Pour uploader votre site**:
1. **Côté gauche (local)**: Naviguez vers `H:\ProjetsSveltes\CV-Svelte\build\`
2. **Côté droit (serveur)**: Naviguez vers `/public_html/`
3. **Sélectionnez tous les fichiers** dans le dossier `build` (Ctrl+A)
4. **Glissez-déposez** ou **clic droit** → **Upload**
5. ✅ FileZilla préservera la structure des dossiers, y compris `_app`

---

## 🔧 Méthode 3: Utiliser WinSCP (Alternative à FileZilla)

### Télécharger WinSCP
1. Allez sur https://winscp.net/
2. Téléchargez et installez WinSCP

### Configuration
1. **Ouvrez WinSCP**
2. Une fenêtre de connexion s'ouvre automatiquement
3. Remplissez:
   ```
   Protocole de fichier: FTP ou SFTP
   Nom d'hôte: ftp.sciencesconnexions.com
   Numéro de port: 21 (FTP) ou 22 (SFTP)
   Nom d'utilisateur: votre_compte_ftp@sciencesconnexions.com
   Mot de passe: [votre mot de passe]
   ```
4. Cliquez sur **Connexion**

### Upload
1. Naviguez vers `/public_html/` sur le serveur
2. Glissez-déposez le contenu du dossier `build` depuis votre PC

---

## 🌐 Méthode 4: FTP intégré dans cPanel (sans logiciel)

Certains cPanel ont un **client FTP web intégré**:

1. Dans cPanel, cherchez **FTP Web Disk** ou **Net2FTP**
2. Cliquez dessus
3. Entrez vos identifiants FTP
4. Utilisez l'interface web pour uploader (similaire au Gestionnaire de fichiers)

---

## 🔒 Méthode 5: SFTP (Plus sécurisé, si votre hébergeur le supporte)

Si votre hébergeur offre un accès SSH/SFTP:

### Dans FileZilla
```
Protocole: SFTP - SSH File Transfer Protocol
Hôte: sciencesconnexions.com (ou IP du serveur)
Port: 22
Type d'authentification: Normal
Identifiant: votre_username_cpanel
Mot de passe: [mot de passe cPanel]
```

### Dans WinSCP
```
Protocole de fichier: SFTP
Nom d'hôte: sciencesconnexions.com
Numéro de port: 22
Nom d'utilisateur: votre_username_cpanel
Mot de passe: [mot de passe cPanel]
```

---

## 📊 Comparaison des méthodes

| Méthode | Avantages | Inconvénients |
|---------|-----------|---------------|
| **ZIP via cPanel** | Simple, rapide, pas de logiciel | Nécessite extraction manuelle |
| **FileZilla** | Interface claire, gratuit, préserve structure | Installation nécessaire |
| **WinSCP** | Interface Windows native, très stable | Installation nécessaire |
| **FTP Web cPanel** | Aucune installation | Interface moins intuitive |
| **SFTP** | Plus sécurisé (chiffré) | Nécessite accès SSH |

---

## ⚠️ Résolution de problèmes

### Erreur: "Connexion refusée"
- Vérifiez que le port est correct (21 pour FTP, 22 pour SFTP)
- Vérifiez que votre hébergeur autorise les connexions FTP
- Vérifiez votre pare-feu Windows

### Erreur: "Authentification échouée"
- Vérifiez votre nom d'utilisateur (format: `user@domaine.com`)
- Vérifiez votre mot de passe
- Réinitialisez le mot de passe FTP dans cPanel si nécessaire

### Le dossier `_app` n'est pas visible après upload
- Vérifiez que vous êtes dans `/public_html/`
- Dans FileZilla, activez **Serveur** → **Forcer l'affichage des fichiers cachés**
- Rafraîchissez la vue (F5)

### Upload très lent
- Utilisez SFTP au lieu de FTP (si disponible)
- Compressez en ZIP et uploadez via cPanel
- Vérifiez votre connexion Internet

---

## ✅ Checklist après connexion FTP réussie

- [ ] Connexion FTP établie avec succès
- [ ] Navigation vers `/public_html/`
- [ ] Upload de tous les fichiers du dossier `build`
- [ ] Vérification de la structure (dossier `_app` présent)
- [ ] Suppression des fichiers .docx
- [ ] Test du site dans le navigateur

---

## 🎯 Recommandation

**Pour votre premier upload**, je recommande:

1. **Utiliser la méthode ZIP** (la plus simple):
   - Upload de `site-build.zip` via cPanel
   - Extraction dans cPanel

OU

2. **Utiliser FileZilla** (si vous uploadez régulièrement):
   - Télécharger et installer FileZilla
   - Configurer une connexion sauvegardée
   - Glisser-déposer le contenu de `build`

Les deux méthodes sont fiables et rapides!

---

**Besoin d'aide?** Si vous rencontrez des problèmes, vérifiez d'abord:
1. Les informations de connexion FTP dans cPanel
2. Que le port 21 n'est pas bloqué par votre pare-feu
3. Que vous êtes bien dans le bon répertoire (`/public_html/`)
