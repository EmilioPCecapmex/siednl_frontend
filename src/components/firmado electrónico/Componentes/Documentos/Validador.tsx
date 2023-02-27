import { Box, TextField, Typography } from "@mui/material";
import { useState, useLayoutEffect } from "react";
import axios from "axios";
import { DialogDescarga } from "./Descarga";

export const Validador = ({ id }: { id: string }) => {
  const [doc, setDoc] = useState({
    NumeroOficio: "",
    Destinatario: "",
    SerialCertificado: "",
    Sistema: "",
    Asunto: "",
    Nombre: "",
    Rfc: "",
    FechaFirma: "",
    IdFirma: "",
    IdPathDoc: "",
    nombre_archivo: "",
  });

  const [dest, setDest] = useState([]);

  const [ccp, setCcp] = useState([]);

  useLayoutEffect(() => {
    let dataArray = new FormData();
    dataArray.append("id", id);

    axios
      .post("http://10.210.0.27/api/obtenerdoc", dataArray, {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setDoc(r.data[0]);
        setDest(JSON.parse(r.data[0].Destinatario));
        setCcp(r.data[0].Ccp.split(","));
      });
  }, [id]);

  // const getPdf = (id: string, password: string, rfc: string, fecha: string) => {
  //   let dataArray = new FormData();
  //   dataArray.append("id", id);
  //   dataArray.append("phrase", password);

  //   axios
  //     .post("http://10.210.0.27/api/getfpdf", dataArray, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //       responseType: "arraybuffer",
  //     })
  //     .then((r) => {
  //       const a = window.URL || window.webkitURL;

  //       const url = a.createObjectURL(
  //         new Blob([r.data], { type: "application/pdf" })
  //       );

  //       let link = document.createElement("a");

  //       link.setAttribute("download", `${rfc}-${fecha}.pdf`);
  //       link.setAttribute("href", url);
  //       document.body.appendChild(link);
  //       link.click();
  //     })
  //     .catch((err) => {});
  // };

  return (
    <Box
      sx={{
        width: {
          xs: "90%",
          sm: "90%",
          md: "80%",
          lg: "70%",
          xl: "70%",
        },
        height: {
          xs: "90%",
          sm: "80%",
          md: "80%",
          lg: "80%",
          xl: "80%",
        },
        backgroundColor: "white",
        boxShadow: 20,
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          width: "90%",
          fontSize: {
            xs: "0.8rem",
            sm: "1.5rem",
            md: "2rem",
            lg: "2rem",
            xl: "3rem",
          },
          fontFamily: "MontserratBold",
          textAlign: "center",
        }}
      >
        VALIDADOR DE FIRMA ELECTRÓNICA
      </Typography>
      <Typography
        sx={{
          width: "90%",
          fontSize: {
            xs: "0.6rem",
            sm: "0.8rem",
            md: "1rem",
            lg: "1rem",
            xl: "1.5rem",
          },
          fontFamily: "MontserratMedium",
          textAlign: "center",
        }}
      >
        El documento es válido y fue firmado con los siguientes datos
      </Typography>

      <Box
        sx={{
          width: "90%",
          height: "90%",
          borderRadius: 5,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr",
            xl: "1fr 1fr",
          },
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            height: {
              xs: "40vh",
              sm: "40vh",
              md: "90%",
              lg: "90%",
              xl: "90%",
            },
            display: "grid",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontFamily: "MontserratBold" }}>
            Datos de la firma
          </Typography>
          <TextField
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: {
                    xs: "60%",
                    sm: "70%",
                    md: "80%",
                    lg: "80%",
                    xl: "100%",
                  },
                  fontFamily: "MontserratBold",
                }}
              >
                Id del documento firmado
              </Typography>
            }
            sx={{ width: "100%", ":read-only": "true" }}
            inputProps={{
              sx: {
                fontSize: {
                  xs: "70%",
                  sm: "80%",
                  md: "80%",
                  lg: "80%",
                  xl: "100%",
                },
              },
            }}
            value={id || ""}
          ></TextField>
          <TextField
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: {
                    xs: "60%",
                    sm: "70%",
                    md: "80%",
                    lg: "80%",
                    xl: "100%",
                  },
                  fontFamily: "MontserratBold",
                }}
              >
                Firmante
              </Typography>
            }
            sx={{ width: "100%", ":read-only": "true" }}
            inputProps={{
              sx: {
                fontSize: {
                  xs: "70%",
                  sm: "80%",
                  md: "80%",
                  lg: "80%",
                  xl: "100%",
                },
              },
            }}
            value={doc?.Nombre || ""}
          ></TextField>
          <TextField
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: {
                    xs: "60%",
                    sm: "70%",
                    md: "80%",
                    lg: "80%",
                    xl: "100%",
                  },
                  fontFamily: "MontserratBold",
                }}
              >
                Referencia del documento
              </Typography>
            }
            sx={{ width: "100%", ":read-only": "true" }}
            inputProps={{
              sx: {
                fontSize: {
                  xs: "70%",
                  sm: "80%",
                  md: "80%",
                  lg: "80%",
                  xl: "100%",
                },
              },
            }}
            value={doc?.NumeroOficio || ""}
          ></TextField>
          <TextField
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: {
                    xs: "60%",
                    sm: "70%",
                    md: "80%",
                    lg: "80%",
                    xl: "100%",
                  },
                  fontFamily: "MontserratBold",
                }}
              >
                Tipo de documento
              </Typography>
            }
            sx={{ width: "100%", ":read-only": "true" }}
            inputProps={{
              sx: {
                fontSize: {
                  xs: "70%",
                  sm: "80%",
                  md: "80%",
                  lg: "80%",
                  xl: "100%",
                },
              },
            }}
            value={doc?.NumeroOficio || ""}
          ></TextField>
          <TextField
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: {
                    xs: "60%",
                    sm: "70%",
                    md: "80%",
                    lg: "80%",
                    xl: "100%",
                  },
                  fontFamily: "MontserratBold",
                }}
              >
                Fecha del documento
              </Typography>
            }
            sx={{ width: "100%", ":read-only": "true" }}
            inputProps={{
              sx: {
                fontSize: {
                  xs: "70%",
                  sm: "80%",
                  md: "80%",
                  lg: "80%",
                  xl: "100%",
                },
              },
            }}
            value={doc?.NumeroOficio || ""}
          ></TextField>
          <TextField
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: {
                    xs: "60%",
                    sm: "70%",
                    md: "80%",
                    lg: "80%",
                    xl: "100%",
                  },
                  fontFamily: "MontserratBold",
                }}
              >
                Asunto
              </Typography>
            }
            sx={{ width: "100%", ":read-only": "true" }}
            inputProps={{
              sx: {
                fontSize: {
                  xs: "70%",
                  sm: "80%",
                  md: "80%",
                  lg: "80%",
                  xl: "100%",
                },
              },
            }}
            value={doc?.nombre_archivo || ""}
          ></TextField>
          <TextField
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: {
                    xs: "60%",
                    sm: "70%",
                    md: "80%",
                    lg: "80%",
                    xl: "100%",
                  },
                  fontFamily: "MontserratBold",
                }}
              >
                Fecha de la firma
              </Typography>
            }
            sx={{ width: "100%", ":read-only": "true" }}
            inputProps={{
              sx: {
                fontSize: {
                  xs: "70%",
                  sm: "80%",
                  md: "80%",
                  lg: "80%",
                  xl: "100%",
                },
              },
            }}
            value={doc?.FechaFirma || ""}
          ></TextField>
        </Box>

        <Box
          sx={{
            width: "90%",
            height: "32.1vh",
            display: "grid",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontFamily: "MontserratBold" }}>OCSP</Typography>
          <TextField
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: {
                    xs: "60%",
                    sm: "70%",
                    md: "80%",
                    lg: "80%",
                    xl: "100%",
                  },
                  fontFamily: "MontserratBold",
                }}
              >
                Dato
              </Typography>
            }
            sx={{ width: "100%", ":read-only": "true" }}
            inputProps={{
              sx: {
                fontSize: {
                  xs: "70%",
                  sm: "80%",
                  md: "80%",
                  lg: "80%",
                  xl: "100%",
                },
              },
            }}
            value={""}
          ></TextField>
          <TextField
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: {
                    xs: "60%",
                    sm: "70%",
                    md: "80%",
                    lg: "80%",
                    xl: "100%",
                  },
                  fontFamily: "MontserratBold",
                }}
              >
                Serie Respondedor
              </Typography>
            }
            sx={{ width: "100%", ":read-only": "true" }}
            inputProps={{
              sx: {
                fontSize: {
                  xs: "70%",
                  sm: "80%",
                  md: "80%",
                  lg: "80%",
                  xl: "100%",
                },
              },
            }}
            value={""}
          ></TextField>
          <TextField
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: {
                    xs: "60%",
                    sm: "70%",
                    md: "80%",
                    lg: "80%",
                    xl: "100%",
                  },
                  fontFamily: "MontserratBold",
                }}
              >
                Respondedor
              </Typography>
            }
            sx={{ width: "100%", ":read-only": "true" }}
            inputProps={{
              sx: {
                fontSize: {
                  xs: "70%",
                  sm: "80%",
                  md: "80%",
                  lg: "80%",
                  xl: "100%",
                },
              },
            }}
            value={""}
          ></TextField>
          <TextField
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: {
                    xs: "60%",
                    sm: "70%",
                    md: "80%",
                    lg: "80%",
                    xl: "100%",
                  },
                  fontFamily: "MontserratBold",
                }}
              >
                Emisor
              </Typography>
            }
            sx={{ width: "100%", ":read-only": "true" }}
            inputProps={{
              sx: {
                fontSize: {
                  xs: "70%",
                  sm: "80%",
                  md: "80%",
                  lg: "80%",
                  xl: "100%",
                },
              },
            }}
            value={""}
          ></TextField>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            justifyItems: "center",
            gridTemplateRows: "repeat(4,1fr)",
          }}
        >
          <Typography
            sx={{
              gridRow: "1",
              gridColumn: "1/3",
              fontFamily: "MontserratBold",
            }}
          >
            Datos
          </Typography>

          <Box sx={{ gridColumn: "1", gridRow: "2/4" }}>
            <Typography
              sx={{
                fontSize: {
                  xs: "60%",
                  sm: "80%",
                  md: "80%",
                  lg: "80%",
                  xl: "100%",
                },
                fontFamily: "MontserratBold",
              }}
            >
              Destinatarios
            </Typography>
            {dest.map((x: any, i: number) => [
              <Typography
                key={i}
                sx={{
                  fontSize: {
                    xs: "60%",
                    sm: "80%",
                    md: "80%",
                    lg: "80%",
                    xl: "100%",
                  },
                  fontFamily: "MontserratMedium",
                }}
              >
                -{x.Nombre}
              </Typography>,
            ])}
          </Box>

          <Box sx={{ gridColumn: "2", gridRow: "2/4" }}>
            <Typography
              sx={{
                fontSize: {
                  xs: "60%",
                  sm: "80%",
                  md: "80%",
                  lg: "80%",
                  xl: "100%",
                },
                fontFamily: "MontserratBold",
              }}
            >
              CCP
            </Typography>
            {ccp.map((x: any, i: number) => [
              <Typography
                key={i}
                sx={{
                  fontSize: {
                    xs: "60%",
                    sm: "80%",
                    md: "80%",
                    lg: "80%",
                    xl: "100%",
                  },
                  fontFamily: "MontserratMedium",
                }}
              >
                - {x}
              </Typography>,
            ])}
          </Box>
        </Box>
        <Box
          sx={{
            width: "90%",
            height: "auto",
            display: "grid",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "60%",
                sm: "80%",
                md: "80%",
                lg: "80%",
                xl: "100%",
              },
              fontFamily: "MontserratBold",
            }}
          >
            Obtener documento firmado
          </Typography>

          <DialogDescarga
            Id={doc.IdPathDoc}
            Rfc={doc.Rfc}
            FechaFirma={doc.FechaFirma}
          ></DialogDescarga>
        </Box>
      </Box>
    </Box>
  );
};

export interface IIDocFirmado {
  NumeroOficio: string;
  Destinatario: string;
  SerialCertificado: string;
  Sistema: string;
  Asunto: string;
  Nombre: string;
  Rfc: string;
  FechaFirma: string;
  IdFirma: string;
  IdPathDoc: string;
  nombre_archivo: string;
}
