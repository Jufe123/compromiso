import React, { useState } from 'react';

const FormQueryFormato = ({ formatoQuery, setFormatoQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFormatoQuery(formatoQuery); // Mostrar todos los formatos si el término de búsqueda está vacío
    } else {
      const filteredFormatos = formatoQuery.filter((formato) =>
        formato.Nom_Formato.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFormatoQuery(filteredFormatos);
    }
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Buscar por nombre del formato..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button
        type="button"
        onClick={handleSearch}
        className="search-button"
      >
        Buscar
      </button>
    </div>
  );
};

export default FormQueryFormato;
