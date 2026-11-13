// Site-wide settings. Change dates, prices and links here, not in the pages.
// Every number shown on the site must also be in the proof points of .agents/product-marketing.md (IGA notes).

export const site = {
  name: "Indie Game Academy",
  url: "https://indiegameacademy.com",
  tagline: "We turn students into game devs and game devs into indie studio founders.",
  description:
    "Indie Game Academy is a live, online game development school. Learn with industry veterans, build and launch a game with a team, and pitch it to publishers.",
  email: "team@indiegameacademy.com",
};

// The Gauntlet stays internal until the formal announcement (January 2027).
// On announcement day: set public to true and confirm the url. That adds the nav item,
// the homepage band, the Foundry link and the /gauntlet/ redirect.
export const gauntlet = {
  public: false,
  url: "https://gauntlet.indiegameacademy.com",
};

export const links = {
  discord: "https://discord.gg/xDMFw4mdtX",
  newsletter: "https://mailchi.mp/a607b7639271/iga-email-signup",
  // Mailchimp embedded form action (same audience as the signup page). Leave empty to link to the signup page instead.
  newsletterAction: "",
  level3Apply: "https://form.jotform.com/261977870970676",
  // Set to the Eventbrite page of the next Level 1 weekend. Until then Level 1 sends people to the newsletter.
  level1Tickets: "",
  consultation: "https://calendly.com/if-you-willem/iga-career-consultation",
  readyDevStart: "https://readydevstart.indiegameacademy.com",
  rdsGdd: "https://readydevstart.indiegameacademy.com/blueprints/",
  youtube: "https://www.youtube.com/channel/UCbdYhWH4Sh71tqeAMNfzlVQ",
  linkedin: "https://www.linkedin.com/company/indie-game-academy",
  instagram: "https://instagram.com/indiegameacademy",
  tiktok: "https://www.tiktok.com/@indiegameacademy",
  x: "https://x.com/iga_academy",
  facebook: "https://www.facebook.com/Indie-Game-Academy-105182715249167",
  steamFoundry: "https://store.steampowered.com/publisher/indiegamefoundry",
  courseReport: "https://www.coursereport.com/schools/indie-game-academy",
  privacy: "https://www.iubenda.com/privacy-policy/43496026/full-legal",
  pressKitPdf: "https://drive.google.com/file/d/14uBHyluwvVk9LMbLWrgBX3oZigb2a-_N/view?usp=sharing",
};

// Next dates. Leave `next` empty to show "Join the waitlist" instead of a date.
export const programs = {
  level1: {
    name: "Level 1: Embark",
    short: "Level 1",
    price: "Free",
    length: "One weekend",
    next: "", // e.g. "Saturday, December 6, 2026"
    cta: links.level1Tickets ? { label: "Get a free ticket", href: links.level1Tickets } : { label: "Get notified", href: links.newsletter },
  },
  level2: {
    name: "Level 2: Explore",
    short: "Level 2",
    price: "$499",
    length: "One month",
    next: "",
    cta: { label: "Join the waitlist", href: links.newsletter },
  },
  level3: {
    name: "Level 3: Publish",
    short: "Level 3",
    price: "$999",
    scholarshipPrice: "$399",
    length: "8 weeks",
    schedule: "Tuesdays and Thursdays, 6:30-8:30 PM EST",
    next: "", // e.g. "Cohort 10 starts Tuesday, March 2, 2027"
    earlyBird: "", // e.g. "Early bird ($200 off) closes Friday, January 15"
    cta: { label: "Apply now", href: links.level3Apply },
  },
};

// Public proof points (sources in the IGA notes: .agents/product-marketing.md).
export const stats = [
  { value: "4.97/5", label: "average rating on Course Report" },
  { value: "1,000+", label: "core-program graduates" },
  { value: "40 of 42", label: "Level 3 games launched" },
  { value: "50K", label: "followers across our channels" },
];

export const nav = [
  {
    label: "Programs",
    href: "/programs/",
    children: [
      { label: "Level 1: Embark (free)", href: "/programs/level-1/" },
      { label: "Level 2: Explore", href: "/programs/level-2/" },
      { label: "Level 3: Publish", href: "/programs/level-3/" },
      { label: "Masterclasses", href: "/programs/masterclasses/" },
      { label: "All programs", href: "/programs/" },
    ],
  },
  { label: "Student games", href: "/games/" },
  { label: "Foundry", href: "/foundry/" },
  { label: "Events", href: "/events/" },
  {
    label: "Learn",
    href: "/learn/",
    children: [
      { label: "Free resources", href: "/learn/" },
      { label: "Blog", href: "/blog/" },
      { label: "Free class", href: "/free-class/" },
      { label: "Ready Dev Start wiki", href: links.readyDevStart, external: true },
      { label: "YouTube", href: links.youtube, external: true },
    ],
  },
  {
    label: "About",
    href: "/about/",
    children: [
      { label: "About IGA", href: "/about/" },
      { label: "Professors", href: "/about/professors/" },
      { label: "FAQ", href: "/faq/" },
      { label: "Press kit", href: "/press/" },
    ],
  },
];
