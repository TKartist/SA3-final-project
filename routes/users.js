var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost:27017/login-app-db',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const KEY= 'wn8723yhufbvjeni23>"{+:983u9io19:">0jei(*&^%$dwnefi2981ijdw'

var router = express.Router();

var model = require ('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('log-in', {});
})

router.post('/login', async(req, res)=> {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({username}).lean(); // only json object 

    if(!user){
      return res.status(404).json("User not found")
    }

    console.log('password = ' , user);

    if(await bcrypt.compare(password, user.password_crypt)){
      //username password combination is succeful
      generateCookie(user, 200, res);
      res.status('ok');
    } else {
      return res.status(400).json("Wrong Password")
    }
  } catch(error) {
    res.status(500).json(error.message);
  }
})

router.get('/new', function(req, res, next) {
  res.render('sign-up', {});
})

router.post('/new', async(req, res)=> {
  console.log(req.body);

  //Hashing the password == algorithm bcrypt

  const {email, username, password} = req.body;

  //check email
  if(!email || typeof email !== 'string'){
    return res.json({status: 'error', error: 'Invalid Email'})
  }
 
  //check username

  if(!username || typeof username !== 'string'){
    return res.json({status: 'error',  error: 'Invalid Username'})
  }

  //check password

  if(!password || typeof password !== 'string'){
    return res.json({status: 'error',  error: 'Invalid Password'})
  }

  console.log('password is ' + password);

  const password_crypt = await bcrypt.hash(password, 5)
  const score = 1000;
  try {

    const response = await User.create({
      email,
      username,
      password_crypt,
      score
    })
    console.log('User created successfully', password_crypt);
    console.log('User created successfully', response);

  } catch(error){
    console.log(JSON.stringify(error))
    if(error.code === 11000){
      return res.json({status : 'error', error: 'Username already in use'})
    }
    throw error
  }

  res.json({status: 'ok'});
})

// router.get('/browse', function(req, res, next) {
//   res.render('browse', {});
// })


router.get('/logout', function(req, res) {
  res.clearCookie('token');
  res.status(200);
  res.redirect('/index');

});


module.exports = router;

const generateCookie = async (user, statusCode, res) => {
  const token = jwt.sign({id: user._id, username: user.username}, KEY);

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 4*60*60*1000)
  }

  res
  .status(statusCode)
  .cookie('token', token, options)
  .json({success: true, token});
}