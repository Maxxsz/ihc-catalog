require("dotenv").config();
const express = require ("express");
const mongoose = require('mongoose');
const app = express();

// This parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());
// Body parser for html post fomr
app.use(express.urlencoded({extended:false}));

// Config constants
const PORT = 3000;
const API_URL_PATH = "/api/v1";
const DB_USER = process.env.DB_USER;
const DB_PASS = encodeURIComponent(process.env.DB_PASSWORD);

// Local data
const json = require('./dataa.json');

// Connection between database and the server application
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster-00.8nwrqdh.mongodb.net/ihc-catalog?retryWrites=true&w=majority`) .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });


// Creating api routes
// ROUTES
const articleRoutes = require('./routes/articleRoutes');
app.use(API_URL_PATH.concat('/','article'), articleRoutes);

const loginRoutes = require('./routes/loginRoutes');
app.use(API_URL_PATH.concat('/','login'), loginRoutes);

// How do we start listening to the server
app.listen(PORT);
