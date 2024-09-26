import React from "react";
import SidebarAdministrator from "./SidebarAdministrator.jsx";
// import NavBarAdministrator from "./NavBarAdmin.jsx"
import logo from "../Public/images/logos/logo.png"; // Ruta del logo

const Init_Admin = () => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Ajusta según tus necesidades
        padding: '20px',
        backgroundColor: '#f4f4f4', // Color de fondo neutro
        marginLeft: '200px', // Mueve todo el contenido más hacia la derecha
    };

    const largeContainerStyle = {
        backgroundColor: '#ffffff', // Fondo blanco para el recuadro grande
        borderRadius: '15px', // Esquinas redondeadas
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)', // Sombra para el recuadro grande
        padding: '40px',
        maxWidth: '900px',
        marginBottom: '30px',
        textAlign: 'center',
    };

    const logoStyle = {
        width: '180px', // Tamaño del logo
        marginBottom: '20px',
        borderRadius: '10px', // Esquinas redondeadas
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Sombra para el logo
    };

    const headingStyle = {
        fontSize: '2.5rem', // Tamaño de la fuente
        color: '#333', // Color del texto
        fontFamily: 'Arial, sans-serif', // Tipografía
        margin: '10px 0',
        fontWeight: 'bold',
    };

    const subheadingStyle = {
        fontSize: '1.2rem', // Tamaño de la fuente del subtítulo
        color: '#555', // Color del subtítulo
        fontFamily: 'Arial, sans-serif', // Tipografía
        marginTop: '10px',
        marginBottom: '20px',
    };

    const introductionStyle = {
        fontSize: '1rem', // Tamaño de la fuente de la introducción
        color: '#666', // Color de la introducción
        fontFamily: 'Arial, sans-serif', // Tipografía
        marginBottom: '20px',
        lineHeight: '1.5', // Espacio entre líneas para mejor legibilidad
    };

    return(
        <>  
            <div style={containerStyle}>
                {/* <NavBarAdministrator/> */}
                <SidebarAdministrator />
                <div style={largeContainerStyle}>
                    <img src={logo} alt="Logo del Proyecto" style={logoStyle} />
                    <h1 style={headingStyle}>Bienvenido al Panel de Administración de CALGDOCS</h1>
                    <p style={introductionStyle}>Este panel te permite gestionar de manera eficiente los diferentes módulos del sistema, incluyendo Usuarios, Responsables, Áreas, Unidades, Procedimientos y Procesos. Desde aquí, podrás registrar, consultar, actualizar y eliminar datos asociados a cada uno de estos módulos.

Interactúa con cada módulo de manera sencilla a través del menú de navegación, lo que te permitirá mantener un control centralizado y actualizado de toda la información relevante para el funcionamiento.</p>
                    <p style={subheadingStyle}>Aquí podrás gestionar todas las configuraciones y datos importantes.</p>
                </div>
            </div>
        </>
    );
};

export default Init_Admin;
