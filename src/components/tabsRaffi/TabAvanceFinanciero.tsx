import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { queries } from "../../queries";
import { IMIR } from "../tabsMir/interfaces mir/IMIR";
import {
  IAvanceFinancieroRF,
  IRFEdit,
  IVPTrimestral,
  IVTrimestral,
} from "./interfacesRaffi";
import { DialogMonto } from "../formulasDialog/FormulaDialogRaffiAvanceFinanciero";
import { alertaInfo } from "../genericComponents/Alertas";
import { validarNumero } from "../../services/validations";

export const VTrimestral = {
  t1: {
    valor1: "",
    valor2: "",
    resultado: "",
  },
  t2: {
    valor1: "",
    valor2: "",
    resultado: "",
  },
  t3: {
    valor1: "",
    valor2: "",
    resultado: "",
  },
  t4: {
    valor1: "",
    valor2: "",
    resultado: "",
  },
  total: "",
  cuentaPublica: "",
};
export const VPTrimestral = {
  pt1: "",
  pt2: "",
  pt3: "",
  pt4: "",
  ptotal: "",
  porcentajeCuentaPublica: "",
};
export const VTrimestralboolean = {
  t1: {
    valor1: false,
    valor2: false,
    resultado: false,
  },
  t2: {
    valor1: false,
    valor2: false,
    resultado: false,
  },
  t3: {
    valor1: false,
    valor2: false,
    resultado: false,
  },
  t4: {
    valor1: false,
    valor2: false,
    resultado: false,
  },
  total: false,
  cuentaPublica: false,
};
export const VPTrimestralboolean = {
  pt1: false,
  pt2: false,
  pt3: false,
  pt4: false,
  ptotal: false,
  porcentajeCuentaPublica: false,
};

