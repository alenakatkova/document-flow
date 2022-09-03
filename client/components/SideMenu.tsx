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
import { useTranslation } from "next-i18next";

export default function SideMenu() {
  const { locale, asPath } = useRouter();
  const { t } = useTranslation("common");

  return (
      <>
        <Box
            sx={{
              padding: "1rem",
            }}
        >
          <NextLink href={asPath} locale="ru">
            <MUILink
                color="primary.dark"
                underline={locale === "ru" ? "none" : "hover"}
                sx={{
                  cursor: "pointer",
                  marginRight: "1rem",
                  fontWeight: locale === "ru" ? 700 : 400,
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
                  fontWeight: locale === "en" ? 700 : 400,
                }}
            >
              English
            </MUILink>
          </NextLink>
        </Box>

        <MenuList>
          <MenuItem>
            <NextLink href="/"><ListItemText>{t("menu.home")}</ListItemText></NextLink>
          </MenuItem>
          <MenuItem>
            <NextLink href="/signup"><ListItemText>{t("menu.signup")}</ListItemText></NextLink>
          </MenuItem>
          <MenuItem>
            <NextLink href="/test"><ListItemText>TEST</ListItemText></NextLink>
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
