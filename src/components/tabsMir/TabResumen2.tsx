import { useEffect, useState } from "react";
import { Box, Typography, Button, Checkbox } from "@mui/material";
import axios from "axios";
import { IEncabezado, ILineasDeAccion } from "./TabEncabezado";
import { IComponente } from "./IComponente";
import { IActividadesMir, ICValor } from "./ICValor";
import { IFin, IProposito } from "./TabFinProposito";
import { IMIR } from "./IMIR";
import Swal from "sweetalert2";
import ModalEnviarMIR from "../modalsMIR/ModalEnviarMIR";
import ModalSolicitaModif from "../modalsMIR/ModalSolicitaModif";
import { ActividadesInstitucionales } from "../../screens/actividadesInstitucionales/ActividadesInstitucionales";
import { getValue } from "@mui/system";
import { createDecipheriv } from "crypto";

export function TabResumen2({
  show,
  encabezado,
  fin,
  proposito,
  componentes,
  componenteValor,
  cValor,
  showResume,
  IdMir,
  mirEdit,
}: {
  show: boolean;
  encabezado: Array<IEncabezado>;
  fin: Array<IFin>;
  proposito: Array<IProposito>;
  componentes: number[];
  componenteValor: Array<IComponente>;
  cValor: Array<ICValor>;
  showResume: Function;
  IdMir: string;
  mirEdit?: IEncabezadoEdit;
}) {
  const [MIR, setMIR] = useState<IMIR>();

  const [openModalEnviar, setOpenModalEnviar] = useState(false);
  const handleCloseEnviar = () => {
    setOpenModalEnviar(false);
  };

useEffect(() => {
  
  },[show])

  const [openModalSolicitarModif, setOpenModalSolicitarModif] = useState(false);

  const handleCloseModif = () => {
    setOpenModalSolicitarModif(false);
  };

  let asignarMIR = (
    encabezadoM: Array<IEncabezado>,
    finM: Array<IFin>,
    propositoM: Array<IProposito>,
    componentesM: Array<IComponente>,
    actividadesM: Array<IActividadesMir>
  ) => {
    setMIR({
      encabezado: encabezadoM[0],
      fin: finM[0],
      proposito: propositoM[0],
      componentes: componentesM,
      actividades: actividadesM,
    });
  };

  const checkMir = (v: string) => {
    if (MIR?.encabezado.ejercicioFiscal === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona año fiscal.",
      });
    } else if (MIR?.encabezado.institucion === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona institución.",
      });
    } else if (MIR?.encabezado.nombre_del_programa === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona programa.",
      });
    } else {
      createMIR(v);
    }
  };

  const createMIR = (estado: string) => {
   axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-mir",
        {
          MIR: JSON.stringify(MIR),
          Estado: estado,
          CreadoPor: localStorage.getItem("IdUsuario"),
          AnioFiscal: MIR?.encabezado.ejercicioFiscal,
          Institucion: MIR?.encabezado.institucion,
          Programa: MIR?.encabezado.nombre_del_programa,
          Eje: MIR?.encabezado.eje,
          Tematica: MIR?.encabezado.tema,
          IdMir: IdMir,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        Toast.fire({
          icon: "success",
          title: r.data.data.message,
        });
        showResume();
      })
      .catch((err) => {
        if (err.response.status === 409) {
          Toast.fire({
            icon: "error",
            title: err.response.data.result.error,
          });
        }
      });
  };

  useEffect(() => {
    let arr: any[] = [];
    cValor[0].componentes.map((a) => {
      a.actividades.map((b) => {
        Object.assign(b);
        arr.push(b);
      });
    });

    let cEdit = componenteValor.map((item) => {
      return {
        componentes: item.componentes,
        formula: true,
        frecuencia: true,
        indicador: true,
        medios: true,
        resumen: true,
        supuestos: true,
      };
    });
    setEditComponentes(cEdit);

    let aEdit = arr.map((item) => {
      return {
        actividad: item.actividad,
        formula: true,
        frecuencia: true,
        indicador: true,
        medios: true,
        resumen: true,
        supuestos: true,
      };
    });

    setEditActividades(aEdit);

    asignarMIR(encabezado, fin, proposito, componenteValor, arr);
  }, [encabezado, componenteValor, proposito, fin, cValor, show]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const [editEncabezado, setEditEncabezado] = useState<IEncabezadoEdit>({
    ejercicioFiscal: true,
    institucion: true,
    nombre_del_programa: true,
    eje: true,
    tema: true,
    objetivo: true,
    estrategia: true,
    lineas_de_accion: true,
    beneficiario: true,
  });

  const [editFin, setEditFin] = useState<IFinEdit>({
    resumen: true,
    indicador: true,
    formula: true,
    frecuencia: true,
    medios: true,
    supuestos: true,
  });

  const [editProposito, setEditProposito] = useState<IPropositoEdit>({
    resumen: true,
    indicador: true,
    formula: true,
    frecuencia: true,
    medios_verificacion: true,
    supuestos: true,
  });

  const [editComponentes, setEditComponentes] = useState<
    Array<IComponenteMirEdit>
  >([]);

  const [editActividades, setEditActividades] = useState<
    Array<IActividadesMirEdit>
  >([]);

  const [disablebutton, setDisablebutton] = useState(false);
  // useEffect(() => {
  //   setDisablebutton(
  //     editEncabezado.beneficiario &&
  //       editEncabezado.eje &&
  //       editEncabezado.ejercicioFiscal &&
  //       editEncabezado.estrategia &&
  //       editEncabezado.institucion &&
  //       editEncabezado.lineas_de_accion &&
  //       editEncabezado.nombre_del_programa &&
  //       editEncabezado.objetivo &&
  //       editEncabezado.tema
  //   );
  // }, [
  //   editEncabezado.beneficiario,
  //   editEncabezado.eje,
  //   editEncabezado.ejercicioFiscal,
  //   editEncabezado.estrategia,
  //   editEncabezado.institucion,
  //   editEncabezado.lineas_de_accion,
  //   editEncabezado.nombre_del_programa,
  //   editEncabezado.objetivo,
  //   editEncabezado.tema,
  // ]);

   const [disablebutton2, setDisablebutton2] = useState(false);
  // useEffect(() => {
  //   setDisablebutton2(
  //     editFin.formula &&
  //       editFin.frecuencia &&
  //       editFin.indicador &&
  //       editFin.medios &&
  //       editFin.resumen &&
  //       editFin.supuestos
  //   );
  // }, [
  //   editFin.formula,
  //   editFin.frecuencia,
  //   editFin.indicador,
  //   editFin.medios,
  //   editFin,
  //   editFin.supuestos,
  // ]);

  // // const validador = (aEdit:any) => aEdit === true

  // //  let ARRAY =[editActividades];


   const [disablebutton3, setDisablebutton3] = useState(false);
  // useEffect(() => {
  //   setDisablebutton3(
  //     editProposito.formula &&
  //       editProposito.frecuencia &&
  //       editProposito.indicador &&
  //       editProposito.medios_verificacion &&
  //       editProposito.resumen &&
  //       editProposito.supuestos
  //   );
  // }, [
  //   editProposito.formula,
  //   editProposito.frecuencia,
  //   editProposito.indicador,
  //   editProposito.medios_verificacion,
  //   editProposito.resumen,
  //   editProposito.supuestos,
  // ]);

  const [disablebuttoncomponentes, setDisablebuttoncomponentes] = useState(false);
  const [disablebuttonactividades, setDisablebuttonactividades] = useState(false);
  useEffect(() => {

      
    let arrayEncabezado = Object.entries(editEncabezado);
    let arrayFin = Object.entries(editFin);
    let arrayProposito = Object.entries(editProposito);

    let arrayComponentes = editComponentes.map((item) => {
      let a = [
        item.formula,
        item.frecuencia,
        item.indicador,
        item.medios,
        item.resumen,
        item.supuestos,
      ];

      let x = a.every((value) => value === true);
      return x;
    });

    let arrayActividad = editActividades.map((item) => {
      let a = [
        //item.actividad,
        item.formula,
        item.frecuencia,
        item.indicador,
        item.medios,
        item.resumen,
        item.supuestos,
      ];

      let x = a.every((value) => value === true);
      return x;
    });


    let respEncabezado = arrayEncabezado.every((item) => item[1] === true);
    let respFin = arrayFin.every((item) => item[1] === true);
    let respProposito = arrayProposito.every((item) => item[1] === true);
    let respuestaComponentes = arrayComponentes.every((item) => item === true);
    let respuestaActividades = arrayActividad.every((item) => item === true);
    
    setDisablebutton(
      respEncabezado
    )
    
    setDisablebutton2(
      respFin
    )

    setDisablebutton3(
      respProposito
    )  

    setDisablebuttoncomponentes(
      respuestaComponentes
    )

    setDisablebuttonactividades(
      respuestaActividades
      
    )
    
  }, [editEncabezado, editFin, editProposito, editComponentes, editActividades]);

//  useEffect(() =>
//  setDisablebutton_all 
//  )

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "75vw",
        height: "75vh",
        boxShadow: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          width: "90%",
          border: 0.1,
          borderColor: "#909090",
          height: "80%",
          overflow: "auto",
          borderRadius: 1,
          "&::-webkit-scrollbar": {
            width: ".3vw",
            mt: 1,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.5)",
            outline: "1px solid slategrey",
            borderRadius: 1,
          },
        }}
      >
        <Box sx={{ p: 5, display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              fontFamily: "MontserratBold",
              borderBottom: 1,
              textTransform: "uppercase",
            }}
          >
            Datos Generales
          </Typography>

          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              {localStorage.getItem("Rol") !== "Administrador" ? null : (
                <Checkbox
                  value={!editEncabezado.ejercicioFiscal}
                  onChange={(v) => {
                    setEditEncabezado({
                      ...editEncabezado,
                      ejercicioFiscal: !v.target.checked,
                    });
                  }}
                />
              )}

              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  width: "20%",
                  textTransform: "uppercase",
                }}
              >
                Ejercicio Fiscal:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {encabezado[0]?.ejercicioFiscal === "Selecciona"
                  ? ""
                  : encabezado[0]?.ejercicioFiscal}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              {/* Validar que se seleecione alguno en estos puntos estan*/}

              {localStorage.getItem("Rol") !== "Administrador" ? null : (
                <Checkbox
                  value={!editEncabezado.institucion}
                  onChange={(v) => {
                    setEditEncabezado({
                      ...editEncabezado,
                      institucion: !v.target.checked,
                    });
                  }}
                />
              )}

              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  width: "20%",
                  textTransform: "uppercase",
                }}
              >
                Institución:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "MontserratLight",
                  width: "80%",
                  textTransform: "uppercase",
                }}
              >
                {encabezado[0]?.institucion === "Selecciona"
                  ? ""
                  : encabezado[0]?.institucion}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              {localStorage.getItem("Rol") !== "Administrador" ? null : (
                <Checkbox
                  value={!editEncabezado.nombre_del_programa}
                  onChange={(v) => {
                    setEditEncabezado({
                      ...editEncabezado,
                      nombre_del_programa: !v.target.checked,
                    });
                  }}
                />
              )}

              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  width: "20%",
                  textTransform: "uppercase",
                }}
              >
                Programa:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {encabezado[0]?.nombre_del_programa === "Selecciona"
                  ? ""
                  : encabezado[0]?.nombre_del_programa}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              {localStorage.getItem("Rol") !== "Administrador" ? null : (
                <Checkbox
                  value={!editEncabezado.eje}
                  onChange={(v) => {
                    setEditEncabezado({
                      ...editEncabezado,
                      eje: !v.target.checked,
                    });
                  }}
                />
              )}

              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  width: "20%",
                  textTransform: "uppercase",
                }}
              >
                Eje:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {encabezado[0]?.eje === "Selecciona" ? "" : encabezado[0]?.eje}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              {localStorage.getItem("Rol") !== "Administrador" ? null : (
                <Checkbox
                  value={!editEncabezado.tema}
                  onChange={(v) => {
                    setEditEncabezado({
                      ...editEncabezado,
                      tema: !v.target.checked,
                    });
                  }}
                />
              )}

              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  width: "20%",
                  textTransform: "uppercase",
                }}
              >
                Temática:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "MontserratLight",
                  width: "80%",
                  textTransform: "uppercase",
                }}
              >
                {encabezado[0]?.tema === "Selecciona"
                  ? ""
                  : encabezado[0]?.tema}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              
              {localStorage.getItem("Rol") !== "Administrador" ? null : (
                <Checkbox
                  value={!editEncabezado.objetivo}
                  onChange={(v) => {
                    setEditEncabezado({
                      ...editEncabezado,
                      objetivo: !v.target.checked,
                    });
                  }}
                />
              )}
              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  width: "20%",
                  textTransform: "uppercase",
                }}
              >
                Objetivo:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {encabezado[0]?.objetivo === "Selecciona"
                  ? ""
                  : encabezado[0]?.objetivo.toUpperCase()}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              
              {localStorage.getItem("Rol") !== "Administrador" ? null : (
                <Checkbox
                  value={!editEncabezado.estrategia}
                  onChange={(v) => {
                    setEditEncabezado({
                      ...editEncabezado,
                      estrategia: !v.target.checked,
                    });
                  }}
                />
              )}
              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  width: "20%",
                  textTransform: "uppercase",
                }}
              >
                Estrategia:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {encabezado[0]?.estrategia === "Selecciona"
                  ? ""
                  : encabezado[0]?.estrategia}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              {localStorage.getItem("Rol") !== "Administrador" ? null : (
                <Checkbox
                  value={!editEncabezado.beneficiario}
                  onChange={(v) => {
                    setEditEncabezado({
                      ...editEncabezado,
                      beneficiario: !v.target.checked,
                    });
                  }}
                />
              )}

              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  width: "20%",
                  textTransform: "uppercase",
                }}
              >
                Beneficiario:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {encabezado[0]?.beneficiario === "Selecciona"
                  ? ""
                  : encabezado[0]?.beneficiario}
              </Typography>
            </Box>
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={!editEncabezado.lineas_de_accion}
                onChange={(v) => {
                  setEditEncabezado({
                    ...editEncabezado,
                    lineas_de_accion: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Lineas de Acción:
            </Typography>
            <Box>
              {encabezado[0]?.lineas_de_accion.map(
                (value: { Id: string; LineaDeAccion: string }, x: any) => {
                  return (
                    <Typography
                      key={x}
                      sx={{
                        fontFamily: "MontserratLight",
                        width: "100%",
                        borderBottom: "1px solid lightGrey",
                        "&:last-Child": { borderBottom: 0 },
                        textTransform: "uppercase",
                      }}
                    >
                      {value?.LineaDeAccion === "Selecciona"
                        ? ""
                        : value?.LineaDeAccion}
                    </Typography>
                  );
                }
              )}
            </Box>
          </Box>

          <Typography
            sx={{
              fontFamily: "MontserratBold",
              borderBottom: 1,
              mt: 5,
              textTransform: "uppercase",
            }}
          >
            Fin
          </Typography>
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={!editFin.resumen}
                onChange={(v) => {
                  setEditFin({ ...editFin, resumen: !v.target.checked });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Resumen Narrativo:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.resumen?.toUpperCase()}
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
            
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={!editFin.indicador}
                onChange={(v) => {
                  setEditFin({ ...editFin, indicador: !v.target.checked });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Indicador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.indicador?.toUpperCase()}
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
            
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={!editFin.formula}
                onChange={(v) => {
                  setEditFin({ ...editFin, formula: !v.target.checked });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Fórmula:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.formula?.toUpperCase()}
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
            
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={!editFin.frecuencia}
                onChange={(v) => {
                  setEditFin({ ...editFin, frecuencia: !v.target.checked });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Frecuencia:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.frecuencia?.toUpperCase()}
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
            
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={!editFin.medios}
                onChange={(v) => {
                  setEditFin({ ...editFin, medios: !v.target.checked });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Medios de Verificación:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.medios?.toUpperCase()}
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
            
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={!editFin.supuestos}
                onChange={(v) => {
                  setEditFin({ ...editFin, supuestos: !v.target.checked });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Supuestos:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.supuestos?.toUpperCase()}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "MontserratBold",
              borderBottom: 1,
              mt: 5,
              textTransform: "uppercase",
            }}
          >
            Propósito
          </Typography>
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={!editProposito.resumen}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    resumen: !v.target.checked,
                  });
                }}
              />
            )}

            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Resumen Narrativo:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.resumen?.toUpperCase()}
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
            
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={!editProposito.indicador}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    indicador: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Indicador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.indicador?.toUpperCase()}
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
            
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={!editProposito.formula}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    formula: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Fórmula:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.formula?.toUpperCase()}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={!editProposito.frecuencia}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    frecuencia: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Frecuencia:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.frecuencia?.toUpperCase()}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={!editProposito.medios_verificacion}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    medios_verificacion: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Medios de Verificación:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.medios_verificacion?.toUpperCase()}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={!editProposito.supuestos}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    supuestos: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Supuestos:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.supuestos?.toUpperCase()}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "MontserratBold",
              borderBottom: 1,
              mt: 5,
              textTransform: "uppercase",
            }}
          >
            Componentes
          </Typography>

          {componentes.map((index) => {
            return (
              <Box key={index}>
                <Typography
                  sx={{
                    fontFamily: "MontserratMedium",
                    borderBottom: 1,
                    mt: 5,
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  Componente {index}
                </Typography>
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
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Checkbox
                      value={!editComponentes[index - 1]?.resumen}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].resumen = !v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      width: "20%",
                      textTransform: "uppercase",
                    }}
                  >
                    Resumen Narrativo:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.resumen?.toUpperCase()}
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
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Checkbox
                      value={!editComponentes[index - 1]?.indicador}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].indicador = !v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}

                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      width: "20%",
                      textTransform: "uppercase",
                    }}
                  >
                    Indicador:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.indicador?.toUpperCase()}
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
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Checkbox
                      value={!editComponentes[index - 1]?.formula}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].formula = !v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}

                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      width: "20%",
                      textTransform: "uppercase",
                    }}
                  >
                    Fórmula:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.formula?.toUpperCase()}
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
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Checkbox
                      value={!editComponentes[index - 1]?.frecuencia}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].frecuencia = !v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}

                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      width: "20%",
                      textTransform: "uppercase",
                    }}
                  >
                    Frecuencia:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.frecuencia?.toUpperCase()}
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
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Checkbox
                      value={!editComponentes[index - 1]?.medios}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].medios = !v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}

                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      width: "20%",
                      textTransform: "uppercase",
                    }}
                  >
                    Medios de Verificación:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.medios?.toUpperCase()}
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
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Checkbox
                      value={!editComponentes[index - 1]?.supuestos}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].supuestos = !v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}

                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      width: "20%",
                      textTransform: "uppercase",
                    }}
                  >
                    Supuestos:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.supuestos?.toUpperCase()}
                  </Typography>
                </Box>
              </Box>
            );
          })}

          <Typography
            sx={{
              fontFamily: "MontserratBold",
              borderBottom: 1,
              mt: 5,
              textTransform: "uppercase",
            }}
          >
            Actividades
          </Typography>

          {cValor[0]?.componentes.map((item, indexComponentes) => {
            let i = 0;
            return item.actividades.map((value, indexActividades) => {
              i++;
              return (
                <Box key={indexActividades}>
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      borderBottom: 1,
                      mt: 5,
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    Componente {indexComponentes + 1} - Actividad
                    {indexActividades + 1}
                  </Typography>
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
                    {localStorage.getItem("Rol") !== "Administrador" ? null : (
                      <Checkbox
                        value={!editActividades[indexComponentes]?.resumen}
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].resumen = !v.target.checked;
                          setEditActividades(past);
                        }}
                      />
                    )}

                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",
                        width: "20%",
                        textTransform: "uppercase",
                      }}
                    >
                      Resumen Narrativo:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {cValor[0].componentes[indexComponentes].actividades[
                        indexActividades
                      ].resumen?.toUpperCase()}
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
                    {localStorage.getItem("Rol") !== "Administrador" ? null : (
                      <Checkbox
                        value={!editActividades[indexComponentes]?.indicador}
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].indicador = !v.target.checked;
                          setEditActividades(past);
                        }}
                      />
                    )}

                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",
                        width: "20%",
                        textTransform: "uppercase",
                      }}
                    >
                      Indicador:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {cValor[0].componentes[indexComponentes].actividades[
                        indexActividades
                      ].indicador?.toUpperCase()}
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
                    {localStorage.getItem("Rol") !== "Administrador" ? null : (
                      <Checkbox
                        value={!editActividades[indexComponentes]?.formula}
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].formula = !v.target.checked;
                          setEditActividades(past);
                        }}
                      />
                    )}

                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",
                        width: "20%",
                        textTransform: "uppercase",
                      }}
                    >
                      Fórmula:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {cValor[0].componentes[indexComponentes].actividades[
                        indexActividades
                      ].formula?.toUpperCase()}
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
                    {localStorage.getItem("Rol") !== "Administrador" ? null : (
                      <Checkbox
                        value={!editActividades[indexComponentes]?.frecuencia}
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].frecuencia = !v.target.checked;
                          setEditActividades(past);
                        }}
                      />
                    )}

                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",
                        width: "20%",
                        textTransform: "uppercase",
                      }}
                    >
                      Frecuencia:
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "MontserratLight",
                        width: "80%",
                        textTransform: "uppercase",
                      }}
                    >
                      {cValor[0].componentes[indexComponentes].actividades[
                        indexActividades
                      ].frecuencia?.toUpperCase()}
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
                    {localStorage.getItem("Rol") !== "Administrador" ? null : (
                      <Checkbox
                        value={!editActividades[indexComponentes]?.medios}
                        onChange={(v) => {
                          let past = [...editActividades];

                          past[indexComponentes].medios = !v.target.checked;
                          setEditActividades(past);
                        }}
                      />
                    )}

                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",
                        width: "20%",
                        textTransform: "uppercase",
                      }}
                    >
                      Medios de Verificación:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {cValor[0].componentes[indexComponentes].actividades[
                        indexActividades
                      ].medios?.toUpperCase()}
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
                    {localStorage.getItem("Rol") !== "Administrador" ? null : (
                      <Checkbox
                        value={!editActividades[indexComponentes]?.supuestos}
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].supuestos = !v.target.checked;
                          setEditActividades(past);
                        }}
                      />
                    )}

                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",
                        width: "20%",
                        textTransform: "uppercase",
                      }}
                    >
                      Supuestos:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {cValor[0].componentes[indexComponentes].actividades[
                        indexActividades
                      ].supuestos?.toUpperCase()}
                    </Typography>
                  </Box>
                </Box>
              );
            });
          })}
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          mt: 2,
        }}
      >
        {/*---------------------------------Aqui esta lo que ocupo--------------------------------*/}

        <Button color="error" variant="outlined" onClick={() => showResume()}>
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Cancelar
          </Typography>
        </Button>

        <Button
          /////////////////////////////////////////////// Aqui estoy /////////////////////////////////////
          
          disabled={
          disablebutton && disablebutton2 && disablebutton3 && disablebuttoncomponentes && disablebuttonactividades
          }

          color="warning"
          variant="outlined"
          onClick={() => setOpenModalSolicitarModif(true)}
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Solicitar Modificación
          </Typography>
        </Button>

        <Button
          color="success"
          variant="outlined"
          onClick={() =>
            checkMir(
              localStorage.getItem("Rol") === "Capturador"
                ? "En Captura"
                : localStorage.getItem("Rol") === "Verificador"
                ? "En Revisión"
                : "En Autorización"
            )
          }
          //al menos un opcion
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Guardar borrador
          </Typography>
        </Button>

        <Button
          color="primary"
          variant="outlined"
          onClick={() => setOpenModalEnviar(true)}
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            {localStorage.getItem("Rol") === "Administrador"
              ? "Autorizar"
              : "Enviar"}
          </Typography>
        </Button>

        <ModalSolicitaModif
          open={openModalSolicitarModif}
          IdMir={IdMir}
          showResume={showResume}
          handleClose={handleCloseModif}
          MIR={JSON.stringify(MIR)}
          MIREdit={
            localStorage.getItem("Rol") !== "Administrador"
              ? JSON.stringify(mirEdit)
              : JSON.stringify({
                  encabezado: editEncabezado,
                  fin: editFin,
                  proposito: editProposito,
                  componentes: editComponentes,
                  actividades: editActividades,
                })
          }
        ></ModalSolicitaModif>

        <ModalEnviarMIR
          showResume={showResume}
          open={openModalEnviar}
          handleClose={handleCloseEnviar}
          MIR={JSON.stringify(MIR)}
          IdMir={IdMir}
        ></ModalEnviarMIR>
      </Box>
    </Box>
  );
}

export default TabResumen2;

export interface IEncabezadoEdit {
  ejercicioFiscal: boolean;
  institucion: boolean;
  nombre_del_programa: boolean;
  eje: boolean;
  tema: boolean;
  objetivo: boolean;
  estrategia: boolean;
  lineas_de_accion: boolean;
  beneficiario: boolean;
}

export interface IFinEdit {
  resumen: boolean;
  indicador: boolean;
  formula: boolean;
  frecuencia: boolean;
  medios: boolean;
  supuestos: boolean;
}
export interface IPropositoEdit {
  resumen: boolean;
  indicador: boolean;
  formula: boolean;
  frecuencia: boolean;
  medios_verificacion: boolean;
  supuestos: boolean;
}

export interface IComponenteMirEdit {
  componentes: string;
  resumen: boolean;
  indicador: boolean;
  formula: boolean;
  frecuencia: boolean;
  medios: boolean;
  supuestos: boolean;
}

export interface IActividadesMirEdit {
  actividad: string;
  formula: boolean;
  frecuencia: boolean;
  indicador: boolean;
  medios: boolean;
  resumen: boolean;
  supuestos: boolean;
}
