const bcrypt = require("bcryptjs");
const Event = require("../../models/events");
const User = require("../../models/user");

const events = eventIds => {
  return Event.find({ _id: { $in: eventIds } })
    .then(events => {
      return events.map(event => {
        return {
          ...event._doc,
          creator: user.binds(this, event.creator)
        };
      });
    })
    .catch(err => {
      throw err;
    });
};

const user = userId => {
  return User.findById(userId)
    .then(user => {
      return {
        ...user._doc,
        createdEvents: events.bind(this, user._doc.createEvents)
      };
    })
    .catch(err => {
      throw err;
    });
};
