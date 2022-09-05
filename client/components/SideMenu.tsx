import * as React from 'react';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import NextLink from "next/link";
import MUILink from '@mui/material/Link';
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useAuth } from "../contexts/authProvider";

export default function SideMenu() {
  const { locale, asPath } = useRouter();
  const { t } = useTranslation("common");
  const { isAuthenticated } = useAuth();
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

        {isAuthenticated
            ? <MenuList>
              <MenuItem>
                <NextLink href="/"><ListItemText>{t("menu.home")}</ListItemText></NextLink>
              </MenuItem>
              <MenuItem>
                <NextLink href="/dashboard"><ListItemText>{t("menu.dashboard")}</ListItemText></NextLink>
              </MenuItem>
              <Divider/>
            </MenuList>
            : <MenuList>
              <MenuItem>
                <NextLink href="/"><ListItemText>{t("menu.home")}</ListItemText></NextLink>
              </MenuItem>
              <MenuItem>
                <NextLink href="/signup"><ListItemText>{t("menu.signup")}</ListItemText></NextLink>
              </MenuItem>
            </MenuList>
        }
      </>
  );
}
