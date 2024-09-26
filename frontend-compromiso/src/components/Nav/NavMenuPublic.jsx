import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from '../../Public/images/logos/logo.png';
import { FaUser, FaBook, FaHistory, FaEye, FaCog } from 'react-icons/fa';

const NavMenuPublic = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeLink, setActiveLink] = useState(location.pathname);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [rotatingIcon, setRotatingIcon] = useState(null);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleConsultaClick = () => {
    navigate("/modulo-consulta");
  };

  const handleLoginClick = () => {
    navigate("/login-admin");
  };

  const handleLinkClick = (to) => {
    setActiveLink(to);
    setRotatingIcon(to);

    setTimeout(() => {
      setRotatingIcon(null);
    }, 1000);
  };

  const navLinkStyle = (isActive, isHovered) => ({
    padding: "10px 15px",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: isActive ? "#00bcd4" : (isHovered ? "#00a1a6" : "#000"),
    borderRadius: "6px",
    transition: "background-color 0.3s, transform 0.3s",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "1rem",
    textTransform: "uppercase",
    position: "relative",
    fontWeight: isActive ? "bold" : "normal",
    transform: isActive ? "scale(1.1)" : "none",
  });

  const iconStyle = (isRotating) => ({
    fontSize: "1.2rem",
    transition: "transform 1s ease",
    transform: isRotating ? "rotate(360deg)" : "none",
  });

  const buttonStyle = (isActive) => ({
    backgroundColor: isActive ? "#00a1a6" : "#00bcd4",
    color: "#fff",
    padding: "10px 20px",
    margin: "0 10px",
    borderRadius: "6px",
    border: "none",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontWeight: "bold",
  });

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-between py-3 px-4 shadow-sm" style={{ backgroundColor: "#000", height: "80px", position: "fixed", top: 0, width: "100%" }}>
      <div className="d-flex align-items-center">
        <Link to="/" className="d-inline-flex align-items-center text-decoration-none">
          <img src={logo} alt="Logo" style={{ width: "60px", height: "50px" }} className="d-inline-block align-top" />
        </Link>
      </div>

      <ul className="nav col-md-auto mb-2 justify-content-center mb-md-0" style={{ display: "flex", justifyContent: "center", listStyle: "none", padding: 0, margin: 0 }}>
        {[
          { to: "/contacts", icon: <FaUser />, label: "Contacts" },
          { to: "/manuals", icon: <FaBook />, label: "Manuals" },
          { to: "/reseña-historica", icon: <FaHistory />, label: "Reseña Historica" },
          { to: "/mision-vision", icon: <FaCog />, label: "Mision y Vision" },
        ].map(({ to, icon, label }) => (
          <li key={to}>
            <Link
              to={to}
              className="nav-link"
              style={navLinkStyle(activeLink === to, hoveredLink === to)}
              onClick={() => handleLinkClick(to)}
              onMouseEnter={() => setHoveredLink(to)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {React.cloneElement(icon, { style: iconStyle(rotatingIcon === to) })} {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="text-end" style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          style={buttonStyle(activeLink === "/login-admin")}
          onClick={handleLoginClick}
        >
          <FaCog /> Módulo del Administrador
        </button>
        <button
          type="button"
          className="btn"
          style={buttonStyle(activeLink === "/modulo-consulta")}
          onClick={handleConsultaClick}
        >
          <FaEye /> Consulta
        </button>
      </div>
    </header>
  );
};

export default NavMenuPublic;
