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

---

### Precissions sur le cours

- Dans ce cour nous utiliserons `pnpm` comme gestionnaire de paquet, si vous n'avez pas
  `pnpm` installé, vous pouvez le faire via la commande `npm install -g pnpm`
- le code source sera disponible sur le github.

---


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

```shell
    cd tanstack-router
    pnpm install
```

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
  touch src/components/home/client-layout.tsx
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

const routeTree = rootRoute.addChildren([ indexRoute, counterRoute ])

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

---

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

On crée notre home en créant un fichier `src/routes/client-layout.tsx` et on y ajoute notre contenue:

```shell
  touch src/routes/client-layout.tsx
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
`App.tsx` en `client-layout.tsx`.

```shell
  mkdir -p src/routes/counter
  mv src/App.css src/routes/counter
  mv src/App.tsx src/routes/counter/client-layout.tsx
```

Et voilà ! tout fonctionne parfaitement et on peut… Vous avez sans doute remarqué qu'en bougeant les fichiers de cette
manière, le plugin n'as pas pu ajouter la configuration nécessaire, il faut donc la rajoutée à la main.

```tsx
// src/routes/counter/client-layout.tsx
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
Nous utiliserons l'[api](https://world.openfoodfacts.net/api/v2/search) d'Open Food
Fact ([link](https://openfoodfacts.github.io/openfoodfacts-server/api/)) fact pour découvrir les différentes
fonctionnalités
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

Faire ceci a plusieurs avantages:

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
// src/routes/counter/client-layout.tsx

// ...
import { createFileRoute, useBlocker } from '@tanstack/react-router'

// ...
function App() {
  const [ count, setCount ] = useState(0)

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


## Chapitre 2 – TanStack Start

### Installation :

```shell
  pnpm create @tanstack/start@latest
```

Options:

- Nom du projet: `tanstack-start`
- Voulez vous utiliser Tailwind CSS ? `Yes`
- Linter: `ESLint`
- Adapter de deployment: `Nitro`
- Add-ons: `None`
- Voulez-vous un exemple d'application ? : `None`

```shell
  cd tanstack-start
  pnpm install
  pnpm approve-builds # Autorisé tous les packets
```

### Lancement du projet

```shell
  pnpm dev
```

### Structure du projet

Comme on peut le voir en lanceant le projet, Tanstack Start nous a généré une application de base avec une structure
claire. La structure des dossiers est pensée pour séparer les différentes parties de l'application:

- src/components/ : Composants réutilisables dans toute l'application.
- src/routes/ : Définitions des routes de l'application.
- src/data/ : Logique de gestion des données (Prisma, accès à la base de données).
- public/ : Fichiers statiques accessibles publiquement.

On retrouve également nos fichiers liés au routing dans `src/routes`, chaque fichier correspond à une route, ainsi que
notre `src/routeTree.gen.ts` généré automatiquement.

### Reset du projet

Maintenant que l'on a vu la structure de base, on peut nettoyer le projet pour repartir d'une base neutre.

```shell
  rm -rf src/components/*
  rm -rf src/routes/*
  rm -rf src/data/*
  touch src/routes/__root.tsx 
  touch src/routes/index.tsx
```

(Pensez à relancer le projet si un problème survient)

### Routes de base

Grâce à nos connaissances acquises dans le chapitre 1, on peut créer les routes de notre application.

```shell
  mkdir -p src/routes/admin
  mkdir -p src/routes/\(app\)/courses/
  rm src/routes/index.tsx
  touch src/routes/\(app\)/index.tsx
  touch src/routes/\(app\)/route.tsx
  touch src/routes/\(app\)/login.tsx
  touch src/routes/\(app\)/register.tsx
  touch src/routes/\(app\)/courses/index.tsx
  touch src/routes/\(app\)/courses/\$courseId.tsx
  touch src/routes/admin/index.tsx
  touch src/routes/admin/route.tsx
```

Les fichiers `route.tsx` permettent de définir des layouts pour les routes enfants. Cela permet de factoriser le code
et d'avoir une structure claire. Pour le moment, remplaçons le contenu de la fonction `RouteComponent` par un simple
`Outlet`.

```tsx
// src/routes/\(app\)/route.tsx
// src/routes/admin/route.tsx
import { createFileRoute, Outlet } from "@tanstack/react-router";

// ...
function RouteComponent() {
  return <Outlet/>;
}
```

### Composants

Nous allons créer quelques composants de base pour notre application.

```shell
  touch src/components/layout.tsx
  touch src/components/header.tsx
  touch src/components/footer.tsx
```

```tsx
// src/components/header.tsx
import React from 'react';
import { Link } from '@tanstack/react-router';

export const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </nav>
    </header>
  );
};
```

```tsx
// src/components/footer.tsx
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer>
      <p>© 2025 My School Platform</p>
    </footer>
  );
};
```

```tsx
// src/components/layout.tsx
import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </div>
  );
};
```

On ajoute ensuite le `layout` dans le fichier `src/routes/(app)/route.tsx`;

```tsx
// src/routes/(app)/route.tsx

import { Layout } from '@/components/layout'

// ...

function RouteComponent() {
  return <Layout>
    <Outlet/>
  </Layout>
}
```

On réitère l'opération pour la création d'un admin layout.

```shell
  touch src/components/admin/layout.tsx
  touch src/components/admin/footer.tsx
  # (etc)
```

### Un peu de style !!

Afin de rendre notre application plus agréable, nous allons ajouter un peu de style avec Shadcn UI et Tailwind CSS.

```shell
  pnpm dlx shadcn@latest init
```

Nous allons ensuite ajouter **tous*** les composants disponibles.

```shell
  pnpm dlx shadcn@latest add --all
```

\* Il est possible que certains composants ne soient pas compatibles avec Tanstack Start, dans ce cas, vous pouvez les
ignorer.  
\** Nous faisons ceci parce que nous n'avons pas encore défini les besoins exacts en termes de composants UI. Dans
la réalité, il ne faut installer que les composants dont on a besoin.

Afin d'harmoniser notre affichage, nous allons créer le composant `Typography` (`src/components/ui/typography.tsx`).

```shell
  touch src/components/ui/typography.tsx
```

```tsx
import { cn } from '@/lib/utils.ts'
import { Slot } from '@radix-ui/react-slot'
import { FC, ReactNode } from 'react'

type TypographyProps = {
  children: ReactNode
  asChild?: boolean
  className?: HTMLHeadElement['className']
}

type TypographyTableProps<T extends PropertyKey = string> = {
  column: T[]
  row: Record<T, ReactNode>[]
}

type TypographyListProps = {
  children: ReactNode[]
}

type TypographyKey =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'blockquote'
  | 'table'
  | 'list'
  | 'inlineCode'
  | 'lead'
  | 'large'
  | 'small'
  | 'muted'

type TypographyComponent<T = TypographyKey> = FC<
  {
    type: T
  } & (T extends 'table'
  ? TypographyTableProps
  : T extends 'list'
    ? TypographyListProps
    : TypographyProps)
>

type TypographyComponentMapping<T = TypographyKey> = Record<
  TypographyKey,
  T extends 'table'
    ? FC<TypographyTableProps>
    : T extends 'list'
      ? FC<TypographyListProps>
      : FC<TypographyProps>
>

export const Typography: TypographyComponent = ({ type, ...props }) => {
  const mapping: TypographyComponentMapping = {
    h1: TypographyH1,
    h2: TypographyH2,
    h3: TypographyH3,
    h4: TypographyH4,
    p: TypographyP,
    blockquote: TypographyBlockquote,
    table: TypographyTable,
    list: TypographyList,
    inlineCode: TypographyInlineCode,
    lead: TypographyLead,
    large: TypographyLarge,
    small: TypographySmall,
    muted: TypographyMuted,
  }

  if (type === 'table') {
    const Component = mapping[type] as FC<TypographyTableProps>

    return <Component {...(props as TypographyTableProps)} />
  }

  if (type === 'list') {
    const Component = mapping[type] as FC<TypographyListProps>
    return <Component {...(props as TypographyListProps)} />
  }

  const Component = mapping[type] as FC<TypographyProps>
  return <Component {...(props as TypographyProps)} />
}

const TypographyH1: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'h1'

  return (
    <Comp
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
        className,
      )}
    >
      {children}
    </Comp>
  )
}

const TypographyH2: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'h2'

  return (
    <Comp
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
    >
      {children}
    </Comp>
  )
}

const TypographyH3: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'h3'

  return (
    <Comp
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className,
      )}
    >
      {children}
    </Comp>
  )
}

const TypographyH4: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'h4'

  return (
    <Comp
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
    >
      {children}
    </Comp>
  )
}

const TypographyP: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'p'

  return (
    <Comp className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
      {children}
    </Comp>
  )
}

const TypographyBlockquote: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'blockquote'

  return (
    <Comp className={cn('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </Comp>
  )
}

const TypographyTable: FC<TypographyTableProps> = ({ row, column }) => {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        <thead>
        <tr className="even:bg-muted m-0 border-t p-0">
          {column.map((c, key) => {
            return (
              <th
                key={key}
                className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
              >
                {c}
              </th>
            )
          })}
        </tr>
        </thead>
        <tbody>
        {column.map((c, key) => {
          return (
            <tr key={key} className="even:bg-muted m-0 border-t p-0">
              {row.map((r, key) => {
                return (
                  <td
                    key={key}
                    className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                  >
                    {r[c]}
                  </td>
                )
              })}
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

const TypographyList: FC<TypographyListProps> = ({ children }) => {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {children.map((child, index) => {
        return <li key={index}>{child}</li>
      })}
    </ul>
  )
}

const TypographyInlineCode: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'code'

  return (
    <Comp
      className={cn(
        'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className,
      )}
    >
      {children}
    </Comp>
  )
}

const TypographyLead: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'p'

  return (
    <Comp className={cn('text-muted-foreground text-xl', className)}>
      {children}
    </Comp>
  )
}

const TypographyLarge: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp className={cn('text-lg font-semibold', className)}>{children}</Comp>
  )
}

const TypographySmall: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'small'

  return (
    <Comp className={cn('text-sm leading-none font-medium', className)}>
      {children}
    </Comp>
  )
}

const TypographyMuted: FC<TypographyProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const Comp = asChild ? Slot : 'p'

  return (
    <Comp className={cn('text-muted-foreground text-sm', className)}>
      {children}
    </Comp>
  )
}
```

#### Composants Modifier / Créer

Nous avons créé et modifié plusieurs composants afin d'avoir un style plus agréable pour la suite du cours.

```tsx
// src/components/admin/footer.tsx
import { Typography } from '@/components/ui/typography.tsx'
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="flex w-full bg-gray-100 mt-auto justify-center px-25 py-15">
      <Typography type="p">© 2025 My School Platform</Typography>
    </footer>
  );
};
```

```tsx
// src/components/admin/layout.tsx
import { Footer } from '@/components/admin/footer'
import { Button } from '@/components/ui/button.tsx'
import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarGroup, SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar.tsx'
import { Typography } from '@/components/ui/typography.tsx'
import { Link } from '@tanstack/react-router'
import { FC, ReactNode } from 'react'

export const AdminLayout: FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="mb-10">
            <Typography type="large" className="text-center">
              Panneau d'administration
            </Typography>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup className="gap-5">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/admin">Tableau de bord</Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/admin/users">Gestion des utilisateurs</Link>
              </Button>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <Button asChild>
              <Link to="/">Retour</Link>
            </Button>
            <Button variant="destructive" onClick={() => {

            }}>
              Déconnexion
            </Button>
          </SidebarFooter>
        </Sidebar>
        <div className="w-full min-h-screen flex flex-col">
          <div className="bg-gray-100 flex justify-between items-center px-5 py-2">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-8 size-8 "/>
          </div>
          <main className="flex flex-col h-auto w-full px-5 py-10">
            {children}
          </main>
          <Footer/>
        </div>
      </SidebarProvider>
    </div>
  )
}
```

```tsx
// src/components/footer.tsx
import { Typography } from '@/components/ui/typography.tsx'
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="flex bg-gray-100 mt-auto justify-center px-25 py-15">
      <Typography type="p">© 2025 My School Platform</Typography>
    </footer>
  );
};
```

```tsx
// src/components/header.tsx
import { Button } from '@/components/ui/button.tsx'
import { Typography } from '@/components/ui/typography.tsx'
import { cn } from '@/lib/utils.ts'
import { FC, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'

export const Header: FC = () => {
  const currentPath = useRouterState({ select: (s) => s.location.pathname })

  const mapping = {
    '/': 'Home',
    '/courses': 'Courses',
    '/login': 'Login',
  }

  const adminMapping = {
    '/admin': 'Dashboard',
  }

  const [ open, setOpen ] = useState(false)

  return <header className="bg-gray-100 flex items-start justify-end px-5 py-5">
    <nav
      className={cn(
        'flex opacity-0 max-h-0 w-full justify-center text-center transition-all duration-500',
        open && 'opacity-100 max-h-96',
      )}
    >
      <ul className="flex flex-col sm:flex-row sm:gap-10">
        {Object.entries(mapping).map(([ path, label ]) => (
          <Typography type="large" asChild key={path}>
            <li
              className={cn(
                'hover:underline',
                currentPath !== path && 'text-gray-400',
              )}
            >
              <Link to={path} className="focusable">
                {label}
              </Link>
            </li>
          </Typography>
        ))}
        {Object.entries(adminMapping).map(([ path, label ]) => (
          <Typography type="large" asChild key={path}>
            <li
              className={cn(
                'hover:underline',
                currentPath !== path && 'text-gray-400',
              )}
            >
              <Link to={path} className="focusable">
                {label}
              </Link>
            </li>
          </Typography>
        ))}
      </ul>
    </nav>
    <Button onClick={() => setOpen(!open)} type="button">
      <Menu className={cn(open && 'hidden')}/>
      <X className={cn(!open && 'hidden')}/>
    </Button>
  </header>;
}
```

```tsx
// src/components/layout.tsx
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FC, ReactNode } from 'react'

export const Layout: FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="flex flex-col h-auto">{children}</main>
      <Footer/>
    </div>
  )
}
```

```tsx
// src/components/form/login.tsx
export const LoginForm = () => {
  return null;
}
```

```tsx
// src/components/form/register.tsx
export const RegisterForm = () => {
  return null;
}
```

```tsx
// src/routes/(app)/index.tsx
import { Typography } from '@/components/ui/typography'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex flex-col justify-center items-center p-25 h-full">
    <Typography type="h1">
      Bienvenue sur notre super plateforme !
    </Typography>
  </div>
}
```

```tsx
// src/routes/(app)/login.tsx
import { RegisterForm } from '@/components/form/register.tsx'
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { createFileRoute } from '@tanstack/react-router'
import { Tabs } from '@/components/ui/tabs'
import { LoginForm } from '@/components/form/login'

export const Route = createFileRoute('/(app)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Tabs defaultValue="login" className="w-full sm:max-w-md mx-auto mt-15">
      <TabsList>
        <TabsTrigger value="login">
          Connexion
        </TabsTrigger>
        <TabsTrigger value="register">
          Inscription
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm/>
      </TabsContent>
      <TabsContent value="register">
        <RegisterForm/>
      </TabsContent>
    </Tabs>
  )
}
```

```tsx
// src/routes/admin/index.tsx
import { Typography } from '@/components/ui/typography'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex flex-col mt-20">
    <Typography type="h1">
      Bienvenue dans le panneau d'administration !
    </Typography>
  </div>
}
```

```tsx
// src/routes/admin/route.tsx
import { AdminLayout } from '@/components/admin/layout.tsx'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AdminLayout>
    <Outlet/>
  </AdminLayout>
}
```

Nous avons aussi ajouté dans le fichier `src/routes/__root.tsx` un `notFounComponent` afin de gérer les routes non
définies.

```tsx
// src/routes/__root.tsx
export const Route = createRootRoute({
  // ...
  notFoundComponent: () => (
    <p>Not Found</p>
  ),
})
```

### RESSOURCES

- Installation
  - [Quick start](https://tanstack.com/start/latest/docs/framework/react/quick-start)
  - Shadcn UI:
    - [Installation](https://ui.shadcn.com/docs/installation/tanstack)
    - [Initialization](https://ui.shadcn.com/docs/components-json)


## Chapitre 3 – Formulaires d'authentification

Afin de se connection en tant qu'admin a notre platforme, nous allons créer un formulaire d'authentification et d'inscription.
Pour ce faire, nous allons utiliser `@tanstack/react-form` et `zod` pour la validation des données.

```shell
  pnpm add @tanstack/react-form zod
```

Tanstack Form est une librairie de gestion de formulaire très puissante et flexible. Elle permet de gérer l'état des
formulaires, la validation, et bien plus encore. Tanstack Form supporte nativement toutes les librairies qui suivent
les "[Standard Schema Specifications](https://github.com/standard-schema/standard-schema)"

Exemples non exhaustifs :
- Zod
- Yup
- Validbot
- ArkType
- Effect/Schema

### Formulaire de connexion

tout d'abord on va pourvoir créer notre schema de validation avec Zod.

```tsx
// src/components/form/login.tsx
import { z } from 'zod';

const formSchema = z.object({
  email: z.email('Adresse email invalide'),
  password: z
  .string()
  .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
  .regex(
    /[A-Z]/,
    'Le mot de passe doit contenir au moins une lettre majuscule',
  )
  .regex(
    /[a-z]/,
    'Le mot de passe doit contenir au moins une lettre minuscule',
  )
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(
    /[^A-Za-z0-9]/,
    'Le mot de passe doit contenir au moins un caractère spécial',
  ),
})
```

Attention cependant ! Certaines règles de validation peuvent ne pas fonctionner correctement avec
`@tanstack/react-form`, comme par exemple `default()`, ce qui peut poser l'erreur suivante :

```
ZodObject<...>
is not assignable to type
FormValidateOrFn<...>
```

Le shéma précédemment défini peut donc être utilisé dans notre formulaire de connexion.
Le formulaire est géré par le hook `useForm`, qui prend en paramètre un objet de configuration.
Les paramètres importants sont :
- `defaultValues` : Les valeurs par défaut du formulaire.
- `validators` : Les règles de validation du formulaire.
- `onSubmit` : La fonction à appeler lors de la soumission du formulaire.

```tsx
// src/components/form/login.tsx

export const LoginForm = () => {
  const form = useForm({
    defaultValues: {
      email: 'test@test.test',
      password: '123456Aa*',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log('Form submitted:', value)
    },
  })

  // ...
}
```

Afin d'utiliser le formulaire, on va devoir créer les champs de formulaire. On utilise pour ceci les composants de Shadcn UI.
Chaque champ est géré par le composant `form.Field`, qui prend en paramètre :
- `name` : Le nom du champ.
- `children` : Une fonction qui reçoit les props du champ et retourne le composant à rendre.

On utilise donc la fonction enfante pour générer notre champ, il faut faire attention à bien utiliser les propriétés
du paramètre et ne pas directement utilisé `form`.

```tsx
// src/components/form/login.tsx

return <>
  {/* ... */}
  <form
    id="login-form"
    onSubmit={(e) => {
      e.preventDefault()
      form.handleSubmit()
    }}
  >
    {/* ... */}
    <form.Field name="email">
      {(field) => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid
        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>Email :</FieldLabel>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              aria-invalid={isInvalid}
              placeholder="test@test.test"
              autoComplete="off"
            />
            {isInvalid && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )
      }}
    </form.Field>
    {/* ... */}
  </form>
  {/* ... */}
</>
```

Composant complet:

```tsx
// src/components/form/login.tsx

import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Typography } from '@/components/ui/typography.tsx'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.email('Adresse email invalide'),
  password: z
  .string()
  .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
  .regex(
    /[A-Z]/,
    'Le mot de passe doit contenir au moins une lettre majuscule',
  )
  .regex(
    /[a-z]/,
    'Le mot de passe doit contenir au moins une lettre minuscule',
  )
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(
    /[^A-Za-z0-9]/,
    'Le mot de passe doit contenir au moins un caractère spécial',
  ),
})

export const LoginForm = () => {
  const form = useForm({
    defaultValues: {
      email: 'test@test.test',
      password: '123456Aa*',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log('Form submitted:', value)
    },
  })

  return <Card>
    <CardHeader>
      <CardTitle>
        <Typography type="h1" className="text-3xl">
          Connexion
        </Typography>
      </CardTitle>
      <CardDescription>
        <Typography type="p">
          Entrer vos identifiants pour vous connecter.
        </Typography>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form
        id="login-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email :</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="test@test.test"
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          </form.Field>
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password :</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="123456Aa*"
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          </form.Field>
        </FieldGroup>
      </form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal" className="justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
        >
          Reset
        </Button>
        <Button type="submit" form="login-form">
          Envoyer
        </Button>
      </Field>
    </CardFooter>
  </Card>
}
```

On utilise le même principe pour le formulaire d'inscription :

```tsx
// src/components/form/register.tsx

import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Typography } from '@/components/ui/typography.tsx'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.email('Adresse email invalide'),
  password: z
  .string()
  .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
  .regex(
    /[A-Z]/,
    'Le mot de passe doit contenir au moins une lettre majuscule',
  )
  .regex(
    /[a-z]/,
    'Le mot de passe doit contenir au moins une lettre minuscule',
  )
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(
    /[^A-Za-z0-9]/,
    'Le mot de passe doit contenir au moins un caractère spécial',
  ),
  confirmPassword: z.string().min(1, 'Veuillez confirmer votre mot de passe'),
})
.refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  error: 'Les mots de passe ne correspondent pas',
})

export const RegisterForm = () => {
  const form = useForm({
    defaultValues: {
      email: 'test@test.test',
      password: '123456Aa*',
      confirmPassword: '123456Aa*',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log('Form submitted:', value)
    },
  })

  return <Card>
    <CardHeader>
      <CardTitle>
        <Typography type="h1" className="text-3xl">
          Inscription
        </Typography>
      </CardTitle>
      <CardDescription>
        <Typography type="p">
          Entrer vos informations pour créer un compte.
        </Typography>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form
        id="login-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email :</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    type="email"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="test@test.test"
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          </form.Field>
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password :</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="123456Aa*"
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          </form.Field>
          <form.Field name="confirmPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password :</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="123456Aa*"
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          </form.Field>
        </FieldGroup>
      </form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal" className="justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
        >
          Reset
        </Button>
        <Button type="submit" form="login-form">
          Envoyer
        </Button>
      </Field>
    </CardFooter>
  </Card>
}
```

### Base de donnée

Nous allons utiliser `prisma` avec une base de donnée `PostgreSQL` locale pour stocker les utilisateurs.

```shell
  pnpm add prisma @prisma/client
  npx prisma init
```

Nous allons créer un docker compose pour lancer une base de donnée `PostgreSQL` locale.

```shell
  touch compose.yml
```

```yaml
services:
  db:
    image: postgres:18.1
    environment:
      POSTGRES_USER: username
      POSTGRES_PASSWORD: password
      POSTGRES_DB: default_database
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql

volumes:
  db_data:
```

On change ensuite la variable d'environnement `DATABASE_URL` dans le fichier `.env`

```env
DATABASE_URL=postgresql://username:password@localhost:5432/default_database?schema=public
```

On s'assure que l'url est bien définie dans `prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

On peut ensuite définir notre modèle `User` dans le fichier `prisma/schema.prisma`

```prisma
enum Role {
  ADMIN
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt
  password  String
  roles     Role[]   @default([ADMIN])

  @@map("user")
}
```

On peut ensuite lancer la migration pour créer la table `User` dans la base de donnée.

```shell
  npx prisma migrate dev --name init
```

On crée ensuite un fichier `src/lib/prisma.ts` pour initialiser le client Prisma.

```tsx
import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
// Dans le cas de l'utilisation de better auth, le chemin du client doit etre relatif
import { PrismaClient } from 'generated/prisma/client.ts'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({
  adapter,
})

export { prisma }
```

### API d'authentification

Nous allons créer une API d'authentification pour gérer la connexion et l'inscription des utilisateurs. L'endpoint de
connexion ira vérifier qu'un utilisateur existe bien dans la base de donnée. Ensuite, on compare avec `argon2` le mot de
passe. Une fois finis, on génère un JWT que l'on renvoie au client.

```shell
  mkdir src/routes/api
  touch src/routes/api/login.tsx
  pnpm add argon2 jsonwebtoken
  # si besoin
  # pnpm approve-builds
```

On rajoute ensuite une varieble d'environnement pour la clé secrète JWT dans le fichier `.env`

```env
JWT_SECRET=your_jwt_secret_key
```

```tsx
import { prisma } from '@/lib/prisma.ts'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'

const formSchema = z.object({
  email: z.email('Adresse email invalide'),
  password: z
  .string()
  .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
  .regex(
    /[A-Z]/,
    'Le mot de passe doit contenir au moins une lettre majuscule',
  )
  .regex(
    /[a-z]/,
    'Le mot de passe doit contenir au moins une lettre minuscule',
  )
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(
    /[^A-Za-z0-9]/,
    'Le mot de passe doit contenir au moins un caractère spécial',
  ),
})

export const Route = createFileRoute('/api/login')({
  server: {
    handlers: {
      async POST({ request }) {
        const body = await request.json()
        const data = formSchema.safeParse(body)

        if (!data.success) {
          return new Response(JSON.stringify({ errors: data.error.issues }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        const userData = await prisma.user.findUnique({
          where: { email: data.data.email },
        })

        if (!userData) {
          return new Response(
            JSON.stringify({ error: 'Invalid email or password' }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        const verify = await argon2.verify(
          userData.password || '',
          data.data.password,
        )

        if (!verify) {
          return new Response(
            JSON.stringify({ error: 'Invalid email or password' }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
          return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        const token = jwt.sign({
          userId: userData.id,
        }, jwtSecret)

        return new Response(JSON.stringify({ token }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      },
    },
  },
})

```

On utilise le même principe pour l'endpoint d'inscription. On hash le mot de passe avec `argon2` avant de le stocker dans la base de donnée.
NOTE: nous avons ajouté un délai artificiel de 5 secondes pour simuler une charge serveur et éviter les attaques par force brute.

```tsx
// src/routes/api/register.tsx

import { prisma } from '@/lib/prisma.ts'
import { createFileRoute } from '@tanstack/react-router'
import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'
import { z } from 'zod'

const schema = z.object({
  email: z.email('Adresse email invalide'),
  password: z
  .string()
  .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
  .regex(
    /[A-Z]/,
    'Le mot de passe doit contenir au moins une lettre majuscule',
  )
  .regex(
    /[a-z]/,
    'Le mot de passe doit contenir au moins une lettre minuscule',
  )
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(
    /[^A-Za-z0-9]/,
    'Le mot de passe doit contenir au moins un caractère spécial',
  ),
})

export const Route = createFileRoute('/api/register')({
  server: {
    handlers: {
      async POST({ request }) {
        const body = await request.json()
        const data = schema.safeParse(body)

        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
        await delay(5000);

        if (!data.success) {
          return new Response(JSON.stringify({ errors: data.error.issues }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: data.data.email },
        })

        if (existingUser) {
          return new Response(
            JSON.stringify({ error: 'Email already in use' }),
            {
              status: 409,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        const hashedPassword = await argon2.hash(data.data.password)

        const newUser = await prisma.user.create({
          data: {
            email: data.data.email,
            password: hashedPassword,
          },
        })

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
          return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        const token = jwt.sign({
          userId: newUser.id,
        }, jwtSecret)

        return new Response(
          JSON.stringify({ id: newUser.id, token }),
          {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
          },
        )
      },
    },
  },
})
```

### Intégration des formulaires avec l'API

Nous allons maintenant intégrer les formulaires de connexion et d'inscription avec les endpoints que nous venons de créer.
Pour ce faire, nous utiliserons `@tanstack/react-query` pour gérer les requêtes asynchrones.

```shell
  pnpm add @tanstack/react-query @tanstack/react-query-devtools
  pnpm add -D @tanstack/eslint-plugin-query
```

Tanstack Query fournit un hook `useMutation` pour gérer les mutations de données, comme les requêtes POST. Ce hook
permet d'avoir des `states` comme `isLoading`, `isError`, et `data` pour gérer l'état de la requête.

On s'occupe donc de créer notre premiere mutation pour l'inscription.

```tsx
// src/components/form/register.tsx

const registerMutation = useMutation({
  mutationFn: async (payload: { email: string; password: string }) => {
    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      throw new Error('Erreur serveur')
    }

    const data: { id: string, token: string } = await res.json()

    return data;
  },
})
```

On peut ensuite utiliser cette mutation dans le formulaire d'inscription. On appelle la mutation dans la fonction `onSubmit` du formulaire.

```tsx
// src/components/form/register.tsx

// ...
  const form = useForm({
    // ...
    onSubmit: async ({ value }) => {
      const res = await registerMutation.mutateAsync({
        email: value.email,
        password: value.password,
      })

      console.log('Registration successful, user id:', res.id)
    },
  })
// ...
```

On empêche la re-soumission du formulaire en utilisant le state de notre mutation.

```tsx
// src/components/form/register.tsx

import { Spinner } from '@/components/ui/spinner.tsx'
// ...
  {(registerMutation.isPending) ? <Spinner /> : <>
    <Button
      type="button"
      variant="outline"
      onClick={() => form.reset()}
    >
      Reset
    </Button>
    <Button type="submit" form="login-form">
      Envoyer
    </Button>
  </> }
// ...
```

On utilise le même principe pour le formulaire de connexion.

```tsx
// src/components/form/login.tsx

import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Spinner } from '@/components/ui/spinner.tsx'
import { Typography } from '@/components/ui/typography.tsx'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

const formSchema = z.object({
  email: z.email('Adresse email invalide'),
  password: z
  .string()
  .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
  .regex(
    /[A-Z]/,
    'Le mot de passe doit contenir au moins une lettre majuscule',
  )
  .regex(
    /[a-z]/,
    'Le mot de passe doit contenir au moins une lettre minuscule',
  )
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(
    /[^A-Za-z0-9]/,
    'Le mot de passe doit contenir au moins un caractère spécial',
  ),
})

export const LoginForm = () => {
  const loginMutation = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error('Erreur serveur')
      }

      const data: { token: string } = await res.json();

      return data;
    },
  })
  const form = useForm({
    defaultValues: {
      email: 'test@test.test',
      password: '123456Aa*',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await loginMutation.mutateAsync({
        email: value.email,
        password: value.password,
      })
      console.log('Login successful, token:', res.token)
    },
  })

  return <Card>
    <CardHeader>
      <CardTitle>
        <Typography type="h1" className="text-3xl">
          Connexion
        </Typography>
      </CardTitle>
      <CardDescription>
        <Typography type="p">
          Entrer vos identifiants pour vous connecter.
        </Typography>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form
        id="login-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email :</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="test@test.test"
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          </form.Field>
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password :</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="123456Aa*"
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          </form.Field>
        </FieldGroup>
      </form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal" className="justify-end">
        { loginMutation.isPending ? <Spinner /> : <>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" form="login-form">
            Envoyer
          </Button>
        </>}
      </Field>
    </CardFooter>
  </Card>
}
```

### Les Sessions

Tanstack Start Server (`@tanstack/react-start/server`) fournis le hook `useSession` pour gérer les sessions utilisateur.
Une session est un cookie HTTP sécurisé qui permet de garder l'utilisateur connecté entre les différentes requêtes.
Le hook `useSession` prend en paramètre un objet de configuration avec les options suivantes :
- `name` : Le nom du cookie de session.
- `password` : La clé secrète pour signer le cookie de session. /!\ Doit faire au moins 32 caractères.
- `cookie` : Les options du cookie de session.
  - `secure` : Si le cookie doit être sécurisé (HTTPS).
  - `httpOnly` : Si le cookie doit être accessible uniquement via HTTP (non accessible via JavaScript).
  - `sameSite` : La politique SameSite du cookie.

On peut donc utiliser ce hook dans notre application pour gérer les sessions utilisateur.

On ajoute d'abord une variable d'environnement pour la clé secrète de session dans le fichier `.env`

```env
SESSION_SECRET=your_session_secret_key_at_least_32_characters_long
```

```typescript
// src/lib/utils/session.ts
import { useSession } from '@tanstack/react-start/server'

type SessionData = {
  token?: string
}

export function useAppSession() {
  const sessionSecret = process.env.SESSION_SECRET
  if (!sessionSecret) {
    throw new Error(
      'SESSION_SECRET environment variable must be set and at least 32 characters long',
    )
  }

  return useSession<SessionData>({
    name: 'app-session',
    password: sessionSecret,
    // Optional: customize cookie settings
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      // httpOnly: true,
      httpOnly: false,
    },
  })
}
```

On crée ensuite des hooks pour gérer la connexion et l'inscription en utilisant les sessions. /!\ Ces hooks doivent être utilisés uniquement dans le
contexte serveur, par conséquent, on ne peut pas les créer dans le fichier `src/lib/utils/session.ts`

```typescript
// src/lib/utils/auth.ts
import { useAppSession } from '@/lib/utils/session.ts'
import { createServerFn } from '@tanstack/react-start'

export const logIn = createServerFn({ method: 'POST' })
.inputValidator((data: { token: string }) => data)
.handler(async ({ data }) => {
  const session = await useAppSession()
  await session.update({
    token: data.token,
  })

  return { success: true, redirect: '/' }
})

export const logOut = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()
  await session.clear()

  return { success: true, redirect: '/login' }
})

export const isLoggedIn = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await useAppSession()
  return !!session.data.token
})
```

On peut ensuite utiliser ces hooks dans nos formulaires pour gérer la connexion et l'inscription.

```tsx
// src/components/form/login.tsx
import { logIn } from '@/lib/utils/auth.ts'
// ...
    onSubmit: async ({ value }) => {
      const data = await loginMutation.mutateAsync({
        email: value.email,
        password: value.password,
      })
      const sessionRes = await logIn({ data })

      if (sessionRes.redirect) {
        await navigate({ to: sessionRes.redirect })
      }
    }
// ...
```

```tsx
// src/components/form/register.tsx
import { logIn } from '@/lib/utils/auth.ts'
// ...
    onSubmit: async ({ value }) => {
      const res = await registerMutation.mutateAsync({
        email: value.email,
        password: value.password,
      })

      const sessionRes = await logIn({ data: { token: res.token } })

      if (sessionRes.redirect) {
        await navigate({ to: sessionRes.redirect })
      }
    }
// ...
```

### Protection des routes

Nous allons maintenant protéger certaines routes de notre application pour qu'elles ne soient accessibles qu'aux utilisateurs connectés.
Pour ce faire, nous allons créer un middleware d'authentification qui vérifiera si l'utilisateur est connecté avant de lui permettre d'accéder à la route.
Ce middleware ne sera appliqué qu'à l'initialisation des routes, il nous faut donc une solution pour protéger les routes lors de la navigation côté client.
Nous allons donc créer une fonction `AuthBeforeLoad` qui sera appelée avant le chargement de chaque route protégée.

```tsx
// src/middlewares/auth.ts
import { isLoggedIn } from '@/lib/utils/auth.ts'
import { createMiddleware } from '@tanstack/react-start'

export const AuthMiddleware = createMiddleware()
  .server(async ({ next, request }) => {
    console.log('AuthMiddleware called on server')
    const loggedIn = await isLoggedIn()

    if (!loggedIn) {
      return Response.redirect(
        new URL('/login', request.url),
        302,
      )
    }

    return await next();
  })

export const AuthBeforeLoad = async ({navigate}) => {
  console.log('AuthBeforeLoad called')
  const loggedIn = await isLoggedIn()

  if (!loggedIn) {
    await navigate({ to: '/login' })
  }
}
```

On peut ensuite utiliser ce middleware et cette fonction dans notre route layout admin.

```tsx
// src/routes/admin/route.tsx
import { AdminLayout } from '@/components/admin/layout.tsx'
import { AuthBeforeLoad, AuthMiddleware } from '@/middleware/auth.ts'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  server: {
    middleware: [AuthMiddleware]
  },
  beforeLoad: AuthBeforeLoad
})

function RouteComponent() {
  return <AdminLayout>
    <Outlet />
  </AdminLayout>
}
```

### Ressources
- Tanstack Form
  - [Installation](https://tanstack.com/form/latest/docs/installation)
  - [Validation](https://tanstack.com/form/latest/docs/framework/react/guides/validation)
  - [Exemple](https://tanstack.com/form/latest/docs/framework/react/examples/simple)
- Tanstack Query
  - [Installation](https://tanstack.com/query/latest/docs/framework/react/installation)
  - [Devtools](https://tanstack.com/query/latest/docs/framework/react/devtools)
  - [Mutation](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)
- [Tanstack Start Authentication](https://tanstack.com/start/latest/docs/framework/react/guide/authentication)


## Chapitre 4 : Gestion des utilisateurs

Afin de continuer dans notre lancée, nous allons implémenter une gestion des utilisateurs complète avec création,
lecture, mise à jour et suppression (CRUD). Pour ce faire, on commence par les endpoints API.

```shell
  touch src/routes/api/users.tsx
```

```tsx
// src/routes/api/users.tsx
import { prisma } from '@/lib/prisma.ts'
import { createFileRoute } from '@tanstack/react-router'
import * as argon2 from 'argon2'
import { z } from 'zod'

export const userSchema = z.object({
  email: z.email('Adresse email invalide'),
})

export const createUserSchema = userSchema.extend({
  password: z
  .string()
  .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
  .regex(
    /[A-Z]/,
    'Le mot de passe doit contenir au moins une lettre majuscule',
  )
  .regex(
    /[a-z]/,
    'Le mot de passe doit contenir au moins une lettre minuscule',
  )
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(
    /[^A-Za-z0-9]/,
    'Le mot de passe doit contenir au moins un caractère spécial',
  ),
})

export const getUserSchema = userSchema.extend({
  id: z.uuid('ID utilisateur invalide'),
  createdAt: z.date(),
  updatedAt: z.date(),
  roles: z.array(z.string()),
});

const getUsersSchema = z.object({
  items: z.array(getUserSchema),
  total: z.number(),
  total_pages: z.number(),
  page: z.number(),
  limit: z.number(),
})

export const Route = createFileRoute('/api/users')({
  server: {
    handlers: {
      async GET({ request }) {
        const searchParams = new URL(request.url).searchParams
        const page = searchParams.get('page') || '1'
        const limit = searchParams.get('limit') || '10'
        const orderBy = searchParams.get('orderBy') || 'createdAt'
        const orderDir = searchParams.get('orderDir') || 'asc'

        const users = await prisma.user.findMany({
          skip: (Number(page) - 1) * Number(limit),
          take: Number(limit),
          orderBy: { [orderBy]: orderDir as 'asc' | 'desc' },
          omit: {
            password: true,
          },
        })

        const totalUsers = await prisma.user.count()

        const parsedUsers = getUsersSchema.safeParse({
          items: users,
          total: totalUsers,
          total_pages: Math.ceil(totalUsers / Number(limit)),
          page: Number(page),
          limit: Number(limit),
        })

        if (parsedUsers.error) {
          return new Response(JSON.stringify({ error: 'Data parsing error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        return new Response(
          JSON.stringify(parsedUsers.data),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
      },
      async POST({ request }) {
        const body = await request.json()
        const data = createUserSchema.safeParse(body)

        if (!data.success) {
          return new Response(JSON.stringify({ errors: data.error.issues }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: data.data.email },
        })

        if (existingUser) {
          return new Response(
            JSON.stringify({ error: 'Email already in use' }),
            {
              status: 409,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        const hashedPassword = await argon2.hash(data.data.password)

        const newUser = await prisma.user.create({
          data: {
            email: data.data.email,
            password: hashedPassword,
          },
          omit: {
            password: true,
          },
        })

        const parsedUser = getUserSchema.safeParse(newUser)

        if (parsedUser.error) {
          return new Response(JSON.stringify({ error: 'Data parsing error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        return new Response(
          JSON.stringify(parsedUser.data),
          {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
          },
        )
      },
    },
  },
})
```

On fait de même pour les endpoints de gestion d'un utilisateur précis.

```shell
  touch src/routes/api/users.$id.ts
```

```tsx
// src/routes/api/users.$id.tsx
import { prisma } from '@/lib/prisma.ts'
import { createUserSchema, getUserSchema } from '@/routes/api/users.ts'
import { createFileRoute } from '@tanstack/react-router'
import * as argon2 from 'argon2'

const updateUserSchema = createUserSchema.partial()

export const Route = createFileRoute('/api/users/$id')({
  server: {
    handlers: {
      async GET({ params }) {
        const id = params.id

        const user = await prisma.user.findUnique({
          where: { id },
          omit: {
            password: true,
          },
        });

        if (!user) {
          return new Response('User not found', { status: 404 });
        }

        const parsedUser = getUserSchema.safeParse(user);

        if (!parsedUser.success) {
          return new Response(JSON.stringify({ error: 'Data parsing error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        return new Response(
          JSON.stringify(parsedUser.data),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      },
      async PATCH({ request, params }) {
        const id = params.id
        const body = await request.json()
        const data = updateUserSchema.safeParse(body)

        if (!data.success) {
          return new Response(JSON.stringify({ errors: data.error.issues }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        if (data.data.password) {
          data.data.password = await argon2.hash(data.data.password)
        }

        const updatedUser = await prisma.user.update({
          where: { id },
          data: data.data,
          omit: {
            password: true,
          },
        })

        const parsedUser = getUserSchema.safeParse(updatedUser)

        if (!parsedUser.success) {
          return new Response(JSON.stringify({ error: 'Data parsing error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        return new Response(
          JSON.stringify(parsedUser.data),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
      },
      async DELETE({ params }) {
        const id = params.id

        await prisma.user.delete({
          where: { id },
        })

        return new Response(null, { status: 204 })
      },
    },
  }
})
```

La première partie de la gestion des utilisateurs est maintenant terminée. Nous avons mis en place les endpoints API pour
gérer les utilisateurs. Il nous reste maintenant à créer l'interface utilisateur pour interagir avec ces endpoints. On
commence par la liste des utilisateurs. On s'inspire du composant Table de `shadcn/ui` pour afficher les données, et on
utilise `Tanstack Table` pour la gestion des colonnes, du tri et de la pagination.

```shell
  pnpm add @tanstack/react-table
```

La gestion de la table passe par le hook `useReactTable` de `Tanstack Table`. On initialise la table avec les colonnes 
et les données. On gère ensuite la pagination et le tri avec les options `manualPagination` et `onPaginationChange`. Il
n'est pas nécessaire de gérer ceci à la main, nous pouvons envoyer directement un large nombre de données au tableau et 
il s'occupera de la pagination et du tri côté client grâce aux helpers :

- `getCoreRowModel`
- `getExpandedRowModel`
- `getFacetedMinMaxValues`
- `getFacetedRowModel`
- `getFacetedUniqueValues`
- `getFilteredRowModel`
- `getGroupedRowModel`
- `getPaginationRowModel`
- `getSortedRowModel`

On utilise actuellement `getCoreRowModel` pour le rendu de base des lignes. Nous pourrions ajouter `getSortedRowModel`
et `getFilteredRowModel` pour gérer le tri et le filtrage côté client. Il est important d'utiliser `flexRender` pour
rendre les cellules et les en-têtes de la table. On utilise aussi les helper de la table pour désactiver les boutons
de pagination lorsque l'on ne peut pas aller plus loin.

```tsx
// src/components/admin/users.tsx
import { Button } from '@/components/ui/button.tsx'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Typography } from '@/components/ui/typography.tsx'
import { createFileRoute } from '@tanstack/react-router'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react';

export const Route = createFileRoute('/admin/users')({
  component: RouteComponent,
})

function RouteComponent() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { pageIndex, pageSize } = pagination

  const table = useReactTable({
    data: [],
    columns: [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role', header: 'Rôle' },
    ],
    state: {
      pagination,
    },
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  })

  return <div className="flex flex-col">
    <Typography type="h1" className="text-start">Gestion des utilisateurs</Typography>
    <Typography type="p">Ici, vous pouvez gérer les utilisateurs de l'application.</Typography>
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={table.getAllColumns().length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  </div>
}
```

Nous allons passer à la suite de l'implémentation en récupérant les données depuis notre endpoint API. Pour ce faire,
nous allons utiliser `Tanstack DB` pour gérer la collection de données et les requêtes. Il est important de noter que
`Tanstack DB` a besoin d'un adapter pour fonctionner avec le client query, nous utilisons ici `Tanstack Query` comme adapter.

```shell
  pnpm add @tanstack/db @tanstack/react-db @tanstack/query-db-collection @tanstack/query-core
```

Premièrement, on crée notre collection d'utilisateurs en utilisant `Query Collection` de `Tanstack DB`. Dans notre exemple,
on utilise le `syncMode: 'on-demand'` ce qui permet de gérer à la main les paramètres de la requête. On parse les options
de chargement avec `parseLoadSubsetOptions` pour récupérer les options de pagination, de tri et de filtrage, par soucis 
de simplicité, nous n'allons pas voir le filtrage des données. On construit ensuite les paramètres de la requête en
fonction de ces options et on effectue la requête fetch vers notre endpoint API. 

```tsx
// src/lib/query.ts
import { createCollection, parseLoadSubsetOptions } from '@tanstack/db'
import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { QueryClient } from '@tanstack/query-core'
import { User } from 'generated/prisma/client.ts'

const queryClient = new QueryClient();

export const usersCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["users"],
    queryFn: async (ctx) => {
      const { limit, offset, orderBy } = ctx.meta?.loadSubsetOptions || {}
      const parsed = parseLoadSubsetOptions({ where, orderBy, limit })
      const params = new URLSearchParams()

      if (parsed.sorts.length > 0) {
        const sortParam = parsed.sorts[0]
        params.set('orderBy', String(sortParam.field[0]))
        params.set('orderDir', sortParam.direction)
      }

      if (parsed.limit) {
        params.set('limit', String(parsed.limit))
      }

      if (offset) {
        params.set('page', String(offset))
      }

      const response = await fetch(`http://localhost:3000/api/users?${params}`)
      const data: {
        items: Array<User>
        total: number
        total_pages: number
        page: number
        limit: number
      } = await response.json()

      ctx.client.setQueryData(['users', 'count'], data.total)

      return data.items;
    },
    queryClient,
    getKey: (item) => item.id,
    syncMode: 'on-demand',
  })
)
```

On peut ensuite utiliser cette collection dans notre composant de gestion des utilisateurs. On initialise la collection
avec les options de pagination et de tri. On utilise le hook `useLiveQuery` pour récupérer les données en temps réel. On
met à jour les options de la collection lorsque la pagination ou le tri change.


On ajoute donc la récupération des données dans notre composant de gestion des utilisateurs.

```tsx
// src/components/admin/users.tsx
import { usersCollection } from '@/lib/query.ts'
import { useLiveQuery } from '@tanstack/react-db/react'
// ...
  const { data, isLoading } = useLiveQuery(
    (q) =>
      q
      .from({
        users: usersCollection,
      })
      .limit(pageSize)
      .offset(pageIndex * pageSize)
      .orderBy(({ users }) => users.createdAt, 'asc'),
    [pageIndex, pageSize])
// ...
  const table = useReactTable({
    data,
    // ...
  })
// ...

  return <div className="flex flex-col">
    {/* ... */}
      <TableBody>
        {isLoading ? <TableRow>
          <TableCell
            colSpan={table.getAllColumns().length}
            className="h-24 text-center"
          >
            <Spinner />
          </TableCell>
        </TableRow> : table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={table.getAllColumns().length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    {/* ... */}
  </div>
```

Comme on peut le voir, la récupération des données est très simple avec `Tanstack DB`. Il est possible d'ajouter des 
filtres, des recherches et d'autres fonctionnalités très facilement en utilisant les options de la collection, mais, on
peut aussi constater que notre pagination ne fonctionne pas correctement. En effet, nous n'avons pas accès au total des
utilisateurs dans notre composant. Nous allons donc stocker cette information dans le cache de `Tanstack Query` lors de
la requête fetch dans la collection. Nous allons ensuite récupérer cette information dans notre composant pour gérer
la pagination.

```tsx
// src/lib/query.ts

// ...
  ctx.client.setQueryData(['users', 'count'], data.total)

  return data.items;
// ...
```

```tsx
// src/components/admin/users.tsx
import { useQuery } from '@tanstack/react-query'

// ...
  const { data, isLoading } = useLiveQuery( /* ... */ )
  const totalCount = useQuery({
    queryKey: ['users', 'count'],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('limit', '1')
      params.set('page', '1')
      const response = await fetch(`http://localhost:3000/api/users?${params}`)
      const data: {
        items: Array<User>
        total: number
        total_pages: number
        page: number
        limit: number
      } = await response.json()
      return data.total
    },
  })
  
  const table = useReactTable({
    // ...
    rowCount: totalCount.data || 0,
  })
```
/!\ Note : Dans notre exemple, nous effectuons la requête après avoir déjà récupéré les données dans la collection.
Cela peut dans certain cas nous eviter de refaire une requête si les données sont déjà en cache. Cependant, dans un cas réel,
il serait préférable de gérer cela différemment pour éviter une requête redondante.


/!\ Important : Il semble qu'à ce jour (@tanstack/react-db@0.1.59) le hook `useLiveQuery` génère des erreurs de rendu
côté serveur, il faut donc mettre l'option `ssr: false` pour éviter ces erreurs.
```tsx
// src/components/admin/users.tsx
export const Route = createFileRoute('/admin/users')({
  component: RouteComponent,
  ssr: false,
})
```

Nous passons maintenant à la suite de l'implémentation en ajoutant la suppression des utilisateurs. Nous allons ajouter
un bouton de suppression qui apparaît lorsque l'on sélectionne un ou plusieurs utilisateurs dans la table. On utilise
la méthode `delete` de notre collection pour supprimer les utilisateurs sélectionnés. La collection utilise `Optimistic`
pour mettre à jour l'interface utilisateur immédiatement de façon "optimiste". Si une erreur survient lors de la suppression,
la collection restaure les données précédentes, cela permet d'avoir une interface utilisateur réactive et fluide.


Tout d'abord, on ajoute un bouton de suppression dans notre composant.

```tsx
// src/components/admin/users.tsx

  const handleDeleteUsers = () => {
    const selectedRows = table.getSelectedRowModel().rows
    const selectedIds = selectedRows.map((row) => row.original.id)
  
    selectedIds.forEach((id) => {
      usersCollection.delete(id)
    })
  }


  return <div className="flex flex-col">
        <Typography type="h1" className="text-start">
          Gestion des utilisateurs
        </Typography>
        <Typography type="p">
          Ici, vous pouvez gérer les utilisateurs de l'application.
        </Typography>
        {table.getSelectedRowModel().rows.length > 0 && (
          <div className="my-4">
            <Button variant="destructive" onClick={handleDeleteUsers}>
              Supprimer les utilisateurs sélectionnés
            </Button>
          </div>
        )}
        <Table>
          {/* ... */}
        </Table>
    {/* ... */}
  </div>
// ...
```

Afin de pouvoir voir l'effet `Optimistic` en action, il est préférable d'ajouter un délai artificiel ainsi qu'une erreur
dans notre endpoint API de suppression. Ensuite, on ajoute la logique de suppression dans notre collection.

```tsx
// src/routes/api/users.$id.tsx
// ...
export const Route = createFileRoute('/api/users/$id')({
  server: {
    handlers: {
      // ...
      async DELETE({ params }) {
        // ...
        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
        await delay(5000);

        return new Response({ error: 'Deletion is currently disabled for safety reasons.' }, {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    },
  }
})
```

```tsx
// src/lib/query.ts
// ...
export const usersCollection = createCollection(
  queryCollectionOptions({
  // ...
    onDelete: async ({ transaction }) => {
      const idsToDelete = transaction.mutations.map((m) => m.key as string)

      for (const id of idsToDelete) {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
          method: 'DELETE',
        })
        if (!response.ok) {
          throw new Error(`Failed to delete user with id ${id}`)
        }
      }

      return { refetch: true }
    },
  // ...
  })
)
```

On peut maintenant tester la suppression des utilisateurs dans notre interface. Lorsqu'on sélectionne un ou plusieurs 
utilisateurs et qu'on clique sur le bouton de suppression, les utilisateurs sont supprimés de la table immédiatement, après
un délai de 5 secondes, ils réapparaissent à cause de l'erreur simulée dans l'endpoint API. On peut donc retirer cette erreur
et le délai une fois que l'on est prêt à déployer l'application.


En utilisant nos connaissances précédemment acquise, on peut facilement étendre cette interface pour ajouter la création
d'un nouvel utilisateur. Pour ce faire, on utilise un formulaire similaire à celui de l'inscription , ainsi que le composant
`Dialog` de `shadcn/ui` pour afficher le formulaire dans une fenêtre modale. Afin de nous simplifier la tache, nous laissons
un mot de passe par défaut et ajoutons une génération d'email aléatoire. Pour affiché d'éventuelle erreurs, on utilise
un `toast` de `sonner` étant données que le `Toaster` de `shadcn/ui` est déprécié. Afin d'update notre total count, il 
est important d'invalidé le cache de la query, pour ce faire, on utilise le `queryClient` que nous avons initialisé
dans `src/routes/__root.tsx`, pour plus de lisibilité, on le déplace dans `src/lib/react-query.ts`.

```shell
  touch src/lib/react-query.ts
  touch src/components/modal/add-user.tsx
```

On ajoute le `Toaster` et on importe le client dans notre `__root.tsx`.

```tsx
// src/routes/__root.tsx
import { queryClient } from '@/lib/react-query'
import { Toaster } from '@/components/ui/sonner.tsx'

// ...

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster />
        <Scripts />
      </body>
    </html>
  )
}
```

```tsx
// src/lib/react-query.ts
import { QueryClient } from '@tanstack/react-query'
export const queryClient = new QueryClient();
```

Ceci fait, on crée le composant de la fenêtre modale pour ajouter un utilisateur.

```tsx
// src/components/modal/add-user.tsx

import { Button } from '@/components/ui/button.tsx'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Spinner } from '@/components/ui/spinner.tsx'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { FC, useState } from 'react'
import { toast } from "sonner"
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { User } from 'generated/prisma/client.ts'

const formSchema = z.object({
  email: z.email('Adresse email invalide'),
  password: z
  .string()
  .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
  .regex(
    /[A-Z]/,
    'Le mot de passe doit contenir au moins une lettre majuscule',
  )
  .regex(
    /[a-z]/,
    'Le mot de passe doit contenir au moins une lettre minuscule',
  )
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(
    /[^A-Za-z0-9]/,
    'Le mot de passe doit contenir au moins un caractère spécial',
  ),
})

const getRandomEmail = () => {
  return `test${Math.floor(Math.random() * 10000)}@test.test`
}

export const AddUser: FC<{
  onSuccess: (user: User) => void
}> = ({
  onSuccess,
}) => {
  const [defaultEmail, setDefaultEmail] = useState(getRandomEmail())
  const [isOpen, setIsOpen] = useState(false);

  const createUserMutation = useMutation({
    mutationFn: async (payload: z.infer<typeof formSchema>)=> {
      const res = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        throw new Error('Erreur lors de la création de l\'utilisateur')
      }
      const data: User = await res.json()
      return data;
    },
    onSuccess: (data) => {
      onSuccess(data)
    },
  })

  const form = useForm({
    defaultValues: {
      email: defaultEmail,
      password: '123456Aa*',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createUserMutation.mutateAsync({
          email: value.email,
          password: value.password,
        })

        setIsOpen(false)
      } catch (error) {
        toast.error('Erreur lors de la création de l\'utilisateur')
        console.error('Erreur lors de la création de l\'utilisateur:', error)
      }
    },
  })
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button disabled={createUserMutation.isPending}>
          {createUserMutation.isPending ? <Spinner /> : <Plus />}
          Ajouter un utilisateur
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un utilisateur</DialogTitle>
          <DialogDescription>
            Entrez les informations de l'utilisateur que vous souhaitez ajouter.
          </DialogDescription>
        </DialogHeader>
        <Button onClick={() => {
          const newEmail = getRandomEmail()
          setDefaultEmail(newEmail)
          form.setFieldValue('email', newEmail)
        }}>
          Générer un email aléatoire
        </Button>
        <form
          id="add-user-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email :</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      type="email"
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="test@test.test"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password :</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="123456Aa*"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button type="submit" form="add-user-form">
            Ajouter l'utilisateur
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

On ajuste ensuite notre composant de gestion des utilisateurs pour inclure ce nouveau composant de création.

```tsx
// src/components/admin/users.tsx
import { AddUser } from '@/components/modal/add-user.tsx'
import { queryClient } from '@/lib/react-query.ts'

// ...

return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Typography type="h1" className="text-start">
            Gestion des utilisateurs
          </Typography>
          <Typography type="p">
            Ici, vous pouvez gérer les utilisateurs de l'application.
          </Typography>
        </div>
        <AddUser
          onSuccess={async (user) => {
            await usersCollection.insert(user)
            await queryClient.invalidateQueries({
              queryKey: ['users', 'count'],
            })
            table.lastPage()
          }}
        />
      </div>
      {/* ...  */}
    </div>
)
```

Utilisé la méthode `insert` de la collection permet d'ajouter immédiatement le nouvel utilisateur à la table, cependant 
il faut quand même implémenter la fonction `onInsert` dans la collection pour que cela fonctionne correctement. Sachant
que nous avons déja notre entité, nous pouvons simplement dire "il faut récupérer les données à nouveau" en retournant 
`{ refetch: true }`.

```tsx
// src/lib/query.ts
// ...
export const usersCollection = createCollection(
  queryCollectionOptions({
  // ...
    onInsert: async ({ transaction }) => {
      return { refetch: true }
    },
  // ...
  })
)
```


### Ressources
- [Why DB](https://tanstack.com/blog/tanstack-db-0.1-the-embedded-client-database-for-tanstack-query)
- [Query](https://tanstack.com/query/v5/docs/framework/react/guides/queries)
- [Query Collection](https://tanstack.com/db/latest/docs/collections/query-collection)
- [Live Query](https://tanstack.com/db/latest/docs/guides/live-queries)
- [Table](https://ui.shadcn.com/docs/components/data-table)

## Conclusion :

Félicitations ! Vous avez mis en place une interface complète de gestion des utilisateurs dans une application 
Fullstack React avec TanStack DB. Vous avez appris à créer des endpoints API sécurisés avec Prisma et à utiliser
TanStack DB pour gérer efficacement les données côté client.


Vous avez également découvert l’intégration de composants UI modernes pour une expérience utilisateur fluide, et mis en 
œuvre des fonctionnalités avancées telles que la pagination, le tri, la création et la suppression d’utilisateurs avec
une approche optimiste.


En plus de cela, vous avez développé des compétences solides autour de l’écosystème TanStack :

- TanStack Query : pour la gestion déclarative et performante des données asynchrones
- TanStack Router : pour une navigation moderne, type-safe et parfaitement intégrée au workflow React
- TanStack Table : pour la création de tableaux puissants, flexibles et hautement configurables
- TanStack Start : pour structurer une application fullstack moderne, rapide et orientée vers le server-side

N’hésitez pas à explorer davantage les possibilités offertes par l’écosystème TanStack et à adapter cette base pour répondre aux besoins spécifiques de vos projets futurs. Bonne continuation dans votre aventure de développement Fullstack React ! 🚀


## CHAPITRE BONUS: Utilisation de Better Auth




# Test de positionnement

1. Quel est le rôle principal de React ?

   - [] Manipuler directement le DOM pour améliorer les performances
   - [] Fournir un framework complet façon MVC
   - [] Construire des interfaces utilisateur via un modèle déclaratif
   - [] Compiler automatiquement le JavaScript côté serveur

2. Qu’est-ce que le Virtual DOM ?

   - [] Un DOM stocké dans la base de données
   - [] Une représentation en mémoire du DOM réel
   - [] Une version optimisée du DOM fournie par le navigateur
   - [] Un outil de debugging React

3. Quel hook est utilisé pour gérer l’état local dans un composant fonctionnel ?

   - [] useState
   - [] useEffect
   - [] useMemo
   - [] useContext

4. Quel hook permet d'exécuter du code après rendu ?

   - [] useState
   - [] useEffect
   - [] useRef
   - [] useCallback

5. Que retourne useState ?

   - [] Une valeur + un reducer
   - [] Une valeur + une fonction pour la mettre à jour
   - [] Un tableau de valeurs
   - [] Une fonction asynchrone

6. Quel est le rôle du cache dans une application web ?

   - [] Stocker les erreurs réseau
   - [] Accélérer React
   - [] Éviter de refetch inutilement les mêmes données
   - [] Empêcher les appels API

7. Quel protocole est le plus souvent utilisé pour les requêtes HTTP ?

   - [] HTTPS
   - [] SSH
   - [] FTP
   - [] TCP brut

8. Quelle méthode HTTP est utilisée pour créer une ressource ?

   - [] GET
   - [] PATCH
   - [] POST
   - [] OPTIONS

9. Dans TanStack Query, comment déclenche-t-on une requête manuelle ?

   - [] Avec useQuery uniquement
   - [] Avec useMutation
   - [] Avec useCache
   - [] Avec startQuery

10. À quoi sert la queryKey dans TanStack Query ?

   - [] Identifier une donnée dans le cache
   - [] Définir un timeout de requête
   - [] Déclencher une mutation
   - [] Configurer axios automatiquement

11. Pourquoi TanStack Query est-il utile ?

   - [] Pour remplacer React
   - [] Pour gérer le cache, les requêtes et leurs états
   - [] Pour compiler le code
   - [] Pour créer des animations

12. Quel état n'est PAS géré nativement par TanStack Query ?

   - [] loading
   - [] error
   - [] success
   - [] globalState

13. Quelle fonction permet de réexécuter une requête dans TanStack Query ?

   - [] reload()
   - [] refetch()
   - [] refresh()
   - [] retry()

14. Comment TanStack Query met-il à jour le cache après une mutation ?

   - [] Automatiquement, toujours
   - [] Jamais
   - [] Via invalidate Queries / setQueryData
   - [] Via un hook "useCacheUpdate"

15. Quel est un avantage de TanStack Router ?

   - [] Routing basé sur fichier + types générés
   - [] Nécessite Redux
   - [] Fonctionne uniquement côté serveur
   - [] Pas compatible avec React

16. TanStack Start est un framework orienté :

   - [] Full‑stack React + File-based routing
   - [] Mobile natif
   - [] Compilation WebAssembly exclusivement
   - [] Backend Node sans front-end

17. Que permet TanStack Start en plus du simple routing ?

   - [] Compiler en Rust
   - [] Server Functions (loader/action), Streaming, SSR
   - [] Générer des assets 3D
   - [] Transpiler automatiquement TypeScript

18. Comment TanStack Start charge les données d’une route ?

   - [] Avec useEffect
   - [] Avec fetch classique obligatoire
   - [] Uniquement côté client
   - [] Avec des loaders côté serveur

19. Quel format de routage utilise TanStack Start ?

   - [] File-based routing
   - [] Routing déclaré dans un index.js global
   - [] Routing impératif comme React Router v3
   - [] Aucun routing

20. Quel est l'objectif principal de TanStack Query dans TanStack Start ?

   - [] Gérer les données côté client ET préchargées côté serveur
   - [] Générer le sitemap automatiquement
   - [] Gérer les routes
   - [] Compiler le code TypeScript

Bonus-1. Comment TanStack Start optimise le streaming SSR ?

   - [] En combinant les loaders server-side avec un cache hydraté pour envoyer progressivement HTML + données
   - [] En bloquant tout le rendu jusqu’au chargement complet
   - [] En s’appuyant uniquement sur React Suspense
   - [] En envoyant uniquement du JSON

Bonus-2. Lorsqu’un loader (TanStack Start) précharge une donnée utilisée aussi par TanStack Query :

   - [] La donnée est hydratée dans le cache, évitant un refetch côté client
   - [] Les deux systèmes entrent en conflit
   - [] Le loader est ignoré
   - [] La requête est refaite deux fois obligatoirement

## CC de Fin

L'examen final consiste à créer l'espace professeur de l'application précédemment réalisé, en rajoutant :

- un role "proffeseur" aux utilisateurs
- une page de gestion des cours (CRUD)
  - Liste des cours
  - Création d'un cours
  - Modification d'un cours
  - Suppression d'un cours
- les pages `/courses` et `/courses/:id` pour tous les utilisateurs non connectés
  - Liste des cours
  - Détail d'un cours

Précisions :
- Utiliser Tanstack DB pour la gestion des données côté client
- Utiliser Prisma pour la gestion des données côté serveur
- Utiliser shadcn/ui pour les composants UI
- L'examen doit être réalisé en moins de 2 heures