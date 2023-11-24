import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Radio,
  FormLabel,
  FormControlLabel,
  Typography,
  Grid,
  TextField,
  InputLabel,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { queries } from "../../queries";
import { IMIR } from "../tabsMir/interfaces mir/IMIR";
import { IFinRF, IPropositoRF } from "../../screens/raffi/interfacesRaffi";
import { DialogMonto } from "../formulasDialog/FormulaDialogRaffiAvanceFinanciero";
import { useEffect, useState } from "react";
import { DialogFinPropositoRaffi } from "../formulasDialog/FormulaDialogRaffiFinProposito";

export function TabFinPropositoRF({
  resumenPropositoRF,
  resumenFinRF,
  MIR,
  finRF,
  propositoRF,
  setFinRF,
  setPropositoRF,
  showMirFnc,
  setTxtShowFnc,
}: {
  resumenPropositoRF: Function;
  resumenFinRF: Function;
  MIR: string;
  finRF: IFinRF;
  propositoRF: IPropositoRF;
  setFinRF: Function;
  setPropositoRF: Function;

  RF: string;

  showMirFnc: Function;
  setTxtShowFnc: Function;
}) {
  const jsonMir: IMIR = JSON.parse(MIR);

  const [fin, setFin] = useState<IFinRF>({
    añoAvanceFisico: "",
    //jsonMir.encabezado.ejercicioFiscal,
    valorAvanceFisico: "",
  });

  const [proposito, setProposito] = useState<IPropositoRF>({
    añoAvanceFisico: "",
    //jsonMir.encabezado.ejercicioFiscal,
    valorAvanceFisico: "",
  });

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
    resumenPropositoRF(proposito);
  }, [resumenPropositoRF]);

  useEffect(() => {
    resumenFinRF(fin);
  }, [resumenFinRF]);

  useEffect(() => {
    let objectaux: IPropositoRF = {
      añoAvanceFisico: "",
      //jsonMir.encabezado.ejercicioFiscal,
      valorAvanceFisico: "",
    };
    setPropositoRF(objectaux);
    setProposito(objectaux);
  }, []);

  useEffect(() => {
    if (
      propositoRF.valorAvanceFisico !== "" &&
      propositoRF.valorAvanceFisico !== null
    ) {
      setProposito(propositoRF);
    }
  }, []);

  useEffect(() => {
    setPropositoRF(proposito);
  }, [proposito]);

  useEffect(() => {
    let objectaux: IFinRF = {
      añoAvanceFisico: "",
      //jsonMir.encabezado.ejercicioFiscal,
      valorAvanceFisico: "",
    };
    setFinRF(objectaux);
    setFin(objectaux);
  }, []);

  useEffect(() => {
    if (finRF.valorAvanceFisico !== "" && finRF.valorAvanceFisico !== null) {
      setFin(finRF);
    }
  }, []);

  useEffect(() => {
    setFinRF(fin);
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
          alignItems: "center",
          backgroundColor: "#fff",
          boxShadow: 10,
          borderRadius: 5,
        }}
      >
        <Grid
          container
          item
          sx={{ display: "flex", justifyContent: "flex-end" }}
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
              fontSize: "1.5vw",
            }}
          >
            FIN /
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
              fontSize: "1.5vw",
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
              height: "45vh",
            }}
          >
            <Grid mt={{ lg: 2 }} mb={{ lg: 2 }} item lg={6}>
              <TextField
                fullWidth
                size="small"
                label="Año del Avance Fisico"
                value={jsonMir.encabezado.ejercicioFiscal}
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
              height: "45vh",
            }}
          >
            <Grid mt={{ lg: 2 }} mb={{ lg: 2 }} item lg={6}>
              <TextField
                fullWidth
                size="small"
                label="Año del Avance Fisico"
                value={jsonMir.encabezado.ejercicioFiscal}
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
