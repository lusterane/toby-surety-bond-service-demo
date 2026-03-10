import { useContext } from "react";
import { BondContext } from "../context/BondContext";
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
    </>
  );
}
