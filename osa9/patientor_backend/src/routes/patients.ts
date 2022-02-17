/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { parseStringType, toNewEntryEntry } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id',  (req, res) => {
  const id: string = parseStringType(req.params.id, 'id');

  const patient = patientService.patientById(id);

  if(!patient) throw new Error('patient not found');

  res.json(patient);
});

router.post('/:id/entries', (req, res) => {
  console.log('POST to entries')
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const entry = toNewEntryEntry(req.body);
    patientService.addEntryForPatient(entry, req.params.id);

    res.json(entry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;