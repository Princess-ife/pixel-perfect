export type Category = "content" | "research" | "data" | "video";

export const categoryLabels: Record<Category, string> = {
  content: "Content & Copywriting",
  research: "Research & Articles",
  data: "Data & AI",
  video: "Video & UGC",
};

export type ProjectLink = { label: string; url: string };

export type MetricKind = "Audience growth" | "Reported reach" | "Model output" | "Research finding";
export type Metric = { value: number; prefix?: string; suffix?: string; decimals?: number; label: string; kind: MetricKind };

/** How the visual preview is framed: document page, browser window, or portrait video. */
export type PreviewFrame = "document" | "browser" | "video";

export type Project = {
  slug: string;
  title: string;
  category: Category;
  writingType?: "Research" | "Copywriting" | "Educational" | "Technical";
  summary: string;
  tools: string[];
  overview?: string;
  role?: string;
  deliverable?: string;
  note?: string;
  objective?: string;
  approach?: string;
  findings?: string;
  /** Optional image URL override. By default a preview is picked up automatically from src/assets/previews/<slug>.* */
  thumbnail?: string;
  gallery?: string[];
  metrics?: Metric[];
  links: ProjectLink[];
  featured?: boolean;
};

export const previewFrame = (p: Project): PreviewFrame =>
  p.category === "video" ? "video" : p.category === "data" ? "browser" : "document";

const x = (id: string) => `https://x.com/princess_i5/status/${id}`;

