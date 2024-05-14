import { TableCell } from "@mui/material";

export function clearInfo(info: string) {
  return info
    .replaceAll('"', "")
    .replaceAll("'", "")
    .replaceAll("\n", "")
    //.trimEnd()
    .toUpperCase();
}

 export const widthCondition = () => {
  return (
    localStorage.getItem("Rol") === "Administrador" ||
    localStorage.getItem("Rol") === "ADMINISTRADOR"
  );
};

export const TableCellFormat = (data: any) => {
  return (
    <>
      <TableCell
        sx={{
          padding: "1px 15px 1px 0",
          fontFamily: "MontserratRegular",
          fontSize: [10, 10, 10, 15, 15, 18],
          textAlign: "center",
        }}
        align="center"
        component="th"
        scope="row"
      >
        {data}
      </TableCell>
    </>
  );
};