import { Grid } from "@mui/material";
import { useState } from "react";
import { TabMSD } from "./TabMSD";
import GenericTabs from "../genericComponents/genericTabs";

const tabsInfo = [
  "Todos los Documentos",
  "MSD",
  "Desempeño",
  
];
const tabsShow = [
  "Todos_los_Documentos",
  "MSD",
  "Desempeño",
];
export default function CapturaMSD() {
  const [value, setValue] = useState(0);
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        height: "100%",
      }}
    >
      <Grid
        container
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{
          width: "auto",
          height: "100%",
        }}
      >
        <Grid
          sx={{
            
            width: ["300xp", "750px", "750px", "1100px", "1200px"],
            height: "82vh",

            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <GenericTabs tabsData={tabsInfo} tabSelect={setValue} />
          <Grid
            sx={{
              width: ["300px", "650px", "900px", "1000px", "1100px", "1300px"],
              height: "82vh",
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TabMSD
              TabSelect={tabsInfo[value]}
              Tabs={tabsInfo}
              tabsShow={tabsShow[value]}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
