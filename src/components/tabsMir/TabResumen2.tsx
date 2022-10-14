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
  Button,
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
import { IComponente } from "./IComponente";
import { ICValor } from "./ICValor";
import { IFin, IProposito } from "./TabFinProposito";

export function TabResumen2({
  show,
  encabezado,
  fin,
  proposito, componentes, componenteValor, cValor, asignarCValor
}: {
  show: boolean;
  encabezado: Array<IEncabezado>;
  fin: Array<IFin>;
  proposito: Array<IProposito>; componentes: number[]; componenteValor: Array<IComponente>; cValor: Array<ICValor>; asignarCValor: Function;
}) {

  const[componenteActual,setComponenteActual]=useState(0);

  useEffect(() => {
    //  console.log(encabezado[0].eje);
  }, [encabezado]);

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
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column',
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          width: "90%",
          border: .1,
          borderColor: '#909090',
          height: "80%",
          overflow: 'auto',
          borderRadius: 1,
          "&::-webkit-scrollbar": {
            width: ".3vw",
            mt: 1,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.5)",
            outline: "1px solid slategrey",
            borderRadius: 1,
          },
        }}
      >
        <Box sx={{ p: 5, display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontFamily: "MontserratBold", borderBottom: 1 }}>
            Datos Generales
          </Typography>

          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Ejercicio Fiscal:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet consectetur.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Institución:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet consectetur.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Programa:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet consectetur.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Eje:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet consectetur.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Temática:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet adipisicing elit.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Objetivo:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet facere harum velit.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Estrategia:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet adipisicing elit.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Lineas de Acción:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet facere harum velit.
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Beneficiario:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              Lorem ipsum dolor sit amet facere harum velit.
            </Typography>
          </Box>
          <Typography sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}>
            Fin
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Resumen Narrativo:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Indicador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Fórmula:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Frecuencia:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Medios de Verificación:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptate.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Supuestos:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eiu.
            </Typography>
          </Box>
          <Typography sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}>
            Propósito
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Resumen Narrativo:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Indicador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Fórmula:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatu.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Frecuencia:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Medios de Verificación:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Supuestos:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues.
            </Typography>
          </Box>
          <Typography sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}>
            Componentes
          </Typography>


          {componentes.map((index) => {
            return (<Box>
              <Typography sx={{ fontFamily: "MontserratMedium", borderBottom: 1, mt: 5, textAlign: 'center' }}>
                Componente {index}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                  Resumen Narrativo:
                </Typography>
                <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                  {componenteValor[index - 1].resumen}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                  Indicador:
                </Typography>
                <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {componenteValor[index - 1].indicador}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                  Fórmula:
                </Typography>
                <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {componenteValor[index - 1].formula}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                  Frecuencia:
                </Typography>
                <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {componenteValor[index - 1].frecuencia}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                  Medios de Verificación:
                </Typography>
                <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {componenteValor[index - 1].medios}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                  Supuestos:
                </Typography>
                <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {componenteValor[index - 1].supuestos}
                 </Typography>
              </Box>
            </Box>);
          })}

          <Typography sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}>
            Actividades
          </Typography>

          {cValor[0]?.componentes.map((item,indexComponentes)=>{
              
            return(
              
              item.actividades.map((value,indexActividades)=>{return(
              <Box>
                
                <Typography sx={{ fontFamily: "MontserratMedium", borderBottom: 1, mt: 5, textAlign: 'center' }}>
            Componente {indexComponentes+1}  - Actividad {indexActividades + 1}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Resumen Narrativo:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {cValor[0].componentes[indexComponentes].actividades[indexActividades].resumen}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Indicador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {cValor[0].componentes[indexComponentes].actividades[indexActividades].indicador}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Fórmula:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {cValor[0].componentes[indexComponentes].actividades[indexActividades].formula}
             </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Frecuencia:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {cValor[0].componentes[indexComponentes].actividades[indexActividades].frecuencia}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Medios de Verificación:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {cValor[0].componentes[indexComponentes].actividades[indexActividades].medios}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Supuestos:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {cValor[0].componentes[indexComponentes].actividades[indexActividades].supuestos}
            </Typography>
          </Box>
              </Box>
              
              );}) 
            );

          })}


        </Box>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', mt: 2 }}>
        <Button color="error" variant="outlined">
          Cancelar
        </Button>
        <Button color="warning" variant="outlined">
          Borrador
        </Button>
        <Button color="success" variant="outlined">
          Enviar
        </Button>
      </Box>
    </Box>
  );
}

export default TabResumen2;
