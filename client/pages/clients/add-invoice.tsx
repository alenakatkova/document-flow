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
import RequireAuth from "../../components/RequireAuth";
import { RadioButtonChoice, Option } from "../../components/RadioButtonChoice";
import { ContractFromDB } from "../../interfaces/contract";
import { AgreementFromDB } from "../../interfaces/agreement";
import { AddInvoiceForm } from "../../components/AddInvoiceForm";

const AddClientInvoice : NextPage = () => {
  const router = useRouter();
  let { team } = useAuth();

  const {
    data: clients,
    isLoading: isClientsLoading
  } = useFetch<CounterpartyFromDB[]>("/counterparties/names", [], { teamId: team, type: "client" });

  const [chosenClient, setChosenClient] = useState<number|undefined>(undefined);
  const [chosenContract, setChosenContract] = useState<number|undefined>(undefined);
  const [chosenAgreement, setChosenAgreement] = useState<number|undefined>(undefined);

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

  const mapAgreementsDataForRadioBtns = (agreements : AgreementFromDB[]) : Option[] => {
    return agreements.map(agreement => {
      return {
        value: "ДС №" + agreement.number,
        label: "ДС №" + agreement.number,
        id: agreement.id
      }
    });
  };

  const onClientChoiceChange = (clientId : number) => {
    setChosenClient(clientId);
    setChosenContract(undefined);
  }

  const onContractChoiceChange = (contractId : number) => {
    setChosenAgreement(undefined);
    setChosenContract(contractId);
  }

  const getContractsArrayOfChosenClient = (fetchedClients : CounterpartyFromDB[], id : number) => {
    return fetchedClients?.find(client => client.id === id)?.Contracts || [];
  }

  const getAgreementsArrayOfChosenContract = (fetchedContracts : ContractFromDB[], id : number) => {
    return fetchedContracts?.find(contract => contract.id === id)?.Agreements || [];
  }

  const getOptionsForContractsRadioBtns = (chosenClientId : number) => {
    return mapContractsDataForRadioBtns(getContractsArrayOfChosenClient(clients, chosenClientId));
  }

  const getOptionsForAgreementsRadioBtns = (chosenClientId : number, chosenContractId : number) => {
    const clientContracts = getContractsArrayOfChosenClient(clients, chosenClientId);
    const agreementsToContract = getAgreementsArrayOfChosenContract(clientContracts, chosenContractId)
    return mapAgreementsDataForRadioBtns(agreementsToContract)
  }

  const isInvoiceAlreadyExists = (chosenClientId : number, chosenContractId : number, chosenAgreementId : number) => {
    const clientContracts = getContractsArrayOfChosenClient(clients, chosenClientId);
    const agreementsToContract = getAgreementsArrayOfChosenContract(clientContracts, chosenContractId);
    const agreement = agreementsToContract?.find(agreement => agreement.id === chosenAgreementId);
    return agreement?.Invoice !== null && agreement?.Invoice !== undefined;
  }

  return (
      <RequireAuth>
        <Layout title="Форма добавления дополнительного соглашения с клиентом"
                heading={"Форма добавления дополнительного соглашения с клиентом"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={12}>
                <Box sx={CARD}>
                  <Box>
                    <RadioButtonChoice
                        options={clientsDataForRadioBtns}
                        heading="Выберите клиента"
                        setChosenOption={onClientChoiceChange}
                        whatToAdd="клиента"
                        radioGroupName="client"
                    />
                  </Box>

                  {chosenClient !== undefined &&
                      <Box>
                        <RadioButtonChoice
                            options={getOptionsForContractsRadioBtns(chosenClient)}
                            heading="Выберите договор"
                            setChosenOption={onContractChoiceChange}
                            whatToAdd="договор"
                            radioGroupName="contract"
                        />
                      </Box>
                  }

                  {chosenClient !== undefined && chosenContract !== undefined &&
                      <Box>
                        <RadioButtonChoice
                            options={getOptionsForAgreementsRadioBtns(chosenClient, chosenContract)}
                            heading="Выберите допсоглашение"
                            setChosenOption={setChosenAgreement}
                            whatToAdd="допсоглашение"
                            radioGroupName="agreement"
                        />
                      </Box>
                  }

                  {chosenClient !== undefined && chosenAgreement !== undefined && chosenContract !== undefined &&
                      isInvoiceAlreadyExists(chosenClient, chosenContract, chosenAgreement) && "Счет уже добавлен"}
                  {chosenClient !== undefined && chosenAgreement !== undefined && chosenContract !== undefined &&
                      !isInvoiceAlreadyExists(chosenClient, chosenContract, chosenAgreement) &&
                      <AddInvoiceForm agreementId={chosenAgreement}/>}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
}

export default AddClientInvoice;