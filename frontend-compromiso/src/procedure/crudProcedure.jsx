import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormProcedures from './formProcedure.jsx';
import FormQueryProcedure from './formQueryProcedure.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

const styles = {
  root: {
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    overflowX: 'hidden',
  },
  crudContainer: {
    display: 'flex',
    minHeight: 'calc(100vh - 60px)',
    width: '107%',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    marginTop: '20px',
  },
  pageTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2rem',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '20px',
    paddingLeft: '20px',
  },
  icon: {
    marginRight: '8px', // Espacio entre el icono y el texto
  },
  openModalButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '190px',
  },
  icon: {
    marginRight: '8px',
  },
  tableWrapper: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  processTable: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
  },
  tableHeader: {
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'center',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    padding: '5px 10px',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
  },
  editButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: '#fff',
  },
};

const CrudProcedures = () => {
  const [procedureList, setProcedureList] = useState([]);
  const [procedure, setProcedure] = useState({
    Id_Procedimiento: '',
    Nom_Procedimiento: '',
    Id_Proceso: '',
    estado: 'No',
  });
  const [procedureQuery, setProcedureQuery] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllProcedures();
    getAllProcesses();
  }, [desde, hasta]);

  const getAllProcedures = async () => {
    try {
      const response = await clienteAxios.get('/api/procedimientos');
      setProcedureList(response.data);
      setProcedureQuery(response.data);
    } catch (error) {
      console.error('Error al obtener los procedimientos:', error);
    }
  };

  const getAllProcesses = async () => {
    try {
      const response = await clienteAxios.get('/api/procesos');
      setProcesses(response.data);
    } catch (error) {
      console.error('Error al obtener los procesos:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const getProcedure = async (Id_Procedimiento) => {
    try {
      const response = await clienteAxios.get(`/api/procedimientos/${Id_Procedimiento}`);
      setProcedure(response.data);
      setButtonForm('Actualizar');
      openModal();
    } catch (error) {
      console.error('Error al obtener el procedimiento:', error);
    }
  };

  const deleteProcedure = async (Id_Procedimiento) => {
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
        await clienteAxios.delete(`/api/procedimientos/${Id_Procedimiento}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllProcedures();
      } catch (error) {
        console.error('Error al eliminar el procedimiento:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/procedimientos', procedure);
        Swal.fire('Agregado!', 'El procedimiento ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/api/procedimientos/${procedure.Id_Procedimiento}`, procedure);
        Swal.fire('Actualizado!', 'El procedimiento ha sido actualizado.', 'success');
      }
      resetForm();
      getAllProcedures();
      closeModal();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const resetForm = () => {
    setProcedure({
      Id_Procedimiento: '',
      Nom_Procedimiento: '',
      Id_Proceso: '',
      estado: 'No',
    });
    setButtonForm('Enviar');
  };

  const getProcessName = (Id_Proceso) => {
    const process = processes.find((proc) => proc.Id_Proceso === Id_Proceso);
    return process ? process.Nom_Proceso : 'Desconocido';
  };

  return (
    <div style={styles.root}>
      <div style={styles.crudContainer}>
        <SidebarAdministrator style={styles.sidebar} />
        <div style={styles.mainContent}>
          <h1 style={styles.pageTitle}>Gestión de Procedimientos</h1>
          <div style={styles.contentWrapper}>
            <button
              style={styles.openModalButton}
              onClick={() => {
                resetForm();
                openModal();
              }}
            >
              <FontAwesomeIcon icon={faFileAlt} style={styles.icon} /> Añadir
            </button>
            
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <FormProcedures
                procedure={procedure}
                setProcedure={setProcedure}
                handleSubmit={handleSubmit}
                buttonForm={buttonForm}
                resetForm={resetForm}
                processes={processes}
              />
            </Modal>
            
            <div style={styles.tableWrapper}>
              <FormQueryProcedure
                procedureQuery={procedureQuery}
                setProcedureQuery={setProcedureQuery}
              />
              <table style={styles.processTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>ID</th>
                    <th style={styles.tableHeader}>Nombre del Procedimiento</th>
                    <th style={styles.tableHeader}>Proceso</th>
                    <th style={styles.tableHeader}>Estado</th>
                    <th style={styles.tableHeader}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(procedureQuery) &&
                    procedureQuery.slice(desde, hasta).map((procedure) => (
                      <tr key={procedure.Id_Procedimiento}>
                        <td style={styles.tableCell}>{procedure.Id_Procedimiento}</td>
                        <td style={styles.tableCell}>{procedure.Nom_Procedimiento}</td>
                        <td style={styles.tableCell}>{getProcessName(procedure.Id_Proceso)}</td>
                        <td style={styles.tableCell}>{procedure.estado}</td>
                        <td style={styles.tableCell}>
                          <div style={styles.actionButtons}>
                            <button
                              style={{ ...styles.button, ...styles.editButton }}
                              onClick={() => getProcedure(procedure.Id_Procedimiento)}
                            >
                              ✏️
                            </button>
                            <button
                              style={{ ...styles.button, ...styles.deleteButton }}
                              onClick={() => deleteProcedure(procedure.Id_Procedimiento)}
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
                URI="/api/procedimientos"
                setDesde={setDesde}
                setHasta={setHasta}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudProcedures;
