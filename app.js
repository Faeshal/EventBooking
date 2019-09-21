const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const graphQLSchema = require("./graphql/schema/index");
const graphQLResolvers = require("./graphql/resolvers/index");

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send("Hello From Express");
});

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers
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
