import React from 'react';

import { ReactSession } from 'react-client-session';

const FormFormatos = ({ formato, setFormato, handleSubmit, buttonForm, resetForm }) => {
  // Agregar el token de ReactSession
  const token = ReactSession.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Función de manejo de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormato((prevFormato) => ({
      ...prevFormato,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="Cod_Formato">Código del Formato:</label>
        <input
          type="text"
          id="Cod_Formato"
          name="Cod_Formato"
          value={formato.Cod_Formato}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="Fec_Actualizacion">Fecha de Actualización:</label>
        <input
          type="date"
          id="Fec_Actualizacion"
          name="Fec_Actualizacion"
          value={formato.Fec_Actualizacion}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="Ver_Formato">Versión del Formato:</label>
        <input
          type="text"
          id="Ver_Formato"
          name="Ver_Formato"
          value={formato.Ver_Formato}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="Est_Formato">Estado del Formato:</label>
        <select
          id="Est_Formato"
          name="Est_Formato"
          value={formato.Est_Formato}
          onChange={handleChange}
          className="form-input"
          required
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="Nom_Formato">Nombre del Formato:</label>
        <input
          type="text"
          id="Nom_Formato"
          name="Nom_Formato"
          value={formato.Nom_Formato}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="Nom_Magnetico">Nombre Magnético:</label>
        <input
          type="text"
          id="Nom_Magnetico"
          name="Nom_Magnetico"
          value={formato.Nom_Magnetico}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="Id_Procedimiento">Procedimiento:</label>
        <input
          type="number"
          id="Id_Procedimiento"
          name="Id_Procedimiento"
          value={formato.Id_Procedimiento}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="Id_Unidad">Unidad:</label>
        <input
          type="number"
          id="Id_Unidad"
          name="Id_Unidad"
          value={formato.Id_Unidad}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <button type="submit" className="submit-button">
        {buttonForm}
      </button>
      <button type="button" onClick={resetForm} className="cancel-button">
        Cancelar
      </button>
    </form>
  );
};

export default FormFormatos;
