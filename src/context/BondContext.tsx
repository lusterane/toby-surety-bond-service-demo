import { createContext, useState } from "react";
import type { Bond, BondStatus } from "../types";
import { initialBonds } from "../data/mockData";

type BondContextValue = {
  bonds: Bond[];
  findBondById: (id: string) => Bond | undefined;
  createBond: (bond: Bond) => void;
  updateBondStatus: (id: string, status: BondStatus) => void;
  updateBondPremium: (id: string, premium: number) => void;
  updateBond: (id: string, updates: Partial<Bond>) => void;
};

export const BondContext = createContext<BondContextValue | null>(null);

export function BondProvider({ children }: { children: React.ReactNode }) {
  const [bonds, setBonds] = useState<Bond[]>(initialBonds);
  const findBondById = (id: string) => bonds.find((bond) => bond.id === id);
  const createBond = (bond: Bond) => {
    setBonds((prev) => [...prev, bond]);
  };
  const updateBondStatus = (id: string, status: BondStatus) => {
    setBonds((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };
  const updateBondPremium = (id: string, premium: number) => {
    setBonds((prev) =>
      prev.map((b) => (b.id === id ? { ...b, premium } : b))
    );
  };
  const updateBond = (id: string, updates: Partial<Bond>) => {
    setBonds((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };
  return (
    <BondContext.Provider
      value={{ bonds, findBondById, createBond, updateBondStatus, updateBondPremium, updateBond }}
    >
      {children}
    </BondContext.Provider>
  );
}
