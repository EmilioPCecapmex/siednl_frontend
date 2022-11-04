import React, { useLayoutEffect, useEffect } from "react";

import "./App.css";
import "./Fonts.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./screens/home/Home";
import { Settings } from "./screens/config/Settings";
import { E404 } from "./screens/e404/E404";
import { Usuarios } from "./screens/config/Usuarios";
import { Init } from "./screens/init/Init";
import {
  continueSession,
  sessionValid,
} from "./funcs/validation";
import { useNavigate } from "react-router-dom";
import { LateralMenu } from "./components/lateralMenu/LateralMenu";
import { MIR } from "./screens/mir/MIR";
import { Notification } from "./screens/notification/Notifications";
import { TabComponente } from "./components/tabsMir/TabComponente";
import { ActividadesInstitucionales } from "./screens/actividadesInstitucionales/ActividadesInstitucionales";
import { MetaAnual } from "./screens/metaAnual/MetaAnual";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const jt = params.get("jwt") || null;


  useLayoutEffect(() => {
    if (jt !== null) {
      sessionValid().then((r) => {
        if ((r as boolean) === false) {
          window.location.assign("http://login.com");
        } else if ((r as boolean) === true) {
          setTimeout(() => {
            navigate("../home");
          }, 100);
        }
      });
    } else {
      continueSession().then((r) => {
        if ((r as boolean) === false) {
          window.location.assign("http://login.com");
        }
      });
    }
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<Init />} />
        <Route path="home" element={<Home />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<Usuarios />} />
        <Route path="*" element={<E404 />} />
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
