import { Dialog, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import * as React from "react";
import DownloadIcon from '@mui/icons-material/Download';
import { Catalogos, IDatosTabla } from "./Catalogos";

export const CSVCatalogo = ({ tabla, datos }: { tabla: string, datos:  IDatosTabla[]  }) => {

  

  const [catalogoInstituciones, setCatalogoInstituciones] = React.useState([
    { Id: "", NombreInstitucion: "" },
  ]);
  const [catalogoProgramas, setCatalogoProgramas] = React.useState([
    { Id: "", NombrePrograma: "" },
  ]);

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
    console.log(csvRows);
    
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

  const getAniosFiscales = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/AniosFiscales", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; AnioFiscal: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.AnioFiscal,
                Tabla: "AniosFiscales",
              };
            }
          );
        }
      });
  };

  const getProgramas = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/programaPresupuestario", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoProgramas(r.data.data);
      });
  };


  const getInstituciones = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/instituciones", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
        params: {

          IdUsuario: localStorage.getItem("IdUsuario"),

          IdInstitucion: localStorage.getItem("IdInstitucion")

        },
      })
      .then((r) => {
        setCatalogoInstituciones(r.data.data);
      });
  };

  
  React.useEffect(() => {
    getInstituciones();

  }, []);
  

  <Catalogos defSelected=""/>
  return (
    <>
     <IconButton>
    <DownloadIcon onClick={()=>get()}/>
    </IconButton>
    </>
  );
};
