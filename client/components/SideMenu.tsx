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
  paddingLeft: "1rem",
  whiteSpace: "break-spaces"
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
              <Typography sx={subHeading}>Панель управления</Typography>
              <NextLink href="/documents">
                <MenuItem>
                  <ListItemText>Все документы</ListItemText>
                </MenuItem>
              </NextLink>
              <NextLink href="/tasks">
                <MenuItem>
                  <ListItemText>Задачи</ListItemText>
                </MenuItem>
              </NextLink>
              <Typography sx={subHeading}>Клиенты</Typography>
              <NextLink href="/clients">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><SummarizeOutlinedIcon/></ListItemIcon>
                  <ListItemText>Все клиенты
                  </ListItemText>
                </MenuItem>
              </NextLink>
              <NextLink href="/clients/add-client">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><AddBoxIcon/></ListItemIcon>
                  <ListItemText>Добавить клиента
                  </ListItemText>
                </MenuItem>
              </NextLink>
              <NextLink href="/clients/add-contract">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><AddBoxIcon/></ListItemIcon>
                  <ListItemText>Добавить договор
                  </ListItemText>
                </MenuItem>
              </NextLink>
              <NextLink href="/clients/add-agreement">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><AddBoxIcon/></ListItemIcon>
                  <ListItemText>Добавить допсоглашение
                  </ListItemText>
                </MenuItem>
              </NextLink>
              <NextLink href="/clients/add-invoice">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><AddBoxIcon/></ListItemIcon>
                  <ListItemText>Добавить счет
                  </ListItemText>
                </MenuItem>
              </NextLink>

              <Typography sx={subHeading}>Подрядчики</Typography>
              <NextLink href="/contractors">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><SummarizeOutlinedIcon/></ListItemIcon>
                  <ListItemText>Все подрядчики
                  </ListItemText>
                </MenuItem>
              </NextLink>
              <NextLink href="/contractors/add-contractor">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><AddBoxIcon/></ListItemIcon>
                  <ListItemText>Добавить подрядчика
                  </ListItemText>
                </MenuItem>
              </NextLink>
              <NextLink href="/contractors/add-contract">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><AddBoxIcon/></ListItemIcon>
                  <ListItemText>Добавить договор
                  </ListItemText>
                </MenuItem>
              </NextLink>
              <NextLink href="/contractors/add-agreement">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><AddBoxIcon/></ListItemIcon>
                  <ListItemText>Добавить допсоглашение
                  </ListItemText>
                </MenuItem>
              </NextLink>
              <NextLink href="/contractors/add-invoice">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><AddBoxIcon/></ListItemIcon>
                  <ListItemText>Добавить счет
                  </ListItemText>
                </MenuItem>
              </NextLink>

              <Typography sx={subHeading}>Контакты внутри агентства</Typography>
              <NextLink href="/teams">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><SummarizeOutlinedIcon/></ListItemIcon>
                  <ListItemText>Проектные команды
                  </ListItemText>
                </MenuItem>
              </NextLink>
              <NextLink href="/departments">
                <MenuItem sx={subMenuItem}>
                  <ListItemIcon><SummarizeOutlinedIcon/></ListItemIcon>
                  <ListItemText>Департаменты</ListItemText>
                </MenuItem>
              </NextLink>

              <MenuItem sx={{ marginTop: "2rem" }}>
                <Button onClick={() => logOut()}
                        variant="outlined">
                  Выйти
                </Button>
              </MenuItem>
            </MenuList>
            : <MenuList>
              <MenuItem>
                <NextLink href="/"><ListItemText>Главная</ListItemText></NextLink>
              </MenuItem>
              <MenuItem>
                <NextLink href="/login"><ListItemText>Авторизация</ListItemText></NextLink>
              </MenuItem>
              <MenuItem>
                <NextLink href="/signup"><ListItemText>Регистрация</ListItemText></NextLink>
              </MenuItem>
            </MenuList>
        }
      </>
  );
}
