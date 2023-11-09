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
  setFTEncabezadoPadre,
  FT,
  MIR,
  setEncabezadoFT,
  EncabezadoValues,
}: {
  show: boolean;
  setFTEncabezadoPadre: Function;
  FT: string;
  MIR: string;
  setEncabezadoFT: Function;
  EncabezadoValues: IEncabezadoFT;
}) {
  const [encabezado, setEncabezado] = useState<IEncabezadoFT>(EncabezadoValues);

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

  const [objetivoODSselected, setObjetivoODSSelected] = useState({
    Id: "",
    ObjetivoDS: "",
  });

  const [metasODSselected, setMetasODSSelected] = useState({
    Id: "",
    MetaODS: "",
  });

  // useEffect(() => {
  //   console.log("catalogoObjetivosDS: ", catalogoObjetivosDS);
    
  //   let auxcatalogo = catalogoObjetivosDS;

  //   //let aux = auxcatalogo.find((item) => (item.Id = encabezado.objetivoODS));

  //   //if (aux) {
  //     setObjetivoODSSelected(objetivoODSselected);
  //     setEncabezado({ ...encabezado, objetivoODS: objetivoODSselected.ObjetivoDS });
  //   //}
  //   console.log("catalogoObjetivosDS", catalogoObjetivosDS);
  // }, [catalogoObjetivosDS]);

  function enCambioObjetivo(Id: string, objetivo: string) {
    setObjetivoODSSelected(objetivoODSselected);
    setEncabezado({ ...encabezado, objetivoODS: objetivo });
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
  }, [MIR]);

  const getObjetivos = (id: Array<number>) => {
    console.log("id: ", id);

    id.map((value, index) => {
      console.log("value axios: ", value);

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
          console.log("r.data.data: ", r.data.data);
          console.log("value: ", value);
          setCatalogoObjetivosDS(r.data.data);
        })
        .catch((err) => {
          console.log("value: ", value);
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
    setFTEncabezadoPadre(encabezado);
    //setValueFin(encabezado)
    console.log("encabezado1: ", encabezado);
  }, [encabezado]);

  useEffect(() => {
    setEncabezado(encabezado);
  }, [programaSER, objetivoSER, metaODSSel, objetivoODSSel]);

  return (
    <Grid
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        //display: "flex",
        width: "93vw",
        height: ["90vh", "82vh", "82vh", "82vh", "82vh"],
        boxShadow: 10,
        borderRadius: 5,

        //flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      {/* <Grid
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

      </Grid> */}

      <Grid
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
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
          <Grid
            xl={5}
            lg={5}
            md={5}
            sm={5}
            xs={10}
            item
            sx={{ fontSize: [10, 10, 10, 13, 15, 18] }}
          >
            <TextField
              onChange={(a) => {
                //setProgramaSER(a.target.value)
                encabezado.programaSER = a.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                setEncabezado({
                  ...encabezado,
                });
              }}
              value={encabezado.programaSER
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
          </Grid>

          <Grid
            xl={5}
            lg={5}
            md={5}
            sm={5}
            xs={10}
            item
            sx={{ fontSize: [10, 10, 10, 13, 15, 18] }}
          >
            <TextField
              onChange={(a) => {
                //setProgramaSER(a.target.value)
                encabezado.objetivoSER = a.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                setEncabezado({
                  ...encabezado,
                });
              }}
              value={encabezado.objetivoSER
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
          </Grid>

          <Grid
            xl={5}
            lg={5}
            md={5}
            sm={5}
            xs={10}
            item
            sx={{ fontSize: [10, 10, 10, 13, 15, 18] }}
          >
            <FormControl required fullWidth>
              <Autocomplete
                clearText="Borrar"
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                options={catalogoObjetivosDS}
                getOptionLabel={(option) => option.ObjetivoDS}
                value={objetivoODSselected}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <p
                        style={{
                          fontFamily: "MontserratRegular",
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
            xl={5}
            lg={5}
            md={5}
            sm={5}
            xs={10}
            item
            sx={{ fontSize: [10, 10, 10, 13, 15, 18] }}
          >
            <FormControl required fullWidth>
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
