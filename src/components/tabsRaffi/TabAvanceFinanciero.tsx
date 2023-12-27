import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { queries } from "../../queries";
import { IMIR } from "../tabsMir/interfaces mir/IMIR";
import {
  IAvanceFinancieroRF,
  IRFEdit,
  IVPTrimestral,
  IVTrimestral
} from "./interfacesRaffi";
// import validator from "validator";
import { DialogMonto } from "../formulasDialog/FormulaDialogRaffiAvanceFinanciero";
import { alertaInfo } from "../genericComponents/Alertas";

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
  //show,
  resumenAvanceFinancieroRf,
  MIR,
  MA,
  avanceFinancieroRF,
  setAvanceFinancieroRF,
  raffiboolean,
}: {
  // show : boolean;
  resumenAvanceFinancieroRf: Function;
  MIR: string;
  MA: string;
  avanceFinancieroRF: IAvanceFinancieroRF;
  setAvanceFinancieroRF: Function;
  raffiboolean: IRFEdit
}) {

  const jsonMir: IMIR = JSON.parse(MIR);

  const [trimestre, setTrimestre] = useState("0");
  const [devengadoModificado, setDevengado_modificado] = useState<IVTrimestral>(VTrimestral);
  const [ejercidoModificado, setEjercido_modificado] = useState<IVTrimestral>(VTrimestral);
  const [modificadoAutorizado, setModificado_autorizado] = useState<IVTrimestral>(VTrimestral);

  const [porcentajedevengado_modificado, setPorcentajeDevengado_modificado] = useState<IVPTrimestral>(VPTrimestral);
  const [porcentajeejercido_modificado, setPorcentajeEjercido_modificado] = useState<IVPTrimestral>(VPTrimestral);
  const [porcentajemodificado_autorizado, setPorcentajeModificado_autorizado] = useState<IVPTrimestral>(VPTrimestral);
  const [valorProgramaPresupuestario, setValorProgramaPresupuestario] = useState("0");

  const [avanceFinanciero, setAvanceFinanciero] = useState<IAvanceFinancieroRF>(

    avanceFinancieroRF
  );

  // useEffect(() => {
  //   let objetoAuxiliar: IAvanceFinancieroRF = {
  //     nombrePrograma: "",
  //     //jsonMir.encabezado.nombre_del_programa,
  //     valorProgramaPresupuestario: valorProgramaPresupuestario,
  //     //Calculo: "DEVENGADO/MODIFICADO",
  //     monto: {
  //       devengadoModificado: devengadoModificado,
  //       modificadoAutorizado: modificadoAutorizado,
  //       ejercidoModificado: ejercidoModificado,
  //     },
  //     porcentaje: {
  //       porcentajeDevengadoModificado: porcentajedevengado_modificado,
  //       procentajeModificadoAutorizado: porcentajeejercido_modificado,
  //       porcentajeEjercidoModificado: porcentajemodificado_autorizado,
  //     },
  //   };

  //   setAvanceFinanciero(objetoAuxiliar);
  //   console.log("objetoAuxiliar: ",objetoAuxiliar);

  //   setAvanceFinancieroRF(avanceFinanciero);

  // }, [
  //   devengadoModificado,
  //   modificadoAutorizado,
  //   ejercidoModificado,
  //   porcentajedevengado_modificado,
  //   porcentajeejercido_modificado,
  //   porcentajemodificado_autorizado,
  // ]);

  function sumarNumerosStrings(accum: number, numerosStrings: string): number {
    const numero = parseFloat(numerosStrings); // Puedes usar parseInt() si solo quieres números enteros
    if (!isNaN(numero)) {
      accum += numero;
    }

    return accum;
  }

  // useEffect(() => {
  //   if (
  //     avanceFinancieroRF.valorProgramaPresupuestario !== "" ||
  //     avanceFinancieroRF.valorProgramaPresupuestario !== null
  //   ) {
  //     setAvanceFinanciero(avanceFinancieroRF);
  //     setValorProgramaPresupuestario(
  //       avanceFinancieroRF.valorProgramaPresupuestario
  //     );

  //     setModificado_autorizado(avanceFinancieroRF.monto.modificadoAutorizado);
  //     setPorcentajeModificado_autorizado(
  //       avanceFinancieroRF.porcentaje.procentajeModificadoAutorizado
  //     );

  //     setEjercido_modificado(avanceFinancieroRF.monto.ejercidoModificado);
  //     setPorcentajeEjercido_modificado(
  //       avanceFinancieroRF.porcentaje.porcentajeEjercidoModificado
  //     );

  //     setDevengado_modificado(avanceFinancieroRF.monto.devengadoModificado);
  //     setPorcentajeDevengado_modificado(
  //       avanceFinancieroRF.porcentaje.porcentajeDevengadoModificado
  //     );
  //   }
  // }, []);

  useEffect(() => {
    console.log("avanceFinanciero: ", avanceFinanciero);

    setAvanceFinancieroRF(avanceFinanciero);
    // setAvanceFinancieroRF(avanceFinanciero)
  }, [avanceFinanciero]);

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

  const assignValue = (
    valor: string,
    calculo: string,
    trimestre: string,
    valor1: string,
    valor2: string
  ) => {
    console.log("valor: ", valor);
    console.log("valor1: ", valor1);
    console.log("valor2: ", valor2);
    console.log("avanceFinanciero Dialog: ", avanceFinanciero);


    let porcentaje =
      (parseFloat(valor) /
        parseFloat(avanceFinanciero.valorProgramaPresupuestario)) *
      100;
    console.log("calculo: ", calculo);

    switch (calculo) {
      case "MODIFICADO/AUTORIZADO":
        let aux = { ...avanceFinanciero }
        switch (trimestre) {

          case "TRIMESTRE 1":
            aux.monto.modificadoAutorizado.t1 = { valor1: valor1, valor2: valor2, resultado: valor }
            aux.porcentaje.procentajeModificadoAutorizado.pt1 = porcentaje.toString()
            console.log("aux: ", aux);
            setAvanceFinanciero({
              ...aux
            });

            break;
          case "TRIMESTRE 2":
            let aux2 = avanceFinanciero
            aux2.monto.modificadoAutorizado.t2 = { valor1: valor1, valor2: valor2, resultado: valor }
            aux2.porcentaje.procentajeModificadoAutorizado.pt2 = porcentaje.toString()
            setAvanceFinanciero({
              ...aux2
            });

            break;
          case "TRIMESTRE 3":
            let aux3 = avanceFinanciero
            aux3.monto.modificadoAutorizado.t3 = { valor1: valor1, valor2: valor2, resultado: valor }
            aux3.porcentaje.procentajeModificadoAutorizado.pt3 = porcentaje.toString()
            setAvanceFinanciero({
              ...aux3
            });
            break;
          case "TRIMESTRE 4":
            let aux4 = avanceFinanciero
            aux4.monto.modificadoAutorizado.t4 = { valor1: valor1, valor2: valor2, resultado: valor }
            aux.porcentaje.procentajeModificadoAutorizado.pt4 = porcentaje.toString()
            setAvanceFinanciero({
              ...aux4
            });
            break;
        }

        break;

      case "DEVENGADO/MODIFICADO":

        switch (trimestre) {
          case "TRIMESTRE 1":
            console.log("entre2: ", trimestre);
            let auxd = avanceFinanciero
            auxd.monto.devengadoModificado.t1 = { valor1: valor1, valor2: valor2, resultado: valor }
            auxd.porcentaje.porcentajeDevengadoModificado.pt1 = porcentaje.toString()

            setAvanceFinanciero({
              ...auxd
            });

            break;
          case "TRIMESTRE 2":
            let auxd2 = avanceFinanciero
            auxd2.monto.devengadoModificado.t2 = { valor1: valor1, valor2: valor2, resultado: valor }
            auxd2.porcentaje.porcentajeDevengadoModificado.pt2 = porcentaje.toString()
            setAvanceFinanciero({
              ...auxd2
            });

            break;
          case "TRIMESTRE 3":
            let auxd3 = avanceFinanciero
            auxd3.monto.devengadoModificado.t3 = { valor1: valor1, valor2: valor2, resultado: valor }
            auxd3.porcentaje.porcentajeDevengadoModificado.pt3 = porcentaje.toString()
            setAvanceFinanciero({
              ...auxd3
            });
            break;
          case "TRIMESTRE 4":
            let auxd4 = avanceFinanciero
            auxd4.monto.devengadoModificado.t4 = { valor1: valor1, valor2: valor2, resultado: valor }
            auxd4.porcentaje.porcentajeDevengadoModificado.pt4 = porcentaje.toString()
            setAvanceFinanciero({
              ...auxd4
            });
            break;
        }
        break;

      case "EJERCIDO/MODIFICADO":
        switch (trimestre) {
          case "TRIMESTRE 1":
            console.log("entre2: ", trimestre);
            let auxe1 = avanceFinanciero
            auxe1.monto.ejercidoModificado.t1 = { valor1: valor1, valor2: valor2, resultado: valor }
            auxe1.porcentaje.porcentajeEjercidoModificado.pt1 = porcentaje.toString()

            setAvanceFinanciero({
              ...auxe1
            });

            break;
          case "TRIMESTRE 2":
            let auxe2 = avanceFinanciero
            auxe2.monto.ejercidoModificado.t2 = { valor1: valor1, valor2: valor2, resultado: valor }
            auxe2.porcentaje.porcentajeEjercidoModificado.pt2 = porcentaje.toString()
            setAvanceFinanciero({
              ...auxe2
            });

            break;
          case "TRIMESTRE 3":
            let auxe3 = avanceFinanciero

            auxe3.monto.ejercidoModificado.t3 = { valor1: valor1, valor2: valor2, resultado: valor }
            auxe3.porcentaje.porcentajeEjercidoModificado.pt3 = porcentaje.toString()
            setAvanceFinanciero({
              ...auxe3
            });
            break;
          case "TRIMESTRE 4":
            let auxe4 = avanceFinanciero

            auxe4.monto.ejercidoModificado.t4 = { valor1: valor1, valor2: valor2, resultado: valor }
            auxe4.porcentaje.porcentajeEjercidoModificado.pt4 = porcentaje.toString()
            setAvanceFinanciero({
              ...auxe4
            });
            break;
        }
        break;
    }
  };

  const newvalue = (valor: string) => {
    const nuevoValor = valor;

    if (nuevoValor !== valorProgramaPresupuestario) {
      setPorcentajeEjercido_modificado(porcentajeejercido_modificado);
    }
  };

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
          boxShadow: 10,
          borderRadius: 5,
        }}
      >
        <Grid item lg={10}>
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
          lg={10}
          sx={{}}
        >
          <Grid
            item
            lg={5}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="0"
              onChange={(a) => {
                if (a.target.value === "0" || a.target.value === null || a.target.value === "") {
                  alertaInfo("Se neceista un valor para capturar los campos de trimestre")
                }

                setAvanceFinanciero({
                  ...avanceFinanciero,
                  valorProgramaPresupuestario: a.target.value,
                });

                newvalue(a.target.value);
              }}
              value={
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
              display: "flex",
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
                  disabled={avanceFinanciero.valorProgramaPresupuestario === "0" || avanceFinanciero.valorProgramaPresupuestario === null || avanceFinanciero.valorProgramaPresupuestario === ""}
                  placeholder="SIN CAPTURAR"
                  onClick={(a) => {
                      setTrimestre("TRIMESTRE 1");
                      handleClickOpen();
                  }}
                  value={
                    
                    selector === "DEVENGADO/MODIFICADO"
                      ? avanceFinanciero.monto.devengadoModificado.t1.resultado
                      
                      : selector === "EJERCIDO/MODIFICADO"
                        ? avanceFinanciero.monto.ejercidoModificado.t1.resultado
                        
                        : selector === "MODIFICADO/AUTORIZADO"
                          ? avanceFinanciero.monto.modificadoAutorizado.t1.resultado
                         
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
                  disabled={avanceFinanciero.valorProgramaPresupuestario === "0" || avanceFinanciero.valorProgramaPresupuestario === null || avanceFinanciero.valorProgramaPresupuestario === ""}
                  size="small"
                  placeholder="0"
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? avanceFinanciero.porcentaje.porcentajeDevengadoModificado.pt1
                      : selector === "EJERCIDO/MODIFICADO"
                        ? avanceFinanciero.porcentaje.porcentajeEjercidoModificado.pt1
                        : selector === "MODIFICADO/AUTORIZADO"
                          ? avanceFinanciero.porcentaje.procentajeModificadoAutorizado.pt1
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
                  disabled={avanceFinanciero.valorProgramaPresupuestario === "0" || avanceFinanciero.valorProgramaPresupuestario === null || avanceFinanciero.valorProgramaPresupuestario === ""}
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
                      ? avanceFinanciero.monto.devengadoModificado.t2.resultado
                     
                      : selector === "EJERCIDO/MODIFICADO"
                        ? avanceFinanciero.monto.ejercidoModificado.t2.resultado
                        
                        : selector === "MODIFICADO/AUTORIZADO"
                          ? avanceFinanciero.monto.modificadoAutorizado.t2.resultado
                       
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
                  placeholder="0"
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? avanceFinanciero.porcentaje.porcentajeDevengadoModificado.pt2
                      : selector === "EJERCIDO/MODIFICADO"
                        ? avanceFinanciero.porcentaje.porcentajeEjercidoModificado.pt2
                        : selector === "MODIFICADO/AUTORIZADO"
                          ? avanceFinanciero.porcentaje.procentajeModificadoAutorizado.pt2
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
                <InputLabel sx={queries.medium_text}>TRIMESTRE 3</InputLabel>
              </Grid>

              <Grid item>
                <TextField
                  disabled={avanceFinanciero.valorProgramaPresupuestario === "0" || avanceFinanciero.valorProgramaPresupuestario === null || avanceFinanciero.valorProgramaPresupuestario === ""}
                  fullWidth
                  size="small"
                  placeholder="SIN CAPTURAR"
                  onClick={(a) => {
                    setTrimestre("TRIMESTRE 3");
                    handleClickOpen();
                  }}
                  value={
                
                    selector === "DEVENGADO/MODIFICADO"
                      ? avanceFinanciero.monto.devengadoModificado.t3.resultado
                      : selector === "EJERCIDO/MODIFICADO"
                        ? avanceFinanciero.monto.ejercidoModificado.t3.resultado
                        : selector === "MODIFICADO/AUTORIZADO"
                          ? avanceFinanciero.monto.modificadoAutorizado.t3.resultado
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
                  placeholder="0"
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? avanceFinanciero.porcentaje.porcentajeDevengadoModificado.pt3
                      : selector === "EJERCIDO/MODIFICADO"
                        ? avanceFinanciero.porcentaje.porcentajeEjercidoModificado.pt3
                        : selector === "MODIFICADO/AUTORIZADO"
                          ? avanceFinanciero.porcentaje.procentajeModificadoAutorizado.pt3
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
                  disabled={avanceFinanciero.valorProgramaPresupuestario === "0" || avanceFinanciero.valorProgramaPresupuestario === null || avanceFinanciero.valorProgramaPresupuestario === ""}
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
                      ? avanceFinanciero.monto.devengadoModificado.t4.resultado
                      : selector === "EJERCIDO/MODIFICADO"
                        ? avanceFinanciero.monto.ejercidoModificado.t4.resultado
                        : selector === "MODIFICADO/AUTORIZADO"
                          ? avanceFinanciero.monto.modificadoAutorizado.t4.resultado
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
                  placeholder="0"
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? avanceFinanciero.porcentaje.porcentajeDevengadoModificado.pt4
                      : selector === "EJERCIDO/MODIFICADO"
                        ? avanceFinanciero.porcentaje.porcentajeEjercidoModificado.pt4
                        : selector === "MODIFICADO/AUTORIZADO"
                          ? avanceFinanciero.porcentaje.procentajeModificadoAutorizado.pt4
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
                        ? Number(avanceFinanciero.monto.devengadoModificado.cuentaPublica)
                        : selector === "EJERCIDO/MODIFICADO"
                          ? Number(avanceFinanciero.monto.ejercidoModificado.cuentaPublica)
                          : selector === "MODIFICADO/AUTORIZADO"
                            ? Number(avanceFinanciero.monto.modificadoAutorizado.cuentaPublica)
                            : 0;
                    valor = validarNumero(a.target.value, valor);

                    let porcentaje: number = 0;
                    if (selector === "DEVENGADO/MODIFICADO") {
                      setDevengado_modificado({
                        ...devengadoModificado,
                        cuentaPublica: valor.toString(),
                      });
                      porcentaje =
                        (Number(a.target.value) /
                          Number(
                            avanceFinanciero.valorProgramaPresupuestario
                          )) *
                        100;

                      setPorcentajeDevengado_modificado({
                        ...porcentajedevengado_modificado,
                        porcentajeCuentaPublica: porcentaje.toString(),
                      });
                    } else if (selector === "EJERCIDO/MODIFICADO") {
                      setEjercido_modificado({
                        ...ejercidoModificado,
                        cuentaPublica: valor.toString(),
                      });
                      porcentaje =
                        (Number(a.target.value) /
                          Number(
                            avanceFinanciero.valorProgramaPresupuestario
                          )) *
                        100;
                      setPorcentajeEjercido_modificado({
                        ...porcentajeejercido_modificado,
                        porcentajeCuentaPublica: porcentaje.toString(),
                      });
                    } else if (selector === "MODIFICADO/AUTORIZADO") {
                      setModificado_autorizado({
                        ...modificadoAutorizado,
                        cuentaPublica: valor.toString(),
                      });
                      porcentaje =
                        (Number(a.target.value) /
                          Number(
                            avanceFinanciero.valorProgramaPresupuestario
                          )) *
                        100;
                      setPorcentajeModificado_autorizado({
                        ...porcentajemodificado_autorizado,
                        porcentajeCuentaPublica: porcentaje.toString(),
                      });
                    }
                  }}
                  value={
                    //   // "$" +
                    selector === "DEVENGADO/MODIFICADO"
                      ? devengadoModificado.cuentaPublica
                      : selector === "EJERCIDO/MODIFICADO"
                        ? ejercidoModificado.cuentaPublica
                        : selector === "MODIFICADO/AUTORIZADO"
                          ? modificadoAutorizado.cuentaPublica
                          : null
                  }
                  sx={queries.medium_text}
                  // value={"150000000"}
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
                  placeholder="0"
                  //label="porcentaje T1"
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? porcentajedevengado_modificado.porcentajeCuentaPublica
                      : selector === "EJERCIDO/MODIFICADO"
                        ? porcentajeejercido_modificado.porcentajeCuentaPublica
                        : selector === "MODIFICADO/AUTORIZADO"
                          ? porcentajemodificado_autorizado.porcentajeCuentaPublica
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
