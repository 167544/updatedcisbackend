let express = require('express');
let mongodb = require('mongodb');
let client = mongodb.MongoClient;

let fetchbasedOnCondition = express.Router().get("/:boxname", (req, res) => {
    let { boxname } = req.params;
    let box = boxname.toString();
    console.log(boxname)

    client.connect("mongodb://localhost:27017/employee", (err, db) => {
        if (err) {
            throw err;
        } else {
            let query = {};
            query[box] = { $exists: true }; // Constructing the query object dynamically
          
            if (box == "Total Employees") {

                db.collection("employeeDetails").find().toArray((err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        res.send(result);
                    }
                });
            }   else if (box == "Total Customers") {

                db.collection("employeeDetails").find({ "Customer ID": { $exists: true }}).toArray((err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        res.send(result);
                    }
                });
            } else if (box == "seletedlist") {

                db.collection("employeeDetails").find({ "shortlisted": true}).toArray((err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        res.send(result);
                    }
                });
            }
            else if (box == "removedlist") {

                db.collection("employeeDetails").find({ "shortlisted": false}).toArray((err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        res.send(result);
                    }
                });
            }
            else {

                db.collection("employeeDetails").find(query).toArray((err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        res.send(result);
                    }
                });
            }
        }
    });
});

module.exports = fetchbasedOnCondition;
