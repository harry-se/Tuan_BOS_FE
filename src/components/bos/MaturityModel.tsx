import type { IconType } from "react-icons";
import { FiAlertTriangle, FiFileText, FiSettings, FiBarChart2, FiTrendingUp } from "react-icons/fi";

import { maturityModel } from "@/lib/content/pillars";

const stageIcons: Record<number, IconType> = {
  1: FiAlertTriangle,
  2: FiFileText,
  3: FiSettings,
  4: FiBarChart2,
  5: FiTrendingUp,
};

export function MaturityModel() {
  return (
    <div className="grid gap-3 sm:grid-cols-5">
      {maturityModel.map((stage) => {
        const Icon = stageIcons[stage.level];
        return (
          <div key={stage.level} className="rounded-2xl border border-navy/10 bg-white p-4 text-center">
            <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="text-2xl font-bold text-gold">{stage.level}</p>
            <p className="mt-1 font-semibold text-navy">{stage.name}</p>
            <p className="mt-2 text-xs text-charcoal/70">{stage.description}</p>
          </div>
        );
      })}
    </div>
  );
}
