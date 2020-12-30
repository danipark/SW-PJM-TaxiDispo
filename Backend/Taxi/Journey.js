const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Journey = new Schema({
  startPoint: { type: String },
  endPoint: { type: String },
  date: { type: String },
  time: { type: String },
  numberOfPersons: { type: Number },
  userID: { type: String }
}, {
  collection: 'journey'
})

module.exports = mongoose.model('Journey', Journey)
