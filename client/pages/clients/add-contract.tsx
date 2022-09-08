import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import { CounterpartyFromDB } from "../../interfaces/counterparty";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD_SPACING, CARD } from "../../styles/constants";
import { useAuth } from "../../contexts/authProvider";
import { Typography } from "@mui/material";
import RequireAuth from "../../components/RequireAuth";
import { RadioButtonChoice } from "../../components/RadioButtonChoice";

const AddClientContract : NextPage = () => {
  const router = useRouter();
  let { team } = useAuth();
  const [chosenClient, setChosenClient] = useState<number|undefined>(undefined);

  const {
    data: clients,
    isLoading: isClientsLoading
  } = useFetch<CounterpartyFromDB[]>("/counterparties/names", [], { teamId: team, type: "client" });

  const clientsDataForRadioBtns = clients.map(client => {
    return {
      value: client.name,
      label: client.name,
      id: client.id
    }
  });

  return (
      <RequireAuth>
        <Layout title="Форма добавления договора с клиентом"
                heading={"Форма добавления договора с клиентом"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={12}>
                <Box sx={CARD}>
                  {isClientsLoading && clients.length !== 0
                      ?
                      <Typography>Ни одного клиента не найдено. Чтобы добавить договор, добавьте сначала
                        клиента</Typography>
                      : <pre>{JSON.stringify(clients, null, 2)}</pre>}

                  <RadioButtonChoice
                      options={clientsDataForRadioBtns}
                      heading="Выберите клиента"
                      setChosenOption={setChosenClient}
                  />

                  {chosenClient}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
}

export default AddClientContract;


// // TODO сюда надо запросить клиентов залогиненной команды, вывести их радиобатоннами
// // TODO надо сделать добавление блоба
//
// import React, { useEffect } from "react";
// import type { NextPage } from "next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { useTranslation } from "next-i18next";
// import { useForm, SubmitHandler, Controller } from "react-hook-form";
// import { Typography } from "@mui/material";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Unstable_Grid2";
// import Button from "@mui/material/Button";
// import TextField from '@mui/material/TextField';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Layout from "../../components/layout";
// // import { Team as Inputs, TeamFromDB } from "../../interfaces/team";
// import { Counterparty, CounterpartyFromDB } from "../../interfaces/counterparty";
// import { Contract, ContractFromDB } from "../../interfaces/contract";
// import { CARD_SPACING, CARD } from "../../styles/constants";
// import useFetch from "../../api/useFetch";
// import { useAuth } from "../../contexts/authProvider";
// import RequireAuth from "../../components/RequireAuth";
// import { createContract } from "../../api/client";
//
// type NumberFieldValue = number|""
//
// interface Inputs {
//   number : string,
//   startDateDay : NumberFieldValue,
//   startDateMonth : NumberFieldValue,
//   startDateYear : NumberFieldValue,
//   endDateDay : NumberFieldValue,
//   endDateMonth : NumberFieldValue,
//   endDateYear : NumberFieldValue,
//   linkToFile? : string
// }
//
// const AddClientContract : NextPage = () => {
//   const { handleSubmit, reset, formState: { isSubmitSuccessful }, control, watch, register } = useForm<Inputs>({
//     defaultValues: {
//       number: "",
//       startDateDay: "",
//       startDateMonth: "",
//       startDateYear: "",
//       endDateDay: "",
//       endDateMonth: "",
//       endDateYear: "",
//       linkToFile: undefined
//     }
//   });
//   const { t } = useTranslation("clients");
//   const auth = useAuth();
//
//   const {
//     data: clients,
//     fetchData: refetchClients,
//     isLoading,
//     error
//   } = useFetch<ClientFromDB[]>("/clients", [], { teamId: 1 }); // TODO поменять на { teamId: auth.team } после добавление функции авторизации
//
//   //
//   // useEffect(() => {
//   //   reset();
//   // }, [reset, isSubmitSuccessful])
//
//   const onSubmit : SubmitHandler<Inputs> = data => {
//     const startDate = new Date(Number(data.startDateYear), Number(data.startDateMonth) - 1, Number(data.startDateDay));
//     const endDate = new Date(Number(data.endDateYear), Number(data.endDateMonth) - 1, Number(data.endDateDay));
//     const formData : ClientContract = {
//       number: data.number,
//       linkToFile: data.linkToFile,
//       startDate,
//       endDate
//     }
//     createContract(formData, 1);
//     console.log(formData);
//   };
//
//   return (
//       <RequireAuth>
//         <Layout title={t("addContract.title")} heading={t("addContract.heading")}>
//           <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
//             <Grid container spacing={CARD_SPACING}>
//               <Grid xs={6}>
//                 <Box sx={CARD}>
//                   <Box
//                       component="form"
//                       encType="multipart/form-data"
//                       noValidate
//                       sx={{
//                         width: "auto",
//                         display: "flex",
//                         flexDirection: "column",
//                         "& > :not(style)": {
//                           marginBottom: "1rem"
//                         },
//                       }}
//                       onSubmit={handleSubmit(onSubmit)}
//                   >
//                     <Controller
//                         control={control}
//                         name="number"
//                         rules={{ required: true }}
//                         render={({ field: { ref, ...field } }) => (
//                             <TextField
//                                 {...field}
//                                 inputRef={ref}
//                                 label={t("addContract.form.number")}
//                                 variant="outlined"
//                                 required
//                             />
//                         )}
//                     />
//                     <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
//                       <Box sx={{ display: "flex", flexDirection: "column", width: "48%" }}>
//                         <Box sx={{ width: "100%", paddingBottom: "0.5rem" }}>
//                           {t("addContract.form.startDate")}
//                         </Box>
//                         <Box sx={{
//                           display: "flex",
//                           flexDirection: "row",
//                           justifyContent: "space-between"
//                         }}>
//                           <Box sx={{ width: "30%" }}>
//                             <Controller
//                                 control={control}
//                                 name="startDateDay"
//                                 render={({ field: { ref, ...field } }) => (
//                                     <TextField
//                                         {...field}
//                                         inputRef={ref}
//                                         label={t("addContract.form.day")}
//                                         variant="outlined"
//                                         type="number"
//                                     />
//                                 )}
//                             />
//                           </Box>
//                           <Box sx={{ width: "30%" }}>
//                             <Controller
//                                 control={control}
//                                 name="startDateMonth"
//                                 render={({ field: { ref, ...field } }) => (
//                                     <TextField
//                                         {...field}
//                                         inputRef={ref}
//                                         label={t("addContract.form.month")}
//                                         variant="outlined"
//                                         type="number"
//                                     />
//                                 )}
//                             />
//                           </Box>
//                           <Box sx={{ width: "30%" }}>
//                             <Controller
//                                 control={control}
//                                 name="startDateYear"
//                                 render={({ field: { ref, ...field } }) => (
//                                     <TextField
//                                         {...field}
//                                         inputRef={ref}
//                                         label={t("addContract.form.year")}
//                                         variant="outlined"
//                                         type="number"
//                                     />
//                                 )}
//                             />
//                           </Box>
//                         </Box>
//                       </Box>
//
//                       <Box sx={{ display: "flex", flexDirection: "column", width: "48%" }}>
//                         <Box sx={{ width: "100%", paddingBottom: "0.5rem" }}>
//                           {t("addContract.form.endDate")}
//                         </Box>
//                         <Box sx={{
//                           display: "flex",
//                           flexDirection: "row",
//                           justifyContent: "space-between"
//                         }}>
//                           <Box sx={{ width: "30%" }}>
//                             <Controller
//                                 control={control}
//                                 name="endDateDay"
//                                 render={({ field: { ref, ...field } }) => (
//                                     <TextField
//                                         {...field}
//                                         inputRef={ref}
//                                         label={t("addContract.form.day")}
//                                         variant="outlined"
//                                         type="number"
//                                     />
//                                 )}
//                             />
//                           </Box>
//                           <Box sx={{ width: "30%" }}>
//                             <Controller
//                                 control={control}
//                                 name="endDateMonth"
//                                 render={({ field: { ref, ...field } }) => (
//                                     <TextField
//                                         {...field}
//                                         inputRef={ref}
//                                         label={t("addContract.form.month")}
//                                         variant="outlined"
//                                         type="number"
//                                     />
//                                 )}
//                             />
//                           </Box>
//                           <Box sx={{ width: "30%" }}>
//                             <Controller
//                                 control={control}
//                                 name="endDateYear"
//                                 render={({ field: { ref, ...field } }) => (
//                                     <TextField
//                                         {...field}
//                                         inputRef={ref}
//                                         label={t("addContract.form.year")}
//                                         variant="outlined"
//                                         type="number"
//                                     />
//                                 )}
//                             />
//                           </Box>
//                         </Box>
//                       </Box>
//                     </Box>
//                     <Controller
//                         control={control}
//                         name="linkToFile"
//                         render={({ field: { ref, ...field } }) => (
//                             <TextField
//                                 {...field}
//                                 inputRef={ref}
//                                 label={t("addContract.form.linkToFile")}
//                                 variant="outlined"
//                             />
//                         )}
//                     />
//
//                     <Button type="submit" variant="contained"
//                             sx={{
//                               width: "auto",
//                               margin: "0 auto"
//                             }}
//                     >
//                       {t("addContract.form.submit")}
//                     </Button>
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid xs={6}>
//                 <Grid container spacing={CARD_SPACING}>
//                   <Grid xs={12}>
//                     <Box sx={CARD}>
//                       <Typography>{t("instruction.text")}</Typography>
//                     </Box>
//                   </Grid>
//                   <Grid xs={12}>
//                     <Box sx={CARD}>
//                       <Typography variant="h6">{t("teams.heading")}</Typography>
//                       {/*{isLoading*/}
//                       {/*    ? <div>Loading...</div>*/}
//                       {/*    : <List>*/}
//                       {/*      {teams.map(team => {*/}
//                       {/*        return (*/}
//                       {/*            <ListItem key={team.id + team.name}>*/}
//                       {/*              <ListItemText primary={team.name}/>*/}
//                       {/*            </ListItem>*/}
//                       {/*        )*/}
//                       {/*      })}*/}
//                       {/*    </List>*/}
//                       {/*}*/}
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Box>
//         </Layout>
//       </RequireAuth>
//   )
// };
//
// export async function getStaticProps({ locale } : { locale : string }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common", "clients"])),
//     },
//   };
// }
//
// export default AddClientContract;