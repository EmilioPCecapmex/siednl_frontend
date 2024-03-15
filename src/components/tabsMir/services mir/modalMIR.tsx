import ListAltIcon from "@mui/icons-material/ListAlt";
import { useState, useEffect } from "react";
import {
  Grid,
  Tooltip,
  IconButton,
  Button,
  Paper,
  Dialog,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
} from "@mui/material";
import { getMovimientosTrazabilidad } from "../../genericComponents/axiosGenericos";
import { TrazabilidadI } from "../../genericComponents/InterfacesGenerci";
import DataGridTable from "../../genericComponents/DataGridTable";
import { GridColDef } from "@mui/x-data-grid";

export const MostrarLista = ({ st, Id }: { st: string; Id: string }) => {
  // const steps = [
  //   {
  //     label: "LABEL 1",
  //     description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  //   },
  //   {
  //     label: "LABEL 2",
  //     description:
  //       "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  //   },
  //   {
  //     label: "LABEL 3",
  //     description: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  //   },
  // ];

  const [activeStep, setActiveStep] = useState(0);

  const [trazabilidad, setTrazabilidad] = useState<Array<TrazabilidadI>>([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    getMovimientosTrazabilidad(Id, setTrazabilidad);
    // console.log("Id: ",Id);
    //console.log("trazabilidad: ",trazabilidad);
  }, [trazabilidad]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columsTrazabilidad: GridColDef[] = [
    // {
    //   field: "Acciones",
    //   disableExport: true,
    //   headerName: "Acciones",
    //   description: "Acciones",
    //   sortable: false,
    //   flex: 1,
    //   renderCell: (v: any) => {
    //     return (
    //       <Grid>
    //         <Tooltip title="Eliminar descripcion">
    //           <IconButton
    //             onClick={() => {
    //               setCatalogoSelected(v.row);

    //               setOpenDel(true);
    //               //eliminar(v)
    //             }}
    //           >
    //             <DeleteIcon />
    //           </IconButton>
    //         </Tooltip>

    //         <Tooltip title="Editar descripcion">
    //           <IconButton
    //             onClick={() => {
    //               setCatalogoSelected(v.row);
    //               setOpenMody(true);
    //             }}
    //           >
    //             <EditIcon />
    //           </IconButton>
    //         </Tooltip>
    //       </Grid>
    //     );
    //   },
    // },
    {
      field: "Documentos",
      headerName: "Documentos",
      description: "Documentos",
      flex: 5,
    },
    {
      field: "Estatus",
      headerName: "Estatus",
      description: "Estatus",
      flex: 5,
    },
    {
      field: "FechaModificacion",
      headerName: "FechaModificacion",
      description: "FechaModificacion",
      flex: 5,
    },
    {
      field: "NombreUsuario",
      headerName: "NombreUsuario",
      description: "NombreUsuario",
      flex: 5,
    },
  ];

  return (
    <Grid>
      <Tooltip title="LISTA">
        <span>
          <IconButton onClick={handleClickOpen}>
            <ListAltIcon
              sx={{
                fontSize: "24px", // Tamaño predeterminado del icono

                "@media (max-width: 600px)": {
                  fontSize: 20, // Pantalla extra pequeña (xs y sm)
                },

                "@media (min-width: 601px) and (max-width: 960px)": {
                  fontSize: 20, // Pantalla pequeña (md)
                },

                "@media (min-width: 961px) and (max-width: 1280px)": {
                  fontSize: 20, // Pantalla mediana (lg)
                },

                "@media (min-width: 1281px)": {
                  fontSize: 25, // Pantalla grande (xl)
                },

                "@media (min-width: 2200px)": {
                  ffontSize: 25, // Pantalla grande (xl)
                },
              }}
            />
          </IconButton>
        </span>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            container
            item
            sx={{
              display: "flex",
              //flexDirection: "column",
            }}
          >
            <Typography>TRAZABILIDAD</Typography>
            <Grid
              item
              container
              direction={"row"}
              //justifyContent={"space-evenly"}
              alignItems={"center"}
              sx={{
                height: "80%",
                width: "auto",
                // flexDirection: "row",
                // alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
                display: "flex"
              }}
            >
              {/* {trazabilidad.map((item, index) => {
                return (
                  <Grid
                    item
                    container
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    sx={{
                      width: "auto",
                      flexDirection: "row",
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    <Grid
                      sx={{ justifyContent: "center", display: "flex" }}
                      item
                      xl={3}
                      lg={3}
                      md={3}
                      sm={12}
                      xs={12}
                    >
                      <Typography
                        sx={{
                          fontFamily: "MontserratMedium",

                          mt: 1,
                        }}
                      >
                        Documento: {item.Documentos}
                      </Typography>
                    </Grid>

                    <Grid
                      sx={{ justifyContent: "center", display: "flex" }}
                      item
                      xl={3}
                      lg={3}
                      md={3}
                      sm={12}
                      xs={12}
                    >
                      <Typography
                        sx={{
                          fontFamily: "MontserratMedium",

                          mt: 1,
                        }}
                      >
                        Estatus: {item.Estatus}
                      </Typography>
                    </Grid>

                    <Grid
                      sx={{ justifyContent: "center", display: "flex" }}
                      item
                      xl={3}
                      lg={3}
                      md={3}
                      sm={12}
                      xs={12}
                    >
                      <Typography
                        sx={{
                          fontFamily: "MontserratMedium",

                          mt: 1,
                        }}
                      >
                        Usuario: {item.NombreUsuario}
                      </Typography>
                    </Grid>

                    <Grid
                      sx={{ justifyContent: "center", display: "flex" }}
                      item
                      xl={3}
                      lg={3}
                      md={3}
                      sm={12}
                      xs={12}
                    >
                      <Typography
                        sx={{
                          fontFamily: "MontserratMedium",

                          mt: 1,
                        }}
                      >
                        Fecha del movimienti:{" "}
                        {item.FechaModificacion.slice(0, 10)}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              })} */}

              {/* <DataGridTable
                id={(row: any) => row.Id || Math.random}
                columns={columsTrazabilidad}
                rows={trazabilidad}
                camposCsv={[]}
                exportTitle={"Columnas"}
              /> */}

              {trazabilidad.map((label) => (
                <Step key={label.IdDoc}>
                  <StepContent>
                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",

                        mt: 1,
                      }}
                    >
                      {label.Documentos}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",

                        mt: 1,
                      }}
                    >
                      {label.Rol}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",

                        mt: 1,
                      }}
                    >
                      {label.Estatus}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",

                        mt: 1,
                      }}
                    >
                      {label.NombreUsuario}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",

                        mt: 1,
                      }}
                    >
                      {label.Nombre + " " + label.ApellidoPaterno + " " + label.ApellidoMaterno}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",

                        mt: 1,
                      }}
                    >
                      {label.FechaModificacion}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Grid>

            <Grid
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                height: "15%",
              }}
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
            >
              <Button
                fullWidth
                className="cancelar"
                variant="contained"
                onClick={handleClose}
              >
                <Typography sx={{ fontFamily: "MontserratMedium" }}>
                  Cerrar
                </Typography>{" "}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};
