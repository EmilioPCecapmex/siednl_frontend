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
import { useLayoutEffect, useState } from "react";
import { queries } from "../../queries";
export const FormulaDialogMA = ({
  open,
  close,
  textoSet,
  tipo,
  elemento,
  elementoA,
  MIR,
}: {
  open: boolean;
  close: Function;
  textoSet: Function;
  tipo: string;
  elemento: string;
  elementoA: string;
  MIR: string;
}) => {
  const [descA, setDescA] = useState("");
  const [descB, setDescB] = useState("");
  const [emptyTxt, setEmptyTxt] = useState(false);

  const limpiaVar = () => {
    setDescA("");
    setDescB("");
  };

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
  let noActividad = parseFloat(elemento.split("")[3]);

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
          {elementoA
            ? `${elementoA} - Fórmula - ${tipo}`
            : `${elemento } - Fórmula - ${tipo}`}
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
            : elemento === "Propósito"
            ? JSON.parse(MIR).proposito.formula
            : elemento.includes("Componente")
            ? JSON.parse(MIR).componentes[noComponente].formula
            : elemento.includes("A")
            ? JSON.parse(MIR).componentes[noComponente].actividades[noActividad]
                ?.formula
            : null}
            {console.log("noComponente: ",noComponente)
            }
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
          }}
        >
          {tipo === "Indice" || tipo === "Índice" ? (
            <TextField
              type={"number"}
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
          ) : (
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                fontSize: [10, 10, 10, 14, 15, 18],
              }}
            >
              <TextField
                type={"number"}
                label={
                  <Typography sx={{ fontFamily: "MontserratBold" }}>
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{ width: "45%", mr: 1 }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                    fontSize: ".8vw",
                  },
                }}
                value={descA}
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
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 10, 14, 15, 18],
                    }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
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
            </Grid>
          )}{" "}
        </Grid>
      </DialogContent>
      <Grid
        sx={{ width: "100%", justifyContent: "space-evenly", display: "flex" }}
      >
        <Button
          sx={queries.buttonCancelarSolicitudInscripcion}
          onClick={() => close()}
        >
          <Typography
            sx={{
              fontFamily: "MontserratMedium",
              fontSize: [10, 10, 10, 14, 15, 18],
            }}
          >
            Cancelar
          </Typography>
        </Button>
        <Button
          sx={queries.buttonContinuarSolicitudInscripcion}
          onClick={() => checkValues()}
        >
          <Typography
            sx={{
              fontFamily: "MontserratMedium",
              fontSize: [10, 10, 10, 14, 15, 18],
            }}
          >
            Agregar
          </Typography>
        </Button>
      </Grid>
    </Dialog>
  );
};
