import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataUsuariosTiCentral } from "./interface";
import AlertDialog, { DeleteDialog } from "../deleteDialog/DeleteDialog";
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Tooltip, IconButton, TablePagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Selecciona inicial Nombre + inicial Apellido
function stringAvatar(Nombre: string, ApellidoPaterno: string) {
  return `${Nombre.split(" ")[0][0]}${ApellidoPaterno.split(" ")[0][0]}`;
}

export const DataTable = ({ textFind, actualizar }: { textFind: string, actualizar: number }) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
 getUsuarios()
  }, [actualizar])
  

  //# Renglones por pag
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [usuarios, setUsuarios] = useState<Array<DataUsuariosTiCentral>>([
    {
      Id: "",
      IdUsuarioTiCentral: "",
      Nombre: "",
      ApellidoPaterno: "",
      ApellidoMaterno: "",
      CorreoElectronico: "",
      NombreUsuario: "",
      Cargo: "",
      Telefono: "",
      Celular: "",
      IdRol: "",
      Rol: "",
      IdInstitucion: "",
      NombreInstitucion: "",
      CreadoPor: "",
      ModificadoPor: "",
    },
  ]);

  //
  const [usersFiltered, setUsersFiltered] = useState<
    Array<DataUsuariosTiCentral>
  >([
    {
      Id: "",
      IdUsuarioTiCentral: "",
      Nombre: "",
      ApellidoPaterno: "",
      ApellidoMaterno: "",
      CorreoElectronico: "",
      NombreUsuario: "",
      Cargo: "",
      Telefono: "",
      Celular: "",
      IdRol: "",
      Rol: "",
      IdInstitucion: "",
      NombreInstitucion: "",
      CreadoPor: "",
      ModificadoPor: "",
    },
  ]);

  // Consumo de API
  const getUsuarios = () => {
    axios
      .get("http://10.200.4.105:8000/api/usuarios", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUsuarios(response.data.data);
        setUsersFiltered(response.data.data);
      });
  };

  // Filtrado por caracter
  const findText = () => {
    if (textFind !== "") {
      setUsersFiltered(
        usuarios.filter((x) => x.Nombre.toLowerCase().includes(textFind))
      );
    } else {
      setUsersFiltered(usuarios);
    }
  };

  useEffect(() => {
    findText();
  }, [textFind]);

  useEffect(() => {
    getUsuarios();
  }, []);

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

  // Evita un salto de diseño al llegar a la última página con filas vacías
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usuarios.length) : 0;

  return (
    <Box sx={{ width: "100%", height: "60vh"}}>
      <TableContainer>
        <Table sx={{ minWidth: 750}} aria-labelledby="tableTitle" >
          <TableHead >
            <TableRow >
              <TableCell sx={{fontFamily: 'MontserratBold'}} >Nombre</TableCell>
              <TableCell sx={{fontFamily: 'MontserratBold'}} align="left">Correo Electrónico</TableCell>
              <TableCell sx={{fontFamily: 'MontserratBold'}} align="left">Usuario</TableCell>
              <TableCell sx={{fontFamily: 'MontserratBold'}} align="left">Cargo</TableCell>
              <TableCell sx={{fontFamily: 'MontserratBold'}} align="left">Teléfono</TableCell>
              <TableCell sx={{fontFamily: 'MontserratBold'}}align="left">Celular</TableCell>
              <TableCell sx={{fontFamily: 'MontserratBold'}}  align="left">Institución</TableCell>
              <TableCell sx={{fontFamily: 'MontserratBold'}} align="left">Rol</TableCell>
              <TableCell sx={{fontFamily: 'MontserratBold'}} align="center">Acción</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            { usersFiltered.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.Id}>
                <TableCell>
                  <Box
                    sx={{
                      width: "100%",
                      height: "1vh",
                      justifyContent: "left",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "lightblue",
                        width: "2vw",
                        height: "4vh",
                        fontSize: "0.8vw",
                        fontFamily: "MontserratMedium",
                        marginRight: "1vw",
                      }}
                    >
                      {stringAvatar(row.Nombre, row.ApellidoPaterno)}
                    </Avatar>{" "}
                    {row.Nombre +
                      " " +
                      row.ApellidoPaterno +
                      " " +
                      row.ApellidoMaterno}
                  </Box>
                </TableCell>

                <TableCell>{row.CorreoElectronico}</TableCell>

                <TableCell>{row.NombreUsuario}</TableCell>

                <TableCell>{row.Cargo}</TableCell>

                <TableCell>{row.Telefono}</TableCell>

                <TableCell>{row.Celular}</TableCell>

                <TableCell>{row.NombreInstitucion}</TableCell>

                <TableCell>{row.Rol}</TableCell>

                <TableCell sx={{ display: "flex" }}>
                  <DeleteDialog></DeleteDialog>

                  <Tooltip title="Editar">
                    <IconButton>
                      <EditIcon
                        sx={[
                          {
                            "&:hover": {
                              color: "blue",
                            },
                          },
                        ]}
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
      sx={{
        mt: '1vh'
      }}
        rowsPerPageOptions={[9]}
        component="div"
        count={usuarios.length}
        rowsPerPage={7}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default DataTable;
