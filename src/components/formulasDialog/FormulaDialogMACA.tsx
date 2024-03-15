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

export const FormulaDialogMACA = ({
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
  let valoresJSON=JSON.parse(valores)

  const [ValorA, setValorA] = useState("");
  const [ValorB, setValorB] = useState("");
  const [ValorC, setValorC] = useState("");
  const [ValorD, setValorD] = useState("");
  const [ValorE, setValorE] = useState("");
  const [ValorF, setValorF] = useState("");
  const [ValorG, setValorG] = useState("");
  const [ValorH, setValorH] = useState("");
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

  useEffect(() => {
    if (frecuencia === "trimestral" && (tipo.toLowerCase() === "indice" || tipo.toLowerCase() === "índice"))
    {
      setValorA(valoresJSON?.metasPorFrecuencia[0]?.trimestre1)
      setValorB(valoresJSON?.metasPorFrecuencia[0]?.trimestre2)
      setValorC(valoresJSON?.metasPorFrecuencia[0]?.trimestre3)
      setValorD(valoresJSON?.metasPorFrecuencia[0]?.trimestre4)
    }else if(frecuencia === "trimestral")
    {
      setValorA(valoresJSON?.valoresPorFrecuencia[0]?.valorA)
      setValorB(valoresJSON?.valoresPorFrecuencia[0]?.valorB)
      setValorC(valoresJSON?.valoresPorFrecuencia[0]?.valorC)
      setValorD(valoresJSON?.valoresPorFrecuencia[0]?.valorD)
      setValorE(valoresJSON?.valoresPorFrecuencia[0]?.valorE)
      setValorF(valoresJSON?.valoresPorFrecuencia[0]?.valorF)
      setValorG(valoresJSON?.valoresPorFrecuencia[0]?.valorG)
      setValorH(valoresJSON?.valoresPorFrecuencia[0]?.valorH)
    }else if (frecuencia === "semestral" && (tipo.toLowerCase() === "indice" || tipo.toLowerCase() === "índice"))
    {
      setValorA(valoresJSON?.metasPorFrecuencia[0]?.semestre1)
      setValorB(valoresJSON?.metasPorFrecuencia[0]?.semestre2)
      
    }else
    {
      setValorA(valoresJSON?.valoresPorFrecuencia[0]?.valorA)
      setValorB(valoresJSON?.valoresPorFrecuencia[0]?.valorB)
      setValorC(valoresJSON?.valoresPorFrecuencia[0]?.valorC)
      setValorD(valoresJSON?.valoresPorFrecuencia[0]?.valorD)
      
    }
  }, [open]);

  const checkValues = () => {
    if (frecuencia === "trimestral") {
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
              parseFloat(ValorD).toFixed(2)
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
          /^[\s]*$/.test(ValorH)
        ) {
          setEmptyTxt(true);
        } else {
          if (tipo === "Porcentaje") {
            let T1 = (parseFloat(ValorA) / parseFloat(ValorB)) * 100;
            let T2 =
              ((parseFloat(ValorA) + parseFloat(ValorC)) /
                (parseFloat(ValorB) + parseFloat(ValorD))) *
              100;
            let T3 =
              ((parseFloat(ValorA) + parseFloat(ValorC) + parseFloat(ValorE)) /
                (parseFloat(ValorB) + parseFloat(ValorD) + parseFloat(ValorF))) *
              100;
            let T4 =
              ((parseFloat(ValorA) +
                parseFloat(ValorC) +
                parseFloat(ValorE) +
                parseFloat(ValorG)) /
                (parseFloat(ValorB) +
                  parseFloat(ValorD) +
                  parseFloat(ValorF) +
                  parseFloat(ValorH))) *
              100;
            textoSet(
              T1.toFixed(2) +
                "," +
                T2.toFixed(2) +
                "," +
                T3.toFixed(2) +
                "," +
                T4.toFixed(2)
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
              ValorH
            );
            limpiaVar();
            close();
          } else if (tipo === "Tasa") {
            let T1 =
              ((parseFloat(ValorA) - parseFloat(ValorB)) / parseFloat(ValorB)) *
              100;
            let T2 =
              ((parseFloat(ValorA) +parseFloat(ValorC) - (parseFloat(ValorB) + parseFloat(ValorD))) /(parseFloat(ValorB) + parseFloat(ValorD))) * 100;
            let T3 =
              ((parseFloat(ValorA) + parseFloat(ValorC) + parseFloat(ValorE) -
                (parseFloat(ValorB) + parseFloat(ValorD) + parseFloat(ValorF))) /
                (parseFloat(ValorB) + parseFloat(ValorD) + parseFloat(ValorF))) *
              100;
            let T4 =
              ((parseFloat(ValorA) +
                parseFloat(ValorC) +
                parseFloat(ValorE) +
                parseFloat(ValorG) -
                (parseFloat(ValorB) +
                  parseFloat(ValorD) +
                  parseFloat(ValorF) +
                  parseFloat(ValorH))) /
                (parseFloat(ValorB) +
                  parseFloat(ValorD) +
                  parseFloat(ValorF) +
                  parseFloat(ValorH))) *
              100;
            textoSet(
              T1.toFixed(2) +
                "," +
                T2.toFixed(2) +
                "," +
                T3.toFixed(2) +
                "," +
                T4.toFixed(2)
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
              ValorH
            );

            limpiaVar();
            close();
          } else if (tipo === "Promedio") {
            let T1 = parseFloat(ValorA) / parseFloat(ValorB);
            let T2 =
              (parseFloat(ValorA) + parseFloat(ValorC)) /
              (parseFloat(ValorB) + parseFloat(ValorD));
            let T3 =
              (parseFloat(ValorA) + parseFloat(ValorC) + parseFloat(ValorE)) /
              (parseFloat(ValorB) + parseFloat(ValorD) + parseFloat(ValorF));
            let T4 =
              (parseFloat(ValorA) +
                parseFloat(ValorC) +
                parseFloat(ValorE) +
                parseFloat(ValorG)) /
              (parseFloat(ValorB) +
                parseFloat(ValorD) +
                parseFloat(ValorF) +
                parseFloat(ValorH));
            textoSet(
              T1.toFixed(2) +
                "," +
                T2.toFixed(2) +
                "," +
                T3.toFixed(2) +
                "," +
                T4.toFixed(2)
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
              ValorH
            );

            limpiaVar();
            close();
          }
        }
      }
    } else {
      console.log("tipo ",tipo)
      if (tipo.toLowerCase() === "indice" || tipo.toLowerCase() === "índice")
        if (/^[\s]*$/.test(ValorA) || /^[\s]*$/.test(ValorB)) {
          setEmptyTxt(true);
        } else {
          textoSet(
            parseFloat(ValorA).toFixed(2) + "," + parseFloat(ValorB).toFixed(2),""
          );
          limpiaVar();
          close();
        }
      else if (
        /^[\s]*$/.test(ValorA) ||
        /^[\s]*$/.test(ValorB) ||
        /^[\s]*$/.test(ValorC) ||
        /^[\s]*$/.test(ValorD)
      ) {
        setEmptyTxt(true);
      } else if (tipo === "Porcentaje") {
        let S1 = (parseFloat(ValorA) / parseFloat(ValorB)) * 100;
        let S2 =
          ((parseFloat(ValorA) + parseFloat(ValorC)) /
            (parseFloat(ValorB) + parseFloat(ValorD))) *
          100;

        textoSet(S1.toFixed(2) + "," + S2.toFixed(2)
        ,
              ValorA +
              "," +
              ValorB +
              "," +
              ValorC +
              "," +
              ValorD);

        limpiaVar();
        close();
      } else if (tipo === "Tasa") {
        let S1 =
          ((parseFloat(ValorA) - parseFloat(ValorB)) / parseFloat(ValorB)) * 100;
        let S2 =
          ((parseFloat(ValorA) +
            parseFloat(ValorC) -
            (parseFloat(ValorB) + parseFloat(ValorD))) /
            (parseFloat(ValorB) + parseFloat(ValorD))) *
          100;
          
        textoSet(S1.toFixed(2) + "," + S2.toFixed(2)
        ,
              ValorA +
              "," +
              ValorB +
              "," +
              ValorC +
              "," +
              ValorD);

        limpiaVar();
        close();
      } else if (tipo === "Promedio") {
        let S1 = parseFloat(ValorA) / parseFloat(ValorB);
        let S2 =
          (parseFloat(ValorA) + parseFloat(ValorC)) /
          (parseFloat(ValorB) + parseFloat(ValorD));
        textoSet(S1.toFixed(2) + "," + S2.toFixed(2)
        ,
              ValorA +
              "," +
              ValorB +
              "," +
              ValorC +
              "," +
              ValorD);

        limpiaVar();
        close();
      }
    }
  };


  useLayoutEffect(() => {
    setEmptyTxt(false);
  }, [open]);

  let noComponente = parseFloat(elemento.split(" ")[1]);
  let noActividad = parseFloat(elemento.split("")[3]);

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
          {elemento === "Fin"
            ? JSON.parse(MIR).fin.formula
            : elemento === "Propósito"
            ? JSON.parse(MIR).proposito.formula
            : elemento.includes("Componente")
            ? JSON.parse(MIR).componentes[noComponente]?.formula
            : elemento.includes("A")
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
          {frecuencia === "trimestral" &&
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
              <Typography>Trimestre 1</Typography>
              <TextField
                type={"number"}
                label={"Valor"}
                sx={{ width: "80%", mb: 2 }}
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
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Trimestre 2</Typography>
              <TextField
                type={"number"}
                label={"Valor"}
                sx={{ width: "80%", mb: 2 }}
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
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Trimestre 3</Typography>
              <TextField
                type={"number"}
                label={"Valor"}
                sx={{ width: "80%", mb: 2 }}
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
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Trimestre 4</Typography>
              <TextField
                type={"number"}
                label={"Valor"}
                sx={{ width: "80%" }}
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
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
            </Box>
          ) : frecuencia === "trimestral" ? (
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
              <Typography>Trimestre 1</Typography>
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{
                     
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{ width: "95%", mb: 2 }}
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
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <TextField
                type={"number"}
                label={
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{ width: "95%", mb: 2 }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorB}
                onChange={(c) =>
                  setValorB(
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              
              <Typography>Trimestre 2</Typography>
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{ width: "95%" }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorC}
                onChange={(c) =>
                  setValorC(
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{ width: "95%" }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorD}
                onChange={(c) =>
                  setValorD(
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Trimestre 3</Typography>
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{ width: "95%" }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorE}
                onChange={(c) =>
                  setValorE(
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{ width: "95%" }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorF}
                onChange={(c) =>
                  setValorF(
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Trimestre 4</Typography>
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{ width: "95%" }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorG}
                onChange={(c) =>
                  setValorG(
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{ width: "95%" }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorH}
                onChange={(c) =>
                  setValorH(
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Acumulado Anual</Typography>

              <Typography>
                {parseFloat(ValorA) +
                  parseFloat(ValorC) +
                  parseFloat(ValorE) +
                  parseFloat(ValorG) || 0}
              </Typography>
              <Typography>
                {parseFloat(ValorB) +
                  parseFloat(ValorD) +
                  parseFloat(ValorF) +
                  parseFloat(ValorH) || 0}
              </Typography>
            </Box>
          ) : frecuencia === "semestral" &&
            (tipo.toLowerCase() === "indice" ||
              tipo.toLowerCase() === "índice") ? (
            <Box
              sx={{
                width: "80%",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "repeat(2,1fr)",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <Typography>Semestre 1</Typography>
              <TextField
                type={"number"}
                label={"Valor"}
                sx={{ width: "95%", mb: 2 }}
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
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Semestre 2</Typography>
              <TextField
                type={"number"}
                label={"Valor"}
                sx={{ width: "95%" }}
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
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
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
              <Typography>Semestre 1</Typography>
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{ width: "95%", mb: 2 }}
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
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{ width: "95%", mb: 2 }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorB}
                onChange={(c) =>
                  setValorB(
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Semestre 2</Typography>
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{ width: "95%" }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorC}
                onChange={(c) =>
                  setValorC(
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{ fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{ width: "95%" }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                value={ValorD}
                onChange={(c) =>
                  setValorD(
                    c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                  )
                }
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
              />
              <Typography>Acumulado Anual</Typography>

              <Typography>
                {parseFloat(ValorA) + parseFloat(ValorC) || 0}
              </Typography>
              <Typography>
                {parseFloat(ValorB) + parseFloat(ValorD) || 0}
              </Typography>
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
            // console.log("componentesMA: ", componentesMA);
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
