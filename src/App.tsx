import { useLayoutEffect } from "react";

import "./App.css";
import "./Fonts.css";

import { Routes, Route } from "react-router-dom";
import { Home } from "./screens/home/Home";
import { Settings } from "./screens/config/Settings";
import { E404 } from "./screens/e404/E404";
import { Usuarios } from "./screens/config/Usuarios";
import { Init } from "./screens/init/Init";
import { continueSession, sessionValid } from "./funcs/validation";
import { useNavigate } from "react-router-dom";
import { MIR } from "./screens/mir/MIR";
import { Notification } from "./screens/notification/Notifications";
import { ActividadesInstitucionales } from "./screens/actividadesInstitucionales/ActividadesInstitucionales";
import { MetaAnual } from "./screens/metaAnual/MetaAnual";
import { FichaTecnica } from "./screens/fichatecnica/FichaTecnica";

function App() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const jt = params.get("jwt") || null;
  const IdApp = params.get("IdApp");

  useLayoutEffect(() => {
    if (jt !== null) {
      sessionValid().then((r) => {
        if ((r as boolean) === false) {
          window.location.assign("http://10.200.4.165/");
        } else if ((r as boolean) === true) {
          setTimeout(() => {
            localStorage.setItem("IdApp", IdApp as string);
            navigate("../home");
          }, 2000);
        }
      });
    } else {
      continueSession().then((r) => {
        if ((r as boolean) === false) {
          window.location.assign("http://10.200.4.165/");
        } else {
          navigate("../home");
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<Init />} />
        <Route path="home" element={<Home />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<Usuarios />} />
        <Route path="*" element={<E404 />} />
        <Route path="fichaTecnica" element={<FichaTecnica />} />
        <Route
          path="Institutionalactivities"
          element={<ActividadesInstitucionales />}
        />
        <Route path="mir" element={<MIR />} />
        <Route path="metaAnual" element={<MetaAnual />} />
        <Route path="notifications" element={<Notification />} />

      </Routes>
    </>
  );
}

export default App;
