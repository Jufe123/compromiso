import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavMenuPublic from '../NavMenuPublic.jsx';
import reseñaImage from '../../../Public/images/logos/logoSE.png';

const NavMenuReseña = () => {
    const [hoverDirection, setHoverDirection] = useState(null);

    const handleMouseEnter = (direction) => {
        setHoverDirection(direction);
    };

    const handleMouseLeave = () => {
        setHoverDirection(null);
    };

    const styles = {
        container: {
           //marginTop: '3rem',
            padding: '3rem',
           // backgroundColor: '#f3f4f6',
           borderRadius: '20px',
            //boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
            fontFamily: 'Georgia, serif',
            maxWidth: '1200px',
            margin: '0 auto',
            //position: 'relative',
        },
        logo: {
            width: '150px',
            height: 'auto',
            margin: '0 auto',
            display: 'block',
            marginBottom: '2rem',
        },
        title: {
            fontSize: '3rem',
            color: '#161514',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
        },
        section: {
            marginBottom: '4rem',
            padding: '2rem',
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '2rem',
        },
        paragraph: {
            fontSize: '1.1rem',
            lineHeight: '1.1',
            color: '#7f8c8d',
            textAlign: 'justify',
            maxWidth: '100%',
            margin: '0 auto',
        },
        image: {
            width: '100%',
            maxWidth: '400px',
            height: 'auto',
            transition: 'transform 0.6s ease, box-shadow 0.6s ease',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            borderRadius: '15px',
        },
        imageHoveredLeft: {
            transform: 'rotateY(20deg) rotateX(10deg) scale(1.2)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        },
        imageHoveredRight: {
            transform: 'rotateY(-20deg) rotateX(-10deg) scale(1.2)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        },
        contentWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        },
    };

    return (
        <>
            <NavMenuPublic />
            <div className="container my-5" style={styles.container}>
                <img src={reseñaImage} alt="Logo" style={styles.logo} />
                <h1 style={styles.title}>Reseña Histórica</h1>

                <div style={styles.section}>
                    <div style={styles.contentWrapper}>
                        <p style={styles.paragraph}>
                            El modelo de formación mediante la estrategia de Sena Empresa, nace en el año 2005 en el Centro de Formación La Granja en el Espinal - Tolima...
                        </p>
                        <p style={styles.paragraph}>
                            Un año después el Centro Agroindustrial del Meta, conformó unos grupos de trabajo para visitar y conocer este modelo en los Centros Agropecuario "La Granja" en el Tolima, La Angostura y Yamboró en el Huila.
                            <br /><br />
                            Con estas experiencias se debatió y se diseñó una propuesta de modelo de Sena Empresa con base en la logística y especialidades que tenía el centro, por ello se formaron las Sena empresas de: Agrícola, Pecuaria, Agroindustria, Gestión y de Mecanización.
                            <br /><br />
                            La Sena empresa Agrícola, desarrolla diferentes proyectos para hacer las practicas requeridas de las especialidades de Producción Agrícola, Administración de Empresas Agropecuarias y otras especialidades que tienen competencias en estas áreas. Las unidades que actualmente maneja el proceso Sena Empresa son: Anón, Bioinsumos, Cacao, Guadua, Guanábana, Guayaba, Hortalizas, Laboratorio de Biotecnología, Pasifloras, Piña, Postcosecha, Vivero y Yuca.
                            <br /><br />
                            La Sena empresa Pecuaria, desarrolla diferentes proyectos para hacer las practicas requeridas de las especialidades de Producción Pecuaria, Administración de Empresas Agropecuarias y otras especialidades que tienen competencias en estas áreas. Las unidades que actualmente maneja el proceso Sena Empresa son: Apicultura, Avicultura, Especies Menores, Ganadería, Laboratorio de Reproducción Animal, Ovinos, Piscicultura y Porcinos.
                            <br /><br />
                            La Sena empresa Agroindustria, desarrolla diferentes proyectos para hacer las practicas requeridas de las especialidades de Producción Agroindustria, Control y Calidad y otras especialidades que tienen competencias en estas áreas. Las unidades que actualmente maneja el proceso Sena Empresa son las plantas de: Aguas, Almacén, Cárnicos, Control y Calidad, Frutas, Lácteos y Panificación.
                            <br /><br />
                            La Sena empresa Gestión, desarrolla diferentes proyectos para hacer las practicas requeridas de las especialidades de Administración de Empresas Agropecuarias. Las Divisiones que actualmente maneja el proceso Sena Empresa son: Gerente Administrativo y Líder del Sistema de Gestión de la Calidad, Gerente Técnico y Líderes de Producción (Agrícola, Pecuaria, Agroindustria, Mecanización), Líder de Talento Humano y sus Gestores de Talento Humano (Agrícola, Pecuaria, Agroindustria, Mecanización), Líder de Contabilidad y Finanzas, Líder de Mercadeo y De Ventas.
                            <br /><br />
                            La Sena empresa Mecanización, desarrolla diferentes proyectos para hacer las practicas requeridas de las especialidades de Mecanización Agrícola. Las unidades que actualmente maneja el proceso Sena Empresa son: Cultivo y Transporte.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavMenuReseña;
