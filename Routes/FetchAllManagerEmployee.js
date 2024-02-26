let express = require('express');
let mongodb = require('mongodb');
let client = mongodb.MongoClient;

let FetchAllManagerEmployee = express.Router().get("/:boxname", (req, res) => {
    let { boxname } = req.params;
    let box = boxname.toString();
    console.log(boxname)

    client.connect("mongodb://localhost:27017/employee", (err, db) => {
        if (err) {
            throw err;
        } else{
            db.collection("employeeDetails").find({$or : [{"1st Manager":box},{"2nd Manager":box},{"3rd Manager":box},{"Manager Name":box},{"Project Manager Name":box}]}).toArray((err,result)=>{
                if(err){
                    throw err
                }else{
                    res.send(result)
                }
            });
        }
    });
});

module.exports = FetchAllManagerEmployee;
