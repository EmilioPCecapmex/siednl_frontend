/* eslint-disable array-callback-return */

import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  Grid,
  Autocomplete,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { IMIR, IMIREdit } from "./IMIR";
import Stack from "@mui/material/Stack";
import { ILista, IListaProgramas } from "./IListas";
import { getListPedColumns, getLista, getListasLogin } from "./services mir/servicesMIR";

export interface IEncabezado {
  ejercicioFiscal: ILista;
  entidad: ILista;
  programa:IListaProgramas;
  eje: ILista;
  tema: ILista;
  objetivo: ILista;
  estrategia: ILista;
  lineas_de_accion: Array<ILista>;
  beneficiario: ILista;
  conac: string;
  consecutivo: string;
  anticorrupcion: string;
}

export function TabEncabezado({
  show,
  MIR,
  setMIR,
  mirEdit,
}: {
  show: boolean;
  MIR: IMIR;
  setMIR: Function;
  mirEdit: IMIREdit;
}) {
  // const [nombreArchivo, setNombreArchivo] = useState(
  //   "ARRASTRE O DE CLICK AQUÍ PARA SELECCIONAR ARCHIVO"
  // );
  const objetoVacio :ILista={Id:"",Label:""}
  // const Toast = Swal.mixin({
  //   toast: true,
  //   position: "top-end",
  //   showConfirmButton: false,
  //   timer: 2000,
  //   timerProgressBar: true,
  //   didOpen: (toast) => {
  //     toast.addEventListener("mouseenter", Swal.stopTimer);
  //     toast.addEventListener("mouseleave", Swal.resumeTimer);
  //   },
  // });

  //Cuando se haga un cambio, setear el valor y borrar los siguentes campos
  // function enCambioAnio(Id: string, Anio: string) {
  //   setAnioFiscal(Anio);
  // }


  // function enCambioPrograma(Id: string, Prog: string) {
  //   setConac("");
  //   setConsecutivo("");
  //   if (Prog !== "") {
  //     getIdPrograma(Prog);
  //   }
  // }
 
  
  
  

  // function enCambioLineasDeAccion(Id: string, LDA: Array<ILineasDeAccion>) {
  //   setLineaDeAccion([]);
  //   setLineaDeAccion(LDA);
  // }

  // function enCambioBeneficiario(Id: string, Ben: string) {
  //   setBeneficiario(Ben);
  // }

  // function enCambioFile(event: any) {
  //   setUploadFile(event.target.files[0]);
  //   setLineaDeAccion([]);

  //   if (event.target.value !== "") {
  //     setNombreArchivo(event.target.value.split("\\")[2]);
  //   }
  //   nombreArchivo == null || uploadFile == null
  //     ? setDisabledButton(true)
  //     : setDisabledButton(false);
  // }


  //Desactivar si el anterior no tiene value
  const [disabledProgramas, setDisabledProgramas] = useState(true);
  const [disabledTematicas, setDisabledTematicas] = useState(true);
  const [disabledObjetivos, setDisabledObjetivos] = useState(true);
  const [disabledEstrategias, setDisabledEstrategias] = useState(true);
  const [disabledLineasDeAccion, setDisabledLineasDeAccion] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);

  //Values
  // const [anioFiscal, setAnioFiscal] = useState(
  //   MIR.encabezado?.ejercicioFiscal || new Date().getFullYear().toString()
  // );
  // const [institution, setInstitution] = useState(
  //   MIR.encabezado?.IdEntidad || ""
  // );

  const [anticorrupcion, setAnticorrupcion] = React.useState(MIR.encabezado?.anticorrupcion || "NO");

  //Catalogos
  const [catalogoAniosFiscales, setCatalogoAniosFiscales] = useState<Array<ILista>>([]);
  const [anioFiscal, setAnioFiscal] = useState<ILista>(MIR.encabezado.ejercicioFiscal||{Id:new Date().getFullYear().toString(),Label:new Date().getFullYear().toString()});

  const [catalogoInstituciones, setCatalogoInstituciones] = useState<Array<ILista>>([]);
  const [entidadSeleccionada, setEntidadSeleccionada] = useState(MIR.encabezado?.entidad ||{Id: localStorage.getItem("IdEntidad") || "", Label: localStorage.getItem("Entidad") || ""});
  
  const [catalogoProgramas, setCatalogoProgramas] = useState<Array<IListaProgramas>>([]);
  const [programa, setPrograma] = useState<IListaProgramas>(MIR.encabezado?.programa||{...objetoVacio,Conac:"",Consecutivo:""});

  const [conac, setConac] = useState(MIR.encabezado?.conac || "");

  const [consecutivo, setConsecutivo] = useState(MIR.encabezado?.consecutivo || "");

  const [catalogoEjes, setCatalogoEjes] = useState<Array<ILista>>([]);
  const [eje, setEje] = useState<ILista>(MIR.encabezado?.eje || objetoVacio);

  const [catalogoTematicas, setCatalogoTematicas] = useState<Array<ILista>>([]);
  const [tematica, setTematica] = useState<ILista>(MIR.encabezado?.tema || objetoVacio);

  const [catalogoObjetivos, setCatalogoObjetivos] = useState<Array<ILista>>([]);
  const [objetivo, setObjetivo] = useState<ILista>(MIR.encabezado?.objetivo || objetoVacio);

  const [catalogoEstrategias, setCatalogoEstrategias] = useState<Array<ILista>>([]);
  const [estrategia, setEstrategia] = useState<ILista>(MIR.encabezado?.estrategia ||objetoVacio);

  const [catalogoLineasDeAccion, setCatalogoLineasDeAccion] = useState<Array<ILista>>([]);
  const [lineaDeAccion, setLineaDeAccion] = useState<Array<ILista>>(MIR.encabezado?.lineas_de_accion ||[]);

  const [catalogoBeneficiarios, setCatalogoBeneficiarios] = useState<Array<ILista>>([]);
  const [beneficiario, setBeneficiario] = useState<ILista>(MIR.encabezado?.beneficiario || objetoVacio);

  useEffect(() => {
    getLista("AniosFiscales","",setCatalogoAniosFiscales);
    getListasLogin({Tabla:"Entidades",ValorCondicion:""},setCatalogoInstituciones);
    getListPedColumns({Col:"Ejes",Id:""},setCatalogoEjes,()=>{});
    getLista("Beneficiario","",setCatalogoBeneficiarios);
    setEje(MIR.encabezado?.eje || objetoVacio);
    // console.log("tema",tematica);
    // setTematica(MIR.encabezado?.tema || objetoVacio);
    // console.log("MIR",MIR);
    
  }, [])

  useEffect(() => {
    if (entidadSeleccionada?.Id) {
      getLista("ProgramasXInstitucion",entidadSeleccionada?.Id,setCatalogoProgramas);
      //setPrograma({...objetoVacio,Conac:"",Consecutivo:""});
      setConac("");
      setConsecutivo("");
      setDisabledProgramas(false);
    }
  }, [entidadSeleccionada?.Id]);

  useEffect(()=>{
    // setTematica(objetoVacio);
    setDisabledObjetivos(true);
    //setObjetivo(objetoVacio);
    setDisabledEstrategias(true);
    //setEstrategia(objetoVacio);
    setDisabledLineasDeAccion(true);
    //setLineaDeAccion([]);
    getListPedColumns({Col:"Temáticas",Id:eje.Id},setCatalogoTematicas,setDisabledTematicas);
    setDisabledTematicas(false);
  },[eje])

  useEffect(()=> {
    // setObjetivo(objetoVacio);
    setDisabledEstrategias(true);
    //setEstrategia(objetoVacio);
    setDisabledLineasDeAccion(true);
    getListPedColumns({Col:"Objetivos",Id:tematica.Id},setCatalogoObjetivos,setDisabledObjetivos);
    setDisabledObjetivos(false);
  },[tematica])

  useEffect(()=>{
    
    // setEstrategia(objetoVacio);
    setDisabledLineasDeAccion(true);
    //setLineaDeAccion([]);
    getListPedColumns({Col:"Estrategias",Id:objetivo.Id},setCatalogoEstrategias,setDisabledEstrategias);
    setDisabledEstrategias(false);
  },[objetivo])
  
  useEffect(()=>{
    //setLineaDeAccion([]);
    getListPedColumns({Col:"Lineas de Acción",Id:estrategia.Id},setCatalogoLineasDeAccion,setDisabledLineasDeAccion);
    setDisabledLineasDeAccion(false);
  },[estrategia])

  const onClearLineasDeAccion = () => {
    setLineaDeAccion([]);
  };
  
  function RestaurarValores(tipo:string){
    switch(tipo){
      case "Eje":
        setTematica(objetoVacio);
        setObjetivo(objetoVacio);
        setEstrategia(objetoVacio);
        setLineaDeAccion([]);
        break;
      case 'Tematica':
        setObjetivo(objetoVacio);
        setEstrategia(objetoVacio);
        setLineaDeAccion([]);
        break;
      case 'Objetivo':
        setEstrategia(objetoVacio);
        setLineaDeAccion([]);
        break;
      case 'Estrategia':
        setLineaDeAccion([]);
        break;
    }
    
  }

  // const replica = catalogoLineasDeAccion; //warning

  // const [uploadFile, setUploadFile] = React.useState("");
  // const [errorMsg, setErrorMsg] = useState("");
  // const [showAlert, setShowAlert] = useState(false);

 

  //Obtener catálogos por id dependiendo de la seleccion anterior
  // const getAniosFiscales = () => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/aniosFiscales", {
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       setCatalogoAniosFiscales(r.data.data);
  //     });
  // };
  // cambiar por entidad
  

  // const getProgramas = (id: string) => {
  //   if (id !== undefined) {
  //     axios
  //       .get(
  //         process.env.REACT_APP_APPLICATION_BACK +
  //         "/api/list-programasInstituciones",
  //         {
  //           params: {
  //             IdEntidad: id,
  //           },
  //           headers: {
  //             Authorization: localStorage.getItem("jwtToken") || "",
  //           },
  //         }
  //       )
  //       .then((r) => {
  //         setCatalogoProgramas(r.data.data);
  //         console.log("CATALOGO PROGRAMAS",r.data.data);
          
  //       })
  //       .catch((err) => {
  //         Toast.fire({
  //           icon: "error",
  //           title: "No existen programas asociados a esta institución.",
  //         });
  //         setDisabledProgramas(true);
  //       });
  //   }
  // };
  // no se porque este no lleva Id:(id: string)
  
  // const getTematicas = (id: string) => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-ped-columns", {
  //       params: {
  //         Col: "Temáticas",
  //         Id: id,
  //       },
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       setCatalogoTematicas(r.data.data);
  //     })
  //     .catch((err) => {
  //       setDisabledTematicas(true);
  //     });
  // };
  // const getObjetivos = (id: string) => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-ped-columns", {
  //       params: {
  //         Col: "Objetivos",
  //         Id: id,
  //       },
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       setCatalogoObjetivos(r.data.data);
  //     })
  //     .catch((err) => {
  //       setDisabledObjetivos(true);
  //     });
  // };
  // const getEstrategias = (id: string) => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-ped-columns", {
  //       params: {
  //         Col: "Estrategias",
  //         Id: id,
  //       },
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       setCatalogoEstrategias(r.data.data);
  //     })
  //     .catch((err) => {
  //       setDisabledEstrategias(true);
  //     });
  // };
  // const getLineasDeAccion = (id: string) => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-ped-columns", {
  //       params: {
  //         Col: "Lineas de Acción",
  //         Id: id,
  //       },
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       setCatalogoLineasDeAccion(r.data.data);
  //     })
  //     .catch((err) => {
  //       setDisabledLineasDeAccion(true);
  //     });
  // };
  // const getBeneficiarios = () => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-beneficiario", {
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       setCatalogoBeneficiarios(r.data.data);
  //     });
  // };

  //Obtener Id de la descripción extraida de la MIR
  // const getIdInstitucion = (Description: string) => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/id-mir", {
  //       params: {
  //         Col: "Entidades",
  //         Descripcion: Description || localStorage.getItem("IdEntidad"),
  //       },
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {getIdEje
  //       // setInstitution(r.data.data[0].NombreInstitucion);
  //     })
  //     .catch((err) => { });
  // };
  // const getIdPrograma = (Description: string) => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/id-mir", {
  //       params: {
  //         Col: "Programas",
  //         Descripcion: Description,
  //       },
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       setPrograma(r.data.data[0].NombrePrograma);
  //       setConac(r.data.data[0].Conac);
  //       setConsecutivo(r.data.data[0].Consecutivo);
  //     });
  // };
  // const getIdEje = (Description: string) => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/id-mir", {
  //       params: {
  //         Col: "Ejes",
  //         Descripcion: Description,
  //       },
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       setEje(r.data.data[0]?.Eje);
  //       getTematicas(r.data.data[0]?.Id);
  //       setDisabledTematicas(false);
  //     });
  // };
  // const getIdTematica = (Description: string) => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/id-mir", {
  //       params: {
  //         Col: "Temáticas",
  //         Descripcion: Description,
  //       },
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       setTematica(r.data.data[0].Tematica);
  //       getObjetivos(r.data.data[0].Id);
  //       setDisabledObjetivos(false);
  //     });
  // };
  // const getIdObjetivo = (Description: string) => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/id-mir", {
  //       params: {
  //         Col: "Objetivos",
  //         Descripcion: Description,
  //       },
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       setObjetivo(r.data.data[0].Objetivo);
  //       getEstrategias(r.data.data[0].Id);
  //       setDisabledEstrategias(false);
  //     });
  // };
  // const getIdEstrategia = (Description: string) => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/id-mir", {
  //       params: {
  //         Col: "Estrategias",
  //         Descripcion: Description,
  //       },
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       setEstrategia(r.data.data[0]?.Estrategia);
  //       getLineasDeAccion(r.data.data[0]?.Id);
  //     });
  // };
  // const getIdLineaDeAccion = (Description: string) => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/id-mir", {
  //       params: {
  //         Col: "Lineas de Acción",
  //         Descripcion: Description,
  //       },
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       if (r.data.data.length !== 0) {
  //         lineaDeAccion.push(r.data.data[0]);
  //         setDisabledLineasDeAccion(false);
  //       }
  //     })
  //     .catch((err) => { });
  // };

  // const getIdBeneficiario = (Description: string) => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/id-mir", {
  //       params: {
  //         Col: "Beneficiarios",
  //         Descripcion: Description,
  //       },
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       setBeneficiario(r.data.data[0].Beneficiario);
  //     });
  // };
  //Cuando se da click en cargar archivo
  // const submitForm = (event: any) => {
  //   setDisabledButton(true);

  //   event.preventDefault();
  //   // setLoadingFile(true);

  //   const dataArray = new FormData();
  //   dataArray.append("file", uploadFile);

  //   axios
  //     .post(process.env.REACT_APP_APPLICATION_MID + "/upload", dataArray, {
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then(({ data }) => {
  //       setMIR((MIR: IMIR) => ({
  //         ...MIR,
  //         ...{ fin: data.fin[0] },
  //         ...{ proposito: data.propositos[0] },
  //         ...{ componentes: data.componentes },
  //         ...{ actividades: data.actividades },
  //         ...{ componenteActividad: data.componenteActividad },
  //       }));
  //       setAnticorrupcion(data.encabezado[0].anticorrupcion);
  //       getIdInstitucion(data.encabezado[0].institucion);
  //       getIdPrograma(data.encabezado[0].nombre_del_programa);
  //       getIdEje(data.encabezado[0].eje);
  //       getIdTematica(data.encabezado[0].tema);
  //       getIdObjetivo(data.encabezado[0].objetivo);
  //       getIdEstrategia(data.encabezado[0].estrategia);
  //       setTimeout(() => {
  //         data.encabezado[0]?.lineas_de_accion
  //           ?.split(".\n")
  //           .map((value: string) => {
  //             if (value !== "") {
  //               getIdLineaDeAccion(value);
  //             }
  //           });
  //         // setLoadingFile(false);
  //         getIdBeneficiario(data.encabezado[0].beneficiario);
  //       }, 1500);
  //     })
  //     .catch((error) => {
  //       setErrorMsg(error.response.data || "Formato de archivo incorrecto");
  //       setShowAlert(true);
  //       setDisabledButton(true);
  //       // setLoadingFile(false);
  //     });
  // };

  useEffect(() => {
    setMIR((MIR: IMIR) => ({
      ...MIR,
      ...{
        encabezado: {
          ejercicioFiscal: anioFiscal,
          entidad: entidadSeleccionada,
          programa: programa,
          eje: eje,
          tema: tematica,
          objetivo: objetivo,
          estrategia: estrategia,
          lineas_de_accion: lineaDeAccion,
          beneficiario: beneficiario,
          conac: conac,
          consecutivo: consecutivo,
          anticorrupcion: anticorrupcion,
        },
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    anioFiscal.Id,
    entidadSeleccionada.Id,
    programa.Id,
    eje.Id,
    tematica.Id,
    objetivo.Id,
    estrategia.Id,
    lineaDeAccion,
    beneficiario.Id,
    conac,
    consecutivo,
    anticorrupcion,
  ]);

  useEffect(() => {
    console.log("MIR",MIR.encabezado);
    
  }, [MIR.encabezado])
  

  // const [loadingFile, setLoadingFile] = useState(false);

  return (
    <Grid
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        width: "93vw",
        height: "82vh",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        backgroundColor: "#fff",
        boxShadow: 20,
        borderRadius: 5,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "1fr 1fr 1fr 2fr",
      }}
    >
      <Grid
        sx={{
          width: "5vw",
          height: "3vh",
          position: "absolute",
          top: "1vh",
          right: "1vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Button href="/files/MIR_2023.xlsx" target="_blank" download>
          <Typography sx={{ fontFamily: "MontserratMedium", color: "#616161" }}>
            Plantilla
          </Typography>
        </Button> */}
      </Grid>

      <FormControl sx={{ gridRow: "1", width: "20vw" }}>
        <Autocomplete
          disabled={mirEdit?.encabezado.ejercicioFiscal}
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          disablePortal
          size="small"
          options={catalogoAniosFiscales}
          getOptionLabel={(option) => option.Label || ""}
          value={anioFiscal}
          getOptionDisabled={(option) => {
            if (option.Id === "") {
              return true;
            }
            return false;
          }}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.Id}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.Label}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="EJERCICIO FISCAL"
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
          onChange={(event, value) =>setAnioFiscal(value||objetoVacio)}
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />
      </FormControl>
      {/* 
      <Grid
        sx={{
          gridColumn: "2/4",
          width: "30vw",
          height: "10vh",
          border: 1,
          borderRadius: 3,
          borderColor: "#af8c55",
          borderStyle: "dashed",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: "6vh",
          cursor: "pointer",
        }}
      >
        {showAlert ? (
          <Alert
            sx={{ borderRadius: 5, width: "80%", alignItems: "center", mt: 2 }}
            severity="error"
            onClose={() => {
              setShowAlert(false);
              setNombreArchivo(
                "Arrastre o de click aquí para seleccionar archivo"
              );
            }}
          >
            {errorMsg}
          </Alert>
        ) : (
          <Typography
            sx={{
              position: "absolute",
              fontFamily: "MontserratLight",
              fontSize: ".7vw",
              textAlign: "center",
              width: "28vw",
              mb: 1,
            }}
          >
            {nombreArchivo}
          </Typography>
        )}

        <input
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={(v) => enCambioFile(v)}
          style={{
            color: "#000",
            opacity: 0,
            width: "100%",
            height: "10vh",
            cursor: "pointer",
          }}
        />
        {disabledButton ? null : (
          <Button
            disabled={disabledButton}
            onClick={submitForm}
            sx={{
              backgroundColor: "#b0e2ff8f",
              color: "black",
              height: "3vh",
              width: "10vw",
              mb: 0.5,
            }}
          >
            Cargar
          </Button>
        )}
        
        <Grid
          sx={{ position: "absolute" }}
          visibility={loadingFile ? "visible" : "hidden"}
        >
          <CircularProgress />
        </Grid>
      </Grid> */}

      <FormControl sx={{ width: "20vw" }}>
        <Autocomplete
          disabled={mirEdit?.encabezado.institucion}
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          disablePortal
          options={catalogoInstituciones}
          getOptionLabel={(option) => option.Label || ""}
          value={entidadSeleccionada}
          size="small"
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.Id}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.Label?.toUpperCase()}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"INSTITUCIÓN"}
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
                  textTransform: "uppercase",
                },
              }}
            ></TextField>
          )}
          onChange={(event, value) => {
            setEntidadSeleccionada({ Id: value?.Id || "", Label: value?.Label || "" })
          }
          }
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />
      </FormControl>

      <FormControl sx={{ width: "20vw" }}>
        <Autocomplete
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          disabled={
            mirEdit?.encabezado.nombre_del_programa || disabledProgramas
          }
          options={catalogoProgramas}
          size="small"
          getOptionLabel={(option) => option.Label || ""}
          value={programa}
          onChange={(event, value) => {
            setConac(value?.Conac||"")
            setConsecutivo(value?.Consecutivo||"")
            setPrograma(value||{...objetoVacio,Conac:"",Consecutivo:""})
          }}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.Id}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.Label}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"PROGRAMA"}
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

      <FormControlLabel
        label="ANTICORRUPCIÓN"
        control={
          <Checkbox
            checked={anticorrupcion === "SI"}
            onChange={() => {
              anticorrupcion === "NO"
                ? setAnticorrupcion("SI")
                : setAnticorrupcion("NO");
            }}
          />
        }
      />
      <TextField
        disabled
        size="small"
        label={"CONAC:"}
        value={conac}
        sx={{ width: "25%" }}
      />
      <TextField
        disabled
        size="small"
        label={"CLASIFICACIÓN PROGRAMÁTICA:"}
        value={consecutivo}
        sx={{ width: "70%" }}
      />

      <FormControl required sx={{ width: "20vw" }}>
        <Autocomplete
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          disablePortal
          disabled={mirEdit?.encabezado.eje}
          size="small"
          options={catalogoEjes}
          getOptionLabel={(option) => option.Label || ""}
          value={eje}
          getOptionDisabled={(option) => {
            if (option.Id === "0") {
              return true;
            }
            return false;
          }}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.Id}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.Label}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"EJE"}
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
            />
          )}
          onChange={(event, value) => {setEje(value||objetoVacio);RestaurarValores('Eje');}}
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />
      </FormControl>

      <FormControl required sx={{ width: "20vw" }}>
        <Autocomplete
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          disabled={
            (mirEdit?.encabezado.tema && tematica.Id !== "") || disabledTematicas
          }
          options={catalogoTematicas}
          size="small"
          getOptionLabel={(option) => option.Label || ""}
          value={tematica}
          getOptionDisabled={(option) => {
            if (option.Id === "0") {
              return true;
            }
            return false;
          }}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.Id}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.Label.toUpperCase()}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"TEMÁTICA"}
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
                  textTransform: "uppercase",
                },
              }}
            />
          )}
          onChange={(event, value) => {setTematica(value||objetoVacio);RestaurarValores('Tematica');}}
          isOptionEqualToValue={(option, value) =>
            option.Id === value.Id
          }
        />
      </FormControl>

      <FormControl required sx={{ width: "20vw" }}>
        <Autocomplete
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          disabled={
            (mirEdit?.encabezado.objetivo && objetivo.Id !== "") ||
            disabledObjetivos
          }
          options={catalogoObjetivos}
          getOptionLabel={(option) => option.Label || ""}
          value={objetivo}
          size="small"
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.Id}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.Label.toUpperCase()}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"OBJETIVO"}
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
                  textTransform: "uppercase",
                },
              }}
            />
          )}
          onChange={(event, value) =>{setObjetivo(value||objetoVacio);RestaurarValores('Objetivo');}}
          isOptionEqualToValue={(option, value) =>
            option.Id === value.Id
          }
        />
      </FormControl>

      <FormControl required sx={{ width: "20vw" }}>
        <Autocomplete
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          disabled={
            (mirEdit?.encabezado.estrategia && estrategia.Id !== "") ||
            disabledEstrategias
          }
          options={catalogoEstrategias}
          size="small"
          getOptionLabel={(option) => option.Label || ""}
          value={estrategia}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.Id}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.Label}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"ESTRATEGIA"}
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
            />
          )}
          onChange={(event, value) => {setEstrategia(value||objetoVacio);RestaurarValores('Estrategia');}}
          isOptionEqualToValue={(option, value) =>
            option.Id === value.Id
          }
        />
      </FormControl>
          
      <FormControl required>
        {/*---------------------------------Aqui esta el error de borrar lineas da aciion199----------------------------------*/}
        <Stack spacing={3} sx={{ width: 400 }}>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            disabled={
              (mirEdit?.encabezado.lineas_de_accion &&
                lineaDeAccion[0]?.Id === "") ||
              disabledLineasDeAccion
            }
            multiple
            limitTags={4}
            options={catalogoLineasDeAccion}
            size="small"
            getOptionLabel={(option) =>
              option.Label?.toUpperCase() || ""
            }
            value={lineaDeAccion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <p
                    style={{
                      fontFamily: "MontserratRegular",
                      fontSize: ".7vw",
                    }}
                  >
                    {option.Label.toUpperCase()}
                  </p>
                </li>
              );
            }}
            onInputChange={() => onClearLineasDeAccion()}
            //--------------------------- esto si va --------------------------------------------
            renderInput={(params) => (
              <TextField
                {...params}
                label={"LINEAS DE ACCIÓN"}
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
                    textTransform: "uppercase",
                  },
                }}
              />
            )}
            onChange={(event, value) => {
              value.map((value2, index) => {
                if (value2.Id !== "" && value2.Label !== "") {
                  setLineaDeAccion(value);
                }
              });
            }}
            isOptionEqualToValue={(
              option: {
                Id: string;
                Label: string;
              },
              value: {
                Id: string;
                Label: string;
              }
            ) => value.Id === option.Id}
          />
        </Stack>
      </FormControl>

      <FormControl required sx={{ width: "20vw" }}>
        <Autocomplete
          disabled={mirEdit?.encabezado.beneficiario}
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          disablePortal
          size="small"
          options={catalogoBeneficiarios}
          getOptionLabel={(option) => option.Label || ""}
          value={beneficiario}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.Id}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.Label}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"BENEFICIARIO"}
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
          onChange={(event, value) =>{setBeneficiario(value||objetoVacio)}
           }
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />
      </FormControl>
    </Grid>
  );
}

export default TabEncabezado;
