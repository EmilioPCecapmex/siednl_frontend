import React from 'react';

import './App.css';
import "./Fonts.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Home } from './screens/home/Home';
import { Settings } from './screens/config/Settings';
import { E404 } from './screens/e404/E404';
import { Usuarios } from './screens/config/Usuarios';
<<<<<<< HEAD
import { Init } from './screens/init/Init';
=======
import { Config } from './screens/config/Config';

>>>>>>> dev_pedro



function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route index element={<Init />} />
          <Route path="home" element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<Usuarios />} />
          <Route path="config" element={<Config />} />
          <Route path="*" element={<E404 />} />
          
        </Routes>
      </Router>
   </>
  );
}

export default App;
