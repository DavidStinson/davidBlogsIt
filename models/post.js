const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
