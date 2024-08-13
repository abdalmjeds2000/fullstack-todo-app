const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router");

const app = express();
app.use(express.json());
app.use(router);
app.use(cors({
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type']
}));
app.use((req, res, next) => {
  //allow access from every, elminate CORS
  res.setHeader('Access-Control-Allow-Origin','*');
  res.removeHeader('x-powered-by');
  //set the allowed HTTP methods to be requested
  res.setHeader('Access-Control-Allow-Methods','POST');
  //headers clients can use in their requests
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  //allow request to continue and be handled by routes
  next();
});

const username = process.env.USERNAME,
      password = process.env.PASSWORD,
      db = process.env.DB,
      port = process.env.PORT;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.uoup6yr.mongodb.net/${db}?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Server Run!");
    app.listen(port);
  });

