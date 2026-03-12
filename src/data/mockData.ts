import type { Bond } from "../types";
let bondCounter = 5;

export function generateBondNumber(): string {
  bondCounter += 1;
  return `SB-2026-${String(bondCounter).padStart(3, "0")}`;
}
export const initialBonds: Bond[] = [
  {
    id: "SB-2026-001",
    bondAmount: 100000,
    premium: 2500,
    effectiveDate: new Date(),
    expirationDate: new Date(),
    principal: {
      name: "Toby Chow",
      address: "123 St, Plano TX, USA",
      creditScore: 700,
      yearsInBusiness: 5,
    },
    obligee: { name: "Company LLC", address: "456 St, Plano TX, USA" },
    status: "Active",
    bondType: "Performance",
  },
  {
    id: "SB-2026-002",
    bondAmount: 200000,
    premium: 5000,
    effectiveDate: new Date(),
    expirationDate: new Date(),
    principal: {
      name: "Mike Smith",
      address: "789 St, Plano TX, USA",
      creditScore: 700,
      yearsInBusiness: 10,
    },
    obligee: {
      name: "Big Corp LLC",
      address: "101 St, Plano TX, USA",
    },
    status: "Active",
    bondType: "Performance",
  },
  {
    id: "SB-2026-003",
    bondAmount: 500000,
    premium: 0,
    effectiveDate: new Date(),
    expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    principal: {
      name: "Joyce Marshall",
      address: "220 Place Blvd, Dallas TX, USA",
      creditScore: 620,
      yearsInBusiness: 3,
    },
    obligee: {
      name: "City of Dallas",
      address: "123 Place St, Dallas TX, USA",
    },
    status: "Underwriting",
    bondType: "Performance",
  },
];