export const projects: Project[] = [
  // Research & Articles
  {
    slug: "morpho-research",
    title: "Morpho — Research Article",
    category: "research",
    writingType: "Research",
    summary:
      "Research-driven analysis of Morpho's growth and the factors influencing lending infrastructure adoption.",
    tools: ["Research", "Long-form Writing", "DeFi Analysis"],
    deliverable: "Research article",
    links: [{ label: "Read the article", url: "https://docs.google.com/document/d/1vy-rQSWhyFsIqXzlMGAHC1Ku72ukmq6U-RVBRKwotvk/edit" }],
    featured: true,
  },
  {
    slug: "kalshi-research",
    title: "Kalshi — Prediction Market Analysis",
    category: "research",
    writingType: "Research",
    summary: "Research and analytical exploration of prediction market activity.",
    tools: ["Research", "Market Analysis"],
    deliverable: "Research document",
    links: [{ label: "Read the analysis", url: "https://docs.google.com/document/d/1bgLvhR3nmJ61DPfD9VkoJov5Fo8UCPtN5HEtU8KkD_Y/edit" }],
  },
  {
    slug: "mantle-industry-research",
    title: "Mantle — Industry Research",
    category: "research",
    writingType: "Research",
    summary: "Research exploring tokenized assets, capital markets, and blockchain infrastructure.",
    tools: ["Research", "Tokenization", "Long-form Writing"],
    deliverable: "Research document",
    links: [{ label: "Read the research", url: "https://docs.google.com/document/d/1KFFh1o6zkfjuUxGjuY1RxS11vIY-2P0t6jY-MS-d7AM/edit" }],
  },
  {
    slug: "mantle-analysis",
    title: "Mantle — Analysis & Research",
    category: "research",
    writingType: "Research",
    summary: "An additional analytical research project examining the Mantle ecosystem.",
    tools: ["Research", "Ecosystem Analysis"],
    deliverable: "Research document",
    links: [{ label: "Read the analysis", url: "https://docs.google.com/document/d/1zEFgJn4iFEB8vNsu0-bK2JJNbX6VyVuIrrZhx2vQWII/edit" }],
  },
  {
    slug: "layerzero-article",
    title: "LayerZero — Long-form Article",
    category: "research",
    writingType: "Technical",
    summary: "Educational and technical writing focused on blockchain interoperability.",
    tools: ["Technical Writing", "Educational Content"],
    deliverable: "Long-form article",
    links: [{ label: "Read the article", url: "https://docs.google.com/document/d/1zzysIT8WmA0bewKs_RN-3-oykq8faNR9pArsODzuXk0/edit" }],
  },
  {
    slug: "iomt-research",
    title: "IoMT — Research Document",
    category: "research",
    writingType: "Technical",
    summary: "Research associated with the IoMT anomaly detection project.",
    tools: ["Research", "Machine Learning", "Healthcare Data"],
    deliverable: "Research document",
    links: [{ label: "Read the document", url: "https://docs.google.com/document/d/1FGZfhOLEoqovKDKcixOCwrDvcn8hBgAD2VGy88c9zIg/edit" }],
  },
  // Content & Copywriting
  {
    slug: "yoga-band-sales-copy",
    title: "Yoga Resistance Band — Sales Copy",
    category: "content",
    writingType: "Copywriting",
    summary: "Two consumer-facing persuasive copywriting samples, each taking a different creative approach.",
    tools: ["Copywriting", "Brand Messaging"],
    deliverable: "Sales copy (two versions)",
    note: "Independent copywriting samples — not commissioned by a brand.",
    links: [
      { label: "Sales Copy 1", url: "https://docs.google.com/document/d/1SgWMswSjCIuLPbm1V-_ECaGoozRULreO5OWsP6pMHUs/edit" },
      { label: "Sales Copy 2", url: "https://docs.google.com/document/d/1gqhsLzy3yQTxPRVyZjQ1D_SiDNAkdfe9VVqAF3cWdos/edit" },
    ],
    featured: true,
  },
  {
    slug: "layerzero-content",
    title: "LayerZero — Content Marketing",
    category: "content",
    writingType: "Educational",
    summary: "A collection of social content explaining LayerZero and cross-chain interoperability.",
    tools: ["Content Strategy", "Social Media Content", "Educational Content"],
    deliverable: "Four X posts",
    metrics: [{ value: 30000, suffix: "+", label: "Total X impressions reported", kind: "Reported reach" }],
    links: [
      { label: "Post 1", url: x("2012098621001367747") },
      { label: "Post 2", url: x("1972990110019776926") },
      { label: "Post 3", url: x("1979114044058489121") },
      { label: "Post 4", url: x("2019056392347300232") },
    ],
    featured: true,
  },
  {
    slug: "harmonix-content",
    title: "Harmonix — Content Marketing",
    category: "content",
    summary: "Social content created for Harmonix.",
    tools: ["Content Strategy", "Social Media Content"],
    deliverable: "Three X posts",
    links: [
      { label: "Post 1", url: x("1988132451990778280") },
      { label: "Post 2", url: x("1993934212722835550") },
      { label: "Post 3", url: x("1991034255535698144") },
    ],
  },
  {
    slug: "mantle-content",
    title: "Mantle — Content Samples",
    category: "content",
    summary: "Social content samples on the Mantle ecosystem.",
    tools: ["Social Media Content", "Brand Messaging"],
    deliverable: "Two X posts",
    links: [
      { label: "Post 1", url: x("2024777595108167892") },
      { label: "Post 2", url: x("1922522681062076918") },
    ],
  },
  {
    slug: "other-content",
    title: "Other Content Samples",
    category: "content",
    summary: "Content across eOracle, Push Chain, Mach Exchange, T-RIZE, Bythen AI, Skillful AI and Encifherio.",
    tools: ["Social Media Content", "Copywriting"],
    deliverable: "X posts across seven projects",
    links: [
      { label: "eOracle", url: x("1900614856900047110") },
      { label: "Push Chain", url: x("1897875699974738304") },
      { label: "Mach Exchange", url: x("1909474503408689606") },
      { label: "T-RIZE", url: x("1902249330423025889") },
      { label: "Bythen AI — 1", url: x("1887464861132628175") },
      { label: "Bythen AI — 2", url: x("1892108980173799736") },
      { label: "Skillful AI", url: x("1927599276915298700") },
      { label: "Encifherio", url: x("1950812776265388385") },
    ],
  },
  // Data & AI
  {
    slug: "ronin-segmentation",
    title: "Ronin Network — User Segmentation & Clustering",
    category: "data",
    summary: "Interactive analytics project exploring user segmentation using machine learning.",
    tools: ["Python", "Machine Learning", "Clustering", "Streamlit"],
    deliverable: "Interactive Streamlit app",
    links: [{ label: "Open live app", url: "https://ronin-clustering-model.streamlit.app/" }],
    featured: true,
  },
  {
    slug: "mantlepulse",
    title: "MantlePulse — AI-Powered Behavioural Analysis",
    category: "data",
    summary: "AI-powered application examining patterns in wallet transaction activity.",
    tools: ["Python", "AI", "On-chain Data"],
    deliverable: "Web application",
    links: [{ label: "Open live app", url: "https://mantle-pulse.up.railway.app/" }],
    featured: true,
  },
  {
    slug: "iomt-anomaly-detection",
    title: "IoMT Vitals Anomaly Detection",
    category: "data",
    summary: "Machine learning application for detecting unusual patterns in health-related data.",
    tools: ["Python", "Machine Learning", "Anomaly Detection", "Streamlit"],
    deliverable: "Interactive Streamlit app",
    metrics: [
      { value: 50000, label: "Patient records analyzed", kind: "Model output" },
      { value: 2500, label: "Statistical anomalies flagged", kind: "Model output" },
    ],
    links: [{ label: "Open live app", url: "https://iomt-anomaly-detection.streamlit.app/" }],
  },
  {
    slug: "mall-customer-segmentation",
    title: "Mall Customer Segmentation",
    category: "data",
    summary: "Machine learning project using customer attributes to identify different customer groups.",
    tools: ["Python", "Customer Segmentation", "Machine Learning"],
    deliverable: "Hugging Face Space",
    metrics: [
      { value: 200, prefix: "~", label: "Customers analyzed", kind: "Model output" },
      { value: 5, label: "Customer segments identified", kind: "Model output" },
    ],
    links: [{ label: "Open on Hugging Face", url: "https://huggingface.co/spaces/Prifea/mall-customers" }],
  },
  {
    slug: "sui-ecosystem-health",
    title: "Sui Ecosystem Health Analysis",
    category: "data",
    summary: "On-chain analytics dashboard exploring Sui ecosystem activity.",
    tools: ["SQL", "Dune Analytics", "Data Visualization"],
    deliverable: "Dune dashboard",
    links: [{ label: "Open dashboard", url: "https://dune.com/prifea/sui-ecosystem-health-analysis" }],
  },
  {
    slug: "spotify-hit-predictor",
    title: "Spotify Hit Predictor",
    category: "data",
    summary: "Machine learning application exploring music performance prediction.",
    tools: ["Python", "Machine Learning"],
    deliverable: "Hugging Face Space",
    links: [{ label: "Open on Hugging Face", url: "https://huggingface.co/spaces/Prifea/Hit-Predictor" }],
  },
  {
    slug: "kalshi-dashboard",
    title: "Kalshi Prediction Market Dashboard",
    category: "data",
    summary: "On-chain analytics and market activity visualization.",
    tools: ["SQL", "Dune Analytics", "Data Visualization"],
    deliverable: "Dune dashboard",
    links: [{ label: "Open dashboard", url: "https://dune.com/prifea/kalshi-prediction-market-report" }],
  },
  {
    slug: "pima-diabetes",
    title: "Pima Diabetes Feature Selection",
    category: "data",
    summary: "Machine learning and feature-selection project.",
    tools: ["Python", "Jupyter Notebook", "Feature Selection", "GitHub"],
    deliverable: "GitHub repository",
    links: [{ label: "View on GitHub", url: "https://github.com/Princess-ife/pima-diabetes-feature-selection" }],
  },
];

