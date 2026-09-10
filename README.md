# Test Page

A dark-mode search page built with Next.js, React, TypeScript, Tailwind CSS, and MUI.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful commands

```bash
npm run lint
npm run build
npm run start
```

The shared accent color is defined in [`src/app/globals.css`](./src/app/globals.css):

```css
--color-primary: #8b5cf6;
```

Change that variable to update the button, focus states, history links, and results accent.

## Firebase Hosting

Pushes to `main` run the CI/CD workflow in
[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). It installs
dependencies, runs lint and tests, builds the static export, and deploys the
`out/` directory to Firebase Hosting.

This uses Firebase Hosting on the free Spark plan. Firebase App Hosting is not
required.

Add this repository secret before deploying:

- `FIREBASE_SERVICE_ACCOUNT`: the JSON credentials for a Google service account
  with Firebase Hosting deployment permissions

For local deployment, authenticate with the Firebase CLI and run:

```bash
npx firebase-tools login
npm run build
npx firebase-tools deploy --only hosting
```
