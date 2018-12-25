const express = require('express');
const router = express.Router();
const Post = require('./posts.model');

router.route('/posts')
.get((req, res, next) => {
  Post.find().then((docs, err) => {
    res.json({
      message: 'Posts Fetched Succesfully',
      posts: docs
    });
  })
})
.post((req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log('post::', post);
  post.save();
  res.status(201).send('Post Added Successfully');
});


router.route('/posts/:id')
.put((req, res, next) => {
  console.log('Req Params:::', req.params);
  console.log('Req Body:::', req.body);
  const post =  new Post({
    _id: req.params.id,
      title: req.body.title,
      content: req.body.content
  });

  Post.updateOne({_id: req.params.id}, post).then(result => {
    res.status(201).send(result);
  })
})
.delete( (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(data => {
   res.status(200).send('Post Deleted Succesfully');
  })
 });

 module.exports = router;
