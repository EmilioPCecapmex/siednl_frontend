import {
  Dialog,
  Box,
  DialogContent,
  Button,
  Typography,
  TextField,
  Alert,
  Snackbar,
  DialogTitle,
  Grid,
  DialogActions,
} from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { queries } from "../../queries";

export const DialogFinPropositoRaffi = ({
  open,
  close,
  setValor,
  tipo,
  elemento,
}: {
  open: boolean;
  close: Function;
  setValor: Function;
  tipo: string;
  elemento: string;
}) => {
  const [Numerodador, setNumerdaor] = useState("");
  const [Denominador, setDenominador] = useState("");

  const handleClose = () => {
    close(false); // Call the close function provided as a prop when the dialog should be closed.
  };

  const handleChange = () => {
    switch (elemento) {
      case "PORCENTAJE":
        let aux = (parseFloat(Numerodador) / parseFloat(Denominador)) * 100;

        if (
          Numerodador === "" ||
          Numerodador === null ||
          Denominador === "" ||
          Denominador === null
        ) {
          console.log("estoy vacio");
        } else {
          setValor(aux, elemento, tipo);
          setNumerdaor("");
          setDenominador("");
          close(false);
        }
        break;

      case "INDICE":
        let aux2 = (parseFloat(Numerodador))
        if (
            Numerodador === "" ||
            Numerodador === null 
          ) {
            console.log("estoy vacio");
          } else {
            setValor(aux2, elemento, tipo);
            setNumerdaor("");
            setDenominador("");
            close(false);
          }
        break;

      case "PROMEDIO":
        let aux3 = (parseFloat(Numerodador) + parseFloat(Denominador)) / 2;

        if (
          Numerodador === "" ||
          Numerodador === null ||
          Denominador === "" ||
          Denominador === null
        ) {
          console.log("estoy vacio");
        } else {
          setValor(aux3, elemento, tipo);
          setNumerdaor("");
          setDenominador("");
          close(false);
        }
        break;

      case "TASA":
        let aux4 = ((parseFloat(Numerodador) - parseFloat(Denominador)) / parseFloat(Denominador)) * 100;
        if (
            Numerodador === "" ||
            Numerodador === null ||
            Denominador === "" ||
            Denominador === null
          ) {
            console.log("estoy vacio");
          } else {
            setValor(aux4, elemento, tipo);
            setNumerdaor("");
            setDenominador("");
            close(false);
          }
        break;
    }
  };

  return (
    <Dialog open={open} fullWidth keepMounted onClose={handleClose}>
      <DialogTitle>
        <Typography sx={queries.medium_text}>
          {elemento} - FORMULA - {tipo}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          sx={{
            width: "100%",
            justifyContent: "space-evenly",
            display: "flex",
            height: "16vh",
            alignItems: "center",
          }}
          lg={12}
          direction={"row"}
        >
          <Grid item lg={5}>
            <TextField
              label="NUMERADOR"
              multiline
              rows={4}
              sx={{ width: "100%" }}
              value={Numerodador}
              onChange={(x) =>
                setNumerdaor(
                  x.target.value
                    .replaceAll('"', "")
                    .replaceAll("'", "")
                    .replaceAll("\n", "")
                    .replaceAll(/[^0-9.]+/g, "")
                )
              }
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratSemiBold",
                  fontSize: ".8vw",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                  fontSize: ".8vw",
                },
              }}
            />
          </Grid>
          {tipo === "Indice" || tipo === "Índice" ? (
            ""
          ) : (
            <Grid item lg={5}>
              <TextField
                label="DENOMINADOR"
                multiline
                rows={4}
                sx={{ width: "100%" }}
                value={Denominador}
                onChange={(x) =>
                  setDenominador(
                    x.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                      .replaceAll(/[^0-9.]+/g, "")
                  )
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                    fontSize: ".8vw",
                  },
                }}
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
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          sx={queries.buttonCancelarSolicitudInscripcion}
          onClick={() => close(false)}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            handleChange();
          }}
          variant="text"
          sx={queries.buttonContinuarSolicitudInscripcion}
        >
          Calcular
        </Button>
      </DialogActions>
    </Dialog>
  );
};
