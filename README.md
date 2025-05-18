Boutaina Laassass
# TP React Hooks - Application de Gestion de Produits

Ce TP a pour objectif de mettre en pratique l'utilisation des Hooks React (useState, useEffect, useContext) ainsi que la création de Hooks personnalisés.

## Installation et configuration initiale

1. Cloner le dépôt :
```bash
git clone https://github.com/pr-daaif/tp-react-hooks.git
cd tp-react-hooks
```

2. Créer votre propre dépôt sur Github et changer le remote :
```bash
# Supprimer le remote origine
git remote remove origin

# Ajouter votre nouveau remote
git remote add origin https://github.com/[votre-username]/tp-react-hooks.git

# Premier push
git push -u origin main
```

3. Installer les dépendances :
```bash
npm install
```

4. Lancer l'application :
```bash
npm start
```

## Instructions pour le TP

Pour chaque exercice :
1. Lisez attentivement l'énoncé
2. Implémentez la solution
3. Testez votre implémentation (pensez à faire des copies d'écran)
4. Mettez à jour la section correspondante dans ce README avec :
   - Une brève explication de votre solution
   - Des captures d'écran montrant le fonctionnement
   - Les difficultés rencontrées et comment vous les avez résolues
5. Commitez vos changements avec un message descriptif

### Exercice 1 : État et Effets 
#### Objectif : Implémenter une recherche en temps réel

- [x] 1.1 Modifier le composant ProductSearch pour utiliser la recherche
- [x] 1.2 Implémenter le debounce sur la recherche
- [x] 1.3 Documenter votre solution ici

_Votre réponse pour l'exercice 1 :_
```
J'ai modifié la gestion de la recherche pour qu'elle fonctionne en temps réel :

- J'ai déplacé l'état `searchTerm` dans le composant parent `App.js` afin qu'il soit partagé entre `ProductSearch` (le champ de saisie) et `ProductList` (l'affichage des produits).
- `ProductSearch` reçoit maintenant `searchTerm` et `setSearchTerm` en props, ce qui permet de mettre à jour la recherche à chaque frappe.
- `ProductList` reçoit aussi `searchTerm` en prop et filtre la liste des produits en fonction de ce terme (insensible à la casse) avant de les afficher.
- Ainsi, la liste des produits s'actualise en temps réel dès que l'utilisateur tape dans le champ de recherche.

J'ai implémenté le debounce sur la recherche pour améliorer les performances et l'expérience utilisateur :

- J'ai créé un hook personnalisé `useDebounce` dans `src/hooks/useDebounce.js` qui retarde la mise à jour de la valeur de recherche après un délai d'inactivité (ici 400ms).
- Ce hook est utilisé dans le composant de recherche ou dans la liste des produits pour que le filtrage ne s'effectue qu'après que l'utilisateur ait arrêté de taper.
- Cela évite de filtrer la liste à chaque frappe et rend la recherche plus fluide, surtout avec beaucoup de produits.

**Difficulté rencontrée :**
- Au début, le champ de recherche ne mettait pas à jour la liste car l'état était local à `ProductSearch`. Il fallait lever l'état au parent pour le partager.
- Il fallait choisir où appliquer le debounce pour que la recherche reste réactive sans impacter la logique métier. Après test, l'application du debounce juste avant le filtrage dans la liste donne de bons résultats.

**Capture d'écran :**
[Ajoutez ici une capture d'écran montrant la recherche en temps réel]
```

### Exercice 2 : Context et Internationalisation
#### Objectif : Gérer les préférences de langue

- [x] 2.1 Créer le LanguageContext
- [x] 2.2 Ajouter le sélecteur de langue
- [x] 2.3 Documenter votre solution ici

_Votre réponse pour l'exercice 2 :_
```
J'ai créé un contexte `LanguageContext` dans un nouveau fichier `src/contexts/LanguageContext.js` pour gérer la langue de l'application.

- Le contexte fournit la langue courante (`language`) et une fonction pour la changer (`setLanguage`).
- J'ai enveloppé l'application dans le provider du contexte dans `App.js` pour que tous les composants puissent accéder à la langue.
- J'ai ajouté un composant `LanguageSelector` qui permet à l'utilisateur de choisir la langue (français ou anglais) via un menu déroulant. Ce composant utilise le contexte pour lire et modifier la langue.
- Les textes affichés dans les composants principaux (titres, labels, boutons) utilisent maintenant la langue sélectionnée grâce à un objet de traduction simple.

**Difficultés rencontrées :**
- Il fallait s'assurer que le changement de langue soit réactif partout dans l'application. L'utilisation du contexte résout ce problème.
- J'ai dû passer le contexte dans tous les composants qui affichent du texte à traduire.

**Capture d'écran :**
[Ajoutez ici une capture d'écran montrant le sélecteur de langue et l'application traduite]
```

### Exercice 3 : Hooks Personnalisés
#### Objectif : Créer des hooks réutilisables

- [x] 3.1 Créer le hook useDebounce
- [x] 3.2 Créer le hook useLocalStorage
- [x] 3.3 Documenter votre solution ici

_Votre réponse pour l'exercice 3 :_
```
J'ai créé deux hooks personnalisés pour améliorer la réutilisabilité et la gestion des effets dans l'application :

- `useDebounce` (dans `src/hooks/useDebounce.js`) : ce hook prend une valeur et un délai, et ne retourne la valeur qu'après que l'utilisateur ait arrêté de la modifier pendant le délai spécifié. Il est utilisé pour la recherche afin de ne pas déclencher le filtrage à chaque frappe, mais seulement après une courte pause.
- `useLocalStorage` (dans `src/hooks/useLocalStorage.js`) : ce hook permet de stocker et de récupérer une valeur dans le localStorage du navigateur, tout en gardant une interface similaire à `useState`. Il est utilisé pour mémoriser la langue sélectionnée par l'utilisateur, afin qu'elle soit conservée même après un rechargement de la page.

**Difficultés rencontrées :**
- Pour `useDebounce`, il fallait bien gérer le nettoyage du timer pour éviter les effets de bord.
- Pour `useLocalStorage`, il fallait synchroniser l'état React avec le localStorage et gérer le cas où la clé n'existe pas encore.

**Capture d'écran :**
[Ajoutez ici une capture d'écran montrant l'utilisation des hooks personnalisés]
```

### Exercice 4 : Gestion Asynchrone et Pagination
#### Objectif : Gérer le chargement et la pagination

- [x] 4.1 Ajouter le bouton de rechargement
- [x] 4.2 Implémenter la pagination
- [x] 4.3 Documenter votre solution ici

_Votre réponse pour l'exercice 4 :_
```
J'ai corrigé et finalisé la gestion du rechargement et de la pagination des produits :

- Le bouton "Recharger" utilise maintenant une fonction `reload` exposée par le hook `useProductSearch`. Cette fonction force le rechargement des produits depuis la source de données (API ou données simulées).
- Après chaque rechargement, la pagination est réinitialisée à la première page pour éviter d'afficher une page vide.
- Un indicateur de chargement s'affiche pendant le fetch des produits, et une alerte apparaît en cas d'erreur.

J'ai ajouté la pagination à la liste des produits, avec 6 produits affichés par page :

- J'ai introduit un nouvel état `currentPage` dans le composant qui gère la liste des produits (probablement `ProductList` ou son parent).
- J'ai calculé le nombre total de pages en fonction du nombre de produits filtrés et du nombre de produits par page (6).
- J'ai découpé la liste des produits à afficher selon la page courante.
- J'ai ajouté des boutons "Précédent" et "Suivant" (et éventuellement des numéros de page) pour permettre à l'utilisateur de naviguer entre les pages.
- Lorsque la recherche change ou que la liste des produits est rechargée, la page courante est réinitialisée à 1 pour garantir la cohérence de l'affichage.

**Difficultés rencontrées :**
- Le bouton "Recharger" ne fonctionnait pas car la fonction `reload` n'était pas correctement exposée ou ne modifiait pas l'état. J'ai ajouté un état `reloadFlag` dans le hook pour forcer le rechargement via `useEffect`.
- Il fallait bien synchroniser la pagination avec la recherche et le rechargement pour éviter d'afficher une page vide ou incohérente.

**Capture d'écran :**
[Ajoutez ici une capture d'écran montrant le bouton de rechargement fonctionnel et la pagination]
```

## Rendu

- Ajoutez l'URL de votre dépôt Github dans  **Classroom** et envoyer la réponse dès le démarage de votre projet.
- Les push doivent se faire au fûr et à mesure que vous avancez dans votre projet.
- Le README.md doit être à jour avec vos réponses et captures d'écran. 
- Chaques exercice doit faire l'objet d'au moins un commit avec un message mentionnant le numéro de l'exercice.
