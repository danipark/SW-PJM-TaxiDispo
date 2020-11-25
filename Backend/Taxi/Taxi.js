const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Taxi = new Schema({
  taxiKennz: { type: String },
  taxiGroesse: { type: Number },
  taxiLongitude: { type: Number },
  taxiLatitude: { type: Number },
  verfügbarkeit: { type: Boolean },
}, {
  collection: 'taxi'
})

module.exports = mongoose.model('Taxi', Taxi)
