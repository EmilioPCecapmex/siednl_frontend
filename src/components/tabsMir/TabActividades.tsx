import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
  List,
  ListItemButton,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from '@mui/material/Divider';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { IComponente } from "./IComponente";
import { ICValor } from "./ICValor";
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
//funcion main
export const TabActividades = ({
  show,
  componentes,
  asignarCValor,
}: {
  show: boolean;
  componentes: number[];
  asignarCValor: Function;
}) => {
  // business logic-------------------------------------------------------------------------------
  const [actividades, setActividades] = React.useState([1, 2]);

  const [componenteActividad, setComponenteActividad] = useState([
    {
      componentes: componentes.map((x) => actividades),
    },
  ]);

  useEffect(() => {
    if (show === true && componentes.length > cValor[0].componentes.length) {
      let restantes = componentes.length - cValor[0].componentes.length;
      let prevState = [...cValor];
      for (let index = 1; index <= restantes; index++) {
        prevState[0].componentes.push({
          actividades: [
            {
              resumen: "",
              indicador: "",
              frecuencia: "",
              formula: "",
              medios: "",
              supuestos: "",
            },
            {
              resumen: "",
              indicador: "",
              frecuencia: "",
              formula: "",
              medios: "",
              supuestos: "",
            },
          ],
        });
        setCValor(prevState);
      }
    } else if (
      show === true &&
      componentes.length < cValor[0].componentes.length
    ) {
      let prevState = [...cValor];
      let restantes = cValor[0].componentes.length - componentes.length;
      for (let index = 1; index <= restantes; index++) {
        prevState[0].componentes.pop();
        setCValor(prevState);
      }
      setComponenteSelect(0);
    }
  }, [show]);


  const [cValor, setCValor] = useState(
    componenteActividad.map((item) => {
      return {
        componentes: item.componentes.map((x) => {
          return {
            actividades: x.map((c) => {
              return {
                resumen: "",
                indicador: "",
                formula: "",
                frecuencia: "",
                medios: "",
                supuestos: "",
              };
            }),
          };
        }),
      };
    })
  );

  useEffect(() => {
    asignarCValor(cValor);

  }, [cValor, componentes])


  const agregarAFnc = (index: number) => {
    if (actividades.length + 1 < 7) {
      let a = [...actividades];
      a.push(actividades.length + 1);
      setActividades(a);
      let xArray = [...componenteActividad];
      xArray[0]["componentes"][index] = [
        ...actividades,
        actividades.length + 1,
      ];
      setComponenteActividad(xArray);
      if (cValor[0].componentes[index].actividades.length < 6) {
        let prevState = [...cValor];
        prevState[0].componentes[index].actividades.push({
          resumen: "",
          indicador: "",
          frecuencia: "",
          formula: "",
          medios: "",
          supuestos: "",
        });
        setCValor(prevState);
      }
    }
  };

  const eliminarAFnc = () => {
    let act = cValor[0].componentes[componenteSelect].actividades;
    let v = act.length;

    if (v > 2) {
      let a = actividades;
      a.pop();
      setActividades(a);
      let prevState = [...cValor];
      prevState[0].componentes[componenteSelect].actividades.pop();
      setCValor(prevState);
    }
  };

  const [componenteSelect, setComponenteSelect] = React.useState(0);
  const [actividadSelect, setActividadSelect] = React.useState(0);


  const [open, setOpen] = React.useState(0);

  const handleClickComponente = (index: number) => {
    setOpen(index);
  };

  

  //return main
  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "75vw",
        height: "77vh",
        boxShadow: 10,
        borderRadius: 5,
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {/* Botones Componentes */}
        <IconButton
          onClick={() => {
            agregarAFnc(componenteSelect);
          }}
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>

        <IconButton onClick={() => eliminarAFnc()}>
          <DoDisturbOnIcon fontSize="large" />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <List
          sx={{
            width: "10vw",
            height: "65vh",
            borderRight: "solid",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderColor: "#BCBCBC",
            "&::-webkit-scrollbar": {
              width: ".3vw",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.5)",
              outline: "1px solid slategrey",
              borderRadius: 10,
            },
          }}
        >
          {componentes.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Divider />
                <List>

                  <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                  >
                    <ListItemButton
                      selected={item == componenteSelect+1 ? true : false}
                      key={item}
                      onClick={() => {
                        setComponenteSelect((item - 1));

                        setActividades([1, 2]);
                        let xArray = [...componenteActividad];

                        xArray[0]["componentes"][item] = xArray[0]["componentes"][
                          item - 1
                        ] || [1, 2];

                        setComponenteActividad(xArray);

                        handleClickComponente(item);
                        setActividadSelect(0);
                        
                      }}

                      
                      
                      

                      sx={{
                        "&.Mui-selected ": {
                          backgroundColor: "#c4a57b",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "#cbcbcb",
                        },
                      }}
                    >
                      <Typography sx={{ fontFamily: "MontserratMedium"}}>
                      Componente {item}
                      </Typography>
                      
                      {open===item? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open===item} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>

                        {cValor[0].componentes[componenteSelect].actividades.map(
                          (value, x) => {
                            return (

                              <ListItemButton 
                              key={x}
                              selected={x == actividadSelect ? true : false}
                              
                              onClick={()=>{
                                setActividadSelect(x);
                              }}
                              
                              sx={{
                                pl: 4,
                                "&.Mui-selected ": {
                                  backgroundColor: "#efd8b9",
                                },
                                "&.Mui-selected:hover": {
                                  backgroundColor: "#cbcbcb",
                                },
                              }}
                              >
                                
                                Actividad {x+1}
                                
                              </ListItemButton>
                            );})}
                      </List>
                    </Collapse>
                  </List>

                </List>


                <Divider />
              </Box>
            );
          })}


        </List>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Textfields box */}
          <Box
            sx={{
              width: "95%",
              height: "90%",
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
            }}
          >
            {/* Renderizado de Actividades */}

            {/* <Box>
              <Typography>Actividad {actividadSelect + 1} - Componente {parseInt(componenteSelect) + 1}</Typography>
            </Box> */}
            <Box
                      sx={{
                        width: "100%",
                        height: "40%",
                        justifyContent: "space-evenly",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      
                      <TextField
                        variant="filled"
                        multiline
                        InputLabelProps={{
                          style: {
                            fontFamily: "MontserratMedium",
                          },
                        }}
                        InputProps={{
                          style: {
                            fontFamily: "MontserratRegular",
                          },
                        }}
                        rows={4}
                        sx={{ width: "30%" }}
                        label={"Resumen Narrativo"}
                        value={
                          cValor[0].componentes[componenteSelect]
                            .actividades[actividadSelect].resumen
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                          componenteSelect
                          ].actividades[actividadSelect].resumen = c.target.value;
                          setCValor(y);
                        }}
                      />
                      <TextField
                      variant="filled"
                      multiline
                      InputLabelProps={{
                        style: {
                          fontFamily: "MontserratMedium",
                        },
                      }}
                      InputProps={{
                        style: {
                          fontFamily: "MontserratRegular",
                        },
                      }}
                      rows={4}
                      sx={{ width: "30%" }}
                      label={"Indicador"}
                        value={
                          cValor[0].componentes[componenteSelect]
                            .actividades[actividadSelect].indicador
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                            componenteSelect
                          ].actividades[actividadSelect].indicador = c.target.value;
                          setCValor(y);
                        }}
                      />
                      <TextField
                      variant="filled"
                      multiline
                      InputLabelProps={{
                        style: {
                          fontFamily: "MontserratMedium",
                        },
                      }}
                      InputProps={{
                        style: {
                          fontFamily: "MontserratRegular",
                        },
                      }}
                      rows={4}
                      sx={{ width: "30%" }}
                        label={"Fórmula"}
                        value={
                          cValor[0].componentes[componenteSelect]
                            .actividades[actividadSelect].formula
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                            componenteSelect
                          ].actividades[actividadSelect].formula = c.target.value;
                          setCValor(y);
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: "40%",
          
                        justifyContent: "space-evenly",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                      variant="filled"
                      multiline
                      InputLabelProps={{
                        style: {
                          fontFamily: "MontserratMedium",
                        },
                      }}
                      InputProps={{
                        style: {
                          fontFamily: "MontserratRegular",
                        },
                      }}
                      rows={4}
                      sx={{ width: "30%" }}
                        label={"Frecuencia"}
                        value={
                          cValor[0].componentes[componenteSelect]
                            .actividades[actividadSelect].frecuencia
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                            componenteSelect
                          ].actividades[actividadSelect].frecuencia = c.target.value;
                          setCValor(y);
                        }}
                      />
                      <TextField
                      variant="filled"
                      multiline
                      InputLabelProps={{
                        style: {
                          fontFamily: "MontserratMedium",
                        },
                      }}
                      InputProps={{
                        style: {
                          fontFamily: "MontserratRegular",
                        },
                      }}
                      rows={4}
                      sx={{ width: "30%" }}
                        label={"Medios de Verificación"}
                        value={
                          cValor[0].componentes[componenteSelect]
                            .actividades[actividadSelect].medios
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                            componenteSelect
                          ].actividades[actividadSelect].medios = c.target.value;
                          setCValor(y);
                        }}
                      />
                      <TextField
                      variant="filled"
                      multiline
                      InputLabelProps={{
                        style: {
                          fontFamily: "MontserratMedium",
                        },
                      }}
                      InputProps={{
                        style: {
                          fontFamily: "MontserratRegular",
                        },
                      }}
                      rows={4}
                      sx={{ width: "30%" }}
                        label={"Supuestos"}
                        value={
                          cValor[0].componentes[componenteSelect]
                            .actividades[actividadSelect].supuestos
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                            componenteSelect
                          ].actividades[actividadSelect].supuestos = c.target.value;
                          setCValor(y);
                        }}
                      />
                    </Box>

          </Box>

        </Box>
      </Box>
    </Box>
  );
};
