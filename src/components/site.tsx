import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Menu, X, Copy, Check, Mail, Play, ImagePlus, FileText } from "lucide-react";
import {
  categoryLabels,
  contact,
  previewFrame,
  videos,
  type Project,
  type Category,
  type Metric,
  filterProjects,
} from "@/data/projects";
import { previewFor, videoThumbFor } from "@/data/previews";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/writing", label: "Writing" },
  { to: "/contact", label: "Contact" },
] as const;

/* ---------------- Layout ---------------- */

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <Link to="/" className="min-w-0 truncate font-display text-lg font-semibold tracking-tight">
          Ifeoluwa<span className="text-gradient">.</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 rounded-full border bg-surface/60 p-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-card data-[status=active]:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contact"
          className="hidden rounded-full bg-gradient-accent px-4 py-2 text-sm font-medium text-primary-foreground md:inline-flex"
        >
          Let's talk
        </Link>
        <button
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t px-5 py-3 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: n.to === "/" }}
              className="block py-3 font-display text-2xl data-[status=active]:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Ifeoluwa Oluwafemi</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {contact.links.map((l) => (
            <ExternalLink key={l.label} href={l.url} className="hover:text-foreground">
              {l.label}
            </ExternalLink>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function ExternalLink({ href, children, className, ...rest }: { href: string; children: ReactNode; className?: string; "aria-label"?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
    </a>
  );
}

/* ---------------- Motion helpers ---------------- */

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible] as const;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string | undefined; delay?: number }) {
  const [ref, visible] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} data-visible={visible} style={{ transitionDelay: `${delay}ms` }} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
}

export function Counter({ metric }: { metric: Metric }) {
  const [ref, visible] = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(metric.value);
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1400);
      setN(metric.value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, metric.value]);
  const shown = n.toLocaleString("en-US", { minimumFractionDigits: metric.decimals ?? 0, maximumFractionDigits: metric.decimals ?? 0 });
  return (
    <span ref={ref} className="tabular-nums">
      {metric.prefix}
      {shown}
      {metric.suffix}
    </span>
  );
}

