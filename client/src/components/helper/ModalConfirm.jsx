import React from 'react';
import Button from './Button';

function ModalConfirm({ open, title = 'Confirm', message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal-confirm-overlay">
      <div className="modal-confirm-box">
        <h3 className="modal-confirm-title">{title}</h3>
        <div className="modal-confirm-message">{message}</div>
        <div className="modal-confirm-actions">
          <Button onClick={onConfirm}>OK</Button>
          <Button onClick={onCancel} className="modal-cancel-btn" style={{marginLeft: 8}}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirm; 