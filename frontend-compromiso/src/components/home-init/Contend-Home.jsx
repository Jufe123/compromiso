import React, { useState, useEffect } from 'react';
import NavBarAdministrator from "../Admin/NavBarAdmin.jsx";

const Home_init = () => {
    const imageBasePath = '/src/Public/images/imagenHome-Init/';
    const images = [
        `${imageBasePath}imagen1.jpeg`,
        `${imageBasePath}imagen2.jpeg`,
        `${imageBasePath}imagen3.jpeg`
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTransitioning(true); // Inicia la transición
            setTimeout(() => {
                setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
                setTransitioning(false); // Termina la transición
            }, 1500); // Tiempo que dura la animación de transición (1.5 segundos)
        }, 6000); // Cambia la imagen cada 6 segundos

        return () => clearInterval(intervalId);
    }, [images.length]);

    const styles = {
        container: {
            padding: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: '12rem', // Margen superior aumentado para asegurar visibilidad
        },
        title: {
            fontSize: '2.5rem',
            marginBottom: '1.5rem',
            textAlign: 'center', // Centrar el título
            width: '100%',
            fontFamily: 'Georgia', // Fuente solicitada
        },
        imageDescriptionWrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        description: {
            width: '300px',
            marginRight: '2rem',
            textAlign: 'justify', // Justificación del texto
            fontSize: '1.2rem',
            fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`, // Fuente más elegante
            color: '#333',
        },
        imageContainer: {
            display: 'flex',
            justifyContent: 'center',
            perspective: '1200px',
            position: 'relative',
            overflow: 'hidden',
            width: '450px',
            height: '300px', // Tamaño uniforme de las imágenes
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Asegura que las imágenes ocupen el contenedor sin distorsión
            transition: 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out',
            transformStyle: 'preserve-3d',
            cursor: 'pointer',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            opacity: transitioning ? 0 : 1, // Maneja la opacidad para el efecto de desvanecimiento
        },
        pixelateEffect: {
            animation: transitioning ? 'pixelate 1.5s forwards' : 'none', // Efecto de descomposición en cuadritos
        },
        imageHover: {
            transform: 'scale(1.3) rotateY(20deg) rotateX(15deg)', // Efecto 3D al pasar el cursor
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
        },
        imageActive: {
            transform: 'scale(1.2) rotateY(15deg) rotateX(10deg)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
        },
        '@keyframes pixelate': {
            from: {
                clipPath: 'none',
            },
            to: {
                clipPath: 'repeat(10px 10px)', // Cambia el clipPath para simular el efecto de descomposición
            }
        },
    };

    return (
        <>
            <div className="container my-5" style={styles.container}>
                <h1 style={styles.title}>¡BIENVENIDOS A CALDOCS!</h1>
                <div style={styles.imageDescriptionWrapper}>
                    <p style={styles.description}>
                        La revolución en la gestión de documentos. Organiza, colabora y automatiza tus archivos de manera inteligente. ¡Simplifica tu flujo de trabajo y maximiza tu productividad con CalDocs!.
                    </p>
                    <div style={styles.imageContainer}>
                        <img 
                            src={images[currentImageIndex]} 
                            alt={`Imagen ${currentImageIndex + 1}`} 
                            style={{ 
                                ...styles.image, 
                                ...styles.pixelateEffect,
                            }} 
                            onMouseOver={e => e.currentTarget.style.transform = styles.imageHover.transform}
                            onMouseOut={e => e.currentTarget.style.transform = styles.imageActive.transform}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home_init;
