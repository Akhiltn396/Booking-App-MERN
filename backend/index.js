const express = require("express")
const cookieParser = require("cookie-parser")
const multer = require("multer")
const db = require("./config/dbConnect")
const  authRoute  = require("./routes/auth")
const  userRoute  = require("./routes/users")
const  hotelRoute  = require("./routes/hotels")
const  roomRoute  = require("./routes/rooms")

const app = express()
const dotenv = require("dotenv").config()
var cors = require('cors');


app.use(cors({origin:"http://localhost:3000",credentials:true}))

app.use(express.json())
app.use(cookieParser())

//error handler

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";

    return res.status(errorStatus).send(errorMessage)
})


//Middlewares

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/hotels",hotelRoute)
app.use("/api/rooms",roomRoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server started at port number ${process.env.PORT}`);
})