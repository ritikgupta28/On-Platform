import React from 'react';
import { Button } from 'react-bootstrap'

const paginator = props => (
  <div>
    {props.children}
    <div style={{ textAlign: 'center' }}>
      {props.currentPage > 1 && (
        <Button style={{ margin: '10px' }} variant="outline-primary" onClick={props.onPrevious}>Previous</Button>
      )}
      {props.currentPage > 1 && props.currentPage < props.lastPage && (
        <Button style={{ margin: '10px' }} variant="outline-primary" >{props.currentPage}</Button>
      )}
      {props.currentPage < props.lastPage && (
        <Button style={{ margin: '10px' }} variant="outline-primary" onClick={props.onNext}>Next</Button>
      )}
    </div>
  </div>
);

export default paginator;
