import "./App.css";
import AppShell from "./components/layout/AppShell";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BondPortfolio from "./pages/BondPortfolio";
import { BondProvider } from "./context/BondContext";
import BondDetail from "./pages/BondDetail";
import BondApplication from "./pages/BondApplication";
import UnderwriterDashboard from "./pages/UnderwriterDashboard";
import RiskProposal from "./pages/RiskProposal";

function App() {
  return (
    <BondProvider>
      <Router>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<BondPortfolio />} />
            <Route path="/bonds/:id" element={<BondDetail />} />
            <Route path="/bonds/new" element={<BondApplication />} />
            <Route path="/underwriting" element={<UnderwriterDashboard />} />
            <Route path="/underwriting/:id" element={<RiskProposal />} />
          </Route>
        </Routes>
      </Router>
    </BondProvider>
  );
}

export default App;
