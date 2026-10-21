export type Category = "content" | "research" | "data" | "video";

export const categoryLabels: Record<Category, string> = {
  content: "Content & Copywriting",
  research: "Research & Articles",
  data: "Data & AI",
  video: "Video & UGC",
};

export type ProjectLink = { label: string; url: string };

export type MetricKind = "Audience growth" | "Reported reach" | "Model output" | "Research finding";
export type Metric = { value: number; prefix?: string; suffix?: string; decimals?: number; label: string; kind: MetricKind; context?: string; source?: ProjectLink };

const resumeSource: ProjectLink = { label: "Résumé (PDF)", url: "/documents/Ifeoluwa_Oluwafemi_Resume.pdf" };

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
  limitations?: string;
  /** Optional image URL override. By default a preview is picked up automatically from src/assets/previews/<slug>.* */
  thumbnail?: string;
  previewAlt?: string;
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
    previewAlt: "Stock photo of a financial chart illustrating lending market research",
    title: "Morpho - Research Article",
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
    previewAlt: "Stock photo of market charts illustrating prediction market analysis",
    title: "Kalshi - Prediction Market Analysis",
    category: "research",
    writingType: "Research",
    summary: "Research and analytical exploration of prediction market activity.",
    tools: ["Research", "Market Analysis"],
    deliverable: "Research document",
    links: [{ label: "Read the analysis", url: "https://docs.google.com/document/d/1bgLvhR3nmJ61DPfD9VkoJov5Fo8UCPtN5HEtU8KkD_Y/edit" }],
  },
  {
    slug: "mantle-industry-research",
    previewAlt: "Stock photo of financial district architecture illustrating capital markets research",
    title: "Mantle - Industry Research",
    category: "research",
    writingType: "Research",
    summary: "Research exploring tokenized assets, capital markets, and blockchain infrastructure.",
    tools: ["Research", "Tokenization", "Long-form Writing"],
    deliverable: "Research document",
    links: [{ label: "Read the research", url: "https://docs.google.com/document/d/1KFFh1o6zkfjuUxGjuY1RxS11vIY-2P0t6jY-MS-d7AM/edit" }],
  },
  {
    slug: "mantle-analysis",
    previewAlt: "Stock photo of a data centre illustrating blockchain infrastructure research",
    title: "Mantle - Analysis & Research",
    category: "research",
    writingType: "Research",
    summary: "An additional analytical research project examining the Mantle ecosystem.",
    tools: ["Research", "Ecosystem Analysis"],
    deliverable: "Research document",
    links: [{ label: "Read the analysis", url: "https://docs.google.com/document/d/1zEFgJn4iFEB8vNsu0-bK2JJNbX6VyVuIrrZhx2vQWII/edit" }],
  },
  {
    slug: "layerzero-article",
    previewAlt: "Stock photo of network connections illustrating blockchain interoperability",
    title: "LayerZero - Long-form Article",
    category: "research",
    writingType: "Technical",
    summary: "Educational and technical writing focused on blockchain interoperability.",
    tools: ["Technical Writing", "Educational Content"],
    deliverable: "Long-form article",
    links: [{ label: "Read the article", url: "https://docs.google.com/document/d/1zzysIT8WmA0bewKs_RN-3-oykq8faNR9pArsODzuXk0/edit" }],
  },
  {
    slug: "iomt-research",
    previewAlt: "Stock photo of a stethoscope illustrating healthcare technology research",
    title: "IoMT - Research Document",
    category: "research",
    writingType: "Technical",
    summary: "Exploratory research into vital-sign distributions, dataset coverage, and the interpretation of anomaly signals.",
    overview: "Research notes supporting an IoMT anomaly-detection prototype, focused on understanding a 50,000-record vital-sign dataset sourced from Kaggle before interpreting its model outputs.",
    objective: "Understand how the recorded vital signs are distributed, identify gaps in the dataset, and explain what unusual readings can and cannot establish.",
    role: "I examined the dataset's vital-sign ranges and histograms and documented the observations and questions that emerged during exploratory analysis.",
    approach: "Compared the shape, spread, and concentration of heart rate, oxygen saturation, blood pressure, and body temperature. Checked whether the observed ranges represented the conditions described by the dataset's alert labels.",
    findings: "Heart rate, oxygen saturation, and blood-pressure readings appeared approximately uniform, while temperature was concentrated around 37 degrees Celsius. The notes also identified a coverage gap: systolic readings started at 100 mmHg, so the dataset did not represent lower-pressure cases.",
    limitations: "The distribution patterns prompted questions about whether the data was synthetic or representative of real patients. These notes are exploratory observations, not clinical validation or diagnostic guidance.",
    tools: ["Research", "Machine Learning", "Healthcare Data"],
    deliverable: "Research document",
    links: [{ label: "Read the document", url: "https://docs.google.com/document/d/1FGZfhOLEoqovKDKcixOCwrDvcn8hBgAD2VGy88c9zIg/edit" }],
  },
  // Content & Copywriting
  {
    slug: "yoga-band-sales-copy",
    title: "Yoga Resistance Band - Sales Copy",
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
    title: "LayerZero - Content Marketing",
    category: "content",
    writingType: "Educational",
    summary: "A collection of social content explaining LayerZero and cross-chain interoperability.",
    tools: ["Content Strategy", "Social Media Content", "Educational Content"],
    deliverable: "Four X posts",
    metrics: [{ value: 30000, suffix: "+", label: "Total X impressions reported", kind: "Reported reach", context: "Overall reach reported for my LayerZero content, not a total verified from the four samples linked here. Content-marketing role listed in my résumé: Nov 2024–Jan 2026.", source: resumeSource }],
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
    title: "Harmonix - Content Marketing",
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
    title: "Mantle - Content Samples",
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
    title: "Ronin Network - User Segmentation & Clustering",
    category: "data",
    summary: "Segmenting Ronin wallets by activity and spending patterns to explore retention and growth strategies.",
    overview: "An independent analytics project combining Dune wallet data, exploratory analysis, clustering, and a Streamlit dashboard to make differences in Ronin user behaviour easier to investigate.",
    objective: "Explore how wallet activity, spending, engagement, and recency could support more targeted retention and growth decisions instead of treating every wallet as the same type of user.",
    role: "I wrote the Dune query, retrieved the data through its API, engineered wallet-level features, explored and cleaned the dataset, and compared four clustering approaches.",
    approach: "Started with 7,000 wallet records and retained 6,743 after removing extreme observations. Standardised behavioural features and compared K-Means, MiniBatch K-Means, agglomerative clustering, and DBSCAN. Used elbow and silhouette analysis alongside business interpretability when choosing the segmentation.",
    findings: "High transaction counts did not necessarily correspond to high spending. K-Means with five segments was selected for a more actionable separation of activity and value patterns, even though silhouette analysis favoured four. DBSCAN grouped most wallets together, making it less useful for this segmentation task.",
    limitations: "Wallet patterns suggest hypotheses about user behaviour; they do not verify a person's identity, game preference, or future churn. Segment labels are interpretations, and the project does not demonstrate a measured improvement in retention.",
    tools: ["Python", "SQL", "Dune Analytics", "scikit-learn", "Clustering", "Streamlit"],
    deliverable: "Wallet-segmentation analysis, model comparison, and interactive Streamlit dashboard",
    links: [
      { label: "Open live app", url: "https://ronin-clustering-model.streamlit.app/" },
      { label: "Read the project on GitHub", url: "https://github.com/Princess-ife/Ronin-User-Segmentation-For-Retention-And-Growth-Strategy" },
    ],
    featured: true,
  },
  {
    slug: "mantlepulse",
    title: "MantlePulse - AI-Powered Behavioural Analysis",
    category: "data",
    summary: "Turning Mantle wallet activity into behavioural signals and plain-language AI explanations.",
    overview: "MantlePulse is a behavioural-analysis prototype that takes a Mantle wallet address, examines its transaction history, and explains patterns that may warrant closer attention.",
    objective: "Help users reflect on trading habits such as rapid reactions, unusual position sizes, activity spikes, and failed transactions through an understandable behavioural profile.",
    role: "I built the pipeline from raw Mantle Explorer data to engineered behavioural features, added Groq LLaMA prompts for explanations and verdicts, and connected a Flask backend to an HTML and JavaScript interface.",
    approach: "Processed on-chain activity in Python and engineered signals for trading times, intervals between trades, transaction-size deviations, daily frequency, and error rates. Combined these signals into a wallet profile and used Groq LLaMA to generate a plain-language explanation and a three-level verdict.",
    findings: "The prototype connects transaction-level signals to a readable profile and one of three verdicts: Clean Signal, Caution, or Emotional Pattern Detected. Its output is designed to make the reasoning behind a flag easier to inspect.",
    limitations: "The verdicts are interpretations of wallet activity, not verified measurements of a person's emotions or financial advice. The documentation does not establish that using the tool reduces losses or improves trading outcomes.",
    tools: ["Python", "Flask", "Groq LLaMA", "Prompt Engineering", "On-chain Data", "JavaScript"],
    deliverable: "Web application with wallet profiling, behavioural signals, and AI explanations",
    links: [
      { label: "Open live app", url: "https://mantle-pulse.up.railway.app/" },
      { label: "Read the project documentation", url: "https://docs.google.com/document/d/1lonpRPzaB4rAxknLVCO1afqfxgTsESjYELRBYGYsjTw/edit" },
    ],
    featured: true,
  },
  {
    slug: "iomt-anomaly-detection",
    title: "IoMT Vitals Anomaly Detection",
    category: "data",
    summary: "An interactive vital-sign prototype for exploring unusual patterns with an Isolation Forest model.",
    overview: "A Streamlit demonstrator developed around a 50,000-record vital-sign dataset sourced from Kaggle. It combines vital-sign inputs, derived measurements, and an Isolation Forest model to explore anomaly detection in health-related data.",
    objective: "Make it easier to explore how combinations of vital-sign values relate to unusual patterns while keeping dataset assumptions visible.",
    role: "I explored the vital-sign dataset and documented its distributions and coverage gaps. The accompanying app presents vital inputs, a live summary, and an anomaly-checking workflow.",
    approach: "Reviewed heart rate, oxygen saturation, blood pressure, and temperature distributions before interpreting model signals. The app accepts vital-sign inputs and derives pulse pressure and mean arterial pressure for its analysis workflow.",
    findings: "Exploratory analysis found approximately uniform distributions for several vital signs and a narrower temperature distribution. Those patterns, together with missing low-pressure examples, raised questions about dataset realism and the situations the prototype can represent.",
    limitations: "An anomaly flag indicates an unusual pattern relative to the model's data; it does not establish a medical condition. The results reported in my résumé describe an experiment on synthetic Kaggle vitals data, not a clinical validation study.",
    tools: ["Python", "Machine Learning", "Anomaly Detection", "Streamlit"],
    deliverable: "Interactive Streamlit app",
    metrics: [
      { value: 50000, label: "Vitals records in the Kaggle dataset", kind: "Model output", context: "Synthetic vital-sign records, described in my résumé and explored in the accompanying research notes.", source: resumeSource },
      { value: 2500, label: "Statistical anomalies flagged (reported)", kind: "Model output", context: "5% of 50,000 records flagged by an Isolation Forest using seven features. These are statistical flags, not diagnosed conditions.", source: resumeSource },
    ],
    links: [
      { label: "Open live app", url: "https://iomt-anomaly-detection.streamlit.app/" },
      { label: "Read the research notes", url: "https://docs.google.com/document/d/1FGZfhOLEoqovKDKcixOCwrDvcn8hBgAD2VGy88c9zIg/edit" },
    ],
  },
  {
    slug: "mall-customer-segmentation",
    title: "Mall Customer Segmentation",
    category: "data",
    summary: "Machine learning project using customer attributes to identify different customer groups.",
    tools: ["Python", "Customer Segmentation", "Machine Learning"],
    deliverable: "Hugging Face Space",
    metrics: [
      { value: 200, prefix: "~", label: "Customers analyzed", kind: "Model output", context: "Mall retail dataset used for a K-Means segmentation project during my Aug–Nov 2025 data-science internship.", source: resumeSource },
      { value: 5, label: "Customer segments identified", kind: "Model output", context: "Cluster profiles based on age, income and spending score, used to develop targeted marketing recommendations.", source: resumeSource },
    ],
    links: [{ label: "Open on Hugging Face", url: "https://huggingface.co/spaces/Prifea/mall-customers" }],
  },
  {
    slug: "sui-ecosystem-health",
    previewAlt: "Official Dune preview of Sui Ecosystem Health Analysis by prifea",
    title: "Sui Ecosystem Health Analysis",
    category: "data",
    summary: "A Python-to-Dune analytics pipeline for exploring Sui DeFi liquidity, protocol activity, and market share.",
    overview: "An ecosystem analytics project that collects DefiLlama data, prepares CSV datasets, and uses SQL in Dune to bring Sui DeFi metrics into a shared analytical view.",
    objective: "Make ecosystem liquidity, protocol concentration, DEX volume, fees, and lending metrics easier to compare across time and protocol categories.",
    role: "I developed the Python extraction and cleaning pipeline and the Dune SQL analysis that joins protocol histories with ecosystem TVL and DEX volume.",
    approach: "Collected six datasets covering ecosystem TVL, protocol snapshots, protocol TVL histories, DEX volume, fees, and lending. Normalised types, removed duplicates, exported CSVs, and used SQL window functions and joins to calculate tracked-protocol market shares and combine daily metrics.",
    findings: "The pipeline creates a repeatable path from API data to analysis-ready datasets and dashboard views. It supports comparisons of protocol liquidity, activity, and concentration without relying on a single ecosystem-wide headline metric.",
    limitations: "Coverage and freshness depend on DefiLlama reporting and on-demand pipeline runs. Protocol market shares use the tracked protocol set as their denominator. The README's sample output is illustrative and is not presented here as measured ecosystem results.",
    tools: ["Python", "pandas", "DefiLlama API", "SQL", "Dune Analytics", "Data Visualization"],
    deliverable: "Six CSV datasets, a Python data pipeline, SQL analysis, and a Dune dashboard",
    links: [
      { label: "Open dashboard", url: "https://dune.com/prifea/sui-ecosystem-health-analysis" },
      { label: "View the pipeline on GitHub", url: "https://github.com/Princess-ife/Sui-project-analysis" },
    ],
  },
  {
    slug: "spotify-hit-predictor",
    title: "Spotify Hit Predictor",
    category: "data",
    summary: "Exploring Spotify audio features and classifying tracks into four popularity tiers with a Random Forest model.",
    overview: "An exploratory analysis and machine-learning project that turns a Spotify track dataset into an interactive popularity-tier classifier, deployed as a Flask application on Hugging Face.",
    objective: "Investigate how audio features and genre relate to recorded popularity, then make the model's classifications and probability breakdowns accessible through a web interface.",
    role: "I explored and prepared the track data, engineered features, compared model iterations, and built a Flask interface that accepts song attributes and returns a predicted tier with class probabilities.",
    approach: "Used 80,398 tracks for the documented modelling run. Created four popularity tiers, encoded genre-related features, and used a stratified 80/20 split with SMOTE on the training data. Compared Random Forest iterations and connected the model to a form using ten audio and genre-related inputs.",
    findings: "The final documented notebook iteration recorded about 69% overall accuracy on 16,080 test tracks. Performance differed substantially by tier: the rare Viral class had precision of 0.16 and recall of 0.27, so overall accuracy alone did not describe the model's usefulness for identifying viral tracks.",
    limitations: "The target is a recorded popularity tier, not future streaming success. The notebook and deployed model may represent different versions; results here describe the documented experiment. Rare-class performance and factors outside the input features limit what a prediction can establish.",
    tools: ["Python", "pandas", "scikit-learn", "Random Forest", "SMOTE", "Flask", "Hugging Face"],
    deliverable: "EDA and modelling notebooks plus an interactive popularity-tier classifier",
    links: [
      { label: "Open on Hugging Face", url: "https://huggingface.co/spaces/Prifea/Hit-Predictor" },
      { label: "Read the notebooks on GitHub", url: "https://github.com/Princess-ife/What-Makes-A-Hit-Spotify-EDA" },
    ],
  },
  {
    slug: "kalshi-dashboard",
    previewAlt: "Official Dune preview of Kalshi Prediction Market Report by prifea",
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
    summary: "Comparing four feature-selection techniques and their effect on Logistic Regression using the Pima diabetes dataset.",
    overview: "A machine-learning lab examining whether a smaller set of features could simplify a classifier while retaining performance on a dataset of 768 records with eight predictor variables.",
    objective: "Compare statistical selection, model-based selection, and dimensionality reduction, and understand how their choices affect interpretability and the recorded evaluation results.",
    role: "I cleaned disguised missing values, explored the dataset, compared Chi-squared selection, recursive feature elimination, PCA, and ExtraTrees feature rankings, and evaluated Logistic Regression on selected feature sets.",
    approach: "Replaced zero values in selected physiological fields with missing values and applied median imputation. Selected four features with Chi-squared scoring and three with RFE, examined ExtraTrees rankings, and reduced the scaled data to three principal components for comparison. Evaluated the classifiers using an 80/20 train-test split.",
    findings: "The recorded run achieved 75.3% accuracy with all features, 76.6% with Chi-squared selection, and 77.9% with RFE selection. Glucose appeared consistently useful across methods; the notes highlighted caution around Insulin because about 49% of its values needed imputation. Three PCA components explained approximately 61.5% of variance.",
    limitations: "These are results from one documented split. Some preprocessing and feature-selection analysis occurred before the split, so the figures should be treated as exploratory rather than an independent estimate of generalisation. This is a learning project, not a validated diagnostic tool.",
    tools: ["Python", "pandas", "NumPy", "scikit-learn", "Jupyter Notebook", "Feature Selection"],
    deliverable: "An annotated notebook comparing feature selection and recorded model results",
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

export const brandShowcase = {
  title: "Projects in my work",
  description: "Content samples, research subjects and independent analyses. Select a project to see my contribution.",
  items: [
    { name: "LayerZero", logo: "/images/brands/layerzero.png", logoClassName: "brightness-0 invert", projectSlug: "layerzero-content", relationship: "Content marketing", source: "User-supplied logo" },
    { name: "Harmonix", logo: "/images/brands/harmonix.svg", projectSlug: "harmonix-content", relationship: "Content samples", source: "https://harmonix.fi" },
    { name: "Mantle", logo: "/images/brands/mantle.svg", projectSlug: "mantle-content", relationship: "Content samples", source: "https://www.mantle.xyz" },
    { name: "Morpho", logo: "/images/brands/morpho.svg", projectSlug: "morpho-research", relationship: "Research article", source: "https://morpho.org" },
    { name: "Sui", logo: "/images/brands/sui.svg", projectSlug: "sui-ecosystem-health", relationship: "Independent analysis", source: "https://sui.io" },
    { name: "Kalshi", logo: "/images/brands/kalshi.jpg", logoClassName: "object-cover rounded", projectSlug: "kalshi-research", relationship: "Research article", source: "User-supplied logo" },
    { name: "Ronin", logo: "/images/brands/ronin.jpg", logoClassName: "[filter:invert(1)_grayscale(1)_brightness(3)] mix-blend-screen", projectSlug: "ronin-segmentation", relationship: "Independent analysis", source: "User-supplied image, including its original credit" },
  ],
};

export function filterProjects(cat: Category | "all") {
  return cat === "all" ? projects : projects.filter((p) => p.category === cat);
}

export const contact = {
  email: "ifeoluwaoluwafemi565@gmail.com",
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/ifeoluwa-oluwafemi-0078bb1a6", icon: "/images/socials/linkedin.svg", monochrome: true },
    { label: "Telegram", url: "https://t.me/Ifeeebaby", icon: "/images/socials/telegram.svg", monochrome: true },
    { label: "Medium", url: "https://medium.com/@ifebaby/", icon: "/images/socials/medium.svg", monochrome: true },
    { label: "Dune", url: "https://dune.com/prifea", icon: "/images/socials/dune.png", monochrome: false },
    { label: "TikTok", url: "https://www.tiktok.com/@theifelove", icon: "/images/socials/tiktok.svg", monochrome: true },
    { label: "Instagram", url: "https://www.instagram.com/ifeoluwa_writes/", icon: "/images/socials/instagram.svg", monochrome: true },
  ],
};

