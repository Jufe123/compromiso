import React, { useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alert/Alerta.jsx';
import { ReactSession } from 'react-client-session';
import Swal from 'sweetalert2';

const FormUser = ({ buttonForm, user, getAllUsers }) => {
  const [Nombre, setNombre] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Codigo, setCodigo] = useState('');
  const [Email, setEmail] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Fecha, setFecha] = useState('');
  const [Estado, setEstado] = useState('Sí'); // Valor por defecto
  const [Rol, setRol] = useState('Administrador');
  const [Password, setPassword] = useState(''); // Campo para la contraseña
  const [alerta, setAlerta] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    if (user) {
      setNombre(user.Nom_Usuario || '');
      setApellido(user.Ape_Usuario || '');
      setCodigo(user.Cod_Usuario || '');
      setEmail(user.Cor_Usuario || '');
      setTelefono(user.Nde_Usuario || '');
      setFecha(user.Fec_Usuario || '');
      setEstado(user.estado || 'Sí');
      setRol(user.rol || 'Administrador');
    }
  }, [user]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const sendForm = async (e) => {
    e.preventDefault();
    const token = ReactSession.get('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const userData = {
      Nom_Usuario: Nombre,
      Ape_Usuario: Apellido,
      Cod_Usuario: Codigo,
      Cor_Usuario: Email,
      Nde_Usuario: Telefono,
      Fec_Usuario: Fecha,
      estado: Estado,
      rol: Rol,
      password: Password,
    };

    try {
      let responseApi;
      if (buttonForm === 'Actualizar') {
        responseApi = await clienteAxios.put(`api/usuarios/${user.id}`, userData, config);
        Swal.fire({
          title: 'Actualización Exitosa',
          text: 'Usuario actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      } else {
        responseApi = await clienteAxios.post('api/usuarios', userData, config);
        Swal.fire({
          title: 'Registro Exitoso',
          text: 'Usuario registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }

      await getAllUsers(); // Asegúrate de que esta función sea una función asíncrona

      resetForm();
    } catch (error) {
      console.error('Error en la solicitud:', error); // Añadido para depuración
      if (error.response) {
        setMessage(`Error: ${error.response.data.message || 'Error al procesar la solicitud'}`);
      } else if (error.request) {
        setMessage('Error: No se recibió respuesta del servidor');
      } else {
        setMessage('Error al procesar la solicitud');
      }
      setMessageType('error');
    }
  };

  const resetForm = () => {
    setNombre('');
    setApellido('');
    setCodigo('');
    setEmail('');
    setTelefono('');
    setFecha('');
    setEstado('Sí');
    setRol('Administrador');
    setPassword('');
  };

  return (
    <div className="crud-container">
      <div className="main-content">
        <div className="content-wrapper">
          {message && <Alerta message={message} type={messageType} />}
          <form onSubmit={sendForm} className="form">
            <h2 className="page-title">Formulario de Usuario</h2>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Nombre"
                value={Nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Apellido</label>
              <input
                type="text"
                id="apellido"
                placeholder="Apellido"
                value={Apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Código</label>
              <input
                type="text"
                id="codigo"
                placeholder="Código"
                value={Codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                id="telefono"
                placeholder="Teléfono"
                value={Telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Fecha de Registro</label>
              <input
                type="date"
                id="fecha"
                value={Fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Estado</label>
              <select
                id="estado"
                value={Estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label>Rol</label>
              <input
                type="text"
                id="rol"
                placeholder="Rol"
                value={Rol}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="submit-button"
            >
              {buttonForm}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormUser;
