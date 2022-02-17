import React from "react";
import { TextField, HealthOption } from "../AddPatientModal/FormField";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Field, Formik, Form } from "formik";
import { Grid, Button } from 'semantic-ui-react';

export type HealthEntryFromValues = Omit<HealthCheckEntry, "id">;

const healthOptions: HealthOption[] = [
  { value: HealthCheckRating['Healthy'], label: "Healthy" },
  { value: HealthCheckRating['LowRisk'], label: "Low risk" },
  { value: HealthCheckRating['HighRisk'], label: "High risk" },
  { value: HealthCheckRating['CriticalRisk'], label: "💀 💀 💀 💀" },
];

console.log(healthOptions);

interface EntryProps {
  onSubmit: (values: HealthEntryFromValues) => void;
  onCancel?: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: EntryProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 3,
        type: "HealthCheck"
      }}
      onSubmit={onSubmit}
      // validate={() => {
      //   return true;
      // }}
    >
      {({ setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            >
            </Field>
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            >
            </Field>
            <Field
              label="Specialist"
              placeholder="Jane Doe"
              name="specialist"
              component={TextField}
            ></Field>
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Health check rating (0 - 3)"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            ></Field>
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;