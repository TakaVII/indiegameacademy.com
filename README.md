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

## DNS at Namecheap
The domain uses **Namecheap Web Hosting DNS** (nameservers `dns1/dns2.namecheaphosting.com`), so records are edited in the hosting's cPanel, **not** in Advanced DNS: Namecheap > Hosting List > Go to cPanel > **Zone Editor** > Manage `indiegameacademy.com`. Don't change the nameservers: that would cut off the WordPress hosting and the cPanel mail records.

**Preview (live since 2026-11-13):** CNAME `new.indiegameacademy.com.` → `takavii.github.io`. Set the Pages custom domain to `new.indiegameacademy.com` to review the site there.

**Go-live (only when approved):**
1. Edit the `A` record of `indiegameacademy.com.` (now `66.29.132.121`, the WordPress host) and the `www` CNAME. **Keep** every other record: `MX` (Google Workspace), `TXT` (SPF, DKIM, DMARC, Google verification), the Mailchimp/Mandrill `_domainkey` CNAMEs, `mail`/`webmail`/`cpanel` records, and the `readydevstart` CNAME.
2. Replace the root `A` record with four `A` records for `indiegameacademy.com.`:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Optional IPv6, four `AAAA` records, Host `@`:
   `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
4. Point the `www` CNAME to `takavii.github.io`, and set the Pages custom domain to `indiegameacademy.com`.
5. Propagation takes about 30 minutes (TTL 14400 on the old records can keep some visitors on WordPress for up to 4 hours; lower the TTL to 300 a day before).
6. Recommended: verify the domain for the GitHub account (Settings > Pages > Add a verified domain) to stop domain takeovers.

Before switching, decide where the WordPress store, logins and course access (WooCommerce, WishList Member) go, if anything still uses them. The static site has no checkout or login.

## After go-live checklist
- Search Console: submit `https://indiegameacademy.com/sitemap-index.xml`; watch Coverage and 404s daily for two weeks.
- Spot-check the top pages (the GDD template post, home, Level 3).
- Check that GA4 / GTM receives traffic.
