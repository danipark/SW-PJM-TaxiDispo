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

//Get single Voucher
voucherRoute.get('/voucher/:id', async (req, res) => {
    try {
        const voucher = await VoucherModel.findById(req.params.id);
        if (!voucher) return voucherNotFoundError(res);
        res.send(voucher);
    } catch (e) {
        return voucherNotFoundError(res);
    }
});

//update Voucher
voucherRoute.route('/voucher/:id').put((req, res, next) => {
    VoucherModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Voucher successfully updated!')
        }
    })
})

// Helper Functions
function voucherNotFoundError(res) {
    res.status(404).send('Voucher not found');
}

module.exports = voucherRoute;
