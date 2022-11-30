import { useEffect, useState } from "react";
import { FormControl, TextField, Box, Autocomplete } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { IEncabezadoFT } from "./Interfaces";



export function TabEncabezado({
  show,
  resumenEncabezadoFT,
  FT,
  MIR
}: {
  show: boolean;
  resumenEncabezadoFT: Function;
  FT: string;
  MIR: string;
}) {

  const [encabezado, setEncabezado] = useState<Array<IEncabezadoFT>>([]);

  const [programaSER, setProgramaSER] = useState("");
  const [objetivoSER, setObjetivoSER] = useState("");
  const [objetivoODSSel, setObjetivoODSSel] = useState("");
  const [metaODSSel, SetMetaODSSel] = useState("");


  

  const [catalogoLineasDeAccion, setCatalogoLineasDeAccion] = useState([
    { Id: "0", LineaDeAccion: "" },
  ]);
  const [catalogoObjetivosDS, setCatalogoObjetivosDS] = useState([
    { Id: "0", ObjetivoDS: "" },
  ]);
  const [catalogoMetasODS, setCatalogoMetasODS] = useState([
    { Id: "0", MetaODS: "" },
  ]);

  const [lineaDeAccion, setLineaDeAccion] = useState("");
  const [objetivoDS, setObjetivoODS] = useState("");
  const [metaODS, setMetaODS] = useState("");

  // const getIdObjetivoOds = (Description: string) => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/mir-id", {
  //       params: {
  //         Col: "Instituciones",
  //         Descripcion: Description,
  //       },
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       setObjetivoODS(r.data.data[0].NombreInstitucion);
  //     })
  //     .catch((err) => {});
  // };

  // const getIdMetaOds = (Description: string) => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/mir-id", {
  //       params: {
  //         Col: "Instituciones",
  //         Descripcion: Description,
  //       },
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       setMetaODS(r.data.data[0].NombreInstitucion);
  //     })
  //     .catch((err) => {});
  // };

  let jsonMir = JSON.parse(MIR);
  
  useEffect(() => {
    let lda: Array<number> = [];
    jsonMir.encabezado.lineas_de_accion.map((x: any, index: number) => {
      lda.push(x.Id);
    });

    // console.log(
    //   JSON.stringify(lda).replace("[", "").replace("]", "")
    // );
    setLineaDeAccion(JSON.stringify(lda).replace("[", "").replace("]", ""));
    getObjetivos(JSON.stringify(lda).replace("[", "").replace("]", ""));
  }, [MIR]);

  const getObjetivos = (id: string) => {
    console.log(id);
    
    axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/api/ped-columns", {
      params: {
        Col: "ObjetivosDs",
        Id: id,
      },
      headers: {
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      console.log(r.data);
      
      setCatalogoObjetivosDS(r.data.data);
    })
    .catch((err) => {
    });
  };

  const getMetas = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/metasODS", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoMetasODS(r.data.data);
      });
  };

useEffect(() => {
  
resumenEncabezadoFT(encabezado)

  
}, [resumenEncabezadoFT])


useEffect(() => {
  getMetas()
}, [])

// useEffect(() => {
//   getObjetivos()
// }, [])

useEffect(() => {
  setEncabezado(
    [
      {
        programaSER: programaSER,
        objetivoSER: objetivoSER,
        catalogoMetaODS: metaODSSel,
        catalogoObjetivoODS: objetivoODSSel,
      }
    ]
  );

}, [programaSER, objetivoSER, metaODSSel, objetivoODSSel])



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
    }}>


      {/*------------------------TF1--------------------- */}

      <TextField
      onChange={
        (a)=>setProgramaSER(a.target.value)
      }
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

      >
      
    </TextField>

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
            disabled={false}
            disablePortal
            size="small"
            options={catalogoObjetivosDS}
            getOptionLabel={(option) => option.ObjetivoDS}
            renderOption={(props: any, option: any) => {
              return (
                <li {...props}>
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
            isOptionEqualToValue={(option, value) => option.Id === value.Id}
          />
        </FormControl>
      </Box>

      {/*------------------------TF3--------------------- */}
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
            disabled={false}
            disablePortal
            size="medium"
            options={catalogoMetasODS}
            getOptionLabel={(option) => option.MetaODS}
            renderOption={(props: any, option: any) => {
              return (
                <li {...props}>
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
          />
        </FormControl>
      </Box>

  <TextField 
  onChange={
    (v)=>setObjetivoSER(v.target.value)
  }
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
  }}>
      
    </TextField>


{/*------------------------TF2--------------------- */}

<FormControl sx={{ gridRow: "2", width: "20vw", mt: "6vh" }}>
    <Autocomplete
      disabled={false}
      disablePortal
      size="small"
      options={catalogoObjetivosDS}
      getOptionLabel={(option) => option.ObjetivoDS}
      renderOption={(props:any, option:any) => {
        return (
          <li {...props}>
            <p
              style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
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
        >

        </TextField>
      )}
      onChange={(event, value) => setObjetivoODSSel(value?.ObjetivoDS as string)}
      
      isOptionEqualToValue={(option, value) => option.Id === value.Id}
    />
  </FormControl>

{/*------------------------TF3--------------------- */}
<FormControl sx={{ gridRow: "2", width: "20vw", mt: "6vh" }}>
    <Autocomplete
      disabled={false}
      disablePortal
      size="small"
      options={catalogoMetasODS}
      getOptionLabel={(option) => option.MetaODS}
      renderOption={(props:any, option:any) => {
        return (
          <li {...props}>
            <p
              style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
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
        >

        </TextField>
      )}
      isOptionEqualToValue={(option, value) => option.Id === value.Id}
      onChange={(event, value) => {
        SetMetaODSSel(value?.MetaODS as string)}}

    />
  </FormControl>


{/*------------------------TF4--------------------- */}
  </Box>
);
}
