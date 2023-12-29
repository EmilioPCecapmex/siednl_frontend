import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  TextField,
  Typography,
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
// import validator from "validator";
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
  MIR,
  MA,
  avanceFinancieroRF,
  setAvanceFinancieroRF,
  raffiboolean,
}: {
  MIR: string;
  MA: string;
  avanceFinancieroRF: IAvanceFinancieroRF;
  setAvanceFinancieroRF: Function;
  raffiboolean: IRFEdit;
}) {
  const jsonMir: IMIR = JSON.parse(MIR);

  const [trimestre, setTrimestre] = useState("0");

  const [nombrePrograma, setNombrePrograma] = useState("Sin Información");
  const [valorProgramaPresupuestario,setValorProgramaPresupuestario,] = useState("0");

  const [devengadoModificado, setDevengadoModificado] = useState<IVTrimestral>(VTrimestral);
  const [ejercidoModificado, setEjercidoModificado] = useState<IVTrimestral>(VTrimestral);
  const [modificadoAutorizado, setModificadoAutorizado] = useState<IVTrimestral>(VTrimestral);

  const [PDevengadoModificado,setPDevengadoModificado,] = useState<IVPTrimestral>(VPTrimestral);
  const [PEjercidoModificado,setPEjercidoModificado,] = useState<IVPTrimestral>(VPTrimestral);
  const [PModificadoAutorizado,setPModificadoAutorizado,] = useState<IVPTrimestral>(VPTrimestral);

  useEffect(() => {
    console.log("avanceFinancieroRF",avanceFinancieroRF);
    
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
  }, []);

  useEffect(() => {
    let auxRaffi:IAvanceFinancieroRF={
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
    }
    console.log("auxRaffi",auxRaffi);
    
    setAvanceFinancieroRF(auxRaffi);
  }, [
    valorProgramaPresupuestario,
    devengadoModificado,
    ejercidoModificado,
    modificadoAutorizado,
    PDevengadoModificado,
    PModificadoAutorizado,
    PEjercidoModificado,
  ]);

  const getProcentajeActualizado=(monto:string)=>{
    let porcentaje = ((parseFloat(monto) / parseFloat(valorProgramaPresupuestario)) * 100)
     if (isNaN(porcentaje)) {return ""}
     else{return porcentaje.toString()}
    };  

  useEffect(()=>{
    let auxPModificadoAutorizado: IVPTrimestral = {
      pt1:getProcentajeActualizado(modificadoAutorizado.t1.resultado),
      pt2:getProcentajeActualizado(modificadoAutorizado.t2.resultado),
      pt3:getProcentajeActualizado(modificadoAutorizado.t3.resultado),
      pt4:getProcentajeActualizado(modificadoAutorizado.t4.resultado),
      ptotal:getProcentajeActualizado(modificadoAutorizado.total),
      porcentajeCuentaPublica:getProcentajeActualizado(modificadoAutorizado.cuentaPublica)};

    let auxPDevengadoModificado: IVPTrimestral = {
      pt1:getProcentajeActualizado(devengadoModificado.t1.resultado),
      pt2:getProcentajeActualizado(devengadoModificado.t2.resultado),
      pt3:getProcentajeActualizado(devengadoModificado.t3.resultado),
      pt4:getProcentajeActualizado(devengadoModificado.t4.resultado),
      ptotal:getProcentajeActualizado(devengadoModificado.total),
      porcentajeCuentaPublica:getProcentajeActualizado(devengadoModificado.cuentaPublica)};

    let auxPEjercidoModificado: IVPTrimestral = {
      pt1:getProcentajeActualizado(ejercidoModificado.t1.resultado),
      pt2:getProcentajeActualizado(ejercidoModificado.t2.resultado),
      pt3:getProcentajeActualizado(ejercidoModificado.t3.resultado),
      pt4:getProcentajeActualizado(ejercidoModificado.t4.resultado),
      ptotal:getProcentajeActualizado(ejercidoModificado.total),
      porcentajeCuentaPublica:getProcentajeActualizado(ejercidoModificado.cuentaPublica)};

      setPModificadoAutorizado(auxPModificadoAutorizado)
      setPDevengadoModificado(auxPDevengadoModificado)
      setPEjercidoModificado(auxPEjercidoModificado)


    // let porcentaje =(parseFloat(valor) / parseFloat(valorProgramaPresupuestario)) * 100;
  },[valorProgramaPresupuestario])

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
    console.log("valor: ", valor);
    console.log("valor1: ", valor1);
    console.log("valor2: ", valor2);
    console.log("calculo: ", calculo);
    console.log("modificadoAutorizado: ", modificadoAutorizado);
    console.log("calculo: ", calculo);
    console.log("calculo: ", calculo);

    let porcentaje =(parseFloat(valor) / parseFloat(valorProgramaPresupuestario)) * 100;
    let auxMonto:IVTrimestral
    let auxPorcentaje:IVPTrimestral
    switch (calculo) {
      case "MODIFICADO/AUTORIZADO":
        auxMonto = { ...modificadoAutorizado }
        auxPorcentaje = { ...PModificadoAutorizado }
        switch (trimestre) {

          case "TRIMESTRE 1":
            auxMonto.t1 = { valor1: valor1, valor2: valor2, resultado: valor }
            auxPorcentaje.pt1 = porcentaje.toString()
            setModificadoAutorizado(auxMonto);
            setPModificadoAutorizado(auxPorcentaje);

            break;
          case "TRIMESTRE 2":
            auxMonto.t2 = { valor1: valor1, valor2: valor2, resultado: valor }
            auxPorcentaje.pt2 = porcentaje.toString()
            setModificadoAutorizado(auxMonto);
            setPModificadoAutorizado(auxPorcentaje);

            break;
          case "TRIMESTRE 3":
            auxMonto.t3 = { valor1: valor1, valor2: valor2, resultado: valor }
            auxPorcentaje.pt3 = porcentaje.toString()
            setModificadoAutorizado(auxMonto);
            setPModificadoAutorizado(auxPorcentaje);
            break;
          case "TRIMESTRE 4":
            auxMonto.t4 = { valor1: valor1, valor2: valor2, resultado: valor }
            auxPorcentaje.pt4 = porcentaje.toString()
            setModificadoAutorizado(auxMonto);
            setPModificadoAutorizado(auxPorcentaje);
            break;
        }

        break;

      case "DEVENGADO/MODIFICADO":

      auxMonto = { ...devengadoModificado }
      auxPorcentaje = { ...PDevengadoModificado }
      switch (trimestre) {

        case "TRIMESTRE 1":
          auxMonto.t1 = { valor1: valor1, valor2: valor2, resultado: valor }
          auxPorcentaje.pt1 = porcentaje.toString()
          setDevengadoModificado(auxMonto);
          setPDevengadoModificado(auxPorcentaje);

          break;
        case "TRIMESTRE 2":
          auxMonto.t2 = { valor1: valor1, valor2: valor2, resultado: valor }
          auxPorcentaje.pt2 = porcentaje.toString()
          setDevengadoModificado(auxMonto);
          setPDevengadoModificado(auxPorcentaje);

          break;
        case "TRIMESTRE 3":
          auxMonto.t3 = { valor1: valor1, valor2: valor2, resultado: valor }
          auxPorcentaje.pt3 = porcentaje.toString()
          setDevengadoModificado(auxMonto);
          setPDevengadoModificado(auxPorcentaje);

          break;
        case "TRIMESTRE 4":
          auxMonto.t4 = { valor1: valor1, valor2: valor2, resultado: valor }
          auxPorcentaje.pt4 = porcentaje.toString()
          setDevengadoModificado(auxMonto);
          setPDevengadoModificado(auxPorcentaje);

          break;
      }

        break;

      case "EJERCIDO/MODIFICADO":
        auxMonto = { ...ejercidoModificado }
        auxPorcentaje = { ...PEjercidoModificado }
        switch (trimestre) {

          case "TRIMESTRE 1":
            auxMonto.t1 = { valor1: valor1, valor2: valor2, resultado: valor }
            auxPorcentaje.pt1 = porcentaje.toString()
            setEjercidoModificado(auxMonto);
            setPEjercidoModificado(auxPorcentaje);

            break;
          case "TRIMESTRE 2":
            auxMonto.t2 = { valor1: valor1, valor2: valor2, resultado: valor }
            auxPorcentaje.pt2 = porcentaje.toString()
            setEjercidoModificado(auxMonto);
            setPEjercidoModificado(auxPorcentaje);

            break;
          case "TRIMESTRE 3":
            auxMonto.t3 = { valor1: valor1, valor2: valor2, resultado: valor }
            auxPorcentaje.pt3 = porcentaje.toString()
            setEjercidoModificado(auxMonto);
            setPEjercidoModificado(auxPorcentaje);
            break;
          case "TRIMESTRE 4":
            auxMonto.t4 = { valor1: valor1, valor2: valor2, resultado: valor }
            auxPorcentaje.pt4 = porcentaje.toString()
            setEjercidoModificado(auxMonto);
            setPEjercidoModificado(auxPorcentaje);
            break;
        }
        break;
    }
  };

  function getTrimestre2(){
    switch(selector){
      case "DEVENGADO/MODIFICADO":return devengadoModificado.t1.resultado
      
      case "EJERCIDO/MODIFICADO":return ejercidoModificado.t1.resultado
      
      case "MODIFICADO/AUTORIZADO":return modificadoAutorizado.t1.resultado
     
      default: return null;
    }
  }
  function getTrimestre3(){
    
  }
  function getTrimestre4(){
    
  }

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
          <Grid item lg={5}>
            <TextField
              fullWidth
              size="small"
              placeholder="0"
              onChange={(a) => {
                if (
                  a.target.value === "0" ||
                  a.target.value === null ||
                  a.target.value === ""
                ) {
                  alertaInfo(
                    "Se neceista un valor para capturar los campos de trimestre"
                  );
                }
                setValorProgramaPresupuestario(
                  validarNumero(a.target.value, valorProgramaPresupuestario)
                );
              }}
              value={
                parseInt(valorProgramaPresupuestario) <= 0
                  ? ""
                  : valorProgramaPresupuestario
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
                  disabled={
                    valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === ""
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
                    valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === ""
                  }
                  size="small"
                  placeholder="0"
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
                    valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === ""
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
                  placeholder="0"
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
                    valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === ""
                  }
                  fullWidth
                  size="small"
                  placeholder="SIN CAPTURAR"
                  onClick={(a) => {
                    setTrimestre("TRIMESTRE 3");
                    handleClickOpen();
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
                  placeholder="0"
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
                    valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === ""
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
                  placeholder="0"
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
