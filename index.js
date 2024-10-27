
const express=require("express")
const cookieParser=require('cookie-parser')
const cors =require('cors')
const dotenv =require('dotenv');
const connectDb = require("./utils/db");
const { userRouter } = require("./routes/userRouter");
const { companyRouter } = require("./routes/compnayRouter");

const app=express();
dotenv.config({})


// default middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
const corsOptions={
    origin:"http://localhost:5173",
    Credentials:true
}
app.use(cors(corsOptions))


// routes
app.use('/user',userRouter)

app.use('/company',companyRouter)


// stream
app.get( '/stream',(req,res)=>{
    const stream=fs.createReadStream('filename','utf-8')
    stream.on('data',(chunk)=>res.write(chunk))
    stream.on('end',()=>res.end())
})

// cluster:



// server
const PORT=process.env.PORT
app.listen(PORT,()=>{
    connectDb()
    console.log(`server started at port no ${PORT}`)
})


