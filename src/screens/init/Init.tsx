import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";


export const Init = () => {
  const navigate = useNavigate();

  
  setTimeout(() => {
    navigate('../home')

  },500);


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
