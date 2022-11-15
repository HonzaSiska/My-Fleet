const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const createToken = (_id, role) => {
  return jwt.sign({_id, role}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id, user.role)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password, displayName} = req.body

  try {
    
    const user = await User.signup(email, password, displayName)

    // create a token
    const token = createToken(user._id, 'user')

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const sendEmail = async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({email})
    const secret = process.env.SECRET + user.password
    const payload = {
      email: user.email,
      id: user.id
    }
    const token = jwt.sign(payload, secret, { expiresIn: '15m'})
    
    const link = `http://localhost:4000/api/user/reset/${user.id}/${token}`
    console.log(link)
  
    res.json({message: 'Link has been sent to your email'})
  } catch (error) {
    res.json({message: 'This email doesn\'t exist in the database'})
  }
  
}

const changePassword = async (req, res) => {
  const { id, token } = req.params 
  
  try {
    const user = await User.findById(id)
    if(!user){
      return res.json({success: false, message: 'Invalid Id !!'})
    }
    const secret = process.env.SECRET + user.password

    const payload = jwt.verify(token, secret)

    const newToken = jwt.sign({email: user.email}, process.env.SECRET, { expiresIn: '15m'})

    return res.redirect(`http://localhost:3000/change-password/${newToken}`)

  } catch (error) {
    res.json({success: false, message: error.message})
  }
 
}

const updatePassword = async(req, res) => {
  const {token, password, passwordConfirm} = req.body

  if(!password || !passwordConfirm) return res.status(400).json({success: false, message: 'Fill out passwords'})
  if(password !== passwordConfirm) return res.status(400).json({success: false, message: 'Passwords do not match'})
  if(!token) return res.status(400).json({success: false, message: 'You are not authorized'})
  
  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET)
    const user = await User.findOne({email: verifiedToken.email})
    if(user){
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      const updatedUser  = await User.updateOne({email: verifiedToken.email},{password: hash}, {new: true})
      const newToken = createToken(updatedUser._id, user.role)
       
      return res.status(200).json({success: true, user:{email: verifiedToken.email, token: newToken}})
    }  

  } catch (error) {
    return res.status(400).json({success: false, message: error.message})
  }
 
}
module.exports = { 
  signupUser, 
  loginUser, 
  sendEmail, 
  changePassword,
  updatePassword
 }