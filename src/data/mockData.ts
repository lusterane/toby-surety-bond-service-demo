import type { Bond } from "../types";
export const initialBonds: Bond[] = [
  {
    id: "SB-2026-001",
    bondAmount: 100000,
    premium: 1000,
    effectiveDate: new Date(),
    expirationDate: new Date(),
    principal: {
      id: "1",
      name: "Toby Chow",
      address: "123 St, Plano TX, USA",
      creditScore: 700,
      yearsInBusiness: 5,
    },
    obligee: { id: "1", name: "Company LLC", address: "456 St, Plano TX, USA" },
    status: "Active",
  },
  {
    id: "SB-2026-002",
    bondAmount: 200000,
    premium: 2000,
    effectiveDate: new Date(),
    expirationDate: new Date(),
    principal: {
      id: "2",
      name: "Mike",
      address: "789 St, Plano TX, USA",
      creditScore: 700,
      yearsInBusiness: 10,
    },
    obligee: {
      id: "2",
      name: "Big Corp LLC",
      address: "101 St, Plano TX, USA",
    },
    status: "Active",
  },
];
