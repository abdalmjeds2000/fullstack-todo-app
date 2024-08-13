const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./src/router");

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'https://abdalmjed-todo.vercel.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(router);

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const db = process.env.DB;
const port = process.env.PORT;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.uoup6yr.mongodb.net/${db}?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Server Run!");
    app.listen(port);
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
  });