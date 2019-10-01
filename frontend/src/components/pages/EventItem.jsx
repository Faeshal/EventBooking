import React from "react";

const EventItem = props => (
  <div className="card mb-3 shadow text-dark bg-light border border-primary mt-3">
    <div className="card-body text-center text-dark" key={props.eventId}>
      <h5 className="mt-2 font-weight-bold text-primary">{props.title}</h5>
      <h5 className="card-subtitle mb-2 text-muted mt-1 mb-1">
        $ {props.price}
      </h5>
      <h6 className="text-monospace">
        {new Date(props.date).toLocaleDateString()}
      </h6>
      {props.userId === props.creatorId ? (
        <p className="font-weight-lighter">Your Event</p>
      ) : (
        <button
          className="btn btn-xl btn-primary mt-2 mb-3"
          onClick={props.onDetail.bind(this, props.eventId)}
        >
          View Details
        </button>
      )}
    </div>
  </div>
);

export default EventItem;
