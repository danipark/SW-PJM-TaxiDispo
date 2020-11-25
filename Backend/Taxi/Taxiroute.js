const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Taxiroute = new Schema({
  taxiID: { type: String },
  journeyID: { type: String},
  taxiDistance: { type: Number },
  completeDistance: { type: Number },
  price: { type: Number },
  date: { type: String },
  userID: {type: String}
}, {
  collection: 'taxiroute'
})

module.exports = mongoose.model('Taxiroute', Taxiroute)
