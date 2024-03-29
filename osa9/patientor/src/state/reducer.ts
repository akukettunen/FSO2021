import { State } from "./state";
import { Diagnose, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_DIAGNOSE_LIST";
    payload: Diagnose[];
  }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          )
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patients: {
          [action.payload.id]: action.payload
        }
      };
  }
};

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload
  };
};

export const setDiagnosesList = (payload: Diagnose[]): Action => {
  return {
    type: "SET_DIAGNOSE_LIST",
    payload
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload
  };
};

export const updatePatient = (payload: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload
  };
};


