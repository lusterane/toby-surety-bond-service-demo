import type { Bond } from "../types";
export const initialBonds: Bond[] = [
  {
    id: "1",
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
];
