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
  InputBase,
  InputLabel,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { queries } from "../../queries";

const fecha = ["2021", "2022", "2023", "2024", "2025", "2026", "2027"];

export const TabFinPropositoRF = ({
  show,
  showMirFnc,
  setTxtShowFnc
}: {
  show:boolean;
  showMirFnc: Function;
  setTxtShowFnc: Function;
}) => {
  return (
    <>
      <Grid
        visibility={show ? "visible" : "hidden"}
        container
        position="absolute"
        sx={{
          display: "flex",
          width: "75vw",
          height: "77vh",
          boxShadow: 10,
          borderRadius: 5,
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >



<Grid container item sx={{display:"flex",justifyContent:"flex-end"}}>
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
         


         

            <Typography sx={{ ...queries.bold_text, width: "100%", paddingBottom: "10px"  }}>
              Fin
            </Typography>
          

          <Grid
            item
            lg={12}
            sx={{
              //backgroundColor: "#f0f0f0",
              display: "flex",
              //flexDirection: "column",
              //alignItems: "center",
              justifyContent: "center",
              //boxShadow: 2,
              //border: "1px solid #ccc",
              //height: "45vh",
              
            }}
          >
            {/* <FormControl  >
              <FormLabel
              
                sx={{
                  fontFamily: "MontserratBold",
                  fontSize: "0.8vw",
                }}
              >
                Avance Fisico
              </FormLabel>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "center",
                }}
              >
                <FormControlLabel
                  value={"2021"}
                  label={
                    <Typography
                      sx={{
                        fontSize: "0.7vw",
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      2021
                    </Typography>
                  }
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={<Radio />}
                />

                <FormControlLabel
                  value={"2022"}
                  label={
                    <Typography
                      sx={{
                        fontSize: "0.7vw",
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      2022
                    </Typography>
                  }
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={<Radio />}
                />

                <FormControlLabel
                  value={"2023"}
                  label={
                    <Typography
                      sx={{
                        fontSize: "0.7vw",
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      2023
                    </Typography>
                  }
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={<Radio />}
                />
                <FormControlLabel
                  value={"2024"}
                  label={
                    <Typography
                      sx={{
                        fontSize: "0.7vw",
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      2024
                    </Typography>
                  }
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={<Radio />}
                />
                <FormControlLabel
                  value={"2025"}
                  label={
                    <Typography
                      sx={{
                        fontSize: "0.7vw",
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      2025
                    </Typography>
                  }
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={<Radio />}
                />
                <FormControlLabel
                  value={"2026"}
                  label={
                    <Typography
                      sx={{
                        fontSize: "0.7vw",
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      2026
                    </Typography>
                  }
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={<Radio />}
                />
                <FormControlLabel
                  value={"2027"}
                  label={
                    <Typography
                      sx={{
                        fontSize: "0.7vw",
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      2027
                    </Typography>
                  }
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={<Radio />}
                />
              </Grid>
            </FormControl> */}
            <FormControl fullWidth>
              <InputLabel sx={queries.text}>Año del Avance Fisico</InputLabel>
              <Select
                size="small"
                fullWidth
                variant="outlined"
                label="Año del Avance Fisico"
                sx={{ fontFamily: "MontserratRegular" }}
                //value={findSelectStr}
                onChange={(v) => {
                  // v.target.value === "Todos"
                  //   ? findText(
                  //       findTextStr,
                  //       "0",
                  //       findInstStr === "Todos" ? "0" : findInstStr
                  //     )
                  //   : findText(findTextStr, v.target.value, findInstStr);
                  // setFindSelectStr(v.target.value);
                }}
              >
                {fecha.map((fecha) => (
                  <MenuItem key={fecha} value={fecha}>
                    {fecha}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
          <Grid item sx={{ justifyContent: "center", display: "flex" }}>
            <Typography sx={{ ...queries.bold_text, width: "100%" }}>
              Proposito
            </Typography>
          </Grid>

          <Grid
            item
            lg={12}
            sx={{
              //backgroundColor: "#f0f0f0",
              display: "flex",
              //flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 2,
              //border: "1px solid #ccc",
              //height: "45vh",
            }}
          >
            
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};