var Tktk = require('../models/tktk');

module.exports = {
  index,
  create
};

async function index(req, res) {
  try{
      const tktks = await Tktk.find({});
      res.status(200).json(tktks);
  }
  catch(err){
      res.status(500).json(err);
  }
}

async function create(req, res) {
  console.log('user: ', req.user)
  try {
    const tktk = await Tktk.create(req.body);
    res.status(201).json(tktk);
  }
  catch(err){
    res.status(500).json(err);
  }
}
