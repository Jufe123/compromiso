import React from 'react';
import { ReactSession } from 'react-client-session';


const FormAreas = ({ area, setArea, handleSubmit, buttonForm }) => {

//AGREGAR ESTE REACT-SESSION A TODOS LOS FORMULARIOS !!! Y A LOS CRUDS
  const token = ReactSession.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setArea((prevArea) => ({
      ...prevArea,
      [name]: value,
    }),
  config);
  };




  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="Nom_Area">Nombre del Área</label>
        <input
          type="text"
          id="Nom_Area"
          name="Nom_Area"
          value={area.Nom_Area}
          onChange={handleChange}
          className="search-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="estado">Estado</label>
        <select
          id="estado"
          name="estado"
          value={area.estado}
          onChange={handleChange}
          className="search-input"
          required
        >
          <option value="Sí">Sí</option>
          <option value="No">No</option>
        </select>
      </div>
      <button type="submit" className="submit-button">
        {buttonForm}
      </button>
    </form>
  );
};

export default FormAreas;
