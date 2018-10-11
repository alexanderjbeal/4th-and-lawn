const db = require("../models");
const Renter = db.Renter;
const ParkingSpot = db.ParkingSpot;
const User = db.User;

module.exports = function (app) {

  app.get('/api/parkingspots', (req, res) => {
    const { address, availablespots, instructions } = req.body

    ParkingSpot.find({})
      .then( dbParkingSpot => {
        res.json(dbParkingSpot)
      })
      .catch( err => {
        res.json(err)
      })

  })

  // Posts login information to passport
  app.post('/api/rentthisspot/:id', (req, res) => {

    console.log("stuff recieved", req.params)

    const { licenseplate, make, model, date, time } = req.body;

    Renter.create({
      licenseplate: licenseplate,
      make: make,
      model: model,
      date: date,
      time: time,
      user: req.session.passport.user,
      parkingspot: req.params.id
    })
      .then( dbRenter => {
        return User.findOneAndUpdate({ _id: req.session.passport.user }, { $push: { rentedspots: req.params.id, rentinfo: dbRenter._id } }, { new: true });
      })
      .then( (dbRenter) => {
        console.log("updating Parking Spot")
        return ParkingSpot.findOneAndUpdate({ _id: req.params.id }, { $push: { renter: req.session.passport.user, rentinfo: dbRenter._id } }, { new: true });
      })
      .then( dbUser => {
        console.log("sending user info", dbUser)
        res.json(dbUser)
      })
      .catch( err => {
        res.json(err)
      })
  });

  app.post('/api/parkingspots', (req, res) => {

    const { address, availablespots, instructions, game } = req.body;

    ParkingSpot.create({
      address: address,
      availablespots: availablespots,
      instructions: instructions,
      user: req.session.passport.user
    })
      .then( dbParkingSpotPoster => {
        return db.User.findOneAndUpdate({ _id: req.session.passport.user }, { $push: { parkingspots: dbParkingSpotPoster._id } }, {new: true });
      })
      .then( dbUser => {
        console.log("sent: ", dbUser);
        res.json(dbUser)
      })
      .catch( err => {
        res.json(err)
      })  
    });

  app.get('/api/postedspots', (req, res) => {
    User.find({ _id: req.session.passport.user })
      .populate('parkingspots')
      .then( dbPostedSpot => {
        res.json(dbPostedSpot)
        console.log('Got The Spots')
        console.log(dbPostedSpot)
      })
      .catch( err => {
        res.json(err)
        console.log('No Spots')
      })
  })
  
  app.get('/api/rentedspots', (req, res) => {
    User.find({ _id: req.session.passport.user })
      .populate('rentedspots')
      .then ( dbRentedSpot => {
        res.json(dbRentedSpot)
      })
      .catch( err => {
        res.json(err)
      })
  
  })
}


