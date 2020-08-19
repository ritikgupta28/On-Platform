import React from 'react'

export default function Output(props) {
	let result=props.result.data.body.output;
	return (
    <div>
     <p>Output:</p>
	  <div className='out'>
         <p>{result}</p>
      </div>
    </div>
	)
}