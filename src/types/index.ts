export type BondType = "Bid" | "Performance" | "Payment" | "License & Permit" | "Court";

export type Bond = {
  id: string;
  bondAmount: number;
  premium: number;
  effectiveDate: Date;
  expirationDate: Date;
  principal: Principal;
  obligee: Obligee;
  status: BondStatus;
  bondType: BondType;
  declineReason?: string;
  infoRequestMessage?: string;
};

export type BondStatus =
  | "Application"
  | "Underwriting"
  | "Active"
  | "Claim Filed"
  | "Renewed"
  | "Cancelled"
  | "Expired"
  | "Information Requested";

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