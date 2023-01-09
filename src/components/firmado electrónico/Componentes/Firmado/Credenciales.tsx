import { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CircularProgress from "@mui/material/CircularProgress";
// import ReCAPTCHA from "react-google-recaptcha";

export const Credenciales = ({
  show,
  validado,
  setRFC,
  setNombre,
  setPassword,
  setKFile,
  setCFile,
  setNoSerie,
  noSerie,
}: {
  show: boolean;
  validado: Function;
  setRFC: Function;
  setNombre: Function;
  setPassword: Function;
  setKFile: Function;
  setCFile: Function;
  setNoSerie: Function;
  noSerie: string;
}) => {
  const fontTextfield = {
    fontFamily: "MontserratSemiBold",
    fontSize: {
      xs: "80%",
      sm: "80%",
      md: "80%",
      lg: "80%",
      xl: "100%",
    },
  };

  const [rfc, setRfc] = useState("");

  const getRfc = () => {
    axios
      .get("http://10.200.4.105:8500/api/rfc", {
        params: {
          IdUsuario: localStorage.getItem("IdCentral"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setRfc(r.data.data.Rfc.toUpperCase());
          setRFC(r.data.data.Rfc.toUpperCase());
        }
      });
  };

  useEffect(() => {
    getRfc();
  }, []);

  const [rfcCer, setRfcCer] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [keyFile, setKeyFile] = useState("");
  const [cerFile, setCerFile] = useState("");
  const [nombreArchivoKey, setNombreArchivoKey] = useState(
    "Arrastre o de click para seleccionar archivo .key"
  );
  const [nombreArchivoCer, setNombreArchivoCer] = useState(
    "Arrastre o de click para seleccionar archivo .cer"
  );

  const Toast = Swal.mixin({
    toast: false,
    position: "center",
    showConfirmButton: true,
    heightAuto: false,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const check = () => {
    let dataArray = new FormData();
    dataArray.append("cer", cerFile);
    dataArray.append("key", keyFile);
    dataArray.append("password", contrasena);
    dataArray.append("rfc", rfc);

    axios
      .post("http://10.200.4.105:8500/api/check", dataArray, {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setRfcCer(r.data.rfc.toUpperCase());
        setNombre(r.data.data.split("name=")[1].split("O=")[0]);
        setPassword(contrasena);
        setTimeout(() => {
          setDisableValidar(true);
        }, 500);
        setTimeout(() => {
          setNoSerie(r.data.serial);
        }, 1000);
        if (rfc === r.data.rfc) {
          setTimeout(() => {
            setLoading(false);
          }, 1500);
          setTimeout(() => {
            validado(true);
          }, 2000);
        }
      })
      .catch((err) => {
        setRfcCer("error");
        setDisableValidar(false);
        setLoading(false);
        Toast.fire({
          icon: "error",
          html: `
          <div sx="height:10%;">
            <h3>Error:</h3>
            <div sx="text-align: center; margin-left: 10px; color: red; height: 50px;">
              <small>
                <strong>${err.response.data.message}</strong>
              </small>
            </div>
          </div>`,
        });
      });
  };

  function uploadKeyFile(event: any) {
    event.preventDefault();

    setKeyFile(event.target.files[0]);
    setKFile(event.target.files[0]);

    if (event.target.value !== "") {
      setNombreArchivoKey(event.target.value.split("\\")[2]);
    }
  }

  function uploadCerFile(event: any) {
    event.preventDefault();

    setCerFile(event.target.files[0]);
    setCFile(event.target.files[0]);

    if (event.target.value !== "") {
      setNombreArchivoCer(event.target.value.split("\\")[2]);
    }
  }

  const [disableValidar, setDisableValidar] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      !/^[\s]*$/.test(keyFile) &&
      !/^[\s]*$/.test(cerFile) &&
      !/^[\s]*$/.test(contrasena) &&
      disableValidar === false
    ) {
      const listener = (event: any) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          event.preventDefault();
          setLoading(true);
          check();
        }
      };
      document.addEventListener("keydown", listener);
      return () => {
        document.removeEventListener("keydown", listener);
      };
    }
  }, [contrasena]);

  // function onChange(value: any) {
  //   console.log("Captcha value:", value);
  // }

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      sx={{
        width: { xs: "90%", sm: "90%", md: "90%", lg: "80%", xl: "80%" },
        height: "inherit",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Box
        sx={{
          height: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <TextField
          disabled
          InputLabelProps={{
            sx: {
              fontTextfield,
            },
          }}
          InputProps={
            rfcCer === ""
              ? {
                  sx: fontTextfield,
                }
              : {
                  endAdornment:
                    disableValidar && rfc !== "" ? (
                      <Tooltip title={"RFC correcto"}>
                        <CheckCircleOutlineIcon
                          sx={{
                            fontSize: {
                              xs: "70%",
                              sm: "80%",
                              md: "70%",
                              lg: "80%",
                              xl: "100%",
                            },
                            color: "green",
                          }}
                        ></CheckCircleOutlineIcon>
                      </Tooltip>
                    ) : (
                      <Tooltip title={"Archivo .cer no compatible con el RFC"}>
                        <ErrorOutlineIcon
                          sx={{
                            fontSize: {
                              xs: "70%",
                              sm: "80%",
                              md: "70%",
                              lg: "80%",
                              xl: "100%",
                            },
                            color: "red",
                          }}
                        ></ErrorOutlineIcon>
                      </Tooltip>
                    ),
                }
          }
          size="small"
          label={
            <Typography
              sx={{
                fontSize: {
                  xs: "90%",
                  sm: "90%",
                  md: "90%",
                  lg: "80%",
                  xl: "100%",
                },
                fontFamily: "MontserratMedium",
              }}
            >
              RFC
            </Typography>
          }
          value={rfc || ""}
        ></TextField>

        <TextField
          disabled
          size="small"
          multiline
          maxRows={2}
          label={<Typography sx={fontTextfield}>NÚMERO DE SERIE</Typography>}
          InputLabelProps={{
            sx: {
              fontTextfield,
            },
          }}
          InputProps={
            /^[\s]*$/.test(rfcCer)
              ? {
                  sx: fontTextfield,
                }
              : {
                  endAdornment:
                    disableValidar && noSerie !== "" ? (
                      <Tooltip title={"Número de serie correcto"}>
                        <CheckCircleOutlineIcon
                          sx={{
                            fontSize: {
                              xs: "70%",
                              sm: "80%",
                              md: "70%",
                              lg: "80%",
                              xl: "100%",
                            },
                            color: "green",
                          }}
                        ></CheckCircleOutlineIcon>
                      </Tooltip>
                    ) : (
                      <Tooltip title={"Archivo .cer no compatible con el RFC"}>
                        <ErrorOutlineIcon
                          sx={{
                            fontSize: {
                              xs: "70%",
                              sm: "80%",
                              md: "70%",
                              lg: "80%",
                              xl: "100%",
                            },
                            color: "red",
                          }}
                        ></ErrorOutlineIcon>
                      </Tooltip>
                    ),
                }
          }
          value={noSerie || ""}
        ></TextField>
      </Box>

      <Box sx={{ mb: 2, height: "20%" }}>
        <Typography
          sx={{
            fontFamily: "MontserratBold",
            fontSize: {
              xs: "50%",
              sm: "60%",
              md: "60%",
              lg: "60%",
              xl: "100%",
            },
          }}
        >
          CERTIFICADO (cer)
        </Typography>
        <Typography
          position={"absolute"}
          sx={{
            border:
              disableValidar && rfc !== ""
                ? "2px dotted lightGrey"
                : "2px dotted black",
            backgroundColor:
              disableValidar && rfc !== "" ? "#efefef" : "lightGrey",
            fontFamily: "MontserratMedium",
            fontSize: {
              xs: "40%",
              sm: "60%",
              md: "60%",
              lg: "60%",
              xl: "100%",
            },
            width: "30.5%",
            height: "2.5%",
          }}
        >
          {nombreArchivoCer}
        </Typography>
        <input
          disabled={disableValidar && rfc !== "" ? true : false}
          type="file"
          accept=".cer"
          style={{
            opacity: 0,
            width: "100%",
            height: "2vh",
            cursor: "pointer",
          }}
          onChange={(v) => {
            uploadCerFile(v);
            setRfcCer("");
          }}
        ></input>
      </Box>

      <Box sx={{ mb: 2, height: "20%" }}>
        <Typography
          sx={{
            fontFamily: "MontserratBold",
            fontSize: {
              xs: "50%",
              sm: "60%",
              md: "60%",
              lg: "60%",
              xl: "100%",
            },
          }}
        >
          CLAVE PRIVADA (key)
        </Typography>
        <Typography
          position={"absolute"}
          sx={{
            border:
              disableValidar && rfc !== ""
                ? "2px dotted lightGrey"
                : "2px dotted black",
            backgroundColor:
              disableValidar && rfc !== "" ? "#efefef" : "lightGrey",
            fontFamily: "MontserratMedium",
            fontSize: {
              xs: "40%",
              sm: "60%",
              md: "60%",
              lg: "60%",
              xl: "100%",
            },
            cursor: "pointer",
            width: "30.5%",
            height: "2.5%",
          }}
        >
          {nombreArchivoKey}
        </Typography>
        <input
          disabled={disableValidar && rfc !== "" ? true : false}
          type="file"
          accept=".key"
          style={{
            opacity: 0,
            width: "100%",
            height: "2vh",
            cursor: "pointer",
          }}
          onChange={(v) => {
            uploadKeyFile(v);
            setRfcCer("");
          }}
        ></input>
      </Box>

      <FormControl
        disabled={disableValidar}
        sx={{ width: "100%", height: "20%" }}
        variant="outlined"
        size="small"
      >
        <InputLabel
          sx={{
            fontSize: {
              xs: "43%",
              sm: "70%",
              md: "80%",
              lg: "80%",
              xl: "100%",
            },
            fontFamily: "MontserratMedium",
          }}
        >
          CONTRASEÑA DE LA CLAVE PRIVADA
        </InputLabel>
        <OutlinedInput
          label="CONTRASEÑA DE LA CLAVE PRIVADA"
          type={showPassword ? "text" : "password"}
          sx={{
            fontFamily: "MontserratSemiBold",
            fontSize: {
              xs: "60%",
              sm: "80%",
              md: "80%",
              lg: "80%",
              xl: "100%",
            },
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOff
                    sx={{
                      fontSize: {
                        xs: "50%",
                        sm: "80%",
                        md: "70%",
                        lg: "80%",
                        xl: "100%",
                      },
                    }}
                  />
                ) : (
                  <VisibilityIcon
                    sx={{
                      fontSize: {
                        xs: "50%",
                        sm: "80%",
                        md: "70%",
                        lg: "80%",
                        xl: "100%",
                      },
                    }}
                  />
                )}
              </IconButton>
            </InputAdornment>
          }
          value={contrasena || ""}
          onChange={(v) => {
            setContrasena(v.target.value);
          }}
        />
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {loading ? (
          <CircularProgress></CircularProgress>
        ) : !/^[\s]*$/.test(keyFile) &&
          !/^[\s]*$/.test(cerFile) &&
          !/^[\s]*$/.test(contrasena) &&
          disableValidar ? (
          <CheckCircleOutlineIcon color="success"></CheckCircleOutlineIcon>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* <ReCAPTCHA sitekey="Invisible" onChange={() => {onChange; disableValidar(false);}} /> */}

            <Button
              type="submit"
              disabled={
                keyFile === "" || cerFile === "" || contrasena === ""
                  ? true
                  : false || disableValidar
              }
              sx={{
                backgroundColor:
                  keyFile === "" ||
                  cerFile === "" ||
                  contrasena === "" ||
                  disableValidar
                    ? "lightGrey"
                    : "#6d8cff",
                height: "3vh",
                color:
                  keyFile === "" ||
                  cerFile === "" ||
                  contrasena === "" ||
                  disableValidar
                    ? "black"
                    : "white",
                "&&:hover": {
                  backgroundColor:
                    keyFile === "" ||
                    cerFile === "" ||
                    contrasena === "" ||
                    disableValidar
                      ? "lightGrey"
                      : "#6dddff",
                },
                fontSize: {
                  xs: "60%",
                  sm: "60%",
                  md: "60%",
                  lg: "60%",
                  xl: "100%",
                },
              }}
              onClick={() => {
                check();
                setLoading(true);
              }}
            >
              Validar
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
