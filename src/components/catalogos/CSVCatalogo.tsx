import { Dialog, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import * as React from "react";
import logoExcell from "../../assets/img/xlsx_Logo.png";
import { Catalogos, IDatosTabla } from "./Catalogos";

export const CSVCatalogo = ({ tabla, datos }: { tabla: string, datos:  IDatosTabla[]  }) => {

  



  const download = (data: any) => {
    const blob = new Blob([data], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `${tabla}.txt`.replace(' ','').toLowerCase());
    a.click();
  };

  
  const csvmaker = (data: any, headerNumber: number) => {
    let csvRows = [];

    const headers = Object.keys(data[0]);
    csvRows.push(headers[headerNumber]);
    
    let values = {};
    for(let i = 0; i<data.length; i++){
    values = data[i].Desc;
    csvRows.push(values);
    }

    return csvRows.join("\n");
  };

  const get = () => {
    const csvdata = csvmaker(datos,1)
    download(csvdata);
  };



  
  return (
    <>
      <img
        src={logoExcell}
        alt="Logo"
        style={{ width: "2.5vw", height: "3.5vh" }}
        onClick={() => get()}
      />
    </>
  )
}

