import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alert/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import NavMenuPublic from "../components/Nav/NavMenuPublic.jsx";
import logo from "../Public/images/logos/logo.png"; 

// Estilos
const containerStyles = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  padding: "2rem",
  marginTop: "2rem", // Ajusta el margen superior para evitar que el contenido quede oculto detrás de la barra de navegación
  transition: "transform 0.3s ease-in-out",
};

const buttonStyles = {
  backgroundColor: "#1877f2",
  color: "#ffffff",
  borderRadius: "5px",
  padding: "10px 20px",
  border: "none",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "background-color 0.3s",
  width: "100%",
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

const OlvidePassword = () => {
  const [Cor_Usuario, setCor_Usuario] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Cor_Usuario === "" || Cor_Usuario.length < 7) {
      setAlerta({
        msg: "El Correo es obligatorio",
        error: true,
      });
      return;
    }
    try {
      const url = ` /api/user/olvide-password` ;
      const { data } = await clienteAxios.post(url, {
        Cor_Usuario,
      });
      setAlerta({
        msg: data.msg,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <NavMenuPublic />
      <div className="container" style={{ marginTop: "6rem" }}>
        <div className="text-center mb-4">
          <h1
            style={{
              color: "#000000", // Negro
              fontWeight: "bold", // Negrita
              fontFamily: "Cambria, serif", // Fuente Cambria
            }}
          >
            Recupera tu Contraseña
          </h1>
        </div>

        {/* Logo debajo del título */}
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 text-center">
            
              <img src={logo} alt="Logo" style={{ width: "150px", marginTop: "1rem" }} />
              
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            {msg && <Alerta alerta={alerta} />}
            <form
              onSubmit={handleSubmit}
              style={containerStyles}
              className="shadow p-4"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">
                  Ingrese su correo:
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Aquí su Correo"
                  value={Cor_Usuario}
                  onChange={(e) => setCor_Usuario(e.target.value)}
                  className="form-control"
                  style={{ borderRadius: "5px", height: "45px" }}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn"
                  style={buttonStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      buttonHoverStyles.backgroundColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      buttonStyles.backgroundColor;
                  }}
                >
                  Restablecer Contraseña
                </button>
              </div>

              <nav className="text-center mt-4">
                <Link
                  to="/login-admin"
                  className="d-block mb-3"
                  style={linkStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = linkHoverStyles.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = linkStyles.color;
                  }}
                >
                  ¿Tienes una Cuenta? Inicia Sesión
                </Link>
              </nav>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OlvidePassword;