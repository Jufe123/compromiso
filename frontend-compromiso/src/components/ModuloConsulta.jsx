import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Pagination from '../components/Pagination/Pagination';

const styles = {
  // tus estilos aquí...
};

const ModuloConsulta = () => {
  const [formatoList, setFormatoList] = useState([]);
  const [formatoQuery, setFormatoQuery] = useState([]);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);

  useEffect(() => {
    getAllFormatos();
  }, [desde, hasta]);

  const getAllFormatos = async () => {
    try {
      const response = await clienteAxios.get('/api/formatos');
      setFormatoList(response.data || []);
      setFormatoQuery(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error al obtener los formatos:', error);
    }
  };

  const deleteFormato = async (Id_Formato) => {
    try {
      await clienteAxios.delete(`/api/formatos/${Id_Formato}`);
      getAllFormatos(); // Re-fetch the data after deletion
    } catch (error) {
      console.error('Error al eliminar el formato:', error);
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.crudContainer}>
        <div style={styles.mainContent}>
          <h1 style={styles.pageTitle}>Gestión de Formatos</h1>

          <div style={styles.tableWrapper}>
            <table style={styles.areaTable}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th>Nombre</th>
                  <th>Fecha de Actualización</th>
                  <th>Ver Formato</th>
                  <th>Estado</th>
                  <th>Responsable</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(formatoQuery) && formatoQuery.slice(desde, hasta).map((formato) => (
                  <tr key={formato.Id_Formato}>
                    <td style={styles.tableCell}>{formato.Nom_Formato}</td>
                    <td style={styles.tableCell}>{formato.Fec_Actualizacion}</td>
                    <td style={styles.tableCell}>
                      <a href={formato.Ver_Formato} target="_blank" rel="noopener noreferrer">Ver</a>
                    </td>
                    <td style={styles.tableCell}>{formato.Est_Formato}</td>
                    <td style={styles.tableCell}>{formato.Id_Responsable}</td>
                    <td style={styles.tableCell}>
                      <div style={styles.actionButtons}>
                        <button
                          onClick={() => deleteFormato(formato.Id_Formato)}
                          style={styles.button}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              totalItems={formatoQuery.length}
              itemsPerPage={10}
              onPageChange={(page) => {
                setDesde((page - 1) * 10);
                setHasta(page * 10);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuloConsulta;
