
const express=require('express')
const { isAuthentic } = require('../middleware/isAuthentic.js')
const { registerCompany, getCompany, updateCompany, companyById } = require('../controller/company.controller.js')

const companyRouter= express.Router()
companyRouter.post('/registerCompany',isAuthentic,registerCompany)
companyRouter.get('/getCompany',isAuthentic,getCompany)
companyRouter.put('/updateCompany/:id',isAuthentic,updateCompany)
companyRouter.get('/getCompanyById/:id',isAuthentic,companyById)

module.exports={companyRouter}