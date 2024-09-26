import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/home.jsx";
import CrudUsers from "./users/crudUsers.jsx";
import LoginFormAdmin from "./users/LoginUser.jsx";
import OlvidePassword from "./users/OlvidePassword.jsx";
import formUser from "./users/formUsers.jsx";
import Contend_Manuals from "./components/home-init/Contend-Manuals.jsx";
import NavMenuSE from "./components/Nav/NavQuerySena/NavMenuS_E.jsx";
import ContendR_H from "./components/home-init/Contend-R_H.jsx";
import Init_Admin from "./components/Admin/init-Admin.jsx";
import CrudResponsables from "./responsible/crudResponsibles.jsx";
import CrudProcedure from "./procedure/crudProcedure.jsx";
import CrudProcesses from "./process/crudProcess.jsx";
import CrudAreas from './area/crudAreas.jsx';
import CrudUnidades from "./unit/crudUnits.jsx";
import ContendContacts from "./components/home-init/Contend-Contacts.jsx";
import CrudFormatos from "./format/crudFormat.jsx"; 
import ModuloConsulta from './components/ModuloConsulta.jsx'; // Asegúrate de que esta ruta sea correcta

function App() {
  // Rutas de los PDFs (actualizadas para la carpeta public)
  const techManualUrl = '/pdf/Manual_de_las_Buenas_Prácticas_de_Ordeño.pdf';
  const userManualUrl = '/pdf/OPERACIONES_BASICAS.pdf';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-admin" element={<LoginFormAdmin />} />
        <Route path="/contacts" element={<ContendContacts />} />
        <Route path="/Mision-Vision" element={<NavMenuSE />} />
        <Route path="/Reseña-Historica" element={<ContendR_H />} />
        <Route path="/manuals" element={<Contend_Manuals techManual={techManualUrl} userManual={userManualUrl} />} />
        <Route path="/registrar" element={<formUser />} />
        <Route path="/olvide-password" element={<OlvidePassword />} />
        <Route path="/CrudUsers" element={<CrudUsers />} />
        <Route path="/Responsables" element={<CrudResponsables />} />
        <Route path="/Procesos" element={<CrudProcesses />} />
        <Route path="/Procedimientos" element={<CrudProcedure />} />
        <Route path="/Areas" element={<CrudAreas />} />
        <Route path="/Administrator" element={<Init_Admin />} />
        <Route path="/Unidades" element={<CrudUnidades />} />
        <Route path="/Formatos" element={<CrudFormatos />} />
        <Route path="/modulo-consulta" element={<ModuloConsulta />} /> {/* Nueva ruta agregada */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
