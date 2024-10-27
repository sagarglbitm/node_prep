const mongoose=require('mongoose')

const applicationSchema= new mongoose.Schema({
    
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"jobSchema",
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"userJobSchema",
        required: true
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    }
},{timestamps:true})

const applicationScheme=mongoose.model('applicationSchema',applicationSchema)

module.exports=applicationScheme