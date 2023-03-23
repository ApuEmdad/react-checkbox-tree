import { Box, Typography } from "@mui/material";
import React from "react";
import { TreeMenu as data } from "../../Assets/data/data";

import ContentTree from "./ContentTree";

const ContentTrees = ({ selected, setSelected, setParent }) => {
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
          SELECT PARENT MENU
        </Typography>
      </Box>
      <Box>
        {data.map((data) => (
          <ContentTree
            data={data}
            key={data.id}
            selected={selected}
            setSelected={setSelected}
            setParent={setParent}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ContentTrees;
