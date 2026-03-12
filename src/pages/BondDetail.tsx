import { Link, useParams } from "react-router-dom";
import { BondContext } from "../context/BondContext";
import { useContext } from "react";
import StatusBadge from "../components/StatusBadge";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const currencyWhole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export default function BondDetail() {
  const { id } = useParams();
  const { findBondById } = useContext(BondContext)!;
  const bond = findBondById(id!);

  if (!bond) {
    return (
      <div>
        <Link to="/">← Back to Bond Portfolio</Link>
        <p>Bond not found.</p>
      </div>
    );
  }

  return (
    <div className="bond-detail">
      <Link to="/" className="bond-detail-back">
        ← Back to Bond Portfolio
      </Link>
      <h1 className="bond-detail-title">Bond {bond.id}</h1>

      <div className="bond-detail-cards">
        <div className="bond-card">
          <h2>Principal</h2>
          <p>
            <strong>Name</strong> {bond.principal.name}
          </p>
          <p>
            <strong>Address</strong> {bond.principal.address}
          </p>
          <p>
            <strong>Credit score</strong> {bond.principal.creditScore}
          </p>
          <p>
            <strong>Years in business</strong> {bond.principal.yearsInBusiness}
          </p>
        </div>

        <div className="bond-card">
          <h2>Obligee</h2>
          <p>
            <strong>Name</strong> {bond.obligee.name}
          </p>
          <p>
            <strong>Address</strong> {bond.obligee.address}
          </p>
        </div>

        <div className="bond-card">
          <h2>Bond details</h2>
          <p>
            <strong>Status</strong> <StatusBadge status={bond.status} />
          </p>
          {bond.bondType && (
            <p>
              <strong>Bond type</strong> {bond.bondType}
            </p>
          )}
          <p>
            <strong>Bond amount</strong> {currencyWhole.format(bond.bondAmount)}
          </p>
          <p>
            <strong>Premium</strong> {currency.format(bond.premium)}
          </p>
          <p>
            <strong>Effective date</strong>{" "}
            {bond.effectiveDate.toLocaleDateString()}
          </p>
          <p>
            <strong>Expiration date</strong>{" "}
            {bond.expirationDate.toLocaleDateString()}
          </p>
          {bond.status === "Information Requested" && bond.infoRequestMessage && (
            <div className="bond-card-info-request">
              <p>
                <strong>Information requested</strong> {bond.infoRequestMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
