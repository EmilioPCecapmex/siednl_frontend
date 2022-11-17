import {
  Dialog,
  Box,
  DialogContent,
  Button,
  Typography,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";

export const FormulaDialogMA = ({
  open,
  close,
  textoSet,
  prevText,
  tipo,
  elemento,
  MIR,
}: {
  open: boolean;
  close: Function;
  textoSet: Function;
  prevText: string;
  tipo: string;
  elemento: string;
  MIR: string;
}) => {
  const [descA, setDescA] = useState("");
  const [descB, setDescB] = useState("");
  const [emptyTxt, setEmptyTxt] = useState(false);

  const checkValues = () => {
    if (tipo === "Indice" || tipo === "Índice") {
      if (descA === "") {
        setEmptyTxt(true);
      } else {
        if (tipo === "Indice" || tipo === "Índice") {
          textoSet(
            descA.replaceAll('"', "").replaceAll("'", "").replaceAll("\n", "")
          );
          close();
        }
      }
    } else {
      if (descA === "" || descB === "") {
        setEmptyTxt(true);
      } else {
        if (tipo === "Porcentaje") {
          let MA = (parseInt(descA) / parseInt(descB)) * 100;
          textoSet(descA + "," + descB + "," + MA);
          close();
        } else if (tipo === "Tasa") {
          let T = parseInt(descA) - parseInt(descB);
          let MA =
            ((parseInt(descA) - parseInt(descB)) / parseInt(descB)) * 100;
          textoSet(T + "," + descB + "," + MA);
          close();
        } else if (tipo === "Promedio") {
          let MA = parseInt(descA) / parseInt(descB);
          textoSet(descA + "," + descB + "," + MA);
          close();
        }
      }
    }
  };

  useLayoutEffect(() => {
    if (prevText !== "" && prevText !== undefined) {
    } else if (prevText === "") {
      setDescA("");
      setDescB("");
    }
    setEmptyTxt(false);
  }, [open]);

  let noComponente = parseInt(elemento.split(" ")[1]);
  let noActividad = parseInt(elemento.split("")[3]);
  console.log(JSON.parse(MIR).actividades[noActividad-1]?.formula);
  
  

  return (
    <Dialog open={open} fullWidth>
      <Box
        sx={{
          width: "100%",
          height: "15vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontFamily: "MontserratBold", fontSize: "1vw" }}>
          {elemento} - Fórmula - {tipo}
        </Typography>

        <Typography
          sx={{
            fontFamily: "MontserratRegular",
            fontSize: ".6vw",
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
            fontSize: ".6vw",
            width: "90%",
            textAlign: "center",
          }}
        >
          {elemento === "Fin"
            ? JSON.parse(MIR).fin.formula
            : elemento === "Propósito"
            ? JSON.parse(MIR).proposito.formula
            : elemento.includes("Componente")
            ? JSON.parse(MIR).componentes[noComponente - 1].formula
            : elemento.includes("A")
            ? JSON.parse(MIR).actividades[noActividad - 1]?.formula
            : null}
        </Typography>
      </Box>

      <DialogContent>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={emptyTxt}
          onClose={() => setEmptyTxt(false)}
          autoHideDuration={2000}
        >
          <Alert severity="warning">Verifica información</Alert>
        </Snackbar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            label={tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
            sx={{ width: "45%" }}
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
                fontSize: ".8vw",
              },
            }}
            onChange={(c) =>
              setDescA(
                c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "")
              )
            }
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
                fontSize: ".8vw",
              },
            }}
          />
          {tipo === "Indice" || tipo === "Índice" ? (
            ""
          ) : (
            <TextField
              label={tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
              sx={{ width: "45%" }}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratSemiBold",
                  fontSize: ".8vw",
                },
              }}
              value={descB}
              onChange={(c) =>
                setDescB(
                  c.target.value
                    .replaceAll('"', "")
                    .replaceAll("'", "")
                    .replaceAll("\n", "")
                )
              }
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                  fontSize: ".8vw",
                },
              }}
            />
          )}{" "}
        </Box>
      </DialogContent>
      <Box
        sx={{ width: "100%", justifyContent: "space-evenly", display: "flex" }}
      >
        <Button onClick={() => close()} color="error">
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Cancelar
          </Typography>
        </Button>
        <Button onClick={() => checkValues()} color="success">
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Agregar
          </Typography>
        </Button>
      </Box>
    </Dialog>
  );
};
