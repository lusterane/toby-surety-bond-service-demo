import { createContext, useState } from "react";
import type { Bond } from "../types";
import { initialBonds } from "../data/mockData";

type BondContextValue = {
  bonds: Bond[];
  findBondById: (id: string) => Bond | undefined;
  createBond: (bond: Bond) => void;
};

export const BondContext = createContext<BondContextValue | null>(null);

export function BondProvider({ children }: { children: React.ReactNode }) {
  const [bonds, setBonds] = useState<Bond[]>(initialBonds);
  const findBondById = (id: string) => bonds.find((bond) => bond.id === id);
  const createBond = (bond: Bond) => {
    setBonds([...bonds, bond]);
  };
  return (
    <BondContext.Provider value={{ bonds, findBondById, createBond }}>
      {children}
    </BondContext.Provider>
  );
}
