import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormUnits from './formUnits.jsx';
import FormQueryUnit from './formQueryUnits.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx'; // Asegúrate de crear este archivo para el modal
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'; // Asegúrate de tener los íconos necesarios

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
  icon: {
    marginRight: '8px', // Espacio entre el icono y el texto
  },
  
  unitTable: {
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

const CrudUnits = () => {
  const [unitList, setUnitList] = useState([]);
  const [unit, setUnit] = useState({
    Nom_Unidad: '',
    Id_Area: '',
    estado: 'No',
  });
  const [unitQuery, setUnitQuery] = useState([]);
  const [areas, setAreas] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  useEffect(() => {
    getAllUnits();
    getAllAreas();
  }, [desde, hasta]);

  const getAllUnits = async () => {
    try {
      const response = await clienteAxios.get('/api/unidades');
      setUnitList(response.data);
      setUnitQuery(response.data);
    } catch (error) {
      console.error('Error al obtener las unidades:', error);
    }
  };

  const getAllAreas = async () => {
    try {
      const response = await clienteAxios.get('/api/areas');
      setAreas(response.data);
    } catch (error) {
      console.error('Error al obtener las áreas:', error);
    }
  };

  const getUnit = async (Id_Unidad) => {
    try {
      const response = await clienteAxios.get(`/api/unidades/${Id_Unidad}`);
      setUnit(response.data);
      setButtonForm('Actualizar');
      setIsModalOpen(true); // Abrir el modal al obtener una unidad
    } catch (error) {
      console.error('Error al obtener la unidad:', error);
    }
  };

  const deleteUnit = async (Id_Unidad) => {
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
        await clienteAxios.delete(`/api/unidades/${Id_Unidad}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllUnits();
      } catch (error) {
        console.error('Error al eliminar la unidad:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/unidades', unit);
        Swal.fire('Agregado!', 'La unidad ha sido agregada.', 'success');
      } else {
        await clienteAxios.put(`/api/unidades/${unit.Id_Unidad}`, unit);
        Swal.fire('Actualizado!', 'La unidad ha sido actualizada.', 'success');
      }
      resetForm();
      getAllUnits();
      setIsModalOpen(false); // Cerrar el modal al enviar el formulario
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const resetForm = () => {
    setUnit({
      Nom_Unidad: '',
      Id_Area: '',
      estado: 'No',
    });
    setButtonForm('Enviar');
  };

  const getAreaNameById = (id) => {
    const area = areas.find((area) => area.Id_Area === id);
    return area ? area.Nom_Area : 'Área no disponible';
  };

  return (
    <div style={styles.root}>
      <div style={styles.crudContainer}>
        <SidebarAdministrator style={styles.sidebar} />
        <div style={styles.mainContent}>
          <h1 style={styles.pageTitle}>Gestión de Unidades</h1>
          <div style={styles.contentWrapper}>
            <button
              style={styles.addButton}
              onClick={() => {
                resetForm();
                setIsModalOpen(true); // Abrir el modal para agregar una unidad
              }}
            >
              <FontAwesomeIcon icon={faLayerGroup} style={styles.icon} /> Añadir 
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <FormUnits
                unit={unit}
                setUnit={setUnit}
                handleSubmit={handleSubmit}
                buttonForm={buttonForm}
                resetForm={resetForm}
                areas={areas}
              />
            </Modal>

            <div style={styles.tableWrapper}>
              <FormQueryUnit
                unitQuery={unitQuery}
                setUnitQuery={setUnitQuery}
              />
              <table style={styles.unitTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>ID</th>
                    <th style={styles.tableHeader}>Nombre de la Unidad</th>
                    <th style={styles.tableHeader}>Área</th>
                    <th style={styles.tableHeader}>Estado</th>
                    <th style={styles.tableHeader}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(unitQuery) &&
                    unitQuery.slice(desde, hasta).map((unit) => (
                      <tr key={unit.Id_Unidad}>
                        <td style={styles.tableCell}>{unit.Id_Unidad}</td>
                        <td style={styles.tableCell}>{unit.Nom_Unidad}</td>
                        <td style={styles.tableCell}>{getAreaNameById(unit.Id_Area)}</td>
                        <td style={styles.tableCell}>{unit.estado}</td>
                        <td style={styles.tableCell}>
                          <div style={styles.actionButtons}>
                            <button
                              style={styles.button}
                              onClick={() => getUnit(unit.Id_Unidad)}
                            >
                              ✏️
                            </button>
                            <button
                              style={styles.button}
                              onClick={() => deleteUnit(unit.Id_Unidad)}
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
                URI={'/api/unidades'}
                setDesde={setDesde}
                setHasta={setHasta}
                desde={desde}
                hasta={hasta}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudUnits;
