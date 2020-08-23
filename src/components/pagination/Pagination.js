import React from 'react';
import { Button } from 'react-bootstrap'
import './Pagination.css';

const paginator = props => (
  <div className="paginator">
    {props.children}
    <div className="paginator__controls">
      {
        props.currentPage > 1 && (
        <Button className="paginator__control" onClick={props.onPrevious}>Previous</Button>
        )
      }
      {
        props.currentPage < props.lastPage && (
        <Button className="paginator__control" onClick={props.onNext}>Next</Button>
        )
      }
    </div>
  </div>
);

export default paginator;
