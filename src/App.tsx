import "./App.css";
import AppShell from "./components/layout/AppShell";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { BondContext } from "./context/BondContext";
import { initialBonds } from "./data/mockData";

function App() {
  return (
    <>
      <BondContext.Provider value={initialBonds}>
        <Router>
          <Routes>
            <Route element={<AppShell />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </BondContext.Provider>
    </>
  );
}

export default App;
