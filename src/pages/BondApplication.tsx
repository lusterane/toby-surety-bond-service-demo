import { useContext, useState } from "react";
import type { Principal, Obligee, Bond, BondType } from "../types";
import { generateBondNumber } from "../data/mockData";
import { BondContext } from "../context/BondContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
export default function BondApplication() {
  const { createBond } = useContext(BondContext)!;
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [principal, setPrincipal] = useState<Principal>({
    name: "",
    address: "",
    creditScore: 700,
    yearsInBusiness: 5,
  });
  const [obligee, setObligee] = useState<Obligee>({
    name: "",
    address: "",
  });
  const [bondType, setBondType] = useState<BondType>("Performance");
  const [boundAmount, setBoundAmount] = useState<number>(100000);
  const [effectiveDate, setEffectiveDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const PREMIUM_RATE = 0.025; // 2.5%
  const premiumCost = boundAmount * PREMIUM_RATE;
  const formatDollars = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(n);

  const stepLabels = ["Principal Info", "Bond Requirements", "Review"];

  function displayStepIndicator() {
    return (
      <div className="bond-application-steps">
        {stepLabels.map((label, i) => (
          <span
            key={label}
            className={`bond-application-step ${step === i + 1 ? "active" : ""}`}
          >
            {i + 1}. {label}
          </span>
        ))}
      </div>
    );
  }

  function displayStepForm() {
    switch (step) {
      case 1:
        return (
          <div className="bond-application-form-card">
            <h2 className="bond-application-form-card-title">Principal Info</h2>
            <form className="bond-application-form">
              <div className="bond-application-form-row">
                <div className="bond-application-form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    value={principal.name}
                    onChange={(e) =>
                      setPrincipal({ ...principal, name: e.target.value })
                    }
                    placeholder="e.g. Construction LLC"
                    name="name"
                  />
                </div>
                <div className="bond-application-form-group">
                  <label htmlFor="principalAddress">Address</label>
                  <input
                    type="text"
                    id="principalAddress"
                    value={principal.address}
                    onChange={(e) =>
                      setPrincipal({ ...principal, address: e.target.value })
                    }
                    placeholder="e.g. 123 Place St, Town, USA"
                    name="address"
                  />
                </div>
              </div>
              <div className="bond-application-form-row">
                <div className="bond-application-form-group">
                  <label htmlFor="creditScore">Credit Score</label>
                  <input
                    type="number"
                    id="creditScore"
                    value={
                      principal.creditScore === 0 ? "" : principal.creditScore
                    }
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === "") {
                        setPrincipal({ ...principal, creditScore: 0 });
                      } else {
                        const n = Number(raw);
                        if (!Number.isNaN(n)) {
                          setPrincipal({ ...principal, creditScore: n });
                        }
                      }
                    }}
                    name="creditScore"
                  />
                </div>
                <div className="bond-application-form-group">
                  <label htmlFor="yearsInBusiness">Years in Business</label>
                  <input
                    type="number"
                    id="yearsInBusiness"
                    min={0}
                    max={100}
                    value={
                      principal.yearsInBusiness === 0
                        ? ""
                        : principal.yearsInBusiness
                    }
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === "") {
                        setPrincipal({ ...principal, yearsInBusiness: 0 });
                      } else {
                        const n = Number(raw);
                        if (!Number.isNaN(n)) {
                          setPrincipal({
                            ...principal,
                            yearsInBusiness: n,
                          });
                        }
                      }
                    }}
                    name="yearsInBusiness"
                  />
                </div>
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="bond-application-form-card">
            <form className="bond-application-form">
              <div className="bond-application-form-section">
                <div className="bond-application-form-row">
                  <div className="bond-application-form-group bond-application-form-group--full">
                    <label htmlFor="bondType">Bond Type</label>
                    <select
                      id="bondType"
                      value={bondType}
                      onChange={(e) => setBondType(e.target.value as BondType)}
                    >
                      <option value="Bid">Bid</option>
                      <option value="Performance">Performance</option>
                      <option value="Payment">Payment</option>
                      <option value="License & Permit">License &amp; Permit</option>
                      <option value="Court">Court</option>
                    </select>
                  </div>
                </div>
                <div className="bond-application-form-row">
                  <div className="bond-application-form-group bond-application-form-group--full">
                    <label htmlFor="bondAmount">Bond Amount</label>
                    <div className="bond-application-form-currency">
                      <input
                        type="number"
                        id="bondAmount"
                        name="bondAmount"
                        min={0}
                        value={boundAmount === 0 ? "" : boundAmount}
                        onChange={(e) => {
                          const raw = e.target.value;
                          if (raw === "") {
                            setBoundAmount(0);
                          } else {
                            const n = Number(raw);
                            if (!Number.isNaN(n) && n >= 0) setBoundAmount(n);
                          }
                        }}
                      />
                      <span className="bond-application-form-currency-display">
                        {formatDollars(boundAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="bond-application-form-divider" />
              <div className="bond-application-form-section">
                <div className="bond-application-form-row">
                  <div className="bond-application-form-group">
                    <label htmlFor="obligeeName">Obligee Name</label>
                    <input
                      type="text"
                      id="obligeeName"
                      placeholder="e.g. Cool Company Inc"
                      value={obligee.name}
                      onChange={(e) =>
                        setObligee({ ...obligee, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="bond-application-form-group">
                    <label htmlFor="obligeeAddress">Obligee Address</label>
                    <input
                      type="text"
                      id="obligeeAddress"
                      placeholder="e.g. 456 Place St, Town, USA"
                      value={obligee.address}
                      onChange={(e) =>
                        setObligee({ ...obligee, address: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <hr className="bond-application-form-divider" />
              <div className="bond-application-form-section">
                <div className="bond-application-form-row">
                  <div className="bond-application-form-group bond-application-form-group--full">
                    <label htmlFor="effectiveDate">Effective Date</label>
                    <input
                      type="date"
                      id="effectiveDate"
                      value={effectiveDate}
                      onChange={(e) => setEffectiveDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="bond-application-premium-banner">
                Estimated Premium: {formatDollars(premiumCost)} (
                {(PREMIUM_RATE * 100).toFixed(1)}% of{" "}
                {formatDollars(boundAmount)})
              </div>
            </form>
          </div>
        );
      case 3:
        return (
          <>
            <div className="bond-detail-cards">
              <div className="bond-card">
                <h2>Principal</h2>
                <p>
                  <strong>Name</strong> {principal.name}
                </p>
                <p>
                  <strong>Address</strong> {principal.address}
                </p>
                <p>
                  <strong>Credit score</strong> {principal.creditScore}
                </p>
                <p>
                  <strong>Years in business</strong> {principal.yearsInBusiness}
                </p>
              </div>

              <div className="bond-card">
                <h2>Obligee</h2>
                <p>
                  <strong>Name</strong> {obligee.name}
                </p>
                <p>
                  <strong>Address</strong> {obligee.address}
                </p>
              </div>

              <div className="bond-card">
                <h2>Bond details</h2>
                <p>
                  <strong>Bond type</strong> {bondType}
                </p>
                <p>
                  <strong>Bond amount</strong> {formatDollars(boundAmount)}
                </p>
                <p>
                  <strong>Effective date</strong>{" "}
                  {effectiveDate
                    ? new Date(effectiveDate).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            </div>
            <div className="bond-application-premium-banner bond-application-premium-banner--review">
              <span className="bond-application-premium-banner__label">
                Annual Premium (Estimated)
              </span>
              <span className="bond-application-premium-banner__amount">
                {formatDollars(premiumCost)}
              </span>
            </div>
          </>
        );
    }
  }

  function handleIssueBond() {
    const bond: Bond = {
      id: generateBondNumber(),
      bondAmount: boundAmount,
      premium: premiumCost,
      effectiveDate: new Date(effectiveDate),
      expirationDate: new Date(
        new Date(effectiveDate).setFullYear(
          new Date(effectiveDate).getFullYear() + 1,
        ),
      ),
      principal: principal,
      obligee: obligee,
      status: "Underwriting",
      bondType: bondType,
    };
    createBond(bond);
    showToast("Bond submitted to underwriting queue successfully.");
    navigate(`/`);
  }

  function displayStepButtons() {
    switch (step) {
      case 1:
        return (
          <div className="bond-application-actions">
            <button
              type="button"
              className="btn btn-primary"
              disabled={
                !principal.name ||
                !principal.address ||
                !principal.creditScore ||
                !principal.yearsInBusiness
              }
              onClick={() => setStep((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className="bond-application-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setStep((prev) => prev - 1)}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!obligee.name || !obligee.address || !effectiveDate}
              onClick={() => setStep((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        );
      case 3:
        return (
          <div className="bond-application-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setStep((prev) => prev - 1)}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleIssueBond}
            >
              Submit to Underwriting
            </button>
          </div>
        );
    }
    return null;
  }

  return (
    <>
      <div className="bond-application">
        <header className="bond-application-header">
          <h1 className="bond-application-title">Bond Application</h1>
          <p className="bond-application-subtitle">
            Step {step}: {stepLabels[step - 1]}
          </p>
        </header>
        {displayStepIndicator()}
        {displayStepForm()}
        {displayStepButtons()}
      </div>
    </>
  );
}
