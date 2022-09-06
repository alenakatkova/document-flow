import * as React from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import NextLink from "next/link";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useAuth } from "../contexts/authProvider";
import { Typography } from "@mui/material";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from "@mui/material/Button";

const subHeading = {
  display: "block",
  backgroundColor: "accent.dark",
  padding: "0.5rem 1rem",
  textTransform: "uppercase",
  fontWeight: 500,
  letterSpacing: "0.1rem",
  color: "accent.contrastText",
  marginTop: "1.5rem"
};

const subMenuItem = {
  padding: "0.1rem",
  paddingLeft: "1rem"
}

export default function SideMenu() {
  const { locale, asPath } = useRouter();
  const { t } = useTranslation("common");
  const { isAuthenticated, logOut } = useAuth();
  return (
      <>
        {/*<Box*/}
        {/*    sx={{*/}
        {/*      padding: "1rem",*/}
        {/*    }}*/}
        {/*>*/}
        {/*  <NextLink href={asPath} locale="ru">*/}
        {/*    <MUILink*/}
        {/*        color="primary.dark"*/}
        {/*        underline={locale === "ru" ? "none" : "hover"}*/}
        {/*        sx={{*/}
        {/*          cursor: "pointer",*/}
        {/*          marginRight: "1rem",*/}
        {/*          fontWeight: locale === "ru" ? 700 : 400,*/}
        {/*        }}*/}
        {/*    >*/}
        {/*      Русский*/}
        {/*    </MUILink>*/}
        {/*  </NextLink>*/}
        {/*  <NextLink href={asPath} locale="en">*/}
        {/*    <MUILink*/}
        {/*        color="primary.dark"*/}
        {/*        underline={locale === "en" ? "none" : "hover"}*/}
        {/*        sx={{*/}
        {/*          cursor: "pointer",*/}
        {/*          marginRight: "1rem",*/}
        {/*          fontWeight: locale === "en" ? 700 : 400,*/}
        {/*        }}*/}
        {/*    >*/}
        {/*      English*/}
        {/*    </MUILink>*/}
        {/*  </NextLink>*/}
        {/*</Box>*/}

        {isAuthenticated
            ? <MenuList>
              <Typography sx={subHeading}>{t("menu.dashboard.heading")}</Typography>
              <NextLink href="/">
                <MenuItem>
                  <ListItemText>Все документы</ListItemText>
                </MenuItem>
              </NextLink>
              <NextLink href="/dashboard">
                <MenuItem>
                  <ListItemText>Задачи</ListItemText>
                </MenuItem>
              </NextLink>
              <Typography sx={subHeading}>{t("menu.clients.heading")}</Typography>
              <NextLink href="/clients">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><SummarizeOutlinedIcon/></ListItemIcon>
                  <ListItemText>{t("menu.clients.all")}
                  </ListItemText>
                </MenuItem>
              </NextLink>
              <NextLink href="/clients/add-contract">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><AddBoxIcon/></ListItemIcon>
                  <ListItemText>{t("menu.clients.addContract")}
                  </ListItemText>
                </MenuItem>
              </NextLink>
              <NextLink href="/">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><AddBoxIcon/></ListItemIcon>
                  <ListItemText>{t("menu.clients.addAgreement")}
                  </ListItemText>
                </MenuItem>
              </NextLink>
              <NextLink href="/">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><AddBoxIcon/></ListItemIcon>
                  <ListItemText>{t("menu.clients.addInvoice")}
                  </ListItemText>
                </MenuItem>
              </NextLink>

              <Typography sx={subHeading}>{t("menu.contractors.heading")}</Typography>
              <NextLink href="/">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><SummarizeOutlinedIcon/></ListItemIcon>
                  <ListItemText>{t("menu.contractors.all")}
                  </ListItemText>
                </MenuItem>
              </NextLink>
              <NextLink href="/">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><AddBoxIcon/></ListItemIcon>
                  <ListItemText>{t("menu.contractors.addContract")}
                  </ListItemText>
                </MenuItem>
              </NextLink>
              <NextLink href="/">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><AddBoxIcon/></ListItemIcon>
                  <ListItemText>{t("menu.contractors.addAgreement")}
                  </ListItemText>
                </MenuItem>
              </NextLink>
              <NextLink href="/">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><AddBoxIcon/></ListItemIcon>
                  <ListItemText>{t("menu.clients.addInvoice")}
                  </ListItemText>
                </MenuItem>
              </NextLink>
              <MenuItem sx={{ marginTop: "2rem" }}>
                <Button onClick={() => logOut()}
                        variant="outlined">
                  {t("auth.logOut")}
                </Button>
              </MenuItem>
            </MenuList>
            : <MenuList>
              <MenuItem>
                <NextLink href="/"><ListItemText>{t("menu.home")}</ListItemText></NextLink>
              </MenuItem>
              <MenuItem>
                <NextLink href="/login"><ListItemText>{t("menu.login")}</ListItemText></NextLink>
              </MenuItem>
              <MenuItem>
                <NextLink href="/signup"><ListItemText>{t("menu.signup")}</ListItemText></NextLink>
              </MenuItem>
            </MenuList>
        }
      </>
  );
}
