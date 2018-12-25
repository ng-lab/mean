const express = require('express');
const bodyParser = require('body-parser')
const app = express();


const mongoose = require('mongoose');

const postsRouter = require('./posts/posts.routes');


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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


app.use('/api', postsRouter);

// app.get('/api/posts', (req, res, next) => {
//   Post.find().then((docs, err) => {
//     res.json({
//       message: 'Posts Fetched Succesfully',
//       posts: docs
//     });
//   })
// }
// );

// app.post('/api/posts', (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content
//   });
//   console.log('post::', post);
//   post.save();
//   res.status(201).send('Post Added Successfully');
// })

// app.put('/api/posts/:id', (req, res, next) => {
//   console.log('Req Params:::', req.params);
//   console.log('Req Body:::', req.body);
//   const post =  new Post({
//     _id: req.params.id,
//       title: req.body.title,
//       content: req.body.content
//   });

//   Post.updateOne({_id: req.params.id}, post, ((err, res) => {
//     console.log('Post Updated Successfully');
//   }))
// }
// )

// app.delete('/api/posts/:id', (req, res, next) => {
//  console.log(req.params.id);
//  Post.deleteOne({_id: req.params.id}).then(data => {
//   res.status(200).send('Post Deleted Succesfully');
//  })
// })


module.exports = app;
