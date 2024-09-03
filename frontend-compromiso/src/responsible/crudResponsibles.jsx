import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormResponsables from './formResponsibles.jsx';
import FormQueryResponsable from './formQueryResponsibles.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx'; // Ajusta la ruta según la ubicación

const CrudResponsables = () => {
  const [responsableList, setResponsableList] = useState([]);
  const [responsable, setResponsable] = useState({
    Nom_Responsable: '',
    estado: 'Sí',
  });
  const [responsableQuery, setResponsableQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);

  useEffect(() => {
    getAllResponsables();
  }, [desde, hasta]);

  const getAllResponsables = async () => {
    try {
      const response = await clienteAxios.get('/responsables');
      setResponsableList(response.data);
      setResponsableQuery(response.data); // Inicializar responsableQuery con todos los responsables
    } catch (error) {
      console.error('Error al obtener los responsables:', error);
    }
  };

  const getResponsable = async (Id_Responsable) => {
    try {
      const response = await clienteAxios.get(`/responsables/${Id_Responsable}`);
      setResponsable(response.data);
      setButtonForm('Actualizar');
    } catch (error) {
      console.error('Error al obtener el responsable:', error);
    }
  };

  const deleteResponsable = async (Id_Responsable) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar este registro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    });

    if (result.isConfirmed) {
      try {
        await clienteAxios.delete(`/responsables/${Id_Responsable}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllResponsables();
      } catch (error) {
        console.error('Error al eliminar el responsable:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/responsables', responsable);
        Swal.fire('Agregado!', 'El responsable ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/responsables/${responsable.Id_Responsable}`, responsable);
        Swal.fire('Actualizado!', 'El responsable ha sido actualizado.', 'success');
      }
      resetForm();
      getAllResponsables();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const resetForm = () => {
    setResponsable({
      Nom_Responsable: '',
      estado: 'Sí',
    });
    setButtonForm('Enviar');
  };

  return (
    <div className="crud-container">
      <SidebarAdministrator />
      <div className="main-content">
        <h1 className="page-title">Gestión de Responsables</h1>
        <div className="content-wrapper">
          <FormResponsables
            responsable={responsable}
            setResponsable={setResponsable}
            handleSubmit={handleSubmit}
            buttonForm={buttonForm}
            resetForm={resetForm}
          />
          <div className="table-wrapper">
            <FormQueryResponsable
              responsableQuery={responsableQuery}
              setResponsableQuery={setResponsableQuery}
            />
            <table className="responsable-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre del Responsable</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(responsableQuery) &&
                  responsableQuery.slice(desde, hasta).map((responsable) => (
                    <tr key={responsable.Id_Responsable}>
                      <td>{responsable.Id_Responsable}</td>
                      <td>{responsable.Nom_Responsable}</td>
                      <td>{responsable.estado}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="edit-button"
                            onClick={() => getResponsable(responsable.Id_Responsable)}
                          >
                            ✏️
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => deleteResponsable(responsable.Id_Responsable)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              URI="/responsables"
              setDesde={setDesde}
              setHasta={setHasta}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudResponsables;
