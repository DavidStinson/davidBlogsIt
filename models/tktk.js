const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tktkSchema = new Schema({
  
}, {
  timestamps: true
});

module.exports = mongoose.model('Tktk', tktkSchema);
