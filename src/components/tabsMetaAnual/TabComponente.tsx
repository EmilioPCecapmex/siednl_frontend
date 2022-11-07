import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
} from "@mui/material";
import { IComponente } from "../tabsMir/IComponente";
import { IComponenteMA } from "./Interfaces";

export const TabComponenteMA = ({
  show,
  valoresComponenteMAFnc,
  noComponentes,
  valoresComponente,
  valoresComponenteMir,
}: {
  show: boolean;
  valoresComponenteMAFnc: Function;
  noComponentes: number[];
  valoresComponente: Array<IComponenteMA>;
  valoresComponenteMir: Array<IComponente>;
}) => {
  const [componentSelect, setComponentSelect] = useState(1);

  const [componentesValues, setComponentesValues] = useState<
    Array<IComponenteMA>
  >([]);

  useEffect(() => {
    if (show === true) {
      let comp: IComponenteMA[] = [];

      noComponentes.map((x, index) => {
        return comp.push({
          componentes: valoresComponenteMir[index].componentes,
          metaAnual: "",
          lineaBase: "",
          metasPorFrecuencia: [
            {
              semestre1: "",
              semestre2: "",
              trimestre1: "",
              trimestre2: "",
              trimestre3: "",
              trimestre4: "",
            },
          ],
          valorNumerador: "",
          valorDenominador: "",
          sentidoDelIndicador: "",
          unidadResponsable: "",
          descIndicador: "",
          descNumerador: "",
          descDenominador: "",
        });
      });

      setComponentesValues(comp);
    }
  }, [show]);

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
          {noComponentes.map((item) => {
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
                  onClick={() => {
                    setComponentSelect(item);
                    console.log(item);
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
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",

              width: "100%",
              height: "20%",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            <TextField
              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Meta anual 2023"}
              value={componentesValues[componentSelect - 1]?.metaAnual}
              onChange={(c) => {
                componentesValues[componentSelect - 1].metaAnual =
                  c.target.value;
                setComponentesValues([...componentesValues]);
                valoresComponenteMAFnc([...componentesValues]);
              }}
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
            />
            <TextField
              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Linea Base 2021"}
              value={componentesValues[componentSelect - 1]?.lineaBase}
              onChange={(c) => {
                componentesValues[componentSelect - 1].lineaBase =
                  c.target.value;
                setComponentesValues([...componentesValues]);
                valoresComponenteMAFnc([...componentesValues]);
              }}
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
            />
            <TextField
              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Valor del númerador"}
              value={componentesValues[componentSelect - 1]?.valorNumerador}
              onChange={(c) => {
                componentesValues[componentSelect - 1].valorNumerador =
                  c.target.value;
                setComponentesValues([...componentesValues]);
                valoresComponenteMAFnc([...componentesValues]);
              }}
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
            />
            <TextField
              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Valor del denominador"}
              value={componentesValues[componentSelect - 1]?.valorDenominador}
              onChange={(c) => {
                componentesValues[componentSelect - 1].valorDenominador =
                  c.target.value;
                setComponentesValues([...componentesValues]);
                valoresComponenteMAFnc([...componentesValues]);
              }}
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
            />
            <TextField
              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Sentido del indicador"}
              value={
                componentesValues[componentSelect - 1]?.sentidoDelIndicador
              }
              onChange={(c) => {
                componentesValues[componentSelect - 1].sentidoDelIndicador =
                  c.target.value;
                setComponentesValues([...componentesValues]);
                valoresComponenteMAFnc([...componentesValues]);
              }}
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
            />
          </Box>

          {valoresComponenteMir[
            componentSelect - 1
          ].frecuencia.toLowerCase() === "trimestral" ? (
            <Box
              sx={{
                display: "flex",

                width: "100%",
                height: "20%",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              <TextField
                rows={3}
                multiline
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={"Trimestre 1"}
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.trimestre1
                }
                onChange={(c) => {
                  componentesValues[
                    componentSelect - 1
                  ].metasPorFrecuencia[0].trimestre1 = c.target.value;
                  setComponentesValues([...componentesValues]);
                valoresComponenteMAFnc([...componentesValues]);
                }}
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
              />
              <TextField
                rows={3}
                multiline
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={"Trimestre 2"}
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.trimestre2
                }
                onChange={(c) => {
                  componentesValues[
                    componentSelect - 1
                  ].metasPorFrecuencia[0].trimestre2 = c.target.value;
                  setComponentesValues([...componentesValues]);
                valoresComponenteMAFnc([...componentesValues]);
                }}
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
              />
              <TextField
                rows={3}
                multiline
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={"Trimestre 3"}
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.trimestre3
                }
                onChange={(c) => {
                  componentesValues[
                    componentSelect - 1
                  ].metasPorFrecuencia[0].trimestre3 = c.target.value;
                  setComponentesValues([...componentesValues]);
                valoresComponenteMAFnc([...componentesValues]);
                }}
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
              />
              <TextField
                rows={3}
                multiline
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={"Trimestre 4"}
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.trimestre4
                }
                onChange={(c) => {
                  componentesValues[
                    componentSelect - 1
                  ].metasPorFrecuencia[0].trimestre4 = c.target.value;
                  setComponentesValues([...componentesValues]);
                valoresComponenteMAFnc([...componentesValues]);
                }}
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
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",

                width: "100%",
                height: "20%",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              <TextField
                rows={3}
                multiline
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={"Semestre 1"}
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.semestre1
                }
                onChange={(c) => {
                  componentesValues[
                    componentSelect - 1
                  ].metasPorFrecuencia[0].semestre1 = c.target.value;
                  setComponentesValues([...componentesValues]);
                valoresComponenteMAFnc([...componentesValues]);
                }}
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
              />
              <TextField
                rows={3}
                multiline
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={"Semestre 2"}
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.semestre2
                }
                onChange={(c) => {
                  componentesValues[
                    componentSelect - 1
                  ].metasPorFrecuencia[0].semestre2 = c.target.value;
                  setComponentesValues([...componentesValues]);
                valoresComponenteMAFnc([...componentesValues]);
                }}
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
              />
            </Box>
          )}

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
              rows={5}
              multiline
              sx={{ width: "40%", boxShadow: 2 }}
              variant={"filled"}
              label={"Unidad responsable de reportar el indicador"}
              value={componentesValues[componentSelect - 1]?.unidadResponsable}
              onChange={(c) => {
                componentesValues[componentSelect - 1].unidadResponsable =
                  c.target.value;
                setComponentesValues([...componentesValues]);
                valoresComponenteMAFnc([...componentesValues]);
              }}
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
            />
            <TextField
              rows={5}
              multiline
              sx={{ width: "40%", boxShadow: 2 }}
              variant={"filled"}
              label={"Descripción del indicador"}
              value={componentesValues[componentSelect - 1]?.descIndicador}
              onChange={(c) => {
                componentesValues[componentSelect - 1].descIndicador =
                  c.target.value;
                setComponentesValues([...componentesValues]);
                valoresComponenteMAFnc([...componentesValues]);
              }}
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
            />
          </Box>
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
              rows={5}
              multiline
              sx={{ width: "40%", boxShadow: 2 }}
              variant={"filled"}
              label={"Descripción del numerador"}
              value={componentesValues[componentSelect - 1]?.descNumerador}
              onChange={(c) => {
                componentesValues[componentSelect - 1].descNumerador =
                  c.target.value;
                setComponentesValues([...componentesValues]);
                valoresComponenteMAFnc([...componentesValues]);
              }}
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
            />
            <TextField
              rows={5}
              multiline
              sx={{ width: "40%", boxShadow: 2 }}
              variant={"filled"}
              label={"Descripcion del denominador"}
              value={componentesValues[componentSelect - 1]?.descDenominador}
              onChange={(c) => {
                componentesValues[componentSelect - 1].descDenominador =
                  c.target.value;
                setComponentesValues([...componentesValues]);
                valoresComponenteMAFnc([...componentesValues]);
                console.log(componentesValues);
                
              }}
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
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
