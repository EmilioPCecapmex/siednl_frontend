import {
  Dialog,
  Box,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  TextField,
  Alert,
  IconButton,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";

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
  const [emptyTxt, setEmptyTxt] = useState(false)

  const checkValues = () => {
    if(descA === "" || descB === ""){
        setEmptyTxt(true)
    }else{
      console.log(tipo)
       
        if(tipo === 'Índice'){
          textoSet("(" + descA.replaceAll('"','').replaceAll("'","").replaceAll('\n','') + ")");
          close();
        }else if(tipo === 'Porcentaje'){
          textoSet("(" + descA.replaceAll('"','').replaceAll("'","").replaceAll('\n','') + "/" + descB.replaceAll('"','').replaceAll("'","").replaceAll('\n','') + ")" + "*100");
          close();
        }
    }
  };

  useLayoutEffect(() => {
    if (prevText !== "" && prevText !== undefined) {
      setDescA(prevText?.substring(1).split("/")[0]);
      setDescB(prevText?.substring(1).split("/")[1].split(")")[0]);
    } else if (prevText === "") {
      setDescA("");
      setDescB("");
    }
    setEmptyTxt(false)
  }, [open]);


  return (
    <Dialog
      open={open}
      fullWidth
    >
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
            ?  "La tasa de variación es el cambio en porcentaje entre dos valores."
            : null}
              {tipo === "Promedio"
            ?  "El promedio es un número representativo que puede obtenerse a partir de una lista de cifras."
            : null}
              {tipo === "Índice"
            ?  "El índice de un número nos muestra cuántas veces debemos usar ese número en una multiplicación."
            : null}
        </Typography>
    
      </Box>

      <DialogContent>
      <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

        open={emptyTxt}
        onClose={() => setEmptyTxt(false)}
        autoHideDuration={2000}
      >
        <Alert severity="warning">
            Completa ambos campos
        </Alert>
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
            sx={{width: '45%'}}
            value={descA}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratSemiBold",
                fontSize: '.8vw'
              },
            }}
            onChange={(c) => setDescA(c.target.value.replaceAll('"','').replaceAll("'","").replaceAll('\n',''))}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
                fontSize: '.8vw'
              },
            }}
          />
          <TextField
            label="Descripción B"
            sx={{width: '45%'}}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratSemiBold",
                fontSize: '.8vw'

              },
            }}
            multiline
            rows={4}
            value={descB}
            onChange={(c) => setDescB(c.target.value.replaceAll('"','').replaceAll("'","").replaceAll('\n',''))}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
                fontSize: '.8vw'

              },
            }}
          />{" "}
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
