import { IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { IDatosTabla } from "./Catalogos";

export const CSVCatalogo = ({
  tabla,
  datos,
}: {
  tabla: string;
  datos: IDatosTabla[];
}) => {
  const download = (data: any) => {
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + data], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `${tabla}.csv`.replace(" ", "").toLowerCase());
    a.click();
  };

  const csvmaker = (data: any, headerNumber: number) => {
    let csvRows = [];

    const headers = Object.keys(data[0]);
    csvRows.push(headers[headerNumber]);

    let values = {};

    for (let i = 0; i < data.length; i++) {
      values = data[i].Desc;
      csvRows.push(values);
    }

    return csvRows.join("\n");
  };

  const get = () => {
    const csvdata = csvmaker(datos, 1);
    download(csvdata);
  };

  return (
    <>
      <IconButton>
        <DownloadIcon
          sx={{
            width: 40,
            height: 40,
          }}
          onClick={() => get()}
        />
      </IconButton>
    </>
  );
};
