interface Result { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface BmiValues {
  value1: Array<number>;
  value2: number;
}

export const parseBmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (Array.isArray(JSON.parse(args[2])) && !isNaN(Number(args[3]))) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value1: JSON.parse(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (days: Array<number>, target: number): Result  => {
  const trainingDays: number = days.filter(day => day).length;
  const totalHours: number = days.reduce((partialSum, a) => partialSum + a, 0); 
  const average = totalHours / days.length;
  const success = average > target;
  const diff = average - target;
  let rating: number;

  if(diff > -0.5) rating = 3;
  else if(diff > -1) rating = 2;
  else rating = 1;

  let ratingDescription;
  switch(rating) {
    case 3:
      ratingDescription = 'Great success';
      break;
    case 2:
      ratingDescription = 'Not too bad';
      break;
    default:
      ratingDescription = 'Very sad';
  }

  return {
    periodLength: days.length,
    trainingDays,
    success,
    average,
    rating,
    ratingDescription,
    target
  };
};

try {
  const { value1, value2 } = parseBmiArguments(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}