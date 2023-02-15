import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
  FormControl,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { IComponentesFT } from "../tabsFichaTecnica/Interfaces";

export const TabComponenteFT = ({
  show,
  valoresComponenteFTFnc,
  noComponentes,
  showMirFnc,
  showFnc,
  FT,
}: {
  show: boolean;
  valoresComponenteFTFnc: Function;
  noComponentes: number[];
  showMirFnc: Function;
  showFnc: Function;
  FT: string;
}) => {
  const [componentSelect, setComponentSelect] = useState(1);

  const [componentesValues, setComponentesValues] = useState<
    Array<IComponentesFT>
  >([]);

  let jsonFT = FT === "" ? "" : JSON.parse(FT);

  useEffect(() => {
    let comp: IComponentesFT[] = [];

    noComponentes.map((x, index) => {
      return comp.push({
        componentes: "C" + (index + 1),
        tipoDeIndicador:
          FT === "" ? "" : jsonFT?.componentes[index]?.tipoDeIndicador || "",
        claridad: FT === "" ? "" : jsonFT?.componentes[index]?.claridad || "",
        relevancia:
          FT === "" ? "" : jsonFT?.componentes[index]?.relevancia || "",
        economia: FT === "" ? "" : jsonFT?.componentes[index]?.economia || "",
        monitoreable:
          FT === "" ? "" : jsonFT?.componentes[index]?.monitoreable || "",
        adecuado: FT === "" ? "" : jsonFT?.componentes[index]?.adecuado || "",
        aporte_marginal:
          FT === "" ? "" : jsonFT?.componentes[index]?.aporte_marginal || "",
        dimension: FT === "" ? "" : jsonFT?.componentes[index]?.dimension || "",
        unidadDeMedida:
          FT === "" ? "" : jsonFT?.componentes[index]?.unidadDeMedida || "",
      });
    });

    setComponentesValues(comp);
  }, [noComponentes]);

  useEffect(() => {
    valoresComponenteFTFnc(componentesValues);
  }, [componentesValues]);

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
      <Box
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
            fontSize: "1.5vw",
          }}
        >
          COMPONENTE {componentSelect}
        </Typography>
      </Box>

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
          {noComponentes.map((item) => {
            return (
              <Box
                key={item}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Divider />

                <ListItemButton
                  selected={item === componentSelect ? true : false}
                  key={item}
                  onClick={() => {
                    setComponentSelect(item);
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
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    COMPONENTE {item}
                  </Typography>
                </ListItemButton>

                <Divider />
              </Box>
            );
          })}
        </List>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            width: "90%",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <FormControl
            sx={{
              width: "90%",
              height: "60%",
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
                fontSize: "0.8vw",
              }}
            >
              TIPO DE INDICADOR
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SELECCIÓN ESTRATEGICO"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]
                        ?.tipoDeIndicador === "SELECCIÓN ESTRATEGICO"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].tipoDeIndicador =
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
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]
                        ?.tipoDeIndicador === "DE GESTIÓN"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].tipoDeIndicador =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
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
                fontSize: "0.8vw",
              }}
            >
              DIMENSIÓN
            </FormLabel>

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
              <FormControlLabel
                value={"EFICIENCIA"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]?.dimension ===
                      "EFICIENCIA"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].dimension =
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
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]?.dimension ===
                      "EFICACIA"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].dimension =
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
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]?.dimension ===
                      "CALIDAD"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].dimension =
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
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]?.dimension ===
                      "ECONOMÍA"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].dimension =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <TextField
            rows={8}
            multiline
            variant="filled"
            sx={{ width: "90%", boxShadow: 2 }}
            label={"UNIDAD DE MEDIDA"}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
                fontSize: ".8vw",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
              },
            }}
            value={componentesValues[componentSelect - 1]?.unidadDeMedida || ""}
            onChange={(c) => {
              componentesValues[componentSelect - 1].unidadDeMedida =
                c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
              setComponentesValues([...componentesValues]);
            }}
          />

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
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
                fontSize: "0.8vw",
              }}
            >
              CLARIDAD
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]?.claridad === "SI"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].claridad =
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
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]?.claridad === "NO"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].claridad =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
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
                fontSize: "0.8vw",
              }}
            >
              RELEVANCIA
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]?.relevancia ===
                      "SI"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].relevancia =
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
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]?.relevancia ===
                      "NO"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].relevancia =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
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
                fontSize: "0.8vw",
              }}
            >
              ECONOMÍA
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]?.economia === "SI"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].economia =
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
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]?.economia === "NO"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].economia =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
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
                fontSize: "0.8vw",
              }}
            >
              MONITOREABLE
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]?.monitoreable ===
                      "SI"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].monitoreable =
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
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]?.monitoreable ===
                      "NO"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].monitoreable =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
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
                fontSize: "0.8vw",
              }}
            >
              ADECUADO
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]?.adecuado === "SI"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].adecuado =
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
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]?.adecuado === "NO"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].adecuado =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
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
                fontSize: "0.8vw",
              }}
            >
              APORTE MARGINAL
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]
                        ?.aporte_marginal === "SI"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].aporte_marginal =
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
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]
                        ?.aporte_marginal === "NO"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].aporte_marginal =
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
                      fontSize: "0.7vw",
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
                      componentesValues[componentSelect - 1]
                        ?.aporte_marginal === "NA"
                    }
                    onChange={(c) => {
                      componentesValues[componentSelect - 1].aporte_marginal =
                        c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};
