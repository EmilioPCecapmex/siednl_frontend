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
  //avanceFinancieroRF,
  setAvanceFinancieroRF,
  raffiboolean,
}: {
  // show : boolean;
  resumenAvanceFinancieroRf: Function;
  MIR: string;
  MA: string;
  //avanceFinancieroRF: IAvanceFinancieroRF;
  setAvanceFinancieroRF: Function;
  raffiboolean: IRFEdit
}){

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
    {
      nombrePrograma: "",
      valorProgramaPresupuestario: "0",
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
    let objetoAuxiliar: IAvanceFinancieroRF = {
      nombrePrograma: "",
      //jsonMir.encabezado.nombre_del_programa,
      valorProgramaPresupuestario: valorProgramaPresupuestario,
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
    };

    setAvanceFinanciero(objetoAuxiliar);

    setAvanceFinancieroRF(objetoAuxiliar);
    
  }, [
    devengadoModificado,
    modificadoAutorizado,
    ejercidoModificado,
    porcentajedevengado_modificado,
    porcentajeejercido_modificado,
    porcentajemodificado_autorizado,
  ]);

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
    setAvanceFinancieroRF(avanceFinanciero);
  }, [valorProgramaPresupuestario]);

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
    console.log("valor: ",valor);
    console.log("valor1: ",valor1);
    console.log("valor2: ",valor2);
    let porcentaje =
      (parseFloat(valor) /
        parseFloat(avanceFinanciero.valorProgramaPresupuestario)) *
      100;
    switch (calculo) {
      case "MODIFICADO/AUTORIZADO":
        switch (trimestre) {
          case "TRIMESTRE 1":
            setModificado_autorizado({
              ...modificadoAutorizado,
              t1: { valor1: valor1, valor2: valor2, resultado: valor },
            });

            setPorcentajeModificado_autorizado({
              ...porcentajemodificado_autorizado,
              pt1: porcentaje.toString(),
            });

            break;
          case "TRIMESTRE 2":
            setModificado_autorizado({
              ...modificadoAutorizado,
              t2: { valor1: valor1, valor2: valor2, resultado: valor },
            });

            setPorcentajeModificado_autorizado({
              ...porcentajemodificado_autorizado,
              pt2: porcentaje.toString(),
            });
            break;
          case "TRIMESTRE 3":
            setModificado_autorizado({
              ...modificadoAutorizado,
              t3: { valor1: valor1, valor2: valor2, resultado: valor },
            });
            setPorcentajeModificado_autorizado({
              ...porcentajemodificado_autorizado,
              pt3: porcentaje.toString(),
            });
            break;
          case "TRIMESTRE 4":
            setModificado_autorizado({
              ...modificadoAutorizado,
              t4: { valor1: valor1, valor2: valor2, resultado: valor },
            });
            setPorcentajeModificado_autorizado({
              ...porcentajemodificado_autorizado,
              pt4: porcentaje.toString(),
            });
            break;
        }

        break;
      case "DEVENGADO/MODIFICADO":
        switch (trimestre) {
          case "TRIMESTRE 1":
            setDevengado_modificado({
              ...devengadoModificado,
              t1: { valor1: valor1, valor2: valor2, resultado: valor },
            });
            setPorcentajeDevengado_modificado({
              ...porcentajedevengado_modificado,
              pt1: porcentaje.toString(),
            });
            break;
          case "TRIMESTRE 2":
            setDevengado_modificado({
              ...devengadoModificado,
              t2: { valor1: valor1, valor2: valor2, resultado: valor },
            });
            setPorcentajeDevengado_modificado({
              ...porcentajedevengado_modificado,
              pt2: porcentaje.toString(),
            });
            break;
          case "TRIMESTRE 3":
            setDevengado_modificado({
              ...devengadoModificado,
              t3: { valor1: valor1, valor2: valor2, resultado: valor },
            });
            setPorcentajeDevengado_modificado({
              ...porcentajedevengado_modificado,
              pt3: porcentaje.toString(),
            });
            break;
          case "TRIMESTRE 4":
            setDevengado_modificado({
              ...devengadoModificado,
              t4: { valor1: valor1, valor2: valor2, resultado: valor },
            });
            setPorcentajeDevengado_modificado({
              ...porcentajedevengado_modificado,
              pt4: porcentaje.toString(),
            });
            break;
        }
        break;
      case "EJERCIDO/MODIFICADO":
        switch (trimestre) {
          case "TRIMESTRE 1":
            setEjercido_modificado({
              ...ejercidoModificado,
              t1: { valor1: valor1, valor2: valor2, resultado: valor },
            });
            setPorcentajeEjercido_modificado({
              ...porcentajeejercido_modificado,
              pt1: porcentaje.toString(),
            });

            break;
          case "TRIMESTRE 2":
            setEjercido_modificado({
              ...ejercidoModificado,
              t2: { valor1: valor1, valor2: valor2, resultado: valor },
            });
            setPorcentajeEjercido_modificado({
              ...porcentajeejercido_modificado,
              pt2: porcentaje.toString(),
            });
            break;
          case "TRIMESTRE 3":
            setEjercido_modificado({
              ...ejercidoModificado,
              t3: { valor1: valor1, valor2: valor2, resultado: valor },
            });
            setPorcentajeEjercido_modificado({
              ...porcentajeejercido_modificado,
              pt3: porcentaje.toString(),
            });
            break;
          case "TRIMESTRE 4":
            setEjercido_modificado({
              ...ejercidoModificado,
              t4: { valor1: valor1, valor2: valor2, resultado: valor },
            });
            setPorcentajeEjercido_modificado({
              ...porcentajeejercido_modificado,
              pt4: porcentaje.toString(),
            });
            break;
        }
        break;
    }
  };

  useEffect(() => {}, []);

  const block =(valor: string)=>{

    return valor === "0" || valor === null || valor === ""
  }

  const newvalue = (valor: string) => {
    console.log("valor: ",valor);
    
    const nuevoValor = valor;
    // let porcentaje =
    //   (parseFloat(ejercidoModificado.t1) /
    //     parseFloat(avanceFinanciero.valorProgramaPresupuestario)) *
    //   100;
    if (nuevoValor !== valorProgramaPresupuestario) {
      setPorcentajeEjercido_modificado(porcentajeejercido_modificado);
    } else {
    }
  };

  return (
    <>
      <Grid
        // visibility={show ? "visible" : "hidden"}
        container
        direction={"row"}
        sx={{
          // width: "100%",
          // height: "100%",
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
            //sx={{ backgroundColor: "red" }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="0"
              onChange={(a) => {
                if(a.target.value === "0" || a.target.value === null || a.target.value === ""){
                  alertaInfo("Se neceista un valor para capturar los campos de trimestre")
                }
                //alertaInfo()

                switch (selector) {
                }

                setAvanceFinanciero({
                  ...avanceFinanciero,
                  valorProgramaPresupuestario: a.target.value,
                });
                setValorProgramaPresupuestario(a.target.value);
                newvalue(a.target.value);
              }}
              value={
                parseInt(valorProgramaPresupuestario) <= 0
                  ? ""
                  : valorProgramaPresupuestario
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
                  disabled={avanceFinanciero.valorProgramaPresupuestario === "0" || avanceFinanciero.valorProgramaPresupuestario === null || avanceFinanciero.valorProgramaPresupuestario === ""}
                  size="small"
                  placeholder="0"
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? porcentajedevengado_modificado.pt1
                      : selector === "EJERCIDO/MODIFICADO"
                      ? porcentajeejercido_modificado.pt1
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? porcentajemodificado_autorizado.pt1
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
                  placeholder="0"
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? porcentajedevengado_modificado.pt2
                      : selector === "EJERCIDO/MODIFICADO"
                      ? porcentajeejercido_modificado.pt2
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? porcentajemodificado_autorizado.pt2
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
                disabled={avanceFinanciero.valorProgramaPresupuestario === "0" || avanceFinanciero.valorProgramaPresupuestario === null || avanceFinanciero.valorProgramaPresupuestario === ""}
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
                    //   // "$" +
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
                  placeholder="0"
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? porcentajedevengado_modificado.pt3
                      : selector === "EJERCIDO/MODIFICADO"
                      ? porcentajeejercido_modificado.pt3
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? porcentajemodificado_autorizado.pt3
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
                    //   // "$" +
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
                  placeholder="0"
                  //label="porcentaje T1"
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? porcentajedevengado_modificado.pt4
                      : selector === "EJERCIDO/MODIFICADO"
                      ? porcentajeejercido_modificado.pt4
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? porcentajemodificado_autorizado.pt4
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
                  //label="Cuenta Publica"
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
