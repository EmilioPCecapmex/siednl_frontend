/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-eval */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import {
  ListItemButton,
  TableCell,
  List,
  Paper,
  Divider,
  Typography,
  TableRow,
  TableContainer,
  Table,
  TableBody,
  Input,
  Grid,
  TablePagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Accordion from "@mui/material/Accordion";

import { useEffect, useState } from "react";
import axios from "axios";
import DeleteDialogCatalogos from "./DeleteDialogCatalogos";

import AddDialogCatalogo from "./AddDialogCatalogo";
import ModifyDialogCatalogos from "./ModifyDialogCatalogo";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { CSVCatalogo } from "./CSVCatalogo";

interface Head {
  id: keyof ITablaCatalogos;
  isNumeric: boolean;
  label: string;
}

const heads: readonly Head[] = [
  {
    id: "Descripcion",
    isNumeric: true,
    label: "Descripcion",
  },
  {
    id: "Acciones",
    isNumeric: true,
    label: "Acciones",
  },
];

export const Catalogos = ({ defSelected }: { defSelected: string }) => {
  const [defaultSelection, setDefaultSelection] = useState(defSelected);
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  useEffect(() => {
    let tableOption = configOptions.find((item) => item.Desc === defSelected);
    setTablaActual(tableOption?.Tabla as string);

    // eslint-disable-next-line array-callback-return
    configOptions.map((item) => {
      if (item.Desc === selected) {
        // eslint-disable-next-line no-eval
        eval(item.fnc);
      }
    });

    // eslint-disable-next-line array-callback-return
    configOptions.map((item) => {
      if (item.Desc === defaultSelection) {
        // eslint-disable-next-line no-eval
        eval(item.fnc);
      }
    });
  }, []);

  const configOptions = [
    {
      id: 1,
      Desc: "Años Fiscales",
      fnc: "getAniosFiscales()",
      Tabla: "AniosFiscales",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 2,
      Desc: "Beneficiarios",
      fnc: "getBeneficiarios()",
      Tabla: "Beneficiarios",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 3,
      Desc: "Clasificación Programática",
      fnc: "getClasificacionesProgramaticas()",
      Tabla: "ClasificacionesProgramaticas",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 4,
      Desc: "Dimensiones del Indicador",
      fnc: "getDimensionesDelIndicador()",
      Tabla: "DimensionesDelIndicador",
      selected: false,
      tipo: "Catalogos",
    },
    { id: 5, Desc: "Ejes", fnc: "getEjes()", Tabla: "Ejes", selected: true },
    {
      id: 6,
      Desc: "Ejes del Plan Nacional de Desarrollo",
      Tabla: "EjesPND",
      fnc: "getEjesPND()",
      selected: true,
      tipo: "Catalogos",
    },
    {
      id: 7,
      Desc: "Estrategias",
      fnc: "getEstrategias()",
      Tabla: "Estrategias ",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 8,
      Desc: "Fechas de Captura",
      fnc: "getFechasDeCaptura()",
      Tabla: "FechasDeCaptura",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 9,
      Desc: "Fórmulas",
      fnc: "getFormulas()",
      Tabla: "Formulas",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 10,
      Desc: "Frecuencias",
      fnc: "getFrecuencias()",
      Tabla: "Frecuencias",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 11,
      Desc: "Instituciones",
      fnc: "getInstituciones()",
      Tabla: "Instituciones",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 12,
      Desc: "Lineas de Acción",
      fnc: "getLineasDeAccion()",
      Tabla: "LineasDeAccion",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 13,
      Desc: "Metas ODS",
      fnc: "getMetasODS()",
      Tabla: "MetasODS",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 14,
      Desc: "Modalidades",
      fnc: "getModalidades()",
      Tabla: "Modalidades",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 15,
      Desc: "Objetivos",
      fnc: "getObjetivos()",
      Tabla: "Objetivos",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 16,
      Desc: "Objetivos Desarrollo Sostenible",
      fnc: "getObjetivosDS()",
      Tabla: "ObjetivosDS",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 17,
      Desc: "Objetivos del Plan Estrategico del Estado de Nuevo León",
      fnc: "getObjetivosPEENL()",
      Tabla: "ObjetivosPEENL",
      selected: false,
      tipo: "Catalogos",
    },

    {
      id: 18,
      Desc: "Programas Presupuestarios",
      fnc: "getProgramaPresupuestario()",
      Tabla: "ProgramasPresupuestarios",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 19,
      Desc: "Roles",
      fnc: "getRoles()",
      Tabla: "Roles",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 20,
      Desc: "Temáticas",
      fnc: "getTematicas()",
      Tabla: "Tematicas",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 21,
      Desc: "Tipos de Fórmula",
      fnc: "getTipoDeFormula()",
      Tabla: "TiposDeFormula",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 22,
      Desc: "Tipos de Indicador",
      fnc: "getTipoDeIndicador()",
      Tabla: "TiposDeIndicador",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 23,
      Desc: "Unidades de Medida",
      fnc: "getUnidadDeMedida()",
      Tabla: "UnidadesDeMedida",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 24,
      Desc: "Unidades Administrativas",
      fnc: "getUnidadesAdministrativas()",
      Tabla: "UnidadesAdministrativas",
      selected: false,
      tipo: "Catalogos",
    },
    {
      id: 25,
      Desc: "PED",
      fnc: "getPED()",
      Tabla: "PEDs",
      selected: false,
      tipo: "Relaciones",
    },
    {
      id: 26,
      Desc: "Instituciones - Unidades",
      fnc: "getInstitucionesUnidades()",
      Tabla: "InstitucionUnidad",
      selected: false,
      tipo: "Relaciones",
    },
    {
      id: 27,
      Desc: "Programas - Instituciones",
      fnc: "getProgramasInstituciones()",
      Tabla: "ProgramasInstituciones",
      selected: false,
      tipo: "Relaciones",
    },
  ];
  // const getUnidadesAdministrativas = () => {
  //   setSelected("Unidades Administrativas");
  //   setCatalogoActual("Unidades Administrativas");
  //   axios
  //     .get(
  //       process.env.REACT_APP_APPLICATION_BACK + "/api/unidadesAdministrativas",
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("jwtToken") || "",
  //           Rol: localStorage.getItem("Rol") || "",
  //         },
  //       }
  //     )
  //     .then((r) => {
  //       if (r.status === 200) {
  //         let update = r.data.data;
  //         update = update.map(
  //           (item: { Id: string; Unidad: string; Tabla: string }) => {
  //             return {
  //               Id: item.Id,
  //               Desc: item.Unidad.toUpperCase(),
  //               Tabla: "UnidadesAdministrativas",
  //             };
  //           }
  //         );
  //         setDatosTabla(update);
  //         setDataDescripctionFiltered(update);
  //       }
  //     });
  // };

  // const getInstitucionesUnidades = () => {
  //   setSelected("Instituciones - Unidades");
  //   setCatalogoActual("Instituciones - Unidades");
  //   axios
  //     .get(
  //       process.env.REACT_APP_APPLICATION_BACK + "/api/institucionesUnidad",
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("jwtToken") || "",
  //         },
  //       }
  //     )
  //     .then((r) => {
  //       if (r.status === 200) {
  //         let update = r.data.data;

  //         update = update.map(
  //           (item: {
  //             Id: string;
  //             NombreInstitucion: string;
  //             Unidad: string;
  //             Tabla: string;
  //           }) => {
  //             return {
  //               Id: item.Id,
  //               Desc:
  //                 item.NombreInstitucion.toUpperCase() +
  //                 " / " +
  //                 item.Unidad.toUpperCase(),
  //               Tabla: "InstitucionUnidad",
  //             };
  //           }
  //         );
  //         setDatosTabla(update);
  //         setDataDescripctionFiltered(update);
  //       }
  //     });
  // };

  const getProgramasInstituciones = () => {
    setSelected("Programas - Instituciones");
    setCatalogoActual("Programas - Instituciones");
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/programasInstituciones",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: {
              Id: string;
              NombreInstitucion: string;
              NombrePrograma: string;
              Tabla: string;
            }) => {
              return {
                Id: item.Id,
                Desc:
                  item.NombreInstitucion.toUpperCase() +
                  " / " +
                  item.NombrePrograma.toUpperCase(),
                Tabla: "ProgramasInstituciones",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getAniosFiscales = () => {
    setSelected("Años Fiscales");
    setCatalogoActual("Años Fiscales");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/AniosFiscales", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; AnioFiscal: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.AnioFiscal,
                Tabla: "AniosFiscales",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getBeneficiarios = () => {
    setSelected("Beneficiarios");

    setCatalogoActual("Beneficiarios");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/Beneficiarios", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; Beneficiario: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.Beneficiario.toUpperCase(),
                Tabla: "Beneficiarios",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getClasificacionesProgramaticas = () => {
    setSelected("Clasificación Programática");

    setCatalogoActual("Clasificación Programática");
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/clasificacionesProgramaticas",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: {
              Id: string;
              ClasificacionProgramatica: string;
              Tabla: string;
            }) => {
              return {
                Id: item.Id,
                Desc: item.ClasificacionProgramatica.toUpperCase(),
                Tabla: "ClasificacionesProgramaticas",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getDimensionesDelIndicador = () => {
    setSelected("Dimensiones del Indicador");

    setCatalogoActual("Dimensiones del Indicador");
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/dimensionesDelIndicador",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: {
              Id: string;
              DimensionDelIndicador: string;
              Tabla: string;
            }) => {
              return {
                Id: item.Id,
                Desc: item.DimensionDelIndicador.toUpperCase(),
                Tabla: "DimensionesDelIndicador",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getEjes = () => {
    setSelected("Ejes");

    setCatalogoActual("Ejes");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/ejes", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; Eje: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.Eje.toUpperCase(),
                Tabla: "Ejes",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getEjesPND = () => {
    setSelected("Ejes del Plan Nacional de Desarrollo");

    setCatalogoActual("Ejes del Plan Nacional de Desarrollo");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/ejesPND", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; EjePND: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.EjePND.toUpperCase(),
                Tabla: "EjesPND",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getEstrategias = () => {
    setSelected("Estrategias");

    setCatalogoActual("Estrategias");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/Estrategias", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; Estrategia: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.Estrategia.toUpperCase(),
                Tabla: "Estrategias",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getFormulas = () => {
    setSelected("Fórmulas");

    setCatalogoActual("Fórmulas");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/Formulas", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; Formula: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.Formula.toUpperCase(),
                Tabla: "Formulas",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getFechasDeCaptura = () => {
    setSelected("Fechas de Captura");

    setCatalogoActual("Fechas de captura");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/fechasDeCaptura", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        console.log(r);

        if (r.status === 200) {
          console.log("entre al if de getfechas", r.data.data);

          let update = r.data.data;
          update = update.map(
            (item: {
              Id: string;
              FechaCapturaInicio: string;
              FechaCapturaFinal: string;
              Descripcion: string;
              Tabla: string;
            }) => {
              return {
                Id: item.Id,
                Desc:
                  item.FechaCapturaInicio +
                  " - " +
                  item.FechaCapturaFinal +
                  " / " +
                  item.Descripcion.toUpperCase(),
                Tabla: "FechasDeCaptura",
              };
            }
          );
          console.log("update: ", update);
          console.log("entre al if de getfechas2", r.data.data);

          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getFrecuencias = () => {
    setSelected("Frecuencias");

    setCatalogoActual("Frecuencias");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/Frecuencias", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; Frecuencia: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.Frecuencia.toUpperCase(),
                Tabla: "Frecuencias",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  // const getInstituciones = () => {
  //   setSelected("Instituciones");

  //   setCatalogoActual("Instituciones");
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/instituciones", {
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //       params: {
  //         IdUsuario: localStorage.getItem("IdUsuario"),
  //         IdInstitucion: localStorage.getItem("IdInstitucion"),
  //         Rol: localStorage.getItem("Rol"),
  //       },
  //     })
  //     .then((r) => {
  //       if (r.status === 200) {
  //         let update = r.data.data;
  //         update = update.map(
  //           (item: {
  //             Id: string;
  //             NombreInstitucion: string;
  //             Tabla: string;
  //           }) => {
  //             return {
  //               Id: item.Id,
  //               Desc: item.NombreInstitucion.toUpperCase(),
  //               Tabla: "Instituciones",
  //             };
  //           }
  //         );
  //         setDatosTabla(update);
  //         setDataDescripctionFiltered(update);
  //       }
  //     });
  // };
  const getLineasDeAccion = () => {
    setSelected("Lineas de Acción");

    setCatalogoActual("Lineas de acción");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/lineasDeAccion", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; LineaDeAccion: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.LineaDeAccion.toUpperCase(),
                Tabla: "LineasDeAccion",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getMetasODS = () => {
    setSelected("Metas ODS");

    setCatalogoActual("Metas ODS");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/metasODS", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; MetaODS: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.MetaODS.toUpperCase(),
                Tabla: "MetasODS",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getModalidades = () => {
    setSelected("Modalidades");

    setCatalogoActual("Modalidades");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/modalidades", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; Modalidad: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.Modalidad.toUpperCase(),
                Tabla: "Modalidades",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getObjetivos = () => {
    setSelected("Objetivos");

    setCatalogoActual("Objetivos");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/objetivos", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; Objetivo: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.Objetivo.toUpperCase(),
                Tabla: "Objetivos",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getObjetivosPEENL = () => {
    setSelected("Objetivos del Plan Estrategico del Estado de Nuevo León");

    setCatalogoActual(
      "Objetivos del Plan Estrategico del Estado de Nuevo León"
    );
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/objetivosPEENL", {
        
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; ObjetivoPEENL: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.ObjetivoPEENL.toUpperCase(),
                Tabla: "ObjetivosPEENL",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getObjetivosDS = () => {
    setSelected("Objetivos Desarrollo Sostenible");

    setCatalogoActual("Objetivos Desarrollo Sostenible");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/objetivosDS", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; ObjetivoDS: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.ObjetivoDS.toUpperCase(),
                Tabla: "ObjetivosDS",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getPED = () => {
    setSelected("PED");

    setCatalogoActual("PED");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/ped", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: {
              Id: string;
              Eje: string;
              Tematica: string;
              Objetivo: string;
              Estrategia: string;
              LineaDeAccion: string;
              ObjetivoDS: string;
              MetaODS: string;
              EjePND: string;
              ObjetivoPEENL: string;
              Tabla: string;
            }) => {
              return {
                Id: item.Id,
                Desc: `${item.Eje.toUpperCase()}; ${item.Tematica.toUpperCase()}; ${item.Objetivo.toUpperCase()}; ${item.Estrategia.toUpperCase()}; ${item.LineaDeAccion.toUpperCase()}; ${item.ObjetivoDS.toUpperCase()}; ${item.MetaODS.toUpperCase()}; ${item.EjePND.toUpperCase()}; ${item.ObjetivoPEENL.toUpperCase()}`,
                Tabla: "PEDs",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getProgramaPresupuestario = () => {
    setSelected("Programas Presupuestarios");

    setCatalogoActual("Programas Presupuestarios");
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/programaPresupuestario",
        {
          params: {
            Rol: localStorage.getItem("Rol"),
          },
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: {
              Id: string;
              NombrePrograma: string;
              NombreInstitucion: string;
              Tabla: string;
            }) => {
              return {
                Id: item.Id,
                Desc:
                  "Programa: " +
                  item.NombrePrograma.toUpperCase() +
                  " / Institución: " +
                  item.NombreInstitucion.toUpperCase(),
                Tabla: "ProgramasPresupuestarios",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  // const getRoles = () => {
  //   setSelected("Roles");

  //   setCatalogoActual("Roles");
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/roles", {
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       if (r.status === 200) {
  //         let update = r.data.data;
  //         update = update.map(
  //           (item: { Id: string; Rol: string; Tabla: string }) => {
  //             return {
  //               Id: item.Id,
  //               Desc: item.Rol.toUpperCase(),
  //               Tabla: "Roles",
  //             };
  //           }
  //         );
  //         setDatosTabla(update);
  //         setDataDescripctionFiltered(update);
  //       }
  //     });
  // };

  const getTematicas = () => {
    setSelected("Temáticas");

    setCatalogoActual("Temáticas");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/tematica", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; Tematica: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.Tematica.toUpperCase(),
                Tabla: "Tematicas",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };
// no se usa por eso no agregue el Rol
  const getTipoDeFormula = () => {
    setSelected("Tipos de Fórmula");

    setCatalogoActual("Tipos de Fórmula");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/TipoDeFormula", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; TipoDeFormula: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.TipoDeFormula.toUpperCase(),
                Tabla: "TiposDeFormula",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getTipoDeIndicador = () => {
    setSelected("Tipos de Indicador");

    setCatalogoActual("Tipos de indicador");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/tipoDeIndicador", {
        params: {
          Rol: localStorage.getItem("Rol"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; TipoDeIndicador: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.TipoDeIndicador.toUpperCase(),
                Tabla: "TiposDeIndicador",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const getUnidadDeMedida = () => {
    setSelected("Unidades de Medida");

    setCatalogoActual("Unidades de medida");
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/unidadDeMedida", {
        params: {
          Rol: localStorage.getItem("Rol"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; UnidadDeMedida: string; Tabla: string }) => {
              return {
                Id: item.Id,
                Desc: item.UnidadDeMedida.toUpperCase(),
                Tabla: "UnidadesDeMedida",
              };
            }
          );
          setDatosTabla(update);
          setDataDescripctionFiltered(update);
        }
      });
  };

  const [tablaActual, setTablaActual] = React.useState(defSelected);
  const [catalogoActual, setCatalogoActual] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const [descripctionFiltered, setDescripctionFiltered] = useState("");

  const dataFilter = (text: string) => {
    setDescripctionFiltered(text);
  };

  const [datosTabla, setDatosTabla] = useState<Array<IDatosTabla>>([]);

  const [DataDescripctionFiltered, setDataDescripctionFiltered] = useState<
    Array<IDatosTabla>
  >([]);

  useEffect(() => {
    setDataDescripctionFiltered(datosTabla);
    console.log(datosTabla);
  }, [datosTabla]);

  useEffect(() => {
    setDataDescripctionFiltered(datosTabla);
    console.log(datosTabla);
  }, [descripctionFiltered]);

  const filtrarDatos = () => {
    console.log("Entra");
    let Arrayfiltro: IDatosTabla[];
    Arrayfiltro = [];

    if (descripctionFiltered.length !== 0) {
      Arrayfiltro = DataDescripctionFiltered;
    } else {
      Arrayfiltro = DataDescripctionFiltered;
    }

    let ResultadoBusqueda = Arrayfiltro.filter((elemento) => {
      console.log("entre");
      console.log(elemento);
      console.log(DataDescripctionFiltered);
      if (
        elemento.Desc.toString()
          .toLocaleLowerCase()
          .includes(descripctionFiltered.toLocaleLowerCase())
      ) {
        return elemento;
      }
    });
    setDataDescripctionFiltered(ResultadoBusqueda);
  };

  const [actualizacion, setActualizacion] = useState(0);

  // useEffect(() => {
  //   if (descripctionFiltered !== "") {
  //     setDataDescripctionFiltered(
  //       datosTabla.filter((x) =>
  //         x.Desc.toLowerCase().includes(descripctionFiltered)
  //       )
  //     );
  //   } else {
  //     setDataDescripctionFiltered(datosTabla);
  //   }
  // }, [datosTabla, descripctionFiltered]);

  // useEffect(() => {
  //   configOptions.map((item) => {
  //     if (item.Desc === defaultSelection) {
  //       eval(item.fnc);
  //     }
  //   });
  // }, [actualizacion, configOptions, defaultSelection]);

  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datosTabla.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [colorB, setColorB] = useState("#fff");
  const [rowColorB, setRowColorB] = useState("");
  const [colorCatalogo, setColorCatalogo] = useState("");
  const [colorRelaciones, setColorRelaciones] = useState("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
      if (panel === "panel1" && newExpanded === true) {
        setColorCatalogo("#E5C498");
        setColorRelaciones("");
      } else if (panel === "panel2" && newExpanded === true) {
        setColorCatalogo("");
        setColorRelaciones("#E5C498");
      } else {
        setColorCatalogo("");
        setColorRelaciones("");
      }
    };

  const handleChangeFilter = (dato: string) => {
    setDescripctionFiltered(dato);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    DataDescripctionFiltered.length !== 0 ? setDatosTabla(datosTabla) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DataDescripctionFiltered]);

  useEffect(() => {
    console.log("tablaActual: ", tablaActual);
    console.log("selected: ", selected);
    console.log("actualizaContador: ", actualizaContador);
    getFechasDeCaptura();
  }, []);

  return (
    <Grid container justifyContent={"space-between"}>
      <Grid
        justifyContent={"center"}
        display={"flex"}
        container
        height={"93vh"}
        alignItems={"center"}
        item
        xl={12}
        lg={12}
        md={12}
        sm={8}
        xs={6}
        sx={{ backgroundColor: "white" }}
      >
        <Grid item container sx={{ height: "100%", display: "flex", }}>
          <Grid
            item
            xl={3}
            lg={3}
            md={3}
            sm={3}
            xs={3}
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <List
              sx={{
                height: "100%",
                pb: 2,
                pt: 2,

                borderRight: "solid 1px",
                overflow: "auto",
                borderRadius: ".4vw",
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
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{
                    backgroundColor: colorCatalogo,
                    "&:hover": {
                      backgroundColor: "#cbcbcb",
                    },
                  }}
                >
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    Catálogos
                  </Typography>
                </AccordionSummary>

                {configOptions.map((item) => {
                  return (
                    <Grid key={item.id} sx={{}}>
                      {item.tipo === "Catalogos" ? (
                        <AccordionDetails sx={{ padding: 0 }}>
                          <ListItemButton
                            key={item.id}
                            dense
                            sx={{
                              "&.Mui-selected ": {
                                backgroundColor: "#c4a57b",
                              },
                              "&.Mui-selected:hover": {
                                backgroundColor: "#cbcbcb",
                              },
                            }}
                            selected={selected === item.Desc ? true : false}
                            onClick={() => {
                              console.log("valor selected: ", selected);

                              eval(item.fnc);
                              setTablaActual(item.Tabla);
                              setDefaultSelection(item.Desc);
                            }}
                          >
                            <Typography sx={{ fontFamily: "MontserratMedium" }}>
                              {item.Desc}
                            </Typography>
                          </ListItemButton>
                          <Divider />
                        </AccordionDetails>
                      ) : (
                        ""
                      )}
                    </Grid>
                  );
                })}
              </Accordion>
              <Accordion
                disableGutters
                elevation={0}
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
                sx={{
                  position: "unset",
                  border: "none",
                  boxShadow: "none",
                  maxWidth: 720,
                  margin: "12 0",
                  "&:before": {
                    display: "none",
                    border: "none",
                  },
                }}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                  sx={{
                    content: {
                      flexGrow: 0,
                    },
                    backgroundColor: colorRelaciones,
                    "&:hover": {
                      backgroundColor: "#cbcbcb",
                    },
                  }}
                >
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    Relaciones
                  </Typography>
                </AccordionSummary>

                {configOptions.map((item) => {
                  return (
                    <Grid key={item.id} sx={{}}>
                      {item.tipo === "Relaciones" ? (
                        <AccordionDetails sx={{ padding: 0 }}>
                          <ListItemButton
                            key={item.id}
                            sx={{
                              "&.Mui-selected ": {
                                backgroundColor: "#c4a57b",
                              },
                              "&.Mui-selected:hover": {
                                backgroundColor: "#cbcbcb",
                              },
                            }}
                            selected={selected === item.Desc ? true : false}
                            onClick={() => {
                              eval(item.fnc);
                              setTablaActual(item.Tabla);
                              setDefaultSelection(item.Desc);
                            }}
                          >
                            <Typography sx={{ fontFamily: "MontserratMedium" }}>
                              {item.Desc}
                            </Typography>
                          </ListItemButton>
                          <Divider />
                        </AccordionDetails>
                      ) : (
                        ""
                      )}
                    </Grid>
                  );
                })}
              </Accordion>
            </List>
          </Grid>

          <Grid
            item
            container
            xl={9}
            lg={9}
            md={9}
            sm={9}
            xs={9}
            sx={{
              display: "flex",
              flexDirection: "row",
              
              
              justifyContent:"center"
            }}
          >
            <Grid
              item
              container
              xl={10}
              lg={10}
              md={10}
              sm={10}
              xs={10}
              sx={{ justifyContent: "flex-end", display: "flex" }}
            >
              <Grid
                item
                xl={8}
                lg={8}
                md={8}
                sm={8}
                xs={8}
                sx={{
                  height: "10%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  borderRadius: "30px",
                  background: "",
                  mt: 5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "MontserratSemiBold",
                    fontSize: "1.2vw",
                    textAlign: "center",
                  }}
                >
                  {catalogoActual.toLocaleUpperCase()}
                </Typography>
              </Grid>

              <Grid
                item
                display={"flex"}
                sx={{ background: "", justifyContent: "flex-end", alignItems: "center" }}
                xl={2}
                lg={2}
                md={2}
                sm={2}
                xs={2}
              >
                <Grid
                  title="Agregar"
                  borderRadius={100}
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#c4a57b",

                    ":hover": {
                      backgroundColor: "#ffdcac",
                    },

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AddDialogCatalogo
                    catalogo={tablaActual}
                    tabla={tablaActual}
                    select={selected}
                    actualizado={actualizaContador}
                  />
                </Grid>

                <Grid
                  title="Exportar a excell"
                  borderRadius={100}
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#c4a57b",

                    ":hover": {
                      backgroundColor: "#ffdcac",
                    },

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CSVCatalogo tabla={tablaActual} datos={datosTabla} />
                </Grid>
              </Grid>
            </Grid>



            <Grid item
            xl={10}
            lg={10}
            md={10}
            sm={10}
            xs={10}
              sx={{
                
                height: "80%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  backgroundColor: "#ccc",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "4vh",
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "MontserratSemiBold",
                    ml: "1vw",
                    fontSize: ".9vw",
                  }}
                >
                  Descripción
                </Typography>

                <Grid
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    width: "60%",
                    backgroundColor: "#EBEBEB",
                    border: 1,
                    borderRadius: 10,
                    borderColor: "#ccc",
                  }}
                >
                  <Input
                    disableUnderline
                    size="small"
                    placeholder="Buscar"
                    name="InSearch"
                    sx={{
                      backgroundColor: "#EBEBEB",
                      fontFamily: "MontserratLight",
                      borderRadius: 100,
                    }}
                    onChange={(v) => handleChangeFilter(v.target.value)}
                    onKeyPress={(ev) => {
                      if (ev.key === "Enter") {
                        filtrarDatos();
                        ev.preventDefault();
                        return false;
                      }
                    }}
                  />
                  <SearchIcon sx={{ color: "action.active", mr: 1 }} />
                </Grid>

                <Typography
                  sx={{
                    fontFamily: "MontserratSemiBold",
                    mr: "1vw",
                    fontSize: ".9vw",
                  }}
                >
                  Acciones
                </Typography>
              </Grid>

              <TableContainer
                component={Paper}
                sx={{
                  width: "100%",
                  height: "60vh",
                  boxShadow: 10,
                  mt: 1,
                  "&::-webkit-scrollbar": {
                    width: ".1vw",
                    height: ".4vh",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,.5)",
                    outline: "1px solid slategrey",
                    borderRadius: 10,
                  },
                }}
              >
                <Table
                  //sx={{ maxWidth: 600 }}
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableBody>
                    {(rowsPerPage > 0
                      ? DataDescripctionFiltered.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : DataDescripctionFiltered
                    ).map((row) => {
                      if (row.Desc === "Selecciona") {
                        return null;
                      } else {
                        return (
                          <TableRow key={row.Id || Math.random()}>
                            <TableCell
                              component="th"
                              //  align="center"
                              sx={
                                row.Id === rowColorB
                                  ? { backgroundColor: colorB }
                                  : null
                              }
                              scope="row"
                              width="100%"
                              onClick={() => {
                                setRowColorB(row.Id);
                                setColorB("#E7E7E7");
                              }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: "MontserratRegular",
                                  fontSize: "1vw",
                                }}
                              >
                                {row?.Desc}
                              </Typography>
                            </TableCell>

                            <TableCell
                              component="th"
                              sx={
                                row.Id === rowColorB
                                  ? { backgroundColor: colorB }
                                  : null
                              }
                              scope="row"
                              width="100%"
                              onClick={() => {
                                setRowColorB(row.Id);
                                setColorB("#E7E7E7");
                              }}
                            >
                              <Grid sx={{ display: "flex" }}>
                                {selected === "Programas - Instituciones" ||
                                selected ===
                                  "Instituciones - Unidades" ? null : (
                                  <ModifyDialogCatalogos
                                    descripcion={row.Desc}
                                    id={row.Id}
                                    tabla={row.Tabla}
                                    actualizado={actualizaContador}
                                  />
                                )}

                                <DeleteDialogCatalogos
                                  deleteText={row.Desc}
                                  id={row.Id}
                                  tabla={row.Tabla}
                                  actualizado={actualizaContador}
                                />
                              </Grid>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <Grid
                container
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 1,
                }}
                direction={"row"}
              >
                <Grid item>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "Todos", value: -1 },
                    ]}
                    count={DataDescripctionFiltered.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    component="div"
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </Grid>
              </Grid>
            </Grid>




          </Grid>
        </Grid>


      </Grid>
    </Grid>
  );
};

export interface IDatosTabla {
  Id: string;
  Desc: string;
  fnc: string;
  Tabla: string;
  selected: string;
}

interface ITablaCatalogos {
  Descripcion: string;
  Acciones: string;
}
