import React from 'react';
import './InsertarPDF.css';
import axios from "axios";
import { useEffect, useState, useRef, SetStateAction } from "react";




 export const InsertarComponentePDF = ({
  ruta,
  nombre,
  tipo,
  anio,
  perteneceA
}: {
  ruta: string;
  nombre: string;
  tipo: string;
  anio: string;
  perteneceA: string;}) => {
    const getDocumento = async (
      ROUTE: string,
      NOMBRE: string,
      setState: Function
    ) => {
      console.log("entra a get documento:",ruta,nombre,";",anio,",",perteneceA);
      await axios
        .post(
          process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/GetByName",
          {
            ROUTE: ROUTE,
            NOMBRE: NOMBRE,
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken") || "",
              responseType: "blob",
            },
          }
        )
        .then(({ data }) => {
          let file = data.RESPONSE.FILE;
          setState(file);
        })
        .catch((r) => { });
    };
    
    
    const savePDF =(data:string)=>{
      setArchivoUrl(`data:application/pdf;base64,${data}`);
    } 
    getDocumento(ruta,nombre,savePDF);
    const [archivoUrl, setArchivoUrl] = useState<string>("");

  return (
    <div className="pdf-contenedor">
      <iframe
        className="pdf-iframe"
        src={archivoUrl}
        title="Embedded PDF"
      ></iframe>
    </div>
  );
};