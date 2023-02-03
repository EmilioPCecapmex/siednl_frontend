import { Box, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import { DialogCcp } from "../DialogCCP";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

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
  const [asunto, setAsunto] = useState("");
  const [ccp, setCcp] = useState("");

  const [file, setFile] = useState("");
  const [nombreArchivo, setNombreArchivo] = useState("");

  const [catalogoUsuarios, setCatalogoUsuarios] = useState<
    Array<IUsuariosFIEL>
  >([]);

  const [usuarios, setUsuarios] = useState<Array<IUsuariosFIEL>>([]);

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
      .get("http://10.200.4.105:8500/api/users-app", {
        params: {
          IdApp: "ffcc48cb-3087-11ed-aed0-040300000000",
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        
        if (r.status === 200) {
          setCatalogoUsuarios(r.data.data);
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
  }, []);

  const servicioCorreo = () => {
    let a: string[] = [];

    usuarios.map((x) => {
      a.push(x.CorreoElectronico);
    });

    if (ccpCorreos !== "") {
      JSON.parse(ccpCorreos).map((y: any) => {
        a.push(y?.correo);
      });
    }

    let dataArray = [
      {
        referencia: "007",
        to: a,
        subject: "correo de prueba",
        data: JSON.stringify(data[0]),
      },
    ];

    axios
      .post("http://10.200.4.105:8001/api/serviciocorreo", dataArray[0], {
        responseType: "blob", // important
        headers: {
          ContentType: "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
      })
      .catch((err) => {
      });
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
  }, [noOficio, asunto, show]);

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
      .post("http://10.210.0.27/api/sendfiel", dataArray, {
        responseType: "blob", // important
        headers: {
          ContentType: "application/x-pkcs12",
        },
      })
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
      url: "http://10.200.4.111:90/firma",
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
  }, [file, noOficio, asunto]);

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        width: "25%",
        height: "40%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <DialogCcp
        open={openModalCcp}
        handleClose={handleCloseCcp}
        setTexto={setTexto}
        fncSetCcp={fncSetCcp}
        setCcpCorreos={setCcpCorreos}
      ></DialogCcp>

      <Box>
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
          DOCUMENTO
        </Typography>
        <Typography
          position={"absolute"}
          sx={{
            border: "2px dotted black",
            backgroundColor: "#dfdfdf",
            fontFamily: "MontserratMedium",
            fontSize: ".7vw",
            width: "24.8vw",
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

      <TextField
        disabled={disableFirmar && !/^[\s]*$/.test(noOficio) ? true : false}
        size="small"
        label={
          <Typography
            sx={{
              fontSize: {
                xs: "85%",
                sm: "85%",
                md: "85%",
                lg: "75%",
                xl: "95%",
              },
              fontFamily: "MontserratMedium",
            }}
          >
            NO. DE OFICIO *
          </Typography>
        }
        sx={{ width: "100%",
        fontSize: {
          xs: "85%",
          sm: "85%",
          md: "85%",
          lg: "75%",
          xl: "95%",
        },
          mt:1,
        fontFamily: "MontserratMedium", }}
        value={noOficio}
        onChange={(v) => {
          setNoOficio(v.target.value);
        }}
        FormHelperTextProps={{ style: { fontFamily: "MontserratBold", } }}
        helperText={/^[\s]*$/.test(noOficio) ? "Campo requerido" : null}
        InputProps={{
          endAdornment: (
            <Tooltip title="Número de identificación personal del documento">
              <InfoOutlinedIcon sx={{ cursor: "default" }}></InfoOutlinedIcon>
            </Tooltip>
          ),
        }}
      ></TextField>

      <TextField
        disabled={disableFirmar && !/^[\s]*$/.test(asunto) ? true : false}
        size="small"
        label={
          <Typography
            sx={{
              fontSize: {
                xs: "85%",
                sm: "85%",
                md: "85%",
                lg: "75%",
                xl: "95%",
              },
              fontFamily: "MontserratMedium",
            }}
          >
            ASUNTO *
          </Typography>
        }
        sx={{ width: "100%",
        mt:1, }}
        value={asunto}
        onChange={(v) => {
          setAsunto(v.target.value);
          setReason(v.target.value);
        }}
        FormHelperTextProps={{ style: { fontFamily: "MontserratBold" } }}
        helperText={/^[\s]*$/.test(asunto) ? "Campo requerido" : null}
      ></TextField>

      <FormControl
        sx={{
          width: "100%",
          mt:1,
        }}
      >
        <Stack spacing={3}>
          <Autocomplete
            disabled={disableFirmar}
            multiple
            disableCloseOnSelect
            limitTags={3}
            options={catalogoUsuarios}
            size="small"
            getOptionLabel={(option) => option.Nombre}
            value={usuarios}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <p
                    style={{
                      fontFamily: "MontserratRegular",
                      fontSize: ".7vw",
                    }}
                  >
                    {option.Nombre.toUpperCase()}
                  </p>
                </li>
              );
            }}
            onInputChange={() => setUsuarios([])}
            renderInput={(params) => (
              <TextField
                {...params}
                label={"DESTINATARIO(S)"}
                variant="outlined"
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratBold",
                    fontSize: "100%",
                  },
                }}
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
                // if (
                //   /^[\s]*$/.test(value2.Id) &&
                //   /^[\s]*$/.test(value2.Nombre)
                // ) {
                setUsuarios(value);
                // }
              });
            }}
            isOptionEqualToValue={(option, value) => option.Id === value.Id}
          />
        </Stack>
      </FormControl>

      <TextField
        disabled={disableFirmar}
        size="small"
        multiline
        maxRows={2}
        label={
          <Typography
            sx={{
              fontSize: {
                xs: "85%",
                sm: "85%",
                md: "85%",
                lg: "75%",
                xl: "95%",
              },
              fontFamily: "MontserratMedium",
            }}
          >
            CCP
          </Typography>
        }
        sx={{ width: "100%",
        mt:1, }}
        value={ccp}
        onClick={() => {
          if (disableFirmar) {
          } else {
            setOpenCcp(true);
          }
        }}
        onChange={(v) => {
          setCcp(v.target.value);
        }}
        InputProps={{
          endAdornment: (
            <Tooltip title='"Con Copia Para"'>
              <InfoOutlinedIcon sx={{ cursor: "default" }}></InfoOutlinedIcon>
            </Tooltip>
          ),
        }}
      ></TextField>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {loading ? (
          <CircularProgress></CircularProgress>
        ) : !/^[\s]*$/.test(noOficio) &&
          !/^[\s]*$/.test(asunto) &&
          !/^[\s]*$/.test(nombreArchivo) &&
          disableFirmar ? (
          <CheckCircleOutlineIcon color="success"></CheckCircleOutlineIcon>
        ) : (
          <Button
            disabled={
              /^[\s]*$/.test(noOficio) ||
              /^[\s]*$/.test(asunto) ||
              /^[\s]*$/.test(nombreArchivo) ||
              disableFirmar
            }
            sx={{
              backgroundColor: "lightGrey",
              height: "3vh",
              color: "black",
              "&&:hover": {
                backgroundColor: "lightGrey",
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
              setLoading(true);
              sendFiel();
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
