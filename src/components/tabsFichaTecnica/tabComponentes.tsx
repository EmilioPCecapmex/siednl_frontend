import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
  FormControl,
  IconButton,
} from "@mui/material";
import { IComponente } from "../tabsMir/IComponente";
//import { IComponenteMA } from "./Interfaces";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { FormulaDialogMA } from "../formulasDialog/FormulaDialogMA";
import { FormulaDialogMACA } from "../formulasDialog/FormulaDialogMACA";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";

export interface IComponenteFT {
  componentes: string;
  tipoDeIndicador: string,
  frecuencia: string;
  claridad: string;
  relevancia: string;
  economia: string;
  monitoreable: string;
  adecuado: string;
  aporte_marginal: string;
  dimension: string;
  unidadDeMedida: string;
}

export const TabComponenteFT = ({
  show,
  noComponentesFnc,
  valoresComponenteFnc,
  noComponentes,
  valoresComponente,

}: //mirEdit,
{
  show: boolean;
  noComponentesFnc: Function;
  valoresComponenteFnc: Function;
  noComponentes: number[];
  valoresComponente: Array<IComponenteFT>;

  //mirEdit?: IMIREdit;
}) => {
  const [componenteValor, setComponenteValor] = useState<Array<IComponenteFT>>(
    noComponentes.map((x, index) => {
      return {
        componentes: "C" + (index + 1),
        tipoDeIndicador: "",
        frecuencia: "",
        claridad: "",
        relevancia: "",
        economia: "",
        monitoreable: "",
        adecuado: "",
        aporte_marginal: "",
        dimension: "",
        unidadDeMedida: "",
      };
    })
  );

  useEffect(() => {
    setComponenteValor(
      noComponentes.map((x, index) => {
        return {
          componentes: "C" + (index + 1),
          tipoDeIndicador: "",
          frecuencia: "",
          claridad: "",
          relevancia: "",
          economia: "",
          monitoreable: "",
          adecuado: "",
          aporte_marginal: "",
          dimension: "",
          unidadDeMedida: "",
        };
      })
    );
  }, [noComponentes, show]);

  const [componentSelect, setComponentSelect] = useState(1);

  const [componentesValues, setComponentesValues] = useState<
    Array<IComponenteFT>
  >([]);
  // const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  // const [prevTextFormula, setPrevTextFormula] = useState("");
  // const [tipoFormula, setTipoFormula] = useState("");
  // const [elementoFormula, setElementoFormula] = useState("");
  // const [errorIndicador, setErrorIndicador] = useState(-1);

  // const handleClickOpen = () => {
  //   setPrevTextFormula(componenteValor[componentSelect - 1].formula);
  //   setOpenFormulaDialog(true);
  // };

  // const handleClose = () => {
  //   setOpenFormulaDialog(false);
  // };

  // const changeFormula = (txt: string) => {
  //   let prev = [...valoresComponente];
  //   let prevLocal = [...componenteValor];
  //   prevLocal[componentSelect - 1].formula = txt;
  //   prev[componentSelect - 1].formula = txt;
  //   setComponenteValor(prevLocal);
  // };

  // const evalueTxtIndicador = () => {
  //   const cIndicador =
  //     componenteValor[componentSelect - 1].indicador?.toLowerCase();
  //   if (cIndicador !== undefined) {
  //     if (cIndicador.includes("porcentaje")) {
  //       setTipoFormula("Porcentaje");
  //       setElementoFormula("Componente " + componentSelect.toString());
  //       handleClickOpen();
  //       setErrorIndicador(-1);
  //     } else if (cIndicador.includes("tasa")) {
  //       setTipoFormula("Tasa");
  //       setElementoFormula("Componente " + componentSelect.toString());
  //       handleClickOpen();
  //       setErrorIndicador(-1);
  //     } else if (cIndicador.includes("indice" || "índice")) {
  //       setTipoFormula("Índice");
  //       setElementoFormula("Componente " + componentSelect.toString());
  //       handleClickOpen();
  //       setErrorIndicador(-1);
  //     } else if (cIndicador.includes("promedio")) {
  //       setTipoFormula("Promedio");
  //       setElementoFormula("Componente " + componentSelect.toString());
  //       handleClickOpen();
  //       setErrorIndicador(-1);
  //     } else {
  //       setErrorIndicador(componentSelect - 1);
  //       let prev = [...valoresComponente];
  //               let prevLocal = [...componenteValor];
  //               prevLocal[componentSelect - 1].indicador = "";
  //               prev[componentSelect - 1].indicador = "";
  //               setComponenteValor(prevLocal);

  //     }
  //   }
  // };

  const agregarFnc = () => {
    let v = noComponentes.length + 1;
    if (v > 6) {
    } else {
      noComponentesFnc([...noComponentes, v]);

      if (valoresComponente.length < 6) {
        let prevState = [...valoresComponente];
        prevState.push({
          componentes: "C" + (noComponentes.length + 1),
          tipoDeIndicador: "",
          frecuencia: "",
          claridad: "",
          relevancia: "",
          economia: "",
          monitoreable: "",
          adecuado: "",
          aporte_marginal: "",
          dimension: "",
          unidadDeMedida: "",
        });
        setComponenteValor(prevState);
        valoresComponenteFnc(prevState);
      }
    }
  };

  // const eliminarFnc = () => {
  //   let v = noComponentes.length - 1;
  //   if (v < 2) {
  //   } else {
  //     noComponentesFnc(noComponentes.splice(0, v));
  //     let prevState = [...valoresComponente];
  //     prevState.pop();
  //     setComponenteValor(prevState);
  //     valoresComponenteFnc(prevState);
  //     if (v < componentSelect) {
  //       setComponentSelect(v);
  //     }
  //   }
  // };

  useEffect(() => {
    valoresComponenteFnc(componentesValues);
  }, [componentesValues]);


  return (
    <Box
      visibility={show ? "visible" : "hidden"}
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
            fontSize: "1.2vw",
            textTransform: "uppercase",
          }}
        >
          Componente #{componentSelect}
        </Typography>
        {/* <IconButton
          onClick={() => agregarFnc()}
          disabled={false}
        >
          <AddCircleIcon fontSize="large" />
        </IconButton> */}

        {/* <IconButton
          onClick={() => eliminarFnc()}
          sx={{ mr: "1vw" }}
          disabled={false}
        >
          <DoDisturbOnIcon fontSize="large" />
        </IconButton> */}
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
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      textTransform: "uppercase",
                    }}
                  >
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
              width: "100%",
              height: "40%",
              justifyContent: "space-evenly",
              display: "flex",
              alignItems: "center",
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
                      componenteValor[0].tipoDeIndicador === "SELECCIÓN ESTRATEGICO"
                    }
                    onChange={(c) => {
                      componenteValor[0].tipoDeIndicador = c.target.value;
                      setComponenteValor([...componenteValor]);
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
                        componenteValor[0].tipoDeIndicador === "DE GESTIÓN"
                      }
                      onChange={(c) => {
                        let y = [...componenteValor];
                        y[0].tipoDeIndicador = c.target.value;
                        setComponenteValor(y);
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
                <FormControlLabel
                  value={"EFICIENCIA"}
                  label={"EFICIENCIA"}
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={
                    <Radio
                    checked={
                      componenteValor[0].dimension === "EFICIENCIA "
                    }
                    onChange={(c) => {
                      componenteValor[0].dimension = c.target.value;
                      setComponenteValor([...componenteValor]);
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
                        componenteValor[0].dimension === "DE GESTIÓN"
                      }
                      onChange={(c) => {
                        let y = [...componenteValor];
                        y[0].dimension = c.target.value;
                        setComponenteValor(y);
                      }}
                    />
                  }
                />

                
              </Box>
            </FormControl>



          </Box>
        </Box>
      </Box>
    </Box>
  );
};
