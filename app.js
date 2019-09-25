const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const graphQLSchema = require("./graphql/schema/index");
const graphQLResolvers = require("./graphql/resolvers/index");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const isAuth = require("./middleware/is-auth");

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res, next) => {
  res.send("Hello From Express");
});

app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

app.use(isAuth);

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
