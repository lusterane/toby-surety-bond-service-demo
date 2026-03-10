import { Link } from "react-router-dom";
import type { Bond } from "../types";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function BondCard({ bond }: { bond: Bond }) {
  return (
    <Link to={`/bonds/${bond.id}`}>
      <div className="bond-card">
        <h2>{bond.id}</h2>
        <p>{"Principal: " + bond.principal.name}</p>
        <p>{"Obligee: " + bond.obligee.name}</p>
        <p>{"Status: " + bond.status}</p>
        <p>{"Bond Amount: " + currency.format(bond.bondAmount)}</p>
      </div>
    </Link>
  );
}
