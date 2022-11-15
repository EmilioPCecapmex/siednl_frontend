import { Dialog, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import * as React from "react";
import logoExcell from "../../assets/img/xlsx_Logo.png";
import { Catalogos } from "./Catalogos";


export const CSVCatalogo = ({ tabla }: { tabla: string }) => {
  const [catalogoInstituciones, setCatalogoInstituciones] = React.useState([
    { Id: "", NombreInstitucion: "" },
  ]);

  const download = (data: any) => {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `${tabla}.csv`);
    a.click();
  };

  
  const csvmaker = (data: any, headerNumber: number) => {
    let csvRows = [];

    if (tabla === "Instituciones") {
      const headers = Object.keys(data[0]);
      csvRows.push(headers[headerNumber]);
      console.log(csvRows);

      let values = {};
      for (let i = 0; i < data.length; i++) {
        values = data[i].NombreInstitucion;
        csvRows.push(values);
      }

      return csvRows.join("\n");
    }
  };

  const get = () => {
    const csvdata = csvmaker(catalogoInstituciones, 1);
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

  const getInstituciones = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/instituciones", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),

          IdInstitucion: localStorage.getItem("IdInstitucion"),
        },
      })
      .then((r) => {
        setCatalogoInstituciones(r.data.data);
      });
  };

  React.useEffect(() => {
    getInstituciones();
  }, []);

  <Catalogos defSelected="" />;
  return (
    <>
      <img
        src={logoExcell}
        alt="Logo"
        style={{ width: "2.5vw", height: "3.5vh" }}
        onClick={() => get()}
      />
    </>
  );
};
