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

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { FormulaDialogMA } from "../formulasDialog/FormulaDialogMA";
import { FormulaDialogMACA } from "../formulasDialog/FormulaDialogMACA";
import { IComponentesFT } from "../tabsFichaTecnica/Interfaces";


export const TabComponenteFT2 = ({
  show,
  valoresComponenteMAFnc,
  noComponentes,
  valoresComponenteMA,
  showMirFnc,
  showFnc,
  FT,
}: // MA,
// MIR,
{
  show: boolean;
  valoresComponenteMAFnc: Function;
  noComponentes: number[];
  valoresComponenteMA: Array<IComponentesFT>;
  showMirFnc: Function;
  showFnc: Function;
  FT: string;
  // MA: string;
  // MIR: string;
}) => {
  const [componentSelect, setComponentSelect] = useState(1);

  const [componentesValues, setComponentesValues] = useState<
    Array<IComponentesFT>
  >([]);

   let jsonFT = FT === "" ? "" : JSON.parse(FT);

  useEffect(() => {
    // if (show === true) {
    let comp: IComponentesFT[] = [];

    noComponentes.map((x, index) => {
      return comp.push({
        componentes: "C" + (index + 1),
        tipoDeIndicador: FT === "" ? "" : jsonFT?.componentes[index]?.tipoDeIndicador || "",
        claridad: FT === "" ? "" : jsonFT?.componentes[index]?.claridad || "",
        relevancia: FT === "" ? "" : jsonFT?.componentes[index]?.relevancia || "",
        economia: FT === "" ? "" : jsonFT?.componentes[index]?.economia || "",
        monitoreable: FT === "" ? "" : jsonFT?.componentes[index]?.monitoreable || "",
        adecuado: FT === "" ? "" : jsonFT?.componentes[index]?.adecuado || "",
        aporte_marginal: FT === "" ? "" : jsonFT?.componentes[index]?.aporte_marginal || "",
        dimension: FT === "" ? "" : jsonFT?.componentes[index]?.dimension || "",
        unidadDeMedida: FT === "" ? "" : jsonFT?.componentes[index]?.unidadDeMedida || ""
      });
    });

    // if (componentesValues.length <= 0) {
    setComponentesValues(comp);
    // }
    // }
  }, [valoresComponenteMA]);

  useEffect(() => {
    valoresComponenteMAFnc(componentesValues);
  }, [componentesValues]);



  // const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  // const [prevTextFormula, setPrevTextFormula] = useState("");
  // const [tipoFormula, setTipoFormula] = useState("");
  // const [elementoFormula, setElementoFormula] = useState("");

  // const [openFormulaDialogMACA, setOpenFormulaDialogMACA] = useState(false);
  // const [frecuencia, setFrecuencia] = useState("");

  //////////////////////////////////////////////////////////////////////////////////////
  // const handleClickOpen = () => {
  //   setTipoFormula(
  //     JSON.parse(MIR).componentes[componentSelect - 1].indicador.includes(
  //       "PORCENTAJE"
  //     )
  //       ? "Porcentaje"
  //       : JSON.parse(MIR).componentes[componentSelect - 1].indicador.includes(
  //           "TASA"
  //         )
  //       ? "Tasa"
  //       : JSON.parse(MIR).componentes[componentSelect - 1].indicador.includes(
  //           "INDICE" || "ÍNDICE"
  //         )
  //       ? "Indice"
  //       : JSON.parse(MIR).componentes[componentSelect - 1].indicador.includes(
  //           "PROMEDIO"
  //         )
  //       ? "Promedio"
  //       : ""
  //   );
  //   setElementoFormula("Componente " + componentSelect.toString());
  //   setOpenFormulaDialog(true);
  // };
  /////////////////////////////////////////////////////////////////////

  // const handleClose = () => {
  //   setOpenFormulaDialog(false);
  // };
  ///////////////////////////////////////////////////////////////////////////
  // const handleClickOpen2 = () => {
  //   setTipoFormula(
  //     JSON.parse(MIR).componentes[componentSelect - 1].indicador.includes(
  //       "PORCENTAJE"
  //     )
  //       ? "Porcentaje"
  //       : JSON.parse(MIR).componentes[componentSelect - 1].indicador.includes(
  //           "TASA"
  //         )
  //       ? "Tasa"
  //       : JSON.parse(MIR).componentes[componentSelect - 1].indicador.includes(
  //           "INDICE" || "ÍNDICE"
  //         )
  //       ? "Indice"
  //       : JSON.parse(MIR).componentes[componentSelect - 1].indicador.includes(
  //           "PROMEDIO"
  //         )
  //       ? "Promedio"
  //       : ""
  //   );
  //   setElementoFormula("Componente " + componentSelect.toString());
  //   setOpenFormulaDialogMACA(true);
  // };
  /////////////////////////////////////////////////////////////////////////////////
  // const handleClose2 = () => {
  //   setOpenFormulaDialogMACA(false);
  // };

  ///////// esto es necesario
  // const changeFormula = (txt: string) => {
  //   componentesValues[componentSelect - 1].valorNumerador = txt.split(",")[0];
  //   componentesValues[componentSelect - 1].valorDenominador = txt.split(",")[1];
  //   componentesValues[componentSelect - 1].metaAnual = txt.split(",")[2] + "%";
  //   setComponentesValues([...componentesValues]);
  // };

  // const changeFormula2 = (txt: string) => {

  //   if (frecuencia === "trimestral") {
  //     componentesValues[componentSelect - 1].metasPorFrecuencia[0].trimestre1 =
  //       txt.split(",")[0] + "%";
  //     componentesValues[componentSelect - 1].metasPorFrecuencia[0].trimestre2 =
  //       txt.split(",")[1] + "%";
  //     componentesValues[componentSelect - 1].metasPorFrecuencia[0].trimestre3 =
  //       txt.split(",")[2] + "%";
  //     componentesValues[componentSelect - 1].metasPorFrecuencia[0].trimestre4 =
  //       txt.split(",")[3] + "%";
  //   } else {
  //     componentesValues[componentSelect - 1].metasPorFrecuencia[0].semestre1 =
  //       txt.split(",")[0] + "%";
  //     componentesValues[componentSelect - 1].metasPorFrecuencia[0].semestre2 =
  //       txt.split(",")[1] + "%";
  //   }

  //   setComponentesValues([...componentesValues]);
  // };

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
      {/* <FormulaDialogMA
        open={openFormulaDialog}
        // close={handleClose}
        // textoSet={changeFormula}
        prevText={prevTextFormula}
        tipo={tipoFormula}
        elemento={elementoFormula}
        MIR={MIR}
      />

      <FormulaDialogMACA
        open={openFormulaDialogMACA}
        // close={handleClose2}
        // textoSet={changeFormula2}
        prevText={prevTextFormula}
        tipo={tipoFormula}
        elemento={elementoFormula}
        MIR={MIR}
        frecuencia={frecuencia}
      /> */}

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
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            width: "90%",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <FormControl
            sx={{
              width: "90%",
              height: "60%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "MontserratBold",
                fontSize: "0.6vw",
              }}
            >
              TIPO DE INDICADOR
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SELECCIÓN ESTRATEGICO"}
                label={"SELECCIÓN ESTRATEGICO"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      componentesValues[componentSelect - 1]
                        ?.tipoDeIndicador === "SELECCIÓN ESTRATEGICO"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].tipoDeIndicador =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />

              <FormControlLabel
                value={"DE GESTIÓN"}
                label={"DE GESTIÓN"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      componentesValues[componentSelect - 1]
                        ?.tipoDeIndicador === "DE GESTIÓN"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].tipoDeIndicador =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "MontserratBold",
                fontSize: "0.6vw",
              }}
            >
              DIMENSIÓN
            </FormLabel>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <FormControlLabel
                  value={"EFICIENCIA"}
                  label={"EFICIENCIA"}
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={
                    <Radio
                      checked={
                        componentesValues[componentSelect - 1]?.dimension ===
                        "EFICIENCIA"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect - 1].dimension =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"EFICACIA"}
                  label={"EFICACIA"}
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={
                    <Radio
                      checked={
                        componentesValues[componentSelect - 1]?.dimension ===
                        "EFICACIA"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect - 1].dimension =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
                      }}
                    />
                  }
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <FormControlLabel
                  value={"CALIDAD"}
                  label={"CALIDAD"}
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={
                    <Radio
                      checked={
                        componentesValues[componentSelect - 1]?.dimension ===
                        "CALIDAD"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect - 1].dimension =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
                      }}
                    />
                  }
                />

                <FormControlLabel
                  value={"ECONOMÍA"}
                  label={"ECONOMÍA"}
                  sx={{
                    ml: "0.5vw",
                    fontFamily: "MontserratMedium",
                  }}
                  control={
                    <Radio
                      checked={
                        componentesValues[componentSelect - 1]?.dimension ===
                        "ECONOMÍA"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect - 1].dimension =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
                      }}
                    />
                  }
                />
              </Box>
            </Box>
          </FormControl>

          <TextField
            rows={8}
            multiline
            variant="filled"
            sx={{ width: "90%", boxShadow: 2 }}
            label={"UNIDAD DE MEDIDA"}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
                fontSize: ".8vw",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
              },
            }}
            value={componentesValues[componentSelect - 1]?.unidadDeMedida || ""}
            onChange={(c) => {
              componentesValues[componentSelect - 1].unidadDeMedida =
                c.target.value;
              setComponentesValues([...componentesValues]);
            }}
          />

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "MontserratBold",
                fontSize: "0.6vw",
              }}
            >
              CLARIDAD
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={"SI"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      componentesValues[componentSelect - 1]?.claridad === "SI"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].claridad =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />

              <FormControlLabel
                value={"NO"}
                label={"NO"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      componentesValues[componentSelect - 1]?.claridad === "NO"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].claridad =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "MontserratBold",
                fontSize: "0.6vw",
              }}
            >
              RELEVANCIA
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={"SI"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      componentesValues[componentSelect - 1]?.relevancia ===
                      "SI"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].relevancia =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />

              <FormControlLabel
                value={"NO"}
                label={"NO"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      componentesValues[componentSelect - 1]?.relevancia ===
                      "NO"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].relevancia =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "MontserratBold",
                fontSize: "0.6vw",
              }}
            >
              ECONOMÍA
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={"SI"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      componentesValues[componentSelect - 1]?.economia === "SI"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].economia =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />

              <FormControlLabel
                value={"NO"}
                label={"NO"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      componentesValues[componentSelect - 1]?.economia === "NO"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].economia =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "MontserratBold",
                fontSize: "0.6vw",
              }}
            >
              MONITOREABLE
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={"SI"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      componentesValues[componentSelect - 1]?.monitoreable ===
                      "SI"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].monitoreable =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />

              <FormControlLabel
                value={"NO"}
                label={"NO"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      componentesValues[componentSelect - 1]?.monitoreable ===
                      "NO"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].monitoreable =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "MontserratBold",
                fontSize: "0.6vw",
              }}
            >
              ADECUADO
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={"SI"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      componentesValues[componentSelect - 1]?.adecuado === "SI"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].adecuado =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />

              <FormControlLabel
                value={"NO"}
                label={"NO"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      componentesValues[componentSelect - 1]?.adecuado === "NO"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].adecuado =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "MontserratBold",
                fontSize: "0.6vw",
              }}
            >
              APORTE MARGINAL
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={"SI"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      componentesValues[componentSelect - 1]
                        ?.aporte_marginal === "SI"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].aporte_marginal =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />

              <FormControlLabel
                value={"NO"}
                label={"NO"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      componentesValues[componentSelect - 1]
                        ?.aporte_marginal === "NO"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].aporte_marginal =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};
