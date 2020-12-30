const express = require('../node_modules/express');
const app = express();
const journeyRoute = express.Router();

let JourneyModel = require('../Taxi/Journey');

// Add Journey
journeyRoute.route('/journey').post((req, res, next) => {
    JourneyModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get all Journeys
journeyRoute.route('/journey').get((req, res) => {
    JourneyModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get single Journey
journeyRoute.route('/journey/:id').get((req, res) => {
    JourneyModel.find({ userID: { "$in": req.params.id } }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = journeyRoute;
