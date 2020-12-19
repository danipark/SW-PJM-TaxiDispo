const express = require('../node_modules/express');
const app = express();
const voucherRoute = express.Router();

let VoucherModel = require('../Taxi/Voucher');

// Add Voucher
voucherRoute.route('/voucher').post((req, res, next) => {
    VoucherModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get all Vouchers
voucherRoute.route('/voucher').get((req, res) => {
    VoucherModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get single Voucher
voucherRoute.route('/voucher/:id').get((req, res) => {
    VoucherModel.find({userID: {"$in": req.params.id }}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = voucherRoute;
