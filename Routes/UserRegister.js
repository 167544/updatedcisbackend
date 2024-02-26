const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const client = mongodb.MongoClient;

const Register = express.Router().post("/", (req, res) => {
    client.connect("mongodb://localhost:27017/employee", (err, db) => {
        if (err) {
            throw err;
        } else {
            const { name, Username, password, repeatPassword, userRole } = req.body;

            // Check if a user with the same name or username already exists
            db.collection("Users").findOne({ $or: [{ name: name }, { Username: Username }] }, (err, user) => {
                if (err) {
                    throw err;
                } else if (user) {
                    return res.status(400).send("User already exists");
                } else {
                    // Check if password and repeatPassword match
                    if (password !== repeatPassword) {
                        return res.status(400).send("Passwords do not match");
                    }

                    // Hash the password using bcrypt
                    bcrypt.hash(password, 10, (err, hashedPassword) => {
                        if (err) {
                            throw err;
                        }

                        const newUser = {
                            name: name,
                            Username: Username,
                            password: hashedPassword,
                            repeatPassword: repeatPassword,
                            userRole: userRole
                        };

                        db.collection("Users").insertOne(newUser, (err, result) => {
                            if (err) {
                                throw err;
                            } else {
                                res.send("User registered successfully");
                            }
                        });
                    });
                }
            });
        }
    });
});

module.exports = Register;
