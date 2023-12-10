import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * type: success, danger, ....  you add?
 * @param {*} param0
 * @returns
 */
const NotificationPopup = ({ showModal, hideModal, message, title, type }) => {
  return (
    <Modal show={showModal} onHide={hideModal} centered>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        {type === "success" ? (
          <div className="alert alert-success">{message}</div>
        ) : (
          <div className="alert alert-danger">{message}</div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default NotificationPopup;
