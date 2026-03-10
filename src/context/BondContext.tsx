import { createContext, useContext, useState } from "react";
import type { Bond } from "../types";
import { initialBonds } from "../data/mockData";

export const BondContext = createContext<Bond[]>([]);

export function BondProvider({ children }: { children: React.ReactNode }) {
  const [bonds, setBonds] = useState<Bond[]>(initialBonds);
  return <BondContext.Provider value={bonds}>{children}</BondContext.Provider>;
}
