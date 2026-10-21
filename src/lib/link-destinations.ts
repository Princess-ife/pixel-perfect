export function linkDestination(href: string) {
  if (href.startsWith("/")) return /\.pdf(?:[?#]|$)/i.test(href) ? "PDF" : "This site";
  try {
    const { hostname } = new URL(href);
    if (hostname === "docs.google.com") return "Google Docs";
    if (hostname === "github.com") return "GitHub";
    if (["x.com", "twitter.com"].includes(hostname)) return "X";
    if (hostname === "tiktok.com" || hostname.endsWith(".tiktok.com")) return "TikTok";
    if (hostname === "huggingface.co" || hostname.endsWith(".hf.space")) return "Hugging Face";
    if (hostname.endsWith(".streamlit.app")) return "Streamlit";
    if (hostname === "dune.com") return "Dune";
    if (hostname.endsWith(".railway.app")) return "Live web app";
    return hostname.replace(/^www\./, "");
  } catch {
    return "Original source";
  }
}
