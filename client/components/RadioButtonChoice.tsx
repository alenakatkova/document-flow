import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

export interface Option {
  label : string;
  value : string;
  id : number;
}

interface RadioButtonChoiceProps {
  options : Option[];
  heading : string;
  setChosenOption : (id : number) => void;
  whatToAdd : string;
  radioGroupName : string;
}

export const RadioButtonChoice = ({
                                    options,
                                    heading,
                                    setChosenOption,
                                    whatToAdd,
                                    radioGroupName
                                  } : RadioButtonChoiceProps) => {
  return (
      <>
        {
          options.length === 0
              ? `Нет опций для выбора. Сначала добавьте ${whatToAdd}`
              : <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">{heading}</FormLabel>
                <RadioGroup
                    sx={{
                      margin: "1rem 0",
                      display: "flex",
                      flexDirection: "column"
                    }}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                  {
                    options.map(option => (
                        <label key={option.value + option.id}>
                          <input type="radio"
                                 name={radioGroupName}
                                 onChange={() => setChosenOption(option.id)}
                                 value={option.value}/>
                          {option.label}
                        </label>
                    ))
                  }
                </RadioGroup>
              </FormControl>
        }
      </>
  )
}