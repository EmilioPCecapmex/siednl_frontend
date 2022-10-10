import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { IComponente } from "./IComponente";

export const TabComponente = ({show, asignarComponente, asignarComponenteValor}:{show: boolean, asignarComponente:Function, asignarComponenteValor:Function}) => {
  // business logic-------------------------------------------------------------------------------
  const [componentes, setComponentes] = React.useState([1, 2]);

  const [componenteValor, setComponenteValor] = React.useState<Array<IComponente>>([]);

  useEffect(() => {
    asignarComponente(componentes);
    console.log(componentes)
  }, [componentes]);

  const asignarCV=()=>{
    asignarComponenteValor(componenteValor);
  }

  const agregarFnc = () => {
    let v = componentes.length + 1;
    if (v > 6) {
    } else {
      setComponentes([...componentes, v]);
      asignarComponente([...componentes, v])
      let array = [...componentes, v].map((x) => {
        return {
          resumen: "",
          indicador: "",
          frecuencia: "",
          formula: "",
          medios: "",
          supuestos: "",
        };
      });
      setComponenteValor(array);
    }
    asignarComponente(componentes);
  };

  const eliminarFnc = () => {
    let v = componentes.length - 1;
    if (v < 2) {
    } else {
      setComponentes(componentes.splice(0, v));
    }
    asignarComponente(componentes);
  };

  useEffect(() => {
    let array = componentes.map((x) => {
      return {
        resumen: "",
        indicador: "",
        frecuencia: "",
        formula: "",
        medios: "",
        supuestos: "",
      };
    });
    
    setComponenteValor(array);

  }, []);

  const [componentExpanded, setComponentExpanded] = useState(0)
 
  const cargarArray = () => {
    let arrayComponente = [{ componentes: componenteValor }];
    let xComponente=componenteValor;
    //console.log(aComponente);
    console.log(xComponente);
  };
  //----------------------------------------------------------------------------------------------
  return (
    <Box
    visibility={show ? "visible" : "hidden"}
    position="absolute"
      sx={{
        display: "flex",
        width: "75vw",
        height: "77vh",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        backgroundColor: "#fff",
      }}
      
    >
      <Box sx={{ display: "flex", backgroundColor: "", width: "100%", height: "100%", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

        <Box sx={{ display: "flex", backgroundColor: "", width: "100%", height: "10%", alignItems: "center", justifyContent: "flex-end", mr: "15vw" }}>
          {/* Botones Componentes */}
          <IconButton onClick={() => agregarFnc()}>
            <AddCircleIcon fontSize="large" />
          </IconButton >
          <IconButton onClick={() => eliminarFnc()}>
            <DoDisturbOnIcon fontSize="large" />
          </IconButton >
        </Box>

        <Box sx={{
          width: "95%",
          height: "90%",
          backgroundColor: "",
          pb: 2,
          pt: 2,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          "&::-webkit-scrollbar": {
            width: ".3vw",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.5)",
            outline: "1px solid slategrey",
            borderRadius: 10,

          },
        }}>
          {/* Render Componentes */}
          {componentes.map((x) => {
            return (
              <Accordion sx={{ width: "95%", display: "flex", flexDirection: "column", flexWrap: "wrap", boxShadow: 4 }} expanded={componentExpanded === x}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => {
                  let y = componentExpanded === x ? 0 : x
                  setComponentExpanded(y)
                }}>
                  <Typography sx={{ width: "33%", flexShrink: 0, alignItems: "center", justifyContent: "center", display: "flex" }}>
                    Componente {x}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{}}>


                  <Box sx={{ display: "flex", width: "100%", height: "40vh", flexDirection: "column", }}>
                    <Box sx={{ width: "100%", height: "50%", justifyContent: "space-evenly", display: "flex", alignItems: "center" }}>
                      <TextField
                        label={"Resumen Narrativo"}
                        onChange={(c) => {
                          componenteValor[x - 1].resumen = c.target.value;
                          asignarCV();
                        }}
                      />
                      <TextField
                        label={"Indicador"}
                        onChange={(c) => {
                          componenteValor[x - 1].indicador = c.target.value;
                          asignarCV();
                        }}
                      />
                      <TextField
                        label={"Fórmula"}
                        onChange={(c) => {
                          componenteValor[x - 1].formula = c.target.value;
                          asignarCV();
                        }}
                      />
                    </Box>
                    <Box sx={{ width: "100%", height: "50%", justifyContent: "space-evenly", display: "flex", alignItems: "center" }}>

                      <TextField
                        label={"Frecuencia"}
                        onChange={(c) => {
                          componenteValor[x - 1].frecuencia = c.target.value;
                          asignarCV();
                        }}
                      />
                      <TextField
                        label={"Medios de Verificación"}
                        //value={componenteValor[x - 1].medios}
                        onChange={(c) => {
                          componenteValor[x - 1].medios = c.target.value;
                          asignarCV();
                        }}
                      />
                      <TextField
                        label={"Supuestos"}
                        onChange={(c) => {
                          componenteValor[x - 1].supuestos = c.target.value;
                          asignarCV();
                        }}
                      />
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
             
            );
          })}
        </Box>

      </Box>
    </Box>

  );
};