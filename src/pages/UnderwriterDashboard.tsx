import { useContext } from "react";
import { BondContext } from "../context/BondContext";
import BondCard from "../components/BondCard";

export default function UnderwriterDashboard() {
  const { bonds } = useContext(BondContext)!;
  const pending = bonds.filter((b) => b.status === "Underwriting");

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Underwriting Queue</h1>
        <p className="dashboard-subtitle">
          {pending.length
            ? `${pending.length} application${pending.length === 1 ? "" : "s"} pending review`
            : "No applications pending review"}
        </p>
      </header>
      <div className="bond-list">
        {pending.map((bond) => (
          <BondCard key={bond.id} bond={bond} linkPrefix="/underwriting" />
        ))}
      </div>
    </div>
  );
}
