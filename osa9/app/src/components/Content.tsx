import React from 'react';
import { CoursePart } from '../App';

export interface CourseProps {
  parts: Array<CoursePart>;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content = (props: CourseProps): JSX.Element => {
  return (
    <div>
      <h3>Course parts</h3>
      {
        props.parts.map(part => {
          console.log(part)
          switch(part.type) {
            case "normal":
              console.log('normal')
              return(
                <div>
                  <h2>{part.name}</h2>
                  <p>{part.description}</p>
                  <div>Exercise count {part.exerciseCount}</div>
                </div>
              )
              break;
            case 'groupProject':
              return(
                <div>
                  <h2>{part.name}</h2>
                  <div>
                    Group project count {part.groupProjectCount}
                  </div>
                  Exercise count { part.exerciseCount }
                </div>
              )
              break;
            case 'submission':
              return(
                <div>
                  <h2>{part.name}</h2>
                  <div>
                    <i>{part.description}</i>
                  </div>
                  <div>
                    Exercise count {part.exerciseCount}
                  </div>
                  <a href={part.exerciseSubmissionLink}>Submission</a>
                </div>      
              )
              break;
            case 'special':
              return(
                <div>
                  <h2>{part.name}</h2>
                  <i>{part.description}</i>
                  <div>
                    Exercise count { part.exerciseCount }
                  </div>
                  Requirements:
                  {
                    part.requirements.map(req => {
                      return <div key={req}>{req}</div>
                    })
                  }
                </div>
              )
              break;
            default:
              return assertNever(part);
              break;
          }
        })
      }
    </div>
  )
}

export default Content;