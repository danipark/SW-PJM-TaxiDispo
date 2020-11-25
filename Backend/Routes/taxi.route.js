const express = require('../node_modules/express');
const app = express();
const taxiRoute = express.Router();

let TaxiModel = require('../Taxi/Taxi');

// Add Taxi
taxiRoute.route('/create-Taxi').post((req, res, next) => {
    TaxiModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get all taxis
taxiRoute.route('/get-taxis').get((req, res) => {
    TaxiModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get single Taxi
taxiRoute.route('/get-taxi/:id').get((req, res) => {
    TaxiModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update taxi
taxiRoute.route('/update-taxi/:id').put((req, res, next) => {
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
taxiRoute.route('/delete-taxi/:id').delete((req, res, next) => {
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