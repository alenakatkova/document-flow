import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import { CounterpartyFromDB } from "../../interfaces/counterparty";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD, CARD_SPACING } from "../../styles/constants";
import { useAuth } from "../../contexts/authProvider";
import { Typography } from "@mui/material";
import RequireAuth from "../../components/RequireAuth";
import { RadioButtonChoice, Option } from "../../components/RadioButtonChoice";
import { ContractFromDB } from "../../interfaces/contract";


const AddClientAgreement : NextPage = () => {
  const router = useRouter();
  let { team } = useAuth();

  const {
    data: clients,
    isLoading: isClientsLoading
  } = useFetch<CounterpartyFromDB[]>("/counterparties/names", [], { teamId: team, type: "client" });

  const [chosenClient, setChosenClient] = useState<number|undefined>(undefined);
  const [chosenContract, setChosenContract] = useState<number|undefined>(undefined);

  const clientsDataForRadioBtns = clients.map(client => {
    return {
      value: client.name,
      label: client.name,
      id: client.id
    }
  });

  const mapContractsDataForRadioBtns = (contracts : ContractFromDB[]) : Option[] => {
    return contracts.map(contract => {
      return {
        value: "Договор №" + contract.number,
        label: "Договор №" + contract.number,
        id: contract.id
      }
    });
  };

  const onClientChoiceChange = (clientId : number) => {
    setChosenClient(clientId);
    setChosenContract(undefined);
  }

  const getContractsArrayOfChosenClient = (fetchedClients : CounterpartyFromDB[], id : number) => {
    return fetchedClients?.find(client => client.id === id)?.Contracts || [];
  }

  return (
      <RequireAuth>
        <Layout title="Форма добавления дополнительного соглашения с клиентом"
                heading={"Форма добавления дополнительного соглашения с клиентом"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={12}>
                <Box sx={CARD}>
                  {isClientsLoading && clients.length !== 0
                      ?
                      <Typography>Ни одного клиента не найдено. Чтобы добавить договор, добавьте сначала
                        клиента</Typography>
                      : <pre>{JSON.stringify(clients, null, 2)}</pre>}

                  <Box>
                    <RadioButtonChoice
                        options={clientsDataForRadioBtns}
                        heading="Выберите клиента"
                        setChosenOption={onClientChoiceChange}
                        whatToAdd="клиента"
                    />
                  </Box>

                  {chosenClient &&
                      <Box>
                        <RadioButtonChoice
                            options={mapContractsDataForRadioBtns(getContractsArrayOfChosenClient(clients, chosenClient))}
                            heading="Выберите договор"
                            setChosenOption={setChosenContract}
                            whatToAdd="договор"
                        />
                      </Box>
                  }

                  {chosenContract}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
}

export default AddClientAgreement;