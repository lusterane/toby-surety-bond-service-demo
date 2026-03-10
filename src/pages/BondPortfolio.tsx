import { useContext } from "react";
import { BondContext } from "../context/BondContext";
import BondCard from "../components/BondCard";
export default function BondPortfolio() {
  const { bonds } = useContext(BondContext)!;
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Bond Portfolio</h1>
        <p className="dashboard-subtitle">
          {bonds.length
            ? `${bonds.length} bond${bonds.length === 1 ? "" : "s"} in portfolio`
            : "No bonds in portfolio"}
        </p>
      </header>
      <div className="bond-list">
        {bonds.map((bond) => (
          <BondCard key={bond.id} bond={bond} />
        ))}
      </div>
    </div>
  );
}
