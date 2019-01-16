// Import mongoose and save Schema to a const using ES6 destructuring
const gstore = require("gstore-node")();
const { Schema } = gstore;

const requestSchema = new Schema({
  name: {
    type: String
  },
  attachedForm: {
    type: String
  },
  createdOn: {
    type: Date
  },
  status: {
    type: String,
    default: "Submitted",
    values: ["Submitted", "Under Review", "Accepted", "Rejected"]
  },
  lastUpdated: {
    on: {
      type: Date
    },
    _by: {
      type: String
    }
  },
  _owner: {
    type: String
  },
  unitLeader: {
    type: String
  }
});

const listQueryOptions = {
  limit: 100
};
requestSchema.queries("list", listQueryOptions);

module.exports = gstore.model("Request", requestSchema);
