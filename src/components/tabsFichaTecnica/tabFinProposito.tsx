import {
  Grid,
  Typography,
  List,
  Divider,
  ListItemButton,
  TextField,
  FormControlLabel,
  Radio,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { IFinFT, IPropositoFT } from "./Interfaces";

export function TabFinPropositoFT({
  show,
  setFTPropositoPadre,
  setFTFinPadre,
  setFinPropositoFT,
  FinValues,
  PropositoValues,
  FT,
}: {
  show: boolean;
  setFTPropositoPadre: Function;
  setFTFinPadre: Function;
  setFinPropositoFT: Function;
  FinValues: IFinFT;
  PropositoValues: IPropositoFT;
  FT: string;
}) {
  let jsonFT = FT === "" ? "" : JSON.parse(FT);

  // [
  //   {
  //     tipoDeIndicador: jsonFT?.fin?.tipoDeIndicador || "",
  //     claridad: jsonFT?.fin?.claridad || "",
  //     relevancia: jsonFT?.fin?.relevancia || "",
  //     economia: jsonFT?.fin?.economia || "",
  //     monitoreable: jsonFT?.fin?.monitoreable || "",
  //     adecuado: jsonFT?.fin?.adecuado || "",
  //     aporte_marginal: jsonFT?.fin?.aporte_marginal || "",
  //     dimension: jsonFT?.fin?.dimension || "",
  //     unidadDeMedida: jsonFT?.fin?.unidadDeMedida || "",
  //   },
  // ]
  const [fin, setFin] = useState<IFinFT>(FinValues);

  // [
  //   {
  //     tipoDeIndicador: jsonFT?.proposito?.tipoDeIndicador || "",
  //     claridad: jsonFT?.proposito?.claridad || "",
  //     relevancia: jsonFT?.proposito?.relevancia || "",
  //     economia: jsonFT?.proposito?.economia || "",
  //     monitoreable: jsonFT?.proposito?.monitoreable || "",
  //     adecuado: jsonFT?.proposito?.adecuado || "",
  //     aporte_marginal: jsonFT?.proposito?.aporte_marginal || "",
  //     dimension: jsonFT?.proposito?.dimension || "",
  //     unidadDeMedida: jsonFT?.proposito?.unidadDeMedida || "",
  //   },
  // ]
  const [proposito, setProposito] = useState<IPropositoFT>(PropositoValues);

  const [showFin, setShowFin] = useState(true);
  const [showProposito, setShowProposito] = useState(false);

  useEffect(() => {
    //resumenFinFT(fin);
    //resumenPropositoFT(proposito);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    setFin(FinValues);
  }, []);

  useEffect(() => {
    //resumenFinFT(fin);
    //resumenPropositoFT(proposito);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    setFTFinPadre(fin);
  }, [fin]);

  useEffect(() => {
    //resumenFinFT(fin);
    //resumenPropositoFT(proposito);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setProposito(PropositoValues);
  }, []);

  useEffect(() => {
    //resumenFinFT(fin);
    //resumenPropositoFT(proposito);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setFTPropositoPadre(proposito);
  }, [proposito]);

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <Grid
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "93vw",
        height: "82vh",
        boxShadow: 10,
        borderRadius: 5,
        flexDirection: "column",
        backgroundColor: "#fff",
        overflow: "auto",
      }}
    >
      {!isSmallScreen ? (
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            height: "7vh",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              mr: "1vw",
              fontFamily: "MontserratSemiBold",
              fontSize: [10, 10, 15, 18, 25, 25],
            }}
          >
            {showFin ? "FIN" : null}
            {showProposito ? "PROPÓSITO" : null}
          </Typography>
        </Grid>
      ) : null}

      <Grid
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        {!isSmallScreen && (
          <List
            sx={{
              width: "15vw",
              height: "95%",
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
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Divider />
              <ListItemButton
                selected={showFin}
                onClick={() => {
                  setShowFin(true);
                  setShowProposito(false);
                }}
                sx={{
                  height: "7vh",
                  "&.Mui-selected ": {
                    backgroundColor: "#c4a57b",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#cbcbcb",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: [10, 10, 12, 15, 18, 20],
                    fontFamily: "MontserratMedium",
                  }}
                >
                  FIN
                </Typography>
              </ListItemButton>
              <Divider />
            </Grid>

            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <ListItemButton
                selected={showProposito}
                onClick={() => {
                  setShowProposito(true);
                  setShowFin(false);
                }}
                sx={{
                  height: "7vh",
                  "&.Mui-selected ": {
                    backgroundColor: "#c4a57b",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#cbcbcb",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: [10, 10, 12, 15, 18, 20],
                    fontFamily: "MontserratMedium",
                  }}
                >
                  PROPÓSITO
                </Typography>
              </ListItemButton>
              <Divider />
            </Grid>
          </List>
        )}

        {showFin ? (
          <>
            <Grid
              item
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                "& > .MuiGrid-item": {
                  marginBottom: "20px", // Ajusta la cantidad de espacio vertical entre los elementos
                },
              }}
            >
              {isSmallScreen && (
                <List>
                  <Grid>
                    <Divider />
                    <ListItemButton
                      selected={showFin}
                      onClick={() => {
                        setShowFin(true);
                        setShowProposito(false);
                      }}
                      sx={{
                        height: "7vh",
                        "&.Mui-selected ": {
                          backgroundColor: "#c4a57b",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "#cbcbcb",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: [10, 10, 12, 15, 18, 20],
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        FIN
                      </Typography>
                    </ListItemButton>
                    <Divider />
                  </Grid>

                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <ListItemButton
                      selected={showProposito}
                      onClick={() => {
                        setShowProposito(true);
                        setShowFin(false);
                      }}
                      sx={{
                        height: "7vh",
                        "&.Mui-selected ": {
                          backgroundColor: "#c4a57b",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "#cbcbcb",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: [10, 10, 12, 15, 18, 20],
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        PROPÓSITO
                      </Typography>
                    </ListItemButton>
                    <Divider />
                  </Grid>
                </List>
              )}

              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    //
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 13, 15, 18],
                    }}
                  >
                    TIPO DE INDICADOR
                  </FormLabel>
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      value={"SELECCIÓN ESTRATEGICO"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          SELECCIÓN ESTRATEGICO
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={
                            fin.tipoDeIndicador === "SELECCIÓN ESTRATEGICO"
                          }
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, tipoDeIndicador: finvalue });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"DE GESTIÓN"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          DE GESTIÓN
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.tipoDeIndicador === "DE GESTIÓN"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, tipoDeIndicador: finvalue });
                          }}
                        />
                      }
                    />
                  </Grid>
                </FormControl>
              </Grid>

              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 13, 15, 18],
                    }}
                  >
                    DIMENSIÓN
                  </FormLabel>

                  <Grid
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2,1fr)",
                    }}
                  >
                    <FormControlLabel
                      value={"EFICIENCIA"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          EFICIENCIA
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.dimension === "EFICIENCIA"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, dimension: finvalue });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"EFICACIA"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          EFICACIA
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.dimension === "EFICACIA"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, dimension: finvalue });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"CALIDAD"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          CALIDAD
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.dimension === "CALIDAD"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, dimension: finvalue });
                          }}
                        />
                      }
                    />

                    <FormControlLabel
                      value={"ECONOMÍA"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          ECONOMÍA
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.dimension === "ECONOMÍA"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, dimension: finvalue });
                          }}
                        />
                      }
                    />
                  </Grid>
                </FormControl>
              </Grid>

              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  fullWidth
                  rows={5}
                  multiline
                  variant="filled"
                  sx={{
                    fontSize: [10, 10, 13, 15, 18],

                    boxShadow: 2,
                  }}
                  label={"UNIDAD DE MEDIDA"}
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                      fontSize: "1vw",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratRegular",
                    },
                  }}
                  value={fin.unidadDeMedida}
                  onChange={(c) => {
                    let finvalue = c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "");

                    setFin({ ...fin, unidadDeMedida: finvalue });
                  }}
                />
              </Grid>

              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 13, 15, 18],
                    }}
                  >
                    CLARIDAD
                  </FormLabel>
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      value={"SI"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          SI
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.claridad === "SI"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, claridad: finvalue });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"NO"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          NO
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.claridad === "NO"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, claridad: finvalue });
                          }}
                        />
                      }
                    />
                  </Grid>
                </FormControl>
              </Grid>

              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 13, 15, 18],
                    }}
                  >
                    RELEVANCIA
                  </FormLabel>
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      value={"SI"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          SI
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.relevancia === "SI"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, relevancia: finvalue });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"NO"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          NO
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.relevancia === "NO"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, relevancia: finvalue });
                          }}
                        />
                      }
                    />
                  </Grid>
                </FormControl>
              </Grid>

              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 13, 15, 18],
                    }}
                  >
                    ECONOMÍA
                  </FormLabel>
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      value={"SI"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          SI
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.economia === "SI"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, economia: finvalue });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"NO"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          NO
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.economia === "NO"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, economia: finvalue });
                          }}
                        />
                      }
                    />
                  </Grid>
                </FormControl>
              </Grid>

              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 13, 15, 18],
                    }}
                  >
                    MONITOREABLE
                  </FormLabel>
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      value={"SI"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          SI
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.monitoreable === "SI"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, monitoreable: finvalue });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"NO"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          NO
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.monitoreable === "NO"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, monitoreable: finvalue });
                          }}
                        />
                      }
                    />
                  </Grid>
                </FormControl>
              </Grid>

              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 13, 15, 18],
                    }}
                  >
                    ADECUADO
                  </FormLabel>
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      value={"SI"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          SI
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.adecuado === "SI"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, adecuado: finvalue });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"NO"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          NO
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.adecuado === "NO"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, adecuado: finvalue });
                          }}
                        />
                      }
                    />
                  </Grid>
                </FormControl>
              </Grid>

              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 13, 15, 18],
                    }}
                  >
                    APORTE MARGINAL
                  </FormLabel>
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      value={"SI"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          SI
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.aporte_marginal === "SI"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, aporte_marginal: finvalue });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"NO"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          NO
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.aporte_marginal === "NO"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, aporte_marginal: finvalue });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"NA"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          NA
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={fin.aporte_marginal === "NA"}
                          onChange={(c) => {
                            let finvalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setFin({ ...fin, aporte_marginal: finvalue });
                          }}
                        />
                      }
                    />
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>
          </>
        ) : null}

        {showProposito ? (
          <>
            <Grid
              item
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={11}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                "& > .MuiGrid-item": {
                  marginBottom: "20px", // Ajusta la cantidad de espacio vertical entre los elementos
                },
              }}
            >
              {isSmallScreen && (
                <List>
                  <Grid>
                    <Divider />
                    <ListItemButton
                      selected={showFin}
                      onClick={() => {
                        setShowFin(true);
                        setShowProposito(false);
                      }}
                      sx={{
                        height: "7vh",
                        "&.Mui-selected ": {
                          backgroundColor: "#c4a57b",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "#cbcbcb",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: [10, 10, 12, 15, 18, 20],
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        FIN
                      </Typography>
                    </ListItemButton>
                    <Divider />
                  </Grid>

                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <ListItemButton
                      selected={showProposito}
                      onClick={() => {
                        setShowProposito(true);
                        setShowFin(false);
                      }}
                      sx={{
                        height: "7vh",
                        "&.Mui-selected ": {
                          backgroundColor: "#c4a57b",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "#cbcbcb",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: [10, 10, 12, 15, 18, 20],
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        PROPÓSITO
                      </Typography>
                    </ListItemButton>
                    <Divider />
                  </Grid>
                </List>
              )}
              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 13, 15, 18],
                    }}
                  >
                    TIPO DE INDICADOR
                  </FormLabel>
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      value={"SELECCIÓN ESTRATEGICO"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          SELECCIÓN ESTRATEGICO
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={
                            proposito.tipoDeIndicador ===
                            "SELECCIÓN ESTRATEGICO"
                          }
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setProposito({
                              ...proposito,
                              tipoDeIndicador: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"DE GESTIÓN"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          DE GESTIÓN
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.tipoDeIndicador === "DE GESTIÓN"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setProposito({
                              ...proposito,
                              tipoDeIndicador: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                  </Grid>
                </FormControl>
              </Grid>

              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 13, 15, 18],
                    }}
                  >
                    DIMENSIÓN
                  </FormLabel>

                  <Grid
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2,1fr)",
                    }}
                  >
                    <FormControlLabel
                      value={"EFICIENCIA"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          EFICIENCIA
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.dimension === "EFICIENCIA"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setProposito({
                              ...proposito,
                              dimension: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"EFICACIA"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          EFICACIA
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.dimension === "EFICACIA"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setProposito({
                              ...proposito,
                              dimension: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"CALIDAD"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          CALIDAD
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.dimension === "CALIDAD"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setProposito({
                              ...proposito,
                              dimension: propositovalue,
                            });
                          }}
                        />
                      }
                    />

                    <FormControlLabel
                      value={"ECONOMÍA"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          ECONOMÍA
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.dimension === "ECONOMÍA"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");

                            setProposito({
                              ...proposito,
                              dimension: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                  </Grid>
                </FormControl>
              </Grid>
              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  rows={5}
                  multiline
                  variant="filled"
                  sx={{ boxShadow: 2 }}
                  label={"UNIDAD DE MEDIDA"}
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                      fontSize: "1vw",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratRegular",
                    },
                  }}
                  value={proposito.unidadDeMedida}
                  onChange={(c) => {
                    let propositovalue = c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "");
                    setProposito({
                      ...proposito,
                      unidadDeMedida: propositovalue,
                    });
                  }}
                />
              </Grid>
              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 13, 15, 18],
                    }}
                  >
                    CLARIDAD
                  </FormLabel>
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      value={"SI"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          SI
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.claridad === "SI"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");
                            setProposito({
                              ...proposito,
                              claridad: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"NO"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          NO
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.claridad === "NO"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");
                            setProposito({
                              ...proposito,
                              claridad: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                  </Grid>
                </FormControl>
              </Grid>

              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 13, 15, 18],
                    }}
                  >
                    RELEVANCIA
                  </FormLabel>
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      value={"SI"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          SI
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.relevancia === "SI"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");
                            setProposito({
                              ...proposito,
                              relevancia: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"NO"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          NO
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.relevancia === "NO"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");
                            setProposito({
                              ...proposito,
                              relevancia: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                  </Grid>
                </FormControl>
              </Grid>
              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 13, 15, 18],
                    }}
                  >
                    ECONOMÍA
                  </FormLabel>
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      value={"SI"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          SI
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.economia === "SI"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");
                            setProposito({
                              ...proposito,
                              economia: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"NO"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          NO
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.economia === "NO"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");
                            setProposito({
                              ...proposito,
                              economia: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                  </Grid>
                </FormControl>
              </Grid>
              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 13, 15, 18],
                    }}
                  >
                    MONITOREABLE
                  </FormLabel>
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      value={"SI"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          SI
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.monitoreable === "SI"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");
                            setProposito({
                              ...proposito,
                              monitoreable: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"NO"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          NO
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.monitoreable === "NO"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");
                            setProposito({
                              ...proposito,
                              monitoreable: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                  </Grid>
                </FormControl>
              </Grid>

              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 13, 15, 18],
                    }}
                  >
                    ADECUADO
                  </FormLabel>
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      value={"SI"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          SI
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.adecuado === "SI"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");
                            setProposito({
                              ...proposito,
                              adecuado: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"NO"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          NO
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.adecuado === "NO"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");
                            setProposito({
                              ...proposito,
                              adecuado: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                  </Grid>
                </FormControl>
              </Grid>

              <Grid
                item
                xl={3.5}
                lg={3.5}
                md={3.5}
                sm={3.5}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 13, 15, 18],
                    }}
                  >
                    APORTE MARGINAL
                  </FormLabel>
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      value={"SI"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          SI
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.aporte_marginal === "SI"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");
                            setProposito({
                              ...proposito,
                              aporte_marginal: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"NO"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          NO
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.aporte_marginal === "NO"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");
                            setProposito({
                              ...proposito,
                              aporte_marginal: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"NA"}
                      label={
                        <Typography
                          sx={{
                            fontSize: [10, 10, 11, 12, 13],
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          NA
                        </Typography>
                      }
                      sx={{
                        fontFamily: "MontserratMedium",
                      }}
                      control={
                        <Radio
                          checked={proposito.aporte_marginal === "NA"}
                          onChange={(c) => {
                            let propositovalue = c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");
                            setProposito({
                              ...proposito,
                              aporte_marginal: propositovalue,
                            });
                          }}
                        />
                      }
                    />
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>
          </>
        ) : null}
      </Grid>
    </Grid>
  );
}
