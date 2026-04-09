import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Align = "left" | "center";

export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "eyebrow-chip border-[rgba(95,59,37,0.16)] bg-white/70 text-[rgba(86,52,31,0.88)]",
        className,
      )}
    >
      {children}
    </Badge>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  align?: Align;
  className?: string;
}) {
  const alignedCenter = align === "center";

  return (
    <div className={cn("space-y-5", alignedCenter && "mx-auto text-center", className)}>
      {eyebrow ? <div>{eyebrow}</div> : null}
      <div className={cn("space-y-4", alignedCenter && "mx-auto max-w-3xl") }>
        <h2 className="display-title text-4xl text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-base leading-8 text-[rgba(55,43,36,0.78)] sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className={cn("flex flex-wrap gap-3", alignedCenter && "justify-center")}>{actions}</div> : null}
    </div>
  );
}

export function EditorialPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("section-shell", className)}>{children}</div>;
}

export function MetricCard({
  value,
  label,
  detail,
  className,
}: {
  value: ReactNode;
  label: ReactNode;
  detail?: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("border-white/60 bg-white/75 shadow-[0_18px_48px_rgba(52,34,22,0.08)] backdrop-blur-sm", className)}>
      <CardContent className="space-y-3 p-6">
        <div className="text-4xl font-semibold tracking-[-0.05em] text-[rgba(83,46,28,0.96)] sm:text-5xl">{value}</div>
        <div className="text-sm font-medium uppercase tracking-[0.24em] text-[rgba(112,83,59,0.8)]">{label}</div>
        {detail ? <p className="text-sm leading-6 text-[rgba(57,44,35,0.72)]">{detail}</p> : null}
      </CardContent>
    </Card>
  );
}

export function InfoCard({
  icon,
  title,
  description,
  meta,
  className,
}: {
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("group border-white/60 bg-white/72 shadow-[0_24px_64px_rgba(52,34,22,0.08)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1", className)}>
      <CardContent className="space-y-5 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(140,58,36,0.1)] text-[rgba(140,58,36,0.96)]">
          {icon}
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">{title}</h3>
          <p className="text-sm leading-7 text-[rgba(57,44,35,0.72)]">{description}</p>
        </div>
        {meta ? <div className="text-xs font-medium uppercase tracking-[0.24em] text-[rgba(112,83,59,0.72)]">{meta}</div> : null}
      </CardContent>
    </Card>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  stats,
  aside,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  stats?: Array<{ value: ReactNode; label: ReactNode }>;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10", className)}>
      <div className="mx-auto max-w-7xl">
        <EditorialPanel className="mesh-surface px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-18">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] lg:items-start">
            <div className="space-y-8">
              <SectionHeading eyebrow={eyebrow} title={title} description={description} actions={actions} />
              {stats?.length ? (
                <div className="grid gap-4 sm:grid-cols-3">
                  {stats.map((item) => (
                    <div key={`${item.label}`} className="rounded-[1.6rem] border border-white/60 bg-white/62 px-5 py-4 shadow-[0_18px_48px_rgba(52,34,22,0.08)] backdrop-blur-sm">
                      <div className="text-3xl font-semibold tracking-[-0.05em] text-[rgba(83,46,28,0.96)]">{item.value}</div>
                      <div className="mt-2 text-xs font-medium uppercase tracking-[0.24em] text-[rgba(112,83,59,0.72)]">{item.label}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="flex h-full flex-col justify-end">{aside}</div>
          </div>
        </EditorialPanel>
      </div>
    </section>
  );
}

export function CtaBand({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <EditorialPanel className={cn("bg-[linear-gradient(135deg,rgba(140,58,36,0.98),rgba(62,89,62,0.92))] px-6 py-8 text-white sm:px-10 sm:py-10", className)}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="space-y-4">
          {eyebrow ? <div>{eyebrow}</div> : null}
          <h3 className="display-title text-3xl leading-[0.95] text-white sm:text-5xl">{title}</h3>
          {description ? <p className="max-w-2xl text-base leading-8 text-white/78 sm:text-lg">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3 lg:justify-end">{actions}</div> : null}
      </div>
    </EditorialPanel>
  );
}

export function LegalBlock({
  index,
  title,
  children,
  className,
}: {
  index: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("border-white/60 bg-white/72 shadow-[0_24px_64px_rgba(52,34,22,0.08)] backdrop-blur-sm", className)}>
      <CardContent className="grid gap-6 p-7 sm:grid-cols-[auto_1fr] sm:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(141,58,36,0.16)] bg-[rgba(141,58,36,0.08)] text-sm font-semibold uppercase tracking-[0.2em] text-[rgba(141,58,36,0.95)]">
          {index}
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">{title}</h3>
          <div className="space-y-3 text-sm leading-7 text-[rgba(57,44,35,0.72)] sm:text-base">{children}</div>
        </div>
      </CardContent>
    </Card>
  );
}