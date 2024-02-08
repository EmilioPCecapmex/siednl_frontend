import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { queries } from "../../queries";
import { validarNumero } from "../../services/validations";


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
  const [numerador, setNumerador] = useState("");
  const [denominador, setdenominador] = useState("");


  const handleClose = () => {
    close(false); // Call the close function provided as a prop when the dialog should be closed.
  };

  const handleChange = () => {
    let aux = parseFloat(numerador) / parseFloat(denominador);
    if (
      numerador === "" ||
      numerador === null ||
      denominador === "" ||
      denominador === null
    ) {
    } else {
      setValor(aux, selector, trimestre, numerador, denominador);
      setNumerador("");
      setdenominador("");
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
                value={numerador}
                onChange={(x) =>
                  setNumerador(validarNumero(x.target.value,numerador))
                }
                rows={4}
                sx={{ width: "100%" }}
                //value={descA}
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

            <Grid item lg={5}>
              <TextField
                label="DENOMINADOR"
                multiline
                rows={4}
                value={denominador}
                onChange={(x) =>setdenominador(validarNumero(x.target.value,denominador))}
                sx={{ width: "100%" }}
                //value={descA}
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


          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            //sx={queries.buttonCancelarSolicitudInscripcion}
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
            //sx={queries.buttonContinuarSolicitudInscripcion}
          >
            Calcular
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
