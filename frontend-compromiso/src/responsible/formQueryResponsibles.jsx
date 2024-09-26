// FormQueryResponsable.jsx
import React, { useState } from 'react';

const FormQueryResponsable = ({ responsableQuery, setResponsableQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = responsableQuery.filter((responsable) =>
      responsable.Nom_Responsable.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResponsableQuery(filtered);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar por nombre"
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default FormQueryResponsable;