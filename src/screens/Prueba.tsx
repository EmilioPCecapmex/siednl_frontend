import React, { useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Prueba = () => {
  const [componentes, setComponentes] = React.useState([1, 2]);
  const [actividades, setActividades] = React.useState([1, 2]);

  const [componenteActividad, setComponenteActividad] = React.useState([
    {
      componentes: componentes.map((x) => actividades),
    },
  ]);

  const [componenteValor, setComponenteValor] = React.useState<
    Array<IComponente>
  >([]);

  const agregarFnc = () => {
    let v = componentes.length + 1;
    if (v > 6) {
    } else {
      setComponentes([...componentes, v]);

      let array = [...componentes, v].map((x) => {
        return {
          resumen: "",
          indicador: "",
          frecuencia: "",
          formula: "",
          medios: "",
          supuestos: "",
        };
      });
      setComponenteValor(array);
    }
  };

  const eliminarFnc = () => {
    let v = componentes.length - 1;
    if (v < 2) {
    } else {
      setComponentes(componentes.splice(0, v));
    }
  };

  const agregarAFnc = (index: number) => {
    let v = actividades.length + 1;
    if (v > 6) {
    } else {
      setActividades([...actividades, v]);

      let xArray = [...componenteActividad];

      xArray[0]["componentes"][parseInt(componenteSelect)] = [
        ...actividades,
        v,
      ];

      setComponenteActividad(xArray);

      console.log(xArray);
    }
  };

  const eliminarAFnc = () => {
    let act = componenteActividad[0]["componentes"][parseInt(componenteSelect)];
    let v = act.length - 1;
    if (v < 2) {
    } else {
      let xArray = [...componenteActividad];

      xArray[0]["componentes"][parseInt(componenteSelect)] = act.splice(0, v);

      setComponenteActividad(xArray);
      console.log(xArray);
    }
  };

  useEffect(() => {
    let array = componentes.map((x) => {
      return {
        resumen: "",
        indicador: "",
        frecuencia: "",
        formula: "",
        medios: "",
        supuestos: "",
      };
    });
    setComponenteValor(array);
  }, []);

  const cargarArray = () => {
    let arrayComponente = [
      {
        componentes: componenteValor,
      },
    ];
    console.log(arrayComponente);
  };

  const AcordeonComponentes = ({ x }: { x: number }) => {
    return (
      <Accordion sx={{ width: "100vh" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Componente {x}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label={"Resumen Narrativo"}
            onChange={(c) => {
              componenteValor[x - 1].resumen = c.target.value;
              cargarArray();
            }}
          />
          <TextField
            label={"Indicador"}
            onChange={(c) => {
              componenteValor[x - 1].indicador = c.target.value;
              cargarArray();
            }}
          />
          <TextField
            label={"Fórmula"}
            onChange={(c) => {
              componenteValor[x - 1].formula = c.target.value;
              cargarArray();
            }}
          />
          <TextField
            label={"Frecuencia"}
            onChange={(c) => {
              componenteValor[x - 1].frecuencia = c.target.value;
              cargarArray();
            }}
          />
          <TextField
            label={"Medios de Verificación"}
            onChange={(c) => {
              componenteValor[x - 1].medios = c.target.value;
              cargarArray();
            }}
          />
          <TextField
            label={"Supuestos"}
            onChange={(c) => {
              componenteValor[x - 1].supuestos = c.target.value;
              cargarArray();
            }}
          />
        </AccordionDetails>
      </Accordion>
    );
  };

  const AcordeonActividades = ({ x, comp }: { x: number; comp: string }) => {
    return (
      <Accordion sx={{ width: "100vh" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Actividad {x} - Componente {comp}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label={"Resumen Narrativo"}
            onChange={(c) => {
              componenteValor[x - 1].resumen = c.target.value;
              cargarArray();
            }}
          />
          <TextField
            label={"Indicador"}
            onChange={(c) => {
              componenteValor[x - 1].indicador = c.target.value;
              cargarArray();
            }}
          />
          <TextField
            label={"Fórmula"}
            onChange={(c) => {
              componenteValor[x - 1].formula = c.target.value;
              cargarArray();
            }}
          />
          <TextField
            label={"Frecuencia"}
            onChange={(c) => {
              componenteValor[x - 1].frecuencia = c.target.value;
              cargarArray();
            }}
          />
          <TextField
            label={"Medios de Verificación"}
            onChange={(c) => {
              componenteValor[x - 1].medios = c.target.value;
              cargarArray();
            }}
          />
          <TextField
            label={"Supuestos"}
            onChange={(c) => {
              componenteValor[x - 1].supuestos = c.target.value;
              cargarArray();
            }}
          />
        </AccordionDetails>
      </Accordion>
    );
  };

  const [componenteSelect, setComponenteSelect] = React.useState("0");

  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
      <Box sx={{ position: "absolute" }}>
        <Button onClick={() => agregarFnc()}>AgregarC</Button>
        <Button onClick={() => eliminarFnc()}>EliminarC</Button>
      </Box>

      <Box sx={{ position: "absolute", right: 0 }}>
        <Button
          onClick={() => {
            agregarAFnc(parseInt(componenteSelect));
          }}
        >
          AgregarA
        </Button>
        <Button onClick={() => eliminarAFnc()}>EliminarA</Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",
        }}
      >
        {componentes.map((x) => {
          return <AcordeonComponentes key={x} x={x} />;
        })}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",
        }}
      >
        <Box>
          {componentes.map((x) => {
            return (
              <Button
                key={x}
                onClick={() => {
                  setActividades([1, 2]);
                  setComponenteSelect((x - 1).toString());
                  let xArray = [...componenteActividad];

                  xArray[0]["componentes"][x - 1] = xArray[0]["componentes"][
                    x - 1
                  ] || [1, 2];

                  setComponenteActividad(xArray);
                }}
              >
                C {x}
              </Button>
            );
          })}
        </Box>

        {componenteActividad[0]["componentes"][parseInt(componenteSelect)].map(
          (x) => {
            return (
              <AcordeonActividades
                comp={(parseInt(componenteSelect) + 1).toString()}
                key={x.toString()}
                x={x}
              />
            );
          }
        )}
      </Box>
    </Box>
  );
};

export interface IComponente {
  resumen: string;
  indicador: string;
  formula: string;
  frecuencia: string;
  medios: string;
  supuestos: string;
}
