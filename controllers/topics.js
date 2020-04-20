var Topic = require("../models/topic");
var Post = require("../models/post")

module.exports = {
  index,
  show,
  create,
  delete: deleteOne,
};

async function index(req, res) {
  try {
    const topics = await Topic.find({});
    res.status(200).json(topics);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function show(req, res) {
  try{
      const topic = await Topic.findById(req.params.id);
      res.status(200).json(topic);
  }
  catch(err){
      res.status(500).json(err);
  }
}

async function create(req, res) {
  try {
    const topic = await Topic.create(req.body);
    res.status(201).json(topic);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteOne(req, res) {
  try{
    const post = await Post.find({topicRefs: req.params.id})
    if (!post.length) {
      const deletedTopic = await Topic.findByIdAndRemove(req.params.id);
      res.status(200).json(deletedTopic);
    } else {
      throw Error
    }
  }
  catch(err){
    res.status(500).json(err);
  }
}