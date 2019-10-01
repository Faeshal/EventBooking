import React from "react";
import EventItem from "../pages/EventItem";

const EventList = props => {
  const events = props.events.map(event => {
    return (
      <EventItem
        key={event._id}
        eventId={event._id}
        title={event.title}
        price={event.price}
        date={event.date}
        userId={props.authUserId}
        creatorId={event.creator._id}
        onDetail={props.onViewDetail}
      />
    );
  });
  return (
    <div>
      <h4 className="mt-4">Events Explore</h4>
      <div className="col-sm-7 mx-auto mt-4">{events}</div>
    </div>
  );
};

export default EventList;
