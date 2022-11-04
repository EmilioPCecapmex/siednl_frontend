import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  List,
  ListItemButton,
  Button,
  Divider,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import  {IFinMA}  from "./IFin";
import  {IPropositoMA}  from "./IFin";

export function TabFinPropositoMR({
  show,
  resumenFin,
  resumenProposito,
  cargaFin,
  cargaProposito,
  resumenFinMa,
  resumenPropositoMa
}: {
  show: boolean;
  resumenFin: Function;
  resumenProposito: Function;
  cargaFin: Array<IFin>;
  cargaProposito: Array<IProposito>;
  resumenFinMa: Function;
  resumenPropositoMa: Function;
}) {
  const [tabFin, setTabFin] = useState([
    {
      resumen: "",
      indicador: "",
      formula: "",
      frecuencia: "",
      medios: "",
      supuestos: "",
    },
  ]);

  const [tabProposito, setTabProposito] = useState([
    {
      resumen: "",
      indicador: "",
      formula: "",
      frecuencia: "",
      medios_verificacion: "",
      supuestos: "",
    },
  ]);

  const [fin, setFin] = useState({
    resumen: "",
    indicador: "",
    formula: "",
    frecuencia: "",
    medios: "",
    supuestos: "",
  });

  const [proposito, setProposito] = useState({
    resumen: "",
    indicador: "",
    formula: "",
    frecuencia: "",
    medios_verificacion: "",
    supuestos: "",
  });

  const [ValueFin, setValueFin] = useState <Array<IFinMA>>([]);
  const [ValueProposito, setValueProposito] = useState <Array<IPropositoMA>>([]);


  const [showFin, setShowFin] = useState(true);
  const [showProposito, setShowProposito] = useState(false);

  useEffect(() => {
    setTabFin([
      {
        resumen: fin.resumen,
        indicador: fin.indicador,
        formula: fin.formula,
        frecuencia: fin.frecuencia,
        medios: fin.medios,
        supuestos: fin.supuestos,
      },
    ]);
    setTabProposito([
      {
        resumen: proposito.resumen,
        indicador: proposito.indicador,
        formula: proposito.formula,
        frecuencia: proposito.frecuencia,
        medios_verificacion: proposito.medios_verificacion,
        supuestos: proposito.supuestos,
      },
    ]);
  }, [fin, proposito]);

  useEffect(() => {
    setFin({
      resumen: cargaFin[0]?.resumen,
      indicador: cargaFin[0]?.indicador,
      formula: cargaFin[0]?.formula,
      frecuencia: cargaFin[0]?.frecuencia,
      medios: cargaFin[0]?.medios,
      supuestos: cargaFin[0]?.supuestos,
    });

    setTimeout(() => {
      setProposito({
        resumen: cargaProposito[0]?.resumen,
        indicador: cargaProposito[0]?.indicador,
        formula: cargaProposito[0]?.formula,
        frecuencia: cargaProposito[0]?.frecuencia,
        medios_verificacion: cargaProposito[0]?.medios_verificacion,
        supuestos: cargaProposito[0]?.supuestos,
      });
    }, 1000);
  }, [cargaFin, cargaProposito]);

  useEffect(() => {
    resumenFin(tabFin);
    resumenProposito(tabProposito);
  }, [tabFin, tabProposito]);

  useEffect(() => {
    resumenFinMa(ValueFin);
    resumenPropositoMa(ValueProposito);
  }, [tabFin, tabProposito]);

  const [openFin, setOpenFin] = useState(false);
  const handleClickOpen = () => {
    setOpenFin(false);
  };



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
      {showFin || showProposito ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            height: "7vh",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <InfoOutlinedIcon
            onClick={() => (showFin ? setOpenFin(true) : null)}
            fontSize="large"
            sx={{ cursor: "pointer" }}
          ></InfoOutlinedIcon>
          <Typography
            sx={{
              mr: "1vw",
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
            }}
          >
            {showFin ? "Fin" : null}
            {showProposito ? "Propósito" : null}
          </Typography>{" "}
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            height: "7vh",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {" "}
        </Box>
      )}


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
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Fin
              </Typography>
            </ListItemButton>

            <Divider />
          </Box>
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
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Propósito
              </Typography>
            </ListItemButton>
            <Divider />
          </Box>

        </List>

        {showFin ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "95%",
              height: "100%",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",

                width: "100%",
                height: "30%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                rows={3}
                multiline
                sx={{ width: "15%", boxShadow: 2 }}
                variant={"filled"}
                label={"Meta anual 2023"}
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
                onChange={(c) => {
                  ValueFin[0].metaAnual= c.target.value ;
                  setValueFin([...ValueFin]);
                }}

                value={ValueFin[0]?.metaAnual}

              /><TextField

                rows={3}
                multiline
                sx={{ width: "15%", boxShadow: 2 }}
                variant={"filled"}
                label={"Linea Base 2021"}
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
                onChange={(c) => {
                  ValueFin[0].lineaBase= c.target.value ;
                  setValueFin([...ValueFin]);
                }}

                value={ValueFin[0]?.lineaBase}

              /><TextField

                rows={3}
                multiline
                sx={{ width: "15%", boxShadow: 2 }}
                variant={"filled"}
                label={"Valor númerador"}
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
                onChange={(c) => {
                  ValueFin[0].valorNumerador= c.target.value ;
                  setValueFin([...ValueFin]);
                }}

                value={ValueFin[0]?.valorNumerador}

              /><TextField

                rows={3}
                multiline
                sx={{ width: "15%", boxShadow: 2 }}
                variant={"filled"}
                label={"Valor del denominador"}
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
                onChange={(c) => {
                  ValueFin[0].valorDenominador= c.target.value ;
                  setValueFin([...ValueFin]);
                }}

                value={ValueFin[0]?.valorDenominador}

              /><TextField

                rows={3}
                multiline
                sx={{ width: "15%", boxShadow: 2 }}
                variant={"filled"}
                label={"Sentido del indicador"}
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
                onChange={(c) => {
                  ValueFin[0].orden= c.target.value ;
                  setValueFin([...ValueFin]);
                }}

                value={ValueFin[0]?.orden}

              />
            </Box>
            <Box
              sx={{
                display: "flex",

                width: "100%",
                height: "33%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                rows={5}
                multiline
                sx={{ width: "40%", boxShadow: 2 }}
                variant={"filled"}
                label={"Unidad responsable de reportar el indicador"}
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
                onChange={(c) => {
                  ValueFin[0].unidadResponsable= c.target.value ;
                  setValueFin([...ValueFin]);
                }}

                value={ValueFin[0]?.unidadResponsable}
              />
              <TextField
                rows={5}
                multiline
                sx={{ width: "40%", boxShadow: 2 }}
                variant={"filled"}
                label={"Descripción del indicador"}
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
                onChange={(c) => {
                  ValueFin[0].descIndicador= c.target.value ;
                  setValueFin([...ValueFin]);
                }}

                value={ValueFin[0]?.descIndicador}
                

              />
            </Box>
            <Box
              sx={{
                display: "flex",

                width: "100%",
                height: "33%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                rows={5}
                multiline
                sx={{ width: "40%", boxShadow: 2 }}
                variant={"filled"}
                label={"Descripción del numerador"}
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
                onChange={(c) => {
                  ValueFin[0].descNumerador= c.target.value ;
                  setValueFin([...ValueFin]);
                }}

                value={ValueFin[0]?.descNumerador}

              />
              <TextField
                rows={5}
                multiline
                sx={{ width: "40%", boxShadow: 2 }}
                variant={"filled"}
                label={"Descripcion del denominador"}
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
                onChange={(c) => {
                  ValueFin[0].descDenominador= c.target.value ;
                  setValueFin([...ValueFin]);
                }}

                value={ValueFin[0]?.descDenominador}


              />
            </Box>
          </Box>
        ) : null}

        {showProposito ? (
          
          
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "95%",
              height: "100%",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",

                width: "100%",
                height: "30%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField

                rows={3}
                multiline
                sx={{ width: "15%", boxShadow: 2 }}
                variant={"filled"}
                label={"Meta anual 2023"}
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
                onChange={(c) => {
                  ValueProposito[0].metaAnual= c.target.value ;
                  setValueProposito([...ValueProposito]);
                }}

                value={ValueProposito[0]?.metaAnual}

              /><TextField

                rows={3}
                multiline
                sx={{ width: "15%", boxShadow: 2 }}
                variant={"filled"}
                label={"Linea Base 2021"}
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
                onChange={(c) => {
                  ValueProposito[0].lineaBase= c.target.value ;
                  setValueProposito([...ValueProposito]);
                }}

                value={ValueProposito[0]?.lineaBase}

              /><TextField

                rows={3}
                multiline
                sx={{ width: "15%", boxShadow: 2 }}
                variant={"filled"}
                label={"Valor númerador"}
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
                onChange={(c) => {
                  ValueProposito[0].valorNumerador= c.target.value ;
                  setValueProposito([...ValueProposito]);
                }}

                value={ValueProposito[0]?.valorNumerador}

              /><TextField

                rows={3}
                multiline
                sx={{ width: "15%", boxShadow: 2 }}
                variant={"filled"}
                label={"Valor del denominador"}
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
                onChange={(c) => {
                  ValueProposito[0].valorDenominador= c.target.value ;
                  setValueProposito([...ValueProposito]);
                }}

                value={ValueProposito[0]?.valorDenominador}

              /><TextField

                rows={3}
                multiline
                sx={{ width: "15%", boxShadow: 2 }}
                variant={"filled"}
                label={"Sentido del indicador"}
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
                onChange={(c) => {
                  ValueProposito[0].orden= c.target.value ;
                  setValueProposito([...ValueProposito]);
                }}

                value={ValueProposito[0]?.orden}

              />


            </Box>
            <Box
              sx={{
                display: "flex",

                width: "100%",
                height: "33%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField

                rows={5}
                multiline
                sx={{ width: "40%", boxShadow: 2 }}
                variant={"filled"}
                label={"Unidad responsable de reportar el indicador"}
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
                onChange={(c) => {
                  ValueProposito[0].unidadResponsable= c.target.value ;
                  setValueProposito([...ValueProposito]);
                }}

                value={ValueProposito[0]?.unidadResponsable}
              />
              <TextField

                rows={5}
                multiline
                sx={{ width: "40%", boxShadow: 2 }}
                variant={"filled"}
                label={"Descripción del indicador"}
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
                onChange={(c) => {
                  ValueProposito[0].descIndicador= c.target.value ;
                  setValueProposito([...ValueProposito]);
                }}

                value={ValueProposito[0]?.descIndicador}
                

              />
            </Box>
            <Box
              sx={{
                display: "flex",

                width: "100%",
                height: "33%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >

              <TextField

                rows={5}
                multiline
                sx={{ width: "40%", boxShadow: 2 }}
                variant={"filled"}
                label={"Descripción del numerador"}
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
                onChange={(c) => {
                  ValueProposito[0].descNumerador= c.target.value ;
                  setValueProposito([...ValueProposito]);
                }}

                value={ValueProposito[0]?.descNumerador}

              />
              <TextField

                rows={5}
                multiline
                sx={{ width: "40%", boxShadow: 2 }}
                variant={"filled"}
                label={"Descripcion del denominador"}
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
                onChange={(c) => {
                  ValueProposito[0].descDenominador= c.target.value ;
                  setValueProposito([...ValueProposito]);
                }}

                value={ValueProposito[0]?.descDenominador}


              />
            </Box>
          </Box>



        
        ) : null}
      </Box>
    </Box>
  );
}

export default TabFinPropositoMR;

export interface IIndicadores {
  Id: string;
  TipoDeIndicador: string;
  FechaCreacion: string;
  CreadoPor: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  Deleted: number;
}

export interface IFrecuencias {
  Id: string;
  Frecuencia: string;
  FechaCreacion: string;
  CreadoPor: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  Deleted: number;
}

export interface IFin {
  resumen: string;
  indicador: string;
  formula: string;
  frecuencia: string;
  medios: string;
  supuestos: string;
}
export interface IProposito {
  resumen: string;
  indicador: string;
  formula: string;
  frecuencia: string;
  medios_verificacion: string;
  supuestos: string;
}
