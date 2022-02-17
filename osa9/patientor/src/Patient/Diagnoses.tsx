/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { useStateValue } from "../state";

const HospitalEntryComponent  = ({diagnosesList}: {diagnosesList: string[] | undefined}): JSX.Element => {
  const [{diagnoses}] = useStateValue();
  if(!diagnosesList || !diagnosesList.length) return <></>;

  return (
    <>
      <h4>Diagnoses</h4>
      {
        diagnosesList.map(d => {
          return <div key={d}>{d} - {diagnoses[d]?.name}</div>;
        })
      }
    </>
  );
};

export default HospitalEntryComponent;