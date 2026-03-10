import { useContext } from "react";
import { BondContext } from "../context/BondContext";
import BondCard from "../components/BondCard";
export default function Dashboard() {
  const bonds = useContext(BondContext);
  return (
    <>
      <h1>Bond Portfolio</h1>
      <div>
        {bonds.length
          ? `${bonds.length} bonds in portfolio`
          : "No bonds in portfolio"}
      </div>
      <div>
        {bonds.map((bond) => (
          <BondCard key={bond.id} bond={bond} />
        ))}
      </div>
    </>
  );
}
