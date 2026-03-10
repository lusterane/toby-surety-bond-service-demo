export type Bond = {
  id: string;
  bondAmount: number;
  premium: number;
  effectiveDate: Date;
  expirationDate: Date;
  principal: Principal;
  obligee: Obligee;
  status: BondStatus;
};

export type BondStatus =
  | "Application"
  | "Underwriting"
  | "Active"
  | "Claim Filed"
  | "Renewned"
  | "Cancelled"
  | "Expired";

export type Principal = {
  name: string;
  address: string;
  creditScore: number;
  yearsInBusiness: number;
};

export type Obligee = {
  name: string;
  address: string;
};

export type RiskRating = "Low" | "Medium" | "High";

export type RiskAssessment = {
  score: number;
  rating: RiskRating;
  suggestedPremiumRate: number;
  breakdown: {
    creditScoreComponent: number;
    yearsInBusinessComponent: number;
    bondAmountComponent: number;
  };
};
