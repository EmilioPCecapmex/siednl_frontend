import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  List,
  ListItemButton,
  Button,
  Divider,
} from "@mui/material";
import TabResumenMA from "./TabResumenMA";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export function TabFinProposito({
  show,
  resumenFin,
  resumenProposito,
  cargaFin,
  cargaProposito,
}: {
  show: boolean;
  resumenFin: Function;
  resumenProposito: Function;
  cargaFin: Array<IFin>;
  cargaProposito: Array<IProposito>;
}) {
  const [tabFin, setTabFin] = useState([
    {
      resumen: "",
      indicador: "",
      formula: "",
      frecuencia: "",
      medios: "",
      supuestos: "",
    },
  ]);

  const [tabProposito, setTabProposito] = useState([
    {
      resumen: "",
      indicador: "",
      formula: "",
      frecuencia: "",
      medios_verificacion: "",
      supuestos: "",
    },
  ]);

  const [fin, setFin] = useState({
    resumen: "",
    indicador: "",
    formula: "",
    frecuencia: "",
    medios: "",
    supuestos: "",
  });

  const [proposito, setProposito] = useState({
    resumen: "",
    indicador: "",
    formula: "",
    frecuencia: "",
    medios_verificacion: "",
    supuestos: "",
  });

  const [showFin, setShowFin] = useState(true);
  const [showProposito, setShowProposito] = useState(false);

  useEffect(() => {
    setTabFin([
      {
        resumen: fin.resumen,
        indicador: fin.indicador,
        formula: fin.formula,
        frecuencia: fin.frecuencia,
        medios: fin.medios,
        supuestos: fin.supuestos,
      },
    ]);
    setTabProposito([
      {
        resumen: proposito.resumen,
        indicador: proposito.indicador,
        formula: proposito.formula,
        frecuencia: proposito.frecuencia,
        medios_verificacion: proposito.medios_verificacion,
        supuestos: proposito.supuestos,
      },
    ]);
  }, [fin, proposito]);

  useEffect(() => {
    setFin({
      resumen: cargaFin[0]?.resumen,
      indicador: cargaFin[0]?.indicador,
      formula: cargaFin[0]?.formula,
      frecuencia: cargaFin[0]?.frecuencia,
      medios: cargaFin[0]?.medios,
      supuestos: cargaFin[0]?.supuestos,
    });

    setTimeout(() => {
      setProposito({
        resumen: cargaProposito[0]?.resumen,
        indicador: cargaProposito[0]?.indicador,
        formula: cargaProposito[0]?.formula,
        frecuencia: cargaProposito[0]?.frecuencia,
        medios_verificacion: cargaProposito[0]?.medios_verificacion,
        supuestos: cargaProposito[0]?.supuestos,
      });
    }, 1000);
  }, [cargaFin, cargaProposito]);

  useEffect(() => {
    resumenFin(tabFin);
    resumenProposito(tabProposito);
  }, [tabFin, tabProposito]);

  const [openFin, setOpenFin] = useState(false);
  const handleClickOpen = () => {
    setOpenFin(false);
  };

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
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
      {showFin || showProposito ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            height: "7vh",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <InfoOutlinedIcon
            onClick={() => (showFin ? setOpenFin(true) : null)}
            fontSize="large"
            sx={{ cursor: "pointer" }}
          ></InfoOutlinedIcon>
          <Typography
            sx={{
              mr: "1vw",
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
            }}
          >
            {showFin ? "Fin" : null}
            {showProposito ? "Propósito" : null}
          </Typography>{" "}
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            height: "7vh",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {" "}
        </Box>
      )}

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <List
          sx={{
            width: "10vw",
            height: "65vh",
            borderRight: "solid",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderColor: "#BCBCBC",
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
          <Box
            sx={{
              height: "10vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Divider />
            <ListItemButton
              selected={showFin}
              onClick={() => {
                setShowFin(!showFin);
                setShowProposito(false);
              }}
              sx={{
                "&.Mui-selected ": {
                  backgroundColor: "#c4a57b",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#cbcbcb",
                },
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Fin
              </Typography>
            </ListItemButton>

            <Divider />
          </Box>
          <Box
            sx={{
              height: "10vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <ListItemButton
              selected={showProposito}
              onClick={() => {
                setShowProposito(!showProposito);
                setShowFin(false);
              }}
              sx={{
                "&.Mui-selected ": {
                  backgroundColor: "#c4a57b",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#cbcbcb",
                },
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Propósito
              </Typography>
            </ListItemButton>
            <Divider />
          </Box>
        </List>

        {showFin ? (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                width: "90%",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <Dialog open={openFin} fullWidth={true} maxWidth={"xl"}>
                <DialogTitle sx={{ fontFamily: "MontserratBold" }}>
                  <Typography
                    sx={{
                      fontFamily: "MontserratBold",
                      borderBottom: 1,
                      fontSize: 30,
                    }}
                  >
                    Fin
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        mt: 1,
                        alignItems: "center",
                        borderBottom: 1,
                        borderColor: "#cfcfcf",
                      }}
                    >
                      <Typography
                        sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                      >
                        Resumen Narrativo:
                      </Typography>
                      <Typography
                        sx={{ fontFamily: "MontserratLight", width: "80%" }}
                      >
                        {fin.resumen}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        mt: 1,
                        alignItems: "center",
                        borderBottom: 1,
                        borderColor: "#cfcfcf",
                      }}
                    >
                      <Typography
                        sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                      >
                        Indicador:
                      </Typography>
                      <Typography
                        sx={{ fontFamily: "MontserratLight", width: "80%" }}
                      >
                        {fin.indicador}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        mt: 1,
                        alignItems: "center",
                        borderBottom: 1,
                        borderColor: "#cfcfcf",
                      }}
                    >
                      <Typography
                        sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                      >
                        Fórmula:
                      </Typography>
                      <Typography
                        sx={{ fontFamily: "MontserratLight", width: "80%" }}
                      >
                        {fin.formula}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        mt: 1,
                        alignItems: "center",
                        borderBottom: 1,
                        borderColor: "#cfcfcf",
                      }}
                    >
                      <Typography
                        sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                      >
                        Frecuencia:
                      </Typography>
                      <Typography
                        sx={{ fontFamily: "MontserratLight", width: "80%" }}
                      >
                        {fin.frecuencia}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        mt: 1,
                        alignItems: "center",
                        borderBottom: 1,
                        borderColor: "#cfcfcf",
                      }}
                    >
                      <Typography
                        sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                      >
                        Medios de Verificación:
                      </Typography>
                      <Typography
                        sx={{ fontFamily: "MontserratLight", width: "80%" }}
                      >
                        {fin.medios}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        mt: 1,
                        alignItems: "center",
                        borderBottom: 1,
                        borderColor: "#cfcfcf",
                      }}
                    >
                      <Typography
                        sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                      >
                        Supuestos:
                      </Typography>
                      <Typography
                        sx={{ fontFamily: "MontserratLight", width: "80%" }}
                      >
                        {fin.supuestos}
                      </Typography>
                    </Box>
                  </Box>
                </DialogContent>
                <Button onClick={handleClickOpen}>Cerrar</Button>
              </Dialog>
            </Box>
          </>
        ) : showProposito ? null : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              width: "90%",
              alignItems: "center",
              justifyItems: "center",
            }}
          ></Box>
        ) }

        {showProposito ? (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                width: "90%",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <TextField
                disabled
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Resumen Narrativo"}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                value={proposito.resumen}
              />

              <TextField
                disabled
                rows={4}
                multiline
                sx={{ width: "90%", boxShadow: 2 }}
                variant="filled"
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                label={"Indicador"}
                value={proposito.indicador}
              />
              <TextField
                disabled
                rows={4}
                multiline
                variant="filled"
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  readOnly: true,
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Fórmula"}
                value={proposito.formula}
              />

              <TextField
                disabled
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Frecuencia"}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                value={proposito.frecuencia}
              />
              <TextField
                disabled
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                label={"Medios de Verificación"}
                value={proposito.medios_verificacion}
              />
              <TextField
                disabled
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Supuestos"}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                value={proposito.supuestos}
              />
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
}

export default TabFinProposito;

export interface IIndicadores {
  Id: string;
  TipoDeIndicador: string;
  FechaCreacion: string;
  CreadoPor: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  Deleted: number;
}

export interface IFrecuencias {
  Id: string;
  Frecuencia: string;
  FechaCreacion: string;
  CreadoPor: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  Deleted: number;
}

export interface IFin {
  resumen: string;
  indicador: string;
  formula: string;
  frecuencia: string;
  medios: string;
  supuestos: string;
}
export interface IProposito {
  resumen: string;
  indicador: string;
  formula: string;
  frecuencia: string;
  medios_verificacion: string;
  supuestos: string;
}
