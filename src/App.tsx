import React from 'react';

import './App.css';
import "./Fonts.css";
<<<<<<< HEAD
import ModalCrearUsuario from "../src/components/ModalCrearEditarUsuario/ModalCrearUsuario"
import ModalEditarUsuario from "../src/components/ModalCrearEditarUsuario/ModalModificarUsuario"
=======
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Home } from './screens/home/Home';
import { Settings } from './screens/config/Settings';
import { E404 } from './screens/e404/E404';
import { Init } from './screens/init/Init';

>>>>>>> ef96f529d41098ec2e73d9138eee68eece8814aa


function App() {



  return (
<<<<<<< HEAD

    <ModalCrearUsuario></ModalCrearUsuario>

=======
   <>
    <Router>
        <Routes>
          <Route index element={<Init />} />
          <Route path="home" element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<E404 />} />
        </Routes>
      </Router>
   </>
>>>>>>> ef96f529d41098ec2e73d9138eee68eece8814aa
  );
}

export default App;
