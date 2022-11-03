import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
} from "@mui/material";
import { IComponente } from "../tabsMir/IComponente";

export const TabComponenteMA = ({
  show,
  componentesMir,
  componenteValorMir,
}: {
  show: boolean;
  componentesMir: number[];
  componenteValorMir: Array<IComponente>;
}) => {
  
  const [componentSelect, setComponentSelect] = useState(1);

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
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
      <Box
        sx={{
          width: "100%",
          height: "7vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {/* Botones Componentes */}
        <Typography
          sx={{
            mr: "1vw",
            fontFamily: "MontserratSemiBold",
            fontSize: "1.5vw",
          }}
        >
          Componente {componentSelect}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <List
          sx={{
            width: "10vw",
            height: "65vh",
            borderRight: "solid",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderColor: "#BCBCBC",
            "&::-webkit-scrollbar": {
              width: ".3vw",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.5)",
              outline: "1px solid slategrey",
              borderRadius: 10,
            },
          }}
        >
          {componentesMir.map((item) => {
            return (
              <Box
                key={item}
                sx={{
                  height: "10vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Divider />

                <ListItemButton
                  selected={item === componentSelect ? true : false}
                  key={item}
                  onClick={() => setComponentSelect(item)}
                  sx={{
                    "&.Mui-selected ": {
                      backgroundColor: "#c4a57b",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#cbcbcb",
                    },
                  }}
                >
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    Componente {item}
                  </Typography>
                </ListItemButton>

                <Divider />
              </Box>
            );
          })}
        </List>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            alignItems: "center",
            justifyContent: "center",

          }}
        >


          <Box
            sx={{
              display: "flex",

              width: "100%",
              height: "20%",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexWrap: "wrap"
            }}
          >
            <TextField

              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Meta anual 2023"}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}

            /><TextField

              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Linea Base 2021"}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}

            /><TextField

              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Valor númerador"}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}

            /><TextField

              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Valor del denominador"}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}

            />
            <TextField

              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Sentido del indicador"}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}

            />
          </Box>






          {componenteValorMir[componentSelect-1].frecuencia.toLowerCase()==="trimestral"?
          <Box
            sx={{
              display: "flex",

              width: "100%",
              height: "20%",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexWrap: "wrap"
            }}
          >
            <TextField

              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Trimestre 1"}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}

            /><TextField

              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Trimestre 2"}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}

            />
            <TextField

              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Trimestre 3"}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}

            /><TextField

              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Trimestre 4"}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}

            />
          </Box>:null}
          





        {componenteValorMir[componentSelect-1].frecuencia.toLowerCase()==="semestral"?<Box
            sx={{
              display: "flex",

              width: "100%",
              height: "20%",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexWrap: "wrap"
            }}
          >
            <TextField

              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Semestre 1"}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}

            />
            <TextField

              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Semestre 2"}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}

            />
          </Box>:null}
          







          <Box
            sx={{
              display: "flex",

              width: "100%",
              height: "30%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TextField

              rows={5}
              multiline
              sx={{ width: "40%", boxShadow: 2 }}
              variant={"filled"}
              label={"Unidad responsable de reportar el indicador"}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}

            />
            <TextField

              rows={5}
              multiline
              sx={{ width: "40%", boxShadow: 2 }}
              variant={"filled"}
              label={"Descripción del indicador"}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}

            />
          </Box>
          <Box
            sx={{
              display: "flex",

              width: "100%",
              height: "30%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >

            <TextField

              rows={5}
              multiline
              sx={{ width: "40%", boxShadow: 2 }}
              variant={"filled"}
              label={"Descripción del numerador"}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}

            />
            <TextField

              rows={5}
              multiline
              sx={{ width: "40%", boxShadow: 2 }}
              variant={"filled"}
              label={"Descripcion del denominador"}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}

            />

          </Box>

        </Box>
      </Box>
    </Box>
  );
};
