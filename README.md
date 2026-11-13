# indiegameacademy.com

The Indie Game Academy website: a static [Astro](https://astro.build) site, deployed to GitHub Pages by GitHub Actions, served at `indiegameacademy.com` (domain at Namecheap).

Related sites: [Ready Dev Start](https://readydevstart.indiegameacademy.com) (wiki, repo `TakaVII/readydevstart.github.io`). The Indie Game Gauntlet will get its own site after the January 2027 announcement.

## Run it
```bash
npm install
npm run dev      # http://localhost:3001
npm run build    # output in dist/
```
Node 22+.

## Where things live
| What | Where |
|---|---|
| Dates, prices, links, public numbers, nav | `src/config.ts` (change these first) |
| Gauntlet switch (keep `false` until the announcement) | `gauntlet.public` in `src/config.ts` |
| Pages | `src/pages/` (`programs/`, `games/`, `about/`, `blog/`, `[slug].astro` = blog posts) |
| Blog posts, student games, professors | `src/data/*.json` (migrated from WordPress by `scripts/migrate-wp.mjs`) |
| Foundry games, testimonials | `src/data/foundry.ts`, `src/data/testimonials.ts` |
| Styles and brand tokens | `src/styles/global.css` (mirrors the IGA design system tokens) |
| Logos, banner pattern, OG image | `public/brand/` |
| Old WordPress images (same paths as before) | `public/wp-content/uploads/` |
| Redirects from old URLs | `astro.config.mjs` |

## Brand rules (short)
- Fonts: Russo One (headlines, buttons), Poppins (body). Never Oldrichium.
- Colors: Night Navy background, gold headlines and primary buttons with navy text, Academy Purple bands with the house-banner pattern. Never white text on gold, raspberry or light blue.
- Copy: never "get hired", "job guarantee", "self-paced", "customers", or unprovable "leading/elite/premier". Only use numbers listed in `stats` in `src/config.ts`.

## URLs and redirects
- Blog posts keep their WordPress URLs (`/{slug}/`), and images keep `/wp-content/uploads/...`, so search rankings carry over.
- Programs moved to `/programs/level-1/`, `/programs/level-2/`, `/programs/level-3/`. Every old URL in the WordPress sitemap has a redirect page (meta refresh + canonical) defined in `astro.config.mjs`.

## Analytics
Set a repository variable `PUBLIC_GTM_ID` (Settings > Secrets and variables > Actions > Variables) to load Google Tag Manager.

## Deploy: GitHub Pages
1. Repo **Settings > Pages > Build and deployment > Source: GitHub Actions**.
2. Push to `main`. The workflow `.github/workflows/deploy.yml` builds and deploys.
3. **Settings > Pages > Custom domain:** `indiegameacademy.com` (the `public/CNAME` file sets it too). Tick **Enforce HTTPS** once the certificate is issued.

## DNS at Namecheap (do this only when the site is approved to go live)
Domain List > `indiegameacademy.com` > Manage > **Advanced DNS**.
1. Remove the current `A` / `CNAME` records for `@` and `www` that point to the WordPress host. **Keep** every other record: `MX`, `TXT` (SPF, DKIM, Google verification), and the `readydevstart` CNAME.
2. Add four `A` records, Host `@`:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Optional IPv6, four `AAAA` records, Host `@`:
   `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
4. `CNAME` record, Host `www`, Value `takavii.github.io.`
5. TTL Automatic. Propagation takes minutes to a few hours.
6. Recommended: verify the domain for the GitHub account (Settings > Pages > Add a verified domain) to stop domain takeovers.

Before switching, decide where the WordPress store, logins and course access (WooCommerce, WishList Member) go, if anything still uses them. The static site has no checkout or login.

## After go-live checklist
- Search Console: submit `https://indiegameacademy.com/sitemap-index.xml`; watch Coverage and 404s daily for two weeks.
- Spot-check the top pages (the GDD template post, home, Level 3).
- Check that GA4 / GTM receives traffic.
