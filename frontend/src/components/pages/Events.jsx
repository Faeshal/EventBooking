import React, { Component } from "react";
import Modal from "../Modal";
import AuthContext from "../auth-context";

class Events extends Component {
  state = {
    creating: false
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.dateElRef = React.createRef();
    this.descriptionElRef = React.createRef();
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const title = this.titleElRef.current.value;
    const price = +this.priceElRef.current.value;
    const date = this.dateElRef.current.value;
    const description = this.descriptionElRef.current.value;

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const event = {
      title: title,
      price: price,
      date: date,
      description: description
    };

    const requestBody = {
      query: `
          mutation {
            createEvent(eventInput: {title: "${title}", description:"${description}", price: ${price}, date:"${date}"}) {
              _id
              title
              description
              date
              price
              creator{
                _id
                email
              }  
            }
          }
        `
    };

    const token = this.context.token;

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
      });
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
            <form>
              <div className="form-group">
                <label htmlFor="title ">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Input Title"
                  ref={this.titleElRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  placeholder="Input Price"
                  ref={this.priceElRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date text-left">Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="date"
                  ref={this.dateElRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description text-left">Descriptrion</label>
                <textarea
                  className="w-100"
                  id="description"
                  rows="3"
                  ref={this.descriptionElRef}
                ></textarea>
              </div>
            </form>
          </Modal>
        )}
        {this.context.token && (
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
        )}
      </React.Fragment>
    );
  }
}

export default Events;
