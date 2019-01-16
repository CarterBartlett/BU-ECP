// Import mongoose and save Schema to a const using ES6 destructuring
const gstore = require("gstore-node")();
const { Schema } = gstore;

const userSchema = new Schema({
  role: {
    type: String,
    values: ["student", "lecturer", "department-head", "board"]
  },
  googleId: { type: String },
  username: { type: String },
  referenceNumber: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  dateOfBirth: { type: Date },
  universityEmail: { type: String, validate: "isEmail" },
  personalEmail: { type: String, validate: "isEmail" }
});

const listQueryOptions = {
    limit: 100
};
userSchema.queries("list", listQueryOptions);

module.exports = gstore.model("User", userSchema);
