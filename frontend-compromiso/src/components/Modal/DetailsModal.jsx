import React, { useState, useEffect } from 'react';

const DetailsModal = ({ showModal, handleClose, member }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (showModal && member) {
      const interval = setInterval(() => {
        setFadeIn(false);
        setTimeout(() => {
          setCurrentSlide((prevSlide) =>
            prevSlide === member.carouselItems.length - 1 ? 0 : prevSlide + 1
          );
          setFadeIn(true);
        }, 500); // Match this duration with the fade-out duration
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [showModal, member]);

  return (
    showModal && (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.modal}>
          <button style={modalStyles.closeButton} onClick={handleClose}>X</button>
          <h2>{member.name}</h2>
          <div style={carouselStyles.carousel}>
            {member.carouselItems.map((item, index) => (
              <img
                key={index}
                src={item.img}
                alt={item.caption}
                style={{
                  ...carouselStyles.image,
                  opacity: currentSlide === index ? (fadeIn ? 1 : 0) : 0,
                  transform: `translateX(${index === currentSlide ? 0 : 100}%)`,
                }}
              />
            ))}
          </div>
          <p style={carouselStyles.caption}>
            <strong>{member.carouselItems[currentSlide].caption}</strong>
          </p>
          <p><strong>{member.description}</strong></p>
        </div>
      </div>
    )
  );
};

// Estilos del modal
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    width: '80%',
    maxWidth: '600px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    textAlign: 'center',
    zIndex: 1001,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
};

// Estilos del carrusel
const carouselStyles = {
  carousel: {
    position: 'relative',
    width: '300px', // Tamaño fijo del carrusel
    height: '300px', // Tamaño fijo del carrusel
    margin: '0 auto', // Centrar el carrusel
    overflow: 'hidden',
    borderRadius: '50%', // Hacer el carrusel circular
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%', // Mantener las imágenes en forma circular
    transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
  },
  caption: {
    marginTop: '80px',
    color: '#666',
    fontSize: '0.9rem',
  },
};

export default DetailsModal;
