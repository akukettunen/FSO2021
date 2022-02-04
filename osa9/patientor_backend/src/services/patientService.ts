import { Patient, newPatient, nonsensitivePatient } from '../../types';
import patientData from '../../data/patients.json';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): nonsensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: newPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);

  return newPatient as Patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};