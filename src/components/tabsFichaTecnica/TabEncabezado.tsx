/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  Divider,
  List,
  ListItemButton,
  Grid,
  Autocomplete,
  Typography,
} from "@mui/material";
import axios from "axios";
import { IEncabezadoFT } from "./Interfaces";

export function TabEncabezado({
 show,
  resumenEncabezadoFT,
  FT,
  MIR,
}: {
  show: boolean;
  resumenEncabezadoFT: Function;
  FT: string;
  MIR: string;
}) {
  const [encabezado, setEncabezado] = useState<Array<IEncabezadoFT>>([]);

  const [programaSER, setProgramaSER] = useState(
    FT === "" ? "" : JSON.parse(FT).encabezado.programaSER || ""
  );
  const [objetivoSER, setObjetivoSER] = useState(
    FT === "" ? "" : JSON.parse(FT).encabezado.objetivoSER || ""
  );
  const [objetivoODSSel, setObjetivoDSSel] = useState(
    FT === "" ? "" : JSON.parse(FT).encabezado.objetivoODS || ""
  );
  const [metaODSSel, setMetaODSSel] = useState(
    FT === "" ? "" : JSON.parse(FT).encabezado.metaODS || ""
  );

  const [disabledMetas, setDisabledMetas] = useState(true);

  const [catalogoObjetivosDS, setCatalogoObjetivosDS] = useState([
    { Id: "", ObjetivoDS: "" },
  ]);

  const [catalogoMetasODS, setCatalogoMetasODS] = useState([
    { Id: "", MetaODS: "" },
  ]);

  function enCambioObjetivo(Id: string, objetivo: string) {
    setObjetivoDSSel(objetivo);
    setMetaODSSel("");
    setDisabledMetas(false);
    getMetas(Id);
  }

  let jsonMir = JSON.parse(MIR);

  useEffect(() => {
    let lda: Array<number> = [];
    jsonMir.encabezado.lineas_de_accion.map((x: any, index: number) => {
      lda.push(x.Id);
    });
    getObjetivos(lda);
  }, [ MIR]);

  const getObjetivos = (id: Array<number>) => {

    console.log("id: ",id);
    
    id.map((value, index) => {
      axios
        .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-ped-columns", {
          params: {
            Col: "ObjetivosDs",
            Id: value,
          },

          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        })
        .then((r) => {
          console.log("r.data.data: ",r.data.data);
          console.log("value: ",value);
          setCatalogoObjetivosDS(r.data.data);
        })
        .catch((err) => {
          console.log("value: ",value);
        });
    });
  };

  const getMetas = (Id: string) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-ped-columns", {
        params: {
          Col: "MetasODS",
          Id: Id,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoMetasODS(r.data.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    resumenEncabezadoFT(encabezado);
  }, [resumenEncabezadoFT]);

  useEffect(() => {
    setEncabezado([
      {
        programaSER: programaSER,
        objetivoSER: objetivoSER,
        metaODS: metaODSSel,
        objetivoODS: objetivoODSSel,
      },
    ]);
  }, [programaSER, objetivoSER, metaODSSel, objetivoODSSel]);

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
      }}
    >
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
            fontSize: [ 10, 15, 18, 22, 22, 25],
          }}
        >
          ENCABEZADO
        </Typography>
      </Grid>

      <Grid
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <List
          sx={{
            width: "15vw",
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
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Divider />
            <ListItemButton
              selected
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
              <Typography sx={{fontSize: [ 10, 15, 18, 18, 22, 25], fontFamily: "MontserratMedium" }}>
                ENCABEZADO
              </Typography>
            </ListItemButton>

            <Divider />
          </Grid>
        </List>

        <Grid
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            width: "90%",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <TextField
            onChange={(a) => setProgramaSER(a.target.value)}
            value={programaSER
              .replaceAll('"', "")
              .replaceAll("'", "")
              .replaceAll("\n", "")}
            rows={8}
            multiline
            sx={{ width: "90%", boxShadow: 2 }}
            variant={"filled"}
            label="PROGRAMA SECTORIAL, ESPECIAL O REGIONAL"
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
                fontSize: "1.3vw",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
              },
            }}
          ></TextField>

          <TextField
            onChange={(v) => setObjetivoSER(v.target.value)}
            value={objetivoSER
              .replaceAll('"', "")
              .replaceAll("'", "")
              .replaceAll("\n", "")}
            rows={8}
            multiline
            sx={{ width: "90%", boxShadow: 2 }}
            variant={"filled"}
            label="OBJETIVO SECTORIAL, ESPECIAL O REGIONAL"
            InputLabelProps={{
              style: {
                fontSize: "1.3vw",
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
              },
            }}
          ></TextField>

          {/*------------------------TF2--------------------- */}

          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: 2,
              width: "90%",
              height: "20vh",
              backgroundColor: "#e2e2e2",
            }}
          >
            <FormControl sx={{ width: "30vw" }}>
              <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
                options={catalogoObjetivosDS}
                getOptionLabel={(option) => option.ObjetivoDS}
                value={{
                  Id: catalogoObjetivosDS[0].Id,
                  ObjetivoDS: objetivoODSSel,
                }}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <p
                        style={{
                          fontFamily: "MontserratRegular",
                          fontSize: ".7vw",
                        }}
                      >
                        {option.ObjetivoDS}
                      </p>
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"OBJETIVO ODS"}
                    variant="standard"
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratSemiBold",
                        fontSize: "1.3vw",
                      },
                    }}
                    sx={{
                      "& .MuiAutocomplete-input": {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                  ></TextField>
                )}
                onChange={(event, value) =>
                  enCambioObjetivo(
                    value?.Id as string,
                    (value?.ObjetivoDS as string) || ""
                  )
                }
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: 2,
              width: "90%",
              height: "20vh",
              backgroundColor: "#e2e2e2",
            }}
          >
            <FormControl sx={{ width: "30vw" }}>
              <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
                disabled={disabledMetas || objetivoODSSel === ""}
                options={catalogoMetasODS}
                getOptionLabel={(option) => option.MetaODS}
                value={{
                  Id: catalogoMetasODS[0].Id,
                  MetaODS: metaODSSel,
                }}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <p
                        style={{
                          fontFamily: "MontserratRegular",
                          fontSize: ".7vw",
                        }}
                      >
                        {option.MetaODS}
                      </p>
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"META ODS"}
                    variant="standard"
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratSemiBold",
                        fontSize: "1.3vw",
                      },
                    }}
                    sx={{
                      "& .MuiAutocomplete-input": {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                  ></TextField>
                )}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
                onChange={(event, value) => {
                  setMetaODSSel((value?.MetaODS as string) || "");
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
