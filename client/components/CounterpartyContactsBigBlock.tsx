import React from "react";
import Box from "@mui/material/Box";
import { CARD } from "../styles/constants";
import { Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import format from "date-fns/format";
import { Contact, ContactFromDB } from "../interfaces/contact";
import { useForm, SubmitHandler, Controller, Control } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { generateDateFromYYYYMMDD } from "../utils/functions";
import { useRouter } from "next/router";
import { createContact } from "../api/counterparty";

interface CounterpartyContactsBigBlockProps {
  isLoading : boolean;
  contacts : ContactFromDB[]|undefined;
}

interface DateInputProps {
  dayInputName : string;
  monthInputName : string;
  yearInputName : string;
  control : Control<any>; // TODO разобраться, почему не могу передать <Inputs>
  heading : string;
}

const DateInput = ({ dayInputName, monthInputName, yearInputName, control, heading } : DateInputProps) => {
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

type NumberFieldValue = number|"";

interface Inputs {
  year : NumberFieldValue|undefined;
  month : NumberFieldValue|undefined;
  day : NumberFieldValue|undefined;
  name : string;
  phone : string|undefined;
  email : string|undefined;
  job : string|undefined;
}

interface AddCounterpartyContactFormProps {
  closeForm : () => void;
}

const AddCounterpartyContactForm = ({ closeForm } : AddCounterpartyContactFormProps) => {
  const router = useRouter();

  const { handleSubmit, reset, formState: { isSubmitSuccessful }, control, watch, register } = useForm<Inputs>({
    defaultValues: {
      year: "",
      month: "",
      day: "",
      name: "",
      phone: "",
      email: "",
      job: ""
    }
  });

  const onSubmit : SubmitHandler<Inputs> = data => {
    const birthday = generateDateFromYYYYMMDD(data.year, data.month, data.day);
    const { name, phone, job, email } = data;
    const formData = {
      // counterpartyId: Number(router.query.id),
      name,
      phone,
      job,
      email,
      birthday
    }

    createContact(formData, Number(router.query.id));
    // createContract(formData, 1);
    // console.log(formData);
    console.log(formData);
    reset();
    closeForm();
  };

  return (
      <Box
          component="form"
          encType="multipart/form-data"
          noValidate
          sx={{
            width: "50%",
            minWidth: "500px",
            display: "flex",
            flexDirection: "column",
            "& > :not(style)": {
              marginBottom: "1rem"
            },
          }}
          onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
                <TextField
                    {...field}
                    inputRef={ref}
                    label={"ФИО"}
                    variant="outlined"
                    required
                />
            )}
        />

        <Controller
            control={control}
            name="job"
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
                <TextField
                    {...field}
                    inputRef={ref}
                    label={"Должность"}
                    variant="outlined"
                    required
                />
            )}
        />

        <Controller
            control={control}
            name="phone"
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
                <TextField
                    {...field}
                    inputRef={ref}
                    label={"Телефон"}
                    variant="outlined"
                    required
                />
            )}
        />

        <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
                <TextField
                    {...field}
                    inputRef={ref}
                    label={"Электронная почта"}
                    variant="outlined"
                    required
                />
            )}
        />

        <DateInput dayInputName={"day"}
                   monthInputName={"month"}
                   yearInputName={"year"}
                   control={control}
                   heading="День рождения"/>
        <Button type="submit" variant="contained"
                sx={{
                  width: "auto",
                  margin: "0 auto"
                }}
        >
          Добавить
        </Button>
      </Box>
  )
};

const CounterpartyContactsBigBlock = ({ isLoading, contacts } : CounterpartyContactsBigBlockProps) => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const toggleFormOpen = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
      <>
        <Box sx={CARD}>
          <Typography variant="h6" sx={{ marginBottom: "1rem" }}>Контакты</Typography>
          {isLoading || (contacts === undefined) || (contacts.length === 0)
              ? ""
              : (
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>ФИО</TableCell>
                          <TableCell align="center">Должность</TableCell>
                          <TableCell align="center">Телефон</TableCell>
                          <TableCell align="center">Почта</TableCell>
                          <TableCell align="center">День рождения</TableCell>
                          <TableCell align="center">Действия</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {contacts?.map((contact) => (
                            <TableRow
                                key={"contact" + contact.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {contact.name}
                              </TableCell>
                              <TableCell align="center">{contact.job}</TableCell>
                              <TableCell align="center">{contact.phone}</TableCell>
                              <TableCell align="center">{contact.email}</TableCell>
                              <TableCell align="center">
                                {contact.birthday && format(new Date(contact.birthday), 'dd/MM/yyyy')}
                              </TableCell>
                              <TableCell align="center">
                                <Button>Редактировать</Button>
                                <Button>Удалить</Button>
                              </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
              )
          }
          {isFormOpen
              ? <AddCounterpartyContactForm closeForm={toggleFormOpen}/>
              : <Button variant="contained" sx={{ marginTop: "1rem" }} onClick={toggleFormOpen}>
                Добавить контактное лицо
              </Button>
          }

        </Box>
      </>
  )
}

export default CounterpartyContactsBigBlock;

