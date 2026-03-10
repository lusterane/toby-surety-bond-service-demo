import { NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>Toby Surety Bonds</h1>
        <span>Bond Servicing Demo</span>
      </div>
      <nav>
        <NavLink to="/" end>
          <span className="nav-icon">&#9632;</span>
          Dashboard
        </NavLink>
        <NavLink to="/bonds/new">
          <span className="nav-icon">+</span>
          New Bond
        </NavLink>
      </nav>
    </aside>
  );
}
