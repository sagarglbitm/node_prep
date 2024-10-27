const mongoose=require('mongoose')

const companySchema=new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        
    },
    website: {
        type: String
    },
    
    location: {
        type: String,
    
    },
    logo: {
        type: String,
    
    },
    userId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'userJobSchema',
        required: true
    },
    

},{timestamps:true})

const company_schema=mongoose.model('companySchema',companySchema)

module.exports=company_schema

