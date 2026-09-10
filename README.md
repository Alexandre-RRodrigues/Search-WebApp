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

## GitHub Pages

Pushes to `main` run the CI/CD workflow in
[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). It installs
dependencies, runs lint and tests, builds the static export, and deploys it to
GitHub Pages.

In the repository settings, set **Pages → Build and deployment → Source** to
**GitHub Actions**.
