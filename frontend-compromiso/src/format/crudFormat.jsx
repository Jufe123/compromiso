import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormFormatos from './formFormat.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

const styles = {
  root: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5', // Color de fondo general
    overflowX: 'hidden',
  },
  crudContainer: {
    display: 'flex',
    minHeight: 'calc(100vh - 60px)',
    width: '100%',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#333', // Color del sidebar
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
    backgroundColor: '#fff', // Color del área principal
    borderRadius: '8px', // Opcional: agrega bordes redondeados si es parte del diseño
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Opcional: agrega sombra si es parte del diseño
  },
  pageTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2rem',
    color: '#333', // Color del título
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
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '20px',
  },
  searchInput: {
    width: '70%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  searchButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#4caf50', // Color del botón de búsqueda
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#4caf50', // Color del botón de añadir
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  icon: {
    marginRight: '8px', // Espacio entre el icono y el texto
  },
  tableWrapper: {
    width: '100%',
    maxWidth: '1000px', // Ajuste según el diseño
    margin: '0 auto',
  },
  areaTable: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff', // Color de fondo de la tabla
    borderRadius: '8px', // Opcional: agrega bordes redondeados si es parte del diseño
    overflow: 'hidden', // Asegura que los bordes redondeados se muestren correctamente
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Opcional: agrega sombra si es parte del diseño
  },
  tableHeader: {
    backgroundColor: '#f9f9f9', // Color de fondo del encabezado de la tabla
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333', // Color del texto del encabezado
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'center',
    fontSize: '0.9rem',
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
    backgroundColor: '#4caf50', // Color del botón de acción
    color: '#fff',
  },
};

const CrudFormatos = () => {
  const [formatoList, setFormatoList] = useState([]);
  const [formato, setFormato] = useState({
    Cod_Formato: '',
    Fec_Actualizacion: '',
    Ver_Formato: '',
    Est_Formato: 'Activo',
    Id_Responsable: '',
    Nom_Formato: '',
    Nom_Magnetico: '',
    Id_Procedimiento: '',
    Id_Unidad: '',
  });
  const [formatoQuery, setFormatoQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllFormatos();
  }, [desde, hasta]);

  const getAllFormatos = async () => {
    try {
      const response = await clienteAxios.get('/api/formatos');
      setFormatoList(response.data || []);
      setFormatoQuery(response.data || []);
    } catch (error) {
      console.error('Error al obtener los formatos:', error);
    }
  };

  const getFormato = async (Id_Formato) => {
    try {
      const response = await clienteAxios.get(`/api/formatos/${Id_Formato}`);
      setFormato(response.data || {});
      setButtonForm('Actualizar');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al obtener el formato:', error);
    }
  };

  const deleteFormato = async (Id_Formato) => {
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
        await clienteAxios.delete(`/api/formatos/${Id_Formato}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllFormatos();
      } catch (error) {
        console.error('Error al eliminar el formato:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/formatos', formato);
        Swal.fire('Agregado!', 'El formato ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/api/formatos/${formato.Id_Formato}`, formato);
        Swal.fire('Actualizado!', 'El formato ha sido actualizado.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllFormatos();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const resetForm = () => {
    setFormato({
      Cod_Formato: '',
      Fec_Actualizacion: '',
      Ver_Formato: '',
      Est_Formato: 'Activo',
      Id_Responsable: '',
      Nom_Formato: '',
      Nom_Magnetico: '',
      Id_Procedimiento: '',
      Id_Unidad: '',
    });
    setButtonForm('Enviar');
  };

  const handleSearch = () => {
    if (searchQuery) {
      const filteredFormatos = formatoList.filter((formato) =>
        formato.Nom_Formato.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFormatoQuery(filteredFormatos);
    } else {
      setFormatoQuery(formatoList);
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.crudContainer}>
        <SidebarAdministrator />
        <div style={styles.mainContent}>
          <h1 style={styles.pageTitle}>Gestión de Formatos</h1>
          <div style={styles.contentWrapper}>
            <div style={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Buscar formato..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
              <button onClick={handleSearch} style={styles.searchButton}>
                <FontAwesomeIcon icon={faSearch} style={styles.icon} />
                Buscar
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                style={styles.addButton}
              >
                <FontAwesomeIcon icon={faFileAlt} style={styles.icon} />
                Añadir Formato
              </button>
            </div>
            <div style={styles.tableWrapper}>
              <table style={styles.areaTable}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Fecha Actualización</th>
                    <th>Versión</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(formatoQuery) ? formatoQuery.slice(desde, hasta) : []).map((formato) => (
                    <tr key={formato.Id_Formato}>
                      <td>{formato.Cod_Formato}</td>
                      <td>{formato.Nom_Formato}</td>
                      <td>{formato.Fec_Actualizacion}</td>
                      <td>{formato.Ver_Formato}</td>
                      <td>{formato.Est_Formato}</td>
                      <td style={styles.actionButtons}>
                        <button
                          onClick={() => getFormato(formato.Id_Formato)}
                          style={styles.button}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deleteFormato(formato.Id_Formato)}
                          style={styles.button}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                totalItems={formatoQuery.length}
                itemsPerPage={10}
                onPageChange={(page) => {
                  const newDesde = (page - 1) * 10;
                  const newHasta = newDesde + 10;
                  setDesde(newDesde);
                  setHasta(newHasta);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={buttonForm === 'Enviar' ? 'Agregar Formato' : 'Actualizar Formato'}
      >
        <FormFormatos
          formato={formato}
          setFormato={setFormato}
          onSubmit={handleSubmit}
          buttonText={buttonForm}
        />
      </Modal>
    </div>
  );
};

export default CrudFormatos;
