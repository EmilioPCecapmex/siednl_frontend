import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@mui/material";
import axios from "axios";
import { DataUsuariosTiCentral } from "./interface";

// Selecciona inicial Nombre + inicial Apellido
function stringAvatar(Nombre: string, ApellidoPaterno: string) {
  return `${Nombre.split(" ")[0][0]}${ApellidoPaterno.split(" ")[0][0]}`;
}

export const DataTable = ({ textFind }: { textFind: string }) => {

  const [page, setPage] = useState(0);

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
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVVc3VhcmlvIjoiU3BpZGVyTWFuIiwiSWRVc3VhcmlvIjoiYTY4NjBiNDQtMzA4Ny0xMWVkLWFlZDAtMDQwMzAwMDAwMDAwIiwiaWF0IjoxNjYzNTk5MTYzLCJleHAiOjE2NjM2MDE4NjN9.yEKr2wWWEYJ5FAnv46wnFD4nrt-ktG6AdkoWvOVH8AQ",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUsuarios(response.data.data);
        setUsersFiltered(response.data.data);
      })
      .catch((error) => {
        console.log(error);
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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Evita un salto de diseño al llegar a la última página con filas vacías
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usuarios.length) : 0;

  return (
    <Box sx={{ width: "100%", height: "100%", paddingTop: "2rem" }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="left">Correo Electrónico</TableCell>
                <TableCell align="left">Usuario</TableCell>
                <TableCell align="left">Cargo</TableCell>
                <TableCell align="left">Telefono</TableCell>
                <TableCell align="left">Celular</TableCell>
                <TableCell align="left">Institucion</TableCell>
                <TableCell align="left">Rol</TableCell>
                <TableCell align="left">Accion</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {usersFiltered.map((row) => (
                <TableRow>
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

                  <TableCell>
                    <Tooltip title="Eliminar">
                      <IconButton>
                        <DeleteIcon
                          sx={[
                            {
                              "&:hover": {
                                color: "red",
                              },
                            },
                          ]}
                        />
                      </IconButton>
                    </Tooltip>

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
              {emptyRows > 0 && (
                <TableRow style={{}}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ border: "none" }}
          rowsPerPageOptions={[7]}
          component="div"
          count={usuarios.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Box>
  );
};

export default DataTable;
