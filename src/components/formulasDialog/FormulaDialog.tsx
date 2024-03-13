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
import { useEffect, useLayoutEffect, useState } from "react";
import { queries } from "../../queries";

export const FormulaDialog = ({
  open,
  close,
  textoSet,
  prevText,
  tipo,
  elemento,
}: {
  open: boolean;
  close: Function;
  textoSet: Function;
  prevText: string;
  tipo: string;
  elemento: string;
}) => {
  const [descA, setDescA] = useState("");
  const [descB, setDescB] = useState("");
  const [emptyTxt, setEmptyTxt] = useState(false);

  const checkValues = () => {
    if (tipo === "Indice" || tipo === "Índice" || tipo === "indice") {
      if (descA === "") {
        setEmptyTxt(true);
      } else {
        if (tipo === "Indice" || tipo === "Índice" || tipo === "indice") {
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
        if ( tipo === "Porcentaje" || tipo === "porcentaje" || tipo === "PORCENTAJE") {
          textoSet(
            "(" +
              descA
                .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "")
                .trimEnd()
                  .trimEnd() +
              "/" +
              descB
                .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "")
                .trimEnd()
                  .trimEnd() +
              ")*100"
          );
          close();
        } else if (tipo === "Tasa") {
          textoSet(
            "(" +
              "(" +
              descA
                .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "")
                .trimEnd()
                  .trimEnd() +
              "-" +
              descB
                .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "")
                .trimEnd()
                  .trimEnd() +
              ")" +
              "/" +
              descB
                .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "")
                .trimEnd()
                  .trimEnd() +
              ")" +
              "*100"
          );
          close();
        } else if (tipo === "Promedio") {
          textoSet(
            "(" +
              descA
                .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "")
                .trimEnd()
                  .trimEnd() +
              "/" +
              descB
                .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "")
                .trimEnd()
                  .trimEnd() +
              ")"
          );
          close();
        }
      }
    }
  };

  useEffect(() => {
    setDescA("");
    setDescB("");
    setEmptyTxt(false);
  }, [open]);

  useLayoutEffect(() => {
    if (prevText !== "" && prevText !== undefined) {
    } else if (prevText === "") {
      setDescA("");
      setDescB("");
    }
    setEmptyTxt(false);
  }, [open, prevText]);

  return (
    <Dialog open={open} fullWidth>
      <Box
        sx={{
          width: "100%",
          height: "10vh",
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
            mt: "2vh",
          }}
        >
          <TextField
            label="Descripción A"
            multiline
            rows={4}
            sx={{ width: "45%" }}
            value={descA}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratSemiBold",
                //fontSize: ".8vw",
              },
            }}
            onChange={(c) =>
              setDescA(
                c.target.value
                  .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "")
                .trimEnd()
              )
            }
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
               // fontSize: ".8vw",
              },
            }}
          />


          
          {tipo === "Indice" || tipo === "Índice" ? (
            ""
          ) : (
            <TextField
              label="Descripción B"
              sx={{ width: "45%" }}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratSemiBold",
                //  fontSize: ".8vw",
                },
              }}
              multiline
              rows={4}
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
                  //fontSize: ".8vw",
                },
              }}
            />
          )}{" "}
        </Box>
      </DialogContent>

      
      <Box

        sx={{ width: "100%", justifyContent: "space-evenly", display: "flex", mb: 2 }}
      >
        <Button 
        className="cancelar"
        onClick={() => close()} >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Cancelar
          </Typography>
        </Button>
        <Button  
        className="aceptar"
        onClick={() => checkValues()} >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Agregar
          </Typography>
        </Button>
      </Box>
    </Dialog>
  );
};
