import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import FormGeneral from '../components/datatables/Crud_General.jsx';
import Pagination from '../components/Pagination/Pagination';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faFilePdf, faFileExcel, faDatabase } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';
import '../components/styles/stylesResponsiblesCrud.css';
import ErrorBoundary from '../components/ErrorBoundary'; // Importa el ErrorBoundary

const CrudResponsables = () => {
  const [responsableList, setResponsableList] = useState([]);
  const [responsable, setResponsable] = useState({
    Nom_Responsable: '',
    estado: 'Activo',
  });
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllResponsables();
  }, []);

  const getAllResponsables = async () => {
    try {
      const response = await clienteAxios.get('/api/responsables');
      console.log('Datos obtenidos:', response.data); // Depuración
      setResponsableList(response.data);
    } catch (error) {
      console.error('Error al obtener los responsables:', error);
    }
  };

  const getResponsable = async (Id_Responsable) => {
    try {
      const response = await clienteAxios.get(`/api/responsables/${Id_Responsable}`);
      setResponsable(response.data);
      setButtonForm('Actualizar');
      setIsModalOpen(true);
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
      confirmButtonText: 'Sí, eliminarlo!',
    });

    if (result.isConfirmed) {
      try {
        await clienteAxios.delete(`/api/responsables/${Id_Responsable}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllResponsables();
      } catch (error) {
        console.error('Error al eliminar el responsable:', error);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/responsables', data);
        Swal.fire('Agregado!', 'El responsable ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/api/responsables/${data.Id_Responsable}`, data);
        Swal.fire('Actualizado!', 'El responsable ha sido actualizado.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllResponsables();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const resetForm = () => {
    setResponsable({
      Nom_Responsable: '',
      estado: 'Activo',
    });
    setButtonForm('Enviar');
  };

  const exportToPDF = () => {
    console.log('Exportar a PDF');
  };

  const exportToExcel = () => {
    console.log('Exportar a Excel');
  };

  const exportToSQL = () => {
    console.log('Exportar a SQL');
  };

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.Id_Responsable,
      sortable: true,
    },
    {
      name: 'Nombre del Responsable',
      selector: (row) => row.Nom_Responsable,
      sortable: true,
    },
    {
      name: 'Estado',
      selector: (row) => row.estado,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <div className="action-buttons">
          <button className="edit-button" onClick={() => getResponsable(row.Id_Responsable)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="delete-button" onClick={() => deleteResponsable(row.Id_Responsable)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <ErrorBoundary> {/* Envolviendo el componente en ErrorBoundary */}
      <div className="crud-root">
        <div className="crud-container">
          <SidebarAdministrator />
          <div className="main-content">
            <h1 className="page-title">Gestión de Responsables</h1>
            <div className="content-wrapper">
              <button
                className="add-button"
                onClick={() => {
                  setResponsable({
                    Nom_Responsable: '',
                    estado: 'Activo',
                  });
                  setButtonForm('Enviar');
                  setIsModalOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faPlus} /> Agregar
              </button>

              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <FormGeneral
                  initialValues={responsable}
                  fields={[
                    { name: 'Nom_Responsable', label: 'Nombre del Responsable', type: 'text', placeholder: 'Nombre', required: true },
                    {
                      name: 'estado',
                      label: 'Estado',
                      type: 'select',
                      options: [
                        { value: 'Activo', label: 'Activo' },
                        { value: 'Inactivo', label: 'Inactivo' },
                      ],
                      required: true,
                    },
                  ]}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    resetForm();
                    setIsModalOpen(false);
                  }}
                  buttonText={buttonForm}
                />
              </Modal>

              <div className="export-buttons">
                <button className="export-btn pdf-btn" onClick={exportToPDF}>
                  <FontAwesomeIcon icon={faFilePdf} /> Exportar PDF
                </button>
                <button className="export-btn excel-btn" onClick={exportToExcel}>
                  <FontAwesomeIcon icon={faFileExcel} /> Exportar Excel
                </button>
                <button className="export-btn sql-btn" onClick={exportToSQL}>
                  <FontAwesomeIcon icon={faDatabase} /> Exportar SQL
                </button>
              </div>

              <div className="table-wrapper">
                <DataTable
                  columns={columns}
                  data={Array.isArray(responsableList) ? responsableList : []} 
                  pagination
                  highlightOnHover
                  striped
                  paginationComponent={Pagination}
                  paginationPerPage={10}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default CrudResponsables;
