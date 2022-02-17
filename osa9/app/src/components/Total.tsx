import React from 'react';

const Total = ({ total }: { total: number}) => {
  return (
    <div>
      <h3>Total parts</h3>
      <p>
        { total }
      </p>
    </div>
  )
}

export default Total;