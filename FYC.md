# FYC TANSTACK

## Overview

### TanStack, c’est quoi ? :

TanStack est un ensemble de bibliothèques JavaScript/TypeScript pensées pour construire des applications web modernes.
Ce n’est pas un “gros framework monolithique”, mais plutôt une boîte à outils composée de briques spécialisées, que l’on
peut utiliser séparément ou ensemble.

Quelques briques principales que nous allons rencontrer :

- TanStack Router : gestion des routes et de la navigation (remplace, par exemple, React Router).
- TanStack Query : gestion des données côté client, appels API, cache, synchronisation avec le serveur.
- TanStack Form : gestion des formulaires complexes (validation, erreurs, focus, etc.).
- TanStack Table : affichage et manipulation de tableaux de données (trier, filtrer, paginer…).
- TanStack Store : gestion d’état global côté client (par exemple, l’utilisateur connecté).
- TanStack Start : un meta‑framework complet basé sur TanStack Router qui structure une application de A à Z.
- TanStack DB : une couche de gestion de données avancée, que nous utiliserons côté admin.

L’idée générale :

- TanStack fournit des “briques headless” (sans design imposé) pour gérer les comportements complexes (routing,
  formulaires, données…), et c’est à vous de décider comment les afficher dans votre interface (avec vos composants,
  votre design system, etc.).

### Pourquoi utiliser TanStack dans ce cours ?

Ce cours a deux objectifs principaux :

- Pédagogique :  
  Comprendre les concepts essentiels d’une application web moderne :
    - routing,
    - formulaires et validation,
    - gestion d’état,
    - appels API, cache, synchronisation,
    - rôles et permissions (user, admin, prof).

- Pratique / moderne :  
  Utiliser des outils réalistes et actuels, que l’on rencontre dans des projets professionnels.

TanStack est intéressant parce que :

- Chaque brique est indépendante : on peut les introduire progressivement.
- L’écosystème est cohérent : Router, Query, Form, etc. sont conçus pour bien fonctionner ensemble.
- TanStack Start permet de structurer un projet complet sans devoir tout réinventer.

### Présentation du projet final : mini‑plateforme scolaire

Tout au long du cours, nous allons construire une mini‑plateforme scolaire (type OpenClassrooms très simplifié).
Elle sera notre fil rouge : chaque nouveau concept TanStack viendra enrichir cette application.

#### Les rôles principaux

L’application gérera plusieurs types d’utilisateurs :

- Visiteur non connecté
    - Peut voir la page d’accueil.
    - Peut voir la liste des cours publics.
    - Peut accéder à un formulaire de contact.

// JE PENSE A RETIRER //

- Utilisateur (élève) connecté
    - Peut créer un compte (inscription).
    - Peut se connecter / se déconnecter.
    - Peut accéder à un espace “mon compte” ou “mes cours”.
    - Peut envoyer des messages (par exemple, via un formulaire de contact ou de support).

// JE PENSE A RETIRER //

- Professeur
    - Peut se connecter à un espace prof.
    - Peut gérer ses cours (créer, modifier, supprimer).
    - Peut consulter des informations liées à ses cours (messages d’élèves, etc.).


- Administrateur
    - Accès à une zone admin réservée.
    - Peut visualiser et gérer :
        - Les utilisateurs
        - Les messages de contact
        - Éventuellement les cours.

#### Fonctionnalités principales

Voici les grandes fonctionnalités que nous allons aborder :

- Authentification / autorisation
    - Formulaire de connexion.
    - Formulaire d’inscription.
    - Stockage de l’utilisateur connecté.
    - Protection de certaines routes (admin, prof).


- Formulaires
    - Connexion
    - Inscription
    - Contact (ou message)
    - Création / modification de cours (pour les profs)


- Gestion des données
    - Stockage des utilisateurs, messages, cours côté serveur (via Prisma).
    - Récupération et affichage des données côté client (via TanStack Query).
    - Affichage avancé des données en admin (via TanStack Table et TanStack DB).


- Administration
    - Liste des utilisateurs.
    - Liste des messages.
    - Liste des cours.
    - Filtrage / tri / recherche dans les tableaux.

#### Comment TanStack s’intègre dans ce projet ?

Dans cette mini‑plateforme, chaque brique TanStack a un rôle bien défini :

- TanStack Router / TanStack Start
    - Définir les routes : /, /login, /register, /contact, /admin, /prof, etc.
    - Gérer les routes protégées (accessible seulement si connecté admin / prof).
    - Charger certaines données avant d’afficher une page (data loading).

- TanStack Form
    - Gestion des formulaires (login, register, contact, création de cours).
    - Validation des champs, affichage des erreurs.
    - Gestion du focus sur les champs en erreur pour améliorer l’accessibilité.

