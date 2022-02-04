import express from 'express';
import cors from 'cors';
import diagnoseRoute from './routes/diagnoses';
import patientRoute from './routes/patients';

const app = express();

app.use(cors());
app.use(express.json());


const PORT = 3001;

app.use('/api/diagnoses', diagnoseRoute);
app.use('/api/patients', patientRoute);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});