function trackMouse(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/* ---------------- Previews ---------------- */

export function UploadPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-input bg-surface p-4 text-center text-muted-foreground ${className}`}>
      <ImagePlus className="h-6 w-6" />
      <span className="text-xs uppercase tracking-widest">{label}</span>
    </div>
  );
}

export function Preview({ project, className = "" }: { project: Project; className?: string }) {
  const src = previewFor(project);
  const frame = previewFrame(project);

  if (frame === "video") {
    return (
      <div className={`relative mx-auto aspect-[9/16] h-full max-h-full overflow-hidden rounded-2xl border bg-surface ${className}`}>
        {src ? <img src={src} alt={`Thumbnail for ${project.title}`} loading="lazy" className="h-full w-full object-cover" /> : <UploadPlaceholder label="Video thumbnail" />}
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur transition-transform group-hover:scale-110">
            <Play className="ml-0.5 h-6 w-6" />
          </span>
        </span>
      </div>
    );
  }

  if (frame === "browser") {
    return (
      <div className={`flex h-full w-full flex-col overflow-hidden rounded-xl border bg-surface shadow-2xl ${className}`}>
        <div className="flex shrink-0 items-center gap-1.5 border-b px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="ml-3 truncate rounded bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
            {project.links[0]?.url.replace(/^https?:\/\//, "")}
          </span>
        </div>
        <div className="min-h-0 flex-1">
          {src ? (
            <img src={src} alt={`Screenshot of ${project.title}`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
          ) : (
            <UploadPlaceholder label="Upload screenshot" className="border-0" />
          )}
        </div>
      </div>
    );
  }

  // document
  return (
    <div className={`relative h-full w-full overflow-hidden rounded-xl bg-surface ${className}`}>
      <div className="absolute inset-x-[12%] top-[10%] -bottom-6 overflow-hidden rounded-t-md bg-foreground shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-1deg]">
        {src ? (
          <img src={src} alt={`First page of ${project.title}`} loading="lazy" className="h-full w-full scale-[1.4] object-cover object-top" style={{ transformOrigin: "50% 0" }} />
        ) : (
          <UploadPlaceholder label="Upload document preview" className="border-0" />
        )}
      </div>
      <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-background/90 via-background/0 to-transparent pb-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          <FileText className="h-4 w-4" /> {project.category === "content" ? "Read Copy" : "Read Research"}
        </span>
      </span>
    </div>
  );
}

/* ---------------- Cards ---------------- */

export function ProjectCard({ project, size = "md" }: { project: Project; size?: "md" | "lg" | "tall" }) {
  const media = size === "lg" ? "h-72 sm:h-96" : size === "tall" ? "h-[26rem] sm:h-[32rem]" : "h-60";
  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      onMouseMove={trackMouse}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:glow"
    >
      <span aria-hidden className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className={`relative p-4 pb-0 ${media}`}>
        <Preview project={project} />
      </div>
      <div className="relative flex flex-1 flex-col p-6">
        <span className="eyebrow">{categoryLabels[project.category]}</span>
        <h3 className={`mt-3 font-medium leading-tight transition-colors group-hover:text-primary ${size === "lg" ? "text-3xl" : "text-2xl"}`}>
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-wrap gap-1.5">
            {project.tools.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">{t}</span>
            ))}
          </div>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      </div>
    </Link>
  );
}

const filters: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "content", label: categoryLabels.content },
  { key: "research", label: categoryLabels.research },
  { key: "data", label: categoryLabels.data },
  { key: "video", label: categoryLabels.video },
];

export function WorkGallery() {
  const [active, setActive] = useState<Category | "all">("all");
  const list = filterProjects(active);
  return (
    <>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <FilterChip key={f.key} active={active === f.key} onClick={() => setActive(f.key)}>
            {f.label}
          </FilterChip>
        ))}
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProjectCard key={p.slug} project={p} size={p.category === "video" ? "tall" : "md"} />
        ))}
      </div>
    </>
  );
}

export function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className="rounded-full border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground aria-pressed:border-transparent aria-pressed:bg-gradient-accent aria-pressed:text-primary-foreground"
    >
      {children}
    </button>
  );
}

/* ---------------- Video gallery ---------------- */

export function VideoGallery() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {videos.map((v, i) => {
        const thumb = videoThumbFor(v.slug);
        return (
          <Reveal key={v.slug} delay={i * 80}>
            <ExternalLink href={v.url} className="group relative block aspect-[9/16] overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:glow">
              {thumb ? (
                <img src={thumb} alt={`Thumbnail for ${v.title}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <UploadPlaceholder label="Video thumbnail" className="!justify-start border-0 pt-10" />
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
              <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background/60 backdrop-blur transition-transform group-hover:scale-110">
                <Play className="ml-0.5 h-6 w-6" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-4">
                <span className="block font-display text-lg leading-tight">{v.title}</span>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-primary">Watch Video <ArrowUpRight className="h-3 w-3" /></span>
              </span>
            </ExternalLink>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ---------------- Contact ---------------- */

export function ContactBlock() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="glow-orb absolute -right-40 top-10 h-[30rem] w-[30rem] opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32">
        <p className="eyebrow">Contact</p>
        <h2 className="mt-4 max-w-4xl text-5xl font-medium leading-[1.02] sm:text-7xl">
          Have something interesting in mind? <span className="font-serif italic text-gradient">Let's talk.</span>
        </h2>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          I'm open to international remote opportunities, content collaborations, research projects, and creative partnerships.
        </p>
        <p className="mt-10 break-all font-display text-xl sm:text-3xl">{contact.email}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
            <Mail className="h-4 w-4" /> Send Email
          </a>
          <button onClick={copy} className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy Email"}
          </button>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3">
          {contact.links.map((l) => (
            <ExternalLink key={l.label} href={l.url} className="group flex items-center justify-between bg-card p-5 font-display transition-colors hover:bg-secondary">
              {l.label}
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </ExternalLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
      <div className="reveal relative mx-auto max-w-7xl px-5 pb-12 pt-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-medium leading-[1.02] sm:text-7xl">{title}</h1>
        {children && <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{children}</p>}
      </div>
    </div>
  );
}

export function Portrait({ src, label, className = "" }: { src?: string | undefined; label: string; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden className="glow-orb absolute -inset-10" />
      <div aria-hidden className="absolute -right-3 -top-3 h-24 w-24 rounded-full border border-primary/40" />
      <div aria-hidden className="absolute -bottom-4 -left-4 h-16 w-16 rounded-xl bg-gradient-accent opacity-80" />
      <div className="relative h-full overflow-hidden rounded-[2rem] border bg-card glow">
        {src ? (
          <img src={src} alt="Portrait of Ifeoluwa Oluwafemi" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_30%,var(--color-accent),var(--color-card)_70%)] p-6 text-center">
            <ImagePlus className="h-8 w-8 text-primary" />
            <p className="font-display text-lg">{label}</p>
            <p className="max-w-[16rem] text-xs text-muted-foreground">Placeholder — replace with your photo</p>
          </div>
        )}
      </div>
    </div>
  );
}