- TanStack Query
    - Appeler nos endpoints API (login, register, contact…).
    - Récupérer les listes d’utilisateurs, de messages, de cours.
    - Gérer automatiquement les états : chargement, succès, erreur, cache.

- TanStack Store
    - Conserver en mémoire l’utilisateur connecté.
    - Mettre à jour l’état global lors du login / logout.
    - Partager cet état entre les différentes parties de l’application (header, admin, etc.).

- TanStack Table / TanStack DB
    - Afficher les données en tableau côté admin (utilisateurs, messages, cours).
    - Gérer le tri, les filtres, la pagination côté front.
    - Offrir une vue clair et efficace pour l’administration.

L’objectif est que, à la fin du cours, vous soyez capable de comprendre comment toutes ces briques collaborent dans une
application complète.

### Présentation de TanStack Start

TanStack Start est un meta‑framework construit autour de TanStack Router.
Il fournit une structure complète pour une application web moderne :

- Routing basé sur les fichiers (file‑based routing).
- Gestion des données côté serveur et côté client.
- Intégration avec les autres briques TanStack (Query, Form, etc.).
- Outils pour le rendu côté serveur (SSR), le data‑loading, les actions, etc.

En d’autres termes, là où TanStack Router est une brique isolée, TanStack Start vous donne :

- une arborescence de projet standardisée,
- des conventions pour organiser routes, loaders, actions,
- une base solide pour développer rapidement une application réelle.

## Chapitre 1 – TanStack Router + Vite

### Création du projet :

```shell
    pnpm create vite
```

Option:

- Project Name: tanstack-router
- Select Framework: React
- Select a variant: Typescript
- Use rolldown-vite (Experimental): No
- Install with pnpm and start now: Yes

#### Lancé le projet :

```shell
  pnpm dev
```

### Installation de Tanstack Router

```shell
  pnpm add @tanstack/react-router
  pnpm add @tanstack/react-router-devtools
```

#### Code Base Routing

(Cette section est à titre informatif, nous utiliserons dans les prochains cours, uniquement
le [File Based Routing](#file-based-routing))

Tout d'abord, nous allons créer un répertoire de composants (components).

```shell
  mkdir -p src/components/
```

Ensuite, nous allons déplacer la landing page par défaut de vite, dans le dossier composant associé:

```shell
  mkdir -p src/components/counter
  mv src/App.* src/components/counter
```

(⚠️ s'assurer que les imports sont bons ⚠️)

```ts
import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
```

On va ensuite créer une page home par défaut qui nous servira de point d'entrée

```shell
  mkdir -p src/components/home
  touch src/components/home/index.tsx
```

```tsx
// src/components/home.tsx
export const Home = () => {
  return <div>
    <h1>Bienvenue !</h1>
  </div>
}
```

Ensuite, on modifie le fichier `src/main.tsx` affin d'ajouter le routeur

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import {
  Outlet,
  RouterProvider,
  Link,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Home } from './components/home';
import App from './components/counter/App.tsx';

// Racine du routeTree, permet le rendu du Router
const rootRoute = createRootRoute({
  component: () => (
    <>
      {/* Navigation sommaire */}
      <nav>
        <Link to="/">
          Home
        </Link>
        <Link to="/counter">
          Counter
        </Link>
      </nav>
      <Outlet/> {/* Permet le rendu des enfants */}
      <TanStackRouterDevtools/> {/* Devtool du router spécifiquement */}
    </>
  ),
})

// Différente route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const counterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/counter',
  component: App,
})

const routeTree = rootRoute.addChildren([indexRoute, counterRoute])

const router = createRouter({ routeTree })

// Déclaration du type du router, permet dếtre type safe pour l'autocompletion
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>,
  )
}
```

Nous ajoutons un peut de css pour la nav dans `src/index.css`

```css
nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}
```

#### File Based Routing

Afin d'utiliser le File Based Routing, il est préférable d'installer le plugin vite qui simplifie la création des
routes:
Ce plugin permet à la création de fichier à certain emplacement, de configuré le fonctionnement de base de ces fichiers
ainsi que de généré le `routeTree` disponible dans `src/routeTree.gen.ts`

```shell
  pnpm add -D @tanstack/router-plugin
```

On installe ensuite les plugins dans la config vite `vite.config.ts`:

```tsx
// ...
import tanstackRouter from '@tanstack/router-plugin/vite';

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    // ...
  ]
})
```

Afin de régler les erreurs dans notre console, on crée le dossier `src/routes`, qui contiendra l'ensemble de routes,
layout, etc.
Un fichier `__root.tsx` est nécessaire au fonctionnement du routeur, il suffit de le créer, d'attendre quelques secondes
que la magie du plugin opère (noté qu'il faut que le projet soit lancé), et voila !! le fichier est configuré pour
fonctionner !

```shell
  mkdir -p src/routes
  touch src/routes/__root.tsx
