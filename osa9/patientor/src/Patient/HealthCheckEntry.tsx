import React from 'react';
import { Card, CardContent, CardHeader } from "semantic-ui-react";
import { HealthCheckEntry } from "../types";
import Diagnoses from './Diagnoses';

const HospitalEntry  = ({entry}: {entry: HealthCheckEntry}): JSX.Element => {
  const heartColor = (rating: number): string =>{
    if(rating === 0) return 'green';
    else if(rating === 1) return 'yellow';

    return 'red';
  };

  return (
    <Card>
      <CardContent>
        <CardHeader>
          {entry.date}
          <i className="user md icon"></i>
        </CardHeader>
        <div style={{color: 'grey'}}>
          { entry.description }
        </div>
          <i className="heart icon" style={{'color': heartColor(entry.healthCheckRating)}}></i>
        <Diagnoses diagnosesList={entry.diagnosisCodes}></Diagnoses>
      </CardContent>
    </Card>
  );
};

export default HospitalEntry;