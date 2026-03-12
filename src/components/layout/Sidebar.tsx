import { NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>Toby Surety Bonds</h1>
        <span>Bond Servicing Demo</span>
      </div>
      <nav>
        <div className="sidebar-nav-section">
          <span className="sidebar-nav-heading">Principal</span>
          <NavLink to="/" end>
            <span className="nav-icon">&#9632;</span>
            Bond Portfolio
          </NavLink>
          <NavLink to="/bonds/new">
            <span className="nav-icon">📄</span>
            New Bond
          </NavLink>
        </div>
        <div className="sidebar-nav-section">
          <span className="sidebar-nav-heading">Surety</span>
          <NavLink to="/underwriting">
            <span className="nav-icon">&#9878;</span>
            Underwriting
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}
