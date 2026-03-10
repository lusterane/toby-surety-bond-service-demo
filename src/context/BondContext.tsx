import { createContext, useState } from "react";
import type { Bond } from "../types";
import { initialBonds } from "../data/mockData";

type BondContextValue = {
  bonds: Bond[];
  findBondById: (id: string) => Bond | undefined;
};

export const BondContext = createContext<BondContextValue | null>(null);

export function BondProvider({ children }: { children: React.ReactNode }) {
  const [bonds, setBonds] = useState<Bond[]>(initialBonds);
  const findBondById = (id: string) => bonds.find((bond) => bond.id === id);
  return (
    <BondContext.Provider value={{ bonds, findBondById }}>
      {children}
    </BondContext.Provider>
  );
}
