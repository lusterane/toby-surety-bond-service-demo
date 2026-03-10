import type { Bond, RiskAssessment, RiskRating } from "../types";

export function calculateRiskAssessment(bond: Bond): RiskAssessment {
  // Credit Score (60%): Normalize 300-850 range to 0-100
  const creditNormalized = Math.min(
    100,
    Math.max(0, ((bond.principal.creditScore - 300) / 550) * 100)
  );
  const creditScoreComponent = creditNormalized * 0.6;

  // Years in Business (25%): Cap at 20 years
  const yearsNormalized = Math.min(100, (bond.principal.yearsInBusiness / 20) * 100);
  const yearsInBusinessComponent = yearsNormalized * 0.25;

  // Bond Amount (15%): Inverse scale — $50k or less = 100, $1M+ = 0
  const bondNormalized =
    bond.bondAmount <= 50000
      ? 100
      : bond.bondAmount >= 1000000
        ? 0
        : ((1000000 - bond.bondAmount) / 950000) * 100;
  const bondAmountComponent = bondNormalized * 0.15;

  const score = Math.round(creditScoreComponent + yearsInBusinessComponent + bondAmountComponent);

  const rating: RiskRating = score >= 75 ? "Low" : score >= 45 ? "Medium" : "High";

  const suggestedPremiumRate = Math.min(
    0.05,
    Math.max(0.015, 0.05 - (score / 100) * 0.035)
  );

  return {
    score,
    rating,
    suggestedPremiumRate,
    breakdown: {
      creditScoreComponent: Math.round(creditScoreComponent * 10) / 10,
      yearsInBusinessComponent: Math.round(yearsInBusinessComponent * 10) / 10,
      bondAmountComponent: Math.round(bondAmountComponent * 10) / 10,
    },
  };
}
