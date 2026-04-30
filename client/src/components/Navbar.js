import React from "react";
import { Link, useLocation } from "react-router-dom";

import "../css/Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar-top">
      <Link to="/" className="navbar-brand">
        
        Expense Tracker
      </Link>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>Home</Link>
        <Link to="/add" className={`nav-link ${location.pathname === "/add" ? "active" : ""}`}>Add Transaction</Link>
        <Link to="/history" className={`nav-link ${location.pathname === "/history" ? "active" : ""}`}>History</Link>
        
      
      </div>
    </nav>
  );
}

export default Navbar;