/** Self-reported results from the resume, attributed to each project. Not independently audited. */
export const impact = {
  intro: "Figures reported in my résumé, with the scope and source shown for each result. Audience growth, reach, model outputs and research findings measure different things.",
  bob: {
    project: "BOB Nigeria", before: 58, after: 1000, growth: 1624,
    context: "942 additional followers reported. Social Media Manager role: Nov 2025–Jul 2026, covering content planning, copywriting, scheduling and weekly analytics. These are role dates; exact measurement dates are not specified.",
    source: resumeSource,
  },
  items: [
    { project: "LayerZero", projectSlug: "layerzero-content", metric: { value: 30000, suffix: "+", label: "Total X impressions reported", kind: "Reported reach", context: "Overall reported reach, not just the four linked samples. Content-marketing role listed: Nov 2024–Jan 2026.", source: resumeSource } },
    { project: "Mall Customer Segmentation", projectSlug: "mall-customer-segmentation", metric: { value: 5, label: "Customer segments from ~200 customers", kind: "Model output", context: "K-Means groups based on age, income and spending score, used to develop marketing recommendations during my Aug–Nov 2025 internship.", source: resumeSource } },
    { project: "IoMT Vitals Anomaly Detection", projectSlug: "iomt-anomaly-detection", metric: { value: 2500, label: "Reported anomaly flags across 50,000 records", kind: "Model output", context: "5% of a synthetic Kaggle vitals dataset, flagged by Isolation Forest using seven features. Statistical anomalies, not diagnoses.", source: resumeSource } },
    { project: "DRID AI Research", metric: { value: 81.6, decimals: 1, suffix: "%", label: "ChatGPT-4 answers marked correct in the study", kind: "Research finding", context: "204 of 250 university-level MCQs across four courses, checked against expert-validated answers. This figure applies to that question set.", source: resumeSource } },
  ] satisfies { project: string; projectSlug?: string; metric: Metric }[],
};

/** Replace with real files when available. Leave undefined to show a labelled placeholder / hide the button. */
export const profile: { portrait?: string | undefined; aboutPhoto?: string | undefined; aboutPhotoAlt?: string; aboutPhotoCaption?: string; resumeUrl?: string | undefined } = {
  portrait: "/images/profile/ifeoluwa-portrait.jpg",
  aboutPhoto: "/images/profile/prifea-web3.jpeg",
  aboutPhotoAlt: "PRIFEA, my Web3 avatar, wearing a gold crown and a black face mask",
  aboutPhotoCaption: "PRIFEA - my Web3 identity.",
  resumeUrl: "/documents/Ifeoluwa_Oluwafemi_Resume.pdf",
};
