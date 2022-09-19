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
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// Selecciona inicial Nombre + inicial Apellido
function stringAvatar(Nombre: string, ApellidoPaterno: string) {
  return `${Nombre.split(" ")[0][0]}${ApellidoPaterno.split(" ")[0][0]}`;
}

export const DataTable2 = ({ textFind }: { textFind: string }) => {

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

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Nombre', headerName: 'Nombre', width: 130 },
    { field: 'ApellidoPaterno', headerName: 'ApellidoPaterno', width: 130 },
    
  ];

  // Evita un salto de diseño al llegar a la última página con filas vacías
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usuarios.length) : 0;

    return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={usuarios}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      );
};

export default DataTable2;
