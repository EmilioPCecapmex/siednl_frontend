import { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  List,
  Divider,
  ListItemButton,
  Autocomplete,
  FormControl,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
//import { IAI } from "../../screens/InterfacesActividadesInstitucionales";
import { IAI } from "../../screens/actividadesInstitucionales/InterfacesActividadesInstitucionales";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { IAccion } from "./IAccion1";
import { clearInfo } from "../genericComponents/GenericMethods";
export function TabAccion1({
  AI,
  noAcciones,
  addAccion,
  addremoveAccion,
  setAi,
}: {
  AI: IAI;
  noAcciones: number[];
  addAccion: Function;
  addremoveAccion: Function;
  setAi: Function;
}) {
  const [componentSelect, setComponentSelect] = useState(1);
  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [acciones, setAcciones] = useState<Array<IAccion>>(AI.acciones);
  const [prevTextFormula, setPrevTextFormula] = useState("");
  const [errorIndicador, setErrorIndicador] = useState(-1);
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");

  useEffect(() => {
    setAcciones(AI.acciones);
  }, [AI]);

  useEffect(() => {
    setAi((AI: IAI) => ({
      ...AI,
      ...{
        acciones: acciones,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acciones]);

  

  const handleClickOpen = () => {
    setPrevTextFormula(AI.acciones[componentSelect - 1].formula);
    setOpenFormulaDialog(true);
  };

  const evalueTxtIndicador = () => {
    const cIndicador =
      AI.acciones[componentSelect - 1].nombreIndicador?.toLowerCase();
    if (cIndicador !== undefined) {
      if (cIndicador.includes("porcentaje" || "PORCENTAJE")) {
        setTipoFormula("Porcentaje");
        setElementoFormula("Componente " + componentSelect.toString());
        handleClickOpen();
        setErrorIndicador(-1);
      } else if (cIndicador.includes("tasa")) {
        setTipoFormula("Tasa");
        setElementoFormula("Componente " + componentSelect.toString());
        handleClickOpen();
        setErrorIndicador(-1);
      } else if (cIndicador.includes("indice" || "índice" || "Índice")) {
        setTipoFormula("Índice");
        setElementoFormula("Componente " + componentSelect.toString());
        handleClickOpen();
        setErrorIndicador(-1);
      } else if (cIndicador.includes("promedio")) {
        setTipoFormula("Promedio");
        setElementoFormula("Componente " + componentSelect.toString());
        handleClickOpen();
        setErrorIndicador(-1);
      } else {
        setErrorIndicador(componentSelect - 1);
        let prevLocal = [...AI.acciones];
        prevLocal[componentSelect - 1].nombreIndicador = "";
        setAcciones(prevLocal);
      }
    }
  };

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <Grid
      sx={{
        width: "93vw",
        height: "82vh",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        backgroundColor: "#fff",
        boxShadow: 20,
        borderRadius: 5,
        overflow: "auto",
      }}
    >
      <Grid
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        {!isSmallScreen && (
          <List
            sx={{
              width: "15vw",
              height: "100%",
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
            {noAcciones.map((item) => {
              return (
                <Grid
                  sx={{
                    //height: "15vh",
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
                      sx={{
                        fontFamily: "MontserratMedium",
                        fontSize: [10, 10, 10, 13, 15, 18],
                      }}
                    >
                      Accion {item}
                    </Typography>
                  </ListItemButton>
                </Grid>
              );
            })}
          </List>
        )}
        <Grid
          item
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          sx={{
            "& > .MuiGrid-item": {
              marginBottom: "20px", // Ajusta la cantidad de espacio vertical entre los elementos
            },
          }}
        >
          {/* <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{
              //alignContent: "center",
              display: "flex",
              //justifyContent: "center",
              justifyContent: "flex-end",
              alignItems: "center",
              //backgroundColor: "blue"
            }}
          > */}
          {isSmallScreen && (
            <List
             
            >
              {noAcciones.map((item) => {
                return (
                  <Grid
                    sx={{
                      //height: "15vh",
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
                        sx={{
                          fontFamily: "MontserratMedium",
                          fontSize: [10, 10, 10, 13, 15, 18],
                        }}
                      >
                        Accion {item}
                      </Typography>
                    </ListItemButton>
                  </Grid>
                );
              })}
            </List>
          )}

          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={4}
            xs={11}
            sx={{
              //alignContent: "center",
              display: "flex",

              //justifyContent: "center",
              justifyContent: ["center", "flex-end", "flex-end", "flex-end", "flex-end"],

              alignItems: "center",
              //backgroundColor: "blue"
            }}
          >
            <Tooltip title="RESUMEN">
              <InfoOutlinedIcon
                fontSize="large"
                sx={{ cursor: "pointer" }}
              ></InfoOutlinedIcon>
            </Tooltip>
            <Typography
              sx={{
                fontFamily: "MontserratBold",
                fontSize: ["2vh", "2vh", "2vh", "3vh", "4vh", "4vh"],
              }}
            >
              Datos de la linea de las metas
            </Typography>
          </Grid>

          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={4}
            xs={11}
            sx={{
              //alignContent: "center",
              display: "flex",
              //justifyContent: "center",
              justifyContent: ["center", "flex-end", "flex-end", "flex-end", "flex-end"],
              alignItems: "center",
              //backgroundColor: "blue"
            }}
          >
            <Tooltip title="RESUMEN">
              <InfoOutlinedIcon
                fontSize="large"
                sx={{ cursor: "pointer" }}
              ></InfoOutlinedIcon>
            </Tooltip>
            <Typography
              sx={{
                fontFamily: "MontserratBold",
                fontSize: ["2vh", "2vh", "2vh", "3vh", "4vh", "4vh"],
              }}
            >
              Acción - Datos del Indicador
            </Typography>
          </Grid>

          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={4}
            xs={11}
            sx={{
              //alignContent: "center",
              display: "flex",
              //justifyContent: "center",
              justifyContent: ["center", "flex-end", "flex-end", "flex-end", "flex-end"],
              alignItems: "center",
              //backgroundColor: "blue"
            }}
          >
            <IconButton
              onClick={() => {
                addAccion();
                setComponentSelect(AI.acciones.length + 1);
              }}
              disabled={AI.acciones.length === 2}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
            <IconButton
              onClick={() => {
                addremoveAccion();
                setComponentSelect(AI.acciones.length - 1);
              }}
              disabled={AI.acciones.length <= 1}
            >
              <DoDisturbOnIcon fontSize="large" />
            </IconButton>
            <Typography
              sx={{
                mr: "1vw",
                fontFamily: "MontserratSemiBold",
                fontSize: ["2vh", "2vh", "2vh", "3vh", "4vh", "4vh"],
              }}
            >
              ACCION #{componentSelect}
            </Typography>
          </Grid>

          {/* </Grid> */}

          {/* <Grid
            item
            xl={11}
            lg={11}
            md={11}
            sm={11}
            xs={11}
            sx={{
              //alignContent: "center",
              display: "flex",
              //justifyContent: "center",
              justifyContent: "flex-end",
              //alignItems: "flex-start"
              //backgroundColor: "blue"
            }}
          ></Grid> */}

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              rows={4}
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              variant="filled"
              sx={{ boxShadow: 2 }}
              label={"Descripción de la accion"}
              onChange={(c) => {
                let prevLocal = [...acciones];
                prevLocal[componentSelect - 1].descripcion = clearInfo(c.target.value)
                setAcciones(prevLocal);
              }}
              value={acciones[componentSelect - 1]?.descripcion}
            />
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              rows={4}
              variant="filled"
              sx={{ boxShadow: 2 }}
              label={"Nombre del Indicador"}
              error={errorIndicador === componentSelect - 1 ? true : false}
              helperText={
                errorIndicador === componentSelect - 1
                  ? "Incluir tipo de indicador: Porcentaje, Tasa, Indice ó Promedio. "
                  : null
              }
              onChange={(c) => {
                let prevLocal = [...acciones];
                prevLocal[componentSelect - 1].nombreIndicador = clearInfo(c.target.value)
                setAcciones(prevLocal);
              }}
              value={acciones[componentSelect - 1]?.nombreIndicador}
            />
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              rows={4}
              variant="filled"
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              sx={{ boxShadow: 2 }}
              label={"Fórmula de Cálculo"}
              onClick={() => {
                evalueTxtIndicador();
              }}
              value={acciones[componentSelect - 1]?.formula}
            />
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              rows={4}
              variant="filled"
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              sx={{ boxShadow: 2 }}
              label={"Numerador"}
              onChange={(c) => {
                let prevLocal = [...acciones];
                prevLocal[componentSelect - 1].numerador = clearInfo(c.target.value)
                setAcciones(prevLocal);
              }}
              value={acciones[componentSelect - 1]?.numerador}
            />
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              rows={4}
              variant="filled"
              sx={{ boxShadow: 2 }}
              label={"Unidad de Medida"}
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              onChange={(c) => {
                let prevLocal = [...acciones];
                prevLocal[componentSelect - 1].unidadMedida = clearInfo(c.target.value)
                setAcciones(prevLocal);
              }}
              value={acciones[componentSelect - 1]?.unidadMedida}
            />
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              rows={4}
              variant="filled"
              sx={{ boxShadow: 2 }}
              label={"Medio de Verificación / Fuente de Información"}
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              onChange={(c) => {
                let prevLocal = [...acciones];
                prevLocal[componentSelect - 1].medio_fuente = clearInfo(c.target.value)
                setAcciones(prevLocal);
              }}
              value={acciones[componentSelect - 1]?.medio_fuente}
            />
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              rows={4}
              variant="filled"
              sx={{ boxShadow: 2 }}
              label={"Denominador"}
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              onChange={(c) => {
                let prevLocal = [...acciones];
                prevLocal[componentSelect - 1].denomidador = clearInfo(c.target.value)
                setAcciones(prevLocal);
              }}
              value={acciones[componentSelect - 1]?.denomidador}
            />
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              rows={4}
              variant="filled"
              sx={{ boxShadow: 2 }}
              label={"Unidad de Medida"}
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              onChange={(c) => {
                let prevLocal = [...acciones];
                prevLocal[componentSelect - 1].unidadMedida = clearInfo(c.target.value)
                setAcciones(prevLocal);
              }}
              value={acciones[componentSelect - 1]?.unidadMedida}
            />
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              rows={4}
              variant="filled"
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              sx={{ boxShadow: 2 }}
              label={"Medio de Verificación / Fuente de Información"}
              onChange={(c) => {
                let prevLocal = [...acciones];
                prevLocal[componentSelect - 1].medio_fuente2 = clearInfo(c.target.value)
                setAcciones(prevLocal);
              }}
              value={acciones[componentSelect - 1]?.medio_fuente2}
            />
          </Grid>

          {/* ---------------------------------------------------------------------------------------------------------------------------- */}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TabAccion1;

const top100Films = () => [
  "Lorem ipsum dolor",
  "Sit amet consectetur",
  "Itaque facere ut voluptatum",
  "Ullam voluptatem accusantium",
];

const periodo = [2021, 2022, 2023, 2024, 2025, 2026, 2027];
