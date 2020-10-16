import React from 'react';
import { Modal, Button } from 'react-bootstrap'

const errorHandler = props => (
  <div>
    {props.error && (
      <Modal
        show={true}
        onHide={props.onHandle}
        backdrop="static"
        keyboard={false}
      >
      <Modal.Dialog style={{ margin: '0px'}}>
       <Modal.Header closeButton>
       {props.result
        ?
        <Modal.Title>Message</Modal.Title>
        :
        <Modal.Title>An Error Occurred</Modal.Title>
       }
       </Modal.Header>
       <Modal.Body>
        <p>{props.error.message}</p>
       </Modal.Body>
       <Modal.Footer>
        <Button variant="secondary" onClick={props.onHandle}>Close</Button>
       </Modal.Footer>
       </Modal.Dialog>
       </Modal>
    )}
  </div>
);

export default errorHandler;