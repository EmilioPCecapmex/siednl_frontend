import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useEffect, useState } from "react";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import { DialogCcp, ICCP } from "./DialogCCP";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

export const Documento = ({
  show,
  setNombreDoc,
  fncSetCcp,
  nombre,
  password,
  validado,
  keyFile,
  cerFile,
  setReason,
  id,
  setUrl,
  Rfc,
  noSerie,
  setDate,
}: {
  show: boolean;
  setNombreDoc: Function;
  fncSetCcp: Function;
  nombre: string;
  password: string;
  validado: Function;
  keyFile: string;
  cerFile: string;
  setReason: Function;
  id: string;
  setUrl: Function;
  Rfc: string;
  noSerie: string;
  setDate: Function;
}) => {
  const fontSize1 = {
    xs: "60%",
    sm: "70%",
    md: "80%",
    lg: "80%",
    xl: "100%",
  };

  // const fontSize2 = {
  //   fontSize: {
  //     xs: "50%",
  //     sm: "70%",
  //     md: "80%",
  //     lg: "80%",
  //     xl: "100%",
  //   },
  // };

  // const fontSize3 = {
  //   fontSize: {
  //     xs: "70%",
  //     sm: "70%",
  //     md: "80%",
  //     lg: "70%",
  //     xl: "100%",
  //   },
  // };

  // const fontSize4 = {
  //   fontSize: {
  //     xs: "50%",
  //     sm: "70%",
  //     md: "70%",
  //     lg: "80%",
  //     xl: "100%",
  //   },
  // };

  // const fontSize5 = {
  //   fontSize: {
  //     xs: "70%",
  //     sm: "70%",
  //     md: "80%",
  //     lg: "80%",
  //     xl: "100%",
  //   },
  // };

  const fontSize6 = {
    fontSize: {
      xs: "60%",
      sm: "60%",
      md: "60%",
      lg: "60%",
      xl: "100%",
    },
  };

  const fecha = new Date();
  const anio = fecha.getFullYear();

  let dia = fecha.getDate();
  let hoy = dia.toString();
  if (dia < 10) {
    hoy = "0" + dia;
  }

  let mes = fecha.getMonth() + 1;
  let mesActual = mes.toString();
  if (mes < 10) {
    mesActual = "0" + mes;
  }

  const fechaActual = `${anio}-${mesActual}-${hoy}`;

  const [noOficio, setNoOficio] = useState("");

  const [fechaOficio, setFechaOficio] = useState(fechaActual);
  const [asunto, setAsunto] = useState("");
  const [ccp, setCcp] = useState("");

  const [file, setFile] = useState("");
  const [nombreArchivo, setNombreArchivo] = useState("");

  const [catalogoDestinatarios, setCatalogoDestinatarios] = useState<
    Array<IUsuariosFIEL>
  >([]);

  const [catalogoTipoDoc] = useState<Array<ITipoDoc>>([
    //, setCatalogoTipoDoc
    { Id: "1", Tipo: "OFICIO" },
  ]);

  const [usuarios, setUsuarios] = useState<Array<IUsuariosFIEL>>([]);
  const [tipoDoc, setTipoDoc] = useState("");
  const [ccpCorreos, setCcpCorreos] = useState("");
  const [disableFirmar, setDisableValidar] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [noOficio, asunto, ccp, file]);

  function uploadFile(event: any) {
    setFile(event.target.files[0]);
    if (event.target.value) {
      setNombreArchivo(event.target.value.split("\\")[2]);
      setNombreDoc(event.target.value.split("\\")[2]);
    }
  }

  const getUsuariosXApp = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_FIRMA + "/api/users-app", {
        params: {
          IdApp: "ffcc48cb-3087-11ed-aed0-040300000000",
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setCatalogoDestinatarios(r.data.data);
        }
      });
  };

  useEffect(() => {
    getUsuariosXApp();
  }, []);

  const [data, setData] = useState([{ nombre: "", id: "", url: "" }]);

  useEffect(() => {
    setData([
      {
        nombre: localStorage.getItem("NombreUsuario") || "",
        id: id,
        url: `http://10.200.4.199:3000/validador?Id=${id}`,
      },
    ]);
  }, [id]);

  const servicioCorreo = () => {
    let a: string[] = [];

    usuarios.map((x) => {
      a.push(x.CorreoElectronico);
      return a;
    });

    if (ccpCorreos !== "") {
      JSON.parse(ccpCorreos).map((y: any) => {
        a.push(y?.correo);
        return a;
      });
    }

    let dataArray = [
      {
        referencia: "007",
        to: a,
        subject: `Documento Firmado por ${localStorage.getItem(
          "NombreUsuario"
        )}`,
        data: JSON.stringify(data[0]),
      },
    ];

    axios
      .post(
        process.env.REACT_APP_APPLICATION_CORREO + "/api/serviciocorreo",
        dataArray[0],
        {
          responseType: "blob", // important
          headers: {
            ContentType: "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {})
      .catch((err) => {});
  };

  const [openModalCcp, setOpenCcp] = useState(false);

  const handleCloseCcp = () => {
    setOpenCcp(false);
  };

  const setTexto = (usuarios: string) => {
    setCcp(usuarios);
  };

  const [checkFile, setCheckFile] = useState(false);

  useEffect(() => {
    if (
      /^[\s]*$/.test(noOficio) ||
      /^[\s]*$/.test(asunto) ||
      checkFile === false
    ) {
      validado(false);
    }
  }, [noOficio, asunto, show, checkFile, validado]);

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

  const [loading, setLoading] = useState(false);

  const [resumen, setResumen] = useState(false);

  const sendFiel = () => {
    let dataArray = new FormData();
    dataArray.append("cer", cerFile);
    dataArray.append("key", keyFile);
    dataArray.append("phrase", password);
    dataArray.append("Rfc", Rfc);
    dataArray.append("NumeroOficio", noOficio);
    dataArray.append("Asunto", asunto);
    dataArray.append("Destinatario", JSON.stringify(usuarios));
    dataArray.append("Ccp", ccp);
    dataArray.append("CreadoPor", localStorage.getItem("IdCentral") || "");
    dataArray.append("FechaFirma", fechaActual);
    dataArray.append("IdApp", localStorage.getItem("IdApp") || "");
    dataArray.append("SerialCertificado", noSerie);
    dataArray.append("IdFirma", id);

    axios
      .post(
        process.env.REACT_APP_APPLICATION_FIEL + "/api/sendfiel",
        dataArray,
        {
          responseType: "blob", // important
          headers: {
            ContentType: "application/x-pkcs12",
          },
        }
      )
      .then((response) => {
        firmaDoc(response.data);
        setCheckFile(true);
      })
      .catch((err) => {
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

  const firmaDoc = (p12File: string) => {
    const p12Sign = new File([p12File], "sign.p12", {
      type: "application/x-pkcs12",
    });

    let dataArray = new FormData();
    dataArray.append("pdf", file);
    dataArray.append("contrasena", password);
    dataArray.append("firma", p12Sign);
    dataArray.append("name", nombre);
    dataArray.append("id", id);
    dataArray.append("asunto", asunto);
    dataArray.append("documento_name", nombreArchivo);

    axios({
      url: process.env.REACT_APP_APPLICATION_FIRMADOC + "/firma",
      method: "post",
      responseType: "blob",
      headers: {
        "Content-Type": "multipart/form-data",
        "Content-Disposition": "attachment",
        Authorization: localStorage.getItem("jwtToken") as string,
      },
      data: dataArray,
    })
      .then((response) => {
        let today = new Date();
        let date = today.toLocaleDateString();
        let hour = today.toTimeString();

        setDate(date + " " + hour);
        setUrl(window.URL.createObjectURL(new Blob([response.data])));

        setCheckFile(true);

        servicioCorreo();

        Toast.fire({
          icon: "success",
          html: `
        <div sx="height:10%;">
          <h3>Error:</h3>
          <div sx="text-align: center; margin-left: 10px; color: red; height: 50px;">
            <small>
              <strong>El documento se ha firmado correctamente</strong>
            </small>
          </div>
        </div>`,
        });

        // saveDocument();
        setTimeout(() => {
          setDisableValidar(true);
        }, 500);

        setTimeout(() => {
          setLoading(false);
        }, 1000);

        setTimeout(() => {
          validado(true);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        Toast.fire({
          icon: "error",
          html: `
        <div sx="height:10%;">
          <h3>Error:</h3>
          <div sx="text-align: center; margin-left: 10px; color: red; height: 50px;">
            <small>
              <strong>Error al intentar firmar el archivo, intentelo de nuevo</strong>
            </small>
          </div>
        </div>`,
        });
      });
  };

  useEffect(() => {
    if (
      !/^[\s]*$/.test(file) &&
      !/^[\s]*$/.test(noOficio) &&
      !/^[\s]*$/.test(asunto) &&
      disableFirmar === false
    ) {
      const listener = (event: any) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          event.preventDefault();
          setLoading(true);
          sendFiel();
        }
      };
      document.addEventListener("keydown", listener);
      return () => {
        document.removeEventListener("keydown", listener);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, noOficio, asunto, disableFirmar]);

  const [cc, setCc] = useState<Array<ICCP>>([
    {
      nombre: "",
      puesto: "",
      correo: "",
    },
  ]);

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        width: {
          xs: "64%",
          sm: "44.3%",
          md: "46.5%",
          lg: "39.7%",
          xl: "35%",
        },
        height: "40%",
        display: "grid",
        gridTemplateRows: {
          xs: "repeat(11, 1fr)",
          sm: "repeat(11, 1fr)",
          md: "repeat(10, 1fr)",
          lg: "repeat(11, 1fr)",
          xl: "repeat(10, 1fr)",
        },
        alignItems: "center",
      }}
    >
      <DialogCcp
        open={openModalCcp}
        handleClose={handleCloseCcp}
        setTexto={setTexto}
        fncSetCcp={fncSetCcp}
        setCcpCorreos={setCcpCorreos}
        setCCp={setCc}
      ></DialogCcp>

      <FormControl
        disabled
        sx={{ width: "100%" }}
        variant="outlined"
        size="small"
      >
        <InputLabel
          sx={{
            fontSize: fontSize1,
            fontFamily: "MontserratSemiBold",
          }}
        >
          RFC DEL FIRMANTE
        </InputLabel>
        <OutlinedInput
          label="RFC DEL FIRMANTE"
          sx={{
            fontSize: fontSize1,
            fontFamily: "MontserratSemiBold",
          }}
          value={Rfc || ""}
        />
      </FormControl>

      <FormControl
        disabled
        sx={{ width: "100%" }}
        variant="outlined"
        size="small"
      >
        <InputLabel
          sx={{
            fontSize: fontSize1,
            fontFamily: "MontserratSemiBold",
          }}
        >
          SERIAL
        </InputLabel>
        <OutlinedInput
          label="SERIAL"
          sx={{
            fontSize: fontSize1,
            fontFamily: "MontserratSemiBold",
          }}
          value={noSerie || ""}
        />
      </FormControl>

      <Box sx={{ height: "100%" }}>
        <Typography
          sx={{
            fontSize: fontSize1,
            fontFamily: "MontserratMedium",
          }}
        >
          DOCUMENTO
        </Typography>
        <Typography
          position={"absolute"}
          sx={{
            border: disableFirmar ? "2px dotted lightGrey" : "2px dotted black",
            backgroundColor: disableFirmar ? "#efefef" : "lightGrey",
            fontSize: {
              xs: "60%",
              sm: "70%",
              md: "80%",
              lg: "80%",
              xl: "100%",
            },
            fontFamily: "MontserratMedium",
            cursor: "pointer",
            width: "99.5%",
            height: "5%",
          }}
        >
          {nombreArchivo || "Arrastre o de click para seleccionar archivo PDF"}
        </Typography>
        <input
          disabled={disableFirmar && !/^[\s]*$/.test(noOficio)}
          type="file"
          accept="application/pdf"
          style={{
            opacity: 0,
            width: "100%",
            height: "2vh",
            cursor: "pointer",
          }}
          onChange={(v) => uploadFile(v)}
        ></input>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "3fr 2fr 2fr",
            sm: "2fr 1fr 1fr",
            md: "2fr 1fr 1fr",
            lg: "2fr 1fr 1fr",
            xl: "2fr 1fr 1fr",
          },
          gridRow: {
            xs: "4/6",
            sm: "4/6",
            md: "4/6",
            lg: "4/6",
            xl: "4",
          },
          height: "60%",
        }}
      >
        <FormControl
          disabled={disableFirmar && !/^[\s]*$/.test(noOficio) ? true : false}
          sx={{ width: "100%" }}
          variant="outlined"
          size="small"
        >
          <InputLabel
            sx={{
              fontSize: fontSize1,
              fontFamily: "MontserratSemiBold",
            }}
          >
            REFERENCIA DEL DOCUMENTO*
          </InputLabel>
          <OutlinedInput
            label="REFERENCIA DEL DOCUMENTO*"
            sx={{
              fontSize: fontSize1,
              fontFamily: "MontserratSemiBold",
            }}
            value={noOficio}
            onChange={(v) => {
              setNoOficio(v.target.value);
            }}
          />
        </FormControl>

        <FormControl
          disabled={disableFirmar && !/^[\s]*$/.test(noOficio) ? true : false}
        >
          <Autocomplete
            disabled={disableFirmar}
            options={catalogoTipoDoc}
            size="small"
            getOptionLabel={(option) => option.Tipo}
            value={{ Id: catalogoTipoDoc[0].Id, Tipo: tipoDoc }}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography
                    sx={{
                      fontFamily: "MontserratRegular",
                      fontSize: fontSize1,
                    }}
                  >
                    {option.Tipo.toUpperCase()}
                  </Typography>
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  <Typography
                    sx={{
                      fontSize: fontSize1,
                      fontFamily: "MontserratSemiBold",
                    }}
                  >
                    TIPO DE DOCUMENTO
                  </Typography>
                }
                variant="outlined"
                sx={{
                  "& .MuiAutocomplete-input": {
                    fontSize: fontSize1,
                    fontFamily: "MontserratSemiBold",
                  },
                }}
              />
            )}
            isOptionEqualToValue={(option, value) => option.Id === value.Id}
            onChange={(event, value) => {
              setTipoDoc(value?.Tipo || "");
            }}
          />
        </FormControl>

        <FormControl
          disabled={disableFirmar && !/^[\s]*$/.test(noOficio) ? true : false}
          sx={{ width: "100%" }}
          variant="outlined"
          size="small"
        >
          <InputLabel
            sx={{
              fontSize: fontSize1,
              fontFamily: "MontserratSemiBold",
            }}
          >
            FECHA DEL DOCUMENTO*
          </InputLabel>
          <OutlinedInput
            label="FECHA DEL DOCUMENTO*"
            type="date"
            sx={{
              fontSize: fontSize1,
              fontFamily: "MontserratSemiBold",
            }}
            value={fechaOficio || ""}
            onChange={(v) => {
              setFechaOficio(v.target.value);
            }}
          />
        </FormControl>
      </Box>

      <FormControl
        disabled={disableFirmar && !/^[\s]*$/.test(noOficio) ? true : false}
        sx={{ width: "100%" }}
        variant="outlined"
        size="small"
      >
        <InputLabel
          sx={{
            fontSize: fontSize1,
            fontFamily: "MontserratSemiBold",
          }}
        >
          ASUNTO*
        </InputLabel>
        <OutlinedInput
          label="ASUNTO*"
          sx={{
            fontSize: fontSize1,
            fontFamily: "MontserratSemiBold",
          }}
          value={asunto}
          onChange={(v) => {
            setAsunto(v.target.value);
            setReason(v.target.value);
          }}
        />
      </FormControl>

      <FormControl
        sx={{
          maxHeight: "100%",
        }}
      >
        <Autocomplete
          disabled={disableFirmar}
          multiple
          disableCloseOnSelect
          options={catalogoDestinatarios}
          size="small"
          sx={{
            overflowY: "scroll",
            height: "100%",
            "&::-webkit-scrollbar": {
              width: ".3vw",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.5)",
              outline: "1px solid slategrey",
              borderRadius: 10,
            },
            pt: 1,
          }}
          getOptionLabel={(option) => option.Nombre}
          value={usuarios}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.Id}>
                <Typography
                  sx={{
                    fontFamily: "MontserratRegular",
                    fontSize: fontSize1,
                  }}
                >
                  {option.Nombre.toUpperCase()}
                </Typography>
              </li>
            );
          }}
          onInputChange={() => setUsuarios([])}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                <Typography
                  sx={{
                    fontSize: fontSize1,
                    fontFamily: "MontserratSemiBold",
                  }}
                >
                  AUTORIDAD O DEPENDENCIA
                </Typography>
              }
              variant="outlined"
              sx={{
                "& .MuiAutocomplete-input": {
                  fontFamily: "MontserratRegular",
                  textTransform: "uppercase",
                },
              }}
            />
          )}
          onChange={(event, value) => {
            value.map((value2, index) => {
              setUsuarios(value);
              return null;
            });
          }}
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />
      </FormControl>

      <FormControl
        sx={{
          maxHeight: "100%",
          gridRow: {
            xs: "8/10",
            sm: "8/10",
            md: "8/10",
            lg: "8/10",
            xl: "7/9",
          },
        }}
      >
        <Autocomplete
          disabled={disableFirmar}
          multiple
          disableCloseOnSelect
          options={catalogoDestinatarios}
          size="small"
          sx={{
            overflowY: "scroll",
            height: "100%",
            "&::-webkit-scrollbar": {
              width: ".3vw",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.5)",
              outline: "1px solid slategrey",
              borderRadius: 10,
            },
            pt: 1,
          }}
          getOptionLabel={(option) => option.Nombre}
          value={usuarios}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.Id}>
                <Typography
                  sx={{
                    fontFamily: "MontserratRegular",
                    fontSize: fontSize1,
                  }}
                >
                  {option.Nombre.toUpperCase()}
                </Typography>
              </li>
            );
          }}
          onInputChange={() => setUsuarios([])}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                <Typography
                  sx={{
                    fontSize: fontSize1,
                    fontFamily: "MontserratSemiBold",
                  }}
                >
                  DESTINATARIO(S)
                </Typography>
              }
              variant="outlined"
              sx={{
                "& .MuiAutocomplete-input": {
                  fontFamily: "MontserratRegular",
                  textTransform: "uppercase",
                },
              }}
            />
          )}
          onChange={(event, value) => {
            value.map((value2, index) => {
              setUsuarios(value);
              return null;
            });
          }}
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />
      </FormControl>

      <FormControl
        disabled={disableFirmar && !/^[\s]*$/.test(ccp) ? true : false}
        sx={{ width: "100%" }}
        variant="outlined"
        size="small"
      >
        <InputLabel
          sx={{
            fontSize: fontSize1,
            fontFamily: "MontserratSemiBold",
          }}
        >
          CCP
        </InputLabel>
        <OutlinedInput
          label="CCP"
          sx={{
            fontSize: fontSize1,
            fontFamily: "MontserratSemiBold",
          }}
          value={ccp}
          onClick={() => {
            if (disableFirmar) {
            } else {
              setOpenCcp(true);
            }
          }}
        />
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Dialog
          maxWidth={"lg"}
          open={resumen}
          onClose={() => setResumen(false)}
        >
          <DialogTitle
            sx={{
              width: {
                xs: "19rem",
                sm: "40rem",
                md: "50rem",
                lg: "50rem",
                xl: "70rem",
              },
              borderBottom: "2px solid black",
            }}
          >
            CONFIRMAR DATOS
            {
              <Tooltip
                title="Cancelar"
                sx={{ position: "absolute", right: 8, cursor: "pointer" }}
                onClick={() => {
                  setResumen(false);
                }}
              >
                <CloseIcon></CloseIcon>
              </Tooltip>
            }
          </DialogTitle>

          <DialogContent
            sx={{
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: ".3vw",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.5)",
                outline: "1px solid slategrey",
                borderRadius: 10,
              },
            }}
          >
            <Divider
              sx={{
                fontSize: fontSize1,
                fontFamily: "MontserratBold",
                mt: 2,
              }}
            >
              DATOS DEL FIRMANTE
            </Divider>
            <Typography
              sx={{
                borderBottom: "1px solid lightGrey",
                fontSize: fontSize1,
                fontFamily: "MontserratMedium",
              }}
            >
              RFC: {Rfc}
            </Typography>
            <Typography
              sx={{
                borderBottom: "1px solid lightGrey",
                fontSize: fontSize1,
                fontFamily: "MontserratMedium",
              }}
            >
              SERIAL: {noSerie}
            </Typography>

            <Divider
              sx={{
                fontSize: fontSize1,
                fontFamily: "MontserratBold",
                mt: 2,
              }}
            >
              DATOS DEL DOCUMENTO A FIRMAR
            </Divider>
            <Typography
              sx={{
                borderBottom: "1px solid lightGrey",
                fontSize: fontSize1,
                fontFamily: "MontserratMedium",
              }}
            >
              REFERENCIA DEL DOCUMENTO: {noOficio}
            </Typography>
            <Typography
              sx={{
                borderBottom: "1px solid lightGrey",
                fontSize: fontSize1,
                fontFamily: "MontserratMedium",
              }}
            >
              TIPO DE DOCUMENTO: {tipoDoc}
            </Typography>
            <Typography
              sx={{
                borderBottom: "1px solid lightGrey",
                fontSize: fontSize1,
                fontFamily: "MontserratMedium",
              }}
            >
              FECHA DEL DOCUMENTO:
            </Typography>
            <Typography
              sx={{
                borderBottom: "1px solid lightGrey",
                fontSize: fontSize1,
                fontFamily: "MontserratMedium",
              }}
            >
              ASUNTO: {asunto}
            </Typography>

            <Divider
              sx={{
                fontSize: fontSize1,
                fontFamily: "MontserratBold",
                mt: 2,
              }}
            >
              DESTINATARIOS
            </Divider>
            {usuarios.map((usuario: IUsuariosFIEL, index: number) => (
              <Box key={index}>
                <Typography
                  sx={{
                    borderBottom: "1px solid lightGrey",
                    fontSize: fontSize1,
                    fontFamily: "MontserratMedium",
                  }}
                >
                  DESTINATARIO {index + 1}: {usuario.Nombre}
                </Typography>
                <Typography
                  sx={{
                    borderBottom: "1px solid lightGrey",
                    fontSize: fontSize1,
                    fontFamily: "MontserratMedium",
                  }}
                >
                  AUTORIDAD:
                </Typography>
                <Typography
                  sx={{
                    borderBottom: "1px solid lightGrey",
                    fontSize: fontSize1,
                    fontFamily: "MontserratMedium",
                  }}
                >
                  PUESTO:
                </Typography>
                <Typography
                  sx={{
                    borderBottom: "1px solid grey",
                    fontSize: fontSize1,
                    fontFamily: "MontserratMedium",
                    mb: 2,
                  }}
                >
                  CORREO ELECTRÓNICO: {usuario.CorreoElectronico}
                </Typography>
              </Box>
            ))}

            <Divider
              sx={{
                fontSize: fontSize1,
                fontFamily: "MontserratBold",
                mt: 2,
              }}
            >
              CCP
            </Divider>
            {cc?.map((cc: ICCP, index: number) => (
              <Box key={index}>
                <Typography
                  sx={{
                    borderBottom: "1px solid lightGrey",
                    fontSize: fontSize1,
                    fontFamily: "MontserratMedium",
                  }}
                >
                  USUARIO {index + 1}: {cc.nombre}
                </Typography>
                <Typography
                  sx={{
                    borderBottom: "1px solid lightGrey",
                    fontSize: fontSize1,
                    fontFamily: "MontserratMedium",
                  }}
                >
                  AUTORIDAD:
                </Typography>
                <Typography
                  sx={{
                    borderBottom: "1px solid lightGrey",
                    fontSize: fontSize1,
                    fontFamily: "MontserratMedium",
                  }}
                >
                  PUESTO: {cc.puesto}
                </Typography>
                <Typography
                  sx={{
                    borderBottom: "1px solid grey",
                    fontSize: fontSize1,
                    fontFamily: "MontserratMedium",
                    mb: 2,
                  }}
                >
                  CORREO ELECTRÓNICO: {cc.correo}
                </Typography>
              </Box>
            ))}
          </DialogContent>

          <DialogActions sx={{ borderTop: "2px solid black" }}>
            <Button
              color="error"
              onClick={() => {
                setResumen(false);
              }}
              sx={{
                fontSize: fontSize1,
                fontFamily: "MontserratMedium",
              }}
            >
              Cancelar
            </Button>
            <Button
              color="success"
              onClick={() => {
                setLoading(true);
                sendFiel();
                setResumen(false);
              }}
              sx={{
                fontSize: fontSize1,
                fontFamily: "MontserratMedium",
              }}
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
        {loading ? (
          <CircularProgress></CircularProgress>
        ) : !/^[\s]*$/.test(noOficio) &&
          !/^[\s]*$/.test(asunto) &&
          !/^[\s]*$/.test(nombreArchivo) &&
          disableFirmar ? (
          <CheckCircleOutlineIcon color="success"></CheckCircleOutlineIcon>
        ) : (
          <Button
            // disabled={
            //   /^[\s]*$/.test(noOficio) ||
            //   /^[\s]*$/.test(asunto) ||
            //   /^[\s]*$/.test(nombreArchivo) ||
            //   disableFirmar
            // }
            sx={{
              backgroundColor: "lightGrey",
              height: "3vh",
              color: "black",
              "&&:hover": {
                backgroundColor: "lightGrey",
              },
              fontSize: fontSize6,
            }}
            onClick={() => {
              setResumen(true);
            }}
          >
            Firmar
          </Button>
        )}
      </Box>
    </Box>
  );
};

export interface IUsuariosFIEL {
  Id: string;
  Nombre: string;
  NombreUsuario: string;
  CorreoElectronico: string;
}

export interface ITipoDoc {
  Id: string;
  Tipo: string;
}
