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
import { AddAgreementForm } from "../../components/AddAgreementForm";


const AddClientAgreement : NextPage = () => {
  let { team } = useAuth();

  const {
    data: contractors,
    isLoading: isContractorsLoading
  } = useFetch<CounterpartyFromDB[]>("/counterparties/names", [], { teamId: team, type: "contractor" });

  const [chosenContractor, setChosenContractor] = useState<number|undefined>(undefined);
  const [chosenContract, setChosenContract] = useState<number|undefined>(undefined);

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

  const onContractorChoiceChange = (contractorId : number) => {
    setChosenContractor(contractorId);
    setChosenContract(undefined);
  }

  const getContractsArrayOfChosenContractor = (fetchedContractors : CounterpartyFromDB[], id : number) => {
    return fetchedContractors?.find(client => client.id === id)?.Contracts || [];
  };

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
                        heading="Выберите клиента"
                        setChosenOption={onContractorChoiceChange}
                        whatToAdd="подрядчика"
                    />
                  </Box>

                  {chosenContractor !== undefined &&
                      <Box>
                        <RadioButtonChoice
                            options={mapContractsDataForRadioBtns(getContractsArrayOfChosenContractor(contractors, chosenContractor))}
                            heading="Выберите договор"
                            setChosenOption={setChosenContract}
                            whatToAdd="договор"
                        />
                      </Box>
                  }

                  {chosenContract !== undefined && <AddAgreementForm contractId={chosenContract}/>}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
}

export default AddClientAgreement;