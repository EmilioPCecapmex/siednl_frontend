import { useEffect, useState } from "react";
import { FormControl, TextField, Box, Autocomplete } from "@mui/material";
import axios from "axios";
import { IFin, IProposito } from "./TabFinProposito";
import { IComponente } from "../tabsMir/IComponente";

export interface IEncabezado {
  ejercicioFiscal: string;
  institucion: string;
  nombre_del_programa: string;
  eje: string;
  tema: string;
  objetivo: string;
  estrategia: string;
  lineas_de_accion: Array<{ Id: string; LineaDeAccion: string }>;
  beneficiario: string;
}

export function TabEncabezadoMIR({
  show,
  cargaFin,
  cargaProposito,
  MIR,
  asignarComponente,
  asignarComponenteValor,
  resumenEncabezado,
  compAct,
  actividadesMir,
}: {
  show: boolean;
  cargaFin: Function;
  cargaProposito: Function;
  resumenEncabezado: Function;
  MIR: string;
  asignarComponente: Function;
  asignarComponenteValor: Function;
  compAct: Function;
  actividadesMir: Function;
}) {
  const [encabezado, setEncabezado] = useState<Array<IEncabezado>>([]);
  const [loadFin, setLoadFin] = useState<Array<IFin>>([]);
  const [loadProposito, setLoadProposito] = useState<Array<IProposito>>([]);

  const [loadComponentes, setLoadComponentes] = useState<Array<number>>([1, 2]);
  const [loadComponenteValor, setLoadComponenteValor] = useState<
    Array<IComponente>
  >([]);

  const [loadComponentesFinish, setLoadComponentesFinish] = useState(false);

  useEffect(() => {
    if (MIR !== "") {
      const jsonMir = JSON.parse(MIR)[0] || JSON.parse(MIR);
      setAnioFiscal(jsonMir.encabezado.ejercicioFiscal);
      setLoadFin([jsonMir.fin]);
      setLoadProposito([jsonMir.proposito]);
      setPrograma(jsonMir.encabezado.nombre_del_programa);
      setInstitution(jsonMir.encabezado.institucion);
      setEje(jsonMir.encabezado.eje);
      setTematica(jsonMir.encabezado.tema);
      setObjetivo(jsonMir.encabezado.objetivo);
      setEstrategia(jsonMir.encabezado.estrategia);
      setBeneficiario(jsonMir.encabezado.beneficiario);
      jsonMir.encabezado.lineas_de_accion.map(
        (value: { Id: string; LineaDeAccion: string }) => {
          getIdLineaDeAccion(value.LineaDeAccion);
        }
      );

      let act: number[] = [];
      let comp: string[] = [];
      let ambos: any = [];
      let i = 1;
      let j = 1;

      jsonMir.componentes.map((x: any) => {
        comp.push("C" + j);
        jsonMir.actividades.map((a: any) => {
          if (a.actividad.substring(0, 4) === "A" + i + "C" + j) {
            act.push(i);
            i++;
          }
        });
        ambos.push({ actividades: act, componente: "C" + j });
        act = [];
        i = 1;
        j++;
      });

      compAct(ambos);
      setLoadComponenteValor(jsonMir.componentes);
      actividadesMir(jsonMir.actividades);

      jsonMir.componentes?.map((value: any, index: number) => {
        if (index > 1 && index < 6)
          setLoadComponentes((loadComponentes) => [
            ...loadComponentes,
            index + 1,
          ]);
      });
      setLoadComponentesFinish(true);
    }
  }, [MIR]);

  //envio de valores a MIR
  useEffect(() => {
    asignarComponente(loadComponentes);
    asignarComponenteValor(loadComponenteValor);
    cargaFin(loadFin);
    cargaProposito(loadProposito);
  }, [loadComponentesFinish]);

  //saca la cantidad de componentes
  useEffect(() => {
    loadComponenteValor.map((value, index) => {
      if (index > 1 && index < 6)
        setLoadComponentes((loadComponentes) => [
          ...loadComponentes,
          index + 1,
        ]);
    });
  }, [loadComponenteValor]);

  //Values
  const [anioFiscal, setAnioFiscal] = useState("");
  const [institution, setInstitution] = useState("");
  const [programa, setPrograma] = useState("");
  const [eje, setEje] = useState("");
  const [tematica, setTematica] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [estrategia, setEstrategia] = useState("");
  const [lineaDeAccion, setLineaDeAccion] = useState<Array<ILineasDeAccion>>(
    []
  );
  const [beneficiario, setBeneficiario] = useState("");

  //Catalogos
  const [catalogoLineasDeAccion, setCatalogoLineasDeAccion] = useState([
    { Id: "0", LineaDeAccion: "" },
  ]);

  const getIdLineaDeAccion = (Description: string) => {
    axios
      .get("http://10.200.4.105:8000/api/mir-id", {
        params: {
          Col: "Lineas de Acción",
          Descripcion: Description,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.data.data.length !== 0) {
          lineaDeAccion.push(r.data.data[0]);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setEncabezado([
      {
        ejercicioFiscal: anioFiscal,
        institucion: institution,
        nombre_del_programa: programa,
        eje: eje,
        tema: tematica,
        objetivo: objetivo,
        estrategia: estrategia,
        lineas_de_accion: lineaDeAccion,
        beneficiario: beneficiario,
      },
    ]);
  }, [
    anioFiscal,
    institution,
    programa,
    eje,
    tematica,
    objetivo,
    estrategia,
    lineaDeAccion,
    beneficiario,
  ]);

  useEffect(() => {
    resumenEncabezado(encabezado);
  }, [encabezado]);

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        width: "75vw",
        height: "77vh",
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
      <FormControl sx={{ gridRow: "1", width: "20vw", mt: "6vh" }}>
        <TextField
          disabled
          value={anioFiscal}
          label={"Ejercicio Fiscal"}
          variant="standard"
          InputLabelProps={{
            style: {
              fontFamily: "MontserratSemiBold",
              fontSize: ".8vw",
            },
          }}
          InputProps={{
            style: {
              fontFamily: "MontserratRegular",
            },
          }}
        ></TextField>
      </FormControl>

      <Box
        sx={{
          gridColumn: "2/4",
          width: "30vw",
          height: "10vh",
          mt: "6vh",
        }}
      ></Box>

      <FormControl sx={{ width: "20vw", mt: "6vh" }}>
        <TextField
          disabled
          value={institution}
          label={"Institución"}
          variant="standard"
          InputLabelProps={{
            style: {
              fontFamily: "MontserratSemiBold",
              fontSize: ".8vw",
            },
          }}
          InputProps={{
            style: {
              fontFamily: "MontserratRegular",
            },
          }}
        ></TextField>
      </FormControl>

      <FormControl sx={{ width: "20vw", mt: "6vh" }}>
        <TextField
          disabled
          value={programa}
          label={"Programa"}
          variant="standard"
          InputLabelProps={{
            style: {
              fontFamily: "MontserratSemiBold",
              fontSize: ".8vw",
            },
          }}
          InputProps={{
            style: {
              fontFamily: "MontserratRegular",
            },
          }}
        ></TextField>
      </FormControl>

      <FormControl required sx={{ width: "20vw", mt: "6vh" }}>
        <TextField
          disabled
          value={eje}
          label={"Eje"}
          variant="standard"
          InputLabelProps={{
            style: {
              fontFamily: "MontserratSemiBold",
              fontSize: ".8vw",
            },
          }}
          InputProps={{
            style: {
              fontFamily: "MontserratRegular",
            },
          }}
        ></TextField>
      </FormControl>

      <FormControl required sx={{ width: "20vw", mt: "4vh" }}>
        <TextField
          disabled
          value={tematica}
          label={"Temática"}
          variant="standard"
          InputLabelProps={{
            style: {
              fontFamily: "MontserratSemiBold",
              fontSize: ".8vw",
            },
          }}
          InputProps={{
            style: {
              fontFamily: "MontserratRegular",
            },
          }}
        ></TextField>
      </FormControl>

      <FormControl required sx={{ width: "20vw", mt: "4vh" }}>
        <TextField
          disabled
          value={objetivo}
          label={"Objetivo"}
          variant="standard"
          InputLabelProps={{
            style: {
              fontFamily: "MontserratSemiBold",
              fontSize: ".8vw",
            },
          }}
          InputProps={{
            style: {
              fontFamily: "MontserratRegular",
            },
          }}
        ></TextField>
      </FormControl>

      <FormControl required sx={{ width: "20vw", mt: "4vh" }}>
        <TextField
          disabled
          value={estrategia}
          label={"Estrategia"}
          variant="standard"
          InputLabelProps={{
            style: {
              fontFamily: "MontserratSemiBold",
              fontSize: ".8vw",
            },
          }}
          InputProps={{
            style: {
              fontFamily: "MontserratRegular",
            },
          }}
        ></TextField>
      </FormControl>

      <FormControl
        required
        sx={{
          gridColumnStart: "1",
          gridColumnEnd: "3",
          width: "35vw",
        }}
      >
        <Autocomplete
          multiple
          limitTags={4}
          disabled
          options={catalogoLineasDeAccion}
          size="small"
          getOptionLabel={(option) => option.LineaDeAccion}
          value={lineaDeAccion}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"Lineas de Acción"}
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
          isOptionEqualToValue={(
            option: {
              Id: string;
              LineaDeAccion: string;
            },
            value: {
              Id: string;
              LineaDeAccion: string;
            }
          ) => value.Id === option.Id}
        />
      </FormControl>

      <FormControl required sx={{ width: "20vw" }}>
        <TextField
          disabled
          value={beneficiario}
          label={"Beneficiario"}
          variant="standard"
          InputLabelProps={{
            style: {
              fontFamily: "MontserratSemiBold",
              fontSize: ".8vw",
            },
          }}
          InputProps={{
            style: {
              fontFamily: "MontserratRegular",
            },
          }}
        ></TextField>
      </FormControl>
    </Box>
  );
}

export default TabEncabezadoMIR;

export interface ILineasDeAccion {
  Id: string;
  LineaDeAccion: string;
}
