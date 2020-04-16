// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const uniqueValidator = require('mongoose-unique-validator')

// const subTopicSchema = new Schema (
//   {
//     name: [{
//       type: String,
//       required: true
//     }]
//   },
//   {
//     timestamps :true
//   }
// )

// const topicSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     icon: {
//       type: String
//     },
    // subtopic: [subTopicSchema]
//   },
//   {
//     timestamps: true,
//   }
// );

// topicSchema.plugin(uniqueValidator, { message: 'That topic already exists!' })

// module.exports = mongoose.model("Topic", topicSchema);