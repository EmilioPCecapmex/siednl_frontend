import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
} from "@mui/material";
import * as React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios from "axios";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IComponente } from "./IComponente";
import { ICValor } from "./ICValor";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

export function TabResumen({ show, componentes, componenteValor, cValor, }: { show: boolean; componentes: number[]; componenteValor: IComponente[]; cValor: ICValor[]; }) {
  //
  //setComponentes(retornarComponentes());
  const [actividades, setActividades] = useState([1, 2, 3, 4, 5, 6]);

  const [tabSelect, setTapSelect] = useState(103);
  const [componenteSelect, setComponenteSelect] = useState(0);
  const [actividadSelect, setActividadSelect] = useState(0);
  

  const [openComponentes, setOpenComponentes] = useState(false);
  const [openActividades, setOpenActividades] = useState(false);

  useEffect(() => {
    console.log(cValor[0]?.componentes)
  }, [cValor])


  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "75vw",
        height: "85vh",
        boxShadow: 10,
        borderRadius: 5,
        flexDirection: "row",
        backgroundColor: "#fff",
      }}
    >
      <Box>
        <List
          sx={{
            width: "10vw",
            height: "85vh",
            borderRight: "1px solid",
            display: "flex",
            flexDirection: "column",
            borderColor: "#BCBCBC",
          }}
        >
          <ListItemButton
            key={100}
            selected={100 === tabSelect ? true : false}
            onClick={() => setTapSelect(100)}
            sx={{
              "&.Mui-selected ": {
                backgroundColor: "#c4a57b",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#cbcbcb",
              },
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Encabezado
            </Typography>
          </ListItemButton>

          <Divider />

          <ListItemButton
            key={101}
            selected={101 === tabSelect ? true : false}
            onClick={() => setTapSelect(101)}
            sx={{
              "&.Mui-selected ": {
                backgroundColor: "#c4a57b",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#cbcbcb",
              },
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>Fin</Typography>
          </ListItemButton>

          <Divider />

          <ListItemButton
            key={102}
            selected={102 === tabSelect ? true : false}
            onClick={() => setTapSelect(102)}
            sx={{
              "&.Mui-selected ": {
                backgroundColor: "#c4a57b",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#cbcbcb",
              },
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Proposito
            </Typography>
          </ListItemButton>

          <Divider />

          <ListItemButton
            key={103}
            selected={103 === tabSelect ? true : false}
            onClick={() => {
              setTapSelect(103);
              setOpenComponentes(!openComponentes);
            }}
            sx={{
              fontFamily: "MontserratMedium",
              "&.Mui-selected ": {
                backgroundColor: "#c4a57b",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#cbcbcb",
              },
            }}
          >
            <ListItemText primary="Componentes" />
            {openComponentes ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openComponentes} timeout="auto" unmountOnExit>
            <List disablePadding>

              {componentes.map((item) => {
                return (
                  <ListItemButton
                    selected={item === tabSelect ? true : false}
                    key={item}
                    onClick={() => {
                      setComponenteSelect(item - 1);
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
                    <ListItemText primary={`Componente ${item}`} />

                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
        </List>
      </Box>


      <Box
        sx={{
          width: "65vw", display: "flex",
          flexDirection: "column",
        }}>
        {/* mi box*/}
        <Box sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "center",
              // backgroundColor: ""
            }}
          >

            <Accordion
              sx={{
                width: "100%",
                height: "100%",
                justifyContent: "space-evenly",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                //     backgroundColor:"pink"

              }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Componente {componenteSelect + 1}</Typography>
              </AccordionSummary>

              <AccordionDetails >
                <Box sx={{ display: "flex", justifyContent: "space-evenly", flexDirection: "column", }}>
                  <Box
                    sx={{
                      width: "100%",
                      
                      justifyContent: "space-evenly",
                      display: "flex",
                      alignItems: "center",
                      //   backgroundColor: "brown"
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
                      value={componenteValor[componenteSelect].resumen}

                    />
                    <TextField
                      multiline
                      rows={4}
                      variant="filled"
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
                      sx={{ width: "30%" }}
                      label={"Indicador"}
                      value={componenteValor[componenteSelect].indicador}

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
                      value={componenteValor[componenteSelect].formula}

                    />
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "40%",

                      justifyContent: "space-evenly",
                      display: "flex",
                      alignItems: "center",
                      // backgroundColor: "pink"
                    }}
                  >
                    <TextField
                      multiline
                      variant="filled"
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
                      value={componenteValor[componenteSelect].frecuencia}

                    />
                    <TextField
                      multiline
                      variant="filled"
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
                      value={componenteValor[componenteSelect].medios}

                    />
                    <TextField
                      variant="filled"
                      multiline
                      rows={4}
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
                      sx={{ width: "30%" }}
                      label={"Supuestos"}
                      value={componenteValor[componenteSelect].supuestos}

                    />
                  </Box>

                </Box>

              </AccordionDetails>
            </Accordion>




          </Box>
          {/* Actividades */}


          <Box>
            <Box>
              <ButtonGroup variant="text" aria-label="text button group">
                {cValor[0]?.componentes[componenteSelect].actividades.map((value,x) => {
                  return (
                    <Button onClick={()=>{ setActividadSelect(x) }}>Actividad No. {x+1}</Button>
                  )
                })}
              </ButtonGroup>
            </Box>
            {/* Textfield Actividades */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "center",
                // backgroundColor: ""
              }}
            >



              <Box sx={{ display: "flex", justifyContent: "space-evenly", flexDirection: "column",backgroundColor:"pink" }}>
                <Box
                  sx={{
                    width: "100%",
                    height: "0%",
                    justifyContent: "space-evenly",
                    display: "flex",
                    alignItems: "center",
                    //   backgroundColor: "brown"
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
                    value={cValor[0]?.componentes[componenteSelect].actividades[actividadSelect].resumen}

                  />
                  <TextField
                    multiline
                    rows={4}
                    variant="filled"
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
                    sx={{ width: "30%" }}
                    label={"Indicador"}
                    value={cValor[0]?.componentes[componenteSelect].actividades[actividadSelect].indicador}

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
                    value={cValor[0]?.componentes[componenteSelect].actividades[actividadSelect].formula}

                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "40%",

                    justifyContent: "space-evenly",
                    display: "flex",
                    alignItems: "center",
                    // backgroundColor: "pink"
                  }}
                >
                  <TextField
                    multiline
                    variant="filled"
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
                    value={cValor[0]?.componentes[componenteSelect].actividades[actividadSelect].frecuencia}

                  />
                  <TextField
                    multiline
                    variant="filled"
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
                    value={cValor[0]?.componentes[componenteSelect].actividades[actividadSelect].medios}

                  />
                  <TextField
                    variant="filled"
                    multiline
                    rows={4}
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
                    sx={{ width: "30%" }}
                    label={"Supuestos"}
                    value={cValor[0]?.componentes[componenteSelect].actividades[actividadSelect].supuestos}

                  />
                </Box>

              </Box>

            </Box>
          </Box>



        </Box>

      </Box>



    </Box>
  );
}

export default TabResumen;
