import "./App.css";
import AppShell from "./components/layout/AppShell";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { BondProvider } from "./context/BondContext";

function App() {
  return (
    <BondProvider>
      <Router>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </BondProvider>
  );
}

export default App;
