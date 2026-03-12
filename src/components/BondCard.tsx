import { Link } from "react-router-dom";
import type { Bond } from "../types";
import StatusBadge from "./StatusBadge";

const currencyWhole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export default function BondCard({ bond, linkPrefix = "/bonds" }: { bond: Bond; linkPrefix?: string }) {
  return (
    <Link to={`${linkPrefix}/${bond.id}`} className="bond-card-link">
      <article className="bond-card bond-card-dashboard">
        <div className="bond-card-title">
          <span>{bond.id}</span>
          <StatusBadge status={bond.status} />
        </div>
        <div className="bond-card-row">
          <div className="bond-card-col bond-card-col-left">
            <p><span className="bond-card-label">Principal</span> {bond.principal.name}</p>
            <p><span className="bond-card-label">Obligee</span> {bond.obligee.name}</p>
          </div>
          <div className="bond-card-col bond-card-col-right">
            <p><span className="bond-card-label">Bond amount</span> {currencyWhole.format(bond.bondAmount)}</p>
            {bond.bondType && <p><span className="bond-card-label">Bond type</span> {bond.bondType}</p>}
          </div>
        </div>
        {bond.status === "Information Requested" && bond.infoRequestMessage && (
          <div className="bond-card-info-request">
            <p><span className="bond-card-label">Information requested</span> {bond.infoRequestMessage}</p>
          </div>
        )}
      </article>
    </Link>
  );
}
