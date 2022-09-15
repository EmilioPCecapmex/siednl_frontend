import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@mui/material";
import { text } from "stream/consumers";
import axios from "axios";
import {
  DataUsuariosTiCentral,
  EnhancedTableProps,
  HeadCell,
} from "./interface";

function stringToColor(string: string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 10) - hash);
  }

  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(Nombre: string, ApellidoPaterno: string) {
  return `${Nombre.split(" ")[0][0]}${ApellidoPaterno.split(" ")[0][0]}`;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells: readonly HeadCell[] = [
  {
    Id: "Nombre",
    numeric: false,
    disablePadding: true,
    label: "Nombre",
  },
  {
    Id: "CorreoElectronico",
    numeric: false,
    disablePadding: false,
    label: "Correo Electrónico",
  },
  {
    Id: "ApellidoMaterno",
    numeric: true,
    disablePadding: false,
    label: "Teléfono",
  },
  {
    Id: "EstaActivo",
    numeric: true,
    disablePadding: false,
    label: "Cargo",
  },
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof DataUsuariosTiCentral) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          onChange={onSelectAllClick}
          inputProps={{
            "aria-label": "selecciona todos los nombres",
          }}
        />
      </TableCell>

      {headCells.map((headCell) => (
        <TableCell
          key={headCell.Id}
          align={"left"}
          sx={{ fontFamily: "MontserratBold" }}
          padding={"normal"}
          sortDirection={orderBy === headCell.Id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCell.Id}
            direction={orderBy === headCell.Id ? order : "asc"}
            onClick={createSortHandler(headCell.Id)}
          >
            {headCell.label}
            {orderBy === headCell.Id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
      ))}

      <TableCell sx={{ fontFamily: "MontserratBold" }}>Acción</TableCell>
    </TableRow>
  );
}

export const DataTable = ({ textFind }: { textFind: string }) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] =
    useState<keyof DataUsuariosTiCentral>("CorreoElectronico");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [usuarios, setUsuarios] = useState<Array<DataUsuariosTiCentral>>([
    {
      Id: "",
      EstaActivo: 0,
      Nombre: "",
      ApellidoPaterno: "",
      ApellidoMaterno: "",
      NombreUsuario: "",
      CorreoElectronico: "",
      CreadoPor: "",
      ModificadoPor: "",
    },
  ]);

  const [usersFiltered, setUsersFiltered] = useState<
    Array<DataUsuariosTiCentral>
  >([
    {
      Id: "",
      EstaActivo: 0,
      Nombre: "",
      ApellidoPaterno: "",
      ApellidoMaterno: "",
      NombreUsuario: "",
      CorreoElectronico: "",
      CreadoPor: "",
      ModificadoPor: "",
    },
  ]);

  const getUsuarios = () => {
    axios
      .get("http://10.200.4.105:5000/api/users", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVVc3VhcmlvIjoiRW1wZXJleiIsIklkVXN1YXJpbyI6IjNkNDcyYTdhLTMwODctMTFlZC1hZWQwLTA0MDMwMDAwMDAwMCIsImlhdCI6MTY2MzI2NDE2MSwiZXhwIjoxNjYzMjY2ODYxfQ.xReNwRMGQWvZGMjS3dDKyCcc9fnIMWuTwbuWnCAQXSk",
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

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DataUsuariosTiCentral
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = usuarios.map((n) => n.Nombre);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, Nombre: string) => {
    const selectedIndex = selected.indexOf(Nombre);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, Nombre);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (Nombre: string) => selected.indexOf(Nombre) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usuarios.length) : 0;

  return (
    <Box sx={{ width: "100%", height: "100%", paddingTop: "2rem" }}>
      <Paper
        sx={{
          width: "100%",
          boxShadow: "none",
          borderRadius: "2%",
          margin: "0",
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableBody>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={usuarios.length}
              />
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(usersFiltered, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.Nombre);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Id}
                      selected={isItemSelected}
                      sx={{ overflow: "scroll" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.Nombre)}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>

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
                              bgcolor: stringToColor(row.Nombre),
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

                      <TableCell
                        onClick={() => {
                          navigator.clipboard.writeText(row.CorreoElectronico);
                        }}
                        sx={[
                          {
                            "&:hover": {
                              Nombre: "copy",
                              color: "green",
                              cursor: "pointer",
                            },
                          },
                          { textAlign: "left", textDecoration: "underline" },
                        ]}
                      >
                        {row.CorreoElectronico}
                      </TableCell>

                      <TableCell sx={{ textAlign: "left" }}>
                        {row.EstaActivo}
                      </TableCell>
                      <TableCell sx={{ textAlign: "left" }}>
                        {row.ApellidoPaterno}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Borrar">
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
                  );
                })}
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
      </Paper>
    </Box>
  );
};

export default DataTable;
