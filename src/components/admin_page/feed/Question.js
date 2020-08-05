import React from 'react';

const Question = props => (
	<div>
		<h3>{props.title}</h3>
  	<div>{props.content}</div>
  	<div>{props.sinput}</div>
	<div>{props.soutput}</div>
  </div>
);

export default Question;
