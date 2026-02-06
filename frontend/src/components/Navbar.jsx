import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "./elements/Icon";
import Button from "./elements/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location?.pathname === path;
  return (
    <header className="header-container">
      <div className="header-content max-w-7xl mx-auto">
        <div
          className="header-logo cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="header-logo-icon">
            <Icon name="Users" size={24} color="var(--color-primary)" />
          </div>
          <span className="header-logo-text">GigErn</span>
        </div>
        <nav className="header-nav">
          <button
            onClick={() => navigate("/")}
            className={`header-nav-link ${isActive("/") ? "header-nav-link-active" : ""}`}
          >
            Home
          </button>
          <button
            onClick={() => navigate("/register")}
            className={`header-nav-link ${isActive("/register") ? "header-nav-link-active" : ""}`}
          >
            Register
          </button>
          <Button
            variant="default"
            size="default"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
