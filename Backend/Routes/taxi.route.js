const express = require('../node_modules/express');
const app = express();
const taxiRoute = express.Router();

let TaxiModel = require('../Taxi/Taxi');

// Add Taxi
taxiRoute.route('/taxi').post((req, res, next) => {
    TaxiModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get all taxis
taxiRoute.route('/taxi').get((req, res) => {
    TaxiModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get single Taxi
taxiRoute.route('/taxi/:id').get((req, res) => {
    TaxiModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update taxi
taxiRoute.route('/taxi/:id').put((req, res, next) => {
    TaxiModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Taxi successfully updated!')
        }
    })
})

// Delete taxi
taxiRoute.route('/taxi/:id').delete((req, res, next) => {
    TaxiModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = taxiRoute;