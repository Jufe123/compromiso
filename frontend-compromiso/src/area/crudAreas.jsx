import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormAreas from './FormAreas.jsx';
import FormQueryArea from './FormQueryArea.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

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
  addButton: {
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
    marginRight: '8px', // Espacio entre el icono y el texto
  },
  tableWrapper: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  areaTable: {
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
};

const CrudAreas = () => {
  const [areaList, setAreaList] = useState([]);
  const [area, setArea] = useState({
    Nom_Area: '',
    estado: 'Sí',
  });
  const [areaQuery, setAreaQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllAreas();
  }, [desde, hasta]);

  const getAllAreas = async () => {
    try {
      const response = await clienteAxios.get('/api/areas');
      setAreaList(response.data);
      setAreaQuery(response.data);
    } catch (error) {
      console.error('Error al obtener las áreas:', error);
    }
  };

  const getArea = async (Id_Area) => {
    try {
      const response = await clienteAxios.get(`/api/areas/${Id_Area}`);
      setArea(response.data);
      setButtonForm('Actualizar');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al obtener el área:', error);
    }
  };

  const deleteArea = async (Id_Area) => {
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
        await clienteAxios.delete(`/api/areas/${Id_Area}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllAreas();
      } catch (error) {
        console.error('Error al eliminar el área:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/areas', area);
        Swal.fire('Agregado!', 'El área ha sido agregada.', 'success');
      } else {
        await clienteAxios.put(`/api/areas/${area.Id_Area}`, area);
        Swal.fire('Actualizado!', 'El área ha sido actualizada.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllAreas();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const resetForm = () => {
    setArea({
      Nom_Area: '',
      estado: 'Sí',
    });
    setButtonForm('Enviar');
  };

  return (
    <div style={styles.root}>
      <div style={styles.crudContainer}>
        <SidebarAdministrator style={styles.sidebar} />
        <div style={styles.mainContent}>
          <h1 style={styles.pageTitle}>Gestión de Áreas</h1>
          <div style={styles.contentWrapper}>
            <button
              style={styles.addButton}
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faBuilding} style={styles.icon} />
              Añadir
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <FormAreas
                area={area}
                setArea={setArea}
                handleSubmit={handleSubmit}
                buttonForm={buttonForm}
                resetForm={resetForm}
              />
            </Modal>

            <div style={styles.tableWrapper}>
              <FormQueryArea
                areaQuery={areaQuery}
                setAreaQuery={setAreaQuery}
              />
              <table style={styles.areaTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>ID</th>
                    <th style={styles.tableHeader}>Nombre del Área</th>
                    <th style={styles.tableHeader}>Estado</th>
                    <th style={styles.tableHeader}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(areaQuery) &&
                    areaQuery.slice(desde, hasta).map((area) => (
                      <tr key={area.Id_Area}>
                        <td style={styles.tableCell}>{area.Id_Area}</td>
                        <td style={styles.tableCell}>{area.Nom_Area}</td>
                        <td style={styles.tableCell}>{area.estado}</td>
                        <td style={styles.tableCell}>
                          <div style={styles.actionButtons}>
                            <button
                              style={styles.button}
                              onClick={() => getArea(area.Id_Area)}
                            >
                              ✏️
                            </button>
                            <button
                              style={styles.button}
                              onClick={() => deleteArea(area.Id_Area)}
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
                URI="/api/areas"
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

export default CrudAreas;
