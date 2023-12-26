import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Grid, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { queries } from "../../queries";
import { validarNumero } from "../../services/validations";
import { DialogFinPropositoRaffi } from "../formulasDialog/FormulaDialogRaffiFinProposito";
import { IMIR } from "../tabsMir/interfaces mir/IMIR";
import { IFinRF, IPropositoRF, IRFEdit } from "./interfacesRaffi";

export function TabFinPropositoRF({
  setRFFinPadre,
  setRFPropositoPadre,
  MIR,
  finRF,
  propositoRF,
  showMirFnc,
  setTxtShowFnc,
  raffiboolean,
}: {
  setRFFinPadre: Function;
  setRFPropositoPadre: Function;
  MIR: string;
  finRF: IFinRF;
  propositoRF: IPropositoRF;
  RF: string;
  showMirFnc: Function;
  setTxtShowFnc: Function;
  raffiboolean: IRFEdit;
}) {
  const jsonMir: IMIR = JSON.parse(MIR);

  const [fin, setFin] = useState<IFinRF>(finRF);

  const [proposito, setProposito] = useState<IPropositoRF>(propositoRF);

  // Estados para almacenar las palabras a buscar en los TextField
  const [palabraABuscar1, setPalabraABuscar1] = useState(""); // Para Fin
  const [palabraABuscar2, setPalabraABuscar2] = useState(""); //Para Propostio
  const [unico, setUnico] = useState("");
  const [apartado, SetApartado] = useState("");

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const handleClickOpen = () => {
    setOpenFormulaDialog(true);
  };
  // Función para buscar la palabra
  const palabra = (texto: string) => {
    const palabrasABuscar: string[] = [
      "PORCENTAJE",
      "INDICE",
      "PROMEDIO",
      "TASA",
    ];

    for (const palabraABuscar of palabrasABuscar) {
      if (texto.toLowerCase().includes(palabraABuscar.toLowerCase())) {
        return palabraABuscar; // Devolver la palabra encontrada
      }
    }
    return "No existo"; // Devolver "No existo" si ninguna palabra se encontró
  };

  // useEffect para ejecutar palabra() para ambas variables al cargar el componente
  useEffect(() => {
    const palabraEncontrada1 = palabra(jsonMir.fin.indicador); // Buscar palabra en el primer texto
    const palabraEncontrada2 = palabra(jsonMir.proposito.indicador); // Buscar palabra en el segundo texto
    setPalabraABuscar1(palabraEncontrada1); // Almacenar la palabra encontrada en el primer estado
    setPalabraABuscar2(palabraEncontrada2); // Almacenar la palabra encontrada en el segundo estado
  }, []);

  useEffect(() => {
    setRFPropositoPadre(proposito);
  }, [proposito]);

  useEffect(() => {
    setRFFinPadre(fin);
  }, [fin]);

  const assignValue = (valor: string, elemento: string, tipo: string) => {
    switch (tipo) {
      case "FIN":
        switch (elemento) {
          case "PORCENTAJE":
            setFin({ ...fin, valorAvanceFisico: valor });
            break;
          case "INDICE":
            setFin({ ...fin, valorAvanceFisico: valor });
            break;
          case "PROMEDIO":
            setFin({ ...fin, valorAvanceFisico: valor });
            break;
          case "TASA":
            setFin({ ...fin, valorAvanceFisico: valor });
            break;
        }

        break;
      case "PROPOSITO":
        switch (elemento) {
          case "PORCENTAJE":
            setProposito({ ...proposito, valorAvanceFisico: valor });
            break;
          case "INDICE":
            setProposito({ ...proposito, valorAvanceFisico: valor });
            break;
          case "PROMEDIO":
            setProposito({ ...proposito, valorAvanceFisico: valor });
            break;
          case "TASA":
            setProposito({ ...proposito, valorAvanceFisico: valor });
            break;
        }
        break;
    }
  };

  return (
    <>
      <Grid
        container
        sx={{
          width: "93vw",
          height: ["90vh", "82vh", "82vh", "82vh", "82vh"],
          justifyContent: "space-around",
          alignItems: "flex-start",
          backgroundColor: "#fff",
          boxShadow: 10,
          borderRadius: 5,
          overflow: "auto",
        }}
      >
        <Grid
          item
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{
            //width: "100%",
            display: "flex",
            // height: "7vh",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          //sx={{ display: "flex", justifyContent: "flex-end", borderRadius: 5 }}
        >
          <Tooltip title="RESUMEN COMPONENTE">
            <InfoOutlinedIcon
              onClick={() => {
                showMirFnc(true);
                setTxtShowFnc("Fin");
              }}
              fontSize="large"
              sx={{ cursor: "pointer" }}
            ></InfoOutlinedIcon>
          </Tooltip>
          <Typography
            sx={{
              mr: "1vw",
              fontFamily: "MontserratSemiBold",
              fontSize: [10, 10, 10, 13, 15, 18],
            }}
          >
            FIN
          </Typography>

          <Tooltip title="RESUMEN COMPONENTE">
            <InfoOutlinedIcon
              onClick={() => {
                showMirFnc(true);
                setTxtShowFnc("Proposito");
              }}
              fontSize="large"
              sx={{ cursor: "pointer" }}
            ></InfoOutlinedIcon>
          </Tooltip>
          <Typography
            sx={{
              mr: "1vw",
              fontFamily: "MontserratSemiBold",
              fontSize: [10, 10, 10, 13, 15, 18],
            }}
          >
            PROPÓSITO
          </Typography>
        </Grid>

        <Grid
          item
          lg={5}
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ ...queries.bold_text, width: "100%" }}>
            Fin
          </Typography>

          <Grid
            item
            lg={12}
            container
            direction={"column"}
            sx={{
              //backgroundColor: "#f0f0f0",
              display: "flex",
              //flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 2,
              border: "1px solid #ccc",
              height: window.innerHeight >= 700 ? "45vh" : "35vh",
              "& > .MuiGrid-item": {
                marginBottom: "10px",
                marginTop: "10px",
                // Ajusta la cantidad de espacio vertical entre los elementos
              },
            }}
          >
            <Grid mt={{ lg: 2 }} mb={{ lg: 2 }} item lg={6}>
              <TextField
                fullWidth
                size="small"
                label="Año del Avance Fisico"
                value={fin.añoAvanceFisico}
                onChange={(c) => {
                  setFin({
                    ...fin,
                    añoAvanceFisico: validarNumero(
                      c.target.value
                        .replaceAll('"', "")
                        .replaceAll("'", "")
                        .replaceAll("\n", ""),
                      fin.añoAvanceFisico
                    ),
                  });
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  //readOnly: true,
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
              />
            </Grid>

            <Grid item mt={{ lg: 2 }} mb={{ lg: 2 }} lg={6}>
              <TextField
                fullWidth
                size="small"
                //label="Operacion"

                value={palabraABuscar1}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  //readOnly: true,
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
              />
            </Grid>

            <Grid item mt={{ lg: 2 }} mb={{ lg: 2 }} lg={6}>
              <TextField
                fullWidth
                size="small"
                label="Valor del Avance Fisico"
                onClick={(a) => {
                  SetApartado("FIN");
                  setUnico(palabraABuscar1);

                  handleClickOpen();
                }}
                value={fin.valorAvanceFisico}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  //readOnly: true,
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          lg={5}
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ ...queries.bold_text, width: "100%" }}>
            Proposito
          </Typography>

          <Grid
            item
            lg={12}
            container
            direction={"column"}
            sx={{
              //backgroundColor: "#f0f0f0",
              display: "flex",
              //flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 2,
              border: "1px solid #ccc",
              height: window.innerHeight >= 700 ? "45vh" : "35vh",
              "& > .MuiGrid-item": {
                marginBottom: "10px",
                marginTop: "10px",
                // Ajusta la cantidad de espacio vertical entre los elementos
              },
            }}
          >
            <Grid mt={{ lg: 2 }} mb={{ lg: 2 }} item lg={6}>
              <TextField
                fullWidth
                size="small"
                label="Año del Avance Fisico"
                value={proposito.añoAvanceFisico}
                onChange={(c) => {
                  setProposito({
                    ...proposito,
                    añoAvanceFisico: validarNumero(
                      c.target.value
                        .replaceAll('"', "")
                        .replaceAll("'", "")
                        .replaceAll("\n", ""),
                      proposito.añoAvanceFisico
                    ),
                  });
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
              />
            </Grid>

            <Grid item mt={{ lg: 2 }} mb={{ lg: 2 }} lg={6}>
              <TextField
                fullWidth
                size="small"
                //label="Operacion"

                value={palabraABuscar2}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  readOnly: true,
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
              />
            </Grid>

            <Grid item mt={{ lg: 2 }} mb={{ lg: 2 }} lg={6}>
              <TextField
                fullWidth
                size="small"
                label="Valor del Avance Fisico"
                onClick={(a) => {
                  SetApartado("PROPOSITO");
                  setUnico(palabraABuscar2);
                  handleClickOpen();
                }}
                value={proposito.valorAvanceFisico}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  //readOnly: true,
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <DialogFinPropositoRaffi
          open={openFormulaDialog}
          close={handleClose}
          elemento={unico}
          tipo={apartado}
          setValor={assignValue}
        />
      </Grid>
    </>
  );
}