export function TabAvanceFinanciero({
  edit,
  MIR,
  MA,
  avanceFinancieroRF,
  setAvanceFinancieroRF,
  raffiboolean,
}: {
  edit: boolean;
  MIR: string;
  MA: string;
  avanceFinancieroRF: IAvanceFinancieroRF;
  setAvanceFinancieroRF: Function;
  raffiboolean: IRFEdit;
}) {
  const jsonMir: IMIR = JSON.parse(MIR);

  const [trimestre, setTrimestre] = useState("0");

  const [nombrePrograma, setNombrePrograma] = useState("Sin Información");
  const [valorProgramaPresupuestario, setValorProgramaPresupuestario] =
    useState(avanceFinancieroRF.valorProgramaPresupuestario);

  const [devengadoModificado, setDevengadoModificado] = useState<IVTrimestral>(
    avanceFinancieroRF.monto.devengadoModificado
  );
  const [ejercidoModificado, setEjercidoModificado] = useState<IVTrimestral>(
    avanceFinancieroRF.monto.ejercidoModificado
  );
  const [modificadoAutorizado, setModificadoAutorizado] =
    useState<IVTrimestral>(avanceFinancieroRF.monto.modificadoAutorizado);

  const [PDevengadoModificado, setPDevengadoModificado] =
    useState<IVPTrimestral>(
      avanceFinancieroRF.porcentaje.porcentajeDevengadoModificado
    );
  const [PEjercidoModificado, setPEjercidoModificado] = useState<IVPTrimestral>(
    avanceFinancieroRF.porcentaje.porcentajeEjercidoModificado
  );
  const [PModificadoAutorizado, setPModificadoAutorizado] =
    useState<IVPTrimestral>(
      avanceFinancieroRF.porcentaje.porcentajeModificadoAutorizado
    );


    const year=new Date().getFullYear();
    const dateTrim = [
      new Date(year,3,31),
      new Date(year,6,30),
      new Date(year,9,30),
      new Date(year,12,31),
    ];

  
  useEffect(() => {
    if (valorProgramaPresupuestario !== "") {
      setNombrePrograma(avanceFinancieroRF.nombrePrograma);

      setValorProgramaPresupuestario(
        avanceFinancieroRF.valorProgramaPresupuestario
      );

      setDevengadoModificado(avanceFinancieroRF.monto.devengadoModificado);
      setEjercidoModificado(avanceFinancieroRF.monto.ejercidoModificado);
      setModificadoAutorizado(avanceFinancieroRF.monto.modificadoAutorizado);
      setPDevengadoModificado(
        avanceFinancieroRF.porcentaje.porcentajeDevengadoModificado
      );
      setPEjercidoModificado(
        avanceFinancieroRF.porcentaje.porcentajeEjercidoModificado
      );
      setPModificadoAutorizado(
        avanceFinancieroRF.porcentaje.porcentajeModificadoAutorizado
      );
    }
  }, [avanceFinancieroRF]);


  useEffect(() => {
    let auxRaffi: IAvanceFinancieroRF = {
      nombrePrograma: nombrePrograma,
      valorProgramaPresupuestario: valorProgramaPresupuestario,

      monto: {
        devengadoModificado: devengadoModificado,
        modificadoAutorizado: modificadoAutorizado,
        ejercidoModificado: ejercidoModificado,
      },
      porcentaje: {
        porcentajeDevengadoModificado: PDevengadoModificado,
        porcentajeModificadoAutorizado: PModificadoAutorizado,
        porcentajeEjercidoModificado: PEjercidoModificado,
      },
    };

    if (
      devengadoModificado.t1.resultado !== "" ||
      devengadoModificado.t2.resultado !== "" ||
      devengadoModificado.t3.resultado !== "" ||
      devengadoModificado.t4.resultado !== "" ||
      ejercidoModificado.t1.resultado !== "" ||
      ejercidoModificado.t2.resultado !== "" ||
      ejercidoModificado.t3.resultado !== "" ||
      ejercidoModificado.t4.resultado !== "" ||
      modificadoAutorizado.t1.resultado !== "" ||
      modificadoAutorizado.t2.resultado !== "" ||
      modificadoAutorizado.t3.resultado !== "" ||
      modificadoAutorizado.t4.resultado !== "" ||
      valorProgramaPresupuestario !== ""
    ) {
      setAvanceFinancieroRF(auxRaffi);
    }
  }, [
    valorProgramaPresupuestario,
    devengadoModificado,
    ejercidoModificado,
    modificadoAutorizado,
    PDevengadoModificado,
    PModificadoAutorizado,
    PEjercidoModificado,
  ]);

  useEffect(() => {
    let auxPModificadoAutorizado: IVPTrimestral = {
      pt1: getProcentajeActualizado(modificadoAutorizado.t1.resultado),
      pt2: getProcentajeActualizado(modificadoAutorizado.t2.resultado),
      pt3: getProcentajeActualizado(modificadoAutorizado.t3.resultado),
      pt4: getProcentajeActualizado(modificadoAutorizado.t4.resultado),
      ptotal: getProcentajeActualizado(modificadoAutorizado.total),
      porcentajeCuentaPublica: getProcentajeActualizado(
        modificadoAutorizado.cuentaPublica
      ),
    };

    let auxPDevengadoModificado: IVPTrimestral = {
      pt1: getProcentajeActualizado(devengadoModificado.t1.resultado),
      pt2: getProcentajeActualizado(devengadoModificado.t2.resultado),
      pt3: getProcentajeActualizado(devengadoModificado.t3.resultado),
      pt4: getProcentajeActualizado(devengadoModificado.t4.resultado),
      ptotal: getProcentajeActualizado(devengadoModificado.total),
      porcentajeCuentaPublica: getProcentajeActualizado(
        devengadoModificado.cuentaPublica
      ),
    };

    let auxPEjercidoModificado: IVPTrimestral = {
      pt1: getProcentajeActualizado(ejercidoModificado.t1.resultado),
      pt2: getProcentajeActualizado(ejercidoModificado.t2.resultado),
      pt3: getProcentajeActualizado(ejercidoModificado.t3.resultado),
      pt4: getProcentajeActualizado(ejercidoModificado.t4.resultado),
      ptotal: getProcentajeActualizado(ejercidoModificado.total),
      porcentajeCuentaPublica: getProcentajeActualizado(
        ejercidoModificado.cuentaPublica
      ),
    };

    setPModificadoAutorizado(auxPModificadoAutorizado);
    setPDevengadoModificado(auxPDevengadoModificado);
    setPEjercidoModificado(auxPEjercidoModificado);
  }, [
    valorProgramaPresupuestario,
    PDevengadoModificado,
    PModificadoAutorizado,
    PEjercidoModificado,
  ]);

  const [selector, setSelector] = useState("MODIFICADO/AUTORIZADO");

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const handleClickOpen = () => {
    setOpenFormulaDialog(true);
  };

  const assignValue = (
    valor: string,
    calculo: string,
    trimestre: string,
    valor1: string,
    valor2: string
  ) => {
    let porcentaje =
      (parseFloat(valor) / parseFloat(valorProgramaPresupuestario)) * 100;
    let auxMonto: IVTrimestral;
    let auxPorcentaje: IVPTrimestral;
    switch (calculo) {
      case "MODIFICADO/AUTORIZADO":
        auxMonto = { ...modificadoAutorizado };
        auxPorcentaje = { ...PModificadoAutorizado };
        switch (trimestre) {
          case "TRIMESTRE 1":
            auxMonto.t1 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt1 = porcentaje.toString();
            setModificadoAutorizado(auxMonto);
            setPModificadoAutorizado(auxPorcentaje);

            break;
          case "TRIMESTRE 2":
            auxMonto.t2 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt2 = porcentaje.toString();
            setModificadoAutorizado(auxMonto);
            setPModificadoAutorizado(auxPorcentaje);

            break;
          case "TRIMESTRE 3":
            auxMonto.t3 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt3 = porcentaje.toString();
            setModificadoAutorizado(auxMonto);
            setPModificadoAutorizado(auxPorcentaje);
            break;
          case "TRIMESTRE 4":
            auxMonto.t4 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt4 = porcentaje.toString();
            setModificadoAutorizado(auxMonto);
            setPModificadoAutorizado(auxPorcentaje);
            break;
        }

        break;
      case "DEVENGADO/MODIFICADO":
        auxMonto = { ...devengadoModificado };
        auxPorcentaje = { ...PDevengadoModificado };
        switch (trimestre) {
          case "TRIMESTRE 1":
            auxMonto.t1 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt1 = porcentaje.toString();
            setDevengadoModificado(auxMonto);
            setPDevengadoModificado(auxPorcentaje);

            break;
          case "TRIMESTRE 2":
            auxMonto.t2 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt2 = porcentaje.toString();
            setDevengadoModificado(auxMonto);
            setPDevengadoModificado(auxPorcentaje);

            break;
          case "TRIMESTRE 3":
            auxMonto.t3 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt3 = porcentaje.toString();
            setDevengadoModificado(auxMonto);
            setPDevengadoModificado(auxPorcentaje);

            break;
          case "TRIMESTRE 4":
            auxMonto.t4 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt4 = porcentaje.toString();
            setDevengadoModificado(auxMonto);
            setPDevengadoModificado(auxPorcentaje);

            break;
        }

        break;
      case "EJERCIDO/MODIFICADO":
        auxMonto = { ...ejercidoModificado };
        auxPorcentaje = { ...PEjercidoModificado };
        switch (trimestre) {
          case "TRIMESTRE 1":
            auxMonto.t1 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt1 = porcentaje.toString();
            setEjercidoModificado(auxMonto);
            setPEjercidoModificado(auxPorcentaje);

            break;
          case "TRIMESTRE 2":
            auxMonto.t2 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt2 = porcentaje.toString();
            setEjercidoModificado(auxMonto);
            setPEjercidoModificado(auxPorcentaje);

            break;
          case "TRIMESTRE 3":
            auxMonto.t3 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt3 = porcentaje.toString();
            setEjercidoModificado(auxMonto);
            setPEjercidoModificado(auxPorcentaje);
            break;
          case "TRIMESTRE 4":
            auxMonto.t4 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt4 = porcentaje.toString();
            setEjercidoModificado(auxMonto);
            setPEjercidoModificado(auxPorcentaje);
            break;
        }
        break;
    }
  };

  const getProcentajeActualizado = (monto: string) => {
    let porcentaje =
      (parseFloat(monto) / parseFloat(valorProgramaPresupuestario)) * 100;
    if (isNaN(porcentaje)) {
      return "";
    } else {
      return porcentaje.toString();
    }
  };

  useEffect(() => {}, []);

  const block = (valor: string) => {
    return valor === "0" || valor === null || valor === "";
  };

  function getTrimestre2() {
    switch (selector) {
      case "DEVENGADO/MODIFICADO":
        return devengadoModificado.t1.resultado;

      case "EJERCIDO/MODIFICADO":
        return ejercidoModificado.t1.resultado;

      case "MODIFICADO/AUTORIZADO":
        return modificadoAutorizado.t1.resultado;

      default:
        return null;
    }
  }
  function getTrimestre3() {}
  function getTrimestre4() {}

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <Grid
        container
        direction={"row"}
        sx={{
          width: "93vw",
          height: ["90vh", "82vh", "82vh", "82vh", "82vh"],
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          ...(!isSmallScreen ? { boxShadow: 10, borderRadius: 5 } : {}),
          overflow: "auto",
        }}
      >
        <Grid item xl={11} lg={11} md={11} sm={11} xs={11} gap={2}>
          <InputLabel sx={queries.medium_text}>NOMBRE DEL PROGRAMA</InputLabel>
          <TextField
            fullWidth
            sx={queries.medium_text}
            variant="standard"
            value={jsonMir.encabezado.programa.Label}
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

        <Grid
          justifyContent={"space-between"}
          container
          direction={"row"}
          item
          xl={11}
          lg={11}
          md={11}
          sm={11}
          xs={11}
          gap={2}
          sx={{}}
        >
          <Grid
            item
            xl={5}
            lg={5}
            md={10}
            sm={11}
            xs={11}
            sx={{ marginTop: 2 }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="0"
              onChange={(a) => {
                if (parseInt(a.target.value) > 0) {
                  if (
                    a.target.value === "0" ||
                    a.target.value === null ||
                    a.target.value === ""
                  ) {
                    alertaInfo(
                      "Se necesita un valor para capturar los campos de trimestre"
                    );
                  }
                  setValorProgramaPresupuestario(
                    validarNumero(a.target.value, valorProgramaPresupuestario)
                  );
                } else {
                  setValorProgramaPresupuestario("");
                }
              }}
              value={
                parseInt(valorProgramaPresupuestario) <= 0
                  ? ""
                  : valorProgramaPresupuestario
              }
              label={"VALOR DEL PROGRAMA PRESUPUESTARIO"}
              sx={queries.medium_text}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
                startAdornment: <AttachMoneyIcon />,
              }}
            />
          </Grid>

          <Grid
            item
            xl={5}
            lg={5}
            md={10}
            sm={11}
            xs={11}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
             // boxShadow: 2,
             // border: "1px solid #ccc",
             // height: "24vh",
            }}
          >
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  fontFamily: "MontserratBold",
                }}
              >
                CALCULO
              </InputLabel>
              <Select
                value={selector}
                onChange={(e) => setSelector(e.target.value)}
                label="CALCULO"
                sx={{
                  fontFamily: "MontserratMedium",
                }}
              >
                <MenuItem value={"MODIFICADO/AUTORIZADO"}>
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      fontSize: ["2vh", "2vh", "2vh", "2vh", "2vh"],
                    }}
                  >
                    MODIFICADO/AUTORIZADO
                  </Typography>
                </MenuItem>
                <MenuItem value={"DEVENGADO/MODIFICADO"}>
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      fontSize: ["2vh", "2vh", "2vh", "2vh", "2vh"]
                    }}
                  >
                    DEVENGADO/MODIFICADO
                  </Typography>
                </MenuItem>
                <MenuItem value={"EJERCIDO/MODIFICADO"}>
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      fontSize: ["2vh", "2vh", "2vh", "2vh", "2vh"]
                    }}
                  >
                    EJERCIDO/MODIFICADO
                  </Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container direction={"row"}>
          <Grid
            container
            item
            direction={"row"}
            sx={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
            gap={2}
          >
            <Grid
              lg={1}
              gap={1}
              sx={{
                display: "flex",

                justifyContent: "space-around",
              }}
              item
              direction={"column"}
            >
              <Grid item>
                <Typography sx={queries.medium_text}>TIPO</Typography>
              </Grid>
              <Grid item>
                <Typography sx={queries.medium_text}>MONTO</Typography>
              </Grid>

              <Grid item>
                <Typography sx={queries.medium_text}>PORCENTAJE</Typography>
              </Grid>
            </Grid>

            <Grid
              item
              gap={1}
              lg={1.6}
              direction={"column"}
              sx={{
                display: "flex",

                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Grid item>
                <InputLabel sx={queries.medium_text}>TRIMESTRE 1</InputLabel>
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  disabled={
                    (valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === "" ||
                    (edit &&
                      (!raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t1?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t1?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t1?.resultado)))|| (new Date()>dateTrim[0])
                  }
                  placeholder="SIN CAPTURAR"
                  onClick={(a) => {
                    setTrimestre("TRIMESTRE 1");
                    handleClickOpen();
                  }}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? devengadoModificado.t1.resultado
                      : selector === "EJERCIDO/MODIFICADO"
                      ? ejercidoModificado.t1.resultado
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? modificadoAutorizado.t1.resultado
                      : null
                  }
                  sx={queries.medium_text}
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

              <Grid item>
                <TextField
                  fullWidth
                  disabled={
                    (valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === "" ||
                    (edit &&
                      (!raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t1?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t1?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t1?.resultado))) || (new Date()>dateTrim[0])
                  }
                  size="small"
                  placeholder="SIN PORCENTAJE"
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? PDevengadoModificado.pt1
                      : selector === "EJERCIDO/MODIFICADO"
                      ? PEjercidoModificado.pt1
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? PModificadoAutorizado.pt1
                      : null
                  }
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
            </Grid>

            <Grid
              item
              gap={1}
              lg={1.6}
              direction={"column"}
              sx={{
                display: "flex",

                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Grid item>
                <InputLabel sx={queries.medium_text}>TRIMESTRE 2</InputLabel>
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  disabled={
                    (valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === "" ||
                    (edit &&
                      (!raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t2?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t2?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t2?.resultado))) || !(new Date()<dateTrim[1] && new Date()>dateTrim[0])
                  }
                  size="small"
                  placeholder="SIN CAPTURAR"
                  onClick={(a) => {
                    if (selector === "DEVENGADO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 2");
                      handleClickOpen();
                    } else if (selector === "EJERCIDO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 2");
                      handleClickOpen();
                    } else if (selector === "MODIFICADO/AUTORIZADO") {
                      setTrimestre("TRIMESTRE 2");
                      handleClickOpen();
                    }
                  }}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? devengadoModificado.t2.resultado
                      : selector === "EJERCIDO/MODIFICADO"
                      ? ejercidoModificado.t2.resultado
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? modificadoAutorizado.t2.resultado
                      : null
                  }
                  sx={queries.medium_text}
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

              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="SIN PORCENTAJE"
                  disabled={
                    (valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === "" ||
                    (edit &&
                      (!raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t2?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t2?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t2?.resultado))) || !(new Date()<dateTrim[1] && new Date()>dateTrim[0])
                  }
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? PDevengadoModificado.pt2
                      : selector === "EJERCIDO/MODIFICADO"
                      ? PEjercidoModificado.pt2
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? PModificadoAutorizado.pt2
                      : null
                  }
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

            <Grid
              item
              gap={1}
              lg={1.6}
              direction={"column"}
              sx={{
                display: "flex",

                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Grid item>
                <InputLabel sx={queries.medium_text}>TRIMESTRE 3</InputLabel>
              </Grid>

              <Grid item>
                <TextField
                  disabled={
                    (valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === "" ||
                    (edit &&
                      (!raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t3?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t3?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t3?.resultado))) || !(new Date()<dateTrim[2] && new Date()>dateTrim[1])
                  }
                  fullWidth
                  size="small"
                  placeholder="SIN CAPTURAR"
                  onClick={(a) => {
                    if (selector === "DEVENGADO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 3");
                      handleClickOpen();
                    } else if (selector === "EJERCIDO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 3");
                      handleClickOpen();
                    } else if (selector === "MODIFICADO/AUTORIZADO") {
                      setTrimestre("TRIMESTRE 3");
                      handleClickOpen();
                    }
                  }}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? devengadoModificado.t3.resultado
                      : selector === "EJERCIDO/MODIFICADO"
                      ? ejercidoModificado.t3.resultado
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? modificadoAutorizado.t3.resultado
                      : null
                  }
                  sx={queries.medium_text}
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

              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="SIN PORCENTAJE"
                  disabled={
                    (valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === "" ||
                    (edit &&
                      (!raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t3?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t3?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t3?.resultado))) || !(new Date()<dateTrim[2] && new Date()>dateTrim[1])
                  }
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? PDevengadoModificado.pt3
                      : selector === "EJERCIDO/MODIFICADO"
                      ? PEjercidoModificado.pt3
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? PModificadoAutorizado.pt3
                      : null
                  }
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
            </Grid>

            <Grid
              item
              gap={1}
              lg={1.6}
              direction={"column"}
              sx={{
                display: "flex",

                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Grid item>
                <InputLabel sx={queries.medium_text}>TRIMESTRE 4</InputLabel>
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  disabled={
                    (valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === "" ||
                    (edit &&
                      (!raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t4?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t4?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t4?.resultado))) || !(new Date()<dateTrim[3] && new Date()>dateTrim[2])
                  }
                  size="small"
                  placeholder="SIN CAPTURAR"
                  onClick={(a) => {
                    if (selector === "DEVENGADO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 4");
                      handleClickOpen();
                    } else if (selector === "EJERCIDO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 4");
                      handleClickOpen();
                    } else if (selector === "MODIFICADO/AUTORIZADO") {
                      setTrimestre("TRIMESTRE 4");
                      handleClickOpen();
                    }
                  }}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? devengadoModificado.t4.resultado
                      : selector === "EJERCIDO/MODIFICADO"
                      ? ejercidoModificado.t4.resultado
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? modificadoAutorizado.t4.resultado
                      : null
                  }
                  sx={queries.medium_text}
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

              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="SIN PORCENTAJE"
                  disabled={
                    (valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === "" ||
                    (edit &&
                      (!raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t4?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t4?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t4?.resultado))) || !(new Date()<dateTrim[3] && new Date()>dateTrim[2])
                  }
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? PDevengadoModificado.pt4
                      : selector === "EJERCIDO/MODIFICADO"
                      ? PEjercidoModificado.pt4
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? PModificadoAutorizado.pt4
                      : null
                  }
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

            <Grid
              item
              gap={1}
              lg={1.6}
              direction={"column"}
              sx={{
                display: "flex",

                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Grid item>
                <InputLabel sx={queries.medium_text}>CUENTA PUBLICA</InputLabel>
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="SIN CAPTURAR"
                  onChange={(a) => {
                    let valor: Number;
                    valor =
                      selector === "DEVENGADO/MODIFICADO"
                        ? Number(devengadoModificado.cuentaPublica)
                        : selector === "EJERCIDO/MODIFICADO"
                        ? Number(ejercidoModificado.cuentaPublica)
                        : selector === "MODIFICADO/AUTORIZADO"
                        ? Number(modificadoAutorizado.cuentaPublica)
                        : 0;
                    valor = validarNumero(a.target.value, valor);

                    let porcentaje: number = 0;
                    if (selector === "DEVENGADO/MODIFICADO") {
                      setDevengadoModificado({
                        ...devengadoModificado,
                        cuentaPublica: valor.toString(),
                      });
                      porcentaje =
                        (Number(a.target.value) /
                          Number(valorProgramaPresupuestario)) *
                        100;

                      setPDevengadoModificado({
                        ...PDevengadoModificado,
                        porcentajeCuentaPublica: porcentaje.toString(),
                      });
                    } else if (selector === "EJERCIDO/MODIFICADO") {
                      setEjercidoModificado({
                        ...ejercidoModificado,
                        cuentaPublica: valor.toString(),
                      });
                      porcentaje =
                        (Number(a.target.value) /
                          Number(valorProgramaPresupuestario)) *
                        100;
                      setPEjercidoModificado({
                        ...PEjercidoModificado,
                        porcentajeCuentaPublica: porcentaje.toString(),
                      });
                    } else if (selector === "MODIFICADO/AUTORIZADO") {
                      setModificadoAutorizado({
                        ...modificadoAutorizado,
                        cuentaPublica: valor.toString(),
                      });
                      porcentaje =
                        (Number(a.target.value) /
                          Number(valorProgramaPresupuestario)) *
                        100;

                      setPModificadoAutorizado({
                        ...PModificadoAutorizado,
                        porcentajeCuentaPublica: porcentaje.toString(),
                      });
                    }
                  }}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? devengadoModificado.cuentaPublica
                      : selector === "EJERCIDO/MODIFICADO"
                      ? ejercidoModificado.cuentaPublica
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? modificadoAutorizado.cuentaPublica
                      : null
                  }
                  sx={queries.medium_text}
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

              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="SIN PORCENTAJE"
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? PDevengadoModificado.porcentajeCuentaPublica
                      : selector === "EJERCIDO/MODIFICADO"
                      ? PEjercidoModificado.porcentajeCuentaPublica
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? PModificadoAutorizado.porcentajeCuentaPublica
                      : null
                  }
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
        </Grid>
        {openFormulaDialog ? (
          <DialogMonto
            open={openFormulaDialog}
            close={handleClose}
            trimestre={trimestre}
            selector={selector}
            setValor={assignValue}
          />
        ) : null}
      </Grid>
    </>
  );
}
