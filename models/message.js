const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, minLength: 3, maxLength: 100 },
  message: { type: String, required: true, minLength: 3, maxLength: 100 },
  timestamp: { type: Date },
  author: { type: Schema.Types.ObjectId, ref: "Member", required: true },
});


// Export model
module.exports = mongoose.model("Message", MessageSchema);
