import { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  Grid,
  Autocomplete,
  Typography,
} from "@mui/material";
import axios from "axios";
import { IEncabezadoFT, IFTEdit } from "./Interfaces";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";


interface IObjetivoDS {
  Id: string;
  ObjetivoDS: string;
}
interface IMetaODS {
  Id: string;
  MetaODS: string;
}
const newObjetivoDS = { Id: "", ObjetivoDS: "" };
const newMetaODS = { Id: "", MetaODS: "" };

export function TabEncabezado({
  edit,
  setFTEncabezadoPadre,
  MIR,
  EncabezadoValues,
  ftEditPadre,
}: {
  edit: boolean;
  setFTEncabezadoPadre: Function;
  MIR: string;
  EncabezadoValues: IEncabezadoFT;
  ftEditPadre: IFTEdit;
}) {
  const [encabezado, setEncabezado] = useState<IEncabezadoFT>(EncabezadoValues);

  useEffect(()=>{console.log('EncabezadoValues',EncabezadoValues);
  },[])


  const [disabledMetas, setDisabledMetas] = useState(true);

  const [catalogoMetasODS, setCatalogoMetasODS] = useState<IMetaODS[]>([]);
  const [metaODSSelected, setMetaODSSelected] = useState<IMetaODS>(newMetaODS);

  const [catalogoObjetivosDS, setCatalogoObjetivosDS] = useState<IObjetivoDS[]>(
    []
  );
  const [objetivoODSselected, setObjetivoODSSelected] =
    useState<IObjetivoDS>(newObjetivoDS);

  useEffect(() => {
    let findObjetivoODS = catalogoObjetivosDS.find(
      (item) => item.ObjetivoDS === encabezado.objetivoODS
    );
    setObjetivoODSSelected(findObjetivoODS || newObjetivoDS);
  }, [catalogoObjetivosDS]);

  useEffect(() => {
    if (objetivoODSselected.Id !== "") {
      setEncabezado({
        ...encabezado,
        objetivoODS: objetivoODSselected.ObjetivoDS,
      });
      setMetaODSSelected(newMetaODS);
      setDisabledMetas(false);
      getMetas(objetivoODSselected.Id);
    }
  }, [objetivoODSselected]);

  useEffect(() => {
    let findMetaODS = catalogoMetasODS.find(
      (item) => item.MetaODS === encabezado.metaODS
    );
    setMetaODSSelected(findMetaODS || newMetaODS);
  }, [catalogoMetasODS]);

  useEffect(() => {
    if (metaODSSelected.Id !== "") {
      setEncabezado({ ...encabezado, metaODS: metaODSSelected.MetaODS });
    }
  }, [metaODSSelected]);

  useEffect(() => {
    setEncabezado(EncabezadoValues);
  }, [EncabezadoValues]);

  let jsonMir = JSON.parse(MIR);

  useEffect(() => {
    let lda: Array<number> = [];
    jsonMir.encabezado.lineas_de_accion.map((x: any, index: number) => {
      lda.push(x.Id);
    });
    getObjetivos(lda);
  }, [MIR]);

  const getObjetivos = (id: Array<number>) => {
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
          setCatalogoObjetivosDS(r.data.data);
        })
        .catch((err) => {});
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
   
  }, [encabezado]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid
      sx={{
      
        width: "93vw",
        height: ["90vh", "82vh", "82vh", "82vh", "82vh"],
        boxShadow: 10,
        borderRadius: 5,
        ...(!isSmallScreen && {
          height: "85%",
          overflow: "auto",
          // Otros estilos específicos para pantallas pequeñas
        }),
      
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
            fontSize: [10, 15, 18, 22, 22, 25],
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
              disabled={edit && !ftEditPadre?.encabezado?.programaSER}
              onChange={(a) => {
                
                encabezado.programaSER = a.target.value
                  .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "")
                .trimEnd();
                setEncabezado({
                  ...encabezado,
                });
              }}
              value={encabezado.programaSER
                .replaceAll('"', "")
                .replaceAll("'", "")
                .trimEnd()}
                
              rows={8}
              multiline
              sx={{ width: "90%", boxShadow: 2 }}
              variant={"filled"}
              label="PROGRAMA SECTORIAL, ESPECIAL O REGIONAL"
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
              disabled={edit && !ftEditPadre?.encabezado?.programaSER}
              onChange={(a) => {
               
                encabezado.objetivoSER = a.target.value
                  .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "")
                .trimEnd()
                  .trimEnd();
                  
                setEncabezado({
                  ...encabezado,
                });
              }}
              value={encabezado.objetivoSER
                .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "")
                .trimEnd()}
               
                
              rows={8}
              multiline
              sx={{ width: "90%", boxShadow: 2 }}
              variant={"filled"}
              label="OBJETIVO SECTORIAL, ESPECIAL O REGIONAL"
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
                    disabled={edit && !ftEditPadre?.encabezado?.objetivoODS}
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
                onChange={(event, value) => {
                  setObjetivoODSSelected(value || newObjetivoDS);
                  
                }}
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
                disabled={
                  disabledMetas && objetivoODSselected.ObjetivoDS === ""
                }
                options={catalogoMetasODS}
                getOptionLabel={(option) => option.MetaODS}
                value={metaODSSelected}
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
                    disabled={edit && !ftEditPadre?.encabezado?.metaODS}
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
                  setMetaODSSelected(value || newMetaODS);
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
