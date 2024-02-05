const express = require('express');
const router = express.Router();
const User = require('../model/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/user');

router.get('/', (req, res, next) => {
    res.status(200).json({ masssage: "hii This is student request" });
})

router.post('/signup', async (req, res, next) => {
    console.log("1");

    if (!req.body.password) {
        return res.status(400).json({ error: "Password is required" });
    }

    const passwords = req.body.password;
    const saltRounds = 10;

    try {
        const hashedpassword = await bcrypt.hash(passwords, saltRounds);
        console.log("hee",hashedpassword);

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            password: hashedpassword,  // Corrected field name to 'password'
            phone: req.body.phone,
            email: req.body.email,
            usertype: req.body.usertype
        });

        const result = await user.save();
        console.log(result);
        res.status(200).json({ data: result, message: "User Profile saved successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

router.post('/login', (req, res, next) => {
    User.find({ username: req.body.username }).exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({ msg: "User not found" });
            }

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: err });
                }

                if (!result) {
                    return res.status(401).json({ msg: "Password matching failed" });
                }

                const token = jwt.sign({
                    username: user[0].username,
                    usertype: user[0].usertype,
                    email: user[0].email,
                    phone: user[0].phone
                }, 'this is dummy text', { expiresIn: '24h' });

                res.status(200).json({
                    username: user[0].username,
                    usertype: user[0].usertype,
                    email: user[0].email,
                    phone: user[0].phone,
                    token: token
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


module.exports = router;