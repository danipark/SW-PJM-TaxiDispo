const express = require('../node_modules/express');
const app = express();
const journeyRoute = express.Router();

let JourneyModel = require('../Taxi/Journey');

// Add Journey
journeyRoute.route('/create-journey').post((req, res, next) => {
    JourneyModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get all Journeys
journeyRoute.route('/get-journeys').get((req, res) => {
    JourneyModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get single Journey
journeyRoute.route('/get-journeys/:id').get((req, res) => {
    JourneyModel.find({userID: {"$in": req.params.id }}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = journeyRoute;
