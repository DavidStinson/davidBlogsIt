const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const dateObj = new Date();
const dayOpts = { weekday: "long" };
const monthOpts = { month: "long" };

const day = new Intl.DateTimeFormat("en-US", dayOpts).format(dateObj);
const month = new Intl.DateTimeFormat("en-US", monthOpts).format(dateObj);
const date = dateObj.getDate();
const year = dateObj.getFullYear();

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    topic: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true,
      },
    ],
    date: {
      type: String,
      required: true,
      default: `${day}, ${month} ${date} ${year}`,
    },
    isHero: {
      type: Boolean,
      required: true,
    },
    content: [contentSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);