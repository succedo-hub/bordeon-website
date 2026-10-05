# Bordeon website

Responsive, static marketing prototype for Bordeon, an emerging specialty insurance transaction platform. Includes the supplied identity, blue/silver gradients, Bootstrap 5.3.8, transaction demos and the CRM–Bordeon–ERP responsibility matrix.

## Local development

Requires Node.js 22 or later.

```sh
npm ci
npm run build
npm start
```

Open http://127.0.0.1:4173. Stop with Ctrl+C. The committed `dist` folder also works without installing dependencies; open `dist/index.html` directly or run `npm start`.

## Cloudflare Pages — Connect to Git

Connect this repository using **Workers & Pages → Create application → Pages → Connect to Git**.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None |
| Root directory | Repository root |
| Build command | `npm run build` |
| Build output directory | `dist` |

The build copies pinned Bootstrap CSS and its license into `dist/vendor`. All browser assets are served locally, with no external CDN, analytics or fonts. Cloudflare hosts only `dist`; `server.mjs` is for local preview and is not deployed as a Worker. No secrets or environment variables are required. Connect the production domain in Cloudflare after checking the first deployment.

## Structure

- `dist/index.html`: all page content and semantic components
- `dist/style.css`: Bordeon identity, gradient surfaces and responsive layouts
- `dist/app.js`: mobile navigation, transaction stages, format previews, matching demo and dialogs
- `dist/assets/`: supplied logo and favicon
- `dist/vendor/`: Bootstrap CSS and MIT license
- `scripts/build.mjs`: reproducible vendor asset build
- `server.mjs`: loopback-only local server

Bootstrap supplies button, form and responsive grid styles. Custom branding is layered after Bootstrap. Existing native dialogs retain keyboard focus and Escape behavior.

## Validation

```sh
npm run check
npm run build
```

## Prototype scope

All insurance data and APIs are illustrative. Premium examples are not calculated quotes. The design partner form downloads a local text file and does not send or store details on a server. Connect a real contact flow and provide a production privacy notice before accepting enquiries.

Bootstrap is distributed under its MIT license in `dist/vendor/bootstrap-LICENSE.txt`. The logo is supplied by the project owner.
