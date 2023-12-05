import { Grid } from "@mui/material";
import { useState } from "react";
import { TabPAE } from "./TabPAE";
import GenericTabs from "../genericComponents/genericTabs";

const tabsInfo = ["Todos los Documentos", "Programa Anual Evaluación", "Términos de Referencia", "Bitácoras de Información", "Informe Calidad de Información", "Informe Final", "Anexo CONAC", "Reporte Anual de Evaluación"]
export default function CapturaPAE() {
  const [value, setValue] = useState(0);
  return (
    <Grid
      item
      sx={{
        width: "auto",
        height: "90vh",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <GenericTabs tabsData={tabsInfo} tabSelect={setValue} />

      <Grid
        container
        item
        sx={{
          display: "flex",
          width: "93vw",
          height: "82vh",
          boxShadow: 10,
          borderRadius: 5,
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        <TabPAE
          TabSelect ={tabsInfo[value]}
          Tabs={tabsInfo}
        />
      </Grid>


    </Grid>

  );
}