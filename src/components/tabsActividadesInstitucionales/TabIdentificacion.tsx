import { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Autocomplete,
  CircularProgress,
  List,
  Divider,
  ListItemButton,
} from "@mui/material";
import { IIdentificacionActInst } from "./IIdentificacionActInst";
import { IAlineacionPlaneacion } from "./IAlineacionPlaneacion";
import { IObjetivosActividadInstitucional } from "./IObjetivosActividadInstitucional";


export function TabIdentificacion({
  show,

}: {
  show: boolean;
}) {

  const [componentSelect, setComponentSelect] = useState(1);

  const [identificacionActInst, setidentificacionActInst] = useState<IIdentificacionActInst>(
    {
      nombreActividadInstitucional: "",
      clasificacionProgramatica: "",
      institucion: "",
      temaPED: "",
      objetivoPED: "",
      conac: "",
      tipoBenefeciario: "",
      programa: "",
    }
  );

  const [alineacionPlaneacion, setAlineacionPlaneacion] = useState<IAlineacionPlaneacion>(
    {
      temaPED: "",
      objetivoPED: "",
      estrategiaPED: "",
      programaSectorial: "",
      objetivoProgramaSectorial: "",
    }
  );

  const [objetivosActividadInstitucional, setobjetivosActividadInstitucional] = useState<IObjetivosActividadInstitucional>(
    {

      objetivoGeneral: "",
      objetivoEspecifico1: "",
      objetivoEspecifico2: ""
    }
  );


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
      }}
    >

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
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

          <Box

            sx={{
              height: "15vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Divider />

            <ListItemButton
              selected={componentSelect === 1 ? true : false}
              onClick={() => setComponentSelect(1)}
              sx={{
                "&.Mui-selected ": {
                  backgroundColor: "#c4a57b",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#cbcbcb",
                },
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>IDENTIFICACIÓN DE LA ACTIVIDAD INSTITUCIONAL</Typography>
            </ListItemButton>
            <Divider />

            <ListItemButton
              selected={componentSelect === 2 ? true : false}

              onClick={() => setComponentSelect(2)}
              sx={{
                "&.Mui-selected ": {
                  backgroundColor: "#c4a57b",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#cbcbcb",
                },
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                ALINEACIÓN A LA PLANEACIÓN DEL DESARROLLO
              </Typography>
            </ListItemButton>
            <Divider />

            <ListItemButton
              selected={componentSelect === 3 ? true : false}

              onClick={() => setComponentSelect(3)}
              sx={{
                "&.Mui-selected ": {
                  backgroundColor: "#c4a57b",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#cbcbcb",
                },
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                OBJETIVOS DE LA ACTIVIDAD INSTITUCIONAL
              </Typography>
            </ListItemButton>

            <Divider />
          </Box>

        </List>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >

          {/* Identificacion de la Actividad Institucion --------------------------------------------------------------------------------- */}
          {componentSelect === 1 ? <Box sx={{ width: "100%", height: "100%", backgroundColor: "", }}>


            <Box sx={{ height: "100%" }}>
              <Box sx={{ backgroundColor: "", height: "15%", display: "flex", justifyContent: "center", alignItems: "center", }}> <Typography>IDENTIFICACIÓN DE LA ACTIVIDAD INSTITUCIONAL</Typography></Box>
              <Box sx={{ backgroundColor: "", height: "40%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                <TextField
                  multiline
                  rows={6}
                  variant="filled"
                  sx={{ width: "30%", boxShadow: 2 }}
                  label={"NOMBRE DE LA ACTIVIDAD INSTITUCIONAL:"}
                  value={identificacionActInst.nombreActividadInstitucional}
                  onChange={(c) => {
                    identificacionActInst.nombreActividadInstitucional = c.target.value;

                    setidentificacionActInst({ ...identificacionActInst, });
                  }}
                />
                <TextField
                  multiline
                  rows={6}
                  variant="filled"
                  sx={{ width: "30%", boxShadow: 2 }}
                  label={"CLASIFICACIÓN PROGRAMÁTICA:"}
                  value={identificacionActInst.clasificacionProgramatica}
                  onChange={(c) => {
                    identificacionActInst.clasificacionProgramatica = c.target.value;

                    setidentificacionActInst({ ...identificacionActInst });
                  }}
                />
                <TextField
                  multiline
                  rows={6}
                  variant="filled"
                  sx={{ width: "30%", boxShadow: 2 }}
                  label={"INSTITUCIÓN:"}
                  value={identificacionActInst.institucion}
                  onChange={(c) => {
                    identificacionActInst.institucion = c.target.value;

                    setidentificacionActInst({ ...identificacionActInst });
                  }}
                />
              </Box>

              <Box sx={{ backgroundColor: "", height: "35%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                <TextField
                  multiline
                  rows={1}
                  variant="filled"
                  sx={{ width: "17%", boxShadow: 2 }}
                  label={"Tema PED"}
                  value={identificacionActInst.temaPED}
                  onChange={(c) => {
                    identificacionActInst.temaPED = c.target.value;

                    setidentificacionActInst({ ...identificacionActInst });
                  }}
                />
                <TextField
                  multiline
                  rows={1}
                  variant="filled"
                  sx={{ width: "17%", boxShadow: 2 }}
                  label={"Objetivo PED"}
                  value={identificacionActInst.objetivoPED}
                  onChange={(c) => {
                    identificacionActInst.objetivoPED = c.target.value;

                    setidentificacionActInst({ ...identificacionActInst });
                  }}
                />
                <TextField
                  multiline
                  rows={1}
                  variant="filled"
                  sx={{ width: "17%", boxShadow: 2 }}
                  label={"CONAC"}
                  value={identificacionActInst.conac}
                  onChange={(c) => {
                    identificacionActInst.conac = c.target.value;

                    setidentificacionActInst({ ...identificacionActInst });
                  }}
                />
                <TextField
                  multiline
                  rows={1}
                  variant="filled"
                  sx={{ width: "17%", boxShadow: 2 }}
                  label={"Tipo Beneficiario"}
                  value={identificacionActInst.tipoBenefeciario}
                  onChange={(c) => {
                    identificacionActInst.tipoBenefeciario = c.target.value;

                    setidentificacionActInst({ ...identificacionActInst });
                  }}
                />
                <TextField
                  multiline
                  rows={1}
                  variant="filled"
                  sx={{ width: "17%", boxShadow: 2 }}
                  label={"Programa"}
                  value={identificacionActInst.programa}
                  onChange={(c) => {
                    identificacionActInst.programa = c.target.value;

                    setidentificacionActInst({ ...identificacionActInst });
                  }}
                />
              </Box>

            </Box>

          </Box> : null}

          {/* ---------------------------------------------------------------------------------------------------------------------------- */}

          {/*  ALINEACIÓN A LA PLANEACIÓN DEL DESARROLLO---------------------------------------------------------------------------------- */}
          {componentSelect === 2 ?
            <Box sx={{ width: "100%", height: "100%", }}>

              <Box sx={{ height: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}><Typography>ALINEACIÓN A LA PLANEACIÓN DEL DESARROLLO</Typography></Box>
              <Box sx={{ height: "40%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>


                <Autocomplete
                  disablePortal
                  size="small"
                  options={top100Films()}
                  getOptionLabel={(option) => option}
                  value={alineacionPlaneacion.temaPED}
                  onChange={(event, value) => {
                    setAlineacionPlaneacion({ ...alineacionPlaneacion, temaPED: (value as string) });
                  }}
                  sx={{ width: "30%" }}
                  renderInput={(params) => <TextField {...params} multiline rows={6.7} sx={{ width: "100%", boxShadow: 2 }} label="TEMA PED 2022-2027:" />}
                />


                <Autocomplete
                  disablePortal
                  size="small"
                  options={top100Films()}
                  getOptionLabel={(option) => option}
                  value={alineacionPlaneacion.objetivoPED}
                  onChange={(event, value) => {
                    setAlineacionPlaneacion({ ...alineacionPlaneacion, objetivoPED: (value as string) });
                  }}
                  sx={{ width: "30%" }}
                  renderInput={(params) => <TextField {...params} multiline rows={6.7} sx={{ width: "100%", boxShadow: 2 }} label="OBJETIVO PED 2022-2027:" />}
                />



                <Autocomplete
                  disablePortal
                  size="small"
                  options={top100Films()}
                  getOptionLabel={(option) => option}
                  value={alineacionPlaneacion.estrategiaPED}
                  onChange={(event, value) => {
                    setAlineacionPlaneacion({ ...alineacionPlaneacion, estrategiaPED: (value as string) });
                  }}
                  sx={{ width: "30%" }}
                  renderInput={(params) => <TextField {...params} multiline rows={6.7} sx={{ width: "100%", boxShadow: 2 }} label="ESTRATEGIA PED 2022-2027:" />}
                />

              </Box>
              <Box sx={{ height: "40%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>


                <TextField
                  multiline
                  rows={6}
                  variant="filled"
                  sx={{ width: "35%", boxShadow: 2 }}
                  label={"PROGRAMA SECTORIAL:"}
                  value={alineacionPlaneacion.programaSectorial}
                  onChange={(c) => {
                    setAlineacionPlaneacion({ ...alineacionPlaneacion, programaSectorial: c.target.value });
                  }}
                />
                <TextField
                  multiline
                  rows={6}
                  variant="filled"
                  sx={{ width: "35%", boxShadow: 2 }}
                  label={"OBJETIVO PROGRAMA SECTORIAL:"}
                  value={alineacionPlaneacion.objetivoProgramaSectorial}
                  onChange={(c) => {
                    setAlineacionPlaneacion({ ...alineacionPlaneacion, objetivoProgramaSectorial: c.target.value });
                  }}
                />
              </Box>
            </Box> : null}


          {/* ---------------------------------------------------------------------------------------------------------------------------- */}

          {/* Identificacion de la Actividad Institucion --------------------------------------------------------------------------------- */}
          {componentSelect === 3 ?
            <Box sx={{ width: "100%", height: "100%", }}>
              <Box sx={{ height: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}><Typography>OBJETIVOS DE LA ACTIVIDAD INSTITUCIONAL</Typography></Box>
              <Box sx={{ height: "40%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                <TextField
                  multiline
                  rows={6}
                  variant="filled"
                  sx={{ width: "80%", boxShadow: 2 }}
                  label={"OBJETIVO GENERAL"}
                  value={objetivosActividadInstitucional.objetivoGeneral}
                  onChange={(c) => {
                    setobjetivosActividadInstitucional({ ...objetivosActividadInstitucional, objetivoGeneral:c.target.value });
                  }}
                />

              </Box>
              <Box sx={{ height: "40%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                <TextField
                  multiline
                  rows={6}
                  variant="filled"
                  sx={{ width: "40%", boxShadow: 2 }}
                  label={"OBJETIVOS ESPECÍFICOS 1"}
                  value={objetivosActividadInstitucional.objetivoEspecifico1}
                  onChange={(c) => {
                    setobjetivosActividadInstitucional({ ...objetivosActividadInstitucional, objetivoEspecifico1:c.target.value });
                  }}
                />

                <Autocomplete
                  disablePortal
                  size="small"
                  options={top100Films()}
                  getOptionLabel={(option) => option}
                  value={objetivosActividadInstitucional.objetivoEspecifico2}
                  onChange={(event, value) => {
                    setobjetivosActividadInstitucional({ ...objetivosActividadInstitucional, objetivoEspecifico2: (value as string) });
                  }}
                  sx={{ width: "40%" }}
                  renderInput={(params) => <TextField {...params} multiline rows={6.7} sx={{ width: "100%", boxShadow: 2 }} label="OBJETIVOS ESPECÍFICOS 2" />}
                />

              </Box>
            </Box>
            : null}
          {/* ---------------------------------------------------------------------------------------------------------------------------- */}
        </Box>


      </Box>



    </Box>

  );
}

export default TabIdentificacion;

const top100Films = () => [
  'LOS ALUMNOS ASISTEN Y DAN CONTINUIDAD A SUS ESTUDIOS EN EL COLEGIO; LOS PADRES DE FAMILIA O TUTORES PERMITEN QUE SUS HIJOS RECIBAN APOYO INTEGRAL POR PARTE DEL COLEGIO',
  'LOS PROCESOS DE LICITACIÓN DE LA SECRETARÍA DE ADMINISTRACIÓN DEL GOBIERNO DEL ESTADO SE DAN EN TIEMPO Y FORMA Y NO SON DECLARADAS DESIERTAS' ,
  'LOS PROCESOS DE LICITACIÓN DE LA SECRETARÍA DE ADMINISTRACIÓN DEL GOBIERNO DEL ESTADO SE DAN EN TIEMPO Y FORMA Y NO SON DECLARADAS DESIERTAS Y LOS PROVEEDORES ENTREGAN LAS MATERIAS PRIMAS EN LAS FECHAS PROGRAMADAS Y EN LAS FORMAS INDICADAS',
  'CONTRIBUIR A INCREMENTAR LA TASA BRUTA DE COBERTURA EN EDUCACIÓN MEDIA SUPERIOR MEDIANTE LOS SERVICIOS QUE BRINDAN LAS INSTITUCIONES DE BACHILLERATO EN EL ESTADO'];