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
  id: string;
  name: string;
  address: string;
  creditScore: number;
  yearsInBusiness: number;
};

export type Obligee = {
  id: string;
  name: string;
  address: string;
};
