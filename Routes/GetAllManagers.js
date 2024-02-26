let express = require('express');

let mongodb = require('mongodb')
let client = mongodb.MongoClient;

let getallmangers = express.Router().get('/',async(req,res)=>{
    try{
       let db =  await client.connect("mongodb://localhost:27017/employee");
       let Managers1st = await db.collection("employeeDetails").distinct("1st Manager");
       let Managers2nd = await db.collection("employeeDetails").distinct("2nd Manager");
       let Managers3rd = await db.collection("employeeDetails").distinct("3rd Manager");
       let ManagerName = await db.collection("employeeDetails").distinct("Manager Name");
       let allManagers =  [...Managers1st,...Managers2nd,...Managers3rd,...ManagerName]
       let Managers = [...new Set(allManagers)]


       res.send(Managers)

    }catch(err){
        res.send(err)
    }

})
module.exports = getallmangers