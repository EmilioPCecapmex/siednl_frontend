import React, { useEffect, useState } from "react";
import axios from "axios";
import { DeleteDialog } from "../deleteDialog/DeleteDialog";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Tooltip,
  IconButton,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ModalEditarUsuario from "../modalUsuarios/ModalEditarUsuario";
import AppsDialog from "../appsDialog/AppsDialog";
import DataUsuariosTiCentral from "./interface";

// Selecciona inicial Nombre + inicial Apellido
function stringAvatar(Nombre: string, ApellidoPaterno: string) {
  return `${Nombre.split(" ")[0][0]}${ApellidoPaterno.split(" ")[0][0]}`;
}

export const DataTable = ({
  textFind,
  actualizar,
}: {
  textFind: string;
  actualizar: number;
}) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    //getUsuarios();
  }, [actualizar]);

  //# Renglones por pag
  const renglonesPagina = 6;
  const [rowsPerPage, setRowsPerPage] = useState(renglonesPagina);
  const [usuarios, setUsuarios] = useState<Array<DataUsuariosTiCentral>>([]);

  //
  const [usersFiltered, setUsersFiltered] = useState<
    Array<DataUsuariosTiCentral>
  >([]);

  // Consumo de API
  // const getUsuarios = () => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/usuarios", {
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //         "Content-Type": "application/json",
  //       },
  //       params: {
  //         IdUsuario: localStorage.getItem("IdUsuario"),
  //         IdInstitucion: localStorage.getItem("IdInstitucion"),
  //         Rol: localStorage.getItem("Rol"),
  //       },
  //     })
  //     .then((response) => {
  //       setUsuarios(response.data.data);
  //       setUsersFiltered(response.data.data);
  //     });
  // };

  useEffect(() => {
    if (textFind !== "") {
      setUsersFiltered(
        usuarios.filter((x) => x.Nombre.toLowerCase().includes(textFind))
      );
    } else {
      setUsersFiltered(usuarios);
    }
  }, [textFind, usuarios]);

  const [actualizacion, setActualizacion] = useState(0);
  useEffect(() => {
    //getUsuarios();
  }, [actualizacion]);

  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
  };

  // Realiza el cambio de pagina
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  const [openModalEditarUsuario, setOpenModalEditarUsuario] = useState(false);

  const handleCloseModalEditarUsuario = () => {
    setOpenModalEditarUsuario(false);
  };


  const [datosUsuario, setDatosUsuario] = useState<DataUsuariosTiCentral>(
    {
      Id: "",
      IdUsuarioTiCentral: "",
      Nombre: "",
      ApellidoPaterno: "",
      ApellidoMaterno: "",
      CorreoElectronico: "",
      Puesto:"",
      NombreUsuario: "",
      Cargo: "",
      Telefono: "",
      Ext: "",
      Curp: "",
      Rfc: "",
      Celular: "",
      IdRol: "",
      Rol: "",
      IdInstitucion: "",
      NombreInstitucion: "",
      CreadoPor: "",
      ModificadoPor: "",
    }
  );
  useEffect(() => {


  }, [datosUsuario])
  return (
    <Box
      sx={{
        width: "100%",
        height: "60vh",
        overflow: "hidden",
        overflowY: "unset",
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
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontFamily: "MontserratBold"}} align="center" >
                Nombre
              </TableCell>
              <TableCell sx={{ fontFamily: "MontserratBold" }} align="center">
                Correo Electrónico
              </TableCell>
              <TableCell sx={{ fontFamily: "MontserratBold" }} align="center">
                Usuario
              </TableCell>
              <TableCell sx={{ fontFamily: "MontserratBold" }} align="center">
                Cargo
              </TableCell>
              <TableCell sx={{ fontFamily: "MontserratBold" }} align="center">
                Teléfono
              </TableCell>
              <TableCell sx={{ fontFamily: "MontserratBold" }} align="center">
                Celular
              </TableCell>
              <TableCell sx={{ fontFamily: "MontserratBold" }} align="center">
                Institución
              </TableCell>
              <TableCell sx={{ fontFamily: "MontserratBold" }} align="center">
                Tipo de Usuario
              </TableCell>
              <TableCell sx={{ fontFamily: "MontserratBold" }} align="center">
                Acción
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {usersFiltered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.Id}>
                  <TableCell
                    sx={{ fontFamily: "MontserratLight", fontSize: ".7vw" }}
                  >
                    <Box
                      sx={{
                        width: "9vw",
                        height: "1vh",
                        justifyContent: "left",
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "MontserratRegular",
                        fontSize: ".7vw",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "grey",
                          width: "2vw",
                          height: "4vh",
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                          marginRight: "1vw",
                        }}
                      >
                        {stringAvatar(row.Nombre, row.ApellidoPaterno)}
                      </Avatar>
                      {row.Nombre + " " + row.ApellidoPaterno}
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }} 
                  >
                    {row.CorreoElectronico}
                  </TableCell>

                  <TableCell
                    sx={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                  >
                    {row.NombreUsuario}
                  </TableCell>

                  <TableCell
                    sx={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                  >
                    {row.Cargo}
                  </TableCell>

                  <TableCell
                    sx={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                  >
                    {row.Telefono}
                  </TableCell>

                  <TableCell
                    sx={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                  >
                    {row.Celular}
                  </TableCell>

                  <TableCell
                    sx={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                  >
                    {row.NombreInstitucion}
                  </TableCell>

                  <TableCell
                    sx={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                  >
                    {row.Rol}
                  </TableCell>

                  <TableCell sx={{ height: "auto" }}>
                    <Box display={"flex"}>
                      <AppsDialog id={row.Id} actualizado={actualizaContador} />

                      <DeleteDialog
                        deleteText="usuario"
                        id={row.Id}
                        actualizado={actualizaContador}
                        idUsaurioCentral={row.IdUsuarioTiCentral}
                        dataUser={row}
                      />

                      <Tooltip title="Editar">
                        <span>
                          <IconButton
                            disabled={
                              localStorage.getItem("Rol") === "Capturador"
                                ? true
                                : false
                            }
                            onClick={() => {
                              setDatosUsuario(row);
                              setOpenModalEditarUsuario(true);
                            }}
                          >
                            <EditIcon
                              sx={[
                                {
                                  "&:hover": {
                                    color: "red",
                                  },
                                },
                              ]}
                            />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[renglonesPagina]}
        component="div"
        count={usuarios.length}
        rowsPerPage={renglonesPagina}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {openModalEditarUsuario ? (
        <ModalEditarUsuario
          title="Editar Usuario"
          open={openModalEditarUsuario}
          handleClose={handleCloseModalEditarUsuario}
          dataUser={datosUsuario}
        />
      ) : null}
    </Box>
  );
};

export default DataTable;
