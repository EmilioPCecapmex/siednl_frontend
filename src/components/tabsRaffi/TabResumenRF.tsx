import { Box, Typography, Button, Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModalEnviarFT from "../modalsFT/ModalEnviarFT";
import ModalsSolicitModifFT from "../modalsFT/ModalsSolicitModifFT";
import { IActividadesRF, IComponenteRF, ICValorRF, IEncabezadoRF, IFinRF, IRF, IPropositoRF } from "./Interfaces";
import { queries } from "../../queries";
import {
    Grid,
  } from "@mui/material";
  
  export const TabResumenRF = ({
    show,
    // encabezado,
    // fin,
    // proposito,
    componentes,
    componenteValor,
    cValor,
    IdMir,
    IdRF,
    IdMA,
    showResume,
    MIR,
  }: {
    show: boolean;
    // encabezado: Array<IEncabezadoRF>;
    // fin: Array<IFinRF>;
    // proposito: Array<IPropositoRF>;
    componentes: number[];
    componenteValor: Array<IComponenteRF>;
    cValor: Array<ICValorRF>;
    IdMir: string;
    IdRF: string;
    IdMA: string;
    MIR: string;
    showResume: Function;
  }) => {
    return (
      <>
      <Grid
        visibility={show ? "visible" : "hidden"}
        container
        position="absolute"
        sx={{
          display: "flex",
          width: "75vw",
          height: "77vh",
          boxShadow: 10,
          borderRadius: 5,
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
      Resumen
    </Grid>
      </>
      
    );
  };
