import { pillars, systems, maturityModel, getSystemByCode } from "./pillars";
import type { AssessmentQuestion, PillarCode } from "./types";

// 3 questions per system x 9 systems = 27 questions. Each answer uses the 1-5
// Maturity Model scale (Reactive -> Optimized) defined in pillars.ts, matching
// requirement 6.3 (Maturity Model) and 19.4 (Assessment user flow).
export const assessmentQuestions: AssessmentQuestion[] = systems.flatMap((system, sIndex) => {
  const base = [
    `Hệ thống "${system.name}" hiện được viết ra/tài liệu hoá rõ ràng, không chỉ nằm trong đầu người chủ.`,
    `Đội ngũ thực thi "${system.name}" đúng theo hệ thống một cách đều đặn, không cần người chủ nhắc.`,
    `Chúng tôi có chỉ số/đo lường cụ thể để biết "${system.name}" đang tốt hay chưa tốt.`,
  ];
  return base.map((text, qIndex) => ({
    id: `${system.code}-q${qIndex + 1}`,
    systemCode: system.code,
    order: sIndex * 3 + qIndex,
    text,
  }));
});

export interface AssessmentAnswers {
  [questionId: string]: number; // 1-5
}

export interface SystemScore {
  systemCode: string;
  systemName: string;
  pillar: PillarCode;
  average: number; // 1-5
}

export interface PillarScore {
  pillar: PillarCode;
  average: number; // 1-5
}

export interface AssessmentResult {
  overall: number; // 1-5
  overallPercent: number; // 0-100
  pillarScores: PillarScore[];
  systemScores: SystemScore[];
  strengths: SystemScore[]; // top 3
  gaps: SystemScore[]; // bottom 3
  maturityLabel: string;
}

export function scoreAssessment(answers: AssessmentAnswers): AssessmentResult {
  const systemScores: SystemScore[] = systems.map((system) => {
    const qIds = assessmentQuestions.filter((q) => q.systemCode === system.code).map((q) => q.id);
    const values = qIds.map((id) => answers[id]).filter((v): v is number => typeof v === "number");
    const average = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    return { systemCode: system.code, systemName: system.name, pillar: system.pillar, average };
  });

  const pillarScores: PillarScore[] = pillars.map((pillar) => {
    const scores = systemScores.filter((s) => s.pillar === pillar.code).map((s) => s.average);
    const average = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    return { pillar: pillar.code, average };
  });

  const overall = pillarScores.length
    ? pillarScores.reduce((a, b) => a + b.average, 0) / pillarScores.length
    : 0;

  const ranked = [...systemScores].sort((a, b) => b.average - a.average);
  const strengths = ranked.slice(0, 3);
  const gaps = [...ranked].sort((a, b) => a.average - b.average).slice(0, 3);

  const maturityLabel =
    maturityModel.find((m) => m.level === Math.max(1, Math.round(overall)))?.name ?? "Reactive";

  return {
    overall,
    overallPercent: Math.round((overall / 5) * 100),
    pillarScores,
    systemScores,
    strengths,
    gaps,
    maturityLabel,
  };
}

export function relatedSystemForGap(systemCode: string) {
  return getSystemByCode(systemCode);
}
