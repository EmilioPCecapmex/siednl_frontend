import { AppBar, Box, Dialog, Grid, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Header } from "./header/Header";


interface Props {
  children?: ReactNode;
  title: string;
  handleClose: Function;
}

const ModalForm = ({ children, title, handleClose }: Props) => {
  return (
    <div>
      <Dialog
        open={true} fullScreen >
        <Grid container className="HeaderModal" justifyContent="flex-end" alignItems="center" paddingBottom={.5} >


          <Grid container className="HeaderModal" justifyContent="flex-end" alignItems="center" sx={{bgcolor:"#AF8C55", height: "7vh",width: "100%", display: "flex", justifyContent: "flex-end", }}>
            <Grid item xs={10} sm={10} md={10} lg={10} sx={{ height: "7vh", display: "flex", justifyContent: "center", alignItems:"center" }}>



              <Typography
                fontFamily={"'Montserrat', sans-serif"}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                  fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                  color: "white",
                  position: "relative",
                }}>

                {title}
              </Typography>




            </Grid>



            <Grid item xs={1} paddingBottom={0} >
              <Grid container alignItems="flex-end" direction="row" justifyContent="flex-end" paddingRight={1} >
                <Tooltip title={"Salir"}>
                  <IconButton
                    onClick={() => handleClose()}
                  >
                    <CloseIcon sx={{
                      fontSize: [30, 30, 30, 40, 40]
                    }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>



        </Grid>

        <Grid container justifyContent="ccenter" alignItems="center">
          {children}
        </Grid>
      </Dialog>
    </div>
  );
};

export default ModalForm;
