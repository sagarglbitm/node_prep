
const express=require('express')
const { register, loginUser, updateProfile, logout } = require('../controller/user.controller.js')
const { isAuthentic } = require('../middleware/isAuthentic.js')

const userRouter= express.Router()

userRouter.post('/register',register)
userRouter.post('/login',loginUser)
userRouter.post('/profile/update',isAuthentic,updateProfile)
userRouter.post('/logout',logout)

module.exports={userRouter}