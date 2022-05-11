import React, { useState } from "react";
import Box from "./Box";
import { Button, Modal } from "react-bootstrap";
import RepeatModalContents from "./RepeatModal-Contents";

function OptionModal({ setoptions, show, setShow }) {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = () => {
    setoptions({ ...selectedOptions });
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Repeat 설정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RepeatModalContents setSelectedOptions={setSelectedOptions} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default OptionModal;
