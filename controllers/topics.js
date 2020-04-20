var Topic = require("../models/topic");

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
  console.log("user: ", req.user);
  console.log("post: ", req.body)
  try {
    const topic = await Topic.create(req.body);
    res.status(201).json(topic);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
}

async function deleteOne(req, res) {
  try{
    const deletedTopic = await Topic.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedTopic);
  }
  catch(err){
    res.status(500).json(err);
  }
}