const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RenterSchema = new Schema({
  licenseplate: {
    type: String,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: Number
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
})

const Renter = mongoose.model("Renter", RenterSchema);

model.exports = Renter;