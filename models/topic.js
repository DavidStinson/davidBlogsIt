const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const topicSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

topicSchema.plugin(uniqueValidator, { message: "That topic already exists!" });

module.exports = mongoose.model("Topic", topicSchema);
