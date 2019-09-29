import React from "react";

const EventItem = props => (
  <div className="card mb-3 shadow text-dark bg-light border border-primary mt-3">
    <div className="card-body text-center text-dark" key={props.eventId}>
      <h5 className="mt-2">{props.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted mt-1">$122</h6>
      {props.userId === props.creatorId ? (
        <p class="font-weight-lighter">Your Events</p>
      ) : (
        <button
          type="btn"
          className="btn btn-sm btn-outline-primary mt-2 mb-3  "
        >
          Details
        </button>
      )}
      <p class="font-weight-lighter">Your Events</p>
    </div>
  </div>
);

export default EventItem;
