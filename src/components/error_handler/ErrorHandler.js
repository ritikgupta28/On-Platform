import React from 'react';
import { Modal, Button } from 'react-bootstrap'

const errorHandler = props => (
  <div>
    {props.error && (
      <Modal
        show="true"
        onHide={props.onHandle}
        backdrop="static"
        keyboard={false}
      >
      <Modal.Dialog>
       <Modal.Header closeButton>
        <Modal.Title>An Error Occurred</Modal.Title>
       </Modal.Header>
       <Modal.Body>
        <p>{props.error.message}</p>
       </Modal.Body>
       <Modal.Footer>
        <Button variant="secondary" onClick={props.onHandle}>Close</Button>
        <Button variant="primary" onClick={props.onHandle}>Accept</Button>
       </Modal.Footer>
       </Modal.Dialog>
       </Modal>
    )}
  </div>
);

export default errorHandler;