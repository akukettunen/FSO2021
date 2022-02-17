import { Patient, newPatient, nonsensitivePatient, EntryWithoutId, Entry } from '../../types';
import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

let patients: Array<Patient> = patientData;

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

const patientById = (id: string): Patient | undefined => {
  const patients = getPatients();

  const patient = patients.find(p => p.id == id);

  return patient;
};

const addEntryForPatient = (entry: EntryWithoutId, patient_id: string) => {
  const newPats = [...getPatients()];

  const ind = newPats.findIndex(pat => {
    return pat.id == patient_id
  })
  if(ind < 0) throw new Error('Patient not found :(')

  const pat_entries: Entry[] = newPats[ind]['entries'] || [];

  const entries = pat_entries.concat({...entry, id: uuid()});

  patients[ind] = { ...patients[ind], entries }
}

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  patientById,
  addEntryForPatient
};