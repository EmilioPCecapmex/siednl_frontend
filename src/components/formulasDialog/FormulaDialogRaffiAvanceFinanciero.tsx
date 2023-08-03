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


export const DialogMonto = ({
  open,
  close,
  trimestre,
  selector,
  setValor,
}: {
  open: boolean;
  close: Function;
  trimestre: string;
  selector: string;
  setValor: Function;
}) => {
  const [Numerodador, setNumerdaor] = useState("");
  const [Denominador, setDenominador] = useState("");


  const handleClose = () => {
    close(false); // Call the close function provided as a prop when the dialog should be closed.
  };

  
    

  const handleChange = () => {
    let aux = parseFloat(Numerodador) / parseFloat(Denominador);
    if (
      Numerodador === "" ||
      Numerodador === null ||
      Denominador === "" ||
      Denominador === null
    ) {
      console.log("estoy vacio");
    } else {
      setValor(aux, selector, trimestre);
      setNumerdaor("");
      setDenominador("");
      close(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        fullWidth
        keepMounted
        onClose={handleClose}
       
      >
        <DialogTitle>
          <Typography sx={queries.medium_text}>
            CALCULO {selector} {trimestre}
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
                rows={4}
                sx={{ width: "100%" }}
                //value={descA}
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

            <Grid item lg={5}>
              <TextField
                label="DENOMINADOR"
                multiline
                rows={4}
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
                sx={{ width: "100%" }}
                //value={descA}
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
    </>
  );
};
