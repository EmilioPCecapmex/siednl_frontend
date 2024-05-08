import AddIcon from "@mui/icons-material/Add";
import { Tooltip, ToggleButton, Box } from "@mui/material";


 export const ButtonAdd = ({
    handleOpen,
    agregar,
}: {
    handleOpen: Function;
    agregar: boolean;
}) => {
    return (
        <Box>
            {agregar ? (
                <Tooltip
                    title={"AGREGAR"}>
                    <ToggleButton className="aceptar" value="check" onClick={() => handleOpen(true)}>
                        <AddIcon />
                    </ToggleButton>
                </Tooltip>


            ) : (
                ""
            )}
        </Box>
    );
};


