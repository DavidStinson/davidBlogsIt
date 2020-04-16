var Post = require("../models/post");
var Topic = require("../models/topic")

module.exports = {
  index,
  create,
};

async function index(req, res) {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function create(req, res) {
  console.log("user: ", req.user);
  console.log("post: ", req.body)
  try {
    req.body.author = req.user._id
    const topic = {}
    topic.name = req.body.topic
    delete req.body.topic
    const post = await Post.create(req.body);
    await Topic.create(topic)
    res.status(201).json(post);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
}
