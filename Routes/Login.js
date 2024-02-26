const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const client = mongodb.MongoClient;

const Login = express.Router().post("/", (req, res) => {
    client.connect("mongodb://localhost:27017/employee", (err, db) => {
        if (err) {
            throw err;
        } else {
            const { Username, password } = req.body;
            
            db.collection("Users").findOne({ Username }, (err, user) => {
                if (err) {
                    throw err;
                } else if (!user) {
                    res.status(400).send("Invalid User");
                } else {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (err) {
                            throw err;
                        } else if (result) {
                            res.send("Login successful");
                        } else {
                            res.status(400).send("Invalid User");
                        }
                    });
                }
            });
        }
    });
});

module.exports = Login;
