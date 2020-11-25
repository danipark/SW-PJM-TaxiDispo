const express = require('../node_modules/express');
const app = express();
const taxirouteRoute = express.Router();

let TaxirouteModel = require('../Taxi/Taxiroute');

// Add Taxiroute
taxirouteRoute.route('/create-taxiroute').post((req, res, next) => {
    TaxirouteModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get all Taxiroutes
taxirouteRoute.route('/get-taxiroutes').get((req, res) => {
    TaxirouteModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get single Taxioute
taxirouteRoute.route('/get-taxiroutes/:id').get((req, res) => {
    TaxirouteModel.find({userID: {"$in":req.params.id}}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = taxirouteRoute;