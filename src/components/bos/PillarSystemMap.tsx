import { pillars, getSystemsByPillar } from "@/lib/content/pillars";

export function PillarSystemMap() {
  return (
    <div className="space-y-12">
      {pillars.map((pillar) => (
        <div key={pillar.code} id={pillar.code.toLowerCase()} className="scroll-mt-24">
          <div className="mb-6 flex items-baseline gap-3">
            <h2 className="text-2xl font-semibold text-navy">{pillar.code}</h2>
            <span className="text-lg text-gold">{pillar.tagline}</span>
          </div>
          <p className="mb-6 max-w-2xl text-charcoal/75">{pillar.description}</p>
          <div className="grid gap-6 lg:grid-cols-3">
            {getSystemsByPillar(pillar.code).map((system) => (
              <div key={system.code} id={system.slug} className="scroll-mt-24 rounded-2xl border border-navy/10 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold">{system.code}</p>
                <h3 className="mt-1 text-lg font-semibold text-navy">{system.name}</h3>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-charcoal/50">Vấn đề thường gặp</p>
                <ul className="mt-1 space-y-1 text-sm text-charcoal/75">
                  {system.commonProblems.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-charcoal/50">Mục tiêu</p>
                <p className="mt-1 text-sm text-charcoal/75">{system.goal}</p>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-charcoal/50">Module chính</p>
                <p className="mt-1 text-sm text-charcoal/75">{system.mainModules.join(" · ")}</p>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-charcoal/50">Công cụ</p>
                <p className="mt-1 text-sm text-charcoal/75">{system.tools.join(" · ")}</p>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-charcoal/50">Kết quả mong đợi</p>
                <ul className="mt-1 space-y-1 text-sm text-charcoal/75">
                  {system.expectedResults.map((r) => (
                    <li key={r}>• {r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
