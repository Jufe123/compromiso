import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import FormUsers from './formUsers.jsx';
import Pagination from '../components/Pagination/Pagination';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx'; // Asegúrate de crear este archivo para el modal

const styles = {
  root: {
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    overflowX: 'hidden',
    display: 'flex',
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
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '20px',
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
  },
  tableWrapper: {
    width: '100%',
    maxWidth: '1200px',
    overflowX: 'auto',
  },
  userTable: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    marginTop: '20px',
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

const CrudUsers = () => {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState({
    Nom_Usuario: "",
    Ape_Usuario: "",
    Cod_Usuario: "",
    Cor_Usuario: "",
    Nde_Usuario: "",
    Fec_Usuario: "",
    estado: "",
    rol: "Administrador",
    password: ""
  });
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);

  useEffect(() => {
    getAllUsers();
  }, [desde, hasta]);

  const getAllUsers = async () => {
    try {
      const response = await clienteAxios.get('/api/usuarios');
      setUserList(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const getUser = async (Id_Usuario) => {
    try {
      const response = await clienteAxios.get(`/api/usuarios/${Id_Usuario}`);
      setUser(response.data);
      setButtonForm("Actualizar");
      setIsModalOpen(true); // Abrir el modal al obtener un usuario
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  };

  const deleteUser = async (Id_Usuario) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás recuperar este registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    });

    if (result.isConfirmed) {
      try {
        await clienteAxios.delete(`/api/usuarios/${Id_Usuario}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllUsers(); // Actualiza la lista de usuarios después de eliminar
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Datos enviados:", user); // Agrega esto para depurar
      if (buttonForm === "Enviar") {
        await clienteAxios.post('/api/usuarios', user);
        Swal.fire('Agregado!', 'El usuario ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/api/usuarios/${user.Id_Usuario}`, user);
        Swal.fire('Actualizado!', 'El usuario ha sido actualizado.', 'success');
      }
      resetForm(); // Limpia el formulario
      getAllUsers(); // Actualiza la lista de usuarios
      setIsModalOpen(false); // Cerrar el modal al enviar el formulario
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const resetForm = () => {
    setUser({
      Nom_Usuario: "",
      Ape_Usuario: "",
      Cod_Usuario: "",
      Cor_Usuario: "",
      Nde_Usuario: "",
      Fec_Usuario: "",
      estado: "",
      rol: "Administrador",
      password: ""
    });
    setButtonForm("Enviar");
  };

  return (
    <div style={styles.root}>
      <SidebarAdministrator style={styles.sidebar} />
      <div style={styles.mainContent}>
        <h1 style={styles.pageTitle}>Gestión de Usuarios</h1>
        <div style={styles.contentWrapper}>
          <button
            style={styles.openModalButton}
            onClick={() => {
              resetForm();
              setIsModalOpen(true); // Abrir el modal para añadir un usuario
            }}
          >
            Añadir Usuario
          </button>
          
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <FormUsers
              user={user}
              setUser={setUser}
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
            />
          </Modal>
          
          <div style={styles.tableWrapper}>
            <table style={styles.userTable}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>ID</th>
                  <th style={styles.tableHeader}>Nombre</th>
                  <th style={styles.tableHeader}>Apellido</th>
                  <th style={styles.tableHeader}>Código</th>
                  <th style={styles.tableHeader}>Correo</th>
                  <th style={styles.tableHeader}>Número de Documento</th>
                  <th style={styles.tableHeader}>Fecha</th>
                  <th style={styles.tableHeader}>Estado</th>
                  <th style={styles.tableHeader}>Rol</th>
                  <th style={styles.tableHeader}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(userList) && userList.slice(desde, hasta).map((user) => (
                  <tr key={user.Id_Usuario}>
                    <td style={styles.tableCell}>{user.Id_Usuario}</td>
                    <td style={styles.tableCell}>{user.Nom_Usuario}</td>
                    <td style={styles.tableCell}>{user.Ape_Usuario}</td>
                    <td style={styles.tableCell}>{user.Cod_Usuario}</td>
                    <td style={styles.tableCell}>{user.Cor_Usuario}</td>
                    <td style={styles.tableCell}>{user.Nde_Usuario}</td>
                    <td style={styles.tableCell}>{user.Fec_Usuario}</td>
                    <td style={styles.tableCell}>{user.estado}</td>
                    <td style={styles.tableCell}>{user.rol}</td>
                    <td style={styles.tableCell}>
                      <div style={styles.actionButtons}>
                        <button
                          style={{ ...styles.button, ...styles.editButton }}
                          onClick={() => getUser(user.Id_Usuario)}
                        >
                          ✏️
                        </button>
                        <button
                          style={{ ...styles.button, ...styles.deleteButton }}
                          onClick={() => deleteUser(user.Id_Usuario)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            URI="/api/usuarios"
            setDesde={setDesde}
            setHasta={setHasta}
          />
        </div>
      </div>
    </div>
  );
};

export default CrudUsers;