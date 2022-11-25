import {
  Box,
  Typography,
  Button,
  Checkbox,
  List,
  Divider,
  ListItemButton,
  TextField,
  FormControlLabel,
  Radio,
  Autocomplete,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Tooltip } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
export function TabFinPropositoFT() {
  //este expor necesita variables

  {
    /*----------Funcionalidad del texto escrito por el usuario----------*/
  }

  const [showFin, setShowFin] = useState(true);
  const [showProposito, setShowProposito] = useState(false);
  const [checked, setChecked] = React.useState(true);

  const [showSeleccionEstrategica, setSeleccionEstrategica] = useState(true);
  const [showDeGestion, setShowDeGestion] = useState(false);

  const [tipodeIndicador, setTipoDeIndicador] = useState();
  const [dimension, setDimension] = useState();
  const [unidadDeMedida, setUnidadDeMedida] = useState();
  const [claridad, setClaridad] = useState();
  const [relevancia, setRelevancia] = useState();
  const [economia, setEconomia] = useState();
  const [montoreable, setMontoreable] = useState();
  const [adecuado, setAdecuado] = useState();
  const [aporteMarginal, setAporteMarginal] = useState();


  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",

    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));
  {/*Esto es un json de prueba*/}
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },]
{/*Esto es un json de prueba*/}

  {
    /*----------Funcionalidad del texto escrito por el usuario----------*/
  }

  {
    return (
      <Box
        visibility={
          {
            /*show ? "visible" : "hidden"*/
          }
        }
        position="absolute"
        sx={{
          display: "flex",
          width: "75vw",
          height: "75vh",
          boxShadow: 10,
          borderRadius: 5,
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        Aqui va un FormulaDialog
        <Box
          sx={{
            width: "100%",
            display: "flex",
            height: "7vh",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* Botones Componentes */}
          <Typography
            sx={{
              mr: "1vw",
              fontFamily: "MontserratSemiBold",
              fontSize: "1.2vw",
            }}
          >
            {showFin ? "FIN" : null}
            {showProposito ? "PROPÓSITO" : null}
          </Typography>
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
            <Box
              sx={{
                height: "10vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Divider />
              <ListItemButton
                selected={showFin}
                onClick={() => {
                  setShowFin(!showFin);
                  setShowProposito(false);
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
                <Typography
                  sx={{
                    fontFamily: "MontserratMedium",
                    textTransform: "uppercase",
                  }}
                >
                  Fin
                </Typography>
              </ListItemButton>
              <Divider />
            </Box>
            {/*--------------------------------Aqui esta el boton de Fin--------------------------*/}
            <Box
              sx={{
                height: "10vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <ListItemButton
                selected={showProposito}
                onClick={() => {
                  setShowProposito(!showProposito);
                  setShowFin(false);
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
                <Typography
                  sx={{
                    fontFamily: "MontserratMedium",
                    textTransform: "uppercase",
                  }}
                >
                  Propósito
                </Typography>
              </ListItemButton>
              <Divider />
            </Box>
            {/*--------------------------------Aqui esta el boton de  proposito--------------------------*/}
          </List>
          {/*--------------------------------Aqui termina la lista y empieza el diseño de Fin--------------------------*/}
          {showFin ? (
            <>
              <Box>

                
                <FormGroup sx={{ gridRow: "1", width: "20vw", mt: "6vh" }}>
                <Typography>TIPO DE INDICADOR</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>SELECCIÓN ESTRATEGICO</Typography>
                    <AntSwitch
                      defaultChecked
                      inputProps={{ "aria-label": "ant design" }}
                    />
                    <Typography>DE GESTIÓN</Typography>
                  </Stack>
                  <TextField
                  
                  />
                  <Autocomplete
          disabled={false}
          disablePortal
          size="small"
          options={top100Films}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.label}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.label}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"OBJETIVO ODS"}
              variant="standard"
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratSemiBold",
                  fontSize: ".8vw",
                },
              }}
              sx={{
                "& .MuiAutocomplete-input": {
                  fontFamily: "MontserratRegular",
                },
              }}
            ></TextField>
          )}onChange={() =>
            {}
          }
          
          
        />
                </FormGroup>

              </Box>
            </>
          ) : null}

          {showProposito ? (
            <>
              <Box></Box>
            </>
          ) : null}
        </Box>
      </Box>
    );
  }
}
