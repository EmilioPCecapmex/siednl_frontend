import React from 'react';
import './InsertarPDF.css';
import axios from "axios";

const getDocumento = async (
  ROUTE: string,
  NOMBRE: string,
  setState: Function
) => {
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

 export const InsertarComponentePDF = ({
  Nombre,
  }: {
  Nombre: string;}) => {
  return (
    <div className="pdf-contenedor">
      <iframe
        className="pdf-iframe"
        src={"/"+Nombre+".pdf"}
        title="Embedded PDF"
      ></iframe>
    </div>
  );
};