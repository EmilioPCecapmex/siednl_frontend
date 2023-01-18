import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import { TextField, Typography, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DialogActions from "@mui/material/DialogActions";

export function DialogCcp({
  open,
  handleClose,
  setTexto,
  fncSetCcp,
  setCcpCorreos
}: {
  open: boolean;
  handleClose: Function;
  setTexto: Function;
  fncSetCcp: Function;
  setCcpCorreos: Function;
}) {
  const [cc, setCc] = useState<Array<ICCP>>([
    {
      nombre: "",
      puesto: "",
      correo: "",
    },
  ]);
  const [noCc, setNoCc] = useState([1]);

  const fncAgregar = () => {
    let v = noCc.length + 1;
    setNoCc([...noCc, v]);

    let prevState = [...cc];
    prevState.push({
      nombre: "",
      puesto: "",
      correo: "",
    });
    setCc(prevState);
  };

  const fncEliminar = () => {
    let v = noCc.length - 1;
    if (v < 1) {
    } else {
      setNoCc(noCc.splice(0, v));
      let prevState = [...cc];
      prevState.pop();
      setCc(prevState);
    }
  };

  const confirmar = () => {
    let txt = "";
    let err = 0;

    cc.map((value: ICCP, index: number) => {
      if (
        /^[\s]*$/.test(value.nombre) ||
        /^[\s]*$/.test(value.puesto) ||
        !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          value.correo
        )
      ) {
        setError(true);
        err = 1;
      } else {
        if (index === cc.length - 1) {
          txt = txt + value.nombre;
        } else {
          txt = txt + value.nombre + ", ";
        }
      }
    });

    if (err === 0) {
      handleClose();
    }

    setTexto(txt);
    fncSetCcp(cc);
    setCcpCorreos(JSON.stringify(cc));
  };

  const [error, setError] = useState(false);

  return (
    <Dialog fullWidth maxWidth="md" onClose={() => handleClose()} open={open}>
      <DialogTitle
        sx={{
          fontFamily: "MontserratBold",
          borderBottom: 1,
          height: "2vh",
          mb: 2,
        }}
      >
        CCP
        {
          <Tooltip
            title="Agregar usuario"
            sx={{ position: "absolute", right: 80, cursor: "pointer" }}
            onClick={() => {
              fncAgregar();
            }}
          >
            <AddIcon></AddIcon>
          </Tooltip>
        }
        {noCc.length === 1 ? null : (
          <Tooltip
            title="Remover usuario"
            sx={{ position: "absolute", right: 40, cursor: "pointer" }}
            onClick={() => {
              fncEliminar();
            }}
          >
            <RemoveIcon></RemoveIcon>
          </Tooltip>
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "30vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Typography
            sx={{ fontFamily: "MontserratMedium", textAlign: "center" }}
          >
            Llenar informacion de los usuarios a los que se les adjuntará copia
            del documento
          </Typography>
          {noCc.map((item) => {
            return (
              <Box
                key={item}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  justifyContent: "center",
                }}
              >
                <TextField
                  size="small"
                  label={
                    <Typography
                      sx={{
                        fontSize: "100%",
                        fontFamily: "MontserratSemiBold",
                      }}
                    >
                      Nombre
                    </Typography>
                  }
                  sx={{ width: "98%", m: 0.5 }}
                  value={cc[item - 1]?.nombre || ""}
                  onChange={(c) => {
                    let prev = [...cc];
                    prev[item - 1].nombre = c.target.value;
                    setCc(prev);
                  }}
                  error={error && /^[\s]*$/.test(cc[item - 1]?.nombre)}
                ></TextField>
                <TextField
                  size="small"
                  label={
                    <Typography
                      sx={{
                        fontSize: "100%",
                        fontFamily: "MontserratSemiBold",
                      }}
                    >
                      Puesto
                    </Typography>
                  }
                  sx={{ width: "98%", m: 0.5 }}
                  value={cc[item - 1]?.puesto || ""}
                  onChange={(c) => {
                    let prev = [...cc];
                    prev[item - 1].puesto = c.target.value;
                    setCc(prev);
                  }}
                  error={error && /^[\s]*$/.test(cc[item - 1]?.puesto)}
                ></TextField>
                <TextField
                  size="small"
                  label={
                    <Typography
                      sx={{
                        fontSize: "100%",
                        fontFamily: "MontserratSemiBold",
                      }}
                    >
                      Correo Electrónico
                    </Typography>
                  }
                  sx={{ width: "98%", m: 0.5 }}
                  value={cc[item - 1]?.correo || ""}
                  onChange={(c) => {
                    let prev = [...cc];
                    prev[item - 1].correo = c.target.value.replace(" ", "");
                    setCc(prev);
                  }}
                  error={
                    error &&
                    (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
                      cc[item - 1]?.correo
                    ) ||
                      /^[\s]*$/.test(cc[item - 1]?.correo))
                  }
                  helperText={
                    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
                      cc[item - 1]?.correo
                    )
                      ? "Formato: correo123@dominio.com"
                      : null
                  }
                ></TextField>
              </Box>
            );
          })}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            confirmar();
          }}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export interface ICCP {
  nombre: string;
  puesto: string;
  correo: string;
}
