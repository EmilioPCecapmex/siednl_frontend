import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IComponente, IComponenteMA } from "../tabsMir/IComponente";

export const TabComponentesMA = ({
  show,
  asignarComponenteMA,
  asignarComponenteValorMA,
  componentesMir,
  componenteValorMir,
  componentesMA,
  componenteValorMA,
}: {
  show: boolean;
  asignarComponenteMA: Function;
  asignarComponenteValorMA: Function;
  componentesMir: number[];
  componenteValorMir: Array<IComponente>;
  componentesMA: number[];
  componenteValorMA: Array<IComponenteMA>;
}) => {
  const [componentSelect, setComponentSelect] = useState(1);

  const [valorMA, setValorMA] = useState<Array<IComponenteMA>>(
    componentesMir.map((x, index) => {
      return {
        componentes: "C" + (index + 1),
        metaAnual: "",
        lineaBase: "",
        metasPorFrecuencia: [],
        valorNumerador: "",
        valorDenominador: "",
        orden: "",
        unidadResponsable: "",
        descIndicador: "",
        descNumerador: "",
        descDenominador: "",
      };
    })
  );

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
          height: "7vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
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
          Componente {componentSelect}
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
          {componentesMir.map((item) => {
            return (
              <Box
                key={item}
                sx={{
                  height: "10vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Divider />

                <ListItemButton
                  selected={item === componentSelect ? true : false}
                  key={item}
                  onClick={() => setComponentSelect(item)}
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
                    Componente {item}
                  </Typography>
                </ListItemButton>

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
            justifyContent: "top",
          }}
        >
          {/* MIR */}
          <Box
            sx={{
              width: "100%",
              height: "40%",
              justifyContent: "space-evenly",
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Accordion
              sx={{
                width: "90%",
                background: "#eaeaea",
                fontFamily: "montserratBold",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Indicador, Fórmula y Frecuencia
              </AccordionSummary>
              <AccordionDetails
                sx={{ display: "flex", justifyContent: "space-evenly" }}
              >
                <TextField
                  disabled
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
                  sx={{ width: "30%", boxShadow: 2 }}
                  label={"Indicador"}
                  value={componenteValorMir[componentSelect - 1].indicador}
                />
                <TextField
                  disabled
                  variant="filled"
                  multiline
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
                  rows={4}
                  sx={{ width: "30%", boxShadow: 2 }}
                  label={"Fórmula"}
                  value={componenteValorMir[componentSelect - 1].formula}
                />
                <TextField
                  disabled
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
                  sx={{ width: "30%", boxShadow: 2 }}
                  label={"Frecuencia"}
                  value={componenteValorMir[componentSelect - 1].frecuencia}
                />
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* META ANUAL */}
          <Box
            sx={{
              width: "100%",
              height: "40%",
              justifyContent: "space-evenly",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Box
              sx={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TextField
                multiline
                rows={1}
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
                sx={{ width: "30%", boxShadow: 2 }}
                label={"Meta Anual 2023"}
                error={
                  parseInt(valorMA[componentSelect - 1].metaAnual) < 0.0 ||
                  parseInt(valorMA[componentSelect - 1].metaAnual) > 100.0 ||
                  isNaN(parseInt(valorMA[componentSelect - 1].metaAnual))
                    ? true
                    : false
                }
                helperText={
                  parseInt(valorMA[componentSelect - 1].metaAnual) < 0 ||
                  parseInt(valorMA[componentSelect - 1].metaAnual) > 100 ||
                  isNaN(parseInt(valorMA[componentSelect - 1].metaAnual))
                    ? "Valor debe ser entre 0 y 100 "
                    : null
                }
                onChange={(c) => {
                  valorMA[componentSelect - 1].metaAnual = c.target.value;
                  asignarComponenteValorMA([...valorMA]);
                }}
                value={valorMA[componentSelect - 1].metaAnual}
              />
              <TextField
                multiline
                rows={1}
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
                sx={{ width: "30%", boxShadow: 2 }}
                label={"Línea Base 2021"}
                error={
                  parseInt(valorMA[componentSelect - 1].lineaBase) < 0.0 ||
                  parseInt(valorMA[componentSelect - 1].lineaBase) > 100.0 ||
                  isNaN(parseInt(valorMA[componentSelect - 1].lineaBase))
                    ? true
                    : false
                }
                helperText={
                  parseInt(valorMA[componentSelect - 1].lineaBase) < 0 ||
                  parseInt(valorMA[componentSelect - 1].lineaBase) > 100 ||
                  isNaN(parseInt(valorMA[componentSelect - 1].lineaBase))
                    ? "Valor debe ser entre 0 y 100 "
                    : null
                }
                onChange={(c) => {
                  valorMA[componentSelect - 1].lineaBase = c.target.value;
                  asignarComponenteValorMA([...valorMA]);
                }}
                value={valorMA[componentSelect - 1].lineaBase}
              />
              <TextField
                multiline
                rows={1}
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
                sx={{ width: "30%", boxShadow: 2 }}
                label={"Valor Numerador"}
                value={valorMA[componentSelect - 1].metaAnual}
              />
              <TextField
                multiline
                rows={1}
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
                sx={{ width: "30%", boxShadow: 2 }}
                label={"Valor denominador"}
                value={valorMA[componentSelect - 1].lineaBase}
              />
              <TextField
                multiline
                rows={1}
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
                sx={{ width: "30%", boxShadow: 2 }}
                label={"Orden"}
                onChange={(c) => {
                  valorMA[componentSelect - 1].orden = c.target.value;
                  asignarComponenteValorMA([...valorMA]);
                }}
                value={valorMA[componentSelect - 1].orden}
              />
              <TextField
                multiline
                rows={1}
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
                sx={{ width: "30%", boxShadow: 2 }}
                label={"Valor numerador"}
                onChange={(c) => {
                  valorMA[componentSelect - 1].valorNumerador = c.target.value;
                  asignarComponenteValorMA([...valorMA]);
                }}
                value={valorMA[componentSelect - 1].valorNumerador}
              />
              <TextField
                multiline
                rows={1}
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
                sx={{ width: "30%", boxShadow: 2 }}
                label={"Valor denominador"}
                onChange={(c) => {
                  valorMA[componentSelect - 1].valorDenominador =
                    c.target.value;
                  asignarComponenteValorMA([...valorMA]);
                }}
                value={valorMA[componentSelect - 1].valorDenominador}
              />
            </Box>

            {componenteValorMir[
              componentSelect - 1
            ].frecuencia.toLowerCase() === "semestral" ? (
              <Box sx={{ display: "flex", width: "90%" }}>
                <TextField
                  label={"Semestre I"}
                  multiline
                rows={1}
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
                sx={{ width: "30%", boxShadow: 2 }}
                error={
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.semestre1) < 0.0 ||
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.semestre1) > 100.0 ||
                  isNaN(parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.semestre1))
                    ? true
                    : false
                }
                helperText={
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.semestre1) < 0 ||
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.semestre1) > 100 ||
                  isNaN(parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.semestre1))
                    ? "Valor debe ser entre 0 y 100 "
                    : null
                }
                onChange={(c) => {
                  valorMA[componentSelect - 1].metasPorFrecuencia[0].semestre1 = c.target.value;
                  asignarComponenteValorMA([...valorMA]);
                }}
                value={valorMA[componentSelect - 1].metasPorFrecuencia[0]?.semestre1}
                />
                <TextField
                  
                  label={"Semestre II"}
                  multiline
                rows={1}
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
                sx={{ width: "30%", boxShadow: 2 }}
                error={
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.semestre2) < 0.0 ||
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.semestre2) > 100.0 ||
                  isNaN(parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.semestre2))
                    ? true
                    : false
                }
                helperText={
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.semestre2) < 0 ||
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.semestre2) > 100 ||
                  isNaN(parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.semestre2))
                    ? "Valor debe ser entre 0 y 100 "
                    : null
                }
                onChange={(c) => {
                  valorMA[componentSelect - 1].metasPorFrecuencia[0].semestre2 = c.target.value;
                  asignarComponenteValorMA([...valorMA]);
                }}
                value={valorMA[componentSelect - 1].metasPorFrecuencia[0]?.semestre2}
                />
              </Box>
            ) : (
              <Box sx={{ display: "flex", width: "90%" }}>
                <TextField
                label={"Trimestre I"}
                multiline
                rows={1}
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
                sx={{ width: "30%", boxShadow: 2 }}
                error={
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre1) < 0.0 ||
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre1) > 100.0 ||
                  isNaN(parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre1))
                    ? true
                    : false
                }
                helperText={
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre1) < 0 ||
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre1) > 100 ||
                  isNaN(parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre1))
                    ? `${valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre1}`
                    : null
                }
                onChange={(c) => {
                  valorMA[componentSelect - 1].metasPorFrecuencia[0].trimestre1 = c.target.value;
                  asignarComponenteValorMA([...valorMA]);
                }}
                value={valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre1}
                />
                <TextField
                label={"Trimestre II"}
                multiline
                rows={1}
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
                sx={{ width: "30%", boxShadow: 2 }}
                error={
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre2) < 0.0 ||
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre2) > 100.0 ||
                  isNaN(parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre2))
                    ? true
                    : false
                }
                helperText={
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre2) < 0 ||
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre2) > 100 ||
                  isNaN(parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre2))
                    ? "Valor debe ser entre 0 y 100 "
                    : null
                }
                onChange={(c) => {
                  valorMA[componentSelect - 1].metasPorFrecuencia[0].trimestre2 = c.target.value;
                  asignarComponenteValorMA([...valorMA]);
                }}
                value={valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre2}
                />
                <TextField
                label={"Trimestre III"}
                multiline
                rows={1}
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
                sx={{ width: "30%", boxShadow: 2 }}
                error={
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre3) < 0.0 ||
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre3) > 100.0 ||
                  isNaN(parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre3))
                    ? true
                    : false
                }
                helperText={
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre3) < 0 ||
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre3) > 100 ||
                  isNaN(parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre3))
                    ? "Valor debe ser entre 0 y 100 "
                    : null
                }
                onChange={(c) => {
                  valorMA[componentSelect - 1].metasPorFrecuencia[0].trimestre3 = c.target.value;
                  asignarComponenteValorMA([...valorMA]);
                }}
                value={valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre3}
                />
                <TextField
                label={"Trimestre IIII"}
                multiline
                rows={1}
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
                sx={{ width: "30%", boxShadow: 2 }}
                error={
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre4) < 0.0 ||
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre4) > 100.0 ||
                  isNaN(parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre4))
                    ? true
                    : false
                }
                helperText={
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre4) < 0 ||
                  parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre4) > 100 ||
                  isNaN(parseInt(valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre4))
                    ? "Valor debe ser entre 0 y 100 "
                    : null
                }
                onChange={(c) => {
                  valorMA[componentSelect - 1].metasPorFrecuencia[0].trimestre4 = c.target.value;
                  asignarComponenteValorMA([...valorMA]);
                }}
                value={valorMA[componentSelect - 1].metasPorFrecuencia[0]?.trimestre4}
                />
              </Box>
            )}

            <Box sx={{ display: "flex", width: "90%" }}>
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
                sx={{ width: "90%", boxShadow: 2, gridRow: "3" }}
                label={"Descripción del indicador"}
                onChange={(c) => {
                  valorMA[componentSelect - 1].descIndicador = c.target.value;
                  asignarComponenteValorMA([...valorMA]);
                }}
                value={valorMA[componentSelect - 1].descIndicador}
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
                sx={{ width: "90%", boxShadow: 2, gridRow: "3" }}
                label={"Descripción del numerador"}
                onChange={(c) => {
                  valorMA[componentSelect - 1].descNumerador = c.target.value;
                  asignarComponenteValorMA([...valorMA]);
                }}
                value={valorMA[componentSelect - 1].descNumerador}
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
                sx={{ width: "90%", boxShadow: 2, gridRow: "3" }}
                label={"Descripción del denominador"}
                onChange={(c) => {
                  valorMA[componentSelect - 1].descDenominador = c.target.value;
                  asignarComponenteValorMA([...valorMA]);
                }}
                value={valorMA[componentSelect - 1].descDenominador}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
