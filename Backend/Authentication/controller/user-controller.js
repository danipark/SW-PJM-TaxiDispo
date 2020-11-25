var User = require('../models/user')
var jwt = require('jsonwebtoken');
var config = require('../../database/db');

function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email, role: user.role}, config.jwtSecret, {
        expiresIn: 200 // 86400 läuft in 24h ab
    });
}

//Registrierung
exports.registerUser = (req, res) => {
    //Falls E-Mail & Passwort leer sind
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({'msg': 'Sie müssen E-Mail und Passwort eingeben'});
    }
    //Falls E-Mail schon vorhanden
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err){
            return res.status(400).json({'msg': err});
        }
        if (user) {
            return res.status(400).json({'msg': 'Der Benutzer existiert bereits'});
        }
    
        let newUser = User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.status(400).json({'msg': err});
            }
            return res.status(201).json(user);
        });  
    });
};

//Login
exports.loginUser = (req, res) => {
    //Falls E-Mail & Passwort leer sind
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({'msg': 'Sie müssen E-Mail und Passwort eingeben'});
}
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).send({ 'msg': err });
    }
    //Falls Benutzer nicht existiert
        if (!user) {
            return res.status(400).json({ 'msg': 'Der Benutzer existiert nicht.' });
    }
    //Passwort vergleichen
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                return res.status(200).json({
                    //Token erstellen
                    token: createToken(user)
                });
            } else {
                return res.status(400).json({ msg: 'Die angegebenen Zugangsdaten stimmen nicht überein!' });
        }
    });
});
};

