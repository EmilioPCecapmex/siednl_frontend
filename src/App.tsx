import { useLayoutEffect } from "react";

import "./App.css";
import "./Fonts.css";
import "./Globals.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Home } from "./screens/home/Home";
import { Settings } from "./screens/config/Settings";
import { E404 } from "./screens/e404/E404";
import { PanelUsuarios } from "./screens/config/PanelUsuarios";
import { Init } from "./screens/init/Init";
import { continueSession, sessionValid } from "./funcs/validation";
import { MIR } from "./screens/mir/MIR";
import { Notification } from "./screens/notification/Notifications";
import { ActividadesInstitucionales } from "./screens/actividadesInstitucionales/ActividadesInstitucionales";
import { MetaAnual } from "./screens/metaAnual/MetaAnual";
import { FichaTecnica } from "./screens/fichatecnica/FichaTecnica";
import { ProgramaAnualEvaluacion } from "./screens/programaAnauldeEvaluacion/ProgramaAnualdeEvaluacion";
import { Raffi } from "./screens/raffi/Raffi";
import Ayuda from "./screens/Ayuda/Ayuda";

function App() {
  const params = new URLSearchParams(window.location.search);
  const jt = params.get("jwt") || null;
  const IdApp = params.get("IdApp");

  useLayoutEffect(() => {
    if (jt !== null) {

      sessionValid().then((r) => {
        if ((r as boolean) === false) {
          window.location.assign(
            process.env.REACT_APP_APPLICATION_FRONT_LOGIN || ""
          );
        } else if ((r as boolean) === true) {
          setTimeout(() => {
            localStorage.setItem("IdApp", IdApp as string);
            window.location.assign(
              process.env.REACT_APP_APPLICATION_FRONT|| "/siednl/"
            );
          }, 2000);
        }
      });
    } else {
      continueSession().then((r) => {

        if ((r as boolean) === false) {
          window.location.assign(
            process.env.REACT_APP_APPLICATION_FRONT_LOGIN || ""
          );
        } else {
          // navigate("../home");
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<PanelUsuarios />} />
        <Route path="*" element={<E404 />} />
        <Route path="fichaTecnica" element={<FichaTecnica />} />
        <Route
          path="Institutionalactivities"
          element={<ActividadesInstitucionales />}
        />

        <Route path="mir" element={<MIR />} />
        <Route path="metaAnual" element={<MetaAnual />} />
        <Route path="programaAnualEvaluacion" element={<ProgramaAnualEvaluacion />} />
        <Route path="raffi" element={<Raffi />} />
        <Route path="notifications" element={<Notification />} />
        <Route path="AdministracionAyudas" element={<Ayuda />} />

      </Routes>
    </HashRouter>

  );
}

export default App;
