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
import { grid } from "@mui/system";
import { IEncabezado } from "./TabEncabezado";

export function TabResumen({ show, encabezado }: { show: boolean, encabezado:Array<IEncabezado> }) {
  const [componentes, setComponentes] = useState([1, 2, 3, 4, 5, 6]);
  const [actividades, setActividades] = useState([1, 2, 3, 4, 5, 6]);

  const [tabSelect, setTabSelect] = useState(100);
  const [activitySelect, setActivitySelect] = useState(1);

  const [openComponentes, setOpenComponentes] = useState(false);
  const [openActividades, setOpenActividades] = useState(false);

  useEffect(()=>{
  //  console.log(encabezado[0].eje);
  },[encabezado])

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
            padding: "0",
            // overflow:'hidden',
            // overflowY:'scroll',
            // "&::-webkit-scrollbar": {
            //   width: ".3vw",
            // },
            // "&::-webkit-scrollbar-thumb": {
            //   backgroundColor: "rgba(0,0,0,.5)",
            //   outline: "1px solid slategrey",
            //   borderRadius: 10,
            // },
          }}
        >
          <ListItemButton
            key={100}
            selected={100 === tabSelect ? true : false}
            onClick={() => setTabSelect(100)}
            sx={{
              "&.Mui-selected ": {
                backgroundColor: "#c4a57b",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#cbcbcb",
              },
              borderRadius: "20px 0 0 0",
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
            onClick={() => setTabSelect(101)}
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
            onClick={() => setTabSelect(102)}
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
              setTabSelect(103);
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
              borderRadius: openComponentes ? 0 : "0 0 0 20px",
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
                      setTabSelect(item);
                    }}
                    sx={{
                      "&.Mui-selected ": {
                        backgroundColor: "#c4a57b",
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: "#cbcbcb",
                      },
                      borderRadius: "0 20px 0 20px",
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
          width: "65vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {tabSelect === 100 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "repeat(5, 1fr)",
              gridTemplateColumns: "repeat(2, 1fr)",
              width: "60vw",
              height: "60vh",
            }}
          >

            <TextField
              variant="standard"
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
              rows={3}
              value={'encabezado[0].ejercicioFiscal || '}
              sx={{ width: "25vw" }}
              label={"Ejercicio Fiscal"}
            />
            <TextField
              variant="standard"
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
              rows={3}
              value={'encabezado[0]'}
              sx={{ width: "25vw" }}
              label={"Institución"}
            />
            <TextField
              variant="standard"
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
              rows={3}
              value="3"
              sx={{ width: "25vw" }}
              label={"Programa"}
            />
            <TextField
              variant="standard"
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
              rows={3}
              value="3"
              sx={{ width: "25vw" }}
              label={"Eje"}
            />
            <TextField
              variant="standard"
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
              rows={3}
              value="3"
              sx={{ width: "25vw" }}
              label={"Temática"}
            />
            <TextField
              variant="standard"
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
              rows={3}
              value="3"
              sx={{ width: "25vw" }}
              label={"Objetivo"}
            />
            <TextField
              variant="standard"
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
              rows={3}
              value="3"
              sx={{ width: "25vw" }}
              label={"Estrategia"}
            />
            <TextField
              variant="standard"
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
              rows={3}
              value="3"
              sx={{ width: "25vw" }}
              label={"Lineas de acción"}
            />
            <TextField
              variant="standard"
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
              rows={3}
              value="3"
              sx={{ width: "25vw" }}
              label={"Beneficiario"}
            />

          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default TabResumen;
