import {
  Dialog,
  Grid,
  DialogContent,
  Button,
  Typography,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { queries } from "../../queries";
import { clearInfo } from "../genericComponents/GenericMethods";
import { validarNumero } from "../../services/validations";
import { IMA } from "../tabsMetaAnual/IMA";
export const FormulaDialogMA = ({
  open,
  close,
  textoSet,
  tipo,
  elemento,
  elementoA,
  MIR,
  MA,
  index,
  index2,
  tab,
}: {
  open: boolean;
  close: Function;
  textoSet: Function;
  tipo: string;
  elemento: string;
  elementoA: string;
  MIR: string;
  MA: string;
  index: number;
  index2: number;
  tab: string;
}) => {
  const [descA, setDescA] = useState("");
  const [descB, setDescB] = useState("");
  const [emptyTxt, setEmptyTxt] = useState(false);

  const limpiaVar = () => {
    setDescA("");
    setDescB("");
  };

  let jsonMA: IMA;

  try {
    if (MA) {
      jsonMA = JSON.parse(MA);
    } else {
      jsonMA = {} as IMA; // O el valor predeterminado que tenga sentido en tu caso
    }
  } catch (error) {
    //console.error("Error parsing JSON:", error);
    jsonMA = {} as IMA; // O el valor predeterminado que tenga sentido en tu caso
  }

  useEffect(() => {
    if (tab === "COMPONENTES") {
     // console.log("jsonMA.componentes[index].valorNumerador: ",index, jsonMA.componentes[index].valorNumerador);
      setDescB(jsonMA.componentes[index].valorNumerador);
    } else if(tab === "ACTIVIDADES"){
      setDescB(jsonMA.componentes[index].actividades[index2].valorNumerador);
    }
  }, [tipo, jsonMA]);

  const checkValues = () => {
    
    if (tipo === "Indice" || tipo === "Índice") {
      if (/^[\s]*$/.test(descA)) {
        setEmptyTxt(true);
      } else {
        if (tipo === "Indice" || tipo === "Índice") {
          textoSet(parseFloat(descA).toFixed(2));
          limpiaVar();
          close();
        }
      }
    } else {
      if (/^[\s]*$/.test(descA) || /^[\s]*$/.test(descB)) {
        setEmptyTxt(true);
      } else {
        if (tipo === "Porcentaje") {
          let MA = (parseFloat(descA) / parseFloat(descB)) * 100;
          textoSet(descA + "," + descB + "," + MA.toFixed(2));

          limpiaVar();
          close();
        } else if (tipo === "Tasa") {
          let T = parseFloat(descA) - parseFloat(descB);
          let MA =
            ((parseFloat(descA) - parseFloat(descB)) / parseFloat(descB)) * 100;
          textoSet(T.toFixed(2) + "," + descB + "," + MA.toFixed(2));

          limpiaVar();
          close();
        } else if (tipo === "Promedio") {
          let MA = parseFloat(descA) / parseFloat(descB);
          textoSet(descA + "," + descB + "," + MA.toFixed(2));

          limpiaVar();
          close();
        }
      }
    }
  };

  useLayoutEffect(() => {
    setEmptyTxt(false);
  }, [open]);

  let noComponente = parseFloat(elemento.split(" ")[1]);
  let noActividad = parseFloat(elementoA.split("")[3]) - 1;

  useEffect(() => {
    console.log("MA");
    console.log("elemento: ",elemento);
    console.log("elementoA: ",elementoA);
   }, [elemento, elementoA])

  const valores = [
    "fin",
    "proposito",
    "FIN",
    "PROPOSITO",
    "FIN",
    "Proposito",
    "Propósito",
    "PROPÓSITO",
    "propósito",
    "Propósito",
  ];

  useEffect(() => {
    console.log("MA");
   console.log("noComponente: ",noComponente);
   console.log("noActividad: ",noActividad);
  }, [noComponente, noActividad])

  return (
    <Dialog open={open} fullWidth>
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "MontserratBold",
            fontSize: [10, 10, 10, 15, 18, 18],
          }}
        >
          {valores.includes(elemento.toLowerCase())
            ? `${elemento} - Fórmula - ${tipo}`
            : elementoA
            ? `${elementoA} - Fórmula - ${tipo}`
            : elemento.includes("A")
            ? `${elemento} - Fórmula - ${tipo}`
            : `Componente ${noComponente + 1} - Fórmula - ${tipo}`}
        </Typography>

        <Typography
          sx={{
            fontFamily: "MontserratRegular",
            fontSize: [10, 10, 10, 13, 14, 18],
            width: "90%",
            textAlign: "center",
          }}
        >
          {tipo === "Porcentaje"
            ? "El porcentaje es una fracción o una parte de 100, denominándose también como tanto por ciento."
            : null}
          {tipo === "Tasa"
            ? "La tasa de variación es el cambio en porcentaje entre dos valores."
            : null}
          {tipo === "Promedio"
            ? "El promedio es un número representativo que puede obtenerse a partir de una lista de cifras."
            : null}
          {tipo === "Índice"
            ? "El índice de un número nos muestra cuántas veces debemos usar ese número en una multiplicación."
            : null}
        </Typography>
        <Typography
          sx={{
            fontFamily: "MontserratRegular",
            fontSize: [10, 10, 10, 13, 14, 18],
            width: "90%",
            textAlign: "center",
          }}
        >
          {elemento === "Fin"
            ? JSON.parse(MIR).fin.formula
            : elemento === "Propósito" || elemento === "Proposito" || elemento === "PROPOSITO"
            ? JSON.parse(MIR).proposito.formula
            : elemento.includes("Componente") && (elementoA === "" || elementoA=== undefined )
            ? JSON.parse(MIR).componentes[noComponente]?.formula
            : elementoA.includes("A" || "a" || "Actividad" ) 
            ? JSON.parse(MIR).componentes[noComponente]?.actividades[noActividad]
                ?.formula
            : null}
        </Typography>
      </Grid>

      <DialogContent>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={emptyTxt}
          onClose={() => setEmptyTxt(false)}
          autoHideDuration={2000}
        >
          <Alert severity="warning">Verifica información</Alert>
        </Snackbar>
        <Grid
          sx={{
            width: "100%",
            height: "7vh",
            display: "flex",
            justifyContent: "center",
            mb: 4
          }}
        >
          {tipo === "Indice" || tipo === "Índice" ? (
            <TextField
              // type={"number"}
              label={
                <Typography
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: [10, 10, 10, 14, 15, 18],
                  }}
                >
                  {"Valor del índice"}
                </Typography>
              }
              sx={{
                width: "45%"
              }}
              value={descA}
              error={
                parseFloat(descA) < 0 ||
                (isNaN(parseFloat(descA)) && descA !== "")
                  ? true
                  : false
              }
              helperText={
                parseFloat(descA) < 0 ||
                (isNaN(parseFloat(descA)) && descA !== "")
                  ? "Introducir valor mayor que 0"
                  : null
              }
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratSemiBold",
                  
                },
              }}
              onChange={(c) =>
                setDescA(
                  validarNumero(c.target.value,descA)
                )
              }
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                  
                },
              }}
            />
          ) : (
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                fontSize: [10, 10, 10, 14, 15, 18],
              }}
            >
              <TextField
                // type={"number"}

                label={
                  <Typography sx={{ fontFamily: "MontserratBold" }}>
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{
                  width: "45%", mr: 1
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                    
                  },
                }}
                error={
                  !isFinite(parseFloat(descA)) || parseFloat(descA) <= 0 || descA === ""
                }
                helperText={
                  !isFinite(parseFloat(descA)) || parseFloat(descA) <= 0 || descA === ""
                    ? "Introducir un número mayor que 0"
                    : null
                }
                value={descA}
                onChange={(c) =>
                  setDescA(
                    validarNumero(c.target.value,descA)
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                   
                  },
                }}
              />
              <TextField
                // type={"number"}
                label={
                  <Typography
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 10, 14, 15, 18]
                    }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{ width: "45%" }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                
                  },
                }}
                value={descB}
                error={
                  !isFinite(parseFloat(descB)) || parseFloat(descB) <= 0 || descB === ""
                }
                helperText={
                  !isFinite(parseFloat(descB)) || parseFloat(descB) <= 0 || descB === ""
                    ? "Introducir un número mayor que 0"
                    : null
                }
                onChange={(c) =>
                  setDescB(
                    validarNumero(c.target.value,descB)
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                    
                  },
                }}
              />
            </Grid>
          )}{" "}
        </Grid>
      </DialogContent>

      <Grid
        sx={{ width: "100%", justifyContent: "space-evenly", display: "flex" , mb: 2}}
      >
        <Button
          
          className="cancelar"
          onClick={() => close()}
        >
          <Typography
            sx={{
              fontFamily: "MontserratMedium",
              fontSize: [10, 10, 10, 14, 15, 18],
            }}
          >
            CANCELAR
          </Typography>
        </Button>
        <Button
          className="aceptar"
          disabled={descB === "0"}
          onClick={() => checkValues()}
        >
          <Typography
            sx={{
              fontFamily: "MontserratMedium",
              fontSize: [10, 10, 10, 14, 15, 18],
            }}
          >
            AGREGAR
          </Typography>
        </Button>
      </Grid>

    </Dialog>
  );
};
