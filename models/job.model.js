const mongoose=require('mongoose')

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    requirements:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    position:{
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'companySchema',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userJobSchema'
    },
    application:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'applicationSchema'
    }],

},{timestamps:true})

const jobScheme=mongoose.model('jobSchema',jobSchema)
module.exports=jobScheme