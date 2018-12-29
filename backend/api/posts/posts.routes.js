const express = require('express');
const multer  = require('multer')
const router = express.Router();
const Post = require('./posts.model');

// multer config

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination:  (req, file, cb) =>  {
    let error = null;
    let mime = MIME_TYPE_MAP[file.mimetype];
    if(!mime) {
      error = new Error('Invalid MIME Type');
    }
    cb(error, 'backend/uploads');
  },
  filename:  (req, file, cb) => {
    console.log('file:::', file);
    const name = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, `${name}-${Date.now()}.${MIME_TYPE_MAP[file.mimetype]}`);
  }
});

router.route('/posts')
.get((req, res, next) => {
  Post.find().then((docs, err) => {
    res.json({
      message: 'Posts Fetched Succesfully',
      posts: docs
    });
  })
})
.post(multer({storage: storage}).single('image'), async (req, res, next) => {
  const url = `${req.protocol}://${req.hostname}:4000`;
  console.log('req.protocol', req.protocol);
  console.log('req.host', req.host);

  const imagePath = `${url}/uploads/${req.file.filename}`;

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath
  });
  
  const post_created = await post.save();
  console.log('post_created::', post_created);

  res.status(201).json({
    message: 'Post Created Succesfully',
    post:post_created
  });
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
