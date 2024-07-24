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
import { log } from "console";
import { clearInfo } from "../genericComponents/GenericMethods";
import { IMA } from "../tabsMetaAnual/IMA";


export const DialogFinPropositoRaffi = ({
  open,
  close,
  setValor,
  tipo,
  MA,
  elemento,
}: {
  open: boolean;
  close: Function;
  setValor: Function;
  tipo: string;
  MA: string;
  elemento: string;
}) => {
  const [Numerador, setNumerdaor] = useState("");
  const [Denominador, setDenominador] = useState("");

  const jsonMA: IMA = JSON.parse(MA) || "";

  const handleClose = () => {
    close(false); // Call the close function provided as a prop when the dialog should be closed.
  };

  //const ValorNumerador = (tipo === "FIN") ? setNumerdaor(jsonMA.fin.valorNumerador) : (tipo === "PROPOSITO") ? setNumerdaor(jsonMA.fin.valorNumerador) : "";

  useEffect(() => {
    if (tipo === "FIN") {
      setDenominador(jsonMA.fin.valorDenominador);
    } else if (tipo === "PROPOSITO") {
      setDenominador(jsonMA.proposito.valorDenominador);
    } else {
      setDenominador('');
    }
  }, [open]);

  const handleChange = () => {
    switch (elemento) {
      case "PORCENTAJE":
        let aux = (parseFloat(Numerador) / parseFloat(Denominador)) * 100;
        aux = parseFloat(aux.toFixed(2));
        if (
          Numerador === "" ||
          Numerador === null ||
          Denominador === "" ||
          Denominador === null
        ) {
        } else {
          setValor(aux, elemento, tipo);
          setNumerdaor("");
          setDenominador("");
          close(false);
        }
        break;

      case "INDICE" || "ÍNDICE":
        let aux2 = parseFloat(Numerador);
        aux2 = parseFloat(aux2.toFixed(2));
      
        if (Numerador === "" || Numerador === null) {
        } else {
          setValor(aux2, elemento, tipo);
          setNumerdaor("");
          setDenominador("");
          close(false);
        }
        break;

      case "PROMEDIO":
        let aux3 = (parseFloat(Numerador) + parseFloat(Denominador)) / 2;
        aux3 = parseFloat(aux3.toFixed(2));

        if (
          Numerador === "" ||
          Numerador === null ||
          Denominador === "" ||
          Denominador === null
        ) {
        } else {
          setValor(aux3, elemento, tipo);
          setNumerdaor("");
          setDenominador("");
          close(false);
        }
        break;

      case "TASA":
        let aux4 =
          ((parseFloat(Numerador) - parseFloat(Denominador)) /
            parseFloat(Denominador)) *100;
            aux4 = parseFloat(aux4.toFixed(2));
        if (
          Numerador === "" ||
          Numerador === null ||
          Denominador === "" ||
          Denominador === null
        ) {
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
              value={Numerador}
              onChange={(x) =>
                setNumerdaor(
                  clearInfo(x.target.value)
                    .replaceAll(/[^0-9.]+/g, "")
                )
              }
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratSemiBold",
                  
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                  
                },
              }}
            />
          </Grid>
          {elemento === "Indice" || elemento === "Índice" || elemento === "ÍNDICE" || elemento === "INDICE"? (
            ""
          ) : (
            <Grid item lg={5}>
              <TextField
                label="DENOMINADOR"
                multiline
                rows={4}
                sx={{ width: "100%" , }}
                value={Denominador}
                onChange={(x) =>
                  setDenominador(
                    clearInfo(x.target.value)
                      .replaceAll(/[^0-9.]+/g, "")
                  )
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                    
                  },
                }}
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
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          className="cancelar"
          onClick={() => close(false)}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            handleChange();
          }}
          variant="text"
          className="aceptar"
        >
          Calcular
        </Button>
      </DialogActions>
    </Dialog>
  );
};
