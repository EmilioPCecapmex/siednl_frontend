import { useEffect, useState } from "react";
import { FormControl, TextField, Box, Autocomplete } from "@mui/material";
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

  const [programaSER, setProgramaSER] = useState(FT === '' ? '' : JSON.parse(FT).encabezado.programaSER || '');
  const [objetivoSER, setObjetivoSER] = useState(FT === '' ? '' : JSON.parse(FT).encabezado.objetivoSER || '');
  const [objetivoODSSel, setObjetivoDSSel] = useState(FT === '' ? '' : JSON.parse(FT).encabezado.ObjetivoODS || '');
  const [metaODSSel, setMetaODSSel] = useState(FT === '' ? '' : JSON.parse(FT).encabezado.metaODS || '');
  const [unidadDeMedida, setUnidadDeMedida] = useState(FT === '' ? '' : JSON.parse(FT).encabezado.unidadDeMedida || '');

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
  }, [show, MIR]);

  const getObjetivos = (id: Array<number>) => {
    id.map((value, index) => {
      axios
        .get("http://10.200.4.199:8000/api/ped-columns", {
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
      .get("http://10.200.4.199:8000/api/ped-columns", {
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
        unidadDeMedida: unidadDeMedida,
      },
    ]);
  }, [programaSER, objetivoSER, metaODSSel, objetivoODSSel,unidadDeMedida]);

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        width: "75vw",
        height: "75vh",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        backgroundColor: "#fff",
        boxShadow: 20,
        borderRadius: 5,
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "4fr 1fr 1fr 1fr",
      }}
    >
      {/*------------------------TF1--------------------- */}

      <TextField
        onChange={(a) => setProgramaSER(a.target.value)}
        value={programaSER}
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

      <TextField
        onChange={(v) => setObjetivoSER(v.target.value)}
        value={objetivoSER}
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

      {/*------------------------TF2--------------------- */}

      <Box
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
                    fontSize: ".8vw",
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
      </Box>

      <Box
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
                    fontSize: ".8vw",
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
        
      </Box>
      <TextField
        onChange={(a) => setUnidadDeMedida(a.target.value)}
        value={unidadDeMedida}
        rows={4}
        multiline
        sx={{mt:"2vh", width: "50%", boxShadow: 2 }}
        variant={"filled"}
        label="UNIDAD DE MEDIDA"
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
    </Box>
  );
}
