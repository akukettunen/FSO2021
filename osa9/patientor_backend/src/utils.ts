import { newPatient, Gender, EntryWithoutId, HealthCheckRating } from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseStringType = (entry: unknown, name: string): string => {
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

const parseHealthCheckRating = (param: any): HealthCheckRating => {
  if (!param || !Object.values(HealthCheckRating).includes(param)) {
    throw new Error('Incorrect or missing health check rating: ' + param);
  }

  return param;
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseDischarge = (param: unknown): {date: string, criteria: string} => {
  const discahrge = param as { date: string, criteria: string };

  let date = discahrge?.date;
  let criteria = discahrge?.criteria;

  if(!date || !criteria || !isString(date) || !isString(criteria)) {
    throw new Error('Incorrect or missing discaharge');
  }

  return {date, criteria};
}

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };
type EntryFields = { type: unknown, description: unknown, date: unknown, specialist: unknown, healthCheckRating: unknown, discharge: unknown, employerName: unknown };

export const toNewEntryEntry = ({ 
    type, description, date, specialist, healthCheckRating, discharge, employerName 
  }: EntryFields): EntryWithoutId => {

  const base = {
    type: parseStringType(type, 'type'),
    description: parseStringType(description, 'description'),
    date: parseStringType(date, 'date'),
    specialist: parseStringType(specialist, 'specialist'),
  };

  if(type === 'HealthCheck') {
    return {
      ...base,
      healthCheckRating: parseHealthCheckRating(healthCheckRating)
    } as EntryWithoutId;
  } else if(type === 'Hospital') {
    return {
      ...base,
      discharge: parseDischarge(discharge)
    } as EntryWithoutId;
  } else {
    return {
      ...base,
      employerName: parseStringType(employerName, 'employerName')
    } as EntryWithoutId;
  }
};

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