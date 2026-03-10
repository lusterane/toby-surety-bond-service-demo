import { createContext } from "react";
import type { Bond } from "../types";

export const BondContext = createContext<Bond[]>([]);
