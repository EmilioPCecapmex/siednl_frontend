import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Grid, Typography, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import { queries } from "../../queries";
export const DeleteCompActMir = ({

  tipoelemento,
  numerocomponente,
  numeroactividad,
  functelim,
  idMir,
}: {

  tipoelemento: string;
  numerocomponente: number;
  numeroactividad: number;
  functelim: Function;
  idMir: string;
}) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const [open, setOpen] = React.useState(false);
  const [metaAnual, setMA] = React.useState(false);
  const [fichaTecnica, setFT] = React.useState(false);
  const [Raffi, setRF] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    validaModulos(idMir);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const validaModulos = (IdMir: string) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/validateModules-mir", {
        params: {
          IdMir: IdMir,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        for (const item of r.data.data) {
          if (item.Modulo === "Meta_Anual") {
            setMA(true);
          }
          if (item.Modulo === "Ficha_Tecnica") {
            setFT(true);
          }
          if (item.Modulo === "Raffi") {
            setRF(true);
          }
        }
      });
  };

  function InformationSection({ text,
    metaanual,
    fichatecnica,
    raffi,
  }: {
    text: string;
    metaanual: boolean;
    fichatecnica: boolean;
    raffi: boolean;
  }) {
    return (
      <div>
        {text}
        {metaanual && <><br />-) Meta Anual.</>}
        {fichatecnica && <><br />-) Ficha Técnica.</>}
        {raffi && <><br />-) Raffi.</>}
      </div>
    );
  }


  return (
    <Grid>

      <IconButton onClick={handleClickOpen}>
        <DoDisturbOnIcon fontSize="large" />
      </IconButton>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <Grid
          sx={{
            width: "100%",
            // height: "5vh",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            borderBottom: 0.5,
            borderColor: "#ccc",
            padding: "10px",
            gridShadow: 1,
          }}
        >
          <Typography
            sx={{
              fontFamily: "MontserratSemiBold",
              width: "90%",
              fontSize: "1vw",
              textAlign: "center",
            }}
          >
            {tipoelemento === "componente" ?

              "¿Desea eliminar el componente#" + numerocomponente + "?"

              : "¿Desea eliminar la actividad#" + numeroactividad + " del componente#" + numerocomponente + "?"
            }<br /><br />
          </Typography>

          {metaAnual || fichaTecnica || Raffi ? (
            <Typography sx={{ fontFamily: "MontserratMedium", fontSize: ".8vw" }}>
              {tipoelemento === "componente" ? (
                <InformationSection
                  text="Toma en cuenta que dicho componente puede contener información dentro de los siguientes apartados"
                  metaanual={metaAnual}
                  fichatecnica={fichaTecnica}
                  raffi={Raffi}
                />
              ) : (
                <InformationSection
                  text="Toma en cuenta que dicha actividad puede contener información dentro de los siguientes apartados"
                  metaanual={metaAnual}
                  fichatecnica={fichaTecnica}
                  raffi={Raffi}
                />
              )}
            </Typography>
          ) : null}


        </Grid>



        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button sx={queries.buttonCancelarSolicitudInscripcion} onClick={handleClose}>
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
            >
              Cancelar
            </Typography>
          </Button>

          <Button
            onClick={() => {
              functelim();
              handleClose();
            }}
            sx={queries.buttonContinuarSolicitudInscripcion}
            autoFocus
          >
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
            >
              De Acuerdo
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default DeleteCompActMir;
