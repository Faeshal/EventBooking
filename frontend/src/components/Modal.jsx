import React from "react";

const Modal = props => (
  <div
    className="modal fade"
    id="exampleModal"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {props.title}
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">
          {props.canCancel && (
            <button
              onClick={props.onCancel}
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
          )}
          {props.canConfirm && (
            <button
              onClick={props.onConfirm}
              type="button"
              className="btn btn-primary"
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
