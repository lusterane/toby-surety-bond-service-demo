import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useMemo } from "react";
import { BondContext } from "../context/BondContext";
import { calculateRiskAssessment } from "../utils/riskScoring";

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

  const assessment = useMemo(
    () => (bond ? calculateRiskAssessment(bond) : null),
    [bond]
  );

  const suggestedPremium = assessment
    ? Math.round(bond!.bondAmount * assessment.suggestedPremiumRate)
    : 0;

  const [adjustedPremium, setAdjustedPremium] = useState<number | null>(null);
  const premiumValue = adjustedPremium ?? suggestedPremium;

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
    updateBondPremium(bond.id, premiumValue);
    updateBondStatus(bond.id, "Active");
    navigate("/underwriting");
  };

  const handleDecline = () => {
    updateBondStatus(bond.id, "Cancelled");
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
      </div>

      <div className="bond-detail-cards" style={{ marginTop: "1rem" }}>
        <div className="bond-card">
          <h2>Risk Assessment</h2>
          <div className="risk-score-display">
            <span className="risk-score-number">{assessment!.score}</span>
            <span
              className="risk-score-rating"
              data-rating={assessment!.rating.toLowerCase()}
            >
              {assessment!.rating} Risk
            </span>
          </div>
          <div className="risk-breakdown">
            <p>
              <strong>Credit score</strong>{" "}
              {assessment!.breakdown.creditScoreComponent} / 60
            </p>
            <p>
              <strong>Years in business</strong>{" "}
              {assessment!.breakdown.yearsInBusinessComponent} / 25
            </p>
            <p>
              <strong>Bond amount</strong>{" "}
              {assessment!.breakdown.bondAmountComponent} / 15
            </p>
          </div>
        </div>

        <div className="bond-card risk-premium-card">
          <h2>Premium</h2>
          <p>
            <strong>Suggested rate</strong>{" "}
            {(assessment!.suggestedPremiumRate * 100).toFixed(2)}%
          </p>
          <p>
            <strong>Suggested amount</strong> {currency.format(suggestedPremium)}
          </p>
          <div className="risk-premium-input-group">
            <label htmlFor="adjusted-premium">Adjusted premium ($)</label>
            <input
              id="adjusted-premium"
              type="number"
              min={0}
              value={premiumValue}
              onChange={(e) => setAdjustedPremium(Number(e.target.value))}
            />
          </div>
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
