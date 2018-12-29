const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');

const mongoose = require('mongoose');

const postsRouter = require('./api/posts/posts.routes');


const db_atlas = `mongodb+srv://mean-u5xne.mongodb.net/?retryWrites=true`;
const db_lab = `mongodb://aakash:phenom123@ds043457.mlab.com:43457/mplayer`;

mongoose.connect(db_atlas, {
  user: "aakash",
     pass: "phenom123#",
     dbName: "test",
     useNewUrlParser: true,
}).then(_ => {
  console.log('connection successfull Databse');
}).catch(_ => {
  console.log('Error connecting Databse');
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/uploads', express.static(path.join("backend/uploads")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


app.use('/api', postsRouter);



module.exports = app;
