import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
  FormControl,
} from "@mui/material";
import { IComponente } from "../tabsMir/IComponente";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { FormulaDialogMA } from "../formulasDialog/FormulaDialogMA";
import { FormulaDialogMACA } from "../formulasDialog/FormulaDialogMACA";
import { IComponentesFT } from "./Interfaces";

export const TabComponenteFT = ({

  show,

}:{
  show: boolean;


}) => {

  const [componentSelect, setComponentSelect] = useState(1);

  const [componentesValues, setComponentesValues] = useState<
    Array<IComponentesFT>
  >([]);

  let jsonFT = FT === "" ? "" : JSON.parse(FT);

  useEffect(() => {
    // if (show === true) {
    let comp: IComponentesFT[] = [];

    noComponentes.map((x, index) => {
      return comp.push({
        componentes: "C" + (index + 1),
        tipoDeIndicador:
          FT === "" || FT === undefined
            ? ""
            : jsonFT?.componentes[index]?.tipoDeIndicador || "",
        claridad:
          FT === "" || FT === undefined
            ? ""
            : jsonFT?.componentes[index]?.claridad || "",
        relevancia:
          FT === "" || FT === undefined
            ? ""
            : jsonFT?.componentes[index]?.relevancia || "",
        economia:
          FT === "" || FT === undefined
            ? ""
            : jsonFT?.componentes[index]?.economia || "",
        monitoreable:
          FT === "" || FT === undefined
            ? ""
            : jsonFT?.componentes[index]?.monitoreable || "",
        adecuado:
          FT === "" || FT === undefined
            ? ""
            : jsonFT?.componentes[index]?.adecuado || "",
        aporte_marginal:
          FT === "" || FT === undefined
            ? ""
            : jsonFT?.componentes[index]?.aporte_marginal || "",
        dimension:
          FT === "" || FT === undefined
            ? ""
            : jsonFT?.componentes[index]?.dimension || "",
        unidadDeMedida:
          FT === "" || FT === undefined
            ? ""
            : jsonFT?.componentes[index]?.unidadDeMedida || "",
      });
    });

    // if (componentesValues.length <= 0) {
    setComponentesValues(comp);
    // }
    // }
  }, [show]);

  useEffect(() => {
    valoresComponenteMAFnc(componentesValues);
  }, [componentesValues]);
}