const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Topic", topicSchema);