import React, { useEffect, useState } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  TablePagination,
  Input,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import { LateralMenu } from "../../../lateralMenu/LateralMenu";
import { Header } from "../../../header/Header";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const TablaDocs = () => {
  const [page, setPage] = useState(0);

  const renglonesPagina = 7;
  const [rowsPerPage, setRowsPerPage] = useState(renglonesPagina);

  // Realiza el cambio de pagina
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  const [findTextStr, setFindTextStr] = useState("");
  const [fecha1, setFecha1] = useState("");
  const [fecha2, setFecha2] = useState("");

  const [phrase, setPhrase] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [docs, setDocs] = useState<Array<IIDocsFirmados>>([]);

  const [docsFiltered, setDocsFiltered] = useState<Array<IIDocsFirmados>>([]);

  // Filtrado por caracter
  const findText = (v: string, f1: string, f2: string) => {
    let fecha1 = new Date(f1);
    let fecha2 = new Date(f2);

    fecha1.setDate(fecha1.getDate() + 1);
    fecha1.setHours(0o0);
    fecha2.setHours(0o0);
    fecha2.setDate(fecha2.getDate() + 1);

    if (!/^[\s]*$/.test(v) && !/^[\s]*$/.test(f1) && !/^[\s]*$/.test(f2)) {
      setDocsFiltered(
        docs.filter(
          (x) =>
            (x.Asunto.toLowerCase().includes(v.toLowerCase()) ||
              x.NumeroOficio.toLowerCase().includes(v.toLowerCase()) ||
              x.Sistema.toLowerCase().includes(v.toLowerCase()) ||
              x.FechaFirma.includes(v.toLowerCase())) &&
            new Date(x.FechaFirma) >= fecha1 &&
            new Date(x.FechaFirma) <= fecha2
        )
      );
    } else if (!/^[\s]*$/.test(f1) && !/^[\s]*$/.test(f2)) {
      setDocsFiltered(
        docs.filter(
          (x) =>
            new Date(x.FechaFirma) >= fecha1 && new Date(x.FechaFirma) <= fecha2
        )
      );
    } else if (!/^[\s]*$/.test(v)) {
      setDocsFiltered(
        docs.filter(
          (x) =>
            x.Asunto.toLowerCase().includes(v.toLowerCase()) ||
            x.NumeroOficio.toLowerCase().includes(v.toLowerCase()) ||
            x.Sistema.toLowerCase().includes(v.toLowerCase()) ||
            x.FechaFirma.includes(v.toLowerCase())
        )
      );
    } else {
      setDocsFiltered(docs);
    }
  };

  const getDocs = () => {
    axios
      .post("http://10.210.0.27/api/alldocs", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setDocs(r.data);
        setDocsFiltered(r.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getDocs();
  }, []);

  const [openModalDescargar, setOpenModalDescargar] = useState(false);

  const getPdf = (id: string, password: string, rfc: string, fecha: string) => {
    let dataArray = new FormData();
    dataArray.append("id", id);
    dataArray.append("phrase", password);

    axios
      .post("http://10.210.0.27/api/getfpdf", dataArray, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
        responseType: "arraybuffer",
      })
      .then((r) => {
        const a = window.URL || window.webkitURL;

        const url = a.createObjectURL(
          new Blob([r.data], { type: "application/pdf" })
        );

        let link = document.createElement("a");

        link.setAttribute("download", `${rfc}-${fecha}.pdf`);
        link.setAttribute("href", url);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {});
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "#F2F2F2",
      }}
    >
      <LateralMenu selection={9} actionNumber={0} />
      <Header
        details={{
          name1: "Inicio",
          path1: "../home",
          name2: "Documentos Firmados",
          path2: "../tabla",
          name3: "",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "85%",
          height: "92%",
          mt: "8vh",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            mt: "3vh",
            width: "60%",
            height: "15vh",
            backgroundColor: "#fff",
            borderRadius: 5,
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            boxShadow: 5,
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "60%",
              alignItems: "center",
              justifyContent: "center",
              border: 1,
              borderRadius: 2,
              borderColor: "#616161",
            }}
          >
            <Input
              size="small"
              value={findTextStr}
              placeholder="Búsqueda general"
              sx={{ width: "100%", fontFamily: "MontserratRegular" }}
              disableUnderline
              onChange={(v) => {
                setFindTextStr(v.target.value);
                findText(v.target.value, fecha1, fecha2);
              }}
            />
            <SearchIcon />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              pr: 10,
            }}
          >
            <Typography sx={{ width: "100%", fontFamily: "MontserratMedium" }}>
              Búsqueda por rango de fechas
            </Typography>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratRegular", mr: 1 }}>
                Desde
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  width: "40%",
                  alignItems: "center",
                  justifyContent: "center",
                  border: 1,
                  borderRadius: 2,
                  borderColor: "#616161",
                }}
              >
                <Input
                  type="date"
                  size="small"
                  value={fecha1}
                  placeholder="Desde"
                  sx={{ width: "90%", fontFamily: "MontserratRegular" }}
                  disableUnderline
                  onChange={(v) => {
                    setFecha1(v.target.value);
                    findText(findTextStr, v.target.value, fecha2);
                  }}
                />
              </Box>
              <Typography
                sx={{ fontFamily: "MontserratRegular", ml: 1, mr: 1 }}
              >
                Hasta
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  width: "40%",
                  alignItems: "center",
                  justifyContent: "center",
                  border: 1,
                  borderRadius: 2,
                  borderColor: "#616161",
                }}
              >
                <Input
                  type="date"
                  size="small"
                  value={fecha2}
                  placeholder="Desde"
                  sx={{ width: "90%", fontFamily: "MontserratRegular" }}
                  disableUnderline
                  onChange={(v) => {
                    setFecha2(v.target.value);
                    findText(findTextStr, fecha1, v.target.value);
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "80%",
            height: "65vh",
            backgroundColor: "#ffff",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            boxShadow: 5,
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#edeaea", width: "100%" }}>
              <TableRow
                sx={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "repeat(6, 1fr)",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <TableCell
                  sx={{
                    fontFamily: "MontserratBold",
                    borderBottom: 0,
                    fontSize: "0.8vw",
                  }}
                  align="center"
                >
                  NO. DE OFICIO
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "MontserratBold",
                    borderBottom: 0,
                    fontSize: "0.8vw",
                  }}
                  align="center"
                >
                  NOMBRE DEL ARCHIVO
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "MontserratBold",
                    borderBottom: 0,
                    fontSize: "0.8vw",
                  }}
                  align="center"
                >
                  ASUNTO
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "MontserratBold",
                    borderBottom: 0,
                    fontSize: "0.8vw",
                  }}
                  align="center"
                >
                  FECHA DE FIRMADO
                </TableCell>

                <TableCell
                  sx={{
                    fontFamily: "MontserratBold",
                    borderBottom: 0,
                    fontSize: "0.8vw",
                  }}
                  align="center"
                >
                  SISTEMA
                </TableCell>

                <TableCell
                  sx={{
                    fontFamily: "MontserratBold",
                    borderBottom: 0,
                    fontSize: "0.8vw",
                  }}
                  align="center"
                >
                  DOCUMENTO
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>

          <Box
            sx={{
              width: "100%",
              height: "65vh",
              overflow: "hidden",
              overflowY: "unset",
              "&::-webkit-scrollbar": {
                width: ".3vw",
                mt: 1,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.5)",
                outline: "1px solid slategrey",
                borderRadius: 1,
              },
            }}
          >
            <TableContainer sx={{ overflow: "unset" }}>
              <Table>
                <TableBody>
                  {docsFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          width: "100%",
                          display: "grid",
                          gridTemplateColumns: "repeat(6, 1fr)",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <TableCell
                          sx={{
                            fontFamily: "MontserratRegular",
                            fontSize: "0.8vw",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          align="center"
                        >
                          {row.NumeroOficio}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "MontserratRegular",
                            fontSize: "0.8vw",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow:'hidden'
                          }}
                          align="center"
                        >
                          {row.nombre_archivo}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "MontserratRegular",
                            fontSize: "0.8vw",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          align="center"
                        >
                          {row.Asunto}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "MontserratRegular",
                            fontSize: "0.8vw",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          align="center"
                        >
                          {row.FechaFirma.split(" ")[0]}
                        </TableCell>

                        <TableCell
                          sx={{
                            fontFamily: "MontserratRegular",
                            fontSize: "0.8vw",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          align="center"
                        >
                          {row.Sistema}
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box sx={{ display: "flex" }}>
                            <Tooltip
                              title={
                                openModalDescargar ? "" : "DESCARGAR DOCUMENTO"
                              }
                            >
                              <span>
                                <IconButton
                                  onClick={() => {
                                    setOpenModalDescargar(true);
                                  }}
                                >
                                  <DownloadIcon
                                    sx={[
                                      {
                                        "&:hover": {
                                          color: "orange",
                                        },
                                        width: "1.2vw",
                                        height: "1.2vw",
                                      },
                                    ]}
                                  />
                                  <Dialog
                                    fullWidth
                                    maxWidth={"lg"}
                                    open={openModalDescargar}
                                    onClose={() => {
                                      setOpenModalDescargar(false);
                                      setPhrase("");
                                    }}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <DialogTitle>
                                      Phrase
                                      <IconButton
                                        onClick={() => {
                                          setOpenModalDescargar(false);
                                          setPhrase("");
                                        }}
                                        sx={{
                                          position: "absolute",
                                          right: 8,
                                          top: 8,
                                          color: "black",
                                        }}
                                      >
                                        <CloseIcon />
                                      </IconButton>
                                    </DialogTitle>
                                    <DialogContent>
                                      <FormControl
                                        sx={{
                                          width: "15vw",
                                          height: "20%",
                                          mt: 2,
                                        }}
                                        variant="outlined"
                                        size="small"
                                      >
                                        <InputLabel
                                          sx={{
                                            fontSize: {
                                              xs: "33%",
                                              sm: "60%",
                                              md: "70%",
                                              lg: "70%",
                                              xl: "90%",
                                            },
                                            fontFamily: "MontserratMedium",
                                          }}
                                        >
                                          CONTRASEÑA DE LA CLAVE PRIVADA
                                        </InputLabel>
                                        <OutlinedInput
                                          label="CONTRASEÑA DE LA CLAVE PRIVADA"
                                          type={
                                            showPassword ? "text" : "password"
                                          }
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
                                                onClick={() =>
                                                  setShowPassword(!showPassword)
                                                }
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
                                          value={phrase || ""}
                                          onChange={(v) => {
                                            setPhrase(v.target.value);
                                          }}
                                        />
                                      </FormControl>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button
                                        onClick={() => {
                                          getPdf(
                                            row.Id,
                                            phrase,
                                            row.Rfc,
                                            row.FechaFirma
                                          );
                                        }}
                                      >
                                        Aceptar
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                </IconButton>
                              </span>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ width: "100%" }}>
            <TablePagination
              rowsPerPageOptions={[renglonesPagina]}
              component="div"
              count={docs.length}
              rowsPerPage={renglonesPagina}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export interface IIDocsFirmados {
  NumeroOficio: string;
  SerialCertificado: string;
  Sistema: string;
  Asunto: string;
  Nombre: string;
  Rfc: string;
  FechaFirma: string;
  Id: string;
  nombre_archivo: string;
}
