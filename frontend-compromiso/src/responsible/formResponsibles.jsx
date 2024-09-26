import React from 'react';

const FormResponsables = ({ responsable, setResponsable, handleSubmit, buttonForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponsable({
      ...responsable,
      [name]: value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre del Responsable</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          name="Nom_Responsable" // Asegúrate de que el nombre coincida con el estado
          value={responsable.Nom_Responsable}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="estado" className="form-label">Estado</label>
        <select
          className="form-select"
          id="estado"
          name="estado"
          value={responsable.estado}
          onChange={handleChange}
          required
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">{buttonForm}</button>
    </form>
  );
};

export default FormResponsables;