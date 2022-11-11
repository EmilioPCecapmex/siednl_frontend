import { Dialog, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import logoExcell from "../../assets/img/xlsx_Logo.png";
import { Catalogos } from "./Catalogos";

export const CSVCatalogo = ({ tabla }: { tabla: string }) => {

  const download = (data: any) => {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `${tabla}.csv`);
    a.click();
  };

  const csvmaker = (data: any) => {
    let csvRows = [];

    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));
    console.log(csvRows);
    let values = {};
    for(let i = 0; i<data.length; i++){
    values = Object.values(data[i]).join(",");
    csvRows.push(values);
    }

    return csvRows.join("\n");
  };

  const get = () => {
    
    const data = [{
        id: 1,
        name: "Geeks",
        profession: "developer",
      },
    {
        id: 2,
        name: "Geeks",
        profession: "developer", 
    },
    {
        id: 3,
        name: "Geeks",
        profession: "developer", 
    },
    {
        id: 4,
        name: "Geeks",
        profession: "developer", 
    }
];
    
     
    const csvdata = csvmaker(data)
    download(csvdata);
  };

  <Catalogos defSelected=""/>
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
