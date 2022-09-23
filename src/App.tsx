import React, { useLayoutEffect, useState } from "react";

import "./App.css";
import "./Fonts.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Home } from "./screens/home/Home";
import { Settings } from "./screens/config/Settings";
import { E404 } from "./screens/e404/E404";
import { Usuarios } from "./screens/config/Usuarios";
import { Init } from "./screens/init/Init";
import { continueSession, sessionValid } from "./funcs/validation";
import { useLocation } from "react-router-dom";
import { SessionDialog } from "./components/sessionDialog/SessionDialog";
import { useNavigate } from "react-router-dom";
import { LateralMenu } from "./components/lateralMenu/LateralMenu";


function App() {
  
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const jt = params.get("jwt") || null;


  useLayoutEffect(() => {
    if (jt !== null) {
      sessionValid().then((r) => {
        if ((r as boolean) === false) {
          window.location.assign("http://login.com");
        }else  if ((r as boolean) === true) {
          setTimeout(() => {
            navigate('../home')
          },100);
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
    <SessionDialog/>
        <Routes>
          <Route index element={<Init />} />
          <Route path="home" element={<Home  />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<Usuarios />} />
          <Route path="*" element={<E404 />} />
        </Routes>
    </>
  );
}

export default App;
