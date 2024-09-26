// WelcomePage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/stylesWelcome.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige al dashboard después de 3 segundos
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);

    // Limpia el timer si el componente se desmonta
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-page">
      <h1>¡Bienvenido al Sistema!</h1>
      <p>Estamos encantados de tenerte aquí. Serás redirigido al panel de control en breve.</p>
    </div>
  );
};

export default WelcomePage;
