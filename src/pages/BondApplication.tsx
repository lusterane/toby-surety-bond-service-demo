import { useState } from "react";
export default function BondApplication() {
  const [step, setStep] = useState(1);
  const [principal, setPrincipal] = useState<{
    companyName: string;
    address: string;
    creditScore: number | "";
    yearsInBusiness: number | "";
  }>({
    companyName: "",
    address: "",
    creditScore: 700,
    yearsInBusiness: 5,
  });
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
              <label htmlFor="name">Company Name</label>
              <input
                type="text"
                id="companyName"
                value={principal.companyName}
                onChange={(e) =>
                  setPrincipal({ ...principal, companyName: e.target.value })
                }
                placeholder="e.g. Construction LLC"
                name="name"
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
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
              <label htmlFor="creditScore">Credit Score</label>
              <input
                type="number"
                id="creditScore"
                value={principal.creditScore}
                min={300}
                max={850}
                onChange={(e) => {
                  const raw = e.target.value;
                  if (raw === "") {
                    setPrincipal({ ...principal, creditScore: "" });
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
              <label htmlFor="yearsInBusiness">Years in Business</label>
              <input
                type="number"
                id="yearsInBusiness"
                min={0}
                max={100}
                value={principal.yearsInBusiness}
                onChange={(e) => {
                  const raw = e.target.value;
                  if (raw === "") {
                    setPrincipal({ ...principal, yearsInBusiness: "" });
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
              <label htmlFor="bondAmount">Bond Amount</label>
              <input type="number" id="bondAmount" name="bondAmount" />
            </div>
          </form>
        );
      case 3:
        return (
          <form>
            <div>
              <label htmlFor="review">Review</label>
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
            <button onClick={() => setStep((prev) => prev + 1)}>Next</button>
          </>
        );
      case 2:
        return (
          <>
            <button onClick={() => setStep((prev) => prev - 1)}>Back</button>{" "}
            <button onClick={() => setStep((prev) => prev + 1)}>Next</button>
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
