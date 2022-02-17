/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { Patient,  Gender, Entry, EntryWithoutId } from "../types";
import { Header, Button } from "semantic-ui-react";
import HospitalEntryComponent from './HospitalEntry';
import OccupationalEntry from './OccupationalEntry';
import HealthCheckEntry from './HealthCheckEntry';
import AddEntryModal from '../AddEntryModal';
import { useStateValue, updatePatient } from '../state';

const PatientData = (): JSX.Element => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [{patients}, dispatch] = useStateValue();
  console.log(patients);
  const [patient, setPatient] = useState<Patient>({
    name: "",
    // entries: [] as Entries,
    gender: "" as Gender,
    ssn: "",
    id: "",
    occupation: "",
    entries: []
  });

  const params: {id: string} = useParams();

  useEffect(() => {
    void fetchPatient();
  }, []);

  const fetchPatient = async () => {
    try {
      const response = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${params.id}`
      );

      setPatient(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const { data } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${params.id}/entries`,
        values
      );
      console.log(data);

      patient['entries'].push(data);

      console.log(patient);
      
      dispatch(updatePatient(patient));

      setModalOpen(false);

      // closeModal();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);
      console.error(e.response?.data || 'Unknown Error');
    }
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {
    switch(entry.type) {
      case "Hospital":
        return <HospitalEntryComponent entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalEntry entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntry entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <div>
        <Header>{ patient.name } 
          {patient.gender == 'male' && <i className="mars icon"></i>}
          {patient.gender == 'female' && <i className="venus icon"></i>}
          {patient.gender == 'other' && <i className="genderless icon"></i>}
        </Header>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <div>Date of birth: {patient.dateOfBirth || 'unknown'}</div>
      </div>
      <Button onClick={() => setModalOpen(true)}>Add New Health Check Entry</Button>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={ (e) => {void submitNewEntry(e); }}
        onClose={() => setModalOpen(false)}
      ></AddEntryModal>
      {
        patient.entries.map(entry => EntryDetails({entry}))
      }
    </div>
  );
};

export default PatientData;
