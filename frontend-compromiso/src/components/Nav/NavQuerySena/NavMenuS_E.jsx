import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavMenuPublic from '../NavMenuPublic.jsx';

const NavMenuSE = () => {
    const imageBasePath = '/src/Public/images/imagenM-V/';
    const images = [
        `${imageBasePath}ImagenM-VSE.jpg`,
        `${imageBasePath}ImagenM-VSE2.jpg`,
        `${imageBasePath}ImagenM-VSE3.jpg`
    ];

    const [hoveredImage, setHoveredImage] = useState(null);

    const handleMouseEnter = (index, direction) => {
        setHoveredImage({ index, direction });
    };

    const handleMouseLeave = () => {
        setHoveredImage(null);
    };

    const styles = {
        container: {
             marginTop: '3rem',
             padding: '4rem',
             //backgroundColor: '#f3f4f6',
             //borderRadius: '20px',
             //boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
              fontFamily: 'Georgia, serif',
              maxWidth: '1200px',
              margin: '0 auto',
              //position: 'relative',
        },
        title: {
            fontSize: '2.8rem',
            color: '#2c3e50',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2.5rem',
            animation: 'fadeInDown 1s ease-in-out',
            textTransform: 'uppercase',
            letterSpacing: '3px',
        },
        missionSection: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '3rem',
            padding: '1rem',
            backgroundColor: 'transparent', // Fondo transparente
        },
        visionSection: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: 'transparent', // Fondo transparente
        },
        heading: {
            fontSize: '2.2rem',
            color: '#34495e',
            marginBottom: '1rem',
            animation: 'fadeInLeft 1s ease-in-out',
            textTransform: 'uppercase',
            letterSpacing: '2px',
        },
        paragraph: {
            fontSize: '1.2rem',
            lineHeight: '1.8',
            color: '#7f8c8d',
            animation: 'fadeInRight 1s ease-in-out',
            textAlign: 'justify',
            marginLeft: '1rem',
            marginRight: '1rem',
        },
        missionImage: {
            width: '300px',
            height: 'auto',
            marginRight: '1.5rem',
            transition: 'transform 0.6s ease, box-shadow 0.6s ease',
            cursor: 'pointer',
        },
        visionImage: {
            width: '300px',
            height: 'auto',
            marginLeft: '1.5rem',
            transition: 'transform 0.6s ease, box-shadow 0.6s ease',
            cursor: 'pointer',
        },
        imageHoveredLeft: {
            transform: 'rotateY(20deg) rotateX(10deg) scale(1.2)',
        },
        imageHoveredRight: {
            transform: 'rotateY(-20deg) rotateX(-10deg) scale(1.2)',
        }
    };

    return (
        <>
            <NavMenuPublic />
            <div className="container my-5" style={styles.container}>
                {/* Misión */}
                <div style={styles.missionSection}>
                    <img
                        src={images[0]}
                        alt="Misión"
                        style={{
                            ...styles.missionImage,
                            ...(hoveredImage?.index === 0 && hoveredImage?.direction === 'left' && styles.imageHoveredRight),
                            ...(hoveredImage?.index === 0 && hoveredImage?.direction === 'right' && styles.imageHoveredLeft),
                        }}
                        onMouseEnter={(e) => {
                            const direction = e.nativeEvent.offsetX < e.target.clientWidth / 2 ? 'left' : 'right';
                            handleMouseEnter(0, direction);
                        }}
                        onMouseLeave={handleMouseLeave}
                    />
                    <div>
                        <h2 style={styles.heading}>MISIÓN</h2>
                        <p style={styles.paragraph}>
                            Somos una estrategia didáctica empresarial para los aprendices del SENA, garantizando el fortalecimiento
                            de su formación integral mediante procesos de innovación y aprendizaje permanente, contribuyendo al
                            mejoramiento de la calidad del servicio que el SENA ofrece a los colombianos.
                        </p>
                    </div>
                </div>

                {/* Visión */}
                <div style={styles.visionSection}>
                    <div>
                        <h2 style={styles.heading}>VISIÓN</h2>
                        <p style={styles.paragraph}>
                            Para el año 2030, Sena Empresa continuará siendo el eje integrador de los procesos productivos y
                            administrativos del Centro Agropecuario La Granja, fundamentada en la interacción entre el
                            Aprender–Aprender, Aprender–Hacer y Aprender–Ser y la formación por proyectos.
                            El Ciclo de Fortalecimiento Empresarial, propenderá por el desarrollo y fortalecimiento de las
                            actividades que conduzcan a generar mentalidad emprendedora en los aprendices, buscando con esto 
                            aportar a sus comunidades de origen los conocimientos adquiridos, generando un impacto positivo y
                            un mayor desarrollo económico en las regiones.
                        </p>
                    </div>
                    <img
                        src={images[1]}
                        alt="Visión"
                        style={{
                            ...styles.visionImage,
                            ...(hoveredImage?.index === 1 && hoveredImage?.direction === 'left' && styles.imageHoveredRight),
                            ...(hoveredImage?.index === 1 && hoveredImage?.direction === 'right' && styles.imageHoveredLeft),
                        }}
                        onMouseEnter={(e) => {
                            const direction = e.nativeEvent.offsetX < e.target.clientWidth / 2 ? 'left' : 'right';
                            handleMouseEnter(1, direction);
                        }}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>
            </div>
        </>
    );
}

export default NavMenuSE;
