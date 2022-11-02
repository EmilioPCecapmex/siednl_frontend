import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  List,
  ListItemButton,
  Divider,
} from "@mui/material";

export function TabFinPropositoMA({
  show,
  resumenFin,
  resumenProposito,
  cargaFin,
  cargaProposito,
}: {
  show: boolean;
  resumenFin: Function;
  resumenProposito: Function;
  cargaFin: Array<IFin>;
  cargaProposito: Array<IProposito>;
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

  const [finMA, setFinMA] = useState({
    metaAnual: '',
    lineaBase: '',
    valorNumerador: "",
    valorDenominador: "",
    orden: "",
    unidadResponsable: "",
    descIndicador: "",
    descNumerador: "",
    descDenominador: "",
  });

  const [proposito, setProposito] = useState({
    resumen: "",
    indicador: "",
    formula: "",
    frecuencia: "",
    medios_verificacion: "",
    supuestos: "",
  });

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
            fontSize: "1.5vw",
          }}
        >
          {showFin ? "Fin" :  "Propósito" }
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
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                width: "90%",
                alignItems: "center",
                justifyItems: "center",
  
              }}
            >
              
              <TextField
                rows={4}
                disabled
                multiline
                sx={{ width: "90%", boxShadow: 2 }}
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
                label={"Indicador"}
                value={fin.indicador}
              />
              <TextField
                rows={4}
                disabled
                multiline
                variant="filled"
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  readOnly: true,
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Fórmula"}
                value={fin.formula}
              />

              <TextField
                rows={4}
                disabled
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Frecuencia"}
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
                value={fin.frecuencia}
              />
              <Box>
                <TextField
                rows={2}
                multiline
                variant="filled"
                sx={{ width: "30%", boxShadow: 2 }}
                label={"Meta Anual 2023"}
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
                error={parseInt(finMA.metaAnual)  < 0 || parseInt(finMA.metaAnual) > 100 || isNaN(parseInt(finMA.metaAnual)) ? true : false}
                helperText={
                  parseInt(finMA.metaAnual)  < 0 || parseInt(finMA.metaAnual)  > 100  || isNaN(parseInt(finMA.metaAnual))  ? "Valor debe ser entre 0 y 100 "
                    : null
                }
                onChange={(v)=> setFinMA({...finMA, metaAnual: v.target.value})}
                value={finMA.metaAnual}
              />
              <TextField
                rows={2}
                multiline
                variant="filled"
                sx={{ width: "30%", boxShadow: 2, ml:2 }}
                label={"Línea Base 2021"}
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

                error={parseInt(finMA.lineaBase)  < 0 || parseInt(finMA.lineaBase) > 100 || isNaN(parseInt(finMA.lineaBase)) ? true : false}
                helperText={
                  parseInt(finMA.lineaBase)  < 0 || parseInt(finMA.lineaBase)  > 100  || isNaN(parseInt(finMA.lineaBase))  ? "Valor debe ser entre 0 y 100 "
                    : null
                }
                onChange={(v)=> setFinMA({...finMA, lineaBase: v.target.value})}
                value={finMA.lineaBase }
              />
              </Box>
              
              <TextField
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Orden"}
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
                error={finMA.orden.toLowerCase() !== "ascendente" && finMA.orden !== "normal" && finMA.orden !== "descendente" ? true : false}
                helperText={
                  finMA.orden.toLowerCase() !== "ascendente" && finMA.orden !== "normal" && finMA.orden !== "descendente" ? "Incluir tipo de orden: Ascendente, Descendente ó Normal. "
                    : null
                }
                onChange={(v)=> setFinMA({...finMA, orden: v.target.value})}
                value={finMA.orden}
              />
              <TextField
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Orden"}
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
                error={finMA.orden.toLowerCase() !== "ascendente" && finMA.orden !== "normal" && finMA.orden !== "descendente" ? true : false}
                helperText={
                  finMA.orden.toLowerCase() !== "ascendente" && finMA.orden !== "normal" && finMA.orden !== "descendente" ? "Incluir tipo de orden: Ascendente, Descendente ó Normal. "
                    : null
                }
                onChange={(v)=> setFinMA({...finMA, orden: v.target.value})}
                value={finMA.orden}
              />
              <TextField
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Orden"}
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
                error={finMA.orden.toLowerCase() !== "ascendente" && finMA.orden !== "normal" && finMA.orden !== "descendente" ? true : false}
                helperText={
                  finMA.orden.toLowerCase() !== "ascendente" && finMA.orden !== "normal" && finMA.orden !== "descendente" ? "Incluir tipo de orden: Ascendente, Descendente ó Normal. "
                    : null
                }
                onChange={(v)=> setFinMA({...finMA, orden: v.target.value})}
                value={finMA.orden}
              />
            </Box>
          </>
        ) : 
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                width: "90%",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <TextField
                rows={4}
                disabled
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Resumen Narrativo"}
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
                value={proposito.resumen}
              />

              <TextField
                rows={4}
                disabled
                multiline
                sx={{ width: "90%", boxShadow: 2 }}
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
                label={"Indicador"}
                value={proposito.indicador}
              />
              <TextField
                rows={4}
                disabled
                multiline
                variant="filled"
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  readOnly: true,
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Fórmula"}
                value={proposito.formula}
              />

              <TextField
                rows={4}
                disabled
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Frecuencia"}
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
                value={proposito.frecuencia}
              />
              <TextField
                rows={4}
                disabled
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
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
                label={"Medios de Verificación"}
                value={proposito.medios_verificacion}
              />
              <TextField
                rows={4}
                disabled
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Supuestos"}
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
                value={proposito.supuestos}
              />
            </Box>
          </>}
      </Box>
    </Box>
  );
}

export default TabFinPropositoMA;

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
