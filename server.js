let express =require('express');
let bodyparser = require('body-parser')
let cors = require('cors')

let app = express();
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }))

app.use(cors())
// parse application/json

app.use(bodyparser.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.post("/postdata",(req,res)=>{
   res.send(req.body)
})

app.use('/fetchdata',require('./Routes/fetch'))

app.use('/fetchbasedOnCondition',require('./Routes/fetchBasedOnRequirement'))

app.use('/employeedata',require('./Routes/InsertData'))

app.use('/addtoshortlist',require('./Routes/Addtoshortlist'));

app.use('/removefromshorlist',require('./Routes/RemoveFromShorlist'));

app.use('/getAllMangers',require('./Routes/GetAllManagers'))
app.use('/registerdata',require('./Routes/UserRegister'))
app.use('/getMangersOFEmployee',require('./Routes/FetchAllManagerEmployee'))
app.use("/banddata",require('./Routes/BandData'))
app.use("/login",require('./Routes/Login'))

app.listen(3004,(req,res)=>{
    console.log("server running")
})

