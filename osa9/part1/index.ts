import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.get('/bmi', (req, res) => {
  if(!req.query.height || !req.query.weight) {
    res.status(500).send('bad request').end();
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const height: number = Number(req.query.height);
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const weight: number = Number(req.query.weight);

  const bmi = calculateBmi(height, weight);

  res.send({bmi, height, weight});
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if(!daily_exercises || !target) {
    res.status(500).send('parameters missing').end();
    return;
  }

  if(!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    res.status(500).send('malformatted parameters').end();
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const data = calculateExercises(daily_exercises, target);

  res.json(data);
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});