import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useToast } from "../../context/ToastContext";

export default function AppShell() {
  const { toast } = useToast();

  return (
    <div className="app-shell">
      <div className="app-shell-body">
        <Sidebar />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
      <footer className="app-footer">
        <span>Made with</span> <span className="app-footer-heart">♥</span>
        {" · "}
        <a
          href="https://github.com/lusterane/toby-surety-bond-service-demo"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </footer>
      {toast && <div className="toast toast--success">{toast}</div>}
    </div>
  );
}
