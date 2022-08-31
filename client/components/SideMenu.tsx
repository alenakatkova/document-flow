import * as React from 'react';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import NextLink from "next/link";
import MUILink from '@mui/material/Link';
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import { useRouter } from "next/router";

export default function SideMenu() {
  const { locale, asPath } = useRouter();

  return (
      <>
        <Box
            sx={{
              padding: "1rem",
              display: "flex",

            }}
        >
          <NextLink href={asPath} locale="ru">
            <MUILink
                color="primary.dark"
                underline={locale === "ru" ? "none" : "hover"}
                sx={{
                  cursor: "pointer",
                  marginRight: "1rem",
                  fontWeight: locale === "ru" ? 700 : 400
                }}
            >
              Русский
            </MUILink>
          </NextLink>

          <NextLink href={asPath} locale="en">
            <MUILink
                color="primary.dark"
                underline={locale === "en" ? "none" : "hover"}
                sx={{
                  cursor: "pointer",
                  marginRight: "1rem",
                  fontWeight: locale === "en" ? 700 : 400
                }}
            >
              English
            </MUILink>
          </NextLink>
        </Box>
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
      </>
  );
}
