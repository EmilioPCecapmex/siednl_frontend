/* eslint-disase array-callback-return */
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import {
  IActividad,
  IComponente,
  IMIR,
  IMIREdit,
  IMovimientos,
} from "./interfaces mir/IMIR";
import { TabActividades } from "./TabActividades";
import { TabComponente } from "./TabComponente";
import TabEncabezado from "./TabEncabezado";
import TabFinProposito from "./TabFinProposito";
import TabResumen, { IComponenteMirEdit } from "./TabResumen";
import { alertaError } from "../genericComponents/Alertas";
import GenericTabs from "../genericComponents/genericTabs";
import { getMAyFT } from "../../services/mir_services/MIR_services";

const tabs = [
  "Encabezado",
  "Fin / Propósito",
  "Componentes",
  "Actividades",
  "Resumen",
];

function newActividad(indexComponente: number, indexActividad: number) {
  return {
    actividad: `A${indexActividad}C${indexComponente}`,
    resumen: "",
    indicador: "",
    frecuencia: "TRIMESTRAL",
    formula: "",
    medios: "",
    supuestos: "",
  };
}

function newComponente(index: number) {
  let componente: IComponente;
  componente = {
    componente: "C" + index,
    resumen: "",
    indicador: "",
    frecuencia: "",
    formula: "",
    medios: "",
    supuestos: "",
    actividades: [1, 2].map((item) => newActividad(index, item)),
  };
  return componente;
}

function newActividadboolean(ActividadMIR: IActividad) {
  return {
    actividad: ActividadMIR.actividad,
    resumen: false,
    indicador: false,
    frecuencia: false,
    formula: false,
    medios: false,
    supuestos: false,
  };
}

function newComponenteboolean(ComponenteMIR: IComponente) {
  let componente: IComponenteMirEdit;
  componente = {
    componente: ComponenteMIR.componente,
    resumen: false,
    indicador: false,
    frecuencia: false,
    formula: false,
    medios: false,
    supuestos: false,
    actividades: ComponenteMIR.actividades.map((item) =>
      newActividadboolean(item)
    ),
  };
  return componente;
}

function newEncabezadoboolean() {
  return {
    ejercicioFiscal: false,
    institucion: false,
    nombre_del_programa: false,
    eje: false,
    tema: false,
    objetivo: false,
    estrategia: false,
    lineas_de_accion: false,
    beneficiario: false,
    conac: false,
    consecutivo: false,
  };
}

function newFinPropositoboolean() {
  return {
    resumen: false,
    indicador: false,
    formula: false,
    frecuencia: false,
    medios: false,
    supuestos: false,
  };
}

function newMIREDIT(MIR: string) {
  let componentes: IComponente[] = JSON.parse(MIR).componentes;

  return {
    encabezado: newEncabezadoboolean(),
    fin: newFinPropositoboolean(),
    proposito: newFinPropositoboolean(),
    componentes: componentes?.map((item) => newComponenteboolean(item)),
  };
}

