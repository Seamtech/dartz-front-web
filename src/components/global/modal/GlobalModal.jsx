import React from 'react';
import { Modal} from 'react-bootstrap';
import {FormButton} from '../forms';
import './GlobalModal.css'; // Your custom CSS for the modal

const GlobalModal = ({ title, children, show, onClose, footerButtons }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className='sovjet-section-heading'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {footerButtons.map((btn, index) => (
          <FormButton key={index} variant={btn.variant || 'primary'} onClick={btn.onClick}>
            {btn.text}
          </FormButton>
        ))}
      </Modal.Footer>
    </Modal>
  );
};

export default GlobalModal;