```

Contenue du fichier :

```tsx
import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div>Hello "__root"!</div>
      <Outlet/>
    </React.Fragment>
  )
}
```

Si l'on revient sur son navigateur, on se rend compte que rien n'as changé, car notre point d'entrée est toujours le
`src/main.tsx` et n'inclue pas encore notre routeur

```tsx
import { StrictMode } from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>,
  )
}
```

Quand on retourne dans notre navigateur, on voit enfin afficher notre routeur :

```html

<div id="root">
    <div>Hello "__root"!</div>
    <p>Not Found</p>
</div>
```

Comme dans le [Code Base Routing](#code-base-routing), on crée ensuite une navigation sommaire ainsi que son style.
On peut aussi ajouter le Devtools afin de debugger si besoin.

```tsx
// src/routes/__root.tsx
import * as React from 'react'
import { Outlet, createRootRoute, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <nav>
        <Link to="/">
          Home
        </Link>
        <Link to="/counter">
          Counter
        </Link>
      </nav>
      <Outlet/>
      <TanStackRouterDevtools/>
    </React.Fragment>
  )
}
```

```css
/* src/index.css */
nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}
```

On crée notre home en créant un fichier `src/routes/index.tsx` et on y ajoute notre contenue:

```shell
  touch src/routes/index.tsx
```

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <h1>Bienvenue !</h1>
  </div>
}
```

On crée ensuite le dossier `src/routes/counter` puis on y déplace les fichiers `App.css` et `App.tsx`, on renomme
`App.tsx` en `index.tsx`.

```shell
  mkdir -p src/routes/counter
  mv src/App.css src/routes/counter
  mv src/App.tsx src/routes/counter/index.tsx
```

Et voilà ! tout fonctionne parfaitement et on peut… Vous avez sans doute remarqué qu'en bougeant les fichiers de cette
manière, le plugin n'as pas pu ajouter la configuration nécessaire, il faut donc la rajoutée à la main.

```tsx
// src/routes/counter/index.tsx
import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/counter/')({
  component: App,
})
// ...
```

### Data Loading

