import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";

// GitHub Pages has no server redirects. Astro writes a small page at each old URL with a
// 0-second meta refresh and a canonical tag, which search engines treat as a redirect.
// Old URLs come from the WordPress sitemap (read 2026-11-13). Blog post URLs did not change.
const games = JSON.parse(fs.readFileSync(new URL("./src/data/games.json", import.meta.url), "utf8"));
const professors = JSON.parse(fs.readFileSync(new URL("./src/data/professors.json", import.meta.url), "utf8"));

const redirects = {
  // Programs
  "/class-schedule-level-3": "/programs/level-3/",
  "/iga-level-3-publish": "/programs/level-3/",
  "/level-1-class-schedule": "/programs/level-1/",
  "/iga-level-1-embark": "/programs/level-1/",
  "/level-2-class-schedule": "/programs/level-2/",
  "/iga-level-2-explore": "/programs/level-2/",
  "/class-schedule": "/programs/",
  "/pricing": "/programs/",
  "/education-pathway": "/programs/",
  "/live-masterclass-series": "/programs/masterclasses/",
  // Foundry
  "/foundry-cohort-0": "/foundry/",
  "/foundryquest": "/foundry/",
  // About
  "/our-professors": "/about/professors/",
  "/values": "/about/#values",
  "/press-kit": "/press/",
  "/press-release-guide": "/press/",
  // Games and students
  "/play-our-graduates-games": "/games/",
  "/all-students": "/games/",
  "/all-groups": "/games/",
  // Events and learning
  "/coming-events": "/events/",
  "/podcast": "/learn/",
  // Old store and account pages (no checkout or login on the static site)
  "/shop": "/programs/",
  "/shop-page": "/programs/",
  "/cart": "/programs/",
  "/checkout": "/programs/",
  "/subscription-plan": "/programs/",
  "/full-access": "/programs/",
  "/wishlist-member": "/",
  "/login": "/",
  "/login-2": "/",
  "/logout": "/",
  "/register": "/",
  "/registration-page-for-free-users": "/free-class/",
  "/account": "/",
  "/password-reset": "/",
  "/users": "/",
  "/student-account-page": "/",
  "/team-management": "/",
  "/team-management-2": "/",
};
for (const g of games) redirects[`/game/${g.oldSlug}`] = `/games/${g.slug}/`;
for (const p of professors) redirects[`/professors/${p.slug}`] = `/about/professors/#${p.slug}`;

export default defineConfig({
  site: "https://indiegameacademy.com",
  base: "/",
  output: "static",
  trailingSlash: "ignore",
  redirects,
  integrations: [
    sitemap({
      filter: (page) => !/\/404\/?$/.test(page) && !Object.keys(redirects).some((r) => page.replace(/\/$/, "").endsWith(r)),
    }),
  ],
  server: { host: "0.0.0.0", port: 3001 },
});
