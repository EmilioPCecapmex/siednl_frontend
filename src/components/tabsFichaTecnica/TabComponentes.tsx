import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { IComponentesFT, IFTEdit } from "../tabsFichaTecnica/Interfaces";

export const TabComponenteFT = ({
  show,
  setFTcomponentesPadre,
  ComponentesFT,
  setComponenteFT,
  showMirFnc,
  showFnc,
  FT,
  ftEditPadre,
}: {
  show: boolean;
  setFTcomponentesPadre: Function;
  setComponenteFT: Function;
  ComponentesFT: IComponentesFT[];
  showMirFnc: Function;
  showFnc: Function;
  FT: string;
  ftEditPadre: IFTEdit;
}) => {
  const [componentSelect, setComponentSelect] = useState(0);

  const [componentesValues, setComponentesValues] = useState<
   IComponentesFT[]>(ComponentesFT);

  let jsonFT = FT === "" ? "" : JSON.parse(FT);

  // useEffect(() => {
  //   let comp: IComponentesFT[] = [];

  //   noComponentes.map((x, index) => {
  //     return comp.push({
  //       componentes: "C" + (index + 1),
  //       tipoDeIndicador:
  //         FT === "" ? "" : jsonFT?.componentes[index]?.tipoDeIndicador || "",
  //       claridad: FT === "" ? "" : jsonFT?.componentes[index]?.claridad || "",
  //       relevancia:
  //         FT === "" ? "" : jsonFT?.componentes[index]?.relevancia || "",
  //       economia: FT === "" ? "" : jsonFT?.componentes[index]?.economia || "",
  //       monitoreable:
  //         FT === "" ? "" : jsonFT?.componentes[index]?.monitoreable || "",
  //       adecuado: FT === "" ? "" : jsonFT?.componentes[index]?.adecuado || "",
  //       aporte_marginal:
  //         FT === "" ? "" : jsonFT?.componentes[index]?.aporte_marginal || "",
  //       dimension: FT === "" ? "" : jsonFT?.componentes[index]?.dimension || "",
  //       unidadDeMedida:
  //         FT === "" ? "" : jsonFT?.componentes[index]?.unidadDeMedida || "",
  //     });
  //   });

  //   setComponentesValues(comp);
  // }, [noComponentes]);

  useEffect(() => {
   // valoresComponenteFTFnc(componentesValues);
   setComponentesValues(ComponentesFT)
  }, []);

  useEffect(() => {
    console.log("componentesValues: ",componentesValues);
    
    setFTcomponentesPadre(componentesValues)
    
  }, [componentesValues]);

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
            COMPONENTE {componentSelect + 1}
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
            {componentesValues.map((item, index) => {
              return (
                <Grid
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Divider />

                  <ListItemButton
                    selected={index === componentSelect ? true : false}
                    key={index}
                    onClick={() => {
                      setComponentSelect(index);
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
                      COMPONENTE {index + 1}
                    </Typography>
                  </ListItemButton>

                  <Divider />
                </Grid>
              );
            })}
          </List>
        )}
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
              {componentesValues.map((item, index) => {
                return (
                  <Grid key={index}>
                    <Divider />

                    <ListItemButton
                      selected={index === componentSelect ? true : false}
                      key={index}
                      onClick={() => {
                        setComponentSelect(index);
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
                        COMPONENTE {index + 1}
                      </Typography>
                    </ListItemButton>

                    <Divider />
                  </Grid>
                );
              })}
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
                        componentesValues[componentSelect ]
                          ?.tipoDeIndicador === "SELECCIÓN ESTRATEGICO"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].tipoDeIndicador =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
                      checked={
                        componentesValues[componentSelect ]
                          ?.tipoDeIndicador === "DE GESTIÓN"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].tipoDeIndicador =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
                sx={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}
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
                      checked={
                        componentesValues[componentSelect ]?.dimension ===
                        "EFICIENCIA"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].dimension =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
                      checked={
                        componentesValues[componentSelect ]?.dimension ===
                        "EFICACIA"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].dimension =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
                      checked={
                        componentesValues[componentSelect ]?.dimension ===
                        "CALIDAD"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].dimension =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
                      checked={
                        componentesValues[componentSelect ]?.dimension ===
                        "ECONOMÍA"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].dimension =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
              value={
                componentesValues[componentSelect ]?.unidadDeMedida || ""
              }
              onChange={(c) => {
                componentesValues[componentSelect ].unidadDeMedida =
                  c.target.value
                    .replaceAll('"', "")
                    .replaceAll("'", "")
                    .replaceAll("\n", "");
                setComponentesValues([...componentesValues]);
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
                      checked={
                        componentesValues[componentSelect ]?.claridad ===
                        "SI"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].claridad =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
                      checked={
                        componentesValues[componentSelect ]?.claridad ===
                        "NO"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].claridad =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
                      checked={
                        componentesValues[componentSelect ]?.relevancia ===
                        "SI"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].relevancia =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
                      checked={
                        componentesValues[componentSelect ]?.relevancia ===
                        "NO"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].relevancia =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
                      checked={
                        componentesValues[componentSelect ]?.economia ===
                        "SI"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].economia =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
                      checked={
                        componentesValues[componentSelect ]?.economia ===
                        "NO"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].economia =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
                      checked={
                        componentesValues[componentSelect ]?.monitoreable ===
                        "SI"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].monitoreable =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
                      checked={
                        componentesValues[componentSelect ]?.monitoreable ===
                        "NO"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].monitoreable =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
                      checked={
                        componentesValues[componentSelect ]?.adecuado ===
                        "SI"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].adecuado =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
                      checked={
                        componentesValues[componentSelect ]?.adecuado ===
                        "NO"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].adecuado =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
                      checked={
                        componentesValues[componentSelect ]
                          ?.aporte_marginal === "SI"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].aporte_marginal =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
                      checked={
                        componentesValues[componentSelect ]
                          ?.aporte_marginal === "NO"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].aporte_marginal =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
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
                      checked={
                        componentesValues[componentSelect ]
                          ?.aporte_marginal === "NA"
                      }
                      onChange={(c) => {
                        componentesValues[componentSelect ].aporte_marginal =
                          c.target.value;
                        setComponentesValues([...componentesValues]);
                      }}
                    />
                  }
                />
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
