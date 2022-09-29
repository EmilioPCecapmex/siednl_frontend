import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function FullModalMir() {
  const [value, setValue] = React.useState(10);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function Render() {
    return;
  }

  return (
    
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Encabezado" value={10} sx={{backgroundColor:"yellow", borderRadius:50}} />
              <Tab label="Fin" value={20} />
              <Tab label="Propósito" value={30} />
              <Tab label="Componentes" value={40} />
              <Tab label="Actividades" value={50} />
              <Tab label="Resumen" value={60} />
            </Tabs>
          </Box>

          {value === 10 ? (
            <Box
              sx={{ backgroundColor: "black", with: "100vw", height: "80vh" }}
            >
            </Box>
          ) : null}

          {value === 20 ? (
            <Box
              sx={{ backgroundColor: "pink", with: "100vw", height: "80vh" }}
            >
            </Box>
          ) : null}

          {value === 30 ? (
            <Box
              sx={{ backgroundColor: "brown", with: "100vw", height: "80vh" }}
            >
            </Box>
          ) : null}
          {value === 40 ? (
            <Box
              sx={{ backgroundColor: "red", with: "100vw", height: "80vh" }}
            >
            </Box>
          ) : null}
          {value === 50 ? (
            <Box
              sx={{ backgroundColor: "blue", with: "100vw", height: "80vh" }}
            >
            </Box>
          ) : null}
          {value === 60 ? (
            <Box
              sx={{ backgroundColor: "green", with: "100vw", height: "80vh" }}
            >
            </Box>
          ) : null}

        </Box>
  );
}
