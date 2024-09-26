import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import userIcon from "../Public/images/IconLogin/Correo.svg";
import lockIcon from "../Public/images/iconLogin/Password.svg";
import logo from "../Public/images/logos/logo.png"; // Asegúrate de que la ruta del logo sea correcta
import Alerta from "../components/Alert/Alerta.jsx";
import NavMenuPublic from "../components/Nav/NavMenuPublic.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importamos los iconos de ojo

// Estilos de color
const formStyles = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out",
};

const buttonStyles = {
  backgroundColor: "#1877f2",
  color: "#ffffff",
  borderRadius: "5px",
  padding: "10px 145px",
  border: "none",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const buttonHoverStyles = {
  backgroundColor: "#145dbf",
};

const linkStyles = {
  color: "#1877f2",
  transition: "color 0.3s",
};

const linkHoverStyles = {
  color: "#145dbf",
};

const headerStyles = {
  fontSize: "2rem", // Tamaño del texto aumentado
  fontFamily: "Cambria, serif",
  fontWeight: "bold",
  color: "#000000", // Color negro
  marginBottom: "1rem",
  textAlign: "center",
};

const titleStyles = {
  fontSize: "1.75rem", // Tamaño del texto aumentado
  fontFamily: "Cambria, serif",
  fontWeight: "bold",
  color: "#000000", // Color negro
  marginTop: "0.5rem",
  textAlign: "center",
};

// Estilos para los campos de entrada con efecto de enfoque
const inputStyles = {
  borderRadius: "5px",
  height: "46px",
  paddingLeft: "40px",
  border: "1px solid #ccc",
  transition: "all 0.2s ease-in-out",
};

const inputFocusStyles = {
  borderColor: "#0056b3",
  boxShadow: "0 0 9px rgba(24, 119, 242, 0.5)",
  outline: "none",
};

const LoginFormAdmin = () => {
  const [alerta, setAlerta] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado para controlar la visibilidad de la contraseña
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Muestra una alerta de saludo
    alert("¡Hola! Has iniciado sesión.");

    // Redirige al panel de administración
    navigate("/Administrator");
  };

  const { msg } = alerta;

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <NavMenuPublic /> {/* Coloca la barra de navegación aquí */}
      <div className="container mt-5">
        <div className="text-center mb-4">
          <div>
            <h1 style={headerStyles}>Inicia Sesión</h1>
            <span style={titleStyles}>INGRESA AL APLICATIVO COMPROMISO SENA</span>
          </div>
          <img src={logo} alt="Logo" style={{ width: "150px", marginTop: "1rem" }} />
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <form
              onSubmit={handleSubmit}
              className="card p-4 shadow"
              style={formStyles}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {msg && <Alerta alerta={alerta} />}
              <div className="form-group mb-3 position-relative">
                <input
                  id="email"
                  type="email"
                  placeholder="Aquí su Correo"
                  className="form-control ps-5"
                  style={{
                    ...inputStyles,
                    ...(document.activeElement.id === "email" && inputFocusStyles),
                  }}
                />
                <img
                  src={userIcon}
                  alt="Usuario"
                  className="position-absolute"
                  style={{
                    width: "20px",
                    height: "20px",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              </div>
              <div className="form-group mb-3 position-relative">
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"} // Cambia el tipo de campo según el estado
                  placeholder="Aquí su Contraseña"
                  className="form-control ps-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
                  style={{
                    ...inputStyles,
                    ...(document.activeElement.id === "password" && inputFocusStyles),
                  }}
                />
                <img
                  src={lockIcon}
                  alt="Contraseña"
                  className="position-absolute"
                  style={{
                    width: "20px",
                    height: "20px",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
               {/* Ícono de ojo */}
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>

              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button
                  type="submit"
                  className="btn"
                  style={buttonStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor;
                  }}
                >
                  INGRESAR
                </button>
              </div>
              {/* Colocando el enlace aquí dentro del formulario */}
              <div className="text-center mt-3">
                <Link
                  to="/olvide-password"
                  className="d-block"
                  style={linkStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = linkHoverStyles.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = linkStyles.color;
                  }}
                >
                  Olvidé mi Contraseña
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginFormAdmin;