import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
  FormControl,
} from "@mui/material";
import { IComponente } from "../tabsMir/IComponente";
import { IComponenteMA } from "./Interfaces";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";

export const TabComponenteMA = ({
  show,
  valoresComponenteMAFnc,
  noComponentes,
  valoresComponenteMir,
  showMirFnc,
  showFnc,
  MA,
}: {
  show: boolean;
  valoresComponenteMAFnc: Function;
  noComponentes: number[];
  valoresComponenteMir: Array<IComponente>;
  showMirFnc: Function;
  showFnc: Function;
  MA: string;
}) => {
  const [componentSelect, setComponentSelect] = useState(1);

  const [componentesValues, setComponentesValues] = useState<
    Array<IComponenteMA>
  >([]);

  let jsonMA = MA === "" ? "" : JSON.parse(MA);

  useEffect(() => {
    // if (show === true) {
    let comp: IComponenteMA[] = [];

    noComponentes.map((x, index) => {
      return comp.push({
        componentes: "C" + (index + 1),
        metaAnual: MA === "" ? "" : jsonMA?.componentes[index]?.metaAnual || "",
        lineaBase: MA === "" ? "" : jsonMA?.componentes[index]?.lineaBase || "",
        metasPorFrecuencia: [
          {
            semestre1:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.semestre1 || "",
            semestre2:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.semestre2 || "",
            trimestre1:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre1 || "",
            trimestre2:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre2 || "",
            trimestre3:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre3 || "",
            trimestre4:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre4 || "",
          },
        ],
        valorNumerador:
          MA === "" ? "" : jsonMA?.componentes[index]?.valorNumerador || "",
        valorDenominador:
          MA === "" ? "" : jsonMA?.componentes[index]?.valorDenominador || "",
        sentidoDelIndicador:
          MA === ""
            ? ""
            : jsonMA?.componentes[index]?.sentidoDelIndicador || "",
        unidadResponsable:
          MA === "" ? "" : jsonMA?.componentes[index]?.unidadResponsable || "",
        descIndicador:
          MA === "" ? "" : jsonMA?.componentes[index]?.descIndicador || "",
        descNumerador:
          MA === "" ? "" : jsonMA?.componentes[index]?.descNumerador || "",
        descDenominador:
          MA === "" ? "" : jsonMA?.componentes[index]?.descDenominador || "",
      });
    });

    // if (componentesValues.length <= 0) {
    setComponentesValues(comp);
    // }
    // }
  }, [valoresComponenteMir]);

  useEffect(() => {
    valoresComponenteMAFnc(componentesValues);
  }, [componentesValues]);

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
        <InfoOutlinedIcon
          onClick={() => {
            showMirFnc(true);
            showFnc("Componentes");
          }}
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
          COMPONENTE {componentSelect}
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
                  }}
                  sx={{
                    height: "7vh",
                    "&.Mui-selected ": {
                      backgroundColor: "#c4a57b",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#cbcbcb",
                    },
                  }}
                >
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    COMPONENTE {item}
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
              height: "30%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              rows={1}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  META ANUAL 2023
                </Typography>
              }
              value={componentesValues[componentSelect - 1]?.metaAnual}
              onChange={(c) => {
                componentesValues[componentSelect - 1].metaAnual =
                  c.target.value;
                setComponentesValues([...componentesValues]);
              }}
              error={
                (parseFloat(componentesValues[componentSelect - 1]?.metaAnual) <
                  0 ||
                  isNaN(
                    parseFloat(
                      componentesValues[componentSelect - 1]?.metaAnual
                    )
                  )) &&
                componentesValues[componentSelect - 1]?.metaAnual !== ""
                  ? true
                  : false
              }
              helperText={
                (parseFloat(componentesValues[componentSelect - 1]?.metaAnual) <
                  0 ||
                  isNaN(
                    parseFloat(
                      componentesValues[componentSelect - 1]?.metaAnual
                    )
                  )) &&
                componentesValues[componentSelect - 1]?.metaAnual !== ""
                  ? "Introducir valor mayor que 0"
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
            />
            <TextField
              rows={1}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  LÍNEA BASE 2021
                </Typography>
              }
              value={componentesValues[componentSelect - 1]?.lineaBase}
              onChange={(c) => {
                componentesValues[componentSelect - 1].lineaBase =
                  c.target.value;
                setComponentesValues([...componentesValues]);
              }}
              error={
                (parseFloat(componentesValues[componentSelect - 1]?.lineaBase) <
                  0 ||
                  isNaN(
                    parseFloat(
                      componentesValues[componentSelect - 1]?.lineaBase
                    )
                  )) &&
                componentesValues[componentSelect - 1]?.lineaBase !== ""
                  ? true
                  : false
              }
              helperText={
                (parseFloat(componentesValues[componentSelect - 1]?.lineaBase) <
                  0 ||
                  isNaN(
                    parseFloat(
                      componentesValues[componentSelect - 1]?.lineaBase
                    )
                  )) &&
                componentesValues[componentSelect - 1]?.lineaBase !== ""
                  ? "Introducir valor mayor que 0."
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
            />
            <TextField
              rows={1}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  VALOR DEL NUMERADOR
                </Typography>
              }
              value={componentesValues[componentSelect - 1]?.valorNumerador}
              onChange={(c) => {
                componentesValues[componentSelect - 1].valorNumerador =
                  c.target.value;
                setComponentesValues([...componentesValues]);
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
              rows={1}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  VALOR DEL DENOMINADOR
                </Typography>
              }
              value={componentesValues[componentSelect - 1]?.valorDenominador}
              onChange={(c) => {
                componentesValues[componentSelect - 1].valorDenominador =
                  c.target.value;
                setComponentesValues([...componentesValues]);
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
            <FormControl
              sx={{
                width: "15%",
                height: "80%",
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
                    sx={{ fontSize: '0.6vw', fontFamily: "MontserratMedium" }}
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
                      componentesValues[componentSelect - 1]
                        ?.sentidoDelIndicador === "ASCENDENTE"
                    }
                    onChange={(c) => {
                      componentesValues[
                        componentSelect - 1
                      ].sentidoDelIndicador = c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"DESCENDENTE"}
                label={
                  <Typography
                    sx={{ fontSize: '0.6vw', fontFamily: "MontserratMedium" }}
                  >
                    DESCENDENTE
                  </Typography>
                }
                control={
                  <Radio
                    checked={
                      componentesValues[componentSelect - 1]
                        ?.sentidoDelIndicador === "DESCENDENTE"
                    }
                    onChange={(c) => {
                      componentesValues[
                        componentSelect - 1
                      ].sentidoDelIndicador = c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"NORMAL"}
                label={
                  <Typography
                    sx={{ fontSize: '0.6vw', fontFamily: "MontserratMedium" }}
                  >
                    NORMAL
                  </Typography>
                }
                control={
                  <Radio
                    checked={
                      componentesValues[componentSelect - 1]
                        ?.sentidoDelIndicador === "NORMAL"
                    }
                    onChange={(c) => {
                      componentesValues[
                        componentSelect - 1
                      ].sentidoDelIndicador = c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </FormControl>
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
                rows={1}
                multiline
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                  >
                    TRIMESTRE 1
                  </Typography>
                }
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.trimestre1
                }
                onChange={(c) => {
                  componentesValues[
                    componentSelect - 1
                  ].metasPorFrecuencia[0].trimestre1 = c.target.value;
                  setComponentesValues([...componentesValues]);
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
                rows={1}
                multiline
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                  >
                    TRIMESTRE 2
                  </Typography>
                }
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.trimestre2
                }
                onChange={(c) => {
                  componentesValues[
                    componentSelect - 1
                  ].metasPorFrecuencia[0].trimestre2 = c.target.value;
                  setComponentesValues([...componentesValues]);
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
                rows={1}
                multiline
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                  >
                    TRIMESTRE 3
                  </Typography>
                }
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.trimestre3
                }
                onChange={(c) => {
                  componentesValues[
                    componentSelect - 1
                  ].metasPorFrecuencia[0].trimestre3 = c.target.value;
                  setComponentesValues([...componentesValues]);
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
                rows={1}
                multiline
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                  >
                    TRIMESTRE 4
                  </Typography>
                }
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.trimestre4
                }
                onChange={(c) => {
                  componentesValues[
                    componentSelect - 1
                  ].metasPorFrecuencia[0].trimestre4 = c.target.value;
                  setComponentesValues([...componentesValues]);
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
                rows={1}
                multiline
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                  >
                    SEMESTRE 1
                  </Typography>
                }
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.semestre1
                }
                onChange={(c) => {
                  componentesValues[
                    componentSelect - 1
                  ].metasPorFrecuencia[0].semestre1 = c.target.value;
                  setComponentesValues([...componentesValues]);
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
                rows={1}
                multiline
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                  >
                    SEMESTRE 2
                  </Typography>
                }
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.semestre2
                }
                onChange={(c) => {
                  componentesValues[
                    componentSelect - 1
                  ].metasPorFrecuencia[0].semestre2 = c.target.value;
                  setComponentesValues([...componentesValues]);
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
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  UNIDAD RESPONSABLE DE REPORTAR EL INDICADOR
                </Typography>
              }
              value={componentesValues[componentSelect - 1]?.unidadResponsable}
              onChange={(c) => {
                componentesValues[componentSelect - 1].unidadResponsable =
                  c.target.value;
                setComponentesValues([...componentesValues]);
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
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  DESCRIPCIÓN DEL INDICADOR
                </Typography>
              }
              value={componentesValues[componentSelect - 1]?.descIndicador}
              onChange={(c) => {
                componentesValues[componentSelect - 1].descIndicador =
                  c.target.value;
                setComponentesValues([...componentesValues]);
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
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  DESCRIPCIÓN DEL NUMERADOR
                </Typography>
              }
              value={componentesValues[componentSelect - 1]?.descNumerador}
              onChange={(c) => {
                componentesValues[componentSelect - 1].descNumerador =
                  c.target.value;
                setComponentesValues([...componentesValues]);
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
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  DESCRIPCIÓN DEL DENOMINADOR
                </Typography>
              }
              value={componentesValues[componentSelect - 1]?.descDenominador}
              onChange={(c) => {
                componentesValues[componentSelect - 1].descDenominador =
                  c.target.value;
                setComponentesValues([...componentesValues]);
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
