let express = require('express');
let bodyparser = require('body-parser')

let app = express();
app.use(bodyparser.json())

let data = require('./data.json')


app.get('/',(req,res)=>{
    res.send("welcome to Node js")
})

app.get('/login',(req,res)=>{
    res.send("welcome to Login")
})

app.get("/getdata",(req,res)=>{
    res.send(data)
})

app.post("/insertdata",(req,res)=>{
    data.push({"name":"amar",age:'23'})
    res.send(data)
})

app.post("/insertOne",(req,res)=>{
    data.push(req.body)
    res.send(data)
})


app.listen(3004)