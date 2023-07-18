const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  firstname: { type: String, required: true, minLength: 3, maxLength: 100 },
  lastname: { type: String, required: true, minLength: 3, maxLength: 100 },
  username: { type: String, required: true, minLength: 3, maxLength: 100 },
  password: { type: String, required: true, minLength: 3, maxLength: 100 },
  status: {
    type: String,
    required: true,
    enum: ["member", "admin", "pending"],
    default: "pending",
  },
});

// Virtual for bookinstance's URL
MemberSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/members/${this._id}`;
});

// Export model
module.exports = mongoose.model("Member", MemberSchema);
