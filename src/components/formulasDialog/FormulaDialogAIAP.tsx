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
import { useLayoutEffect, useState, useEffect } from "react";
import { queries } from "../../queries";
import { IComponenteMA } from "../tabsMetaAnual/Interfaces";
import { validarNumero } from "../../services/validations";
import { clearInfo } from "../genericComponents/GenericMethods";

export const FormulaDialogAIAP = ({
  open,
  close,
  textoSet,
  tipo,
  elemento,
  elementoA,
  MIR,
  frecuencia,
  valores,
}: {
  open: boolean;
  close: Function;
  textoSet: Function;
  tipo: string;
  elemento: string;
  elementoA: string;
  MIR: string;
  frecuencia: string;
  valores: string;
}) => {
  console.log("valores:"+valores)
  let valoresJSON=JSON.parse(valores)

  const [ValorA, setValorA] = useState("");
  const [ValorB, setValorB] = useState("");
  const [ValorC, setValorC] = useState("");
  const [ValorD, setValorD] = useState("");
  const [ValorE, setValorE] = useState("");
  const [ValorF, setValorF] = useState("");
  const [ValorG, setValorG] = useState("");
  const [ValorH, setValorH] = useState("");
  const [ValorI, setValorI] = useState("");
  const [ValorJ, setValorJ] = useState("");
  const [ValorK, setValorK] = useState("");
  const [ValorL, setValorL] = useState("");
  const [emptyTxt, setEmptyTxt] = useState(false);

 

  const limpiaVar = () => {
    setValorA("");
    setValorB("");
    setValorC("");
    setValorD("");
    setValorE("");
    setValorF("");
    setValorG("");
    setValorH("");
  };

  // useEffect(() => {
  //   if (frecuencia === "trimestral" && (tipo.toLowerCase() === "indice" || tipo.toLowerCase() === "índice"))
  //   {
  //     setValorA(valoresJSON?.metasPorFrecuencia[0]?.trimestre1)
  //     setValorB(valoresJSON?.metasPorFrecuencia[0]?.trimestre2)
  //     setValorC(valoresJSON?.metasPorFrecuencia[0]?.trimestre3)
  //     setValorD(valoresJSON?.metasPorFrecuencia[0]?.trimestre4)
  //   }else if(frecuencia === "trimestral")
  //   {
  //     setValorA(valoresJSON?.valoresPorFrecuencia[0]?.valorA)
  //     setValorB(valoresJSON?.valoresPorFrecuencia[0]?.valorB)
  //     setValorC(valoresJSON?.valoresPorFrecuencia[0]?.valorC)
  //     setValorD(valoresJSON?.valoresPorFrecuencia[0]?.valorD)
  //     setValorE(valoresJSON?.valoresPorFrecuencia[0]?.valorE)
  //     setValorF(valoresJSON?.valoresPorFrecuencia[0]?.valorF)
  //     setValorG(valoresJSON?.valoresPorFrecuencia[0]?.valorG)
  //     setValorH(valoresJSON?.valoresPorFrecuencia[0]?.valorH)
  //   }else if (frecuencia === "semestral" && (tipo.toLowerCase() === "indice" || tipo.toLowerCase() === "índice"))
  //   {
  //     setValorA(valoresJSON?.metasPorFrecuencia[0]?.semestre1)
  //     setValorB(valoresJSON?.metasPorFrecuencia[0]?.semestre2)
      
  //   }else
  //   {
  //     setValorA(valoresJSON?.metasPorFrecuencia[0])
  //     setValorB(valoresJSON?.metasPorFrecuencia[0])
  //     setValorC(valoresJSON?.metasPorFrecuencia[0]?.valorC)
  //     setValorD(valoresJSON?.metasPorFrecuencia[0]?.valorD)
      
  //   }
  // }, [open]);

  const checkValues = () => {
      if (tipo.toLowerCase() === "indice" || tipo.toLowerCase() === "índice") {
        if (
          /^[\s]*$/.test(ValorA) ||
          /^[\s]*$/.test(ValorB) ||
          /^[\s]*$/.test(ValorC) ||
          /^[\s]*$/.test(ValorD)
        ) {
          setEmptyTxt(true);
        } else {
          textoSet(
            parseFloat(ValorA).toFixed(2) +
              "," +
              parseFloat(ValorB).toFixed(2) +
              "," +
              parseFloat(ValorC).toFixed(2) +
              "," +
              parseFloat(ValorD).toFixed(2) +
              "," +
              parseFloat(ValorE).toFixed(2) +
              "," +
              parseFloat(ValorF).toFixed(2)
              ,""
          );
          limpiaVar();
          close();
        }
      } else {
        if (
          /^[\s]*$/.test(ValorA) ||
          /^[\s]*$/.test(ValorB) ||
          /^[\s]*$/.test(ValorC) ||
          /^[\s]*$/.test(ValorD) ||
          /^[\s]*$/.test(ValorE) ||
          /^[\s]*$/.test(ValorF) ||
          /^[\s]*$/.test(ValorG) ||
          /^[\s]*$/.test(ValorH) ||
          /^[\s]*$/.test(ValorI) ||
          /^[\s]*$/.test(ValorJ) ||
          /^[\s]*$/.test(ValorK) ||
          /^[\s]*$/.test(ValorL)
        ) {
          setEmptyTxt(true);
        } else {
          
            let T1 = (parseFloat(ValorA) / parseFloat(ValorB)) * 100;
            let T2 =
            (parseFloat(ValorC) / parseFloat(ValorD)) * 100;
            let T3 =
            (parseFloat(ValorE) / parseFloat(ValorF)) * 100;
            let T4 =
            (parseFloat(ValorG) / parseFloat(ValorH)) * 100;
            let T5 =
            (parseFloat(ValorI) / parseFloat(ValorJ)) * 100;
            let T6 =
            (parseFloat(ValorK) / parseFloat(ValorL)) * 100;
            textoSet(
              T1.toFixed(2) +
                "," +
                T2.toFixed(2) +
                "," +
                T3.toFixed(2) +
                "," +
                T4.toFixed(2) +
                "," +
                T5.toFixed(2) +
                "," +
                T6.toFixed(2)
                ,
              ValorA +
              "," +
              ValorB +
              "," +
              ValorC +
              "," +
              ValorD +
              "," +
              ValorE +
              "," +
              ValorF +
              "," +
              ValorG +
              "," +
              ValorH +
              "," +
              ValorI +
              "," +
              ValorJ +
              "," +
              ValorK +
              "," +
              ValorL
            );
            limpiaVar();
            close();
         
      
      }
    }};

  useLayoutEffect(() => {
    setEmptyTxt(false);
  }, [open]);

  let noComponente = parseFloat(elemento.split(" ")[1]);
  let noActividad = parseFloat(elementoA.split("")[3]) - 1;

  

  return (
    <Dialog open={open} fullWidth maxWidth="md">
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
          {elementoA
            ? `${elementoA} - Fórmula - ${tipo}`
            : `${"Componente" + " " + (noComponente + 1)} - Fórmula - ${tipo}`}
        </Typography>
            {ValorA}
        <Typography
          sx={{
            fontFamily: "MontserratRegular",
            fontSize: ".6vw",
            width: "95%",
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
            width: "95%",
            textAlign: "center",
          }}
        >
          {elemento === "Fin" || elemento === "FIN"
            ? JSON.parse(MIR).fin.formula
            : elemento === "Propósito" || elemento === "Proposito" || elemento === "PROPOSITO"
            ? JSON.parse(MIR).proposito.formula
            : elemento.includes("Componente") && (elementoA === "" || elementoA=== undefined )
            ? JSON.parse(MIR).componentes[noComponente]?.formula
            : elementoA.includes("A" || "a" || "Actividad" ) 
            ? JSON.parse(MIR).componentes[noComponente].actividades[noActividad]
                ?.formula
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
          {
          (tipo.toLowerCase() === "indice" ||
            tipo.toLowerCase() === "índice") ? (
            <Box
              sx={{
                width: "80%",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "repeat(4,1fr)",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <Typography>Línea base 2021</Typography>
              <TextField
                // type={"number"}
                label={"Valor"}
                sx={{
                  width: "80%", mb: 2
                }}
                value={ValorA}
                error={
                  parseFloat(ValorA) < 0 ||
                  (isNaN(parseFloat(ValorA)) && ValorA !== "")
                    ? true
                    : false
                }
                helperText={
                  parseFloat(ValorA) < 0 ||
                  (isNaN(parseFloat(ValorA)) && ValorA !== "")
                    ? "Introducir valor mayor que 0"
                    : null
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                onChange={(c) =>
                  setValorA(
                    validarNumero(c.target.value,ValorA)
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Dato I</Typography>
              <TextField
                // type={"number"}
                label={"Valor"}
                sx={{
                  width: "80%", mb: 2
                }}
                value={ValorB}
                error={
                  parseFloat(ValorB) < 0 ||
                  (isNaN(parseFloat(ValorB)) && ValorB !== "")
                    ? true
                    : false
                }
                helperText={
                  parseFloat(ValorB) < 0 ||
                  (isNaN(parseFloat(ValorB)) && ValorB !== "")
                    ? "Introducir valor mayor que 0"
                    : null
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                onChange={(c) =>
                  setValorB(
                    validarNumero(c.target.value,ValorB)
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Dato II</Typography>
              <TextField
                // type={"number"}
                label={"Valor"}
                sx={{
                  width: "80%", mb: 2
                }}
                value={ValorC}
                error={
                  parseFloat(ValorC) < 0 ||
                  (isNaN(parseFloat(ValorC)) && ValorC !== "")
                    ? true
                    : false
                }
                helperText={
                  parseFloat(ValorC) < 0 ||
                  (isNaN(parseFloat(ValorC)) && ValorC !== "")
                    ? "Introducir valor mayor que 0"
                    : null
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                onChange={(c) =>
                  setValorC(
                    validarNumero(c.target.value,ValorC)
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Dato III</Typography>
              <TextField
                // type={"number"}
                label={"Valor"}
                sx={{
                  width: "80%"
                }}
                value={ValorD}
                error={
                  parseFloat(ValorD) < 0 ||
                  (isNaN(parseFloat(ValorD)) && ValorD !== "")
                    ? true
                    : false
                }
                helperText={
                  parseFloat(ValorD) < 0 ||
                  (isNaN(parseFloat(ValorD)) && ValorD !== "")
                    ? "Introducir valor mayor que 0"
                    : null
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                onChange={(c) =>
                  setValorD(
                    validarNumero(c.target.value,ValorD)
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Dato IV</Typography>
              <TextField
                // type={"number"}
                label={"Valor"}
                sx={{
                  width: "80%"
                }}
                value={ValorE}
                error={
                  parseFloat(ValorE) < 0 ||
                  (isNaN(parseFloat(ValorE)) && ValorE !== "")
                    ? true
                    : false
                }
                helperText={
                  parseFloat(ValorE) < 0 ||
                  (isNaN(parseFloat(ValorE)) && ValorE !== "")
                    ? "Introducir valor mayor que 0"
                    : null
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                onChange={(c) =>
                  setValorE(
                    validarNumero(c.target.value,ValorE)
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Anual</Typography>
              <TextField
                // type={"number"}
                label={"Valor"}
                sx={{
                  width: "80%"
                }}
                value={ValorF}
                error={
                  parseFloat(ValorF) < 0 ||
                  (isNaN(parseFloat(ValorF)) && ValorF !== "")
                    ? true
                    : false
                }
                helperText={
                  parseFloat(ValorF) < 0 ||
                  (isNaN(parseFloat(ValorF)) && ValorF !== "")
                    ? "Introducir valor mayor que 0"
                    : null
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                onChange={(c) =>
                  setValorF(
                    validarNumero(c.target.value,ValorF)
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gridTemplateRows: "repeat(4,1fr)",
                justifyItems: "start",
                alignItems: "center",
              }}
            >
              <Typography>Línea base 2021</Typography>
              <TextField
                // type={"number"}
                label={
                  <Typography
                    sx={{
                     
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{
                  width: "95%", mb: 2
                }}
                value={ValorA}
                error={parseFloat(ValorA) < 0 ? true : false}
                helperText={
                  parseFloat(ValorA) < 0 ? "Introducir valor mayor que 0" : null
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                onChange={(c) =>
                  setValorA(
                    validarNumero(c.target.value,ValorA)
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
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{
                  width: "95%", mb: 2
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorB}
                onChange={(c) =>
                  setValorB(
                    validarNumero(c.target.value,ValorB)
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              
              <Typography>Dato I</Typography>
              <TextField
                // type={"number"}
                label={
                  <Typography
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{
                  width: "95%"
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorC}
                onChange={(c) =>
                  setValorC(
                    validarNumero(c.target.value,ValorC)
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
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{
                  width: "95%"
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorD}
                onChange={(c) =>
                  setValorD(
                    validarNumero(c.target.value,ValorD)
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Dato II</Typography>
              <TextField
                // type={"number"}
                label={
                  <Typography
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{
                  width: "95%"
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorE}
                onChange={(c) =>
                  setValorE(
                    validarNumero(c.target.value,ValorE)
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
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{
                  width: "95%"
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorF}
                onChange={(c) =>
                  setValorF(
                    validarNumero(c.target.value,ValorF)
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Dato III</Typography>
              <TextField
                // type={"number"}
                label={
                  <Typography
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{
                  width: "95%"
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorG}
                onChange={(c) =>
                  setValorG(
                    validarNumero(c.target.value,ValorG)
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
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{
                  width: "95%"
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorH}
                onChange={(c) =>
                  setValorH(
                    validarNumero(c.target.value,ValorH)
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Dato IV</Typography>
              <TextField
                // type={"number"}
                label={
                  <Typography
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{
                  width: "95%"
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorI}
                onChange={(c) =>
                  setValorI(
                    validarNumero(c.target.value,ValorI)
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
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{
                  width: "95%"
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorJ}
                onChange={(c) =>
                  setValorJ(
                    validarNumero(c.target.value,ValorJ)
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Anual</Typography>
              <TextField
                // type={"number"}
                label={
                  <Typography
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{
                  width: "95%"
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorK}
                onChange={(c) =>
                  setValorK(
                    validarNumero(c.target.value,ValorK)
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
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{
                  width: "95%"
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorL}
                onChange={(c) =>
                  setValorL(
                    validarNumero(c.target.value,ValorL)
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              
            </Box>
          )}
        </Box>
      </DialogContent>
      <Box
        sx={{
          width: "100%",
          justifyContent: "space-evenly",
          display: "flex",
          mb: 2,
        }}
      >
        <Button className="cancelar" onClick={() => close()}>
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Cancelar
          </Typography>
        </Button>
        <Button
          className="aceptar"
          onClick={() => {
            
            checkValues();
          }}
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Agregar
          </Typography>
        </Button>
      </Box>
    </Dialog>
  );
};
