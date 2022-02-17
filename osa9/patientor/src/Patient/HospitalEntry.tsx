import React from 'react';
import { Card } from "semantic-ui-react";
import { HospitalEntry } from "../types";
import Diagnoses from './Diagnoses';

const HospitalEntryComponent  = ({entry}: {entry: HospitalEntry}): JSX.Element => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <i className="hospital icon"></i>
        </Card.Header>
        <div style={{color: 'grey'}}>
          { entry.description }
        </div>
        <Diagnoses diagnosesList={entry.diagnosisCodes}></Diagnoses>
      </Card.Content>
    </Card>
  );
};

export default HospitalEntryComponent;