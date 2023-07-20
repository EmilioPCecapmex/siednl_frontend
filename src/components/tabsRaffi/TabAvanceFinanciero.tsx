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
export const TabAvanceFinanciero = () => {
  const seteado = "PROTECCIÓN AL INFANTE Y DESARROLLO INTEGLRAS DE LA FAMILIA";
  const valorprueba = "100000000";
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
            value={seteado}
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
              value={"$" + valorprueba}
              label="Valor del programa Presupuestario"
              sx={queries.medium_text}
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
                  control={<Radio />}
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
                  control={<Radio />}
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
                  control={<Radio />}
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
                sx={queries.medium_text}
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
            <Grid item lg={2}>
              <TextField
                fullWidth
                size="small"
                label="Monto Trimestre 2"
                sx={queries.medium_text}
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
            <Grid item lg={2}>
              <TextField
                fullWidth
                size="small"
                label="Monto Trimestre 3"
                sx={queries.medium_text}
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
            <Grid item lg={2}>
              <TextField
                fullWidth
                size="small"
                label="Monto Trimestre 4"
                sx={queries.medium_text}
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

            <Grid item lg={1}>
              <TextField
                fullWidth
                size="small"
                label="Total"
                sx={queries.medium_text}
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
            <Grid item lg={2}>
              <TextField
                fullWidth
                size="small"
                label="Porcentaje Trimestre 2"
                sx={queries.medium_text}
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
            <Grid item lg={2}>
              <TextField
                fullWidth
                size="small"
                label="Porcentaje Trimestre 3"
                sx={queries.medium_text}
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
            <Grid item lg={2}>
              <TextField
                fullWidth
                size="small"
                label="Porcentaje Trimestre 4"
                sx={queries.medium_text}
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
            <Grid item lg={1}>
              <TextField
                fullWidth
                size="small"
                label="Total"
                sx={queries.medium_text}
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
        </Grid>
      </Grid>
    </>
  );
};
