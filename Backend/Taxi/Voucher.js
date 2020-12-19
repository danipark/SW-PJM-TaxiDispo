const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Voucher = new Schema({
    active: {type: Boolean},
    userID: {type: String}
}, {
  collection: 'voucher'
})

module.exports = mongoose.model('Voucher', Voucher)
