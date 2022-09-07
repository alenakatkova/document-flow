import { Control, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React from "react";

interface DateInputProps {
  dayInputName : string;
  monthInputName : string;
  yearInputName : string;
  control : Control<any>; // TODO разобраться, почему не могу передать <Inputs>
  heading : string;
}

export const DateInput = ({ dayInputName, monthInputName, yearInputName, control, heading } : DateInputProps) => {
  return (
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box sx={{ width: "100%", paddingBottom: "0.5rem" }}>
          {heading}
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "left"
        }}>
          <Box sx={{ width: "15%", minWidth: "90px", marginRight: "1rem" }}>
            <Controller
                control={control}
                name={dayInputName}
                render={({ field: { ref, ...field } }) => (
                    <TextField
                        {...field}
                        inputRef={ref}
                        label={"День"}
                        variant="outlined"
                        type="number"
                    />
                )}
            />
          </Box>
          <Box sx={{ width: "15%", minWidth: "90px", marginRight: "1rem" }}>
            <Controller
                control={control}
                name={monthInputName}
                render={({ field: { ref, ...field } }) => (
                    <TextField
                        {...field}
                        inputRef={ref}
                        label={"Месяц"}
                        variant="outlined"
                        type="number"
                    />
                )}
            />
          </Box>
          <Box sx={{ width: "15%", minWidth: "90px" }}>
            <Controller
                control={control}
                name={yearInputName}
                render={({ field: { ref, ...field } }) => (
                    <TextField
                        {...field}
                        inputRef={ref}
                        label={"Год"}
                        variant="outlined"
                        type="number"
                    />
                )}
            />
          </Box>
        </Box>
      </Box>
  )
}