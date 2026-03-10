import "./App.css";
import AppShell from "./components/layout/AppShell";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { BondProvider } from "./context/BondContext";
import BondDetail from "./pages/BondDetail";
import BondApplication from "./pages/BondApplication";

function App() {
  return (
    <BondProvider>
      <Router>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bonds/:id" element={<BondDetail />} />
            <Route path="/bonds/new" element={<BondApplication />} />
          </Route>
        </Routes>
      </Router>
    </BondProvider>
  );
}

export default App;
