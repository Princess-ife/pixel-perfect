import { impact } from "@/data/projects";
import { Counter, ExternalLink, Reveal } from "@/components/site";
import { Link } from "@tanstack/react-router";
import { MetricContext } from "@/components/metric-context";

export function ImpactSection() {
  const { bob, items } = impact;
  const max = bob.after;
  return (
    <section className="relative border-t bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-24">
        <Reveal>
          <p className="eyebrow">Impact & results</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-tight sm:text-6xl">
            Numbers from the work, <span className="font-serif italic text-gradient">attributed to each project.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            {impact.intro}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="rounded-2xl border bg-card p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">Audience growth</span>
                <h3 className="mt-4 text-2xl font-medium">BOB Nigeria</h3>
                <p className="text-sm text-muted-foreground">Followers, start vs. end</p>
              </div>
              <p className="font-display text-5xl font-medium text-gradient sm:text-6xl">
                <Counter metric={{ value: bob.growth, prefix: "~", suffix: "%", label: "", kind: "Audience growth" }} />
              </p>
            </div>
            <BarChart rows={[{ label: "Start", value: bob.before }, { label: "End", value: bob.after }]} max={max} />
            <p className="mt-8 text-xs leading-relaxed text-muted-foreground">{bob.context}</p>
            <ExternalLink href={bob.source.url} className="mt-3 inline-block text-xs text-primary underline underline-offset-4">Source: {bob.source.label}</ExternalLink>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {items.map((it, i) => (
              <Reveal key={it.project} delay={i * 80} className="flex flex-col rounded-2xl border bg-card p-6">
                <span className="self-start rounded-full border px-2.5 py-0.5 text-[11px] text-muted-foreground">{it.metric.kind}</span>
                <p className="mt-5 font-display text-4xl font-medium">
                  <Counter metric={it.metric} />
                </p>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{it.metric.label}</p>
                <MetricContext metric={it.metric} />
                {"projectSlug" in it ? (
                  <Link to="/work/$slug" params={{ slug: it.projectSlug }} hash="project-story" className="mt-4 text-xs uppercase tracking-widest text-primary hover:underline">{it.project} - view project</Link>
                ) : <p className="mt-4 text-xs uppercase tracking-widest text-primary">{it.project}</p>}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BarChart({ rows, max }: { rows: { label: string; value: number }[]; max: number }) {
  return (
    <div className="mt-10 flex h-56 items-end gap-6 border-b pb-0" role="img" aria-label={rows.map((r) => `${r.label}: ${r.value} followers`).join(", ")}>
      {rows.map((r, i) => (
        <div key={r.label} className="group flex h-full flex-1 flex-col justify-end">
          <span className="mb-2 font-display text-lg tabular-nums">{r.value.toLocaleString()}</span>
          <Reveal delay={i * 200} className="h-full">
            <div className="flex h-full items-end">
              <div
                className={`w-full rounded-t-lg transition-all duration-1000 group-hover:opacity-90 ${i === 0 ? "bg-muted" : "bg-gradient-accent glow"}`}
                style={{ height: `${Math.max(3, (r.value / max) * 100)}%` }}
              />
            </div>
          </Reveal>
          <span className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{r.label}</span>
        </div>
      ))}
    </div>
  );
}
