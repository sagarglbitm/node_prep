
const mongoose=require('mongoose')

const userJobSchema= new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNo:{
        type:Number,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
        
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'companySchema'},
        profilePhoto:{type:String,default:""}
    }

},{timestamps:true})

 const userJob=mongoose.model('userJobSchema',userJobSchema)
module.exports=userJob