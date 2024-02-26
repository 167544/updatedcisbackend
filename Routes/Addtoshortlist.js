let express = require('express');
let mongodb = require('mongodb');
let client = mongodb.MongoClient;

let UpdateRecords = express.Router().put('/:id',(req,res)=>{
    client.connect("mongodb://localhost:27017/employee",(err,db)=>{
        if(err){
            throw err
        }else{
            db.collection('employeeDetails').updateOne({"Employee ID":parseInt(req.params.id)},{$set:{shortlisted:true}}  ,(err,result)=>{
                if (err){
                    throw err
                }else{
                    res.send(result)
                }
            })
        }
    })

})

module.exports = UpdateRecords;