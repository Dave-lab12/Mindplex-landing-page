# Mindplex landing page

The public site for Mindplex, the magazine, and OmegaPlex, the AI newsroom that drafts for it. `/` sells Mindplex. `/omegaplex` tells the OmegaPlex story in nine chapters, from the first signals to a human editor having the last word. Outbound CTAs go to magazine.mindplex.ai.

Live: https://mindplex-landing-page-five.vercel.app

## Pages

| Route                             | What it is                                                                                                                 |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `/`                               | Home: hero, the platform, sources Mindplex reads, Meet OmegaPlex, the reader loop, closing.                                |
| `/omegaplex`                      | How OmegaPlex works, chapters 01 to 09: signals, memory, reasoning, self-critique, the editor, the loop, the stack, beats. |
| `/blog`, `/blog/[slug]`           | Team posts, read from the WordPress API.                                                                                   |
| `/field-guide/`                   | Internal explainer for the marketing team. Static HTML in `static/field-guide`. Noindex, unlinked.                         |
| `/roadmap/[quarter]`, `/campaign` | Legacy pages. Not linked from the navigation. Reachable by URL only.                                                       |
| `/robots.txt`, `/sitemap.xml`     | Server routes. URLs are built from the request host, so previews and production are both correct.                          |

## Where things live

- `src/lib/section/home/*`: home page sections, in page order in `src/routes/+page.svelte`.
- `src/lib/section/*`: OmegaPlex chapters, plus the shared `Navbar` and `Footer`.
- `src/lib/components/*Canvas.svelte`: the three.js particle scenes. They are the visual identity of the site; sections sit around them, not on top of them.
- `src/lib/components/Seo.svelte`: title, description, canonical, Open Graph and Twitter tags. Every page renders one.
- `static/engine-shapes.bin`: the point clouds `EngineCanvas` morphs between. Regenerate with `node scripts/generate-engine-shapes.mjs <head.glb>` (model source in the script header). Only the `.bin` ships.

## Stack

SvelteKit 2 and Svelte 5, TypeScript, Tailwind 4, three.js, `@sveltejs/adapter-vercel`. Vitest for unit tests, Playwright for e2e. Fonts and canvases are local; the only runtime dependency is the WordPress API.

## Run it

```bash
pnpm install
pnpm dev
```

Blog and roadmap read one environment variable. Create `.env`:

```
PUBLIC_MINDPLEX_API_URL=https://console.mindplex.ai/wp-json
```

Without it the blog renders its empty state and the roadmap fails.

## Checks

```bash
pnpm lint
pnpm check
pnpm test
```

`pnpm check` reports 4 known errors in `src/routes/roadmap/[quarter]`. They predate the current pages.

## Copy rules

The OmegaPlex copy must match what the stack does today. Keep these straight:

- Mindplex is not a blockchain project. Do not reintroduce token, chain or web3 language.
- The runtime is OmegaClaw on PeTTa (MeTTa). Beat memory is a PeTTaChainer knowledge base. There is no Atomspace.
- The writer's gate is a source check: every cited page must be one OmegaPlex actually opened. Claim-level verdicts are a next step, not live.
- The editorial methodology is a versioned prompt per beat (discovery and writing). Editors edit it, and any version can be restored.
- A human editor publishes. OmegaClaw has no publish button.

## Deploy

Vercel builds every push. A pull request gets a preview URL. Merging to `main` deploys the live URL.
