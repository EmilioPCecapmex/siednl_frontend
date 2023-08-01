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
} from "@mui/material";
import { queries } from "../../queries";
import { IIMir } from "../../screens/mir/MIR";
import { useEffect, useState } from "react";
import { IMIR } from "../tabsMir/IMIR";
import { IAvanceFinancieroRF } from "../../screens/raffi/interfacesRaffi";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import validator from "validator";
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

  const [avanceFinanciero, setAvanceFinanciero] = useState<IAvanceFinancieroRF>(
    {
      NombrePrograma: jsonMir.encabezado.nombre_del_programa,
      ValorProgramaPresupuestario: "0",
      Calculo: "DEVENGADO/MODIFICADO",
      Monto: {
        mt1: "",
        mt2: "",
        mt3: "",
        mt4: "",
        mtotal: "",
      },
      Porcentaje: {
        pt1: "",
        pt2: "",
        pt3: "",
        pt4: "",
        ptotal: "",
      },
    }
  );

  useEffect(() => {
    console.log("avanceFinanciero: ", avanceFinanciero.Calculo);
    console.log(
      "avanceFinanciero: ",
      avanceFinanciero.ValorProgramaPresupuestario
    );
  }, [avanceFinanciero.Calculo, avanceFinanciero.ValorProgramaPresupuestario]);

  function sumarNumerosStrings(accum: number, numerosStrings: string): number {
    const numero = parseFloat(numerosStrings); // Puedes usar parseInt() si solo quieres números enteros
    if (!isNaN(numero)) {
      accum += numero;
    }

    return accum;
  }

  const sumatoria = () => {
    let Total: number = 0;

    Total = sumarNumerosStrings(Total, avanceFinanciero.Monto.mt1);
    Total = sumarNumerosStrings(Total, avanceFinanciero.Monto.mt2);
    Total = sumarNumerosStrings(Total, avanceFinanciero.Monto.mt3);
    Total = sumarNumerosStrings(Total, avanceFinanciero.Monto.mt4);
    avanceFinanciero.Monto.mtotal =Total.toString()
    return Total;
  };

  // const [calculo, setCalculo] = useState(
  //   RF === "" ? "" : JSON.parse(RF).avanceFinanciero.Calculo || ""
  // );

  useEffect(() => {
    resumenAvanceFinancieroRf(avanceFinanciero);
  }, [resumenAvanceFinancieroRf]);

  useEffect(()=>{
    avanceFinanciero.Porcentaje.pt1 =(isNaN(
      (parseInt(avanceFinanciero.Monto.mt1) * 100) /
        parseInt(avanceFinanciero.ValorProgramaPresupuestario)
    )
      ? ""
      : (
          (parseInt(avanceFinanciero.Monto.mt1) * 100) /
          parseInt(avanceFinanciero.ValorProgramaPresupuestario)
        ).toString())
        

      console.log(avanceFinanciero);
  },[]);

  useEffect(()=>{
    avanceFinanciero.Porcentaje.pt2 =(isNaN(
      (parseInt(avanceFinanciero.Monto.mt2) * 100) /
        parseInt(avanceFinanciero.ValorProgramaPresupuestario)
    )
      ? ""
      : (
          (parseInt(avanceFinanciero.Monto.mt2) * 100) /
          parseInt(avanceFinanciero.ValorProgramaPresupuestario)
        ).toString())
        

      console.log(avanceFinanciero);
  },[]);

  useEffect(()=>{
    avanceFinanciero.Porcentaje.pt3 =(isNaN(
      (parseInt(avanceFinanciero.Monto.mt3) * 100) /
        parseInt(avanceFinanciero.ValorProgramaPresupuestario)
    )
      ? ""
      : (
          (parseInt(avanceFinanciero.Monto.mt3) * 100) /
          parseInt(avanceFinanciero.ValorProgramaPresupuestario)
        ).toString())
        

      console.log(avanceFinanciero);
  },[]);

  useEffect(()=>{
    avanceFinanciero.Porcentaje.pt4 =(isNaN(
      (parseInt(avanceFinanciero.Monto.mt4) * 100) /
        parseInt(avanceFinanciero.ValorProgramaPresupuestario)
    )
      ? ""
      : (
          (parseInt(avanceFinanciero.Monto.mt4) * 100) /
          parseInt(avanceFinanciero.ValorProgramaPresupuestario)
        ).toString())
        

      console.log(avanceFinanciero);
      avanceFinanciero.Porcentaje.ptotal = (parseInt(avanceFinanciero.Porcentaje.pt1) + parseInt(avanceFinanciero.Porcentaje.pt2) + parseInt(avanceFinanciero.Porcentaje.pt3) +  parseInt(avanceFinanciero.Porcentaje.pt4)).toString()
  },[]);

  // useEffect(() => {
  //   setAvanceFinanciero(

  //   );
  // }, [jsonMir.encabezado.nombre_del_programa, valorPPresupuestario, calculo]);

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
          <InputLabel sx={queries.medium_text}>Nombre del Programa</InputLabel>
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
                setAvanceFinanciero({
                  ...avanceFinanciero,
                  ValorProgramaPresupuestario: a.target.value,
                });
              }}
              value={
                // "$" +
                parseInt(avanceFinanciero.ValorProgramaPresupuestario) <= 0
                  ? ""
                  : avanceFinanciero.ValorProgramaPresupuestario.replaceAll(
                      '"',
                      ""
                    )
                      .replaceAll("'", "")
                      .replaceAll("\n", "")
                      .replace(/\D/g, "")
              }
              label="Valor del programa Presupuestario"
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
                Calculo
              </FormLabel>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "center",
                }}
              >
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
                      checked={
                        avanceFinanciero.Calculo === "DEVENGADO/MODIFICADO"
                      }
                      onChange={(a) => {
                        setAvanceFinanciero({
                          ...avanceFinanciero,
                          Calculo: a.target.value,
                        });

                        console.log(avanceFinanciero);
                        console.log();
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
                      checked={
                        avanceFinanciero.Calculo === "EJERCIDO/MODIFICADO"
                      }
                      onChange={(a) => {
                        setAvanceFinanciero({
                          ...avanceFinanciero,
                          Calculo: a.target.value,
                        });

                        console.log(avanceFinanciero);
                        console.log();
                      }}
                    />
                  }
                />

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
                      checked={
                        avanceFinanciero.Calculo === "MODIFICADO/AUTORIZADO"
                      }
                      onChange={(a) => {
                        setAvanceFinanciero({
                          ...avanceFinanciero,
                          Calculo: a.target.value,
                        });

                        console.log(avanceFinanciero);
                        console.log();
                      }}
                    />
                  }
                />
              </Grid>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container item direction={"column"} gap={2}>
          <Grid
            item
            container
            direction={"row"}
            sx={{
              display: "flex",
              //flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Grid item lg={1}>
              <Typography sx={queries.medium_text}>Monto</Typography>
            </Grid>

            <Grid item lg={2}>
              <TextField
                fullWidth
                size="small"
                label="Monto Trimestre 1"
                onChange={(a) => {
                  setAvanceFinanciero({
                    ...avanceFinanciero,
                    Monto: {
                      ...avanceFinanciero.Monto,
                      mt1: a.target.value,
                    },
                  });
                  console.log(avanceFinanciero);
                }}
                value={
                  // "$" +
                  parseInt(avanceFinanciero.Monto.mt1) <= 0
                    ? ""
                    : avanceFinanciero.Monto.mt1
                        .replaceAll('"', "")
                        .replaceAll("'", "")
                        .replaceAll("\n", "")
                        .replace(/\D/g, "")
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
            <Grid item lg={2}>
              <TextField
                fullWidth
                size="small"
                label="Monto Trimestre 2"
                onChange={(a) => {
                  setAvanceFinanciero({
                    ...avanceFinanciero,
                    Monto: {
                      ...avanceFinanciero.Monto,
                      mt2: a.target.value,
                    },
                  });
                  console.log(avanceFinanciero);
                }}
                value={
                  // "$" +
                  parseInt(avanceFinanciero.Monto.mt2) <= 0
                    ? ""
                    : avanceFinanciero.Monto.mt2
                        .replaceAll('"', "")
                        .replaceAll("'", "")
                        .replaceAll("\n", "")
                        .replace(/\D/g, "")
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
            <Grid item lg={2}>
              <TextField
                fullWidth
                size="small"
                label="Monto Trimestre 3"
                onChange={(a) => {
                  setAvanceFinanciero({
                    ...avanceFinanciero,
                    Monto: {
                      ...avanceFinanciero.Monto,
                      mt3: a.target.value,
                    },
                  });
                  console.log(avanceFinanciero);
                }}
                value={
                  // "$" +
                  parseInt(avanceFinanciero.Monto.mt3) <= 0
                    ? ""
                    : avanceFinanciero.Monto.mt3
                        .replaceAll('"', "")
                        .replaceAll("'", "")
                        .replaceAll("\n", "")
                        .replace(/\D/g, "")
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
            <Grid item lg={2}>
              <TextField
                fullWidth
                size="small"
                label="Monto Trimestre 4"
                onChange={(a) => {
                  setAvanceFinanciero({
                    ...avanceFinanciero,
                    Monto: {
                      ...avanceFinanciero.Monto,
                      mt4: a.target.value,
                    },
                  });
                  console.log(avanceFinanciero);
                }}
                value={
                  // "$" +
                  parseInt(avanceFinanciero.Monto.mt4) <= 0
                    ? ""
                    : avanceFinanciero.Monto.mt4
                        .replaceAll('"', "")
                        .replaceAll("'", "")
                        .replaceAll("\n", "")
                        .replace(/\D/g, "")
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

            <Grid item lg={1}>
              <TextField
                fullWidth
                size="small"
                label="Total"
                //placeholder="0"
                sx={queries.medium_text}
                value={sumatoria()}
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
          </Grid>

          <Grid
            item
            container
            direction={"row"}
            sx={{
              display: "flex",
              //flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Grid item lg={1}>
              <Typography sx={queries.medium_text}>Porcentaje</Typography>
            </Grid>

            <Grid item lg={2}>
              <TextField
                fullWidth
                size="small"
                label="Porcentaje Trimestre 1"
                sx={queries.medium_text}
                value={
                  //avanceFinanciero.Porcentaje.pt1 =
                  isNaN(
                    (parseInt(avanceFinanciero.Monto.mt1) * 100) /
                      parseInt(avanceFinanciero.ValorProgramaPresupuestario)
                  )
                    ? ""
                    : (
                        (parseInt(avanceFinanciero.Monto.mt1) * 100) /
                        parseInt(avanceFinanciero.ValorProgramaPresupuestario)
                      ).toString()
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
            <Grid item lg={2}>
              <TextField
                fullWidth
                size="small"
                label="Porcentaje Trimestre 2"
                value={
                  //avanceFinanciero.Porcentaje.pt1 =
                  isNaN(
                    (parseInt(avanceFinanciero.Monto.mt2) * 100) /
                      parseInt(avanceFinanciero.ValorProgramaPresupuestario)
                  )
                    ? ""
                    : (
                        (parseInt(avanceFinanciero.Monto.mt2) * 100) /
                        parseInt(avanceFinanciero.ValorProgramaPresupuestario)
                      ).toString()
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
            <Grid item lg={2}>
              <TextField
                fullWidth
                size="small"
                label="Porcentaje Trimestre 3"
                value={
                  //avanceFinanciero.Porcentaje.pt1 =
                  isNaN(
                    (parseInt(avanceFinanciero.Monto.mt3) * 100) /
                      parseInt(avanceFinanciero.ValorProgramaPresupuestario)
                  )
                    ? ""
                    : (
                        (parseInt(avanceFinanciero.Monto.mt3) * 100) /
                        parseInt(avanceFinanciero.ValorProgramaPresupuestario)
                      ).toString()
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
            <Grid item lg={2}>
              <TextField
                fullWidth
                size="small"
                label="Porcentaje Trimestre 4"
                value={
                  //avanceFinanciero.Porcentaje.pt1 =
                  isNaN(
                    (parseInt(avanceFinanciero.Monto.mt4) * 100) /
                      parseInt(avanceFinanciero.ValorProgramaPresupuestario)
                  )
                    ? ""
                    : (
                        (parseInt(avanceFinanciero.Monto.mt4) * 100) /
                        parseInt(avanceFinanciero.ValorProgramaPresupuestario)
                      ).toString()
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
            <Grid item lg={1}>
              <TextField
                fullWidth
                size="small"
                label="Total"
                sx={queries.medium_text}
                value ={ 
                  isNaN

                  (parseInt(avanceFinanciero.Porcentaje.pt1) + parseInt(avanceFinanciero.Porcentaje.pt2) + parseInt(avanceFinanciero.Porcentaje.pt3) +  parseInt(avanceFinanciero.Porcentaje.pt4) ) ? ""
                  : (parseInt(avanceFinanciero.Porcentaje.pt1) + parseInt(avanceFinanciero.Porcentaje.pt2) + parseInt(avanceFinanciero.Porcentaje.pt3) +  parseInt(avanceFinanciero.Porcentaje.pt4)).toString() 
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
        </Grid>
      </Grid>
    </>
  );
}
