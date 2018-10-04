const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ParkingSpotSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  availablespots: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: Number,
  }
});

const ParkingSpot =mongoose.model("ParkingSpot", ParkingSpotSchema);

module.exports = ParkingSpot;