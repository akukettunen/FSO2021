import { newPatient, Gender } from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringType = (entry: unknown, name: string): string => {
  if (!entry || !isString(entry)) {
    throw new Error(`Incorrect or missing ${name}` + entry);
  }

  return entry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing weather: ' + gender);
  }
  return gender;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): newPatient => {
  const newEntry: newPatient = {
    name: parseStringType(name, 'name'),
    dateOfBirth: parseStringType(dateOfBirth, 'dateOfBirth'),
    ssn: parseStringType(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseStringType(occupation, 'occupation')
  };

  return newEntry;
};

export default toNewPatientEntry;