export default function FullModalMir({
  MIR,
  showResume,
  IdMir,
  anioFiscalEdit,
  estado,
}: {
  MIR: string;
  showResume: Function;
  IdMir: string;
  anioFiscalEdit: string;
  estado: string;
}) {
  // useEffect(() => {
  //   getMAyFT(IdMir);
  // }, [])

  const [value, setValue] = useState(0);

  const noComponentes = [1, 2];

  //let mDocumentos: IMovimientos[] = []

  const movimientos = (movimientos: string, indices: string) => {
    let Documentos: IMovimientos = {
      movimiento: movimientos,
      indice: indices,
    };

    let auxMDocumentos: IMovimientos[] = mDocumentos;
    auxMDocumentos.push(Documentos);

    SetMDocumentos(auxMDocumentos);

    // return Documentos
  };

  const [mDocumentos, SetMDocumentos] = useState<IMovimientos[]>([]);

  let mir: IMIR =
    MIR !== ""
      ? JSON.parse(MIR).length > 1
        ? JSON.parse(MIR)[0]
        : JSON.parse(MIR)
      : {
          encabezado: {
            ejercicioFiscal: "",
            entidad: "",
            nombre_del_programa: "",
            eje: "",
            tema: "",
            objetivo: "",
            estrategia: "",
            lineas_de_accion: [],
            beneficiario: "",
            conac: "",
            consecutivo: "",
            anticorrupcion: "NO",
          },
          fin: {
            resumen: "",
            indicador: "",
            formula: "",
            frecuencia: "",
            medios: "",
            supuestos: "",
          },
          proposito: {
            resumen: "",
            indicador: "",
            formula: "",
            frecuencia: "ANUAL",
            medios: "",
            supuestos: "",
          },
          componentes: noComponentes.map((item) => {
            return newComponente(item);
          }),
        };

  const [MIRPADRE, setMIRPADRE] = useState<IMIR>(mir);

  const [mirEdirPadre, setMIREDITPADRE] = useState<IMIREdit>(
    newMIREDIT(JSON.stringify(mir))
  );

  const [editMIR, setEditMIR] = useState(false);

  useEffect(() => {
    if (MIR !== "") {
      let auxArrayMIR = JSON.parse(MIR);
      if (auxArrayMIR[1]) {
        setEditMIR(true);
        setMIREDITPADRE({ ...auxArrayMIR[1] });
        setMIRPADRE(auxArrayMIR[0]);
      } else {
        setMIRPADRE(auxArrayMIR);
      }
    }
  }, []);

  const addComponente = () => {
    let arrComponentes: IComponente[] = MIRPADRE.componentes;
    arrComponentes.push(newComponente(MIRPADRE.componentes.length + 1));
    setMIREDITPADRE(
      newMIREDIT(JSON.stringify({ ...MIRPADRE, componentes: arrComponentes }))
    );
    setMIRPADRE({ ...MIRPADRE, componentes: arrComponentes });

    movimientos("add", "C" + MIRPADRE.componentes.length);
  };

  const removeComponente = (componenteSelected: number) => {
    let arrComponentes: IComponente[] = MIRPADRE.componentes.filter(
      (componente) => !componente.componente.includes(`C${componenteSelected}`)
    );
    movimientos("remove", "C" + componenteSelected);
    arrComponentes = arrComponentes.map((componente, index) => {
      if (parseInt(componente.componente.split("C")[1]) >= componenteSelected) {
        let aux = {
          ...componente,
          componente: `C${index + 1}`,
          actividades: componente.actividades.map((item) => {
            return {
              ...item,
              actividad: item.actividad.replace(/C\d+/, `C${index + 1}`),
            };
          }),
        };

        return aux;
      } else {
        return componente;
      }
    });
    setMIREDITPADRE(
      newMIREDIT(JSON.stringify({ ...MIRPADRE, componentes: arrComponentes }))
    );
    setMIRPADRE({ ...MIRPADRE, componentes: arrComponentes });
  };

  const addActividad = (componenteSelect: number) => {
    let arrComponentes: IComponente[] = MIRPADRE.componentes;

    arrComponentes = arrComponentes.map((item, index) => {
      if (index + 1 === componenteSelect) {
        let aux = item.actividades;

        aux.push(newActividad(componenteSelect, item.actividades.length + 1));
        return { ...item, actividades: aux };
      } else {
        return item;
      }
    });

    setMIREDITPADRE(
      newMIREDIT(JSON.stringify({ ...MIRPADRE, componentes: arrComponentes }))
    );
    setMIRPADRE({ ...MIRPADRE, componentes: arrComponentes });
  };

  const removeActividad = (
    componenteSelect: number,
    actividadSelect: number
  ) => {
    let arrComponentes: IComponente[] = MIRPADRE.componentes;
    if (arrComponentes[componenteSelect - 1].actividades.length > 2) {
      arrComponentes = arrComponentes.map((componente, index) => {
        let arrActividades = componente.actividades.filter(
          (item) => item.actividad !== `A${actividadSelect}C${componenteSelect}`
        );
        arrActividades = arrActividades.map((item, current) => {
          return { ...item, actividad: `A${current + 1}C${index + 1}` };
        });
        return { ...componente, actividades: arrActividades };
      });
      setMIREDITPADRE(
        newMIREDIT(JSON.stringify({ ...MIRPADRE, componentes: arrComponentes }))
      );
      setMIRPADRE({ ...MIRPADRE, componentes: arrComponentes });
    } else {
      alertaError("El minimo de componentes son dos.");
    }
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        height: "100%",
      }}
    >
      <Grid
        container
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{
          width: "auto",
          height: "100%",
        }}
      >
        <Grid
          sx={{
            //width: "93vw",
            width: ["300xp", "750px", "750px", "1100px", "1200px"],
            height: "82vh",

            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <GenericTabs tabsData={tabs} tabSelect={setValue} />

          <Grid
            sx={{
              width: ["300px", "650px", "900px", "1000px", "1100px", "1300px"],
              height: "82vh",
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TabEncabezado
              edit={editMIR}
              show={value === 0 ? true : false}
              MIR={MIRPADRE}
              setMIR={setMIRPADRE}
              mirEdit={mirEdirPadre}
            />

            {value === 1 && (
              <TabFinProposito
                edit={editMIR}
                MIR={MIRPADRE}
                setMIR={setMIRPADRE}
                mirEdit={mirEdirPadre}
              />
            )}

            {value === 2 && (
              <TabComponente
                edit={editMIR}
                noComponentes={noComponentes}
                addComponente={addComponente}
                removeComponente={removeComponente}
                MIR={MIRPADRE}
                setMIR={setMIRPADRE}
                idMir={IdMir}
                mirEdit={mirEdirPadre}
              />
            )}

            {value === 3 && (
              <TabActividades
                edit={editMIR}
                addActividad={addActividad}
                removeActividad={removeActividad}
                MIR={MIRPADRE}
                setMIR={setMIRPADRE}
                idMir={IdMir}
                mirEdit={mirEdirPadre}
              />
            )}

            {value === 4 && (
              <TabResumen
                showResume={showResume}
                MIRPADRE={MIRPADRE}
                idMir={IdMir}
                estadoMIR={estado}
                mDocumentos={mDocumentos}
                mirEdit={mirEdirPadre}
                setMIREDITPADRE={setMIREDITPADRE}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
