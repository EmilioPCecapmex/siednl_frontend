import React from 'react';
import './InsertarPDF.css';

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