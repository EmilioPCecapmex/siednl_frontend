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
import { useLayoutEffect, useState } from "react";
import { queries } from "../../queries";

export const FormulaDialogMACA = ({
  open,
  close,
  textoSet,
  tipo,
  elemento,
  elementoA,
  MIR,
  frecuencia,
}: {
  open: boolean;
  close: Function;
  textoSet: Function;
  tipo: string;
  elemento: string;
  elementoA: string;
  MIR: string;
  frecuencia: string;
}) => {
  const [descA, setDescA] = useState("");
  const [descB, setDescB] = useState("");
  const [descC, setDescC] = useState("");
  const [descD, setDescD] = useState("");
  const [descE, setDescE] = useState("");
  const [descF, setDescF] = useState("");
  const [descG, setDescG] = useState("");
  const [descH, setDescH] = useState("");
  const [emptyTxt, setEmptyTxt] = useState(false);

  const limpiaVar = () => {
    setDescA("");
    setDescB("");
    setDescC("");
    setDescD("");
    setDescE("");
    setDescF("");
    setDescG("");
    setDescH("");
  };

  const checkValues = () => {
    if (frecuencia === "trimestral") {
      if (tipo.toLowerCase() === "indice" || tipo.toLowerCase() === "índice") {
        if (
          /^[\s]*$/.test(descA) ||
          /^[\s]*$/.test(descB) ||
          /^[\s]*$/.test(descC) ||
          /^[\s]*$/.test(descD)
        ) {
          setEmptyTxt(true);
        } else {
          textoSet(
            parseFloat(descA).toFixed(2) +
              "," +
              parseFloat(descB).toFixed(2) +
              "," +
              parseFloat(descC).toFixed(2) +
              "," +
              parseFloat(descD).toFixed(2)
          );
          limpiaVar();
          close();
        }
      } else {
        if (
          /^[\s]*$/.test(descA) ||
          /^[\s]*$/.test(descB) ||
          /^[\s]*$/.test(descC) ||
          /^[\s]*$/.test(descD) ||
          /^[\s]*$/.test(descE) ||
          /^[\s]*$/.test(descF) ||
          /^[\s]*$/.test(descG) ||
          /^[\s]*$/.test(descH)
        ) {
          setEmptyTxt(true);
        } else {
          if (tipo === "Porcentaje") {
            let T1 = (parseFloat(descA) / parseFloat(descB)) * 100;
            let T2 =
              ((parseFloat(descA) + parseFloat(descC)) /
                (parseFloat(descB) + parseFloat(descD))) *
              100;
            let T3 =
              ((parseFloat(descA) + parseFloat(descC) + parseFloat(descE)) /
                (parseFloat(descB) + parseFloat(descD) + parseFloat(descF))) *
              100;
            let T4 =
              ((parseFloat(descA) +
                parseFloat(descC) +
                parseFloat(descE) +
                parseFloat(descG)) /
                (parseFloat(descB) +
                  parseFloat(descD) +
                  parseFloat(descF) +
                  parseFloat(descH))) *
              100;
            textoSet(
              T1.toFixed(2) +
                "," +
                T2.toFixed(2) +
                "," +
                T3.toFixed(2) +
                "," +
                T4.toFixed(2)
            );
            limpiaVar();
            close();
          } else if (tipo === "Tasa") {
            let T1 =
              ((parseFloat(descA) - parseFloat(descB)) / parseFloat(descB)) *
              100;
            let T2 =
              ((parseFloat(descA) +
                parseFloat(descC) -
                (parseFloat(descB) + parseFloat(descD))) /
                (parseFloat(descB) + parseFloat(descD))) *
              100;
            let T3 =
              ((parseFloat(descA) +
                parseFloat(descC) +
                parseFloat(descE) -
                (parseFloat(descB) + parseFloat(descD) + parseFloat(descF))) /
                (parseFloat(descB) + parseFloat(descD) + parseFloat(descF))) *
              100;
            let T4 =
              ((parseFloat(descA) +
                parseFloat(descC) +
                parseFloat(descE) +
                parseFloat(descG) -
                (parseFloat(descB) +
                  parseFloat(descD) +
                  parseFloat(descF) +
                  parseFloat(descH))) /
                (parseFloat(descB) +
                  parseFloat(descD) +
                  parseFloat(descF) +
                  parseFloat(descH))) *
              100;
            textoSet(
              T1.toFixed(2) +
                "," +
                T2.toFixed(2) +
                "," +
                T3.toFixed(2) +
                "," +
                T4.toFixed(2)
            );

            limpiaVar();
            close();
          } else if (tipo === "Promedio") {
            let T1 = parseFloat(descA) / parseFloat(descB);
            let T2 =
              (parseFloat(descA) + parseFloat(descC)) /
              (parseFloat(descB) + parseFloat(descD));
            let T3 =
              (parseFloat(descA) + parseFloat(descC) + parseFloat(descE)) /
              (parseFloat(descB) + parseFloat(descD) + parseFloat(descF));
            let T4 =
              (parseFloat(descA) +
                parseFloat(descC) +
                parseFloat(descE) +
                parseFloat(descG)) /
              (parseFloat(descB) +
                parseFloat(descD) +
                parseFloat(descF) +
                parseFloat(descH));
            textoSet(
              T1.toFixed(2) +
                "," +
                T2.toFixed(2) +
                "," +
                T3.toFixed(2) +
                "," +
                T4.toFixed(2)
            );

            limpiaVar();
            close();
          }
        }
      }
    } else {
      if (tipo.toLowerCase() === "indice" || tipo.toLowerCase() === "índice")
        if (/^[\s]*$/.test(descA) || /^[\s]*$/.test(descB)) {
          setEmptyTxt(true);
        } else {
          textoSet(
            parseFloat(descA).toFixed(2) + "," + parseFloat(descB).toFixed(2)
          );
          limpiaVar();
          close();
        }
      else if (
        /^[\s]*$/.test(descA) ||
        /^[\s]*$/.test(descB) ||
        /^[\s]*$/.test(descC) ||
        /^[\s]*$/.test(descD)
      ) {
        setEmptyTxt(true);
      } else if (tipo === "Porcentaje") {
        let S1 = (parseFloat(descA) / parseFloat(descB)) * 100;
        let S2 =
          ((parseFloat(descA) + parseFloat(descC)) /
            (parseFloat(descB) + parseFloat(descD))) *
          100;

        textoSet(S1.toFixed(2) + "," + S2.toFixed(2));

        limpiaVar();
        close();
      } else if (tipo === "Tasa") {
        let S1 =
          ((parseFloat(descA) - parseFloat(descB)) / parseFloat(descB)) * 100;
        let S2 =
          ((parseFloat(descA) +
            parseFloat(descC) -
            (parseFloat(descB) + parseFloat(descD))) /
            (parseFloat(descB) + parseFloat(descD))) *
          100;
        textoSet(S1.toFixed(2) + "," + S2.toFixed(2));

        limpiaVar();
        close();
      } else if (tipo === "Promedio") {
        let S1 = parseFloat(descA) / parseFloat(descB);
        let S2 =
          (parseFloat(descA) + parseFloat(descC)) /
          (parseFloat(descB) + parseFloat(descD));
        textoSet(S1.toFixed(2) + "," + S2.toFixed(2));

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
            : `${"Componente" + " " + (noComponente + 1) } - Fórmula - ${tipo}`}
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
            ? JSON.parse(MIR).componentes[noComponente].actividades[noActividad]?.formula
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
              <Typography>Trimestre 2</Typography>
              <TextField
                type={"number"}
                label={"Valor"}
                sx={{ width: "80%", mb: 2 }}
                value={descB}
                error={
                  parseFloat(descB) < 0 ||
                  (isNaN(parseFloat(descB)) && descB !== "")
                    ? true
                    : false
                }
                helperText={
                  parseFloat(descB) < 0 ||
                  (isNaN(parseFloat(descB)) && descB !== "")
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
              <Typography>Trimestre 3</Typography>
              <TextField
                type={"number"}
                label={"Valor"}
                sx={{ width: "80%", mb: 2 }}
                value={descC}
                error={
                  parseFloat(descC) < 0 ||
                  (isNaN(parseFloat(descC)) && descC !== "")
                    ? true
                    : false
                }
                helperText={
                  parseFloat(descC) < 0 ||
                  (isNaN(parseFloat(descC)) && descC !== "")
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
                  setDescC(
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
              <Typography>Trimestre 4</Typography>
              <TextField
                type={"number"}
                label={"Valor"}
                sx={{ width: "80%" }}
                value={descD}
                error={
                  parseFloat(descD) < 0 ||
                  (isNaN(parseFloat(descD)) && descD !== "")
                    ? true
                    : false
                }
                helperText={
                  parseFloat(descD) < 0 ||
                  (isNaN(parseFloat(descD)) && descD !== "")
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
                  setDescD(
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
                      fontSize: "0.8vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{ width: "95%", mb: 2 }}
                value={descA}
                error={parseFloat(descA) < 0 ? true : false}
                helperText={
                  parseFloat(descA) < 0 ? "Introducir valor mayor que 0" : null
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
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{ fontSize: "0.8vw", fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{ width: "95%", mb: 2 }}
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
              <Typography>Trimestre 2</Typography>
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{ fontSize: "0.8vw", fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{ width: "95%" }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                    fontSize: ".8vw",
                  },
                }}
                value={descC}
                onChange={(c) =>
                  setDescC(
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
                    sx={{ fontSize: "0.8vw", fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{ width: "95%" }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                    fontSize: ".8vw",
                  },
                }}
                value={descD}
                onChange={(c) =>
                  setDescD(
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
              <Typography>Trimestre 3</Typography>
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{ fontSize: "0.8vw", fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{ width: "95%" }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                    fontSize: ".8vw",
                  },
                }}
                value={descE}
                onChange={(c) =>
                  setDescE(
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
                    sx={{ fontSize: "0.8vw", fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{ width: "95%" }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                    fontSize: ".8vw",
                  },
                }}
                value={descF}
                onChange={(c) =>
                  setDescF(
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
              <Typography>Trimestre 4</Typography>
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{ fontSize: "0.8vw", fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{ width: "95%" }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                    fontSize: ".8vw",
                  },
                }}
                value={descG}
                onChange={(c) =>
                  setDescG(
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
                    sx={{ fontSize: "0.8vw", fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{ width: "95%" }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                    fontSize: ".8vw",
                  },
                }}
                value={descH}
                onChange={(c) =>
                  setDescH(
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
              <Typography>Acumulado Anual</Typography>

              <Typography>
                {parseFloat(descA) +
                  parseFloat(descC) +
                  parseFloat(descE) +
                  parseFloat(descG) || 0}
              </Typography>
              <Typography>
                {parseFloat(descB) +
                  parseFloat(descD) +
                  parseFloat(descF) +
                  parseFloat(descH) || 0}
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
              <Typography>Semestre 2</Typography>
              <TextField
                type={"number"}
                label={"Valor"}
                sx={{ width: "95%" }}
                value={descB}
                error={
                  parseFloat(descB) < 0 ||
                  (isNaN(parseFloat(descB)) && descB !== "")
                    ? true
                    : false
                }
                helperText={
                  parseFloat(descB) < 0 ||
                  (isNaN(parseFloat(descB)) && descB !== "")
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
                    sx={{ fontSize: "0.8vw", fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{ width: "95%", mb: 2 }}
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
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{ fontSize: "0.8vw", fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{ width: "95%", mb: 2 }}
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
              <Typography>Semestre 2</Typography>
              <TextField
                type={"number"}
                label={
                  <Typography
                    sx={{ fontSize: "0.8vw", fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T" : "Valor del numerador"}
                  </Typography>
                }
                sx={{ width: "95%" }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                    fontSize: ".8vw",
                  },
                }}
                value={descC}
                onChange={(c) =>
                  setDescC(
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
                    sx={{ fontSize: "0.8vw", fontFamily: "MontserratMedium" }}
                  >
                    {tipo === "Tasa" ? "Valor T-1" : "Valor del denominador"}
                  </Typography>
                }
                sx={{ width: "95%" }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                    fontSize: ".8vw",
                  },
                }}
                value={descD}
                onChange={(c) =>
                  setDescD(
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
              <Typography>Acumulado Anual</Typography>

              <Typography>
                {parseFloat(descA) + parseFloat(descC) || 0}
              </Typography>
              <Typography>
                {parseFloat(descB) + parseFloat(descD) || 0}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
      <Box
        sx={{ width: "100%", justifyContent: "space-evenly", display: "flex" }}
      >
        <Button sx ={queries.buttonCancelarSolicitudInscripcion} onClick={() => close()} >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Cancelar
          </Typography>
        </Button>
        <Button  sx ={queries.buttonContinuarSolicitudInscripcion} onClick={() => checkValues()}>
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Agregar
          </Typography>
        </Button>
      </Box>
    </Dialog>
  );
};
