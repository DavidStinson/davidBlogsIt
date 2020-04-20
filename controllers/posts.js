var Post = require("../models/post");
var Topic = require("../models/topic");

module.exports = {
  index,
  create,
  delete: deleteOne,
  update,
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
  try {
    let topicRefs = [];
    for (const topic of req.body.topics) {
      const topicRef = await Topic.findOne({ value: topic }, (err, doc) => {});
      topicRefs.push(topicRef);
    }
    req.body.topicRefs = topicRefs;
    req.body.author = req.user.name;
    req.body.authorRef = req.user._id;
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteOne(req, res) {
  try {
    const deletedPost = await Post.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function update(req, res) {
  try {
    let topicRefs = [];
    for (const topic of req.body.topics) {
      const topicRef = await Topic.findOne({ value: topic }, (err, doc) => {});
      topicRefs.push(topicRef);
    }
    req.body.topicRefs = topicRefs;
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
}
