var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var dataBaseConfig = require('./Database/db');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
var passportMiddleware = require('./Authentication/middleware/passport');
passport.use(passportMiddleware);

const authenticationRoute = require('./Routes/authentication.route')
const taxiRoute = require('./Routes/taxi.route')
const journeyRoute = require('./Routes/journey.route')
const taxirouteRoute = require('./Routes/taxiroute.route')
const voucherRoute = require('./Routes/voucher.route')

// RESTful API root
app.use('/api', authenticationRoute, taxiRoute, journeyRoute, taxirouteRoute, voucherRoute)

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Database connected sucessfully ')
},
    error => {
        console.log('Could not connected to database : ' + error)
    }
)

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('PORT Connected on: ' + port)
})
