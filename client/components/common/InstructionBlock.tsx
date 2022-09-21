import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import React from "react";

interface InstructionProps {
  paragraphs : string[];
}

const InstructionBlock = ({ paragraphs } : InstructionProps) => {
  return (
      <Box>
        {paragraphs.map((paragraph, index) => (
            <Typography key={index}
                        sx={{ ":not(:last-child)": { marginBottom: "1rem" } }}>
              {paragraph}
            </Typography>
        ))}
      </Box>
  )
}

export default InstructionBlock