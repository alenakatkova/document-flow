import * as React from 'react';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Link from "next/link";
import ListItemText from "@mui/material/ListItemText";

export default function SideMenu() {
  return (
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
  );
}
