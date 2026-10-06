# Bordeon website

Responsive, static marketing website for Bordeon, a specialty insurance transaction platform. Includes the supplied identity, blue/silver gradients, Bootstrap 5.3.8, transaction demos and the CRM–Bordeon–ERP responsibility matrix.

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

The build copies pinned Bootstrap CSS, the Inter variable font and their licenses into `dist/vendor`. All browser assets are served locally, with no external CDN, analytics or font requests. Cloudflare hosts only `dist`; `server.mjs` is for local preview and is not deployed as a Worker. No secrets or environment variables are required. Connect the production domain in Cloudflare after checking the first deployment.

## Structure

- `dist/index.html`: all page content and semantic components
- `dist/style.css`: Bordeon identity, gradient surfaces and responsive layouts
- `dist/app.js`: mobile navigation, transaction stages, format previews, finance hand-off preview and dialogs
- `dist/assets/`: supplied logo and favicon
- `dist/vendor/`: Bootstrap CSS, Inter font and their licenses
- `scripts/build.mjs`: reproducible vendor asset build
- `server.mjs`: loopback-only local server

Bootstrap supplies button, form and responsive grid styles. Custom branding is layered after Bootstrap. Existing native dialogs retain keyboard focus and Escape behavior.

## Validation

```sh
npm run check
npm run build
```

## Website scope and demo requests

All insurance examples and API previews on this website are illustrative. Premium examples are not calculated quotes. The Book a demo form supports customer and investor/partner enquiries. It prepares an email to anton@succedo.fi in the visitor’s email application. The visitor must send it to request a time; no calendar reservation is made and no form details are stored on this website.

Bootstrap is distributed under its MIT license in `dist/vendor/bootstrap-LICENSE.txt`. Inter is distributed under the SIL Open Font License in `dist/vendor/inter-LICENSE.txt`. The brand identity is supplied by the project owner.


## Hero image

`dist/assets/hero-nordic-architecture.jpg` was generated with the built-in image generation tool and compressed to JPEG for the website. It is decorative architectural imagery, not a photograph of Bordeon premises. Navy gradient overlays are applied in CSS. The original generation remains available locally.

Generation prompt: Create one professional website hero background image, wide landscape 1536x1024 or wider. Photorealistic editorial architectural photography of a sophisticated contemporary Nordic financial district, glass and pale stone office facades with precise repeating structural lines, seen from a low diagonal perspective in soft blue hour light. No recognizable named building or organization, no signage, no text, no people, no logos, no boats, no nautical imagery, no glowing tech graphics. Midnight navy, steel blue and restrained silver highlights; understated institutional credibility, not sci-fi. Left half darker and visually quiet to hold white headline text, architectural interest across upper right and edges. Image will sit behind a B2B specialty insurance infrastructure marketing hero with a navy CSS gradient overlay. Deliver just the image, no typography.

## Workspace demo

Open `/dashboard/` for the standalone browser-only prototype. Add accepted business, create a policy, record endorsements and premium adjustments, edit two-carrier participation, generate CSV bordereaux and mark demo settlement obligations. Reports preserve their transaction and allocation snapshots. All amounts use EUR and premium adjustments are entered manually, not priced by an underwriting engine. Data stays in localStorage on that origin; use sample data only. There is no authentication, shared database, backend or payment execution. Reset demo replaces local records after confirmation.
