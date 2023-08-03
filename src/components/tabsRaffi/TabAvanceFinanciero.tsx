import {
  Grid,
  InputLabel,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Typography,
  Radio,
  Checkbox,
  Switch,
} from "@mui/material";
import { queries } from "../../queries";
import { IIMir } from "../../screens/mir/MIR";
import { useEffect, useState } from "react";
import { IMIR } from "../tabsMir/IMIR";
import {
  IAvanceFinancieroRF,
  IVPTrimestral,
  IVTrimestral,
} from "../../screens/raffi/interfacesRaffi";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import validator from "validator";
import { DialogMonto } from "../formulasDialog/FormulaDialogRaffiAvanceFinanciero";

const VTrimestral = {
  t1: "",
  t2: "",
  t3: "",
  t4: "",
  total: "",
  cuentaPublica: "",
};
const VPTrimestral = {
  pt1: "",
  pt2: "",
  pt3: "",
  pt4: "",
  ptotal: "",
  porcentajeCuentaPublica: "",
};
export function TabAvanceFinanciero({
  resumenAvanceFinancieroRf,
  MIR,
  MA,
  RF,
}: {
  resumenAvanceFinancieroRf: Function;
  MIR: string;
  MA: string;
  RF: string;
}) {
  const jsonMir: IMIR = JSON.parse(MIR);

  const [devengadoModificado, setDevengado_modificado] =
    useState<IVTrimestral>(VTrimestral);
  const [ejercidoModificado, setEjercido_modificado] =
    useState<IVTrimestral>(VTrimestral);
  const [modificadoAutorizado, setModificado_autorizado] =
    useState<IVTrimestral>(VTrimestral);

  const [porcentajedevengado_modificado, setPorcentajeDevengado_modificado] =
    useState<IVPTrimestral>(VPTrimestral);
  const [porcentajeejercido_modificado, setPorcentajeEjercido_modificado] =
    useState<IVPTrimestral>(VPTrimestral);
  const [porcentajemodificado_autorizado, setPorcentajeModificado_autorizado] =
    useState<IVPTrimestral>(VPTrimestral);

  const [avanceFinanciero, setAvanceFinanciero] = useState<IAvanceFinancieroRF>(
    {
      NombrePrograma: jsonMir.encabezado.nombre_del_programa,
      valorProgramaPresupuestario: "0",
      //Calculo: "DEVENGADO/MODIFICADO",
      monto: {
        devengadoModificado: devengadoModificado,
        modificadoAutorizado: modificadoAutorizado,
        ejercidoModificado: ejercidoModificado,
      },
      porcentaje: {
        porcentajeDevengadoModificado: porcentajedevengado_modificado,
        procentajeModificadoAutorizado: porcentajeejercido_modificado,
        porcentajeEjercidoModificado: porcentajemodificado_autorizado,
      },
    }
  );

  useEffect(() => {
    setAvanceFinanciero({
      NombrePrograma: jsonMir.encabezado.nombre_del_programa,
      valorProgramaPresupuestario: "0",
      //Calculo: "DEVENGADO/MODIFICADO",
      monto: {
        devengadoModificado: devengadoModificado,
        modificadoAutorizado: modificadoAutorizado,
        ejercidoModificado: ejercidoModificado,
      },
      porcentaje: {
        porcentajeDevengadoModificado: porcentajedevengado_modificado,
        procentajeModificadoAutorizado: porcentajeejercido_modificado,
        porcentajeEjercidoModificado: porcentajemodificado_autorizado,
      },
    });
  }, [
    devengadoModificado,
    modificadoAutorizado,
    ejercidoModificado,
    porcentajedevengado_modificado,
    porcentajeejercido_modificado,
    porcentajemodificado_autorizado,
  ]);

  // useEffect(() => {
  //   console.log("avanceFinanciero: ", avanceFinanciero.Calculo);
  //   console.log(
  //     "avanceFinanciero: ",
  //     avanceFinanciero.valorProgramaPresupuestario
  //   );
  // }, [avanceFinanciero.Calculo, avanceFinanciero.valorProgramaPresupuestario]);

  function sumarNumerosStrings(accum: number, numerosStrings: string): number {
    const numero = parseFloat(numerosStrings); // Puedes usar parseInt() si solo quieres números enteros
    if (!isNaN(numero)) {
      accum += numero;
    }

    return accum;
  }

  const [trimestre, setTrimestre] = useState("0");

  const sumatoria = () => {
    let Total: number = 0;

    // Total = sumarNumerosStrings(Total, avanceFinanciero.monto.mt1);
    // Total = sumarNumerosStrings(Total, avanceFinanciero.monto.mt2);
    // Total = sumarNumerosStrings(Total, avanceFinanciero.monto.mt3);
    // Total = sumarNumerosStrings(Total, avanceFinanciero.monto.mt4);
    // avanceFinanciero.monto.mtotal =Total.toString()
    return Total;
  };

  // const [calculo, setCalculo] = useState(
  //   RF === "" ? "" : JSON.parse(RF).avanceFinanciero.Calculo || ""
  // );

  useEffect(() => {
    //   resumenAvanceFinancieroRf(avanceFinanciero);
    // }, [resumenAvanceFinancieroRf]);
    // useEffect(()=>{
    //   avanceFinanciero.porcentaje.pt1 =(isNaN(
    //     (parseInt(avanceFinanciero.monto.mt1) * 100) /
    //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
    //   )
    //     ? ""
    //     : (
    //         (parseInt(avanceFinanciero.monto.mt1) * 100) /
    //         parseInt(avanceFinanciero.valorProgramaPresupuestario)
    //       ).toString())
    //     console.log(avanceFinanciero);
  }, []);

  useEffect(() => {
    // avanceFinanciero.porcentaje.pt2 =(isNaN(
    //   (parseInt(avanceFinanciero.monto.mt2) * 100) /
    //     parseInt(avanceFinanciero.valorProgramaPresupuestario)
    // )
    //   ? ""
    //   : (
    //       (parseInt(avanceFinanciero.monto.mt2) * 100) /
    //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
    //     ).toString())
    //   console.log(avanceFinanciero);
  }, []);

  useEffect(() => {
    // avanceFinanciero.porcentaje.pt3 =(isNaN(
    //   (parseInt(avanceFinanciero.monto.mt3) * 100) /
    //     parseInt(avanceFinanciero.valorProgramaPresupuestario)
    // )
    //   ? ""
    //   : (
    //       (parseInt(avanceFinanciero.monto.mt3) * 100) /
    //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
    //     ).toString())
    //   console.log(avanceFinanciero);
  }, []);

  useEffect(() => {
    // avanceFinanciero.porcentaje.pt4 =(isNaN(
    //   (parseInt(avanceFinanciero.monto.mt4) * 100) /
    //     parseInt(avanceFinanciero.valorProgramaPresupuestario)
    // )
    //   ? ""
    //   : (
    //       (parseInt(avanceFinanciero.monto.mt4) * 100) /
    //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
    //     ).toString())
    //   console.log(avanceFinanciero);
    //   avanceFinanciero.porcentaje.ptotal = (parseInt(avanceFinanciero.porcentaje.pt1) + parseInt(avanceFinanciero.porcentaje.pt2) + parseInt(avanceFinanciero.porcentaje.pt3) +  parseInt(avanceFinanciero.porcentaje.pt4)).toString()
  }, []);

  // useEffect(() => {
  //   setAvanceFinanciero(
  useEffect(() => {
    console.log("avanceFinanciero: ", avanceFinanciero);
    console.log("jsonMir: ", jsonMir);
  }, [avanceFinanciero]);
  //   );
  // }, [jsonMir.encabezado.nombre_del_programa, valorPPresupuestario, calculo]);

  const [selector, setSelector] = useState("MODIFICADO/AUTORIZADO");

  const validarNumero = (dato: string, state: any) => {
    if (/^[0-9]+$/.test(dato)) {
      return dato;
    } else if (dato.length === 0) {
      return "";
    }
    return state;
  };

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const handleClickOpen = () => {
    setOpenFormulaDialog(true);
  };

  const assignValue = (valor: string, calculo: string, trimestre: string) => {
  
    switch (calculo) {
      case "MODIFICADO/AUTORIZADO":
        switch (trimestre) {
          case "TRIMESTRE 1":
            setModificado_autorizado({ ...modificadoAutorizado, t1: valor });
          break;
          case "TRIMESTRE 2":
            setModificado_autorizado({ ...modificadoAutorizado, t2: valor });
          break;
          case "TRIMESTRE 3":
            setModificado_autorizado({ ...modificadoAutorizado, t3: valor });
          break;
          case "TRIMESTRE 4":
            setModificado_autorizado({ ...modificadoAutorizado, t4: valor });
          break;
        }

        break;
      case "DEVENGADO/MODIFICADO":
        switch (trimestre) {
          case "TRIMESTRE 1":
            setDevengado_modificado({ ...devengadoModificado, t1: valor });
          break;
          case "TRIMESTRE 2":
            setDevengado_modificado({ ...devengadoModificado, t2: valor });
          break;
          case "TRIMESTRE 3":
            setDevengado_modificado({ ...devengadoModificado, t3: valor });
          break;
          case "TRIMESTRE 4":
            setDevengado_modificado({ ...devengadoModificado, t4: valor });
          break;
        }
        break;
      case "EJERCIDO/MODIFICADO":
        switch (trimestre) {
          case "TRIMESTRE 1":
            setEjercido_modificado({ ...ejercidoModificado, t1: valor });
          break;
          case "TRIMESTRE 2":
            setEjercido_modificado({ ...ejercidoModificado, t2: valor });
          break;
          case "TRIMESTRE 3":
            setEjercido_modificado({ ...ejercidoModificado, t3: valor });
          break;
          case "TRIMESTRE 4":
            setEjercido_modificado({ ...ejercidoModificado, t4: valor });
          break;
        }
        break;
    }
  };

  return (
    <>
      <Grid
        container
        direction={"row"}
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item lg={10}>
          <InputLabel sx={queries.medium_text}>NOMBRE DEL PROGRAMA</InputLabel>
          <TextField
            fullWidth
            sx={queries.medium_text}
            variant="standard"
            value={jsonMir.encabezado.nombre_del_programa}
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
          lg={10}
          sx={{}}
        >
          <Grid
            item
            lg={5}
            //sx={{ backgroundColor: "red" }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="0"
              onChange={(a) => {
                switch (selector) {
                }

                setAvanceFinanciero({
                  ...avanceFinanciero,
                  valorProgramaPresupuestario: a.target.value,
                });
              }}
              value={
                // "$" +
                parseInt(avanceFinanciero.valorProgramaPresupuestario) <= 0
                  ? ""
                  : avanceFinanciero.valorProgramaPresupuestario
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                      .replace(/\D/g, "")
              }
              label="VALOR DEL PROGRAMA PRESUPUESTARIO"
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
                startAdornment: <AttachMoneyIcon />,
              }}
            />
          </Grid>

          <Grid
            item
            lg={5}
            sx={{
              //backgroundColor: "#f0f0f0",
              display: "flex",
              //flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 2,
              border: "1px solid #ccc",
              height: "22vh",
            }}
          >
            <FormControl>
              <FormLabel
                sx={{
                  fontFamily: "MontserratBold",
                  fontSize: "0.8vw",
                }}
              >
                CALCULO
              </FormLabel>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "center",
                }}
              >
                <FormControlLabel
                  value={"MODIFICADO/AUTORIZADO"}
                  label={
                    <Typography
                      sx={{
                        fontSize: "0.7vw",
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      MODIFICADO/AUTORIZADO
                    </Typography>
                  }
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={
                    <Radio
                      checked={selector === "MODIFICADO/AUTORIZADO"}
                      onChange={(a) => {
                        console.log(selector);
                        setSelector(a.target.value);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"DEVENGADO/MODIFICADO"}
                  label={
                    <Typography
                      sx={{
                        fontSize: "0.7vw",
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      DEVENGADO/MODIFICADO
                    </Typography>
                  }
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={
                    <Radio
                      checked={selector === "DEVENGADO/MODIFICADO"}
                      onChange={(a) => {
                        console.log(selector);

                        setSelector(a.target.value);
                      }}
                    />
                  }
                />

                <FormControlLabel
                  value={"EJERCIDO/MODIFICADO"}
                  label={
                    <Typography
                      sx={{
                        fontSize: "0.7vw",
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      EJERCIDO/MODIFICADO
                    </Typography>
                  }
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={
                    <Radio
                      checked={selector === "EJERCIDO/MODIFICADO"}
                      onChange={(a) => {
                        console.log(selector);
                        setSelector(a.target.value);
                      }}
                    />
                  }
                />
              </Grid>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container direction={"row"}>
          <Grid
            container
            item
            direction={"row"}
            sx={{
              //display: "flex",

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
                // alignItems: "center",
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
                  placeholder="SIN CAPTURAR"
                  //label="monto T1"
                  onClick={(a) => {
                    //let valor = a.target.value;
                    if (selector === "DEVENGADO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 1");
                      handleClickOpen();
                      // let numeroValido = validarNumero(
                      //   valor,
                      //   devengadoModificado.t1
                      // );
                      // setDevengado_modificado({
                      //   ...devengadoModificado,
                      //   t1: numeroValido,
                      // });
                    } else if (selector === "EJERCIDO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 1");
                      handleClickOpen();
                      // let numeroValido = validarNumero(
                      //   valor,
                      //   ejercidoModificado.t1
                      // );
                      // setEjercido_modificado({
                      //   ...ejercidoModificado,
                      //   t1: numeroValido,
                      // });
                    } else if (selector === "MODIFICADO/AUTORIZADO") {
                      setTrimestre("TRIMESTRE 1");
                      handleClickOpen();
                      //setSelector(selector)
                      // let numeroValido = validarNumero(
                      //   valor,
                      //   modificadoAutorizado.t1
                      // );
                      // setModificado_autorizado({
                      //   ...modificadoAutorizado,
                      //   t1: numeroValido,
                      // });
                    }
                  }}
                  value={
                    //   // "$" +
                    selector === "DEVENGADO/MODIFICADO"
                      ? devengadoModificado.t1
                      : selector === "EJERCIDO/MODIFICADO"
                      ? ejercidoModificado.t1
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? modificadoAutorizado.t1
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
                  placeholder="SIN CAPTURAR"
                  //label="porcentaje T1"
                  sx={queries.medium_text}
                  // selector === "DEVENGADO/MODIFICADO"
                  //   ? (porcentajedevengado_modificado.pt1 = (
                  //       (parseInt(devengadoModificado.t1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString())
                  //   : selector === "EJERCIDO/MODIFICADO"
                  //   ? (porcentajeejercido_modificado.pt1 = (
                  //       (parseInt(ejercidoModificado.t1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString())
                  //   : selector === "MODIFICADO/AUTORIZADO"
                  //   ? (porcentajeejercido_modificado.pt1 = (
                  //       (parseInt(modificadoAutorizado.t1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString())
                  //   : null

                  // avanceFinanciero.porcentaje.devengadoModificado.pt1 =
                  // isNaN(
                  //   (parseInt(avanceFinanciero.monto.mt1) * 100) /
                  //     parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  // )
                  //   ? ""
                  //  : (
                  //       (parseInt(avanceFinanciero.monto.mt1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString()

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
                <InputLabel sx={queries.medium_text}>TRIMESTRE 2</InputLabel>
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="SIN CAPTURAR"
                  //label="monto T1"
                  onClick={(a) => {
                    //let valor = a.target.value;
                    if (selector === "DEVENGADO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 2");
                      handleClickOpen();
                      // let numeroValido = validarNumero(
                      //   valor,
                      //   devengadoModificado.t1
                      // );
                      // setDevengado_modificado({
                      //   ...devengadoModificado,
                      //   t1: numeroValido,
                      // });
                    } else if (selector === "EJERCIDO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 2");
                      handleClickOpen();
                      // let numeroValido = validarNumero(
                      //   valor,
                      //   ejercidoModificado.t1
                      // );
                      // setEjercido_modificado({
                      //   ...ejercidoModificado,
                      //   t1: numeroValido,
                      // });
                    } else if (selector === "MODIFICADO/AUTORIZADO") {
                      setTrimestre("TRIMESTRE 2");
                      handleClickOpen();
                      //setSelector(selector)
                      // let numeroValido = validarNumero(
                      //   valor,
                      //   modificadoAutorizado.t1
                      // );
                      // setModificado_autorizado({
                      //   ...modificadoAutorizado,
                      //   t1: numeroValido,
                      // });
                    }
                  }}
                  value={
                    //   // "$" +
                    selector === "DEVENGADO/MODIFICADO"
                      ? devengadoModificado.t2
                      : selector === "EJERCIDO/MODIFICADO"
                      ? ejercidoModificado.t2
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? modificadoAutorizado.t2
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
                  placeholder="SIN CAPTURAR"
                  //label="porcentaje T1"
                  sx={queries.medium_text}
                  // selector === "DEVENGADO/MODIFICADO"
                  //   ? (porcentajedevengado_modificado.pt1 = (
                  //       (parseInt(devengadoModificado.t1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString())
                  //   : selector === "EJERCIDO/MODIFICADO"
                  //   ? (porcentajeejercido_modificado.pt1 = (
                  //       (parseInt(ejercidoModificado.t1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString())
                  //   : selector === "MODIFICADO/AUTORIZADO"
                  //   ? (porcentajeejercido_modificado.pt1 = (
                  //       (parseInt(modificadoAutorizado.t1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString())
                  //   : null

                  // avanceFinanciero.porcentaje.devengadoModificado.pt1 =
                  // isNaN(
                  //   (parseInt(avanceFinanciero.monto.mt1) * 100) /
                  //     parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  // )
                  //   ? ""
                  //  : (
                  //       (parseInt(avanceFinanciero.monto.mt1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString()

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
                  fullWidth
                  size="small"
                  placeholder="SIN CAPTURAR"
                  //label="monto T1"
                  onClick={(a) => {
                    //let valor = a.target.value;
                    if (selector === "DEVENGADO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 3");
                      handleClickOpen();
                      // let numeroValido = validarNumero(
                      //   valor,
                      //   devengadoModificado.t1
                      // );
                      // setDevengado_modificado({
                      //   ...devengadoModificado,
                      //   t1: numeroValido,
                      // });
                    } else if (selector === "EJERCIDO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 3");
                      handleClickOpen();
                      // let numeroValido = validarNumero(
                      //   valor,
                      //   ejercidoModificado.t1
                      // );
                      // setEjercido_modificado({
                      //   ...ejercidoModificado,
                      //   t1: numeroValido,
                      // });
                    } else if (selector === "MODIFICADO/AUTORIZADO") {
                      setTrimestre("TRIMESTRE 3");
                      handleClickOpen();
                      //setSelector(selector)
                      // let numeroValido = validarNumero(
                      //   valor,
                      //   modificadoAutorizado.t1
                      // );
                      // setModificado_autorizado({
                      //   ...modificadoAutorizado,
                      //   t1: numeroValido,
                      // });
                    }
                  }}
                  value={
                    //   // "$" +
                    selector === "DEVENGADO/MODIFICADO"
                      ? devengadoModificado.t3
                      : selector === "EJERCIDO/MODIFICADO"
                      ? ejercidoModificado.t3
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? modificadoAutorizado.t3
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
                  placeholder="SIN CAPTURAR"
                  //label="porcentaje T1"
                  sx={queries.medium_text}
                  // selector === "DEVENGADO/MODIFICADO"
                  //   ? (porcentajedevengado_modificado.pt1 = (
                  //       (parseInt(devengadoModificado.t1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString())
                  //   : selector === "EJERCIDO/MODIFICADO"
                  //   ? (porcentajeejercido_modificado.pt1 = (
                  //       (parseInt(ejercidoModificado.t1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString())
                  //   : selector === "MODIFICADO/AUTORIZADO"
                  //   ? (porcentajeejercido_modificado.pt1 = (
                  //       (parseInt(modificadoAutorizado.t1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString())
                  //   : null

                  // avanceFinanciero.porcentaje.devengadoModificado.pt1 =
                  // isNaN(
                  //   (parseInt(avanceFinanciero.monto.mt1) * 100) /
                  //     parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  // )
                  //   ? ""
                  //  : (
                  //       (parseInt(avanceFinanciero.monto.mt1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString()

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
                <InputLabel sx={queries.medium_text}>TRIMESTRE 4</InputLabel>
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="SIN CAPTURAR"
                  //label="monto T1"
                  onClick={(a) => {
                    //let valor = a.target.value;
                    if (selector === "DEVENGADO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 4");
                      handleClickOpen();
                      // let numeroValido = validarNumero(
                      //   valor,
                      //   devengadoModificado.t1
                      // );
                      // setDevengado_modificado({
                      //   ...devengadoModificado,
                      //   t1: numeroValido,
                      // });
                    } else if (selector === "EJERCIDO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 4");
                      handleClickOpen();
                      // let numeroValido = validarNumero(
                      //   valor,
                      //   ejercidoModificado.t1
                      // );
                      // setEjercido_modificado({
                      //   ...ejercidoModificado,
                      //   t1: numeroValido,
                      // });
                    } else if (selector === "MODIFICADO/AUTORIZADO") {
                      setTrimestre("TRIMESTRE 4");
                      handleClickOpen();
                      //setSelector(selector)
                      // let numeroValido = validarNumero(
                      //   valor,
                      //   modificadoAutorizado.t1
                      // );
                      // setModificado_autorizado({
                      //   ...modificadoAutorizado,
                      //   t1: numeroValido,
                      // });
                    }
                  }}
                  value={
                    //   // "$" +
                    selector === "DEVENGADO/MODIFICADO"
                      ? devengadoModificado.t4
                      : selector === "EJERCIDO/MODIFICADO"
                      ? ejercidoModificado.t4
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? modificadoAutorizado.t4
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
                  placeholder="SIN CAPTURAR"
                  //label="porcentaje T1"
                  sx={queries.medium_text}
                  // selector === "DEVENGADO/MODIFICADO"
                  //   ? (porcentajedevengado_modificado.pt1 = (
                  //       (parseInt(devengadoModificado.t1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString())
                  //   : selector === "EJERCIDO/MODIFICADO"
                  //   ? (porcentajeejercido_modificado.pt1 = (
                  //       (parseInt(ejercidoModificado.t1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString())
                  //   : selector === "MODIFICADO/AUTORIZADO"
                  //   ? (porcentajeejercido_modificado.pt1 = (
                  //       (parseInt(modificadoAutorizado.t1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString())
                  //   : null

                  // avanceFinanciero.porcentaje.devengadoModificado.pt1 =
                  // isNaN(
                  //   (parseInt(avanceFinanciero.monto.mt1) * 100) /
                  //     parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  // )
                  //   ? ""
                  //  : (
                  //       (parseInt(avanceFinanciero.monto.mt1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString()

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
                  //label="Cuenta Publica"
                  placeholder="SIN CAPTURAR"
                  sx={queries.medium_text}
                  // value={"150000000"}
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

              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="SIN CAPTURAR"
                  //label="porcentaje T1"
                  sx={queries.medium_text}
                  // selector === "DEVENGADO/MODIFICADO"
                  //   ? (porcentajedevengado_modificado.pt1 = (
                  //       (parseInt(devengadoModificado.t1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString())
                  //   : selector === "EJERCIDO/MODIFICADO"
                  //   ? (porcentajeejercido_modificado.pt1 = (
                  //       (parseInt(ejercidoModificado.t1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString())
                  //   : selector === "MODIFICADO/AUTORIZADO"
                  //   ? (porcentajeejercido_modificado.pt1 = (
                  //       (parseInt(modificadoAutorizado.t1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString())
                  //   : null

                  // avanceFinanciero.porcentaje.devengadoModificado.pt1 =
                  // isNaN(
                  //   (parseInt(avanceFinanciero.monto.mt1) * 100) /
                  //     parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  // )
                  //   ? ""
                  //  : (
                  //       (parseInt(avanceFinanciero.monto.mt1) * 100) /
                  //       parseInt(avanceFinanciero.valorProgramaPresupuestario)
                  //     ).toString()

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
        <DialogMonto
          open={openFormulaDialog}
          close={handleClose}
          trimestre={trimestre}
          selector={selector}
          setValor={assignValue}
        />
      </Grid>
    </>
  );
}