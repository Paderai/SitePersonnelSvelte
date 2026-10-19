Projet: Site web personnel avec Svelte 5


# Site initial V1.0.0

Je veux me faire un site personnel avec Svelte 5. Je veux me créer un site personnel en svelte. Je veux intialement 5 pages: 1 page d'accueuil, 1 pages avec ma biographie, une page avec mon CV, une page avec mes principales réalisations et une page avec mes principes en gestion de l'innovation. Génère une palette de couleur en utilisant le bleu (50,125,200) comme couleur de base. Je veux que le site puisse être en anglais et en français , qu'il soit réactif pour ordinateur, tablette et téléphone et qu'il puisse être affiché en dark ou light mode. J'ai déjà un nom de domaine (www.sciencesconnexions.com) et j'utilise cPanel pour la gestion des fichiers. Je veux que mon CV soit à l'adresse www.sciencesconnexions.com/francois_provencher. 

Je suis un ingénieur et consultant en innovation. Je vuex que le site puisse servir de vitrine pour me présenter auprès de mes clients, qu'il ait un look très professionnel. Le site va être hosté avec cPanel chez un hégergeur WHC.CA. 

J'a commencé à développer des applications avec Svelte que je voudrais accéder à partir de mon site web en entrant un mot de passe(authentication). 

Requis: 
1) Site web moderne développé comme full stack application avec sveltekit et svelte 5
2) ultilingue (anglais, français, espagnol au début et possibilité d'ajouter d'autres langues)
3) Mode clair/dark
4) section du site qui demande un mot de passe pour changer les paramètres et donner accèes à des applications customs. 
5) Pages de paramèetres pour modifier l'ensemble des paramètres du look and feel (palette de couleur, polices, tailles de caractères, etc.). 
6) Je veux pouvoir contrôler centralement le look & feel de plusieurs applications différentes (pas juste ce site)



Voici les technologies que je veux utiliser:
SVELTE 5
SQLite 
FASTAPI BetterSQL
ShadCN velte
taillwindcss

🧱 Structure du site (pages)
- Accueil (/) : avec photo dans un cercle, paragraphe d'introduction a côté et quelques paragraphes de textes en dessous. Dark mode par défaut et footer avec copyrights, contacts, etc.

- Biographie (/bio): Ma biographie en textex

- CV (/francois_provencher) - mon CV avec accordéon pour les différentes parties 

- Exemples de réalisations (/realisations): la liste de projets sur lesquels j'ai travaillé. avec des cartes. 

- Gestion de l’innovation (/innovation)

- Profondeur technique (/profondeur)

- Incubateur numérique (/incubateur)

- Blog 

- Applications (/applications)
  - Panneau d'authentification (/autenthiciation)
  - Paramètres de l'applicaton (/parameter)
  - Autres applications à venir







J'aime beaucoup le look and feel de ces sites. Tu peux t'en inspirer pour le design:

 Tabulio: https://www.tabulio.com/

Innoation 360: https://innovation360.com/

MKinsey : https://www.mckinsey.com/


# To dos pour la version 2:


## Complété

