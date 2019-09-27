import React, { Component } from "react";
import Modal from "../Modal";

class Events extends Component {
  state = {
    creating: false
  };

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
  };
  modalCancelHandler = () => {
    this.setState({ creating: false });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.creating && (
          <Modal
            canCancel
            canConfirm
            onConfirm={this.modalConfirmHandler}
            onCancel={this.modalCancelHandler}
          >
            <p>Modal Content</p>
          </Modal>
        )}
        <div className="row text-center">
          <div className="col-sm-12">
            <h2>Events Page</h2>
            <hr />
            <h5 className="mt-4 mb-3">Share Your Event!</h5>
            <button
              onClick={this.startCreateEventHandler}
              className="btn btn-primary font-weight-bold"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              CREATE
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Events;
