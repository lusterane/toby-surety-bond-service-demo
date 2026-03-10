import { useState } from "react";
import type { Principal, Obligee } from "../types";
export default function BondApplication() {
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

  function displayStep() {
    switch (step) {
      case 1:
        return <div>1. Principal Info</div>;
      case 2:
        return <div>2. Bond Requirements</div>;
      case 3:
        return <div>3. Review & Issue</div>;
    }
  }

  function displayStepForm() {
    switch (step) {
      case 1:
        return (
          <form>
            <div>
              <label>Company Name</label>
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
            <div>
              <label>Address</label>
              <input
                type="text"
                id="address"
                value={principal.address}
                onChange={(e) =>
                  setPrincipal({ ...principal, address: e.target.value })
                }
                placeholder="e.g. 123 Place St, Town, USA"
                name="address"
              />
            </div>
            <div>
              <label>Credit Score</label>
              <input
                type="number"
                id="creditScore"
                value={principal.creditScore}
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
            <div>
              <label>Years in Business</label>
              <input
                type="number"
                id="yearsInBusiness"
                min={0}
                max={100}
                value={principal.yearsInBusiness}
                onChange={(e) => {
                  const raw = e.target.value;
                  if (raw === "") {
                    setPrincipal({ ...principal, yearsInBusiness: 0 });
                  } else {
                    const n = Number(raw);
                    if (!Number.isNaN(n)) {
                      setPrincipal({ ...principal, yearsInBusiness: n });
                    }
                  }
                }}
                name="yearsInBusiness"
              />
            </div>
          </form>
        );
      case 2:
        return (
          <form>
            <div>
              <label>Bond Amount</label>
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
              <p
                style={{
                  marginTop: "0.25rem",
                  color: "var(--muted)",
                  fontSize: "0.9rem",
                }}
              >
                Bond amount: {formatDollars(boundAmount)}. Premium cost (
                {PREMIUM_RATE * 100}%): {formatDollars(premiumCost)}.
              </p>
            </div>
            <div>
              <label>Obligee Name</label>
              <input
                type="text"
                id="name"
                value={obligee.name}
                onChange={(e) =>
                  setObligee({ ...obligee, name: e.target.value })
                }
              />
            </div>
            <div>
              <label>Obligee Address</label>
              <input
                type="text"
                id="address"
                value={obligee.address}
                onChange={(e) =>
                  setObligee({ ...obligee, address: e.target.value })
                }
              />
            </div>
            <div>
              <label>Effective Date</label>
              <input
                type="date"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
              />
            </div>
          </form>
        );
      case 3:
        return (
          <form>
            <div>
              <label>Review</label>
              <input type="text" id="review" name="review" />
            </div>
          </form>
        );
    }
  }

  function handleIssueBond() {
    alert("Bond issued successfully");
  }

  function displayStepButtons() {
    switch (step) {
      case 1:
        return (
          <>
            <button
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
          </>
        );
      case 2:
        return (
          <>
            <button onClick={() => setStep((prev) => prev - 1)}>Back</button>{" "}
            <button
              disabled={!obligee.name || !obligee.address || !effectiveDate}
              onClick={() => setStep((prev) => prev + 1)}
            >
              Next
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button onClick={() => setStep((prev) => prev - 1)}>Back</button>{" "}
            <button onClick={handleIssueBond}>Issue Bond</button>
          </>
        );
    }
    return;
  }

  return (
    <>
      <div>
        <h1>Bond Application</h1>
        <div>{displayStep()}</div>
        <div>{displayStepForm()}</div>
        <div>{displayStepButtons()}</div>
      </div>
    </>
  );
}
