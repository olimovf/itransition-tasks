import React from "react";

const Modal = ({ actionType, onClose, onConfirm }) => {
  return (
    <div className="modal" tabIndex="-1" role="dialog">
      {/* Modal content */}
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {actionType === "block" && "Block Users"}
              {actionType === "unblock" && "Unblock Users"}
              {actionType === "delete" && "Delete Users"}
            </h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {actionType === "block" &&
              "Are you sure you want to block the selected users?"}
            {actionType === "unblock" &&
              "Are you sure you want to unblock the selected users?"}
            {actionType === "delete" &&
              "Are you sure you want to delete the selected users?"}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
