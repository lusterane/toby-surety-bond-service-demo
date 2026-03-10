import { Link } from "react-router-dom";
import type { Bond } from "../types";

const currencyWhole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export default function BondCard({ bond }: { bond: Bond }) {
  return (
    <Link to={`/bonds/${bond.id}`} className="bond-card-link">
      <article className="bond-card bond-card-dashboard">
        <h2 className="bond-card-title">{bond.id}</h2>
        <div className="bond-card-row">
          <div className="bond-card-col bond-card-col-left">
            <p><span className="bond-card-label">Principal</span> {bond.principal.name}</p>
            <p><span className="bond-card-label">Obligee</span> {bond.obligee.name}</p>
          </div>
          <div className="bond-card-col bond-card-col-right">
            <p><span className="bond-card-label">Status</span> {bond.status}</p>
            <p><span className="bond-card-label">Bond amount</span> {currencyWhole.format(bond.bondAmount)}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
