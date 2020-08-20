import React, { Fragment } from 'react';

// import Backdrop from '../Backdrop/Backdrop';
// import Modal from '../Modal/Modal';

const errorHandler = props => (
  <Fragment>
  {props.error && (
    <h1>An Error Occoured</h1>
  )}
  </Fragment>
);

export default errorHandler;
