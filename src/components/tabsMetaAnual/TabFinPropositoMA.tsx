import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  List,
  ListItemButton,
  Divider,
  FormControl,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IFinMA } from "./IFin";
import { IPropositoMA } from "./IFin";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";

export function TabFinPropositoMA({
  show,
  resumenFinMa,
  resumenPropositoMa,
  showMirFnc,
  showFnc,
  MA,
}: {
  show: boolean;
  resumenFinMa: Function;
  resumenPropositoMa: Function;
  showMirFnc: Function;
  showFnc: Function;
  MA: string;
}) {
  let jsonMA = MA === "" ? "" : JSON.parse(MA);

  const [valueFin, setValueFin] = useState<Array<IFinMA>>([
    {
      metaAnual: jsonMA?.fin?.metaAnual || "",
      lineaBase: jsonMA?.fin?.lineaBase || "",
      valorNumerador: jsonMA?.fin?.valorNumerador || "",
      valorDenominador: jsonMA?.fin?.valorDenominador || "",
      sentidoDelIndicador: jsonMA?.fin?.sentidoDelIndicador || "",
      unidadResponsable: jsonMA?.fin?.unidadResponsable || "",
      descIndicador: jsonMA?.fin?.descIndicador || "",
      descNumerador: jsonMA?.fin?.descNumerador || "",
      descDenominador: jsonMA?.fin?.descDenominador || "",
    },
  ]);

  //Si se usa la interfaz pero no entiendo como por ahora
  const [valueProposito, setValueProposito] = useState<Array<IPropositoMA>>([
    {
      metaAnual: jsonMA?.proposito?.metaAnual || "",
      lineaBase: jsonMA?.proposito?.lineaBase || "",
      valorNumerador: jsonMA?.proposito?.valorNumerador || "",
      valorDenominador: jsonMA?.proposito?.valorDenominador || "",
      sentidoDelIndicador: jsonMA?.proposito?.sentidoDelIndicador || "",
      unidadResponsable: jsonMA?.proposito?.unidadResponsable || "",
      descIndicador: jsonMA?.proposito?.descIndicador || "",
      descNumerador: jsonMA?.proposito?.descNumerador || "",
      descDenominador: jsonMA?.proposito?.descDenominador || "",
    },
  ]);

  const [showFin, setShowFin] = useState(true);
  const [showProposito, setShowProposito] = useState(false);

  useEffect(() => {
    resumenFinMa(valueFin);
    resumenPropositoMa(valueProposito);
  }, [valueFin, valueProposito]);

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
          onClick={() => {
            showMirFnc(true);
            showFin ? showFnc("Fin") : showFnc("Proposito");
          }}
        >
          <InfoOutlinedIcon
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
                type="number"
                sx={{ width: "15%", boxShadow: 2}}
                variant={"filled"}
                label={"META ANUAL 2023"}
                error={
                  parseFloat(valueFin[0].metaAnual) < 0 ||
                  parseFloat(valueFin[0].metaAnual) > 100 ||
                  (isNaN(parseFloat(valueFin[0].metaAnual)) &&
                    valueFin[0].metaAnual !== "")
                    ? true
                    : false
                }
                helperText={
                  parseFloat(valueFin[0].metaAnual) < 0 ||
                  parseFloat(valueFin[0].metaAnual) > 100 ||
                  (isNaN(parseFloat(valueFin[0].metaAnual)) &&
                    valueFin[0].metaAnual !== "")
                    ? "Introducir valor entre 0 y 100. "
                    : null
                }
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
                  valueFin[0].metaAnual = c.target.value;
                  setValueFin([...valueFin]);
                }}
                value={valueFin[0]?.metaAnual}
              />
              <TextField
                rows={3}
                type="number"
                sx={{ width: "15%", boxShadow: 2 }}
                variant={"filled"}
                label={"Linea Base 2021"}
                error={
                  parseFloat(valueFin[0].lineaBase) < 0 ||
                  parseFloat(valueFin[0].lineaBase) > 100 ||
                  (isNaN(parseFloat(valueFin[0].lineaBase)) &&
                    valueFin[0].lineaBase !== "")
                    ? true
                    : false
                }
                helperText={
                  parseFloat(valueFin[0].lineaBase) < 0 ||
                  parseFloat(valueFin[0].lineaBase) > 100 ||
                  (isNaN(parseFloat(valueFin[0].lineaBase)) &&
                    valueFin[0].lineaBase !== "")
                    ? "Introducir valor entre 0 y 100. "
                    : null
                }
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
                  valueFin[0].lineaBase = c.target.value;
                  setValueFin([...valueFin]);
                }}
                value={valueFin[0]?.lineaBase}
              />
              <TextField
                rows={3}
                type="number"

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
                  valueFin[0].valorNumerador = c.target.value;
                  setValueFin([...valueFin]);
                }}
                value={valueFin[0]?.valorNumerador}
              />
              <TextField
                rows={3}
                type="number"

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
                  valueFin[0].valorDenominador = c.target.value;
                  setValueFin([...valueFin]);
                }}
                value={valueFin[0]?.valorDenominador}
              />

              <FormControl
                sx={{
                  width: "15%",
                  height: "70%",
                  backgroundColor: "#f0f0f0",
                  boxShadow: 2,
                  fontFamily: "MontserratMedium",
                  justifyContent: "space-evenly",
                  alignItems: "flex-start",
                }}
              >
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: 12,
                  }}
                >
                  SENTIDO DEL INDICADOR
                </FormLabel>
                <FormControlLabel
                  value={"ASCENDENTE"}
                  label={
                    <Typography
                      sx={{ fontSize: 12, fontFamily: "MontserratMedium" }}
                    >
                      ASCENDENTE
                    </Typography>
                  }
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={
                    <Radio
                      checked={
                        valueFin[0]?.sentidoDelIndicador === "ASCENDENTE"
                      }
                      onChange={(c) => {
                        valueFin[0].sentidoDelIndicador = c.target.value;
                        setValueFin([...valueFin]);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"DESCENDENTE"}
                  label={
                    <Typography
                      sx={{ fontSize: 12, fontFamily: "MontserratMedium" }}
                    >
                      DESCENDENTE
                    </Typography>
                  }
                  control={
                    <Radio
                      checked={
                        valueFin[0].sentidoDelIndicador === "DESCENDENTE"
                      }
                      onChange={(c) => {
                        valueFin[0].sentidoDelIndicador = c.target.value;
                        setValueFin([...valueFin]);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"NORMAL"}
                  label={
                    <Typography
                      sx={{ fontSize: 12, fontFamily: "MontserratMedium" }}
                    >
                      NORMAL
                    </Typography>
                  }
                  control={
                    <Radio
                      checked={valueFin[0].sentidoDelIndicador === "NORMAL"}
                      onChange={(c) => {
                        valueFin[0].sentidoDelIndicador = c.target.value;
                        setValueFin([...valueFin]);
                      }}
                    />
                  }
                />
              </FormControl>
              
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
                  valueFin[0].unidadResponsable = c.target.value;
                  setValueFin([...valueFin]);
                }}
                value={valueFin[0]?.unidadResponsable}
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
                  valueFin[0].descIndicador = c.target.value;
                  setValueFin([...valueFin]);
                }}
                value={valueFin[0]?.descIndicador}
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
                  valueFin[0].descNumerador = c.target.value;
                  setValueFin([...valueFin]);
                }}
                value={valueFin[0]?.descNumerador}
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
                  valueFin[0].descDenominador = c.target.value;
                  setValueFin({ ...valueFin });
                }}
                value={valueFin[0]?.descDenominador}
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
                type="number"

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
                  valueProposito[0].metaAnual = c.target.value;
                  setValueProposito([...valueProposito]);
                }}
                value={valueProposito[0]?.metaAnual}
              />
              <TextField
                rows={3}
                type="number"

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
                  valueProposito[0].lineaBase = c.target.value;
                  setValueProposito([...valueProposito]);
                }}
                value={valueProposito[0]?.lineaBase}
              />
              <TextField
                rows={3}
                type="number"

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
                  valueProposito[0].valorNumerador = c.target.value;
                  setValueProposito([...valueProposito]);
                }}
                value={valueProposito[0]?.valorNumerador}
              />
              <TextField
                rows={3}
                type="number"

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
                  valueProposito[0].valorDenominador = c.target.value;
                  setValueProposito([...valueProposito]);
                }}
                value={valueProposito[0]?.valorDenominador}
              />
              <FormControl
                sx={{
                  width: "15%",
                  height: "70%",
                  backgroundColor: "#f0f0f0",
                  boxShadow: 2,
                  fontFamily: "MontserratMedium",
                  justifyContent: "space-evenly",
                  alignItems: "flex-start",
                }}
              >
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: 12,
                  }}
                >
                  SENTIDO DEL INDICADOR
                </FormLabel>
                <FormControlLabel
                  value={"ASCENDENTE"}
                  label={
                    <Typography
                      sx={{ fontSize: 12, fontFamily: "MontserratMedium" }}
                    >
                      ASCENDENTE
                    </Typography>
                  }
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={
                    <Radio
                      checked={
                        valueProposito[0]?.sentidoDelIndicador === "ASCENDENTE"
                      }
                      onChange={(c) => {
                        valueProposito[0].sentidoDelIndicador = c.target.value;
                        setValueProposito([...valueProposito]);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"DESCENDENTE"}
                  label={
                    <Typography
                      sx={{ fontSize: 12, fontFamily: "MontserratMedium" }}
                    >
                      DESCENDENTE
                    </Typography>
                  }
                  control={
                    <Radio
                      checked={
                        valueProposito[0]?.sentidoDelIndicador === "DESCENDENTE"
                      }
                      onChange={(c) => {
                        valueProposito[0].sentidoDelIndicador = c.target.value;
                        setValueProposito([...valueProposito]);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"NORMAL"}
                  label={
                    <Typography
                      sx={{ fontSize: 12, fontFamily: "MontserratMedium" }}
                    >
                      NORMAL
                    </Typography>
                  }
                  control={
                    <Radio
                      checked={
                        valueProposito[0]?.sentidoDelIndicador === "NORMAL"
                      }
                      onChange={(c) => {
                        valueProposito[0].sentidoDelIndicador = c.target.value;
                        setValueProposito([...valueProposito]);
                      }}
                    />
                  }
                />
              </FormControl>
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
                  valueProposito[0].unidadResponsable = c.target.value;
                  setValueProposito([...valueProposito]);
                }}
                value={valueProposito[0]?.unidadResponsable}
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
                  valueProposito[0].descIndicador = c.target.value;
                  setValueProposito([...valueProposito]);
                }}
                value={valueProposito[0]?.descIndicador}
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
                  valueProposito[0].descNumerador = c.target.value;
                  setValueProposito([...valueProposito]);
                }}
                value={valueProposito[0]?.descNumerador}
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
                  valueProposito[0].descDenominador = c.target.value;
                  setValueProposito([...valueProposito]);
                }}
                value={valueProposito[0]?.descDenominador}
              />
            </Box>
          </Box>
        ) : null}
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
