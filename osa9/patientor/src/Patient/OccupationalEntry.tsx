import React from 'react';
import { Card, CardContent, CardHeader } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../types";
import Diagnoses from './Diagnoses';

const HospitalEntry  = ({entry}: {entry: OccupationalHealthcareEntry}): JSX.Element => {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          {entry.date}
          <i className="stethoscope icon"></i>
          {entry.employerName}
        </CardHeader>
        <div style={{color: 'grey'}}>
          { entry.description }
        </div>
        <Diagnoses diagnosesList={entry.diagnosisCodes}></Diagnoses>
      </CardContent>
    </Card>
  );
};

export default HospitalEntry;