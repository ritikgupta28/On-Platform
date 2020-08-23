import React, { Fragment } from 'react';

import Backdrop from '../bbackdrop/Backdrop';
import Modal from '../modall/Modal';

const errorHandler = props => (
  <Fragment>
  {props.error && <Backdrop onClick={props.onHandle} />}
    {props.error && (
      <Modal
        title="An Error Occurred"
        onCancelModal={props.onHandle}
        onAcceptModal={props.onHandle}
        acceptEnabled
      >
        <p>{props.error.message}</p>
      </Modal>
    )}
  </Fragment>
);

export default errorHandler;