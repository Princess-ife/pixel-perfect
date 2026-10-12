import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X, Copy, Check, Mail } from "lucide-react";
import { categoryLabels, contact, type Project, type Category, filterProjects } from "@/data/projects";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/writing", label: "Writing" },
  { to: "/contact", label: "Contact" },
] as const;

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors hover:bg-secondary"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link to="/" className="min-w-0 truncate font-display text-lg font-semibold tracking-tight">
          Ifeoluwa<span className="text-primary">.</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="grid h-9 w-9 place-items-center rounded-full border md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
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
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
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

export function ExternalLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export function ProjectCard({ project, index }: { project: Project; index?: number }) {
  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      className="group relative flex h-full flex-col rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_40px_-24px_var(--color-primary)]"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="eyebrow">{categoryLabels[project.category]}</span>
        {index !== undefined && (
          <span className="font-display text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
        )}
      </div>
      <h3 className="mt-6 text-2xl font-medium leading-tight transition-colors group-hover:text-primary">
        {project.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.tools.slice(0, 4).map((t) => (
          <span key={t} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
            {t}
          </span>
        ))}
      </div>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
        View project
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
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
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}

export function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className="rounded-full border px-4 py-2 text-sm transition-colors hover:border-foreground aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background"
    >
      {children}
    </button>
  );
}

export function ContactBlock() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <p className="eyebrow">Contact</p>
      <h2 className="mt-4 max-w-4xl text-5xl font-medium leading-[1.02] sm:text-7xl">
        Have something interesting in mind? <span className="text-primary">Let's talk.</span>
      </h2>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        I'm open to international remote opportunities, content collaborations, research projects, and creative
        partnerships.
      </p>
      <p className="mt-10 break-all font-display text-xl sm:text-3xl">{contact.email}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Mail className="h-4 w-4" /> Send Email
        </a>
        <button
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy Email"}
        </button>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
        {contact.links.map((l) => (
          <ExternalLink
            key={l.label}
            href={l.url}
            className="group flex items-center justify-between bg-background p-5 font-display transition-colors hover:bg-secondary"
          >
            {l.label}
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
          </ExternalLink>
        ))}
      </div>
    </section>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="reveal mx-auto max-w-6xl px-5 pb-12 pt-20">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl text-5xl font-medium leading-[1.02] sm:text-7xl">{title}</h1>
      {children && <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{children}</p>}
    </div>
  );
}
