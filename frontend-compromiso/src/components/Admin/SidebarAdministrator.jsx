import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserShield, faProjectDiagram, faBuilding, faLayerGroup, faFileAlt, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import '../styles/stylesSidebar.css';

const SidebarAdministrator = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isUserActive, setIsUserActive] = useState(true);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div className="sidebar">
      <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
        {/* Título principal */}
        <div className="sidebar-title">
          <h1>MÓDULOS</h1>
        </div>

        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/CrudUsers' ? 'active' : ''}`}
              to="/CrudUsers"
            >
              <FontAwesomeIcon icon={faUsers} className="icon" />
              USUARIOS
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/Responsables' ? 'active' : ''}`}
              to="/Responsables"
            >
              <FontAwesomeIcon icon={faUserShield} className="icon" />
              RESPONSABLES
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/Areas' ? 'active' : ''}`}
              to="/Areas"
            >
              <FontAwesomeIcon icon={faBuilding} className="icon" />
              AREAS
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/Unidades' ? 'active' : ''}`}
              to="/Unidades"
            >
              <FontAwesomeIcon icon={faLayerGroup} className="icon" />
              UNIDADES
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/Procesos' ? 'active' : ''}`}
              to="/Procesos"
            >
              <FontAwesomeIcon icon={faProjectDiagram} className="icon" />
              PROCESOS
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/Procedimientos' ? 'active' : ''}`}
              to="/Procedimientos"
            >
              <FontAwesomeIcon icon={faFileAlt} className="icon" />
              PROCEDIMIENTOS
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/Formatos' ? 'active' : ''}`}
              to="/Formatos"
            >
              <FontAwesomeIcon icon={faCogs} className="icon" />
              FORMATOS
            </Link>
          </li>
        </ul>

        <hr className="my-3" />

        <div className="settings-logout">
          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <Link
                className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/login-admin' ? 'active' : ''}`}
                to="/login-admin"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                Sign out
              </Link>
            </li>
          </ul>
        </div>

        <div className="user-section d-flex align-items-center justify-content-between p-3 mt-auto">
          <div className="user-info d-flex align-items-center">
            <FontAwesomeIcon icon={faUserShield} className="icon user-icon" />
            <span className="user-name ms-2">Usuario Nombre</span>
          </div>
          <div className={`status-indicator ${isUserActive ? 'active' : 'inactive'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdministrator;
