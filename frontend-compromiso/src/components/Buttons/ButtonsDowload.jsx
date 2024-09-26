import React from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as SQL from 'sql.js';

// Importa tus iconos o usa algún ícono de una librería como Font Awesome
import { FaFileExcel, FaFilePdf, FaDatabase } from 'react-icons/fa';

const DownloadButtons = ({ data, formType }) => {
  const extractImportantFields = (data) => {
    return data.map(({ Id_Responsable, Nom_Responsable, estado }) => ({
      Id_Responsable,
      Nom_Responsable,
      estado,
    }));
  };

  const downloadExcel = () => {
    const filteredData = extractImportantFields(data);
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${formType}_data.xlsx`);
  };

  const downloadPDF = () => {
    const filteredData = extractImportantFields(data);
    const doc = new jsPDF();
    doc.autoTable({
      head: [Object.keys(filteredData[0])],
      body: filteredData.map(item => Object.values(item)),
    });
    doc.save(`${formType}_data.pdf`);
  };

  const downloadSQL = () => {
    const filteredData = extractImportantFields(data);
    const db = new SQL.Database();
    const tableName = `${formType}_data`;

    db.run(`CREATE TABLE ${tableName} (Id_Responsable INTEGER, Nom_Responsable TEXT, estado TEXT)`);

    filteredData.forEach(row => {
      const values = Object.values(row).map(value => `"${value}"`).join(', ');
      db.run(`INSERT INTO ${tableName} VALUES (${values})`);
    });

    const sqlFile = db.export();
    const blob = new Blob([sqlFile], { type: 'application/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formType}_data.sql`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="download-buttons">
      <button onClick={downloadExcel}>
        <FaFileExcel /> Excel
      </button>
      <button onClick={downloadPDF}>
        <FaFilePdf /> PDF
      </button>
      <button onClick={downloadSQL}>
        <FaDatabase /> SQL
      </button>
    </div>
  );
};

export default DownloadButtons;
