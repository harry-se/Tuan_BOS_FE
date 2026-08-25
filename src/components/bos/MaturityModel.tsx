import { maturityModel } from "@/lib/content/pillars";

export function MaturityModel() {
  return (
    <div className="grid gap-3 sm:grid-cols-5">
      {maturityModel.map((stage) => (
        <div key={stage.level} className="rounded-2xl border border-navy/10 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-gold">{stage.level}</p>
          <p className="mt-1 font-semibold text-navy">{stage.name}</p>
          <p className="mt-2 text-xs text-charcoal/70">{stage.description}</p>
        </div>
      ))}
    </div>
  );
}