export type Video = { slug: string; title: string; url: string; featured?: boolean };

export const videos: Video[] = [
  { slug: "introduction", title: "Introduction Video", url: "https://vt.tiktok.com/ZSqmgkCjJ/" },
  { slug: "tech-ugc", title: "Tech UGC", url: "https://vt.tiktok.com/ZSqmgY5fb/", featured: true },
  { slug: "data-science-101", title: "Data Science 101", url: "https://vt.tiktok.com/ZSqmbKLyp/" },
  { slug: "educational", title: "Additional Educational Video", url: "https://vt.tiktok.com/ZSqmgeSNF/" },
];

// Video gallery as a project entry so it appears in Work + has a detail page
projects.push({
  slug: "tech-ugc",
  title: "Video & Tech UGC",
  category: "video",
  summary: "Short-form videos covering tech UGC, an introduction, and beginner-friendly data science.",
  tools: ["Video Content", "Tech UGC", "Scriptwriting", "Digital Storytelling"],
  deliverable: "Four TikTok videos",
  links: videos.map((v) => ({ label: v.title, url: v.url })),
  featured: true,
});

export const featuredOrder = [
  "morpho-research",
  "layerzero-content",
  "yoga-band-sales-copy",
  "ronin-segmentation",
  "mantlepulse",
  "tech-ugc",
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export function filterProjects(cat: Category | "all") {
  return cat === "all" ? projects : projects.filter((p) => p.category === cat);
}

export const contact = {
  email: "ifeoluwaoluwafemi565@gmail.com",
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/ifeoluwa-oluwafemi-0078bb1a6" },
    { label: "Telegram", url: "https://t.me/Ifeeebaby" },
    { label: "Medium", url: "https://medium.com/@ifebaby/" },
    { label: "Dune", url: "https://dune.com/prifea" },
    { label: "TikTok", url: "https://www.tiktok.com/@theifelove" },
    { label: "Instagram", url: "https://www.instagram.com/ifeoluwa_writes/" },
  ],
};

/** Self-reported results from the resume, attributed to each project. Not independently audited. */
export const impact = {
  bob: { project: "BOB Nigeria", before: 58, after: 1000, growth: 1624 },
  items: [
    { project: "LayerZero", metric: { value: 30000, suffix: "+", label: "Total X impressions reported", kind: "Reported reach" } },
    { project: "Mall Customer Segmentation", metric: { value: 5, label: "Customer segments from ~200 customers", kind: "Model output" } },
    { project: "IoMT Vitals Anomaly Detection", metric: { value: 2500, label: "Anomalies flagged across 50,000 records", kind: "Model output" } },
    { project: "DRID AI Research", metric: { value: 81.6, decimals: 1, suffix: "%", label: "Overall accuracy observed on 250 university-level questions", kind: "Research finding" } },
  ] satisfies { project: string; metric: Metric }[],
};

/** Replace with real files when available. Leave undefined to show a labelled placeholder / hide the button. */
export const profile: { portrait?: string; aboutPhoto?: string; resumeUrl?: string } = {
  portrait: undefined,
  aboutPhoto: undefined,
  resumeUrl: undefined,
};
