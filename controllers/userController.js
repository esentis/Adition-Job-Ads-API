var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var User = require('../models/User.js');
const { isAlphaNumericOnly, isGoodPassword } = require('../helpers/password-validation.js');

router.post('/', async function (req, res) {

    const findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
        return res.status(404).send("The user already exists");
    }
    if (!isAlphaNumericOnly(req.body.password)) {
        res.status(404).send("Password must only containt Alphanumeric characters");
    } else if (!isGoodPassword(req.body.password)) {
        res.status(404).send("Password must only containt Alphanumeric characters");
    } else {
        var user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save(function (err, newUser) {
            if (err) res.status(400).send(err);
            res.status(200).json(newUser.toDto());
        });
    }
})

module.exports = router;