import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { BondContext } from "../context/BondContext";
import { useToast } from "../context/ToastContext";

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

export default function RiskProposal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { findBondById, updateBondStatus, updateBondPremium } =
    useContext(BondContext)!;
  const bond = findBondById(id!);

  const { showToast } = useToast();
  const [premiumRate, setPremiumRate] = useState<number>(2.5);

  const calculatedPremium = bond
    ? Math.round(bond.bondAmount * (premiumRate / 100))
    : 0;

  if (!bond || bond.status !== "Underwriting") {
    return (
      <div className="risk-proposal">
        <Link to="/underwriting" className="bond-detail-back">
          &larr; Back to Underwriting Queue
        </Link>
        <p>Bond not found or not in underwriting status.</p>
      </div>
    );
  }

  const handleApprove = () => {
    updateBondPremium(bond.id, calculatedPremium);
    updateBondStatus(bond.id, "Active");
    showToast(`Bond ${bond.id} approved`);
    navigate("/underwriting");
  };

  const handleDecline = () => {
    updateBondStatus(bond.id, "Cancelled");
    showToast(`Bond ${bond.id} declined`);
    navigate("/underwriting");
  };

  return (
    <div className="risk-proposal">
      <Link to="/underwriting" className="bond-detail-back">
        &larr; Back to Underwriting Queue
      </Link>
      <h1 className="bond-detail-title">Risk Proposal &mdash; {bond.id}</h1>

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
          <h2>Bond Details</h2>
          <p>
            <strong>Bond amount</strong> {currencyWhole.format(bond.bondAmount)}
          </p>
          <p>
            <strong>Effective date</strong>{" "}
            {bond.effectiveDate.toLocaleDateString()}
          </p>
          <p>
            <strong>Expiration date</strong>{" "}
            {bond.expirationDate.toLocaleDateString()}
          </p>
        </div>

        <div className="bond-card risk-premium-card">
          <h2>Premium</h2>
          <div className="risk-premium-input-group">
            <label htmlFor="premium-rate">Premium rate (%)</label>
            <input
              id="premium-rate"
              type="number"
              min={0}
              step={0.1}
              value={premiumRate}
              onChange={(e) => setPremiumRate(Number(e.target.value))}
            />
          </div>
          <p style={{ marginTop: "0.75rem" }}>
            <strong>Premium amount</strong> {currency.format(calculatedPremium)}
          </p>
        </div>
      </div>

      <div className="risk-proposal-actions">
        <button className="btn btn-decline" onClick={handleDecline}>
          Decline
        </button>
        <button className="btn btn-primary" onClick={handleApprove}>
          Approve
        </button>
      </div>
    </div>
  );
}
