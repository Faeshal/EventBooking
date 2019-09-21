const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const app = express();
const Event = require("./models/events");
const User = require("./models/user");

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
      return { ...user._doc };
    })
    .catch(err => {
      throw err;
    });
};

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send("Hello From Express");
});

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
        
        type Event{
          _id:ID!
          title:String!
          description:String!
          price:Float!
          date:String!
          creator:User!
        }
        
        type User{
          _id:ID!
          email:String!
          password:String
          createdEvents:[Event!]!
        }

        input EventInput {
          title:String!
          description:String!
          price:Float!
          date:String!
        }

        input UserInput{
          email:String!
          password:String!
        }
    
        type RootQuery{
          events:[Event!]!  
        }

        type RootMutation{
          createEvent(eventInput:EventInput):Event
          createUser(userInput:UserInput):User
        }

        schema{
            query:RootQuery
            mutation:RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return Event.find()
          .then(events => {
            return events.map(event => {
              return {
                ...event._doc,
                creator: user.bind(this, event._doc.creator)
              };
            });
          })
          .catch(err => {
            console.log(err);
          });
      },
      createEvent: args => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
          creator: "5d84c23f2194890cdc1c9cca"
        });
        let createdEvent;
        return event
          .save()
          .then(result => {
            createdEvent = { ...result._doc };
            return User.findById("5d84c23f2194890cdc1c9cca");
            console.log(result);
            return { ...result._doc };
          })
          .then(user => {
            if (!user) {
              throw new Eror("User Not Found");
            }
            user.createdEvents.push(event);
            return user.save();
          })
          .then(result => {
            return createdEvent;
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      },
      createUser: args => {
        return User.findOne({ email: args.userInput.email })
          .then(user => {
            if (user) {
              throw new Error("Email Already Exist");
            }
            return bcrypt.hash(args.userInput.password, 12);
          })
          .then(hashedPassword => {
            const user = new User({
              email: args.userInput.email,
              password: hashedPassword
            });
            return user.save();
          })
          .then(result => {
            return { ...result._doc, password: null };
          })
          .catch(err => {
            throw err;
          });
      }
    }
  })
);

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    app.listen(process.env.PORT);
    console.log("Web Server is Running");
  })
  .catch(err => {
    console.log(err);
  });
