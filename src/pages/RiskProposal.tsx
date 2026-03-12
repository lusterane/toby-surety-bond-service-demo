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
  const { findBondById, updateBond } = useContext(BondContext)!;
  const bond = findBondById(id!);

  const { showToast } = useToast();
  const [premiumRateInput, setPremiumRateInput] = useState<string>("2.5");
  const [showDeclineSection, setShowDeclineSection] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [showRequestInfo, setShowRequestInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const premiumRate = parseFloat(premiumRateInput);
  const calculatedPremium = bond
    ? Math.round(bond.bondAmount * ((Number.isNaN(premiumRate) ? 0 : premiumRate) / 100))
    : 0;

  if (!bond || (bond.status !== "Underwriting" && bond.status !== "Information Requested")) {
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
    updateBond(bond.id, {
      premium: calculatedPremium,
      status: "Active",
    });
    showToast(`Bond ${bond.id} approved`);
    navigate("/underwriting");
  };

  const handleConfirmDecline = () => {
    updateBond(bond.id, {
      status: "Cancelled",
      declineReason,
    });
    showToast(`Bond ${bond.id} declined`);
    navigate("/underwriting");
  };

  const handleConfirmRequestInfo = () => {
    updateBond(bond.id, {
      status: "Information Requested",
      infoRequestMessage: infoMessage,
    });
    showToast(`Information requested for ${bond.id}`);
    navigate("/underwriting");
  };

  return (
    <div className="risk-proposal">
      <Link to="/underwriting" className="bond-detail-back">
        &larr; Back to Underwriting Queue
      </Link>
      <h1 className="bond-detail-title">Risk Proposal &mdash; {bond.id}</h1>

      {bond.infoRequestMessage && (
        <div className="risk-info-banner">
          <strong>Previous information request:</strong> {bond.infoRequestMessage}
        </div>
      )}

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
          {bond.bondType && (
            <p>
              <strong>Bond type</strong> {bond.bondType}
            </p>
          )}
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
              value={premiumRateInput}
              onChange={(e) => setPremiumRateInput(e.target.value)}
            />
          </div>
          <p style={{ marginTop: "0.75rem" }}>
            <strong>Premium amount</strong> {currency.format(calculatedPremium)}
          </p>
        </div>
      </div>

      {showDeclineSection && (
        <div className="risk-decline-section">
          <label htmlFor="decline-reason">
            Decline Reason <span style={{ color: "#dc2626" }}>*</span>
          </label>
          <textarea
            id="decline-reason"
            className="risk-notes-textarea"
            placeholder="Provide a reason for declining this bond..."
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            rows={3}
          />
          <div className="risk-proposal-actions">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setShowDeclineSection(false);
                setDeclineReason("");
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-decline"
              disabled={!declineReason.trim()}
              onClick={handleConfirmDecline}
            >
              Confirm Decline
            </button>
          </div>
        </div>
      )}

      {showRequestInfo && (
        <div className="risk-request-info-section">
          <label htmlFor="info-message">
            Information Request Message <span style={{ color: "#7c3aed" }}>*</span>
          </label>
          <textarea
            id="info-message"
            className="risk-notes-textarea"
            placeholder="Describe what additional information is needed..."
            value={infoMessage}
            onChange={(e) => setInfoMessage(e.target.value)}
            rows={3}
          />
          <div className="risk-proposal-actions">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setShowRequestInfo(false);
                setInfoMessage("");
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-request-info"
              disabled={!infoMessage.trim()}
              onClick={handleConfirmRequestInfo}
            >
              Confirm Request
            </button>
          </div>
        </div>
      )}

      {!showDeclineSection && !showRequestInfo && (
        <div className="risk-proposal-actions">
          <button
            className="btn btn-decline"
            onClick={() => setShowDeclineSection(true)}
          >
            Decline
          </button>
          <button
            className="btn btn-request-info"
            onClick={() => setShowRequestInfo(true)}
          >
            Request Info
          </button>
          <button className="btn btn-primary" onClick={handleApprove}>
            Approve
          </button>
        </div>
      )}
    </div>
  );
}
