import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useToast } from "../../context/ToastContext";

export default function AppShell() {
  const { toast } = useToast();

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <Outlet />
      </main>
      {toast && <div className="toast toast--success">{toast}</div>}
    </div>
  );
}
