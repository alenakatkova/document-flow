import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

export default function SideMenu() {
  return (
      // <Paper sx={{ width: 320 }}>
      <Box height="100%" bgcolor="red">
        <MenuList>
          <MenuItem>
            <ListItemText>Single</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText>1.15</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText>Double</ListItemText>
          </MenuItem>
          <Divider/>
          <MenuItem>
            <ListItemText>Add space before paragraph</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText>Add space after paragraph</ListItemText>
          </MenuItem>
          <Divider/>
          <MenuItem>
            <ListItemText>Custom spacing...</ListItemText>
          </MenuItem>
        </MenuList>
      </Box>

      // </Paper>
  );
}
