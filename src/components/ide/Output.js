import React from 'react';

export default function Output(props) {
  let result = props.result.data.body.output;
  return (
    <div className='out'>
      <h2>Output: </h2>
      <hr/>
      {result}
    </div>
  );
}
