import React from 'react';
import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CoursePartBase {
  type: "normal";
  description: string;
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  description: string;
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBase {
  type: "special";
  description: string;
  requirements: Array<string>;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const App = (): JSX.Element => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      type: "normal",
      description: "This is the leisured course part"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      type: "normal",
      description: "This is the harded course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      type: "groupProject",
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      type: "submission",
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  const total: number = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

  return (
    <div>
      <Header name={courseName}></Header>
      <Content 
        parts={courseParts}
      ></Content>
      <Total total={total}></Total>
    </div>
  );
};

export default App;
