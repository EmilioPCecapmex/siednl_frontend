import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
  FormControl,
  Autocomplete,
  Tooltip,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './CapturaRaffi.css';
import { IComponenteMA } from "././Interfaces";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const GridTable = () => {
  return (
    <div className="grid-container">
      <table>
        <thead>
          <tr>
            <th>I</th>
            <th>II</th>
            <th>III</th>
            <th>IV</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td></td>
          </tr>
          <tr>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GridTable;

export const TabComponenteRf = ({
  show,
  valoresComponenteMAFnc,
  noComponentes,
  showMirFnc,
  setTxtShowFnc,
  MA,
  MIR,
}: {
  show: boolean;
  valoresComponenteMAFnc: Function;
  noComponentes: number[];
  showMirFnc: Function;
  setTxtShowFnc: Function;
  MA: string;
  MIR: string;
}) => {

  const [componentSelect, setComponentSelect] = useState(1);

  const [componentesValues, setComponentesValues] = useState<
    Array<IComponenteMA>
  >([]);

  let jsonMA =
    MA === ""
      ? ""
      : JSON.parse(MA).length > 1
      ? JSON.parse(MA)[0]
      : JSON.parse(MA);

  let MAEdit =
    MA === "" ? "" : JSON.parse(MA).length > 1 ? JSON.parse(MA)[1] : "";

  useEffect(() => {
    let comp: IComponenteMA[] = [];

    noComponentes.map((x, index) => {
      return comp.push({
        componentes: "C" + (index + 1),
        metaAnual: MA === "" ? "" : jsonMA?.componentes[index]?.metaAnual || "",
        lineaBase: MA === "" ? "" : jsonMA?.componentes[index]?.lineaBase || "",
        metasPorFrecuencia: [
          {
            semestre1:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.semestre1 || "",
            semestre2:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.semestre2 || "",
            trimestre1:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre1 || "",
            trimestre2:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre2 || "",
            trimestre3:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre3 || "",
            trimestre4:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre4 || "",
          },
        ],

        valorNumerador:
          MA === "" ? "" : jsonMA?.componentes[index]?.valorNumerador || "",
        valorDenominador:
          MA === "" ? "" : jsonMA?.componentes[index]?.valorDenominador || "",
        sentidoDelIndicador:
          MA === ""
            ? ""
            : jsonMA?.componentes[index]?.sentidoDelIndicador || "",

        unidadResponsable:
          MA === "" ? "" : jsonMA?.componentes[index]?.unidadResponsable || "",

        descIndicador:
          MA === "" ? "" : jsonMA?.componentes[index]?.descIndicador || "",
        descNumerador:
          MA === "" ? "" : jsonMA?.componentes[index]?.descNumerador || "",
        descDenominador:
          MA === "" ? "" : jsonMA?.componentes[index]?.descDenominador || "",
      });
    });

    setComponentesValues(comp);
  }, [noComponentes]);

  useEffect(() => {
    valoresComponenteMAFnc(componentesValues);
  }, [componentesValues]);

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");

  const [openFormulaDialogMACA, setOpenFormulaDialogMACA] = useState(false);
  const [frecuencia, setFrecuencia] = useState("");

  const handleClickOpen = () => {
    setTipoFormula(
      JSON.parse(MIR)
        .componentes[componentSelect - 1].indicador.toUpperCase()
        .includes("PORCENTAJE") ||
        JSON.parse(MIR)
          .componentes[componentSelect - 1].indicador.toUpperCase()
          .includes("PORCENTAJE")
        ? "Porcentaje"
        : JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("TASA") ||
          JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("TASA")
        ? "Tasa"
        : JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("INDICE" || "ÍNDICE") ||
          JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("INDICE") ||
          JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("ÍNDICE")
        ? "Índice"
        : JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("PROMEDIO") ||
          JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("PROMEDIO")
        ? "Promedio"
        : ""
    );
    setElementoFormula("Componente " + componentSelect.toString());
    setOpenFormulaDialog(true);
  };

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const handleClickOpen2 = () => {
    setTipoFormula(
      JSON.parse(MIR)
        .componentes[componentSelect - 1].indicador.toUpperCase()
        .includes("PORCENTAJE") ||
        JSON.parse(MIR)
          .componentes[componentSelect - 1].indicador.toLowerCase()
          .includes("porcentaje")
        ? "Porcentaje"
        : JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("TASA") ||
          JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toLowerCase()
            .includes("tasa")
        ? "Tasa"
        : JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("INDICE" || "ÍNDICE") ||
          JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toLowerCase()
            .includes("indice") ||
          JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toLowerCase()
            .includes("índice")
        ? "Indice"
        : JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("PROMEDIO") ||
          JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toLowerCase()
            .includes("promedio")
        ? "Promedio"
        : ""
    );
    setElementoFormula("Componente " + componentSelect.toString());
    setOpenFormulaDialogMACA(true);
  };

  const handleClose2 = () => {
    setOpenFormulaDialogMACA(false);
  };

  const changeFormula = (txt: string) => {
    if (
      JSON.parse(MIR)
        .componentes[componentSelect - 1].indicador.toLowerCase()
        .includes("indice") ||
      JSON.parse(MIR)
        .componentes[componentSelect - 1].indicador.toLowerCase()
        .includes("índice")
    ) {
      componentesValues[componentSelect - 1].valorNumerador = txt;
      componentesValues[componentSelect - 1].metaAnual = txt;
    } else {
      componentesValues[componentSelect - 1].valorNumerador = txt.split(",")[0];
      componentesValues[componentSelect - 1].valorDenominador =
        txt.split(",")[1];
      componentesValues[componentSelect - 1].metaAnual = txt.split(",")[2];
    }

    setComponentesValues([...componentesValues]);
  };

  const changeFormula2 = (txt: string) => {
    if (frecuencia === "trimestral") {
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].trimestre1 =
        txt.split(",")[0];
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].trimestre2 =
        txt.split(",")[1];
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].trimestre3 =
        txt.split(",")[2];
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].trimestre4 =
        txt.split(",")[3];
    } else {
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].semestre1 =
        txt.split(",")[0];
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].semestre2 =
        txt.split(",")[1];
    }

    setComponentesValues([...componentesValues]);
  };

  const [catalogoUnidadResponsable, setCatalogoUnidadResponsable] = useState([
    {
      Id: "",
      Unidad: "",
    },
  ]);





  return (
    <Grid
    
      position="absolute"
      sx={{
        display: "flex",
        width: "75vw",
        height: "75vh",
        boxShadow: 10,
        borderRadius: 5,
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Grid container>
        <Grid item xs={2}>
          <Item>
            {/* <Grid>
              Componente 1
            </Grid>
            <Grid>
              Componente 2
            </Grid> */}





        <List
          sx={{
            width: "10vw",
            height: "65vh",
            borderRight: "solid",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
          {noComponentes.map((item) => {
            return (
              <Box
                key={item}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Divider />
                <ListItemButton
                  selected={item === componentSelect ? true : false}
                  key={item}
                  onClick={() => {
                    setComponentSelect(item);
                  }}
                  sx={{
                    height: "7vh",
                    "&.Mui-selected ": {
                      backgroundColor: "#c4a57b",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#cbcbcb",
                    },
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", fontSize: "0.7vw" }}
                  >
                    COMPONENTE {item}
                  </Typography>
                </ListItemButton>

                <Divider />
              </Box>
            );
          })}
        </List>









          </Item>
        </Grid>
        <Grid item xs={10}>
          <Item>
            TÍTULO

            <GridTable />
          </Item>
        </Grid>
      </Grid>
    </Grid>
  );
};

