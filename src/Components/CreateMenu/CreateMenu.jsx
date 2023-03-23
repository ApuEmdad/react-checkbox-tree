import { Box, Typography } from "@mui/material";
import React from "react";

const CreateMenu = () => {
  return (
    <Box>
      <Box sx={{ backgroundColor: "#f0f0f0", borderRadius: "10px", p: 2 }}>
        <Typography
          variant="h5"
          sx={{
            color: "#444444",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          CREATE MENU
        </Typography>
      </Box>
    </Box>
  );
};

export default CreateMenu;
