



const company_schema = require("../models/company.model.js");


const registerCompany=async(req,res)=>{

    try{
        const {companyName}=req.body;
        if(!companyName){
            return res.status(400).json({msg:"company name is required"})
        }
        let comapny=await company_schema.findOne({companyName})
        if(comapny){
            return res.status(400).json({msg:"company is already registered"})
        }
        let companyDetails=await company_schema.create({
            name:companyName,
            userId:req._id
        })



        
        return res.status(201).json({msg:"company is registered successfully",companyDetails})

    }
    catch(err){
        return res.status(500).json({msg:"Internal Server Error"})
    }

}

const getCompany=async(req,res)=>{
    try{
        const userId=req._id;
        const companies=await company_schema.find({userId})
        if(!companies){
            return res.status(404).json({msg:"No company is created by you"})

        }
        return res.status(200).json({msg:"Here is your created company",companies})


    }
    catch(err){
        return res.status(500).json({msg:"Internal Server Error"})
    }
}
const companyById=async(req,res)=>{
    try{
        const companyId=req.params.id;

        const company=await company_schema.findById({_id:companyId})
        if(!company){
            return res.status(404).json({msg:"company not found"})

        }
        return res.status(200).json({msg:"Here is your created company",company})

    }catch(err){
        return res.status(500).json({msg:"Internal Server Error"})
    }

}
const updateCompany=async(req,res)=>{
    try{

        const{name,description,website, location}=req.body


        const updateData={name,description,website, location}

        const updateCompany = await company_schema.findByIdAndUpdate(req.params.id,updateData,{new:true})
        if(!updateCompany){
            return res.status(404).json({msg:"NO company find"})

        }
        return res.status(200).json({msg:"updated company details",updateCompany})


    }
catch(err){
        return res.status(500).json({msg:"Internal Server Error"})
    }
}
module.exports={registerCompany,getCompany,companyById,updateCompany}