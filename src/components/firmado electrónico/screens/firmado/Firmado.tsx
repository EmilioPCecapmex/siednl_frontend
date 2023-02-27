import { Box } from "@mui/material";
import { LateralMenu } from "../../../lateralMenu/LateralMenu";
import { Header } from "../../../header/Header";

import { Firmado as Firmado2 } from "@jbcecapmex/pakfirma";

// localStorage.setItem('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVVc3VhcmlvIjoiU3BpZGVyTWFuIiwiSWRVc3VhcmlvIjoiYTY4NjBiNDQtMzA4Ny0xMWVkLWFlZDAtMDQwMzAwMDAwMDAwIiwiaWF0IjoxNjc1MjcyMjY1LCJleHAiOjE2NzUyNzQ5NjV9.75Z1e2Qtjo-MLoeAb2h7gxfjZJaCwiNNyIRroSdvnv4')
// localStorage.setItem('IdCentral', 'a6860b44-3087-11ed-aed0-040300000000')
// localStorage.setItem('NombreUsuario','Jose A.')
// localStorage.setItem('IdApp','ffcc48cb-3087-11ed-aed0-040300000000')

export const Firmado = () => {
  return (
    <Box
      sx={{
        
        height: "100vh",
        display: "flex",
        backgroundColor: "#F2F2F2",
      }}
    >
      <LateralMenu selection={8} actionNumber={0} />
      <Header
        details={{
          name1: "Inicio",
          path1: "../home",
          name2: "Firma Electrónica",
          path2: "../firmado",
          name3: "",
        }}
      />
      <Firmado2
        IdApp={localStorage.getItem("IdApp") || ""}
        IdCentral={localStorage.getItem("IdCentral") || ""}
        NombreUsuario={localStorage.getItem("NombreUsuario") || ""}
        jwtToken={localStorage.getItem("jwtToken") || ""}
      />
    </Box>
  );
};