1) Complète la page blog. Je veux que les visiteurs puissent voire les posts du blogs, mais que seul l'administrateur du site (moi) puisse créer un post de blog après avoir entré un mot de passe pour entrer dans la section administration du site. 
3) Dans le footer (à peu près au milieur) ajoute le texte suivant: Notice d'utilisation de l'IA générative: L'IA générative (Claude Sonnet 4.5 Code) a été utilisée pour l'assistance à l'écriture du code de ce site web ainsi que pour la tracduction des textes. Tout le contenu a été généré humainement. 
4) Ajouter un compteur du nombre de visiteurs en bas à droite, en dessous de la notice copyright
5) Ajoute mon compte flipboard: 
'https://flipboard.com/@SConnexions?from=share&utm_source=flipboard&utm_medium=curator_share'  dans mes médias sociaux 
1) À la place de ingénieur consultant en innovation, mets: Innovateur curieux et passionné, centré sur l'humain et guidé par les données. n'oublie pas de traduire en anglais et espagnol
2) corrige le pull-down pour les langues. On utilise français québécois et anglais canadiens.
3) Dans le footer (à peu près au milieur) ajoute le texte suivant: Notice d'utilisation de l'IA générative: L'IA générative (Claude Sonnet 4.5 Code) a été utilisée pour l'assistance à l'écriture du code de ce site web ainsi que pour la tracduction des textes. Tout le contenu a été généré humainement. 
4) enlève la carte pour la notice d'utilisation de l'IA générative. Garde la notice, mais mets la moins visible et plus comme une note de bas de pabe ou un disclaimer. 
5) J'ai complété la première version de la page incubateur (http://localhost:5173/incubateur). Analyse le contenu de la page, corrige les faute d'orthographe, améliore le texte, améliore le layout (peut-être en utilisant un accordéon pour les sections). Améliore le layout pour les applications en créant une carte pour chaque application et ajoute le logo ce l'application et une courte description. Garde les applications dans leur section respective. finalement, fais la traduction en anglais et espagnol.

6) dans l'onglet réalisations, anonymise les cartes qui mentionnent le nom des clients pour des termes plus 
génériques. Par exemple, remplace CRIAQ par "consortium de recherche collaborative" et enlève la possibilité de 
downloader les réalisations 





5) J'ai complété la première version de la page incubateur (http://localhost:5173/incubateur). Analyse le contenu de la page, corrige les faute d'orthographe, améliore le texte, améliore le layout (peut-être en utilisant un accordéon pour les sections). Améliore le layout pour les applications en créant une carte pour chaque application et ajoute le logo ce l'application et une courte description. Garde les applications dans leur section respective. finalement, fais la traduction en anglais et espagnol.

6) dans l'onglet réalisations, anonymise les cartes qui mentionnent le nom des clients pour des termes plus 
génériques. Par exemple, remplace CRIAQ par "consortium de recherche collaborative" et enlève la possibilité de 
downloader les réalisations 

## A faire: 

7) > Pour l'onglet profondeur technique, j'aimerais représenter le positionnement des différentes    
 technologies que je maitrise le long d'une courbe en s. Pour moi le concept de profondeur        
technique est les suivant: Comprendre différences technologies suffissament en détail pour en     
avoir une bonne connaissance fonctionnelle sans nécessairement être expert en tout, mais en       
étant capable au besoin d'approfondir pour aller aussi loin que possible. Je divise la courbe     
en S en trois parties: 1) avant le premier point d'inflexion, c'est le moment ou on est 
néophyte. On en sais pas ce qu'on ne sais pas. 2) Après le premier point d'inflexion, dans la     
partie plus linéaire de la courbe en s, on devient plus familier et on commence à savoir ce       
qu'on ne sait pas. 3) Après l2 2ieme point d'inflexion, on devient expert et le taux 
d'apprentissage diminie. J'aimerais pouvoir représenter toues les technologies que je connais     
en % sur la courbe en s. 



ok, créé un document d'archicture de ce site web qui présente l'architecture et qui ensuite     
présente les différents éléments étape par étape. 

ok, fais-en un version htmk pour que je puisse l'imprimer. Ensuite développe des unit tests.  

Basé sur que tu sais sur moi et en utilisant le même look & feel, créée une landing page pour   
  le site sciencesconnexions.com et déplace la page d'accueuil actuelle sous
  sciencesconnexions.com/francois_provencher 

  > Remplace Découvrir par "Découvrir qui je suis" et remplace Expertise par "Profondeur technique" et remplace l'icône de l'ampoule par une autre    
 qui réflète mieux la profondeur technique. 

Complète les traductions pour les textes sur la page bio 

enlève la section P^ret à innover ensemble. J'aime le look and feel, mais je veux que ça reste mon site personnel