Dans la suite du cours, nous utiliserons le [File Base Routing](#file-based-routing).
Grace a tanstack routeur, il est possible de récupérer des données dans nos composants via la fonction 
`useLoaderData()`, cela permet par exemple de rendre un fetch asynchrone en donées synchrone.
Nous utiliserons l'[api](https://world.openfoodfacts.net/api/v2/search) d'Open Food Fact ([link](https://openfoodfacts.github.io/openfoodfacts-server/api/)) fact pour découvrir les différentes fonctionnalités
liées au `Data Loading`.

Dans un premier temp, nous allons créer une fonction de fetch de donnée:

```shell
  mkdir -p src/utils
  touch src/utils/open-food-fact.ts
```

```tsx
// src/utils/open-food-fact.ts
const apiUrl = 'https://world.openfoodfacts.net/api/v2/search';

export const fetchOpenFoodFactData = async (pageSize: number = 20) => {
  const res = await fetch(`${apiUrl}?page_size=${pageSize}`, {
    method: 'GET',
  });

  const data = await res.json();

  return data;
}
```

Ensuite, on crée une page dédiée au fetching de donnée et on met a jour la nav.
On rajoute la propriété `loader` a notre `Route`, cette propriété prend une fonction, possiblement asynchrone, et
s'occupe d'attendre les données avant de rendre notre page.
On peut ensuite utiliser ces données grace a la fonction `Route.useLoaderData()`.

```html
<!-- // src/routes/__root.tsx -->

<!-- ... -->
<nav>
    <!-- ... -->
    <Link to="/data-loading">
    Data Loading
    </Link>
</nav>
<!-- ... -->
```

```shell
  touch src/routes/data-loading.tsx
```

```tsx
// src/routes/data-loading.tsx

import { createFileRoute } from '@tanstack/react-router'
import { fetchOpenFoodFactData } from '../utils/open-food-fact.ts';

export const Route = createFileRoute('/data-loading')({
  component: RouteComponent,
  loader: () => fetchOpenFoodFactData()
})

function RouteComponent() {
  const data = Route.useLoaderData();

  return <div>
    <h1>Data Loading</h1>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
}

```

```css
/* ... */
pre {
    display: block;
    overflow: auto;
    max-height: 400px;
    background-color: lightgrey;
    font-family: monospace;
    text-align: start;
    padding: 10px;
}
```

Comme on peut le voir dans le navigateur, la page met un temp avant d'arriver, un temp qui pourrait être très long si la
récupération de données est trop importante.
Heureusement, la propriété loader nous permet aussi de définir une `Promise` qui pourra ensuite être "attendue" au rendu
grace au composant `Await`. Le composant `Await` permet d'attendre le résultat d'une `Promise` et de rendre 
temporairement autre chose grace a la propriété `fallback`.

Afin de tester ceci, on va devoir :
- Créer un type pour la `Response` de la fonction `fetchOpenFoodFact`
- Changer la fonction `fetchOpenFoodFact` afin de `fetch` un plus grand ensemble de données
- Changer le code dans la propriété `loader`
- Adapter notre rendu

```tsx
// src/utils/open-food-fact.ts
import { Await, createFileRoute } from '@tanstack/react-router'
import { fetchOpenFoodFactData } from '../utils/open-food-fact.ts';

export const Route = createFileRoute('/data-loading')({
  component: RouteComponent,
  loader: async () => {
    const fastData = await fetchOpenFoodFactData();
    const slowData = fetchOpenFoodFactData(100, 5)

    return {
      fastData,
      slowData,
    };
  }
})

function RouteComponent() {
  const { fastData, slowData } = Route.useLoaderData();

  return <div>
    <h1>Data Loading</h1>
    <pre>{JSON.stringify(fastData, null, 2)}</pre>
    <Await promise={slowData} fallback={<div>Loading...</div>}>
      {(data) => {
        return <pre>{JSON.stringify(data, null, 2)}</pre>
      }}
    </Await>
  </div>
}
```

```tsx
// src/routes/data-loading.tsx
import { Await, createFileRoute } from '@tanstack/react-router'
import { fetchOpenFoodFactData } from '../utils/open-food-fact.ts';

export const Route = createFileRoute('/data-loading')({
  component: RouteComponent,
  loader: async () => {
    const fastData = await fetchOpenFoodFactData();
    const slowData = fetchOpenFoodFactData(100, 5)

    return {
      fastData,
      slowData,
    };
  }
})

function RouteComponent() {
  const { fastData, slowData } = Route.useLoaderData();

  return <div>
    <h1>Data Loading</h1>
    <pre>{JSON.stringify(fastData, null, 2)}</pre>
    <Await promise={slowData} fallback={<div>Loading...</div>}>
      {(data) => {
        return <pre>{JSON.stringify(data, null, 2)}</pre>
      }}
    </Await>
  </div>
}
```

Faire ceci a plusieurs avantages :

- Ne pas bloquer le rendu de la page
- Permet d'informer l'utilisateur que quelque chose ce passe

### Navigation Blocking

Blocker la navigation est une feature complexe, mais extremement utile, cela permet d'obtenir une confirmation que 
l'utilisateur veut effectivement partir de la page. Un exemple concret est les formulaires administratifs, au milieu 
du formulaire, quitté la page effacerait tout ce que l'on a rempli ! par conséquent demandé une confirmation à 
l'utilisateur le rassure et permet sa satisfaction.


Nous allons implémenter cette feature sur la page `counter`, nous allons demander confirmation de quitté la page, 
si le compteur est supérieur à `1`. Pour ce faire, on utilise le hook `useBlocker` et sa propriété `shouldBlockFn`.
`shouldBlockFn` est une fonction qui retourne `true` quand on veut bloquer la navigation. 

```tsx
// src/routes/counter/index.tsx

// ...
import { createFileRoute, useBlocker } from '@tanstack/react-router'

// ...
function App() {
  const [count, setCount] = useState(0)

  useBlocker({
    shouldBlockFn: () => {
      if (count === 0) {
        return false;
      }

      const shouldLeave = confirm('Voulez vous vraiment quitté la page ?');
      return !shouldLeave;
    }
  })

  // ...
}
```

### RESSOURCES

- Installation
    - [Manual Setup](https://tanstack.com/router/latest/docs/framework/react/installation/manual)
    - [Vite Setup](https://tanstack.com/router/latest/docs/framework/react/installation/with-vite)
    - [Devtools](https://tanstack.com/router/latest/docs/framework/react/devtools)
    - [Rounting Concepts](https://tanstack.com/router/latest/docs/framework/react/routing/routing-concepts)
    - [Code Based Routing](https://tanstack.com/router/latest/docs/framework/react/routing/code-based-routing)
    - [File Based Routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing)
    - [Naming Convention](https://tanstack.com/router/latest/docs/framework/react/routing/file-naming-conventions)
    - [Outlets](https://tanstack.com/router/latest/docs/framework/react/guide/outlets)
- Data Loading
    - [Data Loading](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading)
    - [Deffered Data Loading](https://tanstack.com/router/latest/docs/framework/react/guide/deferred-data-loading)
- [Navigation Blocking](https://tanstack.com/router/latest/docs/framework/react/guide/navigation-blocking)

## Chapitre 2 – TanStack Start + Form