import { Box, Typography, Button, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Tooltip } from "@mui/material";

export default function FullModalFichaTecnica({
  MIR,
  showResume,
  IdMir,
  anioFiscalEdit,
  MA
 
}: {
  MIR: string;
  showResume: Function;
  IdMir: string;
  anioFiscalEdit: string;
  MA: string;

  
}) {
  const [value, setValue] = React.useState(10);
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        width: "50vw",
        height: "86vh",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:"center"
      }}
    >
      <Box
       sx={{
        width: "100%",
        height: "100%",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <Box sx={{ display: "flex" }}>

          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            sx={{
              borderRadius: "10px 10px 0 0",
              boxShadow: 20,
            }}
          >
            <Tab
              label="Resumen"
              value={10}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
          </Tabs>
        
        </Box>

      </Box>
    </Box>
  );
}

//<ResumenFT
//show={value === 10 ? true : false}
//></TResumenFT>;
