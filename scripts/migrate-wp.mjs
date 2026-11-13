// One-time migration from the WordPress site (indiegameacademy.com) to this static site.
// Usage: node scripts/migrate-wp.mjs <folder with posts.json, games.json, professors.json, gamecats.json>
// Those JSON files come from the WordPress REST API:
//   /wp-json/wp/v2/posts?per_page=100, /games?per_page=100, /professors?per_page=100, /game-categories?per_page=100
// Output: src/data/{posts,games,professors}.json and images copied to public/wp-content/uploads/...
// Images keep their WordPress paths so old image links and blog URLs keep working after the DNS switch.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const src = process.argv[2];
if (!src) throw new Error("Pass the folder that holds the WordPress JSON exports.");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => JSON.parse(fs.readFileSync(path.join(src, f), "utf8"));

const ORIGIN = /https?:\/\/(www\.)?indiegameacademy\.com/g;
const images = new Set();

const decode = (s = "") =>
  s
    .replace(/&#8217;|&#039;|&#x27;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;|&#8221;|&quot;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…")
    .replace(/&#038;|&amp;/g, "&")
    .replace(/&nbsp;/g, " ");
const text = (html = "") => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

function cleanHtml(html = "") {
  let out = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\s(srcset|sizes|data-[\w-]+)="[^"]*"/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "")
    .replace(/\sclass="[^"]*"/gi, "")
    .replace(/\sid="[^"]*"/gi, "")
    .replace(/<p>\s*(&nbsp;)?\s*<\/p>/g, "");
  for (const m of out.matchAll(/https?:\/\/(?:www\.)?indiegameacademy\.com(\/wp-content\/uploads\/[^"'\s)]+)/g)) images.add(m[1]);
  out = out.replace(ORIGIN, "");
  // Internal links that moved: point them straight at the new URLs.
  out = out
    .replace(/href="\/class-schedule-level-3\/?"/g, 'href="/programs/level-3/"')
    .replace(/href="\/level-1-class-schedule\/?"/g, 'href="/programs/level-1/"')
    .replace(/href="\/level-2-class-schedule\/?"/g, 'href="/programs/level-2/"');
  return out;
}

const media = {};
async function mediaUrl(id) {
  if (!id) return null;
  if (media[id] !== undefined) return media[id];
  try {
    const r = await fetch(`https://indiegameacademy.com/wp-json/wp/v2/media/${id}?_fields=source_url,alt_text`);
    const j = await r.json();
    const url = j.source_url ? j.source_url.replace(ORIGIN, "") : null;
    if (url) images.add(url);
    media[id] = url;
  } catch {
    media[id] = null;
  }
  return media[id];
}

const cats = Object.fromEntries(read("gamecats.json").map((c) => [c.id, c.name]));

const posts = [];
for (const p of read("posts.json")) {
  posts.push({
    slug: p.slug,
    title: decode(p.title.rendered),
    date: p.date,
    modified: p.modified,
    description: (p.yoast_head_json?.description || text(p.excerpt.rendered)).slice(0, 160),
    image: await mediaUrl(p.featured_media),
    html: cleanHtml(p.content.rendered),
  });
}

const games = [];
for (const g of read("games.json")) {
  const html = cleanHtml(g.content.rendered);
  const play = (html.match(/href="(https:\/\/[^"]*itch\.io\/[^"]*|https:\/\/store\.steampowered\.com\/[^"]*)"/) || [])[1] || null;
  games.push({
    slug: g.slug === "7163" ? "game-7163" : g.slug,
    oldSlug: g.slug,
    title: decode(g.title.rendered),
    summary: text(g.excerpt.rendered).slice(0, 200),
    genres: (g["game-categories"] || []).map((id) => cats[id]).filter(Boolean),
    image: await mediaUrl(g.featured_media),
    play,
    html,
    date: g.date,
  });
}

const professors = [];
for (const p of read("professors.json")) {
  professors.push({
    slug: p.slug,
    name: decode(p.title.rendered),
    bio: text(p.excerpt.rendered),
    image: await mediaUrl(p.featured_media),
  });
}

fs.writeFileSync(path.join(root, "src/data/posts.json"), JSON.stringify(posts, null, 1));
fs.writeFileSync(path.join(root, "src/data/games.json"), JSON.stringify(games, null, 1));
fs.writeFileSync(path.join(root, "src/data/professors.json"), JSON.stringify(professors, null, 1));

let ok = 0, fail = 0;
for (const rel of images) {
  const dest = path.join(root, "public", decodeURIComponent(rel));
  if (fs.existsSync(dest)) { ok++; continue; }
  try {
    const r = await fetch("https://indiegameacademy.com" + rel);
    if (!r.ok) throw new Error(r.status);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
    ok++;
  } catch (e) {
    fail++;
    console.warn("image failed", rel, e.message);
  }
}
console.log(`posts ${posts.length}, games ${games.length}, professors ${professors.length}, images ok ${ok}, failed ${fail}`);
