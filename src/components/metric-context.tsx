import type { Metric } from "@/data/projects";
import { ExternalLink } from "@/components/site";

export function MetricContext({ metric }: { metric: Metric }) {
  return (
    <>
      {metric.context && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{metric.context}</p>}
      {metric.source && (
        <ExternalLink href={metric.source.url} className="mt-3 inline-block text-xs text-primary underline underline-offset-4">
          Source: {metric.source.label}
        </ExternalLink>
      )}
    </>
  );
}
