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

const AddContractorInvoice : NextPage = () => {
  let { team } = useAuth();

  const {
    data: contractors,
    isLoading: isContractorsLoading
  } = useFetch<CounterpartyFromDB[]>("/counterparties/names", [], { teamId: team, type: "contractor" });

  const [chosenContractor, setChosenContractor] = useState<number|undefined>(undefined);
  const [chosenContract, setChosenContract] = useState<number|undefined>(undefined);
  const [chosenAgreement, setChosenAgreement] = useState<number|undefined>(undefined);

  const contractorsDataForRadioBtns = contractors.map(contractor => {
    return {
      value: contractor.name,
      label: contractor.name,
      id: contractor.id
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

  const onClientChoiceChange = (contractorId : number) => {
    setChosenContractor(contractorId);
    setChosenContract(undefined);
  };

  const onContractChoiceChange = (contractId : number) => {
    setChosenAgreement(undefined);
    setChosenContract(contractId);
  };

  const getContractsArrayOfChosenClient = (fetchedContractors : CounterpartyFromDB[], id : number) => {
    return fetchedContractors?.find(contractor => contractor.id === id)?.Contracts || [];
  }

  const getAgreementsArrayOfChosenContract = (fetchedContracts : ContractFromDB[], id : number) => {
    return fetchedContracts?.find(contract => contract.id === id)?.Agreements || [];
  }

  const getOptionsForContractsRadioBtns = (chosenClientId : number) => {
    return mapContractsDataForRadioBtns(getContractsArrayOfChosenClient(contractors, chosenClientId));
  }

  const getOptionsForAgreementsRadioBtns = (chosenContractorId : number, chosenContractId : number) => {
    const clientContracts = getContractsArrayOfChosenClient(contractors, chosenContractorId);
    const agreementsToContract = getAgreementsArrayOfChosenContract(clientContracts, chosenContractId)
    return mapAgreementsDataForRadioBtns(agreementsToContract)
  }

  const isInvoiceAlreadyExists = (chosenContractorId : number, chosenContractId : number, chosenAgreementId : number) => {
    const clientContracts = getContractsArrayOfChosenClient(contractors, chosenContractorId);
    const agreementsToContract = getAgreementsArrayOfChosenContract(clientContracts, chosenContractId);
    const agreement = agreementsToContract?.find(agreement => agreement.id === chosenAgreementId);
    return agreement?.Invoice !== null && agreement?.Invoice !== undefined;
  }

  return (
      <RequireAuth>
        <Layout title="Форма добавления дополнительного соглашения с подрядчиком"
                heading={"Форма добавления дополнительного соглашения с подрядчиком"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={12}>
                <Box sx={CARD}>
                  <Box>
                    <RadioButtonChoice
                        options={contractorsDataForRadioBtns}
                        heading="Выберите подрядчика"
                        setChosenOption={onClientChoiceChange}
                        whatToAdd="подрядчика"
                        radioGroupName="contractor"
                    />
                  </Box>

                  {chosenContractor !== undefined &&
                      <Box>
                        <RadioButtonChoice
                            options={getOptionsForContractsRadioBtns(chosenContractor)}
                            heading="Выберите договор"
                            setChosenOption={onContractChoiceChange}
                            whatToAdd="договор"
                            radioGroupName="contract"
                        />
                      </Box>
                  }

                  {chosenContractor !== undefined && chosenContract !== undefined &&
                      <Box>
                        <RadioButtonChoice
                            options={getOptionsForAgreementsRadioBtns(chosenContractor, chosenContract)}
                            heading="Выберите допсоглашение"
                            setChosenOption={setChosenAgreement}
                            whatToAdd="допсоглашение"
                            radioGroupName="agreement"
                        />
                      </Box>
                  }

                  {chosenContractor !== undefined && chosenAgreement !== undefined && chosenContract !== undefined &&
                      isInvoiceAlreadyExists(chosenContractor, chosenContract, chosenAgreement) && "Счет уже добавлен"}
                  {chosenContractor !== undefined && chosenAgreement !== undefined && chosenContract !== undefined &&
                      !isInvoiceAlreadyExists(chosenContractor, chosenContract, chosenAgreement) &&
                      <AddInvoiceForm agreementId={chosenAgreement}/>}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
}

export default AddContractorInvoice;